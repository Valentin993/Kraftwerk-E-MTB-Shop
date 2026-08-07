import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ShieldCheck, Quote, MessageSquare, Check, X } from 'lucide-react';
import { TESTIMONIALS } from '../data/bikeData';
import { Testimonial } from '../types';

export const TestimonialsSection: React.FC = () => {
  const [reviewsList, setReviewsList] = useState<Testimonial[]>(TESTIMONIALS);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newQuote, setNewQuote] = useState('');
  const [newName, setNewName] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newLocation, setNewLocation] = useState('');

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newQuote) return;

    const added: Testimonial = {
      id: `t-${Date.now()}`,
      author: newName,
      title: newTitle || 'E-MTB Enthusiast',
      location: newLocation || 'Berlin, Germany',
      quote: newQuote,
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200',
      bikeModel: 'KRAFT01 Electric Berlin Edition',
      verifiedBuyer: true,
    };

    setReviewsList([added, ...reviewsList]);
    setNewQuote('');
    setNewName('');
    setNewTitle('');
    setNewLocation('');
    setShowAddModal(false);
  };

  return (
    <section
      id="testimonials"
      className="relative py-32 bg-[#0B0C0E] text-slate-100 border-t border-white/5 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime-accent/10 border border-lime-accent/30 text-lime-accent text-xs font-tech uppercase tracking-widest mb-4">
              <span>06 // Rider Validation</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-display text-white">
              Endorsed by Experts.
            </h2>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="mt-6 md:mt-0 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-tech font-bold text-slate-200 flex items-center gap-2 transition-all"
          >
            <MessageSquare className="w-4 h-4 text-lime-accent" />
            Submit Rider Feedback
          </button>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviewsList.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="p-8 rounded-3xl glass-panel glass-panel-hover flex flex-col justify-between relative group border border-white/10"
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-white/5 group-hover:text-lime-accent/10 transition-colors pointer-events-none" />

              <div>
                {/* Star Ratings */}
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-lime-accent text-lime-accent" />
                  ))}
                </div>

                <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-sans italic">
                  "{item.quote}"
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-4">
                <img
                  src={item.avatar}
                  alt={item.author}
                  className="w-12 h-12 rounded-full object-cover border border-lime-accent/40 shadow-lime-glow"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-sm font-bold text-white font-display">{item.author}</h4>
                    {item.verifiedBuyer && (
                      <ShieldCheck className="w-4 h-4 text-lime-accent" title="Verified KRAFT Rider" />
                    )}
                  </div>
                  <p className="text-[11px] font-tech text-slate-400">{item.title}</p>
                  <p className="text-[10px] font-tech text-lime-accent">{item.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Add Rider Feedback Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-lg bg-[#13151A] rounded-3xl border border-white/20 p-8 shadow-2xl"
            >
              <button
                onClick={() => setShowAddModal(false)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-2xl font-extrabold text-white font-display mb-1">Submit Rider Experience</h3>
              <p className="text-xs text-slate-400 font-tech mb-6">Share your trail review with the Berlin engineering team.</p>

              <form onSubmit={handleAddReview} className="space-y-4">
                <div>
                  <label className="text-xs font-tech text-slate-400 uppercase">Your Full Name</label>
                  <input
                    type="text"
                    required
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="e.g. Felix Weber"
                    className="mt-1 w-full p-3 rounded-xl bg-white/5 border border-white/15 text-white text-sm focus:border-lime-accent focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-tech text-slate-400 uppercase">Title or Discipline</label>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Enduro Trail Rider"
                    className="mt-1 w-full p-3 rounded-xl bg-white/5 border border-white/15 text-white text-sm focus:border-lime-accent focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-tech text-slate-400 uppercase">Location</label>
                  <input
                    type="text"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    placeholder="e.g. Berlin, Germany"
                    className="mt-1 w-full p-3 rounded-xl bg-white/5 border border-white/15 text-white text-sm focus:border-lime-accent focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-tech text-slate-400 uppercase">Your Trail Feedback</label>
                  <textarea
                    required
                    rows={4}
                    value={newQuote}
                    onChange={(e) => setNewQuote(e.target.value)}
                    placeholder="Describe how the motor torque and suspension felt on the descents..."
                    className="mt-1 w-full p-3 rounded-xl bg-white/5 border border-white/15 text-white text-sm focus:border-lime-accent focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-lime-accent text-black font-extrabold text-sm shadow-lime-glow mt-4"
                >
                  Publish Feedback
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
