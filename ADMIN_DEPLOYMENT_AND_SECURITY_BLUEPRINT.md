# ZyraTech: Admin Portal Deployment & Security Blueprint

This document serves as the master blueprint for deploying and securing the Admin Portal for the ZyraTech Hub web application. You can provide this exact document to any AI or developer in the future to flawlessly execute the final system architecture.

## 1. Core Architecture: The Subdomain Split
To maintain a high-performance, enterprise-grade application, the Admin Portal and the Public Website will physically share the exact same codebase but act as two totally isolated websites via **Client-Side Subdomain Segregation**.

* **Public Traffic:** Visitors navigating to `zyratechhub.com` will only ever be served the public UI (`/home`, `/jobs`, `/training`). The React Router will systematically remove all admin logic and code from this domain.
* **Staff Traffic:** Staff members will navigate to `admin.zyratechhub.com`. React Router will detect this subdomain and instantly disable the public Navbar and Footer, rendering only the secure login screen and the administrative dashboards.

## 2. Implementation Logic (App.jsx)
The core rewrite must happen at the highest level of `src/App.jsx`.

```javascript
// High-Level Logic Example for the AI
const currentHostname = window.location.hostname;
const isAdminDomain = currentHostname.startsWith('admin.');

if (isAdminDomain) {
  return <AdminOnlyRoutes />; // Renders the Admin dashboard and Protected routes ONLY
} else {
  return <PublicOnlyRoutes />; // Renders the public site, 404s any /admin requests
}
```

## 3. Role-Based Access Control (RBAC) Security
The Admin Subdomain acts as a "Unified Portal," meaning there is only one login screen, regardless of how much power the staff member has. Security is handled dynamically after login.

* **The Sorting Hat:** Upon successful login, the `Backend API` issues a secure signed token detailing the staff member's clearance level (`role: "admin"` vs `role: "super_admin"`). 
* **Standard Admin Experience:** The dashboard renders, but all Super Admin features are hidden from the user interface.
* **The React `<ProtectedRoute>` Shield:** The frontend enforces role permissions. If a standard Admin attempts to guess a restricted URL (e.g., `admin.zyratechhub.com/users`), the `<ProtectedRoute requiredRole="super_admin">` interceptor instantly blocks the render and redirects them to the unified dashboard.
* **The Backend Vault:** The backend endpoints perform the ultimate verification. Even if a user bypasses the frontend, the API strictly rejects data payloads missing the `super_admin` token authorization.

## 4. Docker & Pipeline Behavior
Because of the highly optimized Multi-Stage `Dockerfile` already present in the repository, making this massive architectural transition is entirely automated on the server side.

* When code changes to `App.jsx` or `nginx.conf` are pushed to the main branch, the CI/CD pipeline triggers the `Dockerfile`.
* **Stage 1 (Build):** The Docker container automatically runs `npm run build`, taking the new Subdomain Router Logic and compiling it into the tiny `/dist` production folder.
* **Stage 2 (Serve):** The built artifacts and the Nginx configuration are copied directly to the live server.
* **Zero-Touch Deployment:** Developers do NOT need to alter the docker image manually to deploy these admin changes. 

## Action Items for the User
Before an AI executes the code changes in `App.jsx`, the user must:
1. Log into their Domain Registrar (where they bought `zyratechhub.com`).
2. Add a `CNAME` or `A` Record mapping `admin` to the live server's IP or alias.
3. Add the custom domain `admin.zyratechhub.com` into the Azure / Render dashboard so the host accepts the traffic.
