"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Target, Zap, Calendar, User } from "lucide-react";
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
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-lime-400/5 via-transparent to-lime-400/5 rounded-3xl"></div>
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            About <span className="text-lime-400">Skitbit</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-base sm:text-lg mb-10">
            We are on a mission to revolutionize the e-commerce landscape.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-4 sm:p-6"
              >
                <div className="text-2xl sm:text-3xl font-bold text-lime-400 mb-1">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-gray-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story and Mission Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            <Button
              variant={activeTab === "story" ? "default" : "outline"}
              onClick={() => setActiveTab("story")}
              className={
                activeTab === "story"
                  ? "bg-lime-400 text-black hover:bg-lime-300"
                  : " text-black border-gray-700 hover:bg-gray-800 hover:text-white hover:border-white"
              }
            >
              Our Story
            </Button>
            <Button
              variant={activeTab === "mission" ? "default" : "outline"}
              onClick={() => setActiveTab("mission")}
              className={
                activeTab === "mission"
                  ? "bg-lime-400 text-black hover:bg-lime-300"
                  : "border-gray-700 text-black hover:bg-gray-800 hover:text-white hover:border-white"
              }
            >
              Mission & Vision
            </Button>
            <Button
              variant={activeTab === "values" ? "default" : "outline"}
              onClick={() => setActiveTab("values")}
              className={
                activeTab === "values"
                  ? "bg-lime-400 text-black hover:bg-lime-300"
                  : "border-gray-700 text-black hover:bg-gray-800 hover:text-white hover:border-white"
              }
            >
              Core Values
            </Button>
          </div>

          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 sm:p-8 mb-16">
            {activeTab === "story" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                    Our Journey
                  </h2>
                  <p className="text-gray-300 mb-4">
                    Founded in 2017, Skitbit began as a small team of passionate
                    technologists.
                  </p>
                  <p className="text-gray-300 mb-4">
                    Over the years, we have consistently pushed the boundaries
                    of innovation.
                  </p>
                </div>
                {/* Timeline simplified for brevity in this file update */}
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700">
                  <p className="text-gray-300">Timeline placeholder...</p>
                </div>
              </div>
            )}
            {activeTab === "mission" && (
              <div className="p-4 text-center">
                <h3 className="text-xl font-bold mb-4 text-lime-400">
                  Our Mission
                </h3>
                <p className="text-gray-300">
                  To empower businesses and consumers.
                </p>
              </div>
            )}
            {activeTab === "values" && (
              <div className="p-4 text-center">
                <h3 className="text-xl font-bold mb-4 text-lime-400">
                  Our Values
                </h3>
                <p className="text-gray-300">
                  Innovation, Teamwork, Customer Focus.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Popular <span className="text-lime-400">Products</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Discover our best-selling items that customers love
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.title || product.name}
                description={product.description}
                price={
                  product.discountPrice
                    ? product.discountPrice.toString()
                    : product.price.toString()
                }
                originalPrice={
                  product.discountPrice ? product.price.toString() : undefined
                }
                rating={product.ratingsAverage}
                image={product.images?.[0] || product.image}
                featured={product.ratingsAverage > 4.8}
                showWishlistButton={true}
                showAddToCartButton={true}
                showViewButton={true}
                productDetails={product}
              />
            ))}
          </div>

          <div className="text-center mt-10">
            <Button
              asChild
              className="bg-green-500 text-black hover:bg-lime-300"
            >
              <Link href="/products">
                View All Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Authentication CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-8 sm:p-12">
          <User className="h-12 w-12 text-lime-400 mx-auto mb-6" />
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            {isAuthenticated
              ? "Welcome Back to Skitbit!"
              : "Join Our Community"}
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {/* CTA Buttons */}
            <Button
              asChild
              className="bg-lime-400 text-black hover:bg-lime-300"
            >
              <Link href={isAuthenticated ? "/auth/profile" : "/auth/signup"}>
                {isAuthenticated ? "View Profile" : "Create Account"}
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
