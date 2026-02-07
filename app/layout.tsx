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

// 1. Next.js handles font preloading/optimization automatically.
const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: {
    template: "%s | Skitbit",
    default: "Skitbit | 3D Services Made Simple",
  },
  description:
    "Professional 3D services for product visualization and marketing.",

  // 2. Next.js automatically looks for favicon.ico or icon.svg in the /app folder.
  icons: {
    icon: [
      {
        url: "/icons/favicon-dark.svg",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icons/skitbit-white.svg",
        media: "(prefers-color-scheme: dark)",
      },
    ],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://theskitbit.com",
    siteName: "Skitbit",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        {/* Google Tag Manager - strategy="afterInteractive" is usually safer than lazyOnload for GTM */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-NFLHXXGK');`}
        </Script>
      </head>
      <body className="antialiased">
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              {/* Background Layer */}
              <div className="fixed inset-0 z-0 bg-black">
                <Plasma />
              </div>

              {/* Main Content */}
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
