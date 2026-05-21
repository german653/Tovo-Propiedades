"use client";
import { useEffect, useRef, useState } from 'react';
import { Search, Loader2, MapPin, CheckCircle2 } from 'lucide-react';

interface MapPickerProps {
  lat: string;
  lng: string;
  onChange: (lat: string, lng: string) => void;
}

export default function MapPicker({ lat, lng, onChange }: MapPickerProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markerRef = useRef<any>(null);

  const [query, setQuery] = useState('');
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState('');
  const [searchSuccess, setSearchSuccess] = useState(false);
  const [mounted, setMounted] = useState(false);

  const initialLat = parseFloat(lat) || -34.6037;
  const initialLng = parseFloat(lng) || -58.3816;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !mapRef.current) return;

    // Dynamic import to avoid SSR issues
    import('leaflet').then((L) => {
      // Fix default marker icons
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
      });

      if (mapInstanceRef.current) return; // already initialized

      const map = L.map(mapRef.current!, {
        center: [initialLat, initialLng],
        zoom: lat && lng ? 15 : 12,
        zoomControl: true,
      });

      // Dark-ish tile from CartoDB
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
        maxZoom: 19,
      }).addTo(map);

      // Custom pin icon
      const customIcon = L.divIcon({
        className: '',
        html: `<div style="
          width: 32px; height: 32px;
          background: white;
          border: 3px solid #000;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          box-shadow: 0 4px 20px rgba(0,0,0,0.5);
        "></div>`,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
      });

      // Add marker if coords exist
      if (lat && lng) {
        markerRef.current = L.marker([initialLat, initialLng], { icon: customIcon, draggable: true }).addTo(map);
        markerRef.current.on('dragend', () => {
          const pos = markerRef.current.getLatLng();
          onChange(pos.lat.toFixed(6), pos.lng.toFixed(6));
        });
      }

      // Click to place/move marker
      map.on('click', (e: any) => {
        const { lat: clickLat, lng: clickLng } = e.latlng;
        if (markerRef.current) {
          markerRef.current.setLatLng([clickLat, clickLng]);
        } else {
          markerRef.current = L.marker([clickLat, clickLng], { icon: customIcon, draggable: true }).addTo(map);
          markerRef.current.on('dragend', () => {
            const pos = markerRef.current.getLatLng();
            onChange(pos.lat.toFixed(6), pos.lng.toFixed(6));
          });
        }
        onChange(clickLat.toFixed(6), clickLng.toFixed(6));
      });

      mapInstanceRef.current = map;
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        markerRef.current = null;
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted]);

  const handleSearch = async () => {
    if (!query.trim() || !mapInstanceRef.current) return;
    setSearching(true);
    setSearchError('');
    setSearchSuccess(false);

    try {
      const encoded = encodeURIComponent(query + ', Argentina');
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encoded}&format=json&limit=1`,
        { headers: { 'Accept-Language': 'es' } }
      );
      const data = await res.json();

      if (data && data.length > 0) {
        const { lat: foundLat, lon: foundLng } = data[0];
        const numLat = parseFloat(foundLat);
        const numLng = parseFloat(foundLng);

        import('leaflet').then((L) => {
          const map = mapInstanceRef.current;
          map.setView([numLat, numLng], 16, { animate: true });

          const customIcon = L.divIcon({
            className: '',
            html: `<div style="
              width: 32px; height: 32px;
              background: white;
              border: 3px solid #000;
              border-radius: 50% 50% 50% 0;
              transform: rotate(-45deg);
              box-shadow: 0 4px 20px rgba(0,0,0,0.5);
            "></div>`,
            iconSize: [32, 32],
            iconAnchor: [16, 32],
          });

          if (markerRef.current) {
            markerRef.current.setLatLng([numLat, numLng]);
          } else {
            markerRef.current = L.marker([numLat, numLng], { icon: customIcon, draggable: true }).addTo(map);
            markerRef.current.on('dragend', () => {
              const pos = markerRef.current.getLatLng();
              onChange(pos.lat.toFixed(6), pos.lng.toFixed(6));
            });
          }

          onChange(numLat.toFixed(6), numLng.toFixed(6));
          setSearchSuccess(true);
          setTimeout(() => setSearchSuccess(false), 3000);
        });
      } else {
        setSearchError('No se encontró. Probá con una dirección más específica.');
      }
    } catch {
      setSearchError('Error al buscar. Verificá tu conexión.');
    } finally {
      setSearching(false);
    }
  };

  if (!mounted) return (
    <div className="h-[420px] bg-white/5 border border-white/10 flex items-center justify-center">
      <Loader2 className="w-6 h-6 animate-spin text-white/30" />
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Search bar */}
      <div className="space-y-2">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), handleSearch())}
              className="w-full bg-transparent border border-white/10 focus:border-white/40 outline-none py-3 pl-11 pr-4 text-white text-sm transition-colors placeholder:text-white/20"
              placeholder="Ej: Av. del Libertador 1500, Recoleta, CABA"
            />
          </div>
          <button
            type="button"
            onClick={handleSearch}
            disabled={searching || !query.trim()}
            className="flex items-center gap-2 px-5 py-3 bg-white/10 hover:bg-white hover:text-brand-black text-white font-bold uppercase tracking-widest text-xs transition-all disabled:opacity-40 disabled:pointer-events-none whitespace-nowrap border border-white/10"
          >
            {searching ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
            {searching ? 'Buscando...' : 'Buscar'}
          </button>
        </div>

        {searchSuccess && (
          <div className="flex items-center gap-2 text-green-400 text-xs">
            <CheckCircle2 className="w-4 h-4" />
            <span>Dirección encontrada. Ajustá el pin si querés mayor precisión.</span>
          </div>
        )}
        {searchError && <p className="text-red-400 text-xs">{searchError}</p>}
        <p className="text-white/20 text-xs">
          Buscá la dirección o hacé <strong className="text-white/40">click en el mapa</strong> para colocar el pin exacto. También podés <strong className="text-white/40">arrastrar el pin</strong>.
        </p>
      </div>

      {/* Map */}
      <div className="relative">
        {/* Leaflet CSS */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css"
        />
        <div
          ref={mapRef}
          className="w-full border border-white/10"
          style={{ height: '420px', zIndex: 0 }}
        />
        {/* Coords pill overlay */}
        {lat && lng && (
          <div className="absolute bottom-4 left-4 z-[999] px-3 py-1.5 bg-brand-black/80 backdrop-blur-sm border border-white/10 text-[10px] text-white/50 font-mono">
            {parseFloat(lat).toFixed(5)}, {parseFloat(lng).toFixed(5)}
          </div>
        )}
      </div>
    </div>
  );
}