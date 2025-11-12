import { PrismaClient } from '@prisma/client'

// Declaração de variável global para o Prisma Client.
// Isso é necessário para evitar a criação de múltiplas instâncias
// do Prisma Client em ambientes de desenvolvimento, onde o Next.js
// faz o Hot Reloading.
const globalForPrisma = global as unknown as { prisma: PrismaClient | undefined }

// Se já existir uma instância global, reutilize-a.
// Caso contrário, crie uma nova.
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query', 'info', 'warn', 'error'], // Opcional: Para logar as queries no console
  })

// Em desenvolvimento, atribua a instância ao objeto global.
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma