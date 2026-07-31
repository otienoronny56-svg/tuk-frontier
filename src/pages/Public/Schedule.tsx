import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, BookOpen, Briefcase } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

export default function Schedule() {
  const [activeTab, setActiveTab] = useState<'main' | 'bootcamps' | 'pathway'>('main');
  const [scheduleData, setScheduleData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      const { data } = await supabase.from('tuk_hackathon_content').select('*').eq('key', 'schedule').single();
      if (data && data.value && data.value.length > 0) {
        setScheduleData(data.value);
      } else {
        setScheduleData([
          { day: 'Day 1: Kickoff & Challenge Reveal', date: 'Friday, Day 1', events: [
            { time: '08:30 AM', title: 'Opening Ceremony & Keynotes', location: 'TUK Main Auditorium' },
            { time: '10:30 AM', title: 'Challenge Track Reveal & Team Registration', location: 'Auditorium' },
            { time: '11:30 AM', title: 'Hackathon Begins (72-Hour Clock Starts)', location: 'FEBE Innovation Hub' },
            { time: '02:00 PM', title: 'Problem Definition Workshops & Mentor Check-Ins', location: 'Breakout Rooms' },
            { time: '07:00 PM', title: 'Dinner & Evening Build Session', location: 'Main Dining Hall' },
          ]},
          { day: 'Day 2: Deep Build & Technical Clinics', date: 'Saturday, Day 2', events: [
            { time: '09:00 AM', title: 'Progress Pitches & Expert Panels', location: 'FEBE Innovation Hub' },
            { time: '11:00 AM', title: 'Technical Clinics (GIS, AI, BIM, IoT)', location: 'Computer Labs' },
            { time: '02:00 PM', title: 'Deep Build Sessions & Mentor Reviews', location: 'Innovation Hub' },
            { time: '06:00 PM', title: 'Pitch Deck & Demo Prep Workshops', location: 'Breakout Rooms' },
          ]},
          { day: 'Day 3: Submissions, Demo Day & Career Fair', date: 'Sunday, Day 3', events: [
            { time: '09:00 AM', title: 'Final Code Builds & Prototype Polishing', location: 'FEBE Innovation Hub' },
            { time: '12:00 PM', title: 'Final Project Submissions Deadline', location: 'Online Portal' },
            { time: '01:30 PM', title: 'Demo Day Pitches to Judges', location: 'Auditorium' },
            { time: '03:30 PM', title: 'Career & Recruitment Fair / Exhibition', location: 'TUK Quadrangle' },
            { time: '05:00 PM', title: 'Awards Ceremony & Closing Remarks', location: 'Auditorium' },
          ]},
        ]);
      }
      setLoading(false);
    };
    fetchContent();
  }, []);

  const bootcamps = [
    { title: 'GIS & Earth Observation', weeks: 'Week 1', desc: 'ArcGIS, QGIS, Google Earth Engine, satellite imagery processing, drone data & remote sensing.', icon: <BookOpen className="text-blue-400" /> },
    { title: 'AI & Machine Learning', weeks: 'Week 2', desc: 'Python data science, TensorFlow, Scikit-learn, Computer Vision, NLP, and LLM API integrations.', icon: <BookOpen className="text-purple-400" /> },
    { title: 'Cloud, DevOps & Backend', weeks: 'Week 3', desc: 'AWS / GCP / Azure fundamentals, Docker containers, RESTful APIs, CI/CD, and Supabase integration.', icon: <BookOpen className="text-emerald-400" /> },
    { title: 'IoT, Hardware & BIM Tech', weeks: 'Week 4', desc: 'Arduino & Raspberry Pi sensor integration, BIM tools for smart buildings, and rapid 3D prototyping.', icon: <BookOpen className="text-amber-400" /> },
    { title: 'Entrepreneurship & Pitching', weeks: 'Week 4', desc: 'Business model canvas, market research, pitch deck creation, financial modeling, and legal basics.', icon: <BookOpen className="text-rose-400" /> },
  ];

  const pathwaySteps = [
    { title: 'Phase 1: Pre-Hackathon Bootcamps', time: 'Weeks 1–4', desc: 'Technical & entrepreneurial skill building across 5 core technical domains.' },
    { title: 'Phase 2: Mentorship Matching', time: 'Pre-Event', desc: 'Each team is paired with an industry expert, academic mentor, or startup founder.' },
    { title: 'Phase 3: The 72-Hour Hackathon', time: 'Event Weekend', desc: 'Non-stop build session with dataset access, hardware labs, and mentor clinics.' },
    { title: 'Phase 4: Demo Day & Awards', time: 'Day 3 Afternoon', desc: '8-minute finalist pitches + 5-minute Q&A in front of investors, CTOs, and faculty.' },
    { title: 'Phase 5: Career & Recruitment Fair', time: 'Day 3 Afternoon', desc: 'Employer booths, CV drops, on-site interviews, and internship placement offers.' },
    { title: 'Phase 6: Startup Showcase & Exhibition', time: 'Day 3 Afternoon', desc: 'Curated public showcase for investors and government agencies to identify high-potential tech.' },
    { title: 'Phase 7: Post-Event Incubation', time: 'Months 1–6 Post-Event', desc: 'Structured incubation pathway offering workspace, seed funding applications, and acceleration.' }
  ];

  return (
    <div className="container pt-8 pb-16">
      <div className="text-center mb-16">
        <h1 className="text-gradient">Programme & Schedule</h1>
        <p style={{ maxWidth: '700px', margin: '1rem auto' }} className="text-muted-foreground text-lg">
          Explore the full innovation journey — from Pre-Hackathon Bootcamps to the 72-Hour Summit and Post-Event Incubation.
        </p>
      </div>

      {/* Section 1: Main 72-Hour Schedule */}
      <div className="mb-24">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">72-Hour Main Hackathon</h2>
          <p className="text-sm text-muted-foreground">The core build weekend.</p>
        </div>
        <div className="flex flex-col gap-8 max-w-4xl mx-auto">
          {loading ? (
             <div className="text-center py-12">Loading schedule...</div>
          ) : (
            scheduleData.map((day, dayIndex) => (
              <motion.div 
                key={dayIndex}
                className="glass-card"
                style={{ padding: '2rem', borderRadius: 'var(--radius-xl)' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: dayIndex * 0.1 }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border)' }}>
                  <Calendar color="var(--tuk-gold)" size={24} />
                  <div>
                    <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700, color: 'var(--foreground)' }}>{day.day}</h2>
                    <div style={{ color: 'var(--primary)', fontSize: '0.875rem', fontWeight: 600 }}>{day.date}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {day.events?.map((event: any, i: number) => (
                    <div 
                      key={i} 
                      style={{ 
                        display: 'flex', 
                        flexWrap: 'wrap',
                        alignItems: 'center', 
                        gap: '1rem', 
                        padding: '0.75rem 1rem', 
                        backgroundColor: 'var(--muted, rgba(128, 128, 128, 0.08))', 
                        borderRadius: '8px',
                        border: '1px solid var(--border)'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', width: '110px', flexShrink: 0 }}>
                        <Clock size={14} color="var(--tuk-gold)" />
                        <span style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--primary)' }}>{event.time}</span>
                      </div>
                      
                      <div style={{ flex: '1 1 200px', fontWeight: 600, color: 'var(--foreground)', fontSize: '1rem' }}>
                        {event.title}
                      </div>
                      
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.875rem', color: 'var(--muted-foreground)', width: '150px', flexShrink: 0 }}>
                        <MapPin size={14} />
                        <span>{event.location}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* Section 2: Pre-Hackathon Bootcamps */}
      <div className="mb-24 max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Phase 1: Pre-Hackathon Bootcamps (Weeks 1–4)</h2>
          <p className="text-sm text-muted-foreground">Comprehensive technical workshops preceding the 72-hour hackathon weekend.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {bootcamps.map((boot, i) => (
            <div key={i} className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-800 text-tuk-gold">{boot.weeks}</span>
                  {boot.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{boot.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{boot.desc}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800/60 text-[11px] text-slate-400">Open to all registered TUK students & partner university participants</div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 3: Career Fair & Incubation Pathway */}
      <div className="max-w-4xl mx-auto mb-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2">Phases 2–7: Mentorship Through Incubation</h2>
          <p className="text-sm text-muted-foreground">The full ecosystem supporting project longevity, employment, and startup launch.</p>
        </div>

        <div className="space-y-6">
          {pathwaySteps.map((step, i) => (
            <div key={i} className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-tuk-gold/10 border border-tuk-gold/30 text-tuk-gold font-bold flex items-center justify-center flex-shrink-0">
                {i + 1}
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-lg font-bold">{step.title}</h3>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-emerald-400 font-semibold">{step.time}</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
