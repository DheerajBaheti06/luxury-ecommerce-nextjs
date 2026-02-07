"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product-card";
import { Watch, Music, PenTool, Cpu, Armchair, Car } from "lucide-react";

const categoryData = [
  { id: "Horology", name: "Horology", icon: Watch, color: "bg-amber-500" },
  { id: "Acoustic Art", name: "Acoustic Art", icon: Music, color: "bg-rose-500" },
  { id: "Executive Wear", name: "Executive Wear", icon: PenTool, color: "bg-slate-500" },
  { id: "Future Tech", name: "Future Tech", icon: Cpu, color: "bg-cyan-500" },
  { id: "Home Elegance", name: "Home Elegance", icon: Armchair, color: "bg-emerald-500" },
  { id: "Automotive", name: "Automotive", icon: Car, color: "bg-red-500" },
];

export function HomeProductGrid({ initialProducts }: { initialProducts: any[] }) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  // Reset page to 1 when changing categories to avoid empty screens
  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
  };

  // Memoize filtering for performance
  const filteredProducts = useMemo(() => {
    return selectedCategory === "all"
      ? initialProducts
      : initialProducts.filter((p) => p.category?.name === selectedCategory);
  }, [selectedCategory, initialProducts]);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Category Section */}
      <section className="container mx-auto px-4 py-8 sm:py-10">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl mb-2">
            Curated <span className="text-lime-400">Collections</span>
          </h2>
          <p className="text-gray-400 max-w-lg mx-auto text-sm sm:text-base">
            Browse our wide range of premium assets across all categories
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-12">
          {categoryData.map((category) => {
            const IconComponent = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`group flex flex-col items-center justify-center p-4 rounded-xl bg-gray-900/50 border transition-all duration-300 hover:-translate-y-1 ${
                  selectedCategory === category.id
                    ? "border-lime-400 bg-lime-400/5"
                    : "border-gray-800 hover:border-lime-400/50 hover:bg-gray-900/70"
                }`}
              >
                <div className={`p-3 rounded-full ${category.color} mb-3 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-sm font-medium text-center text-gray-200 group-hover:text-lime-400 transition-colors">
                  {category.name}
                </h3>
              </button>
            );
          })}
          <button
            onClick={() => handleCategoryChange("all")}
            className={`group flex flex-col items-center justify-center p-4 rounded-xl bg-gray-900/50 border transition-all duration-300 hover:-translate-y-1 ${
              selectedCategory === "all" ? "border-lime-400 bg-lime-400/5" : "border-gray-800 hover:border-lime-400/50 hover:bg-gray-900/70"
            }`}
          >
            <div className="p-3 rounded-full bg-gray-700 mb-3 group-hover:scale-110 transition-transform duration-300">
              <span className="text-white font-bold px-1">ALL</span>
            </div>
            <span className="text-sm font-medium text-center text-gray-200 group-hover:text-lime-400">View All</span>
          </button>
        </div>
      </section>

      {/* Featured Products Section */}
      <section id="products" className="container mx-auto px-4 py-12 sm:px-6 sm:py-16 relative">
        <div className="text-center mb-10 sm:mb-12">
          <div className="inline-flex items-center justify-center mb-2">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mx-4">
              Exquisite <span className="text-lime-400">Selections</span>
            </h2>
          </div>
          <p className="text-gray-400 max-w-lg mx-auto text-sm sm:text-base"> 
            Check out our exclusive products that our clients love.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 sm:gap-6 items-center justify-center w-full">
          {currentProducts.length > 0 ? (
            currentProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.title}
                description={product.description}
                price={(product.discountPrice || product.price).toString()}
                originalPrice={product.discountPrice ? product.price.toString() : undefined}
                rating={product.ratingsAverage}
                image={product.images?.[0] || product.image}
                featured={product.ratingsAverage > 4.8}
                showWishlistButton
                showAddToCartButton
                showViewButton
                productDetails={product}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-20">
              <p className="text-gray-400 text-lg">No products found in this category.</p>
              <Button variant="link" onClick={() => handleCategoryChange("all")} className="text-lime-400 mt-2">
                View all products
              </Button>
            </div>
          )}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-10 space-x-2">
            <Button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              variant="outline"
              className={`cursor-pointer text-black hover:bg-gray-800 hover:border-white hover:text-white ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              Previous
            </Button>

            {[...Array(totalPages)].map((_, index) => {
              const page = index + 1;
              if (totalPages > 5 && Math.abs(currentPage - page) > 2) return null;

              return (
                <Button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  variant={currentPage === page ? "default" : "outline"}
                  className={`cursor-pointer w-8 h-8 p-0 ${
                    currentPage === page ? "bg-lime-400 text-black" : "text-black hover:bg-gray-800 hover:border-white hover:text-white"
                  }`}
                >
                  {page}
                </Button>
              );
            })}
            <Button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              variant="outline"
              className="cursor-pointer text-black hover:bg-gray-800 hover:border-white hover:text-white"
            >
              Next
            </Button>
          </div>
        )}

        <div className="text-center mt-10 sm:mt-12">
          <Button asChild variant="outline" className="border-lime-400/50 text-lime-400 bg-transparent hover:bg-lime-400 hover:text-black text-sm h-12 px-6">
            <Link href="/products">View Full Catalog</Link>
          </Button>
        </div>
      </section>
    </>
  );
}