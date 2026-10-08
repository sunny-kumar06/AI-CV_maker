import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import PageHeader from '../components/ui/PageHeader';
import { Card, Badge } from '../components/ui/Card';
import { LoadingState } from '../components/ui/StateViews';
import { getCareerProfile } from '../features/career/services/career.api';

const SkillGapPage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCareerProfile()
      .then(res => {
        if (res.careerProfile) setProfile(res.careerProfile);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const skills = profile?.skills || {
    matched: ['React.js', 'Node.js', 'MongoDB', 'JavaScript', 'HTML5', 'CSS3'],
    missing: ['Docker', 'AWS', 'System Design', 'Unit Testing'],
    partial: ['TypeScript', 'GraphQL'],
    recommended: ['Redis', 'CI/CD', 'Kubernetes']
  };

  const prioritySkills = profile?.prioritySkills || [
    {
      skill: 'Docker',
      priority: 'HIGH',
      reason: 'Required for containerized production microservices and mentioned in target job description.',
      difficulty: 'Medium',
      suggestedProject: 'Containerize complete MERN app using Docker Compose.',
      learningPath: 'Docker Basics -> Dockerfile Creation -> Multi-Container Networking'
    },
    {
      skill: 'System Design',
      priority: 'HIGH',
      reason: 'Essential for technical interview performance and scalable backend architecture.',
      difficulty: 'High',
      suggestedProject: 'Design high-concurrency URL Shortener & Chat App.',
      learningPath: 'Load Balancing -> Caching Strategies -> Database Sharding'
    },
    {
      skill: 'AWS Cloud Services',
      priority: 'MEDIUM',
      reason: 'Standard cloud infrastructure environment for modern web engineering roles.',
      difficulty: 'Medium',
      suggestedProject: 'Deploy backend API on EC2/ECS with S3 media storage.',
      learningPath: 'IAM Roles -> EC2 Deployment -> S3 & CDN Integration'
    }
  ];

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
                    MATCHED SKILLS ({skills.matched.length})
                  </h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {skills.matched.map((s, idx) => (
                      <Badge key={idx} variant="success">{s}</Badge>
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <h4 style={{ fontSize: '13px', color: 'var(--color-danger)', fontWeight: '600', marginBottom: '8px' }}>
                    MISSING SKILLS ({skills.missing.length})
                  </h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {skills.missing.map((s, idx) => (
                      <Badge key={idx} variant="danger">{s}</Badge>
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <h4 style={{ fontSize: '13px', color: 'var(--color-warning)', fontWeight: '600', marginBottom: '8px' }}>
                    PARTIALLY MATCHED ({skills.partial.length})
                  </h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {skills.partial.map((s, idx) => (
                      <Badge key={idx} variant="warning">{s}</Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 style={{ fontSize: '13px', color: 'var(--accent-cyan)', fontWeight: '600', marginBottom: '8px' }}>
                    RECOMMENDED INDUSTRY SKILLS ({skills.recommended.length})
                  </h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {skills.recommended.map((s, idx) => (
                      <Badge key={idx} variant="info">{s}</Badge>
                    ))}
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
                  {prioritySkills.map((item, idx) => (
                    <div key={idx} style={{ background: 'var(--bg-elevated)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <span style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text-primary)' }}>{item.skill}</span>
                        <Badge variant={(item.priority || 'medium').toLowerCase() === 'high' ? 'danger' : 'warning'}>
                          {item.priority} PRIORITY
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
                  ))}
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
