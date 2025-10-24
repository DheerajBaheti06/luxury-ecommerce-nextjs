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
import {
  Star,
  ShoppingCart,
  ArrowLeft,
  CheckCircle,
  Plus,
  Minus,
  Heart,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";
import { useCart } from "@/context/cart-context";
import { useWishlist } from "@/context/wishlist-context";
import ImagePlaceholder from "@/components/image-placeholder";

// Define a flexible product type
interface ProductDetailStandardProps {
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
}

// Mock reviews data - in a real app, this would come from an API
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
  {
    id: 3,
    userName: "Taylor Smith",
    rating: 5,
    date: "2023-08-30",
    title: "Highly recommend!",
    comment:
      "Best purchase I've made this year. The quality is outstanding and it works perfectly.",
    helpful: 32,
    notHelpful: 0,
  },
];

// Mock suggestions data - in a real app, this would come from an API
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
  {
    id: "103",
    name: "Portable Phone Charger",
    price: 39,
    originalPrice: 59,
    rating: 4.7,
    image:
      "https://images.pexels.com/photos/2659939/pexels-photo-2659939.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: "104",
    name: "Designer Leather Wallet",
    price: 49,
    originalPrice: 79,
    rating: 4.6,
    image:
      "https://images.pexels.com/photos/205740/pexels-photo-205740.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
];

export function ProductDetailStandard({ product }: ProductDetailStandardProps) {
  const { addItem: addToCart } = useCart();
  const { addItem: addToWishlist, isInWishlist, removeItem } = useWishlist();
  const [quantity, setQuantity] = useState(1);
  const [isWishlistLoading, setIsWishlistLoading] = useState(false);

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

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="container mx-auto px-4 py-8">
        <Button
          asChild
          variant="ghost"
          className="mb-6 text-gray-600 hover:text-black"
        >
          <Link href="/products">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div>
            <div className="relative aspect-square overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
              <ImagePlaceholder
                src={product.image || "/images/placeholder-product.svg"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.originalPrice &&
                product.originalPrice > product.price && (
                  <div className="absolute top-4 right-4 bg-lime-500 text-black text-sm font-bold px-3 py-1 rounded-full">
                    SAVE ${product.originalPrice - product.price}
                  </div>
                )}
              {product.featured && (
                <div className="absolute top-4 left-4 bg-gradient-to-br from-yellow-400 to-orange-400 text-black text-sm font-bold px-3 py-1 rounded-full">
                  FEATURED
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-4">
              <span className="inline-block bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full mb-3">
                {product.category}
              </span>
              <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
              <p className="text-gray-600 mb-6">{product.description}</p>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  {renderStars(product.rating)}
                  <span className="font-semibold ml-2">{product.rating}</span>
                  {product.reviewCount && (
                    <span className="text-gray-500 ml-1">
                      ({product.reviewCount} reviews)
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-4 mb-8">
                <span className="text-3xl font-bold text-lime-500">
                  ${product.price}
                </span>
                {product.originalPrice &&
                  product.originalPrice > product.price && (
                    <span className="text-gray-500 line-through text-lg">
                      ${product.originalPrice}
                    </span>
                  )}
              </div>
            </div>

            {/* Features */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Key Features</h2>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-lime-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center border border-gray-300 rounded-lg">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={decrementQuantity}
                  className="h-10 w-10 rounded-r-none hover:bg-gray-100"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="px-4 py-2">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={incrementQuantity}
                  className="h-10 w-10 rounded-l-none hover:bg-gray-100"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <Button
                onClick={handleAddToCart}
                className="flex-1 bg-lime-500 text-black hover:bg-lime-400 min-w-[200px]"
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart - ${(product.price * quantity).toFixed(2)}
              </Button>

              <Button
                onClick={handleToggleWishlist}
                disabled={isWishlistLoading}
                variant="outline"
                className="border-lime-500/50 text-lime-600 hover:bg-lime-500 hover:text-black"
              >
                <Heart
                  className={`mr-2 h-5 w-5 ${
                    isInWishlist(product.id) ? "fill-red-500 text-red-500" : ""
                  }`}
                />
                {isInWishlist(product.id)
                  ? "Remove from Wishlist"
                  : "Add to Wishlist"}
              </Button>
            </div>

            {/* Product Details */}
            <Card className="border border-gray-200 bg-white shadow-sm">
              <CardHeader className="pb-3">
                <h3 className="font-semibold">Product Details</h3>
              </CardHeader>
              <CardContent>
                <dl className="grid grid-cols-2 gap-4">
                  {Object.entries(product.details).map(([key, value]) => (
                    <div
                      key={key}
                      className="border-b border-gray-200 pb-3 last:border-0 last:pb-0"
                    >
                      <dt className="text-sm text-gray-500">{key}</dt>
                      <dd className="font-medium text-gray-800">
                        {String(value)}
                      </dd>
                    </div>
                  ))}
                </dl>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>

          {/* Review Summary */}
          <Card className="border border-gray-200 bg-white shadow-sm mb-8">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Rating Summary</h3>
                <Button className="bg-lime-500 text-black hover:bg-lime-400">
                  Write a Review
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex flex-col items-center justify-center bg-gray-50 p-6 rounded-lg">
                  <div className="text-5xl font-bold">{product.rating}</div>
                  <div className="flex mt-2">{renderStars(product.rating)}</div>
                  <div className="text-gray-500 mt-2">
                    {product.reviewCount} reviews
                  </div>
                </div>

                <div className="flex-1">
                  {[5, 4, 3, 2, 1].map((star) => (
                    <div key={star} className="flex items-center mb-2">
                      <span className="w-10 text-sm">{star} star</span>
                      <div className="flex-1 mx-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-yellow-400"
                          style={{
                            width: `${
                              star === 5
                                ? 70
                                : star === 4
                                ? 20
                                : star === 3
                                ? 5
                                : star === 2
                                ? 3
                                : 2
                            }%`,
                          }}
                        ></div>
                      </div>
                      <span className="w-10 text-sm text-right">
                        {star === 5
                          ? 70
                          : star === 4
                          ? 20
                          : star === 3
                          ? 5
                          : star === 2
                          ? 3
                          : 2}
                        %
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Individual Reviews */}
          <div className="space-y-6">
            {mockReviews.map((review) => (
              <Card
                key={review.id}
                className="border border-gray-200 bg-white shadow-sm"
              >
                <CardHeader className="pb-3">
                  <div className="flex justify-between">
                    <div>
                      <h4 className="font-semibold">{review.title}</h4>
                      <div className="flex items-center mt-1">
                        <div className="flex">{renderStars(review.rating)}</div>
                        <span className="ml-2 text-sm text-gray-500">
                          {review.userName}
                        </span>
                        <span className="mx-2 text-gray-300">•</span>
                        <span className="text-sm text-gray-500">
                          {review.date}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">{review.comment}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <span>Was this review helpful?</span>
                    <Button variant="ghost" size="sm" className="ml-2">
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      {review.helpful}
                    </Button>
                    <Button variant="ghost" size="sm">
                      <ThumbsDown className="h-4 w-4 mr-1" />
                      {review.notHelpful}
                    </Button>
                    <Button variant="ghost" size="sm" className="ml-2">
                      Report
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Suggestions Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">
            Frequently Bought Together
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockSuggestions.map((suggestion) => (
              <Card
                key={suggestion.id}
                className="border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <CardContent className="p-4">
                  <div className="aspect-square overflow-hidden rounded-lg mb-3">
                    <ImagePlaceholder
                      src={suggestion.image}
                      alt={suggestion.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-medium text-sm mb-1 line-clamp-2">
                    {suggestion.name}
                  </h3>
                  <div className="flex items-center mb-2">
                    <div className="flex">{renderStars(suggestion.rating)}</div>
                    <span className="text-xs text-gray-500 ml-1">
                      ({suggestion.rating})
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold">${suggestion.price}</span>
                      {suggestion.originalPrice &&
                        suggestion.originalPrice > suggestion.price && (
                          <span className="text-xs text-gray-500 line-through ml-1">
                            ${suggestion.originalPrice}
                          </span>
                        )}
                    </div>
                    <Button size="sm" variant="outline" className="text-xs">
                      Add
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailStandard;
