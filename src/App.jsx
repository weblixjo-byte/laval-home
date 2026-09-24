import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PropertyDetailsModal from './components/PropertyDetailsModal';

// Lazy load pages for optimal performance
const Home = lazy(() => import('./pages/Home'));
const Properties = lazy(() => import('./pages/Properties'));
const Inventory = lazy(() => import('./pages/Inventory'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Financing = lazy(() => import('./pages/Financing'));
const ApplyFinancing = lazy(() => import('./pages/ApplyFinancing'));
const Services = lazy(() => import('./pages/Services'));
const StudioPage = lazy(() => import('./pages/StudioPage'));
const NotFound = lazy(() => import('./pages/NotFound'));

// High-end modern loading fallback
const PageLoader = () => (
  <div className="h-screen w-full flex flex-col items-center justify-center bg-white font-sans">
    <img src="/logo.webp" alt="Laval Luxury Homes" className="h-12 w-auto mb-6 animate-pulse" />
    <div className="w-8 h-8 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
  </div>
);

function App() {
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const location = useLocation();

  const openInquiry = (property) => {
    setSelectedProperty(property);
    setIsInquiryOpen(true);
  };

  const isStudio = location.pathname.startsWith('/studio');
  
  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
    const timeoutId = setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant'
      });
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen font-sans bg-white text-neutral-900 selection:bg-amber-100 selection:text-amber-900">
      {!isStudio && <Navbar />}
      <main className="flex-grow">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home onInquire={openInquiry} />} />
            <Route path="/properties" element={<Properties onInquire={openInquiry} />} />
            <Route path="/inventory" element={<Inventory onInquire={openInquiry} />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/financing" element={<Financing />} />
            <Route path="/apply-financing" element={<ApplyFinancing />} />
            <Route path="/services" element={<Services />} />
            <Route path="/studio/*" element={<StudioPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      {!isStudio && <Footer />}

      <PropertyDetailsModal 
        isOpen={isInquiryOpen} 
        onClose={() => setIsInquiryOpen(false)} 
        property={selectedProperty} 
      />
    </div>
  );
}

export default App;
