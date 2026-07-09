import { motion } from 'framer-motion';
import { HelpCircle, ScrollText, Trophy, Scale, Zap, Users, Upload, Star, CheckCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

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
          // Merge DB FAQs with default FAQs, keeping DB ones first
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
    <div className="container pt-8 pb-16">
      <div className="text-center mb-12">
        <h1 className="text-gradient" style={{ fontSize: '3rem', fontWeight: 800 }}>Hacker Guide</h1>
        <p style={{ maxWidth: '600px', margin: '1rem auto', color: 'var(--muted-foreground)' }}>
          Everything you need to know about the TUK Frontier Hackathon. Read the rules, understand the judging criteria, and check out the prizes.
        </p>
      </div>

      {/* Sleek Segmented Control for Tabs */}
      <div style={{ display: 'flex', overflowX: 'auto', gap: '0.5rem', justifyContent: 'center', marginBottom: '3rem', padding: '0.5rem', background: 'var(--muted, rgba(128,128,128,0.1))', borderRadius: '1rem', maxWidth: 'max-content', margin: '0 auto 3rem auto' }}>
        {[
          { id: 'how', icon: <Zap size={18} />, label: 'How It Works' },
          { id: 'rules', icon: <ScrollText size={18} />, label: 'Rules' },
          { id: 'judging', icon: <Scale size={18} />, label: 'Judging Criteria' },
          { id: 'prizes', icon: <Trophy size={18} />, label: 'Prizes' },
          { id: 'faq', icon: <HelpCircle size={18} />, label: 'FAQs' }
        ].map((tab) => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)} 
            style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', borderRadius: '0.75rem', fontWeight: 600, transition: 'all 0.3s ease', flexShrink: 0, border: 'none', cursor: 'pointer',
              background: activeTab === tab.id ? 'var(--tuk-gold)' : 'transparent',
              color: activeTab === tab.id ? '#0f172a' : 'var(--foreground)'
            }}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      <div style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: '1.5rem', padding: '2.5rem', maxWidth: '56rem', margin: '0 auto', boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1)', backdropFilter: 'blur(16px)' }}>
        {activeTab === 'how' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--foreground)' }}>How It Works</h2>
            <p style={{ color: 'var(--muted-foreground)', marginBottom: '2.5rem' }}>From registration to winning — here's your step-by-step journey through the TUK Frontier Hackathon.</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {[
                {
                  step: 1, icon: <Star size={22} />, color: '#f59e0b',
                  title: 'Register & Get Accepted',
                  desc: 'Sign up on this platform. Once your application is reviewed and accepted by the admin team, your account will be activated and you\'ll gain access to the participant dashboard.'
                },
                {
                  step: 2, icon: <Users size={22} />, color: '#4ade80',
                  title: 'Form or Join a Team',
                  desc: 'Head to the Team tab in your dashboard. You can create a new team and share the join code with your teammates, or enter a code from a friend to join their team. Solo participation is also allowed.'
                },
                {
                  step: 3, icon: <Zap size={22} />, color: '#60a5fa',
                  title: 'Hack for 48 Hours',
                  desc: 'The hackathon kicks off at 9:00 AM on October 2nd. Build your project, attend mentor sessions, pitch your idea to sponsors, and refine your demo. All code must be written during the event.'
                },
                {
                  step: 4, icon: <Upload size={22} />, color: '#a78bfa',
                  title: 'Submit Your Project',
                  desc: 'Before the deadline, submit your project from the Dashboard tab. You\'ll need a project title, abstract, and a GitHub repository link. A demo video and pitch deck (PDF) are strongly recommended.'
                },
                {
                  step: 5, icon: <Scale size={22} />, color: '#f87171',
                  title: 'Get Judged',
                  desc: 'Your submission is assigned to a panel of judges who score your project on Innovation, Technical Execution, and Local Impact (each out of 10). You can view your scores live in your dashboard once submitted.'
                },
                {
                  step: 6, icon: <Trophy size={22} />, color: '#fbbf24',
                  title: 'Prizes & Recognition',
                  desc: 'Top teams are announced at the Closing Ceremony on October 3rd. Winners receive cash prizes, incubation support, cloud credits, and more. All participants receive a certificate and hackathon swag.'
                }
              ].map((item, idx, arr) => (
                <div key={idx} style={{ display: 'flex', gap: '1.5rem', position: 'relative' }}>
                  {/* Connector line */}
                  {idx < arr.length - 1 && (
                    <div style={{ position: 'absolute', left: '1.5rem', top: '3.5rem', bottom: '-1rem', width: '2px', background: `linear-gradient(to bottom, ${item.color}66, transparent)`, zIndex: 0 }} />
                  )}

                  {/* Icon column */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0, flexShrink: 0, zIndex: 1 }}>
                    <div style={{ width: '3rem', height: '3rem', borderRadius: '50%', background: `${item.color}18`, border: `2px solid ${item.color}55`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: item.color, boxShadow: `0 0 16px ${item.color}33` }}>
                      {item.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <div style={{ paddingBottom: idx < arr.length - 1 ? '2rem' : 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                      <span style={{ fontSize: '0.7rem', fontWeight: 800, color: item.color, textTransform: 'uppercase', letterSpacing: '0.1em', background: `${item.color}18`, padding: '0.15rem 0.5rem', borderRadius: '999px', border: `1px solid ${item.color}33` }}>Step {item.step}</span>
                    </div>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--foreground)', margin: '0 0 0.4rem 0' }}>{item.title}</h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--muted-foreground)', margin: 0, lineHeight: 1.65 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick tip footer */}
            <div style={{ marginTop: '2.5rem', padding: '1.25rem 1.5rem', borderRadius: '1rem', background: 'rgba(234,179,8,0.07)', border: '1px solid rgba(234,179,8,0.2)', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <CheckCircle size={20} color="var(--tuk-gold)" style={{ flexShrink: 0, marginTop: '0.1rem' }} />
              <div>
                <p style={{ margin: 0, fontWeight: 700, color: 'var(--foreground)', fontSize: '0.95rem' }}>Pro tip</p>
                <p style={{ margin: '0.25rem 0 0 0', color: 'var(--muted-foreground)', fontSize: '0.875rem', lineHeight: 1.6 }}>Save your project as a draft early so your teammates can see your progress in real time. You can update it as many times as you want before hitting Final Submit!</p>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'rules' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '2rem', color: 'var(--foreground)' }}>Code of Conduct & Rules</h2>
            {loading ? <p>Loading rules...</p> : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {rules.map((rule, i) => (
                  <div key={i} style={{ display: 'flex', gap: '1rem', padding: '1.25rem', background: 'var(--muted)', borderRadius: '1rem', border: '1px solid var(--glass-border)' }}>
                    <div style={{ width: '2rem', height: '2rem', borderRadius: '50%', background: 'rgba(234, 179, 8, 0.15)', color: 'var(--tuk-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: 800, border: '1px solid rgba(234, 179, 8, 0.3)' }}>
                      {i + 1}
                    </div>
                    <div style={{ color: 'var(--muted-foreground)', lineHeight: '1.6', fontWeight: 500 }}>
                      {rule.includes(':') ? (
                        <>
                          <strong style={{ color: 'var(--foreground)', display: 'block', marginBottom: '0.25rem', fontSize: '1.1rem' }}>{rule.split(':')[0]}:</strong>
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
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--foreground)' }}>Judging Criteria</h2>
            <p style={{ color: 'var(--muted-foreground)', marginBottom: '2rem' }}>Projects will be evaluated on a scale of 1-5 across the following dimensions:</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
              {[
                { title: 'Innovation', weight: '25%', desc: 'How unique is the solution? Does it solve the problem in a novel way?' },
                { title: 'Technical Complexity', weight: '25%', desc: 'Is the code robust? Did the team tackle a difficult technical challenge?' },
                { title: 'Design & UX', weight: '25%', desc: 'Is the application intuitive and aesthetically pleasing?' },
                { title: 'Business Viability', weight: '25%', desc: 'Does this product have a real market? Is the business model sound?' }
              ].map((crit, i) => (
                <div key={i} style={{ padding: '1.5rem', background: 'var(--muted)', borderRadius: '1rem', border: '1px solid var(--glass-border)' }}>
                  <h4 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--foreground)', marginBottom: '0.5rem' }}>
                    {crit.title} <span style={{ color: 'var(--tuk-gold)' }}>({crit.weight})</span>
                  </h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--muted-foreground)', margin: 0, lineHeight: 1.5 }}>{crit.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'prizes' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '2rem', color: 'var(--foreground)' }}>Prize Pool</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {prizes.map((prize, i) => (
                prize.highlight ? (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '2rem', borderRadius: '1rem', border: '1px solid rgba(234, 179, 8, 0.4)', background: 'linear-gradient(135deg, rgba(234, 179, 8, 0.15) 0%, rgba(234, 179, 8, 0.05) 100%)' }}>
                    <Trophy size={56} color="var(--tuk-gold)" />
                    <div>
                      <h3 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 800, color: 'var(--tuk-gold)' }}>{prize.label}</h3>
                      <p style={{ margin: '0.5rem 0 0 0', color: 'var(--foreground)', fontWeight: 600, fontSize: '1.1rem' }}>{prize.description}</p>
                    </div>
                  </div>
                ) : (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1.5rem', borderRadius: '1rem', border: '1px solid var(--glass-border)', background: 'var(--muted)' }}>
                    <div style={{ fontSize: '2.5rem', fontWeight: 800, color: i === 1 ? '#94a3b8' : '#b45309', minWidth: '56px', textAlign: 'center' }}>{prize.rank}</div>
                    <div>
                      <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700, color: 'var(--foreground)' }}>{prize.label}</h3>
                      <p style={{ margin: '0.25rem 0 0 0', color: 'var(--muted-foreground)', fontWeight: 500 }}>{prize.description}</p>
                    </div>
                  </div>
                )
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'faq' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '2rem', color: 'var(--foreground)' }}>Frequently Asked Questions</h2>
            {loading ? <p>Loading FAQs...</p> : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {faqs.map((faq, i) => (
                  <div key={i} style={{ padding: '1.5rem', background: 'var(--muted)', borderRadius: '1rem', border: '1px solid var(--glass-border)' }}>
                    <h4 style={{ marginBottom: '0.5rem', fontSize: '1.1rem', fontWeight: 700, color: 'var(--foreground)' }}>{faq.q}</h4>
                    <p style={{ margin: 0, color: 'var(--muted-foreground)', lineHeight: 1.6 }}>{faq.a}</p>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
