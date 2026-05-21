import prisma from '../../lib/prisma';
import { serializeProperty } from '../../types/property';
import PropertiesClient from '../../components/PropertiesClient';

export default async function Listing() {
  const raw = await prisma.property.findMany({
    orderBy: { createdAt: 'desc' },
  });
  const properties = raw.map(serializeProperty);

  return <PropertiesClient properties={properties} />;
}
