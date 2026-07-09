import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { PlusCircle, Target } from 'lucide-react';

export default function OrganizationDashboard({ userId }: { userId: string }) {
  const [tracks, setTracks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [prizePool, setPrizePool] = useState('');
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchTracks();
  }, [userId]);

  const fetchTracks = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('tuk_hackathon_tracks')
      .select('*')
      .eq('organization_id', userId)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setTracks(data);
    }
    setLoading(false);
  };

  const handleCreateTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);

    const { error } = await supabase
      .from('tuk_hackathon_tracks')
      .insert([{ 
        organization_id: userId, 
        title, 
        description, 
        prize_pool: prizePool 
      }]);

    if (error) {
      alert("Error creating track: " + error.message);
    } else {
      setTitle('');
      setDescription('');
      setPrizePool('');
      fetchTracks();
    }
    setActionLoading(false);
  };

  if (loading) return <p>Loading organization data...</p>;

  return (
    <div className="mt-8">
      <div className="grid md:grid-cols-3 gap-8">
        
        {/* Create Track Form */}
        <div className="md:col-span-1">
          <div className="glass-card">
            <div className="flex items-center gap-2 mb-4">
              <PlusCircle size={24} color="var(--tuk-gold)" />
              <h3 style={{ margin: 0 }}>Sponsor a Track</h3>
            </div>
            <form onSubmit={handleCreateTrack}>
              <div className="form-group">
                <label className="form-label">Track Title</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  required
                  placeholder="e.g. Best Fintech Hack"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Description / Requirements</label>
                <textarea 
                  className="form-input" 
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  required
                  rows={4}
                  placeholder="Describe the challenge..."
                />
              </div>
              <div className="form-group">
                <label className="form-label">Prize Pool</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={prizePool}
                  onChange={e => setPrizePool(e.target.value)}
                  placeholder="e.g. KSh 130,000 + Internships"
                />
              </div>
              <button type="submit" className="btn btn-primary w-full" disabled={actionLoading}>
                {actionLoading ? 'Creating...' : 'Create Track'}
              </button>
            </form>
          </div>
        </div>

        {/* List of Tracks */}
        <div className="md:col-span-2">
          <div className="glass-card" style={{ height: '100%' }}>
            <div className="flex items-center gap-2 mb-4">
              <Target size={24} color="var(--tuk-gold)" />
              <h3 style={{ margin: 0 }}>Your Sponsored Tracks</h3>
            </div>
            
            {tracks.length === 0 ? (
              <p className="text-muted-foreground mt-4">You haven't created any challenge tracks yet.</p>
            ) : (
              <div className="flex flex-col gap-4 mt-4">
                {tracks.map(track => (
                  <div key={track.id} className="glass p-4" style={{ borderRadius: 'var(--radius-md)' }}>
                    <h4 style={{ marginBottom: '0.5rem', color: 'var(--tuk-gold)' }}>{track.title}</h4>
                    <p style={{ fontSize: '0.875rem', marginBottom: '1rem' }}>{track.description}</p>
                    <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>Prize: {track.prize_pool || 'N/A'}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
