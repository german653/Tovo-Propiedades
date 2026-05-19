"use client";
import { motion } from 'motion/react';
import { Award, Target, Users, BookOpen, Quote } from 'lucide-react';

export default function About() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-transparent text-brand-cream"
    >
      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden pt-20 border-b border-white/5">
        <div className="relative z-10 text-center max-w-4xl px-6">

          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-8xl font-display font-bold text-brand-cream leading-tight"
          >
            Excelencia en <br /><span className="italic font-serif font-light">Bienes Raíces</span>
          </motion.h1>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-32 px-6 md:px-12 bg-transparent">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="aspect-[4/5] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800"
                alt="Architecture"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

          </div>

          <div className="space-y-12">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-display font-medium text-brand-cream">Compromiso con la <span className="italic">perfección</span></h2>
              <p className="text-brand-cream/60 text-xl leading-relaxed mb-8">
                Desde nuestra fundación hace más de 15 años, Tovo Propiedades ha redefinido el mercado inmobiliario de lujo en Argentina. No somos solo una agencia; somos asesores estratégicos en la búsqueda de su patrimonio más valioso.
              </p>
              <p className="text-brand-cream/40 text-sm leading-relaxed">
                Nuestra metodología combina el análisis técnico profundo con un sentido estético agudo. Entendemos que una propiedad premium requiere una comercialización igualmente excepcional, utilizando las últimas tecnologías en tours virtuales, marketing digital y fotografía cinematográfica.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-white/10">
               <div className="space-y-4">
                  <div className="flex items-center gap-3">
                     <Award className="w-5 h-5 text-brand-cream" />
                     <h4 className="text-xs uppercase tracking-widest font-bold">Standard de Oro</h4>
                  </div>
                  <p className="text-xs text-brand-cream/40 leading-relaxed italic">Certificados por las normas internacionales más exigentes en servicios inmobiliarios.</p>
               </div>
               <div className="space-y-4">
                  <div className="flex items-center gap-3">
                     <Target className="w-5 h-5 text-brand-cream" />
                     <h4 className="text-xs uppercase tracking-widest font-bold">Estrategia Global</h4>
                  </div>
                  <p className="text-xs text-brand-cream/40 leading-relaxed italic">Conexión directa con inversores locales e internacionales de alto perfil.</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="bg-transparent py-32 px-6 border-y border-white/5">
         <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20 max-w-2xl mx-auto">
               <h2 className="text-3xl md:text-5xl font-display font-medium mb-8 text-brand-cream">Nuestros Valores <span className="italic">Fundamentales</span></h2>
               <div className="w-20 h-px bg-white mx-auto opacity-30" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5 border border-white/5">
                {[
                  {
                    title: 'Confianza Absoluta',
                    icon: ShieldCheck,
                    desc: 'Manejamos cada operación con la máxima discreción y seguridad jurídica para nuestros clientes.'
                  },
                  {
                    title: 'Excelencia Operativa',
                    icon: Award,
                    desc: 'Cuidamos cada detalle, desde la primera consulta hasta la firma de la escritura.'
                  },
                  {
                    title: 'Visión Estratégica',
                    icon: Users,
                    desc: 'Nos anticipamos a las tendencias del mercado para ofrecer las mejores oportunidades de inversión.'
                  }
                ].map((v, i) => (
                  <div key={i} className="bg-brand-gray-dark/40 p-12 hover:bg-brand-gray-dark/60 transition-colors group border border-white/5">
                     <div className="w-12 h-12 mb-8 border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-brand-black transition-all text-brand-cream font-bold">
                        <Users className="w-5 h-5" />
                     </div>
                     <h4 className="text-xl font-display font-medium mb-4 text-brand-cream">{v.title}</h4>
                     <p className="text-sm text-brand-cream/50 leading-relaxed">{v.desc}</p>
                  </div>
                ))}
            </div>
         </div>
      </section>
    </motion.div>
  );
}

const ShieldCheck = (props: any) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);
