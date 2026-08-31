import { motion } from 'framer-motion';
import { HelpCircle, ScrollText, Trophy, Scale, Zap, Users, Upload, Star, CheckCircle, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.08, ease: 'easeOut' as const } }),
};

export default function Guide() {
  const [activeTab, setActiveTab] = useState<'how' | 'rules' | 'judging' | 'prizes' | 'faq'>('how');
  const [rules, setRules] = useState<string[]>([]);
  const [faqs, setFaqs] = useState<{q: string, a: string}[]>([]);
  const [prizes, setPrizes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      const { data } = await supabase.from('tuk_hackathon_content').select('*').in('key', ['rules', 'faqs', 'prizes']);
      if (data) {
        const dbRules = data.find(d => d.key === 'rules')?.value;
        const dbFaqs = data.find(d => d.key === 'faqs')?.value;
        const dbPrizes = data.find(d => d.key === 'prizes')?.value;
        
        if (dbRules && dbRules.length > 0) setRules(dbRules);
        else setRules([
          "Fresh Code: All code, design, and assets must be created during the hackathon. Using pre-existing boilerplates is allowed, but the core logic must be new.",
          "Team Size: Teams can be solo or up to a maximum of 4 members.",
          "Respect & Inclusion: Be respectful to everyone. Harassment of any kind will not be tolerated and will result in immediate disqualification.",
          "Submissions: Projects must be submitted via the platform before the countdown hits zero. Late submissions will not be judged."
        ]);

        const defaultFaqs = [
          { q: "Who can participate?", a: "Any university student currently enrolled in a degree program." },
          { q: "Do I need to know how to code?", a: "While coding helps, teams also need designers, business strategists, and subject matter experts!" },
          { q: "When is the deadline to register?", a: "Registration closes 48 hours before the event begins." },
          { q: "Can I use AI tools like Copilot or ChatGPT?", a: "Yes, using AI tools for assistance is permitted and encouraged to speed up development." },
          { q: "How much does it cost to attend?", a: "Nothing! The hackathon is completely free for all accepted participants. We provide meals, swag, and Wi-Fi." },
          { q: "Do I need to have a team before arriving?", a: "Not at all! You can hack solo, or join our Team Formation session right after the opening ceremony to find teammates." },
          { q: "Will there be food and drinks?", a: "Absolutely. We provide breakfast, lunch, and dinner, plus plenty of snacks and coffee to keep you fueled for 48 hours." },
          { q: "What should I bring with me?", a: "Bring your laptop, phone, chargers, a valid Student ID, and comfortable clothes. If you plan to sleep at the venue, a sleeping bag or blanket is recommended." },
          { q: "Who owns the intellectual property of my project?", a: "You do! You and your team retain 100% ownership of the code, designs, and ideas you create during the hackathon." }
        ];

        if (dbPrizes && dbPrizes.length > 0) {
          setPrizes(dbPrizes);
        } else {
          setPrizes([
            { rank: '1st', label: 'Grand Prize Winner', description: 'KSh 650,000 Cash + 6 Months Incubation at TUK Innovation Hub', highlight: true },
            { rank: '2nd', label: 'Runner Up', description: 'KSh 325,000 Cash + Cloud Credits', highlight: false },
            { rank: '3rd', label: 'Second Runner Up', description: 'KSh 130,000 Cash + Startup Perks', highlight: false },
          ]);
        }

        if (dbFaqs && dbFaqs.length > 0) {
          setFaqs([...dbFaqs, ...defaultFaqs]);
        } else {
          setFaqs(defaultFaqs);
        }
      }
      setLoading(false);
    };
    fetchContent();
  }, []);

  return (
    <div className="w-full overflow-x-hidden" style={{ background: '#060d1f' }}>

      {/* ── Page Hero ─────────────────────────────────── */}
      <section className="page-hero">
        <div className="page-hero-glow-left" style={{ background: 'radial-gradient(circle, rgba(167,139,250,0.06) 0%, transparent 65%)' }} />
        <div className="page-hero-glow-right" style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.06) 0%, transparent 65%)' }} />
        <div className="container relative z-10 text-center" style={{ maxWidth: '800px' }}>
          <motion.div initial="hidden" animate="show" variants={fadeUp}>
            <span className="section-eyebrow">Hacker Playbook</span>
            <h1 className="font-black tracking-tight mb-5" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: 1.1, color: '#fff' }}>
              Hacker <span className="text-gradient">Guide</span>
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed" style={{ margin: '0 auto' }}>
              Everything you need to know about TUK Frontier Hackathon 2026. Explore the steps, study the rules, review our judging metrics, and eye the prizes.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Tabs Content Section ──────────────────────── */}
      <section className="page-section container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
        {/* Segmented Control Selector */}
        <div style={{ display: 'flex', overflowX: 'auto', gap: '0.35rem', justifyContent: 'center', marginBottom: '2.5rem', padding: '0.4rem', background: 'rgba(15,23,42,0.8)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '1.25rem', maxWidth: 'max-content', margin: '0 auto 2.5rem auto' }} className="mask-edges">
          {[
            { id: 'how', icon: <Zap size={16} />, label: 'How It Works' },
            { id: 'rules', icon: <ScrollText size={16} />, label: 'Rules' },
            { id: 'judging', icon: <Scale size={16} />, label: 'Judging Criteria' },
            { id: 'prizes', icon: <Trophy size={16} />, label: 'Prizes' },
            { id: 'faq', icon: <HelpCircle size={16} />, label: 'FAQs' }
          ].map((tab) => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)} 
              style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.65rem 1.25rem', borderRadius: '0.875rem', fontWeight: 600, fontSize: '0.875rem', transition: 'all 0.3s ease', flexShrink: 0, border: 'none', cursor: 'pointer',
                background: activeTab === tab.id ? 'var(--tuk-gold)' : 'transparent',
                color: activeTab === tab.id ? '#060d1f' : 'rgba(255,255,255,0.7)'
              }}
              onMouseEnter={e => {
                if (activeTab !== tab.id) e.currentTarget.style.color = '#fff';
              }}
              onMouseLeave={e => {
                if (activeTab !== tab.id) e.currentTarget.style.color = 'rgba(255,255,255,0.7)';
              }}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Unified Tab Container Panel */}
        <div className="unified-card" style={{ padding: '2.5rem', borderColor: 'rgba(30,41,59,0.8)', minHeight: '400px' }}>
          {activeTab === 'how' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <div className="mb-8">
                <span className="section-eyebrow" style={{ color: '#4ade80' }}>
                  <span style={{ background: '#4ade80', width: 6, height: 6, borderRadius: '50%', display: 'inline-block', marginRight: 6 }} />
                  Step-By-Step Journey
                </span>
                <h2 className="text-2xl font-bold text-white mb-2" style={{ margin: 0 }}>How It Works</h2>
                <p className="text-slate-400 text-sm">From registration to winning — here's your journey through the TUK Frontier Hackathon.</p>
              </div>

              <div className="flex flex-col gap-0" style={{ gap: 0 }}>
                {[
                  {
                    step: 1, icon: <Star size={20} />, color: '#fbbf24',
                    title: 'Register & Get Accepted',
                    desc: 'Sign up on this platform. Once your application is reviewed and accepted by the organizing team, your account will be activated and you\'ll gain access to the participant dashboard.'
                  },
                  {
                    step: 2, icon: <Users size={20} />, color: '#60a5fa',
                    title: 'Form or Join a Team',
                    desc: 'Head to the Team tab in your dashboard. You can create a new team and share the join code with your teammates, or enter a code from a friend to join their team. Solo participation is also allowed.'
                  },
                  {
                    step: 3, icon: <Zap size={20} />, color: '#4ade80',
                    title: 'Hack for 48 Hours',
                    desc: 'The hackathon kicks off at 9:00 AM on October 2nd. Build your project, attend mentor sessions, pitch your idea to sponsors, and refine your demo. All code must be written during the event.'
                  },
                  {
                    step: 4, icon: <Upload size={20} />, color: '#c084fc',
                    title: 'Submit Your Project',
                    desc: 'Before the deadline, submit your project from the Dashboard tab. You\'ll need a project title, abstract, and a GitHub repository link. A demo video and pitch deck (PDF) are strongly recommended.'
                  },
                  {
                    step: 5, icon: <Scale size={20} />, color: '#f87171',
                    title: 'Get Judged',
                    desc: 'Your submission is assigned to a panel of judges who score your project on Innovation, Technical Execution, and Local Impact (each out of 10). You can view your scores live in your dashboard once submitted.'
                  },
                  {
                    step: 6, icon: <Trophy size={20} />, color: '#fbbf24',
                    title: 'Prizes & Recognition',
                    desc: 'Top teams are announced at the Closing Ceremony on October 3rd. Winners receive cash prizes, incubation support, cloud credits, and more. All participants receive a certificate and hackathon swag.'
                  }
                ].map((item, idx, arr) => (
                  <div key={idx} style={{ display: 'flex', gap: '1.5rem', position: 'relative' }}>
                    {/* Connector line */}
                    {idx < arr.length - 1 && (
                      <div style={{ position: 'absolute', left: '1.5rem', top: '3rem', bottom: '-1rem', width: '2px', background: `linear-gradient(to bottom, ${item.color}40, transparent)`, zIndex: 0 }} />
                    )}

                    {/* Icon column */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0, flexShrink: 0, zIndex: 1 }}>
                      <div style={{ width: '3rem', height: '3rem', borderRadius: '50%', background: `${item.color}12`, border: `2px solid ${item.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: item.color, boxShadow: `0 0 16px ${item.color}25` }}>
                        {item.icon}
                      </div>
                    </div>

                    {/* Content */}
                    <div style={{ paddingBottom: idx < arr.length - 1 ? '2rem' : 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                        <span style={{ fontSize: '0.7rem', fontWeight: 800, color: item.color, textTransform: 'uppercase', letterSpacing: '0.1em', background: `${item.color}15`, padding: '0.15rem 0.5rem', borderRadius: '999px', border: `1px solid ${item.color}25` }}>Step {item.step}</span>
                      </div>
                      <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff', margin: '0 0 0.35rem 0' }}>{item.title}</h4>
                      <p style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)', margin: 0, lineHeight: 1.6 }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick tip footer */}
              <div style={{ marginTop: '2.5rem', padding: '1.25rem 1.5rem', borderRadius: '1rem', background: 'rgba(251,191,36,0.06)', border: '1px solid rgba(251,191,36,0.2)', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <CheckCircle size={20} color="var(--tuk-gold)" style={{ flexShrink: 0, marginTop: '0.1rem' }} />
                <div>
                  <p style={{ margin: 0, fontWeight: 700, color: '#fff', fontSize: '0.9rem' }}>Pro tip</p>
                  <p style={{ margin: '0.25rem 0 0 0', color: 'var(--muted-foreground)', fontSize: '0.85rem', lineHeight: 1.55 }}>Save your project as a draft early so your teammates can see your progress in real time. You can update it as many times as you want before hitting Final Submit!</p>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'rules' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <div className="mb-8">
                <span className="section-eyebrow" style={{ color: '#ef4444' }}>
                  <span style={{ background: '#ef4444', width: 6, height: 6, borderRadius: '50%', display: 'inline-block', marginRight: 6 }} />
                  Code of Conduct
                </span>
                <h2 className="text-2xl font-bold text-white mb-2" style={{ margin: 0 }}>Summit Rules & Regulations</h2>
              </div>

              {loading ? (
                <p className="text-slate-500 text-sm">Loading rules...</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {rules.map((rule, i) => (
                    <div key={i} className="flex gap-4 p-5 rounded-2xl bg-slate-950/40 border border-slate-800/80 transition-colors hover:border-slate-800" style={{ display: 'flex', gap: '1rem' }}>
                      <div style={{ width: '2rem', height: '2rem', borderRadius: '50%', background: 'rgba(251, 191, 36, 0.08)', color: 'var(--tuk-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: 800, fontSize: '0.875rem', border: '1px solid rgba(251, 191, 36, 0.2)' }}>
                        {i + 1}
                      </div>
                      <div style={{ color: 'var(--muted-foreground)', lineHeight: '1.6', fontSize: '0.9rem' }}>
                        {rule.includes(':') ? (
                          <>
                            <strong style={{ color: '#fff', display: 'block', marginBottom: '0.25rem', fontSize: '1rem' }}>{rule.split(':')[0]}:</strong>
                            <span>{rule.substring(rule.indexOf(':') + 1)}</span>
                          </>
                        ) : (
                          <span>{rule}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'judging' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <div className="mb-8">
                <span className="section-eyebrow" style={{ color: '#60a5fa' }}>
                  <span style={{ background: '#60a5fa', width: 6, height: 6, borderRadius: '50%', display: 'inline-block', marginRight: 6 }} />
                  Evaluation Metrics
                </span>
                <h2 className="text-2xl font-bold text-white mb-2" style={{ margin: 0 }}>Judging Criteria</h2>
                <p className="text-slate-400 text-sm">Projects will be evaluated across the following four core dimensions:</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { title: 'Innovation', weight: '25%', desc: 'How unique is the solution? Does it solve the problem in a novel or creative way?' },
                  { title: 'Technical Complexity', weight: '25%', desc: 'Is the code robust? Did the team tackle a genuinely difficult technical challenge?' },
                  { title: 'Design & UX', weight: '25%', desc: 'Is the application intuitive and aesthetically pleasing for end-users?' },
                  { title: 'Business Viability', weight: '25%', desc: 'Does this product have a real market in Kenya? Is the scaling model sound?' }
                ].map((crit, i) => (
                  <div key={i} className="p-5 rounded-2xl bg-slate-950/40 border border-slate-800/80 hover:border-slate-800 transition-colors">
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem' }}>
                      {crit.title} <span style={{ color: 'var(--tuk-gold)' }}>({crit.weight})</span>
                    </h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--muted-foreground)', margin: 0, lineHeight: 1.5 }}>{crit.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'prizes' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <div className="mb-8">
                <span className="section-eyebrow" style={{ color: '#fbbf24' }}>
                  <span style={{ background: '#fbbf24', width: 6, height: 6, borderRadius: '50%', display: 'inline-block', marginRight: 6 }} />
                  Summit Awards
                </span>
                <h2 className="text-2xl font-bold text-white mb-2" style={{ margin: 0 }}>Prizes & Incubation</h2>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {prizes.map((prize, i) => (
                  prize.highlight ? (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '2rem', borderRadius: '1.25rem', border: '1px solid rgba(234, 179, 8, 0.3)', background: 'linear-gradient(135deg, rgba(234, 179, 8, 0.08) 0%, rgba(234, 179, 8, 0.02) 100%)' }} className="flex-col md:flex-row text-center md:text-left">
                      <Trophy size={48} color="var(--tuk-gold)" style={{ flexShrink: 0 }} />
                      <div>
                        <h3 style={{ margin: 0, fontSize: '1.35rem', fontWeight: 800, color: 'var(--tuk-gold)' }}>{prize.label}</h3>
                        <p style={{ margin: '0.35rem 0 0 0', color: '#fff', fontWeight: 600, fontSize: '1rem' }}>{prize.description}</p>
                      </div>
                    </div>
                  ) : (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1.5rem', borderRadius: '1.25rem', border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(10,18,38,0.4)' }} className="flex-col md:flex-row text-center md:text-left">
                      <div style={{ fontSize: '2rem', fontWeight: 800, color: i === 1 ? '#94a3b8' : '#b45309', minWidth: '48px', textAlign: 'center' }}>{prize.rank}</div>
                      <div>
                        <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700, color: '#fff' }}>{prize.label}</h3>
                        <p style={{ margin: '0.2rem 0 0 0', color: 'var(--muted-foreground)', fontSize: '0.875rem' }}>{prize.description}</p>
                      </div>
                    </div>
                  )
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'faq' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <div className="mb-8">
                <span className="section-eyebrow" style={{ color: '#a78bfa' }}>
                  <span style={{ background: '#a78bfa', width: 6, height: 6, borderRadius: '50%', display: 'inline-block', marginRight: 6 }} />
                  Knowledge Base
                </span>
                <h2 className="text-2xl font-bold text-white mb-2" style={{ margin: 0 }}>Frequently Asked Questions</h2>
              </div>

              {loading ? (
                <p className="text-slate-500 text-sm">Loading FAQs...</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {faqs.map((faq, i) => (
                    <div key={i} className="p-5 rounded-2xl bg-slate-950/40 border border-slate-800/80 transition-colors">
                      <h4 style={{ marginBottom: '0.5rem', fontSize: '1rem', fontWeight: 700, color: '#fff' }}>{faq.q}</h4>
                      <p style={{ margin: 0, color: 'var(--muted-foreground)', lineHeight: 1.6, fontSize: '0.875rem' }}>{faq.a}</p>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </div>
      </section>

      {/* ── Bottom CTA ─────────────────────────────────── */}
      <section className="page-section page-section-border text-center" style={{ background: 'rgba(15,23,42,0.5)' }}>
        <div className="container" style={{ maxWidth: '700px', margin: '0 auto' }}>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
            <span className="section-eyebrow" style={{ justifyContent: 'center' }}>Ready to Hacks?</span>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
              Secure Your <span className="text-gradient">Participation</span>
            </h2>
            <p className="text-slate-400 mb-8 text-sm leading-relaxed">
              Form a team or sign up as a solo developer to receive access to workshops, hardware kits, mentoring, and meals.
            </p>
            <a href="/register" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-black transition-all hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(245,158,11,0.4)]" style={{ background: 'linear-gradient(135deg,#fbbf24,#f59e0b)', textDecoration: 'none', fontSize: '1rem' }}>
              Register For The Hackathon <ArrowRight size={18} />
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
