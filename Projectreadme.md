# Job-Listing-Portal

A full-stack Job Listing Portal connecting job seekers and employers. This README summarizes what's been implemented, how to run the project locally, environment variables, and troubleshooting tips.

---

## Status — What has been completed

- Frontend
    - React app with login, registration, password reset pages and dashboard pages.
    - Tailwind CSS configuration fixed (consolidated to Tailwind v3 to avoid PostCSS plugin conflicts).
    - Login component: handles email/password login and Google OAuth callback.
    - Header displays authenticated user name and dynamic role ("Employer" / "Job Seeker").

- Backend
    - Express server with auth routes (`/api/auth/register`, `/api/auth/login`, `/api/auth/google`).
    - MongoDB (Mongoose) User model and connection.
    - JWT-based authentication for protected routes.
    - Rate limiting added and configured to avoid proxy header errors.
    - Error responses standardized to `error` field to match frontend expectations.

---

## Tech stack

- Frontend: React, react-router, Tailwind CSS, PostCSS
- Backend: Node.js, Express, Mongoose, Passport (Google OAuth), express-rate-limit
- Database: MongoDB (Atlas or local)

---

## Project structure (high level)

- `Frontend/` — React app
    - `src/components/` — shared components (Header, Footer, Auth forms)
    - `src/pages/` — page-level components (LoginPage, RegisterPage, Dashboard)

- `Backend/` — Express API
    - `src/controllers/` — request handlers (authController.js)
    - `src/routes/` — route definitions
    - `src/models/` — Mongoose schemas (User.js)
    - `config/` — DB config

---

## Environment variables

Create a `.env` file in the `Backend/` folder with the following variables (example names):

```
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<strong_jwt_secret>
FRONTEND_URL=http://localhost:3000
GOOGLE_CLIENT_ID=<google_oauth_client_id>
GOOGLE_CLIENT_SECRET=<google_oauth_client_secret>
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
PORT=5000
```

Make sure your Google OAuth credentials are configured to allow `http://localhost:5000/api/auth/google/callback`.

---

## Running locally (development)

Open two terminals. All example commands are for PowerShell on Windows.

1) Backend (dev with nodemon)

```powershell
cd .\Backend
npm install
npm run dev
```

The backend listens on the port set in `.env` (default `5000`).

2) Frontend

```powershell
cd .\Frontend
npm install
npm start
```

The frontend runs on `http://localhost:3000` by default and proxies API calls to the backend where applicable.

---

## Building production frontend

```powershell
cd .\Frontend
npm run build
```

This generates a `build/` folder which can be served by a static server or deployed to hosting (Netlify, Vercel, etc.). If serving via the backend, copy or serve the `build` folder from the server.

---

## Key API endpoints (examples)

- POST `/api/auth/register` — register a new user
    - body: `{ firstName, lastName, email, password, userType }` where `userType` is `'job-seeker'` or `'employer'`

- POST `/api/auth/login` — login with email/password
    - body: `{ email, password }`

- GET `/api/auth/google` — initiate Google OAuth (frontend redirects the browser to this URL)

- GET `/api/auth/google/callback` — Google OAuth callback (backend then redirects to frontend with `token` and `user` in query string)

Note: Error responses from the API use `{ error: "..." }` and successful auth responses include `{ token, user }`.

---

## Testing the flows (quick)

1. Register a user as `userType: 'employer'` and refresh the frontend — header should show `Employer` next to the user.
2. Register a user as `userType: 'job-seeker'` — header should show `Job Seeker`.
3. Click "Continue with Google" on the Login page — the app should redirect to your backend OAuth route and ultimately return to the frontend with the JWT and user data.

If registration does not persist, check the backend terminal for error logs (validation, MongoDB errors). The backend has extra console logs for registration success/failure.

---

## Troubleshooting

- Tailwind build error: If you see the PostCSS plugin error, ensure `tailwindcss` is v3.x and `postcss.config.js` uses `require('tailwindcss')` (not `@tailwindcss/postcss`).
- OAuth blank page: Ensure frontend redirects to `http://localhost:5000/api/auth/google` (or your `BACKEND_URL`) — this is already fixed in the project.
- JWT / auth issues: Verify `JWT_SECRET` matches the backend `.env` and that frontend and backend agree on token storage (frontend saves token to `localStorage.token`).

---

## Next recommended improvements

- Add unit/integration tests for auth endpoints and frontend forms.
- Add server-side validation and more robust error messages.
- Improve UI feedback for OAuth flows (loading states / error screens).
- Add role-based route guards on frontend (only employers see employer dashboard links).

---

If you want, I can:
- commit the README changes and create a PR on the `dev` branch,
- add a short developer run script, or
- add a brief troubleshooting script to verify env variables and connectivity.

Feel free to tell me which addition you'd like next.