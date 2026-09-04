"use client";

import { motion } from "framer-motion";
import { sections } from "@/lib/content";
import LetterSection from "./LetterSection";
import AudioPlayer from "./AudioPlayer";

export default function Letter() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="paper-texture relative min-h-screen w-full"
    >
      {/* decorative top border, botanical-feeling hairline */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-charcoal/10 to-transparent" />

      <AudioPlayer />

      <div className="relative mx-auto max-w-2xl pb-10 pt-20 sm:pt-28">
        {sections.map((section, i) => (
          <LetterSection key={section.id} section={section} index={i} />
        ))}
      </div>

      <footer className="pb-16 text-center font-hand text-2xl text-ink-soft/70">
        — always
      </footer>
    </motion.div>
  );
}
