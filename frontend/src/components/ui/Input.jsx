import React from 'react';

export const Input = ({
  label,
  id,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  required = false,
  className = '',
  disabled = false,
  ...props
}) => {
  return (
    <div className={`c-form-group ${className}`}>
      {label && (
        <label htmlFor={id} className="c-form-label">
          {label} {required && <span className="c-required">*</span>}
        </label>
      )}
      <input
        id={id}
        type={type}
        className={`c-form-input ${error ? 'is-invalid' : ''}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        {...props}
      />
      {error && <span className="c-form-error">{error}</span>}
    </div>
  );
};

export const Textarea = ({
  label,
  id,
  placeholder,
  value,
  onChange,
  rows = 4,
  error,
  required = false,
  className = '',
  disabled = false,
  ...props
}) => {
  return (
    <div className={`c-form-group ${className}`}>
      {label && (
        <label htmlFor={id} className="c-form-label">
          {label} {required && <span className="c-required">*</span>}
        </label>
      )}
      <textarea
        id={id}
        rows={rows}
        className={`c-form-textarea ${error ? 'is-invalid' : ''}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        {...props}
      />
      {error && <span className="c-form-error">{error}</span>}
    </div>
  );
};
