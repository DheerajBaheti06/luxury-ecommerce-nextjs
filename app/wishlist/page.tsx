"use client";

import { useWishlist } from "@/context/wishlist-context";
import { useCart } from "@/context/cart-context";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { ShoppingCart, Heart, X, ArrowLeft } from "lucide-react";
import ImagePlaceholder from "@/components/image-placeholder";
import { ProductCard } from "@/components/product-card";

export default function WishlistPage() {
  const { items: wishlistItems, removeItem } = useWishlist();
  const { addItem: addToCart } = useCart();

  const handleRemoveFromWishlist = (id: string) => {
    removeItem(id);
  };

  const handleAddToCart = (item: (typeof wishlistItems)[0]) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
    });
    // Optionally remove from wishlist after adding to cart
    // removeItem(item.id);
  };

  return (
    <div className="min-h-screen bg-black/30 text-white py-6 sm:py-8">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="mb-6 sm:mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-1 sm:mb-2">
              Your <span className="text-lime-400">Wishlist</span>
            </h1>
            <p className="text-gray-400 text-sm sm:text-base">
              {wishlistItems.length > 0
                ? "Your favorite items are saved here"
                : "Your wishlist is empty"}
            </p>
          </div>
          <Button asChild variant="outline" className="border-gray-700  bg-gray-800 hover:bg-gray-900 text-white hover:text-white">
            <Link href="/products">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Products
            </Link>
          </Button>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="h-16 w-16 text-white mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">
              Your wishlist is empty
            </h3>
            <p className="text-gray-400 mb-6">
              Start adding items to your wishlist
            </p>
            <Button asChild className="bg-gray-600 hover:bg-gray-700 text-white">
              <Link href="/products">Browse Products</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
            {wishlistItems.map((item) => (
              <ProductCard
                key={item.id}
                id={item.id}
                name={item.name}
                description={item.description || "Premium 3D service"}
                price={item.price}
                image={item.image}
                rating={item.rating || 0}
                showWishlistButton={true}
                showAddToCartButton={true}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}