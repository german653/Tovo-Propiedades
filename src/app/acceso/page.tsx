"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Lock, ArrowRight, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';

export default function Acceso() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '1234') {
      document.cookie = "tovo_admin=true; path=/; max-age=86400";
      router.push('/admin');
    } else {
      setError(true);
      setTimeout(() => setError(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-brand-black flex flex-col items-center justify-center p-6 relative">
      <Link href="/" className="absolute top-8 left-8 text-[10px] uppercase tracking-widest font-bold text-white/50 flex items-center gap-2 hover:text-white transition-colors">
        <ArrowLeft className="w-4 h-4" /> Volver a la web
      </Link>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-12">
          <h1 className="text-3xl font-display font-bold text-white tracking-widest uppercase mb-4">TOVO Admin</h1>
          <p className="text-white/40 text-xs tracking-[0.3em] uppercase">Panel de Control Exclusivo</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6 bg-white/[0.02] border border-white/5 p-8 backdrop-blur-md">
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest font-bold text-white/40">Contraseña de acceso</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full bg-transparent border py-4 pl-12 pr-4 outline-none transition-all text-white ${error ? 'border-red-500' : 'border-white/20 focus:border-white'}`}
                placeholder="••••"
              />
            </div>
            {error && <p className="text-red-500 text-xs mt-2">Contraseña incorrecta</p>}
          </div>

          <button type="submit" className="w-full py-4 bg-white text-black font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-white/90 transition-all">
            Ingresar <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </motion.div>
    </div>
  );
}
