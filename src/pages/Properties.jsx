import React, { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';
import { client } from '../client';
import { Search, SlidersHorizontal, Sparkles } from 'lucide-react';

const DEFAULT_CATEGORIES = ['All', 'Villas', 'Penthouses', 'Estates', 'Waterfront', 'Sold'];

const Properties = ({ onInquire }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const typeFromUrl = searchParams.get('type') || searchParams.get('brand');
  const searchFromUrl = searchParams.get('search') || '';

  const [categories, setCategories] = useState(DEFAULT_CATEGORIES);
  const [allProperties, setAllProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(searchFromUrl);

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
        // Fetch property categories
        const categoriesQuery = `*[_type == "propertyType"] | order(order asc, name asc) { name }`;
        const categoriesData = await client.fetch(categoriesQuery);
        if (categoriesData && categoriesData.length > 0) {
          const uniqueCats = ['All', ...new Set(categoriesData.map(c => c.name.trim())), 'Sold'];
          setCategories(uniqueCats);
        } else {
          setCategories(DEFAULT_CATEGORIES);
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
        if (propertiesData) {
          setAllProperties(propertiesData);
        }
      } catch (err) {
        console.error("Sanity fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    // Real-time listener for portfolio updates
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

  const filteredProperties = allProperties.filter((property) => {
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

  if (isLoading) {
    return (
      <div className="pt-32 pb-32 min-h-screen bg-white flex flex-col items-center justify-center">
        <div className="w-10 h-10 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin mb-4"></div>
        <span className="text-xs uppercase tracking-[0.25em] text-neutral-400 font-medium">Curating Portfolio...</span>
      </div>
    );
  }

  return (
    <div className="pt-28 md:pt-36 pb-32 min-h-screen bg-neutral-50/40 font-sans">
      <div className="luxury-container">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-[11px] uppercase tracking-[0.3em] text-[#D4AF37] font-semibold flex items-center gap-1.5">
                <Sparkles size={13} /> Exclusive Portfolio
              </span>
              <span className="text-neutral-300">•</span>
              <span className="text-xs text-neutral-400 font-normal">
                {filteredProperties.length} {filteredProperties.length === 1 ? 'Residence' : 'Residences'} Available
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-semibold text-neutral-900 tracking-tight">
              Featured Properties
            </h1>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <input 
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search by city, type, estate..."
              className="w-full bg-white border border-neutral-200/80 rounded-full pl-11 pr-4 py-3 text-xs text-neutral-800 placeholder:text-neutral-400 outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/15 transition-all shadow-xs"
            />
            <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
            {searchQuery && (
              <button 
                onClick={() => handleSearchChange({ target: { value: '' } })}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-neutral-700"
              >
                ✕
              </button>
            )}
          </div>
        </motion.div>

        {/* Categories Bar with Soft Modern Pills */}
        <div className="mb-10 overflow-x-auto no-scrollbar pb-2">
          <div className="flex items-center gap-2.5 min-w-max p-1 bg-neutral-200/50 rounded-full w-fit">
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

        {/* Responsive Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProperties.map((property) => (
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
        {filteredProperties.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-24 text-center bg-white rounded-2xl border border-neutral-200/80 p-8 max-w-xl mx-auto my-12"
          >
            <div className="w-14 h-14 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4 text-neutral-400">
              <SlidersHorizontal size={22} />
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">No Properties Found</h3>
            <p className="text-xs text-neutral-500 font-light max-w-md mx-auto mb-6 leading-relaxed">
              We couldn't find any residences matching your current selection {searchQuery ? `for "${searchQuery}"` : ''} in the {selectedCategory} category.
            </p>
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
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Properties;
