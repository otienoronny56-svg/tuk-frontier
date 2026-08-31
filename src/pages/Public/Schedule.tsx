import { motion } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.08, ease: 'easeOut' as const } }),
};

export default function Schedule() {
  return (
    <div className="w-full overflow-x-hidden" style={{ background: '#060d1f' }}>

      {/* ── Page Hero ─────────────────────────────────── */}
      <section className="page-hero">
        <div className="page-hero-glow-left" style={{ background: 'radial-gradient(circle, rgba(251,191,36,0.06) 0%, transparent 65%)' }} />
        <div className="page-hero-glow-right" />
        <div className="container relative z-10 text-center" style={{ maxWidth: '800px' }}>
          <motion.div initial="hidden" animate="show" variants={fadeUp}>
            <span className="section-eyebrow">Summit Itinerary</span>
            <h1 className="font-black tracking-tight mb-5" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: 1.1, color: '#fff' }}>
              Programme & <span className="text-gradient">Schedule</span>
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed max-w-3xl mx-auto" style={{ margin: '0 auto' }}>
              The official 72-hour summit timeline, including bootcamps, technical workshops, keynote panels, mentor check-ins, and Demo Day.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Schedule Timeline Wrapper ─────────────────── */}
      <section className="page-section container" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <motion.div
          initial="hidden" animate="show" variants={fadeUp}
          className="unified-card text-center"
          style={{ padding: '3.5rem 2.5rem', borderColor: 'rgba(30,41,59,0.8)' }}
        >
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_rgba(245,158,11,0.15)]">
            <Calendar size={28} />
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-slate-100 mb-3">Schedule to be announced soon</h2>
          <p className="text-muted-foreground max-w-md mx-auto mb-8 text-sm leading-relaxed">
            The full itinerary, technical curricula, guest speakers, keynotes, and Demo Day schedule will be updated closer to the summit launch.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/register" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-black transition-all hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(245,158,11,0.3)]" style={{ background: 'linear-gradient(135deg,#fbbf24,#f59e0b)', textDecoration: 'none', fontSize: '0.9rem' }}>
              Register for Summit <ArrowRight size={16} />
            </Link>
            <Link to="/guide" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-slate-200 transition-colors" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', textDecoration: 'none', fontSize: '0.9rem' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
            >
              View Hacker Guide
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
