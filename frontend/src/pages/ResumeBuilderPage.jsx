import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import PageHeader from '../components/ui/PageHeader';
import { Card, Badge, ProgressBar } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Input, Textarea } from '../components/ui/Input';
import FileUpload from '../components/ui/FileUpload';
import { LoadingState, ErrorState } from '../components/ui/StateViews';
import { analyzeResume } from '../features/resume/services/resume.api';
import { useCareerProfile } from '../context/career.context';

const ResumeBuilderPage = () => {
  const { profile, hasProfile } = useCareerProfile();

  const [resumeText, setResumeText] = useState(profile?.resumeText || '');
  const [resumeFile, setResumeFile] = useState(null);
  const [targetRole, setTargetRole] = useState(profile?.targetRole || 'Software Engineer');

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleImproveResume = async (e) => {
    e.preventDefault();
    if (!resumeText && !resumeFile) {
      alert("Please upload a PDF resume or paste existing resume text");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const res = await analyzeResume({ resumeFile, resumeText, targetRole });
      setResult(res.analysis);
    } catch (err) {
      console.error(err);
      setError("Failed to generate resume improvements.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-layout">
      <Navbar />
      <main className="page-container">
        <PageHeader
          breadcrumb="ATS & Content Optimization"
          title="AI Resume Improver"
          description="Optimize resume wording, bullet point impacts, and ATS keyword matching based on your real experience."
        />

        {!hasProfile && (
          <div style={{ background: 'var(--color-light-indigo)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '16px 20px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '14px' }}>
            <span style={{ fontSize: '24px' }}>📄</span>
            <div>
              <h4 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--accent-primary)', marginBottom: '2px' }}>
                Upload Your Existing Resume
              </h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '13px', margin: 0 }}>
                Upload your existing resume to let CareerAI understand your profile and generate tailored ATS improvements.
              </p>
            </div>
          </div>
        )}

        <Card elevated style={{ marginBottom: '32px' }}>
          <form onSubmit={handleImproveResume}>
            <div className="grid-cols-2">
              <Input
                label="Target Role for Optimization"
                id="targetRoleOptInput"
                placeholder="Target Role (e.g. Full Stack Developer)"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                required
              />
              <FileUpload
                label="Upload Resume PDF"
                onFileSelect={(file) => setResumeFile(file)}
                selectedFile={resumeFile}
                accept=".pdf"
                maxSizeMB={3}
              />
            </div>

            <Textarea
              label="Or Paste Existing Resume Text / Bullet Points"
              id="resumeTextInput"
              placeholder="Paste existing project bullets or experience descriptions here..."
              rows={5}
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
            />

            <div style={{ textAlign: 'right', marginTop: '16px' }}>
              <Button type="submit" variant="primary" size="lg" icon="sparkles" loading={loading}>
                Generate ATS & Bullet Improvements
              </Button>
            </div>
          </form>
        </Card>

        {loading && (
          <LoadingState
            title="Enhancing Resume Wording & Action Verbs..."
            message="Evaluating ATS score, formatting, and impact metrics without inventing fake information."
          />
        )}

        {error && (
          <ErrorState
            title="Optimization Error"
            message={error}
            onRetry={handleImproveResume}
          />
        )}

        {result && !loading && (
          <div>
            {/* ATS Score & Highlights */}
            <Card style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-primary)' }}>ATS Alignment Summary</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Evaluation against standard applicant tracking systems for {targetRole}.</p>
                </div>
                <div style={{ fontSize: '32px', fontWeight: '800', color: 'var(--color-success)' }}>
                  {result.atsScore || 0}% ATS Score
                </div>
              </div>
              <ProgressBar value={result.atsScore || 0} color="var(--color-success)" height={8} />

              <div style={{ marginTop: '20px' }}>
                <h4 style={{ fontSize: '13px', color: 'var(--accent-primary)', fontWeight: '600', marginBottom: '8px' }}>Key Profile Strengths</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {(result.keyStrengths || []).map((s, idx) => (
                    <Badge key={idx} variant="success">{s}</Badge>
                  ))}
                </div>
              </div>

              {result.missingKeywords && result.missingKeywords.length > 0 && (
                <div style={{ marginTop: '16px' }}>
                  <h4 style={{ fontSize: '13px', color: 'var(--color-danger)', fontWeight: '600', marginBottom: '8px' }}>Recommended ATS Keywords to Include</h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {result.missingKeywords.map((k, idx) => (
                      <Badge key={idx} variant="danger">+ {k}</Badge>
                    ))}
                  </div>
                </div>
              )}
            </Card>

            {/* Bullet Point Enhancements */}
            <Card>
              <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px', color: 'var(--text-primary)' }}>
                Bullet Point Enhancements (Without Inventing Fake Info)
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {(result.improvements || []).map((imp, idx) => (
                  <div key={idx} style={{ background: 'var(--bg-elevated)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                    <div style={{ fontSize: '12px', color: 'var(--accent-primary)', fontWeight: '600', marginBottom: '8px' }}>
                      Category: {imp.category || 'Impact Enhancement'}
                    </div>

                    {imp.originalText && (
                      <div style={{ background: 'var(--color-danger-bg)', padding: '10px 14px', borderRadius: '8px', color: 'var(--color-danger)', fontSize: '13px', marginBottom: '8px', borderLeft: '3px solid var(--color-danger)' }}>
                        <strong>Existing Bullet:</strong> {imp.originalText}
                      </div>
                    )}

                    <div style={{ background: 'var(--color-success-bg)', padding: '10px 14px', borderRadius: '8px', color: 'var(--color-success)', fontSize: '14px', marginBottom: '8px', borderLeft: '3px solid var(--color-success)', fontWeight: '600' }}>
                      <strong>Suggested ATS Improvement:</strong> {imp.improvedText}
                    </div>

                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                      <strong>Rationale & Impact:</strong> {imp.reason || 'Quantifies achievements and uses strong technical action verbs.'}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
};

export default ResumeBuilderPage;
