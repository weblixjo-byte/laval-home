import React, { useState, useEffect, useMemo } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';
import { client } from '../client';
import { Search, SlidersHorizontal, ArrowUpDown } from 'lucide-react';

const Properties = ({ onInquire }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const typeFromUrl = searchParams.get('type') || searchParams.get('brand');
  const searchFromUrl = searchParams.get('search') || '';

  const [categories, setCategories] = useState([]);
  const [allProperties, setAllProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(searchFromUrl);
  const [sortBy, setSortBy] = useState('featured'); // 'featured', 'price_desc', 'price_asc', 'sqft_desc'

  const selectedCategory = typeFromUrl || 'All';

  const [prevSearchFromUrl, setPrevSearchFromUrl] = useState(searchFromUrl);
  if (searchFromUrl !== prevSearchFromUrl) {
    setPrevSearchFromUrl(searchFromUrl);
    setSearchQuery(searchFromUrl);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // Fetch categories
        const categoriesQuery = `*[_type == "propertyType"] | order(order asc, name asc) { name }`;
        const categoriesData = await client.fetch(categoriesQuery);
        if (categoriesData && categoriesData.length > 0) {
          const uniqueCats = ['All', ...new Set(categoriesData.map((c) => c.name.trim()))];
          setCategories(uniqueCats);
        } else {
          setCategories([]);
        }

        // Fetch properties
        const propertiesQuery = `*[_type == "property"] | order(_createdAt desc) {
          "id": _id,
          title,
          propertyType,
          status,
          price,
          priceDisplayMode,
          isFeatured,
          isSold,
          location,
          specifications,
          features,
          "mainImage": mainImage {
            asset-> {
              _id,
              url,
              metadata { lqip }
            }
          },
          gallery[] {
            asset-> {
              _id,
              url,
              metadata { lqip }
            }
          },
          description
        }`;
        const propertiesData = await client.fetch(propertiesQuery);
        if (propertiesData && propertiesData.length > 0) {
          setAllProperties(propertiesData);
        } else {
          setAllProperties([]);
        }
      } catch (err) {
        console.error("Sanity fetch error:", err);
        setAllProperties([]);
        setCategories([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    const subscription = client.listen(`*[_type == "property" || _type == "propertyType"]`).subscribe(() => {
      fetchData();
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleCategoryChange = (category) => {
    if (category === 'All') {
      searchParams.delete('type');
      searchParams.delete('brand');
    } else {
      searchParams.set('type', category);
      searchParams.delete('brand');
    }
    setSearchParams(searchParams);
  };

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
    if (val.trim()) {
      searchParams.set('search', val.trim());
    } else {
      searchParams.delete('search');
    }
    setSearchParams(searchParams);
  };

  const filteredAndSortedProperties = useMemo(() => {
    const filtered = allProperties.filter((property) => {
      const isSoldFilter = selectedCategory.toLowerCase() === 'sold';

      if (isSoldFilter) {
        if (!property.isSold && property.status !== 'Sold / Leased') return false;
      } else {
        if (property.isSold || property.status === 'Sold / Leased') return false;
      }

      const matchesCategory = 
        selectedCategory === 'All' || 
        isSoldFilter || 
        (property.propertyType && property.propertyType.toLowerCase() === selectedCategory.toLowerCase()) ||
        (property.propertyType && selectedCategory.toLowerCase().includes(property.propertyType.toLowerCase()));

      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = !query || 
        (property.title && property.title.toLowerCase().includes(query)) ||
        (property.propertyType && property.propertyType.toLowerCase().includes(query)) ||
        (property.location?.city && property.location.city.toLowerCase().includes(query)) ||
        (property.location?.neighborhood && property.location.neighborhood.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });

    return filtered.sort((a, b) => {
      if (sortBy === 'price_desc') return (b.price || 0) - (a.price || 0);
      if (sortBy === 'price_asc') return (a.price || 0) - (b.price || 0);
      if (sortBy === 'sqft_desc') return (b.specifications?.sqft || 0) - (a.specifications?.sqft || 0);
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [allProperties, selectedCategory, searchQuery, sortBy]);

  if (isLoading && allProperties.length === 0) {
    return (
      <div className="pt-32 pb-32 min-h-screen bg-white flex flex-col items-center justify-center font-sans">
        <div className="w-10 h-10 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin mb-4"></div>
        <span className="text-xs uppercase tracking-[0.25em] text-neutral-400 font-medium">Curating Architectural Portfolio...</span>
      </div>
    );
  }

  return (
    <div className="pt-28 md:pt-36 pb-32 min-h-screen bg-neutral-50/40 font-sans text-neutral-900">
      <div className="luxury-container">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <div className="text-xs text-neutral-400 font-light mb-1.5">
              {filteredAndSortedProperties.length} {filteredAndSortedProperties.length === 1 ? 'Residence' : 'Residences'} Available
            </div>
            <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-neutral-900">
              Architectural Estates & Residences
            </h1>
          </div>

          {/* Search & Sort Row */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
            <div className="relative w-full sm:w-72">
              <input 
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search city, neighborhood, type..."
                className="w-full bg-white border border-neutral-200/90 rounded-full pl-10 pr-4 py-2.5 text-xs text-neutral-800 placeholder:text-neutral-400 outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/15 transition-all shadow-xs"
              />
              <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
              {searchQuery && (
                <button 
                  onClick={() => handleSearchChange({ target: { value: '' } })}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-neutral-700"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 bg-white border border-neutral-200/90 rounded-full px-4 py-2 shadow-xs">
              <ArrowUpDown size={13} className="text-neutral-400 shrink-0" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-xs font-medium text-neutral-700 outline-none cursor-pointer"
              >
                <option value="featured">Featured First</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="sqft_desc">Largest Living Area</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Categories Bar - Rendered strictly when categories exist in Sanity */}
        {categories.length > 1 && (
          <div className="mb-10 overflow-x-auto no-scrollbar pb-2">
            <div className="flex items-center gap-2 min-w-max p-1 bg-neutral-200/50 rounded-full w-fit">
              {categories.map((category) => {
                const isActive = selectedCategory.toLowerCase() === category.toLowerCase();
                return (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`px-5 py-2 rounded-full text-xs font-medium transition-all duration-200 relative ${
                      isActive
                        ? 'bg-neutral-900 text-white shadow-sm'
                        : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100/70'
                    }`}
                  >
                    {category}
                    {category === 'Sold' && !isActive && (
                      <span className="ml-1.5 w-1.5 h-1.5 rounded-full bg-amber-600 inline-block"></span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Responsive Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredAndSortedProperties.map((property) => (
              <motion.div
                key={property.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <PropertyCard property={property} onSelect={onInquire} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {!isLoading && filteredAndSortedProperties.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-24 text-center bg-white rounded-2xl border border-neutral-200/80 p-8 max-w-xl mx-auto my-12 shadow-sm"
          >
            <div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4 text-neutral-400">
              <SlidersHorizontal size={20} />
            </div>
            <h3 className="text-base font-semibold text-neutral-900 mb-1.5">
              {allProperties.length === 0 ? "Off-Market Residential Advisory" : "No Matching Residences"}
            </h3>
            <p className="text-xs text-neutral-500 font-light max-w-md mx-auto mb-6 leading-relaxed">
              {allProperties.length === 0
                ? "Our active portfolio is managed discreetly. Add properties via the Admin Studio (/studio) or contact our concierge desk for confidential representations."
                : `We couldn't find any properties matching your current criteria${searchQuery ? ` for "${searchQuery}"` : ''} under ${selectedCategory}.`}
            </p>
            {allProperties.length > 0 ? (
              <button 
                onClick={() => {
                  handleCategoryChange('All');
                  setSearchQuery('');
                  searchParams.delete('search');
                  setSearchParams(searchParams);
                }}
                className="px-6 py-2.5 bg-neutral-900 text-white rounded-full text-xs font-semibold hover:bg-[#D4AF37] transition-colors"
              >
                Reset All Filters
              </button>
            ) : (
              <a
                href="/contact"
                className="px-6 py-2.5 bg-neutral-900 text-white rounded-full text-xs font-semibold hover:bg-[#D4AF37] transition-colors inline-block"
              >
                Inquire With Concierge
              </a>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Properties;
