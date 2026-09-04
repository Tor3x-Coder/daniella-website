"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

type PhotoFrameProps = {
  src: string;
  alt: string;
  caption?: string;
  rotate?: number;
};

export default function PhotoFrame({
  src,
  alt,
  caption,
  rotate = -2,
}: PhotoFrameProps) {
  const [failed, setFailed] = useState(false);

  return (
    <motion.figure
      initial={{ opacity: 0, y: 24, rotate: 0 }}
      whileInView={{ opacity: 1, y: 0, rotate }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto my-10 w-64 max-w-full sm:w-72"
    >
      <div className="relative bg-ivory p-3 pb-8 shadow-[0_10px_30px_-8px_rgba(37,28,21,0.45)]">
        {/* tape */}
        <span
          aria-hidden
          className="absolute -top-3 left-1/2 h-6 w-16 -translate-x-1/2 -rotate-2 bg-gold-soft/40 mix-blend-multiply"
        />
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-parchment">
          {!failed ? (
            <Image
              src={src}
              alt={alt}
              fill
              sizes="288px"
              className="object-cover sepia-[0.15] contrast-[1.03]"
              onError={() => setFailed(true)}
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-2 border border-dashed border-ink-soft/30 text-center text-ink-soft/60">
              <span className="font-hand text-2xl">a memory</span>
              <span className="px-4 text-xs italic">
                (photo goes here — drop it into /public/images)
              </span>
            </div>
          )}
        </div>
        {caption && (
          <figcaption className="absolute bottom-2 left-0 right-0 text-center font-hand text-lg text-ink-soft">
            {caption}
          </figcaption>
        )}
      </div>
    </motion.figure>
  );
}
