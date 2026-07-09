import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Target, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Tracks() {
  const [tracks, setTracks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTracks = async () => {
      const { data } = await supabase
        .from('tuk_hackathon_tracks')
        .select('*, organization:tuk_hackathon_profiles(full_name)')
        .order('created_at', { ascending: false });
      
      if (data) setTracks(data);
      setLoading(false);
    };

    fetchTracks();
  }, []);

  return (
    <div className="container pt-8 pb-16">
      <div className="text-center mb-12">
        <h1 className="text-gradient">Challenge Tracks</h1>
        <p style={{ maxWidth: '600px', margin: '1rem auto' }}>
          Explore the challenges sponsored by our partners. Build innovative solutions 
          targeted at these specific domains to compete for track-specific prizes.
        </p>
      </div>

      {loading ? (
        <p className="text-center">Loading tracks...</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          {tracks.length === 0 ? (
            <p className="text-center col-span-2 text-muted-foreground">No tracks have been announced yet. Check back soon!</p>
          ) : (
            tracks.map((track, index) => (
              <motion.div 
                key={track.id} 
                className="group transition-all duration-300"
                style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  padding: '0', 
                  minHeight: '360px', 
                  borderRadius: 'var(--radius-2xl)',
                  minWidth: 0,
                  width: '100%',
                  maxWidth: '100%',
                  overflow: 'hidden',
                  position: 'relative',
                  background: 'var(--glass-bg)',
                  border: '1px solid var(--glass-border)',
                  backdropFilter: 'blur(16px)',
                  boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.1)'
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                {track.image_url && (
                  <div style={{ width: '100%', height: '250px', overflow: 'hidden', position: 'relative', flexShrink: 0, borderBottom: '1px solid var(--glass-border)' }}>
                    <img src={track.image_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} className="group-hover:scale-110 transition-transform duration-700 ease-in-out" />
                  </div>
                )}
                
                <div className="flex-1 flex flex-col justify-between p-6">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <Target size={24} color="var(--tuk-gold)" className="flex-shrink-0" />
                      <h2 style={{ margin: 0, fontSize: '1.5rem', color: 'var(--foreground)' }}>{track.title}</h2>
                    </div>
                    <p style={{ marginBottom: '1.5rem', fontSize: '0.925rem', color: 'var(--muted-foreground)' }}>{track.description}</p>
                  </div>
                  
                  <div className="flex justify-between items-center p-4 mt-auto" style={{ background: 'var(--muted, rgba(128,128,128,0.05))', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-md)' }}>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)' }}>Sponsored by</div>
                      <div style={{ fontWeight: 600, color: 'var(--foreground)' }}>{track.organization?.full_name || 'TUK Frontier'}</div>
                    </div>
                    {track.prize_pool && (
                      <div className="text-right flex items-center gap-2">
                        <Trophy size={18} color="#10b981" />
                        <div style={{ fontWeight: 600, color: '#10b981' }}>{track.prize_pool}</div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
