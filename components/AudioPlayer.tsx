"use client";

import { useRef, useState } from "react";

export default function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [errored, setErrored] = useState(false);

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
      return;
    }

    audio
      .play()
      .then(() => setPlaying(true))
      .catch(() => setErrored(true));
  }

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <audio
        ref={audioRef}
        src="/audio/background.mp3"
        loop
        preload="none"
        onError={() => setErrored(true)}
      />
      {!errored && (
        <button
          type="button"
          onClick={toggle}
          aria-pressed={playing}
          aria-label={playing ? "Pause background music" : "Play background music"}
          className="rounded-full border border-gold/40 bg-parchment-light/90 px-4 py-2 font-hand text-lg text-ink-soft shadow-md backdrop-blur transition hover:bg-parchment-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
        >
          {playing ? "♫ playing softly" : "♫ play softly"}
        </button>
      )}
    </div>
  );
}
