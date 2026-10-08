import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import PageHeader from '../components/ui/PageHeader';
import { Card, Badge, ProgressBar } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { LoadingState } from '../components/ui/StateViews';
import { getCareerProfile, getUserProgress, updateUserProgress } from '../features/career/services/career.api';

const CareerRoadmapPage = () => {
  const [profile, setProfile] = useState(null);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [profRes, progRes] = await Promise.all([
          getCareerProfile().catch(() => ({ careerProfile: null })),
          getUserProgress().catch(() => ({ progress: null }))
        ]);
        setProfile(profRes.careerProfile);
        setProgress(progRes.progress);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const toggleWeekCompleted = async (weekNum) => {
    if (!progress) return;
    const currentCompleted = progress.roadmapWeeksCompleted || [];
    let updated;
    if (currentCompleted.includes(weekNum)) {
      updated = currentCompleted.filter(w => w !== weekNum);
    } else {
      updated = [...currentCompleted, weekNum];
    }
    const newProg = { ...progress, roadmapWeeksCompleted: updated };
    setProgress(newProg);
    await updateUserProgress({ roadmapWeeksCompleted: updated });
  };

  const roadmap = profile?.roadmap || {
    careerGoal: 'Full Stack Developer',
    currentLevel: 'Intermediate',
    weeklyPlan: [
      { week: 1, title: 'Advanced React & Architecture', topics: ['Custom Hooks & Context API', 'Code-splitting & Lazy Loading', 'React Performance Optimization'], projectGoal: 'Modular Component Library' },
      { week: 2, title: 'Backend Security & Architecture', topics: ['REST API Best Practices', 'JWT & Security Middleware', 'Input Validation & Error Handling'], projectGoal: 'Secure Authentication Service' },
      { week: 3, title: 'Docker & Production Deployment', topics: ['Containerization with Docker', 'Docker Compose Setup', 'Render & Vercel Deployment'], projectGoal: 'Containerized App Suite' },
      { week: 4, title: 'System Design & Technical Prep', topics: ['Scalability & Caching (Redis)', 'Database Indexing & Queries', 'Mock Technical Interviews'], projectGoal: 'Production Capstone Platform' }
    ],
    suggestedProjects: [
      { title: 'E-Commerce Microservices', description: 'Full stack shopping app with cart and payment integration.', techStack: ['React', 'Node.js', 'MongoDB'] },
      { title: 'Real-Time Collaboration Tool', description: 'WebSocket-powered messaging platform.', techStack: ['React', 'Socket.io', 'Express'] },
      { title: 'Production REST API Suite', description: 'Microservice backend with rate limiting & JWT auth.', techStack: ['Node.js', 'Express', 'Docker'] }
    ]
  };

  const completedWeeks = progress?.roadmapWeeksCompleted || [];
  const roadmapProgressPct = Math.round((completedWeeks.length / (roadmap.weeklyPlan?.length || 4)) * 100);

  return (
    <div className="app-layout">
      <Navbar />
      <main className="page-container">
        <PageHeader
          breadcrumb="Personalized Action Plan"
          title="Personalized Career Roadmap"
          description="Your step-by-step path from current skills to job readiness."
        />

        {loading ? (
          <LoadingState title="Loading Career Roadmap..." message="Structuring your week-by-week learning goals." />
        ) : (
          <>
            {/* Overview Stats */}
            <div className="grid-cols-3" style={{ marginBottom: '32px' }}>
              <Card elevated>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '600' }}>Target Career Goal</div>
                <div style={{ fontSize: '22px', fontWeight: '800', color: 'var(--accent-primary)', marginTop: '4px' }}>
                  {roadmap.careerGoal}
                </div>
              </Card>

              <Card elevated>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '600' }}>Current Assessed Level</div>
                <div style={{ fontSize: '22px', fontWeight: '800', color: 'var(--accent-secondary)', marginTop: '4px' }}>
                  {roadmap.currentLevel}
                </div>
              </Card>

              <Card elevated>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '600' }}>Roadmap Completion</div>
                <div style={{ fontSize: '22px', fontWeight: '800', color: 'var(--color-success)', marginTop: '4px', marginBottom: '8px' }}>
                  {roadmapProgressPct}% Complete
                </div>
                <ProgressBar value={roadmapProgressPct} color="var(--color-success)" height={6} />
              </Card>
            </div>

            {/* Step-by-Step 4-Week Action Plan */}
            <Card style={{ marginBottom: '32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'var(--text-primary)' }}>4-Week Action Learning Plan</h3>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Mark off milestones as you complete topics and weekly project goals.</p>
                </div>
                <Badge variant="info">{completedWeeks.length} of 4 Weeks Done</Badge>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {(roadmap.weeklyPlan || []).map((week, idx) => {
                  const isDone = completedWeeks.includes(week.week);
                  return (
                    <div
                      key={idx}
                      style={{
                        background: isDone ? 'var(--color-success-bg)' : 'var(--bg-elevated)',
                        border: `1px solid ${isDone ? 'var(--color-success-border)' : 'var(--border-color)'}`,
                        borderRadius: '12px',
                        padding: '20px'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <span style={{ background: 'var(--accent-primary)', color: '#FFFFFF', padding: '4px 10px', borderRadius: '6px', fontWeight: '700', fontSize: '12px' }}>
                            Week {week.week}
                          </span>
                          <h4 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text-primary)' }}>
                            {week.title}
                          </h4>
                        </div>
                        <Button
                          variant={isDone ? "secondary" : "primary"}
                          size="sm"
                          icon={isDone ? "check" : "plus"}
                          onClick={() => toggleWeekCompleted(week.week)}
                        >
                          {isDone ? "Completed" : "Mark Complete"}
                        </Button>
                      </div>

                      <div style={{ marginBottom: '12px' }}>
                        <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '600', marginBottom: '6px' }}>Topics & Objectives:</div>
                        <ul style={{ paddingLeft: '18px', color: 'var(--text-secondary)', fontSize: '13px' }}>
                          {(week.topics || []).map((t, tidx) => (
                            <li key={tidx} style={{ marginBottom: '4px' }}>{t}</li>
                          ))}
                        </ul>
                      </div>

                      {week.projectGoal && (
                        <div style={{ background: 'var(--color-light-indigo)', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-color)', fontSize: '13px', color: 'var(--accent-primary)' }}>
                          🎯 <strong style={{ color: 'var(--text-primary)' }}>Milestone Project Goal:</strong> {week.projectGoal}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* Milestone Projects Grid */}
            <Card>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: 'var(--text-primary)' }}>
                Hands-On Portfolio Projects to Build
              </h3>
              <div className="grid-cols-3">
                {(roadmap.suggestedProjects || []).map((proj, idx) => (
                  <div key={idx} style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-color)', padding: '16px', borderRadius: '12px' }}>
                    <h4 style={{ fontSize: '15px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '6px' }}>{proj.title}</h4>
                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '12px' }}>{proj.description}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {(proj.techStack || []).map((tech, tidx) => (
                        <Badge key={tidx} variant="info" size="sm">{tech}</Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </>
        )}
      </main>
    </div>
  );
};

export default CareerRoadmapPage;
