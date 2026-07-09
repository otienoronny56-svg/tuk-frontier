import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useNavigate } from 'react-router-dom';
import ParticipantDashboard from './ParticipantDashboard';
import OrganizationDashboard from './OrganizationDashboard';
import AdminDashboard from './AdminDashboard';
import JudgeDashboard from './JudgeDashboard';

export default function DashboardRouter() {
  const [role, setRole] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRole = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/login');
        return;
      }

      setUserId(session.user.id);

      const { data, error } = await supabase
        .from('tuk_hackathon_profiles')
        .select('role')
        .eq('id', session.user.id)
        .single();
        
      if (data && !error) {
        setRole(data.role);
      }
      setLoading(false);
    };

    fetchRole();
  }, [navigate]);

  if (loading) {
    return <div className="container py-24 text-center">Loading dashboard...</div>;
  }

  return (
    <div className="container pt-4 pb-12 mt-16">
      <h1 className="text-gradient" style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '1rem' }}>Dashboard</h1>
      
      {role === 'admin' && (
        <AdminDashboard />
      )}
      
      {role === 'judge' && userId && (
        <JudgeDashboard userId={userId} />
      )}
      
      {role === 'organization' && userId && (
        <OrganizationDashboard userId={userId} />
      )}
      
      {role === 'participant' && userId && (
        <ParticipantDashboard userId={userId} />
      )}
    </div>
  );
}
