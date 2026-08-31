import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{
      background: 'linear-gradient(180deg, #050c1a 0%, #020617 100%)',
      borderTop: '1px solid rgba(255,255,255,0.07)',
      padding: '5rem 0 2.5rem',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Ambient glows */}
      <div style={{ position: 'absolute', top: '-60px', left: '10%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(251,191,36,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-40px', right: '10%', width: '350px', height: '350px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(74,222,128,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />
      {/* Dot grid */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.02) 1px, transparent 0)', backgroundSize: '40px 40px', pointerEvents: 'none' }} />

      <div className="container" style={{ position: 'relative', zIndex: 10, maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1.5fr', gap: '3rem', marginBottom: '4rem' }} className="footer-grid-resp">

          {/* Brand col */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <span style={{
                fontSize: '1.5rem', fontWeight: 900, letterSpacing: '-0.02em',
                background: 'linear-gradient(135deg, #ffffff, rgba(255,255,255,0.7))',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>
                TUK <span style={{ background: 'linear-gradient(135deg,#4ade80,#22d3ee)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Frontier</span>
              </span>
            </Link>
            <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, maxWidth: '300px', margin: 0 }}>
              Kenya's premier 72-hour student engineering & technology innovation summit at TUK. Jointly convened by FEBE Faculty Rep, KUZA–TUK & ASA–TUK.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {[
                { href: 'https://github.com', icon: <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg> },
                { href: 'https://twitter.com', icon: <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg> },
                { href: 'https://linkedin.com', icon: <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
                { href: 'https://wa.me/254794107254', icon: <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.458L0 24zm6.59-4.846c1.62.962 3.21 1.454 4.816 1.458 5.505 0 9.987-4.482 9.991-9.989.002-2.668-1.033-5.176-2.914-7.058C16.66 1.684 14.156.651 11.49.651c-5.513 0-10.002 4.49-10.006 10.001 0 1.78.463 3.518 1.34 5.032l-.993 3.626 3.722-.977c1.5.882 3.013 1.332 4.512 1.332zM16.58 13.91c-.244-.122-1.442-.712-1.666-.793-.223-.08-.387-.123-.55.122-.162.245-.63.794-.772.956-.143.163-.285.184-.529.062-.244-.122-.929-.342-1.77-1.092-.653-.583-1.094-1.303-1.222-1.527-.128-.224-.014-.345.109-.467.11-.11.244-.285.366-.427.122-.143.163-.238.245-.407.08-.169.04-.319-.02-.441-.061-.122-.55-1.324-.753-1.813-.198-.479-.4-.414-.549-.422-.143-.007-.306-.007-.468-.007-.163 0-.427.061-.65.306-.224.244-.855.835-.855 2.036 0 1.202.875 2.362.997 2.525.122.163 1.722 2.629 4.17 3.687.583.25 1.037.4 1.393.513.585.186 1.117.159 1.538.096.47-.07 1.442-.589 1.646-1.159.203-.57.203-1.059.142-1.16-.06-.101-.223-.162-.468-.284z"/></svg> },
              ].map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" style={{
                  width: '36px', height: '36px', borderRadius: '50%',
                  background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  color: 'rgba(255,255,255,0.5)', transition: 'all 0.2s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = '#fff'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; }}
                >{s.icon}</a>
              ))}
            </div>
          </div>

          {/* Hackathon links */}
          <div>
            <h4 style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#fbbf24', marginBottom: '1.25rem' }}>Hackathon</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[['Home', '/'], ['About Us', '/about'], ['Tracks', '/tracks'], ['Schedule', '/schedule']].map(([name, path]) => (
                <li key={path}><Link to={path} style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.875rem', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.85)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}
                >{name}</Link></li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#fbbf24', marginBottom: '1.25rem' }}>Resources</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[['Hacker Guide', '/guide'], ['Blog', '/blog'], ['Sponsor Us', '/sponsor'], ['Contact', '/contact']].map(([name, path]) => (
                <li key={path}><Link to={path} style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.875rem', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.85)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}
                >{name}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#fbbf24', marginBottom: '1.25rem' }}>Contact</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <MapPin size={15} color="#fbbf24" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.875rem', lineHeight: 1.6 }}>Technical University of Kenya,<br />Haile Selassie Avenue, Nairobi</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Phone size={15} color="#fbbf24" style={{ flexShrink: 0 }} />
                <a href="tel:+254794107254" style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.875rem', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.85)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}
                >+254 794 107 254</a>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Mail size={15} color="#fbbf24" style={{ flexShrink: 0 }} />
                <a href="mailto:info@tukfrontier.com" style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.875rem', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.85)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}
                >info@tukfrontier.com</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: 'rgba(255,255,255,0.07)', margin: '0 0 1.75rem' }} />

        {/* Bottom bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem' }}>
            © {currentYear} TUK Frontier. Convened by FEBE Office of Faculty Rep, KUZA–TUK & ASA–TUK.
          </span>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {[['Rules & Regs', '/guide'], ['Become Partner', '/sponsor']].map(([label, path]) => (
              <Link key={path} to={path} style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.3)')}
              >{label}</Link>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid-resp { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
        }
        @media (min-width: 769px) and (max-width: 1024px) {
          .footer-grid-resp { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
