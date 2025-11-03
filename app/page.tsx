"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import GlitchMosaic from "./components/GlitchMosaic"


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

      <main className="pt-32 px-6 max-w-7xl mx-auto">
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
              <span className="italic">builds</span>.
            </h1>

            {/* Work Experience, Projects, Research Section */}
            <div className="mb-24 max-w-2xl">
              <div className="space-y-6 text-xs font-mono">
                {/* Work Experience */}
                <div className="space-y-1">
                  <h3 className="text-gray-400 uppercase tracking-wide text-xs mb-2">Work Experience</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 w-12">2025</span>
                    <span className="flex-1 text-left">Ahana Studios</span>
                    <span className="text-gray-500 text-right">Product Design Intern</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 w-12">2024</span>
                    <span className="flex-1 text-left">University of Canterbury</span>
                    <span className="text-gray-500 text-right">Software Engineering</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 w-12">2023</span>
                    <span className="flex-1 text-left">Freelance</span>
                    <span className="text-gray-500 text-right">Product + Engineering</span>
                  </div>
                </div>

                <div className="border-t border-gray-200"></div>

                {/* Projects */}
                <div className="space-y-1">
                  <h3 className="text-gray-400 uppercase tracking-wide text-xs mb-2">Projects</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 w-12">2024</span>
                    <span className="flex-1 text-left">Detection of Armillaria Root Rot</span>
                    <span className="text-gray-500 text-right">ML Classification</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 w-12">2024</span>
                    <span className="flex-1 text-left">Sahha LLM Health Analysis</span>
                    <span className="text-gray-500 text-right">Large Language Models</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 w-12">2024</span>
                    <span className="flex-1 text-left">Edge Device Invoice Extraction</span>
                    <span className="text-gray-500 text-right">Offline LLMs</span>
                  </div>
                </div>

                <div className="border-t border-gray-200"></div>

                {/* Research */}
                <div className="space-y-1">
                  <h3 className="text-gray-400 uppercase tracking-wide text-xs mb-2">Research</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 w-12">2023</span>
                    <span className="flex-1 text-left">Autonomous Line-Following Robot</span>
                    <span className="text-gray-500 text-right">Path Planning</span>
                  </div>
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


      </main>
    </div>
  )
}
