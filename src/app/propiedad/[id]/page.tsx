import { notFound } from 'next/navigation';
import prisma from '../../../lib/prisma';
import { serializeProperty } from '../../../types/property';
import PropertyDetailClient from '../../../components/PropertyDetailClient';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function PropertyDetail({ params }: Props) {
  const { id } = await params;

  const property = await prisma.property.findUnique({
    where: { id },
  });

  if (!property) notFound();

  return <PropertyDetailClient property={serializeProperty(property)} />;
}
