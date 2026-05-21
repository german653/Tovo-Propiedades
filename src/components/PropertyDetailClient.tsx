"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { SerializedProperty } from '../types/property';
import { Bed, Bath, Move, MapPin, Share2, CheckCircle2, MessageCircle, ChevronLeft } from 'lucide-react';
import PropertyGallery from './PropertyGallery';

interface PropertyDetailClientProps {
  property: SerializedProperty;
}

function PropertyMap({ lat, lng, location }: { lat: number; lng: number; location: string }) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted || !mapRef.current) return;

    import('leaflet').then((L) => {
      delete (L.Icon.Default.prototype as any)._getIconUrl;

      if (mapInstanceRef.current) return;

      const map = L.map(mapRef.current!, {
        center: [lat, lng],
        zoom: 15,
        zoomControl: true,
        scrollWheelZoom: false,
      });

      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
        maxZoom: 19,
      }).addTo(map);

      // Custom white pin
      const customIcon = L.divIcon({
        className: '',
        html: `<div style="
          width: 32px; height: 32px;
          background: white;
          border: 3px solid rgba(255,255,255,0.3);
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          box-shadow: 0 4px 24px rgba(0,0,0,0.8);
        "></div>`,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -36],
      });

      const marker = L.marker([lat, lng], { icon: customIcon }).addTo(map);
      marker.bindPopup(`<div style="font-family:sans-serif;font-size:12px;font-weight:bold;color:#000">${location}</div>`);

      mapInstanceRef.current = map;
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted]);

  if (!mounted) return (
    <div className="h-[500px] bg-brand-gray-dark/40 border border-white/10 flex items-center justify-center">
      <div className="text-white/20 text-sm">Cargando mapa...</div>
    </div>
  );

  return (
    <div className="relative">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css" />
      <div ref={mapRef} className="w-full border border-white/10" style={{ height: '500px', zIndex: 0 }} />
    </div>
  );
}

export default function PropertyDetailClient({ property }: PropertyDetailClientProps) {
  const router = useRouter();

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: property.title,
          text: `Mira esta exclusiva propiedad: ${property.title}`,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error al compartir', err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('¡Enlace copiado al portapapeles!');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-transparent pb-20 text-brand-cream"
    >
      {/* Header Info */}
      <div className="pt-32 pb-12 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="mb-8">
          <button onClick={() => router.back()} className="text-[10px] uppercase tracking-widest font-bold text-white flex items-center gap-2 hover:translate-x-[-4px] transition-transform w-fit">
            <ChevronLeft className="w-4 h-4" /> Volver
          </button>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div>
            <div className="flex gap-2 mb-4">
              <span className="px-2 py-0.5 bg-brand-gray-dark/60 text-[9px] uppercase tracking-widest font-bold border border-white/10 rounded-sm">
                En {property.operation}
              </span>
              <span className="px-2 py-0.5 bg-white/5 text-brand-cream text-[9px] uppercase tracking-widest font-bold border border-white/10 rounded-sm">
                Exclusivo
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-brand-cream mb-4">{property.title}</h1>
            <div className="flex items-center gap-2 text-brand-cream/60">
              <MapPin className="w-4 h-4 text-white" />
              <span className="text-sm">{property.location}</span>
            </div>
          </div>
          <div className="text-left md:text-right">
            <p className="text-brand-cream/40 text-[10px] uppercase tracking-[0.3em] font-bold mb-2">Precio de mercado</p>
            <p className="text-4xl md:text-5xl font-display font-bold text-brand-cream">{property.price}</p>
            <div className="flex gap-4 mt-6 md:justify-end">
              <button
                onClick={handleShare}
                className="p-3 border border-white/10 hover:border-white hover:text-white transition-all flex items-center gap-2"
                title="Compartir propiedad"
              >
                <Share2 className="w-5 h-5" />
                <span className="text-[10px] uppercase tracking-widest font-bold">Compartir</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      <div className="px-6 md:px-12 max-w-7xl mx-auto mb-20">
        <PropertyGallery images={property.images} />
      </div>

      {/* Main Content Area */}
      <div className="px-6 md:px-12 max-w-5xl mx-auto space-y-24">
        {/* Features Bar */}
        <div className="grid grid-cols-3 gap-8 py-12 border-y border-white/10">
          <div className="flex flex-col items-center text-center gap-3">
            <span className="text-white/40"><Bed className="w-8 h-8 font-light" /></span>
            <span className="text-3xl font-display font-bold text-brand-cream">{property.bedrooms}</span>
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-bold">Dormitorios</span>
          </div>
          <div className="flex flex-col items-center text-center gap-3">
            <span className="text-white/40"><Bath className="w-8 h-8 font-light" /></span>
            <span className="text-3xl font-display font-bold text-brand-cream">{property.bathrooms}</span>
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-bold">Baños</span>
          </div>
          <div className="flex flex-col items-center text-center gap-3">
            <span className="text-white/40"><Move className="w-8 h-8 font-light" /></span>
            <span className="text-3xl font-display font-bold text-brand-cream">{property.sqft}</span>
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-bold">Metros²</span>
          </div>
        </div>

        {/* Description */}
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-xs uppercase tracking-[0.5em] font-bold text-white/30 mb-12">Resumen de la Residencia</h3>
          <div className="text-brand-cream/80 text-xl leading-[1.6] space-y-8">
            <p>{property.description}</p>
          </div>
        </div>

        {/* Amenities */}
        <div className="max-w-3xl mx-auto">
          <h3 className="text-xs uppercase tracking-[0.5em] font-bold text-white/30 mb-12 text-center">Comodidades & Servicios</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {property.amenities.map(amenity => (
              <div key={amenity} className="flex items-center gap-4 p-5 bg-white/[0.02] border border-white/5 rounded-sm">
                <CheckCircle2 className="w-4 h-4 text-white/40" />
                <span className="text-sm font-sans tracking-wide text-brand-cream/70 uppercase text-[10px] font-bold">{amenity}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Map Section */}
        <div className="space-y-12">
          <h3 className="text-xs uppercase tracking-[0.5em] font-bold text-white/30 text-center">Ubicación Privilegiada</h3>
          <PropertyMap lat={property.lat} lng={property.lng} location={property.location} />
        </div>

        {/* Final CTA */}
        <div className="py-20 text-center border-t border-white/5 space-y-10">
          <div className="space-y-4">
            <h4 className="text-3xl font-display font-bold text-brand-cream tracking-tight">¿Desea conocer esta propiedad?</h4>
            <p className="text-brand-cream/40 text-lg leading-relaxed">Asignaremos a un asesor premium para coordinar su visita exclusiva.</p>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <a
              href={`https://wa.me/5491100000000?text=Hola, me interesa la propiedad: ${property.title}`}
              target="_blank"
              rel="noopener"
              className="px-12 py-6 bg-white text-brand-black font-bold uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 transition-transform hover:scale-105"
            >
              Hablar por WhatsApp <MessageCircle className="w-4 h-4" />
            </a>
            <Link href="/contacto"
              className="px-12 py-6 border border-white/20 text-white font-bold uppercase tracking-[0.2em] text-xs hover:bg-white hover:text-brand-black transition-all"
            >
              Enviar Consulta
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}