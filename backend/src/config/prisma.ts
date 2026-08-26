import { PrismaClient } from '@prisma/client';

/**
 * Singleton PrismaClient para evitar múltiplas conexões ao banco de dados.
 * Reutiliza a mesma instância em toda a aplicação.
 */
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
