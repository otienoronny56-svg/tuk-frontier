import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Rocket, Target, Trophy, Clock, ArrowRight, Code, Zap, Globe, Coins, Cpu, Leaf, CheckCircle as CheckCircleIcon } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const COUNTDOWN_TARGET = new Date('2026-10-02T09:00:00+03:00').getTime();

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [sponsors, setSponsors] = useState<any[]>([]);
  const [tracks, setTracks] = useState<any[]>([]);
  const [timeline, setTimeline] = useState<any[]>([]);
  
  const [terminalLines, setTerminalLines] = useState([
    { text: '$ initialize_hackathon --year 2026', color: '#4ade80' },
    { text: '[OK] Loading modules...', color: '#67e8f9' },
    { text: '[OK] Connecting to global network...', color: '#67e8f9' },
    { text: 'const mission = await buildFuture();', color: '#c084fc' },
    { text: "if (mission.status === 'success') {", color: '#93c5fd' },
    { text: '  console.log("Welcome to TUK Frontier!");', color: '#cbd5e1' },
    { text: '}', color: '#93c5fd' }
  ]);

  useEffect(() => {
    const hackerLines = [
      { text: 'Unlocking Ksh 1,000,000 prize pool...', color: '#fef08a' },
      { text: 'Loading caffeine modules... 99%', color: '#4ade80' },
      { text: 'Syncing with top tech recruiters...', color: '#67e8f9' },
      { text: 'Deploying next-gen AI models...', color: '#c084fc' },
      { text: '[ALERT] Midnight pizza delivery inbound!', color: '#ef4444' },
      { text: 'Optimizing pitch decks for investors...', color: '#cbd5e1' },
      { text: 'Compiling winning code architecture...', color: '#bbf7d0' },
      { text: 'Connecting to industry mentors...', color: '#93c5fd' },
      { text: 'Resolving merge conflicts... [SUCCESS]', color: '#4ade80' },
      { text: 'Booting up 48-hour grind mode...', color: '#fdba74' },
      { text: 'Pushing final commit to production...', color: '#c084fc' }
    ];

    const interval = setInterval(() => {
      const randomLine = hackerLines[Math.floor(Math.random() * hackerLines.length)];
      setTerminalLines(prev => {
        const newLines = [...prev, randomLine];
        return newLines.length > 7 ? newLines.slice(newLines.length - 7) : newLines;
      });
    }, 1800);
    return () => clearInterval(interval);
  }, []);

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
          { time: 'Friday, Oct 2 • 9:00 AM', title: 'Kickoff & Team Formation', desc: 'Arrive at Technical University of Kenya. Grab your developer badges, find your teammates, or form one on the spot. Sponsors present their API toolkits.', icon: 'rocket' },
          { time: 'Friday, Oct 2 • 12:00 PM', title: 'Coding Begins', desc: 'The countdown clock starts ticking. Turn on developer mode. Lunch is served, and mentor channels are declared open.', icon: 'code' },
          { time: 'Friday, Oct 2 • 8:00 PM', title: 'Midnight Pizza & Chill', desc: 'Grab hot pizza and soda. Take a break, listen to a lightning talk, or test your skills in mini gaming contests.', icon: 'zap' },
          { time: 'Saturday, Oct 3 • 10:00 AM', title: 'Midpoint Review & Pitch Mentorship', desc: 'Sync with mentors and guest CTOs to refine your prototype. Prepare your pitch slide and video submission.', icon: 'trophy' },
          { time: 'Saturday, Oct 3 • 4:00 PM', title: 'Submission Deadline', desc: 'Submit repository links, PDF pitch deck, and video demo. No late commits accepted!', icon: 'check' },
          { time: 'Saturday, Oct 3 • 6:00 PM', title: 'Judging & Closing Awards', desc: 'Top teams pitch live on stage to a panel of expert VCs and tech executives. Winners crowned and prizes distributed!', icon: 'rocket' }
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
              October 2-3, 2026 • Technical University of Kenya
            </div>

            <h1 className="font-extrabold mb-6 leading-[1.1] tracking-tight text-left" style={{ fontSize: 'clamp(2.2rem, 7vw, 5rem)', color: 'var(--foreground)', wordBreak: 'break-word', overflowWrap: 'break-word', width: '100%' }}>
              TUK <span style={{ color: '#4ade80' }}>Frontier.</span><br />
              <span style={{ color: 'var(--foreground)', opacity: 0.8, fontSize: 'clamp(1.3rem,4.5vw,3.5rem)' }}>Shape the Future.</span>
            </h1>

            <p className="text-base md:text-xl mb-10 font-medium max-w-xl leading-relaxed text-left" style={{ color: 'var(--muted-foreground)' }}>
              A 48-hour community-driven programming and designing hackathon, encouraging hackers to shape their ideas into reality. Connect with industry leaders and win massive prizes.
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
          <motion.div
            className="hero-terminal relative flex flex-col items-center justify-center gap-8 w-full mt-8 md:mt-0 md:max-w-[40%] h-[400px] md:h-[500px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            {/* Countdown Timer (Moved to Right Column) */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', width: '100%' }}>
              {[
                { label: 'Days', value: timeLeft.days },
                { label: 'Hours', value: timeLeft.hours },
                { label: 'Minutes', value: timeLeft.minutes },
                { label: 'Seconds', value: timeLeft.seconds }
              ].map((unit, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minWidth: '60px' }}>
                  <div className="text-2xl sm:text-3xl font-black leading-none mb-1 tabular-nums" style={{ color: 'var(--foreground)' }}>{String(unit.value).padStart(2, '0')}</div>
                  <div className="text-[10px] sm:text-xs uppercase tracking-[0.1em] font-semibold" style={{ color: 'var(--muted-foreground)' }}>{unit.label}</div>
                </div>
              ))}
            </div>

            {/* Animated Code Terminal Window */}
            <div className="w-full max-w-lg rounded-xl shadow-2xl overflow-hidden z-10" style={{ backgroundColor: '#0f172a', border: '1px solid rgba(51,65,85,0.5)', filter: 'drop-shadow(0 25px 35px rgba(0,0,0,0.4))' }}>
              {/* Terminal Header */}
              <div className="px-4 py-3 flex items-center gap-2" style={{ backgroundColor: '#1e293b', borderBottom: '1px solid rgba(51,65,85,0.5)' }}>
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#ef4444' }}></div>
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#eab308' }}></div>
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#22c55e' }}></div>
                <div className="ml-2 text-xs font-mono" style={{ color: '#94a3b8' }}>hacker@summit: ~</div>
              </div>
              {/* Terminal Body with typing animation */}
              <div className="p-6 font-mono text-sm leading-relaxed flex flex-col justify-end" style={{ color: '#cbd5e1', height: '280px', overflow: 'hidden' }}>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', minHeight: '100%' }}>
                  {terminalLines.map((line, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, x: -10 }} 
                      animate={{ opacity: 1, x: 0 }} 
                      transition={{ duration: 0.3 }}
                      className="mb-2 whitespace-pre" style={{ color: line.color }}
                    >
                      {line.text}
                    </motion.div>
                  ))}
                  <div>
                    <motion.div 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: [0, 1, 0] }} 
                      transition={{ repeat: Infinity, duration: 1 }}
                      className="mt-1 w-2 h-4 inline-block" style={{ backgroundColor: '#94a3b8' }}
                    ></motion.div>
                  </div>
                </div>
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
              { icon: <Trophy size={28} />, title: "KSh 6.5M+ Prizes", desc: "Cash prizes, credits, and hardware.", accent: '#fbbf24', grad: 'linear-gradient(135deg, rgba(251,191,36,0.14) 0%, rgba(251,191,36,0.04) 100%)', border: 'rgba(251,191,36,0.3)' },
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
            { id: '1', title: 'Artificial Intelligence', prize_pool: 'KSh 2,500,000 Prize Pool', description: 'Build the next generation of autonomous agents, LLM wrappers, or computer vision tools.', iconType: 'cpu' },
            { id: '2', title: 'FinTech & Web3', prize_pool: 'KSh 2,000,000 Prize Pool', description: 'Revolutionize payments, create novel DeFi protocols, or build financial inclusion tools.', iconType: 'coins' },
            { id: '3', title: 'Green Tech', prize_pool: 'KSh 2,000,000 Prize Pool', description: 'Leverage technology to fight climate change, optimize energy, or promote sustainability.', iconType: 'leaf' }
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
              <h3 className="text-5xl md:text-6xl font-black text-[#4ade80] tracking-tight">50+</h3>
              <div>
                <p className="text-lg font-semibold text-slate-200">Expert Mentors</p>
                <p className="text-sm text-slate-400 mt-2">CTOs, software engineers, and founders guiding you full time.</p>
              </div>
            </div>

            <div className="md:col-span-1 p-8 rounded-[2rem] bg-slate-900/30 border border-slate-800/80 flex flex-col justify-between min-h-[220px]">
              <h3 className="text-5xl md:text-6xl font-black text-purple-400 tracking-tight">100+</h3>
              <div>
                <p className="text-lg font-semibold text-slate-200">Hacker Teams</p>
                <p className="text-sm text-slate-400 mt-2">Collaborating and competing from top tier regional tech hubs.</p>
              </div>
            </div>

            <div className="md:col-span-1 p-8 rounded-[2rem] bg-slate-900/30 border border-slate-800/80 flex flex-col justify-between min-h-[220px]">
              <h3 className="text-5xl md:text-6xl font-black text-blue-400 tracking-tight">48h</h3>
              <div>
                <p className="text-lg font-semibold text-slate-200">Pure Creation</p>
                <p className="text-sm text-slate-400 mt-2">Non-stop workspace with constant high speed internet.</p>
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
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Track the 48-hour journey from idea to deployment.</p>
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
              <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: `repeat(${Math.min(days.length, 2)}, 1fr)`, gap: '2rem', alignItems: 'start' }}>
                {days.map((day, dayIdx) => {
                  const color = colors[dayIdx % colors.length];
                  return (
                    <div key={dayIdx} style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                      {/* Day header */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                        <div style={{ height: '2px', flex: 1, background: `linear-gradient(to right, ${color}, transparent)` }} />
                        <span style={{ padding: '0.35rem 1.25rem', borderRadius: '999px', border: `1px solid ${color}55`, background: `${color}11`, fontSize: '0.8rem', fontWeight: 700, color, whiteSpace: 'nowrap' }}>
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
                            initial={{ opacity: 0, x: dayIdx === 0 ? -24 : 24 }}
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
                              <div style={{ fontSize: '0.75rem', fontWeight: 700, color, marginBottom: '0.35rem' }}>
                                {step.time.split('•')[1]?.trim()}
                              </div>
                              <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--foreground)', margin: '0 0 0.35rem 0' }}>{step.title}</h4>
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



      {/* 5.3. FAQ Accordion Section */}
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


