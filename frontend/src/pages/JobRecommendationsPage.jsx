import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import PageHeader from '../components/ui/PageHeader';
import { Card, Badge } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Icon from '../components/Icon';
import { LoadingState } from '../components/ui/StateViews';
import { useCareerProfile } from '../context/career.context';

const JobRecommendationsPage = () => {
  const navigate = useNavigate();
  const { profile, loading, hasProfile } = useCareerProfile();

  const roles = profile?.recommendedRoles || [];

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
        ) : !hasProfile || roles.length === 0 ? (
          <Card style={{ padding: '48px 24px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--color-light-indigo)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-primary)', fontSize: '28px' }}>
              <Icon name="jobMatch" />
            </div>
            <div>
              <h2 style={{ fontSize: '22px', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '8px' }}>
                Personalized Job Matches
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', maxWidth: '480px', margin: '0 auto', lineHeight: '1.5' }}>
                Complete your career analysis to receive job recommendations based on your skills and target role.
              </p>
            </div>
            <Button
              variant="primary"
              size="lg"
              icon="sparkles"
              onClick={() => navigate('/advisor')}
              style={{ marginTop: '8px' }}
            >
              Complete Career Analysis
            </Button>
          </Card>
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

                {role.requiredToReady && role.requiredToReady.length > 0 && (
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
