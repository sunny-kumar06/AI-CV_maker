import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import ReadinessSummary from '../components/dashboard/ReadinessSummary';
import CareerGoalCard from '../components/dashboard/CareerGoalCard';
import NextActionCard from '../components/dashboard/NextActionCard';
import SkillSummary from '../components/dashboard/SkillSummary';
import JobRoleMatches from '../components/dashboard/JobRoleMatches';
import RecentActivityCard from '../components/dashboard/RecentActivityCard';
import PlatformModules from '../components/dashboard/PlatformModules';
import { LoadingState, ErrorState } from '../components/ui/StateViews';
import { getCareerProfile, getUserProgress } from '../features/career/services/career.api';

const Dashboard = () => {
  const [profile, setProfile] = useState(null);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [profileRes, progressRes] = await Promise.all([
        getCareerProfile().catch(() => ({ careerProfile: null })),
        getUserProgress().catch(() => ({ progress: null }))
      ]);
      setProfile(profileRes.careerProfile);
      setProgress(progressRes.progress);
    } catch (err) {
      console.error("Dashboard data fetch error:", err);
      setError("Unable to load profile data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="app-layout">
      <Navbar />

      <main className="page-container dashboard-page-container">
        {/* TOP HERO HEADER */}
        <DashboardHeader profile={profile} />

        {loading ? (
          <LoadingState
            title="Analyzing Career Command Center..."
            message="Fetching readiness score, skill gap matrix, and personalized recommendations."
          />
        ) : error ? (
          <ErrorState
            title="Unable to load dashboard analytics"
            message={error}
            onRetry={fetchData}
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
