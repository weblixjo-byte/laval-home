import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { client } from '../client';
import { Search, MapPin, X, ArrowUpRight } from 'lucide-react';

const DEFAULT_TYPES = ['Villas', 'Penthouses', 'Estates', 'Waterfront', 'Mansions'];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [propertyTypes, setPropertyTypes] = useState(DEFAULT_TYPES);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const query = `*[_type == "propertyType"] | order(order asc, name asc) { name }`;
        const data = await client.fetch(query);
        if (data && data.length > 0) {
          const uniqueTypes = [...new Set(data.map((t) => t.name.trim()))];
          setPropertyTypes(uniqueTypes);
        }
      } catch (err) {
        console.error("Fetch property types error:", err);
      }
    };

    fetchTypes();

    const subscription = client.listen(`*[_type == "propertyType"]`).subscribe(() => {
      fetchTypes();
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSearch = (e) => {
    if (e.key === 'Enter' || e.type === 'submit') {
      e.preventDefault();
      if (searchQuery.trim()) {
        navigate(`/properties?search=${encodeURIComponent(searchQuery.trim())}`);
      }
    }
  };

  const navLinks = [
    { name: 'Properties', path: '/properties' },
    { name: 'Services', path: '/services' },
    { name: 'Mortgage & Financing', path: '/financing' },
    { name: 'About', path: '/about' },
  ];

  return (
    <nav className="fixed w-full z-50 transition-all duration-300 bg-white/95 backdrop-blur-md border-b border-neutral-100 shadow-xs">
      {/* Main Header Row */}
      <div className="luxury-container flex justify-between items-center h-18 py-3">
        {/* Left: Mobile hamburger & Brand */}
        <div className="flex items-center space-x-6 md:space-x-8">
          <button
            className="flex flex-col space-y-1.5 focus:outline-none text-neutral-900 md:hidden p-1.5"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className="block w-6 h-0.5 bg-neutral-900 rounded-full"></span>
            <span className="block w-6 h-0.5 bg-neutral-900 rounded-full"></span>
            <span className="block w-4 h-0.5 bg-neutral-900 rounded-full"></span>
          </button>

          <Link
            to="/"
            className="flex flex-col text-left group"
          >
            <span className="text-xl md:text-2xl font-semibold tracking-[-0.03em] text-neutral-950 leading-none group-hover:text-[#D4AF37] transition-colors">
              LAVAL LUXURY HOMES
            </span>
            <span className="text-[9px] uppercase tracking-[0.3em] text-neutral-400 font-medium mt-1">
              Architectural Estates & Advisory
            </span>
          </Link>
        </div>

        {/* Center Search Bar */}
        <div className="hidden lg:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <form onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Search Estates, Penthouses, Villas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-11 py-2.5 rounded-full text-xs transition-all border bg-neutral-100/80 border-neutral-200/80 focus:bg-white text-neutral-900 placeholder:text-neutral-400 outline-none focus:ring-2 focus:ring-[#D4AF37]/20 focus:border-[#D4AF37]"
              />
            </form>
            <Search
              size={14}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
            />
          </div>
        </div>

        {/* Right Navigation Actions */}
        <div className="hidden md:flex items-center space-x-7 text-xs uppercase tracking-[0.15em] font-medium text-neutral-700">
          {navLinks.map((item) => {
            const isActive = location.pathname === item.path || (item.path === '/properties' && location.pathname === '/inventory');
            return (
              <Link 
                key={item.name}
                to={item.path} 
                className={`transition-colors relative py-1 hover:text-neutral-950 ${
                  isActive ? 'text-neutral-950 font-semibold' : 'text-neutral-500'
                }`}
              >
                {item.name}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#D4AF37] rounded-full"></span>
                )}
              </Link>
            );
          })}
          
          <Link
            to="/contact"
            className="px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider transition-all bg-neutral-950 text-white hover:bg-[#D4AF37] hover:shadow-md flex items-center gap-1.5"
          >
            <span>Inquire</span>
            <ArrowUpRight size={13} />
          </Link>
        </div>
      </div>

      {/* Property Categories Row */}
      <div className="border-t border-neutral-100 bg-white/70 backdrop-blur-xs py-2.5">
        <div className="luxury-container flex justify-between md:justify-start items-center overflow-x-auto no-scrollbar gap-6 md:gap-8">
          <Link
            to="/properties"
            className="text-[10px] uppercase tracking-[0.2em] font-medium transition-colors whitespace-nowrap text-neutral-500 hover:text-neutral-950"
          >
            All Residences
          </Link>
          {propertyTypes.map((type) => (
            <Link
              key={type}
              to={`/properties?type=${encodeURIComponent(type)}`}
              className="text-[10px] uppercase tracking-[0.2em] font-medium transition-colors whitespace-nowrap text-neutral-500 hover:text-neutral-950"
            >
              {type}
            </Link>
          ))}
          <Link
            to="/properties?type=Sold"
            className="text-[10px] uppercase tracking-[0.2em] transition-colors whitespace-nowrap text-[#D4AF37] hover:text-[#C5A059] font-semibold"
          >
            Sold Portfolio
          </Link>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-neutral-950/70 backdrop-blur-md z-[60]"
            onClick={() => setIsMenuOpen(false)}
          >
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 240 }}
              className="absolute inset-y-0 left-0 w-[85%] max-w-sm bg-neutral-950 flex flex-col p-8 shadow-2xl text-white"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Drawer Header */}
              <div className="flex justify-between items-center mb-8 pb-4 border-b border-neutral-800">
                <div>
                  <span className="text-lg font-semibold tracking-tight text-white block">
                    LAVAL LUXURY HOMES
                  </span>
                  <span className="text-[9px] uppercase tracking-widest text-[#D4AF37]">
                    Prime Real Estate Advisory
                  </span>
                </div>
                <button
                  className="text-neutral-400 p-2 hover:text-white rounded-full transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Mobile Search */}
              <div className="mb-8">
                <form onSubmit={(e) => { handleSearch(e); setIsMenuOpen(false); }}>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search Estates, Penthouses..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white placeholder:text-neutral-500 text-xs outline-none focus:border-[#D4AF37]"
                    />
                    <button type="submit" className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-[#D4AF37]">
                      <Search size={15} />
                    </button>
                  </div>
                </form>
              </div>

              {/* Navigation Links */}
              <div className="flex flex-col space-y-6">
                {[
                  { name: 'Properties', path: '/properties' },
                  { name: 'Services', path: '/services' },
                  { name: 'Mortgage & Financing', path: '/financing' },
                  { name: 'About Advisory', path: '/about' },
                  { name: 'Contact Concierge', path: '/contact' },
                ].map((item, idx) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.08 * idx }}
                    >
                      <Link
                        to={item.path}
                        className={`text-xl font-medium tracking-tight transition-colors flex items-center justify-between group ${
                          isActive ? 'text-[#D4AF37]' : 'text-neutral-300 hover:text-white'
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <div className="flex items-center gap-3">
                          {item.name}
                          {isActive && <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></div>}
                        </div>
                        <span className="text-xs opacity-40 group-hover:opacity-100 transition-opacity">→</span>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Office & Footer Info */}
              <div className="mt-auto pt-8 border-t border-neutral-800/80 space-y-4">
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=110+Mansell+Cir+Suite+306,+Roswell,+GA+30075" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="space-y-1 block group"
                >
                  <p className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-semibold flex items-center gap-1.5">
                    <MapPin size={11} /> Advisory Office
                  </p>
                  <p className="text-xs text-neutral-400 font-light group-hover:text-white transition-colors">
                    110 Mansell Cir Suite 306, Roswell GA 30075
                  </p>
                </a>
                <div className="flex space-x-6 text-[10px] uppercase tracking-wider text-neutral-400 font-medium">
                  <a href="tel:+14047908336" className="hover:text-white transition-colors">+1 (404) 790-8336</a>
                  <a href="mailto:concierge@lavalluxuryhomes.com" className="hover:text-white transition-colors">Email Office</a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
