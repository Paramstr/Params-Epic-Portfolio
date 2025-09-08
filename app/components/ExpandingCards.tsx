"use client";

import React, { useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";

export type CardItem = {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
};

export function ExpandingCards({ items }: { items: CardItem[] }) {
  const [active, setActive] = useState<CardItem | null>(null);

  return (
    <LayoutGroup>
      <div className="grid grid-cols-1 gap-[clamp(16px,2vw,24px)] md:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <motion.button
            key={item.id}
            layoutId={`card-${item.id}`}
            className="bg-[#111] text-white rounded-2xl p-[14px] shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_20px_40px_rgba(0,0,0,0.45)] border border-white/10 cursor-pointer text-left"
            onClick={() => setActive(item)}
            whileHover={{ y: -4, boxShadow: "0 26px 60px rgba(0,0,0,0.5)" }}
            whileTap={{ scale: 0.995 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="rounded-xl h-[clamp(140px,20vw,220px)] shadow-[0_10px_30px_rgba(0,0,0,0.45)] bg-[radial-gradient(80%_60%_at_50%_0%,rgba(255,255,255,0.08),rgba(255,255,255,0)_60%),linear-gradient(180deg,#171717,#0b0b0b)]" />
            <div className="flex items-baseline justify-between mt-2.5">
              <span className="font-extrabold tracking-[0.02em]">{item.title}</span>
              {item.subtitle ? <span className="opacity-60 text-sm">{item.subtitle}</span> : null}
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            key="overlay"
            className="fixed inset-0 bg-black/60 backdrop-blur-sm grid place-items-center z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              layoutId={`card-${active.id}`}
              className="w-[min(1000px,90vw)] bg-white text-black rounded-2xl p-4 shadow-[0_30px_80px_rgba(0,0,0,0.45)]"
              transition={{ type: "spring", stiffness: 180, damping: 22 }}
            >
              <div className="grid gap-3.5">
                <div className="rounded-xl h-[clamp(140px,20vw,220px)] shadow-[0_10px_30px_rgba(0,0,0,0.15)] bg-[radial-gradient(80%_60%_at_50%_0%,rgba(0,0,0,0.06),rgba(0,0,0,0)_60%),linear-gradient(180deg,#f9fafb,#f3f4f6)]" />
                <div>
                  <h3 style={{ margin: 0 }}>{active.title}</h3>
                  {active.subtitle ? (
                    <p className="m-0 mt-[2px] mb-2 text-black/60">{active.subtitle}</p>
                  ) : null}
                  {active.description ? (
                    <p className="text-black/70 leading-relaxed">{active.description}</p>
                  ) : null}
                </div>
                <div className="flex justify-end">
                  <button
                    className="appearance-none border border-black/10 bg-white text-black px-3 py-2 rounded-full font-semibold cursor-pointer transition shadow-sm hover:shadow-md hover:border-black/20 active:translate-y-px"
                    onClick={() => setActive(null)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </LayoutGroup>
  );
}
