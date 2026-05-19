export interface Property {
  id: string;
  title: string;
  price: string;
  location: string;
  type: 'Casa' | 'Departamento' | 'Terreno' | 'Local';
  operation: 'Venta' | 'Alquiler';
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  description: string;
  images: string[];
  featured: boolean;
  amenities: string[];
  lat: number;
  lng: number;
}

export const properties: Property[] = [
  {
    id: '1',
    title: 'Mansión Vista Panorámica',
    price: 'USD 2.500.000',
    location: 'Nordelta, Buenos Aires',
    type: 'Casa',
    operation: 'Venta',
    bedrooms: 5,
    bathrooms: 6,
    sqft: 850,
    description: 'Impresionante residencia frente al lago en el exclusivo barrio de Nordelta. Diseño arquitectónico minimalista con materiales de primera calidad, techos de doble altura y ventanales de piso a techo que ofrecen vistas inigualables.',
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200'
    ],
    featured: true,
    amenities: ['Piscina Infinita', 'Cava de Vinos', 'Cine Privado', 'Seguridad 24hs', 'Muelle'],
    lat: -34.4011,
    lng: -58.6472
  },
  {
    id: '2',
    title: 'Penthouse Alvear Tower',
    price: 'USD 4.200.000',
    location: 'Puerto Madero, CABA',
    type: 'Departamento',
    operation: 'Venta',
    bedrooms: 4,
    bathrooms: 5,
    sqft: 450,
    description: 'El piso más alto de la ciudad. Lujo extremo en la torre más alta de Argentina. Vistas al río y a toda la ciudad con acabados importados de Italia y tecnología smart home integrada.',
    images: [
      'https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600585154340-be6199f7a096?auto=format&fit=crop&q=80&w=1200'
    ],
    featured: true,
    amenities: ['Gimnasio', 'Lobby de Lujo', 'Piscina Cubierta', 'Microcine', 'Spa'],
    lat: -34.6118,
    lng: -58.3648
  },
  {
    id: '3',
    title: 'Residencia en La Horqueta',
    price: 'USD 1.850.000',
    location: 'San Isidro, GBA Norte',
    type: 'Casa',
    operation: 'Venta',
    bedrooms: 6,
    bathrooms: 4,
    sqft: 620,
    description: 'Clásica elegancia en el corazón de La Horqueta. Amplio jardín arbolado, dependencias de servicio completas y una suite principal soñada con vestidor doble.',
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600607687940-c52af042422e?auto=format&fit=crop&q=80&w=1200'
    ],
    featured: false,
    amenities: ['Quincho', 'Sauna', 'Jardín de Invierno', 'Riego Automático'],
    lat: -34.4754,
    lng: -58.5284
  },
  {
    id: '4',
    title: 'Moderno Loft de Diseño',
    price: 'USD 450.000',
    location: 'Palermo Soho, CABA',
    type: 'Departamento',
    operation: 'Venta',
    bedrooms: 2,
    bathrooms: 2,
    sqft: 120,
    description: 'Espacio vanguardista con techos altos y ladrillo a la vista. Ubicado en la zona más hipster de Palermo, ideal para amantes del diseño y la vida urbana.',
    images: [
      'https://images.unsplash.com/photo-1536376074432-bf1217e11f4a?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=1200'
    ],
    featured: false,
    amenities: ['Terraza Propia', 'Parrilla', 'Cochera Fija', 'Seguridad'],
    lat: -34.5829,
    lng: -58.4333
  },
  {
    id: '5',
    title: 'Chateau en San Vicente',
    price: 'USD 1.250.000',
    location: 'San Vicente, GBA Sur',
    type: 'Casa',
    operation: 'Venta',
    bedrooms: 5,
    bathrooms: 4,
    sqft: 410,
    description: 'Exclusiva propiedad de estilo francés en barrio cerrado premium. Detalles de boiserie, mármoles de Carrara y un imponente hall de recepción.',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6199f7a096?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200'
    ],
    featured: true,
    amenities: ['Seguridad Privada', 'Club House', 'Golf', 'Tenis'],
    lat: -35.0211,
    lng: -58.4231
  }
];
