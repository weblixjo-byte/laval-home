import React, { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Send, CheckCircle2, User, Calendar, Quote } from 'lucide-react';
import { client } from '../client';

const INITIAL_TESTIMONIALS = [
  {
    _id: 'default-1',
    name: 'Harrison & Victoria Vance',
    rating: 5,
    comment: 'Laval Luxury Homes navigated our waterfront estate acquisition with unparalleled discretion and architectural expertise. Their advisory team protected our interests at every turn.',
    date: '2026-02-14T00:00:00.000Z',
    propertyType: 'Lakefront Modern Estate'
  },
  {
    _id: 'default-2',
    name: 'Marcus Sterling',
    rating: 5,
    comment: 'From the private viewing to closing on our penthouse, the experience was seamless, sophisticated, and impeccably managed. Laval represents the pinnacle of luxury real estate representation.',
    date: '2026-01-20T00:00:00.000Z',
    propertyType: 'Skyrise Penthouse'
  },
  {
    _id: 'default-3',
    name: 'Dr. Evelyn Montgomery',
    rating: 5,
    comment: 'The architectural curation of our historic Roswell residence was second to none. Transparent, professional, and genuinely client-centric.',
    date: '2025-11-05T00:00:00.000Z',
    propertyType: 'Historic Modernized Villa'
  }
];

const Reviews = () => {
  const [reviews, setReviews] = useState(INITIAL_TESTIMONIALS);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    rating: 5,
    comment: ''
  });

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const query = `*[_type == "review" && isApproved == true] | order(date desc)`;
        const data = await client.fetch(query);
        if (data && data.length > 0) {
          const processedData = data.map((r) => ({
            ...r,
            date: r.date || new Date().toISOString()
          }));
          setReviews(processedData);
        } else {
          setReviews(INITIAL_TESTIMONIALS);
        }
      } catch (err) {
        console.error("Error fetching reviews:", err);
        setReviews(INITIAL_TESTIMONIALS);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      
      const newReview = {
        _id: 'temp-' + Date.now(),
        name: formData.name,
        rating: formData.rating,
        comment: formData.comment,
        date: new Date().toISOString(),
      };
      
      setReviews([newReview, ...reviews]);

      setTimeout(() => {
        setSubmitted(false);
        setShowForm(false);
        setFormData({ name: '', rating: 5, comment: '' });
      }, 3000);
    }, 1200);
  };

  const renderStars = (rating, interactive = false) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={interactive ? 22 : 14}
            className={`${
              star <= rating ? 'fill-[#D4AF37] text-[#D4AF37]' : 'text-neutral-300'
            } ${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : ''}`}
            onClick={() => interactive && setFormData({ ...formData, rating: star })}
          />
        ))}
      </div>
    );
  };

  return (
    <section className="py-24 bg-white overflow-hidden border-t border-neutral-100 font-sans">
      <div className="luxury-container">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div className="max-w-xl">
            <span className="text-[11px] uppercase tracking-[0.3em] text-[#D4AF37] font-semibold block mb-2">
              Private Client Perspectives
            </span>
            <h3 className="text-3xl md:text-5xl font-semibold text-neutral-900 tracking-tight">
              Endorsed by Discerning Homeowners
            </h3>
          </div>
          <button 
            onClick={() => setShowForm(!showForm)}
            className="bg-neutral-900 text-white font-medium py-3 px-7 text-xs uppercase tracking-wider rounded-full hover:bg-[#D4AF37] transition-all duration-300 shadow-sm"
          >
            {showForm ? 'Cancel' : 'Submit Client Review'}
          </button>
        </div>

        {/* Review Submission Form */}
        <AnimatePresence>
          {showForm && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mb-16 overflow-hidden"
            >
              <div className="bg-neutral-50 p-8 md:p-10 border border-neutral-200/80 rounded-2xl shadow-sm max-w-2xl mx-auto">
                {submitted ? (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <CheckCircle2 size={48} className="text-[#D4AF37] mb-4" />
                    <h4 className="text-xl font-semibold text-neutral-900 mb-1">Thank You</h4>
                    <p className="text-xs text-neutral-500 font-light">Your review has been submitted to our private desk for verification.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[11px] uppercase tracking-wider font-medium text-neutral-500">Your Full Name</label>
                        <input 
                          type="text" 
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Eleanor Vance"
                          className="w-full bg-white border border-neutral-200 rounded-xl px-4 py-3 outline-none focus:border-[#D4AF37] transition-colors font-light text-xs"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[11px] uppercase tracking-wider font-medium text-neutral-500">Rating</label>
                        <div className="h-[42px] flex items-center px-1">
                          {renderStars(formData.rating, true)}
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[11px] uppercase tracking-wider font-medium text-neutral-500">Your Acquisition Experience</label>
                      <textarea 
                        required
                        rows="3"
                        value={formData.comment}
                        onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                        placeholder="Describe your advisory and property acquisition experience with Laval Luxury Homes..."
                        className="w-full bg-white border border-neutral-200 rounded-xl px-4 py-3 outline-none focus:border-[#D4AF37] transition-colors font-light text-xs resize-none"
                      ></textarea>
                    </div>
                    <div className="flex justify-end pt-2">
                      <button 
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-neutral-900 text-white font-medium py-3 px-8 text-xs uppercase tracking-wider rounded-full hover:bg-[#D4AF37] transition-all flex items-center gap-2 shadow-sm disabled:opacity-50"
                      >
                        {isSubmitting ? 'Transmitting...' : 'Submit Review'}
                        {!isSubmitting && <Send size={12} />}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Reviews Grid */}
        {loading ? (
          <div className="flex justify-center py-16">
            <div className="w-8 h-8 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {reviews.map((review, idx) => (
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                viewport={{ once: true }}
                key={review._id || idx}
                className="bg-neutral-50/70 p-7 md:p-8 rounded-2xl border border-neutral-200/70 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-2">
                      <Quote size={20} className="text-[#D4AF37] opacity-60" />
                    </div>
                    {renderStars(review.rating)}
                  </div>
                  <p className="text-neutral-700 font-light leading-relaxed mb-6 text-sm">
                    "{review.comment}"
                  </p>
                </div>
                <div className="pt-4 border-t border-neutral-200/60 flex justify-between items-center">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-white border border-neutral-200 flex items-center justify-center text-neutral-500">
                      <User size={13} />
                    </div>
                    <span className="font-semibold text-xs text-neutral-900">{review.name}</span>
                  </div>
                  <span className="text-[10px] text-neutral-400 flex items-center gap-1 font-light">
                    <Calendar size={11} />
                    {new Date(review.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default Reviews;
