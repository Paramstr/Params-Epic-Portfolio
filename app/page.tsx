"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import GlitchMosaic from "./components/GlitchMosaic"
import { workExperience, projects, research, design } from "./projects.js"


export default function Portfolio() {

  return (
    <div className="min-h-screen bg-white text-black relative z-20">
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-sm z-50">
        <div className="flex justify-between items-center px-4 py-2 max-w-7xl mx-auto">
          <Link href="/" className="font-mono text-xs">
            P·S
          </Link>
          <div className="flex items-center space-x-4 font-mono text-xs">
            <div className="text-gray-500">43.5320° S, 172.6306° E</div>
            <Link href="/resume">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="cursor-pointer hover:text-gray-600"
              >
                Resume
              </motion.div>
            </Link>
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
              I spend my time thinking about the intersection of technology and human experience. There's something fascinating about how the right interface can make complex systems feel intuitive, how thoughtful design can turn frustration into delight. 
            </p>
            <p className="text-gray-500 leading-relaxed text-xs font-mono">
              My curiosity drives me toward problems that sit at the boundary between disciplines—where engineering rigor meets creative expression, where technical constraints become design opportunities. I'm drawn to building things that feel both powerful and approachable.
            </p>
          </div>
          
          <div className="space-y-6">
            <p className="text-gray-500 leading-relaxed text-xs font-mono">
              Currently, I'm motivated by the potential of AI to augment human creativity rather than replace it. I believe the most interesting solutions emerge when we deeply understand both the technical possibilities and the human context they serve.
            </p>
            <p className="text-gray-500 leading-relaxed text-xs font-mono">
              When I'm not building, you'll find me exploring how different mediums—from typography to interaction design—can communicate ideas more effectively. Good design, to me, is invisible until you notice how much better everything feels.
            </p>
          </div>
        </motion.div>
        </div>

        {/* Project Cards Section - Wider Container */}
        <div className="max-w-[1900px] mx-auto px-6">
          {/* Project Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            className="mb-3"
          >
            <h2 className="text-xs font-bold text-black font-mono mb-1">
              Donna AI - Legal Research AI System
            </h2>
            <p className="text-xs text-gray-500 font-mono">
              legal research with semantic and lexical search capabilities, grounding in truth.
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 gap-12 mb-32"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
          >
          {/* Project Card 1 - Donna AI */}
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

          {/* Project Card 2 */}
          <motion.div
            className="group cursor-pointer"
            whileHover={{ scale: 1.00 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="aspect-[3/2] bg-gray-100 rounded-lg overflow-hidden border border-gray-200 hover:border-gray-300 transition-colors duration-300">
              <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                <span className="text-gray-500 font-mono text-xs">Project GIF Placeholder</span>
              </div>
            </div>
          </motion.div>
          </motion.div>
        </div>

      </main>
    </div>
  )
}
