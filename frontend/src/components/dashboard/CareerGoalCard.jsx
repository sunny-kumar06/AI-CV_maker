import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, ProgressBar } from '../ui/Card';
import Button from '../ui/Button';
import Icon from '../Icon';

const CareerGoalCard = ({ profile }) => {
  const navigate = useNavigate();

  const isAnalyzed = Boolean(
    profile && (profile.readinessScore?.overall > 0 || profile.skills?.matched?.length > 0)
  );

  if (!isAnalyzed) {
    return (
      <Card className="career-goal-card onboarding-card">
        <div className="goal-card-content onboarding-content" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="goal-eyebrow-tag" style={{ background: 'var(--color-light-indigo)', color: 'var(--accent-primary)', padding: '4px 10px', borderRadius: '6px', width: 'fit-content', fontWeight: '700', fontSize: '11px' }}>
            GET STARTED WITH CAREERAI
          </div>
          <div>
            <h2 className="goal-target-title" style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '6px' }}>
              Welcome to CareerAI 👋
            </h2>
            <h3 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--accent-primary)', marginBottom: '10px' }}>
              Let's build your personalized career profile.
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.5', maxWidth: '560px' }}>
              Upload your resume and let CareerAI analyze your skills, experience and career direction to generate personalized readiness metrics, skill gap breakdown, and roadmap.
            </p>
          </div>

          <div className="goal-btn-group" style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
            <Button
              variant="primary"
              size="md"
              icon="sparkles"
              onClick={() => navigate('/advisor')}
            >
              Upload Resume
            </Button>
            <Button
              variant="secondary"
              size="md"
              icon="arrowRight"
              onClick={() => {
                const elem = document.querySelector('.activity-modules-grid');
                if (elem) elem.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Explore CareerAI
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  const targetRole = profile?.targetRole || 'Software Engineer';
  const assessedLevel = profile?.roadmap?.currentLevel || 'Intermediate';
  const currentReadiness = profile?.readinessScore?.overall || 0;
  const matchedSkillsCount = profile?.skills?.matched?.length || 0;
  const missingSkillsCount = profile?.skills?.missing?.length || 0;
  const guidanceText = profile?.readinessScore?.breakdownReason ||
    "Your career analysis is active. Review your missing skills and practice interview questions to increase readiness.";

  return (
    <Card className="career-goal-card">
      <div className="goal-card-content">
        {/* LEFT COLUMN: Profile overview & details */}
        <div className="goal-info-side">
          <div className="goal-eyebrow-tag">CURRENT CAREER GOAL</div>
          <h2 className="goal-target-title">{targetRole}</h2>

          <div className="goal-meta-grid">
            <div className="meta-pill-item">
              <span className="pill-label">Assessed Level</span>
              <span className="pill-val val-level">{assessedLevel}</span>
            </div>
            <div className="meta-pill-item">
              <span className="pill-label">Target Role</span>
              <span className="pill-val val-role">{targetRole}</span>
            </div>
            <div className="meta-pill-item">
              <span className="pill-label">Matched Skills</span>
              <span className="pill-val val-matched">{matchedSkillsCount} skills</span>
            </div>
            <div className="meta-pill-item">
              <span className="pill-label">Skill Gaps</span>
              <span className="pill-val val-gaps">{missingSkillsCount} skills</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Readiness & AI Guidance */}
        <div className="goal-visual-side">
          <div className="readiness-indicator-box">
            <div className="indicator-badge">
              <span className="badge-pct">{currentReadiness}%</span>
              <span className="badge-sub">Overall Readiness</span>
            </div>
            <div className="indicator-track-wrap">
              <ProgressBar value={currentReadiness} color="#3B82F6" height={8} />
            </div>
          </div>

          <p className="goal-guidance-text">
            <Icon name="sparkles" className="guidance-icon" />
            <span>{guidanceText}</span>
          </p>

          <div className="goal-btn-group">
            <Button
              variant="primary"
              size="sm"
              icon="sparkles"
              onClick={() => navigate('/advisor')}
            >
              Run New Career Analysis
            </Button>
            <Button
              variant="secondary"
              size="sm"
              icon="edit"
              onClick={() => navigate('/advisor')}
            >
              Update Goal
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CareerGoalCard;
