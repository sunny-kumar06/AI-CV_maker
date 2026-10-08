import React from 'react';
import Icon from './Icon';

const CareerAILoader = ({ text = "Preparing your career workspace...", inline = false }) => {
  return (
    <div
      className={inline ? "career-ai-loader-inline" : "career-ai-loader-screen"}
      role="status"
      aria-label="Loading CareerAI"
    >
      <div className="loader-content-box">
        <div className="loader-logo-wrap">
          <div className="loader-logo-icon">
            <Icon name="target" />
          </div>
        </div>

        <h1 className="loader-brand-title">CareerAI</h1>
        <p className="loader-brand-subtitle">AI-Powered Skill & Job Advisor</p>

        <div className="loader-dots-indicator" aria-hidden="true">
          <span className="dot dot-1"></span>
          <span className="dot dot-2"></span>
          <span className="dot dot-3"></span>
        </div>

        <p className="loader-status-text">{text}</p>
      </div>
    </div>
  );
};

export default CareerAILoader;

