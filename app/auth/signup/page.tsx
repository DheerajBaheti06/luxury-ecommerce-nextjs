"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SiteLayout } from "@/components/site-layout";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Eye, EyeOff } from "lucide-react";

export default function SignupPage() {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword(!showPassword);

  return (
    <SiteLayout>
      <div className="w-full flex items-center justify-center px-6 overflow-hidden">
        
        {/* Main Interface Wrapper */}
        <div className="relative w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 rounded-b-3xl overflow-hidden h-[520px]">
          
          {/* Left Side: Static Luxury Asset */}
          <div className="relative hidden lg:flex flex-col items-center justify-center p-12 overflow-hidden">
            <img 
              src="https://st.depositphotos.com/18722762/51522/v/450/depositphotos_515228796-stock-illustration-online-registration-sign-login-account.jpg" 
              alt="Security Interface"
              className="absolute w-full h-full object-cover"
            />
          </div>

          {/* Right Side: Interactive Stepper Form */}
          <div className="flex flex-col justify-center p-10 lg:p-16 relative">
            <div className="mb-8">
              <div className="flex gap-1 mb-3">
                <div className={`h-1 w-8 rounded-full transition-all duration-500 ${step === 1 ? 'bg-lime-400' : 'bg-white/20'}`} />
                <div className={`h-1 w-8 rounded-full transition-all duration-500 ${step === 2 ? 'bg-lime-400' : 'bg-white/20'}`} />
              </div>
              <h1 className="text-2xl font-bold text-white">Initialize Account</h1>
            </div>

            <form onSubmit={(e) => e.preventDefault()} className="relative">
              <AnimatePresence mode="wait">
                {step === 1 ? (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="space-y-4"
                  >
                    <div className="space-y-1">
                      <input 
                        type="text" 
                        placeholder="Full Name" 
                        className="w-full bg-white border border-white rounded-xl p-4 text-sm outline-none focus:border-lime-400 transition-all text-black placeholder:text-neutral-600"
                      />
                    </div>
                    <div className="space-y-1">
                      <input 
                        type="email" 
                        placeholder="Email Address" 
                        className="w-full bg-white border border-white rounded-xl p-4 text-sm outline-none focus:border-lime-400 transition-all text-black placeholder:text-neutral-600"
                      />
                    </div>
                    <button 
                      onClick={() => setStep(2)}
                      className="w-full hover:bg-white text-black py-4 rounded-full text-xs font-bold flex items-center justify-center gap-2 bg-lime-400 transition-all mt-4"
                    >
                      Next Step <ArrowRight className="h-4 w-4" />
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="space-y-4"
                  >
                    {/* Primary Password Field with Eye Toggle */}
                    <div className="space-y-1 relative">
                      <input 
                        type={showPassword ? "text" : "password"} 
                        placeholder="Choose Password" 
                        className="w-full bg-white border border-white rounded-xl p-4 pr-12 text-sm outline-none focus:border-lime-400 transition-all text-black placeholder:text-neutral-600"
                      />
                      <button 
                        type="button"
                        onClick={togglePassword}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-black transition-colors"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>

                    <div className="space-y-1">
                      <input 
                        type={showPassword ? "text" : "password"} 
                        placeholder="Confirm Password" 
                        className="w-full bg-white border border-white rounded-xl p-4 text-sm outline-none focus:border-lime-400 transition-all text-black placeholder:text-neutral-600"
                      />
                    </div>

                    <div className="flex flex-col gap-3 mt-4">
                      <button className="w-full bg-lime-400 text-black py-4 rounded-full text-xs font-bold hover:shadow-[0_0_20px_rgba(163,230,53,0.3)] transition-all">
                        Complete Registration
                      </button>
                      
                      <button 
                        onClick={() => setStep(1)}
                        className="flex items-center justify-center gap-2 text-xs text-white/70 hover:text-white transition-colors"
                      >
                        <ArrowLeft className="h-3.5 w-3.5" /> Back to Identity
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>

            <div className="mt-8 pt-6 border-t border-white text-center">
              <p className="text-xs text-white/70">
                Already have an account? <Link href="/auth/login" className="text-white hover:text-lime-400 font-bold ml-1 transition-colors">Sign In</Link>
              </p>
            </div>
          </div>

        </div>
      </div>
    </SiteLayout>
  );
}