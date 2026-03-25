# Zyra Tech Hub Website

A modern, responsive web application for Zyra Tech Hub - Empowering Ghana's Future Through Technology. This platform showcases digital skills training, internships, IT services, and community development programs in Koforidua, Ghana.

## Overview

Zyra Tech Hub is Ghana's premier technology education and innovation center, providing:

- **Training Programs** - Digital skills training across 5 program levels (Basic to Internship)
- **Career Opportunities** - Job listings and application system
- **IT Services** - Professional software development and consulting
- **Community Impact** - Stories, testimonials, and gallery showcasing our impact
- **Blog** - Tech insights, success stories, and educational content

## 🛠️ Tech Stack

### Frontend
- **React 19.1.1** - Modern React with latest features
- **Vite 7.1.7** - Lightning-fast development and optimized builds
- **React Router 6.23.1** - Client-side routing with lazy loading
- **Tailwind CSS 4.1.13** - Utility-first CSS framework
- **Framer Motion 11.2.10** - Smooth animations and transitions
- **Lucide React 0.544.0** - Beautiful, consistent icons
- **Axios 1.7.2** - HTTP client for API integration

### State Management & Tools
- **Redux Toolkit 2.2.5** - Efficient state management
- **ESLint 9.36.0** - Code quality and linting
- **Vitest 4.0.18** - Fast unit testing framework

## 📁 Project Structure

```
zyratech-website/
├── public/
│   ├── images/              # Static images
│   └── robots.txt           # SEO crawling rules
├── src/
│   ├── components/
│   │   ├── Navbar.jsx       # Main navigation
│   │   ├── Footer.jsx       # Site footer
│   │   ├── TrainingNavbar.jsx  # Training section nav
│   │   ├── ScrollToTop.jsx  # Scroll behavior
│   │   ├── common/          # Reusable components
│   │   │   ├── HrContactSection.jsx
│   │   │   ├── BackToTopButton.jsx
│   │   │   └── ParallaxDivider.jsx
│   │   ├── modals/          # Modal dialogs
│   │   └── pages/           # Page-specific components
│   │       ├── home/        # Home page sections
│   │       ├── about/       # About page sections
│   │       ├── training/    # Training sections
│   │       ├── blog/        # Blog components
│   │       ├── jobs/        # Jobs components
│   │       ├── gallery/     # Gallery components
│   │       └── contact/     # Contact sections
│   ├── pages/
│   │   ├── public/          # Public-facing pages
│   │   │   ├── home/
│   │   │   ├── about/
│   │   │   ├── training/    # Training programs
│   │   │   ├── blog/        # Blog & articles
│   │   │   ├── jobs/        # Career opportunities
│   │   │   ├── gallery/     # Photo/video gallery
│   │   │   ├── contact/
│   │   │   ├── projects/
│   │   │   ├── partnership/
│   │   │   └── ...
│   │   └── admin/           # Admin dashboard (future)
│   ├── data/
│   │   ├── trainingCourses.js   # Training catalog
│   │   ├── articlesData.js      # Blog articles
│   │   ├── jobsData.js          # Job listings
│   │   └── collaborationModelsData.js
│   ├── hooks/
│   │   ├── useSEO.js            # SEO meta tags hook
│   │   └── useScrollAnimation.js # Scroll animations
│   ├── services/
│   │   └── api.js               # Axios API wrapper
│   ├── store/
│   │   └── index.js             # Redux store
│   ├── App.jsx                  # Main app component
│   ├── main.jsx                 # Entry point
│   └── index.css                # Global styles
├── .env.example                 # Environment variables template
├── .gitignore
├── Dockerfile                   # Docker multi-stage build
├── nginx.conf                   # Nginx configuration for SPA routing
├── package.json
├── vite.config.js               # Vite configuration
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- **Node.js**: 20.19+ or 22.12+
- **npm**: 10+ (comes with Node.js)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ZyraTech-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables** (optional)
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality
- `npm test` - Run unit tests
- `npm run test:ui` - Run tests with UI
- `npm run test:coverage` - Generate test coverage report

## 🌐 Deployment

### Current Hosting
- **Frontend:** Docker container deployed on Render
- **Backend API:** Deployed on Render (https://zyratech-hub-api.onrender.com/api)

### Building for Production

**Standard Build:**
```bash
# Build the project
npm run build

# Preview the production build locally
npm run preview
```

The build output is located in the `dist` directory and is optimized for production deployment.

### Docker Deployment

This project includes a multi-stage Dockerfile for efficient containerized deployment.

**Build the Docker Image:**
```bash
# Build with default API URL (Render)
docker build -t zyratech-frontend .

# Build with custom API URL
docker build --build-arg VITE_API_BASE_URL=https://your-api.com/api -t zyratech-frontend .
```

**Run the Docker Container:**
```bash
docker run -p 80:80 zyratech-frontend
```

The Dockerfile uses a two-stage build:
1. **Stage 1 (Build):** Node.js 20-Alpine - Builds the React application
2. **Stage 2 (Serve):** Nginx - Serves the optimized production build

**Docker Compose:**
To run with Docker Compose, use:
```bash
docker compose up --build
```

### Environment Variables

Configure these for your deployment platform:

```
VITE_API_BASE_URL=https://zyratech-hub-api.onrender.com/api
VITE_APP_NAME=Zyra Tech Hub
VITE_CONTACT_EMAIL=info@zyratechhub.com
```

## 🎨 Key Features

### 1. **SEO Optimized**
- Dynamic meta tags using `useSEO` hook
- Open Graph tags for social sharing
- Twitter Card support
- Canonical URLs for all pages
- Structured data ready

### 2. **Performance Optimized**
- Route-based code splitting with React.lazy()
- Optimized bundle chunks (React, Framer Motion, Icons)
- Image lazy loading
- Asset caching strategies
- Fast initial page load

### 3. **Responsive Design**
- Mobile-first approach
- Breakpoints: mobile, sm (640px), md (768px), lg (1024px), xl (1280px)
- Touch-friendly navigation
- Optimized images for all screen sizes

### 4. **Accessibility**
- ARIA labels and roles
- Keyboard navigation support
- Reduced motion support with Framer Motion
- Semantic HTML structure
- Focus management

### 5. **Training System**
- 5 program levels: Basic, Intermediate, Advanced, Matured, Internship
- Course catalog with categories
- Application and payment flow
- Success tracking pages

### 6. **Blog System**
- Category filtering
- Search functionality
- Pagination
- Featured posts
- Related articles
- Social sharing

### 7. **Jobs Portal**
- Job listings by category
- Detailed job pages
- Application system
- Newsletter integration

### 8. **Gallery**
- Photo and video support
- Category filtering
- Lightbox modal with keyboard navigation
- Fullscreen mode
- Thumbnail strip

## 🔧 Configuration

### Brand Colors
```css
Primary Blue: #004fa2
Secondary Purple: #2A2D7C
Accent: Based on service type
```

### Tailwind Configuration
The project uses Tailwind CSS 4.x with custom configurations in `tailwind.config.js`.

### Vite Configuration
Optimized build settings in `vite.config.js`:
- Manual chunk splitting for vendors
- Optimized dependencies
- Source maps configuration
- Asset handling

## 📝 Content Management

### Training Courses
Edit `src/data/trainingCourses.js` to manage:
- Course categories and levels
- Course details, pricing, duration
- Topics and milestones
- Prerequisites

### Blog Articles
Edit `src/data/articlesData.js` to add/modify:
- Article content and metadata
- Author information
- Categories and tags
- Featured articles

### Job Listings
Edit `src/data/jobsData.js` to manage:
- Job postings
- Requirements and responsibilities
- Application details

## 🧪 Testing

Run tests with Vitest:
```bash
# Run all tests
npm test

# Watch mode
npm test -- --watch

# Coverage report
npm run test:coverage

# UI mode
npm run test:ui
```

## 🔐 Security

- XSS protection headers configured
- CSRF protection ready for backend integration
- Content Security Policy ready
- Secure environment variable handling
- Input validation on forms

## 🚧 Future Enhancements

### Admin Dashboard
- User management
- Content management system
- Analytics dashboard
- Application review system

### Backend Integration
- Email service (SendGrid/Mailgun)
- Payment gateway (Paystack/Flutterwave)
- Database for applications and inquiries
- Authentication system

### Additional Features
- Live chat support
- Advanced search
- Multi-language support
- Student portal
- Certificate generation

## 📞 Support & Contact

**Zyra Tech Hub**
- **Location:** Koforidua, Eastern Region, Ghana
- **Email:** info@zyratechhub.com
- **Website:** https://zyratechhub.com/

## 📄 License

This project is proprietary software owned by Zyra Tech Hub. All rights reserved.

## 🙏 Acknowledgments

Built with modern web technologies to serve the Ghanaian tech education community.

---

**Made with ❤️ by the Zyra Tech Hub Team**
