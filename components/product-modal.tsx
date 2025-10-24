"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  X,
  Star,
  ShoppingCart,
  Plus,
  Minus,
  Heart,
  CheckCircle,
  Info,
  Package,
  FileText,
  MessageCircle,
} from "lucide-react";
import { useCart } from "@/context/cart-context";
import { useWishlist } from "@/context/wishlist-context";
import ImagePlaceholder from "@/components/image-placeholder";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface ProductModalProps {
  product: {
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
    features: string[];
    details: { [key: string]: any };
  };
  onClose: () => void;
}

// Mock reviews data
const mockReviews = [
  {
    id: 1,
    userName: "Alex Johnson",
    rating: 5,
    date: "2023-10-15",
    title: "Excellent product!",
    comment:
      "This product exceeded my expectations. Great quality and fast delivery.",
    helpful: 24,
    notHelpful: 2,
  },
  {
    id: 2,
    userName: "Sam Wilson",
    rating: 4,
    date: "2023-09-22",
    title: "Good value for money",
    comment:
      "Overall satisfied with the purchase. Minor issues with packaging but product is fine.",
    helpful: 18,
    notHelpful: 1,
  },
];

// Mock suggestions data
const mockSuggestions = [
  {
    id: "101",
    name: "Wireless Bluetooth Earbuds",
    price: 89,
    originalPrice: 129,
    rating: 4.5,
    image:
      "https://images.pexels.com/photos/3781527/pexels-photo-3781527.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: "102",
    name: "Smart Fitness Tracker",
    price: 79,
    originalPrice: 119,
    rating: 4.3,
    image:
      "https://images.pexels.com/photos/267394/pexels-photo-267394.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
];

export function ProductModal({ product, onClose }: ProductModalProps) {
  const { addItem: addToCart } = useCart();
  const { addItem: addToWishlist, isInWishlist, removeItem } = useWishlist();
  const [quantity, setQuantity] = useState(1);
  const [isWishlistLoading, setIsWishlistLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const incrementQuantity = () => setQuantity((q) => q + 1);
  const decrementQuantity = () => setQuantity((q) => Math.max(1, q - 1));

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      });
    }
  };

  const handleToggleWishlist = () => {
    setIsWishlistLoading(true);
    if (isInWishlist(product.id)) {
      removeItem(product.id);
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      });
    }
    setTimeout(() => setIsWishlistLoading(false), 300);
  };

  // Function to render star ratings
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating)
            ? "fill-yellow-400 text-yellow-400"
            : "text-gray-300"
        }`}
      />
    ));
  };

  // Function to handle clicks outside the modal content
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Close modal on Escape key press
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div
        className="relative w-full h-full sm:h-auto sm:max-w-4xl sm:max-h-[90vh] overflow-y-auto bg-gray-900 rounded-none sm:rounded-xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button - made sticky */}
        <button
          onClick={onClose}
          className="sticky top-4 right-4 z-10 rounded-full bg-black/60 backdrop-blur-sm p-2 hover:bg-lime-400/20 transition-colors ml-auto block"
          aria-label="Close"
        >
          <X className="h-5 w-5 text-white" />
        </button>

        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Product Image */}
            <div>
              <div className="relative aspect-square overflow-hidden rounded-lg sm:rounded-2xl border border-white/10 shadow-sm">
                <ImagePlaceholder
                  src={product.image || "/images/placeholder-product.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.originalPrice &&
                  product.originalPrice > product.price && (
                    <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-gradient-to-br from-lime-400 to-green-400 text-black text-xs sm:text-sm font-bold px-2 py-1 rounded-full shadow-sm">
                      SAVE ${product.originalPrice - product.price}
                    </div>
                  )}
                {product.featured && (
                  <div className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-gradient-to-br from-yellow-400 to-orange-400 text-black text-xs sm:text-sm font-bold px-2 py-1 rounded-full shadow-sm">
                    FEATURED
                  </div>
                )}
              </div>
            </div>

            {/* Product Info */}
            <div>
              <div className="mb-4">
                <span className="inline-block bg-black/40 text-white text-xs px-2 py-1 sm:px-3 sm:py-1 rounded-full mb-2 sm:mb-3">
                  {product.category}
                </span>
                <h1 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-white">
                  {product.name}
                </h1>
                <p className="text-gray-400 mb-3 sm:mb-4 text-sm">
                  {product.description}
                </p>

                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <div className="flex items-center gap-1">
                    {renderStars(product.rating)}
                    <span className="font-semibold text-sm sm:text-base ml-1 text-white">
                      {product.rating}
                    </span>
                  </div>
                  {product.reviewCount && (
                    <span className="text-gray-500 text-xs sm:text-sm">
                      ({product.reviewCount} reviews)
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                  <span className="text-xl sm:text-2xl font-bold text-lime-400">
                    ${product.price}
                  </span>
                  {product.originalPrice &&
                    product.originalPrice > product.price && (
                      <span className="text-gray-500 line-through text-sm sm:text-base">
                        ${product.originalPrice}
                      </span>
                    )}
                </div>
              </div>

              {/* Quantity and Add to Cart */}
              <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="flex items-center border border-white/10 rounded-lg bg-black/20">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={decrementQuantity}
                    className="h-8 w-8 sm:h-9 sm:w-9 rounded-r-none hover:bg-lime-400/20"
                  >
                    <Minus className="h-4 w-4 text-white" />
                  </Button>
                  <span className="px-2 sm:px-3 py-1 text-sm sm:text-base text-white">
                    {quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={incrementQuantity}
                    className="h-8 w-8 sm:h-9 sm:w-9 rounded-l-none hover:bg-lime-400/20"
                  >
                    <Plus className="h-4 w-4 text-white" />
                  </Button>
                </div>

                <Button
                  onClick={handleAddToCart}
                  className="flex-1 bg-gradient-to-br from-lime-400 to-green-400 text-black hover:from-lime-300 hover:to-green-300 text-sm sm:text-base h-8 sm:h-9 shadow-sm hover:shadow"
                >
                  <ShoppingCart className="mr-1.5 h-4 w-4" />
                  Add to Cart - ${(product.price * quantity).toFixed(2)}
                </Button>

                <Button
                  onClick={handleToggleWishlist}
                  disabled={isWishlistLoading}
                  variant="outline"
                  size="icon"
                  className="border-lime-400/50 text-lime-400 hover:bg-lime-400/20 h-8 w-8 sm:h-9 sm:w-9"
                >
                  <Heart
                    className={`h-4 w-4 ${
                      isInWishlist(product.id)
                        ? "fill-red-500 text-red-500"
                        : "text-lime-400"
                    }`}
                  />
                </Button>
              </div>
            </div>
          </div>

          {/* Tabbed Navigation - Simplified for mobile */}
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="mt-6 sm:mt-8"
          >
            <TabsList className="grid w-full grid-cols-4 bg-black/20">
              <TabsTrigger
                value="overview"
                className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm data-[state=active]:bg-lime-400/20 data-[state=active]:text-lime-400 text-gray-300"
              >
                <Info className="h-4 w-4" />
                <span className="hidden sm:inline">Overview</span>
                <span className="sm:hidden">Info</span>
              </TabsTrigger>
              <TabsTrigger
                value="features"
                className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm data-[state=active]:bg-lime-400/20 data-[state=active]:text-lime-400 text-gray-300"
              >
                <CheckCircle className="h-4 w-4" />
                <span className="hidden sm:inline">Features</span>
                <span className="sm:hidden">Feat</span>
              </TabsTrigger>
              <TabsTrigger
                value="details"
                className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm data-[state=active]:bg-lime-400/20 data-[state=active]:text-lime-400 text-gray-300"
              >
                <Package className="h-4 w-4" />
                <span className="hidden sm:inline">Details</span>
                <span className="sm:hidden">Specs</span>
              </TabsTrigger>
              <TabsTrigger
                value="reviews"
                className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm data-[state=active]:bg-lime-400/20 data-[state=active]:text-lime-400 text-gray-300"
              >
                <MessageCircle className="h-4 w-4" />
                <span className="hidden sm:inline">Reviews</span>
                <span className="sm:hidden">Rev</span>
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="mt-4 sm:mt-6">
              <Card className="border border-white/10 bg-gray-900/50 shadow-sm">
                <CardContent className="p-4 sm:p-6">
                  <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 text-white">
                    Product Description
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    {product.description}
                  </p>

                  <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 text-white">
                    Key Highlights
                  </h3>
                  <ul className="space-y-2">
                    {product.features.slice(0, 3).map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-lime-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Features Tab */}
            <TabsContent value="features" className="mt-4 sm:mt-6">
              <Card className="border border-white/10 bg-gray-900/50 shadow-sm">
                <CardContent className="p-4 sm:p-6">
                  <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-white">
                    Key Features
                  </h3>
                  <ul className="space-y-2 sm:space-y-3">
                    {product.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 sm:gap-3"
                      >
                        <CheckCircle className="h-4 w-4 text-lime-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Details Tab */}
            <TabsContent value="details" className="mt-4 sm:mt-6">
              <Card className="border border-white/10 bg-gray-900/50 shadow-sm">
                <CardContent className="p-4 sm:p-6">
                  <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-white">
                    Product Details
                  </h3>
                  <dl className="grid grid-cols-1 gap-2 sm:gap-4">
                    {Object.entries(product.details).map(([key, value]) => (
                      <div
                        key={key}
                        className="border-b border-white/10 pb-2 last:border-0 last:pb-0"
                      >
                        <dt className="text-xs sm:text-sm text-gray-500">
                          {key}
                        </dt>
                        <dd className="font-medium text-gray-300 text-sm">
                          {String(value)}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Reviews Tab */}
            <TabsContent value="reviews" className="mt-4 sm:mt-6">
              <Card className="border border-white/10 bg-gray-900/50 shadow-sm">
                <CardContent className="p-4 sm:p-6">
                  <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-white">
                    Customer Reviews
                  </h3>
                  <div className="space-y-4 sm:space-y-6">
                    {mockReviews.map((review) => (
                      <div
                        key={review.id}
                        className="border-b border-white/10 pb-4 last:border-0 last:pb-0"
                      >
                        <div className="flex justify-between">
                          <div>
                            <h4 className="font-semibold text-sm text-white">
                              {review.title}
                            </h4>
                            <div className="flex items-center mt-1">
                              <div className="flex">
                                {renderStars(review.rating)}
                              </div>
                              <span className="ml-2 text-xs text-gray-500">
                                {review.userName}
                              </span>
                              <span className="mx-1 sm:mx-2 text-gray-600">
                                •
                              </span>
                              <span className="text-xs text-gray-500">
                                {review.date}
                              </span>
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-400 mt-2 text-sm">
                          {review.comment}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Suggestions Section - Condensed for mobile */}
          <div className="mt-6 sm:mt-8">
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-white">
              You might also like
            </h3>
            <div className="grid grid-cols-1 gap-3 sm:gap-4">
              {mockSuggestions.map((suggestion) => (
                <Card
                  key={suggestion.id}
                  className="border border-white/10 bg-gray-900/50 shadow-sm hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-3 sm:p-4">
                    <div className="flex gap-3 sm:gap-4">
                      <div className="aspect-square w-16 sm:w-20 overflow-hidden rounded-lg">
                        <ImagePlaceholder
                          src={suggestion.image}
                          alt={suggestion.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm mb-1 line-clamp-2 text-white">
                          {suggestion.name}
                        </h4>
                        <div className="flex items-center mb-1">
                          <div className="flex">
                            {renderStars(suggestion.rating)}
                          </div>
                          <span className="text-xs text-gray-500 ml-1">
                            ({suggestion.rating})
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="font-bold text-sm text-lime-400">
                              ${suggestion.price}
                            </span>
                            {suggestion.originalPrice &&
                              suggestion.originalPrice > suggestion.price && (
                                <span className="text-xs text-gray-500 line-through ml-1">
                                  ${suggestion.originalPrice}
                                </span>
                              )}
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-6 px-2 text-xs border-lime-400/50 text-lime-400 hover:bg-lime-400/20"
                          >
                            Add
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductModal;
