"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { SerializedProperty } from '../types/property';
import { Bed, Bath, Move, MapPin, Share2, CheckCircle2, MessageCircle, ChevronLeft } from 'lucide-react';
import PropertyGallery from './PropertyGallery';
import { useNotification } from '../context/NotificationContext';

interface PropertyDetailClientProps {
  property: SerializedProperty;
}

function PropertyMap({ lat, lng, location }: { lat: number; lng: number; location: string }) {
  return (
    <div className="relative w-full border border-white/10 overflow-hidden" style={{ height: '500px' }}>
      <iframe
        title={`Mapa de ${location}`}
        width="100%"
        height="100%"
        style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) saturate(0.8)' }}
        loading="lazy"
        allowFullScreen={true}
        referrerPolicy="no-referrer-when-downgrade"
        src={`https://www.google.com/maps?q=${lat},${lng}&hl=es&z=15&output=embed`}
      ></iframe>
      <div className="absolute bottom-4 left-4 z-10 px-3 py-1.5 bg-brand-black/80 backdrop-blur-sm border border-white/10 text-[10px] text-white/50 font-mono pointer-events-none">
        {lat.toFixed(5)}, {lng.toFixed(5)}
      </div>
    </div>
  );
}

export default function PropertyDetailClient({ property }: PropertyDetailClientProps) {
  const router = useRouter();
  const { showToast } = useNotification();

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: property.title,
          text: `Mira esta exclusiva propiedad: ${property.title}`,
          url: window.location.href,
        });
      } catch (err) {
        showToast('Error al compartir la propiedad', 'error');
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('¡Enlace copiado al portapapeles!', 'success');
    }
  };

  const waMessage = encodeURIComponent('Hola, me interesa la propiedad: ' + property.title);

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
          <button
            onClick={() => router.back()}
            className="text-[10px] uppercase tracking-widest font-bold text-white flex items-center gap-2 hover:translate-x-[-4px] transition-transform w-fit"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Volver</span>
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
            <h1 className="text-4xl md:text-6xl font-display font-bold text-brand-cream mb-4">
              {property.title}
            </h1>
            <div className="flex items-center gap-2 text-brand-cream/60">
              <MapPin className="w-4 h-4 text-white" />
              <span className="text-sm">{property.location}</span>
            </div>
          </div>
          <div className="text-left md:text-right">
            <p className="text-brand-cream/40 text-[10px] uppercase tracking-[0.3em] font-bold mb-2">
              Precio de mercado
            </p>
            <p className="text-4xl md:text-5xl font-display font-bold text-brand-cream">
              {property.price}
            </p>
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
            <span className="text-white/40">
              <Bed className="w-8 h-8" />
            </span>
            <span className="text-3xl font-display font-bold text-brand-cream">
              {property.bedrooms}
            </span>
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-bold">
              Dormitorios
            </span>
          </div>
          <div className="flex flex-col items-center text-center gap-3">
            <span className="text-white/40">
              <Bath className="w-8 h-8" />
            </span>
            <span className="text-3xl font-display font-bold text-brand-cream">
              {property.bathrooms}
            </span>
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-bold">
              Baños
            </span>
          </div>
          <div className="flex flex-col items-center text-center gap-3">
            <span className="text-white/40">
              <Move className="w-8 h-8" />
            </span>
            <span className="text-3xl font-display font-bold text-brand-cream">
              {property.sqft}
            </span>
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-bold">
              Metros²
            </span>
          </div>
        </div>

        {/* Description */}
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-xs uppercase tracking-[0.5em] font-bold text-white/30 mb-12">
            Resumen de la Residencia
          </h3>
          <div className="text-brand-cream/80 text-xl leading-[1.6] space-y-8">
            <p>{property.description}</p>
          </div>
        </div>

        {/* Amenities */}
        <div className="max-w-3xl mx-auto">
          <h3 className="text-xs uppercase tracking-[0.5em] font-bold text-white/30 mb-12 text-center">
            Comodidades & Servicios
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {property.amenities.map((amenity) => (
              <div
                key={amenity}
                className="flex items-center gap-4 p-5 bg-white/[0.02] border border-white/5 rounded-sm"
              >
                <CheckCircle2 className="w-4 h-4 text-white/40" />
                <span className="text-[10px] font-sans tracking-wide text-brand-cream/70 uppercase font-bold">
                  {amenity}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Map Section */}
        <div className="space-y-12">
          <h3 className="text-xs uppercase tracking-[0.5em] font-bold text-white/30 text-center">
            Ubicación Privilegiada
          </h3>
          <PropertyMap lat={property.lat} lng={property.lng} location={property.location} />
        </div>

        {/* Final CTA */}
        <div className="py-20 text-center border-t border-white/5 space-y-10">
          <div className="space-y-4">
            <h4 className="text-3xl font-display font-bold text-brand-cream tracking-tight">
              ¿Desea conocer esta propiedad?
            </h4>
            <p className="text-brand-cream/40 text-lg leading-relaxed">
              Asignaremos a un asesor premium para coordinar su visita exclusiva.
            </p>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <a
              href={`https://wa.me/5491100000000?text=${waMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-12 py-6 bg-white text-brand-black font-bold uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 transition-transform hover:scale-105"
            >
              <span>Hablar por WhatsApp</span>
              <MessageCircle className="w-4 h-4" />
            </a>
            <Link
              href="/contacto"
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