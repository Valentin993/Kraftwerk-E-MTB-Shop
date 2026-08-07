import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp } from 'lucide-react';

export const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="fixed bottom-8 right-8 z-50 p-3.5 rounded-2xl bg-[#0A0A0A]/85 backdrop-blur-xl border border-lime-accent/40 text-lime-accent hover:bg-lime-accent hover:text-black transition-all shadow-[0_0_25px_rgba(163,230,53,0.25)] hover:shadow-[0_0_35px_rgba(163,230,53,0.5)] flex items-center gap-2 group cursor-pointer"
        >
          <ArrowUp className="w-5 h-5 transition-transform group-hover:-translate-y-0.5" />
          <span className="text-[10px] font-tech font-extrabold uppercase tracking-widest hidden sm:inline-block pr-1">
            TOP
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
};
