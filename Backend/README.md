# Backend — Job Listing Portal

This folder contains the Express API for the Job Listing Portal.

## What this contains
- Express server with authentication routes and middleware
- Mongoose models (User schema)
- Passport.js Google OAuth configuration

## Environment variables
Create a `.env` file in the `Backend/` folder with these variables:

```
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<strong_jwt_secret>
FRONTEND_URL=http://localhost:3000
GOOGLE_CLIENT_ID=<google_oauth_client_id>
GOOGLE_CLIENT_SECRET=<google_oauth_client_secret>
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
PORT=5000
```

## Quick start (development)

```powershell
cd .\Backend
npm install
npm run dev
```

The server starts (nodemon) and listens on the port set in `.env` (default `5000`).

## Important endpoints
- `POST /api/auth/register` — register a new user
- `POST /api/auth/login` — login and receive JWT
- `GET /api/auth/google` — start Google OAuth
- `GET /api/auth/google/callback` — OAuth callback; server redirects to the frontend with token and user

## Logging & debugging
- Registration: check backend console for `User saved successfully` logs or error output.
- MongoDB errors: ensure `MONGO_URI` is correct and the cluster allows connections from your IP.

## Production notes
- Use a strong `JWT_SECRET` and keep it secret.
- Configure https and production-level rate-limiting.

## Next steps (suggested)
- Add automated tests for auth endpoints.
- Add health-check endpoint and a small script to verify `.env` values.
