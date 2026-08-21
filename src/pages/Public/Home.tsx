import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Rocket, Target, Trophy, Clock, ArrowRight, Code, Zap, Globe, Coins, Cpu, Leaf, CheckCircle as CheckCircleIcon, Shield, MapPin, Calendar, Users, Sparkles, Award } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const COUNTDOWN_TARGET = new Date('2026-10-02T09:00:00+03:00').getTime();

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [sponsors, setSponsors] = useState<any[]>([]);
  const [tracks, setTracks] = useState<any[]>([]);
  const [timeline, setTimeline] = useState<any[]>([]);


  useEffect(() => {
    const fetchData = async () => {
      const { data: sponsorsData } = await supabase.from('tuk_hackathon_sponsors').select('*');
      if (sponsorsData) setSponsors(sponsorsData);
      
      const { data: tracksData } = await supabase.from('tuk_hackathon_tracks').select('*').order('created_at', { ascending: false });
      if (tracksData) setTracks(tracksData);

      const { data: scheduleData } = await supabase.from('tuk_hackathon_content').select('*').eq('key', 'schedule').single();
      if (scheduleData && scheduleData.value && scheduleData.value.length > 0) {
        const flatEvents: any[] = [];
        scheduleData.value.forEach((day: any) => {
          day.events?.forEach((event: any) => {
            flatEvents.push({
              time: `${day.date} • ${event.time}`,
              title: event.title,
              desc: event.location ? `Location: ${event.location}` : '',
              icon: event.title.toLowerCase().includes('code') || event.title.toLowerCase().includes('hack') ? 'code' :
                    event.title.toLowerCase().includes('pizza') || event.title.toLowerCase().includes('food') || event.title.toLowerCase().includes('lunch') || event.title.toLowerCase().includes('breakfast') || event.title.toLowerCase().includes('dinner') ? 'zap' :
                    event.title.toLowerCase().includes('win') || event.title.toLowerCase().includes('closing') || event.title.toLowerCase().includes('award') ? 'trophy' :
                    event.title.toLowerCase().includes('submit') || event.title.toLowerCase().includes('deadline') ? 'check' :
                    'rocket'
            });
          });
        });
        setTimeline(flatEvents);
      } else {
        setTimeline([
          { time: 'Friday, Oct 2, 2026 • 08:30 AM', title: 'Opening Ceremony & Keynotes', desc: 'Welcome remarks from FEBE Faculty Reps, KUZA–TUK, and ASA–TUK. Keynote speeches from tech and industry leaders.', icon: 'rocket' },
          { time: 'Friday, Oct 2, 2026 • 11:30 AM', title: 'Challenge Reveal & Hackathon Begins', desc: 'Track challenges unveiled. The 72-hour hackathon clock begins. Mentor channels and cloud resources open.', icon: 'code' },
          { time: 'Saturday, Oct 3, 2026 • 09:00 AM', title: 'Progress Pitches & Technical Clinics', desc: 'Mid-hackathon progress check-ins with mentors. Specialized clinics in GIS, AI, BIM, and hardware prototyping.', icon: 'zap' },
          { time: 'Saturday, Oct 3, 2026 • 04:00 PM', title: 'Pitch Deck & Prototype Clinics', desc: 'Refine solution architecture, user interface, and pitch decks with startup founders and technical leads.', icon: 'trophy' },
          { time: 'Sunday, Oct 4, 2026 • 12:00 PM', title: 'Final Project Submission Deadline', desc: 'Submit code repositories, pitch decks, and demo videos for judge evaluation.', icon: 'check' },
          { time: 'Sunday, Oct 4, 2026 • 01:30 PM', title: 'Demo Day & Awards Ceremony', desc: 'Finalist pitches live on stage, project demonstrations, followed by grand awards ceremony!', icon: 'rocket' }
        ]);
      }
    };
    fetchData();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = COUNTDOWN_TARGET - now;

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full overflow-x-hidden relative max-w-full">
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          display: flex;
          width: max-content;
          max-width: none !important;
          animation: scroll 30s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
        summary::-webkit-details-marker {
          display: none;
        }
        .text-gradient {
          background: linear-gradient(135deg, var(--tuk-gold), #fbbf24);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>

      {/* 1. Modern Split-Layout Hero Section */}
      <section className="relative w-full py-6 md:py-8 flex items-center overflow-hidden bg-background mt-16 lg:mt-20 border-b border-glass-border">
        {/* Subtle Grid Background Overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-50 z-0 pointer-events-none"></div>
        {/* Glowing orb in center behind text for premium feel */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[400px] h-[400px] bg-tuk-navy/10 rounded-full blur-[100px] z-0 pointer-events-none"></div>
        
        <div className="container relative z-10 h-full mx-auto flex flex-col md:flex-row items-center md:justify-between gap-8 md:gap-12 py-8 px-4 md:py-0">
          {/* Left Content Column */}
          <motion.div
            className="flex-1 flex flex-col items-start w-full md:max-w-[55%]"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-block px-4 py-1.5 rounded-full border border-tuk-navy/20 bg-background/50 backdrop-blur-md text-tuk-navy font-semibold mb-3 text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.08em] sm:tracking-[0.15em] shadow-sm max-w-full text-left" style={{ wordBreak: 'break-word' }}>
              Jointly Convened by FEBE Faculty Rep Office • KUZA–TUK • ASA–TUK
            </div>

            <h1 className="font-extrabold mb-6 leading-[1.1] tracking-tight text-left" style={{ fontSize: 'clamp(2.2rem, 7vw, 5rem)', color: 'var(--foreground)', wordBreak: 'break-word', overflowWrap: 'break-word', width: '100%' }}>
              TUK <span style={{ color: '#4ade80' }}>Frontier.</span><br />
              <span style={{ color: 'var(--foreground)', opacity: 0.8, fontSize: 'clamp(1.3rem,4.5vw,3.5rem)' }}>Innovation at the Frontier.</span>
            </h1>

            <p className="text-base md:text-xl mb-10 font-medium max-w-xl leading-relaxed text-left" style={{ color: 'var(--muted-foreground)' }}>
              Kenya's premier 72-hour student engineering & technology innovation summit. Transforming student talent into market-ready solutions, startups, and employment-ready graduates.
            </p>

            <div className="flex flex-row w-full justify-start gap-3 sm:gap-4 mb-4">
              <Link to="/register" className="btn inline-flex items-center justify-center transition-all hover:-translate-y-1 hover:shadow-lg duration-300 text-sm sm:text-base px-4 py-3 sm:px-6 sm:py-3" style={{ backgroundColor: 'var(--tuk-gold)', color: '#000', borderRadius: 'var(--radius-xl)', fontWeight: 700, flex: '1 1 auto', maxWidth: '180px' }}>
                Register <ArrowRight size={16} className="ml-1 sm:ml-2" />
              </Link>
              <Link to="/sponsor" className="btn btn-outline inline-flex items-center justify-center backdrop-blur-sm transition-all hover:-translate-y-1 duration-300 text-sm sm:text-base px-4 py-3 sm:px-6 sm:py-3" style={{ borderRadius: 'var(--radius-xl)', color: 'var(--foreground)', flex: '1 1 auto', maxWidth: '180px' }}>
                Sponsor Us
              </Link>
            </div>
          </motion.div>

          {/* Right Interactive Code Terminal Column */}
          {/* Right Column: Summit Showcase & Countdown */}
          <motion.div
            className="relative flex flex-col items-center justify-center gap-6 w-full mt-8 md:mt-0 md:max-w-[44%]"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Countdown Timer */}
            <div
              className="w-full flex items-center justify-around py-3 px-4 rounded-2xl"
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid var(--glass-border)',
                backdropFilter: 'blur(12px)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)'
              }}
            >
              {[
                { label: 'Days', value: timeLeft.days },
                { label: 'Hours', value: timeLeft.hours },
                { label: 'Minutes', value: timeLeft.minutes },
                { label: 'Seconds', value: timeLeft.seconds }
              ].map((unit, i) => (
                <div key={i} className="flex flex-col items-center justify-center min-w-[50px]">
                  <div className="text-2xl sm:text-3xl font-black leading-none mb-1 tabular-nums" style={{ color: 'var(--foreground)' }}>
                    {String(unit.value).padStart(2, '0')}
                  </div>
                  <div className="text-[10px] sm:text-xs uppercase tracking-[0.12em] font-semibold" style={{ color: 'var(--muted-foreground)' }}>
                    {unit.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Summit Overview Showcase Card */}
            <div
              className="w-full rounded-[1.75rem] p-6 relative overflow-hidden flex flex-col gap-4 text-left"
              style={{
                background: 'linear-gradient(145deg, rgba(30, 41, 59, 0.75) 0%, rgba(15, 23, 42, 0.9) 100%)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                backdropFilter: 'blur(16px)',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4), 0 0 30px rgba(74, 222, 128, 0.06)'
              }}
            >
              {/* Background ambient glows */}
              <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '150px', height: '150px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(74, 222, 128, 0.18) 0%, transparent 70%)', pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', bottom: '-40px', left: '-40px', width: '150px', height: '150px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(251, 191, 36, 0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />

              {/* Status Header */}
              <div className="flex items-center justify-between gap-2 pb-3" style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Applications Open</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                  <Calendar size={13} className="text-amber-400" />
                  <span>Oct 2–4, 2026</span>
                </div>
              </div>

              {/* Summit Highlights Info Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Venue</div>
                    <div className="text-xs font-bold leading-snug" style={{ color: 'var(--foreground)' }}>TUK Main Campus</div>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 shrink-0">
                    <Users size={16} />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Cohort</div>
                    <div className="text-xs font-bold leading-snug" style={{ color: 'var(--foreground)' }}>500+ Builders</div>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 shrink-0">
                    <Sparkles size={16} />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Format</div>
                    <div className="text-xs font-bold leading-snug" style={{ color: 'var(--foreground)' }}>72H In-Person</div>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 shrink-0">
                    <Award size={16} />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Prizes & Perks</div>
                    <div className="text-xs font-bold leading-snug" style={{ color: 'var(--foreground)' }}>Grants & Incubation</div>
                  </div>
                </div>
              </div>

              {/* Focus Tracks Preview */}
              <div className="flex flex-col gap-1.5 pt-1">
                <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Innovation Tracks</div>
                <div className="flex flex-wrap gap-1.5">
                  {['AI & Data Science', 'Geospatial & EO', 'Smart Infrastructure', 'Fintech', 'Climate Tech', 'Health Tech'].map((track, i) => (
                    <span
                      key={i}
                      className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-white/5 text-slate-300 border border-white/5"
                    >
                      {track}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Quick Badge */}
              <div className="flex items-center justify-between pt-3 border-t border-white/10 text-[11px] text-muted-foreground">
                <span className="flex items-center gap-1 font-medium text-emerald-400">
                  <CheckCircleIcon size={13} /> Free Registration & Swag
                </span>
                <Link to="/guide" className="font-semibold text-amber-400 hover:text-amber-300 transition-colors">
                  Summit Guide →
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Live Sponsors Marquee */}
      {sponsors.length > 0 && (
        <section className="py-8 bg-black border-y border-glass-border overflow-hidden">
          <h4 className="text-center text-muted-foreground uppercase tracking-[0.3em] text-xs font-bold mb-6">Trusted by Industry Leaders</h4>
          <div className="w-full relative flex overflow-hidden mask-edges" style={{ maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)' }}>
            <div className="animate-scroll gap-16 md:gap-32 px-8 flex items-center">
              {/* Render twice for seamless loop */}
              {[...sponsors, ...sponsors].map((sponsor, i) => (
                <div key={`${sponsor.id}-${i}`} className="flex-shrink-0 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 mx-4">
                  {sponsor.logo_url ? (
                    <img src={sponsor.logo_url} alt={sponsor.name} className="h-20 md:h-24 object-contain" style={{ maxWidth: 'none' }} />
                  ) : (
                    <div className="text-2xl font-bold text-white whitespace-nowrap">{sponsor.name}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 3. The Experience Section */}
      <section className="pt-24 pb-16 relative overflow-hidden">
        {/* Vivid ambient glows */}
        <div style={{ position: 'absolute', top: '-80px', left: '10%', width: '420px', height: '420px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(234,179,8,0.12) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />
        <div style={{ position: 'absolute', bottom: '-60px', right: '8%', width: '360px', height: '360px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(167,139,250,0.1) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />

        <div className="container relative z-10">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto w-full">
            <motion.div
              className="w-full flex flex-col items-center justify-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight tracking-tight">
                More than a hackathon.<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-tuk-gold to-yellow-300">It's a launchpad.</span>
              </h2>

              <p className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed max-w-3xl">
                TUK Frontier isn't just about writing code for 48 hours. It's about meeting your future co-founder, landing a job at a top tech firm, and turning a crazy weekend idea into a <span className="font-semibold" style={{ color: 'var(--tuk-gold)' }}>fully-fledged startup</span>.
              </p>

              {/* Feature Pills — vibrant, colored */}
              <div className="flex flex-row flex-wrap justify-center gap-4 sm:gap-5 mb-12 w-full">
                {[
                  { icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>, label: 'Elite Mentorship', color: '#60a5fa', glow: 'rgba(96,165,250,0.18)', border: 'rgba(96,165,250,0.35)' },
                  { icon: <Cpu size={18} />, label: 'Enterprise Hardware', color: '#4ade80', glow: 'rgba(74,222,128,0.15)', border: 'rgba(74,222,128,0.35)' },
                  { icon: <Rocket size={18} />, label: 'Incubator Pipeline', color: '#c084fc', glow: 'rgba(192,132,252,0.15)', border: 'rgba(192,132,252,0.35)' },
                ].map((pill, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '0.625rem',
                      padding: '0.6rem 1.4rem', borderRadius: '999px',
                      background: `var(--glass-bg)`,
                      border: `1px solid ${pill.border}`,
                      boxShadow: `0 0 20px ${pill.glow}, inset 0 1px 0 rgba(255,255,255,0.07)`,
                      backdropFilter: 'blur(10px)',
                      color: pill.color,
                      fontWeight: 700,
                      fontSize: '0.9rem',
                      cursor: 'default',
                      transition: 'transform 0.2s',
                    }}
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    <span style={{ color: pill.color }}>{pill.icon}</span>
                    <span style={{ color: 'var(--foreground)', fontWeight: 600 }}>{pill.label}</span>
                  </motion.div>
                ))}
              </div>

              <Link to="/about" className="group relative inline-flex items-center justify-center overflow-hidden rounded-xl p-4 px-8 font-bold text-black bg-tuk-gold hover:bg-yellow-400 transition-all shadow-[0_0_40px_-10px_rgba(234,179,8,0.5)] hover:shadow-[0_0_60px_-15px_rgba(234,179,8,0.7)] hover:-translate-y-1">
                <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></span>
                <span className="relative flex items-center gap-2">Discover the Experience <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></span>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>


      {/* 4. Upgraded Feature Grid */}
      <section className="pt-8 pb-24 relative overflow-hidden" style={{ borderTop: '1px solid var(--glass-border)', borderBottom: '1px solid var(--glass-border)' }}>
        {/* Section background glows */}
        <div style={{ position: 'absolute', top: '20%', left: '-5%', width: '350px', height: '350px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(96,165,250,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '10%', right: '-5%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(234,179,8,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div className="container relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Why <span className="text-gradient">Attend?</span></h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Everything you need to build the next big thing.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: <Target size={28} />, title: "Real-World Tracks", desc: "Solve actual industry problems presented by our sponsors.", accent: '#60a5fa', grad: 'linear-gradient(135deg, rgba(96,165,250,0.12) 0%, rgba(96,165,250,0.03) 100%)', border: 'rgba(96,165,250,0.25)' },
              { icon: <Trophy size={28} />, title: "Prizes to be Won", desc: "Cash prizes, credits, and hardware.", accent: '#fbbf24', grad: 'linear-gradient(135deg, rgba(251,191,36,0.14) 0%, rgba(251,191,36,0.04) 100%)', border: 'rgba(251,191,36,0.3)' },
              { icon: <Clock size={28} />, title: "48 Hours", desc: "Non-stop building and mentoring.", accent: '#c084fc', grad: 'linear-gradient(135deg, rgba(192,132,252,0.12) 0%, rgba(192,132,252,0.03) 100%)', border: 'rgba(192,132,252,0.25)' },
              { icon: <Code size={28} />, title: "Workshops", desc: "Learn cutting-edge frameworks from the people who built them.", accent: '#34d399', grad: 'linear-gradient(135deg, rgba(52,211,153,0.12) 0%, rgba(52,211,153,0.03) 100%)', border: 'rgba(52,211,153,0.25)' },
              { icon: <Globe size={28} />, title: "Networking", desc: "Rub shoulders with recruiters, founders, and fellow builders.", accent: '#818cf8', grad: 'linear-gradient(135deg, rgba(129,140,248,0.12) 0%, rgba(129,140,248,0.03) 100%)', border: 'rgba(129,140,248,0.25)' },
              { icon: <Rocket size={28} />, title: "Incubation", desc: "Top teams get support to launch.", accent: '#f472b6', grad: 'linear-gradient(135deg, rgba(244,114,182,0.12) 0%, rgba(244,114,182,0.03) 100%)', border: 'rgba(244,114,182,0.25)' },
            ].map((feature, i) => {
              let spanClass = "md:col-span-1";
              if (i === 0 || i === 3 || i === 4) spanClass = "md:col-span-2";
              return (
                <motion.div
                  key={i}
                  className={`relative flex flex-col p-8 rounded-[2rem] overflow-hidden group ${spanClass}`}
                  style={{
                    background: feature.grad,
                    border: `1px solid ${feature.border}`,
                    backdropFilter: 'blur(12px)',
                    boxShadow: `0 4px 32px ${feature.accent}18`,
                    transition: 'all 0.3s ease',
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -4, boxShadow: `0 12px 40px ${feature.accent}30` }}
                >
                  {/* Top highlight line */}
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(to right, transparent, ${feature.accent}88, transparent)` }} />
                  {/* Background glow blob */}
                  <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: '120px', height: '120px', borderRadius: '50%', background: `radial-gradient(circle, ${feature.accent}20 0%, transparent 70%)`, pointerEvents: 'none' }} />

                  {/* Icon */}
                  <div style={{ marginBottom: '1.5rem', padding: '0.875rem', display: 'inline-flex', alignSelf: 'flex-start', borderRadius: '1rem', background: `${feature.accent}18`, border: `1px solid ${feature.accent}30`, color: feature.accent, boxShadow: `0 0 20px ${feature.accent}22` }}>
                    {feature.icon}
                  </div>

                  {/* Text */}
                  <div className="mt-auto">
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.75rem', color: 'var(--foreground)', letterSpacing: '-0.01em' }}>{feature.title}</h3>
                    <p style={{ color: 'var(--muted-foreground)', lineHeight: 1.65, fontSize: '0.95rem' }}>{feature.desc}</p>
                  </div>

                  {/* Bottom accent line on hover */}
                  <div style={{ position: 'absolute', bottom: 0, left: '10%', right: '10%', height: '1px', background: `linear-gradient(to right, transparent, ${feature.accent}55, transparent)`, opacity: 0, transition: 'opacity 0.3s' }} className="group-hover:opacity-100" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>


      {/* 5. Prize Tracks */}
      <section className="py-24 container">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Challenge <span className="text-gradient">Tracks</span></h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Pick your battlefield. Dominate the track.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {(tracks.length > 0 ? tracks : [
            { id: '1', title: 'Geospatial & Earth Observation', prize_pool: 'Track Awards & Incubation', description: 'GIS, remote sensing, satellite imagery, drone data, and spatial analytics for urban planning and climate adaptation. Anchored by KUZA–TUK.', iconType: 'globe' },
            { id: '2', title: 'AI & Data Science', prize_pool: 'Track Awards & Incubation', description: 'AI applications, machine learning models, NLP, computer vision, and data analytics for health, agriculture, and public service.', iconType: 'cpu' },
            { id: '3', title: 'Smart Infrastructure', prize_pool: 'Track Awards & Incubation', description: 'Smart buildings, structural health monitoring, BIM-enabled project management, and sustainable energy. Anchored by ASA–TUK.', iconType: 'code' },
            { id: '4', title: 'Climate Tech & Environment', prize_pool: 'Track Awards & Incubation', description: 'Clean energy, water resources management, carbon monitoring, green infrastructure, and sustainable agriculture.', iconType: 'leaf' },
            { id: '5', title: 'Health Tech & Bioinformatics', prize_pool: 'Track Awards & Incubation', description: 'Medical device prototyping, telemedicine, health data analytics, disease surveillance, and AI-assisted diagnostics.', iconType: 'zap' },
            { id: '6', title: 'Fintech & Digital Inclusion', prize_pool: 'Track Awards & Incubation', description: 'Fintech for financial inclusion, digital payments, alternative credit scoring, SME financial services, and digital access.', iconType: 'coins' }
          ]).map((track: any) => {
            const hasImage = !!track.image_url;
            const getTrackIcon = (title: string, iconType?: string) => {
              const t = iconType || title.toLowerCase();
              if (t.includes('ai') || t.includes('intelligence') || t.includes('machine') || t.includes('cpu')) return <Cpu size={48} />;
              if (t.includes('finance') || t.includes('pay') || t.includes('web3') || t.includes('coin')) return <Coins size={48} />;
              if (t.includes('green') || t.includes('environ') || t.includes('climate') || t.includes('leaf')) return <Leaf size={48} />;
              return <Rocket size={48} />;
            };
            const getTrackIconLarge = (title: string, iconType?: string) => {
              const t = iconType || title.toLowerCase();
              if (t.includes('ai') || t.includes('intelligence') || t.includes('machine') || t.includes('cpu')) return <Cpu size={120} />;
              if (t.includes('finance') || t.includes('pay') || t.includes('web3') || t.includes('coin')) return <Coins size={120} />;
              if (t.includes('green') || t.includes('environ') || t.includes('climate') || t.includes('leaf')) return <Leaf size={120} />;
              return <Rocket size={120} />;
            };

            return (
              <div 
                key={track.id} 
                className="glass-card group" 
                style={{ 
                  padding: '0', 
                  minHeight: '400px', 
                  borderRadius: 'var(--radius-xl)',
                  maxWidth: '380px',
                  width: '100%',
                  margin: '0 auto md:0',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {hasImage ? (
                  <>
                    <div style={{ height: '192px', width: '100%', overflow: 'hidden', position: 'relative' }}>
                      <img 
                        src={track.image_url} 
                        alt={track.title} 
                        className="group-hover:scale-105 transition-transform duration-500" 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0b132b] via-transparent to-transparent"></div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col justify-between" style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, padding: '1.5rem', justifyContent: 'space-between' }}>
                      <div>
                        <h3 className="text-2xl font-bold mb-2 text-foreground group-hover:text-tuk-gold transition-colors duration-300">{track.title}</h3>
                        <p className="text-lg font-bold text-green-400 mb-4">{track.prize_pool}</p>
                        <p className="text-muted-foreground text-sm line-clamp-3 mb-6">{track.description}</p>
                      </div>
                      <Link to="/tracks" className="text-tuk-gold font-bold hover:underline flex items-center gap-2 mt-auto">View details <ArrowRight size={16} /></Link>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity text-tuk-gold">{getTrackIconLarge(track.title, track.iconType)}</div>
                    <div className="flex flex-col justify-between h-full p-8" style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
                      <div>
                        <div className="text-tuk-gold mb-4">{getTrackIcon(track.title, track.iconType)}</div>
                        <h3 className="text-3xl font-bold mb-2">{track.title}</h3>
                        <p className="text-xl font-bold text-green-400 mb-6">{track.prize_pool}</p>
                        <p className="text-muted-foreground mb-8 leading-relaxed">{track.description}</p>
                      </div>
                      <Link to="/tracks" className="text-tuk-gold font-bold hover:underline flex items-center gap-2 mt-auto">View details <ArrowRight size={16} /></Link>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 5.1. Bento Grid Stats Highlights */}
      <section className="pt-16 pb-12 border-t border-glass-border relative overflow-hidden bg-background">
        <div className="absolute left-10 top-10 w-[300px] h-[300px] bg-tuk-navy/10 rounded-full blur-[100px] z-0 pointer-events-none"></div>
        <div className="container relative z-10 mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-2 p-8 rounded-[2rem] bg-slate-900/30 border border-slate-800/80 flex flex-col justify-between min-h-[220px]">
              <div>
                <h3 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-tuk-gold to-yellow-300 tracking-tight">KSh 6,500,000+</h3>
                <p className="text-lg font-semibold text-slate-200 mt-4">Cash Prizes & Innovation Grants</p>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">Direct support, investment funding, cloud credits, and physical items distributed among first, second, and third place teams across multiple tracks.</p>
            </div>

            <div className="md:col-span-1 p-8 rounded-[2rem] bg-slate-900/30 border border-slate-800/80 flex flex-col justify-between min-h-[220px]">
              <h3 className="text-5xl md:text-6xl font-black text-[#4ade80] tracking-tight">40-60</h3>
              <div>
                <p className="text-lg font-semibold text-slate-200">Industry Mentors</p>
                <p className="text-sm text-slate-400 mt-2">Engineering leaders and founders guiding teams full-time.</p>
              </div>
            </div>

            <div className="md:col-span-1 p-8 rounded-[2rem] bg-slate-900/30 border border-slate-800/80 flex flex-col justify-between min-h-[220px]">
              <h3 className="text-5xl md:text-6xl font-black text-purple-400 tracking-tight">60-80</h3>
              <div>
                <p className="text-lg font-semibold text-slate-200">Innovator Teams</p>
                <p className="text-sm text-slate-400 mt-2">250–400 engineering, tech, and architecture students.</p>
              </div>
            </div>

            <div className="md:col-span-1 p-8 rounded-[2rem] bg-slate-900/30 border border-slate-800/80 flex flex-col justify-between min-h-[220px]">
              <h3 className="text-5xl md:text-6xl font-black text-blue-400 tracking-tight">72h</h3>
              <div>
                <p className="text-lg font-semibold text-slate-200">Multi-Day Summit</p>
                <p className="text-sm text-slate-400 mt-2">Non-stop workspace, bootcamps, mentorship & demo day.</p>
              </div>
            </div>

            <div className="md:col-span-3 p-8 rounded-[2rem] bg-slate-900/30 border border-slate-800/80 flex flex-col justify-between min-h-[220px]">
              <div>
                <h3 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 tracking-tight">20+ Sponsors</h3>
                <p className="text-lg font-semibold text-slate-200 mt-4">Enterprise Partnerships</p>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">Network directly with engineering recruiters and product executives from Kenya's top financial institutions, telecoms, and international cloud operators.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5.2. Interactive Timeline Journey */}
      <section className="pt-12 pb-16 bg-tuk-navy-light/10 border-t border-glass-border relative overflow-hidden">
        <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-tuk-navy/10 rounded-full blur-[90px] z-0 pointer-events-none"></div>
        <div className="container relative z-10 mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Event <span className="text-gradient">Timeline</span></h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Track the 72-hour journey from idea to post-event incubation.</p>
          </div>

          {/* Group events by day — always side by side on wide screens */}
          {(() => {
            const groups: Record<string, any[]> = {};
            const groupOrder: string[] = [];
            timeline.forEach(step => {
              const dayKey = step.time.split('•')[0].trim();
              if (!groups[dayKey]) { groups[dayKey] = []; groupOrder.push(dayKey); }
              groups[dayKey].push(step);
            });
            const days = groupOrder.map(k => ({ label: k, events: groups[k] }));
            const colors = ['#4ade80', '#a78bfa', '#f59e0b', '#f87171'];

            return (
              <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: days.length > 2 ? 'repeat(auto-fit, minmax(320px, 1fr))' : `repeat(${Math.max(1, days.length)}, 1fr)`, gap: '2rem', alignItems: 'start' }}>
                {days.map((day, dayIdx) => {
                  const color = colors[dayIdx % colors.length];
                  return (
                    <div key={dayIdx} style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                      {/* Day header with date */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                        <div style={{ height: '2px', flex: 1, background: `linear-gradient(to right, ${color}, transparent)` }} />
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 1.25rem', borderRadius: '999px', border: `1px solid ${color}55`, background: `${color}15`, fontSize: '0.825rem', fontWeight: 700, color, whiteSpace: 'nowrap' }}>
                          <Calendar size={14} />
                          {day.label}
                        </span>
                        <div style={{ height: '2px', flex: 1, background: `linear-gradient(to left, ${color}, transparent)` }} />
                      </div>

                      {/* Events list */}
                      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {/* Vertical line */}
                        <div style={{ position: 'absolute', left: '15px', top: '8px', bottom: '8px', width: '2px', background: `linear-gradient(to bottom, ${color}, transparent)`, opacity: 0.3 }} />

                        {day.events.map((step, idx) => (
                          <motion.div
                            key={idx}
                            style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start', position: 'relative', paddingLeft: '3rem' }}
                            initial={{ opacity: 0, x: dayIdx % 2 === 0 ? -24 : 24 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: '-60px' }}
                            transition={{ duration: 0.45, delay: idx * 0.07 }}
                          >
                            {/* Icon dot */}
                            <div style={{ position: 'absolute', left: 0, top: '0.875rem', width: '32px', height: '32px', borderRadius: '50%', background: 'var(--muted)', border: `2px solid ${color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color, zIndex: 10, boxShadow: `0 0 14px ${color}44` }}>
                              {step.icon === 'code' && <Code size={14} />}
                              {step.icon === 'zap' && <Zap size={14} />}
                              {step.icon === 'trophy' && <Trophy size={14} />}
                              {step.icon === 'check' && <CheckCircleIcon size={14} />}
                              {step.icon === 'rocket' && <Rocket size={14} />}
                            </div>

                            <div style={{ padding: '1rem 1.25rem', borderRadius: '1rem', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', width: '100%', transition: 'all 0.2s', cursor: 'default', backdropFilter: 'blur(8px)' }}
                              onMouseEnter={e => (e.currentTarget.style.borderColor = color + '55')}
                              onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--glass-border)')}
                            >
                              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', fontWeight: 700, color, marginBottom: '0.35rem', background: `${color}12`, padding: '0.2rem 0.6rem', borderRadius: '6px' }}>
                                <Clock size={12} />
                                {step.time.split('•')[1]?.trim() || step.time}
                              </div>
                              <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--foreground)', margin: '0.25rem 0 0.35rem 0' }}>{step.title}</h4>
                              {step.desc && <p style={{ fontSize: '0.85rem', color: 'var(--muted-foreground)', margin: 0, lineHeight: 1.5 }}>{step.desc}</p>}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })()}
        </div>
      </section>

      {/* 5.3. Summit Exploration Pillars Grid */}
      <section className="py-24 border-y border-glass-border relative overflow-hidden bg-slate-950">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] opacity-60 z-0"></div>
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-tuk-gold/5 rounded-full blur-[120px] pointer-events-none z-0 animate-pulse" style={{ animationDuration: '8s' }}></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[150px] pointer-events-none z-0 animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }}></div>

        <div className="container relative z-10 mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-xs font-bold px-4 py-2 rounded-full bg-slate-900/80 text-tuk-gold border border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.15)] uppercase tracking-[0.2em] inline-block mb-4 backdrop-blur-sm">
                Summit Highlights & Exploration
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight">
                Explore TUK Frontier <span className="text-transparent bg-clip-text bg-gradient-to-r from-tuk-gold via-yellow-200 to-amber-500">2026</span>
              </h2>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
            {/* Card 1: About & Conveners */}
            <motion.div 
              className="p-8 rounded-[1.5rem] bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 flex flex-col justify-between hover:border-amber-500/50 hover:bg-slate-800/80 transition-all duration-500 group shadow-lg hover:shadow-[0_8px_32px_-12px_rgba(245,158,11,0.3)] relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-bl-[100px] -z-10 group-hover:scale-110 transition-transform duration-500"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-500/5 border border-amber-500/30 text-amber-400 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(245,158,11,0.15)] group-hover:scale-110 transition-transform duration-500 group-hover:rotate-3">
                  <Target size={28} strokeWidth={2.5} />
                </div>
                <span className="text-[11px] font-bold text-amber-400/80 uppercase tracking-widest block mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span> Mission & Conveners
                </span>
                <h3 className="text-2xl font-bold text-slate-100 mb-3 group-hover:text-amber-400 transition-colors">About the Summit</h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-6 font-medium">
                  Jointly convened by FEBE Office of Faculty Rep, KUZA–TUK, and ASA–TUK. Discover our 6 core values and Vision 2030 strategic alignment.
                </p>
              </div>
              <Link to="/about" className="relative z-10 inline-flex items-center gap-2 text-sm font-bold text-amber-400 hover:text-amber-300 transition-colors mt-auto w-fit group/link">
                Read Story & Mission 
                <span className="bg-amber-500/10 p-1.5 rounded-full group-hover/link:bg-amber-500/20 transition-colors group-hover/link:translate-x-1">
                  <ArrowRight size={14} />
                </span>
              </Link>
            </motion.div>

            {/* Card 2: Pre-Hackathon Bootcamps */}
            <motion.div 
              className="p-8 rounded-[1.5rem] bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 flex flex-col justify-between hover:border-blue-500/50 hover:bg-slate-800/80 transition-all duration-500 group shadow-lg hover:shadow-[0_8px_32px_-12px_rgba(59,130,246,0.3)] relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-bl-[100px] -z-10 group-hover:scale-110 transition-transform duration-500"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-500/5 border border-blue-500/30 text-blue-400 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(59,130,246,0.15)] group-hover:scale-110 transition-transform duration-500 group-hover:-rotate-3">
                  <Code size={28} strokeWidth={2.5} />
                </div>
                <span className="text-[11px] font-bold text-blue-400/80 uppercase tracking-widest block mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span> Weeks 1–4 Curriculum
                </span>
                <h3 className="text-2xl font-bold text-slate-100 mb-3 group-hover:text-blue-400 transition-colors">Pre-Hackathon Bootcamps</h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-6 font-medium">
                  Master GIS & Earth Observation, AI/ML, Cloud DevOps, IoT/Hardware/BIM, and Tech Entrepreneurship prior to hackathon weekend.
                </p>
              </div>
              <Link to="/schedule" className="relative z-10 inline-flex items-center gap-2 text-sm font-bold text-blue-400 hover:text-blue-300 transition-colors mt-auto w-fit group/link">
                View Bootcamp Syllabus 
                <span className="bg-blue-500/10 p-1.5 rounded-full group-hover/link:bg-blue-500/20 transition-colors group-hover/link:translate-x-1">
                  <ArrowRight size={14} />
                </span>
              </Link>
            </motion.div>

            {/* Card 3: Mentors & Committees */}
            <motion.div 
              className="p-8 rounded-[1.5rem] bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 flex flex-col justify-between hover:border-purple-500/50 hover:bg-slate-800/80 transition-all duration-500 group shadow-lg hover:shadow-[0_8px_32px_-12px_rgba(168,85,247,0.3)] relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -5 }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-bl-[100px] -z-10 group-hover:scale-110 transition-transform duration-500"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500/20 to-purple-500/5 border border-purple-500/30 text-purple-400 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(168,85,247,0.15)] group-hover:scale-110 transition-transform duration-500 group-hover:rotate-3">
                  <Zap size={28} strokeWidth={2.5} />
                </div>
                <span className="text-[11px] font-bold text-purple-400/80 uppercase tracking-widest block mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span> Leadership & Experts
                </span>
                <h3 className="text-2xl font-bold text-slate-100 mb-3 group-hover:text-purple-400 transition-colors">Mentors & Committees</h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-6 font-medium">
                  1-on-1 guidance from 40+ CTOs and software engineers alongside the 9 student-led organizing committees behind the summit.
                </p>
              </div>
              <Link to="/people" className="relative z-10 inline-flex items-center gap-2 text-sm font-bold text-purple-400 hover:text-purple-300 transition-colors mt-auto w-fit group/link">
                Meet Mentors & Leaders 
                <span className="bg-purple-500/10 p-1.5 rounded-full group-hover/link:bg-purple-500/20 transition-colors group-hover/link:translate-x-1">
                  <ArrowRight size={14} />
                </span>
              </Link>
            </motion.div>

            {/* Card 4: Incubation & Acceleration */}
            <motion.div 
              className="p-8 rounded-[1.5rem] bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 flex flex-col justify-between hover:border-emerald-500/50 hover:bg-slate-800/80 transition-all duration-500 group shadow-lg hover:shadow-[0_8px_32px_-12px_rgba(16,185,129,0.3)] relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              whileHover={{ y: -5 }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-bl-[100px] -z-10 group-hover:scale-110 transition-transform duration-500"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(16,185,129,0.15)] group-hover:scale-110 transition-transform duration-500 group-hover:-rotate-3">
                  <Rocket size={28} strokeWidth={2.5} />
                </div>
                <span className="text-[11px] font-bold text-emerald-400/80 uppercase tracking-widest block mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Startup Launch & Support
                </span>
                <h3 className="text-2xl font-bold text-slate-100 mb-3 group-hover:text-emerald-400 transition-colors">Incubation & Acceleration</h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-6 font-medium">
                  Structured 6-month post-hackathon incubation pathway, expert mentorship, seed acceleration, and startup launch support.
                </p>
              </div>
              <Link to="/schedule" className="relative z-10 inline-flex items-center gap-2 text-sm font-bold text-emerald-400 hover:text-emerald-300 transition-colors mt-auto w-fit group/link">
                Explore Incubation 
                <span className="bg-emerald-500/10 p-1.5 rounded-full group-hover/link:bg-emerald-500/20 transition-colors group-hover/link:translate-x-1">
                  <ArrowRight size={14} />
                </span>
              </Link>
            </motion.div>

            {/* Card 5: Hacker Handbook & Rules */}
            <motion.div 
              className="p-8 rounded-[1.5rem] bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 flex flex-col justify-between hover:border-cyan-500/50 hover:bg-slate-800/80 transition-all duration-500 group shadow-lg hover:shadow-[0_8px_32px_-12px_rgba(6,182,212,0.3)] relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              whileHover={{ y: -5 }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-bl-[100px] -z-10 group-hover:scale-110 transition-transform duration-500"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-cyan-500/5 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(6,182,212,0.15)] group-hover:scale-110 transition-transform duration-500 group-hover:rotate-3">
                  <Shield size={28} strokeWidth={2.5} />
                </div>
                <span className="text-[11px] font-bold text-cyan-400/80 uppercase tracking-widest block mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span> Logistics & Guidelines
                </span>
                <h3 className="text-2xl font-bold text-slate-100 mb-3 group-hover:text-cyan-400 transition-colors">Hacker Handbook & Rules</h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-6 font-medium">
                  Team sizing (3–5 members), free catering/meals, hardware lab access, venue safety, and Demo Day evaluation rubrics.
                </p>
              </div>
              <Link to="/guide" className="relative z-10 inline-flex items-center gap-2 text-sm font-bold text-cyan-400 hover:text-cyan-300 transition-colors mt-auto w-fit group/link">
                Read Hacker Handbook 
                <span className="bg-cyan-500/10 p-1.5 rounded-full group-hover/link:bg-cyan-500/20 transition-colors group-hover/link:translate-x-1">
                  <ArrowRight size={14} />
                </span>
              </Link>
            </motion.div>

            {/* Card 6: Partner & Sponsor Us */}
            <motion.div 
              className="p-8 rounded-[1.5rem] bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 flex flex-col justify-between hover:border-rose-500/50 hover:bg-slate-800/80 transition-all duration-500 group shadow-lg hover:shadow-[0_8px_32px_-12px_rgba(244,63,94,0.3)] relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              whileHover={{ y: -5 }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-bl-[100px] -z-10 group-hover:scale-110 transition-transform duration-500"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500/20 to-rose-500/5 border border-rose-500/30 text-rose-400 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(244,63,94,0.15)] group-hover:scale-110 transition-transform duration-500 group-hover:-rotate-3">
                  <Trophy size={28} strokeWidth={2.5} />
                </div>
                <span className="text-[11px] font-bold text-rose-400/80 uppercase tracking-widest block mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span> Corporate Partnerships
                </span>
                <h3 className="text-2xl font-bold text-slate-100 mb-3 group-hover:text-rose-400 transition-colors">Sponsor TUK Frontier</h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-6 font-medium">
                  Recruit top engineering talent, sponsor custom API challenge tracks, host workshops, and gain high-impact brand alignment.
                </p>
              </div>
              <Link to="/sponsor" className="relative z-10 inline-flex items-center gap-2 text-sm font-bold text-rose-400 hover:text-rose-300 transition-colors mt-auto w-fit group/link">
                Become a Partner / Sponsor 
                <span className="bg-rose-500/10 p-1.5 rounded-full group-hover/link:bg-rose-500/20 transition-colors group-hover/link:translate-x-1">
                  <ArrowRight size={14} />
                </span>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5.8. FAQ Accordion Section */}
      <section className="pt-16 pb-8 border-t border-glass-border bg-tuk-navy-light/10 relative overflow-hidden">
        <div className="container relative z-10 max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked <span className="text-gradient">Questions</span></h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Got questions? We've got answers.</p>
          </div>

          <div className="faq-grid">
            {[
              { q: 'Who is eligible to participate?', a: 'Any student, developer, designer, founder, or tech enthusiast over the age of 18 is welcome! Whether you are a beginner or a veteran coder, we invite you to build with us.' },
              { q: 'Is there a registration fee?', a: 'Nope! Registration, food, drinks, and workspace facilities are 100% free of charge for all accepted hackers.' },
              { q: 'What is the maximum team size?', a: 'Teams can range from 1 to 4 members. If you do not have a team yet, you can participate in our team matching mixer on the first day of the event!' },
              { q: 'What should I bring to the venue?', a: 'Bring your laptop, charger, toiletries (if you plan to stay overnight), and an open mind. We provide high-speed internet, power points, comfortable seating, and catering.' },
              { q: 'How does judging work?', a: 'Judging is done by a panel of independent technical experts, startup founders, and sponsor CTOs based on a rubric evaluating Innovation, Technical Complexity, and Impact.' }
            ].map((faq, idx) => (
              <details 
                key={idx} 
                className="group border border-glass-border bg-slate-900/30 rounded-[1.5rem] overflow-hidden transition-all duration-300 hover:border-slate-700"
                style={{ padding: '0', height: 'fit-content' }}
              >
                <summary className="p-6 flex justify-between items-center cursor-pointer font-bold text-slate-100 select-none list-none text-base md:text-lg">
                  <span>{faq.q}</span>
                  <span className="text-tuk-gold transform transition-transform duration-300 group-open:rotate-180">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                  </span>
                </summary>
                <div className="px-6 pb-6 pt-2 text-slate-400 text-sm md:text-base border-t border-slate-800/40 leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>

        <style>{`
          .faq-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          @media (min-width: 992px) {
            .faq-grid {
              grid-template-columns: repeat(2, 1fr);
              align-items: start;
            }
          }
        `}</style>
      </section>

      {/* 6. Final CTA */}
      <section className="pt-12 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-tuk-navy via-background to-black z-0"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-full bg-tuk-gold/10 blur-[120px] rounded-full z-0"></div>
        
        <div className="container relative z-10 text-center">
          <h2 className="text-5xl md:text-7xl font-extrabold mb-8 drop-shadow-lg">Ready to build?</h2>
          <p className="text-2xl text-gray-300 max-w-2xl mx-auto mb-12">Applications close soon. Don't miss your chance to be part of history.</p>
          <Link to="/register" className="btn btn-primary text-xl px-12 py-5 shadow-[0_0_40px_rgba(255,215,0,0.5)] hover:scale-105 transition-transform duration-300">
            Apply Now
          </Link>
        </div>
      </section>

    </div>
  );
}


