import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, ArrowRight } from 'lucide-react';

const WEB3FORMS_ACCESS_KEY = "d7f8311f-fb43-4cdd-96ed-afcf8c00bba3";

const Footer = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target);
    formData.append("access_key", WEB3FORMS_ACCESS_KEY);
    formData.append("subject", "New Real Estate Newsletter Subscription");
    formData.append("from_name", "Laval Luxury Homes Website");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      if (response.ok) {
        setSubmitted(true);
        e.target.reset();
        setTimeout(() => setSubmitted(false), 5000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-neutral-950 text-white pt-24 pb-12 font-sans border-t border-neutral-900">
      <div className="luxury-container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          {/* Col 1: Brand & Office */}
          <div className="md:col-span-1 space-y-5">
            <Link to="/" className="inline-block group mb-1">
              <img 
                src="/logo-light.webp" 
                alt="Laval Luxury Homes" 
                className="h-11 w-auto object-contain transition-transform group-hover:scale-102"
              />
            </Link>
            <p className="text-neutral-400 text-xs leading-relaxed font-light">
              Bespoke representation for extraordinary architectural estates, modern villas, and premier penthouses.
            </p>
            <div className="space-y-2 pt-2 text-xs text-neutral-400 font-light">
              <a 
                href="https://www.google.com/maps/search/?api=1&query=110+Mansell+Cir+Suite+306,+Roswell,+GA+30075" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-start gap-2 hover:text-white transition-colors"
              >
                <MapPin size={14} className="text-[#D4AF37] mt-0.5 shrink-0" />
                <span>110 Mansell Cir Suite 306<br />Roswell GA 30075</span>
              </a>
              <div className="flex items-center gap-2 pt-1">
                <Phone size={14} className="text-[#D4AF37] shrink-0" />
                <a href="tel:+14047908336" className="hover:text-white transition-colors">+1 (404) 790-8336</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-[#D4AF37] shrink-0" />
                <a href="mailto:concierge@lavalluxuryhomes.com" className="hover:text-white transition-colors">concierge@lavalluxuryhomes.com</a>
              </div>
            </div>
          </div>
          
          {/* Col 2: Portfolio */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold mb-6 text-neutral-300">Portfolio</h4>
            <ul className="space-y-3 text-xs text-neutral-400 font-light">
              <li><Link to="/properties" className="hover:text-white transition-colors">All Residences</Link></li>
              <li><Link to="/properties" className="hover:text-white transition-colors">Active Portfolio</Link></li>
              <li><Link to="/properties?type=Sold" className="text-[#D4AF37] hover:text-[#C5A059] transition-colors">Sold & Closed Portfolio</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Private Client Concierge</Link></li>
            </ul>
          </div>

          {/* Col 3: Advisory & Firm */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold mb-6 text-neutral-300">Advisory</h4>
            <ul className="space-y-3 text-xs text-neutral-400 font-light">
              <li><Link to="/about" className="hover:text-white transition-colors">About Our Advisory</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Private Client Services</Link></li>
              <li><Link to="/financing" className="hover:text-white transition-colors">Mortgage & Financing</Link></li>
              <li><Link to="/apply-financing" className="hover:text-white transition-colors">Pre-Approval Desk</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Schedule Private Tour</Link></li>
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold mb-6 text-neutral-300">Private Dossier</h4>
            <p className="text-xs text-neutral-400 mb-4 font-light leading-relaxed">
              Receive confidential off-market real estate intelligence and bespoke architectural listings.
            </p>
            {submitted ? (
              <p className="text-xs text-[#D4AF37] font-semibold tracking-wider animate-pulse">
                ✓ THANK YOU FOR SUBSCRIBING
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="flex border-b border-neutral-800 pb-2 focus-within:border-[#D4AF37] transition-colors">
                  <input 
                    type="email" 
                    name="email"
                    required
                    placeholder="ENTER YOUR EMAIL" 
                    className="bg-transparent border-none text-xs w-full focus:outline-none uppercase tracking-wider text-white placeholder:text-neutral-600"
                  />
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="text-xs text-neutral-400 hover:text-[#D4AF37] transition-colors p-1"
                    aria-label="Subscribe"
                  >
                    {isSubmitting ? '...' : <ArrowRight size={14} />}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Row */}
        <div className="pt-8 border-t border-neutral-900 flex flex-col md:flex-row justify-between items-center text-xs text-neutral-500 font-light gap-6">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-center md:text-left">
            <span>© 2026 LAVAL LUXURY HOMES. All rights reserved.</span>
            <div className="flex gap-6 text-[11px]">
              <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#terms" className="hover:text-white transition-colors">Terms of Representation</a>
              <a href="#licensing" className="hover:text-white transition-colors">Brokerage Disclosures</a>
            </div>
          </div>
          <div className="flex space-x-6 text-[11px] uppercase tracking-wider">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
