import React from 'react';
import { Card, ProgressBar } from '../ui/Card';
import Icon from '../Icon';

const ReadinessSummary = ({ readiness }) => {
  const data = readiness || {
    overall: 72,
    skillMatch: 75,
    resumeQuality: 75,
    interviewReadiness: 68
  };

  const metrics = [
    {
      id: 'overall',
      label: 'Career Readiness',
      score: data.overall || 72,
      trend: '+12%',
      color: '#10B981',
      iconBg: '#10B981',
      icon: 'target',
      status: 'Job-ready evaluation'
    },
    {
      id: 'skill',
      label: 'Skill Match',
      score: data.skillMatch || 75,
      trend: '+0%',
      color: '#34D399',
      iconBg: '#059669',
      icon: 'checkCircle',
      status: 'Target role alignment'
    },
    {
      id: 'resume',
      label: 'Resume Quality',
      score: data.resumeQuality || 75,
      trend: '+10%',
      color: '#3B82F6',
      iconBg: '#2563EB',
      icon: 'file',
      status: 'ATS optimization rating'
    },
    {
      id: 'interview',
      label: 'Interview Readiness',
      score: data.interviewReadiness || 68,
      trend: '+5%',
      color: '#F59E0B',
      iconBg: '#D97706',
      icon: 'award',
      status: 'Tech & behavioral prep level'
    }
  ];

  return (
    <div className="kpi-summary-grid">
      {metrics.map((metric) => (
        <Card key={metric.id} className={`kpi-metric-card kpi-card-${metric.id}`}>
          <div className="kpi-top-row">
            <div className="kpi-icon-badge" style={{ backgroundColor: metric.iconBg, color: '#FFFFFF' }}>
              <Icon name={metric.icon} />
            </div>
            <span className="kpi-label">{metric.label}</span>
          </div>

          <div className="kpi-value-row">
            <span className="kpi-number" style={{ color: metric.color }}>
              {metric.score}%
            </span>
            <span className="kpi-trend-pill" style={{ color: metric.color }}>
              {metric.trend}
            </span>
          </div>

          <div className="kpi-desc-text">{metric.status}</div>

          <div className="kpi-progress-wrap">
            <ProgressBar value={metric.score} color={metric.color} height={6} />
          </div>
        </Card>
      ))}
    </div>
  );
};

export default ReadinessSummary;
