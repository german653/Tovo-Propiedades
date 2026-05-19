import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Maximize2, ChevronLeft, ChevronRight, X } from 'lucide-react';

interface PropertyGalleryProps {
  images: string[];
}

export default function PropertyGallery({ images }: PropertyGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[600px]">
        <div className="md:col-span-2 md:row-span-2 h-full group relative overflow-hidden cursor-pointer" onClick={() => setSelectedImage(0)}>
          <img src={images[0]} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Gallery 1" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
          <div className="absolute bottom-6 right-6 p-4 bg-brand-black/40 backdrop-blur-md border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
            <Maximize2 className="w-5 h-5" />
          </div>
        </div>
        {images.slice(1, 5).map((img, i) => (
          <div key={i} className="h-full group relative overflow-hidden cursor-pointer" onClick={() => setSelectedImage(i + 1)}>
            <img src={img || images[0]} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={`Gallery ${i + 2}`} referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
          </div>
        ))}
        {images.length > 5 && (
          <div className="relative group cursor-pointer h-full" onClick={() => setSelectedImage(5)}>
             <img src={images[5]} className="w-full h-full object-cover grayscale opacity-40" alt="More" referrerPolicy="no-referrer" />
             <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-display font-bold tracking-widest">+{images.length - 5}</span>
             </div>
          </div>
        )}
      </div>

      {/* Fullscreen Overlay */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-brand-black/95 flex items-center justify-center p-4"
          >
            <button onClick={() => setSelectedImage(null)} className="absolute top-8 right-8 p-3 text-brand-cream hover:bg-white/10 rounded-full transition-colors">
              <X className="w-8 h-8" />
            </button>
            
            <div className="relative w-full max-w-6xl aspect-[16/9] flex items-center justify-center">
              <button 
                onClick={() => setSelectedImage((prev) => (prev! > 0 ? prev! - 1 : images.length - 1))}
                className="absolute left-4 p-4 text-brand-cream hover:bg-white/10 rounded-full transition-colors"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>

              <img src={images[selectedImage]} className="max-w-full max-h-full object-contain shadow-2xl" alt="Preview" referrerPolicy="no-referrer" />

              <button 
                onClick={() => setSelectedImage((prev) => (prev! < images.length - 1 ? prev! + 1 : 0))}
                className="absolute right-4 p-4 text-brand-cream hover:bg-white/10 rounded-full transition-colors"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </div>

            <div className="absolute bottom-12 text-brand-cream/60 text-sm font-sans uppercase tracking-[0.2em]">
               Imagen {selectedImage + 1} de {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
