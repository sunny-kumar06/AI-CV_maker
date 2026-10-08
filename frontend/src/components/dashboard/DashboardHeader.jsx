import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../features/auth/hooks/useAuth';
import Icon from '../Icon';
import Button from '../ui/Button';

const DashboardHeader = ({ profile, onAnalyzeClick }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleAction = () => {
    if (onAnalyzeClick) {
      onAnalyzeClick();
    } else {
      navigate('/advisor');
    }
  };

  const username = user?.username ? user.username : 'Candidate';

  const formattedLastAnalyzed = profile?.updatedAt
    ? new Date(profile.updatedAt).toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    : null;

  return (
    <div className="dashboard-hero-header">
      <div className="hero-banner-content">
        <div className="hero-meta">
          <div className="hero-eyebrow-row">
            <span className="hero-eyebrow">CAREERAI COMMAND CENTER</span>
            {formattedLastAnalyzed && (
              <span className="last-analyzed-badge">
                <Icon name="clock" />
                <span>Last analyzed: {formattedLastAnalyzed}</span>
              </span>
            )}
          </div>
          <h1 className="hero-title">Hello, {username} 👋</h1>
          <p className="hero-subtitle">Your AI-powered career companion</p>
        </div>

        <div className="hero-right-quote-block">
          <p className="quote-text">"Discipline today, dream job tomorrow."</p>
          <Button
            variant="primary"
            size="md"
            icon="sparkles"
            onClick={handleAction}
            className="run-analysis-btn"
          >
            Run New Career Analysis
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
