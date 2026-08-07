import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, MapPin, CheckCircle2, ChevronRight, User, Phone, Mail, Clock } from 'lucide-react';
import { SHOWROOM_LOCATIONS, MODEL_NAME } from '../data/bikeData';
import { TestRideBookingData } from '../types';

interface TestRideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TestRideModal: React.FC<TestRideModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [bookingData, setBookingData] = useState<TestRideBookingData>({
    location: SHOWROOM_LOCATIONS[0].city,
    date: '2026-08-15',
    timeSlot: '11:00 CEST',
    bikeSize: 'M',
    fullName: '',
    email: '',
    phone: '',
    experienceLevel: 'intermediate',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const timeSlots = ['10:00 CEST', '11:30 CEST', '14:00 CEST', '15:30 CEST', '17:00 CEST'];

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

          {!isSubmitted ? (
            <>
              {/* Header */}
              <div className="mb-6">
                <span className="px-3 py-1 rounded-full bg-lime-accent/10 border border-lime-accent/30 text-lime-accent text-xs font-tech font-bold uppercase tracking-wider">
                  BERLIN TEST RIDE EXPERIENCE
                </span>
                <h3 className="text-3xl font-extrabold text-white font-display mt-2">
                  Book a Test Ride
                </h3>
                <p className="text-xs text-slate-400 font-tech mt-1">
                  Experience the KRAFT01 on our outdoor obstacle trail loop.
                </p>
              </div>

              {/* Progress Steps Bar */}
              <div className="flex items-center gap-2 mb-8 pb-4 border-b border-white/10 text-xs font-tech">
                <div className={`flex-1 py-1.5 px-3 rounded-lg border text-center ${step === 1 ? 'bg-lime-accent text-black font-bold border-lime-accent' : 'bg-white/5 border-white/10 text-slate-400'}`}>
                  1. Location & Date
                </div>
                <div className={`flex-1 py-1.5 px-3 rounded-lg border text-center ${step === 2 ? 'bg-lime-accent text-black font-bold border-lime-accent' : 'bg-white/5 border-white/10 text-slate-400'}`}>
                  2. Rider Specs
                </div>
                <div className={`flex-1 py-1.5 px-3 rounded-lg border text-center ${step === 3 ? 'bg-lime-accent text-black font-bold border-lime-accent' : 'bg-white/5 border-white/10 text-slate-400'}`}>
                  3. Contact Info
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {step === 1 && (
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-tech text-slate-400 uppercase">Select Showroom</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                        {SHOWROOM_LOCATIONS.map((loc) => (
                          <button
                            type="button"
                            key={loc.id}
                            onClick={() => setBookingData({ ...bookingData, location: loc.city })}
                            className={`p-3.5 rounded-xl border text-left text-xs transition-all ${
                              bookingData.location === loc.city
                                ? 'bg-lime-accent/10 border-lime-accent text-white shadow-lime-glow'
                                : 'bg-white/5 border-white/10 text-slate-300'
                            }`}
                          >
                            <p className="font-bold font-display text-sm">{loc.city}</p>
                            <p className="text-[11px] text-slate-400 mt-1">{loc.address}</p>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-tech text-slate-400 uppercase">Preferred Date</label>
                        <input
                          type="date"
                          value={bookingData.date}
                          onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                          className="mt-1.5 w-full p-3 rounded-xl bg-white/5 border border-white/15 text-white text-sm focus:border-lime-accent focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-tech text-slate-400 uppercase">Time Slot</label>
                        <select
                          value={bookingData.timeSlot}
                          onChange={(e) => setBookingData({ ...bookingData, timeSlot: e.target.value })}
                          className="mt-1.5 w-full p-3 rounded-xl bg-[#1A1C23] border border-white/15 text-white text-sm focus:border-lime-accent focus:outline-none"
                        >
                          {timeSlots.map((ts) => (
                            <option key={ts} value={ts}>{ts}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="w-full py-3.5 rounded-full bg-lime-accent text-black font-extrabold text-xs shadow-lime-glow flex items-center justify-center gap-2 mt-4"
                    >
                      Next: Rider Geometry <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-tech text-slate-400 uppercase">Select Frame Size</label>
                      <div className="grid grid-cols-4 gap-3 mt-2">
                        {(['S', 'M', 'L', 'XL'] as const).map((sz) => (
                          <button
                            type="button"
                            key={sz}
                            onClick={() => setBookingData({ ...bookingData, bikeSize: sz })}
                            className={`py-3 rounded-xl font-tech font-bold text-sm transition-all border ${
                              bookingData.bikeSize === sz
                                ? 'bg-lime-accent text-black border-lime-accent shadow-lime-glow'
                                : 'bg-white/5 text-slate-300 border-white/10'
                            }`}
                          >
                            {sz}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-tech text-slate-400 uppercase">Mountain Riding Experience</label>
                      <div className="grid grid-cols-3 gap-3 mt-2">
                        {[
                          { id: 'beginner', label: 'Beginner' },
                          { id: 'intermediate', label: 'Intermediate' },
                          { id: 'pro', label: 'Downhill / Pro' },
                        ].map((exp) => (
                          <button
                            type="button"
                            key={exp.id}
                            onClick={() => setBookingData({ ...bookingData, experienceLevel: exp.id as any })}
                            className={`p-3 rounded-xl border text-xs font-tech font-bold transition-all ${
                              bookingData.experienceLevel === exp.id
                                ? 'bg-lime-accent text-black border-lime-accent shadow-lime-glow'
                                : 'bg-white/5 border-white/10 text-slate-300'
                            }`}
                          >
                            {exp.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-3 mt-4">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="w-1/3 py-3.5 rounded-full bg-white/10 text-white font-bold text-xs"
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={() => setStep(3)}
                        className="w-2/3 py-3.5 rounded-full bg-lime-accent text-black font-extrabold text-xs shadow-lime-glow flex items-center justify-center gap-2"
                      >
                        Next: Contact Info <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-tech text-slate-400 uppercase">Full Name</label>
                      <input
                        type="text"
                        required
                        value={bookingData.fullName}
                        onChange={(e) => setBookingData({ ...bookingData, fullName: e.target.value })}
                        placeholder="e.g. Alexander Vance"
                        className="mt-1 w-full p-3 rounded-xl bg-white/5 border border-white/15 text-white text-sm focus:border-lime-accent focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-tech text-slate-400 uppercase">Email Address</label>
                        <input
                          type="email"
                          required
                          value={bookingData.email}
                          onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                          placeholder="alex@example.de"
                          className="mt-1 w-full p-3 rounded-xl bg-white/5 border border-white/15 text-white text-sm focus:border-lime-accent focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-tech text-slate-400 uppercase">Phone Number</label>
                        <input
                          type="tel"
                          required
                          value={bookingData.phone}
                          onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                          placeholder="+49 170 1234567"
                          className="mt-1 w-full p-3 rounded-xl bg-white/5 border border-white/15 text-white text-sm focus:border-lime-accent focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-lime-accent/10 border border-lime-accent/30 text-xs text-slate-200">
                      <p className="font-bold text-lime-accent">TEST RIDE SUMMARY:</p>
                      <p className="mt-1">{bookingData.location} • {bookingData.date} @ {bookingData.timeSlot} • Size {bookingData.bikeSize}</p>
                    </div>

                    <div className="flex gap-3 mt-4">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="w-1/3 py-3.5 rounded-full bg-white/10 text-white font-bold text-xs"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="w-2/3 py-3.5 rounded-full bg-lime-accent text-black font-extrabold text-xs shadow-lime-glow"
                      >
                        Confirm Reservation
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </>
          ) : (
            /* Confirmation State */
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-lime-accent/20 border-2 border-lime-accent text-lime-accent flex items-center justify-center mx-auto shadow-lime-glow-strong">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <h3 className="text-3xl font-extrabold text-white font-display">
                Test Ride Reserved!
              </h3>

              <p className="text-sm text-slate-300 max-w-md mx-auto">
                Vielen Dank, <span className="text-lime-accent font-bold">{bookingData.fullName}</span>. We look forward to welcoming you at our <span className="text-white font-bold">{bookingData.location}</span> showroom on <span className="text-white font-bold">{bookingData.date}</span> at <span className="text-lime-accent font-bold">{bookingData.timeSlot}</span>.
              </p>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-400 max-w-md mx-auto text-left space-y-1">
                <p>• Confirmation email sent to: <span className="text-white">{bookingData.email}</span></p>
                <p>• Please bring a valid ID and helmet (or use one of our KRAFT carbon helmets).</p>
              </div>

              <button
                onClick={onClose}
                className="px-8 py-3 rounded-full bg-lime-accent text-black font-extrabold text-xs shadow-lime-glow mt-6"
              >
                Return to Overview
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
