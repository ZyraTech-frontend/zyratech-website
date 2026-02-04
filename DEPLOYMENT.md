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

## Netlify Deployment Steps

### Option 1: Automatic Deployment (Recommended)

1. **Connect Repository**
   ```bash
   # Push your code to GitHub
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Link to Netlify**
   - Go to [Netlify Dashboard](https://app.netlify.com)
   - Click "New site from Git"
   - Choose "GitHub" and authorize
   - Select your repository
   - Netlify auto-detects Vite settings:
     * Build command: `npm run build`
     * Publish directory: `dist`
   - Click "Deploy site"

3. **Configure Environment Variables**
   - Go to Site Settings → Environment Variables
   - Add all variables from `.env.example`:
     ```
     VITE_API_BASE_URL=https://api.zyratechhub.com
     VITE_APP_NAME=Zyra Tech Hub
     VITE_APP_URL=https://zyratech-hub.netlify.app
     VITE_CONTACT_EMAIL=info@zyratechhub.com
     VITE_CONTACT_PHONE=+233 XXX XXX XXX
     ```

4. **Custom Domain (Optional)**
   - Go to Domain Settings
   - Click "Add custom domain"
   - Follow DNS configuration instructions
   - Enable HTTPS (automatic with Netlify)

### Option 2: Manual Deployment

1. **Build the Project**
   ```bash
   npm run build
   ```

2. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

3. **Login to Netlify**
   ```bash
   netlify login
   ```

4. **Deploy**
   ```bash
   # First deployment
   netlify deploy --prod

   # Or link to existing site
   netlify link
   netlify deploy --prod
   ```

### Option 3: Drag and Drop

1. Build the project:
   ```bash
   npm run build
   ```

2. Go to [Netlify Drop](https://app.netlify.com/drop)

3. Drag the `dist` folder to the upload area

4. Configure settings in the dashboard

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

### 4. Monitoring
- [ ] Set up Netlify notifications (Discord/Slack)
- [ ] Configure deploy notifications
- [ ] Set up error tracking (Sentry, etc.)
- [ ] Monitor analytics for traffic patterns

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
# Netlify automatically deploys!
```

### Rollback Procedure
If you need to rollback to a previous version:

1. **Via Netlify Dashboard**
   - Go to Deploys tab
   - Find the working deployment
   - Click "Publish deploy"

2. **Via Git**
   ```bash
   # Revert to previous commit
   git revert HEAD
   git push origin main
   
   # Or reset to specific commit
   git reset --hard <commit-hash>
   git push --force origin main
   ```

## Environment-Specific Configurations

### Development
```env
VITE_API_BASE_URL=http://localhost:3000
VITE_APP_URL=http://localhost:5173
```

### Staging (Optional)
```env
VITE_API_BASE_URL=https://staging-api.zyratechhub.com
VITE_APP_URL=https://staging.zyratech-hub.netlify.app
```

### Production
```env
VITE_API_BASE_URL=https://api.zyratechhub.com
VITE_APP_URL=https://zyratech-hub.netlify.app
```

## Troubleshooting

### Build Fails on Netlify

**Issue:** `npm ERR! peer dependency`
```bash
# Solution: Update netlify.toml
[build.environment]
  NPM_FLAGS = "--legacy-peer-deps"
```

**Issue:** Node version mismatch
```bash
# Solution: Set Node version in netlify.toml
[build.environment]
  NODE_VERSION = "22.12"
```

### Routes Not Working (404 errors)

**Issue:** Direct URL access returns 404
```toml
# Solution: Add to netlify.toml (already configured)
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Images Not Loading

**Issue:** Images show 404 in production
- Check image paths use `/images/` (not relative paths)
- Verify images exist in `public/images/` folder
- Clear Netlify cache and redeploy

### Environment Variables Not Working

**Issue:** API calls fail in production
- Ensure variables start with `VITE_`
- Add variables in Netlify Dashboard (not just .env)
- Trigger new deployment after adding variables

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
- Static assets cached for 1 year (configured in netlify.toml)
- API responses should have appropriate cache headers
- Use SWR or React Query for data fetching (future enhancement)

### 4. Monitoring Performance
```bash
# Build and analyze bundle
npm run build
# Check dist/ folder size
# Review chunk sizes in build output
```

## Security Checklist

- [ ] All sensitive data in environment variables
- [ ] No API keys in client-side code
- [ ] HTTPS enabled (automatic with Netlify)
- [ ] Security headers configured (in netlify.toml)
- [ ] Form submissions validated
- [ ] XSS protection enabled
- [ ] CORS configured properly for API

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
