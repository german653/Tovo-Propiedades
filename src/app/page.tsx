import prisma from '../lib/prisma';
import { serializeProperty } from '../types/property';
import HomeClient from '../components/HomeClient';

export default async function Home() {
  const raw = await prisma.property.findMany({
    where: { featured: true },
    take: 3,
    orderBy: { createdAt: 'desc' },
  });
  const featuredProperties = raw.map(serializeProperty);

  return <HomeClient featuredProperties={featuredProperties} />;
}
