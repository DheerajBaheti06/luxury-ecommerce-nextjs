"use client";

import { useCart } from "@/context/cart-context";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ShoppingCart, ArrowLeft, ArrowRight, ChevronDown } from "lucide-react";
import CartItem from "./cart-item";
import { CartItem as CartItemType } from "@/context/cart-context";
import { useState } from "react";

export default function CartPage() {
  const { items, getTotalItems, getTotalPrice } = useCart();
  const [isSummaryOpen, setIsSummaryOpen] = useState(true);

  // --- Empty Cart State ---
  if (items.length === 0) {
    return (
      <div className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-black px-4">
        <div className="mx-auto flex max-w-md flex-col items-center rounded-2xl bg-gray-900/80 p-8 text-center backdrop-blur-md shadow-2xl">
          <ShoppingCart className="mb-6 h-16 w-16 text-lime-400 animate-bounce" />
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Your Cart is Empty
          </h1>
          <p className="mt-4 mb-8 text-gray-300 text-sm sm:text-base">
            Looks like you haven’t added anything yet. Let’s find something
            you’ll love.
          </p>
          <Button
            asChild
            className="h-11 px-6 font-semibold text-gray-900 bg-gradient-to-br from-lime-400 to-green-400 hover:from-lime-300 hover:to-green-300 transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <Link href="/products">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Start Shopping
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  // --- Cart with Items ---
  return (
    
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
            Your Cart
          </h1>
          <div className="rounded-full bg-lime-400/10 px-4 py-1 text-sm font-medium text-lime-400 border border-lime-500/30">
            {getTotalItems()} {getTotalItems() === 1 ? "item" : "items"}
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          {/* Cart Items - Compact view */}
          <div className="space-y-3">
            {items.map((item: CartItemType) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          {/* Order Summary - Accordion */}
          <div className="sticky bottom-4 z-10 md:static md:z-auto">
            <Card className="border-lime-500/20 bg-gray-900/80 backdrop-blur-xl shadow-2xl md:rounded-2xl">
              <CardHeader
                className="cursor-pointer flex flex-row items-center justify-between"
                onClick={() => setIsSummaryOpen(!isSummaryOpen)}
              >
                <CardTitle className="text-lg font-semibold text-lime-400">
                  Order Summary
                </CardTitle>
                <ChevronDown
                  className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${
                    isSummaryOpen ? "rotate-180" : ""
                  }`}
                />
              </CardHeader>

              {/* Collapsible content */}
              <div className={`${isSummaryOpen ? "block" : "hidden"}`}>
                <CardContent className="space-y-3 py-4 md:py-6">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-gray-300">
                      <span>Subtotal</span>
                      <span className="font-semibold text-white">
                        ${getTotalPrice().toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-gray-300">
                      <span>Shipping</span>
                      <span className="text-lime-400 font-medium">Free</span>
                    </div>
                  </div>

                  <hr className="border-gray-800" />

                  <div className="flex justify-between text-white font-bold">
                    <span>Total</span>
                    <span className="text-lime-400 text-lg">
                      ${getTotalPrice().toFixed(2)}
                    </span>
                  </div>
                </CardContent>

                <CardFooter className="flex flex-col gap-3 pb-4 md:pb-6">
                  <Button
                    asChild
                    className="h-11 w-full font-bold text-gray-900 bg-gradient-to-br from-lime-400 to-green-400 hover:from-lime-300 hover:to-green-300 transition-all duration-300 hover:scale-105"
                  >
                    <Link href="/checkout">
                      Proceed to Checkout
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>

                  <Button
                    asChild
                    variant="outline"
                    className=" border-gray-700 text-black hover:font-bold bg-white/60 hover:bg-white hover:scale-105"
                  >
                    <Link href="/products">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Continue Shopping
                    </Link>
                  </Button>
                </CardFooter>
              </div>
            </Card>
          </div>
        </div>
      </div>
  );
}
