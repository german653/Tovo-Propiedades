"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Pencil, Trash2, Star, Eye, Bed, Bath, Move, Home } from 'lucide-react';
import { SerializedProperty } from '../../types/property';
import { useNotification } from '../../context/NotificationContext';

interface Props {
  properties: SerializedProperty[];
  showActions?: boolean;
}

export default function AdminPropertiesTable({ properties, showActions = true }: Props) {
  const router = useRouter();
  const [deleting, setDeleting] = useState<string | null>(null);
  const { showToast, showConfirm } = useNotification();

  const handleDelete = (id: string, title: string) => {
    showConfirm(
      `¿Estás seguro de que deseas eliminar la propiedad "${title}"? Esta acción no se puede deshacer.`,
      async () => {
        setDeleting(id);
        try {
          const res = await fetch(`/api/properties/${id}`, { method: 'DELETE' });
          if (res.ok) {
            showToast('Propiedad eliminada con éxito', 'success');
            router.refresh();
          } else {
            showToast('Error al eliminar la propiedad', 'error');
          }
        } catch {
          showToast('Error de conexión', 'error');
        } finally {
          setDeleting(null);
        }
      },
      'Eliminar Propiedad'
    );
  };

  return (
    <div className="space-y-6">
      {/* DESKTOP TABLE VIEW (Visible on tablet/desktop) */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/[0.02] text-white/40 text-xs uppercase tracking-widest border-b border-white/5">
            <tr>
              <th className="px-6 py-4 font-bold">Propiedad</th>
              <th className="px-6 py-4 font-bold">Ubicación</th>
              <th className="px-6 py-4 font-bold">Precio</th>
              <th className="px-6 py-4 font-bold">Tipo</th>
              <th className="px-6 py-4 font-bold">Operación</th>
              <th className="px-6 py-4 font-bold text-center">Destacada</th>
              {showActions && <th className="px-6 py-4 font-bold text-right">Acciones</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-white/80">
            {properties.map(property => (
              <tr key={property.id} className="hover:bg-white/[0.01] transition-colors">
                <td className="px-6 py-4 font-medium max-w-[240px]">
                  <div className="flex items-center gap-3">
                    {property.images && property.images.length > 0 ? (
                      <img 
                        src={property.images[0]} 
                        alt={property.title} 
                        className="w-10 h-10 object-cover rounded-sm border border-white/10 flex-shrink-0"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-sm flex items-center justify-center flex-shrink-0">
                        <Home className="w-4 h-4 text-white/30" />
                      </div>
                    )}
                    <span className="truncate block" title={property.title}>{property.title}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-white/50 max-w-[160px] truncate">{property.location}</td>
                <td className="px-6 py-4 whitespace-nowrap font-bold text-brand-cream">{property.price}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-white/5 border border-white/10 text-[10px] uppercase tracking-wider font-bold rounded-sm">
                    {property.type}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-[10px] uppercase tracking-wider font-bold rounded-sm border ${
                    property.operation === 'Venta'
                      ? 'bg-green-500/10 text-green-400 border-green-500/20'
                      : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                  }`}>
                    {property.operation}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  {property.featured
                    ? <Star className="w-4 h-4 text-yellow-400 mx-auto fill-yellow-400" />
                    : <span className="text-white/20">—</span>
                  }
                </td>
                {showActions && (
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/propiedad/${property.id}`}
                        className="p-2 text-white/40 hover:text-white border border-white/5 hover:border-white/20 transition-all rounded-sm"
                        title="Ver en sitio"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <Link
                        href={`/admin/propiedades/${property.id}/editar`}
                        className="p-2 text-white/40 hover:text-white border border-white/5 hover:border-white/20 transition-all rounded-sm"
                        title="Editar"
                      >
                        <Pencil className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(property.id, property.title)}
                        disabled={deleting === property.id}
                        className="p-2 text-red-400/60 hover:text-red-400 border border-white/5 hover:border-red-500/20 transition-all rounded-sm disabled:opacity-40"
                        title="Eliminar"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
            {properties.length === 0 && (
              <tr>
                <td colSpan={showActions ? 7 : 6} className="px-6 py-16 text-center text-white/30 text-sm">
                  No hay propiedades cargadas aún.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MOBILE CARD VIEW (Visible on mobile screens) */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {properties.map(property => (
          <div 
            key={property.id} 
            className="p-4 bg-white/[0.02] border border-white/5 rounded-md relative overflow-hidden flex flex-col gap-4"
          >
            {/* Top part: Image and Info */}
            <div className="flex gap-4">
              {/* Thumbnail Image */}
              <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-sm overflow-hidden flex-shrink-0 relative">
                {property.images && property.images.length > 0 ? (
                  <img 
                    src={property.images[0]} 
                    alt={property.title} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Home className="w-5 h-5 text-white/20" />
                  </div>
                )}
                
                {/* Featured indicator tag overlay */}
                {property.featured && (
                  <div className="absolute top-0 left-0 p-1 bg-yellow-400 text-brand-black rounded-br-sm shadow" title="Propiedad Destacada">
                    <Star className="w-3 h-3 fill-brand-black text-brand-black" />
                  </div>
                )}
              </div>

              {/* Main Text Details */}
              <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                <div>
                  <span className="text-[9px] text-white/40 uppercase tracking-[0.2em] font-bold block truncate">{property.location}</span>
                  <h4 className="text-sm font-bold text-white tracking-wide truncate mt-0.5" title={property.title}>{property.title}</h4>
                </div>

                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-sm font-bold text-brand-cream tracking-tight">{property.price}</span>
                </div>

                <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
                  <span className="px-1.5 py-0.5 bg-white/5 border border-white/10 text-[8px] uppercase tracking-wider font-bold rounded-sm text-white/60">
                    {property.type}
                  </span>

                  <span className={`px-1.5 py-0.5 text-[8px] uppercase tracking-wider font-bold rounded-sm border ${
                    property.operation === 'Venta'
                      ? 'bg-green-500/10 text-green-400 border-green-500/20'
                      : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                  }`}>
                    {property.operation}
                  </span>
                </div>
              </div>
            </div>

            {/* Middle part: Key Property Specs (Beds, Baths, Sqft) */}
            <div className="border-t border-white/5 pt-3 flex items-center justify-around text-white/50 text-[10px]">
              <div className="flex items-center gap-1.5">
                <Bed className="w-3.5 h-3.5 text-white/30" />
                <span>{property.bedrooms} <span className="text-white/30">Dorm.</span></span>
              </div>
              <div className="h-3 w-px bg-white/10" />
              <div className="flex items-center gap-1.5">
                <Bath className="w-3.5 h-3.5 text-white/30" />
                <span>{property.bathrooms} <span className="text-white/30">Baños</span></span>
              </div>
              <div className="h-3 w-px bg-white/10" />
              <div className="flex items-center gap-1.5">
                <Move className="w-3.5 h-3.5 text-white/30" />
                <span>{property.sqft} <span className="text-white/30">m²</span></span>
              </div>
            </div>

            {/* Bottom part: Actions */}
            {showActions && (
              <div className="border-t border-white/5 pt-3 flex items-center justify-between gap-2.5">
                <Link
                  href={`/propiedad/${property.id}`}
                  className="flex-1 py-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all rounded-sm text-center text-xs text-white/80 font-bold flex items-center justify-center gap-1.5"
                  title="Ver propiedad en sitio público"
                >
                  <Eye className="w-3.5 h-3.5" /> Ver
                </Link>
                <Link
                  href={`/admin/propiedades/${property.id}/editar`}
                  className="flex-1 py-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all rounded-sm text-center text-xs text-white/80 font-bold flex items-center justify-center gap-1.5"
                  title="Editar propiedad"
                >
                  <Pencil className="w-3.5 h-3.5" /> Editar
                </Link>
                <button
                  onClick={() => handleDelete(property.id, property.title)}
                  disabled={deleting === property.id}
                  className="p-2 text-red-400 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 hover:border-red-500/40 transition-all rounded-sm disabled:opacity-40 flex items-center justify-center shrink-0"
                  title="Eliminar propiedad"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        ))}

        {properties.length === 0 && (
          <div className="p-12 border border-dashed border-white/10 text-center text-white/30 text-sm rounded">
            No hay propiedades cargadas aún.
          </div>
        )}
      </div>
    </div>
  );
}
