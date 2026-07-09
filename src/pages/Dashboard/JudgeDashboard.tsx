import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { ShieldAlert, CheckCircle, Code, Video, Target, Cpu, MapPin, MessageSquare, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

export default function JudgeDashboard({ userId }: { userId: string }) {
  const [assignments, setAssignments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [scores, setScores] = useState<Record<string, { innovation: number, technical: number, impact: number, feedback: string }>>({});

  useEffect(() => {
    fetchAssignments();
  }, [userId]);

  const fetchAssignments = async () => {
    setLoading(true);
    const { data: assignData } = await supabase
      .from('tuk_hackathon_judge_assignments')
      .select('*, project:tuk_hackathon_projects(*)')
      .eq('judge_id', userId);
      
    if (assignData) {
      setAssignments(assignData);
      
      const assignmentIds = assignData.map(a => a.id);
      if (assignmentIds.length > 0) {
        const { data: scoresData } = await supabase
          .from('tuk_hackathon_scores')
          .select('*')
          .in('assignment_id', assignmentIds);
          
        if (scoresData) {
          const scoreMap: Record<string, any> = {};
          scoresData.forEach(s => {
            scoreMap[s.assignment_id] = {
              innovation: s.innovation_score,
              technical: s.technical_score,
              impact: s.impact_score,
              feedback: s.feedback || ''
            };
          });
          setScores(scoreMap);
        }
      }
    }
    setLoading(false);
  };

  const handleScoreChange = (assignId: string, field: string, value: any) => {
    setScores(prev => ({
      ...prev,
      [assignId]: {
        ...(prev[assignId] || { innovation: 5, technical: 5, impact: 5, feedback: '' }),
        [field]: value
      }
    }));
  };

  const handleSubmitScore = async (assignId: string) => {
    setSubmitting(true);
    const score = scores[assignId];
    if (!score) {
      setSubmitting(false);
      return;
    }

    try {
      const { error } = await supabase.from('tuk_hackathon_scores').upsert({
        assignment_id: assignId,
        innovation_score: score.innovation,
        technical_score: score.technical,
        impact_score: score.impact,
        feedback: score.feedback
      }, { onConflict: 'assignment_id' });

      if (error) throw error;
      
      await supabase.from('tuk_hackathon_judge_assignments').update({ status: 'scored' }).eq('id', assignId);
      
      alert("Score submitted successfully!");
      fetchAssignments();
    } catch (err: any) {
      alert("Error submitting score: " + err.message);
    }
    setSubmitting(false);
  };

  if (loading) {
    return <div className="text-center mt-24"><div className="animate-spin text-tuk-gold text-4xl mb-4">⏳</div><p>Loading assigned projects...</p></div>;
  }

  const scoredCount = assignments.filter(a => a.status === 'scored').length;

  return (
    <div className="pb-24">
      <div className="flex justify-between items-center mb-8 pb-4 border-b border-glass-border">
        <div className="flex items-center gap-3">
          <ShieldAlert size={36} color="var(--tuk-gold)" />
          <div>
            <h2 style={{ margin: 0 }}>Judge Panel</h2>
            <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--muted-foreground)' }}>Evaluate and score your assigned projects.</p>
          </div>
        </div>
        <div className="glass px-4 py-2" style={{ borderRadius: '999px', fontSize: '0.875rem', fontWeight: 600 }}>
          <span className="text-tuk-gold">{scoredCount}</span> / {assignments.length} Scored
        </div>
      </div>

      {assignments.length === 0 ? (
        <div className="text-center p-12 glass-card">
          <Target size={48} className="mx-auto mb-4 text-muted-foreground opacity-50" />
          <h3 className="text-xl mb-2">No Projects Assigned</h3>
          <p className="text-muted-foreground">You currently have no projects assigned to you for scoring. Check back later.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-12">
          {assignments.map((assign, index) => {
            const proj = assign.project;
            const currentScore = scores[assign.id] || { innovation: 5, technical: 5, impact: 5, feedback: '' };
            const isScored = assign.status === 'scored';

            return (
              <motion.div 
                key={assign.id} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="glass-card relative overflow-hidden" 
                style={{ padding: 0 }}
              >
                {/* Header */}
                <div className="p-6 md:p-8 border-b border-glass-border" style={{ background: 'rgba(0,0,0,0.2)' }}>
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-3xl font-bold text-gradient m-0">{proj.title}</h2>
                    {isScored && (
                      <div className="flex items-center gap-2 text-green-500 bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20">
                        <CheckCircle size={16} />
                        <span className="text-sm font-bold tracking-wider">SCORED</span>
                      </div>
                    )}
                  </div>
                  
                  <p className="text-muted-foreground mb-6 text-lg">{proj.abstract}</p>

                  <div className="flex flex-wrap gap-4">
                    {proj.github_url && (
                      <a href={proj.github_url} target="_blank" rel="noreferrer" className="btn btn-outline flex items-center gap-2">
                        <Code size={18} /> View Source Code
                      </a>
                    )}
                    {proj.video_url && (
                      <a href={proj.video_url} target="_blank" rel="noreferrer" className="btn btn-outline flex items-center gap-2" style={{ borderColor: 'var(--tuk-gold)', color: 'var(--tuk-gold)' }}>
                        <Video size={18} /> Watch Pitch Video
                      </a>
                    )}
                    {proj.pitch_deck_url && (
                      <a href={proj.pitch_deck_url} target="_blank" rel="noreferrer" className="btn btn-outline flex items-center gap-2" style={{ borderColor: '#10b981', color: '#10b981' }}>
                        <FileText size={18} /> Read Pitch Deck
                      </a>
                    )}
                  </div>
                </div>

                {/* Scoring Body */}
                <div className="p-6 md:p-8">
                  <h3 className="text-xl mb-6 flex items-center gap-2"><Target size={24} color="var(--tuk-gold)"/> Scoring Rubric</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex flex-col gap-6">
                      {/* Innovation */}
                      <div>
                        <div className="flex justify-between items-end mb-4">
                          <div>
                            <div className="font-bold text-lg mb-1 flex items-center gap-2"><Cpu size={18} className="text-blue-400"/> Innovation & Originality</div>
                            <div className="text-sm text-muted-foreground">How unique and creative is the concept?</div>
                          </div>
                          <div className="text-3xl font-bold text-tuk-gold">{currentScore.innovation}<span className="text-lg text-muted-foreground">/10</span></div>
                        </div>
                        <input 
                          type="range" min="1" max="10" 
                          value={currentScore.innovation} 
                          onChange={(e) => handleScoreChange(assign.id, 'innovation', parseInt(e.target.value))}
                          className="w-full accent-tuk-gold cursor-pointer"
                        />
                      </div>

                      {/* Technical */}
                      <div>
                        <div className="flex justify-between items-end mb-4">
                          <div>
                            <div className="font-bold text-lg mb-1 flex items-center gap-2"><Code size={18} className="text-purple-400"/> Technical Execution</div>
                            <div className="text-sm text-muted-foreground">Code quality, architecture, and stability.</div>
                          </div>
                          <div className="text-3xl font-bold text-tuk-gold">{currentScore.technical}<span className="text-lg text-muted-foreground">/10</span></div>
                        </div>
                        <input 
                          type="range" min="1" max="10" 
                          value={currentScore.technical} 
                          onChange={(e) => handleScoreChange(assign.id, 'technical', parseInt(e.target.value))}
                          className="w-full accent-tuk-gold cursor-pointer"
                        />
                      </div>

                      {/* Impact */}
                      <div>
                        <div className="flex justify-between items-end mb-4">
                          <div>
                            <div className="font-bold text-lg mb-1 flex items-center gap-2"><MapPin size={18} className="text-green-400"/> Local Impact</div>
                            <div className="text-sm text-muted-foreground">How well does this solve a real problem in Kenya?</div>
                          </div>
                          <div className="text-3xl font-bold text-tuk-gold">{currentScore.impact}<span className="text-lg text-muted-foreground">/10</span></div>
                        </div>
                        <input 
                          type="range" min="1" max="10" 
                          value={currentScore.impact} 
                          onChange={(e) => handleScoreChange(assign.id, 'impact', parseInt(e.target.value))}
                          className="w-full accent-tuk-gold cursor-pointer"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <div className="font-bold text-lg mb-1 flex items-center gap-2"><MessageSquare size={18} className="text-pink-400"/> Feedback</div>
                      <div className="text-sm text-muted-foreground mb-4">Provide constructive comments for the team.</div>
                      
                      <textarea 
                        className="form-input flex-1 w-full min-h-[150px] resize-y mb-6" 
                        placeholder="Great use of Supabase! Consider improving the..."
                        value={currentScore.feedback}
                        onChange={(e) => handleScoreChange(assign.id, 'feedback', e.target.value)}
                      />

                      <button 
                        onClick={() => handleSubmitScore(assign.id)}
                        disabled={submitting}
                        className="btn btn-primary w-full py-4 text-lg"
                      >
                        {submitting ? 'Submitting Score...' : 'Submit Final Score'}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      )}
    </div>
  );
}
