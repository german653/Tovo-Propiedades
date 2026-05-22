"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Landmark, Instagram, Facebook, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith('/propiedad/') || pathname.startsWith('/admin') || pathname.startsWith('/acceso')) return null;

  return (
    <footer className="bg-transparent pt-32 pb-10 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-20 mb-20">
        {/* Info Area */}
        <div className="space-y-8">
          <Link href="/" className="flex flex-col items-start gap-1 group w-fit">
            <div className="relative border border-white px-4 py-1.5 mb-1 group-hover:bg-white transition-all duration-500">
               <div className="absolute -top-[8px] left-1/2 -translate-x-1/2">
                  <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-b-[9px] border-b-white group-hover:border-b-white transition-all duration-500" />
               </div>
               <span className="font-display text-xl font-bold tracking-[0.25em] text-white group-hover:text-brand-black transition-all duration-500">
                  TOVO
               </span>
            </div>
            <span className="font-sans text-[8px] uppercase tracking-[0.9em] font-black text-white/40 -mr-[0.9em]">Propiedades</span>
          </Link>
          
          <p className="text-brand-cream/50 text-sm leading-relaxed font-serif italic max-w-xs">
            Redefiniendo el mercado de lujo con un compromiso inquebrantable con la excelencia y la discreción.
          </p>
          
          <div className="flex gap-4">
            <a href="https://instagram.com/tovopropiedades" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-white/10 flex items-center justify-center hover:bg-white hover:text-brand-black transition-all duration-500 rounded-sm">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="https://facebook.com/tovopropiedades" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-white/10 flex items-center justify-center hover:bg-white hover:text-brand-black transition-all duration-500 rounded-sm">
              <Facebook className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Links */}
        <div className="md:justify-self-center">
          <h4 className="text-white font-bold text-[10px] uppercase tracking-[0.4em] mb-10 opacity-40">Navegación</h4>
          <ul className="flex flex-col gap-5 text-sm text-brand-cream/60">
            {['Inicio', 'Propiedades', 'Nosotros', 'Contacto'].map((item) => (
              <li key={item}>
                <Link href={item === 'Inicio' ? '/' : `/${item.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`} className="hover:text-white transition-colors flex items-center gap-2 group">
                  <span className="w-0 h-px bg-white group-hover:w-4 transition-all duration-300"></span>
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="md:justify-self-end text-right flex flex-col items-end">
          <h4 className="text-white font-bold text-[10px] uppercase tracking-[0.4em] mb-10 opacity-40">Contacto</h4>
          <ul className="flex flex-col gap-8 text-sm text-brand-cream/60 items-end">
            <li className="flex flex-col items-end gap-2 group">
              <div className="flex items-center gap-3 text-white">
                <MapPin className="w-4 h-4 text-white/40" />
                <span className="text-[10px] uppercase tracking-widest font-bold">Ubicación</span>
              </div>
              <span className="font-serif italic text-base">Av. del Libertador 1500, Recoleta</span>
            </li>
            <li className="flex flex-col items-end gap-2">
              <div className="flex items-center gap-3 text-white">
                <Phone className="w-4 h-4 text-white/40" />
                <span className="text-[10px] uppercase tracking-widest font-bold">Teléfono</span>
              </div>
              <span className="font-sans font-medium">+54 351 342-7543</span>
            </li>
            <li className="flex flex-col items-end gap-2">
              <div className="flex items-center gap-3 text-white">
                <Mail className="w-4 h-4 text-white/40" />
                <span className="text-[10px] uppercase tracking-widest font-bold">Email</span>
              </div>
              <span className="font-sans">info@tovopropiedades.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-10 border-t border-white/5 flex flex-col md:flex-row justify-center items-center gap-6">
        <p className="text-[9px] text-white/20 uppercase tracking-[0.3em] font-bold">
          © 2026 Tovo Propiedades. Excellence in Real Estate.
        </p>
      </div>
    </footer>
  );
}
