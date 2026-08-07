import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { Zap, Gauge, Battery, GaugeCircle, Feather, Activity, ArrowUpRight } from 'lucide-react';
import { PERFORMANCE_STATS, TERRAINS_DATA } from '../data/bikeData';

export const PerformanceSection: React.FC = () => {
  const [selectedTerrain, setSelectedTerrain] = useState(TERRAINS_DATA[0]);
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['-15%', '15%']);

  return (
    <section
      id="performance"
      ref={sectionRef}
      className="relative py-32 bg-[#0B0C0E] overflow-hidden text-slate-100 border-t border-white/5"
    >
      {/* Background Dynamic Parallax Photography */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 w-full h-[130%] -top-[15%] pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.img
            key={selectedTerrain.id}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.35, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.8 }}
            src={selectedTerrain.image}
            alt={selectedTerrain.name}
            className="w-full h-full object-cover filter contrast-125 brightness-75"
            referrerPolicy="no-referrer"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C0E] via-[#0B0C0E]/70 to-[#0B0C0E]" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime-accent/10 border border-lime-accent/30 text-lime-accent text-xs font-tech uppercase tracking-widest mb-4">
              <span>02 // Dynamic Telemetry</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-display text-white">
              Unrivaled Performance.
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-slate-300 max-w-md text-sm sm:text-base leading-relaxed">
            Tested on extreme European terrain. High-density torque curves meet active dampening for total trail command.
          </p>
        </div>

        {/* Animated Performance Numbers Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-20">
          {PERFORMANCE_STATS.map((stat, idx) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="p-5 rounded-2xl glass-panel glass-panel-hover flex flex-col justify-between"
            >
              <div className="text-xs font-tech text-slate-400 uppercase tracking-wider">{stat.label}</div>
              <div className="my-3 flex items-baseline gap-1">
                <span className="text-3xl sm:text-4xl font-extrabold font-tech text-white">{stat.value}</span>
                <span className="text-sm font-bold text-lime-accent">{stat.unit}</span>
              </div>
              <p className="text-[11px] text-slate-400 line-clamp-2 leading-tight">{stat.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Terrain Simulator / Performance Test Switcher */}
        <div className="p-8 sm:p-10 rounded-3xl glass-panel border border-white/15 backdrop-blur-2xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8 pb-6 border-b border-white/10">
            <div>
              <span className="text-xs font-tech text-lime-accent uppercase tracking-widest">Select Real-world Test Terrain</span>
              <h3 className="text-2xl font-extrabold text-white font-display mt-1">
                Real-Time Efficiency Vector
              </h3>
            </div>

            {/* Terrain Tabs */}
            <div className="flex flex-wrap gap-2">
              {TERRAINS_DATA.map((terrain) => (
                <button
                  key={terrain.id}
                  onClick={() => setSelectedTerrain(terrain)}
                  className={`px-4 py-2 rounded-xl text-xs font-tech font-bold transition-all flex items-center gap-2 ${
                    selectedTerrain.id === terrain.id
                      ? 'bg-lime-accent text-black shadow-lime-glow'
                      : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
                  }`}
                >
                  <span>{terrain.name}</span>
                  <span className="text-[10px] opacity-75">{terrain.elevation}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Active Terrain Details Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-tech text-slate-400">
                <span className="w-2 h-2 rounded-full bg-lime-accent" />
                <span>{selectedTerrain.location}</span>
                <span className="text-slate-600">•</span>
                <span className="text-lime-accent">{selectedTerrain.difficulty}</span>
              </div>

              <p className="text-lg text-slate-200 leading-relaxed font-sans">
                "{selectedTerrain.description}"
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-[10px] font-tech text-slate-400 uppercase">Max Speed Tested</p>
                  <p className="text-2xl font-bold font-tech text-white mt-1">{selectedTerrain.topSpeed}</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-[10px] font-tech text-slate-400 uppercase">Energy Efficiency</p>
                  <p className="text-2xl font-bold font-tech text-lime-accent mt-1">{selectedTerrain.efficiency}</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 col-span-2 sm:col-span-1">
                  <p className="text-[10px] font-tech text-slate-400 uppercase">Elevation Gain</p>
                  <p className="text-2xl font-bold font-tech text-white mt-1">{selectedTerrain.elevation}</p>
                </div>
              </div>
            </div>

            {/* Live Telemetry Visualizer Card */}
            <div className="lg:col-span-5 p-6 rounded-2xl bg-[#13161C] border border-white/10 flex flex-col justify-between space-y-4">
              <div className="flex items-center justify-between text-xs font-tech text-slate-400 border-b border-white/10 pb-3">
                <span className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-lime-accent animate-pulse" />
                  KRAFT-TELEMETRY LOG
                </span>
                <span className="text-lime-accent">ACTIVE SYNC</span>
              </div>

              {/* Dynamic Waveform Graph simulation */}
              <div className="h-28 flex items-end justify-between gap-1.5 px-2">
                {[40, 65, 85, 50, 95, 70, 80, 100, 60, 90, 75, 88, 92, 64, 78, 85, 95, 60].map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: '10%' }}
                    animate={{ height: `${h}%` }}
                    transition={{ duration: 0.6, delay: i * 0.02 }}
                    className="w-full bg-gradient-to-t from-emerald-900 via-lime-500 to-lime-accent rounded-t-sm"
                  />
                ))}
              </div>

              <div className="flex items-center justify-between text-[11px] font-tech text-slate-400 pt-2 border-t border-white/10">
                <span>Motor Temp: 42°C</span>
                <span>Active Dampening: 500 Hz</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
