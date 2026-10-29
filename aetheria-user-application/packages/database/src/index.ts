import { PrismaClient } from '@prisma/client';

const globalDatabase = globalThis as unknown as { aetheriaPrisma?: PrismaClient };

export const prisma = globalDatabase.aetheriaPrisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : process.env.NODE_ENV === 'production' ? ['error'] : [],
});

// Reuse one client in every warm runtime, including production serverless
// instances. This prevents a new MySQL connection pool being opened per request.
globalDatabase.aetheriaPrisma ??= prisma;

export * from '@prisma/client';
