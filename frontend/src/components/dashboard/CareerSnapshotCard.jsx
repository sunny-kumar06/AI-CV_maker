import React from 'react';
import { Card } from '../ui/Card';

const CareerSnapshotCard = ({ profile }) => {
  const targetRole = profile?.targetRole || 'Full Stack Developer';
  const experienceLevel = profile?.roadmap?.currentLevel || profile?.experienceLevel || 'Junior';
  const matchedCount = profile?.skills?.matched?.length || 5;
  const gapCount = profile?.skills?.missing?.length || 4;
  const statusText = 'Improving';

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
          <span className="item-value text-success">{matchedCount}</span>
        </div>
        <div className="snapshot-item">
          <span className="item-label">Critical Gaps</span>
          <span className="item-value text-danger">{gapCount}</span>
        </div>
      </div>
    </Card>
  );
};

export default CareerSnapshotCard;

