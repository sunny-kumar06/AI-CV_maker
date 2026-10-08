import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, ProgressBar } from '../ui/Card';
import Button from '../ui/Button';
import Icon from '../Icon';

const CareerGoalCard = ({ profile }) => {
  const navigate = useNavigate();

  const targetRole = profile?.targetRole || profile?.careerOverview?.targetRole || 'Full Stack Developer';
  const assessedLevel = profile?.roadmap?.currentLevel || profile?.experienceLevel || 'Junior';
  const currentReadiness = profile?.readinessScore?.overall || 72;
  const matchedSkillsCount = profile?.skills?.matched?.length || 5;
  const missingSkillsCount = profile?.skills?.missing?.length || 4;
  const guidanceText = profile?.readinessScore?.breakdownReason ||
    "You are progressing steadily toward your target position. Mastering critical framework fundamentals and completing 1-2 full-stack projects will significantly boost your candidate profile.";

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
