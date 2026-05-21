"use client";
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { LayoutDashboard, Home, LogOut, Menu, X } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // Basic auth check
    if (!document.cookie.includes('tovo_admin=true')) {
      router.push('/acceso');
    } else {
      setIsAuthorized(true);
    }
  }, [router]);

  if (!isAuthorized) return <div className="min-h-screen bg-brand-black" />;

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
    { name: 'Propiedades', icon: Home, path: '/admin/propiedades' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-brand-cream flex">
      {/* Mobile Sidebar Toggle */}
      <button 
        className="md:hidden fixed top-4 right-4 z-50 p-2 bg-white/10 rounded-sm"
        onClick={() => setSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <X /> : <Menu />}
      </button>

      {/* Sidebar */}
      <aside className={cn(
        "fixed md:static inset-y-0 left-0 z-40 w-64 bg-brand-black border-r border-white/5 transition-transform duration-300 flex flex-col",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        <div className="p-8 border-b border-white/5">
          <Link href="/" className="flex flex-col items-start gap-1 group w-fit">
            <span className="font-display text-xl font-bold tracking-[0.25em] text-white">TOVO</span>
            <span className="font-sans text-[8px] uppercase tracking-[0.9em] font-black text-white/40 -mr-[0.9em]">Admin</span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map(item => {
            const isActive = pathname === item.path || pathname.startsWith(`${item.path}/`);
            const Icon = item.icon;
            return (
              <Link 
                key={item.name} 
                href={item.path}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 text-sm transition-colors rounded-sm",
                  isActive ? "bg-white/10 text-white font-medium" : "text-white/50 hover:text-white hover:bg-white/5"
                )}
              >
                <Icon className="w-4 h-4" /> {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/5">
          <button 
            onClick={() => {
              document.cookie = "tovo_admin=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
              router.push('/acceso');
            }}
            className="flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:text-red-300 transition-colors w-full"
          >
            <LogOut className="w-4 h-4" /> Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-x-hidden overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
