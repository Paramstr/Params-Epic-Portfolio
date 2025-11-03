"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import GlitchMosaic from "./components/GlitchMosaic"
import ThemeToggle from "./components/ThemeToggle"
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
    <div className="relative h-full w-full bg-white dark:bg-neutral-900">
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
    <div className="relative z-20 min-h-screen bg-white text-black transition-colors duration-300 dark:bg-neutral-950 dark:text-gray-100">
      <header className="fixed top-0 z-50 w-full bg-white/80 backdrop-blur-sm transition-colors duration-300 dark:bg-neutral-900/80">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-4 py-2">
          <Link href="/" className="font-mono text-xs">
            P·S
          </Link>
          <div className="flex items-center space-x-4 font-mono text-xs text-gray-500 dark:text-gray-400">
            <div>43.5320° S, 172.6306° E</div>
            <motion.a
              href="https://www.linkedin.com/in/parambir-singh-769736159/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="transition-colors hover:text-gray-600 dark:hover:text-gray-300"
            >
              LinkedIn
            </motion.a>
            <motion.a
              href="https://twitter.com/yourhandle"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="transition-colors hover:text-gray-600 dark:hover:text-gray-300"
            >
              Twitter
            </motion.a>
            <ThemeToggle />
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
              <h1 className="text-4xl md:text-4xl font-normal text-gray-900 leading-tight mb-4 dark:text-gray-100">
                I'm <span className="font-bold">Param</span>, a systems engineer who{" "}
                <span className="italic">designs</span>.
              </h1>

              {/* Work Experience, Projects, Research Section */}
            <div className="mb-24 max-w-2xl">
              <div className="space-y-6 text-xs font-mono">
                {/* Work Experience */}
                <div className="space-y-1">
                  <h3 className="mb-2 text-xs uppercase tracking-wide text-gray-400 dark:text-gray-500">Work Experience</h3>
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
                        className="flex items-center justify-between py-1 px-2 -mx-2 rounded cursor-pointer transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-white/10 group"
                        whileHover={{ x: 2 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        {...rowProps}
                      >
                        <span className="w-28 flex-shrink-0 text-gray-500 dark:text-gray-400">{work.dateRange || work.yearDisplay || work.year}</span>
                        <span className="flex-1 text-left">{work.company}</span>
                        <div className="flex items-center gap-1">
                          <span className="text-right text-gray-500 dark:text-gray-400">{work.tag}</span>
                          <div className="w-3 h-3 flex items-center justify-center">
                            {work.url && (
                              <svg 
                                className="h-3 w-3 text-gray-400 dark:text-gray-500" 
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

                <div className="border-t border-gray-200 dark:border-neutral-800"></div>

                {/* Projects */}
                <div className="space-y-1">
                  <h3 className="mb-2 text-xs uppercase tracking-wide text-gray-400 dark:text-gray-500">Projects</h3>
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
                        className="flex items-center justify-between py-1 px-2 -mx-2 rounded cursor-pointer transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-white/10 group"
                        whileHover={{ x: 2 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        {...rowProps}
                      >
                        <span className="w-12 text-gray-500 dark:text-gray-400">{project.year}</span>
                        <span className="flex-1 text-left">{project.name}</span>
                        <div className="flex items-center gap-1">
                          <span className="text-right text-gray-500 dark:text-gray-400">{project.tag}</span>
                          <div className="w-3 h-3 flex items-center justify-center">
                            {project.url && (
                              <svg 
                                className="h-3 w-3 text-gray-400 dark:text-gray-500" 
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

                <div className="border-t border-gray-200 dark:border-neutral-800"></div>

                {/* Research */}
                <div className="space-y-1">
                  <h3 className="mb-2 text-xs uppercase tracking-wide text-gray-400 dark:text-gray-500">Research</h3>
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
                        className="flex items-center justify-between py-1 px-2 -mx-2 rounded cursor-pointer transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-white/10 group"
                        whileHover={{ x: 2 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        {...rowProps}
                      >
                        <span className="w-12 text-gray-500 dark:text-gray-400">{item.year}</span>
                        <span className="flex-1 text-left">{item.name}</span>
                        <div className="flex items-center gap-1">
                          <span className="text-right text-gray-500 dark:text-gray-400">{item.tag}</span>
                          <div className="w-3 h-3 flex items-center justify-center">
                            {item.url && (
                              <svg 
                                className="h-3 w-3 text-gray-400 dark:text-gray-500" 
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

                <div className="border-t border-gray-200 dark:border-neutral-800"></div>

                {/* Design */}
                <div className="space-y-1">
                  <h3 className="mb-2 text-xs uppercase tracking-wide text-gray-400 dark:text-gray-500">Design</h3>
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
                        className="flex items-center justify-between py-1 px-2 -mx-2 rounded cursor-pointer transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-white/10 group"
                        whileHover={{ x: 2 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        {...rowProps}
                      >
                        <span className="w-12 text-gray-500 dark:text-gray-400">{item.year}</span>
                        <span className="flex-1 text-left">{item.name}</span>
                        <div className="flex items-center gap-1">
                          <span className="text-right text-gray-500 dark:text-gray-400">{item.tag}</span>
                          <div className="w-3 h-3 flex items-center justify-center">
                            {item.url && (
                              <svg 
                                className="h-3 w-3 text-gray-400 dark:text-gray-500" 
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
            <p className="text-xs font-mono leading-relaxed text-gray-500 dark:text-gray-400">
              I’m a computer engineer who spends most mornings asking how the tricks we perfected for tweets and trades can be reused for proteins and power grids.  Bits feel mostly solved; atoms still need work.
            </p>

            <p className="text-xs font-mono leading-relaxed text-gray-500 dark:text-gray-400">
              While ChatGPT was still a lab demo I was shipping one of the first offline LLM runtimes to iOS production.  I later trained a deep-learning model to spot cellular death in multispectral imagery (work done through Jones), and now I’m turning cheap olfaction sensor arrays into early-warning systems for chronic disease by reading metabolic signatures on breath.
            </p>
          </div>
          <div>
            <p className="text-xs font-mono leading-relaxed text-gray-500 dark:text-gray-400">
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
            <div className="space-y-2 text-xs font-mono text-gray-500 dark:text-gray-400">
              <h3 className="font-sans text-base font-semibold tracking-tight text-black dark:text-gray-100">
                Donna AI – Legal Research System
              </h3>
              <p className="text-[11px] leading-relaxed text-gray-600 dark:text-gray-300">
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
              <div className="aspect-[3/2] overflow-hidden rounded-lg border border-gray-200 bg-gray-100 transition-colors duration-300 hover:border-gray-300 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700">
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
            <div className="space-y-2 text-xs font-mono text-gray-500 dark:text-gray-400">
              <h3 className="font-sans text-base font-semibold tracking-tight text-black dark:text-gray-100">AHANA Studios builds Omni.</h3>
              <p className="text-[11px] leading-relaxed text-gray-600 dark:text-gray-300">
                Omni is a frontier longevity wellness space. We shipped a precision nutrition platform for 1,000+ members to collaborate with doctors and nutritionists, plan meals, and track macros with scientific specificity—while giving over 100 staff a calm control surface that anchors the organisation’s core operations.
              </p>
            </div>
            <motion.div
              className="group cursor-pointer"
              whileHover={{ scale: 1.00 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="aspect-[3/2] overflow-hidden rounded-lg border border-gray-200 transition-colors duration-300 shadow-sm hover:border-gray-300 dark:border-neutral-800 dark:hover:border-neutral-700">
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
