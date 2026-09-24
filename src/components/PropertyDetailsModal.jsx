import React, { useState, useEffect, useMemo } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { urlFor } from '../client';
import Lightbox from './Lightbox';
import ProgressiveImage from './ProgressiveImage';
import { 
  Maximize2, 
  Bed, 
  Bath, 
  Square, 
  Calendar, 
  Warehouse, 
  ShieldCheck, 
  PhoneCall, 
  FileText,
  Send,
  X,
  MapPin,
  ChevronRight,
  LandPlot,
  Calculator,
  User,
  Mail
} from 'lucide-react';

const WEB3FORMS_ACCESS_KEY = "d7f8311f-fb43-4cdd-96ed-afcf8c00bba3";

const PropertyDetailsModal = ({ isOpen, onClose, property }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'story', 'calculator', 'inquire'
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  
  // Inquiry form states
  const [inquiryType, setInquiryType] = useState('private_tour');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  // Mortgage Calculator state
  const propertyPrice = property?.price || 3500000;
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTermYears, setLoanTermYears] = useState(30);

  // Reset tab & active image when property changes
  const [prevPropId, setPrevPropId] = useState(null);
  const propId = property?.id || property?._id;
  if (property && propId !== prevPropId) {
    setPrevPropId(propId);
    setActiveTab('overview');
    setActiveImageIndex(0);
    setSubmitted(false);
    setError(null);
  }

  // Memoize optimized image URLs
  const allImages = useMemo(() => {
    if (!property) return [];
    
    const mainImg = property.mainImage?.asset 
      ? urlFor(property.mainImage).width(1600).quality(85).url() 
      : property.image?.asset
        ? urlFor(property.image).width(1600).quality(85).url()
        : property.image || property.mainImage;
      
    const galleryImgs = property.gallery?.map((img) => 
      img?.asset ? urlFor(img).width(1600).quality(85).url() : img
    ) || [];
    
    return [mainImg, ...galleryImgs].filter(Boolean);
  }, [property]);

  // Prefetch images when modal opens
  useEffect(() => {
    if (isOpen && property && allImages.length > 0) {
      allImages.forEach((url) => {
        const prefetchImg = new Image();
        prefetchImg.src = url;
      });
    }
  }, [isOpen, property, allImages]);

  // Calculate monthly mortgage
  const mortgageCalculation = useMemo(() => {
    const principal = propertyPrice * (1 - downPaymentPercent / 100);
    const monthlyRate = (interestRate / 100) / 12;
    const numberOfPayments = loanTermYears * 12;
    
    if (monthlyRate === 0) return Math.round(principal / numberOfPayments);
    
    const monthlyPI = Math.round(
      (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
    );
    const estimatedTax = Math.round((propertyPrice * 0.011) / 12);
    const estimatedInsurance = Math.round((propertyPrice * 0.0035) / 12);
    
    return {
      principal,
      monthlyPI: isNaN(monthlyPI) ? 0 : monthlyPI,
      estimatedTax,
      estimatedInsurance,
      totalMonthly: (isNaN(monthlyPI) ? 0 : monthlyPI) + estimatedTax + estimatedInsurance
    };
  }, [propertyPrice, downPaymentPercent, interestRate, loanTermYears]);

  if (!property) return null;

  const getSrcSet = (index) => {
    const imgAsset = index === 0 
      ? (property.mainImage || property.image) 
      : property.gallery?.[index - 1];
    if (!imgAsset?.asset) return undefined;
    
    return [
      `${urlFor(imgAsset).width(480).quality(75).url()} 480w`,
      `${urlFor(imgAsset).width(960).quality(80).url()} 960w`,
      `${urlFor(imgAsset).width(1600).quality(85).url()} 1600w`,
    ].join(', ');
  };

  const thumbnailUrls = [
    (property.mainImage?.asset ? urlFor(property.mainImage).width(240).quality(75).url() : property.mainImage) ||
    (property.image?.asset ? urlFor(property.image).width(240).quality(75).url() : property.image),
    ...(property.gallery?.map((img) => img?.asset ? urlFor(img).width(240).quality(75).url() : img) || [])
  ].filter(Boolean);

  const specs = property.specifications || {};
  const bedrooms = specs.bedrooms || property.bedrooms || '—';
  const bathrooms = specs.bathrooms || property.bathrooms || '—';
  const sqft = specs.sqft || property.sqft;
  const formattedSqft = sqft ? `${sqft.toLocaleString()} sq ft` : 'Spacious';
  const lotSize = specs.lotSize || 'Generous Grounds';
  const yearBuilt = specs.yearBuilt || 'Recent';
  const garageSpaces = specs.garageSpaces || '2+ Private';

  const locationStr = property.location?.neighborhood 
    ? `${property.location.neighborhood}, ${property.location.city || 'Roswell'}, ${property.location.state || 'GA'}`
    : property.location?.city 
      ? `${property.location.city}, ${property.location.state || 'GA'}`
      : 'Roswell, GA';

  const formattedPrice = property.priceDisplayMode === 'fixed' && property.price
    ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(property.price)
    : 'Price on Request';

  const featuresList = property.features && property.features.length > 0 
    ? property.features 
    : [
        'Infinity-Edge Pool',
        'Temperature-Controlled Wine Cellar',
        'Smart Automation System',
        'Panoramic Views',
        'Private Wellness Spa',
        'Chef Culinary Kitchen',
        'Custom Dressing Rooms',
        'Gated Privacy & Security'
      ];

  const handleApplyFinancing = () => {
    onClose();
    navigate(`/apply-financing?property=${propId || ''}`);
  };

  const handleInquirySubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.target);
    formData.append("access_key", WEB3FORMS_ACCESS_KEY);
    formData.append("subject", `Property Inquiry: ${property.title || property.name} - ${inquiryType.toUpperCase()}`);
    formData.append("from_name", "Laval Luxury Homes Advisory Desk");
    formData.append("property_title", property.title || property.name || '');
    formData.append("property_id", propId || '');
    formData.append("interest_type", inquiryType);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
      const data = await response.json();
      if (data.success) {
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          setActiveTab('overview');
        }, 4000);
      } else {
        setError("We were unable to process your request. Please call our private advisory directly.");
      }
    } catch {
      setError("Network error. Please verify your connection or contact our advisory office.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[999] flex items-center justify-center p-3 md:p-6 bg-neutral-950/80 backdrop-blur-md overflow-y-auto font-sans"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.96, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white w-full max-w-6xl max-h-[92vh] overflow-y-auto shadow-2xl flex flex-col relative rounded-2xl border border-neutral-200/80 my-auto text-neutral-900"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 md:top-6 md:right-6 text-neutral-400 hover:text-neutral-900 z-50 bg-white/90 backdrop-blur-md rounded-full w-10 h-10 flex items-center justify-center border border-neutral-200 shadow-sm transition-all hover:scale-105"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            {/* Header Title Section */}
            <div className="p-6 md:px-10 md:pt-8 md:pb-6 border-b border-neutral-100 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-neutral-50/50">
              <div>
                <div className="flex items-center gap-3 mb-1.5">
                  <span className="text-[11px] uppercase tracking-[0.25em] text-[#D4AF37] font-semibold">
                    {property.propertyType || 'Exclusive Estate'}
                  </span>
                  <span className="text-neutral-300">•</span>
                  <div className="flex items-center gap-1 text-[11px] text-neutral-400 font-medium">
                    <MapPin size={12} className="text-[#D4AF37]" />
                    <span>{locationStr}</span>
                  </div>
                </div>
                <h2 className="text-2xl md:text-3xl font-semibold text-neutral-900 tracking-tight">
                  {property.title || property.name}
                </h2>
              </div>

              <div className="flex items-center gap-5">
                <div className="text-left md:text-right">
                  <div className="text-[10px] uppercase tracking-wider text-neutral-400 font-medium">Acquisition Price</div>
                  <div className="text-xl md:text-2xl font-bold text-neutral-900 tracking-tight">
                    {formattedPrice}
                  </div>
                </div>

                <span className={`text-[10px] font-semibold uppercase tracking-[0.2em] px-4 py-2 rounded-full border ${
                  property.isSold 
                    ? 'bg-neutral-100 text-neutral-600 border-neutral-200' 
                    : 'bg-amber-50 text-amber-800 border-amber-200/80 shadow-xs'
                }`}>
                  {property.isSold ? 'Sold' : (property.status || 'Available')}
                </span>
              </div>
            </div>

            {/* Main Content Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 flex-grow">
              
              {/* Left Column: Image Viewer & Gallery Strip */}
              <div className="lg:col-span-7 p-6 md:p-8 bg-neutral-50/60 border-b lg:border-b-0 lg:border-r border-neutral-100 flex flex-col justify-between">
                <div>
                  {/* Main High-Res Image Display */}
                  <div 
                    className="relative aspect-[16/10] overflow-hidden mb-4 bg-neutral-200 rounded-xl shadow-xs group cursor-zoom-in border border-neutral-200/60"
                    onClick={() => setIsLightboxOpen(true)}
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeImageIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="w-full h-full"
                      >
                        <ProgressiveImage 
                          src={allImages[activeImageIndex]} 
                          srcSet={getSrcSet(activeImageIndex)}
                          sizes="(max-width: 1024px) 100vw, 60vw"
                          placeholder={activeImageIndex === 0 ? property.mainImage?.asset?.metadata?.lqip : property.gallery?.[activeImageIndex - 1]?.asset?.metadata?.lqip}
                          alt={`${property.title || property.name} - Image ${activeImageIndex + 1}`} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                        />
                      </motion.div>
                    </AnimatePresence>
                    
                    {/* Enlarge Icon Overlay */}
                    <div className="absolute top-4 left-4 bg-neutral-950/70 text-white p-2.5 rounded-full opacity-90 group-hover:opacity-100 transition-opacity backdrop-blur-md shadow-md">
                      <Maximize2 size={16} />
                    </div>

                    {/* Image Counter Overlay */}
                    <div className="absolute bottom-4 right-4 bg-neutral-950/70 text-white text-[11px] font-medium tracking-wider px-3.5 py-1.5 rounded-full backdrop-blur-md shadow-md">
                      {activeImageIndex + 1} / {allImages.length}
                    </div>
                  </div>

                  {/* Thumbnail Strip */}
                  {thumbnailUrls.length > 1 && (
                    <div className="flex gap-2.5 overflow-x-auto no-scrollbar py-2">
                      {thumbnailUrls.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveImageIndex(idx)}
                          className={`flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                            activeImageIndex === idx ? 'border-[#D4AF37] scale-105 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'
                          }`}
                        >
                          <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Left Footer Action Banner */}
                <div className="mt-8 pt-6 border-t border-neutral-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-amber-50 flex items-center justify-center text-[#D4AF37] border border-amber-200/50">
                      <ShieldCheck size={18} />
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-neutral-900 uppercase tracking-wider">Certified Architectural Verification</h4>
                      <p className="text-[11px] text-neutral-500 font-light">Title, deed verification, and discreet acquisition representation guaranteed.</p>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => setIsLightboxOpen(true)}
                    className="text-xs uppercase tracking-widest text-neutral-900 font-semibold border-b border-[#D4AF37] pb-0.5 hover:text-[#D4AF37] transition-colors flex items-center gap-1"
                  >
                    Fullscreen Gallery <ChevronRight size={14} />
                  </button>
                </div>
              </div>

              {/* Right Column: Spec Grid, Story & Form */}
              <div className="lg:col-span-5 p-6 md:p-8 flex flex-col justify-between bg-white">
                <div>
                  {/* Navigation Tabs */}
                  <div className="flex border-b border-neutral-100 mb-6 overflow-x-auto no-scrollbar gap-4">
                    <button
                      onClick={() => setActiveTab('overview')}
                      className={`pb-3 text-xs uppercase tracking-wider font-semibold border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${
                        activeTab === 'overview' 
                          ? 'border-[#D4AF37] text-neutral-900' 
                          : 'border-transparent text-neutral-400 hover:text-neutral-600'
                      }`}
                    >
                      <Square size={13} /> Specs
                    </button>
                    <button
                      onClick={() => setActiveTab('story')}
                      className={`pb-3 text-xs uppercase tracking-wider font-semibold border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${
                        activeTab === 'story' 
                          ? 'border-[#D4AF37] text-neutral-900' 
                          : 'border-transparent text-neutral-400 hover:text-neutral-600'
                      }`}
                    >
                      <FileText size={13} /> Narrative
                    </button>
                    <button
                      onClick={() => setActiveTab('calculator')}
                      className={`pb-3 text-xs uppercase tracking-wider font-semibold border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${
                        activeTab === 'calculator' 
                          ? 'border-[#D4AF37] text-neutral-900' 
                          : 'border-transparent text-neutral-400 hover:text-neutral-600'
                      }`}
                    >
                      <Calculator size={13} /> Mortgage Estimator
                    </button>
                    <button
                      onClick={() => setActiveTab('inquire')}
                      className={`pb-3 text-xs uppercase tracking-wider font-semibold border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${
                        activeTab === 'inquire' 
                          ? 'border-[#D4AF37] text-neutral-900' 
                          : 'border-transparent text-neutral-400 hover:text-neutral-600'
                      }`}
                    >
                      <Send size={13} /> Schedule Tour
                    </button>
                  </div>

                  {/* TAB 1: Specs */}
                  {activeTab === 'overview' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-neutral-400">Key Specifications</h3>
                        <span className="text-[10px] text-neutral-400 font-medium">Ref #{propId?.slice(-6) || 'LLH-88'}</span>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-neutral-50 p-3.5 rounded-xl border border-neutral-100 flex items-start gap-3">
                          <Bed size={18} className="text-[#D4AF37] mt-0.5" />
                          <div>
                            <div className="text-[10px] uppercase tracking-wider text-neutral-400 font-medium">Bedrooms</div>
                            <div className="text-sm font-semibold text-neutral-800">{bedrooms} Suites</div>
                          </div>
                        </div>

                        <div className="bg-neutral-50 p-3.5 rounded-xl border border-neutral-100 flex items-start gap-3">
                          <Bath size={18} className="text-[#D4AF37] mt-0.5" />
                          <div>
                            <div className="text-[10px] uppercase tracking-wider text-neutral-400 font-medium">Bathrooms</div>
                            <div className="text-sm font-semibold text-neutral-800">{bathrooms} Baths</div>
                          </div>
                        </div>

                        <div className="bg-neutral-50 p-3.5 rounded-xl border border-neutral-100 flex items-start gap-3">
                          <Square size={18} className="text-[#D4AF37] mt-0.5" />
                          <div>
                            <div className="text-[10px] uppercase tracking-wider text-neutral-400 font-medium">Living Area</div>
                            <div className="text-sm font-semibold text-neutral-800">{formattedSqft}</div>
                          </div>
                        </div>

                        <div className="bg-neutral-50 p-3.5 rounded-xl border border-neutral-100 flex items-start gap-3">
                          <LandPlot size={18} className="text-[#D4AF37] mt-0.5" />
                          <div>
                            <div className="text-[10px] uppercase tracking-wider text-neutral-400 font-medium">Lot Size</div>
                            <div className="text-sm font-semibold text-neutral-800">{lotSize}</div>
                          </div>
                        </div>

                        <div className="bg-neutral-50 p-3.5 rounded-xl border border-neutral-100 flex items-start gap-3">
                          <Calendar size={18} className="text-[#D4AF37] mt-0.5" />
                          <div>
                            <div className="text-[10px] uppercase tracking-wider text-neutral-400 font-medium">Year Built</div>
                            <div className="text-sm font-semibold text-neutral-800">{yearBuilt}</div>
                          </div>
                        </div>

                        <div className="bg-neutral-50 p-3.5 rounded-xl border border-neutral-100 flex items-start gap-3">
                          <Warehouse size={18} className="text-[#D4AF37] mt-0.5" />
                          <div>
                            <div className="text-[10px] uppercase tracking-wider text-neutral-400 font-medium">Garage / Parking</div>
                            <div className="text-sm font-semibold text-neutral-800">{garageSpaces} Spaces</div>
                          </div>
                        </div>
                      </div>

                      {/* Amenities Pills */}
                      <div>
                        <div className="text-[10px] uppercase tracking-[0.2em] font-semibold text-neutral-400 mb-3">
                          Signature Amenities & Features
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {featuresList.map((feature, idx) => (
                            <span 
                              key={idx} 
                              className="text-[11px] font-medium px-3 py-1.5 rounded-full bg-neutral-100 text-neutral-700 border border-neutral-200/60"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 2: Story */}
                  {activeTab === 'story' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                      <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-neutral-400">Architectural Narrative</h3>
                      
                      <div className="bg-neutral-50 p-6 rounded-xl border border-neutral-100 max-h-[340px] overflow-y-auto">
                        {property.description ? (
                          <p className="text-sm text-neutral-700 font-light leading-relaxed whitespace-pre-line">
                            {property.description}
                          </p>
                        ) : (
                          <p className="text-sm text-neutral-500 font-light leading-relaxed italic">
                            This distinguished residence embodies exquisite modern luxury, thoughtful spatial proportion, and refined natural finishes. Contact our Private Advisory department for full architectural blueprints, bespoke customization history, and private portfolio dossier.
                          </p>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 3: Mortgage Estimator */}
                  {activeTab === 'calculator' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-neutral-400">Mortgage & Liquidity Estimator</h3>
                        <span className="text-xs font-semibold text-[#D4AF37]">
                          Est. Total: ${mortgageCalculation.totalMonthly.toLocaleString()} / mo
                        </span>
                      </div>

                      <div className="bg-neutral-50 p-5 rounded-xl border border-neutral-200/80 space-y-4">
                        <div className="space-y-1.5">
                          <div className="flex justify-between text-xs">
                            <span className="text-neutral-500 font-light">Down Payment ({downPaymentPercent}%):</span>
                            <span className="font-semibold text-neutral-800">${Math.round(propertyPrice * (downPaymentPercent / 100)).toLocaleString()}</span>
                          </div>
                          <input 
                            type="range" 
                            min="10" 
                            max="50" 
                            step="5"
                            value={downPaymentPercent} 
                            onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                            className="w-full accent-[#D4AF37] cursor-pointer" 
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-[10px] uppercase tracking-wider text-neutral-400 font-medium block mb-1">Interest Rate (%)</label>
                            <input 
                              type="number" 
                              step="0.1" 
                              value={interestRate} 
                              onChange={(e) => setInterestRate(Number(e.target.value))}
                              className="w-full bg-white border border-neutral-200 rounded-lg px-3 py-2 text-xs font-semibold"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] uppercase tracking-wider text-neutral-400 font-medium block mb-1">Loan Term</label>
                            <select 
                              value={loanTermYears} 
                              onChange={(e) => setLoanTermYears(Number(e.target.value))}
                              className="w-full bg-white border border-neutral-200 rounded-lg px-3 py-2 text-xs font-semibold"
                            >
                              <option value={30}>30 Years (Fixed)</option>
                              <option value={15}>15 Years (Fixed)</option>
                              <option value={10}>10/1 ARM</option>
                              <option value={7}>7/1 ARM</option>
                            </select>
                          </div>
                        </div>

                        <div className="pt-3 border-t border-neutral-200/70 space-y-1.5 text-xs">
                          <div className="flex justify-between text-neutral-500 font-light">
                            <span>Principal & Interest:</span>
                            <span className="text-neutral-800 font-medium">${mortgageCalculation.monthlyPI.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-neutral-500 font-light">
                            <span>Est. Property Taxes:</span>
                            <span className="text-neutral-800 font-medium">${mortgageCalculation.estimatedTax.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-neutral-500 font-light">
                            <span>Est. Hazard & Title Insurance:</span>
                            <span className="text-neutral-800 font-medium">${mortgageCalculation.estimatedInsurance.toLocaleString()}</span>
                          </div>
                        </div>

                        <button
                          onClick={handleApplyFinancing}
                          className="w-full py-2.5 rounded-lg bg-neutral-900 text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#D4AF37] transition-colors"
                        >
                          Lock Rate & Start Pre-Approval
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 4: Inquire / Schedule Tour Form */}
                  {activeTab === 'inquire' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                      {submitted ? (
                        <div className="py-10 text-center bg-amber-50/60 border border-amber-100 rounded-xl">
                          <div className="w-12 h-12 bg-amber-100 text-amber-800 rounded-full flex items-center justify-center text-xl mb-3 mx-auto">✓</div>
                          <h4 className="text-base font-semibold text-amber-950 mb-1">Appointment Request Received</h4>
                          <p className="text-xs text-amber-900/80 font-light max-w-xs mx-auto">Our Private Client Advisor will contact you discreetly to coordinate your private viewing.</p>
                        </div>
                      ) : (
                        <form onSubmit={handleInquirySubmit} className="space-y-4">
                          <div className="flex bg-neutral-100 p-1 rounded-xl">
                            <button
                              type="button"
                              onClick={() => setInquiryType('private_tour')}
                              className={`flex-1 py-2 text-[10px] uppercase tracking-wider font-semibold rounded-lg transition-all ${
                                inquiryType === 'private_tour' ? 'bg-white shadow-xs text-neutral-900' : 'text-neutral-400'
                              }`}
                            >
                              Schedule Private Tour
                            </button>
                            <button
                              type="button"
                              onClick={() => setInquiryType('acquisition_inquiry')}
                              className={`flex-1 py-2 text-[10px] uppercase tracking-wider font-semibold rounded-lg transition-all ${
                                inquiryType === 'acquisition_inquiry' ? 'bg-white shadow-xs text-neutral-900' : 'text-neutral-400'
                              }`}
                            >
                              Acquisition Inquiry
                            </button>
                          </div>

                          <input name="name" required type="text" placeholder="FULL NAME *" className="w-full border-b border-neutral-200 py-2.5 outline-none focus:border-[#D4AF37] transition-colors text-xs font-light" />
                          <input name="phone" required type="tel" placeholder="PHONE NUMBER *" className="w-full border-b border-neutral-200 py-2.5 outline-none focus:border-[#D4AF37] transition-colors text-xs font-light" />
                          <input name="email" required type="email" placeholder="EMAIL ADDRESS *" className="w-full border-b border-neutral-200 py-2.5 outline-none focus:border-[#D4AF37] transition-colors text-xs font-light" />
                          <textarea name="message" placeholder="PREFERRED TOUR DATE OR PRIVATE INQUIRY DETAILS..." className="w-full border-b border-neutral-200 py-2.5 outline-none focus:border-[#D4AF37] transition-colors text-xs font-light resize-none" rows="2"></textarea>

                          {error && <p className="text-xs text-red-500 italic">{error}</p>}

                          <button 
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-neutral-900 text-white py-3.5 uppercase tracking-[0.25em] text-[10px] font-semibold rounded-xl hover:bg-[#D4AF37] transition-all duration-300 disabled:opacity-50 shadow-sm"
                          >
                            {isSubmitting ? 'Transmitting Request...' : 'Submit Viewing Request'}
                          </button>
                        </form>
                      )}
                    </motion.div>
                  )}
                </div>

                {/* Bottom Main Action Buttons & Advisor Badge */}
                <div className="pt-6 border-t border-neutral-100 space-y-3 mt-6">
                  {/* Advisor card */}
                  <div className="flex items-center justify-between p-3 rounded-xl bg-neutral-50 border border-neutral-100">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] flex items-center justify-center font-bold text-xs">
                        <User size={15} />
                      </div>
                      <div className="text-left">
                        <div className="text-xs font-semibold text-neutral-900">Private Advisory Desk</div>
                        <div className="text-[10px] text-neutral-400 font-light">Laval Luxury Homes Roswell HQ</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <a href="tel:+14047908336" className="p-2 rounded-full bg-white border border-neutral-200 text-neutral-700 hover:text-[#D4AF37] transition-colors" title="Call Advisory">
                        <PhoneCall size={13} />
                      </a>
                      <a href="mailto:concierge@lavalluxuryhomes.com" className="p-2 rounded-full bg-white border border-neutral-200 text-neutral-700 hover:text-[#D4AF37] transition-colors" title="Email Advisory">
                        <Mail size={13} />
                      </a>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      onClick={handleApplyFinancing}
                      className="w-full py-3.5 bg-neutral-900 text-white hover:bg-[#D4AF37] transition-colors text-[10px] uppercase tracking-[0.2em] font-semibold rounded-xl shadow-xs flex items-center justify-center gap-2"
                    >
                      Mortgage & Pre-Approval
                    </button>

                    <button
                      onClick={() => setActiveTab('inquire')}
                      className="w-full py-3.5 bg-white border border-neutral-300 hover:border-neutral-900 text-neutral-900 transition-colors text-[10px] uppercase tracking-[0.2em] font-semibold rounded-xl flex items-center justify-center gap-2"
                    >
                      <Send size={12} /> Schedule Showing
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Lightbox for Fullscreen Image Inspection */}
      <Lightbox 
        isOpen={isLightboxOpen} 
        onClose={() => setIsLightboxOpen(false)} 
        images={allImages} 
        initialIndex={activeImageIndex} 
      />
    </AnimatePresence>
  );
};

export default PropertyDetailsModal;
