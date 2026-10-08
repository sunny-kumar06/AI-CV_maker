import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import PageHeader from '../components/ui/PageHeader';
import { Card, Badge, ProgressBar } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import Icon from '../components/Icon';
import { LoadingState } from '../components/ui/StateViews';
import { useCareerProfile } from '../context/career.context';
import { updateUserProgress } from '../features/career/services/career.api';

const ProgressPage = () => {
  const navigate = useNavigate();
  const { progress, setProgress, loading, hasProfile } = useCareerProfile();

  const [saving, setSaving] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  const [newProject, setNewProject] = useState('');

  const handleUpdatePercentage = (skillName, newPct) => {
    if (!progress) return;
    const updatedSkills = (progress.skillProgress || []).map(s => {
      if (s.skill === skillName) {
        const pct = Math.min(100, Math.max(0, Number(newPct)));
        const status = pct === 100 ? 'COMPLETED' : pct > 0 ? 'IN_PROGRESS' : 'NOT_STARTED';
        return { ...s, percentage: pct, status };
      }
      return s;
    });
    const updated = { ...progress, skillProgress: updatedSkills };
    if (setProgress) setProgress(updated);
  };

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (!newSkill.trim() || !progress) return;
    const exists = (progress.skillProgress || []).some(s => s.skill.toLowerCase() === newSkill.trim().toLowerCase());
    if (exists) {
      alert("Skill already being tracked");
      return;
    }
    const updatedSkills = [...(progress.skillProgress || []), { skill: newSkill.trim(), percentage: 0, status: 'NOT_STARTED' }];
    const updated = { ...progress, skillProgress: updatedSkills };
    if (setProgress) setProgress(updated);
    setNewSkill('');
  };

  const handleAddProject = (e) => {
    e.preventDefault();
    if (!newProject.trim() || !progress) return;
    const updatedProjects = [...(progress.completedProjects || []), newProject.trim()];
    const updated = { ...progress, completedProjects: updatedProjects };
    if (setProgress) setProgress(updated);
    setNewProject('');
  };

  const handleSaveProgress = async () => {
    if (!progress) return;
    try {
      setSaving(true);
      await updateUserProgress({
        skillProgress: progress.skillProgress,
        completedProjects: progress.completedProjects,
        completedTopics: progress.completedTopics,
        roadmapWeeksCompleted: progress.roadmapWeeksCompleted,
        interviewPracticeCount: progress.interviewPracticeCount
      });
      alert("Learning progress saved successfully to Database!");
    } catch (err) {
      console.error(err);
      alert("Failed to save progress.");
    } finally {
      setSaving(false);
    }
  };

  const skillsTracked = progress?.skillProgress?.length || 0;
  const projectsCompleted = progress?.completedProjects?.length || 0;
  const weeksDone = progress?.roadmapWeeksCompleted?.length || 0;
  const interviewSessions = progress?.interviewPracticeCount || 0;

  return (
    <div className="app-layout">
      <Navbar />
      <main className="page-container">
        <PageHeader
          breadcrumb="Growth & Milestone Tracking"
          title="Learning Progress"
          description="Track your technical skill percentages, roadmap milestones, and built projects."
          action={
            hasProfile ? (
              <Button variant="primary" icon="save" loading={saving} onClick={handleSaveProgress}>
                Save Progress to Database
              </Button>
            ) : null
          }
        />

        {loading ? (
          <LoadingState title="Loading Learning Progress..." message="Fetching tracked skills and project milestones." />
        ) : !hasProfile ? (
          <Card style={{ padding: '48px 24px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--color-light-indigo)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-primary)', fontSize: '28px' }}>
              <Icon name="award" />
            </div>
            <div>
              <h2 style={{ fontSize: '22px', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '8px' }}>
                No Career Progress Tracked Yet
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', maxWidth: '480px', margin: '0 auto', lineHeight: '1.5' }}>
                Your career progress will appear here after your first career analysis. Upload your resume to begin tracking your learning milestones.
              </p>
            </div>
            <Button
              variant="primary"
              size="lg"
              icon="sparkles"
              onClick={() => navigate('/advisor')}
              style={{ marginTop: '8px' }}
            >
              Upload Resume
            </Button>
          </Card>
        ) : (
          <>
            {/* Overview Stats Cards */}
            <div className="grid-cols-4" style={{ marginBottom: '32px' }}>
              <Card elevated>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '600' }}>Skills Tracked</div>
                <div style={{ fontSize: '28px', fontWeight: '800', color: 'var(--accent-primary)', marginTop: '4px' }}>
                  {skillsTracked}
                </div>
              </Card>

              <Card elevated>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '600' }}>Projects Completed</div>
                <div style={{ fontSize: '28px', fontWeight: '800', color: 'var(--color-success)', marginTop: '4px' }}>
                  {projectsCompleted}
                </div>
              </Card>

              <Card elevated>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '600' }}>Roadmap Progress</div>
                <div style={{ fontSize: '28px', fontWeight: '800', color: 'var(--accent-cyan)', marginTop: '4px' }}>
                  {weeksDone} Weeks Done
                </div>
              </Card>

              <Card elevated>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '600' }}>Interview Practice</div>
                <div style={{ fontSize: '28px', fontWeight: '800', color: 'var(--color-warning)', marginTop: '4px' }}>
                  {interviewSessions} Sessions
                </div>
              </Card>
            </div>

            {/* Tracked Technical Skills */}
            <Card style={{ marginBottom: '32px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px', color: 'var(--text-primary)' }}>
                Tracked Technical Skills & Proficiency
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
                {(progress?.skillProgress || []).length === 0 ? (
                  <p style={{ color: 'var(--text-muted)' }}>No skills currently tracked. Add a skill below or run AI Career Analysis!</p>
                ) : (
                  progress.skillProgress.map((item, idx) => (
                    <div key={idx} style={{ background: 'var(--bg-elevated)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)' }}>{item.skill}</span>
                          <Badge variant={item.percentage === 100 ? "success" : item.percentage > 0 ? "info" : "neutral"} size="sm">
                            {item.status}
                          </Badge>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--accent-primary)' }}>{item.percentage}%</span>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={item.percentage}
                            onChange={(e) => handleUpdatePercentage(item.skill, e.target.value)}
                            style={{ width: '130px', cursor: 'pointer', accentColor: 'var(--accent-primary)' }}
                          />
                        </div>
                      </div>

                      <ProgressBar value={item.percentage} color={item.percentage === 100 ? 'var(--color-success)' : 'var(--accent-primary)'} height={8} />
                    </div>
                  ))
                )}
              </div>

              {/* Add Skill Form */}
              <form onSubmit={handleAddSkill} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: '240px' }}>
                  <Input
                    placeholder="Add a new skill to track (e.g. Docker, AWS, System Design)..."
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                  />
                </div>
                <Button type="submit" variant="secondary" icon="plus">
                  Add Skill
                </Button>
              </form>
            </Card>

            {/* Completed Portfolio Projects */}
            <Card>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: 'var(--text-primary)' }}>
                Completed Portfolio Projects
              </h3>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
                {(progress?.completedProjects || []).length === 0 ? (
                  <p style={{ color: 'var(--text-muted)' }}>No completed projects listed yet.</p>
                ) : (
                  progress.completedProjects.map((proj, idx) => (
                    <Badge key={idx} variant="success" size="md">
                      ✓ {proj}
                    </Badge>
                  ))
                )}
              </div>

              <form onSubmit={handleAddProject} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: '240px' }}>
                  <Input
                    placeholder="Add completed project title..."
                    value={newProject}
                    onChange={(e) => setNewProject(e.target.value)}
                  />
                </div>
                <Button type="submit" variant="secondary" icon="plus">
                  Add Project
                </Button>
              </form>
            </Card>
          </>
        )}
      </main>
    </div>
  );
};

export default ProgressPage;
