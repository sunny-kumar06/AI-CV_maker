import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import PageHeader from '../components/ui/PageHeader';
import { Card, Badge } from '../components/ui/Card';
import { LoadingState } from '../components/ui/StateViews';
import { getCareerProfile } from '../features/career/services/career.api';

const JobRecommendationsPage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCareerProfile()
      .then(res => {
        if (res.careerProfile) setProfile(res.careerProfile);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const roles = profile?.recommendedRoles || [
    {
      roleTitle: 'Full Stack Developer',
      matchPercentage: 86,
      matchingSkills: ['React.js', 'Node.js', 'MongoDB', 'Express', 'JavaScript'],
      missingSkills: ['Docker', 'AWS'],
      whySuited: 'Your experience in both frontend React UIs and backend Express REST APIs makes you a strong match for Full Stack roles.',
      requiredToReady: ['Containerization with Docker', 'Production Deployment']
    },
    {
      roleTitle: 'Backend Engineer',
      matchPercentage: 79,
      matchingSkills: ['Node.js', 'Express', 'REST APIs', 'MongoDB', 'Database Indexing'],
      missingSkills: ['Redis Caching', 'System Design'],
      whySuited: 'Solid foundation in server-side API design and MongoDB database schema management.',
      requiredToReady: ['Advanced Caching Patterns', 'System Design Basics']
    },
    {
      roleTitle: 'Software Engineer',
      matchPercentage: 74,
      matchingSkills: ['JavaScript', 'Data Structures', 'Git', 'Problem Solving'],
      missingSkills: ['Unit Testing', 'CI/CD Pipelines'],
      whySuited: 'Strong foundational programming skills and software development lifecycle knowledge.',
      requiredToReady: ['Automated Unit Testing', 'CI/CD Automation']
    },
    {
      roleTitle: 'Frontend Developer',
      matchPercentage: 71,
      matchingSkills: ['React.js', 'HTML/CSS', 'JavaScript'],
      missingSkills: ['TypeScript', 'State Management'],
      whySuited: 'Capable of building modern, responsive component UIs.',
      requiredToReady: ['TypeScript Integration', 'UI Performance Tuning']
    }
  ];

  return (
    <div className="app-layout">
      <Navbar />
      <main className="page-container">
        <PageHeader
          breadcrumb="Job Opportunity Alignment"
          title="Recommended Career Paths"
          description="Career roles matched to your skills, experience, and goals."
        />

        {loading ? (
          <LoadingState title="Calculating Best Job Role Matches..." message="Evaluating your profile against industry roles." />
        ) : (
          <div className="grid-cols-2">
            {roles.map((role, idx) => (
              <Card key={idx} elevated style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-primary)' }}>{role.roleTitle}</h3>
                    <Badge variant={role.matchPercentage >= 80 ? 'success' : 'info'} size="md">
                      {role.matchPercentage}% Match
                    </Badge>
                  </div>

                  <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginBottom: '16px', lineHeight: '1.5' }}>
                    <strong style={{ color: 'var(--text-primary)' }}>Why You Fit:</strong> {role.whySuited}
                  </p>

                  <div style={{ marginBottom: '16px' }}>
                    <h4 style={{ fontSize: '12px', color: 'var(--color-success)', fontWeight: '600', marginBottom: '8px' }}>
                      MATCHING SKILLS
                    </h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {(role.matchingSkills || []).map((s, sidx) => (
                        <Badge key={sidx} variant="success" size="sm">{s}</Badge>
                      ))}
                    </div>
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <h4 style={{ fontSize: '12px', color: 'var(--color-danger)', fontWeight: '600', marginBottom: '8px' }}>
                      MISSING SKILLS TO ACQUIRE
                    </h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {(role.missingSkills || []).map((s, sidx) => (
                        <Badge key={sidx} variant="danger" size="sm">{s}</Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {role.requiredToReady && (
                  <div style={{ background: 'var(--color-light-indigo)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', fontSize: '12px', color: 'var(--accent-primary)' }}>
                    🎯 <strong style={{ color: 'var(--text-primary)' }}>To Become 100% Job Ready:</strong> {(role.requiredToReady || []).join(', ')}
                  </div>
                )}
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default JobRecommendationsPage;
