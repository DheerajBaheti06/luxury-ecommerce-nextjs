"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Target, Zap, CheckCircle2, User, Award } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { useAuth } from "@/context/auth-context";

export function AboutContent({
  featuredProducts,
}: {
  featuredProducts: any[];
}) {
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState("story");

  const stats = [
    { label: "Years Experience", value: "8+" },
    { label: "Projects Completed", value: "1.2K+" },
    { label: "Happy Clients", value: "98%" },
    { label: "Team Members", value: "24" },
  ];

  const values = [
    {
      icon: <Target className="h-8 w-8 text-lime-400" />,
      title: "Customer Focus",
      description:
        "We put our customers at the center of everything we do, ensuring their success is our success.",
    },
    {
      icon: <Zap className="h-8 w-8 text-lime-400" />,
      title: "Innovation",
      description:
        "We constantly push boundaries to deliver cutting-edge solutions that exceed expectations.",
    },
    {
      icon: <Users className="h-8 w-8 text-lime-400" />,
      title: "Teamwork",
      description:
        "We believe in the power of collaboration to achieve extraordinary results.",
    },
  ];

  return (
    <div className="min-h-screen text-white pb-20">
      {/* Hero Section: Matched to Hero.tsx spacing and typography */}
      <section className="relative py-20 sm:py-32 px-4 text-center overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="block">The Vision Behind</span>
            <span className="block text-lime-400 drop-shadow-[0_0_20px_rgba(132,204,22,0.4)]">
              Skitbit Studio
            </span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-base text-gray-200 sm:text-lg md:text-xl leading-relaxed">
            We are on a mission to revolutionize the digital landscape. By blending high-fidelity 3D visual services with curated luxury assets, we help you find the pieces that are uniquely you.
          </p>

          {/* Stats Cards: Glassmorphism style */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto mt-16">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-black/40 backdrop-blur-md border border-gray-800 rounded-2xl p-6 shadow-2xl transition-transform hover:scale-105"
              >
                <div className="text-3xl sm:text-4xl font-bold text-lime-400 mb-1">
                  {stat.value}
                </div>
                <div className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-[0.2em] font-bold">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tabs Section: Custom navigation using your button theme */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {["story", "mission", "values"].map((tab) => (
              <Button
                key={tab}
                variant="outline"
                onClick={() => setActiveTab(tab)}
                className={`rounded-full px-10 py-6 font-bold uppercase tracking-widest transition-all border-gray-700 ${
                  activeTab === tab
                    ? "bg-lime-400 text-black border-lime-400 shadow-[0_0_20px_rgba(163,230,53,0.3)]"
                    : "bg-transparent text-white hover:bg-white hover:text-black"
                }`}
              >
                Our {tab}
              </Button>
            ))}
          </div>

          {/* Tab Content Box */}
          <div className="bg-black/50 backdrop-blur-xl border border-gray-800 rounded-[2.5rem] p-8 md:p-16 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-lime-400/5 blur-[100px] -z-10" />
            
            {activeTab === "story" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center text-left">
                <div className="space-y-6">
                  <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                    The Journey <span className="text-lime-400 italic">to Quality</span>
                  </h2>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    Founded in 2017, Skitbit began as a small team of passionate technologists who believed that e-commerce was ready for its next evolution.
                  </p>
                  <p className="text-gray-400 leading-relaxed">
                    Over the years, we have consistently pushed the boundaries of innovation. From precision 3D modeling for luxury horology to creating immersive digital boutiques, our journey is defined by a commitment to style and value delivered to your door.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-8 border border-gray-800 shadow-inner">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-12 w-12 rounded-full bg-lime-400/10 flex items-center justify-center">
                      <Award className="text-lime-400 h-6 w-6" />
                    </div>
                    <span className="font-bold text-xl uppercase tracking-tighter">Milestones</span>
                  </div>
                  <ul className="space-y-4">
                    {["2017: Concept & Launch", "2020: Global Client Expansion", "2024: Next-Gen Marketplace"].map((m) => (
                      <li key={m} className="flex items-center gap-3 text-gray-400 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-lime-400" /> {m}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === "mission" && (
              <div className="text-center max-w-3xl mx-auto space-y-8">
                <h3 className="text-3xl sm:text-4xl font-extrabold text-lime-400 uppercase tracking-tighter italic">
                  Mission & Vision
                </h3>
                <p className="text-2xl sm:text-3xl text-gray-100 font-light leading-snug">
                  "To unleash global style through a curated selection of the latest trends, high-end 3D visual excellence, and a relentless focus on customer success."
                </p>
                <div className="pt-8 border-t border-gray-800">
                   <p className="text-gray-500 uppercase tracking-widest text-sm font-bold">Built for the future of digital retail</p>
                </div>
              </div>
            )}

            {activeTab === "values" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {values.map((v, i) => (
                  <div key={i} className="flex flex-col items-center p-10 bg-white/5 rounded-3xl border border-white/5 transition-all hover:border-lime-400/30 group">
                    <div className="mb-6 group-hover:scale-110 transition-transform">{v.icon}</div>
                    <h4 className="text-xl font-bold uppercase tracking-widest mb-3">{v.title}</h4>
                    <p className="text-sm text-gray-400 leading-relaxed text-center">{v.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6 text-center md:text-left">
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight uppercase">
                Explore the <span className="text-lime-400 italic">Collection</span>
              </h2>
              <p className="text-gray-400 mt-2">Discover pieces that are uniquely you.</p>
            </div>
            <Button
              asChild
              size="lg"
              className="rounded-full bg-white text-black font-bold text-lg px-10 py-6 transition-all hover:bg-lime-400 hover:scale-105 hover:shadow-lg hover:shadow-lime-400/20"
            >
              <Link href="/products" className="flex items-center gap-2">
                SHOP NOW <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.title || product.name}
                description={product.description}
                price={product.price.toString()}
                rating={product.ratingsAverage}
                image={product.images?.[0] || product.image}
                productDetails={product}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Auth CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-[3rem] p-12 shadow-2xl">
          <div className="bg-lime-400/10 p-5 rounded-full w-fit mx-auto mb-8 shadow-[0_0_30px_rgba(163,230,53,0.1)]">
            <User className="h-10 w-10 text-lime-400" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-6 tracking-tight">
            {isAuthenticated ? "Welcome Back to Skitbit!" : "Unleash Your Personal Style"}
          </h2>
          <p className="text-gray-400 mb-10 max-w-md mx-auto text-lg leading-relaxed">
            Join our community to access exclusive collections and premium 3D visualization services.
          </p>
          <Button
            asChild
            size="lg"
            className="rounded-full bg-lime-400 text-black font-bold text-lg px-12 py-6 transition-all hover:bg-white hover:scale-105 shadow-xl shadow-lime-400/20"
          >
            <Link href={isAuthenticated ? "/auth/profile" : "/auth/signup"}>
              {isAuthenticated ? "GO TO PROFILE" : "CREATE ACCOUNT"}
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}