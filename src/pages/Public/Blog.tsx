import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

const CATEGORY_COLORS: Record<string, string> = {
  Innovation: '#4ade80', Guides: '#60a5fa', Business: '#fbbf24', Tech: '#c084fc', default: '#60a5fa',
};

const defaultBlogPosts = [
  { id: 1, title: "Co-Building the Future: Why Hackathons are the Digital Lifeblood of Tech Hubs", excerpt: "Exploring how hands-on student competitions are bridging the gap between classroom theory and industry-grade engineering.", date: "March 15, 2024", author: "Ronny Winstone", category: "Innovation", views: "1,248 reads", image_url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80" },
  { id: 2, title: "5 Pro-Tips to Maximize Your Hackathon Project's Score", excerpt: "Simple yet highly effective steps to ensure your project demo stands out, impresses judges, and matches criteria.", date: "March 10, 2024", author: "Sarah Wanjiku", category: "Guides", views: "842 reads", image_url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&q=80" },
  { id: 3, title: "Empowering Student Founders: The Venture Capital Advantage", excerpt: "How TUK Frontier Hackathon is helping student startups scale beyond the competition with seed funding.", date: "March 5, 2024", author: "Marcus Otieno", category: "Business", views: "521 reads", image_url: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=600&q=80" },
];

export default function Blog() {
  const [blogPosts, setBlogPosts] = useState<any[]>(defaultBlogPosts);

  useEffect(() => {
    supabase.from('tuk_hackathon_blogs').select('*').order('created_at', { ascending: false }).then(({ data, error }) => {
      if (!error && data && data.length > 0) {
        setBlogPosts(data.map(b => ({ ...b, date: new Date(b.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) })));
      }
    });
  }, []);

  return (
    <div style={{ background: 'linear-gradient(180deg,#020617 0%,#050c1a 100%)', minHeight: '100vh' }}>
      {/* Hero */}
      <section style={{ position: 'relative', padding: '7rem 0 5rem', textAlign: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-80px', left: '50%', transform: 'translateX(-50%)', width: '600px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle,rgba(96,165,250,0.1) 0%,transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 1px 1px,rgba(255,255,255,0.03) 1px,transparent 0)', backgroundSize: '40px 40px', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 10, maxWidth: '700px', margin: '0 auto', padding: '0 1.5rem' }}>
          <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 1.1rem', borderRadius: '999px', background: 'rgba(96,165,250,0.08)', border: '1px solid rgba(96,165,250,0.25)', marginBottom: '1.75rem' }}>
            <BookOpen size={13} color="#60a5fa" />
            <span style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', color: '#60a5fa' }}>News & Insights</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            style={{ fontSize: 'clamp(2.5rem,6vw,4.5rem)', fontWeight: 900, letterSpacing: '-0.03em', color: '#fff', lineHeight: 1.1, margin: '0 0 1rem' }}>
            Blog & <span style={{ background: 'linear-gradient(135deg,#60a5fa,#a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Updates</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.75, margin: 0 }}>
            Stay up to date with the latest news, announcements, and resources from TUK Frontier.
          </motion.p>
        </div>
      </section>

      {/* Blog Grid */}
      <section style={{ padding: '0 0 6rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.5rem' }} className="blog-grid-resp">
            {blogPosts.map((post, index) => {
              const color = CATEGORY_COLORS[post.category] || CATEGORY_COLORS.default;
              return (
                <motion.div key={post.id}
                  initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -6 }}
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1.5rem', overflow: 'hidden', display: 'flex', flexDirection: 'column', backdropFilter: 'blur(12px)', transition: 'box-shadow 0.3s', boxShadow: '0 0 0 transparent' }}
                  onMouseEnter={(e: any) => (e.currentTarget.style.boxShadow = `0 0 40px ${color}18`)}
                  onMouseLeave={(e: any) => (e.currentTarget.style.boxShadow = '0 0 0 transparent')}
                >
                  <div style={{ position: 'relative', height: '200px', overflow: 'hidden', flexShrink: 0 }}>
                    <img src={post.image_url} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                      onMouseOver={e => (e.currentTarget.style.transform = 'scale(1.06)')}
                      onMouseOut={e => (e.currentTarget.style.transform = 'scale(1)')} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(2,6,23,0.6),transparent)' }} />
                    <span style={{ position: 'absolute', top: '1rem', left: '1rem', padding: '0.3rem 0.8rem', borderRadius: '999px', fontSize: '0.7rem', fontWeight: 700, color, background: `${color}15`, border: `1px solid ${color}30` }}>
                      {post.category}
                    </span>
                  </div>
                  <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1, gap: '0.75rem' }}>
                    <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.3)', fontWeight: 500 }}>
                      {post.date} · {post.author} · {post.views}
                    </div>
                    <Link to={`/blog/${post.id}`} style={{ textDecoration: 'none' }}>
                      <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#fff', lineHeight: 1.35, margin: 0, transition: 'color 0.2s' }}
                        onMouseEnter={e => (e.currentTarget.style.color = '#fbbf24')}
                        onMouseLeave={e => (e.currentTarget.style.color = '#fff')}
                      >{post.title}</h3>
                    </Link>
                    <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.65, margin: 0, flex: 1 }}>{post.excerpt}</p>
                    <Link to={`/blog/${post.id}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', fontWeight: 700, color: '#fbbf24', textDecoration: 'none', marginTop: '0.5rem', transition: 'opacity 0.2s' }}
                      onMouseEnter={e => (e.currentTarget.style.opacity = '0.75')}
                      onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                    >Read Article <ArrowRight size={14} /></Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
      <style>{`@media (max-width: 768px) { .blog-grid-resp { grid-template-columns: 1fr !important; } } @media (min-width: 769px) and (max-width: 1024px) { .blog-grid-resp { grid-template-columns: repeat(2,1fr) !important; } }`}</style>
    </div>
  );
}
