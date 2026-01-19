import { Routes, Route, useLocation, Navigate } from 'react-router-dom';

import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import HomePage from './pages/public/home';
import AboutPage from './pages/public/about';
import ProjectsPage from './pages/public/projects';
import EcoWatchPage from './pages/public/projects/ecowatch';
import SafeDrivePage from './pages/public/projects/safedrive';
import AgrizPlanterPage from './pages/public/projects/agrizplanter';
import EraTechnologiesPage from './pages/public/projects/eraTechnologies';
import EcoWatchGalleryPage from './pages/public/projects/EcoWatchGalleryPage';
import SafeDriveGalleryPage from './pages/public/projects/SafeDriveGalleryPage';
import AgrizPlanterGalleryPage from './pages/public/projects/AgrizPlanterGalleryPage';
import ContactPage from './pages/public/contact';
import AdminPage from './pages/admin/DashboardPage';
import LoginPage from './pages/admin/LoginPage';

// Import other pages that need routes
import FaqPage from './pages/public/faq';
import ImpactPage from './pages/public/impact';
import PartnershipPage from './pages/public/partnership';
import PartnershipApplicationPage from './pages/public/partnership/apply';
import TrainingPage from './pages/public/training';
import CourseDetailPage from './pages/public/training/CourseDetailPage';
import CourseApplicationPage from './pages/public/training/CourseApplicationPage';
import ApplicationSuccessPage from './pages/public/training/ApplicationSuccessPage';
import TrainingPaymentPage from './pages/public/training/PaymentPage';
import TrainingPaymentSuccessPage from './pages/public/training/PaymentSuccessPage';
import TrainingContactPage from './pages/public/training/contact';
import TrainingProgramsPage from './pages/public/training/programs';
import BasicProgramsRoute from './pages/public/training/programs/basic';
import IntermediateProgramsRoute from './pages/public/training/programs/intermediate';
import AdvancedProgramsRoute from './pages/public/training/programs/advanced';
import MaturedProgramsRoute from './pages/public/training/programs/matured';
import InternshipProgramsRoute from './pages/public/training/programs/internship';
import BlogPage from './pages/public/blog';
import GalleryPage from './pages/public/gallery';
import NewsletterPage from './pages/public/newsletter';
import ArticlePage from './pages/public/newsletter/ArticlePage';
import NotFoundPage from './pages/public/NotFound';


function App() {
  const location = useLocation();
  
  // Check if current route is a service page or projects page
  const isProjectsPage = location.pathname.startsWith('/projects');
  const isTrainingPage = location.pathname.startsWith('/training');
  
  // Check if on contact page with service context
  const isContactWithService = location.pathname === '/contact' && location.state?.from;
  
  const hideMainNavbar = isProjectsPage || isContactWithService || isTrainingPage;
  const hideMainFooter = isProjectsPage || isContactWithService;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Scroll to top on route change */}
      <ScrollToTop />
      
      {/* Only show main Navbar if NOT on software or projects pages */}
      {!hideMainNavbar && <Navbar />}
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/ecowatch" element={<EcoWatchPage />} />
          <Route path="/projects/ecowatch/gallery" element={<EcoWatchGalleryPage />} />
          <Route path="/projects/safedrive" element={<SafeDrivePage />} />
          <Route path="/projects/safedrive/gallery" element={<SafeDriveGalleryPage />} />
          <Route path="/projects/agrizplanter" element={<AgrizPlanterPage />} />
          <Route path="/projects/agrizplanter/gallery" element={<AgrizPlanterGalleryPage />} />
          <Route path="/projects/era-technologies" element={<EraTechnologiesPage />} />
          <Route path="/news/nef-2025-finalist" element={<Navigate to="/newsletter/article/1" replace />} />
          <Route path="/news/yeco-2025-selection" element={<Navigate to="/newsletter/article/2" replace />} />
          <Route path="/news/bagaboard-nexora-2025" element={<Navigate to="/newsletter/article/3" replace />} />
                    <Route path="/contact" element={<ContactPage />} />
          <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
          <Route path="/admin/login" element={<LoginPage />} />
          <Route path="/admin/dashboard" element={<AdminPage />} />
          
          {/* Service Pages */}
          {/* Education routes redirect to training */}
          <Route path="/services/education" element={<Navigate to="/training" replace />} />
          <Route path="/services/education/*" element={<Navigate to="/training" replace />} />
          {/* Manufacturing routes redirect to contact */}
          <Route path="/services/manufacturing" element={<Navigate to="/contact" replace />} />
          <Route path="/services/manufacturing/*" element={<Navigate to="/contact" replace />} />
          {/* Software routes redirect to contact */}
          <Route path="/services/software" element={<Navigate to="/contact" replace />} />
          <Route path="/services/software/*" element={<Navigate to="/contact" replace />} />
          {/* Open Labs routes redirect to contact */}
          <Route path="/services/open-labs" element={<Navigate to="/contact" replace />} />
          <Route path="/services/open-labs/*" element={<Navigate to="/contact" replace />} />
          <Route path="/services/projectShowcase" element={<Navigate to="/projects" replace />} />
          
          {/* Donate routes redirect to contact */}
          <Route path="/donate" element={<Navigate to="/contact" replace />} />
          <Route path="/donate/*" element={<Navigate to="/contact" replace />} />
          
          {/* Other Pages */}
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/impact" element={<ImpactPage />} />
          <Route path="/partner" element={<PartnershipPage />} />
          <Route path="/partner/apply" element={<PartnershipApplicationPage />} />
          <Route path="/training" element={<TrainingPage />} />
          <Route path="/training/contact" element={<TrainingContactPage />} />
          <Route path="/training/programs" element={<TrainingProgramsPage />} />
          <Route path="/training/programs/basic" element={<BasicProgramsRoute />} />
          <Route path="/training/programs/intermediate" element={<IntermediateProgramsRoute />} />
          <Route path="/training/programs/advanced" element={<AdvancedProgramsRoute />} />
          <Route path="/training/programs/matured" element={<MaturedProgramsRoute />} />
          <Route path="/training/programs/internship" element={<InternshipProgramsRoute />} />
          <Route path="/training/course/:courseId" element={<CourseDetailPage />} />
          <Route path="/training/course/:courseId/apply" element={<CourseApplicationPage />} />
          <Route path="/training/application-success" element={<ApplicationSuccessPage />} />
          <Route path="/training/payment/:courseId" element={<TrainingPaymentPage />} />
          <Route path="/training/payment-success" element={<TrainingPaymentSuccessPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/newsletter" element={<NewsletterPage />} />
          <Route path="/newsletter/article/:id" element={<ArticlePage />} />
          
          {/* Redirects for old/broken links */}
          <Route path="/labs" element={<Navigate to="/contact" replace />} />
          <Route path="/enroll" element={<Navigate to="/training" replace />} />
          <Route path="/programs" element={<Navigate to="/training/programs" replace />} />
          {/* 404 Catch-all */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      {!hideMainFooter && <Footer />}
    </div>
  );
}

export default App;

