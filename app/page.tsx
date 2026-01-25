import { Hero } from "@/components/hero";
import { Features } from "@/components/features";
import Script from "next/script";
import { Facebook, Instagram, Twitter } from "lucide-react";
import Link from "next/link";
import { PrismaClient } from "@prisma/client";
import { HomeProductGrid } from "@/components/home-product-grid";

import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

/**
 * E-commerce footer component
 */
const EcommerceFooter = () => {
  return (
    <footer className="border-t border-white/10 mt-12 py-8">
      <div className="container mx-auto px-4 text-center text-gray-400">
        {/* Footer navigation sections */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8 text-left">
          <div>
            <h4 className="font-bold text-white mb-3">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/products?category=electronics"
                  className="hover:text-lime-400"
                >
                  Electronics
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=fashion"
                  className="hover:text-lime-400"
                >
                  Fashion
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=home"
                  className="hover:text-lime-400"
                >
                  Home Goods
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=sale"
                  className="hover:text-lime-400"
                >
                  On Sale
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-3">About Us</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-lime-400">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-lime-400">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/press" className="hover:text-lime-400">
                  Press
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-3">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/contact" className="hover:text-lime-400">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-lime-400">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-lime-400">
                  Shipping & Returns
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-3">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/terms" className="hover:text-lime-400">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-lime-400">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        {/* Social media links */}
        <div className="flex justify-center gap-6 mb-6">
          <Link href="#" aria-label="Facebook">
            <Facebook className="h-6 w-6 hover:text-lime-400" />
          </Link>
          <Link href="#" aria-label="Twitter">
            <Twitter className="h-6 w-6 hover:text-lime-400" />
          </Link>
          <Link href="#" aria-label="Instagram">
            <Instagram className="h-6 w-6 hover:text-lime-400" />
          </Link>
        </div>
        {/* Copyright information */}
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Luxurious Innovation. All Rights
          Reserved.
        </p>
      </div>
    </footer>
  );
};

// Fetch data directly on the server
async function getProducts() {
  try {
    const products = await prisma.product.findMany({
      take: 100,
      include: {
        brand: true,
        category: true,
        variants: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // We need to serialize the Decimal/Date types if passing to client components
    // or just let Next.js handle it (it usually does automatically in newer versions,
    // but sometimes complains about plain objects).
    // Let's create a safe serializable object map if needed.
    // Actually, Next.js Server Actions / Component props serialization handles Date/Decimal fine in recent versions?
    // Decimal from Prisma mocks JSON.stringify but React props might complain.
    return JSON.parse(JSON.stringify(products));
  } catch (error) {
    console.error("Database Error:", error);
    return [];
  }
}

/**
 * Main homepage component (Server Component)
 */
export default async function Page() {
  const products = await getProducts();

  /**
   * Structured data for SEO purposes
   */
  const pageStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://luxuriousinnovation.com/",
    name: "Luxurious Innovation | The Pinnacle of Excellence",
    description: "Shop the latest in luxury technology and artifacts.",
    url: "https://luxuriousinnovation.com/",
  };

  return (
    <>
      <main className="min-h-[100dvh] text-white flex flex-col justify-center align-middle relative">
        <Hero />
        {/* Client Demo Badge removed as requested */}
        <Features />

        {/* Client Component for Interaction */}
        <HomeProductGrid initialProducts={products} />

        <EcommerceFooter />
      </main>

      {/* Structured data scripts for SEO */}
      <Script
        id="page-structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageStructuredData) }}
      />
    </>
  );
}
