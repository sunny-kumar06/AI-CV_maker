import React from 'react';
import { Card } from '../ui/Card';

const CareerSnapshotCard = ({ profile }) => {
  const isAnalyzed = Boolean(profile && profile.readinessScore?.overall > 0);
  const targetRole = isAnalyzed ? (profile?.targetRole || 'Software Engineer') : 'Not Set';
  const experienceLevel = isAnalyzed ? (profile?.roadmap?.currentLevel || 'Intermediate') : 'Not Assessed';
  const matchedCount = isAnalyzed ? (profile?.skills?.matched?.length || 0) : 0;
  const gapCount = isAnalyzed ? (profile?.skills?.missing?.length || 0) : 0;
  const statusText = isAnalyzed ? 'Active Profile' : 'Pending Analysis';

  return (
    <Card className="career-snapshot-card">
      <div className="snapshot-header-row">
        <h4 className="snapshot-title">CAREER SNAPSHOT</h4>
        <span className="status-pill">{statusText}</span>
      </div>

      <div className="snapshot-metrics-grid">
        <div className="snapshot-item">
          <span className="item-label">Target Role</span>
          <span className="item-value">{targetRole}</span>
        </div>
        <div className="snapshot-item">
          <span className="item-label">Experience Level</span>
          <span className="item-value">{experienceLevel}</span>
        </div>
        <div className="snapshot-item">
          <span className="item-label">Skills Matched</span>
          <span className="item-value text-success">{isAnalyzed ? matchedCount : '--'}</span>
        </div>
        <div className="snapshot-item">
          <span className="item-label">Critical Gaps</span>
          <span className="item-value text-danger">{isAnalyzed ? gapCount : '--'}</span>
        </div>
      </div>
    </Card>
  );
};

export default CareerSnapshotCard;

