"use client";

import React, { useEffect } from "react";

export function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    let lenis: any;
    let rafId: number;

    (async () => {
      try {
        const { default: Lenis } = await import("lenis");
        
        lenis = new Lenis({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
          smoothTouch: false,
        });

        const raf = (time: number) => {
          lenis.raf(time);
          rafId = requestAnimationFrame(raf);
        };
        
        rafId = requestAnimationFrame(raf);
      } catch (error) {
        console.warn("Lenis failed to initialize:", error);
      }
    })();

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      lenis?.destroy();
    };
  }, []);

  return <>{children}</>;
}

