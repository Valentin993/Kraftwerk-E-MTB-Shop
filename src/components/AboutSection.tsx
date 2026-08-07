import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Cpu, ShieldCheck, Leaf, MapPin, CheckCircle2 } from 'lucide-react';
import { BERLIN_HQ_IMAGE, FRAME_TECH_IMAGE } from '../data/bikeData';

export const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const imageY1 = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);
  const imageY2 = useTransform(scrollYProgress, [0, 1], ['10%', '-10%']);
  const bgTextX = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);

  const pillars = [
    {
      title: 'German Engineering',
      icon: Cpu,
      subtitle: 'Zero Compromise Dynamics',
      description: 'Every weld vector, carbon ply orientation, and motor gear ratio is mathematically optimized in our Berlin testing facility for peak kinetic efficiency.',
    },
    {
      title: 'Precision Manufacturing',
      icon: ShieldCheck,
      subtitle: 'Aerospace-Grade Tolerances',
      description: 'Hand-laid T1000 carbon fiber frames cured under high-pressure autoclaves to eliminate void pockets and maximize strength-to-weight ratio.',
    },
    {
      title: 'Sustainable Innovation',
      icon: Leaf,
      subtitle: '100% Recyclable Battery & Frame Core',
      description: 'Zero CO2 manufacturing footprint powered by Berlin solar arrays and closed-loop aluminum and carbon recycling partnerships across Germany.',
    },
    {
      title: 'Designed in Berlin',
      icon: MapPin,
      subtitle: 'Modern Industrial Craftsmanship',
      description: 'Drawing inspiration from Bauhaus principles and Berlin’s brutalist-modernist architecture to create clean, functional art on two wheels.',
    },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-28 bg-[#0D0F12] overflow-hidden text-slate-100 border-t border-white/5"
    >
      {/* Background Floating Typography */}
      <motion.div
        style={{ x: bgTextX }}
        className="absolute top-10 left-0 whitespace-nowrap text-[18vw] font-extrabold text-white/[0.02] select-none pointer-events-none font-display uppercase"
      >
        BERLIN ENGINEERING KRAFTWERK
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 pb-8 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime-accent/10 border border-lime-accent/30 text-lime-accent text-xs font-tech uppercase tracking-widest mb-4">
              <span>01 // Brand Philosophy</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-display text-white">
              The Berlin Standard.
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-slate-400 max-w-md text-sm sm:text-base leading-relaxed">
            Born in Berlin’s creative and technical epicenter. We combine German engineering discipline with raw mountain performance.
          </p>
        </div>

        {/* Editorial Layout: Large Imagery + Pillar Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Stacked Parallax Photography */}
          <div className="lg:col-span-6 relative">
            {/* Primary HQ Studio Image */}
            <motion.div style={{ y: imageY1 }} className="relative z-10 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <img
                src={BERLIN_HQ_IMAGE}
                alt="Berlin KRAFTWERK engineering studio and craftsmanship lab"
                className="w-full h-[480px] object-cover filter brightness-95 hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl glass-panel">
                <p className="text-xs font-tech text-lime-accent uppercase tracking-wider">KRAFTWERK Studio Mitte</p>
                <p className="text-sm font-bold text-white mt-1">Schönhauser Allee 172 • Berlin, Germany</p>
              </div>
            </motion.div>

            {/* Overlapping Secondary Tech Detail Image */}
            <motion.div
              style={{ y: imageY2 }}
              className="absolute -bottom-10 -right-6 w-3/5 rounded-2xl overflow-hidden border-2 border-lime-accent/30 shadow-2xl z-20 hidden sm:block"
            >
              <img
                src={FRAME_TECH_IMAGE}
                alt="Precision carbon bike frame engineering detail"
                className="w-full h-56 object-cover filter contrast-110"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>

          {/* Right Column: Pillars Cards */}
          <div className="lg:col-span-6 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {pillars.map((pillar, index) => {
                const IconComponent = pillar.icon;
                return (
                  <motion.div
                    key={pillar.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="p-6 rounded-2xl glass-panel glass-panel-hover flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-lime-accent/10 border border-lime-accent/30 text-lime-accent flex items-center justify-center mb-4">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-extrabold text-white font-display">{pillar.title}</h3>
                      <p className="text-xs font-tech text-lime-accent tracking-wider uppercase mt-1">
                        {pillar.subtitle}
                      </p>
                      <p className="text-xs text-slate-400 leading-relaxed mt-3">{pillar.description}</p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-2 text-[11px] font-tech text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-lime-accent" />
                      <span>Certified German Engineering</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
