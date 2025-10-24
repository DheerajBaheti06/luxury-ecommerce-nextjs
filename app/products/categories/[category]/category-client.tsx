"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { ShoppingCart, Star, Filter, Search, ArrowLeft } from "lucide-react";
import { useCart } from "@/context/cart-context";
import ImagePlaceholder from "@/components/image-placeholder";
import { useWishlist } from "@/context/wishlist-context";
import { Heart } from "lucide-react";
import { ProductCard } from "@/components/product-card";

// Define the Product interface
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount?: number;
  image?: string;
  category: string;
  featured?: boolean;
}

// Mock product data
const allProducts = [
  {
    id: "1",
    name: "Premium 3D Render Service",
    description:
      "High-quality 3D renders perfect for product showcases and marketing materials",
    price: 299,
    originalPrice: 399,
    rating: 4.9,
    reviewCount: 124,
    image: "/images/product-1.png",
    category: "services",
    featured: true,
  },
  {
    id: "2",
    name: "3D Animation Package",
    description:
      "Complete 3D animation service for social media and advertising",
    price: 699,
    originalPrice: 899,
    rating: 4.8,
    reviewCount: 89,
    image: "/images/product-2.png",
    category: "services",
    featured: true,
  },
  {
    id: "3",
    name: "Custom 3D Modeling",
    description:
      "Professional 3D modeling for products, characters, and environments",
    price: 1099,
    originalPrice: 1299,
    rating: 4.7,
    reviewCount: 56,
    image: "/images/product-3.png",
    category: "services",
    featured: false,
  },
  {
    id: "4",
    name: "Social Media Bundle",
    description:
      "Complete package for social media content creation with 3D assets",
    price: 1599,
    originalPrice: 1999,
    rating: 4.9,
    reviewCount: 78,
    image: "/images/product-4.png",
    category: "bundles",
    featured: true,
  },
  {
    id: "5",
    name: "E-commerce Product Pack",
    description:
      "3D renders optimized for e-commerce platforms and online stores",
    price: 899,
    originalPrice: 1099,
    rating: 4.6,
    reviewCount: 42,
    image: "/images/product-5.png",
    category: "bundles",
    featured: false,
  },
  {
    id: "6",
    name: "Architectural Visualization",
    description:
      "Professional 3D architectural renders for real estate and construction",
    price: 1999,
    originalPrice: 2499,
    rating: 4.8,
    reviewCount: 31,
    image: "/images/product-6.png",
    category: "specialized",
    featured: false,
  },
];

const categoryInfo = {
  services: {
    name: "Services",
    description: "Professional 3D services for all your business needs",
  },
  bundles: {
    name: "Bundles",
    description: "Complete packages for comprehensive 3D solutions",
  },
  specialized: {
    name: "Specialized",
    description: "Industry-specific 3D services for unique requirements",
  },
};

export default function CategoryClientPage({
  initialProducts,
  category,
}: {
  initialProducts: Product[];
  category: string;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const { addItem } = useCart();
  const { addItem: addWishlistItem, isInWishlist } = useWishlist();

  const filteredProducts = initialProducts.filter((product) => {
    return (
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "featured":
      default:
        return b.featured === a.featured ? 0 : b.featured ? -1 : 1;
    }
  });

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
  };

  const handleToggleWishlist = (product: Product) => {
    addWishlistItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      description: product.description,
      rating: product.rating,
    });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8 sm:px-6 sm:py-12">
        <div className="mb-8 sm:mb-10 text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {category.charAt(0).toUpperCase() + category.slice(1)}{" "}
            <span className="text-lime-400">Products</span>
          </h1>
          <p className="text-gray-400 max-w-lg mx-auto text-sm sm:text-base mt-2">
            Explore our collection of {category} products
          </p>
        </div>

        {/* Filters and Sorting */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="flex flex-wrap gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-48">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-gray-700 bg-gray-900 py-2 pl-10 pr-4 text-sm text-white placeholder-gray-400 focus:border-lime-400 focus:outline-none"
              />
            </div>

            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-gray-900 border border-gray-700 rounded-lg py-2 pl-3 pr-8 text-sm text-white focus:border-lime-400 focus:outline-none"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
              <Filter className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {sortedProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400">
              No products found matching your criteria.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
            {sortedProducts.map((product) => (
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
                showViewButton={true}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
