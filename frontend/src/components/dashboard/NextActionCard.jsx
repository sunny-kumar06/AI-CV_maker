import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../ui/Card';
import Button from '../ui/Button';
import Icon from '../Icon';

const NextActionCard = ({ skills, targetRole, prioritySkills }) => {
  const navigate = useNavigate();

  const topPriorityObj = prioritySkills && prioritySkills.length > 0 ? prioritySkills[0] : null;
  const missingSkills = skills?.missing || [];
  const matchedSkills = skills?.matched || [];

  const isAnalyzed = Boolean(topPriorityObj || missingSkills.length > 0 || matchedSkills.length > 0);

  let actionTitle = 'Upload Your Resume';
  let whyReason = 'Upload your resume to unlock AI-powered skill gap evaluation, personalized career roadmap, and job recommendations.';
  let impactLevel = 'High Priority';
  let recommendedEffort = '1-2 mins';
  let btnText = 'Upload Resume';
  let targetPath = '/advisor';

  if (topPriorityObj) {
    actionTitle = `Master ${topPriorityObj.skill}`;
    if (topPriorityObj.reason) whyReason = topPriorityObj.reason;
    if (topPriorityObj.priority) impactLevel = topPriorityObj.priority === 'HIGH' ? 'High Impact' : 'Medium Impact';
    recommendedEffort = '3–5 days';
    btnText = 'View Skill Gap Analysis';
    targetPath = '/skill-gap';
  } else if (missingSkills.length > 0) {
    const topGaps = missingSkills.slice(0, 2).join(' and ');
    actionTitle = `Strengthen ${topGaps}`;
    whyReason = `${topGaps} are critical skill gaps for your target ${targetRole || 'Software Engineer'} role.`;
    recommendedEffort = '3–5 days';
    btnText = 'View Skill Gap Analysis';
    targetPath = '/skill-gap';
  }

  return (
    <Card className="next-action-card">
      <div className="next-action-content">
        <div className="next-action-header-row">
          <span className="next-action-kicker">NEXT BEST ACTION</span>
          <span className="priority-pill">
            <Icon name="zap" />
            <span>{impactLevel}</span>
          </span>
        </div>

        <h3 className="next-action-title">{actionTitle}</h3>

        <div className="next-action-details">
          <p className="next-action-why">
            <strong className="why-label">Why: </strong>
            {whyReason}
          </p>

          <div className="next-action-metrics-row">
            <div className="action-metric-item">
              <span className="metric-lbl">Impact</span>
              <span className="metric-val text-indigo">{impactLevel}</span>
            </div>
            <div className="action-metric-divider" />
            <div className="action-metric-item">
              <span className="metric-lbl">Est. Effort</span>
              <span className="metric-val">{recommendedEffort}</span>
            </div>
          </div>
        </div>

        <div className="next-action-btn-wrap">
          <Button
            variant={isAnalyzed ? "ghost" : "primary"}
            size="sm"
            icon="arrowRight"
            iconPosition="right"
            onClick={() => navigate(targetPath)}
          >
            {btnText}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default NextActionCard;
