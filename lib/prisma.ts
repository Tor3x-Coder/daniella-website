import { PrismaClient } from "@prisma/client";

// The letter must work perfectly with no database at all, so every
// caller of this module treats a missing client as a normal case,
// not an error to surface to Daniella.

declare global {
  // eslint-disable-next-line no-var
  var __prisma: PrismaClient | undefined;
}

function createClient(): PrismaClient | null {
  if (!process.env.DATABASE_URL) return null;
  try {
    return new PrismaClient();
  } catch {
    return null;
  }
}

export const prisma = global.__prisma ?? createClient();

if (process.env.NODE_ENV !== "production" && prisma) {
  global.__prisma = prisma;
}
