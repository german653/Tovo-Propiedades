"use client";
import { motion } from 'motion/react';
import { ArrowRight, ChevronDown, Award, ShieldCheck, Gem, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { properties } from '../data/properties';
import PropertyCard from '../components/PropertyCard';

export default function Home() {
  const featuredProperties = properties.filter(p => p.featured).slice(0, 3);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-transparent text-brand-cream"
    >
      {/* Hero Section */}
      <section className="relative min-h-[80vh] w-full flex items-center justify-center pt-20">
        {/* Hero Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-brand-cream text-xs md:text-sm uppercase tracking-[0.5em] font-bold mb-6"
          >
            Venta y alquiler de lujo
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="font-display text-5xl md:text-8xl font-medium text-brand-cream leading-[1.1] mb-12"
          >
            Encontrá la propiedad <br /> 
            <span className="italic">que buscás</span>
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex flex-col items-center gap-12"
          >
            <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
              <Link href="/propiedades"
                className="group px-10 py-5 bg-white text-brand-black font-bold uppercase tracking-widest text-xs flex items-center gap-3 transition-transform hover:scale-105"
              >
                Ver Propiedades <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/contacto"
                className="px-10 py-5 bg-transparent border border-white/20 text-brand-cream font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-brand-black transition-all"
              >
                Contactanos
              </Link>
            </div>

            {/* Scroll Indicator - Now below buttons */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center gap-3"
            >
              <span className="text-[9px] uppercase tracking-[0.5em] font-bold text-white/40">Descubrir</span>
              <ChevronDown className="w-4 h-4 text-white/30" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/5">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-xl">
            <h2 className="font-display text-4xl md:text-6xl font-medium text-brand-cream mb-6">Propiedades <span className="italic">Destacadas</span></h2>
            <p className="text-brand-cream/50 text-lg leading-relaxed">
              Una cuidada selección de las residencias más prestigiosas del mercado actual, elegidas por su arquitectura, ubicación y acabados premium.
            </p>
          </div>
          <Link href="/propiedades" className="text-brand-cream text-sm font-bold uppercase tracking-widest hover:translate-x-2 transition-transform inline-flex items-center gap-2 pb-2 border-b border-white">
            Ver todas <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {featuredProperties.map((prop, idx) => (
            <PropertyCard key={prop.id} property={prop} index={idx} />
          ))}
        </div>
      </section>

      {/* Brand Values / Stats */}
      <section className="bg-brand-gray-dark/50 border-y border-white/5 py-24 md:py-32 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6 text-center">
            {[
              { icon: Award, label: 'Años de Trayectoria', value: '15+' },
              { icon: ShieldCheck, label: 'Operaciones Exitosas', value: '1,200+' },
              { icon: Gem, label: 'Propiedades Premium', value: '450+' },
              { icon: TrendingUp, label: 'Crecimiento Anual', value: '25%' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center group"
              >
                <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center mb-6 group-hover:bg-white group-hover:text-brand-black transition-all duration-500 text-brand-cream">
                  <stat.icon className="w-6 h-6" />
                </div>
                <h3 className="text-4xl font-display font-bold text-brand-cream mb-2">{stat.value}</h3>
                <p className="text-[10px] uppercase tracking-widest text-brand-cream/40 font-bold">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 px-6 flex items-center justify-center overflow-hidden bg-transparent">
        <div className="relative z-10 text-center max-w-2xl px-6">
          <h2 className="font-display text-4xl md:text-6xl font-medium mb-8 text-brand-cream">
            ¿Listo para dar el <span className="italic">próximo paso?</span>
          </h2>
          <p className="text-brand-cream/60 text-xl mb-12">
            Nuestro equipo de expertos está listo para asesorarlo en la búsqueda de su propiedad ideal o en la venta de su activo más valioso.
          </p>
          <Link href="/contacto"
            className="inline-block px-12 py-6 bg-white text-brand-black font-bold uppercase tracking-[0.2em] text-xs hover:scale-105 transition-transform"
          >
            Hablemos hoy
          </Link>
        </div>
      </section>
    </motion.div>
  );
}
