import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const property = await prisma.property.create({
      data: {
        title: body.title,
        price: body.price,
        location: body.location,
        type: body.type,
        operation: body.operation,
        bedrooms: Number(body.bedrooms),
        bathrooms: Number(body.bathrooms),
        sqft: Number(body.sqft),
        description: body.description,
        images: body.images,
        featured: Boolean(body.featured),
        amenities: body.amenities,
        lat: Number(body.lat),
        lng: Number(body.lng),
      },
    });

    return NextResponse.json(property, { status: 201 });
  } catch (error) {
    console.error('Error creating property:', error);
    return NextResponse.json({ error: 'Error al crear la propiedad' }, { status: 500 });
  }
}
