"use client";

import { useState } from "react";
import Envelope from "@/components/Envelope";
import Letter from "@/components/Letter";

// Set to "/api/visit" only on a server-rendered deployment. In the static
// Firebase build this is undefined, so the letter opens without making any
// request to an endpoint that doesn't exist. Purely cosmetic either way —
// the letter never depends on this succeeding.
const VISIT_ENDPOINT = process.env.NEXT_PUBLIC_VISIT_ENDPOINT;

export default function Home() {
  const [opened, setOpened] = useState(false);

  function handleOpened() {
    setOpened(true);
    if (VISIT_ENDPOINT) {
      // Best-effort only — the letter works with or without this succeeding.
      fetch(VISIT_ENDPOINT, { method: "POST" }).catch(() => {});
    }
  }

  return (
    <main>
      {!opened && <Envelope onOpened={handleOpened} />}
      {opened && <Letter />}
    </main>
  );
}
