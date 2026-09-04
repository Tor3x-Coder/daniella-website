"use client";

import { motion } from "framer-motion";
import PhotoFrame from "./PhotoFrame";
import type { LetterSection as LetterSectionType } from "@/lib/content";

export default function LetterSection({
  section,
  index,
}: {
  section: LetterSectionType;
  index: number;
}) {
  const isQuiet = section.pacing === "quiet";
  const isSlow = section.pacing === "slow";

  return (
    <section
      className={`mx-auto flex w-full max-w-xl flex-col items-center px-6 ${
        isQuiet ? "min-h-[90vh] justify-center py-24" : "py-16 sm:py-24"
      }`}
    >
      {section.heading && (
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7 }}
          className="mb-8 text-center font-display text-3xl font-semibold text-burgundy sm:text-4xl"
        >
          {section.heading}
        </motion.h2>
      )}

      <div className="flex flex-col gap-6">
        {section.paragraphs.map((paragraph, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{
              duration: isSlow ? 1 : 0.7,
              delay: i * (isSlow ? 0.15 : 0.08),
              ease: [0.22, 1, 0.36, 1],
            }}
            className={
              isQuiet
                ? "text-center font-display text-4xl font-medium text-ink sm:text-5xl"
                : "text-lg leading-relaxed text-ink-soft sm:text-xl sm:leading-loose"
            }
          >
            {paragraph}
          </motion.p>
        ))}
      </div>

      {section.photo && (
        <PhotoFrame
          src={section.photo.src}
          alt={section.photo.alt}
          caption={section.photo.caption}
          rotate={index % 2 === 0 ? -2.5 : 2.5}
        />
      )}
    </section>
  );
}
