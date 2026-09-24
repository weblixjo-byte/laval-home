import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  ShieldCheck, 
  Gem, 
  Award, 
  Compass,
  ArrowRight
} from 'lucide-react';
import { REAL_ESTATE_IMAGES } from '../data/realEstateImages';

const About = () => {
  return (
    <div className="min-h-screen bg-white pt-28 md:pt-36 font-sans text-neutral-900 selection:bg-amber-100 selection:text-amber-900">
      {/* Hero Section */}
      <section className="luxury-container mb-24 md:mb-32">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:w-1/2 space-y-6 text-left"
          >
            <h1 className="text-4xl md:text-6xl font-semibold text-neutral-900 tracking-tight leading-tight">
              Curating Extraordinary Architectural Living
            </h1>
            
            <div className="w-16 h-0.5 bg-[#D4AF37] rounded-full"></div>
            
            <div className="space-y-4 text-neutral-600 font-light leading-relaxed text-base">
              <p>
                At Laval Luxury Homes, we believe a residence is not merely an asset—it is the ultimate expression of architecture, art, and personal sanctuary. Our boutique real estate advisory was established to serve discerning individuals who value design provenance, absolute privacy, and meticulous attention to detail.
              </p>
              <p>
                Headquartered in Roswell, Georgia, we represent premier architectural estates, bespoke waterfront villas, and modern masterworks across the Southeast and exclusive global destinations. From private acquisition negotiations to off-market listing placement, our clients receive institutional-grade representation with a bespoke personal touch.
              </p>
            </div>
            
            <div className="pt-4 flex items-center gap-4">
              <Link 
                to="/properties" 
                className="bg-neutral-900 text-white px-7 py-3.5 rounded-full text-xs uppercase tracking-[0.15em] font-semibold hover:bg-[#D4AF37] transition-all duration-300 shadow-sm"
              >
                View Portfolio
              </Link>
              <Link 
                to="/contact" 
                className="border border-neutral-300 text-neutral-900 px-7 py-3.5 rounded-full text-xs uppercase tracking-[0.15em] font-semibold hover:border-neutral-900 transition-colors"
              >
                Consult Advisory
              </Link>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:w-1/2"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-neutral-100">
              <img 
                src={REAL_ESTATE_IMAGES.advisoryExterior} 
                alt="Laval Luxury Homes Headquarters" 
                className="w-full h-[420px] md:h-[560px] object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 md:py-32 bg-neutral-50/60 border-t border-neutral-100">
        <div className="luxury-container">
          <div className="text-center mb-16 space-y-3">
            <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold block">
              Founding Principles
            </span>
            <h2 className="text-3xl md:text-5xl font-semibold text-neutral-900 tracking-tight">
              The Standards We Live By
            </h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              { 
                title: 'Architectural Provenance', 
                desc: 'We curate properties celebrated for structural innovation, harmonious materials, and visionary craftsmanship.', 
                Icon: Building2 
              },
              { 
                title: 'Discreet Representation', 
                desc: 'Client confidentiality is sacred. Every inquiry and private off-market negotiation is protected with ironclad discretion.', 
                Icon: ShieldCheck 
              },
              { 
                title: 'Institutional Certainty', 
                desc: 'From title vetting and zoning analysis to bespoke mortgage underwriting, we deliver seamless transactions.', 
                Icon: Award 
              },
              { 
                title: 'White-Glove Advisory', 
                desc: 'Dedicated private client directors guiding every phase of property acquisition, staging, and transition.', 
                Icon: Gem 
              }
            ].map((value, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.4 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-2xl border border-neutral-200/70 shadow-xs hover:shadow-lg transition-all text-left"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-50/70 text-[#D4AF37] flex items-center justify-center mb-6 border border-amber-200/50">
                  <value.Icon size={22} />
                </div>
                <h4 className="text-sm uppercase tracking-wider font-semibold text-neutral-900 mb-2">
                  {value.title}
                </h4>
                <p className="text-xs text-neutral-500 font-light leading-relaxed">
                  {value.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Narrative Section with Interior Image */}
      <section className="py-24 luxury-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="rounded-2xl overflow-hidden shadow-2xl border border-neutral-100 h-[450px]">
            <img 
              src={REAL_ESTATE_IMAGES.advisoryInterior} 
              alt="Laval Luxury Homes Advisory Interior" 
              className="w-full h-full object-cover" 
              loading="lazy" 
            />
          </div>
          <div className="space-y-6 text-left">
            <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold block">
              Private Client Experience
            </span>
            <h3 className="text-3xl md:text-4xl font-semibold text-neutral-900 tracking-tight leading-tight">
              Beyond Traditional Brokerage
            </h3>
            <p className="text-sm text-neutral-600 font-light leading-relaxed">
              Standard real estate firms focus on volume; Laval Luxury Homes focuses on perfection. We intentionally maintain a strictly curated inventory so our advisors can devote undivided strategic focus to every estate and client relationship.
            </p>
            <p className="text-sm text-neutral-600 font-light leading-relaxed">
              Whether you are acquiring a waterfront estate on Lake Lanier, a skyline penthouse in Atlanta, or a serene sanctuary in Roswell, we provide complete market transparency, architectural expertise, and tailored financial structuring.
            </p>
            <div className="pt-2">
              <Link 
                to="/services" 
                className="inline-flex items-center text-xs uppercase tracking-wider font-semibold text-neutral-900 hover:text-[#D4AF37] transition-colors"
              >
                <span>Explore Client Advisory Services</span>
                <ArrowRight size={14} className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Advisory Office Callout */}
      <section className="py-16 bg-neutral-950 text-white">
        <div className="luxury-container text-center max-w-2xl mx-auto space-y-4">
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">
            Private Consultation By Appointment
          </span>
          <h3 className="text-2xl md:text-3xl font-semibold tracking-tight">
            Schedule a Private Portfolio Review
          </h3>
          <p className="text-xs text-neutral-400 font-light leading-relaxed">
            Our Private Client Directors are available for in-person consultations at our Roswell advisory office or via encrypted digital briefing.
          </p>
          <div className="pt-4">
            <Link 
              to="/contact" 
              className="bg-[#D4AF37] text-neutral-950 px-8 py-3.5 rounded-full text-xs uppercase tracking-[0.15em] font-semibold hover:bg-[#C5A059] transition-all inline-block shadow-md"
            >
              Contact Concierge
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
