"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, User, Search } from "lucide-react";

const blogPosts = [
  {
    id: "1",
    title: "The Future of 3D Product Visualization in E-commerce",
    excerpt: "Discover how 3D product animations are revolutionizing the online shopping experience and driving conversion rates.",
    date: "2023-10-15",
    author: "Alex Morgan",
    category: "Technology",
    image: "https://images.pexels.com/photos/3747489/pexels-photo-3747489.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: "2",
    title: "5 Ways 3D Animation Boosts Product Engagement",
    excerpt: "Learn how interactive 3D models can increase customer engagement and reduce return rates.",
    date: "2023-09-22",
    author: "Sarah Johnson",
    category: "Marketing",
    image: "https://images.pexels.com/photos/3184461/pexels-photo-3184461.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: "3",
    title: "Creating Immersive Product Experiences",
    excerpt: "How brands are using 3D animation to create memorable shopping experiences that convert.",
    date: "2023-08-30",
    author: "Michael Chen",
    category: "Design",
    image: "https://images.pexels.com/photos/3747486/pexels-photo-3747486.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: "4",
    title: "The ROI of 3D Product Visualization",
    excerpt: "Measuring the return on investment for 3D product animations and interactive content.",
    date: "2023-07-18",
    author: "Emma Rodriguez",
    category: "Business",
    image: "https://images.pexels.com/photos/3747487/pexels-photo-3747487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: "5",
    title: "Best Practices for 3D Product Modeling",
    excerpt: "Essential techniques for creating high-quality 3D models that showcase your products effectively.",
    date: "2023-06-05",
    author: "David Kim",
    category: "Tutorial",
    image: "https://images.pexels.com/photos/3747490/pexels-photo-3747490.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: "6",
    title: "3D Animation Trends to Watch in 2024",
    excerpt: "Emerging technologies and techniques that will shape the future of 3D product visualization.",
    date: "2023-05-12",
    author: "Jessica Williams",
    category: "Trends",
    image: "https://images.pexels.com/photos/3747488/pexels-photo-3747488.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...new Set(blogPosts.map((post) => post.category))];
  const filteredPosts = selectedCategory === "All" 
    ? blogPosts 
    : blogPosts.filter((post) => post.category === selectedCategory);

  return (
    <div className="min-h-screen text-white pb-20">
      <section className="relative py-24 px-6 text-center overflow-hidden">
        <div className="max-w-5xl mx-auto relative z-10">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-5xl mb-6">
            <span className="block">Our</span>
            <span className="block text-lime-400 drop-shadow-[0_0_25px_rgba(132,204,22,0.4)]">
              Digital Blog
            </span>
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-300 font-medium">
            Insights, trends, and expert tips on 3D visualization and the evolution of digital marketing.
          </p>
        </div>
      </section>

      <section className="pb-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <Button
                key={category}  
                onClick={() => setSelectedCategory(category)}
                variant="outline"
                className={`text-black rounded-2xl px-8 py-5 transition-all duration-300 font-bold uppercase tracking-widest text-[10px] ${
                  selectedCategory === category
                    ? "bg-lime-400 text-black border-lime-400 shadow-[0_0_20px_rgba(163,230,53,0.3)]"
                    : "border-gray-800"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Grid: Improved layout and card interaction */}
      <section className="py-8 px-3 sm:px-10 lg:px-10">
        <div className="max-w-7xl mx-auto">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-20 bg-black/40 backdrop-blur-xl rounded-[3rem] border border-gray-800">
              <Search className="h-12 w-12 text-gray-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2 uppercase italic">No Posts Found</h3>
              <p className="text-gray-400 mb-8">Try selecting a different insight category.</p>
              <Button
                onClick={() => setSelectedCategory("All")}
                className="rounded-full bg-white text-black font-bold hover:bg-lime-400 px-8"
              >
                View All Posts
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {filteredPosts.map((post) => (
                <article
                  key={post.id}
                  className="group relative flex flex-col bg-black/40 backdrop-blur-xl border border-gray-800 rounded-[2rem] overflow-hidden transition-all duration-500 hover:border-lime-400/50 hover:-translate-y-2 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)]"
                >
                  {/* Link wrapper for the whole card */}
                  <Link href={`/blog/${post.id}`} className="absolute inset-0 z-20" />

                  {/* Image Section */}
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4 z-30">
                      <span className="bg-lime-400 text-black text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-8 flex flex-col flex-grow">
                    <div className="flex items-center gap-4 text-gray-500 text-[10px] mb-4 font-bold uppercase tracking-[0.2em]">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3 text-lime-400" /> {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3 text-lime-400" /> {post.author}
                      </span>
                    </div>

                    <h2 className="text-xl font-extrabold mb-4 leading-tight group-hover:text-lime-400 transition-colors duration-300">
                      {post.title}
                    </h2>
                    
                    <p className="text-gray-400 text-sm leading-relaxed mb-8 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="mt-auto pt-4 border-t border-white/5">
                      <div className="flex items-center gap-2 text-white font-bold uppercase tracking-widest text-[10px] group-hover:text-lime-400 transition-all">
                        Read Full Story <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-2" />
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto bg-black/40 backdrop-blur-2xl border border-gray-800 rounded-[3.5rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute -top-24 -left-24 w-80 h-80 bg-lime-400/5 blur-[100px] rounded-full" />
          
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6 tracking-tight uppercase">
            Stay <span className="text-lime-400 italic">Ahead</span>
          </h2>
          <p className="text-gray-400 mb-10 max-w-md mx-auto text-md leading-relaxed">
            Subscribe to receive the latest 3D visual trends and studio insights directly to your inbox.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Email address"
              className="px-8 py-4 rounded-full bg-black/60 border border-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-lime-400 flex-grow transition-all font-medium"
            />
            <Button className="rounded-full bg-white text-black font-bold text-md px-10 py-7 transition-all hover:bg-lime-400 hover:scale-105 shadow-xl shadow-lime-400/10">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}