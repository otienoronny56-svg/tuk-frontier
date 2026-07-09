import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { motion } from 'framer-motion';
import { Mail, Phone, Building, CheckCircle2 } from 'lucide-react';

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
      if (contentData?.value && contentData.value.length > 0) {
        setSponsorTiers(contentData.value);
      } else {
        setSponsorTiers([
          { id: 'silver', name: 'Silver Sponsor', price: 'KSh 130,000', color: '#C0C0C0', recommended: false, perks: ['Logo on website', 'Social media shoutout', 'Distribute swag', 'Resume book access (post-event)'] },
          { id: 'gold', name: 'Gold Sponsor', price: 'KSh 325,000', color: '#FFD700', recommended: true, perks: ['Host a Challenge Track', 'Provide an API/Platform demo', 'Judge a category', 'All Silver benefits'] },
          { id: 'platinum', name: 'Platinum Sponsor', price: 'KSh 650,000', color: '#e5e4e2', recommended: false, perks: ['Co-branded event marketing', 'Keynote speaking slot', 'VIP Lounge access', 'All Gold benefits'] },
        ]);
      }
    };
    fetchData();
  }, []);

  const handleInquire = (tier: string) => {
    setSelectedTier(tier);
    setFormOpen(true);
    setSuccess(false);
    // Scroll to form
    setTimeout(() => document.getElementById('inquiry-form')?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.from('tuk_hackathon_sponsor_inquiries').insert([{
      ...formData,
      tier: selectedTier
    }]);

    if (error) {
      alert("Error submitting inquiry: " + error.message);
    } else {
      setSuccess(true);
      setFormData({ company_name: '', contact_name: '', email: '', message: '' });
    }
    setLoading(false);
  };

  return (
    <div className="container pt-8 pb-16">
      {sponsors.length > 0 && (
        <div className="mb-24">
          <div className="text-center mb-12">
            <h1 className="text-gradient">Our Sponsors</h1>
            <p className="text-muted-foreground mt-4">Thank you to the incredible organizations making this hackathon possible.</p>
          </div>
          
          <div className="flex flex-col gap-12 items-center">
            {['Platinum', 'Gold', 'Silver', 'Custom'].map(tier => {
              const tierSponsors = sponsors.filter(s => s.tier === tier);
              if (tierSponsors.length === 0) return null;
              
              // Scale size based on tier
              const cardDims = tier === 'Platinum' 
                ? { width: '240px', height: '110px' } 
                : tier === 'Gold' 
                  ? { width: '200px', height: '95px' } 
                  : { width: '160px', height: '80px' };
              
              return (
                <div key={tier} className="w-full max-w-4xl">
                  <h3 className="text-center text-xl font-bold mb-6 text-tuk-gold opacity-80">{tier} Sponsors</h3>
                  <div className="flex flex-wrap justify-center gap-8">
                    {tierSponsors.map(sponsor => (
                      <motion.a 
                        key={sponsor.id} 
                        href={sponsor.website_url || '#'} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="glass flex flex-col items-center justify-center transition-transform hover:scale-105"
                        style={{ 
                          borderRadius: '1rem', 
                          textDecoration: 'none', 
                          background: 'var(--muted, rgba(128,128,128,0.05))', 
                          border: '1px solid var(--border)',
                          padding: '1rem',
                          display: 'flex',
                          alignItems: 'center',
                          justify: 'center',
                          ...cardDims
                        }}
                        whileHover={{ y: -5 }}
                      >
                        {sponsor.logo_url ? (
                          <img 
                            src={sponsor.logo_url} 
                            alt={sponsor.name} 
                            style={{ maxWidth: '85%', maxHeight: '75%', objectFit: 'contain' }} 
                          />
                        ) : (
                          <div className="flex flex-col items-center">
                            <Building size={24} className="text-muted-foreground mb-1" />
                            <span className="font-bold text-center text-xs text-slate-300" style={{ fontSize: '0.75rem' }}>{sponsor.name}</span>
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
      )}

      <div className="text-center mb-12">
        <h1 className="text-gradient">Partner With Us</h1>
        <p style={{ maxWidth: '600px', margin: '1rem auto' }}>
          Connect with the brightest emerging talent in technology. Sponsor the TUK Frontier Hackathon and position your brand at the forefront of innovation.
        </p>
      </div>

      <div className="sponsor-grid grid gap-8 mb-16" style={{ gridTemplateColumns: `repeat(${sponsorTiers.length}, 1fr)` }}>
        {sponsorTiers.map((tier: any, i: number) => (
          <motion.div
            key={tier.id || i}
            className="glass-card flex flex-col"
            style={{
              borderColor: tier.color,
              ...(tier.recommended ? { transform: 'scale(1.05)', zIndex: 10 } : {})
            }}
            whileHover={{ y: -5 }}
          >
            {tier.recommended && (
              <div style={{ background: 'var(--tuk-gold)', color: '#000', fontSize: '0.75rem', fontWeight: 700, padding: '0.25rem 0.75rem', borderRadius: '1rem', alignSelf: 'flex-start', marginBottom: '1rem' }}>RECOMMENDED</div>
            )}
            <h3 style={{ color: tier.color }}>{tier.name}</h3>
            <div style={{ fontSize: '2.5rem', fontWeight: 700, margin: '1rem 0', color: 'var(--foreground)' }}>{tier.price}</div>
            <ul className="flex flex-col gap-2 mb-8" style={{ color: 'var(--muted-foreground)', paddingLeft: '1.1rem' }}>
              {(tier.perks || []).map((perk: string, pi: number) => (
                <li key={pi}>{perk}</li>
              ))}
            </ul>
            <button
              className={tier.recommended ? 'btn btn-primary mt-auto w-full' : 'btn btn-outline mt-auto w-full'}
              onClick={() => handleInquire(tier.name)}
            >Inquire</button>
          </motion.div>
        ))}
      </div>

      {/* Inquiry Form */}
      {formOpen && (
        <motion.div id="inquiry-form" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card max-w-2xl mx-auto mb-16">
          <div className="flex justify-between items-center mb-6 border-b border-glass-border pb-4">
            <h2 style={{ margin: 0 }}>Sponsorship Inquiry</h2>
            <button className="btn btn-outline" onClick={() => setFormOpen(false)} style={{ padding: '0.25rem 0.5rem' }}>Close</button>
          </div>
          
          {success ? (
            <div className="text-center py-8 text-green-500">
              <CheckCircle2 size={48} className="mx-auto mb-4" />
              <h3 style={{ color: 'var(--foreground)' }}>Inquiry Submitted!</h3>
              <p className="text-muted-foreground">Our team will be in touch with you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex items-center gap-4 p-4 mb-4" style={{ background: 'rgba(255,215,0,0.1)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--tuk-gold)' }}>
                <span>Selected Tier:</span>
                <strong style={{ color: 'var(--tuk-gold)' }}>{selectedTier}</strong>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="form-group mb-0">
                  <label className="form-label">Company Name *</label>
                  <input type="text" className="form-input" required value={formData.company_name} onChange={e => setFormData({...formData, company_name: e.target.value})} />
                </div>
                <div className="form-group mb-0">
                  <label className="form-label">Contact Person *</label>
                  <input type="text" className="form-input" required value={formData.contact_name} onChange={e => setFormData({...formData, contact_name: e.target.value})} />
                </div>
              </div>
              
              <div className="form-group mb-0">
                <label className="form-label">Email Address *</label>
                <input type="email" className="form-input" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
              </div>
              
              <div className="form-group mb-0">
                <label className="form-label">Additional Message</label>
                <textarea className="form-input" rows={4} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} placeholder="Tell us a bit about why you'd like to sponsor..."></textarea>
              </div>
              
              <div className="mt-4 text-right">
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? 'Submitting...' : 'Submit Inquiry'}
                </button>
              </div>
            </form>
          )}
        </motion.div>
      )}

      {/* Contact Section */}
      <div className="glass-card max-w-2xl mx-auto text-center">
        <h2>Let's Talk</h2>
        <p>Ready to sponsor or have a custom partnership in mind? Reach out to our organizing team directly.</p>
        <button className="btn btn-outline mt-4" onClick={() => handleInquire('Custom')}>Submit Custom Inquiry</button>
        
        <div className="flex flex-col md:flex-row justify-center gap-8 mt-8 pt-8 border-t border-glass-border">
          <div className="flex items-center gap-3">
            <Mail color="var(--tuk-gold)" />
            <span>sponsor@tukfrontier.com</span>
          </div>
          <a href="tel:+254791021846" className="flex items-center gap-3 hover:text-tuk-gold transition-colors" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Phone color="var(--tuk-gold)" />
            <span>+254 791 021 846</span>
          </a>
          <div className="flex items-center gap-3">
            <Building color="var(--tuk-gold)" />
            <span>Nairobi, Kenya</span>
          </div>
        </div>
      </div>
    </div>
  );
}
