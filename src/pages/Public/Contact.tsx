import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare, Sparkles } from 'lucide-react';

const contactItems = [
  {
    icon: <Mail size={20} />,
    label: 'Email Us',
    value: 'info@tukfrontier.com',
    href: 'mailto:info@tukfrontier.com',
    color: '#fbbf24',
    glow: 'rgba(251,191,36,0.2)',
    bg: 'rgba(251,191,36,0.1)',
    border: 'rgba(251,191,36,0.25)',
  },
  {
    icon: <Phone size={20} />,
    label: 'Call Us',
    value: '+254 794 107 254',
    href: 'tel:+254794107254',
    color: '#60a5fa',
    glow: 'rgba(96,165,250,0.2)',
    bg: 'rgba(96,165,250,0.1)',
    border: 'rgba(96,165,250,0.25)',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="#25d366">
        <path d="M12.004 2C6.48 2 2.004 6.478 2.004 12c0 2.226.73 4.28 1.967 5.955L2.004 22l4.167-1.92A9.94 9.94 0 0 0 12.004 22c5.523 0 10-4.478 10-10s-4.477-10-10-10zm0 18.333c-1.895 0-3.666-.547-5.17-1.498l-.37-.233-2.457 1.133.673-2.39-.256-.407a8.293 8.293 0 0 1-1.424-4.605c0-4.6 3.738-8.333 8.333-8.333 4.6 0 8.333 3.733 8.333 8.333 0 4.6-3.737 8.333-8.333 8.333zm4.568-6.223c-.25-.125-1.478-.73-1.707-.812-.229-.083-.396-.125-.562.125-.167.25-.646.812-.792.979-.146.167-.292.188-.542.063-.25-.125-1.055-.388-2.01-1.242-.743-.662-1.245-1.48-1.39-1.73-.146-.25-.015-.385.11-.51.113-.112.25-.292.375-.438.125-.146.167-.25.25-.417.083-.167.042-.313-.02-.438-.063-.125-.563-1.354-.77-1.854-.203-.49-.41-.422-.563-.43-.146-.008-.313-.008-.479-.008s-.438.063-.667.313c-.229.25-.875.854-.875 2.083s.896 2.417 1.02 2.583c.125.167 1.763 2.693 4.272 3.778.597.258 1.063.413 1.426.528.6.19 1.147.163 1.58.098.481-.072 1.479-.604 1.687-1.188.208-.583.208-1.083.146-1.188-.062-.104-.208-.167-.458-.292z"/>
      </svg>
    ),
    label: 'WhatsApp Chat',
    value: 'Chat Directly',
    href: 'https://wa.me/254794107254',
    color: '#25d366',
    glow: 'rgba(37,211,102,0.2)',
    bg: 'rgba(37,211,102,0.1)',
    border: 'rgba(37,211,102,0.25)',
    isExternal: true,
  },
  {
    icon: <MapPin size={20} />,
    label: 'Location',
    value: 'Technical University of Kenya, Nairobi',
    href: 'https://maps.google.com/?q=Technical+University+of+Kenya+Nairobi',
    color: '#c084fc',
    glow: 'rgba(192,132,252,0.2)',
    bg: 'rgba(192,132,252,0.1)',
    border: 'rgba(192,132,252,0.25)',
    isExternal: true,
  },
];

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

  const inputStyle = (field: string) => ({
    width: '100%',
    padding: '0.875rem 1rem',
    borderRadius: '12px',
    border: `1.5px solid ${focusedField === field ? 'var(--tuk-gold)' : 'var(--glass-border)'}`,
    background: focusedField === field ? 'rgba(251,191,36,0.04)' : 'var(--muted)',
    color: 'var(--foreground)',
    fontSize: '0.95rem',
    outline: 'none',
    transition: 'all 0.2s ease',
    boxShadow: focusedField === field ? '0 0 0 3px rgba(251,191,36,0.1)' : 'none',
    marginBottom: 0,
  });

  return (
    <div style={{ position: 'relative', overflow: 'hidden', minHeight: '100vh' }}>
      {/* Background decorations */}
      <div style={{ position: 'absolute', top: '-100px', left: '-100px', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(234,179,8,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '0', right: '-80px', width: '450px', height: '450px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(192,132,252,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '40%', right: '20%', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(96,165,250,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div className="container" style={{ paddingTop: '3rem', paddingBottom: '5rem', position: 'relative', zIndex: 1 }}>

        {/* Hero header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 1.1rem', borderRadius: '999px', background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.25)', marginBottom: '1.25rem' }}>
            <Sparkles size={14} color="var(--tuk-gold)" />
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--tuk-gold)', letterSpacing: '0.05em' }}>WE'RE ALWAYS LISTENING</span>
          </div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: '1.25rem', background: 'linear-gradient(135deg, var(--foreground) 0%, var(--tuk-gold) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Let's Start a Conversation
          </h1>
          <p style={{ maxWidth: '540px', margin: '0 auto', color: 'var(--muted-foreground)', fontSize: '1.05rem', lineHeight: 1.7 }}>
            Have questions about registrations, track challenges, or logistics? Drop us a line and our organizing team will get right back to you.
          </p>
        </motion.div>

        {/* Main grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', maxWidth: '1100px', margin: '0 auto', alignItems: 'start' }}>

          {/* LEFT: Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
          >
            {/* Info card */}
            <div style={{ padding: '2rem', borderRadius: '1.5rem', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', backdropFilter: 'blur(16px)', position: 'relative', overflow: 'hidden' }}>
              {/* Card top accent */}
              <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: '2px', background: 'linear-gradient(to right, transparent, var(--tuk-gold), transparent)' }} />

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <MessageSquare size={18} color="var(--tuk-gold)" />
                </div>
                <div>
                  <h2 style={{ margin: 0, fontSize: '1.35rem', fontWeight: 800, color: 'var(--foreground)' }}>Get in Touch</h2>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--muted-foreground)' }}>We respond within 24 hours</p>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                {contactItems.map((item, i) => (
                  <motion.a
                    key={i}
                    href={item.href}
                    target={item.isExternal ? '_blank' : undefined}
                    rel={item.isExternal ? 'noopener noreferrer' : undefined}
                    style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.875rem 1rem', borderRadius: '1rem', background: item.bg, border: `1px solid ${item.border}`, transition: 'all 0.2s ease', cursor: 'pointer' }}
                    whileHover={{ scale: 1.02, boxShadow: `0 0 20px ${item.glow}` }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.08 }}
                  >
                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: `${item.color}18`, border: `1px solid ${item.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: item.color, boxShadow: `0 0 12px ${item.glow}` }}>
                      {item.icon}
                    </div>
                    <div>
                      <div style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--muted-foreground)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.15rem' }}>{item.label}</div>
                      <div style={{ fontWeight: 700, fontSize: '0.9rem', color: item.color }}>{item.value}</div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* FAQ teaser */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              style={{ padding: '1.5rem', borderRadius: '1.25rem', background: 'linear-gradient(135deg, rgba(251,191,36,0.08) 0%, rgba(251,191,36,0.02) 100%)', border: '1px solid rgba(251,191,36,0.2)', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}
            >
              <div style={{ fontSize: '1.75rem', lineHeight: 1 }}>💡</div>
              <div>
                <p style={{ margin: 0, fontWeight: 700, color: 'var(--foreground)', fontSize: '0.9rem', marginBottom: '0.25rem' }}>Check our FAQ first</p>
                <p style={{ margin: 0, color: 'var(--muted-foreground)', fontSize: '0.82rem', lineHeight: 1.5 }}>Many common questions about registration, teams, and prizes are already answered in our <a href="/guide" style={{ color: 'var(--tuk-gold)', textDecoration: 'none', fontWeight: 600 }}>Participant Guide →</a></p>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            style={{ padding: '2.5rem', borderRadius: '1.5rem', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', backdropFilter: 'blur(16px)', position: 'relative', overflow: 'hidden' }}
          >
            {/* Card top accent */}
            <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: '2px', background: 'linear-gradient(to right, transparent, rgba(96,165,250,0.8), transparent)' }} />

            {success ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                style={{ textAlign: 'center', padding: '3rem 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}
              >
                <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'rgba(16,185,129,0.1)', border: '2px solid rgba(16,185,129,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <CheckCircle2 size={36} color="#10b981" />
                </div>
                <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--foreground)', margin: 0 }}>Message Sent! 🎉</h2>
                <p style={{ color: 'var(--muted-foreground)', maxWidth: '360px', lineHeight: 1.6, margin: 0 }}>
                  Thank you for reaching out. A member of our organizing committee will review your inquiry and respond shortly.
                </p>
                <button
                  className="btn btn-outline"
                  style={{ marginTop: '1rem', padding: '0.75rem 2rem', borderRadius: '12px' }}
                  onClick={() => setSuccess(false)}
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ marginBottom: '0.5rem' }}>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--foreground)', margin: 0, marginBottom: '0.35rem' }}>Send a Message</h2>
                  <p style={{ margin: 0, color: 'var(--muted-foreground)', fontSize: '0.875rem' }}>Fill in the form and we'll get back to you ASAP.</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--muted-foreground)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Your Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="John Doe"
                      style={inputStyle('name') as any}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--muted-foreground)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="john@example.com"
                      style={inputStyle('email') as any}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--muted-foreground)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Subject *</label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={e => setFormData({ ...formData, subject: e.target.value })}
                    onFocus={() => setFocusedField('subject')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="General Inquiry, Registration Help, etc."
                    style={inputStyle('subject') as any}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--muted-foreground)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Message *</label>
                  <textarea
                    rows={6}
                    required
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Tell us what's on your mind..."
                    style={{ ...(inputStyle('message') as any), resize: 'vertical', fontFamily: 'inherit' }}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.25rem' }}>
                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: loading ? 1 : 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '0.625rem',
                      padding: '0.875rem 2.25rem', borderRadius: '14px',
                      fontWeight: 800, fontSize: '0.95rem', cursor: loading ? 'not-allowed' : 'pointer',
                      border: 'none', outline: 'none',
                      background: loading ? 'rgba(251,191,36,0.5)' : 'var(--tuk-gold)',
                      color: '#0a0a0a',
                      boxShadow: loading ? 'none' : '0 4px 20px rgba(251,191,36,0.35)',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <Send size={16} />
                    {loading ? 'Sending...' : 'Send Message'}
                  </motion.button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
