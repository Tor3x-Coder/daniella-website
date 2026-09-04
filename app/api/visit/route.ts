import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  // No database configured — that's fine, the letter doesn't need it.
  if (!prisma) {
    return NextResponse.json({ recorded: false }, { status: 200 });
  }

  try {
    await prisma.visit.create({
      data: {
        userAgent: request.headers.get("user-agent") ?? undefined,
      },
    });
    return NextResponse.json({ recorded: true }, { status: 200 });
  } catch {
    // Never let a database hiccup interrupt her reading the letter.
    return NextResponse.json({ recorded: false }, { status: 200 });
  }
}
