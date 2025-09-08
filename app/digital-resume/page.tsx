"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { LenisProvider } from "../components/LenisProvider";

const gridItems = [
  { type: "project", id: "donna", title: "Donna", size: "medium", hasGif: true, hasCaption: true, description: "AI-powered RAG system combining semantic and lexical search for enterprise knowledge management." },
  { type: "text", id: "text1", content: "I believe in building products that demand obsession. The kind of work that keeps you up at night—not because it's broken, but because you can see how perfect it could be. Every detail matters. Every interaction is an opportunity to delight or disappoint." },
  { type: "project", id: "visual1", size: "large", hasGif: true, hasCaption: false },
  { type: "project", id: "ethos", title: "Ethos", size: "wide", hasGif: true, hasCaption: true, description: "Next-generation financial dashboards built for institutional traders. Real-time market data visualization with progressive disclosure patterns and intelligent information hierarchy." },
  { type: "divider", id: "div1" },
  { type: "text", id: "philosophy", content: "My approach combines deep technical expertise with strategic product thinking. I don't just build features—I architect experiences. Each project begins with understanding the human need, then crafting technology that feels inevitable." },
  { type: "project", id: "massive1", title: "Neural Canvas", size: "massive", hasGif: true, hasCaption: true, description: "Machine learning-powered creative platform for infinite visual compositions. Built with TensorFlow.js and custom WebGL shaders for real-time generative art creation." },
  { type: "spacer", id: "spacer1" },
  { type: "project", id: "visual2", size: "tall", hasGif: true, hasCaption: false },
  { type: "text", id: "text2", content: "Design is not decoration. It's the manifestation of intent. When users interact with interfaces I've crafted, they shouldn't think about the technology—they should feel empowered by it. The best products disappear, leaving only capability." },
  { type: "project", id: "flow", title: "Flow Voice AI", size: "medium", hasGif: true, hasCaption: true, description: "Conversational AI interface with natural language processing. Features advanced speech recognition, contextual understanding, and adaptive response generation." },
  { type: "project", id: "visual3", size: "wide", hasGif: true, hasCaption: false },
  { type: "project", id: "kinetic", title: "Kinetic Lab", size: "square", hasGif: true, hasCaption: true, description: "Research initiative exploring micro-interactions and motion design. Over 150 animation studies documenting the psychology of interface transitions." },
  { type: "divider", id: "div2" },
  { type: "text", id: "expertise", content: "Seven years building products that scale. From early-stage startups to enterprise platforms serving millions of users. My toolkit spans the full stack: React, Node.js, Python, cloud architecture, and emerging technologies like WebGPU and WebAssembly." },
  { type: "project", id: "massive2", title: "Immersive Data Landscapes", size: "massive", hasGif: true, hasCaption: true, description: "Three.js and WebXR experiments in spatial data visualization. Real-time rendering of complex datasets in virtual and augmented reality environments for Fortune 500 analytics teams." },
  { type: "text", id: "text3", content: "Code is poetry. Architecture is philosophy. Every function, every component, every abstraction tells a story about the problem it solves. I write software that other developers want to work with." },
  { type: "project", id: "visual4", size: "tall", hasGif: true, hasCaption: false },
  { type: "project", id: "algo", title: "Algorithm Visualizer", size: "large", hasGif: true, hasCaption: true, description: "Interactive educational platform for computer science concepts. Custom rendering engine built with Canvas API and WebGL for real-time algorithm visualization and teaching." },
  { type: "spacer", id: "spacer2" },
  { type: "text", id: "vision", content: "The future belongs to builders who understand both craft and commerce. Technical excellence without market understanding builds impressive demos. Business acumen without engineering depth builds fragile foundations. I bridge both worlds." },
  { type: "project", id: "visual5", size: "wide", hasGif: true, hasCaption: false },
  { type: "text", id: "collaboration", content: "I thrive in collaborative environments where diverse perspectives collide to create breakthrough solutions. Whether leading technical architecture decisions or contributing to product strategy, I bring both execution excellence and strategic thinking to every project." },
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
        className="col-span-full h-px bg-neutral-300 my-8 md:my-12"
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
        className="col-span-2 md:col-span-3 flex items-center py-4"
      >
        <p className="text-neutral-700 text-[clamp(1rem,2vw,1.2rem)] leading-[1.6] text-left font-normal max-w-md">
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
        className="col-span-8 row-span-4 relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Clean grid layout */}
        <div className="grid grid-cols-12 grid-rows-4 gap-3 h-full">
          
          {/* Main interface showcase */}
          <div className="col-span-8 row-span-3 bg-white rounded-xl overflow-hidden border border-neutral-200/30 relative flex items-center justify-center">
            <img 
              src="/donna/searchbar.gif" 
              alt="Donna Search Interface"
              className="max-w-full max-h-full object-contain"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white/95 via-white/90 to-transparent p-4">
              <div className="flex items-center gap-2 mb-1">
                <img src="/donna/Logo.png" alt="Donna" className="h-4 opacity-80" />
                <h3 className="text-black font-medium text-lg">Donna</h3>
              </div>
              <p className="text-neutral-600 text-sm">Hybrid RAG system for enterprise search</p>
            </div>
          </div>

          {/* Color palette - clean and minimal */}
          <div className="col-span-4 row-span-2 bg-white rounded-xl border border-neutral-200/30 p-4">
            <h4 className="text-neutral-700 font-medium text-sm mb-3">Color Palette</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-[#FEFEFE] border border-neutral-300 rounded-sm"></div>
                <span className="text-xs font-mono text-neutral-600">#FEFEFE</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-[#000000] border border-neutral-300 rounded-sm"></div>
                <span className="text-xs font-mono text-neutral-600">#000000</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-[#2F504F] border border-neutral-300 rounded-sm"></div>
                <span className="text-xs font-mono text-neutral-600">#2F504F</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-[#D7D8D9] border border-neutral-300 rounded-sm"></div>
                <span className="text-xs font-mono text-neutral-600">#D7D8D9</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-[#323232] border border-neutral-300 rounded-sm"></div>
                <span className="text-xs font-mono text-neutral-600">#323232</span>
              </div>
            </div>
          </div>

          {/* Problem analysis */}
          <div className="col-span-4 row-span-1 bg-white rounded-xl border border-neutral-200/30 p-3 flex items-center justify-center">
            <img src="/donna/key issues.png" alt="Analysis" className="max-w-full max-h-full object-contain opacity-90" />
          </div>

          {/* Main flow video */}
          <div className="col-span-4 row-span-2 bg-white rounded-xl overflow-hidden border border-neutral-200/30 relative flex items-center justify-center">
            <video 
              src="/donna/main-flow.mp4" 
              autoPlay 
              loop 
              muted 
              playsInline
              className="max-w-full max-h-full object-contain"
            />
            <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-xs text-white">
              Flow Demo
            </div>
          </div>

          {/* Key metrics */}
          <div className="col-span-8 row-span-1 bg-neutral-50/80 rounded-xl p-4 flex items-center justify-between">
            <div>
              <h4 className="text-black font-medium text-sm mb-1">Hybrid Search Architecture</h4>
              <p className="text-neutral-600 text-xs">BM25 + Dense Vector Embeddings for optimal retrieval accuracy</p>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <div className="text-center">
                <div className="font-semibold text-black">73%</div>
                <div className="text-xs text-neutral-600">Accuracy</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-black">&lt;200ms</div>
                <div className="text-xs text-neutral-600">Response</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-black">10M+</div>
                <div className="text-xs text-neutral-600">Documents</div>
              </div>
            </div>
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
        ${item.size === "medium" ? "col-span-2 row-span-1" : ""}
        ${item.size === "large" ? "col-span-2 row-span-2" : ""}
        ${item.size === "wide" ? "col-span-3 row-span-1" : ""}
        ${item.size === "tall" ? "col-span-1 row-span-2" : ""}
        ${item.size === "massive" ? "col-span-4 md:col-span-5 lg:col-span-7 row-span-2" : ""}
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
          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-black/90 via-black/70 to-transparent">
            <h3 className="text-white font-medium text-[clamp(0.9rem,1.8vw,1.1rem)] leading-tight mb-1">
              {item.title}
            </h3>
            
            <motion.p 
              className="text-white/80 text-[clamp(0.8rem,1.4vw,0.9rem)] leading-relaxed text-left"
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

        {/* Dynamic Grid Section */}
        <section className="py-16 md:py-24 px-8 md:px-16 overflow-hidden">
          <div className="max-w-[120vw] mx-auto">
            <div className="
              grid gap-4 md:gap-6 lg:gap-8
              grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8
              auto-rows-[minmax(120px,auto)]
              md:auto-rows-[minmax(160px,auto)]
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
