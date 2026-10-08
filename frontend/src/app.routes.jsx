import { createBrowserRouter } from "react-router-dom";
import Login from './features/auth/pages/Login.jsx';
import Register from './features/auth/pages/Register.jsx';
import Protected from "./features/auth/components/protected.jsx";

// Pages
import Dashboard from "./pages/Dashboard.jsx";
import CareerAdvisor from "./pages/CareerAdvisor.jsx";
import CareerRoadmapPage from "./pages/CareerRoadmapPage.jsx";
import SkillGapPage from "./pages/SkillGapPage.jsx";
import JobRecommendationsPage from "./pages/JobRecommendationsPage.jsx";
import JobAnalyzerPage from "./pages/JobAnalyzerPage.jsx";
import ResumeBuilderPage from "./pages/ResumeBuilderPage.jsx";
import ProgressPage from "./pages/ProgressPage.jsx";

// Existing Interview Features
import Home from "./features/interview/pages/home.jsx";
import Interview from "./features/interview/pages/interview.jsx";

export const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/",
        element: (
            <Protected>
                <Dashboard />
            </Protected>
        )
    },
    {
        path: "/advisor",
        element: (
            <Protected>
                <CareerAdvisor />
            </Protected>
        )
    },
    {
        path: "/roadmap",
        element: (
            <Protected>
                <CareerRoadmapPage />
            </Protected>
        )
    },
    {
        path: "/skill-gap",
        element: (
            <Protected>
                <SkillGapPage />
            </Protected>
        )
    },
    {
        path: "/job-recommendations",
        element: (
            <Protected>
                <JobRecommendationsPage />
            </Protected>
        )
    },
    {
        path: "/job-analyzer",
        element: (
            <Protected>
                <JobAnalyzerPage />
            </Protected>
        )
    },
    {
        path: "/resume-builder",
        element: (
            <Protected>
                <ResumeBuilderPage />
            </Protected>
        )
    },
    {
        path: "/interview-prep",
        element: (
            <Protected>
                <Home />
            </Protected>
        )
    },
    {
        path: "/interview/:id",
        element: (
            <Protected>
                <Interview />
            </Protected>
        )
    },
    {
        path: "/progress",
        element: (
            <Protected>
                <ProgressPage />
            </Protected>
        )
    }
]);