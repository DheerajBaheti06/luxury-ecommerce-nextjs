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

import CategoryClientPage from "./category-client";

export default function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  return <CategoryClientPage params={params} />;
}
