import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../Icon';

const EmptyState = ({ message, subtext }) => {
  const navigate = useNavigate();

  return (
    <div className="empty-dashboard-card">
      <div className="empty-icon-circle">
        <Icon name="sparkles" />
      </div>
      <h3 className="empty-title">{message || "Complete Your Career Profile"}</h3>
      <p className="empty-description">
        {subtext || "Upload your resume or paste a target job description to unlock your readiness score, skill gap breakdown, and personalized career roadmap."}
      </p>
      <button className="btn-primary-action" onClick={() => navigate('/advisor')}>
        <Icon name="sparkles" />
        <span>Run AI Career Analysis</span>
      </button>
    </div>
  );
};

export default EmptyState;
