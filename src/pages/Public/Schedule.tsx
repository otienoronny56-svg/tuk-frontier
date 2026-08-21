import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

export default function Schedule() {
  const [scheduleData, setScheduleData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      const { data } = await supabase.from('tuk_hackathon_content').select('*').eq('key', 'schedule').single();
      if (data && data.value && Array.isArray(data.value) && data.value.length > 0) {
        setScheduleData(data.value);
      } else {
        setScheduleData([]);
      }
      setLoading(false);
    };
    fetchContent();
  }, []);

  return (
    <div className="container pt-8 pb-16">
      <div className="text-center mb-16">
        <h1 className="text-gradient">Programme & Schedule</h1>
        <p style={{ maxWidth: '700px', margin: '1rem auto' }} className="text-muted-foreground text-lg">
          The official 72-hour summit itinerary and session schedule.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        {loading ? (
          <div className="text-center py-16 text-muted-foreground">Loading schedule...</div>
        ) : scheduleData.length > 0 ? (
          <div className="flex flex-col gap-8">
            {scheduleData.map((day, dayIndex) => (
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
                    {day.date && <div style={{ color: 'var(--primary)', fontSize: '0.875rem', fontWeight: 600 }}>{day.date}</div>}
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
                      
                      {event.location && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.875rem', color: 'var(--muted-foreground)', width: '150px', flexShrink: 0 }}>
                          <MapPin size={14} />
                          <span>{event.location}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center p-12 rounded-3xl bg-slate-900/40 border border-slate-800"
          >
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto mb-6">
              <Calendar size={32} />
            </div>
            <h3 className="text-2xl font-bold text-slate-100 mb-3">Programme to be announced soon</h3>
            <p className="text-muted-foreground max-w-md mx-auto mb-8 text-sm leading-relaxed">
              The detailed schedule for keynotes, hacking sessions, mentor clinics, and demo day will be published closer to the summit date.
            </p>
            <div className="flex justify-center gap-4">
              <Link to="/register" className="btn btn-primary px-6 py-2.5 rounded-xl font-bold">
                Register for Summit →
              </Link>
              <Link to="/guide" className="btn btn-outline px-6 py-2.5 rounded-xl font-bold">
                View Hacker Guide
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
