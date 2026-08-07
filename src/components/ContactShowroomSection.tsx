import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { MapPin, Phone, Clock, Mail, Navigation, Calendar, Compass, ExternalLink } from 'lucide-react';
import { SHOWROOM_LOCATIONS, BERLIN_HQ_IMAGE } from '../data/bikeData';

interface ContactShowroomSectionProps {
  onBookTestRideClick: () => void;
}

export const ContactShowroomSection: React.FC<ContactShowroomSectionProps> = ({
  onBookTestRideClick,
}) => {
  const [selectedLocation, setSelectedLocation] = useState(SHOWROOM_LOCATIONS[0]);
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  return (
    <section
      id="showroom"
      ref={sectionRef}
      className="relative py-32 bg-[#0D0F12] text-slate-100 border-t border-white/5 overflow-hidden"
    >
      {/* Cinematic Parallax Background */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 w-full h-[120%] -top-[10%] pointer-events-none">
        <img
          src={selectedLocation.image}
          alt={selectedLocation.city}
          className="w-full h-full object-cover filter brightness-40 contrast-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0F12] via-[#0D0F12]/80 to-[#0D0F12]" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime-accent/10 border border-lime-accent/30 text-lime-accent text-xs font-tech uppercase tracking-widest mb-4">
              <span>07 // Berlin HQ & Showrooms</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-display text-white">
              Visit Berlin Headquarters.
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-slate-300 max-w-md text-sm sm:text-base leading-relaxed">
            Test ride the KRAFT01 on specialized obstacle tracks or consult with our lead development engineers.
          </p>
        </div>

        {/* Showroom & Location Interactive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Left Column: Showroom Selector & Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <label className="text-xs font-tech text-slate-400 uppercase tracking-wider block">Select Showroom Location</label>
              <div className="grid grid-cols-1 gap-3">
                {SHOWROOM_LOCATIONS.map((loc) => (
                  <button
                    key={loc.id}
                    onClick={() => setSelectedLocation(loc)}
                    className={`p-5 rounded-2xl border text-left transition-all ${
                      selectedLocation.id === loc.id
                        ? 'bg-lime-accent/10 border-lime-accent text-white shadow-lime-glow'
                        : 'bg-white/5 border-white/10 hover:border-white/20 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold font-display text-white">{loc.city}</h3>
                      <span className="text-[10px] font-tech text-lime-accent px-2 py-0.5 rounded bg-lime-accent/10">
                        {loc.coordinates}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-2 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-lime-accent" />
                      {loc.address}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Active Location Info Card */}
            <div className="p-6 rounded-2xl glass-panel border border-white/10 space-y-4">
              <div className="flex items-center gap-3 text-sm text-slate-200">
                <Clock className="w-4 h-4 text-lime-accent" />
                <span>{selectedLocation.hours}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-200">
                <Phone className="w-4 h-4 text-lime-accent" />
                <span>{selectedLocation.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-200">
                <Mail className="w-4 h-4 text-lime-accent" />
                <span>berlin@kraftwerk-bikes.de</span>
              </div>

              <div className="pt-4 border-t border-white/10">
                <button
                  onClick={onBookTestRideClick}
                  className="w-full py-3.5 rounded-full bg-lime-accent hover:bg-lime-400 text-black font-extrabold text-sm shadow-lime-glow flex items-center justify-center gap-2 transition-transform"
                >
                  <Calendar className="w-4 h-4" />
                  Schedule Berlin Test Ride
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Simulated Interactive Map Canvas Frame */}
          <div className="lg:col-span-7 rounded-3xl glass-panel border border-white/15 p-6 relative overflow-hidden flex flex-col justify-between min-h-[420px]">
            {/* Map Frame Graphic */}
            <div className="absolute inset-0 bg-[#0B0D10] opacity-90 p-4">
              {/* Map grid lines simulation */}
              <div className="w-full h-full border border-white/10 rounded-2xl relative overflow-hidden bg-[radial-gradient(#272A30_1px,transparent_1px)] [background-size:16px_16px]">
                {/* Simulated Pins */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center animate-bounce">
                  <div className="w-12 h-12 rounded-full bg-lime-accent/20 border-2 border-lime-accent flex items-center justify-center shadow-lime-glow-strong mx-auto">
                    <MapPin className="w-6 h-6 text-lime-accent fill-lime-accent" />
                  </div>
                  <span className="inline-block mt-2 px-3 py-1 rounded-md bg-black/90 border border-lime-accent text-[11px] font-tech text-white">
                    {selectedLocation.city}
                  </span>
                </div>
              </div>
            </div>

            {/* Map Controls */}
            <div className="relative z-10 flex items-center justify-between text-xs font-tech text-slate-400 p-2 bg-black/60 backdrop-blur-md rounded-xl border border-white/10">
              <span className="flex items-center gap-2">
                <Navigation className="w-4 h-4 text-lime-accent" />
                GPS COORDS: {selectedLocation.coordinates}
              </span>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(selectedLocation.address)}`}
                target="_blank"
                rel="noreferrer"
                className="text-lime-accent flex items-center gap-1 hover:underline"
              >
                Open Google Maps <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Bottom Map Note */}
            <div className="relative z-10 p-4 rounded-xl bg-black/80 backdrop-blur-md border border-white/10 text-xs text-slate-300">
              <span className="font-bold text-lime-accent">SHOWROOM PROXIMITY: </span>
              Includes access to Berlin’s Grunewald outdoor test loop with high-grade dirt jumps, rock steps, and steep incline ramps.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
