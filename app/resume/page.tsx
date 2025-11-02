"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { LenisProvider, useLenis } from "../components/LenisProvider";

const gridItems = [
  { type: "project", id: "donna", title: "Donna", size: "medium", hasGif: true, hasCaption: true, description: "AI-powered RAG system combining semantic and lexical search for enterprise knowledge management." },
  { type: "figma", id: "donna-figma", title: "OMNI - Bali", figmaUrl: "https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fdesign%2Fl3MLIb0U9yFnRrLnhtlHb9%2FOmni-web-First-Draft--Param-%3Fm%3Dauto%26t%3DqOFOcBmYpB8I7QI6-1"},
  { type: "project", id: "chief-claude", title: "Chief Claude", size: "placeholder", hasCaption: true, description: "AI-powered executive assistant bringing strategic thinking to everyday tasks." }
];

const TableOfContents = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const [isVisible, setIsVisible] = useState(true);
  const { lenis } = useLenis();

  const sections = [
    { id: "hero", label: "Intro", number: "01" },
    { id: "donna", label: "Donna AI", number: "02" },
    { id: "omni", label: "Omni", number: "03" },
    { id: "chief-claude", label: "Chief Claude", number: "04" },
  ];

  useEffect(() => {
    // Use IntersectionObserver for section detection
    const observerOptions = {
      rootMargin: "-30% 0px -50% 0px",
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    // Observe all sections
    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    // Simple visibility check
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Hide when near bottom
      setIsVisible(scrollY < documentHeight - windowHeight - 300);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    if (!lenis) return;
    
    const element = document.getElementById(sectionId);
    if (element) {
      const currentScroll = window.scrollY;
      const targetScroll = element.offsetTop;
      const distance = Math.abs(targetScroll - currentScroll);
      
      // Scale duration based on distance, but cap it
      const duration = Math.min(Math.max(0.8, distance / 2000), 2);
      
      lenis.scrollTo(element, {
        offset: 0,
        duration,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
      });
    }
  };

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.6, delay: 1.2 }}
      className="fixed right-6 md:right-8 lg:right-12 top-1/2 -translate-y-1/2 z-30 hidden lg:block"
    >
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-0 top-0 bottom-0 w-px bg-neutral-200"></div>
        
        {/* Active section indicator */}
        <motion.div
          className="absolute left-0 w-px bg-black"
          style={{
            height: "40px",
          }}
          animate={{
            y: sections.findIndex(s => s.id === activeSection) * 80
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
        />

        <div className="pl-6 space-y-8">
          {sections.map((section, index) => (
            <motion.button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className="group block text-left relative"
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <div className="flex items-center gap-3">
                <motion.span
                  className={`font-mono text-xs tracking-wider transition-colors duration-300 ${
                    activeSection === section.id
                      ? "text-black font-medium"
                      : "text-neutral-400 group-hover:text-neutral-600"
                  }`}
                >
                  {section.number}
                </motion.span>
                <motion.span
                  className={`text-sm font-medium transition-colors duration-300 ${
                    activeSection === section.id
                      ? "text-black"
                      : "text-neutral-500 group-hover:text-neutral-700"
                  }`}
                >
                  {section.label}
                </motion.span>
              </div>
              
              {/* Hover line animation */}
              <motion.div
                className="absolute -left-6 top-1/2 -translate-y-1/2 w-4 h-px bg-neutral-300 opacity-0 group-hover:opacity-100"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.2 }}
              />
            </motion.button>
          ))}
        </div>

        {/* Decorative dot */}
        <motion.div
          className="absolute -left-1 bottom-0 w-2 h-2 bg-neutral-200 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    </motion.div>
  );
};

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

  // Figma embed component
  if (item.type === "figma") {
    return (
      <motion.div
        key={item.id}
        id="omni"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        className="col-span-2 md:col-span-4 lg:col-span-6 xl:col-span-8 row-span-4 md:row-span-6 relative mt-16 md:mt-20 lg:mt-24"
      >
        {/* Title Section */}
        <div className="mb-6 md:mb-8">
          <h3 className="text-2xl md:text-3xl font-light text-neutral-900 tracking-tight">{item.title}</h3>
          <div className="flex items-center gap-2 mt-2">
            <div className="w-1 h-1 bg-neutral-400 rounded-full"></div>
            <p className="text-sm text-neutral-500 font-medium tracking-wide uppercase">Interactive Design Prototype</p>
          </div>
        </div>

        {/* Enhanced Figma Embed */}
        <div className="relative group">
          {/* Subtle glow effect */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-neutral-100 to-neutral-50 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
          
          {/* Main iframe container */}
          <div className="relative w-full h-[450px] md:h-[550px] lg:h-[650px] rounded-xl overflow-hidden border border-neutral-200/80 bg-white shadow-lg shadow-neutral-200/50 backdrop-blur-sm">
            <iframe
              src={item.figmaUrl}
              width="100%"
              height="100%"
              allowFullScreen
              className="border-0 bg-white"
              title={item.title}
              loading="lazy"
            />
          </div>
          
          {/* Overlay for loading state */}
          <div className="absolute inset-0 bg-neutral-50 rounded-xl flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-0 transition-opacity duration-300">
            <div className="flex items-center gap-2 text-neutral-400">
              <div className="w-2 h-2 bg-neutral-300 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Loading Figma...</span>
            </div>
          </div>
        </div>

        {/* Enhanced View in Figma Link */}
        <div className="flex justify-between items-center mt-6">
          <div className="text-xs text-neutral-400 font-mono">
            Design System • Interactive Prototype
          </div>
          <a 
            href={item.figmaUrl.replace('embed?embed_host=share&url=', '').replace(/%3A/g, ':').replace(/%2F/g, '/')} 
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-4 py-2 text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50 rounded-lg transition-all duration-300 text-sm font-medium border border-transparent hover:border-neutral-200"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.354-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.015-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.02 3.019 3.02h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V8.981H8.148zM8.172 24c-2.489 0-4.515-2.014-4.515-4.49s2.014-4.49 4.49-4.49h4.588v4.441c0 2.503-2.047 4.539-4.563 4.539zm-.024-7.51a3.023 3.023 0 0 0-3.019 3.019c0 1.665 1.365 3.019 3.044 3.019 1.705 0 3.093-1.376 3.093-3.068v-2.97H8.148z"/>
            </svg>
            <span className="relative">
              Open in Figma
              <span className="absolute bottom-0 left-0 w-0 h-px bg-neutral-400 group-hover:w-full transition-all duration-300 ease-out" />
            </span>
            <svg 
              className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300 ease-out opacity-60 group-hover:opacity-100" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </a>
        </div>
      </motion.div>
    );
  }

  // Clean Donna showcase
  if (item.id === "donna") {
    return (
      <motion.div
        key={item.id}
        id="donna"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        className="col-span-2 md:col-span-4 lg:col-span-6 xl:col-span-8 row-span-6 md:row-span-4 relative mt-16 md:mt-20 lg:mt-24"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Title Section */}
        <div className="mb-6 md:mb-8">
          <h3 className="text-2xl md:text-3xl font-light text-neutral-900 tracking-tight">{item.title}</h3>
          <div className="flex items-center gap-2 mt-2">
            <div className="w-1 h-1 bg-neutral-400 rounded-full"></div>
            <p className="text-sm text-neutral-500 font-medium tracking-wide uppercase">AI-Powered Legal Research</p>
          </div>
        </div>

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
                From problem recognition to product solution
              </p>
              
              <p className="text-neutral-600 text-xs leading-relaxed">
                After identifying the core issue, I conducted user interviews with law associates in Auckland to understand their workflows. The insight: navigating cases was a massive time sink requiring both <span className="font-medium text-neutral-800">accurate surfacing and intelligent digestion</span> of legal documents.
              </p>
              
              <div className="space-y-2">
                <p className="text-neutral-700 text-[11px] leading-relaxed">
                  <span className="font-semibold text-neutral-900">Surface</span><br/>
                  Hybrid RAG balances semantic similarity with keyword precision—critical in legal domains where terminology matters
                </p>
                
                <p className="text-neutral-700 text-[11px] leading-relaxed">
                  <span className="font-semibold text-neutral-900">Digest</span><br/>
                  At-a-glance summaries with contextual details and clickable citations
                </p>
                
                <p className="text-neutral-700 text-[11px] leading-relaxed">
                  <span className="font-semibold text-neutral-900">Action</span><br/>
                  Direct navigation to relevant case sections via citation links
                </p>
              </div>
              
              <div className="pt-2 border-t border-neutral-100">
                <p className="text-neutral-500 text-[10px] font-medium uppercase tracking-wider">
                  Research → Prototype → Solution
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
                    Created aesthetics to match functional requirements: <span className="font-medium text-neutral-800">legal sophistication with modern usability</span>. The result provides maximum information density while maintaining scan-ability—citations are clickable and take users directly to relevant case sections.
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

  // Chief Claude placeholder
  if (item.id === "chief-claude") {
    return (
      <motion.div
        key={item.id}
        id="chief-claude"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        className="col-span-2 md:col-span-4 lg:col-span-6 xl:col-span-8 row-span-3 md:row-span-2 relative mt-16 md:mt-20 lg:mt-24"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          className="h-full bg-gradient-to-br from-neutral-100 via-neutral-50 to-white rounded-2xl md:rounded-3xl overflow-hidden border border-neutral-200/80 relative flex items-center justify-center"
          whileHover={{ 
            scale: 1.01,
            boxShadow: "0 20px 60px rgba(0,0,0,0.08)",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {/* Coming Soon Content */}
          <div className="text-center p-6 md:p-8 lg:p-12">
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="mb-4"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 mx-auto bg-gradient-to-br from-neutral-300 to-neutral-400 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 md:w-10 md:h-10 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </motion.div>
            
            <h3 className="text-xl md:text-2xl lg:text-3xl font-light text-neutral-900 tracking-tight mb-3">
              {item.title}
            </h3>
            
            <p className="text-neutral-600 text-sm md:text-base leading-relaxed mb-4 max-w-md mx-auto">
              {item.description}
            </p>
            
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-100 text-neutral-700 rounded-full text-sm font-medium">
              <div className="w-2 h-2 bg-neutral-400 rounded-full animate-pulse"></div>
              Coming Soon
            </div>
          </div>
        </motion.div>
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

function DigitalResumeContent() {
  return (
    <main className="min-h-screen bg-transparent">
      
      {/* Digital Resume Title */}
      <section className="pt-8 md:pt-12 pb-4 md:pb-6 px-4 md:px-8 lg:px-16">
        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-neutral-500 font-mono text-sm md:text-base tracking-[0.15em] uppercase font-light"
            style={{ fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace' }}
          >
            Digital Resume
          </motion.h1>
        </div>
      </section>
      
      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex flex-col justify-center px-4 md:px-8 lg:px-16 relative">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6 md:mb-8"
          >
            <span className="text-neutral-400 text-sm tracking-[0.2em] uppercase">
              V 1.11.2077
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
            Interfaces that feel like art.
          </motion.h3>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-neutral-700 text-[clamp(1rem,2.5vw,1.1rem)] leading-[1.6] max-w-2xl"
          >
            An engineer first, designer devoted to building experiences that invoke emotion in the age of AI.
          </motion.p>
        </div>
        
        {/* Table of Contents */}
        <TableOfContents />
      </section>

      {/* Dynamic Grid Section */}
      <section id="projects" className="py-12 md:py-16 lg:py-24 px-4 md:px-8 lg:px-16 overflow-hidden">
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
  );
}

export default function DigitalResumePage() {
  return (
    <LenisProvider>
      <DigitalResumeContent />
    </LenisProvider>
  );
}
