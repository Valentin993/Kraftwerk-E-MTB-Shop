import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { PerformanceSection } from './components/PerformanceSection';
import { TechnologySection } from './components/TechnologySection';
import { AdventureGallery } from './components/AdventureGallery';
import { SpecificationsSection } from './components/SpecificationsSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactShowroomSection } from './components/ContactShowroomSection';
import { FinalCTASection } from './components/FinalCTASection';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import { TestRideModal } from './components/TestRideModal';
import { PreOrderModal } from './components/PreOrderModal';
import { ScrollToTop } from './components/ScrollToTop';

export default function App() {
  const [currency, setCurrency] = useState<'EUR' | 'USD' | 'GBP'>('EUR');
  const [isTestRideOpen, setIsTestRideOpen] = useState(false);
  const [isPreOrderOpen, setIsPreOrderOpen] = useState(false);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const handleExploreClick = () => {
    const el = document.getElementById('technology');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleVisitShowroomClick = () => {
    const el = document.getElementById('showroom');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0B0C0E] text-slate-100 selection:bg-[#A3E635] selection:text-black">
      {/* Custom Inertia Follower Cursor */}
      <CustomCursor />

      {/* Sticky Header Navigation */}
      <Navbar
        onOpenTestRide={() => setIsTestRideOpen(true)}
        onOpenPreOrder={() => setIsPreOrderOpen(true)}
        currency={currency}
        setCurrency={setCurrency}
      />

      {/* Main Page Content */}
      <main>
        {/* Fullscreen Cinematic Hero Section */}
        <HeroSection
          onExploreClick={handleExploreClick}
          onBookTestRideClick={() => setIsTestRideOpen(true)}
        />

        {/* About & Brand Philosophy Section */}
        <AboutSection />

        {/* Performance & Live Telemetry Section */}
        <PerformanceSection />

        {/* Subsystem Technology & Proprietary Innovation */}
        <TechnologySection />

        {/* Parallax Adventure Gallery */}
        <AdventureGallery />

        {/* Specifications & Live Configurator */}
        <SpecificationsSection
          onPreOrderClick={() => setIsPreOrderOpen(true)}
          currency={currency}
        />

        {/* Rider Testimonials & Validation */}
        <TestimonialsSection />

        {/* Berlin HQ Showroom & GPS Contact */}
        <ContactShowroomSection
          onBookTestRideClick={() => setIsTestRideOpen(true)}
        />

        {/* Final High-Impact CTA */}
        <FinalCTASection
          onOrderNowClick={() => setIsPreOrderOpen(true)}
          onVisitShowroomClick={handleVisitShowroomClick}
        />
      </main>

      {/* German Minimalist Footer */}
      <Footer />

      {/* Modals */}
      <TestRideModal
        isOpen={isTestRideOpen}
        onClose={() => setIsTestRideOpen(false)}
      />

      <PreOrderModal
        isOpen={isPreOrderOpen}
        onClose={() => setIsPreOrderOpen(false)}
        currency={currency}
      />

      {/* Floating Scroll To Top Button */}
      <ScrollToTop />
    </div>
  );
}
