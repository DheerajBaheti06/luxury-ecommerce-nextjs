// app/blog/page.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, User } from "lucide-react";

// Blog post data
const blogPosts = [
  {
    id: "1",
    title: "The Future of 3D Product Visualization in E-commerce",
    excerpt:
      "Discover how 3D product animations are revolutionizing the online shopping experience and driving conversion rates.",
    date: "2023-10-15",
    author: "Alex Morgan",
    category: "Technology",
    image:
      "https://images.pexels.com/photos/3747489/pexels-photo-3747489.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: "2",
    title: "5 Ways 3D Animation Boosts Product Engagement",
    excerpt:
      "Learn how interactive 3D models can increase customer engagement and reduce return rates.",
    date: "2023-09-22",
    author: "Sarah Johnson",
    category: "Marketing",
    image:
      "https://images.pexels.com/photos/3184461/pexels-photo-3184461.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: "3",
    title: "Creating Immersive Product Experiences",
    excerpt:
      "How brands are using 3D animation to create memorable shopping experiences that convert.",
    date: "2023-08-30",
    author: "Michael Chen",
    category: "Design",
    image:
      "https://images.pexels.com/photos/3747486/pexels-photo-3747486.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: "4",
    title: "The ROI of 3D Product Visualization",
    excerpt:
      "Measuring the return on investment for 3D product animations and interactive content.",
    date: "2023-07-18",
    author: "Emma Rodriguez",
    category: "Business",
    image:
      "https://images.pexels.com/photos/3747487/pexels-photo-3747487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: "5",
    title: "Best Practices for 3D Product Modeling",
    excerpt:
      "Essential techniques for creating high-quality 3D models that showcase your products effectively.",
    date: "2023-06-05",
    author: "David Kim",
    category: "Tutorial",
    image:
      "https://images.pexels.com/photos/3747490/pexels-photo-3747490.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: "6",
    title: "3D Animation Trends to Watch in 2024",
    excerpt:
      "Emerging technologies and techniques that will shape the future of 3D product visualization.",
    date: "2023-05-12",
    author: "Jessica Williams",
    category: "Trends",
    image:
      "https://images.pexels.com/photos/3747488/pexels-photo-3747488.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Get unique categories
  const categories = [
    "All",
    ...new Set(blogPosts.map((post) => post.category)),
  ];

  // Filter posts by category
  const filteredPosts =
    selectedCategory === "All"
      ? blogPosts
      : blogPosts.filter((post) => post.category === selectedCategory);

  return (
    <div className="min-h-screen text-white">
      {/* Hero Section */}
      <section className="relative py-20 px-6 md:px-12 lg:px-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text rom-lime-400">
            <span className="text-white">Our</span> Blog
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90">
            Insights, trends, and tips on 3D product visualization and digital
            marketing.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8  px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category)}
                variant={selectedCategory === category ? "default" : "outline"}
                className={`${
                  selectedCategory === category
                    ? "bg-gradient-to-br from-lime-400 to-green-400 text-black hover:from-lime-300 hover:to-green-300"
                    : "border-gray-700 text-black hover:bg-gray-800 hover:text-white hover:border-white"
                } transition-all duration-300`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 px-6 md:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-2xl font-semibold mb-4">No posts found</h3>
              <p className="text-gray-400 mb-6">
                There are no blog posts in the selected category.
              </p>
              <Button
                onClick={() => setSelectedCategory("All")}
                className="bg-gradient-to-br from-lime-400 to-green-400 text-black font-bold hover:from-lime-300 hover:to-green-300"
              >
                View All Posts
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
              {filteredPosts.map((post) => (
                <article
                  key={post.id}
                  className="group relative flex flex-col overflow-hidden rounded-lg border border-white/10 bg-gray-900/50 shadow-lg transition-all duration-300 ease-in-out hover:border-lime-400/50 hover:shadow-2xl hover:shadow-lime-500/10 hover:-translate-y-1"
                >
                  {/* --- Main Clickable Link Wrapper --- */}
                  <Link
                    href={`/blog/${post.id}`}
                    className="absolute inset-0 z-0"
                    aria-label={`View details for ${post.title}`}
                  />

                  {/* --- Image Section --- */}
                  <div className="relative aspect-[4/3] overflow-hidden px-2 pt-2">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-1.5 left-1.5 z-10 flex flex-col items-start gap-y-1">
                      <span className="rounded-full bg-gradient-to-br from-lime-400 to-green-400 px-2 py-0.5 text-[9px] font-bold text-black shadow-sm">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* --- Content Section --- */}
                  <div className="z-10 flex flex-grow flex-col p-2 rounded-md transition-all duration-300 ease-in-out relative">
                    <div className="mb-1 flex items-center text-xs text-gray-400">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>
                        {new Date(post.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <h2 className="text-sm font-bold mb-1 leading-tight text-white line-clamp-2 transition-colors duration-300 group-hover:text-lime-400">
                      {post.title}
                    </h2>
                    <p className="mb-2 flex-grow text-xs leading-snug text-gray-400 line-clamp-2 transition-colors duration-300 group-hover:text-gray-300">
                      {post.excerpt}
                    </p>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center gap-1 rounded-full bg-black/40 px-1.5 py-0.5">
                        <User className="h-2.5 w-2.5 text-gray-400" />
                        <span className="text-[10px] font-medium text-white truncate max-w-[60px]">
                          {post.author}
                        </span>
                      </div>
                      <Button
                        asChild
                        variant="outline"
                        className="h-7 px-2 text-xs font-bold text-black bg-gradient-to-br from-lime-400 to-green-400 hover:from-lime-300 hover:to-green-300 border-0"
                      >
                        <span>
                          Read
                          <ArrowRight className="ml-1 h-3 w-3" />
                        </span>
                      </Button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-lime-900/20 via-black to-green-900/20 text-center px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Stay Updated with Our Latest Insights
          </h2>
          <p className="text-lg opacity-90 mb-8">
            Subscribe to our newsletter and never miss our latest articles and
            industry trends.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-lime-400 flex-grow"
            />
            <Button className="bg-gradient-to-br from-lime-400 to-green-400 text-black font-bold hover:from-lime-300 hover:to-green-300 whitespace-nowrap">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
