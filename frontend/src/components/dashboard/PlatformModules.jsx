import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../Icon';

const modules = [
  {
    icon: 'advisor',
    title: 'AI Career Advisor',
    desc: 'Personalized career strategy and recommendations.',
    route: '/advisor'
  },
  {
    icon: 'roadmap',
    title: 'Personalized Roadmap',
    desc: 'Step-by-step learning and project plan.',
    route: '/roadmap'
  },
  {
    icon: 'skillGap',
    title: 'Skill Priority Engine',
    desc: 'Know which skills to learn first.',
    route: '/skill-gap'
  },
  {
    icon: 'jobAnalyzer',
    title: 'Job Description Analyzer',
    desc: 'Understand job requirements instantly.',
    route: '/job-analyzer'
  },
  {
    icon: 'resume',
    title: 'AI Resume Improver',
    desc: 'Improve ATS relevance and resume quality.',
    route: '/resume-builder'
  },
  {
    icon: 'interview',
    title: 'AI Interview Preparation',
    desc: 'Prepare for technical and behavioral interviews.',
    route: '/interview-prep'
  }
];

const PlatformModules = () => {
  const navigate = useNavigate();

  return (
    <div className="platform-modules-section">
      <div className="section-header-block">
        <h3 className="section-main-title">Platform Modules</h3>
        <p className="section-sub-title">
          Specialized AI tools to accelerate your career.
        </p>
      </div>

      <div className="modules-3col-grid">
        {modules.map((item, idx) => (
          <div
            key={idx}
            className="module-card-item"
            onClick={() => navigate(item.route)}
          >
            <div className="module-top-row">
              <div className="module-icon-box">
                <Icon name={item.icon} />
              </div>
            </div>

            <h4 className="module-card-title">{item.title}</h4>
            <p className="module-card-desc">{item.desc}</p>

            <div className="module-action-link">
              <span>Open Module</span>
              <Icon name="arrowRight" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlatformModules;
