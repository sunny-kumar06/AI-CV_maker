import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, ProgressBar } from '../ui/Card';
import Button from '../ui/Button';
import Icon from '../Icon';

const JobRoleMatches = ({ roles }) => {
  const navigate = useNavigate();

  const hasRoles = roles && Array.isArray(roles) && roles.length > 0;
  const list = hasRoles ? roles.slice(0, 3) : [];

  return (
    <Card className="suitable-roles-card">
      <div className="card-header-block">
        <h3 className="section-card-title">Top Job Matches</h3>
        <p className="section-sub-text">
          Target roles evaluated against your current skill profile.
        </p>
      </div>

      {!hasRoles ? (
        <div className="empty-roles-state">
          <Icon name="jobMatch" className="empty-icon" />
          <p className="empty-title">No job recommendations yet</p>
          <p className="empty-desc">
            Complete your career analysis or upload your target job description to see compatibility scores.
          </p>
          <Button variant="secondary" size="sm" onClick={() => navigate('/advisor')}>
            Run Career Analysis
          </Button>
        </div>
      ) : (
        <div className="roles-recommendation-list">
          {list.map((item, idx) => {
            const pct = item.matchPercentage || 0;
            const title = item.roleTitle || item.title || 'Software Role';
            const matchingSkills = item.matchingSkills || [];
            const color = pct >= 80 ? '#10B981' : pct >= 65 ? '#3B82F6' : '#F59E0B';

            return (
              <div key={idx} className="role-recommendation-row">
                <div className="row-left-info">
                  <div className="role-icon-box" style={{ color: color }}>
                    <Icon name="briefcase" />
                  </div>
                  <div className="role-title-desc">
                    <div className="role-title-row">
                      <h4 className="role-name">{title}</h4>
                      <span className="match-pill" style={{ color: color, borderColor: color }}>
                        {pct}% Match
                      </span>
                    </div>

                    {matchingSkills.length > 0 && (
                      <div className="matching-skills-chips">
                        <span className="matching-label">Matching:</span>
                        {matchingSkills.slice(0, 3).map((sk, sIdx) => (
                          <span key={sIdx} className="mini-skill-chip">{sk}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="row-right-match">
                  <ProgressBar
                    value={pct}
                    color={color}
                    height={6}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="card-footer-action">
        <Button
          variant="secondary"
          fullWidth
          icon="arrowRight"
          iconPosition="right"
          onClick={() => navigate('/job-recommendations')}
        >
          View All Matches
        </Button>
      </div>
    </Card>
  );
};

export default JobRoleMatches;
