import { useParams, Link } from 'react-router-dom';
import { Calendar, User, Eye, ArrowLeft, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

const blogPostsData: Record<number, {
  id: number;
  title: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  views: string;
  image_url: string;
  summary: string;
  content: string;
  excerpt: string;
}> = {
  1: {
    id: 1,
    title: "Co-Building the Future: Why Hackathons are the Digital Lifeblood of Tech Hubs",
    author: "Ronny Winstone",
    date: "March 15, 2024",
    readTime: "5 min read",
    category: "Innovation",
    views: "1,248 reads",
    image_url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
    summary: "Exploring how hands-on student competitions are bridging the gap between classroom theory and industry-grade engineering.",
    excerpt: "Exploring how hands-on student competitions are bridging the gap between classroom theory and industry-grade engineering.",
    content: `
      <p>For years, classical classroom learning was the main source of student training. Today, the rise of student hackathons is bridging the gap, connecting passionate programmers, designers, and innovators directly with real-world developer tools and sponsor mentorship.</p>
      <h3>Why Hackathons Matter</h3>
      <p>An intense, focused build phase isn't just about winning cash prizes; it's about developing real engineering skills under tight deadlines. Working with modern APIs, deploying live databases, and pitching to venture capitalists gives hackers industry-grade experience.</p>
      <p>By bringing these competitive formats directly to university departments, we are accelerating tech adoption, promoting peer-to-peer mentoring, and giving student builders the tools to turn code into real-world applications.</p>
    `
  },
  2: {
    id: 2,
    title: "5 Pro-Tips to Maximize Your Hackathon Project's Score",
    author: "Sarah Wanjiku",
    date: "March 10, 2024",
    readTime: "4 min read",
    category: "Guides",
    views: "842 reads",
    image_url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80",
    summary: "Simple yet highly effective steps to ensure your project demo stands out, impresses judges, and matches criteria.",
    excerpt: "Simple yet highly effective steps to ensure your project demo stands out, impresses judges, and matches criteria.",
    content: `
      <p>Are you struggling to scope your MVP under the 48-hour deadline? Many teams fail because they spend too much time building complex logic instead of securing a flawless user flow. We recommend focusing on a single killer feature, mocking secondary API responses, and reserving the final 4 hours exclusively for presentation practice.</p>
      <p>At TUK Frontier, our goal is to empower student developers to ship stable, viable, and impactful solutions. Scoping correctly ensures your team presents a working, polished project that judges can immediately appreciate.</p>
      <p>Remember: a working prototype with a clear value proposition always beats a massive unfinished architecture with no functional UI.</p>
    `
  },
  3: {
    id: 3,
    title: "Empowering Student Founders: The Venture Capital Advantage",
    author: "Marcus Otieno",
    date: "March 5, 2024",
    readTime: "6 min read",
    category: "Business",
    views: "521 reads",
    image_url: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1200&q=80",
    summary: "How TUK Frontier Hackathon is helping student startups scale beyond the competition with seed funding.",
    excerpt: "How TUK Frontier Hackathon is helping student startups scale beyond the competition with seed funding.",
    content: `
      <h3>Demos vs. Scalable Business Models</h3>
      <p>Building a working app is just the beginning. Judges and sponsors evaluate how your solution fits the local market. With the right business model and target audience identification, your hackathon prototype can turn into a venture-backed student startup.</p>
      <h3>Sustaining Student Tech Ecosystems</h3>
      <p>By connecting student innovators directly with incubator leads and VC networks, we are stimulating local job creation and helping student founders transition their projects into viable products.</p>
    `
  }
};

function convertPlainTextToHtml(text: string): string {
  if (!text) return '';
  const blocks = text.split(/\n\s*\n/);
  const htmlBlocks = blocks.map(block => {
    const trimmed = block.trim();
    if (!trimmed) return '';
    if (trimmed.startsWith('###')) {
      return `<h3>${trimmed.replace(/^###\s*/, '')}</h3>`;
    }
    if (trimmed.startsWith('##')) {
      return `<h3>${trimmed.replace(/^##\s*/, '')}</h3>`;
    }
    if (trimmed.startsWith('-') || trimmed.startsWith('*')) {
      const listItems = trimmed
        .split('\n')
        .map(line => {
          const cleanLine = line.replace(/^[-*]\s*/, '').trim();
          return `<li>${cleanLine}</li>`;
        })
        .join('');
      return `<ul>${listItems}</ul>`;
    }
    const withLineBreaks = trimmed.replace(/\n/g, '<br/>');
    return `<p>${withLineBreaks}</p>`;
  });
  return htmlBlocks.filter(b => b !== '').join('\n');
}

export default function BlogPostDetail() {
  const { id } = useParams<{ id: string }>();
  const postId = Number(id);

  const [post, setPost] = useState<any | null>(null);
  const [otherPosts, setOtherPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPostDetail() {
      setLoading(true);
      
      const { data: dbPost, error } = await supabase
        .from('tuk_hackathon_blogs')
        .select('*')
        .eq('id', postId)
        .single();
        
      let currentPost = null;
      if (!error && dbPost) {
        currentPost = {
          ...dbPost,
          date: new Date(dbPost.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        };
      } else {
        const fallback = blogPostsData[postId];
        if (fallback) {
          currentPost = { id: postId, ...fallback };
        }
      }
      setPost(currentPost);
      
      const { data: dbOthers } = await supabase
        .from('tuk_hackathon_blogs')
        .select('*')
        .neq('id', postId)
        .limit(2);
        
      if (dbOthers && dbOthers.length > 0) {
        const formattedOthers = dbOthers.map(p => ({
          ...p,
          date: new Date(p.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        }));
        setOtherPosts(formattedOthers);
      } else {
        const fallbackOthers = Object.values(blogPostsData)
          .filter(p => p.id !== postId)
          .map(p => ({ id: p.id, ...p }));
        setOtherPosts(fallbackOthers);
      }
      setLoading(false);
    }
    fetchPostDetail();
  }, [postId]);

  if (loading) {
    return (
      <div className="container pt-8 pb-16 text-center">
        <h2 style={{ marginBottom: '1.5rem' }}>Loading Article...</h2>
        <div style={{ width: '40px', height: '40px', border: '3px solid rgba(255,255,255,0.1)', borderTopColor: 'var(--tuk-gold)', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto' }}></div>
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container pt-8 pb-16 text-center">
        <h2 style={{ marginBottom: '1.5rem' }}>Article Not Found</h2>
        <p className="text-muted-foreground" style={{ marginBottom: '2rem' }}>The blog post you are looking for does not exist.</p>
        <Link to="/blog" className="btn btn-primary" style={{ textDecoration: 'none' }}>Back to Blog</Link>
      </div>
    );
  }

  const initials = post.author ? post.author.split(' ').map((n: string) => n[0]).join('') : 'U';

  return (
    <div style={{ position: 'relative' }}>
      {/* 1. Large Parallax Hero Banner */}
      <div 
        style={{ 
          position: 'relative', 
          width: '100%', 
          height: '420px', 
          backgroundImage: `url(${post.image_url})`, 
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'flex-end'
        }}
      >
        {/* Dark overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(15, 23, 42, 0.4), rgba(15, 23, 42, 0.9))' }}></div>

        <div className="container" style={{ position: 'relative', zIndex: 2, paddingBottom: '3rem' }}>
          <div className="flex flex-col gap-4 max-w-4xl">
            {/* Category */}
            <div>
              <span 
                style={{ 
                  border: '1px solid rgba(255,255,255,0.4)', 
                  padding: '0.35rem 1.25rem', 
                  borderRadius: '20px', 
                  color: 'white', 
                  textTransform: 'uppercase', 
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  letterSpacing: '1px',
                  background: 'rgba(15, 23, 42, 0.6)'
                }}
              >
                {post.category}
              </span>
            </div>

            {/* Title */}
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'white', lineHeight: '1.2', margin: 0, textShadow: '0 4px 12px rgba(0,0,0,0.5)' }}>
              {post.title}
            </h1>

            {/* Meta Row */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', alignItems: 'center', fontSize: '0.85rem', color: 'rgba(255,255,255,0.8)', marginTop: '0.5rem' }}>
              <span className="flex items-center gap-1.5">
                <Calendar size={14} color="var(--tuk-gold)" /> {post.date.toUpperCase()}
              </span>
              <span className="flex items-center gap-1.5">
                <User size={14} color="var(--tuk-gold)" /> BY {post.author.toUpperCase()}
              </span>
              <span className="flex items-center gap-1.5" style={{ color: 'var(--tuk-gold)', fontWeight: 700 }}>
                <Eye size={14} /> {post.views}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Content Layout */}
      <div className="container pt-12 pb-16">
        {/* Back Link */}
        <Link 
          to="/blog" 
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8"
          style={{ textDecoration: 'none', width: 'fit-content', transition: 'color 0.2s', fontSize: '0.9rem', fontWeight: 600 }}
        >
          <ArrowLeft size={16} /> BACK TO INSIGHTS
        </Link>

        <div className="detail-layout">
          {/* Left Column: Post Content */}
          <div className="detail-main">
            {/* Highlights Lead Quote Block */}
            <blockquote 
              style={{
                borderLeft: '4px solid var(--tuk-gold)',
                background: 'var(--muted, rgba(128,128,128,0.03))',
                padding: '1.5rem 2rem',
                borderRadius: '0 1rem 1rem 0',
                margin: '0 0 2rem 0',
                fontSize: '1.15rem',
                lineHeight: '1.6',
                fontStyle: 'italic',
                color: 'var(--foreground)'
              }}
            >
              {post.summary}
            </blockquote>

            {/* Content body */}
            <div 
              className="blog-content-body"
              dangerouslySetInnerHTML={{ 
                __html: post.content && (post.content.includes('<p>') || post.content.includes('<h3>') || post.content.includes('<ul>')) 
                  ? post.content 
                  : convertPlainTextToHtml(post.content) 
              }}
              style={{
                lineHeight: '1.8',
                fontSize: '1.05rem',
                color: 'var(--muted-foreground)'
              }}
            />

            {/* Author Biography Box */}
            <div 
              className="glass" 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '1.5rem', 
                padding: '2rem', 
                borderRadius: '1.5rem',
                marginTop: '3.5rem',
                border: '1px solid var(--glass-border)'
              }}
            >
              {/* Initials Circle */}
              <div 
                style={{ 
                  width: '64px', 
                  height: '64px', 
                  borderRadius: '16px', 
                  background: 'rgba(234,179,8,0.1)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  color: 'var(--tuk-gold)',
                  fontWeight: 800,
                  fontSize: '1.25rem',
                  border: '1px solid var(--glass-border)',
                  flexShrink: 0
                }}
              >
                {initials}
              </div>
              <div>
                <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '1.15rem', fontWeight: 800, color: 'var(--foreground)' }}>
                  Written by {post.author}
                </h4>
                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--muted-foreground)' }}>
                  TUK Frontier Editorial Team & Hackathon Facilitators
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Floating Vertical Social Share Bar */}
          <div className="detail-sidebar">
            <div className="share-sticky-bar">
              <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', writingMode: 'vertical-rl', margin: '0 0 1rem 0', color: 'var(--muted-foreground)' }}>
                Share Article
              </span>
              <button className="share-btn" onClick={() => alert("Shared on Facebook!")}>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M9 8H7v3h2v9h3v-9h3.6l.4-3H12V6c0-.88.72-1 1-1h2V2h-3C9.72 2 9 3.44 9 6v2z"/>
                </svg>
              </button>
              <button className="share-btn" onClick={() => alert("Shared on Twitter!")}>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </button>
              <button className="share-btn" onClick={() => alert("Shared on LinkedIn!")}>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </button>
              <button className="share-btn" onClick={() => { navigator.clipboard.writeText(window.location.href); alert("Link copied to clipboard!"); }}>
                <Share2 size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* 3. Suggestions Section (More from the Blog) */}
        <div style={{ marginTop: '5rem', paddingTop: '4rem', borderTop: '1px solid var(--glass-border)' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, textAlign: 'center', marginBottom: '3rem' }}>
            More from the Blog
          </h2>

          <div className="blog-grid">
            {otherPosts.map((suggestPost) => (
              <div 
                key={suggestPost.id}
                className="flex flex-col"
                style={{ 
                  background: 'var(--muted, rgba(128,128,128,0.03))',
                  border: '1px solid var(--glass-border)',
                  borderRadius: '1.5rem',
                  overflow: 'hidden'
                }}
              >
                <div style={{ position: 'relative', width: '100%', height: '180px', overflow: 'hidden' }}>
                  <img src={suggestPost.image_url} alt={suggestPost.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <span style={{ position: 'absolute', top: '1rem', left: '1rem', background: 'rgba(255, 255, 255, 0.95)', color: '#0f172a', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.7rem', fontWeight: 700 }}>
                    {suggestPost.category}
                  </span>
                </div>
                <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 800, margin: '0 0 0.75rem 0', lineHeight: '1.4' }}>
                      {suggestPost.title}
                    </h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--muted-foreground)', lineHeight: '1.5', margin: '0 0 1.25rem 0' }}>
                      {suggestPost.excerpt}
                    </p>
                  </div>
                  <Link 
                    to={`/blog/${suggestPost.id}`} 
                    style={{ textDecoration: 'none', color: 'var(--tuk-gold)', fontWeight: 700, fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    Read Article &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .detail-layout {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
        }
        @media (min-width: 992px) {
          .detail-layout {
            grid-template-columns: 1fr 80px;
          }
        }
        .detail-main {
          max-width: 800px;
          width: 100%;
        }
        .detail-sidebar {
          display: flex;
          justify-content: center;
        }
        .share-sticky-bar {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem;
          background: rgba(255,255,255,0.02);
          border: 1px solid var(--glass-border);
          border-radius: 20px;
          height: fit-content;
        }
        @media (min-width: 992px) {
          .share-sticky-bar {
            position: sticky;
            top: 120px;
            flex-direction: column;
          }
        }
        .share-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(255,255,255,0.05);
          border: 1px solid var(--glass-border);
          color: var(--muted-foreground);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .share-btn:hover {
          color: var(--tuk-gold);
          background: rgba(255,255,255,0.1);
          transform: scale(1.05);
        }
        .blog-content-body h3 {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--foreground);
          margin: 2.5rem 0 1rem 0;
        }
        .blog-content-body p {
          margin-bottom: 1.5rem;
        }
        .blog-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }
        @media (min-width: 768px) {
          .blog-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </div>
  );
}
