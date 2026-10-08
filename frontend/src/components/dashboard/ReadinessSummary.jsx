import React from 'react';
import { Card, ProgressBar } from '../ui/Card';
import Icon from '../Icon';

const ReadinessSummary = ({ readiness }) => {
  const isAnalyzed = Boolean(readiness && readiness.overall > 0);

  const metrics = [
    {
      id: 'overall',
      label: 'Career Readiness',
      score: isAnalyzed ? readiness.overall : 0,
      trend: isAnalyzed ? `${readiness.overall >= 75 ? '+' : ''}${Math.round(readiness.overall / 10)}%` : '--',
      color: isAnalyzed ? '#10B981' : 'var(--text-muted)',
      iconBg: isAnalyzed ? '#10B981' : 'var(--bg-elevated)',
      icon: 'target',
      status: isAnalyzed ? 'Job-ready evaluation' : 'Upload resume to calculate'
    },
    {
      id: 'skill',
      label: 'Skill Match',
      score: isAnalyzed ? readiness.skillMatch : 0,
      trend: isAnalyzed ? 'Active' : '--',
      color: isAnalyzed ? '#34D399' : 'var(--text-muted)',
      iconBg: isAnalyzed ? '#059669' : 'var(--bg-elevated)',
      icon: 'checkCircle',
      status: isAnalyzed ? 'Target role alignment' : 'Complete career analysis'
    },
    {
      id: 'resume',
      label: 'Resume Quality',
      score: isAnalyzed ? readiness.resumeQuality : 0,
      trend: isAnalyzed ? 'ATS Checked' : '--',
      color: isAnalyzed ? '#3B82F6' : 'var(--text-muted)',
      iconBg: isAnalyzed ? '#2563EB' : 'var(--bg-elevated)',
      icon: 'file',
      status: isAnalyzed ? 'ATS optimization rating' : 'Resume upload required'
    },
    {
      id: 'interview',
      label: 'Interview Readiness',
      score: isAnalyzed ? readiness.interviewReadiness : 0,
      trend: isAnalyzed ? 'Evaluated' : '--',
      color: isAnalyzed ? '#F59E0B' : 'var(--text-muted)',
      iconBg: isAnalyzed ? '#D97706' : 'var(--bg-elevated)',
      icon: 'award',
      status: isAnalyzed ? 'Tech & behavioral prep level' : 'Complete career analysis'
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
              {isAnalyzed ? `${metric.score}%` : 'Not Analyzed'}
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
