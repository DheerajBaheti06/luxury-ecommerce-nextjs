"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import {
  Menu,
  ShoppingCart,
  Tag,
  HelpCircle,
  FileText,
  Info,
  Home,
  Heart,
  User,
} from "lucide-react";
import { memo, useMemo } from "react";
import { useCart } from "@/context/cart-context";
import { useWishlist } from "@/context/wishlist-context";
import { useAuth } from "@/context/auth-context";

// Memoized component to prevent unnecessary re-renders
const NavItem = memo(
  ({
    href,
    label,
    icon: Icon,
    pathname,
  }: {
    href: string;
    label: string;
    icon: any;
    pathname: string;
  }) => (
    <Link
      key={href}
      href={href}
      className={`relative px-3 py-2 font-medium transition-all duration-300 rounded-full text-black hover:font-bold active:scale-100 group ${
        pathname === href ? "font-bold" : ""
      }`}
    >
      {/* Big green oval background on hover */}
      <span
        className={`pointer-events-none absolute inset-0 rounded-full bg-lime-400 scale-90 opacity-0 transition duration-300 ${
          pathname === href
            ? "opacity-100 scale-100"
            : "group-hover:opacity-100 group-hover:scale-100"
        }`}
      />

      {/* Nav item label */}
      <span className="relative z-10">{label}</span>
    </Link>
  )
);
NavItem.displayName = "NavItem";

// Memoized mobile nav item
const MobileNavItem = memo(
  ({
    href,
    label,
    icon: Icon,
    pathname,
  }: {
    href: string;
    label: string;
    icon: any;
    pathname: string;
  }) => (
    <Link
      key={href}
      href={href}
      className={`flex items-center gap-3 px-4 py-3 transition-all ${
        pathname === href
          ? "bg-lime-400/20 text-lime-400 translate-x-1"
          : "hover:translate-x-1 hover:bg-gray-900 hover:text-lime-400"
      }`}
    >
      <span className="inline-flex h-5 w-5 items-center justify-center text-gray-400">
        <Icon className="h-4 w-4" />
      </span>
      <span className="text-sm">{label}</span>
    </Link>
  )
);
MobileNavItem.displayName = "MobileNavItem";

export const SiteHeader = memo(() => {
  const pathname = usePathname();
  const { getTotalItems } = useCart();
  const { getTotalItems: getWishlistItems } = useWishlist();
  const { isAuthenticated, logout } = useAuth();

  // Memoize cart and wishlist item counts to prevent unnecessary re-renders
  const cartItems = useMemo(() => getTotalItems(), [getTotalItems]);
  const wishlistItems = useMemo(() => getWishlistItems(), [getWishlistItems]);

  const links = useMemo(
    () => [
      { href: "/", label: "Home", icon: Home },
      { href: "/products", label: "Products", icon: Tag },
      { href: "/faq", label: "FAQ", icon: HelpCircle },
      { href: "/blog", label: "Blog", icon: FileText },
      { href: "/about", label: "About", icon: Info },
    ],
    []
  );

  return (
    <header className="fixed top-5 z-50 flex justify-center w-full">
      <div className="container mx-auto max-w-4xl">
        <div className="flex h-14 items-center justify-between rounded-full border border-white/0 bg-white px-4 sm:px-6">
          {/* Brand Logo with hover effect */}
          <Link
            href="/"
            className="flex items-center gap-1.5 transition-transform hover:scale-110"
          >
            <Image
              src="/icons/skitbit-white.svg"
              alt="Skitbit logo"
              width={20}
              height={20}
              className="h-5 w-5"
            />
            <span className="font-semibold tracking-wide text-black">
              Skitbit
            </span>
          </Link>
          {/* Desktop Nav with green circular hover */}
          <nav className="hidden items-center gap-1 text-sm text-black md:flex">
            {links.map((link) => (
              <NavItem
                key={link.href}
                href={link.href}
                label={link.label}
                icon={link.icon}
                pathname={pathname}
              />
            ))}
          </nav>
          {/* Desktop CTA with lime hover effects */}
          <div className="hidden items-center gap-2 md:flex">
            <Button
              variant="default"
              size="icon"
              asChild
              className="relative rounded-lg px-3 py-2 text-white transition-all bg-black hover:shadow-md hover:text-lime-400 font-bold"
            >
              <Link href="/wishlist">
                <Heart className="h-5 w-5" />
                {wishlistItems > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-lime-400 text-[10px] font-bold text-black">
                    {wishlistItems}
                  </span>
                )}
              </Link>
            </Button>
            <Button
              variant="default"
              size="icon"
              asChild
              className="relative rounded-lg px-3 py-2 text-white transition-all bg-black hover:shadow-md hover:text-lime-400 font-bold"
            >
              <Link href="/cart">
                <ShoppingCart className="h-5 w-5" />
                {cartItems > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-lime-400 text-[10px] font-bold text-black">
                    {cartItems}
                  </span>
                )}
              </Link>
            </Button>

            {isAuthenticated ? (
              <Button
                asChild
                className="rounded-lg px-3 py-2 text-white transition-all bg-black hover:shadow-md hover:text-lime-400 font-bold"
              >
                <Link href="/auth/profile">
                  <User className="h-5 w-5" />
                </Link>
              </Button>
            ) : (
              <Button
                asChild
                className="rounded-lg px-3 py-2 text-white transition-all bg-black hover:shadow-md hover:text-lime-400 font-bold"
              >
                <Link href="/auth/login">Login</Link>
              </Button>
            )}
          </div>
          {/* Mobile Nav */}
          <div className="flex items-center gap-2 md:hidden">
            <Button
              variant="default"
              size="icon"
              asChild
              className="relative text-gray-300 transition-transform hover:scale-110 hover:text-red-400"
            >
              <Link href="/wishlist">
                <Heart className="h-5 w-5" />
                {wishlistItems > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-400 text-[10px] font-bold text-black">
                    {wishlistItems}
                  </span>
                )}
              </Link>
            </Button>
            <Button
              variant="default"
              size="icon"
              asChild
              className="relative text-gray-300 transition-transform hover:scale-110 hover:text-red-400"
            >
              <Link href="/cart">
                <ShoppingCart className="h-5 w-5" />
                {cartItems > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-400 text-[10px] font-bold text-black">
                    {cartItems}
                  </span>
                )}
              </Link>
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="border-gray-700 bg-gray-900/80 text-gray-200 transition-transform hover:bg-red-400 active:scale-95"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="flex w-64 flex-col border-l border-white/10 bg-gray-950/80 p-0 backdrop-blur-xl"
              >
                {/* Brand Header */}
                <div className="flex items-center gap-1.5 border-b border-gray-800 px-4 py-4">
                  <Image
                    src="/icons/skitbit-white.svg"
                    alt="Skitbit logo"
                    width={24}
                    height={24}
                    className="h-6 w-6"
                  />
                  <span className="text-lg font-semibold tracking-wide text-white">
                    Skitbit
                  </span>
                </div>

                {/* Nav Links with lime hover effect */}
                <nav className="mt-2 flex flex-col gap-1 text-gray-200">
                  {links.map((link) => (
                    <MobileNavItem
                      key={link.href}
                      href={link.href}
                      label={link.label}
                      icon={link.icon}
                      pathname={pathname}
                    />
                  ))}

                  {/* Auth Links for Mobile */}
                  <div className="border-t border-gray-800 mt-4 pt-4">
                    {isAuthenticated ? (
                      <>
                        <Link
                          href="/auth/profile"
                          className="flex items-center gap-3 px-4 py-3 transition-all hover:translate-x-1 hover:bg-gray-900 hover:text-lime-400"
                        >
                          <span className="inline-flex h-5 w-5 items-center justify-center text-gray-400">
                            <User className="h-4 w-4" />
                          </span>
                          <span className="text-sm">Profile</span>
                        </Link>
                        <button
                          onClick={logout}
                          className="w-full text-left flex items-center gap-3 px-4 py-3 transition-all hover:translate-x-1 hover:bg-gray-900 hover:text-lime-400"
                        >
                          <span className="inline-flex h-5 w-5 items-center justify-center text-gray-400">
                            <User className="h-4 w-4" />
                          </span>
                          <span className="text-sm">Logout</span>
                        </button>
                      </>
                    ) : (
                      <Link
                        href="/auth/login"
                        className="flex items-center gap-3 px-4 py-3 transition-all hover:translate-x-1 hover:bg-gray-900 hover:text-lime-400"
                      >
                        <span className="inline-flex h-5 w-5 items-center justify-center text-gray-400">
                          <User className="h-4 w-4" />
                        </span>
                        <span className="text-sm">Login</span>
                      </Link>
                    )}
                  </div>
                </nav>

                {/* CTA Button at Bottom */}
                <div className="mt-auto border-t border-gray-800 p-4">
                  <Button
                    asChild
                    className="w-full rounded-lg bg-lime-400 px-6 py-2.5 font-medium text-black transition-all hover:scale-[1.02] hover:bg-lime-300 hover:shadow-md"
                  >
                    <Link href="/contact">Contact Us</Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
});

SiteHeader.displayName = "SiteHeader";
