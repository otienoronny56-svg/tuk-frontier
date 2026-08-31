import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Target, Trophy, Globe, Cpu, Coins, Leaf, Rocket, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const FALLBACK_TRACKS = [
  { id: '1', title: 'Geospatial & Earth Observation', prize_pool: 'Track Awards & Incubation', description: 'GIS, remote sensing, satellite imagery, drone data, and spatial analytics for urban planning and climate adaptation. Anchored by KUZA–TUK.', iconType: 'globe', color: '#60a5fa' },
  { id: '2', title: 'AI & Data Science', prize_pool: 'Track Awards & Incubation', description: 'AI applications, machine learning models, NLP, computer vision, and data analytics for health, agriculture, and public service.', iconType: 'cpu', color: '#c084fc' },
  { id: '3', title: 'Smart Infrastructure', prize_pool: 'Track Awards & Incubation', description: 'Smart buildings, structural health monitoring, BIM-enabled project management, and sustainable energy. Anchored by ASA–TUK.', iconType: 'code', color: '#4ade80' },
  { id: '4', title: 'Climate Tech & Environment', prize_pool: 'Track Awards & Incubation', description: 'Clean energy, water resources management, carbon monitoring, green infrastructure, and sustainable agriculture.', iconType: 'leaf', color: '#34d399' },
  { id: '5', title: 'Health Tech & Bioinformatics', prize_pool: 'Track Awards & Incubation', description: 'Medical device prototyping, telemedicine, health data analytics, disease surveillance, and AI-assisted diagnostics.', iconType: 'zap', color: '#f472b6' },
  { id: '6', title: 'Fintech & Digital Inclusion', prize_pool: 'Track Awards & Incubation', description: 'Fintech for financial inclusion, digital payments, alternative credit scoring, SME financial services, and digital access.', iconType: 'coins', color: '#fbbf24' },
];

function TrackIcon({ iconType, size = 28 }: { iconType?: string; size?: number }) {
  if (iconType?.includes('cpu') || iconType?.includes('ai')) return <Cpu size={size} />;
  if (iconType?.includes('coin') || iconType?.includes('fin')) return <Coins size={size} />;
  if (iconType?.includes('leaf') || iconType?.includes('climate')) return <Leaf size={size} />;
  if (iconType?.includes('globe') || iconType?.includes('geo')) return <Globe size={size} />;
  if (iconType?.includes('health') || iconType?.includes('zap')) return <Trophy size={size} />;
  return <Rocket size={size} />;
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.08, ease: 'easeOut' as const } }),
};

export default function Tracks() {
  const [tracks, setTracks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTracks = async () => {
      const { data } = await supabase
        .from('tuk_hackathon_tracks')
        .select('*, organization:tuk_hackathon_profiles(full_name)')
        .order('created_at', { ascending: false });
      setTracks(data && data.length > 0 ? data : FALLBACK_TRACKS);
      setLoading(false);
    };
    fetchTracks();
  }, []);

  return (
    <div className="w-full overflow-x-hidden" style={{ background: '#060d1f' }}>

      {/* ── Page Hero ─────────────────────────────────── */}
      <section className="page-hero">
        <div className="page-hero-glow-left" />
        <div className="page-hero-glow-right" style={{ background: 'radial-gradient(circle, rgba(192,132,252,0.06) 0%, transparent 65%)' }} />
        <div className="container relative z-10 text-center" style={{ maxWidth: '800px' }}>
          <motion.div initial="hidden" animate="show" variants={fadeUp}>
            <span className="section-eyebrow">6 Challenge Domains</span>
            <h1 className="font-black tracking-tight mb-5" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: 1.1, color: '#fff' }}>
              Pick Your <span className="text-gradient">Battlefield</span>
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed" style={{ margin: '0 auto' }}>
              Explore the challenge tracks sponsored by our partners. Build innovative solutions in your domain and compete for track-specific prizes and incubation support.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Tracks Grid ───────────────────────────────── */}
      <section className="page-section container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {loading ? (
          <div className="text-center py-20">
            <div className="w-10 h-10 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-slate-500 text-sm">Loading tracks...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tracks.map((track, index) => {
              const color = track.color || FALLBACK_TRACKS[index % FALLBACK_TRACKS.length]?.color || '#fbbf24';
              const iconType = track.iconType || track.title?.toLowerCase();
              return (
                <motion.div
                  key={track.id}
                  className="unified-card flex flex-col group"
                  style={{ borderColor: color + '25', minHeight: '320px' }}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  custom={index}
                  variants={fadeUp}
                  whileHover={{ y: -5, borderColor: color + '55', boxShadow: `0 12px 40px -12px ${color}30` }}
                >
                  {/* Image strip */}
                  {track.image_url && (
                    <div style={{ margin: '-2rem -2rem 1.5rem -2rem', height: '180px', overflow: 'hidden', borderRadius: '1.5rem 1.5rem 0 0', flexShrink: 0 }}>
                      <img
                        src={track.image_url}
                        alt={track.title}
                        className="group-hover:scale-105 transition-transform duration-500"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                  )}

                  {/* Icon (no-image fallback) */}
                  {!track.image_url && (
                    <div style={{ width: '3.25rem', height: '3.25rem', borderRadius: '0.875rem', background: color + '15', border: `1px solid ${color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', color, marginBottom: '1.25rem', transition: 'transform 0.3s' }}
                      className="group-hover:scale-110">
                      <TrackIcon iconType={iconType} size={26} />
                    </div>
                  )}

                  <div className="flex flex-col flex-1">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <Target size={14} style={{ color, flexShrink: 0 }} />
                      <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color }}>Challenge Track</span>
                    </div>
                    <h2 className="text-xl font-bold text-white mb-2 group-hover:text-opacity-90 transition-colors" style={{ margin: '0 0 0.5rem 0' }}>{track.title}</h2>
                    <p className="text-sm text-slate-400 leading-relaxed flex-1 mb-4" style={{ margin: '0 0 1rem 0' }}>{track.description}</p>

                    <div className="flex items-center justify-between mt-auto pt-4" style={{ borderTop: `1px solid ${color}18` }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Trophy size={14} style={{ color: '#4ade80' }} />
                        <span className="text-xs font-semibold text-emerald-400">{track.prize_pool}</span>
                      </div>
                      <Link to="/register" className="inline-flex items-center gap-1.5 text-xs font-bold transition-colors" style={{ color, textDecoration: 'none' }}>
                        Join Track <ArrowRight size={13} />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </section>

      {/* ── Bottom CTA ─────────────────────────────────── */}
      <section className="page-section page-section-border text-center" style={{ background: 'rgba(15,23,42,0.5)' }}>
        <div className="container" style={{ maxWidth: '700px', margin: '0 auto' }}>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
            <span className="section-eyebrow" style={{ justifyContent: 'center' }}>Ready to Build?</span>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
              Choose Your Track, <span className="text-gradient">Start Building</span>
            </h2>
            <p className="text-slate-400 mb-8 text-sm leading-relaxed">
              Register your team today and secure your spot in Kenya's premier student innovation summit.
            </p>
            <Link to="/register" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-black transition-all hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(245,158,11,0.4)]" style={{ background: 'linear-gradient(135deg,#fbbf24,#f59e0b)', textDecoration: 'none', fontSize: '1rem' }}>
              Register Your Team <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
