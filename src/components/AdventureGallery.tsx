import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Maximize2, X, MapPin, Camera } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/bikeData';
import { GalleryItem } from '../types';

export const AdventureGallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'berlin' | 'alpine' | 'singletrack' | 'details'>('all');
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  const categories = [
    { id: 'all', label: 'All Scenes' },
    { id: 'berlin', label: 'Berlin Forests' },
    { id: 'alpine', label: 'Alpine Trails' },
    { id: 'singletrack', label: 'Singletracks' },
    { id: 'details', label: 'Engineering Details' },
  ];

  const filteredItems = selectedCategory === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === selectedCategory);

  return (
    <section
      id="gallery"
      className="relative py-32 bg-[#0B0C0E] text-slate-100 border-t border-white/5 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime-accent/10 border border-lime-accent/30 text-lime-accent text-xs font-tech uppercase tracking-widest mb-4">
              <span>04 // Visual Expedition</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-display text-white">
              Adventure Gallery.
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="mt-6 md:mt-0 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as any)}
                className={`px-4 py-2 rounded-full text-xs font-tech font-bold transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-lime-accent text-black shadow-lime-glow'
                    : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                onClick={() => setLightboxItem(item)}
                data-cursor="VIEW"
                className="group cursor-pointer rounded-3xl overflow-hidden glass-panel border border-white/10 relative h-80 flex flex-col justify-end p-6"
              >
                {/* Background Image */}
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 filter brightness-90 contrast-105"
                  referrerPolicy="no-referrer"
                />

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                {/* Location Badge */}
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10px] font-tech text-slate-300 flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-lime-accent" />
                  {item.location}
                </div>

                {/* Expand Icon */}
                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-4 h-4" />
                </div>

                {/* Text Metadata */}
                <div className="relative z-10">
                  <p className="text-xs font-tech text-lime-accent uppercase tracking-wider">{item.subtitle}</p>
                  <h3 className="text-xl font-extrabold text-white font-display mt-0.5">{item.title}</h3>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Full-Screen Lightbox Viewer */}
      <AnimatePresence>
        {lightboxItem && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-5xl w-full rounded-3xl overflow-hidden border border-white/20 bg-[#0B0C0E] shadow-2xl flex flex-col max-h-[90vh]"
            >
              {/* Lightbox Header */}
              <div className="p-4 px-6 border-b border-white/10 flex items-center justify-between bg-black/40">
                <div className="flex items-center gap-2">
                  <Camera className="w-4 h-4 text-lime-accent" />
                  <span className="text-xs font-tech text-slate-300">{lightboxItem.location}</span>
                </div>
                <button
                  onClick={() => setLightboxItem(null)}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Lightbox Image Container */}
              <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden p-2">
                <img
                  src={lightboxItem.imageUrl}
                  alt={lightboxItem.title}
                  className="max-h-[70vh] w-auto object-contain rounded-xl"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Lightbox Footer */}
              <div className="p-6 bg-[#13151A] border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-extrabold text-white font-display">{lightboxItem.title}</h3>
                  <p className="text-xs font-tech text-lime-accent mt-1">{lightboxItem.subtitle}</p>
                </div>
                <button
                  onClick={() => setLightboxItem(null)}
                  className="px-6 py-2.5 rounded-full bg-lime-accent text-black font-extrabold text-xs shadow-lime-glow"
                >
                  Close Viewer
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
