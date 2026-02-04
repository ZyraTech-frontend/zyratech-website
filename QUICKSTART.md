# Quick Reference Guide - Zyra Tech Hub Website

## 🚀 Quick Commands

```bash
# Development
npm run dev              # Start dev server (localhost:5173)
npm run build           # Build for production
npm run preview         # Preview production build
npm run lint            # Check code quality
npm test                # Run tests

# Deployment
git push origin main    # Auto-deploy to Netlify
netlify deploy --prod   # Manual deploy
```

## 📁 Key File Locations

### Content Files
| What | Where |
|------|-------|
| Blog Articles | `src/data/articlesData.js` |
| Training Courses | `src/data/trainingCourses.js` |
| Job Listings | `src/data/jobsData.js` |
| Collaboration Models | `src/data/collaborationModelsData.js` |

### Page Components
| Page | Location |
|------|----------|
| Home | `src/pages/public/home/index.jsx` |
| About | `src/pages/public/about/index.jsx` |
| Training | `src/pages/public/training/index.jsx` |
| Blog | `src/pages/public/blog/index.jsx` |
| Jobs | `src/pages/public/jobs/index.jsx` |
| Contact | `src/pages/public/contact/index.jsx` |
| Gallery | `src/pages/public/gallery/index.jsx` |

### Configuration Files
| File | Purpose |
|------|---------|
| `vite.config.js` | Build configuration |
| `netlify.toml` | Deployment settings |
| `.env.example` | Environment variables template |
| `package.json` | Dependencies & scripts |
| `tailwind.config.js` | Tailwind CSS config |

## 🎨 Brand Assets

### Colors
```css
Primary Blue:    #004fa2
Secondary Purple: #2A2D7C
Text Dark:       #1a1a1a
Text Light:      #6b7280
Background:      #ffffff
Gray:            #f3f4f6
```

### Typography
- **Headings:** font-bold, responsive sizing (2xl to 5xl)
- **Body:** text-base to text-lg
- **Small:** text-sm to text-xs

### Spacing
- **Section Padding:** py-12 to py-20
- **Container:** max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
- **Gaps:** gap-4, gap-6, gap-8, gap-12

## 📊 Common Components

### Navigation
```jsx
import Navbar from '../components/Navbar';
import TrainingNavbar from '../components/TrainingNavbar';
import Footer from '../components/Footer';
```

### Common Sections
```jsx
import HrContactSection from '../components/common/HrContactSection';
import NewsletterHero from '../components/pages/home/NewsletterHero';
import ParallaxDivider from '../components/common/ParallaxDivider';
```

### SEO Hook
```jsx
import useSEO from '../hooks/useSEO';

useSEO({
  title: 'Page Title',
  description: 'Page description',
  url: '/page-url',
  keywords: 'keyword1, keyword2'
});
```

## 🛠️ Common Tasks

### Add New Blog Article
1. Open `src/data/articlesData.js`
2. Add article object with id, title, content, etc.
3. Test: `npm run dev` → Visit `/blog`
4. Deploy: `git push origin main`

### Add New Training Course
1. Open `src/data/trainingCourses.js`
2. Add course with id, title, category, features
3. Test course detail page
4. Deploy changes

### Update Contact Info
1. Edit `src/components/pages/contact/ContactHero.jsx`
2. Edit `src/components/Footer.jsx`
3. Update `.env` variables
4. Update Netlify environment variables

### Add New Page
1. Create component in `src/pages/public/[page-name]/index.jsx`
2. Add route in `src/App.jsx`
3. Add SEO with `useSEO` hook
4. Add navigation link if needed
5. Test thoroughly

## 🐛 Troubleshooting

### Build Fails
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Images Not Loading
- Use `/images/filename.jpg` (absolute path)
- Check file exists in `public/images/`
- Verify filename case matches exactly

### Routing Not Working
- Check route defined in `src/App.jsx`
- Verify component is properly exported
- Check for typos in path

### Forms Not Working
- Check console for errors
- Verify all required fields
- Check form validation logic

## 📱 Responsive Breakpoints

```javascript
// Mobile First
default     // < 640px (mobile)
sm          // ≥ 640px (tablet)
md          // ≥ 768px (tablet landscape)
lg          // ≥ 1024px (desktop)
xl          // ≥ 1280px (large desktop)
2xl         // ≥ 1536px (extra large)

// Usage
className="text-sm md:text-base lg:text-lg"
```

## 🔍 Testing Checklist

### Local Testing
- [ ] All pages load without errors
- [ ] Navigation works correctly
- [ ] Forms validate and submit
- [ ] Images display properly
- [ ] Responsive on mobile
- [ ] No console errors

### Production Testing
- [ ] Live site loads
- [ ] All routes work
- [ ] Forms submit successfully
- [ ] SEO meta tags correct
- [ ] Images optimized
- [ ] Performance good (Lighthouse)

## 🚨 Emergency Contacts

**Website Down?**
1. Check Netlify status
2. Check recent deployments
3. Rollback if needed

**Need Help?**
- Tech Issues: tech@zyratechhub.com
- Content: content@zyratechhub.com
- Admin: admin@zyratechhub.com

## 📚 Useful Links

- **Live Site:** https://zyratech-hub.netlify.app
- **Netlify Dashboard:** https://app.netlify.com
- **GitHub Repo:** [Your Repo URL]
- **Documentation:** See README.md

## 💡 Pro Tips

### Performance
- Always optimize images before uploading
- Use WebP format when possible
- Keep bundle size under 500KB
- Lazy load images and routes

### SEO
- Every page needs `useSEO` hook
- Meta descriptions: 150-160 characters
- Use descriptive page titles
- Include relevant keywords

### Code Quality
- Run `npm run lint` before committing
- Write meaningful commit messages
- Test on multiple devices
- Keep components small and focused

### Deployment
- Always test locally first
- Review changes before pushing
- Monitor first few minutes after deploy
- Keep staging/production env vars updated

---

**Quick Start:** `npm install` → `npm run dev` → Open `localhost:5173`

**Need more info?** Check the full documentation:
- 📖 README.md - Complete setup guide
- 🚀 DEPLOYMENT.md - Deployment instructions
- 🔧 MAINTENANCE.md - Maintenance procedures
