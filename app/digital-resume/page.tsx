"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { LenisProvider } from "../components/LenisProvider";

const projects = [
  {
    id: "donna",
    title: "Donna",
    description: "A product created to show how effective RAG can be in a domain where semantic similarity can be leveraged while needing to retain the importance of specific words. A hybrid RAG system achieves this by weighting BM25 sparse embeddings with dense vector embeddings. The result is you get a retrieval system that balances between retrieving on meaning and frequency of words.",
  },
  {
    id: "superorganism",
    title: "Superorganism",
    description: "A modular design system exploring emergent behavior and adaptive components with focus on scalable architecture.",
  },
  {
    id: "ethos",
    title: "Ethos",
    description: "Interactive financial dashboards with a focus on progressive disclosure and intuitive data visualization.",
  },
  {
    id: "flow-voice-ai",
    title: "Flow Voice AI",
    description: "Conversational UI patterns for voice-driven workflows and micro-interactions in modern applications.",
  },
];

export default function DigitalResumePage() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ 
    target: sectionRef, 
    offset: ["start start", "end start"] 
  });

  const radius = useTransform(scrollYProgress, [0, 1], [40, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <LenisProvider>
      <main className="min-h-screen bg-neutral-100">
        
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col justify-center px-8 md:px-16">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8"
            >
              <span className="text-neutral-400 text-sm tracking-[0.2em] uppercase">
                Frame 3678
              </span>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-16"
            >
              <h1 className="text-black font-normal text-[clamp(1.2rem,3vw,1.5rem)] leading-[1.2] mb-2">
                Param
              </h1>
              <h2 className="text-black font-normal text-[clamp(1.2rem,3vw,1.5rem)] leading-[1.2]">
                Product Engineer
              </h2>
            </motion.div>
            
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-black font-normal text-[clamp(2.5rem,8vw,5rem)] leading-[1.1] tracking-[-0.02em] mb-12 max-w-3xl"
            >
              Interfaces that feel natural.
            </motion.h3>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-neutral-700 text-[clamp(1rem,2vw,1.1rem)] leading-[1.6] max-w-2xl"
            >
              I care about building products that require a level of illness. An utter thanklessness of what it is, what it offers and completely in devotion to what it could be.
            </motion.p>
          </div>
        </section>

        {/* Growing White Container */}
        <section ref={sectionRef} className="relative min-h-[200vh]">
          <motion.div
            className="sticky top-8 mx-auto max-w-7xl bg-white text-black"
            style={{ 
              borderRadius: radius, 
              scale,
              y
            }}
          >
            <motion.div 
              style={{ opacity }}
              className="p-[clamp(2rem,6vw,6rem)] min-h-[90vh]"
            >
              
              <div className="grid gap-16 md:gap-20">
                {projects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className="grid md:grid-cols-2 gap-8 md:gap-16 items-start"
                  >
                    
                    {/* Project Visual */}
                    <div className="aspect-[4/3] bg-black rounded-[24px] relative overflow-hidden">
                      <div className="absolute inset-0 bg-black"></div>
                    </div>
                    
                    {/* Project Info */}
                    <div className="space-y-6 md:pt-4">
                      <h3 className="text-black font-normal text-[clamp(1.5rem,3vw,2rem)] leading-[1.1]">
                        {project.title}
                      </h3>
                      
                      <p className="text-neutral-600 text-[clamp(1rem,2vw,1.1rem)] leading-[1.7]">
                        {project.description}
                      </p>
                    </div>
                    
                  </motion.div>
                ))}
              </div>
              
            </motion.div>
          </motion.div>
          
          <div className="h-[60vh]"></div>
        </section>
      </main>
    </LenisProvider>
  );
}
