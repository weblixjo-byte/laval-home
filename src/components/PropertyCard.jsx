import React from 'react';
import { urlFor } from '../client';
import { Bed, Bath, Square, MapPin } from 'lucide-react';
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

        {/* Sold Badge Only */}
        {property.isSold && (
          <div className="absolute top-3.5 left-3.5 z-10">
            <span className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded bg-neutral-950/80 text-white backdrop-blur-sm">
              Sold
            </span>
          </div>
        )}
      </div>

      {/* Details Container */}
      <div className="p-5 md:p-6 flex flex-col flex-grow justify-between">
        <div>
          {/* Location & Property Type */}
          <div className="flex items-center justify-between text-neutral-400 text-xs font-normal mb-2 gap-2">
            <div className="flex items-center gap-1.5 truncate">
              <MapPin size={13} className="text-[#D4AF37] shrink-0" />
              <span className="truncate">{locationStr}</span>
            </div>
            {property.propertyType && (
              <span className="text-[10px] uppercase tracking-wider font-semibold text-[#D4AF37] shrink-0">
                {property.propertyType}
              </span>
            )}
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
