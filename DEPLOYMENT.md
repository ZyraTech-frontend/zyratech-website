# Deployment Guide - Zyra Tech Hub Website

## Pre-Deployment Checklist

### 1. Code Quality
- [ ] Run `npm run lint` and fix all errors
- [ ] Run `npm test` and ensure all tests pass
- [ ] Review code for any TODO comments or debug code
- [ ] Remove console.log statements from production code

### 2. Configuration
- [ ] Update `.env` with production values
- [ ] Verify API endpoints are correct
- [ ] Check all image paths are correct
- [ ] Verify contact information (email, phone, address)
- [ ] Update social media links

### 3. Content Review
- [ ] Review all text for typos and accuracy
- [ ] Check all links are working
- [ ] Verify training course information is current
- [ ] Update job listings if needed
- [ ] Review blog articles for accuracy

### 4. Performance
- [ ] Run `npm run build` successfully
- [ ] Check bundle size (should be under warning limits)
- [ ] Test lazy loading is working
- [ ] Verify images are optimized

### 5. SEO
- [ ] Verify meta tags on all pages
- [ ] Check Open Graph images
- [ ] Test social sharing preview
- [ ] Verify canonical URLs
- [ ] Submit sitemap to Google Search Console

## Docker & Render Deployment Steps

### Prerequisites
- Docker installed locally
- Render account (https://render.com)
- GitHub repository with code pushed

### Option 1: Docker Deployment on Render (Recommended)

1. **Build Docker Image Locally (Testing)**
   ```bash
   # Build with default Render API URL
   docker build -t zyratech-frontend .

   # Or build with custom API URL
   docker build --build-arg VITE_API_BASE_URL=https://your-api.com/api -t zyratech-frontend .
   ```

2. **Test Locally**
   ```bash
   docker run -p 80:80 zyratech-frontend
   # Visit http://localhost
   ```

3. **Push to Render**
   - Log in to [Render Dashboard](https://dashboard.render.com)
   - Click "New +" → "Web Service"
   - Select "Docker" as the build method
   - Connect your GitHub repository
   - Configure:
     * **Name:** zyratech-frontend
     * **Docker Filename:** Dockerfile
     * **Port:** 80
   - Add Environment Variables:
     ```
     VITE_API_BASE_URL=https://zyratech-hub-api.onrender.com/api
     VITE_APP_NAME=Zyra Tech Hub
     VITE_CONTACT_EMAIL=info@zyratechhub.com
     ```
   - Click "Deploy"

4. **Custom Domain (Optional)**
   - Go to the web service settings
   - Click "Add Custom Domain"
   - Configure your domain's DNS settings with Render
   - HTTPS is automatic

### Option 2: Direct npm Build on Render

1. **Push Code to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Create Web Service on Render**
   - Log in to [Render Dashboard](https://dashboard.render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     * **Build Command:** `npm run build && npm install -g serve && serve -s dist -l 80`
     * **Start Command:** (leave empty, build command includes serve)

3. **Add Environment Variables**
   ```
   VITE_API_BASE_URL=https://zyratech-hub-api.onrender.com/api
   VITE_APP_NAME=Zyra Tech Hub
   VITE_CONTACT_EMAIL=info@zyratechhub.com
   ```

4. **Deploy**
   - Click "Create Web Service"
   - Render automatically deploys on each push to main

### Option 3: Docker with Docker Compose (Local Testing)

1. **Test with Docker Compose**
   ```bash
   docker compose up --build
   ```

2. **Access the Application**
   - Frontend: http://localhost
   - Backend API: As configured in VITE_API_BASE_URL

## Post-Deployment Tasks

### 1. Verify Deployment
- [ ] Visit the live site and test all pages
- [ ] Test all forms (contact, applications, newsletter)
- [ ] Check mobile responsiveness
- [ ] Test navigation on all pages
- [ ] Verify all images load correctly
- [ ] Test gallery modal functionality
- [ ] Check blog filtering and pagination
- [ ] Test job application flow

### 2. Performance Testing
- [ ] Run Lighthouse audit (target: 90+ scores)
- [ ] Check Core Web Vitals in Google Search Console
- [ ] Test page load speed on 3G connection
- [ ] Verify lazy loading is working

### 3. SEO Setup
- [ ] Submit sitemap to Google Search Console
- [ ] Submit to Bing Webmaster Tools
- [ ] Set up Google Analytics (if implemented)
- [ ] Set up Facebook Pixel (if implemented)
- [ ] Test structured data with Google's Rich Results Test

### 4. Monitoring on Render
- [ ] Set up Render alerts for deployment failures
- [ ] Monitor logs for errors via Render Dashboard
- [ ] Monitor metrics: CPU, Memory, Network
- [ ] Set up error tracking (optional: Sentry, etc.)

## Continuous Deployment Workflow

### Development Workflow
```bash
# 1. Create feature branch
git checkout -b feature/new-feature

# 2. Make changes and test locally
npm run dev

# 3. Run tests and linting
npm test
npm run lint

# 4. Commit changes
git add .
git commit -m "Add new feature"

# 5. Push to GitHub
git push origin feature/new-feature

# 6. Create Pull Request on GitHub

# 7. After review, merge to main
# Render automatically deploys on each push to main!
```

### Rollback Procedure
If you need to rollback to a previous version:

1. **Via Render Dashboard**
   - Go to the web service
   - Click "Deployments" tab
   - Find the working deployment
   - Click the three dots menu and select "Redeploy"

2. **Via Git**
   ```bash
   # Revert to previous commit
   git revert HEAD
   git push origin main
   
   # Or reset to specific commit
   git reset --hard <commit-hash>
   git push --force origin main
   # Render will redeploy automatically
   ```

## Environment-Specific Configurations

### Development
```env
VITE_API_BASE_URL=http://localhost:3000
VITE_APP_URL=http://localhost:5173
```

### Staging (Optional)
```env
VITE_API_BASE_URL=https://staging-api.onrender.com/api
VITE_APP_URL=https://staging-zyratech-frontend.onrender.com
```

### Production
```env
VITE_API_BASE_URL=https://zyratech-hub-api.onrender.com/api
VITE_APP_URL=https://zyratech-hub.onrender.com
```

## Troubleshooting

### Docker Build Issues

**Issue:** `docker build` fails with npm errors
```bash
# Solution: Clear npm cache and rebuild
docker build --no-cache -t zyratech-frontend .
```

**Issue:** Docker image too large
```bash
# This is expected - the multi-stage build keeps it optimized (~30MB)
# The build stage is discarded, only the nginx image remains
```

### Render Deployment Issues

**Issue:** Deployment fails on Render
- Check the Render logs for detailed error messages
- Verify Docker build completes locally: `docker build -t zyratech-frontend .`
- Check environment variables are set in Render Dashboard
- Ensure Dockerfile exists in repository root

**Issue:** Application crashes on Render
- Check logs in Render Dashboard: go to Logs tab
- Verify API URL is correct in environment variables
- Check that Docker exposes port 80: `EXPOSE 80`

### Routes Not Working (404 errors)

**Issue:** Direct URL access returns 404
```
Solution: The nginx.conf file handles this with rewrites.
Make sure nginx.conf is being copied in Dockerfile.
```

### Environment Variables Not Working

**Issue:** API calls fail in production
- Ensure variables are set in Render Dashboard environment variables
- Verify variable names start with `VITE_`
- Redeploy after adding/updating variables
- Check `.env` is in `.gitignore` (don't commit it)

### Images Not Loading

**Issue:** Images show 404 in production
- Check image paths use `/images/` (not relative paths)
- Verify images exist in `public/images/` folder
- Images are served by Nginx - ensure public folder is included

## Performance Optimization Tips

### 1. Image Optimization
```bash
# Use WebP format when possible
# Compress images before uploading
# Use appropriate sizes for different breakpoints
```

### 2. Code Splitting
- Already implemented with React.lazy()
- Monitor chunk sizes in build output
- Consider splitting large components further

### 3. Caching Strategy
- Static assets cached via nginx.conf (long cache headers)
- API responses should have appropriate cache headers
- Docker layers are cached for faster rebuilds
- Use SWR or React Query for data fetching (future enhancement)

### 4. Monitoring Performance
```bash
# Build and analyze bundle
npm run build
# Check dist/ folder size
# Review chunk sizes in build output
# Docker image size visible in: docker images
```

## Security Checklist

- [ ] All sensitive data in environment variables (not in code or .env file)
- [ ] No API keys in client-side code
- [ ] HTTPS enabled (automatic with Render)
- [ ] Security headers configured in nginx.conf
- [ ] Form submissions validated on frontend and backend
- [ ] XSS protection enabled
- [ ] CORS configured properly for API
- [ ] Docker image base from official sources (node:20-alpine, nginx:stable-alpine)
- [ ] No build artifacts or secrets in Docker image (multi-stage build ensures this)
- [ ] Environment variables NOT committed to git (.env in .gitignore)

## Maintenance Schedule

### Weekly
- Check for broken links
- Review analytics for errors
- Monitor performance metrics
- Update job listings if needed

### Monthly
- Update dependencies (`npm update`)
- Review and update blog content
- Check SEO rankings
- Review and respond to form submissions

### Quarterly
- Conduct full site audit
- Update training course information
- Review and optimize images
- Security audit

## Support Contacts

**Technical Issues:**
- GitHub Issues: <repository-url>/issues
- Email: dev@zyratechhub.com

**Content Updates:**
- Email: info@zyratechhub.com

**Netlify Support:**
- Documentation: https://docs.netlify.com
- Support: https://answers.netlify.com

---

**Last Updated:** February 2026
**Version:** 1.0.0
