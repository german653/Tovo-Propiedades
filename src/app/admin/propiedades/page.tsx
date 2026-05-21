import prisma from '../../../lib/prisma';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { serializeProperty } from '../../../types/property';
import AdminPropertiesTable from '../../../components/admin/AdminPropertiesTable';

export default async function AdminPropiedades() {
  const raw = await prisma.property.findMany({ orderBy: { createdAt: 'desc' } });
  const properties = raw.map(serializeProperty);

  return (
    <div className="p-6 md:p-12 pt-20 md:pt-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-2">Propiedades</h1>
          <p className="text-white/40 text-sm">{properties.length} propiedades en total</p>
        </div>
        <Link
          href="/admin/propiedades/nueva"
          className="flex items-center justify-center w-full md:w-auto gap-2 px-6 py-3 bg-white text-brand-black font-bold uppercase tracking-widest text-xs hover:bg-white/90 transition-all"
        >
          <Plus className="w-4 h-4" /> Nueva Propiedad
        </Link>
      </div>

      <div className="bg-brand-black border border-white/5 rounded-sm overflow-hidden">
        <AdminPropertiesTable properties={properties} showActions={true} />
      </div>
    </div>
  );
}
