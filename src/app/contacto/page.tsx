"use client";
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, MessageCircle, Send, Globe } from 'lucide-react';
import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';

const API_KEY = process.env.GOOGLE_MAPS_PLATFORM_KEY || '';

export default function Contact() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-transparent text-brand-cream"
    >
      {/* Header */}
      <section className="pt-40 pb-24 px-6 border-b border-white/5 bg-transparent">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center gap-12">
          <div className="max-w-3xl">
            <p className="text-brand-cream text-[10px] uppercase tracking-[0.5em] font-bold mb-6">Abiertos a consultas</p>
            <h1 className="text-5xl md:text-8xl font-display font-medium text-brand-cream mb-8 leading-tight">Estamos a <br /><span className="italic">un paso</span> de su objetivo</h1>
            <p className="text-brand-cream/60 text-xl leading-relaxed mx-auto max-w-2xl">
              Ya sea que busque su próxima inversión o un nuevo hogar, nuestro equipo está listo para brindarle el asesoramiento personalizado que usted merece.
            </p>
          </div>

        </div>
      </section>

      {/* Main Content */}
      <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
         {/* Form Area */}
         <div>
            <h2 className="text-3xl font-display font-bold mb-12 uppercase tracking-widest border-l-4 border-white pl-6">Escríbanos</h2>
            <form className="space-y-8">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                     <label className="text-[10px] uppercase tracking-widest font-bold text-brand-cream/40">Nombre</label>
                     <input type="text" className="w-full bg-transparent border-b border-white/20 py-4 outline-none focus:border-white transition-colors text-brand-cream" placeholder="Su nombre completo" />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] uppercase tracking-widest font-bold text-brand-cream/40">Email</label>
                     <input type="email" className="w-full bg-transparent border-b border-white/20 py-4 outline-none focus:border-white transition-colors text-brand-cream" placeholder="correo@ejemplo.com" />
                  </div>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                     <label className="text-[10px] uppercase tracking-widest font-bold text-brand-cream/40">Teléfono</label>
                     <input type="text" className="w-full bg-transparent border-b border-white/20 py-4 outline-none focus:border-white transition-colors text-brand-cream" placeholder="+54 9 11 ..." />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] uppercase tracking-widest font-bold text-brand-cream/40">Asunto</label>
                     <select className="w-full bg-transparent border-b border-white/20 py-4 outline-none focus:border-white transition-colors text-brand-cream appearance-none">
                        <option value="venta" className="bg-brand-gray-dark">Venta de propiedad</option>
                        <option value="compra" className="bg-brand-gray-dark">Búsqueda de propiedad</option>
                        <option value="alquiler" className="bg-brand-gray-dark">Alquiler</option>
                        <option value="otro" className="bg-brand-gray-dark">Otro</option>
                     </select>
                  </div>
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-brand-cream/40">Mensaje</label>
                  <textarea rows={5} className="w-full bg-transparent border-b border-white/20 py-4 outline-none focus:border-white transition-colors text-brand-cream resize-none" placeholder="Cuéntenos cómo podemos ayudarle..."></textarea>
               </div>
               <button className="px-12 py-6 bg-white text-brand-black font-bold uppercase tracking-[0.2em] text-xs flex items-center gap-3 group transition-transform hover:scale-105">
                  Enviar Mensaje <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
               </button>
            </form>
         </div>

         {/* Contact Info & Map */}
         <div className="space-y-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
               <div className="space-y-6">
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 border border-white/10 flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-brand-cream" />
                     </div>
                     <span className="text-[10px] uppercase tracking-widest font-bold">Oficina Central</span>
                  </div>
                  <p className="text-brand-cream/60 text-lg leading-relaxed">
                     Av. del Libertador 1500, <br />Recoleta, CABA, Argentina.
                  </p>
               </div>
               <div className="space-y-6">
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 border border-white/10 flex items-center justify-center">
                        <Phone className="w-5 h-5 text-brand-cream" />
                     </div>
                     <span className="text-[10px] uppercase tracking-widest font-bold">Atención Directa</span>
                  </div>
                  <p className="text-brand-cream/60 text-lg leading-relaxed">
                     +54 11 1234-5678 <br /> de Lunes a Viernes 9:00 - 18:00
                  </p>
               </div>
            </div>

            {/* Map Container */}
            <div className="h-[450px] w-full bg-brand-gray-dark/40 border border-white/10 relative overflow-hidden group backdrop-blur-sm grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
               <iframe 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }}
                  src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=es&amp;q=Av.%20del%20Libertador%201500,%20Recoleta,%20CABA,%20Argentina+(Tovo%20Propiedades)&amp;t=&amp;z=15&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                  allowFullScreen={false} 
                  loading="lazy"
               ></iframe>
            </div>
         </div>
      </section>

      {/* Social Banner */}
      <section className="bg-brand-gray-dark/30 py-20 px-6 border-y border-white/5 overflow-hidden relative">
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
            <div>
               <h3 className="text-3xl font-display font-medium mb-4 text-brand-cream">Siga nuestra <span className="italic">colección</span></h3>
               <p className="text-brand-cream/40 text-xs uppercase tracking-widest">Encuentre inspiración diaria en nuestras redes sociales</p>
            </div>
            <div className="flex gap-4">
               <a href="https://instagram.com/tovopropiedades" target="_blank" rel="noopener noreferrer" className="px-8 py-4 border border-white/10 hover:bg-white hover:text-brand-black transition-all text-sm font-bold uppercase tracking-widest">Instagram</a>
            </div>
         </div>
         {/* Background Decoration */}
         <div className="absolute top-1/2 left-0 w-full h-px bg-white/10 -translate-y-1/2 scale-x-150 -rotate-12" />
      </section>
    </motion.div>
  );
}
