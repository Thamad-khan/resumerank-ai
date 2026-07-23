# 🚀 ResumeRank AI

> AI-Powered Resume Screening & ATS Resume Ranking System built with **Next.js, Prisma, PostgreSQL, Gemini AI, and Tailwind CSS**.

ResumeRank AI helps recruiters automatically screen resumes against job descriptions using ATS scoring, AI-powered resume analysis, and skill matching.

---

## 📌 Features

### 👨‍💼 Recruiter Module

- Upload Job Description (PDF)
- Automatically extract required skills
- View uploaded jobs
- Delete Job Descriptions
- Upload resumes for any job
- Dashboard for managing jobs

### 📄 Resume Screening

- Upload Resume (PDF)
- Extract resume text automatically
- Parse candidate details
- Extract:
  - Name
  - Email
  - Phone
  - Education
  - Experience
  - Skills

### 🎯 ATS Score

- Automatic skill matching
- ATS Percentage
- Matching Skills
- Missing Skills
- Progress Bar

### 🤖 AI Resume Analysis

- Resume strengths
- Resume weaknesses
- Improvement suggestions
- Recommendation:
  - Excellent
  - Good Fit
  - Needs Improvement

### 👥 Candidate Management

- Store candidate details
- Save applications
- View ranked candidates
- ATS-based sorting

### 📊 Dashboard

- Recruiter Dashboard
- Candidate Dashboard
- Job Management
- Resume Upload
- ATS Results
- AI Analysis

---

# 🛠 Tech Stack

## Frontend

- Next.js 15 (App Router)
- React
- TypeScript
- Tailwind CSS

## Backend

- Next.js API Routes
- Prisma ORM

## Database

- PostgreSQL

## AI

- Google Gemini AI
- Custom ATS Scoring Engine

## PDF Processing

- pdf-parse

## Deployment

- Vercel

---

# 📂 Project Structure

```text
src/
│
├── app/
│   ├── api/
│   ├── dashboard/
│   ├── recruiter/
│   └── register/
│
├── components/
│   ├── dashboard/
│   ├── recruiter/
│   └── ui/
│
├── lib/
│   ├── prisma.ts
│   ├── atsScorer.ts
│   ├── aiAnalysis.ts
│   ├── pdfParser.ts
│   └── resumeParser.ts
│
└── prisma/
    └── schema.prisma
```

---

# ⚙️ Installation

Clone the repository

```bash
git clone https://github.com/yourusername/resumerank-ai.git
```

Move into the project

```bash
cd resumerank-ai
```

Install dependencies

```bash
npm install
```

Run Prisma

```bash
npx prisma generate

npx prisma db push
```

Start development server

```bash
npm run dev
```

Open

```
http://localhost:3000
```

---

# 🔑 Environment Variables

Create a `.env` file

```env
DATABASE_URL="postgresql://..."

GOOGLE_API_KEY="YOUR_GEMINI_API_KEY"
```

---

# 📊 ATS Scoring Workflow

```text
Resume PDF
      │
      ▼
Extract PDF Text
      │
      ▼
Resume Parser
      │
      ▼
Extract Skills
      │
      ▼
Compare with Job Skills
      │
      ▼
Calculate ATS Score
      │
      ▼
Generate AI Analysis
      │
      ▼
Save Candidate & Application
```

---

# 🤖 AI Analysis Includes

- ATS Score
- Matching Skills
- Missing Skills
- Resume Strengths
- Weaknesses
- Suggestions
- Final Recommendation

---

# 📡 API Routes

## Jobs

```text
POST   /api/upload/job
GET    /api/jobs
DELETE /api/jobs/[id]
```

## Resume

```text
POST /api/upload
```

## Candidates

```text
GET /api/candidates
```

---

# 📸 Screenshots

### Recruiter Dashboard

- Upload Job Description
- Manage Jobs
- Delete Jobs

### Resume Upload

- Upload PDF Resume
- ATS Score
- Matching Skills
- Missing Skills

### AI Resume Analysis

- Strengths
- Weaknesses
- Suggestions
- Recommendation

### Candidate Dashboard

- Ranked Candidates
- ATS Score
- Resume Details

> *(Add screenshots inside a `/screenshots` folder and update this section later.)*

---

# 🌟 Future Improvements

- Resume Ranking using Gemini AI
- Semantic Skill Matching
- Recruiter Authentication
- Candidate Authentication
- Interview Scheduling
- Email Notifications
- Resume Download
- Candidate Search & Filters
- Analytics Dashboard
- Multi-Company Support

---

# 🚀 Deployment

Live Demo

```
https://resumerank-ai.vercel.app
```

---

# 👨‍💻 Author

**Deshmukh Thamad Khan**

GitHub:
https://github.com/your-github-username

LinkedIn:
https://linkedin.com/in/your-profile

---

# 📜 License

This project is licensed under the **MIT License**.

---

# ⭐ Support

If you found this project helpful,

⭐ Star the repository

🍴 Fork the project

💡 Feel free to contribute

---

## Made with ❤️ using Next.js + Prisma + PostgreSQL + Gemini AI