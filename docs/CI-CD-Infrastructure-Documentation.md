# ZyraTech Website - Complete Infrastructure & CI/CD Pipeline

## Project Overview
- **Frontend Framework:** React 19 + Vite 7
- **State Management:** Redux Toolkit
- **Styling:** Tailwind CSS 4
- **Backend API:** Node.js (Hosted separately)
- **Database:** RDS + Supabase
- **Hosting:** AWS Amplify
- **CI/CD:** GitHub Actions
- **Monitoring:** CloudWatch
- **Environments:** Staging & Production

---

## PART 1: LOCAL DEVELOPMENT FLOW

### 1.1 Developer Workflow
```
Developer Machine
├── Git Repository (Local)
├── npm dev (Local Server on port 5173)
├── Code Editing
│   ├── Pages (React components)
│   ├── Components (Reusable UI)
│   ├── Services (API calls via Axios)
│   ├── Store (Redux state)
│   └── Styles (Tailwind CSS)
├── npm run lint (ESLint)
└── npm run test (Vitest)
```

### 1.2 Local Development Server
- **Port:** 5173 (Vite dev server)
- **Framework:** React with Fast Refresh
- **API Proxy:** Dev server proxies `/api/*` to `https://api.zyratechhub.com`
- **Proxy Config (vite.config.js):**
  ```
  /api → https://api.zyratechhub.com
  changeOrigin: true
  secure: false
  ```

### 1.3 Local Environment Variables
**File:** `.env` (local, not in git)
```
VITE_API_BASE_URL=https://api.zyratechhub.com/api
VITE_ENABLE_DYNAMIC_API=true
VITE_APP_NAME=Zyra Tech Hub
VITE_APP_URL=https://zyratechhub.com
```

---

## PART 2: SOURCE CODE STRUCTURE

### 2.1 Application Architecture

```
Frontend Application (React + Vite)
│
├── src/
│   ├── main.jsx (Entry point)
│   ├── App.jsx (Routing setup)
│   │   └── Subdomain Detection
│   │       ├── Admin Subdomain (admin.zyratechhub.com)
│   │       └── Public Subdomain (zyratechhub.com)
│   │
│   ├── pages/ (Page Components)
│   │   ├── public/
│   │   │   ├── home/
│   │   │   ├── about/
│   │   │   ├── projects/
│   │   │   ├── training/
│   │   │   ├── jobs/
│   │   │   ├── blog/
│   │   │   ├── gallery/
│   │   │   └── ... (other public pages)
│   │   │
│   │   └── admin/
│   │       ├── DashboardPage
│   │       ├── LoginPage
│   │       ├── projects/
│   │       │   ├── ProjectsManagementPage
│   │       │   ├── ProjectFormPage
│   │       │   └── ProjectDetailsPage
│   │       ├── training/
│   │       ├── jobs/
│   │       ├── blog/
│   │       ├── gallery/
│   │       └── ... (admin modules)
│   │
│   ├── components/
│   │   ├── pages/
│   │   │   ├── projects/ (ProjectCard, PortfolioShowcase)
│   │   │   ├── jobs/
│   │   │   ├── training/
│   │   │   └── ...
│   │   ├── admin/
│   │   │   ├── layout/ (AdminLayout, ProtectedRoute)
│   │   │   ├── shared/ (NotificationSystem, ConfirmDialog)
│   │   │   └── ...
│   │   ├── Navbar
│   │   ├── Footer
│   │   └── ...
│   │
│   ├── services/ (API Layer - Axios)
│   │   ├── api.js (Axios instance with interceptors)
│   │   ├── authService.js
│   │   ├── projectsService.js
│   │   ├── trainingService.js
│   │   ├── jobsService.js
│   │   ├── blogService.js
│   │   ├── galleryService.js
│   │   └── ... (20+ services)
│   │
│   ├── store/ (Redux)
│   │   ├── index.js
│   │   └── slices/
│   │       ├── authSlice.js (Auth state)
│   │       ├── uiSlice.js (UI notifications, dialogs)
│   │       ├── usersSlice.js
│   │       ├── coursesSlice.js
│   │       ├── paymentsSlice.js
│   │       └── settingsSlice.js
│   │
│   ├── hooks/
│   │   ├── usePermissions.js
│   │   ├── useSEO.js
│   │   └── ...
│   │
│   ├── utils/
│   │   ├── phoneValidation.js
│   │   └── ...
│   │
│   ├── data/
│   │   ├── projectsData.js
│   │   └── ...
│   │
│   └── assets/ (Images, fonts, etc.)
│
├── public/ (Static assets)
│   ├── images/ (Project images, screenshots)
│   ├── favicon.ico
│   └── sitemap.xml (Generated)
│
├── dist/ (Build output - generated)
│   ├── index.html
│   ├── js/ (JavaScript chunks - hashed)
│   ├── assets/ (CSS, fonts - hashed)
│   └── images/ (Image assets - hashed)
│
├── scripts/
│   ├── generate-sitemap.js
│   └── ... (utility scripts)
│
└── Configuration Files
    ├── package.json (Dependencies & scripts)
    ├── vite.config.js (Build & dev config)
    ├── vitest.config.js (Testing config)
    ├── eslint.config.js (Linting rules)
    ├── amplify.yml (Amplify deployment config)
    ├── .env.example (Template)
    └── .github/workflows/ci.yml (GitHub Actions)
```

### 2.2 Data Flow (Request → Response)

```
User Interaction (Click, Form Submit, etc.)
    ↓
React Component
    ↓
Redux Action (if state-managed)
    ↓
Service Layer (api/projectsService/etc.)
    ↓
Axios API Call with Interceptors
    ├── Request Interceptor
    │   ├── Attach Authorization Bearer Token
    │   ├── Log request details
    │   └── Handle FormData (multipart/form-data)
    │
    ↓ (HTTP Request over Network)
    ↓
Backend API (Node.js)
    ├── Route handler
    ├── Business logic
    ├── Database query (RDS/Supabase)
    └── Response with data
    
    ↓ (HTTP Response)
    ↓
Axios Response Interceptor
    ├── Check status code
    ├── If 401 (expired token)
    │   ├── Call /auth/refresh endpoint
    │   ├── Get new token
    │   ├── Retry original request
    │   └── Store new token in localStorage
    ├── If 200-299 (success)
    │   └── Return response
    └── If 400+ (error)
        └── Extract error message
            └── Throw error
    
    ↓
React Component receives data
    ├── Update component state
    ├── Render UI with new data
    └── Handle errors (show notification)
```

---

## PART 3: BUILD PROCESS

### 3.1 Local Build
```bash
npm run build
```

**Steps:**
1. **Sitemap Generation:** `node scripts/generate-sitemap.js`
   - Generates SEO sitemap.xml
   
2. **Vite Build** (Production bundle)
   - **Input:** `src/` files
   - **Output:** `dist/` directory
   - **Asset Optimization:**
     - JavaScript chunks (hashed: `js/[name]-[hash].js`)
     - CSS (hashed: `assets/[name]-[hash].css`)
     - Images (hashed: `images/[name]-[hash].png`)
     - **Cache Strategy:** Images/JS/CSS use hash-based cache busting
   
3. **Vite Optimizations:**
   - Code splitting into chunks:
     - `react-vendor.js` (react, react-dom, react-router-dom)
     - `framer-motion.js`
     - `icons.js` (lucide-react)
   - Tree-shaking (remove unused code)
   - Minification
   - Source map generation (disabled in production)
   - Image optimization (inline images < 4KB as base64)

4. **Output:**
   - `dist/index.html` (HTML shell)
   - `dist/js/*.js` (JavaScript chunks)
   - `dist/assets/*.css` (Stylesheets)
   - `dist/images/*` (Images)
   - `dist/sitemap.xml`

---

## PART 4: CI/CD PIPELINE (GitHub Actions)

### 4.1 Trigger Points

**File:** `.github/workflows/ci.yml`

**Triggers:**
- Push to `main` branch
- Push to `dev` branch
- Pull Request to `main` or `dev`

### 4.2 CI Workflow Steps

```
Trigger Event (Push or PR)
    ↓
GitHub Actions Runner (ubuntu-latest)
    ├── Step 1: Checkout Code
    │   └── actions/checkout@v4
    │
    ├── Step 2: Setup Node.js 20
    │   ├── actions/setup-node@v4
    │   └── Cache npm dependencies
    │
    ├── Step 3: Install Dependencies
    │   └── npm ci (clean install)
    │
    ├── Step 4: Lint Check
    │   ├── npm run lint
    │   ├── Run ESLint on entire codebase
    │   └── FAIL if linting errors
    │
    ├── Step 5: Build Check
    │   ├── npm run build
    │   ├── Environment variables injected:
    │   │   ├── VITE_API_BASE_URL (from secrets)
    │   │   └── VITE_ENABLE_DYNAMIC_API (from secrets)
    │   ├── Generate sitemap
    │   ├── Bundle application
    │   └── FAIL if build errors
    │
    ├── Result
    │   ├── SUCCESS → Allow merge (if PR)
    │   │             Proceed to deployment
    │   └── FAILURE → Block merge
    │                 Show error logs
```

### 4.3 CI Job Details

**Job Name:** "Build & Lint Check"

**Runs on:** `ubuntu-latest`

**Environment Variables (from GitHub Secrets):**
- `VITE_API_BASE_URL` - API endpoint URL
- `VITE_ENABLE_DYNAMIC_API` - Feature flag

**Caching:**
- **npm cache:** Speeds up `npm ci`

---

## PART 5: DEPLOYMENT PIPELINES

### 5.1 Staging Deployment

```
Developer pushes to 'dev' branch
    ↓
GitHub Actions CI runs (lint + build)
    ├── SUCCESS
    │   ↓
    │   AWS Amplify Webhook Triggered
    │   ├── Clone `dev` branch
    │   ├── Run amplify.yml preBuild
    │   │   └── npm ci
    │   ├── Run amplify.yml build
    │   │   ├── Set environment variables
    │   │   │   └── VITE_API_BASE_URL=https://api-staging.zyratechhub.com/api
    │   │   ├── npm run build
    │   │   ├── Generate dist/
    │   │   └── Generate sitemap
    │   ├── Deploy to Amplify
    │   │   ├── Upload dist/ to S3
    │   │   ├── CloudFront invalidation
    │   │   └── Update DNS
    │   ├── Set custom headers (amplify.yml)
    │   │   ├── Cache-Control headers
    │   │   ├── Security headers (X-Frame-Options, X-Content-Type-Options)
    │   │   ├── Referrer-Policy
    │   │   └── CSP (Content Security Policy)
    │   ├── Configure routing rules
    │   │   ├── /admin/** → index.html (SPA routing)
    │   │   ├── /training/** → index.html
    │   │   ├── /admin → index.html
    │   │   └── Assets bypass routing
    │   └── Live on: https://dev.zyratechhub.com (or staging URL)
    │
    └── FAILURE
        └── Deployment blocked
            Error notifications sent
```

### 5.2 Production Deployment

```
Developer creates Pull Request: dev → main
    ↓
GitHub Actions CI runs
    ├── Lint check
    ├── Build check
    └── SUCCESS
    
    ↓
Code Review & Approval
    ├── Team reviews changes
    └── Approves PR

    ↓
Merge PR to 'main' branch
    ├── GitHub Actions triggered again
    ├── Lint + Build check (redundant verification)
    ├── SUCCESS
    │   ↓
    │   AWS Amplify Webhook Triggered
    │   ├── Clone `main` branch
    │   ├── Run amplify.yml preBuild
    │   │   └── npm ci
    │   ├── Run amplify.yml build
    │   │   ├── Set environment variables
    │   │   │   └── VITE_API_BASE_URL=https://api.zyratechhub.com/api
    │   │   ├── npm run build
    │   │   ├── Generate dist/
    │   │   └── Generate sitemap
    │   ├── Deploy to Amplify (Production)
    │   │   ├── Upload dist/ to S3
    │   │   ├── CloudFront invalidation
    │   │   └── Update DNS
    │   ├── Set custom headers
    │   ├── Configure routing rules
    │   ├── Enable HTTP/2, compression
    │   └── Live on: https://zyratechhub.com
    │
    └── FAILURE
        └── Deployment blocked
            Rollback to previous version
```

### 5.3 Amplify Configuration Details (amplify.yml)

**PreBuild Phase:**
```
npm ci
```
- Clean install of dependencies (exact versions from lock file)

**Build Phase:**
```
1. Export environment variables (VITE_*)
2. npm run build
   ├── Runs generate-sitemap.js
   └── Runs vite build
3. Output: dist/ directory
```

**Artifacts:**
```
baseDirectory: dist/
files: **/*
```
- Deploy entire dist folder to Amplify

**Cache:**
```
paths:
  - node_modules/**/*
```
- Cache node_modules for faster builds

**Custom Headers (all files):**
- `index.html`: No cache, security headers
- `js/*.js`: Long-term cache (1 year, immutable)
- `assets/*`: Long-term cache (1 year, immutable)
- `images/*`: Long-term cache (1 year, immutable)

**Routing Rules:**
- SPA routing: Non-matching URLs redirect to `index.html`
- Asset routes bypass routing (static files served directly)

---

## PART 6: RUNTIME FLOW

### 6.1 Staging Environment (dev.zyratechhub.com)

```
User Browser (https://dev.zyratechhub.com)
    ↓
AWS Amplify CDN (Cloudfront)
    ├── Check cache
    ├── If cached → return cached content
    └── If not cached → return from S3
    
    ↓
Browser receives index.html
    ├── Download JavaScript chunks
    ├── Download CSS
    └── Download images
    
    ↓
React App Boots
    ├── Load Redux store
    ├── Initialize routing
    ├── Load Redux persisted state (if any)
    └── Render first page
    
    ↓
Browser makes API calls to:
    └── https://api-staging.zyratechhub.com/api/*
    
    ↓
Backend (Node.js)
    ├── Process request
    ├── Query RDS database
    ├── Return JSON response
    └── Browser receives data
    
    ↓
React updates UI with data
    ├── Components re-render
    ├── Redux state updates
    └── User sees content
    
↔️ Ongoing
    ├── User interactions trigger API calls
    ├── Form submissions
    ├── Data updates
    ├── Admin operations
    └── Monitoring via CloudWatch
```

### 6.2 Production Environment (zyratechhub.com)

```
Same flow as staging, but:
├── URL: https://zyratechhub.com (instead of dev)
├── API: https://api.zyratechhub.com/api/* (production endpoint)
├── Database: RDS Production instance
├── Monitoring: CloudWatch (production metrics)
└── Performance: Higher SLA, more monitoring
```

---

## PART 7: API INTEGRATION LAYER

### 7.1 Axios Instance (src/services/api.js)

```
Features:
├── Base URL: VITE_API_BASE_URL (from env)
├── Headers: Content-Type: application/json
└── Interceptors
```

### 7.2 Request Interceptor

```
Outgoing HTTP Request
    ↓
Interceptor executes
    ├── Get token from localStorage
    │   ├── adminToken (admin users)
    │   └── token (fallback)
    ├── Attach Bearer token to Authorization header
    ├── Log request details
    ├── Handle FormData (multipart/form-data for file uploads)
    └── Return modified config

    ↓
Request sent to backend
```

### 7.3 Response Interceptor

```
Response from backend
    ↓
Interceptor executes
    ├── If status 200-299
    │   └── Log response details
    │       Return response
    │
    ├── If status 401 (Unauthorized)
    │   ├── Token expired
    │   ├── Get refreshToken from localStorage
    │   ├── Call POST /auth/refresh
    │   ├── Get new access token
    │   ├── Update localStorage with new token
    │   ├── Retry original request with new token
    │   └── If refresh fails → clear auth, redirect to login
    │
    ├── If status 400-500+
    │   ├── Extract error message
    │   ├── Attach to error object
    │   └── Throw error (component catches & displays)
    │
    └── Return response or throw error
```

---

## PART 8: STATE MANAGEMENT (Redux)

### 8.1 Redux Store Structure

```
Redux Store
├── authSlice
│   ├── user: Current logged-in user
│   ├── token: Access token
│   ├── refreshToken: Refresh token
│   ├── isAuthenticated: Boolean
│   └── loading: Boolean
│
├── uiSlice
│   ├── notifications: Array of toasts
│   ├── confirmDialog: Dialog state
│   ├── sidebarOpen: Boolean
│   └── loading: Boolean
│
├── usersSlice
│   ├── users: Array
│   ├── currentUser: Object
│   └── loading: Boolean
│
├── coursesSlice
│   ├── courses: Array
│   ├── currentCourse: Object
│   └── loading: Boolean
│
├── paymentsSlice
│   └── ...
│
└── settingsSlice
    └── ...
```

### 8.2 Data Flow (Example: Admin Login)

```
Admin enters credentials → Click Login
    ↓
LoginPage component
    ↓
authService.login(email, password)
    ├── API call: POST /auth/login
    │   ├── Send email, password
    │   └── Receive { token, refreshToken, user }
    ├── Store tokens in localStorage
    ├── Dispatch Redux action: setAuthUser
    │   └── authSlice updates state
    ├── Redirect to /admin/dashboard
    └── Component receives auth state from Redux

Subsequent API calls:
    ├── Axios interceptor reads token from localStorage
    ├── Attaches Authorization: Bearer <token>
    ├── If 401 response → refresh token → retry
    └── Components use Redux auth state for conditional rendering
```

---

## PART 9: DATABASE ARCHITECTURE

### 9.1 Database Setup

**Primary:** RDS (AWS Relational Database Service)
- PostgreSQL or MySQL
- Hosted on AWS
- Production backup and replication

**Secondary:** Supabase (PostgreSQL wrapper)
- Real-time subscriptions (optional)
- Authentication (optional)
- File storage

### 9.2 Database Access Flow

```
Backend API (Node.js)
    ├── Database driver (pg or mysql2)
    ├── Connection pooling
    ├── SQL queries
    └── Response to frontend

Frontend API Layer
    ├── Axios service calls
    ├── Backend API endpoint
    ├── Receives JSON
    └── Components render data
```

---

## PART 10: MONITORING & LOGGING

### 10.1 CloudWatch Metrics (Production)

```
CloudWatch Dashboard tracks:
├── Amplify
│   ├── Build success/failure
│   ├── Deployment status
│   ├── Build duration
│   └── Error logs
├── Performance
│   ├── Page load time
│   ├── API response time
│   └── Error rate
├── Traffic
│   ├── Request count
│   ├── Unique visitors
│   └── Geographic distribution
└── Errors
    ├── 4xx errors
    ├── 5xx errors
    └── API failures
```

### 10.2 Frontend Logging

```
Browser Console
├── [api.interceptor] Logs
│   ├── Request details
│   ├── Token attachment
│   ├── Response status
│   └── Error messages
├── Component lifecycle logs
└── Redux action logs
```

---

## PART 11: SECURITY FEATURES

### 11.1 Authentication Flow

```
Login
    ├── Email + Password → Backend
    ├── Backend validates
    ├── Backend generates JWT tokens
    │   ├── Access token (short-lived: 15-60 min)
    │   └── Refresh token (long-lived: 7-30 days)
    ├── Frontend stores in localStorage
    └── Frontend ready for authenticated requests

Ongoing Requests
    ├── All API requests include Bearer token
    ├── Backend validates token signature
    ├── If invalid → 401 Unauthorized
    └── Frontend refreshes token

Token Refresh
    ├── Access token expires
    ├── Backend returns 401
    ├── Frontend calls /auth/refresh with refreshToken
    ├── Backend validates refreshToken
    ├── Backend generates new access token
    ├── Frontend updates localStorage
    └── Frontend retries original request

Logout
    ├── Frontend clears tokens from localStorage
    ├── Redux auth state cleared
    ├── Redirect to login page
    └── All API calls fail (not authenticated)
```

### 11.2 Security Headers (Amplify)

```
Set by amplify.yml:
├── Cache-Control
│   ├── index.html: no-cache (always fetch fresh)
│   └── Assets/Images: max-age=31536000, immutable (1 year cache)
├── X-Frame-Options: DENY (prevents clickjacking)
├── X-Content-Type-Options: nosniff (prevents MIME sniffing)
├── Referrer-Policy: strict-origin-when-cross-origin
└── CSP (Content Security Policy) - if configured
```

---

## PART 12: COMPLETE FLOW SUMMARY

### Development to Production Pipeline

```
┌─────────────────────────────────────────────────────────────────┐
│ LOCAL DEVELOPMENT                                               │
├─────────────────────────────────────────────────────────────────┤
│ Developer edits code → npm run dev → Vite server (port 5173)   │
│ Browser: http://localhost:5173                                 │
│ API proxy to: https://api-staging.zyratechhub.com              │
└─────────────────────────────────────────────────────────────────┘
                            ↓
                    (Developer commits)
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│ GIT REPOSITORY                                                  │
├─────────────────────────────────────────────────────────────────┤
│ GitHub (Push to dev or main branch)                            │
└─────────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│ CI PIPELINE (GitHub Actions)                                    │
├─────────────────────────────────────────────────────────────────┤
│ 1. Checkout code                                               │
│ 2. Setup Node.js 20                                            │
│ 3. npm ci (install deps)                                       │
│ 4. npm run lint (ESLint check)                                 │
│ 5. npm run build (Vite build)                                  │
│ ✓ Result: dist/ folder ready                                  │
│ ✓ If success → Trigger Amplify deployment                     │
│ ✗ If fail → Block deployment, notify team                     │
└─────────────────────────────────────────────────────────────────┘
                            ↓
        ┌───────────────────┴───────────────────┐
        ↓                                       ↓
┌───────────────────┐               ┌───────────────────┐
│ STAGING           │               │ PRODUCTION        │
│ (dev branch)      │               │ (main branch)     │
├───────────────────┤               ├───────────────────┤
│ Branch: dev       │               │ Branch: main      │
│ URL:              │               │ URL:              │
│ dev.zyratechhub   │               │ zyratechhub.com   │
│ .com              │               │                   │
│ API: api-staging  │               │ API: api          │
│ DB: staging       │               │ DB: production    │
│ CloudWatch: ⊙     │               │ CloudWatch: ⊙     │
│                   │               │                   │
│ AWS Amplify       │               │ AWS Amplify       │
│ ├── S3 upload     │               │ ├── S3 upload     │
│ ├── Build cache   │               │ ├── Build cache   │
│ ├── CloudFront    │               │ ├── CloudFront    │
│ ├── Headers       │               │ ├── Headers       │
│ ├── Routing       │               │ ├── Routing       │
│ └── Live          │               │ └── Live          │
│                   │               │                   │
│ Testing:          │               │ Production Use:   │
│ ├── Manual QA     │               │ ├── Real users    │
│ ├── Integration   │               │ ├── Production DB │
│ ├── Performance   │               │ ├── Full traffic  │
│ └── Security      │               │ └── Monitoring    │
└───────────────────┘               └───────────────────┘
```

---

## PART 13: KEY FILES & THEIR ROLES

| File | Purpose | Location |
|------|---------|----------|
| `package.json` | Dependencies, scripts, Node version | Root |
| `.github/workflows/ci.yml` | CI pipeline configuration | `.github/workflows/` |
| `amplify.yml` | Amplify deployment config | Root |
| `.env.example` | Environment variables template | Root |
| `vite.config.js` | Build & dev server config | Root |
| `vitest.config.js` | Testing configuration | Root |
| `src/main.jsx` | React app entry point | `src/` |
| `src/App.jsx` | Routing & layout | `src/` |
| `src/store/index.js` | Redux store setup | `src/store/` |
| `src/services/api.js` | Axios instance with interceptors | `src/services/` |
| `src/services/*.js` | API service modules (20+ services) | `src/services/` |

---

## PART 14: ENVIRONMENT-SPECIFIC CONFIGURATIONS

### Staging (dev branch)
```
VITE_API_BASE_URL=https://api-staging.zyratechhub.com/api
VITE_ENABLE_DYNAMIC_API=true
Domain: https://dev.zyratechhub.com
Database: RDS staging instance
Monitoring: CloudWatch (staging)
```

### Production (main branch)
```
VITE_API_BASE_URL=https://api.zyratechhub.com/api
VITE_ENABLE_DYNAMIC_API=true
Domain: https://zyratechhub.com
Database: RDS production instance
Monitoring: CloudWatch (production)
```

---

## PART 15: ROLLBACK PROCEDURE

### If Deployment Fails

```
Production deployment fails
    ↓
AWS Amplify automatically:
    ├── Detects failure
    ├── Stops deployment
    ├── Keeps previous version live
    └── Notifies team via webhook

Manual Rollback
    ├── Option 1: Revert main branch to previous commit
    │   ├── git revert <bad-commit>
    │   ├── Push to main
    │   ├── Amplify rebuilds & redeploys
    │   └── Old version live
    │
    └── Option 2: Quick hotfix
        ├── Fix bug on new branch
        ├── Create PR to main
        ├── Merge to main
        ├── Amplify rebuilds & deploys
        └── New version live
```

---

## PART 16: MONITORING CHECKLIST

After each deployment:
- ☐ Check Amplify deployment status (green checkmark)
- ☐ Visit public site & test core functionality
- ☐ Check CloudWatch metrics (no error spikes)
- ☐ Test admin login & key admin features
- ☐ Check API response times (< 2 seconds)
- ☐ Monitor error rates (< 0.5%)
- ☐ Verify database connections healthy
- ☐ Test file uploads (if applicable)
- ☐ Check performance metrics (Lighthouse)

---

## PART 17: TEAM RESPONSIBILITIES

| Role | Responsibility |
|------|-----------------|
| **Developer** | Write code, test locally, push to dev |
| **DevOps** | Monitor deployments, manage secrets, infrastructure |
| **QA** | Test staging, approve production releases |
| **DevOps/Backend** | Maintain backend API, database, monitoring |
| **Security** | Review security headers, token management |

---

## END OF INFRASTRUCTURE DOCUMENTATION

This document provides all details for your AI to create the draw.io diagram.

**Key Takeaways for Drawing:**
1. Local → Git → CI → Staging/Production
2. Each environment has separate API & database
3. Amplify handles hosting, CDN, routing
4. GitHub Actions validates before deployment
5. Token refresh happens transparently in frontend
6. CloudWatch monitors production health
