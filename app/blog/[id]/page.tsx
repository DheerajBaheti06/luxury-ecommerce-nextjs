// app/blog/[id]/page.tsx
"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, User, Share2 } from "lucide-react";

// Sample blog post data (in a real app, this would come from a CMS or database)
const getBlogPost = (id: string) => {
  const posts: any = {
    "1": {
      id: "1",
      title: "The Future of 3D Product Visualization in E-commerce",
      content: `
        <p>In the rapidly evolving world of e-commerce, 3D product visualization is emerging as a game-changing technology that's transforming how consumers interact with products online. As we look toward the future, it's clear that 3D animations and interactive models will become the new standard for online shopping experiences.</p>
        
        <h2 className="text-2xl font-bold my-6">Why 3D Visualization Matters</h2>
        
        <p>Traditional static images and even videos have limitations when it comes to showcasing products. Customers can't rotate, zoom, or interact with the product in a way that mimics the in-store experience. 3D visualization bridges this gap by providing an immersive, interactive experience that allows customers to examine products from every angle.</p>
        
        <p>This technology is particularly valuable for complex products where details matter. Electronics, fashion items, furniture, and automotive parts all benefit significantly from 3D visualization, as customers can inspect features, materials, and construction details before making a purchase.</p>
        
        <h2 className="text-2xl font-bold my-6">Impact on Conversion Rates</h2>
        
        <p>Studies consistently show that e-commerce sites implementing 3D product visualization see significant improvements in conversion rates. Some retailers report increases of 30-40% in conversions, along with reduced return rates as customers have a clearer understanding of what they're purchasing.</p>
        
        <p>The technology also reduces the burden on customer service teams, as fewer customers need to ask questions about product details that are clearly demonstrated through 3D models.</p>
        
        <h2 className="text-2xl font-bold my-6">Technological Advancements</h2>
        
        <p>Recent advancements in web technologies, including WebGL and real-time rendering engines, have made it possible to deliver high-quality 3D experiences directly in web browsers without requiring additional plugins. This accessibility is crucial for widespread adoption.</p>
        
        <p>Artificial intelligence is also playing a role, with automated 3D model generation from photographs becoming increasingly sophisticated. This reduces the time and cost associated with creating 3D content at scale.</p>
        
        <h2 className="text-2xl font-bold my-6">Looking Ahead</h2>
        
        <p>As augmented reality (AR) becomes more mainstream, we can expect 3D product visualization to integrate seamlessly with AR experiences, allowing customers to visualize products in their own spaces. Virtual reality (VR) shopping environments will also benefit from high-quality 3D assets.</p>
        
        <p>The future of e-commerce will be increasingly visual and interactive, with 3D product visualization at its core. Brands that invest in this technology now will be well-positioned to lead their markets in the years to come.</p>
      `,
      date: "2023-10-15",
      author: "Alex Morgan",
      category: "Technology",
      image:
        "https://images.pexels.com/photos/3747489/pexels-photo-3747489.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      readTime: "5 min read",
    },
    "2": {
      id: "2",
      title: "5 Ways 3D Animation Boosts Product Engagement",
      content: `
        <p>3D animation has revolutionized the way brands showcase their products, creating immersive experiences that captivate audiences and drive engagement. Here are five key ways 3D animation can significantly boost your product engagement metrics.</p>
        
        <h2 className="text-2xl font-bold my-6">1. Interactive Product Exploration</h2>
        
        <p>Unlike static images, 3D animations allow customers to interact with products in real-time. They can rotate, zoom, and examine products from every angle, creating a hands-on experience that mimics physical interaction. This level of engagement keeps users on your site longer and provides them with the detailed information they need to make confident purchasing decisions.</p>
        
        <h2 className="text-2xl font-bold my-6">2. Enhanced Storytelling Capabilities</h2>
        
        <p>3D animation enables brands to tell compelling stories about their products. You can demonstrate how a product works, show it in various environments, or create scenarios that illustrate its benefits. This narrative approach creates emotional connections with customers that static images simply cannot achieve.</p>
        
        <h2 className="text-2xl font-bold my-6">3. Superior Visual Quality</h2>
        
        <p>Modern 3D rendering techniques can produce visuals that are virtually indistinguishable from photography, but with greater flexibility and control. You can showcase products in ideal lighting conditions, create impossible camera angles, and highlight specific features with precision that photography often struggles to match.</p>
        
        <h2 className="text-2xl font-bold my-6">4. Consistent Brand Experience</h2>
        
        <p>3D animation allows for complete control over every visual element, ensuring consistency across all marketing materials. Whether you're creating website content, social media posts, or advertising materials, 3D assets maintain the same high quality and brand alignment across all channels.</p>
        
        <h2 className="text-2xl font-bold my-6">5. Cost-Effective Scalability</h2>
        
        <p>Once a 3D model is created, it can be used across multiple platforms and repurposed for various marketing campaigns. This scalability makes 3D animation a cost-effective solution for brands that need to produce large volumes of product content across different channels and markets.</p>
        
        <p>By implementing 3D animation in your product marketing strategy, you can create more engaging, informative, and memorable experiences that drive customer satisfaction and business growth.</p>
      `,
      date: "2023-09-22",
      author: "Sarah Johnson",
      category: "Marketing",
      image:
        "https://images.pexels.com/photos/3184461/pexels-photo-3184461.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      readTime: "4 min read",
    },
  };

  return posts[id] || posts["1"]; // Default to post 1 if not found
};

export default function BlogPostPage({ params }: { params: { id: string } }) {
  const post = getBlogPost(params.id);

  // Get related posts (excluding the current one)
  const relatedPosts = Object.values(
    getBlogPost("1").id !== post.id
      ? { "1": getBlogPost("1") }
      : { "2": getBlogPost("2") }
  );

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="py-6 px-6 border-b border-gray-800">
        <div className="max-w-6xl mx-auto">
          <Button
            asChild
            variant="outline"
            className="border-gray-700 text-gray-300 hover:bg-gray-800"
          >
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
        </div>
      </header>

      {/* Article Content */}
      <article className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Category and Date */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="bg-lime-400/90 text-black text-sm font-bold px-3 py-1 rounded-full">
              {post.category}
            </span>
            <div className="flex items-center text-gray-400">
              <Calendar className="h-4 w-4 mr-2" />
              <span>
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center text-gray-400">
              <User className="h-4 w-4 mr-2" />
              <span>{post.author}</span>
            </div>
            <span className="text-gray-400">{post.readTime}</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold mb-6">{post.title}</h1>

          {/* Featured Image */}
          <div className="relative h-96 rounded-2xl overflow-hidden mb-12">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div
            className="prose prose-invert max-w-none mb-12"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Share Section */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Share this article
                </h3>
                <p className="text-gray-400">
                  Help others discover this content
                </p>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="border-gray-700 text-gray-300 hover:bg-gray-800"
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Twitter
                </Button>
                <Button
                  variant="outline"
                  className="border-gray-700 text-gray-300 hover:bg-gray-800"
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  LinkedIn
                </Button>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      <section className="py-16 bg-neutral-900 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Related Articles</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {relatedPosts.slice(0, 2).map((relatedPost: any) => (
              <article
                key={relatedPost.id}
                className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden border border-gray-800 hover:border-lime-400/30 transition-all duration-300 group"
              >
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={relatedPost.image}
                    alt={relatedPost.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-lime-400/90 text-black text-xs font-bold px-2 py-1 rounded-full">
                      {relatedPost.category}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold mb-2 group-hover:text-lime-400 transition-colors line-clamp-2">
                    {relatedPost.title}
                  </h3>
                  <div className="flex items-center text-sm text-gray-400 mt-3">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>
                      {new Date(relatedPost.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="mt-4 border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white group-hover:border-lime-400/30"
                  >
                    <Link href={`/blog/${relatedPost.id}`}>Read More</Link>
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
