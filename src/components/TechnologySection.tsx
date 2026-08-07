import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cpu, Zap, Radio, Smartphone, Navigation, ShieldAlert, X, ChevronRight, Check } from 'lucide-react';
import { TECHNOLOGY_CARDS } from '../data/bikeData';
import { TechnologyCardData } from '../types';

export const TechnologySection: React.FC = () => {
  const [activeModalCard, setActiveModalCard] = useState<TechnologyCardData | null>(null);

  return (
    <section
      id="technology"
      className="relative py-32 bg-[#0D0F12] text-slate-100 border-t border-white/5 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime-accent/10 border border-lime-accent/30 text-lime-accent text-xs font-tech uppercase tracking-widest mb-4">
              <span>03 // Innovation Suite</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-display text-white">
              Proprietary Technology.
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-slate-400 max-w-md text-sm sm:text-base leading-relaxed">
            Every subsystem is custom engineered in Berlin to function as one unified, intelligent mountain performance machine.
          </p>
        </div>

        {/* Technology Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TECHNOLOGY_CARDS.map((card, idx) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              onClick={() => setActiveModalCard(card)}
              data-cursor="SPECS"
              className="group cursor-pointer rounded-3xl overflow-hidden glass-panel glass-panel-hover border border-white/10 flex flex-col justify-between"
            >
              {/* Card Image with Parallax Hover Zoom */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 filter brightness-90 contrast-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#16181D] via-transparent to-black/30" />
                
                {/* Tag Badge */}
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[11px] font-tech text-lime-accent font-semibold">
                  {card.tag}
                </div>

                {/* Key Metric Badge */}
                <div className="absolute bottom-4 right-4 px-3.5 py-1.5 rounded-xl bg-lime-accent text-black font-tech font-extrabold text-sm shadow-lime-glow">
                  {card.spec}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <p className="text-xs font-tech text-slate-400 uppercase tracking-wider">{card.subtitle}</p>
                  <h3 className="text-2xl font-extrabold text-white font-display mt-1 group-hover:text-lime-accent transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs text-slate-300 mt-3 leading-relaxed">{card.description}</p>
                </div>

                {/* Bottom View Tech Specs Trigger */}
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-tech font-bold text-lime-accent">
                  <span>INSPECT SUBSYSTEM</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Subsystem Inspection Detail Modal */}
      <AnimatePresence>
        {activeModalCard && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-[#13151A] rounded-3xl border border-white/20 p-6 sm:p-8 overflow-hidden shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveModalCard(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-1 rounded-full bg-lime-accent/10 border border-lime-accent/30 text-lime-accent text-xs font-tech font-bold">
                  {activeModalCard.tag}
                </span>
                <span className="text-xs font-tech text-slate-400">{activeModalCard.subtitle}</span>
              </div>

              <h3 className="text-3xl font-extrabold text-white font-display">{activeModalCard.title}</h3>
              <p className="text-sm text-slate-300 mt-3 leading-relaxed">{activeModalCard.description}</p>

              {/* Subsystem Image Banner */}
              <div className="my-6 h-48 rounded-2xl overflow-hidden border border-white/10 relative">
                <img
                  src={activeModalCard.image}
                  alt={activeModalCard.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#13151A] via-transparent to-transparent" />
              </div>

              {/* Technical Specifications Grid */}
              <div className="grid grid-cols-2 gap-4">
                {activeModalCard.detailSpecs.map((ds, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                    <p className="text-[10px] font-tech text-slate-400 uppercase">{ds.label}</p>
                    <p className="text-sm font-bold text-white font-tech mt-1">{ds.value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-4 border-t border-white/10 flex justify-end">
                <button
                  onClick={() => setActiveModalCard(null)}
                  className="px-6 py-2.5 rounded-full bg-lime-accent text-black font-extrabold text-xs shadow-lime-glow"
                >
                  Close Specification
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
