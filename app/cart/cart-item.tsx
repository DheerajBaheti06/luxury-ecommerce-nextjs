"use client";

import { useCart } from "@/context/cart-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X, Plus, Minus, ShoppingCart } from "lucide-react";
import ImagePlaceholder from "@/components/image-placeholder";

interface CartItemProps {
  item: {
    id: string;
    name: string;
    price: number;
    image?: string;
    quantity: number;
  };
}

export default function CartItem({ item }: CartItemProps) {
  const { removeItem, updateQuantity, addItem } = useCart();

  const handleAddOne = () => updateQuantity(item.id, item.quantity + 1);
  const handleRemoveOne = () =>
    item.quantity > 1
      ? updateQuantity(item.id, item.quantity - 1)
      : removeItem(item.id);

  return (
    <Card className="relative border border-gray-800 bg-gray-900/60 backdrop-blur-md hover:border-lime-400/40 transition-all duration-300 rounded-xl shadow-lg">
      <CardContent className="p-3 sm:p-4">
        <div className="flex gap-3 sm:gap-4">
          {/* Product Image - Smaller on mobile */}
          <div className="relative aspect-square w-20 sm:w-24 rounded-lg overflow-hidden bg-gray-800 flex-shrink-0">
            <ImagePlaceholder
              src={item.image || "/images/placeholder-product.svg"}
              alt={item.name}
              className="w-full h-full"
              imgClassName="object-contain rounded-lg"
            />
          </div>

          {/* Product Info */}
          <div className="flex-1 flex flex-col justify-between min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <h3 className="font-semibold text-sm sm:text-base text-white leading-snug truncate">
                  {item.name}
                </h3>
                <p className="text-lime-400 font-semibold mt-1 text-sm">
                  ${item.price.toFixed(2)}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeItem(item.id)}
                className="text-gray-400 hover:text-white hover:bg-red-500/20 h-7 w-7 rounded-full transition-colors flex-shrink-0"
                aria-label="Remove item"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Quantity and Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-3 gap-2">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleRemoveOne}
                  className="h-7 w-10 rounded-md  bg-white text-black hover:bg-green-500"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-3.5 w-3.5" />
                </Button>
                <span className="w-8 text-center font-medium text-white text-sm">
                  {item.quantity}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleAddOne}
                  className="h-7 w-10 rounded-md  bg-white text-black hover:bg-lime-500"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-3.5 w-3.5" />
                </Button>
              </div>

              <p className="font-bold text-base text-lime-400">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
