import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'

// 1. Creamos el pool de conexiones apuntando a tu URL de la base de datos
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)

// 2. Función singleton para asegurar que no se creen infinitas conexiones en desarrollo
const prismaClientSingleton = () => {
  // En Prisma v7, pasamos el adaptador directamente aquí
  return new PrismaClient({ adapter })
}

// 3. Declaración del tipo global para Node.js / Next.js
interface CustomGlobal {
  prismaGlobal?: PrismaClient
}

const globalForPrisma = globalThis as unknown as CustomGlobal

// 4. Exportamos la instancia única de Prisma
const prisma = globalForPrisma.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalForPrisma.prismaGlobal = prisma