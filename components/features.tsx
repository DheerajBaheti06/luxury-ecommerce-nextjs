"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// ✨ Content updated for a modern e-commerce feel
interface FeaturesContent {
  title: string;
  subtitle: string;
}

const defaultContent: FeaturesContent = {
  title: "Why You'll Love Shopping With Us",
  subtitle:
    "Experience the perfect blend of quality, style, and service you can count on.",
};

export function Features() {
  const [content, setContent] = useState<FeaturesContent>(defaultContent);

  useEffect(() => {
    // This functionality is preserved as requested
    const savedContent = localStorage.getItem("skitbit-content");
    if (savedContent) {
      try {
        const parsed = JSON.parse(savedContent);
        if (parsed.features) {
          setContent(parsed.features);
        }
      } catch (error) {
        console.error("Error parsing saved content:", error);
      }
    }
  }, []);

  return (
    <section id="features" className="container mx-auto px-4 py-16 sm:py-20">
      <div className="text-center">
        <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
          {content.title}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-300">
          {content.subtitle}
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {/* Card 1: Curated Collections */}
        <Card className="hidden md:block liquid-glass border border-white/10 bg-white/5 backdrop-blur-xl">
          <CardHeader>
            <p className="text-[11px] tracking-widest text-neutral-400">
              EXPERTLY CURATED
            </p>
            <CardTitle className="mt-1 text-xl text-white">
              Collections For Every Style
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-[3/4] overflow-hidden rounded-xl border border-white/10">
                <Image
                  // ✨ Image URL added
                  src="https://images.pexels.com/photos/3812433/pexels-photo-3812433.jpeg"
                  alt="A person wearing a stylish jacket from our collection"
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                  sizes="(min-width: 768px) 50vw, 100vw"
                  priority={false}
                />
              </div>
              <div className="relative aspect-[3/4] overflow-hidden rounded-xl border border-white/10">
                <Image
                  // ✨ Image URL added
                  src="https://images.pexels.com/photos/7007188/pexels-photo-7007188.jpeg"
                  alt="Close-up detail of a high-quality fabric handbag"
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                  sizes="(min-width: 768px) 50vw, 100vw"
                  priority={false}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Card 2: Customer Reviews */}
        <Card className="liquid-glass border border-white/10 bg-white/5 backdrop-blur-xl">
          <CardHeader>
            <p className="text-[11px] tracking-widest text-neutral-400">
              TOP-RATED BY SHOPPERS
            </p>
            <CardTitle className="mt-1 text-xl text-white">
              {/* ✨ Text updated for e-commerce */}
              "The quality exceeded my expectations, and the delivery was
              incredibly fast. I've already placed my next order!"
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6 flex items-end gap-4">
              <div className="text-5xl font-bold text-lime-300">4.9</div>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-lime-300 text-lime-300"
                  />
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-video overflow-hidden rounded-xl border border-white/10">
                <Image
                  // ✨ Image URL added
                  src="https://images.pexels.com/photos/4464484/pexels-photo-4464484.jpeg"
                  alt="A customer happily using one of our best-selling products"
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
              </div>
              <div className="relative aspect-video overflow-hidden rounded-xl border border-white/10">
                <Image
                  // ✨ Image URL added
                  src={
                    "https://images.pexels.com/photos/4440841/pexels-photo-4440841.jpeg"
                  }
                  alt="Flat lay of our product showcasing its features"
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
