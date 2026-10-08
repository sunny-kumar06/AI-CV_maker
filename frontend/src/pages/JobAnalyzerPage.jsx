import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import PageHeader from '../components/ui/PageHeader';
import { Card, Badge } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Textarea } from '../components/ui/Input';
import { LoadingState, ErrorState } from '../components/ui/StateViews';
import { analyzeJobDescription } from '../features/job/services/job.api';
import { useCareerProfile } from '../context/career.context';

const JobAnalyzerPage = () => {
  const navigate = useNavigate();
  const { hasProfile } = useCareerProfile();

  const [jobDescription, setJobDescription] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!jobDescription.trim()) {
      alert("Please paste a Job Description text");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const res = await analyzeJobDescription({ jobDescription });
      setAnalysis(res.jobAnalysis);
    } catch (err) {
      console.error(err);
      setError("Failed to analyze job description.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-layout">
      <Navbar />
      <main className="page-container">
        <PageHeader
          breadcrumb="Specification Extractor"
          title="Job Description Analyzer"
          description="Extract required skills, technologies, experience requirements, and duties from any job posting."
        />

        {!hasProfile && (
          <div style={{ background: 'var(--color-light-indigo)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '16px 20px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h4 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--accent-primary)', marginBottom: '2px' }}>
                Compare Job Postings With Your Profile
              </h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '13px', margin: 0 }}>
                Upload your resume first to compare your profile with this job and see personalized skill compatibility scores.
              </p>
            </div>
            <Button variant="secondary" size="sm" icon="sparkles" onClick={() => navigate('/advisor')}>
              Upload Resume First
            </Button>
          </div>
        )}

        <Card elevated style={{ marginBottom: '32px' }}>
          <form onSubmit={handleAnalyze}>
            <Textarea
              label="Target Job Description"
              id="jobDescAnalyzerInput"
              placeholder="Paste the complete job post description here (duties, requirements, tech stack)..."
              rows={8}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              required
            />

            <div style={{ textAlign: 'right', marginTop: '16px' }}>
              <Button type="submit" variant="primary" size="lg" icon="sparkles" loading={loading}>
                Analyze Job Requirements
              </Button>
            </div>
          </form>
        </Card>

        {loading && (
          <LoadingState
            title="Parsing Job Requirements with Gemini AI..."
            message="Extracting core skills, tools, qualifications, and key duties."
          />
        )}

        {error && (
          <ErrorState
            title="Analysis Failed"
            message={error}
            onRetry={handleAnalyze}
          />
        )}

        {analysis && !loading && (
          <div>
            {/* Title & Level Bar */}
            <Card style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '600' }}>Inferred Position Title</span>
                  <h2 style={{ fontSize: '24px', fontWeight: '700', color: 'var(--accent-primary)', marginTop: '2px' }}>
                    {analysis.jobTitle || 'Software Engineer'}
                  </h2>
                </div>
                {analysis.experienceLevel && (
                  <Badge variant="info" size="md">
                    Level: {analysis.experienceLevel}
                  </Badge>
                )}
              </div>
            </Card>

            {/* Required & Preferred Skills */}
            <div className="grid-cols-2" style={{ marginBottom: '24px' }}>
              <Card>
                <h4 style={{ fontSize: '14px', color: 'var(--color-success)', fontWeight: '600', marginBottom: '12px' }}>
                  ESSENTIAL REQUIRED SKILLS ({analysis.requiredSkills?.length || 0})
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {(analysis.requiredSkills || []).map((s, idx) => (
                    <Badge key={idx} variant="success">{s}</Badge>
                  ))}
                </div>
              </Card>

              <Card>
                <h4 style={{ fontSize: '14px', color: 'var(--accent-cyan)', fontWeight: '600', marginBottom: '12px' }}>
                  PREFERRED / BONUS SKILLS ({analysis.preferredSkills?.length || 0})
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {(analysis.preferredSkills || []).map((s, idx) => (
                    <Badge key={idx} variant="info">{s}</Badge>
                  ))}
                </div>
              </Card>
            </div>

            {/* Tools & Education */}
            <div className="grid-cols-2" style={{ marginBottom: '24px' }}>
              <Card>
                <h4 style={{ fontSize: '14px', color: 'var(--color-warning)', fontWeight: '600', marginBottom: '12px' }}>
                  TOOLS & TECHNOLOGIES
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {(analysis.technologies || analysis.tools || []).map((t, idx) => (
                    <Badge key={idx} variant="warning">{t}</Badge>
                  ))}
                </div>
              </Card>

              <Card>
                <h4 style={{ fontSize: '14px', color: 'var(--text-primary)', fontWeight: '600', marginBottom: '12px' }}>
                  EDUCATION & QUALIFICATION
                </h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                  {analysis.education || 'Not specified in job description.'}
                </p>
              </Card>
            </div>

            {/* Responsibilities */}
            {analysis.responsibilities && analysis.responsibilities.length > 0 && (
              <Card>
                <h4 style={{ fontSize: '14px', color: 'var(--text-primary)', fontWeight: '600', marginBottom: '12px' }}>
                  KEY RESPONSIBILITIES
                </h4>
                <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.6' }}>
                  {analysis.responsibilities.map((r, idx) => (
                    <li key={idx} style={{ marginBottom: '6px' }}>{r}</li>
                  ))}
                </ul>
              </Card>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default JobAnalyzerPage;
