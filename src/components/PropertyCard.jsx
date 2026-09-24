import React from 'react';
import { urlFor } from '../client';
import { Bed, Bath, Square, MapPin, Sparkles } from 'lucide-react';
import ProgressiveImage from './ProgressiveImage';

const PropertyCard = ({ property, onSelect }) => {
  if (!property) return null;

  // Optimized Sanity image with responsive width and quality
  const imageUrl = property.mainImage?.asset 
    ? urlFor(property.mainImage).width(800).quality(85).url() 
    : property.image?.asset
      ? urlFor(property.image).width(800).quality(85).url()
      : property.image || property.mainImage;

  // Responsive srcset
  const srcAsset = property.mainImage?.asset || property.image?.asset;
  const srcSet = srcAsset ? [
    `${urlFor(srcAsset).width(400).quality(75).url()} 400w`,
    `${urlFor(srcAsset).width(800).quality(80).url()} 800w`,
    `${urlFor(srcAsset).width(1200).quality(85).url()} 1200w`,
  ].join(', ') : undefined;

  const sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw";
  const placeholderUrl = srcAsset?.metadata?.lqip;

  // Formatting helpers
  const specs = property.specifications || {};
  const bedrooms = specs.bedrooms || property.bedrooms || 0;
  const bathrooms = specs.bathrooms || property.bathrooms || 0;
  const sqft = specs.sqft || property.sqft || 0;
  const formattedSqft = sqft ? `${sqft.toLocaleString()} sq ft` : 'Spacious';

  const locationStr = property.location?.neighborhood 
    ? `${property.location.neighborhood}, ${property.location.city || 'Roswell'}`
    : property.location?.city 
      ? `${property.location.city}, ${property.location.state || 'GA'}`
      : 'Roswell, GA';

  const handleMouseEnter = () => {
    // Prefetch first 3 gallery images on hover for ultra-fast modal transition
    if (property.gallery?.length > 0) {
      property.gallery.slice(0, 3).forEach((img) => {
        if (img?.asset) {
          const url = urlFor(img).width(1400).quality(80).url();
          const prefetchImg = new Image();
          prefetchImg.src = url;
        }
      });
    }
  };

  const formattedPrice = property.priceDisplayMode === 'fixed' && property.price
    ? new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
      }).format(property.price)
    : 'Price on Request';

  return (
    <div 
      className="bg-white rounded-2xl border border-neutral-200/80 shadow-sm overflow-hidden flex flex-col group cursor-pointer hover:shadow-xl hover:border-neutral-300 transition-all duration-300 ease-out font-sans"
      onClick={() => onSelect && onSelect(property)}
      onMouseEnter={handleMouseEnter}
    >
      {/* Image Container with Soft Rounded Corners */}
      <div className="relative aspect-[16/11] overflow-hidden bg-neutral-100">
        <ProgressiveImage 
          src={imageUrl} 
          srcSet={srcSet}
          sizes={sizes}
          placeholder={placeholderUrl}
          alt={property.title || property.name || 'Luxury Estate'}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Soft Status & Exclusive Badges */}
        <div className="absolute top-3.5 left-3.5 flex flex-col gap-1.5 z-10">
          {property.isSold ? (
            <span className="glass-badge text-[10px] font-semibold uppercase tracking-[0.15em] px-3 py-1 rounded-full text-neutral-800 border border-neutral-300">
              Sold / Leased
            </span>
          ) : property.isFeatured ? (
            <span className="glass-badge text-[10px] font-semibold uppercase tracking-[0.15em] px-3 py-1 rounded-full text-amber-700 bg-amber-50/90 border border-amber-200/70 flex items-center gap-1.5 shadow-sm">
              <Sparkles size={11} className="text-amber-600" /> Exclusive Portfolio
            </span>
          ) : (
            <span className="glass-badge text-[10px] font-semibold uppercase tracking-[0.15em] px-3 py-1 rounded-full text-neutral-700">
              {property.status || 'For Sale'}
            </span>
          )}
        </div>

        {/* Property Type Pill */}
        <div className="absolute bottom-3.5 left-3.5 z-10">
          <span className="bg-neutral-950/70 backdrop-blur-md text-white/90 text-[10px] font-medium tracking-wider uppercase px-3 py-1 rounded-full border border-white/10">
            {property.propertyType || 'Modern Estate'}
          </span>
        </div>
      </div>

      {/* Details Container */}
      <div className="p-5 md:p-6 flex flex-col flex-grow justify-between">
        <div>
          {/* Location Line */}
          <div className="flex items-center gap-1.5 text-neutral-400 text-xs font-normal mb-2">
            <MapPin size={13} className="text-[#D4AF37]" />
            <span className="truncate">{locationStr}</span>
          </div>

          {/* Title */}
          <h3 className="text-base md:text-lg font-semibold text-neutral-900 leading-snug group-hover:text-[#D4AF37] transition-colors line-clamp-1">
            {property.title || property.name}
          </h3>
        </div>

        {/* Specifications Row with Clean Minimalist Icons */}
        <div className="grid grid-cols-3 gap-2 py-4 mt-4 border-y border-neutral-100 text-neutral-600 text-xs font-medium">
          <div className="flex items-center gap-2">
            <Bed size={15} className="text-neutral-400" />
            <span>{bedrooms} <span className="text-neutral-400 font-light">Beds</span></span>
          </div>
          <div className="flex items-center gap-2">
            <Bath size={15} className="text-neutral-400" />
            <span>{bathrooms} <span className="text-neutral-400 font-light">Baths</span></span>
          </div>
          <div className="flex items-center gap-2">
            <Square size={14} className="text-neutral-400" />
            <span className="truncate">{formattedSqft}</span>
          </div>
        </div>

        {/* Price Row */}
        <div className="pt-4 flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-neutral-400 font-medium">Acquisition Price</div>
            <div className="text-base md:text-lg font-semibold text-neutral-900 tracking-tight">
              {formattedPrice}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-medium text-neutral-400 group-hover:text-[#D4AF37] group-hover:translate-x-0.5 transition-all">
              Explore →
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
