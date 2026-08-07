import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Check, ShieldCheck, MapPin } from 'lucide-react';
import { BRAND_NAME, MODEL_NAME } from '../data/bikeData';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#08090B] text-slate-400 border-t border-white/10 pt-20 pb-12 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-lime-accent text-black font-extrabold flex items-center justify-center font-display text-lg shadow-lime-glow">
                KW
              </div>
              <span className="font-display font-extrabold text-2xl tracking-tight text-white">
                {BRAND_NAME}
              </span>
            </div>

            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Berlin-based manufacturer of high-performance full-suspension electric mountain bikes. German precision engineering built for conquering every trail.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs font-tech text-lime-accent">
              <MapPin className="w-3.5 h-3.5" />
              <span>Schönhauser Allee 172 • 10119 Berlin, Germany</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-3 grid grid-cols-2 gap-6 text-xs font-tech">
            <div className="space-y-3">
              <p className="text-white font-bold uppercase tracking-wider">Explore</p>
              <ul className="space-y-2">
                <li><a href="#hero" className="hover:text-lime-accent transition-colors">Overview</a></li>
                <li><a href="#about" className="hover:text-lime-accent transition-colors">About Berlin HQ</a></li>
                <li><a href="#performance" className="hover:text-lime-accent transition-colors">Telemetry</a></li>
                <li><a href="#technology" className="hover:text-lime-accent transition-colors">Technology</a></li>
              </ul>
            </div>

            <div className="space-y-3">
              <p className="text-white font-bold uppercase tracking-wider">Experience</p>
              <ul className="space-y-2">
                <li><a href="#gallery" className="hover:text-lime-accent transition-colors">Gallery</a></li>
                <li><a href="#specs" className="hover:text-lime-accent transition-colors">Configurator</a></li>
                <li><a href="#testimonials" className="hover:text-lime-accent transition-colors">Rider Reviews</a></li>
                <li><a href="#showroom" className="hover:text-lime-accent transition-colors">Berlin Showroom</a></li>
              </ul>
            </div>
          </div>

          {/* Newsletter Form */}
          <div className="lg:col-span-4 space-y-4">
            <p className="text-xs font-tech text-white font-bold uppercase tracking-wider">
              Trail Intelligence Newsletter
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              Subscribe to receive over-the-air firmware update releases, Berlin trail guides, and exclusive test ride event invites.
            </p>

            {!subscribed ? (
              <form onSubmit={handleSubscribe} className="flex items-center gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="enter email address"
                  className="w-full p-3 rounded-xl bg-white/5 border border-white/15 text-white text-xs font-tech focus:border-lime-accent focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-5 py-3 rounded-xl bg-lime-accent text-black font-tech font-bold text-xs shadow-lime-glow shrink-0 hover:bg-lime-400"
                >
                  Join
                </button>
              </form>
            ) : (
              <div className="p-3 rounded-xl bg-lime-accent/10 border border-lime-accent/30 text-lime-accent text-xs font-tech flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>Willkommen! Subscribed to Berlin Dispatch.</span>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-tech text-slate-500">
          <p>© {new Date().getFullYear()} KRAFTWERK E-Bikes GmbH. Designed & Engineered in Berlin.</p>
          <div className="flex items-center gap-6">
            <a href="#specs" className="hover:text-slate-300">Impressum</a>
            <a href="#specs" className="hover:text-slate-300">Datenschutz</a>
            <a href="#specs" className="hover:text-slate-300">ISO 9001 Quality</a>
            <span className="text-lime-accent">DIN EN 15194 Certified</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
