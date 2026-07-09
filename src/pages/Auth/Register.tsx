import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState('participant');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // 1. Sign up the user
    const { data: authData, error: authError } = await supabase.auth.signUp({ 
      email, 
      password 
    });
    
    if (authError) {
      alert(authError.message);
      setLoading(false);
      return;
    }

    // 2. Insert into our custom profiles table if signup was successful
    if (authData.user) {
      const { error: profileError } = await supabase
        .from('tuk_hackathon_profiles')
        .insert([
          { id: authData.user.id, role, full_name: fullName }
        ]);
        
      if (profileError) {
        // Just log for now, might need more robust error handling in production
        console.error("Profile creation error:", profileError);
      }
      
      alert("Registration successful! You can now log in.");
      navigate('/login');
    }
    
    setLoading(false);
  };

  return (
    <div className="container py-24 flex justify-center items-center">
      <div className="glass-card" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="text-center" style={{ marginBottom: '1.5rem' }}>Create Account</h2>
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input 
              type="text" 
              className="form-input" 
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input 
              type="email" 
              className="form-input" 
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input 
              type="password" 
              className="form-input" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>
          <div className="form-group">
            <label className="form-label">I am a...</label>
            <select 
              className="form-input"
              value={role}
              onChange={e => setRole(e.target.value)}
            >
              <option value="participant">Participant (Hacker)</option>
              <option value="organization">Organization (Sponsor/Partner)</option>
              {/* Note: Admin role usually wouldn't be selectable here in prod, but keeping it for testing */}
            </select>
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <p className="text-center mt-4" style={{ fontSize: '0.875rem' }}>
          Already have an account? <Link to="/login" style={{ color: 'var(--tuk-gold)' }}>Log In</Link>
        </p>
      </div>
    </div>
  );
}
