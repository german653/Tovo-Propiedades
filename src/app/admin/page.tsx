"use client";
import { properties } from '../../data/properties';
import { TrendingUp, Users, Home, Eye } from 'lucide-react';
import { motion } from 'motion/react';

export default function AdminDashboard() {
  const stats = [
    { label: 'Propiedades Activas', value: properties.length.toString(), icon: Home },
  ];

  return (
    <div className="p-6 md:p-12">
      <div className="mb-12">
        <h1 className="text-3xl font-display font-bold text-white mb-2">Panel General</h1>
        <p className="text-white/40 text-sm">Resumen de la actividad en Tovo Propiedades</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, i) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-brand-black border border-white/5 p-6 rounded-sm"
          >
            <div className="flex items-start justify-between mb-4">
              <stat.icon className="w-5 h-5 text-white/40" />
            </div>
            <div>
              <p className="text-3xl font-display font-bold text-white mb-1">{stat.value}</p>
              <p className="text-xs uppercase tracking-widest text-white/40 font-bold">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Properties Table */}
      <div className="bg-brand-black border border-white/5 rounded-sm overflow-hidden">
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">Propiedades Destacadas</h2>
          <button className="text-xs uppercase tracking-widest font-bold text-white/50 hover:text-white transition-colors">Ver todas</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/[0.02] text-white/40 text-xs uppercase tracking-widest border-b border-white/5">
              <tr>
                <th className="px-6 py-4 font-bold">Propiedad</th>
                <th className="px-6 py-4 font-bold">Ubicación</th>
                <th className="px-6 py-4 font-bold">Precio</th>
                <th className="px-6 py-4 font-bold">Operación</th>
                <th className="px-6 py-4 font-bold text-right">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-white/80">
              {properties.slice(0, 5).map(property => (
                <tr key={property.id} className="hover:bg-white/[0.01] transition-colors">
                  <td className="px-6 py-4 font-medium">{property.title}</td>
                  <td className="px-6 py-4 text-white/50">{property.location}</td>
                  <td className="px-6 py-4">{property.price}</td>
                  <td className="px-6 py-4 capitalize">{property.operation}</td>
                  <td className="px-6 py-4 text-right">
                    <span className="px-2 py-1 bg-green-500/10 text-green-400 text-[10px] uppercase tracking-wider font-bold rounded-sm border border-green-500/20">
                      Activa
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
