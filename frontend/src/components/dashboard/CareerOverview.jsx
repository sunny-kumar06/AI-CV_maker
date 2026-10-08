import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../ui/Card';
import Button from '../ui/Button';

const CareerOverview = ({ profile }) => {
  const navigate = useNavigate();

  const targetRole = profile?.targetRole || 'Full Stack Developer';
  const explanation = profile?.readinessScore?.breakdownReason ||
    'Solid foundation in core engineering. Focus on system design and deployment to maximize job readiness.';
  const level = profile?.roadmap?.currentLevel || 'Intermediate';
  const readiness = profile?.readinessScore?.overall || 75;

  return (
    <Card className="career-overview-card">
      <div className="card-header-flex">
        <div>
          <span className="card-kicker">Target Career</span>
          <h2 className="overview-title">{targetRole}</h2>
        </div>
        <Button variant="secondary" size="sm" icon="sparkles" onClick={() => navigate('/advisor')}>
          Update Goal
        </Button>
      </div>

      <p className="overview-description">{explanation}</p>

      <div className="overview-stats-row">
        <div className="stat-pill">
          <span className="stat-label">Assessed Level</span>
          <span className="stat-value level-tag">{level}</span>
        </div>
        <div className="stat-pill">
          <span className="stat-label">Current Readiness</span>
          <span className="stat-value readiness-tag">{readiness}% Ready</span>
        </div>
        <div className="stat-pill">
          <span className="stat-label">Target Role</span>
          <span className="stat-value role-tag">{targetRole}</span>
        </div>
      </div>

      <Button variant="primary" fullWidth icon="arrowRight" iconPosition="right" onClick={() => navigate('/advisor')}>
        Run New Career Analysis
      </Button>
    </Card>
  );
};

export default CareerOverview;
