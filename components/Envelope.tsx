"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import WaxSeal from "./WaxSeal";
import { envelope } from "@/lib/content";

type Stage = "closed" | "flapOpen" | "sliding" | "done";

type EnvelopeProps = {
  onOpened: () => void;
};

export default function Envelope({ onOpened }: EnvelopeProps) {
  const [stage, setStage] = useState<Stage>("closed");
  const reduceMotion = useReducedMotion();

  function handleBreak() {
    setStage("flapOpen");
    window.setTimeout(
      () => setStage("sliding"),
      reduceMotion ? 100 : 900
    );
    window.setTimeout(
      () => {
        setStage("done");
        onOpened();
      },
      reduceMotion ? 300 : 2200
    );
  }

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-charcoal px-6">
      {/* ambient candlelit warmth */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(184,147,90,0.14),transparent_60%)]" />

      <AnimatePresence>
        {stage !== "done" && (
          <motion.div
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.6 }}
            className="relative w-full max-w-md"
          >
            {/* envelope body */}
            <div className="relative aspect-[3/2] w-full">
              {/* back panel */}
              <div className="absolute inset-0 rounded-sm bg-parchment shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)]" />

              {/* letter, slides up out of the envelope */}
              <motion.div
                className="absolute left-1/2 top-2 h-[78%] w-[86%] -translate-x-1/2 rounded-[2px] bg-ivory shadow-inner"
                style={{ zIndex: 5 }}
                initial={{ y: 0 }}
                animate={{
                  y: stage === "sliding" ? "-230%" : 0,
                  opacity: stage === "sliding" ? 0 : 1,
                }}
                transition={{ duration: reduceMotion ? 0.3 : 1.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-6 text-center">
                  <span className="font-hand text-3xl text-ink-soft">
                    {envelope.to}
                  </span>
                  <span className="h-px w-10 bg-gold/50" />
                </div>
              </motion.div>

              {/* bottom triangle flap (static) */}
              <div
                className="absolute inset-0 z-[6]"
                style={{
                  clipPath: "polygon(0 100%, 50% 45%, 100% 100%)",
                  background:
                    "linear-gradient(to top, rgba(74,55,40,0.18), transparent)",
                }}
              />
              {/* side triangles for a proper envelope silhouette */}
              <div
                className="absolute inset-0 z-[6]"
                style={{
                  clipPath: "polygon(0 0, 50% 45%, 0 100%)",
                  background: "rgba(74,55,40,0.10)",
                }}
              />
              <div
                className="absolute inset-0 z-[6]"
                style={{
                  clipPath: "polygon(100% 0, 50% 45%, 100% 100%)",
                  background: "rgba(74,55,40,0.10)",
                }}
              />

              {/* top flap, opens on break */}
              <motion.div
                className="absolute inset-x-0 top-0 z-[7] h-1/2 origin-top"
                style={{
                  clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                  transformStyle: "preserve-3d",
                }}
                initial={{ rotateX: 0 }}
                animate={{ rotateX: stage === "closed" ? 0 : -165 }}
                transition={{ duration: reduceMotion ? 0.3 : 1, ease: [0.65, 0, 0.35, 1] }}
              >
                <div className="h-full w-full bg-gradient-to-b from-parchment-light to-parchment" />
              </motion.div>

              {/* seal sits on the flap seam until it breaks */}
              {stage === "closed" && (
                <div className="absolute left-1/2 top-[45%] z-[8] -translate-x-1/2 -translate-y-1/2">
                  <WaxSeal onBreak={handleBreak} />
                </div>
              )}
            </div>

            <p className="mt-8 text-center font-hand text-xl text-parchment/70">
              {stage === "closed" ? envelope.subtitle : ""}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
