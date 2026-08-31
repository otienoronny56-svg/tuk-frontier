import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { motion } from 'framer-motion';
import { Activity, Users, Globe, Zap, Shield, Star, Leaf } from 'lucide-react';

const DEFAULT_GALLERY = [
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=800"
];

const coreValues = [
  { title: 'Excellence', desc: 'The highest standards in problem definition, code quality, and real-world impact.', color: '#fbbf24', icon: <Star size={22} /> },
  { title: 'Inclusion', desc: 'Welcoming all engineering disciplines, backgrounds, and partner institutions across Kenya.', color: '#60a5fa', icon: <Users size={22} /> },
  { title: 'Collaboration', desc: 'The best innovations emerge from diverse interdisciplinary teams, not lone geniuses.', color: '#4ade80', icon: <Globe size={22} /> },
  { title: 'Integrity', desc: 'Ethical technology development, open data, transparent competition, and fair judging.', color: '#c084fc', icon: <Shield size={22} /> },
  { title: 'Impact', desc: 'Success is measured by real-world difference and startup creation, not just code elegance.', color: '#f472b6', icon: <Zap size={22} /> },
  { title: 'Boldness', desc: 'Ambitious challenges, embracing trial and error, and relentless rapid iteration.', color: '#38bdf8', icon: <Leaf size={22} /> },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.08, ease: 'easeOut' as const } }),
};

export default function About() {
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      const { data } = await supabase.from('tuk_hackathon_content').select('value').eq('key', 'gallery').single();
      setGalleryImages(data && data.value && data.value.length > 0 ? data.value : DEFAULT_GALLERY);
      setLoading(false);
    };
    fetchGallery();
  }, []);

  return (
    <div className="w-full overflow-x-hidden" style={{ background: '#060d1f' }}>

      {/* ── Page Hero ─────────────────────────────────── */}
      <section className="page-hero">
        <div className="page-hero-glow-left" />
        <div className="page-hero-glow-right" />
        <div className="container relative z-10 text-center" style={{ maxWidth: '860px' }}>
          <motion.div initial="hidden" animate="show" variants={fadeUp}>
            <span className="section-eyebrow">About TUK Frontier</span>
            <h1 className="font-black tracking-tight mb-5" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: 1.1, color: '#fff' }}>
              Building Kenya's Next{' '}
              <span className="text-gradient">Generation of Builders</span>
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed max-w-3xl mx-auto" style={{ margin: '0 auto' }}>
              Jointly convened by the <strong className="text-slate-200">Office of the Faculty Representative (FEBE)</strong>,{' '}
              <strong className="text-slate-200">KUZA–TUK Chapter</strong>, and{' '}
              <strong className="text-slate-200">ASA–TUK</strong> — Kenya's premier student-led engineering & technology innovation summit.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Background & Vision ───────────────────────── */}
      <section className="page-section container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="grid md:grid-cols-2 gap-6 items-stretch">
          <motion.div
            className="unified-card flex flex-col"
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
          >
            <span className="section-eyebrow">Background & Rationale</span>
            <h2 className="text-3xl font-bold mb-4 leading-tight text-white">Bridging University Theory & Industry Reality</h2>
            <p className="text-slate-400 leading-relaxed mb-4 text-sm">
              Africa's median age of 19 gives it the largest youth demographic dividend in history, and Kenya — anchored by Nairobi's Silicon Savannah — has proven that homegrown innovation can compete globally.
            </p>
            <p className="text-slate-400 leading-relaxed text-sm mt-auto">
              Yet a persistent gap remains between academic theory and applied technology competencies. TUK Frontier compresses semesters of learning into days of hands-on build experience across AI, GIS, IoT, BIM, and cloud computing.
            </p>
          </motion.div>

          <motion.div
            className="unified-card flex flex-col"
            initial="hidden" whileInView="show" viewport={{ once: true }} custom={1} variants={fadeUp}
          >
            <span className="section-eyebrow" style={{ color: '#4ade80' }}>
              <span style={{ background: '#4ade80', width: 6, height: 6, borderRadius: '50%', display: 'inline-block', marginRight: 6 }} />
              The Vision
            </span>
            <h2 className="text-3xl font-bold mb-4 leading-tight text-white">Why "Frontier"?</h2>
            <p className="text-slate-400 leading-relaxed mb-6 text-sm">
              A <em className="text-slate-300">frontier</em> is the threshold of possibility where the curious push beyond convention. We signal a deliberate ambition: for TUK students not merely to learn about emerging technologies, but to stand at their edge — building, experimenting, and solving real national challenges.
            </p>
            <div className="flex flex-wrap gap-2 mt-auto pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              {['Artificial Intelligence', 'Geospatial Intelligence', 'Climate Technology', 'Smart Infrastructure', 'Space Tech'].map((tag, i) => (
                <span key={i} className="text-[11px] px-3 py-1.5 rounded-full font-semibold" style={{ background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.2)', color: '#4ade80' }}>{tag}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Convening Organizations ───────────────────── */}
      <section className="page-section page-section-border" style={{ background: 'rgba(15,23,42,0.4)' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.div className="text-center mb-14" initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
            <span className="section-eyebrow">Joint Conveners</span>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
              Three Organizations,{' '}
              <span className="text-gradient">One Summit</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                abbr: 'FEBE', color: '#fbbf24', borderColor: 'rgba(251,191,36,0.3)', bgColor: 'rgba(251,191,36,0.08)',
                title: 'Office of the Faculty Representative',
                desc: 'The constitutionally recognized student leadership within FEBE. Provides institutional authority, mobilizes 300+ engineering and technology students, and safeguards the hackathon\'s student-led character.',
                footer: 'Institutional Authority & Leadership', footerColor: '#fbbf24',
              },
              {
                abbr: 'KUZA', color: '#60a5fa', borderColor: 'rgba(96,165,250,0.3)', bgColor: 'rgba(96,165,250,0.08)',
                title: 'KUZA–TUK Chapter',
                desc: 'Anchors the geospatial and data science dimension. Brings expertise in Earth Observation, GIS, Remote Sensing, Spatial Data Science, and Drone/UAV Mapping for sustainable development.',
                tags: ['GIS & Mapping', 'Earth Observation', 'Spatial Data Science', 'Drone Tech', 'Spatial AI'],
                footer: 'Geospatial & Tech Direction', footerColor: '#60a5fa',
              },
              {
                abbr: 'ASA', color: '#4ade80', borderColor: 'rgba(74,222,128,0.3)', bgColor: 'rgba(74,222,128,0.08)',
                title: 'ASA–TUK (Architecture)',
                desc: 'Anchors the architectural and built-environment dimension. Champions design excellence, BIM technology, smart building systems, urban spatial planning, and climate-responsive design.',
                tags: ['Architectural Design', 'BIM & Smart Buildings', 'Urban Planning', 'Green Building'],
                footer: 'Built Environment & Design', footerColor: '#4ade80',
              },
            ].map((org, i) => (
              <motion.div
                key={i}
                className="unified-card flex flex-col"
                style={{ borderColor: org.borderColor }}
                initial="hidden" whileInView="show" viewport={{ once: true }} custom={i} variants={fadeUp}
                whileHover={{ y: -5, borderColor: org.color + '66' }}
              >
                <div style={{ width: '3rem', height: '3rem', borderRadius: '0.875rem', background: org.bgColor, border: `1px solid ${org.borderColor}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1rem', color: org.color, marginBottom: '1.25rem' }}>
                  {org.abbr}
                </div>
                <h3 className="text-lg font-bold text-white mb-3">{org.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-4">{org.desc}</p>
                {org.tags && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {org.tags.map((t, j) => (
                      <span key={j} className="text-[10px] px-2 py-0.5 rounded font-medium" style={{ background: org.bgColor, color: org.color, border: `1px solid ${org.borderColor}` }}>{t}</span>
                    ))}
                  </div>
                )}
                <div className="text-xs font-bold uppercase tracking-wider mt-auto pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.06)', color: org.footerColor }}>{org.footer}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6 Core Values ────────────────────────────── */}
      <section className="page-section page-section-border">
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.div className="text-center mb-14" initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
            <span className="section-eyebrow">Guiding Principles</span>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
              Our 6 <span className="text-gradient">Core Values</span>
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto mt-3 text-sm">Principles guiding our hackers, mentors, organizers, and partner ecosystem.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5">
            {coreValues.map((val, i) => (
              <motion.div
                key={i}
                className="unified-card"
                style={{ borderColor: 'rgba(30,41,59,0.8)' }}
                initial="hidden" whileInView="show" viewport={{ once: true }} custom={i} variants={fadeUp}
                whileHover={{ y: -5, borderColor: val.color + '40', boxShadow: `0 12px 40px -12px ${val.color}25` }}
              >
                <div style={{ width: '2.75rem', height: '2.75rem', borderRadius: '0.75rem', background: val.color + '15', border: `1px solid ${val.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: val.color, marginBottom: '1rem' }}>
                  {val.icon}
                </div>
                <h3 className="text-xl font-bold mb-2" style={{ color: val.color }}>{val.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed" style={{ margin: 0 }}>{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Expected Scale ───────────────────────────── */}
      <section className="page-section page-section-border" style={{ background: 'rgba(15,23,42,0.4)' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.div className="text-center mb-14" initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
            <span className="section-eyebrow">Summit Scale</span>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
              Expected <span className="text-gradient">Participation</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { val: '60–80', label: 'Registered Teams', sub: '3–5 members each', color: '#4ade80' },
              { val: '250–400', label: 'Total Hackers', sub: 'Across all tracks', color: '#4ade80' },
              { val: '40–60', label: 'Industry Mentors', sub: 'Engineering leaders', color: '#fbbf24' },
              { val: '15–25', label: 'Judges & Execs', sub: 'Independent panel', color: '#fbbf24' },
              { val: '500+', label: 'Summit Participants', sub: 'All attendees', color: '#60a5fa' },
              { val: '300+', label: 'Demo Day Visitors', sub: 'Showcase day', color: '#60a5fa' },
              { val: '1,000+', label: 'Live Stream Audience', sub: 'Online viewers', color: '#c084fc', span: 2 },
            ].map((stat, i) => (
              <motion.div
                key={i}
                className={stat.span === 2 ? 'col-span-2' : ''}
                style={{
                  padding: '1.75rem', borderRadius: '1.25rem',
                  background: 'rgba(10,18,38,0.7)',
                  border: `1px solid ${stat.color}20`,
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center',
                  transition: 'border-color 0.3s',
                }}
                initial="hidden" whileInView="show" viewport={{ once: true }} custom={i} variants={fadeUp}
                whileHover={{ borderColor: stat.color + '50' }}
              >
                <span className="text-3xl font-black mb-1" style={{ color: stat.color }}>{stat.val}</span>
                <span className="text-sm font-semibold text-slate-200">{stat.label}</span>
                <span className="text-xs text-slate-500 mt-1">{stat.sub}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Strategic Alignment ───────────────────────── */}
      <section className="page-section page-section-border">
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.div className="text-center mb-14" initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
            <span className="section-eyebrow">National Strategy</span>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
              Strategic & <span className="text-gradient">National Alignment</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto mt-3 text-sm">
              TUK Frontier directly advances Kenya's Vision 2030, the Bottom-Up Economic Transformation Agenda (BETA), and the UN Sustainable Development Goals (SDGs).
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              { badge: 'SDG 4 & 9', color: '#fbbf24', title: 'Quality Education & Innovation', desc: 'Hands-on bootcamps and challenge-driven development enhance technical learning outcomes and foster industrial innovation.' },
              { badge: 'SDG 11 & 13', color: '#4ade80', title: 'Sustainable Cities & Climate Action', desc: 'Smart Infrastructure and Geospatial tracks generate sustainable urban planning and climate adaptation solutions.' },
              { badge: 'SDG 8 & 17', color: '#60a5fa', title: 'Decent Work & Partnerships', desc: 'Our Career & Recruitment Fair connects graduates with employment while multi-stakeholder partnerships drive impact.' },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="unified-card"
                initial="hidden" whileInView="show" viewport={{ once: true }} custom={i} variants={fadeUp}
                whileHover={{ y: -5, borderColor: item.color + '40' }}
              >
                <span className="section-eyebrow" style={{ color: item.color }}>
                  <span style={{ background: item.color, width: 6, height: 6, borderRadius: '50%', display: 'inline-block', marginRight: 6 }} />
                  {item.badge}
                </span>
                <h4 className="text-lg font-bold text-white mb-2">{item.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed" style={{ margin: 0 }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Gallery ───────────────────────────────────── */}
      <section className="page-section page-section-border" style={{ background: 'rgba(15,23,42,0.4)' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.div className="text-center mb-14" initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
            <span className="section-eyebrow">Gallery</span>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
              Past Events <span className="text-gradient">Gallery</span>
            </h2>
          </motion.div>

          {loading ? (
            <div className="text-center py-12"><Activity className="animate-spin mx-auto mb-4" color="#f59e0b" size={32} /></div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {galleryImages.map((imgUrl, i) => (
                <motion.div
                  key={i}
                  className="overflow-hidden rounded-2xl"
                  style={{ aspectRatio: '1/1', border: '1px solid rgba(255,255,255,0.06)' }}
                  initial={{ opacity: 0, scale: 0.92 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ scale: 1.03 }}
                >
                  <img
                    src={imgUrl}
                    alt={`Event ${i + 1}`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                    onMouseOver={e => (e.currentTarget.style.transform = 'scale(1.08)')}
                    onMouseOut={e => (e.currentTarget.style.transform = 'scale(1)')}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
