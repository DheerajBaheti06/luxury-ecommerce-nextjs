"use client";

import React, { use } from "react"; // Added use
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, User, Share2, Clock, ArrowRight } from "lucide-react";

// Sample blog post data
const getBlogPost = (id: string) => {
  const posts: any = {
    "1": {
      id: "1",
      title: "The Future of 3D Product Visualization in E-commerce",
      content: `
        <p>In the rapidly evolving world of e-commerce, 3D product visualization is emerging as a game-changing technology that's transforming how consumers interact with products online.</p>
        <h2 className="text-2xl font-extrabold text-lime-400 mb-4 mt-8 tracking-tight uppercase">The New Standard</h2>
        <p>Traditional static images and even videos have limitations. 3D visualization bridges this gap by providing an immersive, interactive experience that allows customers to examine products from every angle.</p>
      `,
      date: "2023-10-15",
      author: "Alex Morgan",
      category: "Technology",
      image: "https://images.pexels.com/photos/3747489/pexels-photo-3747489.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      readTime: "5 min read",
    },
    "2": {
      id: "2",
      title: "5 Ways 3D Animation Boosts Product Engagement",
      content: `<p>3D animation has revolutionized the way brands showcase their products...</p>`,
      date: "2023-09-22",
      author: "Sarah Johnson",
      category: "Marketing",
      image: "https://images.pexels.com/photos/3184461/pexels-photo-3184461.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      readTime: "4 min read",
    },
  };
  return posts[id] || posts["1"];
};

// Updated with React.use() to fix the Promise error
export default function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const post = getBlogPost(resolvedParams.id);

  const relatedPosts = Object.values(
    getBlogPost("1").id !== post.id ? { "1": getBlogPost("1") } : { "2": getBlogPost("2") }
  );

  return (
    <div className="min-h-screen text-white pb-20">
      {/* Back Navigation */}
      <header className="py-10 px-6 sm:px-10 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <Button
            asChild
            variant="outline"
            className="rounded-full border-gray-800 bg-white text-black hover:bg-lime-400 transition-all font-bold uppercase tracking-widest text-[10px] px-6 py-5"
          >
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-3 w-3" />
              Back to Blog
            </Link>
          </Button>
        </div>
      </header>

      <article className="px-4 sm:px-10 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Column: Title and Content */}
            <div className="lg:col-span-8">
              <div className="flex items-center gap-4 mb-6">
                <span className="bg-lime-400 text-black text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-[0_0_20px_rgba(163,230,53,0.3)]">
                  {post.category}
                </span>
                <span className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">{post.readTime}</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-10 leading-tight">
                {post.title}
              </h1>

              <div className="relative aspect-video rounded-[2.5rem] overflow-hidden mb-12 border border-gray-800 shadow-2xl">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
              </div>

              <div
                className="prose prose-invert max-w-none mb-16 
                prose-p:text-gray-400 prose-p:leading-relaxed prose-p:text-lg
                prose-headings:font-extrabold prose-headings:tracking-tight prose-headings:text-white"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Share Box */}
              <div className="bg-black/40 backdrop-blur-xl border border-gray-800 rounded-[2rem] p-8 flex flex-col sm:flex-row justify-between items-center gap-6">
                <div>
                  <h3 className="text-lg font-extrabold uppercase tracking-tight">Spread the word</h3>
                  <p className="text-gray-500 text-sm">Share this insight with your network.</p>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" className="rounded-full bg-white text-black hover:bg-lime-400 border-none font-bold text-[10px] uppercase tracking-widest px-6">
                    <Share2 className="h-3 w-3 mr-2" /> Twitter
                  </Button>
                  <Button variant="outline" className="rounded-full bg-white text-black hover:bg-lime-400 border-none font-bold text-[10px] uppercase tracking-widest px-6">
                    <Share2 className="h-3 w-3 mr-2" /> LinkedIn
                  </Button>
                </div>
              </div>
            </div>

            {/* Right Column: Author & Meta */}
            <div className="lg:col-span-4 space-y-8">
              <div className="bg-black/40 backdrop-blur-xl border border-gray-800 rounded-[2rem] p-8">
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-lime-400 mb-6 underline underline-offset-8">Article Details</h4>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <User className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-[9px] uppercase text-gray-500 font-bold">Written By</p>
                      <p className="text-sm font-bold">{post.author}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-[9px] uppercase text-gray-500 font-bold">Published</p>
                      <p className="text-sm font-bold">{post.date}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      <section className="mt-24 py-20 bg-white/[0.02] border-t border-gray-800 px-4 sm:px-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-extrabold mb-12 tracking-tight uppercase">
            Keep <span className="text-lime-400 italic font-black">Reading</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedPosts.map((related: any) => (
              <article
                key={related.id}
                className="group relative flex flex-col bg-black/40 backdrop-blur-xl border border-gray-800 rounded-[2rem] overflow-hidden transition-all duration-500 hover:border-lime-400/50 hover:-translate-y-2"
              >
                <Link href={`/blog/${related.id}`} className="absolute inset-0 z-20" />
                <div className="relative aspect-video overflow-hidden">
                  <img src={related.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-2 text-white font-bold uppercase tracking-widest text-[10px] group-hover:text-lime-400 transition-all">
                    View Article <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-2" />
                  </div>
                  <h3 className="text-xl font-extrabold mt-4 leading-tight group-hover:text-lime-400 transition-colors">{related.title}</h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}