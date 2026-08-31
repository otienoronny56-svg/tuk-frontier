import { Link, useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useEffect, useState } from 'react';
import { LogOut, User, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [session, setSession] = useState<any>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => { setIsMobileMenuOpen(false); }, [location.pathname]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Tracks', path: '/tracks' },
    { name: 'Schedule', path: '/schedule' },
    { name: 'Guide', path: '/guide' },
    { name: 'Blog', path: '/blog' },
    { name: 'Sponsors', path: '/sponsor' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: scrolled ? 'rgba(2,6,23,0.95)' : 'rgba(2,6,23,0.8)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255,255,255,0.07)',
      transition: 'background 0.3s ease, box-shadow 0.3s ease',
      boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.5)' : 'none',
    }}>
      <style>{`
        #desktop-nav { display: flex; }
        #mobile-btn { display: none; }
        @media (max-width: 1024px) {
          #desktop-nav { display: none !important; }
          #mobile-btn { display: flex !important; }
        }
        .nav-link {
          font-size: 0.875rem;
          font-weight: 500;
          color: rgba(255,255,255,0.6);
          text-decoration: none;
          transition: color 0.2s;
          padding: 0.25rem 0;
          position: relative;
        }
        .nav-link:hover { color: #fff; }
        .nav-link.active { color: #fbbf24; font-weight: 600; }
        .nav-link.active::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, #fbbf24, #f59e0b);
          border-radius: 2px;
        }
      `}</style>

      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.875rem 1.5rem', maxWidth: '1280px', margin: '0 auto' }}>
        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none' }}>
          <span style={{
            fontSize: '1.35rem', fontWeight: 900, letterSpacing: '-0.02em',
            background: 'linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.75) 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>
            TUK <span style={{ background: 'linear-gradient(135deg,#4ade80,#22d3ee)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Frontier</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div id="desktop-nav" style={{ alignItems: 'center', gap: '1.75rem' }}>
          {navLinks.map(link => (
            <Link key={link.name} to={link.path} className={`nav-link${isActive(link.path) ? ' active' : ''}`}>
              {link.name}
            </Link>
          ))}

          <div style={{ width: '1px', height: '20px', background: 'rgba(255,255,255,0.12)' }} />

          {session ? (
            <>
              <Link to="/dashboard" style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                padding: '0.5rem 1.1rem', borderRadius: '999px',
                background: 'linear-gradient(135deg,#fbbf24,#f59e0b)',
                color: '#000', fontWeight: 700, fontSize: '0.85rem', textDecoration: 'none',
                boxShadow: '0 0 20px rgba(251,191,36,0.3)',
              }}>
                <User size={14} /> Dashboard
              </Link>
              <button onClick={handleSignOut} style={{
                display: 'inline-flex', alignItems: 'center', padding: '0.5rem',
                borderRadius: '999px', background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)',
                cursor: 'pointer',
              }}>
                <LogOut size={16} />
              </button>
            </>
          ) : (
            <>
              <Link to="/login" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem', textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
              >Log In</Link>
              <Link to="/register" style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                padding: '0.5rem 1.25rem', borderRadius: '999px',
                background: 'linear-gradient(135deg,#fbbf24,#f59e0b)',
                color: '#000', fontWeight: 700, fontSize: '0.85rem', textDecoration: 'none',
                boxShadow: '0 0 20px rgba(251,191,36,0.25)',
                transition: 'box-shadow 0.2s',
              }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 0 35px rgba(251,191,36,0.5)')}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 0 20px rgba(251,191,36,0.25)')}
              >Register</Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button id="mobile-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} style={{
          alignItems: 'center', justifyContent: 'center',
          padding: '0.5rem', borderRadius: '0.5rem',
          background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)',
          color: '#fff', cursor: 'pointer',
        }}>
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isMobileMenuOpen && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, right: 0,
          background: 'rgba(2,6,23,0.98)', backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          padding: '1.5rem',
          display: 'flex', flexDirection: 'column', gap: '1rem',
          boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
          zIndex: 100,
        }}>
          {navLinks.map(link => (
            <Link key={link.name} to={link.path} style={{
              color: isActive(link.path) ? '#fbbf24' : 'rgba(255,255,255,0.7)',
              textDecoration: 'none', fontWeight: isActive(link.path) ? 700 : 500, fontSize: '1rem',
            }}>
              {link.name}
            </Link>
          ))}
          <div style={{ height: '1px', background: 'rgba(255,255,255,0.08)', margin: '0.5rem 0' }} />
          {session ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <Link to="/dashboard" style={{ textDecoration: 'none', padding: '0.75rem', borderRadius: '999px', background: 'linear-gradient(135deg,#fbbf24,#f59e0b)', color: '#000', fontWeight: 700, textAlign: 'center' }}>Dashboard</Link>
              <button onClick={handleSignOut} style={{ padding: '0.75rem', borderRadius: '999px', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', cursor: 'pointer', fontWeight: 600 }}>Sign Out</button>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <Link to="/login" style={{ textDecoration: 'none', padding: '0.75rem', borderRadius: '999px', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.8)', fontWeight: 600, textAlign: 'center' }}>Log In</Link>
              <Link to="/register" style={{ textDecoration: 'none', padding: '0.75rem', borderRadius: '999px', background: 'linear-gradient(135deg,#fbbf24,#f59e0b)', color: '#000', fontWeight: 700, textAlign: 'center' }}>Register</Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
