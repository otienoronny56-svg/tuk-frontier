import { Link, useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useEffect, useState } from 'react';
import { LogOut, User, Menu, X, Sun, Moon } from 'lucide-react';

export default function Navbar() {
  const [session, setSession] = useState<any>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Initialize theme from localStorage or default to dark
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      setIsDarkMode(false);
      document.documentElement.classList.add('light');
    }
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.add('light');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.remove('light');
      localStorage.setItem('theme', 'dark');
    }
    setIsDarkMode(!isDarkMode);
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

  return (
    <nav style={{ padding: '1rem 0', borderBottom: '1px solid var(--glass-border)', background: 'var(--glass-bg)', backdropFilter: 'blur(12px)', position: 'sticky', top: 0, zIndex: 50, transition: 'background 0.3s ease, border-color 0.3s ease' }}>
      <div className="container flex justify-between items-center">
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <h2 style={{ margin: 0, fontSize: '1.5rem' }} className="text-gradient">TUK Frontier</h2>
        </Link>

        {/* Desktop Nav */}
        <div className="flex items-center gap-4" id="desktop-nav">
          <style>
            {`
              @media (max-width: 1024px) {
                #desktop-nav { display: none !important; }
                #mobile-menu-btn { display: flex !important; }
              }
              #mobile-menu-btn { display: none; }
            `}
          </style>
          
          {navLinks.map(link => (
            <Link key={link.name} to={link.path} style={{ textDecoration: 'none', color: location.pathname === link.path ? 'var(--primary)' : 'var(--foreground)', fontWeight: location.pathname === link.path ? 600 : 400, transition: 'color 0.3s ease', fontSize: '0.9rem' }}>
              {link.name}
            </Link>
          ))}
          
          <div style={{ width: '1px', height: '24px', background: 'var(--glass-border)', margin: '0 0.5rem' }}></div>
          
          {session ? (
            <>
              <Link to="/dashboard" className="btn btn-primary" style={{ display: 'flex', gap: '0.5rem', textDecoration: 'none', padding: '0.5rem 1rem' }}>
                <User size={16} /> Dashboard
              </Link>
              <button onClick={handleSignOut} className="btn btn-outline" style={{ display: 'flex', gap: '0.5rem', padding: '0.5rem 1rem' }}>
                <LogOut size={16} />
              </button>
            </>
          ) : (
            <>
              <Link to="/login" style={{ textDecoration: 'none', color: 'var(--foreground)', fontSize: '0.9rem' }}>Log In</Link>
              <Link to="/register" className="btn btn-primary" style={{ textDecoration: 'none', padding: '0.5rem 1rem' }}>Register</Link>
            </>
          )}

          <button onClick={toggleTheme} className="btn btn-outline" style={{ padding: '0.5rem', borderRadius: '50%' }}>
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        {/* Mobile Menu Buttons */}
        <div className="flex items-center gap-2" id="mobile-menu-btn">
          <button onClick={toggleTheme} className="btn btn-outline" style={{ padding: '0.5rem', borderRadius: '50%' }}>
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button 
            className="btn btn-outline" 
            style={{ padding: '0.5rem' }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMobileMenuOpen && (
        <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, padding: '1rem', background: 'var(--background)', borderBottom: '1px solid var(--glass-border)', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)', zIndex: 100 }}>
          <div className="flex flex-col gap-4">
            {navLinks.map(link => (
              <Link key={link.name} to={link.path} style={{ textDecoration: 'none', color: location.pathname === link.path ? 'var(--primary)' : 'var(--foreground)' }}>
                {link.name}
              </Link>
            ))}
            
            <hr style={{ borderColor: 'var(--glass-border)' }} />
            
            {session ? (
              <>
                <Link to="/dashboard" className="btn btn-primary w-full text-center" style={{ textDecoration: 'none' }}>Dashboard</Link>
                <button onClick={handleSignOut} className="btn btn-outline w-full">Sign Out</button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link to="/login" className="btn btn-outline text-center" style={{ textDecoration: 'none' }}>Log In</Link>
                <Link to="/register" className="btn btn-primary text-center" style={{ textDecoration: 'none' }}>Register</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
