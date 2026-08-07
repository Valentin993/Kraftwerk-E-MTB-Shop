import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement | null;
      if (target) {
        const interactiveEl = target.closest('[data-cursor]');
        if (interactiveEl) {
          const text = interactiveEl.getAttribute('data-cursor');
          setCursorText(text || 'EXPLORE');
          setIsHovered(true);
        } else if (target.closest('button, a, input, select')) {
          setCursorText('');
          setIsHovered(true);
        } else {
          setIsHovered(false);
          setCursorText('');
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Hide on mobile touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      {/* Main Cursor Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full mix-blend-difference bg-lime-accent"
        animate={{
          x: mousePosition.x - (isHovered ? 24 : 6),
          y: mousePosition.y - (isHovered ? 24 : 6),
          width: isHovered ? (cursorText ? 70 : 36) : 12,
          height: isHovered ? (cursorText ? 70 : 36) : 12,
          opacity: 0.9,
        }}
        transition={{ type: 'spring', damping: 28, stiffness: 350, mass: 0.2 }}
      >
        {cursorText && (
          <span className="w-full h-full flex items-center justify-center text-[10px] font-bold tracking-widest text-black uppercase font-tech">
            {cursorText}
          </span>
        )}
      </motion.div>

      {/* Outer Follower Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full border border-lime-accent/40"
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
          scale: isHovered ? 1.5 : 1,
          opacity: isHovered ? 0.6 : 0.2,
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 180, mass: 0.5 }}
        style={{ width: 40, height: 40 }}
      />
    </>
  );
};
