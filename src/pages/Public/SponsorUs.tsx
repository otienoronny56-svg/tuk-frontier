import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { motion } from 'framer-motion';
import { Mail, Phone, Building, CheckCircle2, ArrowRight, Star, Trophy, Zap } from 'lucide-react';

const DEFAULT_TIERS = [
  {
    id: 'silver', name: 'Silver Sponsor', price: 'KSh 130,000', color: '#94a3b8', border: 'rgba(148,163,184,0.3)', bg: 'rgba(148,163,184,0.06)',
    recommended: false,
    perks: ['Logo on website & printed materials', 'Social media shoutout', 'Distribute swag in hacker kits', 'Resume book access (post-event)'],
  },
  {
    id: 'gold', name: 'Gold Sponsor', price: 'KSh 325,000', color: '#fbbf24', border: 'rgba(251,191,36,0.4)', bg: 'rgba(251,191,36,0.07)',
    recommended: true,
    perks: ['Host a sponsored Challenge Track', 'Provide an API/Platform demo session', 'Judge a challenge category', 'All Silver Sponsor benefits'],
  },
  {
    id: 'platinum', name: 'Platinum Sponsor', price: 'KSh 650,000', color: '#e2e8f0', border: 'rgba(226,232,240,0.3)', bg: 'rgba(226,232,240,0.06)',
    recommended: false,
    perks: ['Co-branded event marketing & signage', 'Keynote speaking slot', 'VIP Lounge access & private booth', 'All Gold Sponsor benefits'],
  },
];

const tierIcons: Record<string, React.ReactNode> = {
  silver: <Star size={22} />,
  gold: <Trophy size={22} />,
  platinum: <Zap size={22} />,
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.1, ease: 'easeOut' as const } }),
};

export default function SponsorUs() {
  const [formOpen, setFormOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState('Custom');
  const [formData, setFormData] = useState({ company_name: '', contact_name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [sponsors, setSponsors] = useState<any[]>([]);
  const [sponsorTiers, setSponsorTiers] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const [{ data: sponsorsData }, { data: contentData }] = await Promise.all([
        supabase.from('tuk_hackathon_sponsors').select('*'),
        supabase.from('tuk_hackathon_content').select('*').eq('key', 'sponsor_tiers').single()
      ]);
      if (sponsorsData) setSponsors(sponsorsData);
      setSponsorTiers(contentData?.value?.length > 0 ? contentData.value : DEFAULT_TIERS);
    };
    fetchData();
  }, []);

  const handleInquire = (tier: string) => {
    setSelectedTier(tier);
    setFormOpen(true);
    setSuccess(false);
    setTimeout(() => document.getElementById('inquiry-form')?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.from('tuk_hackathon_sponsor_inquiries').insert([{ ...formData, tier: selectedTier }]);
    if (error) alert('Error submitting inquiry: ' + error.message);
    else { setSuccess(true); setFormData({ company_name: '', contact_name: '', email: '', message: '' }); }
    setLoading(false);
  };

  return (
    <div className="w-full overflow-x-hidden" style={{ background: '#060d1f' }}>

      {/* ── Page Hero ─────────────────────────────────── */}
      <section className="page-hero">
        <div className="page-hero-glow-left" style={{ background: 'radial-gradient(circle, rgba(251,191,36,0.09) 0%, transparent 65%)' }} />
        <div className="page-hero-glow-right" />
        <div className="container relative z-10 text-center" style={{ maxWidth: '800px' }}>
          <motion.div initial="hidden" animate="show" variants={fadeUp}>
            <span className="section-eyebrow">Corporate Partnerships</span>
            <h1 className="font-black tracking-tight mb-5" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: 1.1, color: '#fff' }}>
              Partner With <span className="text-gradient">TUK Frontier</span>
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed" style={{ margin: '0 auto' }}>
              Connect with the brightest emerging engineering talent in Kenya. Sponsor the TUK Frontier Hackathon and position your brand at the forefront of African innovation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Existing Sponsors ─────────────────────────── */}
      {sponsors.length > 0 && (
        <section className="page-section page-section-border" style={{ background: 'rgba(15,23,42,0.4)' }}>
          <div className="container" style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <motion.div className="text-center mb-14" initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
              <span className="section-eyebrow">Current Partners</span>
              <h2 className="text-4xl font-black text-white tracking-tight">Our <span className="text-gradient">Sponsors</span></h2>
              <p className="text-slate-400 mt-3 text-sm">Thank you to the incredible organizations making this hackathon possible.</p>
            </motion.div>

            <div className="flex flex-col gap-12 items-center">
              {['Platinum', 'Gold', 'Silver', 'Custom'].map(tier => {
                const tierSponsors = sponsors.filter(s => s.tier === tier);
                if (tierSponsors.length === 0) return null;
                const dims = tier === 'Platinum' ? { width: '220px', height: '100px' } : tier === 'Gold' ? { width: '180px', height: '85px' } : { width: '150px', height: '70px' };
                const tierColor = tier === 'Platinum' ? '#e2e8f0' : tier === 'Gold' ? '#fbbf24' : '#94a3b8';
                return (
                  <div key={tier} className="w-full">
                    <p className="text-center text-xs font-bold uppercase tracking-widest mb-6" style={{ color: tierColor }}>{tier} Partners</p>
                    <div className="flex flex-wrap justify-center gap-6">
                      {tierSponsors.map(sponsor => (
                        <motion.a key={sponsor.id} href={sponsor.website_url || '#'} target="_blank" rel="noopener noreferrer"
                          className="unified-card flex items-center justify-center transition-all"
                          style={{ ...dims, padding: '1rem', textDecoration: 'none', borderColor: tierColor + '25' }}
                          whileHover={{ y: -4, borderColor: tierColor + '55' }}
                        >
                          {sponsor.logo_url ? (
                            <img src={sponsor.logo_url} alt={sponsor.name} style={{ maxWidth: '85%', maxHeight: '75%', objectFit: 'contain' }} />
                          ) : (
                            <div className="flex flex-col items-center gap-1">
                              <Building size={22} style={{ color: 'rgba(148,163,184,0.5)' }} />
                              <span className="text-xs font-semibold text-slate-300 text-center">{sponsor.name}</span>
                            </div>
                          )}
                        </motion.a>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── Sponsor Tiers ─────────────────────────────── */}
      <section className="page-section page-section-border">
        <div className="container" style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <motion.div className="text-center mb-14" initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
            <span className="section-eyebrow">Sponsorship Tiers</span>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
              Choose a <span className="text-gradient">Partnership Level</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 items-start">
            {(sponsorTiers.length > 0 ? sponsorTiers : DEFAULT_TIERS).map((tier: any, i: number) => {
              const def = DEFAULT_TIERS.find(d => d.id === tier.id) || DEFAULT_TIERS[i % DEFAULT_TIERS.length];
              const color = tier.color || def.color;
              const border = tier.border || def.border;
              const bg = tier.bg || def.bg;
              return (
                <motion.div
                  key={tier.id || i}
                  className="unified-card flex flex-col relative overflow-hidden"
                  style={{ borderColor: border, ...(tier.recommended ? { transform: 'scale(1.04)', zIndex: 10 } : {}) }}
                  initial="hidden" whileInView="show" viewport={{ once: true }} custom={i} variants={fadeUp}
                  whileHover={{ y: -5, borderColor: color + '66', boxShadow: `0 16px 48px -16px ${color}35` }}
                >
                  {/* Top highlight bar */}
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(to right, transparent, ${color}, transparent)` }} />

                  {tier.recommended && (
                    <div className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full self-start mb-4" style={{ background: color, color: '#000' }}>
                      Most Popular
                    </div>
                  )}

                  <div style={{ width: '2.75rem', height: '2.75rem', borderRadius: '0.75rem', background: bg, border: `1px solid ${border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color, marginBottom: '1.25rem' }}>
                    {tierIcons[tier.id] || <Trophy size={22} />}
                  </div>

                  <h3 className="text-xl font-bold mb-1" style={{ color }}>{tier.name}</h3>
                  <div className="text-3xl font-black text-white mb-6">{tier.price}</div>

                  <ul className="flex flex-col gap-3 mb-8 flex-1">
                    {(tier.perks || []).map((perk: string, pi: number) => (
                      <li key={pi} className="flex items-start gap-3 text-sm text-slate-300">
                        <CheckCircle2 size={16} style={{ color, flexShrink: 0, marginTop: '2px' }} />
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => handleInquire(tier.name)}
                    className="w-full py-3 px-6 rounded-xl font-bold text-sm transition-all hover:-translate-y-0.5"
                    style={tier.recommended
                      ? { background: `linear-gradient(135deg, ${color}, ${color}cc)`, color: '#000', border: 'none' }
                      : { background: 'transparent', color, border: `1px solid ${border}` }
                    }
                  >
                    Inquire About {tier.name}
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Inquiry Form ──────────────────────────────── */}
      {formOpen && (
        <section className="page-section page-section-border" style={{ background: 'rgba(15,23,42,0.5)' }}>
          <div className="container" style={{ maxWidth: '700px', margin: '0 auto' }}>
            <motion.div id="inquiry-form" className="unified-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex justify-between items-center mb-6 pb-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <div>
                  <span className="section-eyebrow" style={{ marginBottom: '0.25rem' }}>Partnership Inquiry</span>
                  <h2 className="text-2xl font-bold text-white" style={{ margin: 0 }}>Sponsorship Application</h2>
                </div>
                <button onClick={() => setFormOpen(false)} className="text-slate-400 hover:text-white transition-colors text-sm font-semibold px-3 py-1 rounded-lg" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  Close
                </button>
              </div>

              {success ? (
                <div className="text-center py-10">
                  <CheckCircle2 size={52} className="mx-auto mb-4 text-emerald-400" />
                  <h3 className="text-xl font-bold text-white mb-2">Inquiry Submitted!</h3>
                  <p className="text-slate-400 text-sm">Our team will be in touch with you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="flex items-center gap-3 p-4 rounded-xl" style={{ background: 'rgba(251,191,36,0.07)', border: '1px solid rgba(251,191,36,0.2)' }}>
                    <Trophy size={18} style={{ color: '#fbbf24', flexShrink: 0 }} />
                    <span className="text-sm text-slate-300">Selected tier: <strong className="text-amber-400">{selectedTier}</strong></span>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="form-group mb-0">
                      <label className="form-label">Company Name *</label>
                      <input type="text" className="form-input" required value={formData.company_name} onChange={e => setFormData({ ...formData, company_name: e.target.value })} />
                    </div>
                    <div className="form-group mb-0">
                      <label className="form-label">Contact Person *</label>
                      <input type="text" className="form-input" required value={formData.contact_name} onChange={e => setFormData({ ...formData, contact_name: e.target.value })} />
                    </div>
                  </div>

                  <div className="form-group mb-0">
                    <label className="form-label">Email Address *</label>
                    <input type="email" className="form-input" required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                  </div>

                  <div className="form-group mb-0">
                    <label className="form-label">Additional Message</label>
                    <textarea className="form-input" rows={4} value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} placeholder="Tell us about your partnership goals..." />
                  </div>

                  <div className="text-right">
                    <button type="submit" disabled={loading} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-black transition-all hover:-translate-y-0.5" style={{ background: loading ? '#6b7280' : 'linear-gradient(135deg,#fbbf24,#f59e0b)', border: 'none', cursor: loading ? 'not-allowed' : 'pointer' }}>
                      {loading ? 'Submitting...' : (<>Submit Inquiry <ArrowRight size={16} /></>)}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        </section>
      )}

      {/* ── Contact CTA ───────────────────────────────── */}
      <section className="page-section page-section-border text-center" style={{ background: 'rgba(15,23,42,0.5)' }}>
        <div className="container" style={{ maxWidth: '700px', margin: '0 auto' }}>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
            <span className="section-eyebrow" style={{ justifyContent: 'center' }}>Custom Partnership?</span>
            <h2 className="text-4xl font-black text-white tracking-tight mb-3">Let's <span className="text-gradient">Talk</span></h2>
            <p className="text-slate-400 mb-8 text-sm">Have a custom partnership in mind? Reach out to our organizing team directly.</p>

            <button onClick={() => handleInquire('Custom')} className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold mb-10 transition-all hover:-translate-y-1" style={{ background: 'transparent', border: '1px solid rgba(251,191,36,0.4)', color: '#fbbf24', cursor: 'pointer', fontSize: '0.95rem' }}>
              Submit Custom Inquiry <ArrowRight size={16} />
            </button>

            <div className="flex flex-col md:flex-row justify-center gap-8 pt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="flex items-center gap-3">
                <div style={{ width: '2rem', height: '2rem', borderRadius: '50%', background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Mail size={14} style={{ color: '#fbbf24' }} />
                </div>
                <span className="text-sm text-slate-300">sponsor@tukfrontier.com</span>
              </div>
              <a href="tel:+254794107254" className="flex items-center gap-3 hover:text-white transition-colors" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{ width: '2rem', height: '2rem', borderRadius: '50%', background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Phone size={14} style={{ color: '#fbbf24' }} />
                </div>
                <span className="text-sm text-slate-300">+254 794 107 254</span>
              </a>
              <div className="flex items-center gap-3">
                <div style={{ width: '2rem', height: '2rem', borderRadius: '50%', background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Building size={14} style={{ color: '#fbbf24' }} />
                </div>
                <span className="text-sm text-slate-300">Nairobi, Kenya</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
