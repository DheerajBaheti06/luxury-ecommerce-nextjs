"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Users,
  Target,
  Zap,
  Calendar,
  MapPin,
  User,
} from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { useAuth } from "@/context/auth-context";

// Featured products for the About page
const featuredProducts = [
  {
    id: "1",
    name: "Wireless Bluetooth Headphones",
    description:
      "Premium noise-cancelling headphones with 30hr battery life and deep bass",
    price: 129,
    originalPrice: 199,
    rating: 4.8,
    image:
      "https://images.pexels.com/photos/205926/pexels-photo-205926.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "electronics",
    featured: true,
    features: [
      "Active noise cancellation",
      "30-hour battery life",
      "Bluetooth 5.0 connectivity",
      "Built-in microphone",
      "Comfortable over-ear design",
    ],
    details: {
      "Battery Life": "30 hours",
      Connectivity: "Bluetooth 5.0",
      "Noise Cancellation": "Active",
      Weight: "250g",
      Warranty: "1 year",
    },
  },
  {
    id: "2",
    name: "Smart Fitness Tracker",
    description:
      "Track steps, heart rate, sleep quality and receive smartphone notifications",
    price: 79,
    originalPrice: 129,
    rating: 4.6,
    image:
      "https://images.pexels.com/photos/267394/pexels-photo-267394.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "electronics",
    featured: true,
    features: [
      "Heart rate monitoring",
      "Sleep tracking",
      "Step counter",
      "Smartphone notifications",
      "Water resistant",
    ],
    details: {
      "Battery Life": "7 days",
      Connectivity: "Bluetooth",
      "Water Resistance": "IP67",
      Display: "Color touchscreen",
      Sensors: "Heart rate, accelerometer",
    },
  },
  {
    id: "9",
    name: "Bluetooth Wireless Speaker",
    description: "360° surround sound with deep bass and 15hr playtime",
    price: 129,
    originalPrice: 179,
    rating: 4.6,
    image:
      "https://images.pexels.com/photos/164660/pexels-photo-164660.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "electronics",
    featured: true,
    features: [
      "360° surround sound",
      "15-hour battery life",
      "Water resistant",
      "Bluetooth connectivity",
      "Deep bass technology",
    ],
    details: {
      "Battery Life": "15 hours",
      Connectivity: "Bluetooth 5.0",
      "Water Resistance": "IPX7",
      Drivers: "2x 10W",
      Frequency: "50Hz-20kHz",
    },
  },
  {
    id: "11",
    name: "Stainless Steel Cookware Set",
    description:
      "10-piece professional grade cookware set with non-stick coating",
    price: 199,
    originalPrice: 299,
    rating: 4.8,
    image:
      "https://images.pexels.com/photos/160408/pexels-photo-160408.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "home",
    featured: true,
    features: [
      "10-piece set",
      "Non-stick coating",
      "Stainless steel construction",
      "Oven safe up to 260°C",
      "Dishwasher safe",
    ],
    details: {
      Pieces: "10-piece set",
      Material: "Stainless steel",
      Coating: "Non-stick",
      "Oven Safe": "Up to 260°C",
      Handles: "Ergonomic, stay-cool",
    },
  },
];

export default function AboutPage() {
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
            We're on a mission to revolutionize the e-commerce landscape with
            innovative products and exceptional customer experiences.
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
                    technologists with a vision to transform how people shop
                    online. What started as a simple idea in a garage has grown
                    into a leading e-commerce platform serving customers
                    worldwide.
                  </p>
                  <p className="text-gray-300 mb-4">
                    Over the years, we've consistently pushed the boundaries of
                    innovation, introducing groundbreaking features that have
                    redefined the shopping experience. Our commitment to quality
                    and customer satisfaction has earned us the trust of
                    thousands of customers.
                  </p>
                  <p className="text-gray-300">
                    Today, we continue to evolve and expand, always staying true
                    to our core mission of making online shopping seamless,
                    enjoyable, and accessible to everyone.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700">
                  <div className="flex items-center mb-4">
                    <Calendar className="h-5 w-5 text-lime-400 mr-2" />
                    <span className="text-lime-400 font-medium">
                      Milestone Timeline
                    </span>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-lime-400/10 flex items-center justify-center mr-3 mt-0.5">
                        <div className="h-2 w-2 rounded-full bg-lime-400"></div>
                      </div>
                      <div>
                        <p className="font-medium">2017</p>
                        <p className="text-sm text-gray-400">
                          Company founded with 3 team members
                        </p>
                      </div>
                    </li>
                    <li className="flex">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-lime-400/10 flex items-center justify-center mr-3 mt-0.5">
                        <div className="h-2 w-2 rounded-full bg-lime-400"></div>
                      </div>
                      <div>
                        <p className="font-medium">2019</p>
                        <p className="text-sm text-gray-400">
                          Launched first 1000 products
                        </p>
                      </div>
                    </li>
                    <li className="flex">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-lime-400/10 flex items-center justify-center mr-3 mt-0.5">
                        <div className="h-2 w-2 rounded-full bg-lime-400"></div>
                      </div>
                      <div>
                        <p className="font-medium">2021</p>
                        <p className="text-sm text-gray-400">
                          Reached 100,000 customers
                        </p>
                      </div>
                    </li>
                    <li className="flex">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-lime-400/10 flex items-center justify-center mr-3 mt-0.5">
                        <div className="h-2 w-2 rounded-full bg-lime-400"></div>
                      </div>
                      <div>
                        <p className="font-medium">2023</p>
                        <p className="text-sm text-gray-400">
                          Expanded to international markets
                        </p>
                      </div>
                    </li>
                    <li className="flex">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-lime-400/10 flex items-center justify-center mr-3 mt-0.5">
                        <div className="h-2 w-2 rounded-full bg-lime-400"></div>
                      </div>
                      <div>
                        <p className="font-medium">2025</p>
                        <p className="text-sm text-gray-400">
                          Launched AI-powered shopping assistant
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === "mission" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700">
                  <h3 className="text-xl font-bold mb-4 text-lime-400">
                    Our Mission
                  </h3>
                  <p className="text-gray-300 mb-4">
                    To empower businesses and consumers with innovative
                    e-commerce solutions that simplify shopping, enhance
                    experiences, and drive sustainable growth.
                  </p>
                  <p className="text-gray-300">
                    We strive to bridge the gap between technology and commerce,
                    creating seamless digital experiences that delight users and
                    deliver measurable value to our partners.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700">
                  <h3 className="text-xl font-bold mb-4 text-lime-400">
                    Our Vision
                  </h3>
                  <p className="text-gray-300 mb-4">
                    To be the world's most trusted and innovative e-commerce
                    platform, setting new standards for digital commerce through
                    cutting-edge technology and exceptional service.
                  </p>
                  <p className="text-gray-300">
                    We envision a future where shopping is intuitive,
                    personalized, and accessible to everyone, regardless of
                    their location or technical expertise.
                  </p>
                </div>
              </div>
            )}

            {activeTab === "values" && (
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center">
                  Our Core Values
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {values.map((value, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 text-center"
                    >
                      <div className="flex justify-center mb-4">
                        {value.icon}
                      </div>
                      <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                      <p className="text-gray-300">{value.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Core Values Accordion for Mobile */}
          <div className="lg:hidden space-y-4 mb-16">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl"
              >
                <div className="flex items-center p-4">
                  {value.icon}
                  <h3 className="text-lg font-bold ml-3">{value.title}</h3>
                </div>
                <div className="px-4 pb-4 text-gray-300">
                  {value.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Meet Our <span className="text-lime-400">Team</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              The talented individuals who make Skitbit possible
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div
                key={item}
                className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-4 text-center"
              >
                <div className="bg-gray-700 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                  <Users className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="font-bold">Team Member {item}</h3>
                <p className="text-sm text-gray-400 mt-1">Position Title</p>
              </div>
            ))}
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
                name={product.name}
                description={product.description}
                price={product.price}
                originalPrice={product.originalPrice}
                rating={product.rating}
                image={product.image}
                featured={product.featured}
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
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            {isAuthenticated
              ? "Access your personalized dashboard, track orders, and manage your wishlist."
              : "Create an account to unlock personalized features, track orders, and save your favorite products."}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {isAuthenticated ? (
              <Button
                asChild
                className="bg-lime-400 text-black hover:bg-lime-300"
              >
                <Link href="/auth/profile">
                  View Profile
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            ) : (
              <>
                <Button
                  asChild
                  className="bg-lime-400 text-black hover:bg-lime-300"
                >
                  <Link href="/auth/signup">Create Account</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-gray-700 text-black hover:bg-gray-800 hover:text-white hover:border-white"
                >
                  <Link href="/auth/login">Sign In</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-8 sm:p-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Ready to Experience the{" "}
            <span className="text-lime-400">Future</span> of Shopping?
          </h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have transformed their
            shopping experience with Skitbit.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              asChild
              className="bg-lime-400 text-black hover:bg-lime-300 "
            >
              <Link href="/products">
                Shop Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-gray-700 text-black hover:bg-gray-800 hover:text-white hover:border-white"
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
