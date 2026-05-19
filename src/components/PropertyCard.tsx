import React from 'react';
import { Property } from '../data/properties';
import Link from 'next/link';
import { Bed, Bath, Move, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

export interface PropertyCardProps {
  property: Property;
  index: number;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group h-full"
    >
      <Link href={`/propiedad/${property.id}`} className="flex flex-col h-full relative overflow-hidden bg-brand-gray-dark/20 backdrop-blur-sm border border-white/5 hover:border-white/10 transition-all duration-700">
        {/* Image Container */}
        <div className="aspect-[4/5] overflow-hidden relative shrink-0">
          <img
            src={property.images[0]}
            alt={property.title}
            className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110"
            referrerPolicy="no-referrer"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/20 to-transparent opacity-80" />
          
          {/* Badge */}
          <div className="absolute top-6 left-6">
            <span className="px-4 py-1.5 bg-brand-black/40 backdrop-blur-md text-[9px] uppercase tracking-[0.3em] font-bold border border-white/10 text-white">
              {property.operation}
            </span>
          </div>

          {/* Price Tag - Better Styled */}
          <div className="absolute bottom-10 left-8 z-20">
             <p className="text-brand-cream/60 text-[9px] uppercase tracking-[0.3em] font-bold mb-1">Inversión</p>
             <p className="text-3xl font-display font-bold text-white tracking-tight">{property.price}</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 relative -mt-4 group-hover:-translate-y-2 transition-transform duration-500 flex flex-col flex-grow">
          <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/40 mb-3">{property.location}</p>
          <h3 className="text-2xl font-display font-bold mb-6 text-brand-cream group-hover:text-white transition-colors leading-tight min-h-[4rem]">
            {property.title}
          </h3>
          
          <div className="mt-auto flex items-center gap-6 text-white/40 font-serif italic text-sm pt-4 border-t border-white/5">
            <div className="flex items-center gap-2">
              <Bed className="w-4 h-4 opacity-50" />
              <span>{property.bedrooms} <span className="hidden sm:inline">Dorm.</span></span>
            </div>
            <div className="flex items-center gap-2">
              <Bath className="w-4 h-4 opacity-50" />
              <span>{property.bathrooms} <span className="hidden sm:inline">Baños</span></span>
            </div>
            <div className="flex items-center gap-2">
              <Move className="w-4 h-4 opacity-50" />
              <span>{property.sqft} m²</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default PropertyCard;
