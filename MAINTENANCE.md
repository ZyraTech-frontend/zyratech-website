# Maintenance Guide - Zyra Tech Hub Website

## Quick Start for Content Updates

### Adding a New Blog Article

1. Open `src/data/articlesData.js`

2. Add new article object to the array:
```javascript
{
  id: 9, // Increment from last ID
  title: "Your Article Title",
  category: "Success Story", // or Tech Insight, Education, Events
  date: "Feb 10, 2026",
  readingTime: "5 min read",
  author: {
    name: "Author Name",
    role: "Role/Title",
    avatar: "/images/author.jpg"
  },
  image: "/images/article-cover.jpg",
  excerpt: "Brief description of the article...",
  slug: "article-url-slug",
  featured: false, // Set true for featured article
  content: `Full article content in markdown format...`
}
```

3. Test locally: `npm run dev`
4. Commit and push to deploy

### Adding a New Job Posting

1. Open `src/data/jobsData.js`

2. Add new job to the `jobs` array:
```javascript
{
  id: 5,
  title: "Position Title",
  category: "Engineering", // or Design, Marketing, Operations
  type: "Full-time", // or Part-time, Contract, Internship
  location: "Koforidua, Ghana",
  department: "Department Name",
  experience: "2-3 years",
  salary: "Competitive",
  postedDate: "2026-02-10",
  deadline: "2026-03-10",
  description: "Job overview...",
  responsibilities: [
    "Responsibility 1",
    "Responsibility 2"
  ],
  requirements: [
    "Requirement 1",
    "Requirement 2"
  ],
  benefits: [
    "Benefit 1",
    "Benefit 2"
  ]
}
```

### Updating Training Courses

1. Open `src/data/trainingCourses.js`

2. Find the course by `id` and update:
```javascript
{
  id: 1,
  title: "Course Title",
  category: "category-id",
  level: "basic", // or intermediate, advanced, matured, internship
  duration: "12 weeks",
  price: "GH₵ 500",
  icon: "Code", // Lucide icon name
  description: "Course description...",
  features: [/* ... */],
  topics: [/* ... */],
  milestones: [/* ... */]
}
```

### Updating Contact Information

1. **In Components:**
   - Edit `src/components/pages/contact/ContactHero.jsx`
   - Edit `src/components/Footer.jsx`

2. **Environment Variables:**
   - Update `.env` file
   - Update Netlify environment variables

### Adding Gallery Images

1. Add images to `public/images/`

2. Update the media data in gallery component:
   - Edit `src/components/pages/gallery/MediaGrid.jsx`
   - Add new media objects with proper metadata

## Common Maintenance Tasks

### Updating Dependencies

```bash
# Check for outdated packages
npm outdated

# Update all dependencies (careful!)
npm update

# Update specific package
npm update package-name

# Update React (test thoroughly!)
npm install react@latest react-dom@latest

# After updates, test thoroughly
npm run dev
npm test
npm run build
```

### Fixing Common Issues

#### Issue: Page Not Loading
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

#### Issue: Build Fails
```bash
# Check for errors
npm run lint
npm test

# Try clean build
rm -rf dist
npm run build
```

#### Issue: Images Not Showing
- Verify image path starts with `/images/`
- Check file exists in `public/images/`
- Check file name case matches exactly

#### Issue: Forms Not Submitting
- Check browser console for errors
- Verify all required fields are present
- Check form validation logic

### Performance Optimization

#### Optimize Images
```bash
# Recommended image sizes:
# Hero images: 1920x1080px (WebP format)
# Blog images: 1200x630px (WebP format)
# Thumbnails: 400x300px (WebP format)
# Avatars: 200x200px (WebP format)

# Tools:
# - Use squoosh.app for manual compression
# - Use imagemagick for batch processing
```

#### Check Bundle Size
```bash
npm run build

# Review output:
# dist/assets/*.js - JavaScript bundles
# dist/assets/*.css - CSS bundles
# Target: < 500KB initial load
```

### SEO Maintenance

#### Update Meta Tags
For individual pages, update the `useSEO` hook call:
```javascript
useSEO({
  title: 'Page Title',
  description: 'Page description (150-160 characters)',
  url: '/page-url',
  keywords: 'keyword1, keyword2, keyword3'
});
```

#### Add New Page to Sitemap
When adding new pages:
1. Ensure they use `useSEO` hook
2. Add route in `src/App.jsx`
3. Test canonical URLs are correct

### Testing Checklist

#### Before Deployment
- [ ] Test all forms
- [ ] Check all internal links
- [ ] Verify navigation works
- [ ] Test on mobile devices
- [ ] Check browser console for errors
- [ ] Test with slow internet connection
- [ ] Verify images load correctly
- [ ] Test gallery modal
- [ ] Check blog filtering
- [ ] Test job applications

#### After Deployment
- [ ] Smoke test all pages
- [ ] Verify forms submit correctly
- [ ] Check analytics are tracking
- [ ] Test social sharing
- [ ] Verify meta tags with tools
- [ ] Check Lighthouse scores

## Database Integration (Future)

When connecting to a backend API:

### 1. Update API Service
Edit `src/services/api.js`:
```javascript
// Example: Submit contact form
export const submitContactForm = async (formData) => {
  try {
    const response = await api.post('/contact', formData);
    return response.data;
  } catch (error) {
    console.error('Contact form error:', error);
    throw error;
  }
};
```

### 2. Update Form Handlers
Edit form components to call API:
```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const result = await submitContactForm(formData);
    // Show success message
  } catch (error) {
    // Show error message
  }
};
```

### 3. Environment Variables
Add to `.env`:
```env
VITE_API_BASE_URL=https://api.zyratechhub.com
VITE_API_KEY=your_api_key
```

## Backup Strategy

### Code Backup
- Git repository (primary backup)
- GitHub (remote backup)
- Local development copies

### Content Backup
```bash
# Backup data files
cp src/data/*.js backup/data-$(date +%Y%m%d)/

# Backup images
tar -czf backup/images-$(date +%Y%m%d).tar.gz public/images/
```

### Database Backup (When Implemented)
```bash
# Schedule daily backups
# Use your database provider's backup tools
# Keep 30 days of backups
```

## Monitoring & Analytics

### Setup Google Analytics
1. Get GA4 tracking ID
2. Add to `.env`:
   ```env
   VITE_GA_TRACKING_ID=G-XXXXXXXXXX
   ```
3. Add to `index.html` head

### Monitor Errors
1. Set up error tracking (Sentry, LogRocket)
2. Review error reports weekly
3. Fix critical errors immediately

### Traffic Monitoring
- Check Google Analytics weekly
- Review popular pages
- Monitor bounce rates
- Track conversion goals

## Security Updates

### Monthly Security Audit
```bash
# Check for vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix

# For breaking changes, update manually
npm audit fix --force
```

### Review Dependencies
- Check for security advisories
- Update critical packages immediately
- Test thoroughly after security updates

## Team Collaboration

### Git Workflow
```bash
# Pull latest changes
git pull origin main

# Create feature branch
git checkout -b feature/description

# Make changes and commit
git add .
git commit -m "Clear description of changes"

# Push branch
git push origin feature/description

# Create Pull Request on GitHub
```

### Code Review Checklist
- [ ] Code follows project conventions
- [ ] No console.log statements
- [ ] Responsive on all devices
- [ ] Accessibility considered
- [ ] SEO tags added for new pages
- [ ] Tests added/updated
- [ ] No breaking changes

## Emergency Procedures

### Site is Down
1. Check Netlify status page
2. Review recent deployments
3. Rollback to last working deployment
4. Check error logs
5. Contact support if needed

### Critical Bug Found
1. Create hotfix branch
2. Fix bug and test locally
3. Deploy to staging (if available)
4. Deploy to production
5. Monitor for issues

### Security Breach
1. Immediately revoke compromised credentials
2. Review access logs
3. Deploy security patch
4. Notify affected users if needed
5. Document incident

## Support Resources

### Documentation
- React: https://react.dev
- Vite: https://vitejs.dev
- Tailwind CSS: https://tailwindcss.com
- Framer Motion: https://www.framer.com/motion/
- Netlify: https://docs.netlify.com

### Getting Help
- GitHub Issues: Report bugs and features
- Stack Overflow: Technical questions
- Netlify Community: Deployment issues

### Internal Contacts
- **Technical Lead:** tech@zyratechhub.com
- **Content Manager:** content@zyratechhub.com
- **Admin:** admin@zyratechhub.com

---

**Document Version:** 1.0.0
**Last Updated:** February 2026
**Maintained By:** Zyra Tech Hub Development Team
