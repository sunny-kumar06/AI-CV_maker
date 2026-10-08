import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../features/auth/hooks/useAuth';
import Icon from './Icon';
import ThemeToggle from './ThemeToggle';
import './Navbar.scss';

const navItems = [
  { path: '/', label: 'Dashboard', icon: 'dashboard', end: true },
  { path: '/advisor', label: 'AI Advisor', icon: 'advisor' },
  { path: '/roadmap', label: 'Roadmap', icon: 'roadmap' },
  { path: '/skill-gap', label: 'Skill Gap', icon: 'skillGap' },
  { path: '/job-recommendations', label: 'Job Match', icon: 'jobMatch' },
  { path: '/job-analyzer', label: 'Job Analyzer', icon: 'jobAnalyzer' },
  { path: '/resume-builder', label: 'Resume AI', icon: 'resume' },
  { path: '/interview-prep', label: 'Interview Prep', icon: 'interview' },
  { path: '/progress', label: 'Progress', icon: 'progress' }
];

const Navbar = () => {
  const { user, handleLogout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const onLogout = async () => {
    await handleLogout();
    navigate('/login');
  };

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      {/* MOBILE TOP HEADER BAR (<= 1024px) */}
      <header className="mobile-header-bar">
        <div className="navbar-brand" onClick={() => { navigate('/'); closeMobile(); }}>
          <div className="logo-icon-box">
            <Icon name="target" />
          </div>
          <div className="brand-text">
            <div className="brand-title">CareerAI</div>
            <span className="brand-subtitle">Skill & Job Advisor</span>
          </div>
        </div>

        <button
          className="mobile-hamburger-btn"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle Sidebar Menu"
          type="button"
        >
          <Icon name={mobileOpen ? "close" : "menu"} />
        </button>
      </header>

      {/* BACKDROP OVERLAY FOR MOBILE DRAWER */}
      {mobileOpen && (
        <div className="sidebar-backdrop" onClick={closeMobile} />
      )}

      {/* PREMIUM VERTICAL GLASS SIDEBAR (Desktop Fixed / Mobile Drawer) */}
      <aside className={`glass-sidebar ${mobileOpen ? 'mobile-open' : ''}`}>
        {/* 1. BRAND SECTION */}
        <div className="sidebar-brand-section" onClick={() => { navigate('/'); closeMobile(); }}>
          <div className="logo-icon-box">
            <Icon name="target" />
          </div>
          <div className="brand-text">
            <div className="brand-title">CareerAI</div>
            <span className="brand-subtitle">Skill & Job Advisor</span>
          </div>
        </div>

        {/* 2. NAVIGATION LINKS */}
        <nav className="sidebar-nav-list">
          <div className="nav-section-label">MAIN NAVIGATION</div>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              onClick={closeMobile}
              className={({ isActive }) => (isActive ? 'sidebar-nav-item active' : 'sidebar-nav-item')}
            >
              <Icon name={item.icon} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* 3. BOTTOM UTILITIES & USER PROFILE */}
        <div className="sidebar-footer-section">
          <div className="sidebar-utility-row">
            <span className="utility-label">Theme</span>
            <ThemeToggle />
          </div>

          {user && (
            <div className="sidebar-user-card">
              <span className="user-avatar">
                {user.username ? user.username[0].toUpperCase() : 'U'}
              </span>
              <div className="user-info-text">
                <span className="user-name">{user.username}</span>
                <span className="user-role-tag">Candidate</span>
              </div>
            </div>
          )}

          <button className="sidebar-logout-btn" onClick={onLogout} type="button">
            <Icon name="logout" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Navbar;
