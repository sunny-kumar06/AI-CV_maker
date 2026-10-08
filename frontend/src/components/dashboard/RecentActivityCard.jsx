import React from 'react';
import { Card } from '../ui/Card';
import Icon from '../Icon';

const RecentActivityCard = ({ progress, profile }) => {
  const activities = [];

  if (profile?.updatedAt) {
    activities.push({
      id: 'profile_update',
      title: 'Career Analysis Completed',
      subtitle: `Target role: ${profile.targetRole || 'Software Engineer'}`,
      timestamp: profile.updatedAt,
      icon: 'sparkles',
      color: '#4F46E5'
    });
  }

  if (progress?.interviewPracticeCount && progress.interviewPracticeCount > 0) {
    activities.push({
      id: 'interview_prep',
      title: 'Interview Preparation Session',
      subtitle: `${progress.interviewPracticeCount} session(s) completed`,
      timestamp: progress.updatedAt || profile?.updatedAt,
      icon: 'interview',
      color: '#F59E0B'
    });
  }

  if (progress?.completedTopics && progress.completedTopics.length > 0) {
    activities.push({
      id: 'topic_completed',
      title: 'Roadmap Skill Topics Mastered',
      subtitle: `${progress.completedTopics.length} topic(s) completed`,
      timestamp: progress.updatedAt,
      icon: 'checkCircle',
      color: '#10B981'
    });
  }

  if (progress?.completedProjects && progress.completedProjects.length > 0) {
    activities.push({
      id: 'project_completed',
      title: 'Portfolio Project Finished',
      subtitle: `${progress.completedProjects.length} project(s) added`,
      timestamp: progress.updatedAt,
      icon: 'award',
      color: '#06B6D4'
    });
  }

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Card className="recent-activity-card">
      <div className="card-header-block">
        <h3 className="section-card-title">Recent Activity</h3>
        <p className="section-sub-text">
          Audit trail of your verified learning & career achievements.
        </p>
      </div>

      {activities.length === 0 ? (
        <div className="empty-activity-state">
          <Icon name="clock" className="empty-icon" />
          <p className="empty-text">No recent activity recorded.</p>
          <span className="empty-subtext">Perform your first analysis or practice session to build your activity history.</span>
        </div>
      ) : (
        <div className="activity-timeline-list">
          {activities.map((item) => (
            <div key={item.id} className="timeline-item">
              <div className="timeline-icon-box" style={{ color: item.color, backgroundColor: `${item.color}15` }}>
                <Icon name={item.icon} />
              </div>

              <div className="timeline-content">
                <div className="timeline-title-row">
                  <h4 className="timeline-title">{item.title}</h4>
                  <span className="timeline-date">{formatDate(item.timestamp)}</span>
                </div>
                <p className="timeline-subtitle">{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default RecentActivityCard;

