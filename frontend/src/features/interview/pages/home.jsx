import React, { useState } from "react";
import Navbar from "../../../components/Navbar";
import PageHeader from "../../../components/ui/PageHeader";
import { Card } from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";
import { Textarea } from "../../../components/ui/Input";
import FileUpload from "../../../components/ui/FileUpload";
import { generateInterviewReport } from "../services/interview.api";
import { useNavigate } from "react-router-dom";
import "../style/home.scss";

const Home = () => {
  const navigate = useNavigate();

  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!jobDescription || (!resumeFile && !selfDescription)) {
      alert("Please fill required fields (Job description + Resume PDF or Profile Summary)");
      return;
    }

    try {
      setLoading(true);
      const data = await generateInterviewReport({
        jobDescription,
        selfDescription,
        resumeFile,
      });

      navigate(`/interview/${data.interviewReport._id}`);
    } catch (error) {
      console.error(error);
      alert("Error generating interview report.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-layout">
      <Navbar />
      <main className="page-container interview-page-container">
        <PageHeader
          breadcrumb="Technical & Behavioral Question Generator"
          title="AI Interview Preparation"
          description="Practice role-specific technical, behavioral, and HR questions with expected evaluation criteria."
        />

        <Card elevated className="interview-form-card">
          <form onSubmit={handleGenerate}>
            <div className="interview-form-grid">
              <div className="interview-form-left">
                <Textarea
                  label="Target Job Description"
                  id="interviewJobDescInput"
                  placeholder="Paste the target job description or key technical requirements..."
                  rows={8}
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  required
                />
              </div>

              <div className="interview-form-right">
                <FileUpload
                  label="Upload Candidate Resume (PDF)"
                  onFileSelect={(file) => setResumeFile(file)}
                  selectedFile={resumeFile}
                  accept=".pdf"
                  maxSizeMB={3}
                />
                <Textarea
                  label="Or Self Description / Background Summary"
                  id="selfDescInput"
                  placeholder="Briefly state your current technical background or key project experience..."
                  rows={4}
                  value={selfDescription}
                  onChange={(e) => setSelfDescription(e.target.value)}
                />
              </div>
            </div>

            <div style={{ textAlign: 'right', marginTop: '24px' }}>
              <Button type="submit" variant="primary" size="lg" icon="sparkles" loading={loading}>
                Generate Interview Strategy
              </Button>
            </div>
          </form>
        </Card>
      </main>
    </div>
  );
};

export default Home;