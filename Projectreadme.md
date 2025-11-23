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




Job Listing Portal: User Authentication Module

This document outlines the structure, responsibilities, and implementation flow for the initial User Authentication (Auth) module of the Job Listing Portal project. This module is critical as it establishes security, user identity, and session management for the entire application.

🎯 Project Scope: User Authentication

The goal is to implement a secure system for user registration, login, session handling, and access control.

Core Features to be Implemented:

User Registration (/api/register): Securely store user credentials and profile information (Name, Email, Password Hash, User Type).

User Login (/api/login): Verify user credentials and issue a signed JSON Web Token (JWT).

Session Management: Implement JWT verification middleware for protected routes.

Security: Implement robust password hashing (Bcrypt/Argon2) and rate limiting.

👥 Team Division (6 Members)

The work is divided into three parallel streams: Back-End API, Front-End UI, and Infrastructure/Security.

I. Back-End Team (Members 1, 2, 3, 6)

Member

Role Focus

Specific Tasks (Deliverables)

Member 1

Registration API

Develop /api/register, implement password hashing (Bcrypt/Argon2), and handle database insertion logic.

Member 2

Login API & Token Generation

Develop /api/login, implement password verification, and handle JWT creation and signing.

Member 3

Security Middleware

Implement Rate Limiting on auth endpoints and develop the JWT Authentication Middleware for protected routes. Configure CORS and HTTPS/SSL.

Member 6

Database & Testing

Finalize the Users Database Schema (Email, Hash, Salt, User Type, etc.). Write and execute comprehensive Unit and Integration Tests for all Back-End endpoints (M1, M2, M3).

II. Front-End Team (Members 4, 5)

Member

Role Focus

Primary Components

Member 4

Login UI & Session Handling

Design and build the Login Form/Page (pages/LoginPage.js, components/Auth/LoginForm.js). Implement client-side token storage and session check logic.

Member 5

Registration UI & Reset

Design and build the Registration Form/Page (pages/RegisterPage.js, components/Auth/RegisterForm.js). Implement client-side form validation and success/error states.

📁 Project Folder Structure

The project uses a standard two-folder microservice architecture:

Job-Listing-Portal/
├── frontend/                     # React Application (M4, M5 Focus)
│   ├── src/
│   │   ├── api/                  # API call wrappers (e.g., auth.js)
│   │   ├── components/
│   │   │   └── auth/           # LoginForm.js, RegisterForm.js
│   │   └── pages/              # LoginPage.js, RegisterPage.js, Dashboard.js
│
└── backend/                      # Server/API (M1, M2, M3, M6 Focus)
    ├── src/
    │   ├── controllers/        # authController.js (M1, M2 logic)
    │   ├── middleware/         # authMiddleware.js (M3 security)
    │   ├── routes/             # auth.js (Endpoint definitions)
    │   └── config/             # db.js (M6 schema/connection)


🔗 Implementation Flow and Dependencies

Adhering to this flow is critical to ensure team members are not blocked.

Phase 1: Foundation (M6 & M3 Setup)

M6 (Database): Must finalize the Users table schema first.

M3 (Infrastructure): Must configure the basic project environment, CORS policies, and HTTPS readiness.

M2 & M1 (API Contract): Must jointly define the exact request/response formats for /api/login and /api/register to unblock the Front-End team.

Phase 2: Parallel Core Development

Back-End (M1 & M2): Work in parallel on the registration and login endpoint logic. M1's hashing logic must be defined before M2 can implement the password verification step.

Front-End (M4 & M5): Work in parallel on the UI components and client-side validation using mock data immediately after the API Contract is defined.

Phase 3: Security & Verification

M3 (Middleware): Implements Rate Limiting immediately. The full Authentication Middleware depends on M2 defining the final JWT structure (payload fields and signature algorithm).

M6 (Testing): Continuously writes and executes tests on all M1, M2, and M3 endpoints to ensure security and functionality requirements are met