import React from 'react';
import Icon from '../Icon';

const Button = ({
  children,
  variant = 'primary', // 'primary' | 'secondary' | 'danger' | 'ghost'
  size = 'md',        // 'sm' | 'md' | 'lg'
  icon,
  iconPosition = 'left',
  loading = false,
  disabled = false,
  fullWidth = false,
  onClick,
  type = 'button',
  className = '',
  style = {}
}) => {
  const baseClass = `c-btn c-btn-${variant} c-btn-${size} ${fullWidth ? 'c-btn-full' : ''} ${className}`;

  return (
    <button
      type={type}
      className={baseClass}
      onClick={onClick}
      disabled={disabled || loading}
      style={style}
    >
      {loading ? (
        <span className="c-spinner-sm" />
      ) : (
        <>
          {icon && iconPosition === 'left' && <Icon name={icon} />}
          <span>{children}</span>
          {icon && iconPosition === 'right' && <Icon name={icon} />}
        </>
      )}
    </button>
  );
};

export default Button;
