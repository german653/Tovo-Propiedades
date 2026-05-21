import prisma from '../../lib/prisma';
import Link from 'next/link';
import { Home, Star, TrendingUp, Key, Plus } from 'lucide-react';
import { serializeProperty } from '../../types/property';
import AdminPropertiesTable from '../../components/admin/AdminPropertiesTable';

export default async function AdminDashboard() {
  const [total, featured, venta, alquiler, recentRaw] = await Promise.all([
    prisma.property.count(),
    prisma.property.count({ where: { featured: true } }),
    prisma.property.count({ where: { operation: 'Venta' } }),
    prisma.property.count({ where: { operation: 'Alquiler' } }),
    prisma.property.findMany({ orderBy: { createdAt: 'desc' }, take: 5 }),
  ]);

  const recent = recentRaw.map(serializeProperty);

  const stats = [
    { label: 'Total Propiedades', value: total.toString(), icon: Home, color: 'text-white' },
    { label: 'Destacadas', value: featured.toString(), icon: Star, color: 'text-yellow-400' },
    { label: 'En Venta', value: venta.toString(), icon: TrendingUp, color: 'text-green-400' },
    { label: 'En Alquiler', value: alquiler.toString(), icon: Key, color: 'text-blue-400' },
  ];

  return (
    <div className="p-6 md:p-12 pt-20 md:pt-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-2">Panel General</h1>
          <p className="text-white/40 text-sm">Resumen de la actividad en Tovo Propiedades</p>
        </div>
        <Link
          href="/admin/propiedades/nueva"
          className="flex items-center justify-center w-full md:w-auto gap-2 px-6 py-3 bg-white text-brand-black font-bold uppercase tracking-widest text-xs hover:bg-white/90 transition-all"
        >
          <Plus className="w-4 h-4" /> Nueva Propiedad
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-brand-black border border-white/5 p-6 rounded-sm hover:border-white/10 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <Icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <p className="text-3xl font-display font-bold text-white mb-1">{stat.value}</p>
              <p className="text-xs uppercase tracking-widest text-white/40 font-bold">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Recent Properties */}
      <div className="bg-brand-black border border-white/5 rounded-sm overflow-hidden">
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">Propiedades Recientes</h2>
          <Link href="/admin/propiedades" className="text-xs uppercase tracking-widest font-bold text-white/50 hover:text-white transition-colors">
            Ver todas
          </Link>
        </div>
        <AdminPropertiesTable properties={recent} showActions={false} />
      </div>
    </div>
  );
}
