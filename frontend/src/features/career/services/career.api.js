import api from "../../../services/api";

export const analyzeCareer = async ({ resumeFile, resumeText, jobDescription, selfDescription, targetRole }) => {
    const formData = new FormData();
    if (resumeFile) formData.append("resume", resumeFile);
    if (resumeText) formData.append("resumeText", resumeText);
    if (jobDescription) formData.append("jobDescription", jobDescription);
    if (selfDescription) formData.append("selfDescription", selfDescription);
    if (targetRole) formData.append("targetRole", targetRole);

    const response = await api.post("/api/career/analyze", formData, {
        headers: { "Content-Type": "multipart/form-data" }
    });
    return response.data;
};

export const getCareerProfile = async () => {
    const response = await api.get("/api/career/profile");
    return response.data;
};

export const getCareerRoadmap = async (data) => {
    const response = await api.post("/api/career/roadmap", data);
    return response.data;
};

export const getSkillGapAnalysis = async (data) => {
    const response = await api.post("/api/career/skill-gap", data);
    return response.data;
};

export const getJobRecommendations = async (data) => {
    const response = await api.post("/api/career/recommendations", data);
    return response.data;
};

export const getUserProgress = async () => {
    const response = await api.get("/api/career/progress");
    return response.data;
};

export const updateUserProgress = async (progressData) => {
    const response = await api.put("/api/career/progress", progressData);
    return response.data;
};
