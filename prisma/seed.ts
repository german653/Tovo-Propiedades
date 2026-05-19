import 'dotenv/config';
import prisma from '../src/lib/prisma';
import { properties } from '../src/data/properties';

async function main() {
  console.log('Iniciando el sembrado de la base de datos...');
  
  for (const property of properties) {
    await prisma.property.upsert({
      where: { id: property.id },
      update: {
        title: property.title,
        price: property.price,
        location: property.location,
        type: property.type,
        operation: property.operation,
        bedrooms: property.bedrooms,
        bathrooms: property.bathrooms,
        sqft: property.sqft,
        description: property.description,
        images: property.images,
        featured: property.featured,
        amenities: property.amenities,
        lat: property.lat,
        lng: property.lng,
      },
      create: {
        id: property.id,
        title: property.title,
        price: property.price,
        location: property.location,
        type: property.type,
        operation: property.operation,
        bedrooms: property.bedrooms,
        bathrooms: property.bathrooms,
        sqft: property.sqft,
        description: property.description,
        images: property.images,
        featured: property.featured,
        amenities: property.amenities,
        lat: property.lat,
        lng: property.lng,
      },
    });
  }

  console.log('Base de datos sembrada con éxito.');
}

main()
  .catch((e) => {
    console.error('Error al sembrar la base de datos:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
