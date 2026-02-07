"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AlertCircle,
  Eye,
  EyeOff,
  User,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { SiteLayout } from "@/components/site-layout";

export default function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    setTimeout(() => {
      if (email && password) {
        const expiryDate = new Date();
        expiryDate.setTime(expiryDate.getTime() + 7 * 24 * 60 * 60 * 1000);
        document.cookie = `user-session=authenticated; path=/; expires=${expiryDate.toUTCString()}`;
        router.push("/");
      } else {
        setError("Please enter valid credentials");
      }
      setIsLoading(false);
    }, 1000);
  };
  return (
    <SiteLayout>
      <div className="w-full flex items-center justify-center px-6 overflow-hidden">
        {/* Main Interface Wrapper */}
        <div className="relative w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 rounded-b-2xl overflow-hidden h-[520px]">
          {/* Left Side: Luxury Visual */}
          <div className="relative hidden lg:flex flex-col items-center justify-center p-12 overflow-hidden">
            <img
              src="https://img.freepik.com/free-vector/user-verification-unauthorized-access-prevention-private-account-authentication-cyber-security-people-entering-login-password-safety-measures_335657-3530.jpg?semt=ais_hybrid&w=740&q=80"
              alt="Secure Access"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          {/* Right Side: Login Form */}
          <div className="flex flex-col justify-center p-10 lg:p-16 relative">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-white">Sign In</h1>
              <p className="text-neutral-500 text-sm mt-1">
                Access your account
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-500/10 border border-red-500/30 text-red-300 px-3 py-2 rounded-xl flex items-center gap-2 text-xs"
                >
                  <AlertCircle className="h-4 w-4" /> {error}
                </motion.div>
              )}

              <div className="space-y-1">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  className="w-full bg-white border rounded-xl p-4 h-12 text-sm outline-none focus:border-lime-400 transition-all text-black placeholder:text-neutral-600"
                  required
                />
              </div>

              <div className="space-y-1 relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full bg-white border rounded-xl p-4 h-12 text-sm outline-none focus:border-lime-400 transition-all text-black placeholder:text-neutral-600"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-black" />
                  ) : (
                    <Eye className="h-4 w-4 text-black" />
                  )}
                </button>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-xs text-lime-400 hover:underline"
                >
                  Forgot password?
                </button>
              </div>

              <Button
                disabled={isLoading}
                className="w-full bg-lime-400 text-black py-6 rounded-full text-xs font-bold hover:bg-lime-500 transition-all flex items-center justify-center gap-2"
              >
                {isLoading ? "Verifying..." : "Sign In"}{" "}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>

            <div className="mt-8 pt-6 border-t border-white/5 flex flex-col gap-4">
              <Button
                variant="outline"
                className="w-full h-10 border-white/10 text-white text-xs bg-white/5 hover:bg-white"
                onClick={() => router.push("/")}
              >
                <User className="mr-2 h-4 w-4" /> Continue as Guest
              </Button>
              <p className="text-xs text-neutral-500 text-center">
                New here?{" "}
                <Link
                  href="/auth/signup"
                  className="text-white hover:text-lime-400 font-bold ml-1 transition-colors"
                >
                  Create Account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
