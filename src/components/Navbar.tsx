"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Landmark } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  if (pathname.startsWith('/admin') || pathname.startsWith('/acceso')) return null;

  const navLinks = [
    { name: 'Inicio', path: '/' },
    { name: 'Propiedades', path: '/propiedades' },
    { name: 'Nosotros', path: '/nosotros' },
    { name: 'Contacto', path: '/contacto' },
    { name: 'Acceso', path: '/acceso' },
  ];

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 w-full z-[100] transition-all duration-500 px-6 py-4 md:px-12 md:py-6',
        isScrolled ? 'bg-brand-black/80 backdrop-blur-xl py-4 border-b border-white/5' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo Replicated from Image */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex flex-col items-center">
             <div className="relative border border-white px-3 py-1 mb-1">
                <div className="absolute -top-[7px] left-1/2 -translate-x-1/2">
                   <div className="w-0 h-0 border-l-[18px] border-l-transparent border-r-[18px] border-r-transparent border-b-[8px] border-b-white" />
                </div>
                <span className="font-display text-lg font-bold tracking-[0.2em] text-white">
                   TOVO
                </span>
             </div>
             <span className="font-sans text-[7px] uppercase tracking-[0.8em] font-black text-white/50 -mr-[0.8em]">Propiedades</span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className={cn(
                'relative text-[10px] uppercase tracking-[0.3em] font-bold transition-colors hover:text-white py-2',
                pathname === link.path ? 'text-white' : 'text-white/50'
              )}
            >
              {link.name}
              {pathname === link.path && (
                <motion.div
                  layoutId="nav-underline"
                  className="absolute bottom-0 left-0 w-full h-[1px] bg-white"
                />
              )}
            </Link>
          ))}
          <Link href="/propiedades"
            className="px-6 py-2.5 bg-white text-black text-[10px] uppercase tracking-widest font-black hover:bg-white/90 transition-all duration-300"
          >
            Ver Propiedades
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-brand-black/95 backdrop-blur-2xl border-t border-white/10 p-8 flex flex-col gap-6 md:hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg uppercase tracking-widest font-display text-white/80 hover:text-white transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <Link href="/propiedades"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full py-4 bg-white text-black text-center uppercase tracking-widest font-bold"
            >
              Ver Propiedades
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
