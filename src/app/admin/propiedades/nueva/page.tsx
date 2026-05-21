import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import PropertyForm from '../../../../components/admin/PropertyForm';

export default function NuevaPropiedad() {
  return (
    <div className="p-6 md:p-12 pt-20 md:pt-12">
      <div className="mb-10">
        <Link
          href="/admin/propiedades"
          className="text-[10px] uppercase tracking-widest font-bold text-white/40 flex items-center gap-2 hover:text-white transition-colors w-fit mb-6"
        >
          <ChevronLeft className="w-4 h-4" /> Volver a Propiedades
        </Link>
        <h1 className="text-3xl font-display font-bold text-white mb-2">Nueva Propiedad</h1>
        <p className="text-white/40 text-sm">Completá los datos para agregar una nueva propiedad al catálogo.</p>
      </div>

      <PropertyForm mode="create" />
    </div>
  );
}
