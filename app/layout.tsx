import type React from "react";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import Plasma from "@/components/plasma";
import { CartProvider } from "@/context/cart-context";
import { WishlistProvider } from "@/context/wishlist-context";
import { AuthProvider } from "@/context/auth-context";
import { SiteLayout } from "@/components/site-layout";

// Initialize Inter font with Latin subset for optimal performance
const inter = Inter({ subsets: ["latin"], display: "swap" });

/**
 * SEO metadata configuration for the entire application
 * Includes title templates, descriptions, and social media tags
 */
export const metadata: Metadata = {
  title: {
    template: "%s | Skitbit - Professional 3D Services",
    default: "Skitbit | 3D Services Made Simple, Reliable & Scalable",
  },
  description:
    "Professional 3D services for product visualization, animations, and marketing. From single renders to complete campaigns, we deliver fast, consistent, and wow-worthy results.",
  keywords: [
    "3D rendering",
    "3D animation",
    "product visualization",
    "3D modeling",
    "marketing assets",
    "3D services",
    "digital products",
  ],
  authors: [{ name: "Skitbit" }],
  creator: "Skitbit",
  publisher: "Skitbit",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://theskitbit.com",
    title: "Skitbit | Professional 3D Services",
    description:
      "Professional 3D services for product visualization, animations, and marketing.",
    siteName: "Skitbit",
  },
  twitter: {
    card: "summary_large_image",
    title: "Skitbit | Professional 3D Services",
    description:
      "Professional 3D services for product visualization, animations, and marketing.",
  },
};

/**
 * Root layout component that wraps all pages
 * Provides global context providers and base HTML structure
 * @param children - React nodes to render within the layout
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        {/* Preload Inter font for faster rendering */}
        <link
          rel="preload"
          href="/fonts/Inter.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
          fetchPriority="high"
        />

        {/* Dynamic favicon that changes based on system theme */}
        <Script id="dynamic-favicon" strategy="beforeInteractive">
          {`
            function updateFavicon() {
              const darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
              const faviconHref = darkMode ? '/icons/skitbit-white.svg' : '/icons/favicon-dark.svg';
              let link = document.querySelector("link[rel~='icon']");
              if (!link) {
                link = document.createElement('link');
                link.rel = 'icon';
                document.getElementsByTagName('head')[0].appendChild(link);
              }
              link.href = faviconHref;
            }
            updateFavicon();
            // Listen for changes in theme
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateFavicon);
          `}
        </Script>

        {/* Google Tag Manager for analytics and marketing */}
        <Script id="gtm-script" strategy="lazyOnload">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-NFLHXXGK');`}
        </Script>

        {/* Google Analytics initialization */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-W6LV22900R"
          strategy="lazyOnload"
        />
        <Script id="gtag-init" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-W6LV22900R');
          `}
        </Script>
      </head>
      <body>
        {/* Global context providers for authentication, cart, and wishlist */}
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              {/* Background layer - currently using a solid black background */}
              <div className="fixed inset-0 z-0 bg-black">
                {/* Plasma background effect - commented out for performance */}
                <Plasma
                  color="#8b5cf6"
                  speed={0.8}
                  direction="forward"
                  scale={1.5}
                  opacity={0.4}
                  mouseInteractive={true}
                />
              </div>
              {/* Main content layer with higher z-index to appear above background */}
              <div className="relative z-10">
                <SiteLayout>{children}</SiteLayout>
              </div>
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
