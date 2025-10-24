"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { products } from "@/lib/products";
import ProductDetailStandard from "@/components/product-detail-standard";

export default function ProductDetailClientPage({
  params,
}: {
  params: { id: string };
}) {
  // Debug logging
  console.log("ProductDetailClientPage params:", params);

  // Additional debugging with useEffect
  useEffect(() => {
    console.log("ProductDetailClientPage useEffect params:", params);
  }, [params]);

  // Ensure we have a valid ID
  if (!params || !params.id) {
    return (
      <div className="min-h-screen bg-white text-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="text-gray-600">No product ID provided</p>
          <Button asChild className="mt-4">
            <Link href="/products">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Products
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const productId = params.id;
  console.log("Looking for product with ID:", productId);
  console.log(
    "Available products:",
    products.map((p) => p.id)
  );

  // More robust product lookup with safety checks and better comparison
  const product = products.find((p) => {
    const match = String(p.id) === String(productId);
    console.log(
      `Comparing product ID ${p.id} with param ID ${productId}: ${match}`
    );
    return match;
  });

  if (!product) {
    return (
      <div className="min-h-screen bg-white text-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-2">ID: {productId}</p>
          <p className="text-gray-500 text-sm mb-4">
            Available IDs: {products.map((p) => p.id).join(", ")}
          </p>
          <Button asChild>
            <Link href="/products">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Products
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  console.log("Found product:", product);
  // Type assertion to match the expected prop type
  return <ProductDetailStandard product={product as any} />;
}
