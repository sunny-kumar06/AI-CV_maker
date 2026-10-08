import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../ui/Card';
import Button from '../ui/Button';

const SkillSummary = ({ skills }) => {
  const navigate = useNavigate();

  const matched = skills?.matched || [];
  const missing = skills?.missing || [];
  const partial = skills?.partial || [];

  const hasSkillsData = matched.length > 0 || missing.length > 0 || partial.length > 0;

  return (
    <Card className="skill-gap-overview-card">
      <div className="card-header-block">
        <div className="card-title-row">
          <h3 className="section-card-title">Skill Gap Overview</h3>
          {hasSkillsData && (
            <div className="skill-counts-badge">
              <span className="count-tag tag-success">{matched.length} Matched</span>
              <span className="count-tag tag-danger">{missing.length} Gaps</span>
            </div>
          )}
        </div>
        <p className="section-sub-text">
          Compact preview of verified skills and high-priority learning gaps.
        </p>
      </div>

      {!hasSkillsData ? (
        <div className="empty-skill-state">
          <p className="empty-text">No skills extracted yet. Run a career analysis to identify your skill matrix.</p>
          <Button variant="secondary" size="sm" onClick={() => navigate('/advisor')}>
            Start Skill Analysis
          </Button>
        </div>
      ) : (
        <div className="skill-groups-container">
          {/* STRONG / MATCHED SKILLS */}
          {matched.length > 0 && (
            <div className="skill-category-block">
              <h4 className="category-label text-success">
                <span className="category-dot dot-success" />
                STRONG / MATCHED ({matched.length})
              </h4>
              <div className="skill-chip-wrap">
                {matched.slice(0, 6).map((skill, idx) => (
                  <span key={idx} className="chip-badge chip-success">
                    {skill}
                  </span>
                ))}
                {matched.length > 6 && (
                  <span className="chip-badge chip-more">+{matched.length - 6} more</span>
                )}
              </div>
            </div>
          )}

          {/* NEEDS IMPROVEMENT / PARTIAL */}
          {partial.length > 0 && (
            <div className="skill-category-block">
              <h4 className="category-label text-warning">
                <span className="category-dot dot-warning" />
                NEEDS IMPROVEMENT ({partial.length})
              </h4>
              <div className="skill-chip-wrap">
                {partial.slice(0, 5).map((skill, idx) => (
                  <span key={idx} className="chip-badge chip-warning">
                    {skill}
                  </span>
                ))}
                {partial.length > 5 && (
                  <span className="chip-badge chip-more">+{partial.length - 5} more</span>
                )}
              </div>
            </div>
          )}

          {/* PRIORITY / CRITICAL GAPS */}
          {missing.length > 0 && (
            <div className="skill-category-block">
              <h4 className="category-label text-danger">
                <span className="category-dot dot-danger" />
                CRITICAL GAPS ({missing.length})
              </h4>
              <div className="skill-chip-wrap">
                {missing.slice(0, 6).map((skill, idx) => (
                  <span key={idx} className="chip-badge chip-danger">
                    {skill}
                  </span>
                ))}
                {missing.length > 6 && (
                  <span className="chip-badge chip-more">+{missing.length - 6} more</span>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      <div className="card-footer-action">
        <Button
          variant="ghost"
          size="sm"
          icon="arrowRight"
          iconPosition="right"
          onClick={() => navigate('/skill-gap')}
        >
          View Full Skill Analysis →
        </Button>
      </div>
    </Card>
  );
};

export default SkillSummary;
