import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Compass, Send, CheckCircle2 } from 'lucide-react';

const WEB3FORMS_ACCESS_KEY = "d7f8311f-fb43-4cdd-96ed-afcf8c00bba3";

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.target);
    formData.append("access_key", WEB3FORMS_ACCESS_KEY);
    formData.append("subject", `New Private Inquiry from Contact Page`);
    formData.append("from_name", "Laval Luxury Homes Website");

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
        setError("Unable to submit message. Please contact our advisory office directly.");
      }
    } catch {
      setError("Network error. Please verify your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white pt-28 md:pt-36 pb-32 font-sans">
      <div className="luxury-container">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-20 space-y-4">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100 text-[#D4AF37] text-xs font-semibold uppercase tracking-[0.2em]"
            >
              <Compass size={13} /> Private Concierge & Advisory
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="text-4xl md:text-6xl font-semibold text-neutral-900 tracking-tight"
            >
              Contact Our Advisory Desk
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-sm md:text-base text-neutral-500 font-light max-w-xl mx-auto leading-relaxed"
            >
              Connect discreetly with our Private Client Directors for viewing appointments, off-market portfolio access, or estate representation.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* Contact Info */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-12 text-left"
            >
              <div className="p-8 rounded-2xl bg-neutral-50 border border-neutral-200/70 space-y-4 shadow-xs">
                <div className="flex items-center gap-2.5 text-[#D4AF37]">
                  <MapPin size={18} />
                  <span className="text-xs uppercase tracking-widest font-semibold text-neutral-900">Advisory Headquarters</span>
                </div>
                <div className="space-y-1 text-sm text-neutral-600 font-light">
                  <p className="font-medium text-neutral-900">110 Mansell Cir Suite 306</p>
                  <p>Roswell GA 30075</p>
                </div>
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=110+Mansell+Cir+Suite+306,+Roswell,+GA+30075" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-block text-xs uppercase tracking-wider text-[#D4AF37] font-semibold border-b border-[#D4AF37] pb-0.5 hover:text-[#C5A059] transition-colors"
                >
                  Get Directions →
                </a>
              </div>

              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-neutral-900">Direct Inquiries</h3>
                
                <div className="space-y-4 text-xs font-light">
                  <div className="flex justify-between items-center py-3 border-b border-neutral-100">
                    <span className="uppercase tracking-wider text-neutral-400 font-medium">Acquisition Desk</span>
                    <a href="tel:+14047908336" className="text-neutral-900 font-medium hover:text-[#D4AF37] transition-colors flex items-center gap-2">
                      <Phone size={13} className="text-[#D4AF37]" /> +1 (404) 790-8336
                    </a>
                  </div>

                  <div className="flex justify-between items-center py-3 border-b border-neutral-100">
                    <span className="uppercase tracking-wider text-neutral-400 font-medium">Private Advisory</span>
                    <a href="tel:+12292374046" className="text-neutral-900 font-medium hover:text-[#D4AF37] transition-colors flex items-center gap-2">
                      <Phone size={13} className="text-[#D4AF37]" /> +1 (229) 237-4046
                    </a>
                  </div>

                  <div className="flex justify-between items-center py-3 border-b border-neutral-100">
                    <span className="uppercase tracking-wider text-neutral-400 font-medium">Concierge Email</span>
                    <a href="mailto:concierge@lavalluxuryhomes.com" className="text-neutral-900 font-medium hover:text-[#D4AF37] transition-colors flex items-center gap-2">
                      <Mail size={13} className="text-[#D4AF37]" /> concierge@lavalluxuryhomes.com
                    </a>
                  </div>

                  <div className="flex justify-between items-center py-3 border-b border-neutral-100">
                    <span className="uppercase tracking-wider text-neutral-400 font-medium">Confidential Advisory</span>
                    <a href="mailto:advisory@lavalluxuryhomes.com" className="text-neutral-900 font-medium hover:text-[#D4AF37] transition-colors flex items-center gap-2">
                      <Mail size={13} className="text-[#D4AF37]" /> advisory@lavalluxuryhomes.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200/70 text-xs text-amber-950/80 font-light leading-relaxed">
                Private viewings and architectural consultations are conducted strictly by advance appointment to safeguard client privacy.
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-neutral-50 p-8 md:p-12 rounded-2xl border border-neutral-200/80 shadow-md text-left"
            >
              <h3 className="text-xl font-semibold mb-6 text-neutral-900">Request a Private Briefing</h3>
              
              {submitted ? (
                <div className="py-16 text-center space-y-3">
                  <div className="w-14 h-14 bg-amber-100 text-[#D4AF37] rounded-full flex items-center justify-center text-2xl mx-auto shadow-xs">✓</div>
                  <h4 className="text-lg font-semibold text-neutral-900">Message Received</h4>
                  <p className="text-xs text-neutral-500 font-light leading-relaxed max-w-xs mx-auto">
                    Thank you for reaching out. A Private Client Director will contact you discreetly within one business day.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="text-[10px] uppercase tracking-wider font-medium text-neutral-500 block mb-1">Full Legal Name *</label>
                    <input 
                      type="text" 
                      name="name"
                      required
                      className="w-full bg-white border border-neutral-200 rounded-xl px-4 py-3 outline-none focus:border-[#D4AF37] text-xs font-light text-neutral-900" 
                      placeholder="e.g. Harrison Vance"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] uppercase tracking-wider font-medium text-neutral-500 block mb-1">Email Address *</label>
                      <input 
                        type="email" 
                        name="email"
                        required
                        className="w-full bg-white border border-neutral-200 rounded-xl px-4 py-3 outline-none focus:border-[#D4AF37] text-xs font-light text-neutral-900" 
                        placeholder="vance@private.com"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-wider font-medium text-neutral-500 block mb-1">Phone Number *</label>
                      <input 
                        type="tel" 
                        name="phone"
                        required
                        className="w-full bg-white border border-neutral-200 rounded-xl px-4 py-3 outline-none focus:border-[#D4AF37] text-xs font-light text-neutral-900" 
                        placeholder="+1 (404) 555-0199"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-wider font-medium text-neutral-500 block mb-1">Nature of Inquiry</label>
                    <select 
                      name="interest"
                      className="w-full bg-white border border-neutral-200 rounded-xl px-4 py-3 outline-none focus:border-[#D4AF37] text-xs font-medium text-neutral-800 appearance-none cursor-pointer"
                    >
                      <option value="Private Tour Request">Schedule Private Property Tour</option>
                      <option value="Property Acquisition Inquiry">Property Acquisition Advisory</option>
                      <option value="List / Sell an Estate">Estate Representation & Listing Valuation</option>
                      <option value="Mortgage & Financing">Luxury Mortgage & Liquidity Structuring</option>
                      <option value="Off-Market Portfolio">Access Off-Market Portfolio</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-wider font-medium text-neutral-500 block mb-1">Message / Consultation Details *</label>
                    <textarea 
                      name="message"
                      required
                      rows="4" 
                      className="w-full bg-white border border-neutral-200 rounded-xl px-4 py-3 outline-none focus:border-[#D4AF37] text-xs font-light text-neutral-900 resize-none" 
                      placeholder="Please indicate property of interest, preferred appointment schedule, or advisory scope..."
                    ></textarea>
                  </div>
                  
                  {error && <p className="text-xs text-red-600 font-medium">{error}</p>}

                  <button 
                    disabled={isSubmitting}
                    className="w-full py-4 bg-neutral-900 text-white text-xs uppercase tracking-[0.15em] font-semibold rounded-xl hover:bg-[#D4AF37] transition-all duration-300 shadow-sm disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    <Send size={13} />
                    <span>{isSubmitting ? 'Transmitting...' : 'Send Confidential Inquiry'}</span>
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
