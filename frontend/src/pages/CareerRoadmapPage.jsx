import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import PageHeader from '../components/ui/PageHeader';
import { Card, Badge, ProgressBar } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Icon from '../components/Icon';
import { LoadingState } from '../components/ui/StateViews';
import { useCareerProfile } from '../context/career.context';
import { updateUserProgress } from '../features/career/services/career.api';

const CareerRoadmapPage = () => {
  const navigate = useNavigate();
  const { profile, progress, setProgress, loading, hasProfile } = useCareerProfile();

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
    if (setProgress) setProgress(newProg);
    await updateUserProgress({ roadmapWeeksCompleted: updated });
  };

  const roadmap = profile?.roadmap;
  const completedWeeks = progress?.roadmapWeeksCompleted || [];
  const roadmapProgressPct = roadmap?.weeklyPlan?.length
    ? Math.round((completedWeeks.length / roadmap.weeklyPlan.length) * 100)
    : 0;

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
        ) : !hasProfile || !roadmap ? (
          <Card style={{ padding: '48px 24px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--color-light-indigo)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-primary)', fontSize: '28px' }}>
              <Icon name="roadmap" />
            </div>
            <div>
              <h2 style={{ fontSize: '22px', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '8px' }}>
                Your Personalized Roadmap
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', maxWidth: '480px', margin: '0 auto', lineHeight: '1.5' }}>
                Complete your career analysis to generate a roadmap based on your actual skill gaps.
              </p>
            </div>
            <Button
              variant="primary"
              size="lg"
              icon="sparkles"
              onClick={() => navigate('/advisor')}
              style={{ marginTop: '8px' }}
            >
              Analyze My Resume
            </Button>
          </Card>
        ) : (
          <>
            {/* Overview Stats */}
            <div className="grid-cols-3" style={{ marginBottom: '32px' }}>
              <Card elevated>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '600' }}>Target Career Goal</div>
                <div style={{ fontSize: '22px', fontWeight: '800', color: 'var(--accent-primary)', marginTop: '4px' }}>
                  {roadmap.careerGoal || profile?.targetRole}
                </div>
              </Card>

              <Card elevated>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '600' }}>Current Assessed Level</div>
                <div style={{ fontSize: '22px', fontWeight: '800', color: 'var(--accent-secondary)', marginTop: '4px' }}>
                  {roadmap.currentLevel || 'Intermediate'}
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

            {/* Step-by-Step Action Plan */}
            <Card style={{ marginBottom: '32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'var(--text-primary)' }}>Weekly Learning Plan</h3>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Mark off milestones as you complete topics and weekly project goals.</p>
                </div>
                <Badge variant="info">{completedWeeks.length} of {roadmap.weeklyPlan?.length || 0} Weeks Done</Badge>
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
            {roadmap.suggestedProjects && roadmap.suggestedProjects.length > 0 && (
              <Card>
                <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: 'var(--text-primary)' }}>
                  Hands-On Portfolio Projects to Build
                </h3>
                <div className="grid-cols-3">
                  {roadmap.suggestedProjects.map((proj, idx) => (
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
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default CareerRoadmapPage;
