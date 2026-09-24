import React, { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { client } from '../client';
import PropertyCard from '../components/PropertyCard';
import Reviews from '../components/Reviews';

import heroBright from '../assets/hero_bright.png';
import financingBg from '../assets/financing_bg.png';
import tradeinBg from '../assets/tradein_bg.png';
import aboutShort from '../assets/about_short.jpeg';
import { 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Banknote, 
  Sparkles,
  Compass
} from 'lucide-react';

const FALLBACK_PROPERTIES = [
  {
    id: 'demo-1',
    title: 'The Skyrise Penthouse',
    propertyType: 'Penthouse',
    status: 'For Sale',
    price: 4850000,
    priceDisplayMode: 'fixed',
    isFeatured: true,
    isSold: false,
    location: { neighborhood: 'Downtown Skyline', city: 'Atlanta', state: 'GA' },
    specifications: { bedrooms: 4, bathrooms: 5, sqft: 5400, lotSize: 'Balcony Terrace', yearBuilt: 2024, garageSpaces: 3 },
    features: ['Panoramic City Views', 'Private Elevator', 'Wine Room', 'Custom Italian Cabinetry'],
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80',
    description: 'An architectural triumph soaring above the city, offering floor-to-ceiling glass vistas, custom marble fireplaces, and a wraparound private sky deck.'
  },
  {
    id: 'demo-2',
    title: 'Roswell Modern Estate',
    propertyType: 'Modern Estate',
    status: 'For Sale',
    price: 3650000,
    priceDisplayMode: 'fixed',
    isFeatured: true,
    isSold: false,
    location: { neighborhood: 'Historic Roswell', city: 'Roswell', state: 'GA' },
    specifications: { bedrooms: 6, bathrooms: 7, sqft: 7200, lotSize: '1.4 Acres', yearBuilt: 2023, garageSpaces: 4 },
    features: ['Infinity-Edge Pool', 'Smart Automation', 'Chef Kitchen', 'Spa Suite'],
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80',
    description: 'Nestled among secluded mature hardwoods in Roswell, this newly completed estate merges organic modernist architecture with bespoke luxury.'
  },
  {
    id: 'demo-3',
    title: 'Lake Lanier Waterfront Villa',
    propertyType: 'Waterfront',
    status: 'For Sale',
    price: 5200000,
    priceDisplayMode: 'fixed',
    isFeatured: true,
    isSold: false,
    location: { neighborhood: 'North Peninsula', city: 'Gainesville', state: 'GA' },
    specifications: { bedrooms: 5, bathrooms: 6, sqft: 6800, lotSize: '2.1 Acres', yearBuilt: 2022, garageSpaces: 3 },
    features: ['Private Deep-Water Dock', 'Outdoor Kitchen', 'Guest House', 'Wine Cellar'],
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80',
    description: 'Direct deep-water frontage with a private two-slip dock, expansive limestone terraces, and panoramic sunset water views.'
  },
  {
    id: 'demo-4',
    title: 'Buckhead Contemporary Residence',
    propertyType: 'Villa',
    status: 'For Sale',
    price: 2980000,
    priceDisplayMode: 'fixed',
    isFeatured: true,
    isSold: false,
    location: { neighborhood: 'Tuxedo Park', city: 'Atlanta', state: 'GA' },
    specifications: { bedrooms: 4, bathrooms: 5, sqft: 4900, lotSize: '0.85 Acres', yearBuilt: 2023, garageSpaces: 3 },
    features: ['Courtyard Reflection Pool', 'Wellness Studio', 'Zero-Threshold Glass Walls'],
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=80',
    description: 'A serene urban sanctuary celebrating clean architectural geometry, private inner courtyards, and museum-grade finishes.'
  }
];

const Home = ({ onInquire }) => {
  const [featuredProperties, setFeaturedProperties] = useState(FALLBACK_PROPERTIES);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const query = `*[_type == "property" && isFeatured == true && isSold != true][0...4] {
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
        const data = await client.fetch(query);
        if (data && data.length > 0) {
          setFeaturedProperties(data);
        } else {
          // If no isFeatured properties, try fetching any active properties
          const fallbackQuery = `*[_type == "property" && isSold != true][0...4] {
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
          const fallbackData = await client.fetch(fallbackQuery);
          if (fallbackData && fallbackData.length > 0) {
            setFeaturedProperties(fallbackData);
          }
        }
      } catch (err) {
        console.error("Sanity fetch error:", err);
      }
    };

    fetchFeatured();

    const subscription = client.listen(`*[_type == "property"]`).subscribe(() => {
      fetchFeatured();
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="flex flex-col bg-white font-sans">
      {/* Hero Section */}
      <section className="relative h-[820px] md:h-[880px] flex items-end md:items-center bg-neutral-950 pb-20 md:pb-0 mt-[45px] md:mt-[70px]">
        {/* Background Image with Gentle Overlay */}
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src={heroBright} 
            alt="Laval Luxury Homes Architectural Portfolio" 
            className="w-full h-full object-cover opacity-90 scale-102"
            fetchpriority="high"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/40 to-transparent md:bg-gradient-to-r md:from-neutral-950/80 md:via-neutral-950/30 md:to-transparent"></div>
        </div>

        <div className="relative z-10 luxury-container w-full">
          <div className="max-w-2xl text-white text-left">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[#D4AF37] text-xs font-semibold uppercase tracking-[0.2em] mb-6"
            >
              <Sparkles size={13} /> Prime Real Estate Advisory
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="text-4xl sm:text-6xl md:text-7xl font-bold leading-[1.08] mb-6 tracking-tight"
            >
              Curated Luxury Estates & Residences
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="text-base sm:text-lg mb-10 text-neutral-300 max-w-xl leading-relaxed font-light"
            >
              Architectural masterworks, waterfront villas, and premier penthouses curated for discerning buyers seeking discreet representation and unrivaled living.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.7 }}
              className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-5"
            >
              <Link 
                to="/properties" 
                className="bg-[#D4AF37] hover:bg-[#C5A059] text-neutral-950 font-semibold py-4 px-9 rounded-full text-xs uppercase tracking-[0.15em] flex items-center justify-center transition-all shadow-lg hover:shadow-xl"
              >
                Browse Portfolio
                <ArrowRight size={15} className="ml-2.5" />
              </Link>
              <Link 
                to="/contact" 
                className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/25 text-white font-semibold py-4 px-9 rounded-full text-xs uppercase tracking-[0.15em] text-center transition-all"
              >
                Schedule Private Tour
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Us Preview */}
      <section className="py-28 md:py-36 bg-white overflow-hidden">
        <div className="luxury-container">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="lg:w-1/2 relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-neutral-100">
                <img 
                  src={aboutShort} 
                  alt="Laval Luxury Homes Advisory" 
                  className="w-full h-[460px] md:h-[540px] object-cover" 
                  loading="lazy" 
                  decoding="async" 
                />
              </div>
              <div className="absolute -bottom-6 -right-6 hidden sm:block p-6 rounded-2xl bg-white shadow-xl border border-neutral-100 max-w-xs">
                <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-semibold block mb-1">
                  Roswell Headquarters
                </span>
                <p className="text-xs text-neutral-600 font-light leading-snug">
                  110 Mansell Cir Suite 306, Roswell GA — Bespoke private real estate advisory.
                </p>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="lg:w-1/2 space-y-6 text-left"
            >
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
                <Compass size={14} /> The Firm
              </div>
              <h2 className="text-3xl md:text-5xl font-semibold text-neutral-900 tracking-tight leading-tight">
                Architectural Integrity. Confidential Advisory.
              </h2>
              <p className="text-base text-neutral-600 font-light leading-relaxed">
                Laval Luxury Homes was established to redefine luxury property representation. We represent distinguished estates, modern architectural triumphs, and high-net-worth acquisitions across Roswell, Greater Atlanta, and premier coastal retreats.
              </p>
              <p className="text-sm text-neutral-500 font-light leading-relaxed">
                Every residence in our portfolio undergoes thorough architectural and legal appraisal, ensuring our clients transact with complete discretion, institutional certainty, and enduring value.
              </p>
              <div className="pt-4">
                <Link 
                  to="/about" 
                  className="inline-flex items-center text-xs font-semibold uppercase tracking-[0.2em] text-neutral-900 hover:text-[#D4AF37] group transition-colors"
                >
                  <span className="border-b-2 border-neutral-900 pb-1 group-hover:border-[#D4AF37]">
                    Discover Our Advisory Story
                  </span>
                  <ArrowRight size={15} className="ml-3 transition-transform group-hover:translate-x-1.5" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Residences Portfolio */}
      <section className="py-24 bg-neutral-50/50 border-y border-neutral-100">
        <div className="luxury-container">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
            <div>
              <span className="text-[11px] uppercase tracking-[0.3em] text-[#D4AF37] font-semibold block mb-1">
                Curated Selection
              </span>
              <h2 className="text-3xl md:text-4xl font-semibold text-neutral-900 tracking-tight">
                Featured Residences
              </h2>
            </div>
            <Link 
              to="/properties" 
              className="text-xs font-semibold uppercase tracking-[0.15em] text-neutral-500 hover:text-neutral-950 transition-colors flex items-center gap-1.5 group"
            >
              <span>Explore All Residences</span>
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {featuredProperties.map((property, idx) => (
              <PropertyCard key={property.id || idx} property={property} onSelect={onInquire} />
            ))}
          </div>
        </div>
      </section>

      {/* Pillars of Excellence Section */}
      <section className="py-32 bg-white">
        <div className="luxury-container">
          <div className="text-center mb-20">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#D4AF37] block mb-3">
              The Laval Standard
            </span>
            <h2 className="text-3xl md:text-5xl font-semibold text-neutral-900 tracking-tight">
              A Bespoke Real Estate Experience
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { title: 'Architectural Verification', desc: 'Every estate undergoes thorough structural, spatial, and deed vetting for complete peace of mind.', Icon: ShieldCheck },
              { title: 'Bespoke Mortgage Solutions', desc: 'Tailored jumbo financing and private wealth liquidity options for seamless acquisition.', Icon: Banknote },
              { title: 'Discreet Off-Market Portfolio', desc: 'Private transactions conducted with utmost client confidentiality and global syndication.', Icon: Compass },
              { title: 'White-Glove Advisory', desc: 'Dedicated client partners guiding every aspect of closing, design customization, and transition.', Icon: Sparkles },
            ].map((pillar, i) => (
              <div 
                key={i} 
                className="flex flex-col items-center p-8 md:p-10 rounded-2xl border border-neutral-200/70 bg-neutral-50/50 hover:bg-neutral-950 hover:text-white transition-all duration-300 group text-center"
              >
                <div className="w-12 h-12 mb-6 rounded-full bg-white group-hover:bg-neutral-900 border border-neutral-200 group-hover:border-neutral-800 flex items-center justify-center text-[#D4AF37] group-hover:scale-110 transition-transform">
                  <pillar.Icon size={22} strokeWidth={1.5} />
                </div>
                <h4 className="font-semibold text-xs uppercase tracking-[0.15em] mb-3 text-neutral-900 group-hover:text-white">
                  {pillar.title}
                </h4>
                <p className="text-xs text-neutral-500 group-hover:text-neutral-400 leading-relaxed font-light">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advisory & Mortgage Banners */}
      <section className="py-20 bg-neutral-50/60 border-t border-neutral-100">
        <div className="luxury-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
            
            {/* Mortgage Pre-Approval Banner */}
            <motion.div 
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              className="group relative h-[460px] md:h-[520px] flex flex-col justify-end p-8 md:p-14 rounded-2xl overflow-hidden text-left shadow-xl"
            >
              <div className="absolute inset-0">
                <img 
                  src={financingBg} 
                  alt="Mortgage and Wealth Financing" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  loading="lazy" 
                  decoding="async" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/50 to-transparent"></div>
              </div>
              
              <div className="relative z-10">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] font-semibold block mb-2">
                  Acquisition Advisory
                </span>
                <h3 className="text-2xl md:text-4xl font-semibold text-white mb-3">
                  Luxury Mortgage Pre-Approval
                </h3>
                <p className="text-xs md:text-sm text-neutral-300 mb-8 font-light max-w-sm leading-relaxed">
                  Confidential jumbo mortgage structuring and private banking asset-backed liquidity for premier acquisitions.
                </p>
                
                <ul className="space-y-2.5 mb-8 hidden sm:block">
                  <li className="flex items-center text-xs font-normal text-white/90">
                    <CheckCircle2 size={14} className="mr-2.5 text-[#D4AF37]" /> Rapid 24-hour institutional assessment
                  </li>
                  <li className="flex items-center text-xs font-normal text-white/90">
                    <CheckCircle2 size={14} className="mr-2.5 text-[#D4AF37]" /> Bank-ready 1-page A4 application desk
                  </li>
                </ul>
                
                <Link 
                  to="/apply-financing" 
                  className="bg-[#D4AF37] text-neutral-950 font-semibold py-3.5 px-8 rounded-full text-xs uppercase tracking-[0.15em] inline-flex items-center hover:bg-[#C5A059] transition-all shadow-md"
                >
                  Start Pre-Approval
                  <ArrowRight size={14} className="ml-2.5" />
                </Link>
              </div>
            </motion.div>

            {/* Estate Valuation & Listing Consultation */}
            <motion.div 
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              className="group relative h-[460px] md:h-[520px] flex flex-col justify-end p-8 md:p-14 rounded-2xl overflow-hidden text-left shadow-xl"
            >
              <div className="absolute inset-0">
                <img 
                  src={tradeinBg} 
                  alt="Property Valuation & Advisory" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  loading="lazy" 
                  decoding="async" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/50 to-transparent"></div>
              </div>
              
              <div className="relative z-10">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] font-semibold block mb-2">
                  Seller Representation
                </span>
                <h3 className="text-2xl md:text-4xl font-semibold text-white mb-3">
                  Private Property Valuation
                </h3>
                <p className="text-xs md:text-sm text-neutral-300 mb-8 font-light max-w-sm leading-relaxed">
                  Discover the true market equity and global buyer appetite for your estate with our confidential advisory appraisal.
                </p>
                
                <ul className="space-y-2.5 mb-8 hidden sm:block">
                  <li className="flex items-center text-xs font-normal text-white/90">
                    <CheckCircle2 size={14} className="mr-2.5 text-[#D4AF37]" /> Discreet off-market syndication
                  </li>
                  <li className="flex items-center text-xs font-normal text-white/90">
                    <CheckCircle2 size={14} className="mr-2.5 text-[#D4AF37]" /> Bespoke architectural cinematography
                  </li>
                </ul>
                
                <Link 
                  to="/contact" 
                  className="bg-white text-neutral-950 font-semibold py-3.5 px-8 rounded-full text-xs uppercase tracking-[0.15em] inline-flex items-center hover:bg-[#D4AF37] transition-all shadow-md"
                >
                  Request Consultation
                  <ArrowRight size={14} className="ml-2.5" />
                </Link>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Client Reviews Section */}
      <Reviews />
    </div>
  );
};

export default Home;
