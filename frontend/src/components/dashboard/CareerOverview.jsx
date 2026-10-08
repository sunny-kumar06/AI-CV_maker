import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../ui/Card';
import Button from '../ui/Button';

const CareerOverview = ({ profile }) => {
  const navigate = useNavigate();

  const isAnalyzed = Boolean(profile && profile.readinessScore?.overall > 0);
  const targetRole = isAnalyzed ? (profile?.targetRole || 'Software Engineer') : 'Not Set';
  const explanation = isAnalyzed
    ? (profile?.readinessScore?.breakdownReason || 'Career profile generated.')
    : 'Upload your resume to perform AI career analysis and generate a personalized readiness score.';
  const level = isAnalyzed ? (profile?.roadmap?.currentLevel || 'Intermediate') : 'Not Assessed';
  const readiness = isAnalyzed ? `${profile.readinessScore.overall}% Ready` : 'Not Analyzed';

  return (
    <Card className="career-overview-card">
      <div className="card-header-flex">
        <div>
          <span className="card-kicker">Target Career</span>
          <h2 className="overview-title">{targetRole}</h2>
        </div>
        <Button variant="secondary" size="sm" icon="sparkles" onClick={() => navigate('/advisor')}>
          {isAnalyzed ? 'Update Goal' : 'Set Goal'}
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
          <span className="stat-value readiness-tag">{readiness}</span>
        </div>
        <div className="stat-pill">
          <span className="stat-label">Target Role</span>
          <span className="stat-value role-tag">{targetRole}</span>
        </div>
      </div>

      <Button variant="primary" fullWidth icon="arrowRight" iconPosition="right" onClick={() => navigate('/advisor')}>
        {isAnalyzed ? 'Run New Career Analysis' : 'Upload Resume & Analyze'}
      </Button>
    </Card>
  );
};

export default CareerOverview;
