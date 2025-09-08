"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function FloatingResumeButton() {
  return (
    <div className="fixed top-[18px] right-[18px] z-[50]">
      <motion.div
        initial={{ y: -12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 320, damping: 28 }}
      >
        <Link
          href="/digital-resume"
          aria-label="Open digital resume"
          className="appearance-none border border-white/20 text-white bg-white/5 rounded-full px-3.5 py-2 inline-flex items-center gap-2 no-underline tracking-[0.02em] shadow-[0_8px_28px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.08)] transition hover:bg-white/10 hover:border-white/35 hover:shadow-[0_10px_34px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.1)] active:translate-y-px"
        >
          <span className="w-[6px] h-[6px] rounded-full bg-white opacity-90 shadow-[0_0_8px_rgba(255,255,255,0.6)]" />
          <span className="font-extrabold">Digital Resume</span>
        </Link>
      </motion.div>
    </div>
  );
}
