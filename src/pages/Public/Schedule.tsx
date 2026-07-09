import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

export default function Schedule() {
  const [scheduleData, setScheduleData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      const { data } = await supabase.from('tuk_hackathon_content').select('*').eq('key', 'schedule').single();
      if (data && data.value && data.value.length > 0) {
        setScheduleData(data.value);
      } else {
        setScheduleData([
          { day: 'Day 1: Kickoff', date: 'Friday, Oct 24', events: [
            { time: '09:00 AM', title: 'Registration & Swag Pickup', location: 'Main Hall' },
            { time: '10:30 AM', title: 'Opening Ceremony', location: 'Auditorium' },
            { time: '11:30 AM', title: 'Team Formation & Ideation', location: 'Networking Area' },
            { time: '12:30 PM', title: 'Lunch Break', location: 'Cafeteria' },
            { time: '01:30 PM', title: 'Hacking Begins!', location: 'Hacking Arena' },
            { time: '05:00 PM', title: 'Mentor Check-in 1', location: 'Hacking Arena' },
          ]},
          { day: 'Day 2: Build & Learn', date: 'Saturday, Oct 25', events: [
            { time: '09:00 AM', title: 'Breakfast', location: 'Cafeteria' },
            { time: '10:00 AM', title: 'Workshop: Intro to Supabase', location: 'Room 101' },
            { time: '01:00 PM', title: 'Lunch', location: 'Cafeteria' },
            { time: '03:00 PM', title: 'Mentor Check-in 2', location: 'Hacking Arena' },
            { time: '07:00 PM', title: 'Dinner & Game Night', location: 'Lounge' },
          ]},
          { day: 'Day 3: Final Push', date: 'Sunday, Oct 26', events: [
            { time: '08:00 AM', title: 'Breakfast', location: 'Cafeteria' },
            { time: '11:00 AM', title: 'Submission Deadline', location: 'Online Portal' },
            { time: '12:00 PM', title: 'Lunch', location: 'Cafeteria' },
            { time: '01:00 PM', title: 'Judging & Pitches', location: 'Auditorium' },
            { time: '04:00 PM', title: 'Closing Ceremony & Awards', location: 'Auditorium' },
          ]},
        ]);
      }
      setLoading(false);
    };
    fetchContent();
  }, []);

  return (
    <div className="container pt-8 pb-16">
      <div className="text-center mb-12">
        <h1 className="text-gradient">Event Schedule</h1>
        <p style={{ maxWidth: '600px', margin: '1rem auto' }}>
          Plan your hackathon weekend. All times are in EAT (East Africa Time).
        </p>
      </div>

      <div className="flex flex-col gap-8 max-w-4xl mx-auto">
        {loading ? (
           <div className="text-center py-12">Loading schedule...</div>
        ) : (
          scheduleData.map((day, dayIndex) => (
            <motion.div 
              key={dayIndex}
              className="glass-card"
              style={{ padding: '2rem', marginBottom: '2rem', borderRadius: 'var(--radius-xl)' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
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
  );
}
