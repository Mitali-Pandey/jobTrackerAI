# JobTrackr AI

A full-stack MERN application for tracking job applications with AI-powered resume matching. Built to solve a real problem — keeping applications, interviews, and offers organized instead of scattered across spreadsheets.

## Features

- **Authentication** — Register, login, and logout with JWT stored in HTTP-only cookies (bcrypt password hashing)
- **Application tracking** — Full CRUD for job applications (company, role, status, notes, job link)
- **Dashboard** — At-a-glance stats: total applications, interviews, offers, rejections
- **AI resume matching** — Upload a resume (PDF) and a job description to get an AI-generated match score, missing keywords, and feedback (powered by Google Gemini)
- **Protected routes** — Dashboard and application pages are only accessible when logged in

## Tech Stack

**Frontend:** React (Vite), Tailwind CSS, React Router, Axios

**Backend:** Node.js, Express, MongoDB, Mongoose, JWT, bcryptjs, Multer, pdfjs-dist

**AI:** Google Gemini API

**Database:** MongoDB Atlas

## Project Structure

jobTrackerAI/
- backend/
  - config/ (MongoDB connection)
  - controllers/ (route logic: auth, applications, AI)
  - middleware/ (JWT auth guard, file upload, error handling)
  - models/ (Mongoose schemas: User, Application)
  - routes/ (API routes)
  - utils/ (token generation, resume parsing)
  - server.js
- frontend/
  - src/
    - api/ (Axios instance)
    - components/ (navbar, forms, cards)
    - context/ (auth context, global login state)
    - hooks/ (useAuth hook)
    - pages/ (Landing, Login, Register, Dashboard, Applications)

## Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB Atlas account (free tier works)
- Google Gemini API key from aistudio.google.com/apikey

### 1. Clone the repository

git clone https://github.com/Mitali-Pandey/jobTrackerAI.git
cd jobTrackerAI

### 2. Backend setup

cd backend
npm install

Run the backend:

npm run dev

Server runs on http://localhost:5000

### 3. Frontend setup

Open a new terminal:

cd frontend
npm install

Create a `.env` file in `frontend/` with:

VITE_API_URL=http://localhost:5000/api

Run the frontend:

npm run dev

App runs on http://localhost:5173

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register a new user |
| POST | /api/auth/login | Log in |
| POST | /api/auth/logout | Log out |
| GET | /api/auth/me | Get current logged-in user |
| GET | /api/applications | Get all applications for the user |
| POST | /api/applications | Create a new application |
| GET | /api/applications/:id | Get a single application |
| PUT | /api/applications/:id | Update an application |
| DELETE | /api/applications/:id | Delete an application |
| POST | /api/ai/match/:applicationId | Upload resume + job description, get AI match score |


## Author

**Mitali Pandey**

- GitHub: https://github.com/Mitali-Pandey
- LinkedIn: https://www.linkedin.com/in/mitali-pandey-288166256/
