import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Check, Cpu, ShieldCheck, ShoppingCart, Sliders } from 'lucide-react';
import { FULL_SPECIFICATIONS, COLOR_OPTIONS, MODEL_NAME } from '../data/bikeData';

interface SpecificationsSectionProps {
  onPreOrderClick: () => void;
  currency: 'EUR' | 'USD' | 'GBP';
}

export const SpecificationsSection: React.FC<SpecificationsSectionProps> = ({
  onPreOrderClick,
  currency,
}) => {
  const [selectedColor, setSelectedColor] = useState(COLOR_OPTIONS[0]);
  const [selectedSize, setSelectedSize] = useState<'S' | 'M' | 'L' | 'XL'>('M');

  const currencySymbol = currency === 'EUR' ? '€' : currency === 'USD' ? '$' : '£';
  const conversionRate = currency === 'EUR' ? 1 : currency === 'USD' ? 1.08 : 0.85;
  const basePrice = 5394;
  const totalPrice = Math.round((basePrice + selectedColor.priceDelta) * conversionRate);

  return (
    <section
      id="specs"
      className="relative py-32 bg-[#0D0F12] text-slate-100 border-t border-white/5 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime-accent/10 border border-lime-accent/30 text-lime-accent text-xs font-tech uppercase tracking-widest mb-4">
              <span>05 // Technical Manifest</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-display text-white">
              Specifications & Config.
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-slate-400 max-w-md text-sm sm:text-base leading-relaxed">
            Full component breakdown. Hand-selected premium European drivetrain, braking, and chassis elements.
          </p>
        </div>

        {/* Interactive Configurator Box */}
        <div className="mb-20 p-8 sm:p-10 rounded-3xl glass-panel border border-white/15 bg-gradient-to-br from-[#16181D]/90 via-[#13151A] to-[#0B0C0E]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Color Visualizer Canvas / Preview */}
            <div className="lg:col-span-7 flex flex-col items-center justify-center p-6 rounded-2xl bg-[#090A0C] border border-white/10 relative overflow-hidden min-h-[360px]">
              {/* Dynamic Glow matching selected color */}
              <div
                className="absolute w-80 h-80 rounded-full filter blur-[100px] opacity-25 transition-all duration-700"
                style={{ backgroundColor: selectedColor.id === 'lime' ? '#A3E635' : selectedColor.id === 'forest' ? '#10B981' : '#38BDF8' }}
              />

              <div className="relative z-10 text-center space-y-4">
                <span className="text-xs font-tech text-lime-accent uppercase tracking-widest">{MODEL_NAME}</span>
                <h3 className="text-3xl font-extrabold text-white font-display">{selectedColor.name}</h3>
                <p className="text-xs text-slate-400 max-w-md">{selectedColor.description}</p>

                {/* Bike Render Graphic Placeholder Badge */}
                <div className="mt-6 inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/10 border border-white/15 text-xs font-tech font-bold text-slate-200">
                  <span className="w-3 h-3 rounded-full border border-white" style={{ backgroundColor: selectedColor.colorCode }} />
                  <span>FRAME FINISH: {selectedColor.name.toUpperCase()}</span>
                </div>
              </div>
            </div>

            {/* Controls: Color Selector, Size Selector, Price & CTA */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <label className="text-xs font-tech text-slate-400 uppercase tracking-wider block mb-3">1. Select Frame Finish</label>
                <div className="space-y-2.5">
                  {COLOR_OPTIONS.map((col) => (
                    <button
                      key={col.id}
                      onClick={() => setSelectedColor(col)}
                      className={`w-full p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between ${
                        selectedColor.id === col.id
                          ? 'bg-lime-accent/10 border-lime-accent text-white shadow-lime-glow'
                          : 'bg-white/5 border-white/10 hover:border-white/20 text-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-5 h-5 rounded-full border border-white/30" style={{ backgroundColor: col.colorCode }} />
                        <span className="text-sm font-bold font-display">{col.name}</span>
                      </div>
                      <span className="text-xs font-tech text-lime-accent">
                        {col.priceDelta === 0 ? 'Included' : `+${currencySymbol}${Math.round(col.priceDelta * conversionRate)}`}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-tech text-slate-400 uppercase tracking-wider block mb-3">2. Select Frame Geometry Size</label>
                <div className="grid grid-cols-4 gap-2">
                  {(['S', 'M', 'L', 'XL'] as const).map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`py-3 rounded-xl font-tech font-bold text-sm transition-all border ${
                        selectedSize === sz
                          ? 'bg-lime-accent text-black border-lime-accent shadow-lime-glow'
                          : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price & Pre-Order Button */}
              <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-tech text-slate-400 uppercase">Estimated Total</p>
                  <p className="text-3xl font-extrabold text-white font-tech mt-0.5">
                    {currencySymbol}{totalPrice.toLocaleString()}
                  </p>
                </div>

                <button
                  onClick={onPreOrderClick}
                  data-cursor="ORDER"
                  className="px-8 py-3.5 rounded-full bg-lime-accent hover:bg-lime-400 text-black font-extrabold text-sm shadow-lime-glow flex items-center gap-2 transition-transform hover:scale-105"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Order KRAFT01
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Full Specifications Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FULL_SPECIFICATIONS.map((spec, idx) => (
            <motion.div
              key={spec.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="p-6 rounded-2xl glass-panel glass-panel-hover flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-tech text-lime-accent uppercase tracking-widest px-2.5 py-1 rounded-md bg-lime-accent/10 border border-lime-accent/20">
                  {spec.category}
                </span>
                <h4 className="text-sm font-tech text-slate-400 uppercase tracking-wider mt-3">{spec.title}</h4>
                <p className="text-xl font-extrabold text-white font-display mt-1">{spec.value}</p>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">{spec.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
