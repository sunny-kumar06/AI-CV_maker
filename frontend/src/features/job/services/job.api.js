import api from "../../../services/api";

export const analyzeJobDescription = async ({ jobDescription }) => {
    const response = await api.post("/api/job/analyze", { jobDescription });
    return response.data;
};
