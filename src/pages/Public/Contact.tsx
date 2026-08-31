import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare } from 'lucide-react';

const contactItems = [
  {
    icon: <Mail size={20} />,
    label: 'Email Us',
    value: 'info@tukfrontier.com',
    href: 'mailto:info@tukfrontier.com',
    color: '#fbbf24',
    glow: 'rgba(251,191,36,0.2)',
    bg: 'rgba(251,191,36,0.06)',
    border: 'rgba(251,191,36,0.2)'
  },
  {
    icon: <Phone size={20} />,
    label: 'Call Us',
    value: '+254 794 107 254',
    href: 'tel:+254794107254',
    color: '#60a5fa',
    glow: 'rgba(96,165,250,0.2)',
    bg: 'rgba(96,165,250,0.06)',
    border: 'rgba(96,165,250,0.2)'
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="M12.004 2C6.48 2 2.004 6.478 2.004 12c0 2.226.73 4.28 1.967 5.955L2.004 22l4.167-1.92A9.94 9.94 0 0 0 12.004 22c5.523 0 10-4.478 10-10s-4.477-10-10-10zm0 18.333c-1.895 0-3.666-.547-5.17-1.498l-.37-.233-2.457 1.133.673-2.39-.256-.407a8.293 8.293 0 0 1-1.424-4.605c0-4.6 3.738-8.333 8.333-8.333 4.6 0 8.333 3.733 8.333 8.333 0 4.6-3.737 8.333-8.333 8.333zm4.568-6.223c-.25-.125-1.478-.73-1.707-.812-.229-.083-.396-.125-.562.125-.167.25-.646.812-.792.979-.146.167-.292.188-.542.063-.25-.125-1.055-.388-2.01-1.242-.743-.662-1.245-1.48-1.39-1.73-.146-.25-.015-.385.11-.51.113-.112.25-.292.375-.438.125-.146.167-.25.25-.417.083-.167.042-.313-.02-.438-.063-.125-.563-1.354-.77-1.854-.203-.49-.41-.422-.563-.43-.146-.008-.313-.008-.479-.008s-.438.063-.667.313c-.229.25-.875.854-.875 2.083s.896 2.417 1.02 2.583c.125.167 1.763 2.693 4.272 3.778.597.258 1.063.413 1.426.528.6.19 1.147.163 1.58.098.481-.072 1.479-.604 1.687-1.188.208-.583.208-1.083.146-1.188-.062-.104-.208-.167-.458-.292z"/>
      </svg>
    ),
    label: 'WhatsApp Chat',
    value: 'Chat Directly',
    href: 'https://wa.me/254794107254',
    color: '#25d366',
    glow: 'rgba(37,211,102,0.2)',
    bg: 'rgba(37,211,102,0.06)',
    border: 'rgba(37,211,102,0.2)',
    isExternal: true
  },
  {
    icon: <MapPin size={20} />,
    label: 'Location',
    value: 'TUK, Haile Selassie Ave, Nairobi',
    href: 'https://maps.google.com/?q=Technical+University+of+Kenya+Nairobi',
    color: '#a78bfa',
    glow: 'rgba(167,139,250,0.2)',
    bg: 'rgba(167,139,250,0.06)',
    border: 'rgba(167,139,250,0.2)',
    isExternal: true
  }
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.08, ease: 'easeOut' as const } }),
};

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.from('tuk_hackathon_contact_messages').insert([formData]);
    if (error) {
      alert('Error sending message: ' + error.message);
    } else {
      setSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }
    setLoading(false);
  };

  const getInputStyle = (field: string) => ({
    width: '100%',
    padding: '0.875rem 1rem',
    borderRadius: '12px',
    border: `1.5px solid ${focusedField === field ? 'rgba(251,191,36,0.5)' : 'rgba(255,255,255,0.08)'}`,
    background: focusedField === field ? 'rgba(251,191,36,0.04)' : 'rgba(15,23,42,0.6)',
    color: '#fff',
    fontSize: '0.95rem',
    outline: 'none',
    transition: 'all 0.25s ease',
    boxShadow: focusedField === field ? '0 0 0 3px rgba(251,191,36,0.08)' : 'none',
    marginBottom: 0,
  });

  return (
    <div className="w-full overflow-x-hidden" style={{ background: '#060d1f' }}>

      {/* ── Page Hero ─────────────────────────────────── */}
      <section className="page-hero">
        <div className="page-hero-glow-left" style={{ background: 'radial-gradient(circle, rgba(96,165,250,0.06) 0%, transparent 65%)' }} />
        <div className="page-hero-glow-right" style={{ background: 'radial-gradient(circle, rgba(251,191,36,0.06) 0%, transparent 65%)' }} />
        <div className="container relative z-10 text-center" style={{ maxWidth: '800px' }}>
          <motion.div initial="hidden" animate="show" variants={fadeUp}>
            <span className="section-eyebrow">Contact Organizing Team</span>
            <h1 className="font-black tracking-tight mb-5" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: 1.1, color: '#fff' }}>
              Let's Start a <span className="text-gradient">Conversation</span>
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed max-w-3xl mx-auto" style={{ margin: '0 auto' }}>
              Questions about registration, track challenges, or general summit logistics? Send us a message and our team will get right back to you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Contact Info & Form Section ────────────────── */}
      <section className="page-section container" style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div className="grid md:grid-cols-2 gap-8 items-start">
          
          {/* Left Side: Contact Methods & FAQ Teaser */}
          <motion.div
            className="flex flex-col gap-6"
            initial="hidden" animate="show" variants={fadeUp}
          >
            <div className="unified-card" style={{ borderColor: 'rgba(30,41,59,0.8)' }}>
              {/* Top gradient highlight strip */}
              <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: '2px', background: 'linear-gradient(to right, transparent, var(--tuk-gold), transparent)' }} />

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.75rem' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <MessageSquare size={18} color="var(--tuk-gold)" />
                </div>
                <div>
                  <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: '#fff' }}>Get in Touch</h2>
                  <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--muted-foreground)' }}>We usually respond within 24 hours</p>
                </div>
              </div>

              <div className="flex flex-col gap-3" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {contactItems.map((item, i) => (
                  <motion.a
                    key={i}
                    href={item.href}
                    target={item.isExternal ? '_blank' : undefined}
                    rel={item.isExternal ? 'noopener noreferrer' : undefined}
                    className="flex items-center gap-4 p-3.5 rounded-xl transition-all"
                    style={{ textDecoration: 'none', background: item.bg, border: `1px solid ${item.border}` }}
                    whileHover={{ scale: 1.02, borderColor: item.color + '40', boxShadow: `0 8px 24px ${item.glow}` }}
                  >
                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: `${item.color}15`, border: `1px solid ${item.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: item.color }}>
                      {item.icon}
                    </div>
                    <div>
                      <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--muted-foreground)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.15rem' }}>{item.label}</div>
                      <div style={{ fontWeight: 700, fontSize: '0.9rem', color: item.color }}>{item.value}</div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-500/80 to-amber-500/10 border border-amber-500/20 flex gap-4" style={{ display: 'flex', gap: '1rem', background: 'rgba(251,191,36,0.04)', border: '1px solid rgba(251,191,36,0.2)' }}>
              <div style={{ fontSize: '1.5rem', lineHeight: 1 }}>💡</div>
              <div>
                <h4 style={{ margin: 0, fontWeight: 700, color: '#fff', fontSize: '0.9rem', marginBottom: '0.25rem' }}>Check our FAQ first</h4>
                <p style={{ margin: 0, color: 'var(--muted-foreground)', fontSize: '0.825rem', lineHeight: 1.5 }}>
                  Many common questions about registration, team formation, and prize distributions are already answered in our{' '}
                  <a href="/guide" style={{ color: 'var(--tuk-gold)', textDecoration: 'none', fontWeight: 600 }}>Hacker Playbook & Guide →</a>
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Message Submission Form */}
          <motion.div
            className="unified-card"
            style={{ padding: '2.5rem', borderColor: 'rgba(30,41,59,0.8)' }}
            initial="hidden" animate="show" variants={fadeUp}
          >
            {/* Top gradient highlight strip */}
            <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: '2px', background: 'linear-gradient(to right, transparent, rgba(96,165,250,0.6), transparent)' }} />

            {success ? (
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                style={{ textAlign: 'center', padding: '2rem 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}
              >
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4ade80' }}>
                  <CheckCircle2 size={32} />
                </div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', margin: 0 }}>Message Sent!</h2>
                <p style={{ color: 'var(--muted-foreground)', fontSize: '0.875rem', lineHeight: 1.6, maxWidth: '340px', margin: 0 }}>
                  Thank you for reaching out. A member of our student organizing team will review your message and reply shortly.
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-slate-200 mt-4 transition-colors"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', fontSize: '0.875rem' }}
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#fff', margin: 0, marginBottom: '0.25rem' }}>Send a Message</h2>
                  <p style={{ margin: 0, color: 'var(--muted-foreground)', fontSize: '0.85rem' }}>Fill in the fields below to get in touch.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4" style={{ display: 'grid', gap: '1rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--muted-foreground)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Your Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="John Doe"
                      style={getInputStyle('name') as any}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--muted-foreground)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="john@example.com"
                      style={getInputStyle('email') as any}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--muted-foreground)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Subject *</label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={e => setFormData({ ...formData, subject: e.target.value })}
                    onFocus={() => setFocusedField('subject')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="General Inquiry, Registration Help, Sponsor Tiers..."
                    style={getInputStyle('subject') as any}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--muted-foreground)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Message *</label>
                  <textarea
                    rows={5}
                    required
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Tell us what's on your mind..."
                    style={{ ...(getInputStyle('message') as any), resize: 'vertical', fontFamily: 'inherit' }}
                  />
                </div>

                <div className="flex justify-end mt-2" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center gap-2 px-7 py-3 rounded-xl font-bold transition-all hover:-translate-y-0.5"
                    style={{
                      background: loading ? '#6b7280' : 'linear-gradient(135deg,#fbbf24,#f59e0b)',
                      color: '#060d1f', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', fontSize: '0.9rem'
                    }}
                  >
                    <Send size={15} />
                    {loading ? 'Sending...' : 'Send Message'}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
