import React, { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { client } from '../client';
import PropertyCard from '../components/PropertyCard';
import Reviews from '../components/Reviews';
import { REAL_ESTATE_IMAGES } from '../data/realEstateImages';
import { FALLBACK_PROPERTIES } from '../data/fallbackProperties';
import { 
  ArrowRight, 
  ShieldCheck, 
  Banknote, 
  Compass,
  MapPin,
  Search,
  ArrowUpRight
} from 'lucide-react';

const NEIGHBORHOODS = [
  {
    name: 'Historic Roswell',
    desc: 'Secluded wooded estates, private woodland sanctuaries, and vibrant historic dining.',
    image: REAL_ESTATE_IMAGES.modernEstateRoswell,
    estates: '14 Active Listings'
  },
  {
    name: 'Buckhead & Tuxedo Park',
    desc: 'Metropolitan prestige, private gated compounds, and world-class cultural access.',
    image: REAL_ESTATE_IMAGES.buckheadContemporary,
    estates: '9 Active Listings'
  },
  {
    name: 'Lake Lanier Peninsula',
    desc: 'Deep-water lakefront villas, private two-slip docks, and resort waterfront living.',
    image: REAL_ESTATE_IMAGES.lakeLanierWaterfront,
    estates: '6 Active Listings'
  },
  {
    name: 'Milton Equestrian Estates',
    desc: 'Sprawling multi-acre pastures, bespoke barns, and timeless agrarian modern manors.',
    image: REAL_ESTATE_IMAGES.miltonEquestrianVilla,
    estates: '8 Active Listings'
  }
];

const Home = ({ onInquire }) => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState(FALLBACK_PROPERTIES);
  const [searchCity, setSearchCity] = useState('');

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const query = `*[_type == "property" && isSold != true] | order(isFeatured desc, _createdAt desc)[0...6] {
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
          setProperties(data);
        } else {
          setProperties(FALLBACK_PROPERTIES);
        }
      } catch (err) {
        console.error("Sanity fetch error:", err);
        setProperties(FALLBACK_PROPERTIES);
      }
    };

    fetchFeatured();

    const subscription = client.listen(`*[_type == "property"]`).subscribe(() => {
      fetchFeatured();
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleHeroSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchCity.trim()) params.set('search', searchCity.trim());
    navigate(`/properties?${params.toString()}`);
  };

  return (
    <div className="flex flex-col bg-white font-sans text-neutral-900 selection:bg-amber-100 selection:text-amber-900">
      
      {/* 1. HERO SECTION: Cinematic Architectural Splendor */}
      <section className="relative min-h-[92vh] flex items-center justify-center bg-neutral-950 overflow-hidden pt-28 pb-20">
        {/* Architectural Background */}
        <div className="absolute inset-0">
          <img 
            src={REAL_ESTATE_IMAGES.heroMasterpiece} 
            alt="Laval Luxury Homes Architectural Estate" 
            className="w-full h-full object-cover scale-105 opacity-90 transition-transform duration-1000"
            fetchpriority="high"
          />
          {/* Refined gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-neutral-950/20"></div>
          <div className="absolute inset-0 bg-radial from-transparent via-neutral-950/30 to-neutral-950/80"></div>
        </div>

        <div className="relative z-10 luxury-container w-full flex flex-col items-center text-center text-white my-auto">
          {/* Main Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight max-w-5xl mb-6 text-white"
          >
            Exceptional Living. <br className="hidden sm:block" />
            <span className="font-light text-neutral-200">Curated Architectural Estates.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-base sm:text-lg text-neutral-300 max-w-2xl mx-auto font-light leading-relaxed mb-12"
          >
            Representing premier modern villas, waterfront retreats, and skyrise penthouses with institutional rigor and complete discretion.
          </motion.p>
          
          {/* Streamlined Luxury Search Box */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="w-full max-w-2xl bg-white/95 backdrop-blur-md p-2.5 sm:p-3 rounded-2xl md:rounded-full shadow-2xl border border-white/40 text-neutral-900"
          >
            <form onSubmit={handleHeroSearch} className="flex flex-col sm:flex-row items-center gap-2">
              <div className="flex-1 flex items-center gap-3 px-4 py-2 w-full">
                <Search size={16} className="text-[#D4AF37] shrink-0" />
                <input 
                  type="text"
                  placeholder="Search by neighborhood, city, or residence (e.g. Roswell, Buckhead)..."
                  value={searchCity}
                  onChange={(e) => setSearchCity(e.target.value)}
                  className="w-full bg-transparent text-xs sm:text-sm font-medium outline-none placeholder:text-neutral-400 placeholder:font-normal"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-neutral-950 text-white font-semibold text-xs uppercase tracking-wider hover:bg-[#D4AF37] transition-all flex items-center justify-center gap-2 shadow-md shrink-0"
              >
                <span>Search Portfolio</span>
                <ArrowRight size={14} />
              </button>
            </form>
          </motion.div>

          {/* Quick Statistics Banner */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 mt-16 pt-8 border-t border-white/10 w-full max-w-4xl text-neutral-300"
          >
            <div>
              <div className="text-2xl md:text-3xl font-bold text-white">$1.2B+</div>
              <div className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-semibold mt-0.5">Volume Advised</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-white">100%</div>
              <div className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-semibold mt-0.5">Discretion Rate</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-white">98.4%</div>
              <div className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-semibold mt-0.5">List-to-Sale Ratio</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-white">Roswell, GA</div>
              <div className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-semibold mt-0.5">Headquarters</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. FEATURED RESIDENCES SECTION */}
      <section className="py-24 md:py-32 bg-white">
        <div className="luxury-container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14 gap-6">
            <div>
              <h2 className="text-3xl md:text-5xl font-semibold text-neutral-900 tracking-tight">
                Featured Exclusive Residences
              </h2>
            </div>
            <Link 
              to="/properties" 
              className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-neutral-900 hover:text-[#D4AF37] transition-colors group"
            >
              <span>Explore All Residences ({properties.length})</span>
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.slice(0, 6).map((property, idx) => (
              <PropertyCard key={property.id || idx} property={property} onSelect={onInquire} />
            ))}
          </div>
        </div>
      </section>

      {/* 3. EDITORIAL PHILOSOPHY & ADVISORY SPOTLIGHT */}
      <section className="py-24 md:py-32 bg-neutral-50/70 border-y border-neutral-100">
        <div className="luxury-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Image Clean without any overlay */}
            <div className="lg:col-span-6">
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-neutral-200/80">
                <img 
                  src={REAL_ESTATE_IMAGES.heroVillaTwilight} 
                  alt="Modern Luxury Living" 
                  className="w-full h-[520px] object-cover" 
                  loading="lazy" 
                />
              </div>
            </div>

            {/* Right Narrative */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <h2 className="text-3xl md:text-5xl font-semibold text-neutral-900 tracking-tight leading-tight">
                Architectural Precision. <br />Discreet Representation.
              </h2>
              <p className="text-base text-neutral-600 font-light leading-relaxed">
                Laval Luxury Homes was established to serve buyers and sellers who view luxury residential real estate through the lens of architectural curation and enduring equity.
              </p>
              <p className="text-sm text-neutral-500 font-light leading-relaxed">
                From historic estates in Roswell to modern glass pavilions in Buckhead and lakefront retreats on Lake Lanier, our advisors combine deep municipal zoning expertise, private banking mortgage structuring, and confidential off-market syndication.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-white border border-neutral-200/80">
                  <div className="text-[#D4AF37] font-semibold text-lg mb-1">01</div>
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-neutral-900 mb-1">Title & Deed Rigor</h4>
                  <p className="text-[11px] text-neutral-500 font-light">Comprehensive environmental, title, and appraisal review.</p>
                </div>
                <div className="p-4 rounded-xl bg-white border border-neutral-200/80">
                  <div className="text-[#D4AF37] font-semibold text-lg mb-1">02</div>
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-neutral-900 mb-1">Private Wealth Lending</h4>
                  <p className="text-[11px] text-neutral-500 font-light">Direct underwriting liaison for jumbo mortgages.</p>
                </div>
                <div className="p-4 rounded-xl bg-white border border-neutral-200/80">
                  <div className="text-[#D4AF37] font-semibold text-lg mb-1">03</div>
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-neutral-900 mb-1">Off-Market Advisory</h4>
                  <p className="text-[11px] text-neutral-500 font-light">Over 40% transacted off-market with absolute privacy.</p>
                </div>
              </div>

              <div className="pt-4">
                <Link 
                  to="/about" 
                  className="bg-neutral-950 text-white px-8 py-3.5 rounded-full text-xs uppercase tracking-[0.15em] font-semibold hover:bg-[#D4AF37] transition-all inline-flex items-center gap-2 shadow-sm"
                >
                  <span>Our Heritage & Advisory</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. PREMIER NEIGHBORHOODS SHOWCASE */}
      <section className="py-24 md:py-32 bg-white">
        <div className="luxury-container">
          <div className="text-center mb-16 space-y-3">
            <h2 className="text-3xl md:text-5xl font-semibold text-neutral-900 tracking-tight">
              Premier Georgia Neighborhoods
            </h2>
            <p className="text-xs md:text-sm text-neutral-500 font-light max-w-xl mx-auto leading-relaxed">
              Explore the architectural character and private enclaves where we actively represent exclusive luxury estates.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {NEIGHBORHOODS.map((hood, idx) => (
              <div 
                key={idx}
                className="group relative rounded-2xl overflow-hidden aspect-[4/5] bg-neutral-900 shadow-md cursor-pointer text-left"
                onClick={() => navigate(`/properties?search=${encodeURIComponent(hood.name)}`)}
              >
                <img 
                  src={hood.image} 
                  alt={hood.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent"></div>
                
                <div className="absolute bottom-0 inset-x-0 p-6 flex flex-col justify-end text-white">
                  <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-semibold mb-1">
                    {hood.estates}
                  </span>
                  <h3 className="text-lg md:text-xl font-semibold mb-2 group-hover:text-[#D4AF37] transition-colors">
                    {hood.name}
                  </h3>
                  <p className="text-xs text-neutral-300 font-light line-clamp-2 leading-relaxed">
                    {hood.desc}
                  </p>
                  <div className="pt-3 flex items-center text-[10px] uppercase tracking-wider font-semibold text-white/80 group-hover:text-white">
                    <span>View Residences</span>
                    <ArrowUpRight size={13} className="ml-1" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FINANCING & VALUATION BANNERS */}
      <section className="py-20 bg-neutral-50/60 border-t border-neutral-100">
        <div className="luxury-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
            
            {/* Mortgage Banner */}
            <div className="group relative h-[460px] md:h-[520px] flex flex-col justify-end p-8 md:p-14 rounded-2xl overflow-hidden text-left shadow-xl">
              <div className="absolute inset-0">
                <img 
                  src={REAL_ESTATE_IMAGES.financingMortgageBanner} 
                  alt="Mortgage and Wealth Financing" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  loading="lazy" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/55 to-transparent"></div>
              </div>
              
              <div className="relative z-10">
                <h3 className="text-2xl md:text-4xl font-semibold text-white mb-3">
                  Luxury Mortgage Pre-Approval
                </h3>
                <p className="text-xs md:text-sm text-neutral-300 mb-8 font-light max-w-sm leading-relaxed">
                  Confidential jumbo mortgage structuring and private banking asset-backed liquidity for premier acquisitions.
                </p>
                
                <Link 
                  to="/apply-financing" 
                  className="bg-[#D4AF37] text-neutral-950 font-semibold py-3.5 px-8 rounded-full text-xs uppercase tracking-[0.15em] inline-flex items-center hover:bg-[#C5A059] transition-all shadow-md"
                >
                  Start 5-Step Pre-Approval
                  <ArrowRight size={14} className="ml-2.5" />
                </Link>
              </div>
            </div>

            {/* Valuation Banner */}
            <div className="group relative h-[460px] md:h-[520px] flex flex-col justify-end p-8 md:p-14 rounded-2xl overflow-hidden text-left shadow-xl">
              <div className="absolute inset-0">
                <img 
                  src={REAL_ESTATE_IMAGES.valuationBanner} 
                  alt="Estate Valuation & Advisory" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  loading="lazy" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/55 to-transparent"></div>
              </div>
              
              <div className="relative z-10">
                <h3 className="text-2xl md:text-4xl font-semibold text-white mb-3">
                  Confidential Estate Valuation
                </h3>
                <p className="text-xs md:text-sm text-neutral-300 mb-8 font-light max-w-sm leading-relaxed">
                  Unlock the true market equity and private buyer appetite for your residence with our confidential advisory appraisal.
                </p>
                
                <Link 
                  to="/contact" 
                  className="bg-white text-neutral-950 font-semibold py-3.5 px-8 rounded-full text-xs uppercase tracking-[0.15em] inline-flex items-center hover:bg-[#D4AF37] transition-all shadow-md"
                >
                  Request Consultation
                  <ArrowRight size={14} className="ml-2.5" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. VERIFIED CLIENT TESTIMONIALS */}
      <Reviews />
    </div>
  );
};

export default Home;
