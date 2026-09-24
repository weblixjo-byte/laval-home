import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Landmark, 
  ShieldCheck, 
  TrendingUp, 
  Clock,
  ArrowRight,
  CheckCircle2,
  FileCheck
} from 'lucide-react';

const WEB3FORMS_ACCESS_KEY = "d7f8311f-fb43-4cdd-96ed-afcf8c00bba3";

const Financing = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.target);
    formData.append("access_key", WEB3FORMS_ACCESS_KEY);
    formData.append("subject", "New Luxury Mortgage & Financing Inquiry");
    formData.append("from_name", "Laval Luxury Homes Mortgage Desk");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setSubmitted(true);
        e.target.reset();
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        setError("Unable to submit proposal request. Please contact our advisory office directly.");
      }
    } catch {
      setError("Network error. Please verify your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white pt-28 md:pt-36 font-sans">
      {/* Hero Section */}
      <section className="luxury-container mb-20 md:mb-28">
        <div className="relative h-[55vh] md:h-[65vh] flex items-center justify-center overflow-hidden rounded-2xl shadow-2xl">
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80" 
              alt="Bespoke Real Estate Financing" 
              className="w-full h-full object-cover"
              fetchpriority="high"
              decoding="async"
            />
            <div className="absolute inset-0 bg-neutral-950/65 backdrop-blur-[1px]"></div>
          </div>
          
          <div className="relative z-10 text-center text-white px-4 max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[#D4AF37] text-xs font-semibold uppercase tracking-[0.2em]">
                <Landmark size={13} /> Private Wealth Lending
              </div>
              <h1 className="text-4xl md:text-7xl font-semibold tracking-tight leading-tight">
                Bespoke Mortgage & Acquisition Structuring
              </h1>
              <p className="text-sm md:text-base font-light tracking-wide max-w-xl mx-auto text-neutral-200 leading-relaxed">
                Strategic liquidity solutions, custom jumbo mortgages, and private portfolio financing designed for ultra-luxury residential acquisitions.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  to="/apply-financing"
                  className="bg-[#D4AF37] text-neutral-950 hover:bg-[#C5A059] px-8 py-3.5 rounded-full uppercase tracking-[0.15em] text-xs font-semibold transition-all duration-300 shadow-md inline-flex items-center justify-center gap-2"
                >
                  <FileCheck size={15} /> Start 5-Step Pre-Approval
                </Link>
                <a
                  href="#inquiry-form"
                  className="bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 px-8 py-3.5 rounded-full uppercase tracking-[0.15em] text-xs font-semibold transition-all duration-300"
                >
                  Request Consultation
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Advantage & Solutions */}
      <section className="py-20 luxury-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="space-y-8 text-left"
          >
            <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold block">
              The Laval Advantage
            </span>
            <h2 className="text-3xl md:text-5xl font-semibold text-neutral-900 leading-tight">
              Sophisticated Lending Tailored to Your Balance Sheet
            </h2>
            <p className="text-sm md:text-base text-neutral-600 font-light leading-relaxed">
              Acquiring prime estates requires strategic financial structuring. Laval Luxury Homes partners with premier private banks, direct asset-based lenders, and institutional mortgage desks to structure customized financing solutions that align with your broader liquidity goals.
            </p>
            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="space-y-2 p-5 rounded-xl bg-neutral-50 border border-neutral-100">
                <div className="text-[#D4AF37]"><Clock size={20} /></div>
                <h4 className="text-xs uppercase tracking-wider font-semibold text-neutral-900">Rapid Approval</h4>
                <p className="text-xs text-neutral-500 font-light">Direct underwriting review within 24-48 business hours.</p>
              </div>
              <div className="space-y-2 p-5 rounded-xl bg-neutral-50 border border-neutral-100">
                <div className="text-[#D4AF37]"><TrendingUp size={20} /></div>
                <h4 className="text-xs uppercase tracking-wider font-semibold text-neutral-900">Custom Terms</h4>
                <p className="text-xs text-neutral-500 font-light">Asset-backed, interest-only, and portfolio bridge options.</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="rounded-2xl overflow-hidden shadow-2xl border border-neutral-100 h-[480px]"
          >
            <img 
              src="https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80" 
              alt="Private Banking Consultation" 
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </motion.div>
        </div>
      </section>

      {/* Inquiry Form & Pre-Approval Callout */}
      <section id="inquiry-form" className="py-24 bg-neutral-50/60 border-t border-neutral-100">
        <div className="luxury-container">
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-8 text-left">
              <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold block">
                Direct Advisory Consultation
              </span>
              <h3 className="text-3xl md:text-4xl font-semibold text-neutral-900 leading-tight">
                Request a Custom Financing Proposal
              </h3>
              <p className="text-sm text-neutral-600 font-light leading-relaxed">
                Our mortgage advisory desk coordinates directly with underwriters to generate bespoke term sheets. All financial disclosures are handled with strict private banking confidentiality.
              </p>
              
              <div className="space-y-4 pt-2">
                {[
                  'Jumbo mortgages up to $25M+',
                  'Asset-backed and securities-based liquidity loans',
                  'Foreign national & international buyer financing',
                  'Construction and architectural completion loans'
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-xs font-medium text-neutral-700">
                    <CheckCircle2 size={16} className="text-[#D4AF37] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Link
                  to="/apply-financing"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-neutral-900 hover:text-[#D4AF37] transition-colors"
                >
                  <span>Or use our 5-Step Digital Pre-Approval Desk</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Form */}
            <div className="bg-white p-8 md:p-10 rounded-2xl border border-neutral-200/80 shadow-md">
              {submitted ? (
                <div className="py-16 text-center">
                  <div className="w-14 h-14 bg-amber-50 text-[#D4AF37] rounded-full flex items-center justify-center text-2xl mb-4 mx-auto border border-amber-200/60">✓</div>
                  <h4 className="text-xl font-semibold text-neutral-900 mb-2">Proposal Request Received</h4>
                  <p className="text-xs text-neutral-500 font-light leading-relaxed">
                    Our mortgage advisory director will contact you discreetly within one business day.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-1.5 text-left">
                    <label className="text-[10px] uppercase tracking-wider text-neutral-400 font-medium">Estimated Loan / Financing Need</label>
                    <select 
                      name="loan_amount"
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 outline-none focus:border-[#D4AF37] text-xs font-medium appearance-none cursor-pointer"
                    >
                      <option value="$1,000,000 - $2,500,000">$1,000,000 - $2,500,000 (Jumbo Tier 1)</option>
                      <option value="$2,500,000 - $5,000,000">$2,500,000 - $5,000,000 (Super Jumbo)</option>
                      <option value="$5,000,000 - $10,000,000">$5,000,000 - $10,000,000 (Private Banking Tier)</option>
                      <option value="Over $10,000,000">Over $10,000,000 (Ultra High Net Worth Portfolio)</option>
                    </select>
                  </div>
                  
                  <input 
                    type="text" 
                    name="name"
                    required
                    placeholder="FULL NAME *" 
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 outline-none focus:border-[#D4AF37] text-xs font-light" 
                  />
                  <input 
                    type="email" 
                    name="email"
                    required
                    placeholder="EMAIL ADDRESS *" 
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 outline-none focus:border-[#D4AF37] text-xs font-light" 
                  />
                  <input 
                    type="tel" 
                    name="phone"
                    required
                    placeholder="PHONE NUMBER *" 
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 outline-none focus:border-[#D4AF37] text-xs font-light" 
                  />
                  
                  <textarea 
                    name="details"
                    placeholder="PROPERTY OF INTEREST OR FINANCING TIMELINE..." 
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 outline-none focus:border-[#D4AF37] text-xs font-light h-24 resize-none"
                  ></textarea>
                  
                  {error && <p className="text-xs text-red-500 italic">{error}</p>}

                  <button 
                    disabled={isSubmitting}
                    className="w-full bg-neutral-900 text-white py-4 rounded-xl uppercase tracking-[0.2em] text-xs font-semibold hover:bg-[#D4AF37] transition-all duration-300 shadow-sm disabled:opacity-50"
                  >
                    {isSubmitting ? 'Transmitting...' : 'Request Financing Proposal'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer Note */}
      <section className="py-8 border-t border-neutral-100 text-center">
        <p className="text-[10px] text-neutral-400 uppercase tracking-wider font-light">
          * Financing terms subject to underwriting and asset appraisal. Equal Housing Opportunity.
        </p>
      </section>
    </div>
  );
};

export default Financing;
