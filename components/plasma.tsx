"use client";

import type React from "react";
import { useEffect, useRef, memo } from "react";
import { Renderer, Program, Mesh, Triangle } from "ogl";

interface PlasmaProps {
  color?: string;
  speed?: number;
  direction?: "forward" | "reverse" | "pingpong";
  scale?: number;
  opacity?: number;
  mouseInteractive?: boolean;
}

const hexToRgb = (hex: string): [number, number, number] => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return [1, 0.5, 0.2];
  return [
    Number.parseInt(result[1], 16) / 255,
    Number.parseInt(result[2], 16) / 255,
    Number.parseInt(result[3], 16) / 255,
  ];
};

const vertex = `#version 300 es
precision highp float;
in vec2 position;
in vec2 uv;
out vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragment = `#version 300 es
precision highp float;
uniform vec2 iResolution;
uniform float iTime;
uniform vec3 uCustomColor;
uniform float uUseCustomColor;
uniform float uSpeed;
uniform float uDirection;
uniform float uScale;
uniform float uOpacity;
uniform vec2 uMouse;
uniform float uMouseInteractive;
out vec4 fragColor;

void mainImage(out vec4 o, vec2 C) {
  vec2 center = iResolution.xy * 0.5;
  C = (C - center) / uScale + center;
  
  vec2 mouseOffset = (uMouse - center) * 0.0002;
  C += mouseOffset * length(C - center) * step(0.5, uMouseInteractive);
  
  float i, d, z, T = iTime * uSpeed * uDirection;
  vec3 O, p, S;

  for (vec2 r = iResolution.xy, Q; ++i < 60.; O += o.w/d*o.xyz) {
    p = z*normalize(vec3(C-.5*r,r.y)); 
    p.z -= 4.; 
    S = p;
    d = p.y-T;
    
    p.x += .4*(1.+p.y)*sin(d + p.x*0.1)*cos(.34*d + p.x*0.05); 
    Q = p.xz *= mat2(cos(p.y+vec4(0,11,33,0)-T)); 
    z+= d = abs(sqrt(length(Q*Q)) - .25*(5.+S.y))/3.+8e-4; 
    o = 1.+sin(S.y+p.z*.5+S.z-length(S-p)+vec4(2,1,0,8));
  }
  
  o.xyz = tanh(O/1e4);
}

bool finite1(float x){ return !(isnan(x) || isinf(x)); }
vec3 sanitize(vec3 c){
  return vec3(
    finite1(c.r) ? c.r : 0.0,
    finite1(c.g) ? c.g : 0.0,
    finite1(c.b) ? c.b : 0.0
  );
}

void main() {
  vec4 o = vec4(0.0);
  mainImage(o, gl_FragCoord.xy);
  vec3 rgb = sanitize(o.rgb);
  
  float intensity = (rgb.r + rgb.g + rgb.b) / 3.0;
  vec3 customColor = intensity * uCustomColor;
  vec3 finalColor = mix(rgb, customColor, step(0.5, uUseCustomColor));
  
  float alpha = length(rgb) * uOpacity;
  fragColor = vec4(finalColor, alpha);
}`;

// Memoized Plasma component to prevent unnecessary re-renders
export const Plasma: React.FC<PlasmaProps> = memo(
  ({
    color = "#ffffff",
    speed = 1,
    direction = "forward",
    scale = 1,
    opacity = 1,
    mouseInteractive = true,
  }) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const mousePos = useRef({ x: 0, y: 0 });
    const rafRef = useRef<number>(0);
    const rendererRef = useRef<any>(null);

    useEffect(() => {
      if (!containerRef.current) return;

      // --- Device detection ---
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
      const isMobile = window.innerWidth < 768;

      const useCustomColor = color ? 1.0 : 0.0;
      const customColorRgb = color ? hexToRgb(color) : [1, 1, 1];
      const directionMultiplier = direction === "reverse" ? -1.0 : 1.0;

      let renderer;
      try {
        // Lower DPR on mobile/iOS to reduce performance impact
        renderer = new Renderer({
          webgl: 2,
          alpha: true,
          antialias: false,
          dpr:
            Math.min(window.devicePixelRatio || 1, 1.5) *
            (isIOS || isMobile ? 0.5 : 1),
        });
      } catch (webglError) {
        console.warn(
          "WebGL not supported, falling back to CSS animation",
          webglError
        );
        // Create a fallback CSS-based animation
        if (containerRef.current) {
          containerRef.current.innerHTML =
            '<div class="plasma-fallback"></div>';
        }
        return;
      }

      if (!renderer) {
        console.warn("Failed to create WebGL renderer");
        return;
      }

      rendererRef.current = renderer;

      const gl = renderer.gl;
      // Check if WebGL context is valid
      if (!gl) {
        console.warn("WebGL context is not available");
        return;
      }

      const canvas = gl.canvas as HTMLCanvasElement;
      if (!canvas) {
        console.warn("Failed to create canvas");
        return;
      }

      canvas.style.display = "block";
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      containerRef.current.appendChild(canvas);

      const geometry = new Triangle(gl);

      const program = new Program(gl, {
        vertex,
        fragment,
        uniforms: {
          iTime: { value: 0 },
          iResolution: { value: new Float32Array([1, 1]) },
          uCustomColor: { value: new Float32Array(customColorRgb) },
          uUseCustomColor: { value: useCustomColor },
          uSpeed: { value: speed * 0.4 },
          uDirection: { value: directionMultiplier },
          uScale: { value: scale },
          uOpacity: { value: opacity },
          uMouse: { value: new Float32Array([0, 0]) },
          uMouseInteractive: {
            value: isIOS ? 0.0 : mouseInteractive ? 1.0 : 0.0,
          },
        },
      });

      const mesh = new Mesh(gl, { geometry, program });

      // --- Mouse interaction (skip on iOS) ---
      const handleMouseMove = (e: MouseEvent) => {
        if (isIOS || !mouseInteractive) return;
        const rect = containerRef.current!.getBoundingClientRect();
        mousePos.current.x = e.clientX - rect.left;
        mousePos.current.y = e.clientY - rect.top;
        const mouseUniform = program.uniforms.uMouse.value as Float32Array;
        mouseUniform[0] = mousePos.current.x;
        mouseUniform[1] = mousePos.current.y;
      };
      if (!isIOS && mouseInteractive) {
        containerRef.current.addEventListener("mousemove", handleMouseMove);
      }

      // --- Resize handling ---
      const setSize = () => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const width = Math.max(1, Math.floor(rect.width));
        const height = Math.max(1, Math.floor(rect.height));
        renderer.setSize(width, height);
        const res = program.uniforms.iResolution.value as Float32Array;
        res[0] = gl.drawingBufferWidth;
        res[1] = gl.drawingBufferHeight;
      };
      const ro = new ResizeObserver(setSize);
      ro.observe(containerRef.current);
      setSize();

      // --- Animation loop with reduced frame rate ---
      let lastTime = 0;
      const t0 = performance.now();
      const loop = (t: number) => {
        const delta = t - lastTime;
        // Reduce frame rate to ~30fps to improve performance
        if (delta > 33) {
          const timeValue = (t - t0) * 0.001;
          if (direction === "pingpong") {
            const cycle = Math.sin(timeValue * 0.5) * directionMultiplier;
            (program.uniforms.uDirection as any).value = cycle;
          }
          (program.uniforms.iTime as any).value = timeValue;
          renderer.render({ scene: mesh });
          lastTime = t;
        }
        rafRef.current = requestAnimationFrame(loop);
      };
      rafRef.current = requestAnimationFrame(loop);

      return () => {
        cancelAnimationFrame(rafRef.current);
        ro.disconnect();
        if (!isIOS && mouseInteractive && containerRef.current) {
          containerRef.current.removeEventListener(
            "mousemove",
            handleMouseMove
          );
        }
        try {
          if (
            containerRef.current &&
            canvas &&
            canvas.parentNode === containerRef.current
          ) {
            containerRef.current.removeChild(canvas);
          }
        } catch (e) {
          console.warn("Error cleaning up canvas", e);
        }
        // Clean up renderer resources
        try {
          if (rendererRef.current) {
            rendererRef.current.gl
              .getExtension("WEBGL_lose_context")
              ?.loseContext();
          }
        } catch (e) {
          console.warn("Error releasing WebGL context", e);
        }
      };
    }, [color, speed, direction, scale, opacity, mouseInteractive]);

    return (
      <div
        ref={containerRef}
        className="plasma-container pointer-events-none will-change-transform"
      />
    );
  }
);

Plasma.displayName = "Plasma";

export default Plasma;
