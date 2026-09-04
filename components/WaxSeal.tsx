"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type WaxSealProps = {
  onBreak: () => void;
};

export default function WaxSeal({ onBreak }: WaxSealProps) {
  const [breaking, setBreaking] = useState(false);

  function handleActivate() {
    if (breaking) return;
    setBreaking(true);
    // Let the crack animation play before the envelope reacts.
    window.setTimeout(onBreak, 850);
  }

  return (
    <button
      type="button"
      aria-label="Break the wax seal to open the letter"
      onClick={handleActivate}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleActivate();
        }
      }}
      className="group relative h-24 w-24 select-none rounded-full outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-4 focus-visible:ring-offset-parchment sm:h-28 sm:w-28"
    >
      <motion.div
        className="absolute inset-0"
        animate={
          breaking
            ? { scale: [1, 1.08, 0.9], rotate: [0, -2, 4] }
            : { scale: 1 }
        }
        transition={{ duration: 0.85, ease: "easeInOut" }}
      >
        <svg viewBox="0 0 200 200" className="h-full w-full drop-shadow-lg">
          <defs>
            <radialGradient id="waxGradient" cx="35%" cy="30%" r="80%">
              <stop offset="0%" stopColor="#8c2e40" />
              <stop offset="55%" stopColor="#6b2737" />
              <stop offset="100%" stopColor="#4a1b27" />
            </radialGradient>
          </defs>

          {/* drips */}
          <path
            d="M100 178c-6 10-2 20 8 20 8 0 12-8 8-16-3-6-10-6-16-4z"
            fill="url(#waxGradient)"
            opacity={breaking ? 0.9 : 1}
          />
          {/* main seal body, irregular for a hand-pressed feel */}
          <path
            d="M100 14c22 0 33 12 46 20 15 9 26 20 26 40 0 21-13 30-14 50-1 19 12 30 4 46-9 18-32 22-52 20-19-2-30 10-48 4-17-6-24-24-38-32-14-8-20-22-16-40 4-17 20-24 22-42 2-19-10-30 0-47C40 17 60 20 78 16c7-2 14-2 22-2z"
            fill="url(#waxGradient)"
          />
          {/* pressed initial */}
          <text
            x="100"
            y="122"
            textAnchor="middle"
            fontSize="72"
            fontFamily="Georgia, serif"
            fill="rgba(212,181,131,0.55)"
          >
            D
          </text>

          {/* crack lines, revealed only once breaking */}
          {breaking && (
            <g stroke="#2a0f16" strokeWidth="2.5" fill="none" strokeLinecap="round">
              <motion.path
                d="M60 70 L100 100 L145 65"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              />
              <motion.path
                d="M100 100 L92 150"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.25, ease: "easeOut" }}
              />
              <motion.path
                d="M100 100 L128 140"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.4, ease: "easeOut" }}
              />
            </g>
          )}
        </svg>
      </motion.div>

      {!breaking && (
        <span className="pointer-events-none absolute -bottom-9 left-1/2 -translate-x-1/2 whitespace-nowrap font-hand text-2xl text-parchment/90 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
          break the seal
        </span>
      )}
    </button>
  );
}
