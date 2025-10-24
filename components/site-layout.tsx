"use client";

import { SiteHeader } from "@/components/site-header";
import React from "react";

export function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <div className="pt-20">{children}</div>
    </>
  );
}
