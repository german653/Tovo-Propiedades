import type { Property as PrismaProperty } from '@prisma/client';

// Tipo serializable para pasar de Server → Client Components
// (las fechas de Prisma son Date, que no es serializable como JSON)
export type SerializedProperty = Omit<PrismaProperty, 'createdAt' | 'updatedAt'> & {
  createdAt: string;
  updatedAt: string;
};

// Helper para serializar una propiedad de Prisma
export function serializeProperty(p: PrismaProperty): SerializedProperty {
  return {
    ...p,
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(),
  };
}
