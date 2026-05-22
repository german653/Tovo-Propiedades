"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Pencil, Trash2, Star, Eye } from 'lucide-react';
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
    <div className="overflow-x-auto">
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
              <td className="px-6 py-4 font-medium max-w-[200px] truncate">{property.title}</td>
              <td className="px-6 py-4 text-white/50 max-w-[160px] truncate">{property.location}</td>
              <td className="px-6 py-4 whitespace-nowrap">{property.price}</td>
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
  );
}
