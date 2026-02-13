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

## Hosting on Vercel

### Option 1: Frontend on Vercel + Backend on Vercel (Recommended)

#### Step 1: Set up MongoDB Atlas (Cloud Database)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and create a free account
2. Create a new cluster (free tier is fine)
3. Click "Connect" → "Connect your application"
4. Copy the connection string (looks like `mongodb+srv://user:password@cluster.xxxxx.mongodb.net/jobportal`)
5. Add your IP to allowed list or allow access from anywhere (0.0.0.0/0)

#### Step 2: Deploy Backend to Vercel

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com) and sign in with GitHub
3. Click "Add New" → "Project"
4. Import your GitHub repository
5. Set the **Root Directory** to `Backend`
6. Add **Environment Variables**:
   ```
   MONGO_URI=mongodb+srv://user:password@cluster.xxxxx.mongodb.net/jobportal
   JWT_SECRET=your-secure-jwt-secret
   SESSION_SECRET=your-secure-session-secret
   FRONTEND_URL=https://your-frontend-app.vercel.app
   ```
7. Deploy — note your backend URL (e.g., `https://jlp-backend.vercel.app`)

#### Step 3: Deploy Frontend to Vercel

1. In Vercel, click "Add New" → "Project"
2. Import the same repository
3. Set the **Root Directory** to `Frontend`
4. Add **Environment Variables**:
   ```
   REACT_APP_BACKEND_URL=https://jlp-backend.vercel.app
   ```
5. Deploy

#### Step 4: Update Backend FRONTEND_URL

1. Go to your backend project settings in Vercel
2. Update `FRONTEND_URL` to your actual frontend URL
3. Redeploy the backend

### Option 2: Frontend on Vercel + Backend on Railway/Render

If you prefer a traditional server for the backend:

#### Railway (Recommended for backend)

1. Go to [Railway](https://railway.app) and sign in with GitHub
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repo, set root directory to `Backend`
4. Add environment variables (same as above)
5. Railway auto-deploys and gives you a URL

#### Render

1. Go to [Render](https://render.com) and sign in
2. Create a new "Web Service"
3. Connect your GitHub repo, set root directory to `Backend`
4. Build Command: `npm install`
5. Start Command: `npm start`
6. Add environment variables

### Production Checklist

- [ ] Use MongoDB Atlas (not local MongoDB)
- [ ] Set secure JWT_SECRET and SESSION_SECRET (32+ random characters)
- [ ] Update CORS origin in `Backend/index.js` to your frontend URL
- [ ] Set `cookie.secure: true` in session config for HTTPS
- [ ] Update Google OAuth callback URL in Google Cloud Console
- [ ] Run `npm run build` in Frontend before deploying (Vercel does this automatically)

### Environment Variables Reference

**Backend (.env)**
```env
MONGO_URI=mongodb+srv://...
JWT_SECRET=generate-a-secure-random-string
SESSION_SECRET=another-secure-random-string
FRONTEND_URL=https://your-frontend.vercel.app
PORT=5000
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

**Frontend (.env)**
```env
REACT_APP_BACKEND_URL=https://your-backend.vercel.app
```

---

## License

MIT
Route	Page	Description
/	Landing Page	Home page with intro, CTA buttons
/auth	Auth Page	Choose login/register method
/login	Login	Email/password login form
/register	Registration	New user signup
/google	Google OAuth	Redirects to Google sign-in
/forgot-password	Forgot Password	Request password reset email
/reset-password/:token	Reset Password	Set new password
/dashboard	Job Seeker Dashboard	Job seeker's home after login
/employer-dashboard	Employer Dashboard	Employer's home after login
/profile	Job Seeker Profile	View profile
/profile-management	Profile Management	Edit profile & upload resume
/profile-details	Profile Details	Detailed profile view
/resume	Resume Management	Manage uploaded resumes
/applied-jobs	Applied Jobs	Jobs you've applied to
/jobs	Jobs List	Browse/search all jobs
/jobs/:id	Job Detail	Single job view + Apply button
/post-job	Post Job	Employer creates job listing
/employer-applications	Applications	Employer manages candidates
Want me to open one specific page to walk through its functionality?