import { useState } from 'react';
import { Search, SlidersHorizontal, MapPin, Home, DollarSign, BedDouble } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

export default function FilterSection({ className }: { className?: string }) {
  const [activeTab, setActiveTab] = useState<'venta' | 'alquiler'>('venta');

  return (
    <div className={cn("relative z-20 -mt-16 md:-mt-24 px-6 md:px-12 max-w-6xl mx-auto", className)}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="glass-morphism rounded-none p-2 shadow-2xl"
      >
        {/* Tabs */}
        <div className="flex gap-2 mb-4 bg-brand-black/40 p-1 w-fit">
          <button
            onClick={() => setActiveTab('venta')}
            className={cn(
              "px-8 py-3 text-[10px] uppercase tracking-widest font-bold transition-all duration-300",
              activeTab === 'venta' ? "bg-brand-gold text-brand-black" : "text-brand-cream/60 hover:text-brand-cream"
            )}
          >
            Venta
          </button>
          <button
            onClick={() => setActiveTab('alquiler')}
            className={cn(
              "px-8 py-3 text-[10px] uppercase tracking-widest font-bold transition-all duration-300",
              activeTab === 'alquiler' ? "bg-brand-gold text-brand-black" : "text-brand-cream/60 hover:text-brand-cream"
            )}
          >
            Alquiler
          </button>
        </div>

        {/* Filter Bar */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-0 md:gap-px bg-white/5 border border-white/10">
          {/* Location */}
          <div className="p-4 bg-brand-green-dark/40 border-r border-white/5 hover:bg-white/5 transition-colors cursor-pointer group">
            <div className="flex items-center gap-3 mb-2">
              <MapPin className="w-4 h-4 text-brand-gold" />
              <span className="text-[10px] uppercase tracking-widest font-bold text-brand-cream/40">Ubicación</span>
            </div>
            <select className="bg-transparent text-sm text-brand-cream outline-none w-full appearance-none cursor-pointer">
              <option value="">Todas las zonas</option>
              <option value="caba">CABA</option>
              <option value="gba-norte">GBA Norte</option>
              <option value="gba-sur">GBA Sur</option>
            </select>
          </div>

          {/* Property Type */}
          <div className="p-4 bg-brand-green-dark/40 border-r border-white/5 hover:bg-white/5 transition-colors cursor-pointer group">
            <div className="flex items-center gap-3 mb-2">
              <Home className="w-4 h-4 text-brand-gold" />
              <span className="text-[10px] uppercase tracking-widest font-bold text-brand-cream/40">Tipo</span>
            </div>
            <select className="bg-transparent text-sm text-brand-cream outline-none w-full appearance-none cursor-pointer">
              <option value="">Todos los tipos</option>
              <option value="casa">Casa</option>
              <option value="departamento">Departamento</option>
              <option value="lote">Lote</option>
            </select>
          </div>

          {/* Price */}
          <div className="p-4 bg-brand-green-dark/40 border-r border-white/5 hover:bg-white/5 transition-colors cursor-pointer group">
            <div className="flex items-center gap-3 mb-2">
              <DollarSign className="w-4 h-4 text-brand-gold" />
              <span className="text-[10px] uppercase tracking-widest font-bold text-brand-cream/40">Presupuesto</span>
            </div>
            <select className="bg-transparent text-sm text-brand-cream outline-none w-full appearance-none cursor-pointer">
              <option value="">Rango de precio</option>
              <option value="low">Hasta USD 500k</option>
              <option value="mid">USD 500k - 1.5M</option>
              <option value="high">Más de USD 1.5M</option>
            </select>
          </div>

          {/* Bedrooms */}
          <div className="p-4 bg-brand-green-dark/40 border-r border-white/5 hover:bg-white/5 transition-colors cursor-pointer group">
            <div className="flex items-center gap-3 mb-2">
              <BedDouble className="w-4 h-4 text-brand-gold" />
              <span className="text-[10px] uppercase tracking-widest font-bold text-brand-cream/40">Dormitorios</span>
            </div>
            <select className="bg-transparent text-sm text-brand-cream outline-none w-full appearance-none cursor-pointer">
              <option value="">Cantidad</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
            </select>
          </div>

          {/* Search Button */}
          <div className="flex items-center justify-center p-4 bg-brand-gold/10 hover:bg-brand-gold transition-all duration-500 cursor-pointer group">
            <div className="flex items-center gap-3 text-brand-gold group-hover:text-brand-black transition-colors">
              <Search className="w-5 h-5" />
              <span className="text-sm uppercase tracking-[0.2em] font-bold">Buscar</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
