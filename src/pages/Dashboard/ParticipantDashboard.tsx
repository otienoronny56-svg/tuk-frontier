import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Key, Upload, FileText, CheckCircle2, User, LayoutDashboard, Users, MessageSquare, BookOpen, ExternalLink } from 'lucide-react';

export default function ParticipantDashboard({ userId }: { userId: string }) {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'team' | 'mentor' | 'resources' | 'profile'>('dashboard');
  
  const [team, setTeam] = useState<any>(null);
  const [project, setProject] = useState<any>(null);
  const [projectScores, setProjectScores] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [tracks, setTracks] = useState<any[]>([]);
  const [selectedTrack, setSelectedTrack] = useState<string>('');
  
  // Submission Form State
  const [title, setTitle] = useState('');
  const [abstract, setAbstract] = useState('');
  const [repoUrl, setRepoUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Team Mgmt State
  const [teamName, setTeamName] = useState('');
  const [joinCodeInput, setJoinCodeInput] = useState('');
  
  // Profile State
  const [phoneInput, setPhoneInput] = useState('');

  useEffect(() => {
    fetchUserData();
  }, [userId]);

  const fetchUserData = async () => {
    setLoading(true);
    // Fetch profile
    const { data: profileData } = await supabase.from('tuk_hackathon_profiles').select('phone').eq('id', userId).single();
    if (profileData?.phone) setPhoneInput(profileData.phone);

    // Fetch available tracks
    const { data: tracksData } = await supabase.from('tuk_hackathon_tracks').select('*').order('title');
    if (tracksData) setTracks(tracksData);

    // Find if user is in a team
    const { data: memberData } = await supabase
      .from('tuk_hackathon_team_members')
      .select('team_id')
      .eq('user_id', userId)
      .maybeSingle();

    if (memberData?.team_id) {
      // Fetch team details
      const { data: teamData } = await supabase
        .from('tuk_hackathon_teams')
        .select('*')
        .eq('id', memberData.team_id)
        .single();
      setTeam(teamData);

      // Fetch project if submitted
      const { data: projectData } = await supabase
        .from('tuk_hackathon_projects')
        .select('*, submitter:tuk_hackathon_profiles(full_name)')
        .eq('team_id', memberData.team_id)
        .maybeSingle();
      
      if (projectData) {
        setProject(projectData);
        setTitle(projectData.title);
        setAbstract(projectData.abstract);
        setRepoUrl(projectData.github_url || '');
        setVideoUrl(projectData.video_url || '');
        if (projectData.track_id) setSelectedTrack(projectData.track_id);

        // Fetch scores with judge names
        const { data: assignData } = await supabase
          .from('tuk_hackathon_judge_assignments')
          .select('id, status, judge:tuk_hackathon_profiles(full_name)')
          .eq('project_id', projectData.id)
          .eq('status', 'scored');
          
        if (assignData && assignData.length > 0) {
          const assignIds = assignData.map(a => a.id);
          const { data: scoresData } = await supabase
            .from('tuk_hackathon_scores')
            .select('*')
            .in('assignment_id', assignIds);
          if (scoresData) {
            // Merge judge names into scores
            const enriched = scoresData.map(s => ({
              ...s,
              judge_name: assignData.find(a => a.id === s.assignment_id)?.judge?.full_name || 'Anonymous Judge'
            }));
            setProjectScores(enriched);
          }
        }
      }
    }
    setLoading(false);
  };

  const handleCreateTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    const joinCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    const { data: newTeam, error: teamError } = await supabase
      .from('tuk_hackathon_teams')
      .insert([{ name: teamName, join_code: joinCode }])
      .select()
      .single();

    if (teamError) {
      alert("Error creating team: " + teamError.message);
    } else {
      await supabase.from('tuk_hackathon_team_members').insert([{ user_id: userId, team_id: newTeam.id, role: 'leader' }]);
      setTeam(newTeam);
    }
    setActionLoading(false);
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    const { error } = await supabase.from('tuk_hackathon_profiles').update({ phone: phoneInput }).eq('id', userId);
    if (error) {
      alert("Error updating profile: " + error.message);
    } else {
      alert("Profile updated successfully!");
    }
    setActionLoading(false);
  };

  const handleJoinTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    const { data: targetTeam } = await supabase
      .from('tuk_hackathon_teams')
      .select('*')
      .eq('join_code', joinCodeInput)
      .maybeSingle();

    if (!targetTeam) {
      alert("Invalid join code.");
    } else {
      await supabase.from('tuk_hackathon_team_members').insert([{ user_id: userId, team_id: targetTeam.id, role: 'member' }]);
      setTeam(targetTeam);
    }
    setActionLoading(false);
  };

  const handleLeaveTeam = async () => {
    if (!confirm("Are you sure you want to leave this team? This action is permanent.")) return;
    setActionLoading(true);
    const { error } = await supabase
      .from('tuk_hackathon_team_members')
      .delete()
      .eq('user_id', userId);
      
    if (error) {
      alert("Error leaving team: " + error.message);
    } else {
      setTeam(null);
      setProject(null);
      setProjectScores([]);
    }
    setActionLoading(false);
  };

  const handleSaveAction = async (e: React.FormEvent | null, targetStatus: 'draft' | 'submitted') => {
    if (e) e.preventDefault();
    setActionLoading(true);

    let activeTeamId = team?.id;

    // Auto-create Solo Team if user isn't in one
    if (!activeTeamId) {
      const joinCode = Math.random().toString(36).substring(2, 8).toUpperCase();
      // Fetch user name for solo team name
      const { data: profile } = await supabase.from('tuk_hackathon_profiles').select('full_name').eq('id', userId).single();
      const soloTeamName = `Solo - ${profile?.full_name || 'Hacker'}`;
      
      const { data: newTeam } = await supabase
        .from('tuk_hackathon_teams')
        .insert([{ name: soloTeamName, join_code: joinCode }])
        .select()
        .single();
      
      if (newTeam) {
        await supabase.from('tuk_hackathon_team_members').insert([{ user_id: userId, team_id: newTeam.id, role: 'leader' }]);
        setTeam(newTeam);
        activeTeamId = newTeam.id;
      }
    }

    if (!activeTeamId) {
      alert("Failed to initialize submission.");
      setActionLoading(false);
      return;
    }

    let uploadedFileUrl = project?.pitch_deck_url;

    // Handle File Upload if selected
    if (file) {
      const fileExt = file.name.split('.').pop();
      const fileName = `${activeTeamId}_${Date.now()}.${fileExt}`;
      const { error: uploadError, data: uploadData } = await supabase.storage
        .from('hackathon_files')
        .upload(fileName, file);

      if (uploadError) {
        alert("Error uploading file: " + uploadError.message);
        setActionLoading(false);
        return;
      }

      const { data: publicUrlData } = supabase.storage
        .from('hackathon_files')
        .getPublicUrl(fileName);
        
      uploadedFileUrl = publicUrlData.publicUrl;
    }

    const payload = {
      team_id: activeTeamId,
      track_id: selectedTrack || null,
      title,
      abstract,
      github_url: repoUrl,
      video_url: videoUrl,
      pitch_deck_url: uploadedFileUrl,
      submitted_by: userId,
      status: targetStatus
    };

    if (project) {
      // Update existing
      const { data: updatedProject } = await supabase.from('tuk_hackathon_projects').update(payload).eq('id', project.id).select('*, submitter:tuk_hackathon_profiles(full_name)').single();
      setProject(updatedProject);
    } else {
      // Insert new
      const { data: newProject } = await supabase.from('tuk_hackathon_projects').insert([payload]).select('*, submitter:tuk_hackathon_profiles(full_name)').single();
      setProject(newProject);
    }

    setSubmitSuccess(true);
    setActionLoading(false);
    setTimeout(() => setSubmitSuccess(false), 5000);
  };

  const handleUnsubmitProject = async () => {
    if (!project) return;
    if (!window.confirm("Are you sure you want to unsubmit? Your details will be saved as a draft, but the project will no longer be considered formally submitted.")) return;
    
    setActionLoading(true);
    const { data: updatedProject, error } = await supabase.from('tuk_hackathon_projects').update({ status: 'draft', submitted_by: userId }).eq('id', project.id).select('*, submitter:tuk_hackathon_profiles(full_name)').single();
    if (error) {
      alert("Error unsubmitting: " + error.message);
    } else {
      setProject(updatedProject);
      alert("Project moved back to draft successfully.");
    }
    setActionLoading(false);
  };

  if (loading) return <div className="text-center mt-12">Loading workspace...</div>;

  return (
    <div className="mt-8">
      {/* Workspace Navigation */}
      <div className="flex overflow-x-auto gap-2 mb-8 pb-4 border-b border-glass-border">
        <button onClick={() => setActiveTab('dashboard')} className={`btn ${activeTab === 'dashboard' ? 'btn-primary' : 'btn-outline'} flex items-center gap-2`} style={{ padding: '0.5rem 1rem' }}>
          <LayoutDashboard size={16} /> Dashboard
        </button>
        <button onClick={() => setActiveTab('team')} className={`btn ${activeTab === 'team' ? 'btn-primary' : 'btn-outline'} flex items-center gap-2`} style={{ padding: '0.5rem 1rem' }}>
          <Users size={16} /> Team
        </button>
        <button onClick={() => setActiveTab('mentor')} className={`btn ${activeTab === 'mentor' ? 'btn-primary' : 'btn-outline'} flex items-center gap-2`} style={{ padding: '0.5rem 1rem' }}>
          <MessageSquare size={16} /> Mentor Booking
        </button>
        <button onClick={() => setActiveTab('resources')} className={`btn ${activeTab === 'resources' ? 'btn-primary' : 'btn-outline'} flex items-center gap-2`} style={{ padding: '0.5rem 1rem' }}>
          <BookOpen size={16} /> Resources
        </button>
        <button onClick={() => setActiveTab('profile')} className={`btn ${activeTab === 'profile' ? 'btn-primary' : 'btn-outline'} flex items-center gap-2 ml-auto`} style={{ padding: '0.5rem 1rem' }}>
          <User size={16} /> My Profile
        </button>
      </div>

      {/* Suspension Banner — always visible across all tabs */}
      {team?.is_suspended && (
        <div style={{ marginBottom: '1.5rem', padding: '1rem 1.5rem', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.35)', borderRadius: '1rem', display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '1.5rem' }}>⚠️</span>
          <div style={{ flex: 1 }}>
            <p style={{ margin: 0, color: '#ef4444', fontWeight: 700, fontSize: '0.95rem' }}>Your team has been suspended</p>
            <p style={{ margin: '0.25rem 0 0 0', color: 'var(--muted-foreground)', fontSize: '0.85rem' }}>Team <strong style={{ color: 'var(--foreground)' }}>"{team.name}"</strong> is currently suspended by administrators. Project submission is locked. Please go to the <button onClick={() => setActiveTab('team')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--tuk-gold)', fontWeight: 700, padding: 0, textDecoration: 'underline' }}>Team tab</button> to leave and join a new team.</p>
          </div>
        </div>
      )}

      {/* DASHBOARD TAB (Project Submission) */}
      {activeTab === 'dashboard' && (
        <div className="glass-card" style={{ maxWidth: '800px', margin: '0 auto', fontFamily: 'monospace' }}>
          <div className="flex justify-between items-center mb-8 border-b border-glass-border pb-4">
            <div>
              <h2 style={{ margin: 0, textTransform: 'uppercase', letterSpacing: '2px', fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                Your Project Submission
                {project && project.status === 'submitted' ? (
                  <span style={{ background: 'rgba(16,185,129,0.1)', color: '#10b981', border: '1px solid rgba(16,185,129,0.2)', padding: '0.25rem 0.75rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 800 }}>SUBMITTED</span>
                ) : project ? (
                  <span style={{ background: 'rgba(234,179,8,0.1)', color: 'var(--tuk-gold)', border: '1px solid rgba(234,179,8,0.2)', padding: '0.25rem 0.75rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 800 }}>DRAFT</span>
                ) : null}
              </h2>
              {project && (
                <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.85rem', color: 'var(--muted-foreground)' }}>
                  {project.status === 'submitted' ? 'This project is actively submitted.' : 'This project is currently saved as a draft.'} Any teammate can view or edit it.
                  <br/>
                  <span style={{ color: 'var(--foreground)', marginTop: '0.25rem', display: 'inline-block' }}>Last updated by: <strong>{project.submitter?.full_name || 'A teammate'}</strong></span>
                </p>
              )}
            </div>
            {submitSuccess && <span className="text-green-500 flex items-center gap-2"><CheckCircle2 size={16} /> Saved Successfully</span>}
          </div>

          {team?.is_suspended ? (
            <div className="glass p-8 text-center" style={{ border: '1px solid rgba(239, 68, 68, 0.4)', borderRadius: '1rem', background: 'rgba(239, 68, 68, 0.05)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontSize: '2.5rem' }}>⚠️</span>
              <h3 style={{ color: '#ef4444', fontWeight: 800, margin: 0, fontSize: '1.25rem', letterSpacing: '1px' }}>YOUR TEAM IS SUSPENDED</h3>
              <p style={{ color: 'var(--foreground)', lineHeight: '1.6', margin: '0.5rem 0', maxWidth: '500px' }}>
                Your team <strong>"{team.name}"</strong> has been suspended by the administrators. Project submission and editing is currently locked.
              </p>
              <p style={{ color: 'var(--muted-foreground)', fontSize: '0.85rem', margin: 0 }}>
                Please navigate to the <strong>Team</strong> tab and click "Leave Team" to start fresh by joining or forming a new team.
              </p>
            </div>
          ) : (
            <form onSubmit={e => handleSaveAction(e, 'submitted')} className="flex flex-col gap-6">
              {tracks.length > 0 && (
                <div className="form-group mb-0">
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--tuk-gold)' }}>Hackathon Track:</label>
                  <select 
                    className="form-input" 
                    style={{ background: 'transparent', border: 'none', borderBottom: '1px dashed var(--glass-border)', borderRadius: 0, paddingLeft: 0, cursor: 'pointer' }}
                    value={selectedTrack}
                    onChange={e => setSelectedTrack(e.target.value)}
                  >
                    <option value="" style={{ color: '#000' }}>-- Select a Track (Optional) --</option>
                    {tracks.map(t => (
                      <option key={t.id} value={t.id} style={{ color: '#000' }}>{t.title}</option>
                    ))}
                  </select>
                </div>
              )}

              <div className="form-group mb-0">
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--tuk-gold)' }}>Project Title:</label>
                <input 
                  type="text" 
                  className="form-input" 
                  style={{ background: 'transparent', border: 'none', borderBottom: '1px dashed var(--glass-border)', borderRadius: 0, paddingLeft: 0 }}
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  required
                  placeholder="Enter title here..."
                />
              </div>

              <div className="form-group mb-0">
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--tuk-gold)' }}>Abstract / Description:</label>
                <textarea 
                  className="form-input" 
                  style={{ background: 'transparent', border: '1px dashed var(--glass-border)', borderRadius: 'var(--radius-sm)' }}
                  value={abstract}
                  onChange={e => setAbstract(e.target.value)}
                  required
                  rows={4}
                  placeholder="Provide a clear overview of the problem and your solution..."
                />
              </div>

              <div className="form-group mb-0 flex items-center gap-4">
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--tuk-gold)' }}>GitHub Repository URL:</label>
                  <input 
                    type="url" 
                    className="form-input" 
                    style={{ background: 'transparent', border: 'none', borderBottom: '1px dashed var(--glass-border)', borderRadius: 0, paddingLeft: 0 }}
                    value={repoUrl}
                    onChange={e => setRepoUrl(e.target.value)}
                    placeholder="https://github.com/..."
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--tuk-gold)' }}>Demo Video URL (optional):</label>
                  <input 
                    type="url" 
                    className="form-input" 
                    style={{ background: 'transparent', border: 'none', borderBottom: '1px dashed var(--glass-border)', borderRadius: 0, paddingLeft: 0 }}
                    value={videoUrl}
                    onChange={e => setVideoUrl(e.target.value)}
                    placeholder="https://youtube.com/..."
                  />
                </div>
              </div>

              <div className="form-group mb-0">
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--tuk-gold)' }}>Pitch Deck (PDF only, optional):</label>
                <div className="flex items-center gap-4">
                  <input 
                    type="file" 
                    accept=".pdf"
                    onChange={e => setFile(e.target.files?.[0] || null)}
                    id="file-upload"
                    style={{ display: 'none' }}
                  />
                  <label htmlFor="file-upload" className="cursor-pointer" style={{ padding: '0.25rem 1rem', background: 'rgba(255,255,255,0.05)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--glass-border)' }}>
                    {file ? file.name : 'Choose File...'}
                  </label>
                  <span style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)' }}>Max 10MB</span>
                  {project?.pitch_deck_url && !file && (
                    <a href={project.pitch_deck_url} target="_blank" rel="noreferrer" style={{ marginLeft: 'auto', fontSize: '0.875rem', color: 'var(--tuk-gold)' }}>View Current Upload</a>
                  )}
                </div>
              </div>

              <div className="flex justify-between mt-4 pt-4 border-t border-glass-border items-center">
                {project && project.status === 'submitted' && projectScores.length === 0 ? (
                  <button type="button" onClick={handleUnsubmitProject} className="btn btn-outline text-red-500 hover:bg-red-500 hover:text-white" style={{ padding: '0.5rem 1rem' }} disabled={actionLoading}>
                    Unsubmit
                  </button>
                ) : (
                  <button 
                    type="button" 
                    onClick={() => {
                      if (!title || !abstract) {
                        alert("Please fill in Title and Abstract to save a draft.");
                        return;
                      }
                      handleSaveAction(null, 'draft');
                    }}
                    className="btn btn-outline text-tuk-gold hover:bg-tuk-gold hover:text-black" 
                    style={{ padding: '0.5rem 1rem', border: '1px solid var(--tuk-gold)' }} 
                    disabled={actionLoading || (project && project.status === 'submitted')}
                  >
                    Save Draft
                  </button>
                )}
                <button type="submit" className="btn btn-primary" disabled={actionLoading}>
                  {actionLoading ? 'Saving...' : (project && project.status === 'submitted' ? '[ Update Submission ]' : '[ Final Submit ]')}
                </button>
              </div>
              
              {!team && (
                <p className="text-center text-sm text-muted-foreground mt-2">
                  Note: Saving this form will automatically register you as a solo participant. <br/>
                  If you meant to join a team, please do so in the "Team" tab first.
                </p>
              )}
            </form>
          )}

          {projectScores.length > 0 && (() => {
            const avg = (field: string) => Math.round((projectScores.reduce((sum, s) => sum + (s[field] || 0), 0) / projectScores.length) * 10) / 10;
            const avgInnovation = avg('innovation_score');
            const avgTechnical = avg('technical_score');
            const avgImpact = avg('impact_score');
            const overall = Math.round(((avgInnovation + avgTechnical + avgImpact) / 3) * 10) / 10;
            return (
              <div className="mt-12 pt-8 border-t border-glass-border">
                <h3 className="text-xl mb-2 text-tuk-gold text-center">Judge Feedback & Scores</h3>
                <p className="text-center text-sm text-muted-foreground mb-8">{projectScores.length} judge{projectScores.length > 1 ? 's' : ''} have scored your project</p>

                {/* Average Summary Card */}
                <div className="glass p-6 rounded-xl mb-8" style={{ border: '1px solid rgba(234,179,8,0.2)', background: 'rgba(234,179,8,0.04)' }}>
                  <div className="text-center mb-4">
                    <span style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--tuk-gold)' }}>{overall}</span>
                    <span style={{ fontSize: '1.25rem', color: 'var(--muted-foreground)' }}>/10</span>
                    <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.85rem', color: 'var(--muted-foreground)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Overall Average</p>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="bg-black/20 p-3 rounded-lg border border-glass-border">
                      <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Innovation</div>
                      <div className="text-2xl font-bold text-blue-400">{avgInnovation}<span className="text-sm text-muted-foreground">/10</span></div>
                    </div>
                    <div className="bg-black/20 p-3 rounded-lg border border-glass-border">
                      <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Technical</div>
                      <div className="text-2xl font-bold text-purple-400">{avgTechnical}<span className="text-sm text-muted-foreground">/10</span></div>
                    </div>
                    <div className="bg-black/20 p-3 rounded-lg border border-glass-border">
                      <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Impact</div>
                      <div className="text-2xl font-bold text-green-400">{avgImpact}<span className="text-sm text-muted-foreground">/10</span></div>
                    </div>
                  </div>
                </div>

                {/* Individual Judge Comments */}
                {projectScores.some(s => s.feedback) && (
                  <div>
                    <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--muted-foreground)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Individual Feedback</h4>
                    <div className="flex flex-col gap-4">
                      {projectScores.filter(s => s.feedback).map((score, idx) => (
                        <div key={idx} className="glass p-4 rounded-lg" style={{ border: '1px dashed var(--glass-border)' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(139,92,246,0.2)', border: '1px solid rgba(139,92,246,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 700, color: '#a78bfa' }}>
                                {score.judge_name.charAt(0).toUpperCase()}
                              </div>
                              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--foreground)' }}>{score.judge_name}</span>
                            </div>
                            <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.75rem' }}>
                              <span style={{ color: '#60a5fa' }}>💡 {score.innovation_score}</span>
                              <span style={{ color: '#c084fc' }}>⚙️ {score.technical_score}</span>
                              <span style={{ color: '#34d399' }}>🌍 {score.impact_score}</span>
                            </div>
                          </div>
                          <p className="text-sm italic" style={{ color: 'var(--muted-foreground)', margin: 0, lineHeight: 1.6 }}>"{score.feedback}"</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })()}
        </div>
      )}

      {activeTab === 'team' && (
        <div className="glass-card" style={{ maxWidth: '800px', margin: '0 auto' }}>
          {team ? (
            <div>
              <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span>Team: {team.name}</span>
                {team.is_suspended && (
                  <span style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.2)', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700 }}>
                    Suspended
                  </span>
                )}
              </h2>
              {team.is_suspended ? (
                <div className="glass p-6 mt-6" style={{ border: '1px solid rgba(239, 68, 68, 0.4)', borderRadius: '1rem', background: 'rgba(239, 68, 68, 0.05)' }}>
                  <p style={{ color: 'var(--foreground)', lineHeight: '1.6', margin: 0 }}>
                    This team has been suspended by the administrators. To continue participating in the hackathon, please leave this team using the button below. Once you leave, you can form a new team or enter a new join code.
                  </p>
                  <button 
                    onClick={handleLeaveTeam}
                    className="btn btn-outline text-red-500 hover:bg-red-500 hover:text-white"
                    style={{ marginTop: '1.5rem', padding: '0.625rem 1.5rem', borderRadius: '8px', border: '1px solid rgba(239,68,68,0.3)' }}
                    disabled={actionLoading}
                  >
                    {actionLoading ? 'Leaving...' : 'Leave Suspended Team'}
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-2 mt-4 p-4 glass" style={{ display: 'inline-flex' }}>
                    <Key size={18} color="var(--tuk-gold)" />
                    <span>Join Code: <strong>{team.join_code}</strong></span>
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground">Share this code with your teammates so they can join.</p>
                  <button 
                    onClick={handleLeaveTeam}
                    className="btn btn-outline text-red-500 hover:bg-red-500 hover:text-white"
                    style={{ marginTop: '2.5rem', display: 'block', padding: '0.625rem 1.5rem', borderRadius: '8px' }}
                    disabled={actionLoading}
                  >
                    Leave Team
                  </button>
                </>
              )}
            </div>
          ) : (
            <div>
              <h2 style={{ marginBottom: '2rem' }}>Team Management</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {/* Create Team Form */}
                <div className="glass p-6" style={{ borderRadius: 'var(--radius-md)' }}>
                  <h3 style={{ marginBottom: '1rem' }}>Create a Team</h3>
                  <form onSubmit={handleCreateTeam}>
                    <input 
                      type="text" 
                      className="form-input mb-4" 
                      value={teamName}
                      onChange={e => setTeamName(e.target.value)}
                      required placeholder="Team Name"
                    />
                    <button type="submit" className="btn btn-primary w-full" disabled={actionLoading}>Create</button>
                  </form>
                </div>
                {/* Join Team Form */}
                <div className="glass p-6" style={{ borderRadius: 'var(--radius-md)' }}>
                  <h3 style={{ marginBottom: '1rem' }}>Join a Team</h3>
                  <form onSubmit={handleJoinTeam}>
                    <input 
                      type="text" 
                      className="form-input mb-4" 
                      value={joinCodeInput}
                      onChange={e => setJoinCodeInput(e.target.value)}
                      required placeholder="Join Code"
                    />
                    <button type="submit" className="btn btn-outline w-full" disabled={actionLoading}>Join</button>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'mentor' && (
        <div className="glass-card" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <MessageSquare size={48} color="var(--tuk-gold)" style={{ margin: '0 auto 1rem auto' }} />
            <h2 style={{ marginBottom: '1rem' }}>Mentorship Hub</h2>
            <p className="text-muted-foreground">Stuck on a bug? Need architecture advice? Our mentors are here to help!</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass p-6 text-center" style={{ borderRadius: '1rem', border: '1px solid var(--glass-border)' }}>
              <h3 style={{ color: 'var(--tuk-gold)', marginBottom: '1rem' }}>Technical Mentors</h3>
              <p className="text-sm text-muted-foreground mb-6">Get help with React, Supabase, Python, AI integration, and more.</p>
              <a href="#" className="btn btn-primary w-full" style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
                Join #technical-help
              </a>
            </div>
            <div className="glass p-6 text-center" style={{ borderRadius: '1rem', border: '1px solid var(--glass-border)' }}>
              <h3 style={{ color: 'var(--tuk-gold)', marginBottom: '1rem' }}>Design & Product</h3>
              <p className="text-sm text-muted-foreground mb-6">Feedback on your UI/UX, user flows, and pitch presentation.</p>
              <a href="#" className="btn btn-outline w-full" style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
                Join #design-help
              </a>
            </div>
          </div>
          
          <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(234,179,8,0.05)', borderRadius: '1rem', border: '1px dashed var(--tuk-gold)' }}>
            <h4 style={{ color: 'var(--tuk-gold)', marginBottom: '0.5rem', fontSize: '1rem' }}>How to ask for help:</h4>
            <ul style={{ color: 'var(--foreground)', fontSize: '0.9rem', paddingLeft: '1.5rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li>Provide a clear description of the problem.</li>
              <li>Share relevant code snippets or screenshots.</li>
              <li>Mention what you have already tried.</li>
              <li>Be patient! Mentors will get to you as soon as they can.</li>
            </ul>
          </div>
        </div>
      )}

      {activeTab === 'resources' && (
        <div className="glass-card" style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <BookOpen size={48} color="var(--tuk-gold)" style={{ margin: '0 auto 1rem auto' }} />
            <h2 style={{ marginBottom: '1rem' }}>Developer Resources</h2>
            <p className="text-muted-foreground">Tools, documentation, and assets to help you build your project faster.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'React Documentation', desc: 'The official React docs for UI development.', link: 'https://react.dev' },
              { title: 'Tailwind CSS', desc: 'Utility-first CSS framework for rapid styling.', link: 'https://tailwindcss.com' },
              { title: 'Supabase', desc: 'Open source Firebase alternative for backend.', link: 'https://supabase.com/docs' },
              { title: 'Firebase', desc: 'Google app development platform.', link: 'https://firebase.google.com/docs' },
              { title: 'Google Cloud', desc: 'GCP Console for hosting, APIs, and cloud services.', link: 'https://console.cloud.google.com/' },
              { title: 'ChatGPT', desc: 'OpenAI conversational AI for coding and debugging.', link: 'https://chat.openai.com/' },
              { title: 'Google Gemini', desc: 'Multimodal AI assistant by Google.', link: 'https://gemini.google.com/' },
              { title: 'Claude (Anthropic)', desc: 'Advanced AI for coding, analysis, and writing.', link: 'https://claude.ai/' },
              { title: 'Lucide Icons', desc: 'Beautiful, consistent open-source icons.', link: 'https://lucide.dev' },
              { title: 'Figma Community', desc: 'Free design templates and UI kits.', link: 'https://figma.com/community' },
              { title: 'Vite', desc: 'Next Generation Frontend Tooling.', link: 'https://vitejs.dev' }
            ].map((res, i) => (
              <a key={i} href={res.link} target="_blank" rel="noreferrer" className="glass p-5 hover-lift" style={{ borderRadius: '1rem', border: '1px solid var(--glass-border)', textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <h4 style={{ color: 'var(--tuk-gold)', margin: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  {res.title}
                  <ExternalLink size={14} />
                </h4>
                <p style={{ color: 'var(--muted-foreground)', fontSize: '0.85rem', margin: 0, lineHeight: 1.5 }}>{res.desc}</p>
              </a>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'profile' && (
        <div className="glass-card" style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ marginBottom: '1.5rem' }}>Your Profile</h2>
          <form onSubmit={handleUpdateProfile}>
            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input 
                type="tel" 
                className="form-input" 
                value={phoneInput}
                onChange={e => setPhoneInput(e.target.value)}
                placeholder="+1 234 567 8900"
              />
              <p className="text-sm text-muted-foreground mt-2" style={{ lineHeight: 1.5 }}>Add your phone number so hackathon organizers can reach you easily regarding updates, judging, or prizes.</p>
            </div>
            <button type="submit" className="btn btn-primary" disabled={actionLoading}>
              {actionLoading ? 'Saving...' : 'Save Profile'}
            </button>
          </form>
        </div>
      )}

    </div>
  );
}
