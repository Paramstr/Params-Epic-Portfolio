"use client";

import React, { useEffect, createContext, useContext, useState } from "react";

type LenisContextType = {
  lenis: any;
};

const LenisContext = createContext<LenisContextType>({ lenis: null });

export const useLenis = () => useContext(LenisContext);

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<any>(null);

  useEffect(() => {
    // Lenis is disabled - returning early
    return;
    
    let lenisInstance: any;
    let rafId: number;

    (async () => {
      try {
        const { default: Lenis } = await import("lenis");
        
        lenisInstance = new Lenis({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
          smoothTouch: false,
          lerp: 0.1,
          infinite: false,
          orientation: 'vertical',
          gestureOrientation: 'vertical',
          touchMultiplier: 1,
          wheelMultiplier: 1,
          normalizeWheel: true,
        });

        setLenis(lenisInstance);

        const raf = (time: number) => {
          lenisInstance.raf(time);
          rafId = requestAnimationFrame(raf);
        };
        
        rafId = requestAnimationFrame(raf);
      } catch (error) {
        console.warn("Lenis failed to initialize:", error);
      }
    })();

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      lenisInstance?.destroy();
    };
  }, []);

  return (
    <LenisContext.Provider value={{ lenis }}>
      {children}
    </LenisContext.Provider>
  );
}

