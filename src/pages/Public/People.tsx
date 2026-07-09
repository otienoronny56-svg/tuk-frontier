import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, X, Send, CheckCircle2, Briefcase, User, Mail, Phone, Globe } from 'lucide-react';

function MentorModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', role: '', linkedin: '', expertise: '', motivation: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const inputStyle = (field: string): React.CSSProperties => ({
    width: '100%',
    padding: '0.8rem 1rem',
    borderRadius: '10px',
    border: `1.5px solid ${focused === field ? 'var(--tuk-gold)' : 'var(--glass-border)'}`,
    background: focused === field ? 'rgba(251,191,36,0.04)' : 'var(--muted)',
    color: 'var(--foreground)',
    fontSize: '0.9rem',
    outline: 'none',
    transition: 'all 0.2s ease',
    boxShadow: focused === field ? '0 0 0 3px rgba(251,191,36,0.12)' : 'none',
    fontFamily: 'inherit',
    boxSizing: 'border-box',
  });

  const labelStyle: React.CSSProperties = {
    fontSize: '0.72rem',
    fontWeight: 700,
    color: 'var(--muted-foreground)',
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    marginBottom: '0.35rem',
    display: 'block',
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const message = `MENTOR APPLICATION\n\nCompany: ${form.company}\nRole: ${form.role}\nPhone: ${form.phone}\nLinkedIn: ${form.linkedin}\nExpertise: ${form.expertise}\nMotivation: ${form.motivation}`;
    const { error } = await supabase.from('tuk_hackathon_contact_messages').insert([{
      name: form.name,
      email: form.email,
      subject: 'Mentor Application',
      message,
    }]);
    if (error) {
      alert('Error submitting: ' + error.message);
    } else {
      setSuccess(true);
    }
    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 20 }}
        style={{ width: '100%', maxWidth: '620px', maxHeight: '90vh', overflowY: 'auto', borderRadius: '1.5rem', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', boxShadow: '0 24px 80px rgba(0,0,0,0.4)', backdropFilter: 'blur(20px)', position: 'relative' }}
      >
        {/* Top accent line */}
        <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: '2px', background: 'linear-gradient(to right, transparent, var(--tuk-gold), transparent)', borderRadius: '999px' }} />

        {/* Close button */}
        <button
          onClick={onClose}
          style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', width: '32px', height: '32px', borderRadius: '8px', background: 'var(--muted)', border: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--muted-foreground)', transition: 'all 0.2s', zIndex: 1 }}
        >
          <X size={16} />
        </button>

        <div style={{ padding: '2.25rem' }}>
          {success ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              style={{ textAlign: 'center', padding: '2rem 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}
            >
              <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'rgba(16,185,129,0.12)', border: '2px solid rgba(16,185,129,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CheckCircle2 size={36} color="#10b981" />
              </div>
              <h2 style={{ margin: 0, fontSize: '1.75rem', fontWeight: 800, color: 'var(--foreground)' }}>Application Received! 🎉</h2>
              <p style={{ margin: 0, color: 'var(--muted-foreground)', lineHeight: 1.6, maxWidth: '380px' }}>
                Thank you for your interest in mentoring! Our team will review your application and reach out soon.
              </p>
              <button className="btn btn-outline" style={{ marginTop: '0.5rem', padding: '0.75rem 2rem', borderRadius: '12px' }} onClick={onClose}>Close</button>
            </motion.div>
          ) : (
            <>
              {/* Header */}
              <div style={{ marginBottom: '2rem', paddingRight: '2rem' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.3rem 0.9rem', borderRadius: '999px', background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.25)', marginBottom: '1rem' }}>
                  <Briefcase size={13} color="var(--tuk-gold)" />
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--tuk-gold)', letterSpacing: '0.05em' }}>MENTOR APPLICATION</span>
                </div>
                <h2 style={{ margin: 0, fontSize: '1.6rem', fontWeight: 900, color: 'var(--foreground)', lineHeight: 1.2, marginBottom: '0.5rem' }}>Join Us as a Mentor</h2>
                <p style={{ margin: 0, color: 'var(--muted-foreground)', fontSize: '0.9rem', lineHeight: 1.6 }}>Share your expertise with the next generation of builders during TUK Frontier.</p>
              </div>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={labelStyle}><User size={11} style={{ display: 'inline', marginRight: '4px' }} />Full Name *</label>
                    <input style={inputStyle('name')} type="text" required placeholder="Jane Smith" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} onFocus={() => setFocused('name')} onBlur={() => setFocused(null)} />
                  </div>
                  <div>
                    <label style={labelStyle}><Mail size={11} style={{ display: 'inline', marginRight: '4px' }} />Email *</label>
                    <input style={inputStyle('email')} type="email" required placeholder="jane@company.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} onFocus={() => setFocused('email')} onBlur={() => setFocused(null)} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={labelStyle}><Phone size={11} style={{ display: 'inline', marginRight: '4px' }} />Phone Number</label>
                    <input style={inputStyle('phone')} type="tel" placeholder="+254 7XX XXX XXX" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} onFocus={() => setFocused('phone')} onBlur={() => setFocused(null)} />
                  </div>
                  <div>
                    <label style={labelStyle}><Globe size={11} style={{ display: 'inline', marginRight: '4px' }} />LinkedIn / Portfolio</label>
                    <input style={inputStyle('linkedin')} type="url" placeholder="https://linkedin.com/in/..." value={form.linkedin} onChange={e => setForm({ ...form, linkedin: e.target.value })} onFocus={() => setFocused('linkedin')} onBlur={() => setFocused(null)} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={labelStyle}><Briefcase size={11} style={{ display: 'inline', marginRight: '4px' }} />Company / Organization *</label>
                    <input style={inputStyle('company')} type="text" required placeholder="Google, Safaricom, etc." value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} onFocus={() => setFocused('company')} onBlur={() => setFocused(null)} />
                  </div>
                  <div>
                    <label style={labelStyle}>Current Role / Title *</label>
                    <input style={inputStyle('role')} type="text" required placeholder="Senior Engineer, CTO, etc." value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} onFocus={() => setFocused('role')} onBlur={() => setFocused(null)} />
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>Areas of Expertise *</label>
                  <input style={inputStyle('expertise')} type="text" required placeholder="e.g. AI/ML, FinTech, Product Design, Cloud..." value={form.expertise} onChange={e => setForm({ ...form, expertise: e.target.value })} onFocus={() => setFocused('expertise')} onBlur={() => setFocused(null)} />
                </div>

                <div>
                  <label style={labelStyle}>Why do you want to mentor? *</label>
                  <textarea
                    style={{ ...inputStyle('motivation'), resize: 'vertical' } as any}
                    rows={4}
                    required
                    placeholder="Tell us why you'd like to mentor at TUK Frontier..."
                    value={form.motivation}
                    onChange={e => setForm({ ...form, motivation: e.target.value })}
                    onFocus={() => setFocused('motivation')}
                    onBlur={() => setFocused(null)}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                  <button type="button" onClick={onClose} className="btn btn-outline" style={{ padding: '0.75rem 1.5rem', borderRadius: '12px' }}>Cancel</button>
                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: loading ? 1 : 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                      padding: '0.75rem 2rem', borderRadius: '12px',
                      fontWeight: 800, fontSize: '0.9rem',
                      border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
                      background: loading ? 'rgba(251,191,36,0.5)' : 'var(--tuk-gold)',
                      color: '#0a0a0a',
                      boxShadow: loading ? 'none' : '0 4px 18px rgba(251,191,36,0.3)',
                      transition: 'all 0.2s',
                    }}
                  >
                    <Send size={15} />
                    {loading ? 'Submitting...' : 'Submit Application'}
                  </motion.button>
                </div>
              </form>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function People() {
  const [people, setPeople] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showMentorModal, setShowMentorModal] = useState(false);

  useEffect(() => {
    const fetchPeople = async () => {
      const { data } = await supabase.from('tuk_hackathon_people').select('*');
      if (data) setPeople(data);
      setLoading(false);
    };
    fetchPeople();
  }, []);

  const mentors = people.filter(p => p.type === 'Mentor');
  const judges = people.filter(p => p.type === 'Judge');

  if (loading) return <div className="text-center py-24"><Activity className="animate-spin mx-auto mb-4" color="var(--tuk-gold)" size={32} /><p>Loading directory...</p></div>;

  return (
    <div className="container pt-8 pb-16">
      <div className="text-center mb-16">
        <h1 className="text-gradient">Mentors &amp; Judges</h1>
        <p style={{ maxWidth: '600px', margin: '1rem auto' }}>
          Meet the industry experts who will be guiding your projects and evaluating your final submissions.
        </p>
      </div>

      <h2 className="text-center mb-8">Our Judges</h2>
      {judges.length === 0 ? (
        <p className="text-center text-muted-foreground mb-24">Judges will be announced soon.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-8 mb-24">
          {judges.map((person, i) => (
            <motion.div
              key={person.id}
              className="glass-card text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              {person.avatar_url ? (
                <img src={person.avatar_url} alt={person.name} style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', margin: '0 auto 1rem auto', border: '2px solid var(--glass-border)' }} />
              ) : (
                <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'var(--glass-border)', margin: '0 auto 1rem auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '2rem' }}>👤</span>
                </div>
              )}
              <h3 style={{ margin: '0 0 0.5rem 0' }}>{person.name}</h3>
              <div style={{ color: 'var(--tuk-gold)', fontWeight: 600, fontSize: '0.875rem' }}>{person.role}</div>
              <div style={{ color: 'var(--muted-foreground)', fontSize: '0.875rem' }}>{person.company}</div>
            </motion.div>
          ))}
        </div>
      )}

      <h2 className="text-center mb-8">Mentors in Residence</h2>
      {mentors.length === 0 ? (
        <p className="text-center text-muted-foreground mb-12">Mentors will be announced soon.</p>
      ) : (
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {mentors.map((person, i) => (
            <motion.div
              key={person.id}
              className="glass-card text-center" style={{ padding: '1.5rem' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              {person.avatar_url ? (
                <img src={person.avatar_url} alt={person.name} style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', margin: '0 auto 1rem auto', border: '2px solid var(--glass-border)' }} />
              ) : (
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--glass-border)', margin: '0 auto 1rem auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '1.5rem' }}>👤</span>
                </div>
              )}
              <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.25rem' }}>{person.name}</h3>
              <div style={{ color: 'var(--tuk-gold)', fontWeight: 600, fontSize: '0.875rem' }}>{person.role}</div>
              <div style={{ color: 'var(--muted-foreground)', fontSize: '0.875rem' }}>{person.company}</div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Want to Mentor CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ position: 'relative', marginTop: '2rem', padding: '3rem 2rem', borderRadius: '1.5rem', textAlign: 'center', overflow: 'hidden', background: 'linear-gradient(135deg, rgba(251,191,36,0.08) 0%, rgba(192,132,252,0.06) 100%)', border: '1px solid rgba(251,191,36,0.2)' }}
      >
        {/* Background glow */}
        <div style={{ position: 'absolute', top: '-40px', left: '50%', transform: 'translateX(-50%)', width: '300px', height: '200px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(251,191,36,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: '1px', background: 'linear-gradient(to right, transparent, rgba(251,191,36,0.6), transparent)' }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🧑‍🏫</div>
          <h3 style={{ fontSize: '1.75rem', fontWeight: 900, marginBottom: '0.75rem', color: 'var(--foreground)' }}>Want to mentor?</h3>
          <p style={{ color: 'var(--muted-foreground)', marginBottom: '1.75rem', maxWidth: '480px', margin: '0 auto 1.75rem auto', lineHeight: 1.6 }}>
            We are always looking for experienced professionals to help guide our student hackers. Shape the next generation of builders.
          </p>
          <motion.button
            onClick={() => setShowMentorModal(true)}
            whileHover={{ scale: 1.05, boxShadow: '0 8px 30px rgba(251,191,36,0.4)' }}
            whileTap={{ scale: 0.97 }}
            style={{ padding: '0.9rem 2.5rem', borderRadius: '14px', fontWeight: 800, fontSize: '1rem', border: 'none', cursor: 'pointer', background: 'var(--tuk-gold)', color: '#0a0a0a', boxShadow: '0 4px 20px rgba(251,191,36,0.3)', transition: 'all 0.2s' }}
          >
            Apply to Mentor →
          </motion.button>
        </div>
      </motion.div>

      {/* Mentor Application Modal */}
      <AnimatePresence>
        {showMentorModal && <MentorModal onClose={() => setShowMentorModal(false)} />}
      </AnimatePresence>
    </div>
  );
}
