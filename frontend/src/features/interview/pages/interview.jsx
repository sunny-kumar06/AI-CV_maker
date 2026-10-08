import React, { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import PageHeader from "../../../components/ui/PageHeader";
import { Card, Badge, ProgressBar } from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";
import { LoadingState } from "../../../components/ui/StateViews";
import { useParams } from "react-router-dom";
import { getInterviewReportById } from "../services/interview.api";

const Interview = () => {
  const { id } = useParams();

  const [report, setReport] = useState(null);
  const [activeTab, setActiveTab] = useState("technical");

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const data = await getInterviewReportById(id);
        setReport(data.interviewReport);
      } catch (err) {
        console.error("Error fetching report:", err);
      }
    };

    if (id) fetchReport();
  }, [id]);

  if (!report) return (
    <div className="app-layout">
      <Navbar />
      <main className="page-container">
        <LoadingState title="Loading Interview Strategy Report..." message="Fetching role-specific questions and evaluation benchmarks." />
      </main>
    </div>
  );

  return (
    <div className="app-layout">
      <Navbar />
      <main className="page-container">
        <PageHeader
          breadcrumb="AI Interview Strategy Report"
          title={report.title || "Interview Strategy Report"}
          description="Practice technical & behavioral questions tailored to your target job description."
        />

        <div className="dashboard-main-grid">
          {/* LEFT 8-COL: SIDEBAR + QUESTIONS CONTENT */}
          <div className="dashboard-left-col">
            <Card>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px', flexWrap: 'wrap' }}>
                <Button
                  variant={activeTab === "technical" ? "primary" : "secondary"}
                  size="sm"
                  onClick={() => setActiveTab("technical")}
                >
                  Technical Questions ({report.technicalQuestions?.length || 0})
                </Button>
                <Button
                  variant={activeTab === "behavioral" ? "primary" : "secondary"}
                  size="sm"
                  onClick={() => setActiveTab("behavioral")}
                >
                  Behavioral Questions ({report.behavioralQuestions?.length || 0})
                </Button>
                <Button
                  variant={activeTab === "plan" ? "primary" : "secondary"}
                  size="sm"
                  onClick={() => setActiveTab("plan")}
                >
                  Preparation Plan
                </Button>
              </div>

              {activeTab === "technical" && (
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px', color: 'var(--text-primary)' }}>
                    Technical Questions & Structured Answers
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {(report.technicalQuestions || []).map((q, i) => (
                      <div key={i} style={{ background: 'var(--bg-elevated)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                        <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '8px' }}>
                          Q{i + 1}: {q.question}
                        </div>
                        {q.intention && (
                          <div style={{ fontSize: '12px', color: 'var(--accent-cyan)', marginBottom: '8px' }}>
                            <strong>Interviewer Evaluation Intention:</strong> {q.intention}
                          </div>
                        )}
                        <div style={{ fontSize: '13px', color: 'var(--text-secondary)', background: 'var(--color-light-indigo)', padding: '12px', borderRadius: '8px', borderLeft: '3px solid var(--accent-primary)' }}>
                          <strong style={{ color: 'var(--text-primary)' }}>Recommended Structured Response:</strong> {q.answer}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "behavioral" && (
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px', color: 'var(--text-primary)' }}>
                    Behavioral & STAR Method Questions
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {(report.behavioralQuestions || []).map((q, i) => (
                      <div key={i} style={{ background: 'var(--bg-elevated)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                        <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '8px' }}>
                          Q{i + 1}: {q.question}
                        </div>
                        {q.intention && (
                          <div style={{ fontSize: '12px', color: 'var(--accent-cyan)', marginBottom: '8px' }}>
                            <strong>Interviewer Evaluation Intention:</strong> {q.intention}
                          </div>
                        )}
                        <div style={{ fontSize: '13px', color: 'var(--text-secondary)', background: 'var(--color-success-bg)', padding: '12px', borderRadius: '8px', borderLeft: '3px solid var(--color-success)' }}>
                          <strong style={{ color: 'var(--text-primary)' }}>STAR Response Framework:</strong> {q.answer}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "plan" && (
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px', color: 'var(--text-primary)' }}>
                    Day-wise Preparation Roadmap
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {(report.preparationPlan || []).map((p, i) => (
                      <div key={i} style={{ background: 'var(--bg-elevated)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                        <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--accent-primary)', marginBottom: '4px' }}>
                          Day {p.day}: {p.focus}
                        </div>
                        <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '13px', marginTop: '8px' }}>
                          {(p.tasks || []).map((t, idx) => (
                            <li key={idx} style={{ marginBottom: '4px' }}>{t}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          </div>

          {/* RIGHT 4-COL: MATCH SCORE & SKILL GAPS */}
          <div className="dashboard-right-col">
            <Card elevated style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '600', marginBottom: '4px' }}>Job Match Score</div>
              <div style={{ fontSize: '36px', fontWeight: '800', color: 'var(--accent-primary)', marginBottom: '8px' }}>
                {report.matchScore || 0}%
              </div>
              <ProgressBar value={report.matchScore || 0} color="var(--accent-primary)" height={6} />
            </Card>

            <Card>
              <h3 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '12px' }}>
                Identified Skill Gaps
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {(report.skillGaps || []).map((s, i) => (
                  <Badge key={i} variant={s.severity === 'high' ? 'danger' : 'warning'}>
                    {s.skill || s}
                  </Badge>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Interview;