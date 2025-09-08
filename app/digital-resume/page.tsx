"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { LenisProvider } from "../components/LenisProvider";

const gridItems = [
  { type: "project", id: "donna", title: "Donna", size: "medium", hasGif: true, hasCaption: true, description: "AI-powered RAG system combining semantic and lexical search for enterprise knowledge management." },
];

const GridCard = ({ item, index }: { item: any; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);

  if (item.type === "divider") {
    return (
      <motion.div
        key={item.id}
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: index * 0.1 }}
        className="col-span-full h-px bg-neutral-300 my-6 md:my-8 lg:my-12"
        style={{ gridColumn: "1 / -1" }}
      />
    );
  }

  if (item.type === "spacer") {
    return (
      <div key={item.id} className={`
        ${item.size === "large" ? "col-span-2 row-span-2" : ""}
        ${item.size === "medium" ? "col-span-1 row-span-1" : ""}
        ${item.size === "small" ? "col-span-1 row-span-1" : ""}
      `} />
    );
  }

  if (item.type === "text") {
    return (
      <motion.div
        key={item.id}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        className="col-span-2 md:col-span-3 lg:col-span-4 xl:col-span-3 flex items-center py-4 md:py-6"
      >
        <p className="text-neutral-700 text-[clamp(0.9rem,2.5vw,1.2rem)] leading-[1.6] text-left font-normal max-w-none md:max-w-md">
          {item.content}
        </p>
      </motion.div>
    );
  }

  // Clean Donna showcase
  if (item.id === "donna") {
    return (
      <motion.div
        key={item.id}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        className="col-span-2 md:col-span-4 lg:col-span-6 xl:col-span-8 row-span-6 md:row-span-4 relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Visit Link */}
        <div className="flex justify-end mb-4">
          <a 
            href="https://www.donna.param.nz/research" 
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-neutral-600 hover:text-neutral-900 transition-colors duration-300 text-sm font-medium"
          >
            <span className="relative">
              Visit Donna Research
              <span className="absolute bottom-0 left-0 w-0 h-px bg-neutral-400 group-hover:w-full transition-all duration-300 ease-out" />
            </span>
            <svg 
              className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300 ease-out opacity-70 group-hover:opacity-100" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </a>
        </div>

        {/* Tight masonry grid - content-aware layout */}
        <div className="grid gap-2 md:gap-3 h-full donna-grid">

          {/* Logo card - large logo with overflow clipping */}
          <div className="bg-black rounded-xl overflow-hidden border border-neutral-200/30 flex items-center justify-center"
               style={{ gridArea: "logo" }}>
            <img src="/donna/Logo.png" alt="Donna Logo" className="w-[150%] h-auto object-contain" />
          </div>

          {/* Description - tall content area */}
          <div className="bg-white  rounded-xl border border-neutral-200/30 p-3 md:p-4 flex flex-col justify-start"
               style={{ gridArea: "description" }}>
            <div className="mb-3 md:mb-4">
              <h2 className="text-neutral-900 font-semibold text-xl md:text-2xl mb-1 leading-tight">Donna</h2>
              <p className="text-neutral-500 text-xs uppercase tracking-wide font-medium">AI Search Reimagined</p>
            </div>
            
            <div className="space-y-2 md:space-y-3">
              <p className="text-neutral-800 text-sm font-medium leading-snug">
                The future of enterprise knowledge retrieval
              </p>
              
              <p className="text-neutral-600 text-xs leading-relaxed">
                Built to solve the fundamental problem: <span className="font-medium text-neutral-800">meaning vs. precision</span>. Traditional search fails when you need both semantic understanding and exact terminology.
              </p>
              
              <div className="space-y-2">
                <p className="text-neutral-700 text-[11px] leading-relaxed">
                  <span className="font-semibold text-neutral-900">Hybrid RAG Architecture</span><br/>
                  Combines BM25 sparse embeddings with dense vectors
                </p>
                
                <p className="text-neutral-700 text-[11px] leading-relaxed">
                  <span className="font-semibold text-neutral-900">Intelligent Weighting</span><br/>
                  Balances context with keyword specificity
                </p>
              </div>
              
              <div className="pt-2 border-t border-neutral-100">
                <p className="text-neutral-500 text-[10px] font-medium uppercase tracking-wider">
                  Vision: Enterprise knowledge that thinks
                </p>
              </div>
            </div>
            
            {/* Quote Section */}
            <div className="mt-6 pt-4 border-t border-neutral-100">
              <div className="relative">
                <svg className="absolute -top-1 -left-1 w-3 h-3 text-neutral-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                </svg>
                <blockquote className="pl-4 pr-2">
                  <p className="text-neutral-800 text-base font-medium leading-relaxed italic mb-2">
                    "I wanted to eliminate the grunt work that buries lawyers. Too much time spent manually sifting through cases, page by tedious page."
                  </p>
                  <footer className="text-neutral-500 text-xs not-italic font-normal">
                    — The problem that sparked Donna
                  </footer>
                </blockquote>
              </div>
            </div>
            
            {/* Client & Design Context */}
            <div className="mt-6 pt-4 border-t border-neutral-100">
              <div className="space-y-3">
                <div>
                  <p className="text-neutral-500 text-[10px] uppercase tracking-wider font-medium mb-1">Client</p>
                  <p className="text-neutral-800 text-xs font-medium">
                    Prototype for <span className="font-semibold">Ivo AI</span> — SF-based legal AI company
                  </p>
                </div>
                
                <div>
                  <p className="text-neutral-500 text-[10px] uppercase tracking-wider font-medium mb-1">Design Case Study</p>
                  <p className="text-neutral-700 text-[11px] leading-relaxed">
                    Actual client work requiring <span className="font-medium text-neutral-800">aestheticism, legal sophistication, and refined color palette</span>. Typography carefully chosen: Inter for interface clarity, Georgia for document authenticity.
                  </p>
                </div>
                
                <div>
                  <p className="text-neutral-500 text-[10px] uppercase tracking-wider font-medium mb-1">Tech Stack</p>
                  <div className="flex flex-wrap gap-1">
                    <span className="text-[10px] bg-neutral-100 text-neutral-700 px-2 py-0.5 rounded font-medium">Next.js</span>
                    <span className="text-[10px] bg-neutral-100 text-neutral-700 px-2 py-0.5 rounded font-medium">React</span>
                    <span className="text-[10px] bg-neutral-100 text-neutral-700 px-2 py-0.5 rounded font-medium">Upstash</span>
                    <span className="text-[10px] bg-neutral-100 text-neutral-700 px-2 py-0.5 rounded font-medium">Supabase</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Color palette - 4 rows filling container */}
          <div className="rounded-xl border border-neutral-200/30  flex flex-col h-full"
               style={{ gridArea: "palette" }}>
            <div className="w-full h-full flex flex-col justify-between">
              <div className="w-full flex-1 bg-[#FEFEFE] border border-neutral-200 rounded" />
              <div className="w-full h-0.5 bg-white my-1" />
              <div className="w-full flex-1 bg-[#000000] border border-neutral-200 rounded" />
              <div className="w-full h-0.5 bg-white my-1" />
              <div className="w-full flex-1 bg-[#2F504F] border border-neutral-200 rounded" />
              <div className="w-full h-0.5 bg-white my-1" />
              <div className="w-full flex-1 bg-[#D7D8D9] border border-neutral-200 rounded" />
            </div>
          </div>

          {/* Forest image - respecting 2:3 aspect ratio */}
          <div className="bg-white rounded-xl border border-neutral-200/30 flex items-center justify-center"
               style={{ gridArea: "placeholder" }}>
            <div className="w-full aspect-[2/3]">
              <img src="/donna/forest.png" alt="Forest" className="w-full h-full object-cover rounded" />
            </div>
          </div>

          {/* Search Video - natural 16:10 ratio */}
          <div className="bg-white rounded-xl overflow-hidden border border-neutral-200/30 relative flex items-center justify-center p-2 md:p-3"
               style={{ gridArea: "search" }}>
            <div className="w-full aspect-[16/10]">
              <video
                src="/donna/searchbar.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-contain rounded"
              />
            </div>
          </div>

          {/* Video - spans full width bottom */}
          <div className="bg-white rounded-xl overflow-hidden border border-neutral-200/30 relative flex items-center justify-center p-2 md:p-3"
               style={{ gridArea: "video" }}>
            <div className="w-full aspect-[16/9] rounded-xl">
              <video
                src="/donna/main-flow.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-contain rounded"
              />
            </div>
            <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-xs text-white">Flow Demo</div>
          </div>

        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      key={item.id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`
        group cursor-pointer relative
        ${item.size === "square" ? "col-span-1 row-span-1" : ""}
        ${item.size === "medium" ? "col-span-2 md:col-span-2 row-span-1" : ""}
        ${item.size === "large" ? "col-span-2 md:col-span-2 row-span-2" : ""}
        ${item.size === "wide" ? "col-span-2 md:col-span-3 lg:col-span-3 row-span-1" : ""}
        ${item.size === "tall" ? "col-span-1 md:col-span-1 row-span-2" : ""}
        ${item.size === "massive" ? "col-span-2 md:col-span-4 lg:col-span-5 xl:col-span-7 row-span-2 md:row-span-2" : ""}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="h-full bg-white rounded-2xl md:rounded-3xl overflow-hidden border border-neutral-200/50 relative"
        style={{ boxShadow: "0 6px 25px rgba(0, 0, 0, 0.12)" }}
        whileHover={{ 
          scale: 1.02,
          boxShadow: "0 20px 60px rgba(0,0,0,0.18)",
          borderColor: "rgba(0,0,0,0.15)"
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Media fills entire card */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-neutral-800 to-neutral-900">
          {/* Placeholder for actual media content */}
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-700/20 via-transparent to-black/40" />
        </div>

        {/* Text Content Overlay - Only if hasCaption */}
        {item.hasCaption && (
          <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 lg:p-6 bg-gradient-to-t from-black/90 via-black/70 to-transparent">
            <h3 className="text-white font-medium text-[clamp(0.8rem,2vw,1.1rem)] leading-tight mb-1">
              {item.title}
            </h3>
            
            <motion.p 
              className="text-white/80 text-[clamp(0.7rem,1.5vw,0.9rem)] leading-relaxed text-left"
              initial={{ opacity: 0.7 }}
              animate={{ opacity: isHovered ? 1 : 0.7 }}
              transition={{ duration: 0.2 }}
            >
              {item.description}
            </motion.p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default function DigitalResumePage() {
  return (
    <LenisProvider>
      <main className="min-h-screen bg-neutral-100">
        
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col justify-center px-4 md:px-8 lg:px-16">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-6 md:mb-8"
            >
              <span className="text-neutral-400 text-sm tracking-[0.2em] uppercase">
                Frame 3678
              </span>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-12 md:mb-16"
            >
              <h1 className="text-black font-normal text-[clamp(1.2rem,4vw,1.5rem)] leading-[1.2] mb-2">
                Param
              </h1>
              <h2 className="text-black font-normal text-[clamp(1.2rem,4vw,1.5rem)] leading-[1.2]">
                Product Engineer
              </h2>
            </motion.div>
            
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-black font-normal text-[clamp(2rem,8vw,5rem)] leading-[1.1] tracking-[-0.02em] mb-8 md:mb-12 max-w-3xl"
            >
              Interfaces that feel natural.
            </motion.h3>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-neutral-700 text-[clamp(1rem,2.5vw,1.1rem)] leading-[1.6] max-w-2xl"
            >
              I care about building products that require a level of illness. An utter thanklessness of what it is, what it offers and completely in devotion to what it could be.
            </motion.p>
          </div>
        </section>

        {/* Dynamic Grid Section */}
        <section className="py-12 md:py-16 lg:py-24 px-4 md:px-8 lg:px-16 overflow-hidden">
          <div className="max-w-[100vw] md:max-w-[120vw] mx-auto">
            <div className="
              grid gap-3 md:gap-4 lg:gap-6 xl:gap-8
              grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8
              auto-rows-[minmax(100px,auto)]
              md:auto-rows-[minmax(140px,auto)]
              lg:auto-rows-[minmax(160px,auto)]
            ">
              {gridItems.map((item, index) => (
                <GridCard key={item.id} item={item} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Footer Space */}
        <div className="h-32 md:h-48"></div>
      </main>
    </LenisProvider>
  );
}
