"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = resolvedTheme === "dark"

  const handleToggle = () => {
    setTheme(isDark ? "light" : "dark")
  }

  return (
    <button
      type="button"
      aria-label="Toggle dark mode"
      onClick={handleToggle}
      className="relative flex h-7 w-12 items-center rounded-full border border-neutral-300 bg-white/70 p-1 text-neutral-600 transition hover:border-neutral-400 hover:text-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 dark:border-neutral-700 dark:bg-neutral-900/80 dark:text-neutral-300 dark:hover:border-neutral-500 dark:hover:text-neutral-100 dark:focus-visible:ring-neutral-600 dark:focus-visible:ring-offset-neutral-950"
    >
      <span className="sr-only">Toggle dark mode</span>
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className={`absolute inset-y-1 flex h-5 w-5 items-center justify-center rounded-full bg-white shadow-sm dark:bg-neutral-950 ${isDark ? "right-1" : "left-1"}`}
      >
        {mounted ? (
          isDark ? (
            <Moon className="h-3.5 w-3.5" />
          ) : (
            <Sun className="h-3.5 w-3.5" />
          )
        ) : null}
      </motion.span>
    </button>
  )
}
