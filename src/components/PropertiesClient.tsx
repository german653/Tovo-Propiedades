"use client";
import { motion } from 'motion/react';
import PropertyCard from './PropertyCard';
import { SerializedProperty } from '../types/property';

interface PropertiesClientProps {
  properties: SerializedProperty[];
}

export default function PropertiesClient({ properties }: PropertiesClientProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Page Header */}
      <header className="relative pt-40 pb-20 px-6 bg-transparent border-b border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <p className="text-brand-cream text-[10px] uppercase tracking-[0.5em] font-bold mb-4">Catálogo Premium</p>
          <h1 className="text-5xl md:text-7xl font-display font-medium text-brand-cream mb-6">Nuestras <br /><span className="italic">Propiedades</span></h1>
          <p className="text-brand-cream/60 max-w-2xl mx-auto text-xl leading-relaxed">
            Descubra una colección excepcional de residencias exclusivas, diseñadas para quienes buscan lo extraordinario en cada detalle.
          </p>
        </div>
      </header>

      {/* Properties Grid */}
      <section className="bg-transparent pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-10 py-6 border-y border-white/10">
            <span className="text-[10px] uppercase tracking-widest font-bold text-brand-cream/60">
              Mostrando {properties.length} propiedades exclusivas
            </span>
            <div className="flex items-center gap-10">
              <p className="text-[10px] uppercase tracking-widest text-brand-cream/40 font-bold">Residencias Seleccionadas</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {properties.map((prop, idx) => (
              <PropertyCard key={prop.id} property={prop} index={idx} />
            ))}
          </div>

          {/* Pagination placeholder */}
          <div className="mt-20 flex justify-center gap-4">
            <button className="w-12 h-12 bg-white text-brand-black flex items-center justify-center font-bold">1</button>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
