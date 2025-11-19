/backend
├── node_modules/           # Dependencies
├── src/                    # All server source code
│   ├── config/             # Configuration files
│   │   └── db.js           # Database connection and setup (M6 focus)
│   ├── controllers/        # Business logic for routes
│   │   ├── **authController.js** # Contains login/register/hashing/token logic (M1 & M2 focus)
│   │   └── jobsController.js
│   ├── middleware/         # Functions that run before controllers
│   │   └── **authMiddleware.js** # JWT verification, Rate Limiting, CORS (M3 focus)
│   ├── models/             # Database schemas/data models (M6 focus)
│   │   └── User.js
│   ├── routes/             # API endpoint definitions
│   │   └── **auth.js** # Defines POST /login and POST /register endpoints (M1/M2)
│   ├── tests/              # Unit and Integration Tests (M6 focus)
│   └── server.js           # Application entry point
├── package.json            # Backend dependencies (Express, Hashing Library, JWT)
└── .env.example            # Example file for environment variables (e.g., JWT_SECRET)
