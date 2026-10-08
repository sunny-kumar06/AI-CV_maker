import React from 'react';
import Icon from '../Icon';
import Button from './Button';

export const LoadingState = ({ title = "Processing request...", message = "Gathering insights using Gemini AI." }) => {
  return (
    <div className="c-state-card c-state-loading">
      <div className="c-loading-spinner" />
      <h3 className="state-title">{title}</h3>
      <p className="state-message">{message}</p>
    </div>
  );
};

export const EmptyState = ({
  title = "No Data Found",
  message = "Complete your profile or upload your resume to generate personalized insights.",
  actionText = "Start Analysis",
  onAction
}) => {
  return (
    <div className="c-state-card c-state-empty">
      <div className="state-icon-box">
        <Icon name="sparkles" />
      </div>
      <h3 className="state-title">{title}</h3>
      <p className="state-message">{message}</p>
      {onAction && (
        <Button variant="primary" icon="arrowRight" iconPosition="right" onClick={onAction}>
          {actionText}
        </Button>
      )}
    </div>
  );
};

export const ErrorState = ({
  title = "Unable to process request",
  message = "An error occurred while communicating with the server.",
  onRetry
}) => {
  return (
    <div className="c-state-card c-state-error">
      <div className="state-icon-box error-icon">
        <Icon name="alertCircle" />
      </div>
      <h3 className="state-title">{title}</h3>
      <p className="state-message">{message}</p>
      {onRetry && (
        <Button variant="secondary" onClick={onRetry}>
          Try Again
        </Button>
      )}
    </div>
  );
};
