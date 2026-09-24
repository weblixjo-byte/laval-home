import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import {
  Compass,
  Sparkles,
  ShieldCheck,
  Building,
  Key,
  CheckCircle2,
  PhoneCall,
  Landmark
} from 'lucide-react';
import { Link } from 'react-router-dom';

import interiorImg from '../assets/about_interior.jpg';
import exteriorImg from '../assets/about_exterior.jpeg';

const Services = () => {
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Hero Section */}
      <section className="pt-28 md:pt-36 pb-20 bg-neutral-50/50 border-b border-neutral-100">
        <div className="luxury-container text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl mx-auto space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-neutral-200 text-[#D4AF37] text-xs font-semibold uppercase tracking-[0.2em] shadow-xs">
              <Compass size={13} /> Private Client Advisory
            </div>

            <h1 className="text-4xl md:text-6xl font-semibold text-neutral-900 tracking-tight">
              Bespoke Real Estate Services
            </h1>

            <p className="text-base text-neutral-600 font-light leading-relaxed max-w-2xl mx-auto">
              Comprehensive real estate advisory engineered for high-net-worth acquisitions, architectural preservation, and discreet private transactions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Services Grid */}
      <section className="py-24 luxury-container">
        {/* Service 1: Buyer Representation & Acquisition */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center mb-28">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6 text-left"
          >
            <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-[#D4AF37] border border-amber-200/60 shadow-xs">
              <Key size={22} />
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold text-neutral-900 leading-tight">
              Private Buyer Representation & Acquisitions
            </h2>
            <p className="text-sm text-neutral-600 font-light leading-relaxed">
              We guide discerning purchasers through the complex landscape of luxury real estate acquisitions. From identifying off-market pocket listings to conducting rigorous deed analysis and structural due diligence, your acquisition is safeguarded with supreme fidelity.
            </p>
            <ul className="space-y-3 pt-2">
              {[
                "Targeted Off-Market Property Sourcing",
                "Architectural & Structural Due Diligence",
                "Discreet Contract Negotiations & Price Protection",
                "Escrow, Title & Institutional Closing Oversight"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-xs font-medium text-neutral-700">
                  <CheckCircle2 size={16} className="text-[#D4AF37] shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="rounded-2xl overflow-hidden shadow-2xl h-[440px] border border-neutral-100"
          >
            <img src={interiorImg} alt="Private Real Estate Consultation" className="w-full h-full object-cover" loading="lazy" />
          </motion.div>
        </div>

        {/* Service 2: Exclusive Seller Representation & Global Syndication */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="rounded-2xl overflow-hidden shadow-2xl h-[440px] md:order-1 order-2 border border-neutral-100"
          >
            <img src={exteriorImg} alt="Luxury Real Estate Marketing" className="w-full h-full object-cover" loading="lazy" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6 md:order-2 order-1 text-left"
          >
            <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-[#D4AF37] border border-amber-200/60 shadow-xs">
              <Sparkles size={22} />
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold text-neutral-900 leading-tight">
              Bespoke Seller Marketing & Global Placement
            </h2>
            <p className="text-sm text-neutral-600 font-light leading-relaxed">
              Presenting a modern masterpiece demands extraordinary visual storytelling. We produce cinematic 4K film tours, architectural photography, and private dossier books distributed directly to qualified international wealth networks and private family offices.
            </p>
            <ul className="space-y-3 pt-2">
              {[
                "Architectural Cinematography & Editorial Staging",
                "Direct Syndication to Ultra-High-Net-Worth Buyers",
                "Private Invitation-Only Open Viewings",
                "Confidential Off-Market Listing Placement"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-xs font-medium text-neutral-700">
                  <CheckCircle2 size={16} className="text-[#D4AF37] shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Advisory Standard - Dark Contrast Section */}
      <section className="py-28 bg-neutral-950 text-white">
        <div className="luxury-container">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold block">
              The Advisory Standard
            </span>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">
              Unrivaled Competence & Discretion
            </h2>
            <p className="text-xs text-neutral-400 font-light leading-relaxed">
              Every property transaction is guided by institutional rigor, architectural passion, and absolute confidentiality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: ShieldCheck, title: "Title & Zoning Verification", desc: "Thorough legal and municipal analysis ensuring clear title, boundary verification, and unrestricted property rights." },
              { icon: Landmark, title: "Jumbo Mortgage Underwriting", desc: "Private wealth mortgage and liquidity structuring tailored to preserve client capital and tax optimization." },
              { icon: Building, title: "Architectural Preservation", desc: "Expert assessment of building materials, environmental integration, and structural longevity." }
            ].map((item, i) => (
              <div key={i} className="text-center p-8 rounded-2xl border border-neutral-800 bg-neutral-900/60 hover:border-[#D4AF37]/50 transition-all group">
                <div className="w-14 h-14 mx-auto mb-6 flex items-center justify-center rounded-2xl bg-neutral-800 text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-neutral-950 transition-all">
                  <item.icon size={24} />
                </div>
                <h3 className="text-base font-semibold mb-2 text-white">{item.title}</h3>
                <p className="text-xs text-neutral-400 leading-relaxed font-light">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 text-center bg-white">
        <div className="luxury-container max-w-2xl mx-auto space-y-8">
          <h2 className="text-3xl md:text-4xl font-semibold text-neutral-900 tracking-tight">
            Ready to Discuss Your Property Acquisition or Sale?
          </h2>
          <p className="text-sm text-neutral-500 font-light leading-relaxed">
            Schedule a confidential consultation with a Private Client Director at our Roswell office.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <Link
              to="/contact"
              className="bg-neutral-950 text-white px-8 py-3.5 rounded-full text-xs uppercase tracking-[0.15em] font-semibold hover:bg-[#D4AF37] transition-all shadow-sm"
            >
              Request Consultation
            </Link>
            <a
              href="tel:+14047908336"
              className="border border-neutral-300 text-neutral-900 px-8 py-3.5 rounded-full text-xs uppercase tracking-[0.15em] font-semibold hover:border-neutral-950 transition-all flex items-center justify-center gap-2"
            >
              <PhoneCall size={14} className="text-[#D4AF37]" />
              <span>Call Advisory Desk</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
