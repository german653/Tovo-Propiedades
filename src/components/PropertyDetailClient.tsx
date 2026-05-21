"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { SerializedProperty } from '../types/property';
import { Bed, Bath, Move, MapPin, Share2, CheckCircle2, MessageCircle, ChevronLeft } from 'lucide-react';
import PropertyGallery from './PropertyGallery';
import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || '';

interface PropertyDetailClientProps {
  property: SerializedProperty;
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
          <div className="h-[500px] w-full bg-brand-gray-dark/40 border border-white/10 relative group overflow-hidden">
            {API_KEY ? (
              <APIProvider apiKey={API_KEY}>
                <Map
                  defaultCenter={{ lat: property.lat, lng: property.lng }}
                  defaultZoom={15}
                  mapId="PROPERTY_MAP"
                  style={{ width: '100%', height: '100%' }}
                >
                  <AdvancedMarker position={{ lat: property.lat, lng: property.lng }}>
                    <Pin background="#ffffff" glyphColor="#000000" borderColor="#ffffff" />
                  </AdvancedMarker>
                </Map>
              </APIProvider>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center text-brand-cream">
                <MapPin className="w-12 h-12 text-white mb-4 opacity-50" />
                <p className="text-brand-cream/60 mb-4">Ubicación aproximada en {property.location}</p>
                <p className="text-[10px] uppercase tracking-widest text-white font-bold opacity-30">Configuración de Mapa en curso</p>
              </div>
            )}
          </div>
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
