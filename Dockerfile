# ============================================================
# ZyraTech Frontend - Multi-Stage Dockerfile
# ============================================================
# This Dockerfile has TWO stages:
#   Stage 1 ("build"): Installs dependencies & builds your React app
#   Stage 2 ("serve"):  Takes ONLY the final build output and serves it with Nginx
#
# WHY two stages?
#   - The build stage needs Node.js, npm, and all your source code (~500MB+)
#   - The final image only needs the tiny built files + Nginx (~30MB)
#   - This keeps your production image SMALL and FAST to deploy
# ============================================================

# ------ STAGE 1: Build the React App ------
# "node:20-alpine" is a lightweight version of Node.js based on Alpine Linux
# "AS build" gives this stage a name so we can reference it later
FROM node:20-alpine AS build

# Set the working directory inside the container
# All following commands will run from /app
WORKDIR /app

# Copy ONLY package.json and package-lock.json first
# WHY? Docker caches each step ("layer"). If these files haven't changed,
# Docker skips the "npm ci" step on rebuilds = MUCH faster builds!
COPY package.json package-lock.json ./

# Install dependencies
# "npm ci" is like "npm install" but:
#   - It's faster (skips some checks)
#   - It's stricter (uses exact versions from package-lock.json)
#   - It's designed for CI/CD and Docker builds
RUN npm ci

# Now copy ALL remaining source files into the container
COPY . .

# Set the API URL for the build
# ARG = a variable you can pass in when building the image
# ENV = makes it available to the build process (Vite reads VITE_* env vars)
# Default points to your Render backend, but you can change it:
#   docker build --build-arg VITE_API_BASE_URL=https://your-api.com/api -t zyratech-frontend .
ARG VITE_API_BASE_URL=https://zyratech-hub-api.onrender.com/api
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

# Build the production version of your React app
# This runs "vite build" (from your package.json scripts)
# The output goes into the /app/dist folder
RUN npm run build

# ------ STAGE 2: Serve with Nginx ------
# Now we start a FRESH image with just Nginx (no Node.js needed!)
# "nginx:stable-alpine" is a tiny, production-ready web server
FROM nginx:stable-alpine

# Copy the built files from Stage 1 into Nginx's serving directory
# "--from=build" references the first stage we named "build"
# Nginx serves files from /usr/share/nginx/html by default
COPY --from=build /app/dist /usr/share/nginx/html

# Copy our custom Nginx configuration
# This handles React Router (so /about, /contact etc. don't give 404 errors)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Tell Docker that this container listens on port 80
EXPOSE 80

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
