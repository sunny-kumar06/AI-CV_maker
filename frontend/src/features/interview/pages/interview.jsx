import React, { useEffect, useState } from "react";
import "../style/interview.scss";
import { useParams } from "react-router-dom";
import { getInterviewReportById } from "../services/interview.api";

const Interview = () => {
    const { id } = useParams();

    const [report, setReport] = useState(null);
    const [activeTab, setActiveTab] = useState("technical");

    useEffect(() => {
        const fetchReport = async () => {
            const data = await getInterviewReportById(id);
            setReport(data.interviewReport);
        };

        if (id) fetchReport();
    }, [id]);

    if (!report) return <h2>Loading...</h2>;

    return (
        <div className="interview-layout">

            {/* LEFT MENU */}
            <div className="sidebar">
                <h3>Sections</h3>

                <button onClick={() => setActiveTab("technical")}>
                    Technical
                </button>

                <button onClick={() => setActiveTab("behavioral")}>
                    Behavioral
                </button>

                <button onClick={() => setActiveTab("plan")}>
                    Preparation Plan
                </button>
            </div>

            {/* CENTER CONTENT */}
            <div className="content">

                {activeTab === "technical" && (
                    <>
                        <h2>💻 Technical Questions</h2>
                        {report.technicalQuestions.map((q, i) => (
                            <div className="card" key={i}>
                                <p className="question">{q.question}</p>
                                <p className="answer">{q.answer}</p>
                            </div>
                        ))}
                    </>
                )}

                {activeTab === "behavioral" && (
                    <>
                        <h2>🧠 Behavioral Questions</h2>
                        {report.behavioralQuestions.map((q, i) => (
                            <div className="card" key={i}>
                                <p className="question">{q.question}</p>
                                <p className="answer">{q.answer}</p>
                            </div>
                        ))}
                    </>
                )}

                {activeTab === "plan" && (
                    <>
                        <h2>📅 Preparation Plan</h2>
                        {report.preparationPlan.map((p, i) => (
                            <div className="card" key={i}>
                                <h3>Day {p.day}</h3>
                                <p>{p.focus}</p>
                                <ul>
                                    {p.tasks.map((t, idx) => (
                                        <li key={idx}>{t}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </>
                )}

            </div>

            {/* RIGHT PANEL */}
            <div className="right-panel">
                <h3>⚠ Skill Gaps</h3>

                {report.skillGaps.map((s, i) => (
                    <div className="tag" key={i}>
                        {s.skill}
                    </div>
                ))}

                <div className="score">
                    Score: {report.matchScore}%
                </div>
            </div>

        </div>
    );
};

export default Interview;