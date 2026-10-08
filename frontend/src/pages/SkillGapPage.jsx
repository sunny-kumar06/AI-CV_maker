import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import PageHeader from '../components/ui/PageHeader';
import { Card, Badge } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Icon from '../components/Icon';
import { LoadingState } from '../components/ui/StateViews';
import { useCareerProfile } from '../context/career.context';

const SkillGapPage = () => {
  const navigate = useNavigate();
  const { profile, loading, hasProfile } = useCareerProfile();

  const skills = profile?.skills || { matched: [], missing: [], partial: [], recommended: [] };
  const prioritySkills = profile?.prioritySkills || [];

  return (
    <div className="app-layout">
      <Navbar />
      <main className="page-container">
        <PageHeader
          breadcrumb="Skills Assessment & Gap Matrix"
          title="Skill Gap Analysis"
          description="Understand what you already know, what you're missing, and what to learn next."
        />

        {loading ? (
          <LoadingState title="Analyzing Skill Gap Matrix..." message="Gathering candidate skill match ratings and priority rankings." />
        ) : !hasProfile ? (
          <Card style={{ padding: '48px 24px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--color-light-indigo)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-primary)', fontSize: '28px' }}>
              <Icon name="checkCircle" />
            </div>
            <div>
              <h2 style={{ fontSize: '22px', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '8px' }}>
                No Skill Gap Analysis Yet
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', maxWidth: '480px', margin: '0 auto', lineHeight: '1.5' }}>
                Upload your resume to let AI compare your current skills with your target role.
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
          <div className="grid-cols-2">
            {/* LEFT: SKILL MATRIX BY CATEGORY */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <Card>
                <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: 'var(--text-primary)' }}>
                  Skill Classification Matrix
                </h3>

                <div style={{ marginBottom: '20px' }}>
                  <h4 style={{ fontSize: '13px', color: 'var(--color-success)', fontWeight: '600', marginBottom: '8px' }}>
                    MATCHED SKILLS ({skills.matched?.length || 0})
                  </h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {(skills.matched || []).length === 0 ? (
                      <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>No matched skills extracted yet.</span>
                    ) : (
                      skills.matched.map((s, idx) => (
                        <Badge key={idx} variant="success">{s}</Badge>
                      ))
                    )}
                  </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <h4 style={{ fontSize: '13px', color: 'var(--color-danger)', fontWeight: '600', marginBottom: '8px' }}>
                    MISSING SKILLS ({skills.missing?.length || 0})
                  </h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {(skills.missing || []).length === 0 ? (
                      <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>No critical missing skills.</span>
                    ) : (
                      skills.missing.map((s, idx) => (
                        <Badge key={idx} variant="danger">{s}</Badge>
                      ))
                    )}
                  </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <h4 style={{ fontSize: '13px', color: 'var(--color-warning)', fontWeight: '600', marginBottom: '8px' }}>
                    PARTIALLY MATCHED ({skills.partial?.length || 0})
                  </h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {(skills.partial || []).length === 0 ? (
                      <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>No partial skill matches.</span>
                    ) : (
                      skills.partial.map((s, idx) => (
                        <Badge key={idx} variant="warning">{s}</Badge>
                      ))
                    )}
                  </div>
                </div>

                <div>
                  <h4 style={{ fontSize: '13px', color: 'var(--accent-cyan)', fontWeight: '600', marginBottom: '8px' }}>
                    RECOMMENDED INDUSTRY SKILLS ({skills.recommended?.length || 0})
                  </h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {(skills.recommended || []).length === 0 ? (
                      <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>No recommended skills listed.</span>
                    ) : (
                      skills.recommended.map((s, idx) => (
                        <Badge key={idx} variant="info">{s}</Badge>
                      ))
                    )}
                  </div>
                </div>
              </Card>
            </div>

            {/* RIGHT: PRIORITY SKILL ENGINE */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <Card>
                <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '4px', color: 'var(--text-primary)' }}>
                  Ranked Priority Skill Engine
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginBottom: '20px' }}>
                  Skills are ranked by priority (HIGH / MEDIUM / LOW) based on frequency in target job specifications.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {prioritySkills.length === 0 ? (
                    <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>No priority skill items generated yet.</p>
                  ) : (
                    prioritySkills.map((item, idx) => (
                      <div key={idx} style={{ background: 'var(--bg-elevated)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                          <span style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text-primary)' }}>{item.skill}</span>
                          <Badge variant={(item.priority || 'medium').toLowerCase() === 'high' ? 'danger' : 'warning'}>
                            {item.priority || 'MEDIUM'} PRIORITY
                          </Badge>
                        </div>

                        <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginBottom: '8px' }}>
                          <strong style={{ color: 'var(--text-primary)' }}>Why Required:</strong> {item.reason}
                        </p>

                        {item.learningPath && (
                          <div style={{ marginBottom: '8px', fontSize: '12px', color: 'var(--accent-cyan)' }}>
                            🛠️ <strong style={{ color: 'var(--text-primary)' }}>Recommended Path:</strong> {item.learningPath}
                          </div>
                        )}

                        {item.suggestedProject && (
                          <div style={{ background: 'var(--color-light-indigo)', padding: '8px 12px', borderRadius: '8px', fontSize: '12px', color: 'var(--accent-primary)', border: '1px solid var(--border-color)' }}>
                            💡 <strong style={{ color: 'var(--text-primary)' }}>Suggested Project:</strong> {item.suggestedProject}
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </Card>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default SkillGapPage;
