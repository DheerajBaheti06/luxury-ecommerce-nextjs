"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ShoppingCart, Star, Heart } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { useWishlist } from "@/context/wishlist-context";
import ImagePlaceholder from "@/components/image-placeholder";
import ProductModal from "@/components/product-modal";

// Define the props interface for type safety
interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount?: number;
  image?: string;
  featured?: boolean;
  showWishlistButton?: boolean;
  showAddToCartButton?: boolean;
  showViewButton?: boolean;
  onAddToCart?: () => void;
  onWishlistToggle?: () => void;
  productDetails?: any; // Add product details for modal
}

export function ProductCard({
  id,
  name,
  description,
  price,
  originalPrice,
  rating,
  image,
  featured,
  showWishlistButton = true,
  showAddToCartButton = true,
  showViewButton = true,
  onAddToCart,
  onWishlistToggle,
  productDetails,
}: ProductCardProps) {
  const { addItem: addToCart } = useCart();
  const { addItem: toggleWishlist, isInWishlist, removeItem } = useWishlist();
  const [isWishlistLoading, setIsWishlistLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Add effect to log when modal state changes
  useEffect(() => {
    // console.log("Modal state changed:", isModalOpen);
  }, [isModalOpen]);

  // Handle adding to cart
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent event from bubbling to the card click handler

    if (onAddToCart) {
      onAddToCart();
    } else {
      addToCart({ id, name, price, image });
    }

    // Add visual feedback
    const button = e.currentTarget as HTMLButtonElement;
    const originalText = button.innerHTML;
    button.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-1.5 h-4 w-4"><polyline points="20 6 9 17 4 12"></polyline></svg> Added!';
    button.classList.remove("from-lime-400", "to-green-400");
    button.classList.add("from-green-400", "to-emerald-400");

    setTimeout(() => {
      button.innerHTML = originalText;
      button.classList.remove("from-green-400", "to-emerald-400");
      button.classList.add("from-lime-400", "to-green-400");
    }, 1500);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlistLoading(true);

    if (onWishlistToggle) {
      onWishlistToggle();
    } else {
      if (isInWishlist(id)) {
        removeItem(id);
      } else {
        toggleWishlist({ id, name, price, image });
      }
    }
    setTimeout(() => setIsWishlistLoading(false), 300);
  };

  // Handle opening the modal
  const handleOpenModal = (e: React.MouseEvent) => {
    // Prevent opening modal if the click originated from a button
    const target = e.target as HTMLElement;

    // Check if the click originated from a button or any of its children
    if (target.closest("button")) {
      return;
    }

    // If we get here, it's a valid click to open the modal
    setIsModalOpen(true);
  };

  // Handle closing the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Card className="group relative flex flex-col overflow-hidden rounded-md border border-white/10 bg-gray-900/50 shadow-md transition-all duration-300 ease-in-out hover:border-lime-400/50 hover:shadow-lg hover:shadow-lime-500/10 hover:-translate-y-0.5">
        {/* --- Image Section --- */}
        <div className="relative aspect-[4/3] overflow-hidden px-2 pt-2">
          <ImagePlaceholder
            src={image || "/images/placeholder-product.svg"}
            alt={name}
            className="w-full h-full"
            imgClassName="object-contain transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* --- Badges Group (Top-Left) --- */}
        <div className="absolute top-2 left-2 z-10 flex flex-col items-start gap-y-1.5">
          {featured && (
            <div className="rounded-full bg-gradient-to-br from-yellow-400 to-orange-400 px-2 py-1 text-[10px] font-bold text-black shadow-sm">
              FEATURED
            </div>
          )}
          {originalPrice && originalPrice > price && (
            <div className="rounded-full bg-gradient-to-br from-lime-400 to-green-400 px-2 py-1 text-[10px] font-bold text-black shadow-sm">
              SAVE ${originalPrice - price}
            </div>
          )}
        </div>

        {/* --- Wishlist Button (Top-Right) --- */}
        {showWishlistButton && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 z-20 h-8 w-8 rounded-full bg-black/60 backdrop-blur-sm transition-colors duration-300 hover:bg-lime-400/20 wishlist-button"
            onClick={handleToggleWishlist}
            disabled={isWishlistLoading}
            aria-label="Add to wishlist"
          >
            <Heart
              className={`h-4 w-4 transition-all duration-300 ${
                isInWishlist(id) ? "fill-red-500 text-red-500" : "text-white"
              }`}
            />
          </Button>
        )}

        {/* --- Content Section --- */}
        <div className="flex flex-grow flex-col p-2 rounded-sm transition-all duration-300 ease-in-out relative">
          <div className="mb-1.5 flex items-start justify-between gap-1.5">
            <h3 className="text-sm font-bold leading-tight text-white line-clamp-2 transition-colors duration-300 group-hover:text-lime-400">
              {name}
            </h3>
            <div className="flex flex-shrink-0 items-center gap-1.5 rounded-full bg-black/40 px-1.5 py-1 z-10">
              <Star className="h-3 w-3 fill-lime-400 text-lime-400" />
              <span className="text-xs font-medium text-white">{rating}</span>
            </div>
          </div>
          <p className="mb-2 flex-grow text-xs leading-snug text-gray-400 line-clamp-2 transition-colors duration-300 group-hover:text-gray-300">
            {description}
          </p>
          <div className="mt-auto flex items-end justify-between pt-1">
            <div>
              <span className="text-base font-extrabold text-lime-400">
                ${price}
              </span>
              {originalPrice && originalPrice > price && (
                <span className="ml-1.5 text-xs text-gray-500 line-through">
                  ${originalPrice}
                </span>
              )}
            </div>
            {showAddToCartButton && (
              <Button
                onClick={handleAddToCart}
                className="h-8 text-xs font-bold text-gray-900 bg-gradient-to-br from-lime-400 to-green-400 hover:from-lime-300 hover:to-green-300 transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm hover:shadow relative z-20 px-3 add-to-cart-button"
              >
                <ShoppingCart className="mr-1.5 h-3.5 w-3.5" />
                Add to Cart
              </Button>
            )}
          </div>
        </div>

        {/* --- Main Clickable Area (Moved to the end with proper z-index) --- */}
        {showViewButton && (
          <div
            onClick={handleOpenModal}
            className="absolute inset-0 z-0 cursor-pointer"
            aria-label={`View details for ${name}`}
          />
        )}
      </Card>

      {/* Product Detail Modal */}
      {isModalOpen &&
        productDetails &&
        createPortal(
          <ProductModal product={productDetails} onClose={handleCloseModal} />,
          document.body
        )}
    </>
  );
}

export default ProductCard;
