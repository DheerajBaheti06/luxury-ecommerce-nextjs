"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, Eye, EyeOff, User } from "lucide-react";

export default function UserSignup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);

    // Simple client-side signup simulation
    setTimeout(() => {
      // In a real app, this would be an API call
      // Set a cookie that expires in 7 days
      const expiryDate = new Date();
      expiryDate.setTime(expiryDate.getTime() + 7 * 24 * 60 * 60 * 1000);
      document.cookie = `user-session=authenticated; path=/; expires=${expiryDate.toUTCString()}`;
      router.push("/"); // Redirect to home page
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row mb-20 animate-fadeIn">
      {/* Left side - Branding (hidden on mobile) */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-lime-600 to-green-600 p-6 md:p-8 flex-col justify-between animate-slideInLeft">
        <div className="animate-fadeInUp delay-100">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-black rounded-lg flex items-center justify-center transform transition-transform hover:scale-105">
              <span className="text-lime-400 font-bold text-sm md:text-lg">
                SB
              </span>
            </div>
            <span className="text-lg md:text-2xl font-semibold text-black">
              Skitbit
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-black mt-6 md:mt-8 animate-fadeInUp delay-200">
            Create Account
          </h1>
          <p className="text-lime-900 mt-2 md:mt-3 text-sm md:text-base max-w-md animate-fadeInUp delay-300">
            Join our community to access exclusive products, track orders, and
            save your preferences.
          </p>
        </div>
        <div className="mt-auto text-lime-900 text-xs md:text-sm animate-fadeIn delay-500">
          © 2025 Skitbit. All rights reserved.
        </div>
      </div>

      {/* Right side - signup form */}
      <div className="flex-1 flex flex-col items-center justify-center p-3 md:p-6 animate-slideInRight">
        {/* Mobile header - only visible on mobile */}
        <div className="flex md:hidden items-center gap-2 mb-5 w-full animate-fadeInDown">
          <div className="w-7 h-7 bg-lime-400 rounded-lg flex items-center justify-center transform transition-transform hover:scale-105">
            <span className="text-black font-bold text-xs">SB</span>
          </div>
          <span className="text-lg font-semibold text-white">Skitbit</span>
        </div>

        <div className="w-full max-w-xs md:max-w-md animate-fadeInUp delay-100">
          <div className="text-center mb-5 md:mb-6 animate-pulse-subtle">
            <h2 className="text-lg md:text-xl font-bold text-white animate-fadeIn">
              Create your account
            </h2>
            <p className="text-white mt-1 text-xs md:text-sm animate-fadeIn delay-100">
              Join to unlock exclusive features and products
            </p>
          </div>

          <form
            onSubmit={handleSignup}
            className="space-y-3 md:space-y-4 animate-fadeInUp delay-200"
          >
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-300 px-2 py-2 md:px-3 md:py-2 rounded-lg flex items-start gap-2 animate-shake">
                <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span className="text-xs md:text-sm">{error}</span>
              </div>
            )}

            <div className="space-y-1.5 mt-10 animate-fadeInUp delay-300">
              <Label
                htmlFor="name"
                className="text-neutral-200 text-xs md:text-sm animate-fadeIn"
              >
                Full Name
              </Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="bg-[#00000000] hover:border-white-800 text-white h-9 md:h-10 text-xs md:text-sm transition-all duration-300 transform hover:scale-[1.02]"
                required
              />
            </div>

            <div className="space-y-1.5 animate-fadeInUp delay-400">
              <Label
                htmlFor="email"
                className="text-neutral-200 text-xs md:text-sm animate-fadeIn"
              >
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="bg-[#00000000] hover:border-white-800 text-white h-9 md:h-10 text-xs md:text-sm transition-all duration-300 transform hover:scale-[1.02]"
                required
              />
            </div>

            <div className="space-y-1.5 animate-fadeInUp delay-500">
              <Label
                htmlFor="password"
                className="text-neutral-200 text-xs md:text-sm animate-fadeIn"
              >
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-[#00000000] hover:border-white-800 text-white pr-10 h-9 md:h-10 text-xs md:text-sm transition-all duration-300 transform hover:scale-[1.02]"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-white-400 text-white transition-all duration-200 hover:text-lime-400 hover:scale-110 active:scale-95"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 transition-transform duration-200" />
                  ) : (
                    <Eye className="h-4 w-4 transition-transform duration-200" />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-1.5 mb-10 animate-fadeInUp delay-600">
              <Label
                htmlFor="confirmPassword"
                className="text-neutral-200 text-xs md:text-sm animate-fadeIn"
              >
                Confirm Password
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-[#00000000] hover:border-white-800 text-white pr-10 h-9 md:h-10 text-xs md:text-sm transition-all duration-300 transform hover:scale-[1.02]"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-white-400 text-white transition-all duration-200 hover:text-lime-400 hover:scale-110 active:scale-95"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4 transition-transform duration-200" />
                  ) : (
                    <Eye className="h-4 w-4 transition-transform duration-200" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-9 md:h-10 bg-lime-400 text-black hover:bg-lime-400/90 text-xs md:text-sm transform transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-lg"
            >
              {isLoading ? (
                <>
                  <div className="w-3 h-3 border-2 border-black border-t-transparent rounded-full animate-spin mr-2"></div>
                  Creating...
                </>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>

          <div className="mt-3 md:mt-4 text-center animate-fadeInUp delay-700">
            <p className="text-neutral-400 text-xs">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="text-lime-400 hover:underline transform transition-all hover:scale-105 inline-block"
              >
                Sign in
              </Link>
            </p>
          </div>

          <div className="mt-5 md:mt-6 animate-fadeIn delay-800">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-neutral-800"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-2 text-neutral-400 bg-black">
                  Or continue as
                </span>
              </div>
            </div>

            <div className="mt-3 md:mt-4">
              <Button
                variant="outline"
                className="w-full h-9 md:h-10 border-neutral-800 text-black text-xs md:text-sm bg-slate-300 hover:bg-white transform transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-lg"
                onClick={() => router.push("/")}
              >
                <User className="mr-2 h-4 w-4" />
                Guest
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
