"use client";

import { useState, useCallback, useTransition } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product-card";
import { Filter, Search, X } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { useWishlist } from "@/context/wishlist-context";

// We'll pass the categories from server to avoid hardcoding or double-fetching
interface Category {
  id: string;
  name: string;
}

interface ProductGridClientProps {
  products: any[];
  categories: Category[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export function ProductGridClient({
  products,
  categories,
  pagination,
}: ProductGridClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  // Local state for immediate UI feedback (optional, but good for search inputs)
  const initialSearch = searchParams.get("search") || "";
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [sortBy, setSortBy] = useState(searchParams.get("sort") || "latest");

  const { addItem } = useCart();
  const { addItem: addWishlistItem } = useWishlist();

  // Helper to update URL params
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }

      // Reset to page 1 when filtering/searching
      if (name !== "page") {
        params.set("page", "1");
      }

      return params.toString();
    },
    [searchParams],
  );

  const handleSearch = (term: string) => {
    setSearchQuery(term);
    // Debounce this in a real app, strict handling for now
    startTransition(() => {
      router.push(pathname + "?" + createQueryString("search", term));
    });
  };

  const handleCategoryChange = (categoryId: string) => {
    startTransition(() => {
      router.push(
        pathname +
          "?" +
          createQueryString("category", categoryId === "all" ? "" : categoryId),
      );
    });
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    startTransition(() => {
      router.push(pathname + "?" + createQueryString("sort", value));
    });
  };

  const handlePageChange = (page: number) => {
    startTransition(() => {
      router.push(pathname + "?" + createQueryString("page", page.toString()));
    });
  };

  const handleAddToCart = (product: any) => {
    addItem({
      id: product.id,
      name: product.title || product.name || "Unknown Product",
      price:
        typeof product.price === "string"
          ? parseFloat(product.price)
          : product.price,
      image: product.images?.[0] || product.image,
    });
  };

  const handleToggleWishlist = (product: any) => {
    addWishlistItem({
      id: product.id,
      name: product.title || product.name || "Unknown Product",
      price:
        typeof product.price === "string"
          ? parseFloat(product.price)
          : product.price,
      image: product.images?.[0] || product.image,
      description: product.description,
      rating: product.ratingsAverage || product.rating || 0,
    });
  };

  const currentCategory = searchParams.get("category") || "all";

  return (
    <div
      className="w-full px-4 py-8 sm:px-6 max-w-7xl mx-auto"
      data-products-container
    >
      {/* Heading */}
      <div className="mb-8 sm:mb-10 text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl text-white/80">
          Our <span className="text-lime-400">Products</span>
        </h1>
        <p className="text-gray-400 max-w-lg mx-auto text-sm sm:text-base mt-2">
          Discover our premium collection of luxury items.
        </p>
      </div>

      {/* Filters and Sorting */}
      <div className="mb-8 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="flex flex-wrap gap-2">
          <Button
            variant={currentCategory === "all" ? "default" : "outline"}
            onClick={() => handleCategoryChange("all")}
            className={
              currentCategory === "all"
                ? "bg-lime-400 text-black hover:bg-lime-300"
                : "text-black border-gray-700 hover:bg-lime-600"
            }
          >
            All Products
          </Button>
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={
                currentCategory === category.name ? "default" : "outline"
              } // Ensure this matches how we query. Using name for URL prettiness? Or ID? Let's use name.
              onClick={() => handleCategoryChange(category.name)}
              className={
                currentCategory === category.name
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
            {searchQuery ? (
              <X
                className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-white"
                onClick={() => handleSearch("")}
              />
            ) : (
              <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
            )}
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch(searchQuery);
              }}
              onBlur={() => handleSearch(searchQuery)}
              className="w-full rounded-lg border border-gray-700 bg-gray-900 py-2 pl-4 pr-10 text-sm text-white placeholder-gray-400 focus:border-lime-400 focus:outline-none"
            />
          </div>

          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
              className="appearance-none bg-gray-900 border border-gray-700 rounded-lg py-2 pl-3 pr-8 text-sm text-white focus:border-lime-400 focus:outline-none cursor-pointer"
            >
              <option value="latest">Latest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
            <Filter className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Loading Overlay */}
      {isPending && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-[1px] pointer-events-none">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-lime-400 border-t-transparent"></div>
        </div>
      )}

      {/* Products Grid */}
      {products.length === 0 ? (
        <div className="text-center py-20 bg-gray-900/30 rounded-2xl border border-gray-800">
          <p className="text-gray-400 text-lg mb-4">
            No products found matching your criteria.
          </p>
          <Button
            variant="link"
            onClick={() => {
              setSearchQuery("");
              handleCategoryChange("all");
            }}
            className="text-lime-400"
          >
            Clear Filters
          </Button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 sm:gap-6 items-center justify-center w-full min-h-[400px]">
            {products.map((product: any) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.title || product.name || "Unknown Product"}
                description={product.description}
                price={
                  typeof product.price === "string"
                    ? product.price
                    : product.price.toString()
                }
                originalPrice={
                  product.discountPrice
                    ? product.discountPrice.toString()
                    : product.price.toString()
                }
                rating={product.ratingsAverage || product.rating || 0}
                image={product.images?.[0] || product.image || ""}
                featured={product.ratingsAverage > 4.8}
                showViewButton={true}
                onAddToCart={() => handleAddToCart(product)}
                onWishlistToggle={() => handleToggleWishlist(product)}
                productDetails={product}
                showAddToCartButton={true}
                showWishlistButton={true}
              />
            ))}
          </div>

          {/* Pagination Controls */}
          {pagination.totalPages > 1 && (
            <div className="flex flex-wrap justify-center items-center mt-12 gap-2">
              <Button
                onClick={() => handlePageChange(pagination.page - 1)}
                disabled={pagination.page === 1 || isPending}
                variant="outline"
                className="bg-black border-gray-700 text-white hover:bg-gray-800 hover:text-lime-400 px-3 py-2 text-sm"
              >
                Previous
              </Button>

              {/* Numbered Pages */}
              {[...Array(pagination.totalPages)].map((_, index) => {
                const page = index + 1;
                // Simple windowing logic
                if (
                  page === 1 ||
                  page === pagination.totalPages ||
                  (page >= pagination.page - 1 && page <= pagination.page + 1)
                ) {
                  return (
                    <Button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      disabled={isPending}
                      variant={pagination.page === page ? "default" : "outline"}
                      className={
                        pagination.page === page
                          ? "bg-lime-400 text-black hover:bg-lime-300 w-10 h-10 p-0"
                          : "bg-black border-gray-700 text-white hover:bg-gray-800 hover:text-lime-400 w-10 h-10 p-0"
                      }
                    >
                      {page}
                    </Button>
                  );
                } else if (
                  (page === pagination.page - 2 && pagination.page > 3) ||
                  (page === pagination.page + 2 &&
                    pagination.page < pagination.totalPages - 2)
                ) {
                  return (
                    <span key={page} className="text-gray-500">
                      ...
                    </span>
                  );
                }
                return null;
              })}

              <Button
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={
                  pagination.page === pagination.totalPages || isPending
                }
                variant="outline"
                className="bg-black border-gray-700 text-white hover:bg-gray-800 hover:text-lime-400 px-3 py-2 text-sm"
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
