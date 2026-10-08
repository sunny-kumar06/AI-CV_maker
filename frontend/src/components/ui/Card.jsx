import React from 'react';

export const Card = ({
  children,
  className = '',
  elevated = false,
  hoverable = false,
  style = {},
  onClick
}) => {
  return (
    <div
      className={`c-card ${elevated ? 'c-card-elevated' : ''} ${hoverable ? 'c-card-hoverable' : ''} ${className}`}
      style={style}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export const Badge = ({
  children,
  variant = 'neutral', // 'success' | 'danger' | 'warning' | 'info' | 'neutral'
  size = 'md',        // 'sm' | 'md'
  className = ''
}) => {
  return (
    <span className={`c-badge c-badge-${variant} c-badge-${size} ${className}`}>
      {children}
    </span>
  );
};

export const ProgressBar = ({
  value = 0,
  max = 100,
  color = '#3B82F6',
  height = 6,
  className = ''
}) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={`c-progress-track ${className}`} style={{ height: `${height}px` }}>
      <div
        className="c-progress-bar-fill"
        style={{
          width: `${percentage}%`,
          backgroundColor: color
        }}
      />
    </div>
  );
};
