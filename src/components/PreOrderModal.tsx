import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, ShieldCheck, ShoppingCart, Sparkles, CreditCard } from 'lucide-react';
import { COLOR_OPTIONS, MODEL_NAME } from '../data/bikeData';

interface PreOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  currency: 'EUR' | 'USD' | 'GBP';
}

export const PreOrderModal: React.FC<PreOrderModalProps> = ({
  isOpen,
  onClose,
  currency,
}) => {
  const [selectedColor, setSelectedColor] = useState(COLOR_OPTIONS[0]);
  const [selectedSize, setSelectedSize] = useState<'S' | 'M' | 'L' | 'XL'>('M');
  const [includeRangeExtender, setIncludeRangeExtender] = useState(false);
  const [includeActiveSuspension, setIncludeActiveSuspension] = useState(true);
  const [step, setStep] = useState<1 | 2>(1);
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [isOrdered, setIsOrdered] = useState(false);

  if (!isOpen) return null;

  const currencySymbol = currency === 'EUR' ? '€' : currency === 'USD' ? '$' : '£';
  const conversionRate = currency === 'EUR' ? 1 : currency === 'USD' ? 1.08 : 0.85;

  const basePrice = 5394;
  const colorPrice = selectedColor.priceDelta;
  const rangeExtenderPrice = includeRangeExtender ? 270 : 0;
  const suspensionPrice = includeActiveSuspension ? 480 : 0;

  const totalPriceEUR = basePrice + colorPrice + rangeExtenderPrice + suspensionPrice;
  const totalPriceConverted = Math.round(totalPriceEUR * conversionRate);

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOrdered(true);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-2xl overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-2xl bg-[#13151A] rounded-3xl border border-white/20 p-6 sm:p-8 shadow-2xl overflow-hidden my-8"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {!isOrdered ? (
            <>
              {/* Header */}
              <div className="mb-6">
                <span className="px-3 py-1 rounded-full bg-lime-accent/10 border border-lime-accent/30 text-lime-accent text-xs font-tech font-bold uppercase tracking-wider">
                  FLAGSHIP DIRECT ORDER
                </span>
                <h3 className="text-3xl font-extrabold text-white font-display mt-2">
                  Order {MODEL_NAME}
                </h3>
                <p className="text-xs text-slate-400 font-tech mt-1">
                  Hand-built in Berlin. Express delivery with 5-year frame warranty.
                </p>
              </div>

              {step === 1 ? (
                /* Step 1: Configurator Options */
                <div className="space-y-6">
                  {/* Finish Selector */}
                  <div>
                    <label className="text-xs font-tech text-slate-400 uppercase tracking-wider block mb-2">Frame Finish</label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {COLOR_OPTIONS.map((col) => (
                        <button
                          key={col.id}
                          type="button"
                          onClick={() => setSelectedColor(col)}
                          className={`p-3 rounded-xl border text-left text-xs transition-all ${
                            selectedColor.id === col.id
                              ? 'bg-lime-accent/10 border-lime-accent text-white shadow-lime-glow'
                              : 'bg-white/5 border-white/10 text-slate-300'
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <span className="w-3.5 h-3.5 rounded-full border border-white/30" style={{ backgroundColor: col.colorCode }} />
                            <p className="font-bold font-display">{col.name}</p>
                          </div>
                          <p className="text-[10px] font-tech text-lime-accent">
                            {col.priceDelta === 0 ? 'Base' : `+${currencySymbol}${Math.round(col.priceDelta * conversionRate)}`}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Size Selector */}
                  <div>
                    <label className="text-xs font-tech text-slate-400 uppercase tracking-wider block mb-2">Frame Size</label>
                    <div className="grid grid-cols-4 gap-2">
                      {(['S', 'M', 'L', 'XL'] as const).map((sz) => (
                        <button
                          key={sz}
                          type="button"
                          onClick={() => setSelectedSize(sz)}
                          className={`py-2.5 rounded-xl font-tech font-bold text-xs transition-all border ${
                            selectedSize === sz
                              ? 'bg-lime-accent text-black border-lime-accent shadow-lime-glow'
                              : 'bg-white/5 text-slate-300 border-white/10'
                          }`}
                        >
                          Size {sz}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Addons */}
                  <div>
                    <label className="text-xs font-tech text-slate-400 uppercase tracking-wider block mb-2">Performance Package Addons</label>
                    <div className="space-y-2">
                      <button
                        type="button"
                        onClick={() => setIncludeActiveSuspension(!includeActiveSuspension)}
                        className={`w-full p-3 rounded-xl border text-left text-xs flex items-center justify-between transition-all ${
                          includeActiveSuspension
                            ? 'bg-lime-accent/10 border-lime-accent text-white'
                            : 'bg-white/5 border-white/10 text-slate-400'
                        }`}
                      >
                        <div>
                          <p className="font-bold text-white">500Hz Active Electronic Air Suspension</p>
                          <p className="text-[11px] text-slate-400">Continuous terrain micro-adjustments</p>
                        </div>
                        <span className="font-tech font-bold text-lime-accent">
                          +{currencySymbol}{Math.round(480 * conversionRate)}
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setIncludeRangeExtender(!includeRangeExtender)}
                        className={`w-full p-3 rounded-xl border text-left text-xs flex items-center justify-between transition-all ${
                          includeRangeExtender
                            ? 'bg-lime-accent/10 border-lime-accent text-white'
                            : 'bg-white/5 border-white/10 text-slate-400'
                        }`}
                      >
                        <div>
                          <p className="font-bold text-white">Water-bottle Cage Range Extender (250Wh)</p>
                          <p className="text-[11px] text-slate-400">Extends max range to 160+ km</p>
                        </div>
                        <span className="font-tech font-bold text-lime-accent">
                          +{currencySymbol}{Math.round(270 * conversionRate)}
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Total & Next */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-tech text-slate-400 uppercase">Configuration Price</p>
                      <p className="text-3xl font-extrabold text-white font-tech">
                        {currencySymbol}{totalPriceConverted.toLocaleString()}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-8 py-3.5 rounded-full bg-lime-accent text-black font-extrabold text-xs shadow-lime-glow"
                    >
                      Proceed to Reservation
                    </button>
                  </div>
                </div>
              ) : (
                /* Step 2: Customer Details & Checkout */
                <form onSubmit={handleOrderSubmit} className="space-y-4">
                  <div>
                    <label className="text-xs font-tech text-slate-400 uppercase">Full Name</label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Karl Richter"
                      className="mt-1 w-full p-3 rounded-xl bg-white/5 border border-white/15 text-white text-sm focus:border-lime-accent focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-tech text-slate-400 uppercase">Email Address</label>
                    <input
                      type="email"
                      required
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      placeholder="karl@berlin.de"
                      className="mt-1 w-full p-3 rounded-xl bg-white/5 border border-white/15 text-white text-sm focus:border-lime-accent focus:outline-none"
                    />
                  </div>

                  {/* Summary Box */}
                  <div className="p-4 rounded-xl bg-lime-accent/10 border border-lime-accent/30 text-xs text-slate-200 space-y-1">
                    <p className="font-bold text-lime-accent">ORDER SUMMARY:</p>
                    <p>• {MODEL_NAME} ({selectedColor.name}) • Size {selectedSize}</p>
                    <p>• Active Suspension: {includeActiveSuspension ? 'Included' : 'Standard'}</p>
                    <p>• Range Extender: {includeRangeExtender ? 'Included' : 'None'}</p>
                    <p className="pt-2 text-sm font-bold font-tech text-white">
                      TOTAL: {currencySymbol}{totalPriceConverted.toLocaleString()}
                    </p>
                  </div>

                  <div className="flex gap-3 mt-4">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="w-1/3 py-3.5 rounded-full bg-white/10 text-white font-bold text-xs"
                    >
                      Modify Config
                    </button>
                    <button
                      type="submit"
                      className="w-2/3 py-3.5 rounded-full bg-lime-accent text-black font-extrabold text-xs shadow-lime-glow flex items-center justify-center gap-2"
                    >
                      <CreditCard className="w-4 h-4" />
                      Place Priority Order
                    </button>
                  </div>
                </form>
              )}
            </>
          ) : (
            /* Order Success State */
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-lime-accent/20 border-2 border-lime-accent text-lime-accent flex items-center justify-center mx-auto shadow-lime-glow-strong">
                <Check className="w-10 h-10" />
              </div>

              <h3 className="text-3xl font-extrabold text-white font-display">
                Priority Order Placed!
              </h3>

              <p className="text-sm text-slate-300 max-w-md mx-auto">
                Willkommen bei KRAFTWERK, <span className="text-lime-accent font-bold">{customerName}</span>. Your custom built <span className="text-white font-bold">{MODEL_NAME}</span> in <span className="text-white font-bold">{selectedColor.name}</span> (Size {selectedSize}) has been registered in our Berlin build schedule.
              </p>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-400 max-w-md mx-auto text-left space-y-1">
                <p>• Reservation Ref: <span className="text-lime-accent font-tech font-bold">KRAFT-BERLIN-{Math.floor(100000 + Math.random() * 900000)}</span></p>
                <p>• Confirmation & build timeline sent to: <span className="text-white">{customerEmail}</span></p>
                <p>• Estimated Delivery: 10-14 Business Days</p>
              </div>

              <button
                onClick={onClose}
                className="px-8 py-3 rounded-full bg-lime-accent text-black font-extrabold text-xs shadow-lime-glow mt-6"
              >
                Close & Return
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
