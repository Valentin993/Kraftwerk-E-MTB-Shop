import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Compass, ChevronRight } from 'lucide-react';

interface NavbarProps {
  onOpenTestRide: () => void;
  onOpenPreOrder: () => void;
  currency: 'EUR' | 'USD' | 'GBP';
  setCurrency: (c: 'EUR' | 'USD' | 'GBP') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenTestRide,
  onOpenPreOrder,
  currency,
  setCurrency,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [berlinTime, setBerlinTime] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      setScrollProgress(totalScroll > 0 ? (currentScroll / totalScroll) * 100 : 0);
      setIsScrolled(currentScroll > 40);
    };

    const updateBerlinTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Europe/Berlin',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      setBerlinTime(now.toLocaleTimeString('de-DE', options) + ' CEST');
    };

    updateBerlinTime();
    const interval = setInterval(updateBerlinTime, 1000);
    window.addEventListener('scroll', handleScroll);

    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLinks = [
    { name: 'Overview', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Performance', href: '#performance' },
    { name: 'Technology', href: '#technology' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Specs', href: '#specs' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Showroom', href: '#showroom' },
  ];

  return (
    <>
      {/* Top Scroll Progress Line */}
      <div className="fixed top-0 left-0 right-0 h-[2px] bg-white/5 z-[100]">
        <div
          className="h-full bg-lime-accent transition-all duration-150 ease-out shadow-[0_0_10px_#A3E635]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <header
        className={`fixed top-0 left-0 right-0 z-[90] transition-all duration-500 ${
          isScrolled
            ? 'py-3 bg-[#0B0C0E]/80 backdrop-blur-xl border-b border-white/10 shadow-2xl'
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="w-full px-4 sm:px-6 lg:px-10 flex items-center justify-between">
          {/* Brand Logo & Berlin Live Stamp */}
          <a href="#hero" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-lime-accent text-black flex items-center justify-center font-bold text-lg font-display tracking-tighter shadow-lime-glow group-hover:scale-105 transition-transform">
              KW
            </div>
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-xl tracking-tight text-white group-hover:text-lime-accent transition-colors">
                KRAFTWERK<span className="text-lime-accent">®</span>
              </span>
              <span className="text-[10px] tracking-widest text-slate-400 font-tech uppercase flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                BERLIN {berlinTime || 'DE'}
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/10 backdrop-blur-md">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-4 py-1.5 rounded-full text-xs font-medium tracking-wide text-slate-300 hover:text-white hover:bg-white/10 transition-all duration-300"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Actions & Controls */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Test Ride Modal Trigger */}
            <button
              onClick={onOpenTestRide}
              className="px-4 py-2 rounded-full text-xs font-semibold text-slate-200 bg-white/10 hover:bg-white/20 border border-white/15 transition-all"
            >
              Book Test Ride
            </button>

            {/* Pre-Order CTA */}
            <button
              onClick={onOpenPreOrder}
              data-cursor="BUY"
              className="px-5 py-2 rounded-full text-xs font-bold text-black bg-lime-accent hover:bg-lime-400 shadow-lime-glow transition-all hover:scale-105 active:scale-95"
            >
              Order KRAFT01
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-white/10 border border-white/15 text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[85] bg-[#0B0C0E]/95 backdrop-blur-2xl pt-24 px-6 pb-8 flex flex-col justify-between lg:hidden"
          >
            <div className="flex flex-col gap-4">
              <span className="text-xs font-tech text-lime-accent tracking-widest uppercase">Navigation</span>
              <div className="grid grid-cols-1 gap-2">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between py-3 border-b border-white/10 text-lg font-display font-medium text-slate-200 hover:text-lime-accent transition-colors"
                  >
                    {link.name}
                    <ChevronRight className="w-5 h-5 text-slate-500" />
                  </a>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3 pt-6 border-t border-white/10">
              <div className="flex items-center justify-between py-2 text-xs text-slate-400">
                <span>BERLIN HQ TIME</span>
                <span className="font-tech text-lime-accent">{berlinTime}</span>
              </div>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenTestRide();
                }}
                className="w-full py-3 rounded-xl bg-white/10 border border-white/20 text-white font-semibold text-sm"
              >
                Book a Test Ride in Berlin
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenPreOrder();
                }}
                className="w-full py-3.5 rounded-xl bg-lime-accent text-black font-extrabold text-sm shadow-lime-glow"
              >
                Order KRAFT01
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
