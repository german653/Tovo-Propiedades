"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SerializedProperty } from '../../types/property';
import { Loader2, UploadCloud, X } from 'lucide-react';

type FormMode = 'create' | 'edit';

interface PropertyFormProps {
  mode: FormMode;
  initialData?: SerializedProperty;
}

const TIPOS = ['Casa', 'Departamento', 'Terreno', 'Local'] as const;
const OPERACIONES = ['Venta', 'Alquiler'] as const;

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <label className="block text-[10px] uppercase tracking-widest font-bold text-white/40">{label}</label>
      {children}
      {error && <p className="text-red-400 text-xs">{error}</p>}
    </div>
  );
}

const inputCls = "w-full bg-transparent border border-white/10 focus:border-white/40 outline-none py-3 px-4 text-white text-sm transition-colors placeholder:text-white/20";
const selectCls = "w-full bg-brand-black border border-white/10 focus:border-white/40 outline-none py-3 px-4 text-white text-sm transition-colors";

export default function PropertyForm({ mode, initialData }: PropertyFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    title: initialData?.title ?? '',
    price: initialData?.price ?? '',
    location: initialData?.location ?? '',
    type: initialData?.type ?? 'Casa',
    operation: initialData?.operation ?? 'Venta',
    bedrooms: initialData?.bedrooms?.toString() ?? '1',
    bathrooms: initialData?.bathrooms?.toString() ?? '1',
    sqft: initialData?.sqft?.toString() ?? '',
    description: initialData?.description ?? '',
    featured: initialData?.featured ?? false,
    amenities: initialData?.amenities?.join('\n') ?? '',
    lat: initialData?.lat?.toString() ?? '-34.6037',
    lng: initialData?.lng?.toString() ?? '-58.3816',
  });

  const [uploadingImages, setUploadingImages] = useState(false);
  const [imageUrls, setImageUrls] = useState<string[]>(initialData?.images || []);

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(f => ({ ...f, [field]: e.target.value }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset || cloudName === "TU_CLOUD_NAME") {
      alert("Por favor, configura las credenciales de Cloudinary en el archivo .env primero.");
      return;
    }

    setUploadingImages(true);
    const files = Array.from(e.target.files);
    const uploadedUrls: string[] = [];

    for (const file of files) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', uploadPreset);

      try {
        const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
          method: 'POST',
          body: formData,
        });
        const data = await res.json();
        if (data.secure_url) {
          uploadedUrls.push(data.secure_url);
        } else {
          console.error("Error cloudinary:", data);
        }
      } catch (err) {
        console.error('Error uploading image', err);
        alert('Error al subir una de las imágenes');
      }
    }

    setImageUrls(prev => [...prev, ...uploadedUrls]);
    setUploadingImages(false);
    
    // Reset file input
    e.target.value = '';
  };

  const removeImage = (index: number) => {
    setImageUrls(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const payload = {
      ...form,
      images: imageUrls,
      amenities: form.amenities.split('\n').map(s => s.trim()).filter(Boolean),
    };

    try {
      const url = mode === 'create' ? '/api/properties' : `/api/properties/${initialData!.id}`;
      const method = mode === 'create' ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Error desconocido');
      }

      router.push('/admin/propiedades');
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error al guardar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-sm">
          {error}
        </div>
      )}

      {/* Basic Info */}
      <div className="bg-brand-black border border-white/5 rounded-sm p-8 space-y-6">
        <h2 className="text-sm font-bold text-white uppercase tracking-widest border-b border-white/5 pb-4">Información Principal</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Field label="Título">
            <input required value={form.title} onChange={set('title')} className={inputCls} placeholder="Ej: Mansión en Nordelta" />
          </Field>
          <Field label="Precio">
            <input required value={form.price} onChange={set('price')} className={inputCls} placeholder="Ej: USD 2.500.000" />
          </Field>
          <Field label="Ubicación">
            <input required value={form.location} onChange={set('location')} className={inputCls} placeholder="Ej: Nordelta, Buenos Aires" />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Tipo">
              <select value={form.type} onChange={set('type')} className={selectCls}>
                {TIPOS.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </Field>
            <Field label="Operación">
              <select value={form.operation} onChange={set('operation')} className={selectCls}>
                {OPERACIONES.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </Field>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <Field label="Dormitorios">
            <input type="number" min="0" required value={form.bedrooms} onChange={set('bedrooms')} className={inputCls} />
          </Field>
          <Field label="Baños">
            <input type="number" min="0" required value={form.bathrooms} onChange={set('bathrooms')} className={inputCls} />
          </Field>
          <Field label="Metros²">
            <input type="number" min="0" required value={form.sqft} onChange={set('sqft')} className={inputCls} placeholder="120" />
          </Field>
        </div>

        <Field label="Descripción">
          <textarea required value={form.description} onChange={set('description')} rows={4} className={inputCls} placeholder="Descripción detallada de la propiedad..." />
        </Field>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="featured"
            checked={form.featured}
            onChange={e => setForm(f => ({ ...f, featured: e.target.checked }))}
            className="w-4 h-4 accent-white cursor-pointer"
          />
          <label htmlFor="featured" className="text-[10px] uppercase tracking-widest font-bold text-white/40 cursor-pointer">
            Marcar como Propiedad Destacada
          </label>
        </div>
      </div>

      {/* Images */}
      <div className="bg-brand-black border border-white/5 rounded-sm p-8 space-y-6">
        <h2 className="text-sm font-bold text-white uppercase tracking-widest border-b border-white/5 pb-4">Imágenes</h2>
        
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <label className={`flex items-center justify-center gap-2 px-6 py-3 border border-white/20 text-white font-bold uppercase tracking-widest text-xs hover:bg-white/5 transition-all cursor-pointer ${uploadingImages ? 'opacity-50 pointer-events-none' : ''}`}>
              {uploadingImages ? <Loader2 className="w-4 h-4 animate-spin" /> : <UploadCloud className="w-4 h-4" />}
              {uploadingImages ? 'Subiendo...' : 'Subir Imágenes'}
              <input type="file" multiple accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploadingImages} />
            </label>
            <p className="text-white/40 text-xs">Puedes seleccionar varias fotos a la vez.</p>
          </div>

          {imageUrls.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              {imageUrls.map((url, i) => (
                <div key={i} className="relative group aspect-video bg-white/5 border border-white/10 rounded-sm overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={url} alt={`Preview ${i}`} className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    className="absolute top-2 right-2 p-1.5 bg-black/60 text-white rounded-sm opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity hover:bg-red-500"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  {i === 0 && (
                    <span className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/80 text-white text-[9px] uppercase tracking-widest font-bold rounded-sm border border-white/20 shadow-sm">
                      Portada
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Amenities */}
      <div className="bg-brand-black border border-white/5 rounded-sm p-8 space-y-6">
        <h2 className="text-sm font-bold text-white uppercase tracking-widest border-b border-white/5 pb-4">Amenities</h2>
        <Field label="Comodidades (una por línea)">
          <textarea
            value={form.amenities}
            onChange={set('amenities')}
            rows={5}
            className={inputCls}
            placeholder={"Piscina Infinita\nSeguridad 24hs\nGimnasio\nSpa"}
          />
        </Field>
      </div>

      {/* Location */}
      <div className="bg-brand-black border border-white/5 rounded-sm p-8 space-y-6">
        <h2 className="text-sm font-bold text-white uppercase tracking-widest border-b border-white/5 pb-4">Coordenadas del Mapa</h2>
        <div className="grid grid-cols-2 gap-6">
          <Field label="Latitud">
            <input type="number" step="any" required value={form.lat} onChange={set('lat')} className={inputCls} placeholder="-34.6037" />
          </Field>
          <Field label="Longitud">
            <input type="number" step="any" required value={form.lng} onChange={set('lng')} className={inputCls} placeholder="-58.3816" />
          </Field>
        </div>
        <p className="text-white/20 text-xs">Buscá la propiedad en Google Maps → click derecho → Copiar coordenadas.</p>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-4">
        <button
          type="button"
          onClick={() => router.push('/admin/propiedades')}
          className="px-8 py-3 border border-white/10 text-white/50 hover:text-white hover:border-white/30 text-xs uppercase tracking-widest font-bold transition-all"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 px-8 py-3 bg-white text-brand-black font-bold uppercase tracking-widest text-xs hover:bg-white/90 transition-all disabled:opacity-50"
        >
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          {mode === 'create' ? 'Crear Propiedad' : 'Guardar Cambios'}
        </button>
      </div>
    </form>
  );
}
