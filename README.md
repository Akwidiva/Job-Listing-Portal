# Job Listing Portal (JLP)

A full-stack web application connecting job seekers with employers. Built with React, Node.js/Express, and MongoDB.

## Features

- **User Authentication** — Register/login with email or Google OAuth, secure JWT-based sessions
- **Job Search** — Browse and filter jobs by keyword, location, and type
- **Profile Management** — Job seekers: personal info, resume upload; Employers: company profile
- **Job Listings** — Employers can create, edit, and delete job postings
- **Job Applications** — Apply directly; employers manage candidates and update statuses
- **Dashboards** — Separate dashboards for job seekers and employers

---

## Prerequisites

- **Node.js** v18+ (recommended v20)
- **MongoDB** running locally on port 27017 (or update `.env` with your connection string)
- **npm** (comes with Node.js)

---

## Quick Start

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd JLP
```

### 2. Install dependencies

```bash
# Backend
cd Backend
npm install

# Frontend
cd ../Frontend
npm install
```

### 3. Configure environment variables

Create `Backend/.env` (or copy from `Backend/.env.example`):

```env
MONGO_URI=mongodb://localhost:27017/jobportal
JWT_SECRET=your-jwt-secret
SESSION_SECRET=your-session-secret
FRONTEND_URL=http://localhost:3000
PORT=5000
```

### 4. Start MongoDB

If using local MongoDB:

```bash
# Windows (if installed as service)
net start MongoDB

# Or run manually
mongod --dbpath "C:\data\db"
```

### 5. Seed the database (optional)

```bash
cd Backend
npm run seed
```

This creates sample users and a job:
- **Job Seeker:** `seeker@example.com` / `Password123!`
- **Employer:** `employer@example.com` / `Password123!`

### 6. Start the servers

Open two terminals:

**Terminal 1 — Backend:**
```bash
cd Backend
npm run dev
```

**Terminal 2 — Frontend:**
```bash
cd Frontend
npm start
```

### 7. Open the app

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login |
| GET | `/api/auth/google` | Google OAuth |
| GET | `/api/profile` | Get user profile |
| PUT | `/api/profile` | Update profile |
| POST | `/api/profile/resume` | Upload resume |
| GET | `/api/jobs` | List jobs (with filters) |
| GET | `/api/jobs/:id` | Get single job |
| POST | `/api/jobs` | Create job (employer) |
| PUT | `/api/jobs/:id` | Update job |
| DELETE | `/api/jobs/:id` | Delete job |
| GET | `/api/applications` | List applications |
| POST | `/api/applications` | Apply to job |
| PUT | `/api/applications/:id` | Update application status |
| GET | `/api/employer/profile` | Get employer profile |
| PUT | `/api/employer/profile` | Update employer profile |

---

## Project Structure

```
JLP/
├── Backend/
│   ├── src/
│   │   ├── config/         # DB and Passport config
│   │   ├── controllers/    # Route handlers
│   │   ├── middleware/     # Auth middleware
│   │   ├── models/         # Mongoose schemas
│   │   ├── routes/         # Express routes
│   │   └── utils/          # Seed script
│   ├── uploads/            # Uploaded resumes
│   ├── index.js            # Entry point
│   └── package.json
├── Frontend/
│   ├── src/
│   │   ├── components/     # Header, Footer, Sidebars
│   │   └── pages/          # All page components
│   ├── public/
│   └── package.json
└── README.md
```

---

## Scripts

### Backend

| Script | Command | Description |
|--------|---------|-------------|
| Start (prod) | `npm start` | Run with Node |
| Start (dev) | `npm run dev` | Run with Nodemon |
| Seed DB | `npm run seed` | Populate sample data |

### Frontend

| Script | Command | Description |
|--------|---------|-------------|
| Start | `npm start` | Run dev server |
| Build | `npm run build` | Production build |

---

## Test Accounts

After running `npm run seed`:

| Role | Email | Password |
|------|-------|----------|
| Job Seeker | seeker@example.com | Password123! |
| Employer | employer@example.com | Password123! |

---

## Tech Stack

- **Frontend:** React, React Router, Tailwind CSS
- **Backend:** Node.js, Express, Passport.js
- **Database:** MongoDB with Mongoose
- **Auth:** JWT, bcrypt, Google OAuth 2.0

---

## License

MIT
