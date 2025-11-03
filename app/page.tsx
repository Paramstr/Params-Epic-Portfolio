"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import GlitchMosaic from "./components/GlitchMosaic"
import { workExperience, projects, research, design } from "./projects.js"

const PrecisionNutritionAnimation = () => {
  const emojiRows = [
    ["🥑", "🥦", "🍎", "🥕", "🍇", "🥒", "🍓", "🥗", "🥭", "🫐", "🍌", "🍊"],
    ["🍎", "🥗", "🥕", "🥦", "🍋", "🥑", "🍊", "🥒", "🍠", "🍉", "🥒", "🍍"],
    ["🥕", "🥬", "🍇", "🥑", "🍅", "🥗", "🍍", "🥒", "🍌", "🍓", "🍇", "🥭"],
    ["🍉", "🥒", "🥗", "🍇", "🍎", "🥑", "🥬", "🍍", "🍊", "🫐", "🥬", "🍋"],
    ["🍊", "🥑", "🥕", "🍓", "🥬", "🍇", "🍌", "🥗", "🥒", "🍍", "🍓", "🍎"],
    ["🍇", "🍉", "🍊", "🥦", "🥕", "🍓", "🥭", "🍍", "🥬", "🍌", "🥒", "🍊"],
    ["🥬", "🍇", "🍉", "🥑", "🍓", "🍎", "🥦", "🍍", "🍌", "🥗", "🍋", "🥒"],
    ["🍎", "🥒", "🥑", "🍇", "🥕", "🥗", "🍉", "🍌", "🥭", "🍓", "🍍", "🥬"],
    ["🥒", "🍌", "🍊", "🥦", "🍍", "🍑", "🥬", "🍇", "🍎", "🥗", "🍉", "🍋"],
    ["🍋", "🥥", "🥕", "🍊", "🍇", "🥒", "🥑", "🍉", "🥭", "🥬", "🥗", "🍍"],
  ]

  return (
    <div className="relative h-full w-full bg-white">
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute pointer-events-none"
          style={{
            inset: "-45%",
            transform: "rotate(12deg) scale(1.18)",
            transformOrigin: "center",
          }}
        >
          {emojiRows.map((row, rowIndex) => {
            const copies = 4
            const stream = Array.from({ length: row.length * copies }, (_, idx) => row[idx % row.length])
            const duration = 16 - rowIndex * 0.6
            const travel = -(100 / copies)

            return (
              <div
                key={rowIndex}
                className="absolute overflow-hidden"
                style={{
                  top: `${rowIndex * 8}%`,
                  left: "-30%",
                  width: "160%",
                  height: "4.25rem",
                }}
              >
                <motion.div
                  className="flex gap-8 text-[40px] sm:text-[48px] text-emerald-600/90 whitespace-nowrap"
                  animate={{ x: ["0%", `${travel}%`] }}
                  transition={{
                    duration,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{ willChange: "transform", transform: "translate3d(0,0,0)" }}
                >
                  {stream.map((emoji, emojiIndex) => (
                    <span key={`${rowIndex}-${emojiIndex}`} className="select-none">
                      {emoji}
                    </span>
                  ))}
                </motion.div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}


export default function Portfolio() {

  return (
    <div className="min-h-screen bg-white text-black relative z-20">
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-sm z-50">
        <div className="flex justify-between items-center px-4 py-2 max-w-[1440px] mx-auto">
          <Link href="/" className="font-mono text-xs">
            P·S
          </Link>
          <div className="flex items-center space-x-4 font-mono text-xs">
            <div className="text-gray-500">43.5320° S, 172.6306° E</div>

            <motion.a
              href="https://www.linkedin.com/in/parambir-singh-769736159/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hover:text-gray-600"
            >
              LinkedIn
            </motion.a>
            <motion.a
              href="https://twitter.com/yourhandle"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hover:text-gray-600"
            >
              Twitter
            </motion.a>
          </div>
        </div>
      </header>

      <main className="pt-32">
        {/* Main Content Section - Constrained Width */}
        <div className="max-w-[1440px] mx-auto px-6">
          {/* Header Section */}
          <div className="grid md:grid-cols-2 gap-24 mb-16">
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Title */}
              <h1 className="text-4xl md:text-4xl font-normal text-gray-900 leading-tight mb-4">
                I'm <span className="font-bold">Param</span>, a systems engineer who{" "}
                <span className="italic">designs</span>.
              </h1>

              {/* Work Experience, Projects, Research Section */}
            <div className="mb-24 max-w-2xl">
              <div className="space-y-6 text-xs font-mono">
                {/* Work Experience */}
                <div className="space-y-1">
                  <h3 className="text-gray-400 uppercase tracking-wide text-xs mb-2">Work Experience</h3>
                  {workExperience.map((work, index) => {
                    const RowComponent = work.url ? motion.a : motion.div;
                    const rowProps = work.url ? {
                      href: work.url,
                      target: "_blank",
                      rel: "noopener noreferrer"
                    } : {};
                    
                    return (
                      <RowComponent 
                        key={index} 
                        className="flex justify-between items-center py-1 px-2 -mx-2 rounded cursor-pointer hover:bg-gray-50 transition-colors duration-200 group"
                        whileHover={{ x: 2 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        {...rowProps}
                      >
                        <span className="text-gray-500 w-28 flex-shrink-0">{work.dateRange || work.yearDisplay || work.year}</span>
                        <span className="flex-1 text-left">{work.company}</span>
                        <div className="flex items-center gap-1">
                          <span className="text-gray-500 text-right">{work.tag}</span>
                          <div className="w-3 h-3 flex items-center justify-center">
                            {work.url && (
                              <svg 
                                className="w-3 h-3 text-gray-400" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
                              </svg>
                            )}
                          </div>
                        </div>
                      </RowComponent>
                    );
                  })}
                </div>

                <div className="border-t border-gray-200"></div>

                {/* Projects */}
                <div className="space-y-1">
                  <h3 className="text-gray-400 uppercase tracking-wide text-xs mb-2">Projects</h3>
                  {projects.map((project, index) => {
                    const RowComponent = project.url ? motion.a : motion.div;
                    const rowProps = project.url ? {
                      href: project.url,
                      target: "_blank",
                      rel: "noopener noreferrer"
                    } : {};
                    
                    return (
                      <RowComponent 
                        key={index} 
                        className="flex justify-between items-center py-1 px-2 -mx-2 rounded cursor-pointer hover:bg-gray-50 transition-colors duration-200 group"
                        whileHover={{ x: 2 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        {...rowProps}
                      >
                        <span className="text-gray-500 w-12">{project.year}</span>
                        <span className="flex-1 text-left">{project.name}</span>
                        <div className="flex items-center gap-1">
                          <span className="text-gray-500 text-right">{project.tag}</span>
                          <div className="w-3 h-3 flex items-center justify-center">
                            {project.url && (
                              <svg 
                                className="w-3 h-3 text-gray-400" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
                              </svg>
                            )}
                          </div>
                        </div>
                      </RowComponent>
                    );
                  })}
                </div>

                <div className="border-t border-gray-200"></div>

                {/* Research */}
                <div className="space-y-1">
                  <h3 className="text-gray-400 uppercase tracking-wide text-xs mb-2">Research</h3>
                  {research.map((item, index) => {
                    const RowComponent = item.url ? motion.a : motion.div;
                    const rowProps = item.url ? {
                      href: item.url,
                      target: "_blank",
                      rel: "noopener noreferrer"
                    } : {};
                    
                    return (
                      <RowComponent 
                        key={index} 
                        className="flex justify-between items-center py-1 px-2 -mx-2 rounded cursor-pointer hover:bg-gray-50 transition-colors duration-200 group"
                        whileHover={{ x: 2 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        {...rowProps}
                      >
                        <span className="text-gray-500 w-12">{item.year}</span>
                        <span className="flex-1 text-left">{item.name}</span>
                        <div className="flex items-center gap-1">
                          <span className="text-gray-500 text-right">{item.tag}</span>
                          <div className="w-3 h-3 flex items-center justify-center">
                            {item.url && (
                              <svg 
                                className="w-3 h-3 text-gray-400" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
                              </svg>
                            )}
                          </div>
                        </div>
                      </RowComponent>
                    );
                  })}
                </div>

                <div className="border-t border-gray-200"></div>

                {/* Design */}
                <div className="space-y-1">
                  <h3 className="text-gray-400 uppercase tracking-wide text-xs mb-2">Design</h3>
                  {design.map((item, index) => {
                    const RowComponent = item.url ? motion.a : motion.div;
                    const rowProps = item.url ? {
                      href: item.url,
                      target: "_blank",
                      rel: "noopener noreferrer"
                    } : {};
                    
                    return (
                      <RowComponent 
                        key={index} 
                        className="flex justify-between items-center py-1 px-2 -mx-2 rounded cursor-pointer hover:bg-gray-50 transition-colors duration-200 group"
                        whileHover={{ x: 2 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        {...rowProps}
                      >
                        <span className="text-gray-500 w-12">{item.year}</span>
                        <span className="flex-1 text-left">{item.name}</span>
                        <div className="flex items-center gap-1">
                          <span className="text-gray-500 text-right">{item.tag}</span>
                          <div className="w-3 h-3 flex items-center justify-center">
                            {item.url && (
                              <svg 
                                className="w-3 h-3 text-gray-400" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
                              </svg>
                            )}
                          </div>
                        </div>
                      </RowComponent>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="flex justify-end"
          >
            <div className="flex-1 w-full max-w-[26rem] sm:max-w-[30rem]">
              <GlitchMosaic />
            </div>
          </motion.div>
        </div>

        {/* Personal Introduction Section */}
        <motion.div 
          className="grid md:grid-cols-2 gap-12 mb-32 max-w-full"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          <div className="space-y-6">
            <p className="text-gray-500 leading-relaxed text-xs font-mono">
              I’m a computer engineer who spends most mornings asking how the tricks we perfected for tweets and trades can be reused for proteins and power grids.  Bits feel mostly solved; atoms still need work.
            </p>

            <p className="text-gray-500 leading-relaxed text-xs font-mono">
              While ChatGPT was still a lab demo I was shipping one of the first offline LLM runtimes to iOS production.  I later trained a deep-learning model to spot cellular death in multispectral imagery (work done through Jones), and now I’m turning cheap olfaction sensor arrays into early-warning systems for chronic disease by reading metabolic signatures on breath.
            </p>
          </div>
          <div>
            <p className="text-gray-500 leading-relaxed text-xs font-mono">
              I look for roles that let me stay cross-disciplinary, talk to domain experts, and ship work that matters.  I’m happiest when I’m learning something new and turning it into code or hardware other people can use.
            </p>
          </div>
        </motion.div>
        </div>

        {/* Project Cards Section - Wider Container */}
        <div className="max-w-[1900px] mx-auto px-6">

          <motion.div 
            className="grid md:grid-cols-2 gap-12 mb-32"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
          >
          {/* Project Card 1 - Donna AI */}
          <div className="space-y-5">
            <div className="space-y-2 text-xs font-mono text-gray-500">
              <h3 className="text-base text-black font-semibold tracking-tight font-sans">
                Donna AI – Legal Research System
              </h3>
              <p className="text-[11px] leading-relaxed text-gray-600">
                Donna brings semantic and lexical search into one command surface for legal teams, grounding every answer and surfacing precedent faster than traditional tooling.
              </p>
            </div>
            <motion.a
              href="https://www.donna.param.nz/research"
              target="_blank"
              rel="noopener noreferrer"
              className="group cursor-pointer block"
              whileHover={{ scale: 1.00 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="aspect-[3/2] bg-gray-100 rounded-lg overflow-hidden border border-gray-200 hover:border-gray-300 transition-colors duration-300">
                <video
                  src="/donna/searchbar.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls={false}
                  className="w-full h-full object-cover"
                  style={{ pointerEvents: 'none' }}
                />
              </div>
            </motion.a>
          </div>

          {/* Project Card 2 */}
          <div className="space-y-5">
            <div className="space-y-2 text-xs font-mono text-gray-500">
              <h3 className="text-base text-black font-semibold tracking-tight font-sans">AHANA Studios builds Omni.</h3>
              <p className="text-[11px] leading-relaxed text-gray-600">
                Omni is a frontier longevity wellness space. We shipped a precision nutrition platform for 1,000+ members to collaborate with doctors and nutritionists, plan meals, and track macros with scientific specificity—while giving over 100 staff a calm control surface that anchors the organisation’s core operations.
              </p>
            </div>
            <motion.div
              className="group cursor-pointer"
              whileHover={{ scale: 1.00 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="aspect-[3/2] rounded-lg overflow-hidden border border-gray-200 hover:border-gray-300 transition-colors duration-300 shadow-sm">
                <PrecisionNutritionAnimation />
              </div>
            </motion.div>
          </div>
          </motion.div>
        </div>

      </main>
    </div>
  )
}
