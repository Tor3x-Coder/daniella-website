"use client";

import { useState } from "react";
import Envelope from "@/components/Envelope";
import Letter from "@/components/Letter";

export default function Home() {
  const [opened, setOpened] = useState(false);

  function handleOpened() {
    setOpened(true);
    // Best-effort only — the letter works with or without this succeeding.
    fetch("/api/visit", { method: "POST" }).catch(() => {});
  }

  return (
    <main>
      {!opened && <Envelope onOpened={handleOpened} />}
      {opened && <Letter />}
    </main>
  );
}
