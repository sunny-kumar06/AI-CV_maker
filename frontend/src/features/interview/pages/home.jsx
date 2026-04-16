import React, { useState } from "react";
import "../style/home.scss";
import { generateInterviewReport } from "../services/interview.api";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const [resumeFile, setResumeFile] = useState(null);

  const handleGenerate = async () => {
    if (!jobDescription || (!resumeFile && !selfDescription)) {
      alert("Please fill required fields");
      return;
    }

    try {
      const data = await generateInterviewReport({
        jobDescription,
        selfDescription,
        resumeFile,
      });

      console.log("RESPONSE:", data);

      // ✅ IMPORTANT FIX
      navigate(`/interview/${data.interviewReport._id}`);

    } catch (error) {
      console.error(error);
      alert("Error generating report ❌");
    }
  };

  return (
    <div className="home">
      <h1>
        Create Your Custom <span>Interview Plan</span>
      </h1>

      <div className="container">
        <div className="card left">
          <h3>Target Job Description</h3>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste job description..."
          />
        </div>

        <div className="card right">
          <h3>Your Profile</h3>

          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setResumeFile(e.target.files[0])}
          />

          <p>OR</p>

          <textarea
            value={selfDescription}
            onChange={(e) => setSelfDescription(e.target.value)}
            placeholder="Write about yourself..."
          />

          <button onClick={handleGenerate}>
            Generate Interview Strategy
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;