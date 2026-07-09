import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { ShieldAlert, Users, FolderKanban, Activity, Search, Target, FileText, UserPlus, HeartHandshake, RefreshCw, Plus, Trash2, Image as ImageIcon } from 'lucide-react';

// --- Sub-components for CMS Forms ---
function FAQEditor({ data, onSave }: { data: any[], onSave: (val: any) => void }) {
  const [items, setItems] = useState(data || []);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {items.map((item, i) => (
        <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'start', padding: '1rem', background: 'var(--muted)', border: '1px solid var(--glass-border)', borderRadius: '12px' }}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <input className="form-input" style={{ marginBottom: 0, borderRadius: '8px', background: 'var(--muted)', border: '1px solid var(--glass-border)', color: 'var(--foreground)' }} placeholder="Question" value={item.q} onChange={e => { const newItems = [...items]; newItems[i].q = e.target.value; setItems(newItems); }} />
            <input className="form-input" style={{ marginBottom: 0, borderRadius: '8px', background: 'var(--muted)', border: '1px solid var(--glass-border)', color: 'var(--foreground)' }} placeholder="Answer" value={item.a} onChange={e => { const newItems = [...items]; newItems[i].a = e.target.value; setItems(newItems); }} />
          </div>
          <button onClick={() => setItems(items.filter((_, idx) => idx !== i))} className="btn btn-outline text-red-500 hover:bg-red-500 hover:text-white" style={{ padding: '0.5rem', borderRadius: '8px' }}><Trash2 size={16}/></button>
        </div>
      ))}
      <button onClick={() => setItems([...items, { q: '', a: '' }])} className="btn btn-outline" style={{ padding: '0.5rem 1rem', borderRadius: '8px', alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Plus size={16}/> Add FAQ</button>
      <div style={{ textAlign: 'right', marginTop: '1rem' }}><button className="btn btn-primary" style={{ padding: '0.5rem 1.5rem', borderRadius: '8px' }} onClick={() => onSave(items)}>Save FAQs</button></div>
    </div>
  );
}

function RulesEditor({ data, onSave }: { data: string[], onSave: (val: any) => void }) {
  const [items, setItems] = useState<string[]>(data || []);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {items.map((item, i) => (
        <div key={i} style={{ display: 'flex', items: 'center', gap: '1rem' }}>
          <input className="form-input" style={{ flex: 1, marginBottom: 0, borderRadius: '8px', background: 'var(--muted)', border: '1px solid var(--glass-border)', color: 'var(--foreground)' }} placeholder="Rule description..." value={item} onChange={e => { const newItems = [...items]; newItems[i] = e.target.value; setItems(newItems); }} />
          <button onClick={() => setItems(items.filter((_, idx) => idx !== i))} className="btn btn-outline text-red-500 hover:bg-red-500 hover:text-white" style={{ padding: '0.5rem', borderRadius: '8px' }}><Trash2 size={16}/></button>
        </div>
      ))}
      <button onClick={() => setItems([...items, ''])} className="btn btn-outline" style={{ padding: '0.5rem 1rem', borderRadius: '8px', alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Plus size={16}/> Add Rule</button>
      <div style={{ textAlign: 'right', marginTop: '1rem' }}><button className="btn btn-primary" style={{ padding: '0.5rem 1.5rem', borderRadius: '8px' }} onClick={() => onSave(items)}>Save Rules</button></div>
    </div>
  );
}

function ScheduleEditor({ data, onSave }: { data: any[], onSave: (val: any) => void }) {
  const [days, setDays] = useState(data || []);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {days.map((day, dayIndex) => (
        <div key={dayIndex} style={{ padding: '1.25rem', background: 'var(--muted)', border: '1px solid var(--glass-border)', borderRadius: '1rem' }}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.25rem', paddingBottom: '1rem', borderBottom: '1px solid var(--glass-border)' }}>
            <input className="form-input" style={{ flex: 1, marginBottom: 0, borderRadius: '8px', background: 'var(--muted)', border: '1px solid var(--glass-border)', color: 'var(--foreground)' }} placeholder="Day Title (e.g. Day 1: Kickoff)" value={day.day} onChange={e => { const newDays = [...days]; newDays[dayIndex].day = e.target.value; setDays(newDays); }} />
            <input className="form-input" style={{ flex: 1, marginBottom: 0, borderRadius: '8px', background: 'var(--muted)', border: '1px solid var(--glass-border)', color: 'var(--foreground)' }} placeholder="Date (e.g. Oct 24)" value={day.date} onChange={e => { const newDays = [...days]; newDays[dayIndex].date = e.target.value; setDays(newDays); }} />
            <button onClick={() => setDays(days.filter((_, idx) => idx !== dayIndex))} className="btn btn-outline text-red-500 hover:bg-red-500 hover:text-white" style={{ padding: '0.5rem', borderRadius: '8px' }}><Trash2 size={16}/></button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingLeft: '1rem' }}>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--muted-foreground)', marginBottom: '0.25rem' }}>Events for this day:</h4>
            {day.events?.map((ev: any, evIndex: number) => (
              <div key={evIndex} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <input className="form-input" style={{ width: '120px', marginBottom: 0, borderRadius: '8px', background: 'var(--muted)', border: '1px solid var(--glass-border)', color: 'var(--foreground)' }} placeholder="Time" value={ev.time} onChange={e => { const newDays = [...days]; newDays[dayIndex].events[evIndex].time = e.target.value; setDays(newDays); }} />
                <input className="form-input" style={{ flex: 2, marginBottom: 0, borderRadius: '8px', background: 'var(--muted)', border: '1px solid var(--glass-border)', color: 'var(--foreground)' }} placeholder="Event Title" value={ev.title} onChange={e => { const newDays = [...days]; newDays[dayIndex].events[evIndex].title = e.target.value; setDays(newDays); }} />
                <input className="form-input" style={{ flex: 1, marginBottom: 0, borderRadius: '8px', background: 'var(--muted)', border: '1px solid var(--glass-border)', color: 'var(--foreground)' }} placeholder="Location" value={ev.location} onChange={e => { const newDays = [...days]; newDays[dayIndex].events[evIndex].location = e.target.value; setDays(newDays); }} />
                <button onClick={() => { const newDays = [...days]; newDays[dayIndex].events = newDays[dayIndex].events.filter((_: any, idx: number) => idx !== evIndex); setDays(newDays); }} style={{ color: '#ef4444', background: 'transparent', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>✕</button>
              </div>
            ))}
            <button onClick={() => { const newDays = [...days]; newDays[dayIndex].events = [...(newDays[dayIndex].events || []), { time: '', title: '', location: '' }]; setDays(newDays); }} className="btn btn-outline" style={{ padding: '0.35rem 0.75rem', borderRadius: '6px', fontSize: '0.75rem', alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Plus size={14}/> Add Event</button>
          </div>
        </div>
      ))}
      <button onClick={() => setDays([...days, { day: '', date: '', events: [] }])} className="btn btn-outline" style={{ padding: '0.5rem 1rem', borderRadius: '8px', alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Plus size={16}/> Add Day</button>
      <div style={{ textAlign: 'right', marginTop: '1rem' }}><button className="btn btn-primary" style={{ padding: '0.5rem 1.5rem', borderRadius: '8px' }} onClick={() => onSave(days)}>Save Schedule</button></div>
    </div>
  );
}

function GalleryEditor({ data, onSave }: { data: string[], onSave: (val: any) => void }) {
  const [items, setItems] = useState<string[]>(data || []);
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    
    setUploading(true);
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    try {
      const { error: uploadError } = await supabase.storage.from('gallery').upload(filePath, file);
      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage.from('gallery').getPublicUrl(filePath);
      if (publicUrlData) {
        setItems([...items, publicUrlData.publicUrl]);
      }
    } catch (error: any) {
      alert("Error uploading image: " + error.message);
    } finally {
      setUploading(false);
      // Reset input
      e.target.value = '';
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <p style={{ fontSize: '0.85rem', color: 'var(--muted-foreground)', margin: 0 }}>Upload images directly from your computer or paste URLs.</p>
      {items.map((item, i) => (
        <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '8px', overflow: 'hidden', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--glass-border)', flexShrink: 0 }}>
            {item ? <img src={item} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <ImageIcon size={16} className="text-muted-foreground" />}
          </div>
          <input className="form-input" style={{ flex: 1, marginBottom: 0, borderRadius: '8px', background: 'var(--muted)', border: '1px solid var(--glass-border)', color: 'var(--foreground)' }} placeholder="https://..." value={item} onChange={e => { const newItems = [...items]; newItems[i] = e.target.value; setItems(newItems); }} />
          <button onClick={() => setItems(items.filter((_, idx) => idx !== i))} className="btn btn-outline text-red-500 hover:bg-red-500 hover:text-white" style={{ padding: '0.5rem', borderRadius: '8px' }}><Trash2 size={16}/></button>
        </div>
      ))}
      
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
        <label className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', borderRadius: '8px', cursor: 'pointer', position: 'relative', overflow: 'hidden' }}>
          <Plus size={16}/> {uploading ? 'Uploading...' : 'Upload Image'}
          <input type="file" accept="image/*" style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }} onChange={handleFileUpload} disabled={uploading} />
        </label>
        <span style={{ color: 'var(--muted-foreground)', fontSize: '0.85rem' }}>or</span>
        <button onClick={() => setItems([...items, ''])} className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', borderRadius: '8px' }}><Plus size={16}/> Add Image URL</button>
      </div>

      <div style={{ textAlign: 'right', marginTop: '1rem' }}><button className="btn btn-primary" style={{ padding: '0.5rem 1.5rem', borderRadius: '8px' }} onClick={() => onSave(items)}>Save Gallery</button></div>
    </div>
  );
}

// ------------------------------------

function PrizesEditor({ data, onSave }: { data: any[], onSave: (val: any) => void }) {
  const [items, setItems] = useState(data && data.length > 0 ? data : [
    { rank: '1st', label: 'Grand Prize Winner', description: 'KSh 650,000 Cash + 6 Months Incubation at TUK Innovation Hub', highlight: true },
    { rank: '2nd', label: 'Runner Up', description: 'KSh 325,000 Cash + Cloud Credits', highlight: false },
    { rank: '3rd', label: 'Second Runner Up', description: 'KSh 130,000 Cash + Startup Perks', highlight: false },
  ]);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {items.map((item, i) => (
        <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', padding: '1rem', background: 'var(--muted)', border: '1px solid var(--glass-border)', borderRadius: '12px' }}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <input className="form-input" style={{ width: '80px', marginBottom: 0, borderRadius: '8px', background: 'var(--muted)', border: '1px solid var(--glass-border)', color: 'var(--foreground)', fontWeight: 700 }} placeholder="Rank" value={item.rank} onChange={e => { const n = [...items]; n[i] = { ...n[i], rank: e.target.value }; setItems(n); }} />
              <input className="form-input" style={{ flex: 1, marginBottom: 0, borderRadius: '8px', background: 'var(--muted)', border: '1px solid var(--glass-border)', color: 'var(--foreground)' }} placeholder="Label (e.g. Grand Prize Winner)" value={item.label} onChange={e => { const n = [...items]; n[i] = { ...n[i], label: e.target.value }; setItems(n); }} />
            </div>
            <input className="form-input" style={{ marginBottom: 0, borderRadius: '8px', background: 'var(--muted)', border: '1px solid var(--glass-border)', color: 'var(--foreground)' }} placeholder="Description (e.g. KSh 650,000 Cash + Incubation)" value={item.description} onChange={e => { const n = [...items]; n[i] = { ...n[i], description: e.target.value }; setItems(n); }} />
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--muted-foreground)', cursor: 'pointer' }}>
              <input type="checkbox" checked={!!item.highlight} onChange={e => { const n = [...items]; n[i] = { ...n[i], highlight: e.target.checked }; setItems(n); }} />
              Highlight as Grand Prize (gold styling)
            </label>
          </div>
          <button onClick={() => setItems(items.filter((_, idx) => idx !== i))} className="btn btn-outline text-red-500 hover:bg-red-500 hover:text-white" style={{ padding: '0.5rem', borderRadius: '8px' }}><Trash2 size={16}/></button>
        </div>
      ))}
      <button onClick={() => setItems([...items, { rank: '', label: '', description: '', highlight: false }])} className="btn btn-outline" style={{ padding: '0.5rem 1rem', borderRadius: '8px', alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Plus size={16}/> Add Prize Tier</button>
      <div style={{ textAlign: 'right', marginTop: '1rem' }}><button className="btn btn-primary" style={{ padding: '0.5rem 1.5rem', borderRadius: '8px' }} onClick={() => onSave(items)}>Save Prizes</button></div>
    </div>
  );
}

// ------------------------------------

function SponsorTiersEditor({ data, onSave }: { data: any[], onSave: (val: any) => void }) {
  const defaultTiers = [
    { id: 'silver', name: 'Silver Sponsor', price: 'KSh 130,000', color: '#C0C0C0', recommended: false, perks: ['Logo on website', 'Social media shoutout', 'Distribute swag', 'Resume book access (post-event)'] },
    { id: 'gold', name: 'Gold Sponsor', price: 'KSh 325,000', color: '#FFD700', recommended: true, perks: ['Host a Challenge Track', 'Provide an API/Platform demo', 'Judge a category', 'All Silver benefits'] },
    { id: 'platinum', name: 'Platinum Sponsor', price: 'KSh 650,000', color: '#e5e4e2', recommended: false, perks: ['Co-branded event marketing', 'Keynote speaking slot', 'VIP Lounge access', 'All Gold benefits'] },
  ];
  const [tiers, setTiers] = useState(data && data.length > 0 ? data : defaultTiers);

  const updateTier = (i: number, field: string, val: any) => {
    const n = [...tiers]; n[i] = { ...n[i], [field]: val }; setTiers(n);
  };
  const updatePerk = (ti: number, pi: number, val: string) => {
    const n = [...tiers]; n[ti].perks[pi] = val; setTiers(n);
  };
  const addPerk = (ti: number) => {
    const n = [...tiers]; n[ti] = { ...n[ti], perks: [...(n[ti].perks || []), ''] }; setTiers(n);
  };
  const removePerk = (ti: number, pi: number) => {
    const n = [...tiers]; n[ti] = { ...n[ti], perks: n[ti].perks.filter((_: any, idx: number) => idx !== pi) }; setTiers(n);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {tiers.map((tier: any, ti: number) => (
        <div key={ti} style={{ padding: '1.25rem', background: 'var(--muted)', border: `1px solid ${tier.color}55`, borderRadius: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <input className="form-input" style={{ flex: 1, minWidth: '140px', marginBottom: 0, borderRadius: '8px', background: 'var(--muted)', border: '1px solid var(--glass-border)', color: 'var(--foreground)', fontWeight: 700 }} placeholder="Tier Name" value={tier.name} onChange={e => updateTier(ti, 'name', e.target.value)} />
            <input className="form-input" style={{ flex: 1, minWidth: '120px', marginBottom: 0, borderRadius: '8px', background: 'var(--muted)', border: '1px solid var(--glass-border)', color: 'var(--foreground)' }} placeholder="Price (e.g. KSh 130,000)" value={tier.price} onChange={e => updateTier(ti, 'price', e.target.value)} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)' }}>Color</label>
              <input type="color" value={tier.color || '#C0C0C0'} onChange={e => updateTier(ti, 'color', e.target.value)} style={{ width: '36px', height: '36px', borderRadius: '8px', border: '1px solid var(--glass-border)', cursor: 'pointer', padding: '2px', background: 'transparent' }} />
            </div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--muted-foreground)', cursor: 'pointer', whiteSpace: 'nowrap' }}>
              <input type="checkbox" checked={!!tier.recommended} onChange={e => updateTier(ti, 'recommended', e.target.checked)} />
              Recommended badge
            </label>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', paddingLeft: '0.5rem', borderLeft: `3px solid ${tier.color}66` }}>
            <p style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--muted-foreground)', margin: 0 }}>Perks / Benefits:</p>
            {(tier.perks || []).map((perk: string, pi: number) => (
              <div key={pi} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <input className="form-input" style={{ flex: 1, marginBottom: 0, borderRadius: '8px', background: 'var(--muted)', border: '1px solid var(--glass-border)', color: 'var(--foreground)', fontSize: '0.875rem' }} placeholder="Perk description..." value={perk} onChange={e => updatePerk(ti, pi, e.target.value)} />
                <button onClick={() => removePerk(ti, pi)} style={{ color: '#ef4444', background: 'transparent', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem', padding: '0 4px' }}>✕</button>
              </div>
            ))}
            <button onClick={() => addPerk(ti)} style={{ alignSelf: 'flex-start', fontSize: '0.78rem', padding: '0.25rem 0.75rem', borderRadius: '6px', background: 'transparent', border: '1px dashed var(--glass-border)', color: 'var(--muted-foreground)', cursor: 'pointer' }}>+ Add Perk</button>
          </div>
        </div>
      ))}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
        <button onClick={() => setTiers([...tiers, { id: `tier_${Date.now()}`, name: 'Custom Tier', price: 'KSh 0', color: '#6366f1', recommended: false, perks: [] }])} className="btn btn-outline" style={{ padding: '0.5rem 1rem', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Plus size={16}/> Add Tier</button>
        <button className="btn btn-primary" style={{ padding: '0.5rem 1.5rem', borderRadius: '8px' }} onClick={() => onSave(tiers)}>Save Sponsor Tiers</button>
      </div>
    </div>
  );
}

// ------------------------------------

export default function AdminDashboard() {

  const [users, setUsers] = useState<any[]>([]);
  const [teams, setTeams] = useState<any[]>([]);
  const [tracks, setTracks] = useState<any[]>([]);
  const [people, setPeople] = useState<any[]>([]);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [content, setContent] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [assignments, setAssignments] = useState<any[]>([]);
  const [scores, setScores] = useState<any[]>([]);
  const [sponsors, setSponsors] = useState<any[]>([]);
  const [contactMessages, setContactMessages] = useState<any[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'users' | 'teams' | 'tracks' | 'people' | 'inquiries' | 'content' | 'judging' | 'leaderboard' | 'blogs'>('users');
  const [searchQuery, setSearchQuery] = useState('');
  const [newPerson, setNewPerson] = useState({ name: '', role: '', company: '', type: 'Mentor', avatar_url: '' });
  const [personImageFile, setPersonImageFile] = useState<File | null>(null);
  const [newSponsor, setNewSponsor] = useState({ name: '', tier: 'Silver', website_url: '' });
  const [sponsorImageFile, setSponsorImageFile] = useState<File | null>(null);
  const [newTrack, setNewTrack] = useState({ title: '', description: '', prize_pool: '' });
  const [trackImageFile, setTrackImageFile] = useState<File | null>(null);
  const [editingTrack, setEditingTrack] = useState<any | null>(null);
  const [newBlog, setNewBlog] = useState({ title: '', excerpt: '', summary: '', content: '', author: '', category: 'Innovation', image_url: '' });
  const [blogImageFile, setBlogImageFile] = useState<File | null>(null);
  const [editingBlog, setEditingBlog] = useState<any | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    setLoading(true);
    const { data: usersData } = await supabase.from('tuk_hackathon_profiles').select('*').order('created_at', { ascending: false });
    if (usersData) setUsers(usersData);
    const { data: teamsData } = await supabase.from('tuk_hackathon_teams').select('*, members:tuk_hackathon_team_members(role, profile:tuk_hackathon_profiles(full_name, avatar_url, email, phone))').order('created_at', { ascending: false });
    if (teamsData) setTeams(teamsData);
    const { data: tracksData } = await supabase.from('tuk_hackathon_tracks').select('*, organization:tuk_hackathon_profiles(full_name)').order('created_at', { ascending: false });
    if (tracksData) setTracks(tracksData);
    const { data: peopleData } = await supabase.from('tuk_hackathon_people').select('*').order('created_at', { ascending: false });
    if (peopleData) setPeople(peopleData);
    const { data: inquiriesData } = await supabase.from('tuk_hackathon_sponsor_inquiries').select('*').order('created_at', { ascending: false });
    if (inquiriesData) setInquiries(inquiriesData);
    const { data: contentData } = await supabase.from('tuk_hackathon_content').select('*');
    if (contentData) setContent(contentData);
    const { data: sponsorsData } = await supabase.from('tuk_hackathon_sponsors').select('*').order('created_at', { ascending: false });
    if (sponsorsData) setSponsors(sponsorsData);
    
    // Fetch Projects and Assignments
    const { data: projectsData } = await supabase.from('tuk_hackathon_projects').select('*, team:tuk_hackathon_teams(name, is_suspended), track:tuk_hackathon_tracks(title)').order('submitted_at', { ascending: false });
    if (projectsData) setProjects(projectsData);
    const { data: assignData } = await supabase.from('tuk_hackathon_judge_assignments').select('*, judge:tuk_hackathon_profiles(full_name)');
    if (assignData) setAssignments(assignData);
    const { data: scoresData } = await supabase.from('tuk_hackathon_scores').select('*');
    if (scoresData) setScores(scoresData);

    const { data: contactData } = await supabase.from('tuk_hackathon_contact_messages').select('*').order('created_at', { ascending: false });
    if (contactData) setContactMessages(contactData);
    const { data: blogsData } = await supabase.from('tuk_hackathon_blogs').select('*').order('created_at', { ascending: false });
    if (blogsData) setBlogs(blogsData);

    setLoading(false);
  };

  const getRoleColor = (role: string) => {
    switch(role) { case 'admin': return 'var(--tuk-gold)'; case 'judge': return '#a855f7'; case 'organization': return '#3b82f6'; default: return 'var(--muted-foreground)'; }
  };

  const handleUpdateUserRole = async (userId: string, newRole: string) => {
    const { error } = await supabase.from('tuk_hackathon_profiles').update({ role: newRole }).eq('id', userId);
    if (!error) setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
    else alert("Error updating role: " + error.message);
  };

  const handleToggleSuspendTeam = async (teamId: string, currentStatus: boolean) => {
    const nextStatus = !currentStatus;
    const actionText = nextStatus ? "suspend" : "unsuspend";
    if (!confirm(`Are you sure you want to ${actionText} this team?`)) return;
    
    const { error } = await supabase
      .from('tuk_hackathon_teams')
      .update({ is_suspended: nextStatus })
      .eq('id', teamId);
      
    if (error) {
      alert(`Error trying to ${actionText} team: ` + error.message);
    } else {
      setTeams(teams.map(t => t.id === teamId ? { ...t, is_suspended: nextStatus } : t));
    }
  };

  const handleAssignJudge = async (projectId: string, judgeId: string) => {
    if (!judgeId) return;
    const { data, error } = await supabase.from('tuk_hackathon_judge_assignments').insert({ project_id: projectId, judge_id: judgeId }).select('*, judge:tuk_hackathon_profiles(full_name)').single();
    if (!error && data) setAssignments([...assignments, data]);
    else alert("Error assigning judge: " + (error?.message || "Already assigned"));
  };

  const handleRemoveAssignment = async (assignId: string) => {
    const { error } = await supabase.from('tuk_hackathon_judge_assignments').delete().eq('id', assignId);
    if (!error) setAssignments(assignments.filter(a => a.id !== assignId));
  };

  const handleAddBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    const payload = { ...newBlog };
    
    // Handle File Upload
    if (blogImageFile) {
      const fileExt = blogImageFile.name.split('.').pop();
      const fileName = `blog_${Date.now()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from('hackathon_files')
        .upload(fileName, blogImageFile);

      if (uploadError) {
        alert("Error uploading file: " + uploadError.message);
        setActionLoading(false);
        return;
      }

      const { data: publicUrlData } = supabase.storage
        .from('hackathon_files')
        .getPublicUrl(fileName);
        
      payload.image_url = publicUrlData.publicUrl;
    }
    
    if (!payload.image_url) {
      payload.image_url = 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80';
    }
    
    const { data, error } = await supabase.from('tuk_hackathon_blogs').insert([payload]).select().single();
    if (error) {
      alert("Error adding blog post: " + error.message);
    } else {
      setBlogs([data, ...blogs]);
      setNewBlog({ title: '', excerpt: '', summary: '', content: '', author: '', category: 'Innovation', image_url: '' });
      setBlogImageFile(null);
    }
    setActionLoading(false);
  };

  const handleUpdateBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBlog) return;
    setActionLoading(true);
    const payload = {
      title: editingBlog.title,
      author: editingBlog.author,
      category: editingBlog.category,
      excerpt: editingBlog.excerpt,
      summary: editingBlog.summary,
      content: editingBlog.content,
      image_url: editingBlog.image_url
    };
    
    if (blogImageFile) {
      const fileExt = blogImageFile.name.split('.').pop();
      const fileName = `blog_${Date.now()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from('hackathon_files')
        .upload(fileName, blogImageFile);

      if (uploadError) {
        alert("Error uploading file: " + uploadError.message);
        setActionLoading(false);
        return;
      }

      const { data: publicUrlData } = supabase.storage
        .from('hackathon_files')
        .getPublicUrl(fileName);
        
      payload.image_url = publicUrlData.publicUrl;
    }
    
    const { data, error } = await supabase
      .from('tuk_hackathon_blogs')
      .update(payload)
      .eq('id', editingBlog.id)
      .select()
      .single();
      
    if (error) {
      alert("Error updating blog post: " + error.message);
    } else {
      setBlogs(blogs.map(b => b.id === editingBlog.id ? data : b));
      setEditingBlog(null);
      setBlogImageFile(null);
    }
    setActionLoading(false);
  };

  const handleDeleteBlog = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;
    const { error } = await supabase.from('tuk_hackathon_blogs').delete().eq('id', id);
    if (!error) {
      setBlogs(blogs.filter(b => b.id !== id));
    } else {
      alert("Error deleting blog post: " + error.message);
    }
  };

  const handleAddPerson = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    const payload = { ...newPerson };
    
    // Handle File Upload
    if (personImageFile) {
      const fileExt = personImageFile.name.split('.').pop();
      const fileName = `person_${Date.now()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from('hackathon_files')
        .upload(fileName, personImageFile);

      if (uploadError) {
        alert("Error uploading file: " + uploadError.message);
        setActionLoading(false);
        return;
      }

      const { data: publicUrlData } = supabase.storage
        .from('hackathon_files')
        .getPublicUrl(fileName);
        
      payload.avatar_url = publicUrlData.publicUrl;
    }
    
    if (!payload.avatar_url) delete payload.avatar_url; // Handle empty string
    
    const { data, error } = await supabase.from('tuk_hackathon_people').insert([payload]).select().single();
    if (error) alert("Error adding person: " + error.message);
    else { 
      setPeople([data, ...people]); 
      setNewPerson({ name: '', role: '', company: '', type: 'Mentor', avatar_url: '' });
      setPersonImageFile(null);
    }
    setActionLoading(false);
  };

  const handleDeletePerson = async (id: string) => {
    await supabase.from('tuk_hackathon_people').delete().eq('id', id);
    setPeople(people.filter(p => p.id !== id));
  };

  const handleAddTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    const payload: any = { 
      title: newTrack.title,
      description: newTrack.description,
      prize_pool: newTrack.prize_pool
    };
    
    if (trackImageFile) {
      const fileExt = trackImageFile.name.split('.').pop();
      const fileName = `track_${Date.now()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from('hackathon_files')
        .upload(fileName, trackImageFile);

      if (uploadError) {
        alert("Error uploading file: " + uploadError.message);
        setActionLoading(false);
        return;
      }

      const { data: publicUrlData } = supabase.storage
        .from('hackathon_files')
        .getPublicUrl(fileName);
        
      payload.image_url = publicUrlData.publicUrl;
    }
    
    // Associate with the logged in user profile
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      payload.organization_id = user.id;
    }

    const { data, error } = await supabase.from('tuk_hackathon_tracks').insert([payload]).select('*, organization:tuk_hackathon_profiles(full_name)').single();
    if (error) alert("Error adding track: " + error.message);
    else { 
      setTracks([data, ...tracks]); 
      setNewTrack({ title: '', description: '', prize_pool: '' });
      setTrackImageFile(null);
    }
    setActionLoading(false);
  };

  const handleUpdateTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTrack) return;
    setActionLoading(true);
    const payload: any = { 
      title: editingTrack.title,
      description: editingTrack.description,
      prize_pool: editingTrack.prize_pool,
      image_url: editingTrack.image_url
    };
    
    if (trackImageFile) {
      const fileExt = trackImageFile.name.split('.').pop();
      const fileName = `track_${Date.now()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from('hackathon_files')
        .upload(fileName, trackImageFile);

      if (uploadError) {
        alert("Error uploading file: " + uploadError.message);
        setActionLoading(false);
        return;
      }

      const { data: publicUrlData } = supabase.storage
        .from('hackathon_files')
        .getPublicUrl(fileName);
        
      payload.image_url = publicUrlData.publicUrl;
    }

    const { data, error } = await supabase.from('tuk_hackathon_tracks').update(payload).eq('id', editingTrack.id).select('*, organization:tuk_hackathon_profiles(full_name)').single();
    if (error) alert("Error updating track: " + error.message);
    else { 
      setTracks(tracks.map(t => t.id === editingTrack.id ? data : t)); 
      setEditingTrack(null);
      setTrackImageFile(null);
    }
    setActionLoading(false);
  };

  const handleDeleteTrack = async (id: string) => {
    if (!confirm("Are you sure you want to delete this track?")) return;
    const { error } = await supabase.from('tuk_hackathon_tracks').delete().eq('id', id);
    if (error) alert("Error deleting track: " + error.message);
    else setTracks(tracks.filter(t => t.id !== id));
  };

  const handleAddSponsor = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    const payload: any = { ...newSponsor };
    
    if (sponsorImageFile) {
      const fileExt = sponsorImageFile.name.split('.').pop();
      const fileName = `sponsor_${Date.now()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage.from('hackathon_files').upload(fileName, sponsorImageFile);
      if (uploadError) { alert("Error uploading file: " + uploadError.message); setActionLoading(false); return; }
      const { data: publicUrlData } = supabase.storage.from('hackathon_files').getPublicUrl(fileName);
      payload.logo_url = publicUrlData.publicUrl;
    }
    
    const { data, error } = await supabase.from('tuk_hackathon_sponsors').insert([payload]).select().single();
    if (error) alert("Error adding sponsor: " + error.message);
    else { 
      setSponsors([data, ...sponsors]); 
      setNewSponsor({ name: '', tier: 'Silver', website_url: '' });
      setSponsorImageFile(null);
    }
    setActionLoading(false);
  };

  const handleDeleteSponsor = async (id: string) => {
    await supabase.from('tuk_hackathon_sponsors').delete().eq('id', id);
    setSponsors(sponsors.filter(s => s.id !== id));
  };

  const handleUpdateInquiryStatus = async (id: string, status: string) => {
    await supabase.from('tuk_hackathon_sponsor_inquiries').update({ status }).eq('id', id);
    setInquiries(inquiries.map(i => i.id === id ? { ...i, status } : i));
  };

  const handleSaveContent = async (key: string, value: any) => {
    try {
      const { error } = await supabase.from('tuk_hackathon_content').upsert({ key, value });
      if (error) throw error;
      alert("Content updated successfully!");
      fetchData();
    } catch (err: any) {
      alert("Error saving content: " + (err.message || "Failed"));
    }
  };

  const handleInitializeContent = async () => {
    const defaultData = [
      { key: 'faqs', value: [{ q: "When is the hackathon?", a: "October 2nd!" }] },
      { key: 'schedule', value: [{ day: "Day 1", date: "Oct 24", events: [{ time: "09:00", title: "Registration", location: "Hall" }] }] },
      { key: 'rules', value: ["All code must be fresh.", "Be respectful to everyone."] },
      { key: 'gallery', value: [] }
    ];
    const { error } = await supabase.from('tuk_hackathon_content').upsert(defaultData);
    if (error) alert("Failed to initialize: " + error.message);
    else fetchData();
  };

  const filteredUsers = users.filter(u => u.full_name.toLowerCase().includes(searchQuery.toLowerCase()) || u.role.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredTeams = teams.filter(t => t.name.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredTracks = tracks.filter(t => t.title.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredPeople = people.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredInquiries = inquiries.filter(i => i.company_name.toLowerCase().includes(searchQuery.toLowerCase()));

  // Ensure prizes + gallery + sponsor_tiers keys exist in UI even if not in DB yet
  const contentToDisplay = [...content];
  if (!contentToDisplay.find(c => c.key === 'gallery')) {
    contentToDisplay.push({ key: 'gallery', value: [] });
  }
  if (!contentToDisplay.find(c => c.key === 'prizes')) {
    contentToDisplay.push({ key: 'prizes', value: [] });
  }
  if (!contentToDisplay.find(c => c.key === 'sponsor_tiers')) {
    contentToDisplay.push({ key: 'sponsor_tiers', value: [] });
  }

  const judgesList = users.filter(u => u.role === 'judge');

  if (loading) return <div className="text-center mt-12"><Activity className="animate-spin mx-auto mb-4" color="var(--tuk-gold)" size={32} /><p>Loading admin data...</p></div>;

  return (
    <div className="mt-4 pb-24">
      {/* Header section with gradient and glow */}
      <div className="relative mb-6 pb-4 border-b border-glass-border">
        <div className="flex items-center gap-3 pr-36">
          <div className="w-10 h-10 rounded-xl bg-tuk-gold/10 border border-tuk-gold/20 flex items-center justify-center text-tuk-gold shadow-[0_0_20px_rgba(234,179,8,0.03)] flex-shrink-0">
            <ShieldAlert size={20} />
          </div>
          <div>
            <h2 className="tracking-tight m-0" style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--foreground)', background: 'linear-gradient(to right, #ffffff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Command Center & CMS</h2>
            <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--muted-foreground)', marginTop: '0.15rem' }}>Manage users, teams, sponsorships, and website content.</p>
          </div>
        </div>
        <button 
          onClick={fetchData} 
          className="btn flex items-center gap-2 transition-all duration-300 hover:scale-105" 
          style={{ position: 'absolute', top: '2px', right: 0, padding: '0.4rem 0.875rem', background: 'var(--muted, rgba(128,128,128,0.1))', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'var(--foreground)', fontSize: '0.8rem' }}
        >
          <RefreshCw size={12} /> Refresh Data
        </button>
      </div>

      {/* Main card panel with custom inline styling for resilience */}
      <div style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: '1.5rem', overflow: 'hidden', boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1)', backdropFilter: 'blur(16px)' }}>
        
        {/* Navigation & Search Bar */}
        <div className="flex flex-col xl:flex-row justify-between items-center p-5 border-b border-glass-border gap-4" style={{ background: 'transparent' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', padding: '6px', background: 'var(--muted)', borderRadius: '14px', border: '1px solid var(--glass-border)' }}>
            {[
              { id: 'users', icon: <Users size={14} />, label: 'Users' },
              { id: 'teams', icon: <FolderKanban size={14} />, label: 'Teams' },
              { id: 'judging', icon: <Activity size={14} />, label: 'Judging' },
              { id: 'leaderboard', icon: <Target size={14} />, label: 'Leaderboard' },
              { id: 'tracks', icon: <Target size={14} />, label: 'Tracks' },
              { id: 'people', icon: <UserPlus size={14} />, label: 'Mentors' },
              { id: 'blogs', icon: <FileText size={14} />, label: 'Blogs' },
              { id: 'inquiries', icon: <HeartHandshake size={14} />, label: 'Sponsors & Inquiries' },
              { id: 'content', icon: <FileText size={14} />, label: 'CMS' }
            ].map((tab) => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)} 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.625rem 1.25rem',
                  borderRadius: '10px',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  transition: 'all 0.2s ease',
                  border: 'none',
                  outline: 'none',
                  cursor: 'pointer',
                  background: activeTab === tab.id ? 'var(--tuk-gold)' : 'transparent',
                  color: activeTab === tab.id ? '#001f3f' : 'var(--muted-foreground)',
                  boxShadow: activeTab === tab.id ? '0 4px 12px rgba(255, 215, 0, 0.25)' : 'none'
                }}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>

          <div style={{ position: 'relative', width: '100%', maxWidth: '280px' }}>
            <Search size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted-foreground)' }} />
            <input 
              type="text" 
              className="form-input" 
              placeholder="Search..." 
              style={{ paddingLeft: '2.5rem', marginBottom: 0, borderRadius: '12px', background: 'var(--muted)', border: '1px solid var(--glass-border)', transition: 'all 0.3s', color: 'var(--foreground)' }} 
              value={searchQuery} 
              onChange={e => setSearchQuery(e.target.value)} 
            />
          </div>
        </div>

        <div style={{ padding: '2rem', minHeight: '500px' }}>
          {activeTab === 'users' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {filteredUsers.length === 0 ? <p className="text-center text-muted-foreground">No users found.</p> : null}
              {filteredUsers.map((user, idx) => (
                <div key={user.id} style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', padding: '1rem 1.25rem', background: 'var(--muted)', border: '1px solid var(--glass-border)', borderRadius: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: '1 1 200px' }}>
                    <span style={{ fontWeight: 800, color: 'var(--tuk-gold)', minWidth: '20px', fontSize: '0.95rem' }}>{idx + 1}.</span>
                    <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--tuk-gold), #b45309)', color: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.1rem', boxShadow: '0 4px 10px rgba(234,179,8,0.2)', flexShrink: 0 }}>
                      {user.full_name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, color: 'var(--foreground)' }}>{user.full_name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <span>ID: {user.id.substring(0, 8)}...</span>
                        {user.email && <span>• {user.email}</span>}
                        {user.phone && <span>• {user.phone}</span>}
                      </div>
                    </div>
                  </div>
                  <div style={{ padding: '0.35rem 1rem', borderRadius: '999px', background: 'rgba(128,128,128,0.1)', border: `1px solid ${getRoleColor(user.role)}50`, display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                    <select 
                      value={user.role} 
                      onChange={(e) => handleUpdateUserRole(user.id, e.target.value)} 
                      style={{ background: 'transparent', color: getRoleColor(user.role), border: 'none', outline: 'none', fontWeight: 700, fontSize: '0.75rem', cursor: 'pointer', textTransform: 'uppercase' }}
                    >
                      <option value="participant" style={{ color: 'black' }}>Participant</option>
                      <option value="judge" style={{ color: 'black' }}>Judge</option>
                      <option value="organization" style={{ color: 'black' }}>Organization</option>
                      <option value="admin" style={{ color: 'black' }}>Admin</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'judging' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <p style={{ color: 'var(--muted-foreground)', fontSize: '0.9rem', margin: 0 }}>Assign submitted projects to judges for scoring. Only finalized submissions appear here.</p>
              {projects.filter(p => p.status === 'submitted' && !p.team?.is_suspended).length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem', background: 'var(--muted, rgba(128,128,128,0.05))', border: '1px solid var(--border)', borderRadius: '1rem' }}>
                  <p style={{ fontSize: '1.1rem', color: 'var(--muted-foreground)', margin: 0 }}>No finalized project submissions yet.</p>
                </div>
              ) : (
                projects.filter(p => p.status === 'submitted' && !p.team?.is_suspended).map((proj, idx) => {
                  const projAssignments = assignments.filter(a => a.project_id === proj.id);
                  return (
                    <div key={proj.id} style={{ padding: '1.5rem', background: 'var(--muted, rgba(128,128,128,0.05))', border: '1px solid var(--border)', borderRadius: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <div className="flex justify-between items-start">
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                          <span style={{ fontWeight: 800, color: 'var(--tuk-gold)', fontSize: '1.25rem', minWidth: '24px' }}>{idx + 1}.</span>
                          <div>
                            <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: 'var(--tuk-gold)', display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                              {proj.title}
                              {proj.track && (
                                <span style={{ fontSize: '0.7rem', fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: '999px', background: 'rgba(139,92,246,0.15)', color: '#a78bfa', border: '1px solid rgba(139,92,246,0.3)', letterSpacing: '0.05em' }}>
                                  🏷 {proj.track.title}
                                </span>
                              )}
                            </h3>
                            <p style={{ fontSize: '0.85rem', color: 'var(--muted-foreground)', margin: '0.25rem 0 0 0' }}>Team: <span style={{ color: 'var(--foreground)', fontWeight: 600 }}>{proj.team?.name}</span></p>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--foreground)', marginBottom: '0.5rem' }}>Assigned Judges</h4>
                        <div className="flex flex-wrap gap-2">
                          {projAssignments.length === 0 && <span style={{ fontSize: '0.85rem', color: 'var(--muted-foreground)', fontStyle: 'italic' }}>None assigned yet</span>}
                          {projAssignments.map(a => (
                            <div key={a.id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(0,0,0,0.15)', px: '0.75rem', py: '0.25rem', padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.85rem', border: '1px solid var(--border)', fontWeight: 600, color: 'var(--foreground)' }}>
                              {a.judge?.full_name} <span style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)' }}>({a.status})</span>
                              <button onClick={() => handleRemoveAssignment(a.id)} style={{ color: '#ef4444', border: 'none', background: 'transparent', cursor: 'pointer', padding: 0, marginLeft: '0.25rem', fontWeight: 'bold' }}>✕</button>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', paddingTop: '1rem', borderTop: '1px solid var(--glass-border)' }}>
                        <select 
                          id={`assign-${proj.id}`} 
                          className="form-input" 
                          style={{ width: '220px', marginBottom: 0, borderRadius: '8px', background: 'var(--muted)', border: '1px solid var(--glass-border)', padding: '0.375rem 0.75rem', fontSize: '0.875rem', color: 'var(--foreground)' }}
                        >
                          <option value="" style={{ color: 'black' }}>Select a Judge...</option>
                          {judgesList.map(j => <option key={j.id} value={j.id} style={{ color: 'black' }}>{j.full_name}</option>)}
                        </select>
                        <button 
                          className="btn btn-primary"
                          style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', borderRadius: '8px' }}
                          onClick={() => {
                            const sel = document.getElementById(`assign-${proj.id}`) as HTMLSelectElement;
                            handleAssignJudge(proj.id, sel.value);
                          }}
                        >
                          Assign Judge
                        </button>
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          )}

          {activeTab === 'leaderboard' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <p style={{ color: 'var(--muted-foreground)', fontSize: '0.9rem', margin: 0 }}>Live ranking of projects based on average judge scores. Click a project to see detailed judge feedback.</p>
              {projects.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem', background: 'var(--muted, rgba(128,128,128,0.05))', border: '1px solid var(--border)', borderRadius: '1rem' }}>
                  <p style={{ fontSize: '1.1rem', color: 'var(--muted-foreground)', margin: 0 }}>No projects to rank yet.</p>
                </div>
              ) : (
                projects.map(proj => {
                  const projAssignments = assignments.filter(a => a.project_id === proj.id);
                  const projScores = scores.filter(s => projAssignments.some(a => a.id === s.assignment_id));
                  const scoreCount = projScores.length;
                  let totalScore = 0;
                  if (scoreCount > 0) {
                    const sum = projScores.reduce((acc, s) => acc + s.innovation_score + s.technical_score + s.impact_score, 0);
                    // Divide by number of judges to get average total score out of 30
                    totalScore = parseFloat((sum / scoreCount).toFixed(1));
                  }
                  return { ...proj, totalScore, scoreCount, projScores, projAssignments };
                })
                .sort((a, b) => b.totalScore - a.totalScore)
                .map((proj, index) => (
                  <details 
                    key={proj.id} 
                    style={{ padding: '1.25rem 1.5rem', background: 'var(--muted)', border: '1px solid var(--glass-border)', borderRadius: '1.25rem', cursor: 'pointer' }}
                    className="group"
                  >
                    <summary style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', listStyle: 'none', cursor: 'pointer' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: '1 1 200px' }}>
                        <div style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--tuk-gold)', opacity: 0.9, width: '40px', flexShrink: 0 }}>#{index + 1}</div>
                        <div>
                          <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: 'var(--foreground)', lineHeight: 1.3 }}>{proj.title}</h3>
                          <p style={{ fontSize: '0.8rem', color: 'var(--muted-foreground)', margin: '0.25rem 0 0 0' }}>Team: <span style={{ color: 'var(--foreground)', fontWeight: 600 }}>{proj.team?.name}</span></p>
                        </div>
                      </div>
                      <div style={{ textAlign: 'left', flexShrink: 0 }}>
                        <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#10b981', lineHeight: 1 }}>{proj.totalScore}<span style={{ fontSize: '0.8rem', color: 'var(--muted-foreground)', fontWeight: 500 }}>/30</span></div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--muted-foreground)', marginTop: '0.25rem' }}>Based on {proj.scoreCount} judge(s)</div>
                      </div>
                    </summary>
                    
                    <div style={{ marginTop: '1.25rem', paddingTop: '1.25rem', borderTop: '1px solid var(--glass-border)', display: 'flex', flexDirection: 'column', gap: '1rem', cursor: 'default' }} onClick={e => e.stopPropagation()}>
                      <div style={{ padding: '1rem', background: 'rgba(128,128,128,0.05)', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
                        <h4 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 700, color: 'var(--foreground)' }}>Project Abstract</h4>
                        <p style={{ margin: '0.35rem 0 0 0', fontSize: '0.8rem', color: 'var(--muted-foreground)', lineHeight: 1.4 }}>{proj.abstract}</p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '0.75rem' }}>
                          {proj.github_url && (
                            <a href={proj.github_url} target="_blank" rel="noreferrer" style={{ fontSize: '0.75rem', color: 'var(--tuk-gold)', textDecoration: 'none', fontWeight: 600 }}>🔗 Github</a>
                          )}
                          {proj.video_url && (
                            <a href={proj.video_url} target="_blank" rel="noreferrer" style={{ fontSize: '0.75rem', color: 'var(--tuk-gold)', textDecoration: 'none', fontWeight: 600 }}>🎥 Demo Video</a>
                          )}
                          {proj.pitch_deck_url && (
                            <a href={proj.pitch_deck_url} target="_blank" rel="noreferrer" style={{ fontSize: '0.75rem', color: 'var(--tuk-gold)', textDecoration: 'none', fontWeight: 600 }}>📄 Pitch Deck</a>
                          )}
                        </div>
                      </div>
                      
                      {proj.projScores.length === 0 ? (
                        <p style={{ color: 'var(--muted-foreground)', fontStyle: 'italic', textAlign: 'center', margin: 0 }}>No judges have submitted scores for this project yet.</p>
                      ) : (
                        proj.projScores.map((score, sIdx) => {
                          const assignment = proj.projAssignments.find(a => a.id === score.assignment_id);
                          return (
                            <div key={sIdx} style={{ background: 'rgba(128,128,128,0.1)', padding: '1.25rem', borderRadius: '1rem', border: '1px solid var(--glass-border)' }}>
                              <div className="flex justify-between items-center mb-3">
                                <div style={{ fontWeight: 700, color: 'var(--tuk-gold)' }}>{assignment?.judge?.full_name || 'Unknown Judge'}</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)' }}>{new Date(score.submitted_at).toLocaleDateString()}</div>
                              </div>
                              <div className="grid grid-cols-3 gap-3 mb-4 text-center">
                                <div style={{ background: 'rgba(128,128,128,0.06)', padding: '0.5rem', borderRadius: '8px', border: '1px solid var(--glass-border)' }}>
                                  <div style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)', marginBottom: '0.25rem' }}>Innovation</div>
                                  <div style={{ fontWeight: 700, color: '#3b82f6' }}>{score.innovation_score}/10</div>
                                </div>
                                <div style={{ background: 'rgba(128,128,128,0.06)', padding: '0.5rem', borderRadius: '8px', border: '1px solid var(--glass-border)' }}>
                                  <div style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)', marginBottom: '0.25rem' }}>Technical</div>
                                  <div style={{ fontWeight: 700, color: '#a855f7' }}>{score.technical_score}/10</div>
                                </div>
                                <div style={{ background: 'rgba(128,128,128,0.06)', padding: '0.5rem', borderRadius: '8px', border: '1px solid var(--glass-border)' }}>
                                  <div style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)', marginBottom: '0.25rem' }}>Impact</div>
                                  <div style={{ fontWeight: 700, color: '#10b981' }}>{score.impact_score}/10</div>
                                </div>
                              </div>
                              {score.feedback && (
                                <div style={{ fontSize: '0.875rem', fontStyle: 'italic', color: 'var(--muted-foreground)', background: 'rgba(128,128,128,0.05)', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px dashed var(--glass-border)' }}>
                                  "{score.feedback}"
                                </div>
                              )}
                            </div>
                          )
                        })
                      )}
                    </div>
                  </details>
                ))
              )}
            </div>
          )}

          {activeTab === 'teams' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {filteredTeams.map((team, idx) => (
                <details 
                  key={team.id} 
                  style={{ padding: '1.25rem', background: 'var(--muted)', border: '1px solid var(--glass-border)', borderRadius: '1rem', cursor: 'pointer' }}
                  className="group"
                >
                  <summary style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', listStyle: 'none', cursor: 'pointer' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: '1 1 200px' }}>
                      <span style={{ fontWeight: 800, color: 'var(--tuk-gold)', minWidth: '20px', fontSize: '1.15rem' }}>{idx + 1}.</span>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '1.15rem', color: 'var(--foreground)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span>{team.name}</span>
                          {team.is_suspended && (
                            <span style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.2)', padding: '0.15rem 0.5rem', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 700 }}>
                              Suspended
                            </span>
                          )}
                        </div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--muted-foreground)', marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                          <span>Created: {new Date(team.created_at).toLocaleDateString()}</span>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', padding: '0.15rem 0.5rem', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 600, color: 'var(--foreground)' }}>
                            <Users size={12} /> {team.members?.length || 0} Members
                          </span>
                          {projects.some(p => p.team_id === team.id) && (
                            <span style={{ background: 'rgba(16,185,129,0.1)', color: '#10b981', border: '1px solid rgba(16,185,129,0.2)', padding: '0.15rem 0.5rem', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 700 }}>
                              Project Submitted
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexShrink: 0 }} onClick={e => e.stopPropagation()}>
                      <div style={{ textAlign: 'left' }}>
                        <div style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)', marginBottom: '0.25rem' }}>Join Code</div>
                        <div style={{ fontWeight: 700, fontFamily: 'monospace', letterSpacing: '2px', color: 'var(--tuk-gold)', background: 'rgba(234,179,8,0.1)', padding: '0.25rem 0.75rem', borderRadius: '6px', border: '1px solid rgba(234,179,8,0.2)' }}>{team.join_code}</div>
                      </div>
                      <button 
                        onClick={() => handleToggleSuspendTeam(team.id, team.is_suspended)}
                        className={`btn ${team.is_suspended ? 'btn-primary' : 'btn-outline text-red-500 hover:bg-red-500 hover:text-white'}`}
                        style={{ padding: '0.35rem 0.75rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 600, border: team.is_suspended ? 'none' : '1px solid rgba(239, 68, 68, 0.4)' }}
                      >
                        {team.is_suspended ? 'Unsuspend' : 'Suspend'}
                      </button>
                    </div>
                  </summary>
                  
                  <div style={{ marginTop: '1.25rem', paddingTop: '1.25rem', borderTop: '1px solid var(--glass-border)', cursor: 'default', display: 'flex', flexDirection: 'column', gap: '1.25rem' }} onClick={e => e.stopPropagation()}>
                    {/* Team Members List */}
                    <div>
                      <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--tuk-gold)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.75rem' }}>Team Members</h4>
                      {team.members && team.members.length > 0 ? (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                          {team.members.map((mem: any, mIdx: number) => (
                            <div 
                              key={mIdx} 
                              style={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: '0.5rem', 
                                background: 'rgba(255,255,255,0.03)', 
                                border: '1px solid var(--glass-border)', 
                                padding: '0.35rem 0.75rem', 
                                borderRadius: '20px',
                                fontSize: '0.85rem'
                              }}
                            >
                              <div style={{ width: '1.25rem', height: '1.25rem', borderRadius: '50%', background: mem.role === 'leader' ? 'var(--tuk-gold)' : 'var(--muted)', color: mem.role === 'leader' ? '#000' : 'var(--muted-foreground)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', fontWeight: 800, border: '1px solid var(--glass-border)' }}>
                                {mem.role === 'leader' ? 'L' : 'M'}
                              </div>
                              <span style={{ color: 'var(--foreground)', fontWeight: 500 }}>{mem.profile?.full_name || 'Unknown User'}</span>
                              <span style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)', textTransform: 'capitalize' }}>({mem.role})</span>
                              {(mem.profile?.email || mem.profile?.phone) && (
                                <span style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)', marginLeft: '0.5rem', borderLeft: '1px solid var(--glass-border)', paddingLeft: '0.5rem' }}>
                                  {mem.profile.email} {mem.profile.email && mem.profile.phone ? ' | ' : ''} {mem.profile.phone}
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p style={{ color: 'var(--muted-foreground)', fontSize: '0.85rem', fontStyle: 'italic', margin: 0 }}>No registered members found for this team.</p>
                      )}
                    </div>

                    {/* Project Submission Details */}
                    <div style={{ paddingTop: '1.25rem', borderTop: '1px dashed var(--glass-border)' }}>
                      <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--tuk-gold)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.75rem' }}>Project Submission</h4>
                      {(() => {
                        const proj = projects.find(p => p.team_id === team.id);
                        if (proj) {
                          return (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                              <h5 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--foreground)', margin: 0 }}>{proj.title}</h5>
                              <p style={{ fontSize: '0.85rem', color: 'var(--muted-foreground)', margin: 0, lineHeight: '1.5' }}>{proj.abstract}</p>
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '0.5rem' }}>
                                {proj.github_url && (
                                  <a href={proj.github_url} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', color: 'var(--tuk-gold)', textDecoration: 'none', fontWeight: 600 }}>
                                    🔗 Github Repository
                                  </a>
                                )}
                                {proj.video_url && (
                                  <a href={proj.video_url} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', color: 'var(--tuk-gold)', textDecoration: 'none', fontWeight: 600 }}>
                                    🎥 Video Demo
                                  </a>
                                )}
                                {proj.pitch_deck_url && (
                                  <a href={proj.pitch_deck_url} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', color: 'var(--tuk-gold)', textDecoration: 'none', fontWeight: 600 }}>
                                    📄 Pitch Deck (PDF)
                                  </a>
                                )}
                              </div>
                            </div>
                          );
                        }
                        return <p style={{ color: 'var(--muted-foreground)', fontStyle: 'italic', margin: 0, fontSize: '0.85rem' }}>No project submitted by this team yet.</p>;
                      })()}
                    </div>
                  </div>
                </details>
              ))}
            </div>
          )}

          {activeTab === 'tracks' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {editingTrack ? (
                <form 
                  onSubmit={handleUpdateTrack} 
                  style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', padding: '1.5rem', background: 'rgba(234,179,8,0.03)', border: '1px solid var(--tuk-gold)', borderRadius: '1.25rem' }}
                >
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--tuk-gold)', margin: 0 }}>Edit Track</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div className="flex flex-col md:flex-row gap-4">
                      <input type="text" className="form-input" style={{ flex: 1, marginBottom: 0, borderRadius: '8px', background: 'var(--muted)', border: '1px solid var(--glass-border)', color: 'var(--foreground)' }} placeholder="Track Title" value={editingTrack.title} onChange={e => setEditingTrack({...editingTrack, title: e.target.value})} required />
                      <input type="text" className="form-input" style={{ flex: 1, marginBottom: 0, borderRadius: '8px', background: 'var(--muted)', border: '1px solid var(--glass-border)', color: 'var(--foreground)' }} placeholder="Prize Pool (e.g. KSh 2,500,000)" value={editingTrack.prize_pool} onChange={e => setEditingTrack({...editingTrack, prize_pool: e.target.value})} />
                    </div>
                    <div className="flex flex-col md:flex-row gap-4">
                      <textarea className="form-input" style={{ flex: 2, marginBottom: 0, borderRadius: '8px', background: 'var(--muted)', border: '1px solid var(--glass-border)', color: 'var(--foreground)', resize: 'none' }} placeholder="Track Description" value={editingTrack.description} onChange={e => setEditingTrack({...editingTrack, description: e.target.value})} required rows={2} />
                      <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '0.75rem', borderBottom: '1px dashed var(--glass-border)', paddingBottom: '0.5rem' }}>
                        <input 
                          type="file" 
                          accept="image/*"
                          onChange={e => setTrackImageFile(e.target.files?.[0] || null)}
                          id="edit-track-image-upload"
                          style={{ display: 'none' }}
                        />
                        <label htmlFor="edit-track-image-upload" style={{ cursor: 'pointer', padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', border: '1px solid var(--glass-border)', whiteSpace: 'nowrap', fontSize: '0.85rem', fontWeight: 600, color: 'var(--foreground)' }}>
                          {trackImageFile ? trackImageFile.name : 'Upload New Photo'}
                        </label>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                    <button type="button" className="btn btn-outline" style={{ padding: '0.5rem 1rem', borderRadius: '8px' }} onClick={() => { setEditingTrack(null); setTrackImageFile(null); }}>
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary" style={{ padding: '0.5rem 1.25rem', borderRadius: '8px' }} disabled={actionLoading}>
                      {actionLoading ? 'Updating...' : 'Update Track'}
                    </button>
                  </div>
                </form>
              ) : (
                <form 
                  onSubmit={handleAddTrack} 
                  style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', padding: '1.5rem', background: 'var(--muted, rgba(128,128,128,0.03))', border: '1px solid var(--border)', borderRadius: '1.25rem' }}
                >
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--foreground)', margin: 0 }}>Create Challenge Track</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div className="flex flex-col md:flex-row gap-4">
                      <input type="text" className="form-input" style={{ flex: 1, marginBottom: 0, borderRadius: '8px', background: 'var(--muted)', border: '1px solid var(--glass-border)', color: 'var(--foreground)' }} placeholder="Track Title" value={newTrack.title} onChange={e => setNewTrack({...newTrack, title: e.target.value})} required />
                      <input type="text" className="form-input" style={{ flex: 1, marginBottom: 0, borderRadius: '8px', background: 'var(--muted)', border: '1px solid var(--glass-border)', color: 'var(--foreground)' }} placeholder="Prize Pool (e.g. KSh 2,500,000)" value={newTrack.prize_pool} onChange={e => setNewTrack({...newTrack, prize_pool: e.target.value})} />
                    </div>
                    <div className="flex flex-col md:flex-row gap-4">
                      <textarea className="form-input" style={{ flex: 2, marginBottom: 0, borderRadius: '8px', background: 'var(--muted)', border: '1px solid var(--glass-border)', color: 'var(--foreground)', resize: 'none' }} placeholder="Track Description" value={newTrack.description} onChange={e => setNewTrack({...newTrack, description: e.target.value})} required rows={2} />
                      <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '0.75rem', borderBottom: '1px dashed var(--glass-border)', paddingBottom: '0.5rem' }}>
                        <input 
                          type="file" 
                          accept="image/*"
                          onChange={e => setTrackImageFile(e.target.files?.[0] || null)}
                          id="track-image-upload"
                          style={{ display: 'none' }}
                        />
                        <label htmlFor="track-image-upload" style={{ cursor: 'pointer', padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', border: '1px solid var(--glass-border)', whiteSpace: 'nowrap', fontSize: '0.85rem', fontWeight: 600, color: 'var(--foreground)' }}>
                          {trackImageFile ? trackImageFile.name : 'Upload Photo'}
                        </label>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                    <button type="submit" className="btn btn-primary" style={{ padding: '0.5rem 1.5rem', borderRadius: '8px' }} disabled={actionLoading}>
                      {actionLoading ? 'Saving...' : 'Add Track'}
                    </button>
                  </div>
                </form>
              )}

              <div className="grid md:grid-cols-2 gap-6">
                {filteredTracks.map((track, idx) => (
                  <div 
                    key={track.id} 
                    style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '1.5rem', background: 'var(--muted, rgba(128,128,128,0.05))', border: '1px solid var(--border)', borderRadius: '1.25rem', position: 'relative', overflow: 'hidden' }}
                  >
                    <div style={{ position: 'absolute', top: '1rem', right: '1rem', display: 'flex', gap: '0.5rem' }}>
                      <button onClick={() => setEditingTrack(track)} className="btn btn-outline" style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', borderRadius: '6px' }}>Edit</button>
                      <button onClick={() => handleDeleteTrack(track.id)} className="btn btn-outline text-red-500" style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', borderRadius: '6px' }}>✕</button>
                    </div>
                    
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'start' }}>
                      {track.image_url && (
                        <img src={track.image_url} alt="" style={{ width: '64px', height: '64px', borderRadius: '8px', objectFit: 'cover', border: '1px solid var(--border)' }} />
                      )}
                      <div style={{ flex: 1 }}>
                        <h4 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: 'var(--foreground)', paddingRight: '4.5rem' }}>
                          <span style={{ color: 'var(--tuk-gold)', marginRight: '0.5rem' }}>#{idx + 1}</span>
                          {track.title}
                        </h4>
                        <div style={{ color: 'var(--tuk-gold)', fontSize: '0.9rem', fontWeight: 700, margin: '0.35rem 0' }}>{track.prize_pool || 'No Prize Pool'}</div>
                        <p style={{ fontSize: '0.85rem', color: 'var(--muted-foreground)', margin: 0, lineHeight: '1.5', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{track.description}</p>
                      </div>
                    </div>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
                      <div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)' }}>Sponsor</div>
                        <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--foreground)', marginTop: '0.15rem' }}>{track.organization?.full_name || 'Admin / System'}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'people' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <form 
                onSubmit={handleAddPerson} 
                style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', padding: '1.5rem', background: 'var(--muted, rgba(128,128,128,0.03))', border: '1px solid var(--border)', borderRadius: '1.25rem' }}
              >
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--foreground)', margin: 0 }}>Add Speaker, Mentor or Judge</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div className="flex flex-col md:flex-row gap-4">
                    <input type="text" className="form-input" style={{ flex: 1, marginBottom: 0, borderRadius: '8px', background: 'var(--muted)', border: '1px solid var(--glass-border)', color: 'var(--foreground)' }} placeholder="Full Name" value={newPerson.name} onChange={e => setNewPerson({...newPerson, name: e.target.value})} required />
                    <input type="text" className="form-input" style={{ flex: 1, marginBottom: 0, borderRadius: '8px', background: 'var(--muted)', border: '1px solid var(--glass-border)', color: 'var(--foreground)' }} placeholder="Role (e.g. Senior Engineer)" value={newPerson.role} onChange={e => setNewPerson({...newPerson, role: e.target.value})} required />
                  </div>
                  <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
                    <input type="text" className="form-input" style={{ flex: 1, marginBottom: 0, borderRadius: '8px', background: 'var(--muted)', border: '1px solid var(--glass-border)', color: 'var(--foreground)' }} placeholder="Company" value={newPerson.company} onChange={e => setNewPerson({...newPerson, company: e.target.value})} required />
                    
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '0.75rem', borderBottom: '1px dashed var(--glass-border)', paddingBottom: '0.5rem' }}>
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={e => setPersonImageFile(e.target.files?.[0] || null)}
                        id="avatar-upload"
                        style={{ display: 'none' }}
                      />
                      <label htmlFor="avatar-upload" style={{ cursor: 'pointer', padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', border: '1px solid var(--glass-border)', whiteSpace: 'nowrap', fontSize: '0.85rem', fontWeight: 600, color: 'var(--foreground)' }}>
                        {personImageFile ? personImageFile.name : 'Upload Photo'}
                      </label>
                      <span style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)' }}>Max 2MB</span>
                    </div>

                    <select 
                      className="form-input" 
                      style={{ width: '150px', marginBottom: 0, borderRadius: '8px', background: 'var(--muted)', border: '1px solid var(--glass-border)', padding: '0.5rem 0.75rem', fontSize: '0.875rem', color: 'var(--foreground)' }}
                      value={newPerson.type} 
                      onChange={e => setNewPerson({...newPerson, type: e.target.value})}
                    >
                      <option value="Mentor" style={{ color: 'black' }}>Mentor</option>
                      <option value="Judge" style={{ color: 'black' }}>Judge</option>
                    </select>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                  <button type="submit" className="btn btn-primary" style={{ padding: '0.5rem 1.5rem', borderRadius: '8px' }} disabled={actionLoading}>
                    {actionLoading ? 'Saving...' : 'Add Person'}
                  </button>
                </div>
              </form>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPeople.map((person, idx) => (
                  <div 
                    key={person.id} 
                    style={{ padding: '1.25rem', background: 'var(--muted, rgba(128,128,128,0.05))', border: '1px solid var(--border)', borderRadius: '1rem', position: 'relative', display: 'flex', gap: '1rem', alignItems: 'center' }}
                  >
                    <span style={{ fontWeight: 800, color: 'var(--tuk-gold)', fontSize: '0.95rem', minWidth: '18px', opacity: 0.8 }}>{idx + 1}.</span>
                    <button onClick={() => handleDeletePerson(person.id)} style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', border: 'none', background: 'transparent', cursor: 'pointer', color: '#ef4444', fontSize: '1rem', padding: 0 }}>✕</button>
                    {person.avatar_url ? (
                      <img src={person.avatar_url} alt={person.name} style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--border)' }} />
                    ) : (
                      <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid var(--border)' }}>
                        <UserPlus size={20} color="var(--muted-foreground)" />
                      </div>
                    )}
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--foreground)' }}>{person.name}</div>
                      <div style={{ marginTop: '0.25rem', marginBottom: '0.25rem' }}>
                        <span style={{ background: 'rgba(234,179,8,0.1)', color: 'var(--tuk-gold)', border: '1px solid rgba(234,179,8,0.2)', padding: '0.15rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700 }}>
                          {person.type}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--muted-foreground)' }}>{person.role} @ {person.company}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'inquiries' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
              
              {/* Confirmed Sponsors Section */}
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--tuk-gold)', marginBottom: '1.25rem' }}>Confirmed Sponsors</h3>
                <form 
                  onSubmit={handleAddSponsor} 
                  style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', padding: '1.5rem', background: 'var(--muted, rgba(128,128,128,0.03))', border: '1px solid var(--border)', borderRadius: '1.25rem', marginBottom: '1.5rem' }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div className="flex flex-col md:flex-row gap-4">
                      <input type="text" className="form-input" style={{ flex: 1, marginBottom: 0, borderRadius: '8px', background: 'var(--muted)', border: '1px solid var(--glass-border)', color: 'var(--foreground)' }} placeholder="Company Name" value={newSponsor.name} onChange={e => setNewSponsor({...newSponsor, name: e.target.value})} required />
                      <select 
                        className="form-input" 
                        style={{ flex: 1, marginBottom: 0, borderRadius: '8px', background: 'var(--muted)', border: '1px solid var(--glass-border)', padding: '0.5rem 0.75rem', fontSize: '0.875rem', color: 'var(--foreground)' }}
                        value={newSponsor.tier} 
                        onChange={e => setNewSponsor({...newSponsor, tier: e.target.value})}
                      >
                        <option value="Platinum" style={{ color: 'black' }}>Platinum</option>
                        <option value="Gold" style={{ color: 'black' }}>Gold</option>
                        <option value="Silver" style={{ color: 'black' }}>Silver</option>
                        <option value="Custom" style={{ color: 'black' }}>Custom</option>
                      </select>
                    </div>
                    <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
                      <input type="url" className="form-input" style={{ flex: 1, marginBottom: 0, borderRadius: '8px', background: 'var(--muted)', border: '1px solid var(--glass-border)', color: 'var(--foreground)' }} placeholder="Website URL (Optional)" value={newSponsor.website_url} onChange={e => setNewSponsor({...newSponsor, website_url: e.target.value})} />
                      <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '0.75rem', borderBottom: '1px dashed var(--glass-border)', paddingBottom: '0.5rem' }}>
                        <input 
                          type="file" 
                          accept="image/*"
                          onChange={e => setSponsorImageFile(e.target.files?.[0] || null)}
                          id="sponsor-logo-upload"
                          style={{ display: 'none' }}
                        />
                        <label htmlFor="sponsor-logo-upload" style={{ cursor: 'pointer', padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', border: '1px solid var(--border)', whiteSpace: 'nowrap', fontSize: '0.85rem', fontWeight: 600, color: 'var(--foreground)' }}>
                          {sponsorImageFile ? sponsorImageFile.name : 'Upload Logo'}
                        </label>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                    <button type="submit" className="btn btn-primary" style={{ padding: '0.5rem 1.5rem', borderRadius: '8px' }} disabled={actionLoading}>
                      {actionLoading ? 'Saving...' : 'Add Sponsor'}
                    </button>
                  </div>
                </form>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sponsors.map((sponsor, idx) => (
                    <div 
                      key={sponsor.id} 
                      style={{ padding: '1.25rem', background: 'var(--muted, rgba(128,128,128,0.05))', border: '1px solid var(--border)', borderRadius: '1rem', position: 'relative', display: 'flex', gap: '1rem', alignItems: 'center' }}
                    >
                      <span style={{ fontWeight: 800, color: 'var(--tuk-gold)', fontSize: '0.95rem', minWidth: '18px', opacity: 0.8 }}>{idx + 1}.</span>
                      <button onClick={() => handleDeleteSponsor(sponsor.id)} style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', border: 'none', background: 'transparent', cursor: 'pointer', color: '#ef4444', fontSize: '1rem', padding: 0 }}>✕</button>
                      {sponsor.logo_url ? (
                        <img src={sponsor.logo_url} alt={sponsor.name} style={{ width: '48px', height: '48px', objectFit: 'contain' }} />
                      ) : (
                        <div style={{ width: '48px', height: '48px', background: 'rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border)', borderRadius: '8px' }}>
                          <span style={{ fontSize: '0.7rem', color: 'var(--muted-foreground)', textAlign: 'center' }}>No Logo</span>
                        </div>
                      )}
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--foreground)' }}>{sponsor.name}</div>
                        <div style={{ marginTop: '0.25rem' }}>
                          <span style={{ background: 'rgba(234,179,8,0.1)', color: 'var(--tuk-gold)', border: '1px solid rgba(234,179,8,0.2)', padding: '0.15rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700 }}>
                            {sponsor.tier} Tier
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Inquiries Section */}
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--foreground)', marginBottom: '1.25rem' }}>Incoming Inquiries</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {filteredInquiries.length === 0 ? <p className="text-center text-muted-foreground">No sponsor inquiries yet.</p> : null}
                  {filteredInquiries.map((inq, idx) => (
                    <div 
                      key={inq.id} 
                      style={{ padding: '1.5rem', background: 'var(--muted, rgba(128,128,128,0.05))', border: '1px solid var(--border)', borderRadius: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}
                    >
                      <div className="flex justify-between items-start">
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                          <span style={{ fontWeight: 800, color: 'var(--tuk-gold)', fontSize: '1.15rem', minWidth: '24px' }}>{idx + 1}.</span>
                          <div>
                            <h4 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: 'var(--foreground)' }}>{inq.company_name}</h4>
                            <div style={{ fontSize: '0.85rem', color: 'var(--muted-foreground)', marginTop: '0.25rem' }}>{inq.contact_name} • {inq.email}</div>
                          </div>
                        </div>
                        <div>
                          <span style={{ padding: '0.25rem 0.5rem', borderRadius: '4px', background: 'var(--muted, rgba(128,128,128,0.1))', fontSize: '0.75rem', fontWeight: 700, color: 'var(--tuk-gold)', border: '1px solid var(--border)' }}>
                            Tier: {inq.tier}
                          </span>
                        </div>
                      </div>
                      {inq.message && (
                        <p style={{ fontSize: '0.875rem', background: 'rgba(0,0,0,0.15)', padding: '1rem', borderRadius: '8px', margin: 0, color: 'var(--muted-foreground)', border: '1px solid var(--border)', lineHeight: '1.5' }}>
                          {inq.message}
                        </p>
                      )}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
                        <span style={{ fontSize: '0.85rem', color: 'var(--muted-foreground)', fontWeight: 600 }}>Status:</span>
                        <select 
                          className="form-input" 
                          style={{ padding: '0.25rem 0.5rem', width: 'auto', marginBottom: 0, borderRadius: '6px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border)', fontSize: '0.875rem', color: 'var(--foreground)' }}
                          value={inq.status} 
                          onChange={(e) => handleUpdateInquiryStatus(inq.id, e.target.value)}
                        >
                          <option value="Pending" style={{ color: 'black' }}>Pending</option>
                          <option value="Contacted" style={{ color: 'black' }}>Contacted</option>
                          <option value="Approved" style={{ color: 'black' }}>Approved</option>
                          <option value="Rejected" style={{ color: 'black' }}>Rejected</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* General Contact Messages */}
              <div style={{ marginTop: '2.5rem', paddingTop: '2.5rem', borderTop: '1px solid var(--border)' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--foreground)', marginBottom: '1.25rem' }}>Incoming Contact Messages</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {contactMessages.length === 0 ? <p className="text-center text-muted-foreground">No contact messages yet.</p> : null}
                  {contactMessages.map((msg, idx) => (
                    <div 
                      key={msg.id} 
                      style={{ padding: '1.5rem', background: 'var(--muted, rgba(128,128,128,0.05))', border: '1px solid var(--border)', borderRadius: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}
                    >
                      <div className="flex justify-between items-start">
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                          <span style={{ fontWeight: 800, color: 'var(--tuk-gold)', fontSize: '1.15rem', minWidth: '24px' }}>{idx + 1}.</span>
                          <div>
                            <h4 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: 'var(--foreground)' }}>{msg.subject}</h4>
                            <div style={{ fontSize: '0.85rem', color: 'var(--muted-foreground)', marginTop: '0.25rem' }}>From: <span style={{ fontWeight: 700, color: 'var(--foreground)' }}>{msg.name}</span> • {msg.email}</div>
                          </div>
                        </div>
                        <button 
                          onClick={async () => {
                            if (confirm("Are you sure you want to delete this message?")) {
                              const { error } = await supabase.from('tuk_hackathon_contact_messages').delete().eq('id', msg.id);
                              if (!error) {
                                setContactMessages(contactMessages.filter(m => m.id !== msg.id));
                              } else {
                                alert("Error deleting message: " + error.message);
                              }
                            }
                          }}
                          className="btn btn-outline text-red-500" 
                          style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', borderRadius: '6px' }}
                        >
                          ✕
                        </button>
                      </div>
                      <p style={{ fontSize: '0.875rem', background: 'rgba(0,0,0,0.15)', padding: '1rem', borderRadius: '8px', margin: 0, color: 'var(--muted-foreground)', border: '1px solid var(--border)', lineHeight: '1.5' }}>
                        {msg.message}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'content' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <p style={{ color: 'var(--muted-foreground)', fontSize: '0.9rem', margin: 0 }}>Edit website content using these simple forms. Changes will reflect instantly on the public site.</p>
              
              {content.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem', background: 'var(--muted, rgba(128,128,128,0.05))', border: '1px solid var(--border)', borderRadius: '1rem' }}>
                  <p style={{ fontSize: '1.1rem', color: 'var(--foreground)', marginBottom: '1rem' }}>No content rows found in the database.</p>
                  <button onClick={handleInitializeContent} className="btn btn-primary" style={{ padding: '0.5rem 1.5rem', borderRadius: '8px' }}>Initialize Default Content</button>
                </div>
              ) : (
                <div className="cms-editors-grid">
                  {contentToDisplay.map(item => (
                    <div key={item.key} style={{ padding: '2rem', background: 'var(--muted, rgba(128,128,128,0.05))', border: '1px solid var(--border)', borderRadius: '1.25rem' }}>
                      <h3 style={{ textTransform: 'capitalize', color: 'var(--tuk-gold)', marginBottom: '1.5rem', fontSize: '1.35rem', fontWeight: 800 }}>{item.key} Editor</h3>
                      
                      {item.key === 'faqs' && <FAQEditor data={item.value} onSave={(val) => handleSaveContent('faqs', val)} />}
                      {item.key === 'rules' && <RulesEditor data={item.value} onSave={(val) => handleSaveContent('rules', val)} />}
                      {item.key === 'schedule' && <ScheduleEditor data={item.value} onSave={(val) => handleSaveContent('schedule', val)} />}
                      {item.key === 'gallery' && <GalleryEditor data={item.value} onSave={(val) => handleSaveContent('gallery', val)} />}
                      {item.key === 'prizes' && <PrizesEditor data={item.value} onSave={(val) => handleSaveContent('prizes', val)} />}
                      {item.key === 'sponsor_tiers' && <SponsorTiersEditor data={item.value} onSave={(val) => handleSaveContent('sponsor_tiers', val)} />}
                      
                      {!['faqs', 'rules', 'schedule', 'gallery', 'prizes', 'sponsor_tiers'].includes(item.key) && (
                         <p style={{ color: 'var(--muted-foreground)' }}>Unsupported content type for simple editor. Please contact support.</p>
                      )}
                    </div>
                  ))}
                </div>
              )}

              <style>{`
                .cms-editors-grid {
                  display: grid;
                  grid-template-columns: 1fr;
                  gap: 1.5rem;
                }
                @media (min-width: 992px) {
                  .cms-editors-grid {
                    grid-template-columns: repeat(2, 1fr);
                    align-items: start;
                  }
                }
              `}</style>
            </div>
          )}

          {activeTab === 'blogs' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              
              {/* Blog Form: Supports both Add and Edit Mode */}
              <div style={{ padding: '2rem', background: 'var(--muted, rgba(128,128,128,0.05))', border: '1px solid var(--glass-border)', borderRadius: '1.5rem' }}>
                <h3 style={{ color: 'var(--tuk-gold)', fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.5rem' }}>
                  {editingBlog ? 'Edit Blog Post' : 'Add New Blog Post'}
                </h3>
                <form onSubmit={editingBlog ? handleUpdateBlog : handleAddBlog} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--muted-foreground)' }}>Blog Title</label>
                      <input 
                        type="text" 
                        required 
                        className="form-input" 
                        placeholder="e.g. 5 Pro-Tips to Win" 
                        style={{ background: 'var(--muted)', border: '1px solid var(--glass-border)', color: 'var(--foreground)', borderRadius: '8px', marginBottom: 0 }}
                        value={editingBlog ? editingBlog.title : newBlog.title}
                        onChange={e => {
                          if (editingBlog) setEditingBlog({ ...editingBlog, title: e.target.value });
                          else setNewBlog({ ...newBlog, title: e.target.value });
                        }}
                      />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--muted-foreground)' }}>Author Name</label>
                      <input 
                        type="text" 
                        required 
                        className="form-input" 
                        placeholder="e.g. Sarah Wanjiku" 
                        style={{ background: 'var(--muted)', border: '1px solid var(--glass-border)', color: 'var(--foreground)', borderRadius: '8px', marginBottom: 0 }}
                        value={editingBlog ? editingBlog.author : newBlog.author}
                        onChange={e => {
                          if (editingBlog) setEditingBlog({ ...editingBlog, author: e.target.value });
                          else setNewBlog({ ...newBlog, author: e.target.value });
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--muted-foreground)' }}>Category</label>
                      <select 
                        className="form-input" 
                        style={{ background: 'var(--muted)', border: '1px solid var(--glass-border)', color: 'var(--foreground)', borderRadius: '8px', marginBottom: 0 }}
                        value={editingBlog ? editingBlog.category : newBlog.category}
                        onChange={e => {
                          if (editingBlog) setEditingBlog({ ...editingBlog, category: e.target.value });
                          else setNewBlog({ ...newBlog, category: e.target.value });
                        }}
                      >
                        <option value="Innovation">Innovation</option>
                        <option value="Guides">Guides</option>
                        <option value="Business">Business</option>
                        <option value="General">General</option>
                      </select>
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--muted-foreground)' }}>Banner Image {editingBlog && '(Optional upload to replace)'}</label>
                      <input 
                        type="file" 
                        accept="image/*"
                        className="form-input" 
                        style={{ background: 'var(--muted)', border: '1px solid var(--glass-border)', color: 'var(--foreground)', borderRadius: '8px', marginBottom: 0 }}
                        onChange={e => { if (e.target.files && e.target.files[0]) setBlogImageFile(e.target.files[0]); }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--muted-foreground)' }}>Brief Excerpt</label>
                    <input 
                      type="text" 
                      required 
                      className="form-input" 
                      placeholder="Enter a 1-sentence teaser..." 
                      style={{ background: 'var(--muted)', border: '1px solid var(--glass-border)', color: 'var(--foreground)', borderRadius: '8px', marginBottom: 0 }}
                      value={editingBlog ? editingBlog.excerpt : newBlog.excerpt}
                      onChange={e => {
                        if (editingBlog) setEditingBlog({ ...editingBlog, excerpt: e.target.value });
                        else setNewBlog({ ...newBlog, excerpt: e.target.value });
                      }}
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--muted-foreground)' }}>Lead Summary Quote</label>
                    <input 
                      type="text" 
                      required 
                      className="form-input" 
                      placeholder="Enter a brief summary block..." 
                      style={{ background: 'var(--muted)', border: '1px solid var(--glass-border)', color: 'var(--foreground)', borderRadius: '8px', marginBottom: 0 }}
                      value={editingBlog ? editingBlog.summary : newBlog.summary}
                      onChange={e => {
                        if (editingBlog) setEditingBlog({ ...editingBlog, summary: e.target.value });
                        else setNewBlog({ ...newBlog, summary: e.target.value });
                      }}
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--muted-foreground)' }}>Article Content</label>
                    <textarea 
                      required 
                      rows={8}
                      className="form-input" 
                      placeholder="Write your blog post in plain English. For example:&#10;&#10;First paragraph goes here. Press Enter twice to create a new paragraph.&#10;&#10;### Section Heading&#10;- Bullet point 1&#10;- Bullet point 2" 
                      style={{ background: 'var(--muted)', border: '1px solid var(--glass-border)', color: 'var(--foreground)', borderRadius: '8px', marginBottom: 0, padding: '0.75rem' }}
                      value={editingBlog ? editingBlog.content : newBlog.content}
                      onChange={e => {
                        if (editingBlog) setEditingBlog({ ...editingBlog, content: e.target.value });
                        else setNewBlog({ ...newBlog, content: e.target.value });
                      }}
                    />
                  </div>

                  <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                    <button 
                      type="submit" 
                      className="btn btn-primary" 
                      disabled={actionLoading} 
                      style={{ padding: '0.625rem 1.5rem', borderRadius: '8px' }}
                    >
                      {actionLoading ? 'Saving...' : editingBlog ? 'Save Changes' : 'Publish Blog Post'}
                    </button>
                    {editingBlog && (
                      <button 
                        type="button" 
                        className="btn btn-outline" 
                        onClick={() => { setEditingBlog(null); setBlogImageFile(null); }}
                        style={{ padding: '0.625rem 1.5rem', borderRadius: '8px' }}
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              </div>

              {/* Current Blogs List */}
              <div style={{ padding: '2rem', background: 'var(--muted, rgba(128,128,128,0.05))', border: '1px solid var(--glass-border)', borderRadius: '1.5rem' }}>
                <h3 style={{ color: 'var(--foreground)', fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.5rem' }}>Manage Blog Posts</h3>
                
                {blogs.length === 0 ? (
                  <p style={{ color: 'var(--muted-foreground)', textAlign: 'center', margin: '2rem 0' }}>No blog posts published yet.</p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {blogs.map(post => (
                      <div key={post.id} style={{ display: 'flex', gap: '1rem', alignItems: 'center', padding: '1rem', background: 'rgba(0,0,0,0.1)', border: '1px solid var(--glass-border)', borderRadius: '12px' }}>
                        <img src={post.image_url} alt="" style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '8px', border: '1px solid var(--glass-border)' }} />
                        <div style={{ flex: 1 }}>
                          <h4 style={{ margin: '0 0 0.25rem 0', color: 'var(--foreground)', fontSize: '1rem', fontWeight: 700 }}>{post.title}</h4>
                          <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--muted-foreground)' }}>
                            Category: <strong style={{ color: 'var(--tuk-gold)' }}>{post.category}</strong> &bull; By {post.author} &bull; {new Date(post.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <button 
                          onClick={() => { setEditingBlog(post); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                          className="btn btn-outline" 
                          style={{ padding: '0.5rem 0.75rem', borderRadius: '8px', marginRight: '0.5rem', fontSize: '0.85rem' }}
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDeleteBlog(post.id)}
                          className="btn btn-outline text-red-500 hover:bg-red-500 hover:text-white" 
                          style={{ padding: '0.5rem', borderRadius: '8px' }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
