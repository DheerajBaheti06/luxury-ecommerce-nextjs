"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

import { Filter, Search } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { useWishlist } from "@/context/wishlist-context";
import { ProductCard } from "@/components/product-card";
import { products } from "@/lib/products"; // Use the centralized product data

const categories = [
  { id: "all", name: "All Products" },
  { id: "electronics", name: "Electronics" },
  { id: "fashion", name: "Fashion" },
  { id: "home", name: "Home & Kitchen" },
  { id: "accessories", name: "Accessories" },
  { id: "laptops", name: "Laptops" },
  { id: "audio", name: "Audio" },
  { id: "gaming", name: "Gaming" },
  { id: "cameras", name: "Cameras" },
];

export default function ProductsClientPage() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8; // Show 8 products per page
  const { addItem } = useCart();
  const { addItem: addWishlistItem, isInWishlist } = useWishlist();

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "all" ||
      product.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
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

  const handleAddToCart = (product: (typeof products)[0]) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
  };

  const handleToggleWishlist = (product: (typeof products)[0]) => {
    addWishlistItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      description: product.description,
      rating: product.rating,
    });
  };

  // Calculate pagination
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = sortedProducts.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of products grid
    document
      .querySelector(".container")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6">
      <div className="mb-8 sm:mb-10 text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl text-white/80">
          Our <span className="text-lime-400">Products</span>
        </h1>
        <p className="text-gray-400 max-w-lg mx-auto text-sm sm:text-base mt-2">
          Discover our premium collection of ecommerce products.
        </p>
      </div>

      {/* Filters and Sorting */}
      <div className="mb-8 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className={
                selectedCategory === category.id
                  ? "bg-lime-400 text-black hover:bg-lime-300"
                  : "text-black border-gray-700 hover:bg-lime-600"
              }
            >
              {category.name}
            </Button>
          ))}
        </div>

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
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 sm:gap-6">
            {currentProducts.map((product) => (
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
                onAddToCart={() => handleAddToCart(product)}
                onWishlistToggle={() => handleToggleWishlist(product)}
                productDetails={product} // Pass full product details for modal
              />
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-12 space-x-3">
              <Button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                variant="outline"
                className="border-gray-700 text-black-300 hover:bg-gray-800 hover:text-white px-4 py-2 text-sm"
              >
                Previous
              </Button>

              {[...Array(totalPages)].map((_, index) => {
                const page = index + 1;
                return (
                  <Button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    variant={currentPage === page ? "default" : "outline"}
                    className={
                      currentPage === page
                        ? "bg-lime-400 text-black hover:bg-lime-300 px-4 py-2 text-sm"
                        : "border-gray-700 text-black hover:bg-white/40 hover:text-white px-4 py-2 text-sm"
                    }
                  >
                    {page}
                  </Button>
                );
              })}

              <Button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                variant="outline"
                className="border-gray-700 text-black-300 hover:bg-gray-800 hover:text-white px-4 py-2 text-sm"
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
