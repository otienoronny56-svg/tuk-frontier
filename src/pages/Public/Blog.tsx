import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

const defaultBlogPosts = [
  {
    id: 1,
    title: "Co-Building the Future: Why Hackathons are the Digital Lifeblood of Tech Hubs",
    excerpt: "Exploring how hands-on student competitions are bridging the gap between classroom theory and industry-grade engineering.",
    date: "March 15, 2024",
    author: "Ronny Winstone",
    category: "Innovation",
    views: "1,248 reads",
    image_url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 2,
    title: "5 Pro-Tips to Maximize Your Hackathon Project's Score",
    excerpt: "Simple yet highly effective steps to ensure your project demo stands out, impresses judges, and matches criteria.",
    date: "March 10, 2024",
    author: "Sarah Wanjiku",
    category: "Guides",
    views: "842 reads",
    image_url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 3,
    title: "Empowering Student Founders: The Venture Capital Advantage",
    excerpt: "How TUK Frontier Hackathon is helping student startups scale beyond the competition with seed funding.",
    date: "March 5, 2024",
    author: "Marcus Otieno",
    category: "Business",
    views: "521 reads",
    image_url: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=600&q=80"
  }
];

export default function Blog() {
  const [blogPosts, setBlogPosts] = useState<any[]>(defaultBlogPosts);

  useEffect(() => {
    async function getBlogs() {
      const { data, error } = await supabase
        .from('tuk_hackathon_blogs')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (!error && data && data.length > 0) {
        // Format to map DB fields to view fields if necessary
        const formatted = data.map(b => ({
          ...b,
          // If created_at is database timestamp, show nicely
          date: new Date(b.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        }));
        setBlogPosts(formatted);
      }
    }
    getBlogs();
  }, []);
  return (
    <div className="container pt-8 pb-16">
      <div className="text-center mb-12">
        <h1 className="text-gradient">Blog & Updates</h1>
        <p style={{ maxWidth: '600px', margin: '1rem auto' }}>
          Stay up to date with the latest news, announcements, and resources for the TUK Frontier Hackathon.
        </p>
      </div>

      <div className="blog-grid">
        {blogPosts.map((post, index) => (
          <motion.div 
            key={post.id}
            className="flex flex-col"
            style={{ 
              background: 'var(--muted, rgba(128,128,128,0.03))',
              border: '1px solid var(--glass-border)',
              borderRadius: '1.5rem',
              overflow: 'hidden',
              height: '100%'
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            {/* Image Header with Category Pill */}
            <div style={{ position: 'relative', width: '100%', height: '200px', overflow: 'hidden' }}>
              <img 
                src={post.image_url} 
                alt={post.title} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <span 
                style={{
                  position: 'absolute',
                  top: '1rem',
                  left: '1rem',
                  background: 'rgba(255, 255, 255, 0.95)',
                  color: '#0f172a',
                  padding: '0.35rem 0.85rem',
                  borderRadius: '20px',
                  fontSize: '0.725rem',
                  fontWeight: 700,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}
              >
                {post.category}
              </span>
            </div>

            {/* Details area */}
            <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
              <div>
                {/* Meta information indicator */}
                <div style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)', marginBottom: '0.75rem' }}>
                  {post.date} &bull; By {post.author} &bull; {post.views}
                </div>

                {/* Title */}
                <Link to={`/blog/${post.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <h3 
                    style={{ 
                      fontSize: '1.25rem', 
                      fontWeight: 800, 
                      lineHeight: '1.4', 
                      margin: '0 0 0.75rem 0',
                      transition: 'color 0.2s',
                      minHeight: '4.2rem',
                      display: 'flex',
                      alignItems: 'flex-start'
                    }} 
                    className="hover:text-tuk-gold"
                  >
                    {post.title}
                  </h3>
                </Link>

                {/* Excerpt */}
                <p style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)', lineHeight: '1.5', margin: '0 0 1.5rem 0' }}>
                  {post.excerpt}
                </p>
              </div>

              {/* Action Link */}
              <Link 
                to={`/blog/${post.id}`} 
                style={{ 
                  textDecoration: 'none', 
                  color: 'var(--tuk-gold)', 
                  fontWeight: 700, 
                  fontSize: '0.9rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  width: 'fit-content'
                }}
                className="hover-arrow-move"
              >
                Read Article <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      <style>{`
        .blog-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }
        @media (min-width: 768px) {
          .blog-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        .hover-arrow-move svg {
          transition: transform 0.2s ease;
        }
        .hover-arrow-move:hover svg {
          transform: translateX(4px);
        }
      `}</style>
    </div>
  );
}
