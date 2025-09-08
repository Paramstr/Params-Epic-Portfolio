"use client";

import React, { useEffect, useRef, useCallback } from "react";

const InteractiveGridBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();
  const lastUpdateRef = useRef<number>(0);
  const randomStateRef = useRef({
    offsetX: 0,
    offsetY: 0,
    noiseX: 0,
    noiseY: 0,
    phase: 0,
    lastRandomUpdate: 0
  });

  // Performance-optimized noise generation
  const updateRandomness = useCallback((timestamp: number) => {
    const random = randomStateRef.current;
    
    // Update noise with multiple frequencies for organic feel
    random.phase += 0.02;
    random.noiseX = Math.sin(random.phase) * 8 + Math.sin(random.phase * 2.3) * 3;
    random.noiseY = Math.cos(random.phase * 1.7) * 8 + Math.cos(random.phase * 0.9) * 3;
    
    // Occasional random jumps for liveliness
    if (timestamp - random.lastRandomUpdate > 1200 + Math.random() * 800) {
      random.offsetX = (Math.random() - 0.5) * 20;
      random.offsetY = (Math.random() - 0.5) * 20;
      random.lastRandomUpdate = timestamp;
    }
  }, []);

  // Throttled mouse handler with RAF
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const now = performance.now();
    
    // Throttle to ~60fps
    if (now - lastUpdateRef.current < 16) return;
    lastUpdateRef.current = now;

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    animationFrameRef.current = requestAnimationFrame((timestamp) => {
      updateRandomness(timestamp);
      
      const random = randomStateRef.current;
      const finalX = e.clientX + random.offsetX + random.noiseX;
      const finalY = e.clientY + random.offsetY + random.noiseY;
      
      // Batch CSS property updates
      if (containerRef.current) {
        const style = containerRef.current.style;
        style.setProperty('--mouse-x', `${finalX}px`);
        style.setProperty('--mouse-y', `${finalY}px`);
        style.setProperty('--noise-x', `${random.noiseX * 0.5}px`);
        style.setProperty('--noise-y', `${random.noiseY * 0.5}px`);
        style.setProperty('--random-scale', `${1 + Math.abs(random.noiseX) * 0.01}`);
      }
    });
  }, [updateRandomness]);

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove, { passive: true });
    
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [handleMouseMove]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 overflow-hidden pointer-events-none z-0 will-change-transform"
      style={{
        background: 'linear-gradient(135deg, #f9f9f9 0%, #f1f1f1 100%)',
        '--mouse-x': '50vw',
        '--mouse-y': '50vh',
        '--noise-x': '0px',
        '--noise-y': '0px',
        '--random-scale': '1',
      } as React.CSSProperties}
    >
      {/* Base Grid Pattern */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 0, 0, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '120px 120px',
          opacity: 0.3,
          willChange: 'transform',
        }}
      />
      
      {/* Primary Masked Glow - Sharp focus */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(
              circle calc(280px * var(--random-scale)) at var(--mouse-x) var(--mouse-y),
              rgba(0, 0, 0, 0.45) 0%,
              rgba(0, 0, 0, 0.25) 25%,
              rgba(0, 0, 0, 0.12) 50%,
              rgba(0, 0, 0, 0.06) 70%,
              transparent 100%
            )
          `,
          mask: `
            linear-gradient(to right, rgba(0, 0, 0, 1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 1) 1px, transparent 1px)
          `,
          maskSize: '120px 120px',
          WebkitMask: `
            linear-gradient(to right, rgba(0, 0, 0, 1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 1) 1px, transparent 1px)
          `,
          WebkitMaskSize: '120px 120px',
          filter: 'blur(1.5px)',
          pointerEvents: 'none',
          willChange: 'transform',
        }}
      />
      
      {/* Secondary Organic Layer */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(
              ellipse 420px 320px at var(--mouse-x) var(--mouse-y),
              rgba(0, 0, 0, 0.18) 0%,
              rgba(0, 0, 0, 0.10) 35%,
              rgba(0, 0, 0, 0.05) 60%,
              transparent 85%
            )
          `,
          mask: `
            linear-gradient(to right, rgba(0, 0, 0, 1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 1) 1px, transparent 1px)
          `,
          maskSize: '120px 120px',
          WebkitMask: `
            linear-gradient(to right, rgba(0, 0, 0, 1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 1) 1px, transparent 1px)
          `,
          WebkitMaskSize: '120px 120px',
          filter: 'blur(6px)',
          pointerEvents: 'none',
          willChange: 'transform',
        }}
      />
      
      {/* Organic Noise Layer */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(
              circle 180px at calc(var(--mouse-x) + var(--noise-x)) calc(var(--mouse-y) + var(--noise-y)),
              rgba(0, 0, 0, 0.22) 0%,
              rgba(0, 0, 0, 0.12) 40%,
              rgba(0, 0, 0, 0.06) 70%,
              transparent 90%
            )
          `,
          mask: `
            linear-gradient(to right, rgba(0, 0, 0, 1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 1) 1px, transparent 1px)
          `,
          maskSize: '120px 120px',
          WebkitMask: `
            linear-gradient(to right, rgba(0, 0, 0, 1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 1) 1px, transparent 1px)
          `,
          WebkitMaskSize: '120px 120px',
          filter: 'blur(3px)',
          pointerEvents: 'none',
          willChange: 'transform',
        }}
      />
      
      {/* Subtle Secondary Noise */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(
              ellipse 140px 200px at calc(var(--mouse-x) - var(--noise-x) * 0.7) calc(var(--mouse-y) + var(--noise-y) * 1.3),
              rgba(0, 0, 0, 0.15) 0%,
              rgba(0, 0, 0, 0.08) 50%,
              transparent 80%
            )
          `,
          mask: `
            linear-gradient(to right, rgba(0, 0, 0, 1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 1) 1px, transparent 1px)
          `,
          maskSize: '120px 120px',
          WebkitMask: `
            linear-gradient(to right, rgba(0, 0, 0, 1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 1) 1px, transparent 1px)
          `,
          WebkitMaskSize: '120px 120px',
          filter: 'blur(8px)',
          pointerEvents: 'none',
          willChange: 'transform',
        }}
      />
    </div>
  );
};

export default InteractiveGridBackground;
