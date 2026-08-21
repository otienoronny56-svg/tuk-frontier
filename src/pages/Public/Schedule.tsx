import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Schedule() {
  return (
    <div className="container pt-8 pb-20">
      <div className="text-center mb-16">
        <h1 className="text-gradient">Programme & Schedule</h1>
        <p style={{ maxWidth: '700px', margin: '1rem auto' }} className="text-muted-foreground text-lg">
          The official 72-hour summit itinerary and session schedule.
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center p-12 md:p-16 rounded-[2rem] bg-slate-900/40 border border-slate-800 backdrop-blur-xl relative overflow-hidden shadow-2xl"
        >
          {/* Subtle ambient glow */}
          <div style={{ position: 'absolute', top: '-50px', left: '50%', transform: 'translateX(-50%)', width: '250px', height: '250px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(251,191,36,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />

          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_rgba(245,158,11,0.15)]">
            <Calendar size={32} />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-100 mb-3">Schedule to be announced soon</h2>
          <p className="text-muted-foreground max-w-md mx-auto mb-8 text-sm leading-relaxed">
            The full itinerary, keynote sessions, mentor clinics, and demo day timings will be released closer to the summit date.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/register" className="btn px-6 py-3 rounded-xl font-bold" style={{ background: 'var(--tuk-gold)', color: '#000' }}>
              Register for Summit →
            </Link>
            <Link to="/guide" className="btn btn-outline px-6 py-3 rounded-xl font-bold">
              View Hacker Guide
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
