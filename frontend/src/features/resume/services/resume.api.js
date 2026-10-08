import api from "../../../services/api";

export const analyzeResume = async ({ resumeFile, resumeText, targetRole }) => {
    const formData = new FormData();
    if (resumeFile) formData.append("resume", resumeFile);
    if (resumeText) formData.append("resumeText", resumeText);
    if (targetRole) formData.append("targetRole", targetRole);

    const response = await api.post("/api/resume/analyze", formData, {
        headers: { "Content-Type": "multipart/form-data" }
    });
    return response.data;
};

export const improveResume = async ({ resumeText, targetRole }) => {
    const response = await api.post("/api/resume/improve", { resumeText, targetRole });
    return response.data;
};
