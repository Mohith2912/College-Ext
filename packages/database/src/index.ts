import { PrismaClient } from '@prisma/client';

const globalDatabase = globalThis as unknown as { aetheriaPrisma?: PrismaClient };

export const prisma = globalDatabase.aetheriaPrisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : process.env.NODE_ENV === 'production' ? ['error'] : [],
});

if (process.env.NODE_ENV !== 'production') globalDatabase.aetheriaPrisma = prisma;

export * from '@prisma/client';
