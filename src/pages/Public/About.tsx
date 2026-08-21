import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';

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

export default function About() {
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      const { data } = await supabase.from('tuk_hackathon_content').select('value').eq('key', 'gallery').single();
      if (data && data.value && data.value.length > 0) {
        setGalleryImages(data.value);
      } else {
        setGalleryImages(DEFAULT_GALLERY);
      }
      setLoading(false);
    };
    fetchGallery();
  }, []);

  return (
    <div className="container pt-8 pb-16">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h1 className="text-gradient">About TUK Frontier Hackathon</h1>
        <p style={{ maxWidth: '800px', margin: '1rem auto', fontSize: '1.2rem', lineHeight: 1.6 }} className="text-muted-foreground">
          Jointly convened by the <strong>Office of the Faculty Representative (FEBE)</strong>, the <strong>KUZA–TUK Chapter</strong>, and <strong>ASA–TUK</strong> (Architecture Students Association of TUK), 
          the TUK Frontier Hackathon is Kenya's premier student-led engineering and technology innovation platform within the Faculty of Engineering and the Built Environment.
        </p>
      </motion.div>

      {/* Rationale & Why Frontier */}
      <section className="mb-20 grid md:grid-cols-2 gap-8 items-stretch">
        <div className="p-8 rounded-[2rem] bg-slate-900/60 border border-slate-700/50 shadow-lg hover:border-slate-600 transition-colors flex flex-col">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-2 block">Background & Rationale</span>
          <h2 className="text-3xl font-bold mb-4 leading-tight">Bridging University Theory & Industry Reality</h2>
          <p className="text-base text-slate-300 leading-relaxed mb-4">
            Africa's median age of 19 gives it the largest youth demographic dividend in history, and Kenya — anchored by Nairobi's Silicon Savannah — has proven that homegrown innovation can compete globally. 
          </p>
          <p className="text-base text-slate-300 leading-relaxed mt-auto">
            Yet a persistent gap remains between academic theory and applied technology competencies. TUK Frontier Hackathon compresses semesters of learning into days of hands-on build experience across AI, GIS, IoT, BIM, and cloud computing.
          </p>
        </div>

        <div className="p-8 rounded-[2rem] bg-slate-900/60 border border-slate-700/50 shadow-lg hover:border-slate-600 transition-colors flex flex-col">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-2 block">The Vision</span>
          <h2 className="text-3xl font-bold mb-4 leading-tight">Why "Frontier"?</h2>
          <p className="text-base text-slate-300 leading-relaxed mb-6">
            A <em>frontier</em> is the threshold of possibility where the curious push beyond convention. We signal a deliberate ambition: for TUK students not merely to learn about emerging technologies, but to stand at their edge — building, experimenting, and solving real national challenges.
          </p>
          <div className="flex flex-wrap gap-2.5 mt-auto pt-4 border-t border-slate-800">
            {['Artificial Intelligence', 'Geospatial Intelligence', 'Climate Technology', 'Smart Infrastructure', 'Space Tech'].map((tag, i) => (
              <span key={i} className="text-[11px] px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold whitespace-nowrap tracking-wide">{tag}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Convening Organizations */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-10">Joint Convening Organizations</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="glass-card flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 text-tuk-gold flex items-center justify-center font-bold text-xl mb-4">FEBE</div>
              <h3 className="text-xl font-bold mb-2">Office of the Faculty Representative</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                The constitutionally recognized student leadership within FEBE. Provides institutional authority, mobilizes 300+ engineering and technology students, and safeguards the hackathon's student-led character.
              </p>
            </div>
            <div className="text-xs text-tuk-gold font-semibold uppercase tracking-wider mt-2">Institutional Authority & Leadership</div>
          </div>

          <div className="glass-card flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400 flex items-center justify-center font-bold text-xl mb-4">KUZA</div>
              <h3 className="text-xl font-bold mb-2">KUZA–TUK Chapter</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Anchors the geospatial and data science dimension. Brings expertise in Earth Observation, GIS, Remote Sensing, Spatial Data Science, and Drone/UAV Mapping for sustainable development.
              </p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {['GIS & Mapping', 'Earth Observation', 'Spatial Data Science', 'Drone Tech', 'Spatial AI'].map((t, i) => (
                  <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-blue-500/10 text-blue-300 border border-blue-500/20">{t}</span>
                ))}
              </div>
            </div>
            <div className="text-xs text-blue-400 font-semibold uppercase tracking-wider">Geospatial & Tech Direction</div>
          </div>

          <div className="glass-card flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-bold text-xl mb-4">ASA</div>
              <h3 className="text-xl font-bold mb-2">ASA–TUK (Architecture)</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Anchors the architectural and built-environment dimension. Champions design excellence, BIM technology, smart building systems, urban spatial planning, and climate-responsive design.
              </p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {['Architectural Design', 'BIM & Smart Buildings', 'Urban Planning', 'Green Building'].map((t, i) => (
                  <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">{t}</span>
                ))}
              </div>
            </div>
            <div className="text-xs text-emerald-400 font-semibold uppercase tracking-wider">Built Environment & Design</div>
          </div>
        </div>
      </section>

      {/* 6 Core Values */}
      <section className="mb-24">
        <h2 className="text-3xl font-bold text-center mb-4">Our 6 Core Values</h2>
        <p className="text-center text-muted-foreground max-w-xl mx-auto mb-10">Principles guiding our hackers, mentors, organizers, and partner ecosystem.</p>
        
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: 'Excellence', desc: 'The highest standards in problem definition, code quality, and real-world impact.', color: '#fbbf24' },
            { title: 'Inclusion', desc: 'Welcoming all engineering disciplines, backgrounds, and partner institutions across Kenya.', color: '#60a5fa' },
            { title: 'Collaboration', desc: 'The best innovations emerge from diverse interdisciplinary teams, not lone geniuses.', color: '#4ade80' },
            { title: 'Integrity', desc: 'Ethical technology development, open data, transparent competition, and fair judging.', color: '#c084fc' },
            { title: 'Impact', desc: 'Success is measured by real-world difference and startup creation, not just code elegance.', color: '#f472b6' },
            { title: 'Boldness', desc: 'Ambitious challenges, embracing trial and error, and relentless rapid iteration.', color: '#38bdf8' }
          ].map((val, i) => (
            <div key={i} className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80">
              <h3 className="text-xl font-bold mb-2" style={{ color: val.color }}>{val.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{val.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Expected Scale Table */}
      <section className="mb-24 p-8 rounded-[2rem] bg-slate-900/40 border border-slate-800">
        <h2 className="text-3xl font-bold text-center mb-4">Expected Participation & Scale</h2>
        <p className="text-center text-muted-foreground max-w-xl mx-auto mb-8">TUK Frontier Hackathon 2026 Participation Metrics</p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
          <div className="p-6 rounded-2xl bg-slate-950/60 border border-emerald-500/20 hover:border-emerald-500/40 transition-colors text-center flex flex-col justify-center">
            <span className="text-3xl font-bold text-emerald-400 mb-2">60–80</span>
            <span className="text-sm font-medium text-slate-300">Registered Teams</span>
            <span className="text-xs text-muted-foreground mt-1">(3–5 members each)</span>
          </div>
          <div className="p-6 rounded-2xl bg-slate-950/60 border border-emerald-500/20 hover:border-emerald-500/40 transition-colors text-center flex flex-col justify-center">
            <span className="text-3xl font-bold text-emerald-400 mb-2">250–400</span>
            <span className="text-sm font-medium text-slate-300">Total Hackers</span>
          </div>
          <div className="p-6 rounded-2xl bg-slate-950/60 border border-amber-500/20 hover:border-amber-500/40 transition-colors text-center flex flex-col justify-center">
            <span className="text-3xl font-bold text-amber-400 mb-2">40–60</span>
            <span className="text-sm font-medium text-slate-300">Industry Mentors</span>
          </div>
          <div className="p-6 rounded-2xl bg-slate-950/60 border border-amber-500/20 hover:border-amber-500/40 transition-colors text-center flex flex-col justify-center">
            <span className="text-3xl font-bold text-amber-400 mb-2">15–25</span>
            <span className="text-sm font-medium text-slate-300">Judges & Execs</span>
          </div>
          <div className="p-6 rounded-2xl bg-slate-950/60 border border-blue-500/20 hover:border-blue-500/40 transition-colors text-center flex flex-col justify-center">
            <span className="text-3xl font-bold text-blue-400 mb-2">500+</span>
            <span className="text-sm font-medium text-slate-300">Summit Participants</span>
          </div>
          <div className="p-6 rounded-2xl bg-slate-950/60 border border-blue-500/20 hover:border-blue-500/40 transition-colors text-center flex flex-col justify-center">
            <span className="text-3xl font-bold text-blue-400 mb-2">300+</span>
            <span className="text-sm font-medium text-slate-300">Demo Day Visitors</span>
          </div>
          <div className="p-6 rounded-2xl bg-slate-950/60 border border-purple-500/20 hover:border-purple-500/40 transition-colors text-center flex flex-col justify-center lg:col-span-2">
            <span className="text-3xl font-bold text-purple-400 mb-2">1,000+</span>
            <span className="text-sm font-medium text-slate-300">Live Stream Audience</span>
          </div>
        </div>
      </section>

      {/* Strategic Alignment */}
      <section className="mb-24 p-8 rounded-[2rem] bg-slate-900/40 border border-slate-800">
        <h2 className="text-3xl font-bold text-center mb-4">Strategic & National Alignment</h2>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-10">
          TUK Frontier Hackathon directly advances Kenya's Vision 2030, the Bottom-Up Economic Transformation Agenda (BETA), and the UN Sustainable Development Goals (SDGs).
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">SDG 4 & 9</span>
            <h4 className="text-lg font-bold mt-1 mb-2">Quality Education & Innovation</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">Hands-on bootcamps and challenge-driven development enhance technical learning outcomes and foster industrial innovation.</p>
          </div>
          <div className="p-6 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">SDG 11 & 13</span>
            <h4 className="text-lg font-bold mt-1 mb-2">Sustainable Cities & Climate Action</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">Smart Infrastructure and Geospatial tracks generate sustainable urban planning and climate adaptation solutions.</p>
          </div>
          <div className="p-6 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">SDG 8 & 17</span>
            <h4 className="text-lg font-bold mt-1 mb-2">Decent Work & Partnerships</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">Our Career & Recruitment Fair connects graduates with employment while multi-stakeholder partnerships drive impact.</p>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="text-center mb-12">
        <h2 className="mb-8">Past Events Gallery</h2>
        {loading ? (
           <div className="text-center py-12"><Activity className="animate-spin mx-auto mb-4" color="var(--tuk-gold)" size={32} /></div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {galleryImages.map((imgUrl, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="overflow-hidden rounded-xl border border-glass-border shadow-lg"
                style={{ aspectRatio: '1/1' }}
              >
                <img 
                  src={imgUrl} 
                  alt={`Hackathon Event ${i+1}`} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }} 
                  onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                />
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
