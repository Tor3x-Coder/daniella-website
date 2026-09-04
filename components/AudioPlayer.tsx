"use client";

import { useEffect, useRef, useState } from "react";

const AUDIO_SRC = "/audio/background.mp3";

export default function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [errored, setErrored] = useState(false);

  // The music file is optional — the letter works without it.
  //
  // The <audio> element below uses preload="none", so the browser doesn't
  // fetch the file until someone presses play. That meant the "♫ play
  // softly" button rendered even with no audio on the site: you'd click it,
  // nothing would happen, and only then would onError hide the button.
  //
  // So probe for the file once on mount and render nothing at all when it
  // isn't there. HEAD, not GET — we only care whether it exists, and this
  // keeps the request down to headers rather than 3 MB of MP3.
  const [available, setAvailable] = useState(false);

  useEffect(() => {
    let cancelled = false;

    fetch(AUDIO_SRC, { method: "HEAD" })
      .then((res) => {
        if (!cancelled) setAvailable(res.ok);
      })
      .catch(() => {
        if (!cancelled) setAvailable(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

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

  // No file, or playback failed — leave no trace of the control.
  if (!available || errored) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <audio
        ref={audioRef}
        src={AUDIO_SRC}
        loop
        preload="none"
        onError={() => setErrored(true)}
      />
      <button
        type="button"
        onClick={toggle}
        aria-pressed={playing}
        aria-label={playing ? "Pause background music" : "Play background music"}
        className="rounded-full border border-gold/40 bg-parchment-light/90 px-4 py-2 font-hand text-lg text-ink-soft shadow-md backdrop-blur transition hover:bg-parchment-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
      >
        {playing ? "♫ playing softly" : "♫ play softly"}
      </button>
    </div>
  );
}
