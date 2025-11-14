# Job-Listing-Portal
Our Job Listing Portal is a dynamic web application designed to connect job seekers with potential employers efficiently.

📁 Project Folder Structure
Job-Listing-Portal/
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ │ ├── Auth/
│ │ │ │ ├── LoginForm.js
│ │ │ │ └── RegisterForm.js
│ │ ├── pages/
│ │ │ ├── LoginPage.js
│ │ │ └── RegisterPage.js
│ └── ... (other client-side files)
├── backend/
│ ├── src/
│ │ ├── routes/
│ │ │ └── auth.js <-- Endpoints for /api/login and /api/register
│ │ ├── controllers/
│ │ │ └── authController.js
│ │ ├── middleware/
│ │ │ └── authMiddleware.js <-- JWT verification, Rate Limiting
│ │ └── config/
│ │ └── db.js
│ └── ... (other server-side files)
└── package.json (root)
