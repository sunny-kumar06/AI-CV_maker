# 🎯 AI CAREER ADVISOR – Skill-Job Matching & Personalized Career Guidance Platform

A production-ready full-stack MERN platform powered by Gemini 2.5 Flash AI, providing skill-job gap matching, 4-week personalized career roadmaps, job description parsing, ATS resume bullet improver, suitable role recommendations, interview preparation, and real-time learning progress tracking.

---

## 🌟 Key Features

1. **🤖 Full AI Career Advisor (`/advisor`)**
   - Analyzes candidate resumes (PDF / text) against target job descriptions and roles.
   - Calculates Readiness Score breakdown (Overall, Skill Match, Resume Quality, Interview Readiness, Project Strength).
   - Generates skill gap matrices, ranked priority skills, step-by-step 4-week learning roadmaps, and resume improvements.

2. **🗺️ Personalized Career Roadmap (`/roadmap`)**
   - 8-Stage progression flow: Current Profile → Skill Assessment → Missing Skills → Priority Skills → 4-Week Plan → Projects to Build → Interview Prep → Job Ready.
   - Week-by-week topics and milestone project tracking.

3. **⚡ Skill Priority Engine (`/skill-gap`)**
   - Categorizes skills into Matched (✓), Missing (✗), Partial (⚠), and Recommended (💡).
   - Ranks missing skills by Priority (HIGH / MEDIUM / LOW) with difficulty, necessity rationale, and learning paths.

4. **💼 Job Role Recommendation (`/job-recommendations`)**
   - Matches candidate background to multiple suitable roles (e.g. Full Stack Developer, Backend Developer, Software Engineer, Frontend Developer) with match percentage breakdown.

5. **📄 Job Description Analyzer (`/job-analyzer`)**
   - Extracts essential required skills, preferred skills, technologies, experience levels, and duties from any pasted job description.

6. **✨ AI Resume Improver & Builder (`/resume-builder`)**
   - Enhances resume bullet points with action verbs, quantifiable achievements, and ATS keywords without fabricating fake experience.

7. **🎤 AI Interview Preparation (`/interview-prep` & `/interview/:id`)**
   - Generates technical, behavioral, and resume-based questions with expected answer criteria and STAR response frameworks.

8. **📈 Learning Progress Tracker (`/progress`)**
   - Tracks real-time percentage progress of technical skills, completed roadmap topics, and built portfolio projects, persisted directly to MongoDB Atlas.

---

## 🛠 Tech Stack

- **Frontend**: React.js 19, Vite, React Router 7, Axios, SCSS
- **Backend**: Node.js, Express.js (v5)
- **Database**: MongoDB Atlas with Mongoose
- **AI Engine**: Gemini API (`@google/genai` - gemini-2.5-flash)
- **Authentication**: JWT, Cookie-Parser, Bearer Header Fallback, Token Blacklisting
- **PDF Processing**: `pdf-parse` & `multer`
- **Deployment**: Vercel (Frontend) & Render (Backend)

---

## 🚀 Environment Variables

### Backend (`backend/.env`)
```env
PORT=8080
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>
JWT_SECRET=your_jwt_secret_key
GOOGLE_GENAI_API_KEY=your_gemini_api_key
FRONTEND_URL=https://ai-cv-maker-gilt.vercel.app
NODE_ENV=development
```

### Frontend (`frontend/.env.local`)
```env
VITE_API_BASE_URL=http://localhost:8080
```

---

## 💻 Local Setup & Execution

### 1️⃣ Run Backend
```bash
cd backend
npm install
npm run dev
```

### 2️⃣ Run Frontend
```bash
cd frontend
npm install
npm run dev
```

---

## 📡 API Endpoints Summary

- `POST /api/auth/register` - User registration & token issuing
- `POST /api/auth/login` - User login & session setup
- `POST /api/auth/logout` - User logout & token blacklisting
- `GET /api/auth/get-me` - Get current authenticated user
- `POST /api/career/analyze` - Comprehensive Career Advisor analysis
- `GET /api/career/profile` - Fetch saved user career profile
- `POST /api/career/roadmap` - Get personalized 4-week career roadmap
- `POST /api/career/skill-gap` - Fetch skill gap matrix & priority ranking
- `POST /api/career/recommendations` - Get suitable job role recommendations
- `GET /api/career/progress` & `PUT /api/career/progress` - Fetch & update learning progress
- `POST /api/resume/analyze` & `POST /api/resume/improve` - Resume parsing & ATS bullet enhancement
- `POST /api/job/analyze` - Job description parsing
- `POST /api/interview/` - Generate AI interview questions & preparation plan
- `GET /api/interview/report/:id` - Fetch interview strategy report