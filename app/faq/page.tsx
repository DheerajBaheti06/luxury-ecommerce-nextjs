"use client";

import { useState } from "react";
import { SiteLayout } from "@/components/site-layout";
import { AppverseFooter } from "@/components/appverse-footer";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Loader2, Check, ShieldCheck } from "lucide-react";

const faqs = [
  {
    question: "What types of products can you animate or render?",
    answer: "We specialize in photorealistic 3D for consumer electronics, luxury packaging, beauty products, and industrial design. If you have a physical product or a 2D sketch, we can digitize and animate it.",
  },
  {
    question: "How long does a typical 3D animation take?",
    answer: "Bespoke campaigns typically require 10–20 business days. This ensures every texture and lighting bounce meets our premium quality standards.",
  },
  {
    question: "Do you work with existing CAD files or product samples?",
    answer: "We prefer industry-standard files like .STP, .STEP, or .OBJ. If you don't have these, we can build a 3D model from scratch using physical samples or high-resolution photo references.",
  },
  {
    question: "Who owns the final 3D assets and renders?",
    answer: "Upon final payment, you own full commercial rights to the rendered images and videos. Source files (working files) remain the property of the studio unless a transfer is negotiated beforehand.",
  },
  {
    question: "What formats do you deliver in?",
    answer: "Standard delivery includes 4K MP4 (H.265) for video and high-resolution PNGs for stills. We also provide files optimized for web-store integration like glTF, GLB, or USDZ for AR.",
  },
  {
    question: "Can we request changes after the initial delivery?",
    answer: "Every project includes two rounds of revisions. Minor adjustments to lighting, camera speed, or colors are standard. Major structural changes to the model may incur an additional fee.",
  },
  {
    question: "Do you offer creative direction or just technical execution?",
    answer: "We do both. We can develop creative concepts, storyboards, and camera movements, or simply execute your pre-approved vision with technical precision.",
  },
  {
    question: "Is your 3D content compatible with Apple Vision Pro?",
    answer: "Yes. We can output USDZ files specifically optimized for visionOS, allowing users to interact with your products in high-fidelity spatial environments.",
  },
  {
    question: "How do you handle bulk orders for large e-commerce catalogs?",
    answer: "We offer specialized 'Catalog Workflows' for brands needing 50+ consistent renders. We automate lighting and material application to ensure brand consistency across your entire store.",
  },
  {
    question: "What is your pricing structure?",
    answer: "Our pricing is project-based, calculated by complexity and asset volume. We offer tiered packages for startups as well as bespoke enterprise solutions for global campaigns.",
  },
  {
    question: "Can you simulate liquid, cloth, or organic materials?",
    answer: "Absolutely. We use advanced physics simulations to recreate photorealistic liquid flows, fabric movements, and skin textures for beauty and fashion brands.",
  },
  {
    question: "How do we get started?",
    answer: "The process begins with a brief consultation. Simply use the Concierge form on the left or visit our contact page to share your project details.",
  },
];

function FaqItem({ question, answer, isOpen, onToggle }: any) {
  return (
    <div className="border-b border-white/10">
      <button
        onClick={onToggle}
        className="group flex w-full items-center justify-between py-6 text-left"
      >
        <span className="text-lg font-medium text-white transition-colors duration-300 group-hover:text-lime-300 sm:text-xl">
          {question}
        </span>
        <div className="relative ml-4 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-white/5 transition-colors duration-300 group-hover:bg-white/10">
          <motion.div
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute"
          >
            <Plus className="h-6 w-6 text-neutral-400 transition-colors duration-300 group-hover:text-lime-300" />
          </motion.div>
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-base text-neutral-300">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "verifying" | "sent">("idle");
  const [formData, setFormData] = useState({ name: "", message: "" });

  const handleFakeSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.message) return;

    setStatus("sending");
    
    // Stage 1: Initial Send
    setTimeout(() => setStatus("verifying"), 1200);
    
    // Stage 2: Security/Encryption Simulation
    setTimeout(() => {
      setStatus("sent");
      setFormData({ name: "", message: "" });
    }, 2800);

    // Stage 3: Reset to idle
    setTimeout(() => setStatus("idle"), 6000);
  };

  return (
    <SiteLayout>
      <div className="min-h-screen text-white pb-24">
        <main className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
            
            {/* Left Column: Authentic Form */}
            <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit space-y-10">
              <div>
                <h1 className="text-4xl font-bold tracking-tight text-lime-300 sm:text-5xl">
                  Frequently Asked Questions
                </h1>
                <p className="mt-4 text-lg text-neutral-400">
                  Refined answers for our luxury partners and collaborators.
                </p>
              </div>

              {/* The "Original" Looking Concierge Card */}
              <div className="bg-white rounded-[2.5rem] p-8 text-black shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-black uppercase tracking-tight leading-none">Concierge</h3>
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-lime-500 animate-pulse" />
                    <div className="w-1.5 h-1.5 rounded-full bg-lime-500 animate-pulse delay-75" />
                  </div>
                </div>
                
                <form onSubmit={handleFakeSend} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Identity</label>
                    <input 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Name or Brand" 
                      className="w-full bg-gray-100 border-2 border-transparent focus:border-lime-400 focus:bg-white outline-none rounded-2xl p-4 text-xs transition-all placeholder:text-gray-400 text-black font-bold" 
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Inquiry</label>
                    <textarea 
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      placeholder="How may we assist?" 
                      className="w-full bg-gray-100 border-2 border-transparent focus:border-lime-400 focus:bg-white outline-none rounded-2xl p-4 text-xs h-28 transition-all placeholder:text-gray-400 text-black font-bold resize-none" 
                    />
                  </div>

                  <button 
                    type="submit"
                    disabled={status !== "idle"}
                    className={`group w-full py-5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-3 shadow-xl ${
                      status === "sent" ? "bg-lime-400 text-black" : "bg-black text-white hover:bg-lime-400 hover:text-black"
                    }`}
                  >
                    {status === "idle" && (
                      <>
                        Confirm Inquiry
                        <motion.span animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                          →
                        </motion.span>
                      </>
                    )}
                    {status === "sending" && <Loader2 className="h-4 w-4 animate-spin" />}
                    {status === "verifying" && (
                      <>
                        <ShieldCheck className="h-4 w-4 animate-pulse" /> Verifying...
                      </>
                    )}
                    {status === "sent" && (
                      <>
                        <Check className="h-4 w-4" /> Inquiry Received
                      </>
                    )}
                  </button>
                </form>
                
                {status === "sent" && (
                  <motion.p 
                    initial={{ opacity: 0, y: 10 }} 
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center text-[9px] font-bold text-lime-600 mt-4 uppercase tracking-widest"
                  >
                    A representative will reach out shortly.
                  </motion.p>
                )}
              </div>
            </div>

            {/* Right Column: Original FAQ List Pattern */}
            <div className="lg:col-span-8 bg-white/[0.03] border border-white/5 rounded-[2.5rem] p-6 sm:p-10 backdrop-blur-xl">
              <div className="space-y-2">
                {faqs.map((faq, index) => (
                  <FaqItem
                    key={index}
                    question={faq.question}
                    answer={faq.answer}
                    isOpen={openIndex === index}
                    onToggle={() => setOpenIndex(openIndex === index ? null : index)}
                  />
                ))}
              </div>
            </div>

          </div>
        </main>
      </div>
      <AppverseFooter />
    </SiteLayout>
  );
}