import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Compass, Shield, Sparkles } from 'lucide-react';
import { HERO_IMAGE } from '../data/bikeData';

interface FinalCTASectionProps {
  onOrderNowClick: () => void;
  onVisitShowroomClick: () => void;
}

export const FinalCTASection: React.FC<FinalCTASectionProps> = ({
  onOrderNowClick,
  onVisitShowroomClick,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['-15%', '15%']);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[640px] py-32 bg-[#0B0C0E] text-slate-100 overflow-hidden flex items-center justify-center border-t border-white/10"
    >
      {/* Background Mountain Landscape with Parallax & Subtle Light Rays */}
      <motion.div style={{ y: bgY, scale: bgScale }} className="absolute inset-0 w-full h-[125%] -top-[10%] pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1511994298241-608e28f14fde?auto=format&fit=crop&q=80&w=1600"
          alt="Dramatic mountain trail landscape"
          className="w-full h-full object-cover filter contrast-110 brightness-50"
          referrerPolicy="no-referrer"
        />

        {/* Gradient Overlay & Light Rays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C0E] via-[#0B0C0E]/60 to-[#0B0C0E]" />
        <div className="absolute inset-0 pointer-events-none opacity-30 animate-light-ray bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-lime-400/20 via-transparent to-transparent" />
      </motion.div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Animated Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-lime-accent/10 border border-lime-accent/40 backdrop-blur-md text-xs font-tech font-bold text-lime-accent uppercase tracking-widest mb-6"
        >
          <Sparkles className="w-3.5 h-3.5 animate-spin" />
          <span>FLAGSHIP GERMAN E-MTB // KRAFT01</span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight font-display text-white leading-tight"
        >
          Designed in Berlin.{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-lime-accent">
            Ready for Every Adventure.
          </span>
        </motion.h2>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-6 text-base sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed"
        >
          Discover the next generation of premium electric mountain bikes. Built with zero compromise for rider control and endurance.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={onOrderNowClick}
            data-cursor="ORDER"
            className="w-full sm:w-auto px-9 py-4 rounded-full bg-lime-accent hover:bg-lime-400 text-black font-extrabold text-sm tracking-wide shadow-lime-glow hover:shadow-lime-glow-strong transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            Order Now
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onVisitShowroomClick}
            data-cursor="BERLIN"
            className="w-full sm:w-auto px-9 py-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md text-white font-bold text-sm tracking-wide transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            Visit Our Berlin Showroom
            <Compass className="w-4 h-4 text-lime-accent" />
          </button>
        </motion.div>

        {/* Guarantee strip */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-8 text-xs font-tech text-slate-400">
          <span className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-lime-accent" />
            5-Year Carbon Frame & Motor Warranty
          </span>
          <span>•</span>
          <span>Free Express Delivery Across EU</span>
          <span>•</span>
          <span>30-Day Trail Trial Guarantee</span>
        </div>
      </div>
    </section>
  );
};
