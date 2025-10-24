
import type { Metadata } from "next";
import ProductsClientPage from "./products-client";

export const metadata: Metadata = {
  title: "Products | Skitbit - Professional 3D Services",
  description:
    "Browse our complete catalog of professional 3D services including renders, animations, and modeling.",
  keywords: [
    "3D products",
    "3D services",
    "3D rendering services",
    "3D animation services",
    "product visualization",
    "3D modeling",
  ],
  openGraph: {
    title: "Our 3D Services Catalog",
    description:
      "Professional 3D services for product visualization, animations, and marketing.",
  },
};

export default function ProductsPage() {
  return <ProductsClientPage />;
}

// Mock product data
const products = [
  {
    id: "1",
    name: "Premium 3D Render Service",
    description: "High-quality 3D renders perfect for product showcases and marketing materials",
    price: 299,
    originalPrice: 399,
    rating: 4.9,
    reviewCount: 124,
    image: "https://images.pexels.com/photos/164877/pexels-photo-164877.jpeg", // example product showcase image
    category: "services",
    featured: true,
  },
  {
    id: "2",
    name: "3D Animation Package",
    description: "Complete 3D animation service for social media and advertising",
    price: 699,
    originalPrice: 899,
    rating: 4.8,
    reviewCount: 89,
    image: "https://images.pexels.com/photos/267569/pexels-photo-267569.jpeg", // example animation workflow image
    category: "services",
    featured: true,
  },
  {
    id: "3",
    name: "Custom 3D Modeling",
    description: "Professional 3D modeling for products, characters, and environments",
    price: 1099,
    originalPrice: 1299,
    rating: 4.7,
    reviewCount: 56,
    image: "https://images.pexels.com/photos/256262/pexels-photo-256262.jpeg", // example 3D modeling workstation
    category: "services",
    featured: false,
  },
  {
    id: "4",
    name: "Social Media Bundle",
    description: "Complete package for social media content creation with 3D assets",
    price: 1599,
    originalPrice: 1999,
    rating: 4.9,
    reviewCount: 78,
    image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg", // example social media content creation
    category: "bundles",
    featured: true,
  },
  {
    id: "5",
    name: "E-commerce Product Pack",
    description: "3D renders optimized for e-commerce platforms and online stores",
    price: 899,
    originalPrice: 1099,
    rating: 4.6,
    reviewCount: 42,
    image: "https://images.pexels.com/photos/302769/pexels-photo-302769.jpeg", // example ecommerce product photo
    category: "bundles",
    featured: false,
  },
  {
    id: "6",
    name: "Architectural Visualization",
    description: "Professional 3D architectural renders for real estate and construction",
    price: 1999,
    originalPrice: 2499,
    rating: 4.8,
    reviewCount: 31,
    image: "https://images.pexels.com/photos/386015/pexels-photo-386015.jpeg", // example architectural visualization
    category: "specialized",
    featured: false,
  },
];


const categories = [
  { id: "all", name: "All Products" },
  { id: "services", name: "Services" },
  { id: "bundles", name: "Bundles" },
  { id: "specialized", name: "Specialized" },
];
