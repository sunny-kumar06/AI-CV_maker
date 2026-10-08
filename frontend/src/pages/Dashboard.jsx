import React from 'react';
import Navbar from '../components/Navbar';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import ReadinessSummary from '../components/dashboard/ReadinessSummary';
import CareerGoalCard from '../components/dashboard/CareerGoalCard';
import NextActionCard from '../components/dashboard/NextActionCard';
import SkillSummary from '../components/dashboard/SkillSummary';
import JobRoleMatches from '../components/dashboard/JobRoleMatches';
import RecentActivityCard from '../components/dashboard/RecentActivityCard';
import PlatformModules from '../components/dashboard/PlatformModules';
import { LoadingState } from '../components/ui/StateViews';
import { useCareerProfile } from '../context/career.context';

const Dashboard = () => {
  const { profile, progress, loading } = useCareerProfile();

  return (
    <div className="app-layout">
      <Navbar />

      <main className="page-container dashboard-page-container">
        {/* TOP HERO HEADER */}
        <DashboardHeader profile={profile} />

        {loading ? (
          <LoadingState
            title="Loading Career Workspace..."
            message="Fetching readiness metrics, skill gaps, and personalized recommendations."
          />
        ) : (
          <div className="dashboard-content-stack">
            {/* 1. KPI SUMMARY AREA (4 Compact Metric Cards) */}
            <ReadinessSummary readiness={profile?.readinessScore} />

            {/* 2. CAREER PROFILE & NEXT BEST ACTION (Balanced 2-Column Grid) */}
            <section className="dashboard-section career-profile-grid">
              <CareerGoalCard profile={profile} />
              <NextActionCard
                skills={profile?.skills}
                targetRole={profile?.targetRole}
                prioritySkills={profile?.prioritySkills}
              />
            </section>

            {/* 3. MAIN INTELLIGENCE GRID (Skill Gap Preview & Top Job Matches) */}
            <section className="dashboard-section main-intelligence-grid">
              <SkillSummary skills={profile?.skills} />
              <JobRoleMatches roles={profile?.recommendedRoles} />
            </section>

            {/* 4. ACTIVITY TIMELINE & PLATFORM MODULES */}
            <section className="dashboard-section activity-modules-grid">
              <RecentActivityCard progress={progress} profile={profile} />
              <PlatformModules />
            </section>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
