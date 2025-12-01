# Frontend — Job Listing Portal

This folder contains the React frontend for the Job Listing Portal.

## What this contains
- React app using Create React App
- Tailwind CSS for styling (Tailwind v3)
- Pages: Login, Register, Forgot/Reset Password, Dashboard
- Components: Header, Footer, auth forms, and page components

## Quick start (development)
1. Install dependencies:

```powershell
cd .\Frontend
npm install
```

2. Start dev server:

```powershell
npm start
```

The app runs at `http://localhost:3000`.

## Environment (optional)
- If you need the frontend to call a backend running at a different host, set `REACT_APP_API_URL` in a `.env` file at the `Frontend/` root. Example:

```
REACT_APP_API_URL=http://localhost:5000
```

The app currently redirects to the backend OAuth route at `http://localhost:5000/api/auth/google` by default. Setting `REACT_APP_API_URL` allows you to change this behavior in code if desired.

## Build (production)

```powershell
cd .\Frontend
npm run build
```

Deployment: Serve the contents of the `build/` directory with your static host or configure the backend to serve static files.

## Troubleshooting
- PostCSS/Tailwind errors: Ensure `tailwindcss` is v3.x and `postcss.config.js` uses `require('tailwindcss')`.
- OAuth blank page: The login button redirects to the backend OAuth endpoint `http://localhost:5000/api/auth/google` — ensure backend is running and the callback URL is configured in Google console.
- API calls: If requests fail, make sure the Backend is running and CORS allows `http://localhost:3000`.

## Next steps (suggested)
- Add `REACT_APP_API_URL` usage in the auth fetch calls to avoid hardcoded backend host.
- Add e2e tests (Cypress) for auth flows.