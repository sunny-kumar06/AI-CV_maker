import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import PageHeader from '../components/ui/PageHeader';
import { Card, Badge, ProgressBar } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Input, Textarea } from '../components/ui/Input';
import FileUpload from '../components/ui/FileUpload';
import { LoadingState, ErrorState } from '../components/ui/StateViews';
import { analyzeCareer, getCareerProfile } from '../features/career/services/career.api';

const CareerAdvisor = () => {
  const [targetRole, setTargetRole] = useState('Full Stack Developer');
  const [jobDescription, setJobDescription] = useState('');
  const [selfDescription, setSelfDescription] = useState('');
  const [resumeText, setResumeText] = useState('');
  const [resumeFile, setResumeFile] = useState(null);

  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getCareerProfile()
      .then(res => {
        if (res.careerProfile) setProfile(res.careerProfile);
      })
      .catch(() => {});
  }, []);

  const handleRunAnalysis = async (e) => {
    e.preventDefault();
    if (!targetRole) {
      alert("Please enter a Target Job Role");
      return;
    }
    if (!resumeFile && !resumeText && !jobDescription && !selfDescription) {
      alert("Please provide a Resume file, text, or Job Description.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const res = await analyzeCareer({
        resumeFile,
        resumeText,
        jobDescription,
        selfDescription,
        targetRole
      });
      setProfile(res.careerProfile);
    } catch (err) {
      console.error("Analysis Error:", err);
      setError("Failed to run AI Career Analysis. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-layout">
      <Navbar />
      <main className="page-container">
        <PageHeader
          breadcrumb="Career Guidance & Analysis"
          title="AI Career Advisor"
          description="Get personalized career guidance based on your resume, skills, and target role."
        />

        {/* Input Form Card */}
        <Card style={{ marginBottom: '32px' }}>
          <form onSubmit={handleRunAnalysis}>
            <div className="grid-cols-2">
              <div>
                <Input
                  label="Target Job Role"
                  id="targetRoleInput"
                  placeholder="e.g. Full Stack Developer, Data Engineer..."
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  required
                />
                <FileUpload
                  label="Upload Resume (PDF)"
                  onFileSelect={(file) => setResumeFile(file)}
                  selectedFile={resumeFile}
                  accept=".pdf"
                  maxSizeMB={3}
                />
              </div>

              <div>
                <Textarea
                  label="Target Job Description"
                  id="jobDescInput"
                  placeholder="Paste target job requirements, responsibilities, or skills..."
                  rows={5}
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                />
                <Textarea
                  label="Resume Text / Profile Summary (Optional)"
                  id="profileSummaryInput"
                  placeholder="Paste existing resume bullets or brief personal background..."
                  rows={3}
                  value={selfDescription || resumeText}
                  onChange={(e) => {
                    setSelfDescription(e.target.value);
                    setResumeText(e.target.value);
                  }}
                />
              </div>
            </div>

            <div style={{ textAlign: 'right', marginTop: '16px' }}>
              <Button type="submit" variant="primary" size="lg" icon="sparkles" loading={loading}>
                Generate Career Strategy
              </Button>
            </div>
          </form>
        </Card>

        {loading && (
          <LoadingState
            title="Generating Personalized Career Analysis..."
            message="Comparing skills against target job specifications, calculating readiness score, and creating learning roadmaps."
          />
        )}

        {error && (
          <ErrorState
            title="Analysis Error"
            message={error}
            onRetry={handleRunAnalysis}
          />
        )}

        {/* Analysis Results Display */}
        {profile && !loading && (
          <div style={{ marginTop: '24px' }}>
            <h2 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '20px', color: 'var(--text-primary)' }}>
              Career Analysis for <span style={{ color: 'var(--accent-primary)' }}>{profile.targetRole}</span>
            </h2>

            {/* Overall Score */}
            <Card style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'var(--text-primary)' }}>Career Readiness Score</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginTop: '2px' }}>
                    {profile.readinessScore?.breakdownReason}
                  </p>
                </div>
                <div style={{ fontSize: '32px', fontWeight: '800', color: 'var(--accent-primary)' }}>
                  {profile.readinessScore?.overall || 75}%
                </div>
              </div>
              <ProgressBar value={profile.readinessScore?.overall || 75} color="var(--accent-primary)" height={8} />
            </Card>

            {/* Skill Gap Matrix */}
            <div className="grid-cols-2" style={{ marginBottom: '24px' }}>
              <Card>
                <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px', color: 'var(--color-success)' }}>
                  ✓ Matched Skills
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {(profile.skills?.matched || []).map((s, idx) => (
                    <Badge key={idx} variant="success">{s}</Badge>
                  ))}
                </div>

                <h3 style={{ fontSize: '16px', fontWeight: '600', margin: '24px 0 16px 0', color: 'var(--color-warning)' }}>
                  ⚠ Partially Matched Skills
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {(profile.skills?.partial || []).map((s, idx) => (
                    <Badge key={idx} variant="warning">{s}</Badge>
                  ))}
                </div>
              </Card>

              <Card>
                <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px', color: 'var(--color-danger)' }}>
                  ✗ Missing Skills (To Learn)
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {(profile.skills?.missing || []).map((s, idx) => (
                    <Badge key={idx} variant="danger">{s}</Badge>
                  ))}
                </div>

                <h3 style={{ fontSize: '16px', fontWeight: '600', margin: '24px 0 16px 0', color: 'var(--accent-cyan)' }}>
                  💡 Recommended Industry Skills
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {(profile.skills?.recommended || []).map((s, idx) => (
                    <Badge key={idx} variant="info">{s}</Badge>
                  ))}
                </div>
              </Card>
            </div>

            {/* Priority Skills Engine */}
            <Card style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: 'var(--text-primary)' }}>
                Skill Priority Engine (Ranked Missing Skills)
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {(profile.prioritySkills || []).map((item, idx) => (
                  <div key={idx} style={{ background: 'var(--bg-elevated)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text-primary)' }}>{item.skill}</span>
                      <Badge variant={(item.priority || 'medium').toLowerCase() === 'high' ? 'danger' : 'warning'}>
                        {item.priority || 'MEDIUM'} PRIORITY
                      </Badge>
                    </div>

                    <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginBottom: '8px' }}>
                      <strong style={{ color: 'var(--text-primary)' }}>Why Required:</strong> {item.reason}
                    </p>

                    <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                      <strong style={{ color: 'var(--text-primary)' }}>Suggested Project:</strong> {item.suggestedProject}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Resume Suggestions */}
            <Card>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: 'var(--text-primary)' }}>
                Resume Content Improvements
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {(profile.resumeSuggestions || []).map((sug, idx) => (
                  <div key={idx} style={{ background: 'var(--bg-elevated)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                    <div style={{ fontSize: '12px', color: 'var(--accent-primary)', fontWeight: '600', marginBottom: '4px' }}>
                      Category: {sug.category}
                    </div>

                    {sug.currentText && (
                      <div style={{ fontSize: '13px', color: 'var(--color-danger)', marginBottom: '4px', textDecoration: 'line-through' }}>
                        Original: {sug.currentText}
                      </div>
                    )}

                    <div style={{ fontSize: '14px', color: 'var(--color-success)', fontWeight: '600', marginBottom: '4px' }}>
                      Suggested: {sug.suggestedImprovement}
                    </div>

                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                      Impact: {sug.impact}
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

export default CareerAdvisor;
