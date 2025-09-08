"use client"

import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { projects } from "./projects"

// LifeBlock component (unchanged)
const LifeBlock = ({ image, title, description }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.div
      className="relative aspect-square bg-gray-100 cursor-pointer overflow-hidden"
      onClick={() => setIsExpanded(!isExpanded)}
      whileHover={{ scale: 0.98 }}
      transition={{ duration: 0.3 }}
    >
      <Image
        src={image || "/placeholder.svg"}
        alt={title}
        fill
        className="object-cover transition-transform hover:scale-105"
      />
      <motion.div
        className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      >
        <h3 className="text-white text-xl font-bold">{title}</h3>
      </motion.div>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="absolute top-0 left-full w-full h-full bg-white p-4"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-sm">{description}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// Sample life blocks data (unchanged)
const lifeBlocks = [
  {
    image: "/protostars-dinner.jpeg",
    title: "Hosted a dinner for startup pilled New Zealanders at a VC Office",
    description: "Exploring new horizons and pushing boundaries.",
  },
  {
    image: "/param-sf.jpeg",
    title: "Visited SF!",
    description: "Bringing ideas to life through design and engineering.",
  },
]

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-white text-black relative z-20">
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-sm z-50">
        <div className="flex justify-between items-start px-6 py-4 max-w-7xl mx-auto">
          <Link href="/" className="font-mono text-sm">
            P·S
          </Link>
          <div className="flex flex-col items-end space-y-2 font-mono text-sm">
            <div>43.5320° S, 172.6306° E</div>
            <Link href="/resume">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="cursor-pointer"
              >
                Digital Resume
              </motion.div>
            </Link>
            <motion.a
              href="https://www.linkedin.com/in/parambir-singh-769736159/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              LinkedIn
            </motion.a>
            <motion.a
              href="https://twitter.com/yourhandle"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              Twitter
            </motion.a>
          </div>
        </div>
      </header>

      <main className="pt-32 px-6 max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl leading-none font-bold tracking-tighter mb-24 font-bebas-neue break-words"
        >
          <span style={{ letterSpacing: '0.001em' } as React.CSSProperties}>PARAM</span>
          <svg
            viewBox="-60 -60 120 120"
            className="inline-block mx-2 w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 xl:w-20 xl:h-20"
          >
            <path
              strokeLinecap="butt"
              strokeLinejoin="miter"
              fillOpacity="0"
              strokeMiterlimit="4"
              stroke="rgb(0,0,0)"
              strokeOpacity="1"
              strokeWidth="2"
              d="M-36.66899871826172,63.51300048828125 C-18.851999282836914,73.80000305175781 12.008999824523926,53.702999114990234 32.26100158691406,18.625999450683594 C52.51300048828125,-16.451000213623047 54.486000061035156,-53.22600173950195 36.66899871826172,-63.51300048828125 C18.851999282836914,-73.80000305175781 -12.008999824523926,-53.702999114990234 -32.26100158691406,-18.625999450683594 C-52.51300048828125,16.451000213623047 -54.486000061035156,53.22600173950195 -36.66899871826172,63.51300048828125z"
            />
          </svg>
          <span style={{ letterSpacing: '0.001em' } as React.CSSProperties}>SINGH</span>
        </motion.h1>

        <div className="grid md:grid-cols-2 gap-12 mb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6 font-mono text-sm"
          >
            <div>
              <div className="text-gray-500">2024 — PRESENT</div>
              <div>SYSTEMS ENGINEER · MULTIDISCIPLINARY DESIGNER</div>
            </div>
            {projects.map((project, index) => (
              <motion.div key={index} className="mt-4" initial="hidden" whileHover="visible">
                <div className="text-gray-500">{project.year}</div>
                <div className="flex items-center">
                  <span>{project.name}</span>
                  {project.link && (
                    <Link href={project.link} target="_blank" rel="noopener noreferrer" className="ml-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                      </svg>
                    </Link>
                  )}
                </div>
                <motion.div
                  variants={{
                    hidden: { opacity: 0, height: 0 },
                    visible: { opacity: 1, height: "auto" },
                  }}
                  transition={{ duration: 0.3 }}
                  className="mt-2 text-sm text-gray-600 overflow-hidden"
                >
                  <p>{project.description}</p>
                  <div className="mt-2">
                    {project.categories.map((category, idx) => (
                      <span key={idx} className="mr-2 text-xs text-gray-400">
                        #{category}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6 font-mono text-sm"
          >
            <p>
              NEW ZEALAND BASED, SYSTEMS ENGINEER AND MULTIDISCIPLINARY DESIGNER. FOCUSED ON THE INTERSECTION OF
              TECHNOLOGY, DESIGN, AND HUMAN EXPERIENCE.
            </p>
            <p>
            My inspirations -  Akira, Cowboy Bepop, Maori ethos, Breathword, Neotokyo, DNB Breakcore
            </p>
          </motion.div>
        </div>

        <section id="Life Blocks" className="mb-24">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-mono text-sm">LIFE BLOCKS (6)</h2>
            <button className="w-8 h-8 rounded-full border border-black flex items-center justify-center">+</button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {lifeBlocks.map((block, index) => (
              <div key={index} className="relative group aspect-square bg-gray-100 overflow-hidden">
                <Image
                  src={block.image || "/placeholder.svg"}
                  alt={block.title}
                  fill
                  className="object-cover transition-all duration-500 ease-out group-hover:scale-105"
                />
                <div 
                  className="absolute inset-0 bg-black/60 flex items-center justify-center 
                             opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out"
                >
                  <p className="text-white text-lg font-light tracking-wide px-8 py-6 text-center leading-relaxed
                               transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    {block.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

