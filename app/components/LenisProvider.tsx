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
          duration: 0.2,
          easing: (t: number) => t,
          smoothWheel: true,
          smoothTouch: false,
          lerp: 0.08,
          infinite: false,
          orientation: 'vertical',
          gestureOrientation: 'vertical',
          touchMultiplier: 1,
          wheelMultiplier: 0.8,
          normalizeWheel: true,
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

