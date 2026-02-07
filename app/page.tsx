import { Hero } from "@/components/hero";
import { Features } from "@/components/features";
import Script from "next/script";
import { Facebook, Instagram, Twitter } from "lucide-react";
import Link from "next/link";
import { HomeProductGrid } from "@/components/home-product-grid";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const EcommerceFooter = () => {
  return (
    <footer className="border-t border-white/10 mt-12 py-8">
      <div className="container mx-auto px-4 text-center text-gray-400">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8 text-left">
          <div>
            <h4 className="font-bold text-white mb-3">Collections</h4>
            <ul className="space-y-2 text-sm">
              {/* Syncing footer with your premium category names */}
              <li>
                <Link
                  href="/products?category=Horology"
                  className="hover:text-lime-400"
                >
                  Horology
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=Future+Tech"
                  className="hover:text-lime-400"
                >
                  Future Tech
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=Acoustic+Art"
                  className="hover:text-lime-400"
                >
                  Acoustic Art
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=Automotive"
                  className="hover:text-lime-400"
                >
                  Automotive
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

        <p className="text-sm">
          &copy; {new Date().getFullYear()} Luxurious Innovation. All Rights
          Reserved.
        </p>
      </div>
    </footer>
  );
};

async function getProducts() {
  try {
    const products = await prisma.product.findMany({
      take: 100,
      include: {
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return JSON.parse(JSON.stringify(products));
  } catch (error) {
    console.error("Database Error:", error);
    return [];
  }
}

export default async function Page() {
  const products = await getProducts();

  const pageStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite", // Changed to WebSite for the root homepage SEO
    name: "Luxurious Innovation",
    description: "Shop the latest in luxury technology and artifacts.",
    url: "https://luxuriousinnovation.com/",
  };

  return (
    <>
      <main className="min-h-screen text-white relative">
        <Hero />
        <Features />
        <HomeProductGrid initialProducts={products} />
        <EcommerceFooter />
      </main>

      <Script
        id="page-structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageStructuredData) }}
      />
    </>
  );
}
