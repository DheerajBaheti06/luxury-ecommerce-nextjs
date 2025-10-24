"use client";

import { Hero } from "@/components/hero";
import { Features } from "@/components/features";
import Script from "next/script";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product-card";
import {
  Facebook,
  Instagram,
  Twitter,
  Smartphone,
  Laptop,
  Shirt,
  Home,
  Watch,
  Headphones,
  Gamepad,
  Camera,
  Tv,
} from "lucide-react";
import { useState } from "react";

/**
 * Force static generation for optimal Time To First Byte (TTFB)
 * This ensures the page is pre-rendered at build time for better performance
 */
export const dynamic = "force-static";

/**
 * Product data for the homepage
 * In a production environment, this data would typically come from an API or database
 * Each product includes essential e-commerce information like price, ratings, and features
 */
const allProducts = [
  {
    id: "1",
    name: "Aura Headphones",
    description:
      "Immersive over-ear headphones with adaptive noise cancellation.",
    price: 249,
    originalPrice: 299,
    rating: 4.8,
    image:
      "https://images.pexels.com/photos/3394654/pexels-photo-3394654.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    featured: true,
    category: "electronics",
    features: [
      "Adaptive noise cancellation",
      "30-hour battery life",
      "Bluetooth 5.0 connectivity",
      "Built-in microphone",
      "Comfortable over-ear design",
    ],
    details: {
      "Battery Life": "30 hours",
      Connectivity: "Bluetooth 5.0",
      "Noise Cancellation": "Adaptive",
      Weight: "250g",
      Warranty: "1 year",
    },
  },
  {
    id: "2",
    name: "Chrono Smartwatch",
    description:
      "Track fitness, monitor heart rate, and stay connected on the go.",
    price: 399,
    originalPrice: 499,
    rating: 4.9,
    image:
      "https://images.pexels.com/photos/267394/pexels-photo-267394.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    featured: true,
    category: "electronics",
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
    id: "3",
    name: "RGB Gaming Keyboard",
    description:
      "RGB mechanical keyboard with responsive keys and ergonomic design.",
    price: 129,
    originalPrice: 149,
    rating: 4.7,
    image:
      "https://images.pexels.com/photos/4792731/pexels-photo-4792731.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    featured: false,
    category: "electronics",
    features: [
      "RGB backlit keys",
      "Mechanical switches",
      "Programmable macro keys",
      "Dedicated media controls",
      "Ergonomic wrist rest",
    ],
    details: {
      Connectivity: "USB-C",
      Switches: "Mechanical",
      "Key Rollover": "N-key",
      Dimensions: "450x150x40mm",
      Weight: "1.2kg",
    },
  },
  {
    id: "4",
    name: "4K Action Camera",
    description:
      "Capture every adventure in 4K with image stabilization and Wi-Fi.",
    price: 349,
    originalPrice: 399,
    rating: 4.8,
    image:
      "https://images.pexels.com/photos/7994430/pexels-photo-7994430.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    featured: true,
    category: "electronics",
    features: [
      "4K video recording",
      "Image stabilization",
      "Waterproof housing",
      "Voice control",
      "Wi-Fi connectivity",
    ],
    details: {
      Resolution: "4K at 60fps",
      "Image Stabilization": "Yes",
      "Water Resistance": "10m",
      "Battery Life": "2 hours",
      Connectivity: "Wi-Fi, Bluetooth",
    },
  },
  {
    id: "5",
    name: "Portable Bluetooth Speaker",
    description:
      "Compact speaker delivering deep bass and 360° surround sound.",
    price: 99,
    originalPrice: 129,
    rating: 4.6,
    image: "https://images.pexels.com/photos/9767551/pexels-photo-9767551.jpeg",
    featured: false,
    category: "electronics",
    features: [
      "360° surround sound",
      "12-hour battery life",
      "Water resistant design",
      "Bluetooth connectivity",
      "Built-in microphone",
    ],
    details: {
      "Battery Life": "12 hours",
      Connectivity: "Bluetooth 5.0",
      "Water Resistance": "IPX7",
      Drivers: "2x 10W",
      Frequency: "50Hz-20kHz",
    },
  },
  {
    id: "6",
    name: "HD Streaming Drone",
    description:
      "4K UHD drone with GPS stabilization and 30-minute flight time.",
    price: 599,
    originalPrice: 699,
    rating: 4.9,
    image:
      "https://images.pexels.com/photos/1983036/pexels-photo-1983036.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    featured: true,
    category: "electronics",
    features: [
      "4K camera",
      "30-minute flight time",
      "GPS positioning",
      "Obstacle avoidance",
      "Mobile app control",
    ],
    details: {
      "Flight Time": "30 minutes",
      Camera: "4K HD",
      "Positioning System": "GPS + Vision",
      "Obstacle Avoidance": "Yes",
      Range: "5km",
    },
  },
  {
    id: "7",
    name: "Designer Leather Wallet",
    description:
      "Handcrafted genuine leather wallet with RFID blocking technology.",
    price: 49,
    originalPrice: 79,
    rating: 4.5,
    image:
      "https://images.pexels.com/photos/13225343/pexels-photo-13225343.jpeg",
    category: "accessories",
    featured: true,
    features: [
      "Genuine leather material",
      "RFID protection",
      "Multiple card slots",
      "Cash compartment",
      "Coin pocket",
    ],
    details: {
      Material: "Genuine leather",
      "RFID Protection": "Yes",
      Slots: "8 card slots",
      Compartments: "2 cash, 1 coin",
      Dimensions: "190x95mm",
    },
  },
  {
    id: "8",
    name: "Ergonomic Office Chair",
    description:
      "Breathable mesh chair designed for ultimate comfort and posture support.",
    price: 299,
    originalPrice: 399,
    rating: 4.8,
    image:
      "https://images.pexels.com/photos/8112163/pexels-photo-8112163.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "home",
    featured: false,
    features: [
      "Adjustable lumbar support",
      "Breathable mesh back",
      "360° swivel",
      "Height adjustable",
      "Armrests adjustable",
    ],
    details: {
      Material: "Mesh + Metal",
      "Weight Capacity": "150kg",
      Adjustments: "Height, tilt, armrests",
      Wheels: "5 casters",
      Dimensions: "60x60x110cm",
    },
  },
  {
    id: "9",
    name: "Smart Fitness Tracker",
    description:
      "Slim wearable tracker for daily steps, heart rate, and sleep analysis.",
    price: 79,
    originalPrice: 129,
    rating: 4.6,
    image:
      "https://images.pexels.com/photos/1558593/pexels-photo-1558593.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
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
    id: "10",
    name: "Organic Cotton T-Shirt Bundle",
    description:
      "Set of 3 premium organic cotton t-shirts in assorted neutral tones.",
    price: 59,
    originalPrice: 79,
    rating: 4.9,
    image:
      "https://images.pexels.com/photos/841247/pexels-photo-841247.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "fashion",
    featured: false,
    features: [
      "100% organic cotton",
      "Set of 3 t-shirts",
      "Assorted colors",
      "Soft and breathable",
      "Machine washable",
    ],
    details: {
      Material: "100% organic cotton",
      Sizes: "S, M, L, XL",
      Colors: "Assorted",
      "Sleeve Type": "Short sleeve",
      Fit: "Regular fit",
    },
  },
  {
    id: "11",
    name: "Stainless Steel Cookware Set",
    description:
      "10-piece set featuring non-stick coating and ergonomic handles.",
    price: 199,
    originalPrice: 299,
    rating: 4.8,
    image: "https://images.pexels.com/photos/1194432/pexels-photo-1194432.jpeg",
    category: "home",
    featured: true,
    features: [
      "10-piece set",
      "Non-stick coating",
      "Stainless steel build",
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
  {
    id: "12",
    name: "UV Protection Sunglasses",
    description:
      "Polarized sunglasses with UV400 protection and anti-scratch lenses.",
    price: 49,
    originalPrice: 79,
    rating: 4.7,
    image:
      "https://images.pexels.com/photos/31259697/pexels-photo-31259697.jpeg",
    category: "accessories",
    featured: false,
    features: [
      "UV400 protection",
      "Polarized lenses",
      "Lightweight frame",
      "Anti-scratch coating",
      "Unisex design",
    ],
    details: {
      Lenses: "Polarized",
      "UV Protection": "UV400",
      Frame: "Lightweight plastic",
      "Lens Material": "Polycarbonate",
      Weight: "120g",
    },
  },
  {
    id: "13",
    name: "Wireless Charging Pad",
    description:
      "Fast wireless charging dock for all Qi-compatible smartphones.",
    price: 24,
    originalPrice: 39,
    rating: 4.4,
    image:
      "https://images.pexels.com/photos/4792720/pexels-photo-4792720.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "electronics",
    featured: false,
    features: [
      "Qi wireless charging",
      "Fast charging support",
      "Compatible with all Qi devices",
      "LED indicator",
      "Anti-slip surface",
    ],
    details: {
      Compatibility: "All Qi-enabled devices",
      "Charging Speed": "10W max",
      Input: "5V/2A",
      Output: "5W/10W",
      Dimensions: "100x100x10mm",
    },
  },
  {
    id: "14",
    name: "Smart Home Security Camera",
    description: "1080p HD indoor camera with night vision and app tracking.",
    price: 89,
    originalPrice: 129,
    rating: 4.7,
    image:
      "https://images.pexels.com/photos/7691540/pexels-photo-7691540.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "electronics",
    featured: true,
    features: [
      "1080p HD video",
      "Night vision",
      "Mobile app control",
      "Motion detection",
      "Two-way audio",
    ],
    details: {
      Resolution: "1080p HD",
      "Night Vision": "Yes",
      Connectivity: "Wi-Fi",
      "Field of View": "110°",
      Storage: "Cloud/SD card",
    },
  },
  {
    id: "15",
    name: "Bluetooth Wireless Speaker",
    description: "360° portable speaker with deep bass and 15-hour playtime.",
    price: 129,
    originalPrice: 179,
    rating: 4.6,
    image:
      "https://images.pexels.com/photos/3739451/pexels-photo-3739451.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "electronics",
    featured: true,
    features: [
      "360° sound output",
      "15-hour battery",
      "Waterproof build",
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
    id: "16",
    name: "Stainless Steel Water Bottle",
    description:
      "Insulated double-walled bottle keeps drinks hot or cold for hours.",
    price: 29,
    originalPrice: 39,
    rating: 4.9,
    image:
      "https://images.pexels.com/photos/3646192/pexels-photo-3646192.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "home",
    featured: false,
    features: [
      "Double-walled insulation",
      "Keeps cold for 24 hours",
      "Keeps hot for 12 hours",
      "Leak-proof design",
      "BPA-free materials",
    ],
    details: {
      Capacity: "500ml",
      Material: "Stainless steel",
      Insulation: "Double-walled",
      "Lid Type": "Screw-on",
      Dimensions: "220x70mm",
    },
  },
];

/**
 * Category data for the homepage navigation
 * Each category includes an ID, display name, icon component, and color scheme
 * These are used to create the category browsing experience
 */
const categoryData = [
  {
    id: "electronics",
    name: "Electronics",
    icon: Smartphone,
    color: "bg-blue-500",
  },
  { id: "fashion", name: "Fashion", icon: Shirt, color: "bg-pink-500" },
  { id: "home", name: "Home & Kitchen", icon: Home, color: "bg-green-500" },
  {
    id: "accessories",
    name: "Accessories",
    icon: Watch,
    color: "bg-purple-500",
  },
  { id: "laptops", name: "Laptops", icon: Laptop, color: "bg-yellow-500" },
  { id: "audio", name: "Audio", icon: Headphones, color: "bg-red-500" },
  { id: "gaming", name: "Gaming", icon: Gamepad, color: "bg-indigo-500" },
  { id: "cameras", name: "Cameras", icon: Camera, color: "bg-teal-500" },
];

/**
 * Simplified category list for filtering
 * Used in product pages and other sections where a simpler category list is needed
 */
const categories = [
  { id: "all", name: "All Products" },
  { id: "electronics", name: "Electronics" },
  { id: "fashion", name: "Fashion" },
  { id: "home", name: "Home & Kitchen" },
  { id: "accessories", name: "Accessories" },
  { id: "laptops", name: "Laptops" },
  { id: "audio", name: "Audio" },
  { id: "gaming", name: "Gaming" },
  { id: "cameras", name: "Cameras" },
];

/**
 * E-commerce footer component
 * Contains navigation links, social media links, and copyright information
 * Organized into sections for better user navigation
 */
const EcommerceFooter = () => {
  return (
    <footer className="border-t border-white/10 mt-12 py-8">
      <div className="container mx-auto px-4 text-center text-gray-400">
        {/* Footer navigation sections */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8 text-left">
          <div>
            <h4 className="font-bold text-white mb-3">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/products?category=electronics"
                  className="hover:text-lime-400"
                >
                  Electronics
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=fashion"
                  className="hover:text-lime-400"
                >
                  Fashion
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=home"
                  className="hover:text-lime-400"
                >
                  Home Goods
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=sale"
                  className="hover:text-lime-400"
                >
                  On Sale
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-3">About Us</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-lime-400">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-lime-400">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/press" className="hover:text-lime-400">
                  Press
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-3">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/contact" className="hover:text-lime-400">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-lime-400">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-lime-400">
                  Shipping & Returns
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-3">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/terms" className="hover:text-lime-400">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-lime-400">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        {/* Social media links */}
        <div className="flex justify-center gap-6 mb-6">
          <Link href="#" aria-label="Facebook">
            <Facebook className="h-6 w-6 hover:text-lime-400" />
          </Link>
          <Link href="#" aria-label="Twitter">
            <Twitter className="h-6 w-6 hover:text-lime-400" />
          </Link>
          <Link href="#" aria-label="Instagram">
            <Instagram className="h-6 w-6 hover:text-lime-400" />
          </Link>
        </div>
        {/* Copyright information */}
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Skitbit. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

/**
 * Main homepage component
 * Renders the hero section, features, category navigation, and product listings
 * Includes pagination for product browsing
 */
export default function Page() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8; // Show 8 products per page

  // Filter products by category
  const filteredProducts =
    selectedCategory === "all"
      ? allProducts
      : allProducts.filter((product) => product.category === selectedCategory);

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to products section
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
  };

  /**
   * Structured data for SEO purposes
   * Helps search engines understand the content and products on the page
   * Follows Schema.org standards for e-commerce websites
   */
  const productsStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebPageElement",
    "@id": "https://theskitbit.com/#products",
    name: "Featured Products",
    description: "Discover our top-rated and trending products.",
    url: "https://theskitbit.com/#products",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: currentProducts.map((product, index) => ({
        "@type": "Product",
        position: index + 1,
        name: product.name,
        description: product.description,
        image: product.image,
        offers: {
          "@type": "Offer",
          price: product.price.toString(),
          priceCurrency: "USD",
        },
      })),
    },
  };

  /**
   * Page-level structured data
   * Provides overall context about the website to search engines
   */
  const pageStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://theskitbit.com/",
    name: "Skitbit | Your One-Stop E-commerce Destination",
    description: "Shop the latest trends in electronics, fashion, and more.",
    url: "https://theskitbit.com/",
  };

  return (
    <>
      <main className="min-h-[100dvh] text-white flex flex-col justify-center align-middle">
        <Hero />
        <Features />

        {/* Enhanced Category Section - Amazon/Flipkart Style */}
        <section className="container mx-auto px-4 py-8 sm:py-10">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl mb-2">
              Shop by <span className="text-lime-400">Category</span>
            </h2>
            <p className="text-gray-400 max-w-lg mx-auto text-sm sm:text-base">
              Browse our wide range of products across all categories
            </p>
          </div>

          {/* Category Grid - Responsive grid that adapts to screen size */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-12">
            {categoryData.map((category) => {
              const IconComponent = category.icon;
              return (
                <Link
                  key={category.id}
                  href={`/products?category=${category.id}`}
                  className="group flex flex-col items-center justify-center p-4 rounded-xl bg-gray-900/50 border border-gray-800 hover:border-lime-400/50 hover:bg-gray-900/70 transition-all duration-300 hover:-translate-y-1"
                >
                  <div
                    className={`p-3 rounded-full ${category.color} mb-3 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-sm font-medium text-center text-gray-200 group-hover:text-lime-400 transition-colors">
                    {category.name}
                  </h3>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Featured Products Section */}
        <section
          id="products"
          className="container mx-auto px-4 py-12 sm:px-6 sm:py-16 relative"
        >
          {/* Decorative background gradient */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-lime-400/5 via-transparent to-lime-400/5 rounded-3xl mx-0 my-8"></div>
          <div className="text-center mb-10 sm:mb-12">
            <div className="inline-flex items-center justify-center mb-2">
              <div className="h-1 w-12 bg-lime-400 rounded-full"></div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mx-4">
                Trending <span className="text-lime-400">Now</span>
              </h2>
              <div className="h-1 w-12 bg-lime-400 rounded-full"></div>
            </div>
            <p className="text-gray-400 max-w-lg mx-auto text-sm sm:text-base">
              Check out our best-selling products that our customers love.
            </p>
          </div>

          {/* Product Grid - Responsive layout that adapts to different screen sizes */}
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-5">
            {currentProducts.map((product) => (
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
                productDetails={product} // Add product details for modal
              />
            ))}
          </div>

          {/* Pagination Controls - Only shown when there are multiple pages */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-10 space-x-2">
              <Button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                variant="outline"
                className=" text-black hover:bg-gray-800 hover:border-white hover:text-white"
              >
                Previous
              </Button>

              {[...Array(totalPages)].map((_, index) => {
                const page = index + 1;
                return (
                  <Button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    variant={currentPage === page ? "default" : "outline"}
                    className={
                      currentPage === page
                        ? "bg-lime-400 text-black hover:bg-lime-300"
                        : " text-black hover:bg-gray-800 hover:border-white hover:text-white"
                    }
                  >
                    {page}
                  </Button>
                );
              })}

              <Button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                variant="outline"
                className=" text-black hover:bg-gray-800 hover:border-white hover:text-white"
              >
                Next
              </Button>
            </div>
          )}

          {/* View All Products Button - Leads to the full product catalog */}
          <div className="text-center mt-10 sm:mt-12">
            <Button
              asChild
              variant="outline"
              className="border-lime-400/50 text-lime-400 transition-all bg-transparent hover:bg-lime-400 hover:text-black hover:scale-105 text-sm h-12 px-6"
            >
              <Link href="/products">View All Products</Link>
            </Button>
          </div>
        </section>

        {/* <BrandMarquee /> */}
        <EcommerceFooter />
      </main>

      {/* Structured data scripts for SEO - Loaded after interactive for performance */}
      <Script
        id="products-structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productsStructuredData),
        }}
      />
      <Script
        id="page-structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageStructuredData) }}
      />
    </>
  );
}
