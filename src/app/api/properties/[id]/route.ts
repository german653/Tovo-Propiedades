import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';

interface Params {
  params: Promise<{ id: string }>;
}

export async function PUT(request: Request, { params }: Params) {
  try {
    const { id } = await params;
    const body = await request.json();

    const property = await prisma.property.update({
      where: { id },
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

    return NextResponse.json(property);
  } catch (error) {
    console.error('Error updating property:', error);
    return NextResponse.json({ error: 'Error al actualizar la propiedad' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: Params) {
  try {
    const { id } = await params;
    await prisma.property.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting property:', error);
    return NextResponse.json({ error: 'Error al eliminar la propiedad' }, { status: 500 });
  }
}
