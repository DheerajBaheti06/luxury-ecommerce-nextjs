import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative h-screen min-h-[600px] w-full text-white shadow-black">
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-transparent z-10" />

      {/* Content */}
      <div className="relative z-20 container mx-auto flex h-full flex-col items-center justify-center px-4 pt-5 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          <span className="block">Unleash Your Style</span>
          <span className="block text-lime-400 drop-shadow-[0_0_20px_rgba(132,204,22,0.4)]">
            New Collection is Here
          </span>
        </h1>
        <p className="mt-4 max-w-md text-base text-gray-200 sm:text-lg md:mt-6 md:max-w-xl">
          Shop the latest trends and find the pieces that are uniquely you.
          Quality, style, and value delivered to your door.
        </p>
        <div className="mt-6 md:mt-8">
          <Button
            asChild
            size="lg"
            className="rounded-full bg-white text-black font-bold text-lg px-8 py-4 transition-all hover:bg-lime-400 hover:scale-105 hover:shadow-lg hover:shadow-lime-400/20"
          >
            <Link href="/products">Shop Now</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
