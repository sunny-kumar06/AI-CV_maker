/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from '../features/auth/hooks/useAuth';
import { getCareerProfile, getUserProgress, analyzeCareer } from '../features/career/services/career.api';

const CareerContext = createContext();

export const CareerProvider = ({ children }) => {
  const { user } = useAuth();

  const [profile, setProfile] = useState(null);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisStatus, setAnalysisStatus] = useState('not_started'); // 'not_started' | 'resume_uploaded' | 'analyzing' | 'completed' | 'failed'

  const refreshCareerData = useCallback(async () => {
    if (!user) {
      setProfile(null);
      setProgress(null);
      setAnalysisStatus('not_started');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const [profRes, progRes] = await Promise.all([
        getCareerProfile().catch(() => ({ careerProfile: null, analysisStatus: 'not_started' })),
        getUserProgress().catch(() => ({ progress: null }))
      ]);

      const fetchedProfile = profRes.careerProfile;
      setProfile(fetchedProfile);
      setProgress(progRes.progress);

      if (fetchedProfile && (fetchedProfile.skills?.matched?.length > 0 || fetchedProfile.readinessScore?.overall > 0)) {
        setAnalysisStatus(fetchedProfile.analysisStatus || 'completed');
      } else {
        setAnalysisStatus('not_started');
      }
    } catch (err) {
      console.error("Failed to load career context data:", err);
      setProfile(null);
      setAnalysisStatus('not_started');
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    refreshCareerData();
  }, [refreshCareerData]);

  const runCareerAnalysis = async ({ resumeFile, resumeText, jobDescription, selfDescription, targetRole }) => {
    try {
      setAnalyzing(true);
      setAnalysisStatus('analyzing');

      const response = await analyzeCareer({
        resumeFile,
        resumeText,
        jobDescription,
        selfDescription,
        targetRole
      });

      const updatedProfile = response.careerProfile;
      const updatedProgress = response.progress;

      setProfile(updatedProfile);
      if (updatedProgress) setProgress(updatedProgress);
      setAnalysisStatus('completed');
      return response;
    } catch (err) {
      console.error("Career Analysis Error:", err);
      setAnalysisStatus('failed');
      throw err;
    } finally {
      setAnalyzing(false);
    }
  };

  const hasProfile = Boolean(
    profile &&
    (
      (profile.skills && (profile.skills.matched?.length > 0 || profile.skills.missing?.length > 0)) ||
      (profile.readinessScore && profile.readinessScore.overall > 0)
    )
  );

  return (
    <CareerContext.Provider
      value={{
        profile,
        progress,
        loading,
        analyzing,
        analysisStatus,
        hasProfile,
        refreshCareerData,
        runCareerAnalysis,
        setProfile,
        setProgress
      }}
    >
      {children}
    </CareerContext.Provider>
  );
};

export const useCareerProfile = () => {
  const context = useContext(CareerContext);
  if (!context) {
    throw new Error('useCareerProfile must be used within a CareerProvider');
  }
  return context;
};

export default CareerProvider;

