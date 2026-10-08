import React from 'react';
import { useTheme } from '../context/theme.context';
import Icon from './Icon';

const ThemeToggle = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme();

  const isDark = theme === 'dark';

  return (
    <button
      className={`theme-toggle-btn ${className}`}
      onClick={toggleTheme}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      type="button"
    >
      <Icon name={isDark ? "sun" : "moon"} />
    </button>
  );
};

export default ThemeToggle;
