import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { motion } from 'framer-motion';
import { Target, Users, Zap, Activity } from 'lucide-react';

const DEFAULT_GALLERY = [
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=800"
];

export default function About() {
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      const { data } = await supabase.from('tuk_hackathon_content').select('value').eq('key', 'gallery').single();
      if (data && data.value && data.value.length > 0) {
        setGalleryImages(data.value);
      } else {
        setGalleryImages(DEFAULT_GALLERY);
      }
      setLoading(false);
    };
    fetchGallery();
  }, []);

  return (
    <div className="container pt-8 pb-16">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h1 className="text-gradient">About TUK Frontier</h1>
        <p style={{ maxWidth: '700px', margin: '1rem auto', fontSize: '1.25rem' }}>
          Co-organized by the Office of the Faculty Representative (FEBE) and the KUZA-TUK Chapter, 
          the TUK Frontier Hackathon is the premier innovation event at the Technical University of Kenya.
        </p>
      </motion.div>

      {/* Core Values / Objectives */}
      <div className="grid md:grid-cols-3 gap-8 mb-24">
        <div className="glass-card text-center">
          <Target size={40} color="var(--tuk-gold)" className="mx-auto mb-4" />
          <h3>Our Mission</h3>
          <p>To foster a culture of innovation, collaboration, and problem-solving among students by providing a platform to build real-world solutions.</p>
        </div>
        
        <div className="glass-card text-center">
          <Users size={40} color="var(--tuk-gold)" className="mx-auto mb-4" />
          <h3>Community</h3>
          <p>We bring together developers, designers, and visionaries. Connect with mentors, industry leaders, and like-minded peers.</p>
        </div>

        <div className="glass-card text-center">
          <Zap size={40} color="var(--tuk-gold)" className="mx-auto mb-4" />
          <h3>Impact</h3>
          <p>Projects built here don't just stay here. We support the best ideas through post-event incubation and mentorship to ensure they reach the market.</p>
        </div>
      </div>

      {/* Gallery */}
      <section className="text-center mb-12">
        <h2 className="mb-8">Past Events Gallery</h2>
        {loading ? (
           <div className="text-center py-12"><Activity className="animate-spin mx-auto mb-4" color="var(--tuk-gold)" size={32} /></div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {galleryImages.map((imgUrl, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="overflow-hidden rounded-xl border border-glass-border shadow-lg"
                style={{ aspectRatio: '1/1' }}
              >
                <img 
                  src={imgUrl} 
                  alt={`Hackathon Event ${i+1}`} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }} 
                  onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                />
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
