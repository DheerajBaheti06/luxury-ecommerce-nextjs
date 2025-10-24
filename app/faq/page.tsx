"use client";

import { useState } from "react";
import { SiteLayout } from "@/components/site-layout";
import { AppverseFooter } from "@/components/appverse-footer";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Plus } from "lucide-react";
import Link from "next/link";

// --- FAQ Data ---
// Storing data in an array makes the page much easier to update.
const faqs = [
  {
    question: "What types of products can you animate or render?",
    answer:
      "We can create photorealistic 3D animations and renders for almost any product — from beauty and skincare to electronics, furniture, and luxury goods. If it exists (or is planned), we can bring it to life.",
  },
  {
    question: "How long does a typical 3D animation take?",
    answer:
      "Timelines vary depending on complexity, but a standard 15–20 second animation usually takes 7–14 working days after final concept approval.",
  },
  {
    question: "Do you work with existing CAD files or product samples?",
    answer:
      "We can work with both. If you have CAD or 3D models, we can import and refine them. If not, we can create models from physical product samples or detailed reference images.",
  },
  {
    question: "How do you price your services?",
    answer: (
      <>
        Pricing is based on animation length, complexity, number of renders, and
        modeling requirements. You can view detailed pricing on our{" "}
        <Link
          href="/pricing"
          className="text-lime-300 underline transition hover:text-lime-200"
        >
          pricing page
        </Link>
        .
      </>
    ),
  },
  {
    question: "Can we request changes after delivery?",
    answer: (
      <>
        Yes. All revisions are covered under our{" "}
        <Link
          href="/revisions"
          className="text-lime-300 underline transition hover:text-lime-200"
        >
          revision policy
        </Link>
        , which ensures smooth updates without unexpected scope creep.
      </>
    ),
  },
  {
    question: "Will the renders match our brand's visual style?",
    answer:
      "Absolutely. We customize lighting, materials, camera angles, and animation pacing to fit your brand's identity and marketing needs.",
  },
  {
    question: "What formats do you deliver in?",
    answer:
      "We typically deliver in MP4 (H.264) for videos and high-resolution PNG/JPG for stills. Other formats like MOV, ProRes, or transparent-background renders are available on request.",
  },
  {
    question: "Can you handle large-scale projects or bulk renders?",
    answer:
      "Yes, we regularly work on bulk orders for 10+ animations or 50+ renders. We optimize workflows to maintain quality and meet tight deadlines.",
  },
  {
    question: "Do you offer creative direction or only technical execution?",
    answer:
      "We do both. Our team can develop creative concepts, storyboards, and camera moves, or simply execute your pre-approved vision.",
  },
  {
    question: "How do we get started?",
    answer: (
      <>
        Simply{" "}
        <Link
          href="/contact"
          className="text-lime-300 underline transition hover:text-lime-200"
        >
          contact us
        </Link>{" "}
        with your project details, references, and timeline. We'll provide a
        proposal and next steps.
      </>
    ),
  },
];

// --- Reusable, Animated Accordion Item Component ---
function FaqItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-white/10">
      <button
        onClick={onToggle}
        className="group flex w-full items-center justify-between py-3 text-left"
        aria-expanded={isOpen}
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
            key="answer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-base text-neutral-300">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- Main Page Component ---
export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Animation variants for Framer Motion
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <SiteLayout>
      <section className="overflow-hidden text-white sm:py-24">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          
            <h1 className="text-4xl font-bold tracking-tight text-lime-300 sm:text-5xl">
              Frequently Asked Questions
            </h1>
            <p className="mt-4 text-lg text-neutral-400">
              Your questions, answered. Find details about our 3D services
              below.
            </p>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative mt-12 rounded-2xl border border-white/10  p-4 shadow-2xl shadow-black/20 backdrop-blur-lg sm:p-8"
          >
            {faqs.map((faq, index) => (
              <motion.div key={index} variants={itemVariants}>
                <FaqItem
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openIndex === index}
                  onToggle={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      <AppverseFooter />
    </SiteLayout>
  );
}
