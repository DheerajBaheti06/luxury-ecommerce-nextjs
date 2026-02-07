"use client";

import type React from "react";
import { useEffect, useRef, memo } from "react";
import { Renderer, Program, Mesh, Triangle } from "ogl";

// Professional Palette: Violet & Lime
const COLOR_A = [0 / 255, 50 / 255, 100 / 255];
const COLOR_B = [0 / 255, 100 / 255, 255 / 255];

const vertex = `#version 300 es
in vec2 position;
void main() { gl_Position = vec4(position, 0.0, 1.0); }`;

const fragment = `#version 300 es
precision highp float;
uniform vec2 iResolution;
uniform float iTime;
uniform vec3 uColorA;
uniform vec3 uColorB;
out vec4 fragColor;

void main() {
    vec2 uv = gl_FragCoord.xy / iResolution.xy;
    float t = iTime * 0.15;
    
    // Create organic movement using nested sine waves
    vec2 p = uv * 3.0;
    for(int n = 1; n < 5; n++){
        float i = float(n);
        p += vec2(0.7 / i * sin(i * p.y + t + i * 0.3) + 0.8, 0.4 / i * sin(i * p.x + t + i * 0.5) + 1.6);
    }
    
    // Calculate the influence of each color
    float pattern = 0.5 + 0.5 * sin(p.x + p.y);
    
    // Professional depth: Mix colors and add "Deep Shadow"
    vec3 mixedColor = mix(uColorA, uColorB, pattern);
    
    // Add a dark vignette and ambient occlusion look
    float vignette = 1.0 - length(uv - 0.5) * 0.7;
    vec3 finalColor = mixedColor * pattern * vignette;
    
    // Soft "Studio Light" highlight
    float highlight = pow(pattern, 8.0) * 0.15;
    finalColor += highlight;

    // Output with subtle transparency for the background
    fragColor = vec4(finalColor, 0.25); 
}`;

export const Plasma: React.FC = memo(() => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    let active = true;
    if (!containerRef.current) return;

    const renderer = new Renderer({
      webgl: 2,
      alpha: true,
      dpr: Math.min(window.devicePixelRatio, 1.2), 
    });

    const gl = renderer.gl;
    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: [0, 0] },
        uColorA: { value: COLOR_A },
        uColorB: { value: COLOR_B },
      },
    });

    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });
    containerRef.current.appendChild(gl.canvas);

    const resize = () => {
      if (!containerRef.current || !active) return;
      const { width, height } = containerRef.current.getBoundingClientRect();
      renderer.setSize(width, height);
      program.uniforms.iResolution.value = [gl.drawingBufferWidth, gl.drawingBufferHeight];
    };

    window.addEventListener("resize", resize);
    resize();

    const update = (t: number) => {
      if (!active) return;
      program.uniforms.iTime.value = t * 0.001;
      renderer.render({ scene: mesh });
      rafRef.current = requestAnimationFrame(update);
    };
    rafRef.current = requestAnimationFrame(update);

    return () => {
      active = false;
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafRef.current);
      if (gl.canvas.parentNode) gl.canvas.parentNode.removeChild(gl.canvas);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
});

Plasma.displayName = "Plasma";
export default Plasma;