import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ChevronDown, ShieldCheck, Zap, Cpu, Compass, ArrowRight, Play } from 'lucide-react';
import { HERO_IMAGE, BRAND_NAME, MODEL_NAME } from '../data/bikeData';

interface HeroSectionProps {
  onExploreClick: () => void;
  onBookTestRideClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreClick,
  onBookTestRideClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Scroll parallax effects
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.25]);
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Floating dust particles effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const particles: { x: number; y: number; radius: number; vx: number; vy: number; alpha: number }[] = [];
    for (let i = 0; i < 65; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 0.5,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -Math.random() * 0.4 - 0.1, // floating gently upward like morning mist dust
        alpha: Math.random() * 0.6 + 0.2,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.y < 0) p.y = height;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(163, 230, 53, ${p.alpha * 0.4})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#A3E635';
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Mouse parallax handler
  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 20;
    const y = (clientY / innerHeight - 0.5) * 20;
    setMousePos({ x, y });
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full h-screen min-h-[750px] overflow-hidden flex items-center justify-center bg-[#0B0C0E]"
    >
      {/* Background Image with Slow Zoom & Mouse Parallax */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{
          scale: imageScale,
          y: imageY,
          x: mousePos.x * 0.5,
        }}
      >
        <img
          src={HERO_IMAGE}
          alt="KRAFTWERK Electric Mountain Bike standing overlooking Berlin forests at sunrise"
          className="w-full h-full object-cover object-center filter brightness-90 contrast-105"
          referrerPolicy="no-referrer"
        />

        {/* Multi-layered Cinematic Gradients & Light Rays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C0E] via-[#0B0C0E]/40 to-[#0B0C0E]/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0C0E]/90 via-[#0B0C0E]/30 to-transparent" />
        
        {/* Soft Animated Light Rays Overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-30 animate-light-ray bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-lime-400/20 via-emerald-950/10 to-transparent" />
      </motion.div>

      {/* Floating Canvas Dust Particles */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-10" />

      {/* Hero Content Overlay */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-20 pb-12 flex flex-col justify-between h-full"
      >
        {/* Top Tagline Badge */}
        <div className="pt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md text-xs font-tech tracking-wider text-slate-200"
          >
            <span className="w-2 h-2 rounded-full bg-lime-accent animate-pulse shadow-lime-glow" />
            <span>BERLIN GERMAN ENGINEERING • FULL SUSPENSION E-MTB</span>
          </motion.div>
        </div>

        {/* Main Headline & Subheadline */}
        <div className="max-w-4xl my-auto">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white leading-[1.05] font-display"
          >
            Engineered in Berlin.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-lime-accent">
              Built for Every Trail.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-6 text-base sm:text-xl text-slate-300 max-w-2xl font-normal leading-relaxed"
          >
            Experience premium German engineering designed to conquer every climb, descent, and adventure. 800Wh integrated power, 90Nm torque, monocoque carbon frame.
          </motion.p>

          {/* Key Feature Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-8 flex flex-wrap gap-2.5 sm:gap-4 text-xs font-tech text-slate-300"
          >
            {[
              'Carbon Monocoque Frame',
              '160mm Active Suspension',
              'Integrated 800Wh Battery',
              '90Nm Vector Engine',
              'Hydraulic 4-Piston Brakes',
            ].map((feature, i) => (
              <span
                key={i}
                className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm flex items-center gap-1.5"
              >
                <span className="w-1 h-1 rounded-full bg-lime-accent" />
                {feature}
              </span>
            ))}
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
          >
            <button
              onClick={onExploreClick}
              data-cursor="EXPLORE"
              className="px-8 py-4 rounded-full bg-lime-accent text-black font-extrabold text-sm tracking-wide shadow-lime-glow hover:shadow-lime-glow-strong hover:bg-lime-400 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              Explore the Bike
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onBookTestRideClick}
              data-cursor="RIDE"
              className="px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md text-white font-bold text-sm tracking-wide transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              Book a Test Ride
              <Compass className="w-4 h-4 text-lime-accent" />
            </button>
          </motion.div>
        </div>

        {/* Bottom Bar: Stats Strip & Scroll Prompt */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 pt-6">
          <div className="grid grid-cols-3 gap-6 sm:gap-12 w-full sm:w-auto">
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold font-tech text-white">90 <span className="text-lime-accent text-sm">Nm</span></p>
              <p className="text-[11px] text-slate-400 uppercase font-tech tracking-wider">Vector Torque</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold font-tech text-white">120 <span className="text-lime-accent text-sm">km</span></p>
              <p className="text-[11px] text-slate-400 uppercase font-tech tracking-wider">Max Range</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold font-tech text-white">19.8 <span className="text-lime-accent text-sm">kg</span></p>
              <p className="text-[11px] text-slate-400 uppercase font-tech tracking-wider">Carbon Fiber</p>
            </div>
          </div>

          <a
            href="#about"
            className="flex items-center gap-2 text-xs font-tech uppercase tracking-widest text-slate-400 hover:text-lime-accent transition-colors group"
          >
            <span>Scroll to Discover</span>
            <ChevronDown className="w-4 h-4 text-lime-accent animate-bounce group-hover:translate-y-1 transition-transform" />
          </a>
        </div>
      </motion.div>
    </section>
  );
};
