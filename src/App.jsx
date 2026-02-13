import { lazy, Suspense } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/admin/layout/ProtectedRoute';
import ConfirmDialog from './components/admin/shared/ConfirmDialog';

// Eagerly load critical pages
import HomePage from './pages/public/home';
import NotFoundPage from './pages/public/NotFound';

// Lazy load other pages for better performance
const AboutPage = lazy(() => import('./pages/public/about'));
const ProjectsPage = lazy(() => import('./pages/public/projects'));
const ProjectRequestPage = lazy(() => import('./pages/public/projects/request'));
const ContactPage = lazy(() => import('./pages/public/contact'));
const AdminPage = lazy(() => import('./pages/admin/DashboardPage'));
const LoginPage = lazy(() => import('./pages/admin/LoginPage'));
const AnalyticsPage = lazy(() => import('./pages/admin/AnalyticsPage'));
const UsersPage = lazy(() => import('./pages/admin/users/UsersPage'));
const AdministratorFormPage = lazy(() => import('./pages/admin/users/AdministratorFormPage'));
const SettingsPage = lazy(() => import('./pages/admin/settings/SettingsPage'));
const TrainingCoursesPage = lazy(() => import('./pages/admin/training/TrainingCoursesPage'));
const ApplicationDetailsPage = lazy(() => import('./pages/admin/training/ApplicationDetailsPage'));
const CourseFormPage = lazy(() => import('./pages/admin/training/CourseFormPage'));
const JobsManagementPage = lazy(() => import('./pages/admin/jobs/JobsManagementPage'));
const JobFormPage = lazy(() => import('./pages/admin/jobs/JobFormPage'));
const JobDetailsPage = lazy(() => import('./pages/admin/jobs/JobDetailsPage'));
const JobApplicationDetailsPage = lazy(() => import('./pages/admin/jobs/JobApplicationDetailsPage'));
const BlogManagementPage = lazy(() => import('./pages/admin/blog/BlogManagementPage'));
const BlogDetailsPage = lazy(() => import('./pages/admin/blog/BlogDetailsPage'));
const BlogFormPage = lazy(() => import('./pages/admin/blog/BlogFormPage'));
const GalleryManagementPage = lazy(() => import('./pages/admin/gallery/GalleryManagementPage'));
const AlbumFormPage = lazy(() => import('./pages/admin/gallery/AlbumFormPage'));
const ProjectsManagementPage = lazy(() => import('./pages/admin/projects/ProjectsManagementPage'));
const ProjectFormPage = lazy(() => import('./pages/admin/projects/ProjectFormPage'));
const ProjectDetailsPage = lazy(() => import('./pages/admin/projects/ProjectDetailsPage'));
const FaqManagementPage = lazy(() => import('./pages/admin/faq/FaqManagementPage'));
const FaqFormPage = lazy(() => import('./pages/admin/faq/FaqFormPage'));
const TestimonialsManagementPage = lazy(() => import('./pages/admin/testimonials/TestimonialsManagementPage'));
const TestimonialsFormPage = lazy(() => import('./pages/admin/testimonials/TestimonialsFormPage'));
const PaymentsManagementPage = lazy(() => import('./pages/admin/payments/PaymentsManagementPage'));
const EnrollmentsManagementPage = lazy(() => import('./pages/admin/enrollments/EnrollmentsManagementPage'));
const EnrollmentFormPage = lazy(() => import('./pages/admin/enrollments/EnrollmentFormPage'));
const EnrollmentDetailsPage = lazy(() => import('./pages/admin/enrollments/EnrollmentDetailsPage'));
const MessagesManagementPage = lazy(() => import('./pages/admin/messages/MessagesManagementPage'));
const PartnershipsManagementPage = lazy(() => import('./pages/admin/partnerships/PartnershipsManagementPage'));
const PartnershipFormPage = lazy(() => import('./pages/admin/partnerships/PartnershipFormPage'));
const ContactInquiriesPage = lazy(() => import('./pages/admin/contact-inquiries/ContactInquiriesPage'));
const NewsletterManagementPage = lazy(() => import('./pages/admin/newsletter/NewsletterManagementPage'));
const ImpactManagementPage = lazy(() => import('./pages/admin/impact/ImpactManagementPage'));
const ImpactMetricFormPage = lazy(() => import('./pages/admin/impact/ImpactMetricFormPage'));
const ImpactStoryFormPage = lazy(() => import('./pages/admin/impact/ImpactStoryFormPage'));
const ActivityLogsPage = lazy(() => import('./pages/admin/activity-logs/ActivityLogsPage'));
const ReportsPage = lazy(() => import('./pages/admin/reports/ReportsPage'));
const AdminProfilePage = lazy(() => import('./pages/admin/profile/AdminProfilePage'));
const HeroSlidesManagementPage = lazy(() => import('./pages/admin/content/HeroSlidesManagementPage'));
const ServicesManagementPage = lazy(() => import('./pages/admin/content/ServicesManagementPage'));
const BenefitsManagementPage = lazy(() => import('./pages/admin/content/BenefitsManagementPage'));
const AboutQuoteManagementPage = lazy(() => import('./pages/admin/content/AboutQuoteManagementPage'));
const AboutPageManagementPage = lazy(() => import('./pages/admin/content/AboutPageManagementPage'));
const PartnershipContentManagementPage = lazy(() => import('./pages/admin/content/PartnershipContentManagementPage'));
const WorkWithUsManagementPage = lazy(() => import('./pages/admin/content/WorkWithUsManagementPage'));
const QAManagementPage = lazy(() => import('./pages/admin/content/QAManagementPage'));
const FaqPage = lazy(() => import('./pages/public/faq'));
const ImpactPage = lazy(() => import('./pages/public/impact'));
const PartnershipPage = lazy(() => import('./pages/public/partnership'));
const CollaborationModelsPage = lazy(() => import('./pages/public/collaboration-models/CollaborationModels'));
const OurServicesPage = lazy(() => import('./pages/public/our-services/OurServices'));
const WorkWithUsPage = lazy(() => import('./pages/public/work-with-us/WorkWithUs'));
const QualityAssurancePage = lazy(() => import('./pages/public/quality-assurance/QualityAssurance'));
const PartnershipApplicationPage = lazy(() => import('./pages/public/partnership/apply'));
const TrainingPage = lazy(() => import('./pages/public/training'));
const CourseDetailPage = lazy(() => import('./pages/public/training/CourseDetailPage'));
const CourseApplicationPage = lazy(() => import('./pages/public/training/CourseApplicationPage'));
const ApplicationSuccessPage = lazy(() => import('./pages/public/training/ApplicationSuccessPage'));
const TrainingPaymentPage = lazy(() => import('./pages/public/training/PaymentPage'));
const TrainingPaymentSuccessPage = lazy(() => import('./pages/public/training/PaymentSuccessPage'));
const TrainingContactPage = lazy(() => import('./pages/public/training/contact'));
const TrainingProgramsPage = lazy(() => import('./pages/public/training/programs'));
const BasicProgramsRoute = lazy(() => import('./pages/public/training/programs/basic'));
const IntermediateProgramsRoute = lazy(() => import('./pages/public/training/programs/intermediate'));
const AdvancedProgramsRoute = lazy(() => import('./pages/public/training/programs/advanced'));
const MaturedProgramsRoute = lazy(() => import('./pages/public/training/programs/matured'));
const InternshipProgramsRoute = lazy(() => import('./pages/public/training/programs/internship'));
const GalleryPage = lazy(() => import('./pages/public/gallery'));
const BlogPage = lazy(() => import('./pages/public/blog'));
const BlogDetailPage = lazy(() => import('./pages/public/blog/detail'));
const JobsPage = lazy(() => import('./pages/public/jobs'));
const JobDetailPage = lazy(() => import('./pages/public/jobs/detail'));
const JobApplicationPage = lazy(() => import('./pages/public/jobs/apply'));

// Loading component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#004fa2]"></div>
  </div>
);

function App() {
  const location = useLocation();

  // Check if current route is an admin route
  const isAdminRoute = location.pathname.startsWith('/admin');

  // Check if current route is a service page or projects page
  const isProjectsPage = location.pathname.startsWith('/projects');
  const isTrainingPage = location.pathname.startsWith('/training');
  const isJobApplicationPage = location.pathname.includes('/jobs/') && location.pathname.includes('/apply');

  // Check if on contact page with service context
  const isContactWithService = location.pathname === '/contact' && location.state?.from;

  const hideMainNavbar = isProjectsPage || isContactWithService || isTrainingPage || isJobApplicationPage || isAdminRoute;
  const hideMainFooter = isProjectsPage || isContactWithService || isJobApplicationPage || isAdminRoute;

  return (
    <Provider store={store}>
      <div className="flex flex-col min-h-screen">
        {/* Scroll to top on route change */}
        <ScrollToTop />

        {/* Only show main Navbar if NOT on software or projects pages or admin pages */}
        {!hideMainNavbar && <Navbar />}

        <main className="flex-grow">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/projects/request" element={<ProjectRequestPage />} />
              <Route path="/contact" element={<ContactPage />} />

              {/* Admin Routes */}
              <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
              <Route path="/admin/login" element={<LoginPage />} />
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute>
                    <AdminPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/users"
                element={
                  <ProtectedRoute requiredRole="super_admin">
                    <UsersPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/users/new"
                element={
                  <ProtectedRoute requiredRole="super_admin">
                    <AdministratorFormPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/users/edit/:id"
                element={
                  <ProtectedRoute requiredRole="super_admin">
                    <AdministratorFormPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/analytics"
                element={
                  <ProtectedRoute requiredRole="super_admin">
                    <AnalyticsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/settings"
                element={
                  <ProtectedRoute requiredRole="super_admin">
                    <SettingsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/content/hero"
                element={
                  <ProtectedRoute>
                    <HeroSlidesManagementPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/content/services"
                element={
                  <ProtectedRoute>
                    <ServicesManagementPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/content/benefits"
                element={
                  <ProtectedRoute>
                    <BenefitsManagementPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/content/about"
                element={
                  <ProtectedRoute>
                    <AboutQuoteManagementPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/content/about-page"
                element={
                  <ProtectedRoute>
                    <AboutPageManagementPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/content/partnership"
                element={
                  <ProtectedRoute>
                    <PartnershipContentManagementPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/content/work-with-us"
                element={
                  <ProtectedRoute>
                    <WorkWithUsManagementPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/content/quality-assurance"
                element={
                  <ProtectedRoute>
                    <QAManagementPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/training"
                element={
                  <ProtectedRoute>
                    <TrainingCoursesPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/training/applications/:id"
                element={
                  <ProtectedRoute>
                    <ApplicationDetailsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/training/new"
                element={
                  <ProtectedRoute>
                    <CourseFormPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/training/edit/:id"
                element={
                  <ProtectedRoute>
                    <CourseFormPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/jobs"
                element={
                  <ProtectedRoute>
                    <JobsManagementPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/jobs/new"
                element={
                  <ProtectedRoute>
                    <JobFormPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/jobs/edit/:id"
                element={
                  <ProtectedRoute>
                    <JobFormPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/jobs/:id"
                element={
                  <ProtectedRoute>
                    <JobDetailsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/jobs/applications/:id"
                element={
                  <ProtectedRoute>
                    <JobApplicationDetailsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/blog"
                element={
                  <ProtectedRoute>
                    <BlogManagementPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/blog/new"
                element={
                  <ProtectedRoute>
                    <BlogFormPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/blog/edit/:id"
                element={
                  <ProtectedRoute>
                    <BlogFormPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/blog/:id"
                element={
                  <ProtectedRoute>
                    <BlogDetailsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/gallery"
                element={
                  <ProtectedRoute>
                    <GalleryManagementPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/gallery/new"
                element={
                  <ProtectedRoute>
                    <AlbumFormPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/gallery/edit/:id"
                element={
                  <ProtectedRoute>
                    <AlbumFormPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/projects"
                element={
                  <ProtectedRoute>
                    <ProjectsManagementPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/projects/new"
                element={
                  <ProtectedRoute>
                    <ProjectFormPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/projects/edit/:id"
                element={
                  <ProtectedRoute>
                    <ProjectFormPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/projects/:id"
                element={
                  <ProtectedRoute>
                    <ProjectDetailsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/faq"
                element={
                  <ProtectedRoute>
                    <FaqManagementPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/faq/new"
                element={
                  <ProtectedRoute>
                    <FaqFormPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/faq/edit/:id"
                element={
                  <ProtectedRoute>
                    <FaqFormPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/testimonials"
                element={
                  <ProtectedRoute>
                    <TestimonialsManagementPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/testimonials/new"
                element={
                  <ProtectedRoute>
                    <TestimonialsFormPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/testimonials/edit/:id"
                element={
                  <ProtectedRoute>
                    <TestimonialsFormPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/payments"
                element={
                  <ProtectedRoute>
                    <PaymentsManagementPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/enrollments"
                element={
                  <ProtectedRoute>
                    <EnrollmentsManagementPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/enrollments/new"
                element={
                  <ProtectedRoute>
                    <EnrollmentFormPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/enrollments/edit/:id"
                element={
                  <ProtectedRoute>
                    <EnrollmentFormPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/enrollments/:id"
                element={
                  <ProtectedRoute>
                    <EnrollmentDetailsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/messages"
                element={
                  <ProtectedRoute>
                    <MessagesManagementPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/partnerships"
                element={
                  <ProtectedRoute>
                    <PartnershipsManagementPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/partnerships/new"
                element={
                  <ProtectedRoute>
                    <PartnershipFormPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/partnerships/edit/:id"
                element={
                  <ProtectedRoute>
                    <PartnershipFormPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/contact-inquiries"
                element={
                  <ProtectedRoute>
                    <ContactInquiriesPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/newsletter"
                element={
                  <ProtectedRoute>
                    <NewsletterManagementPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/impact"
                element={
                  <ProtectedRoute>
                    <ImpactManagementPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/impact/metrics/new"
                element={
                  <ProtectedRoute>
                    <ImpactMetricFormPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/impact/metrics/:id"
                element={
                  <ProtectedRoute>
                    <ImpactMetricFormPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/impact/stories/new"
                element={
                  <ProtectedRoute>
                    <ImpactStoryFormPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/impact/stories/:id"
                element={
                  <ProtectedRoute>
                    <ImpactStoryFormPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/activity-logs"
                element={
                  <ProtectedRoute>
                    <ActivityLogsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/reports"
                element={
                  <ProtectedRoute>
                    <ReportsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/profile"
                element={
                  <ProtectedRoute>
                    <AdminProfilePage />
                  </ProtectedRoute>
                }
              />

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
              <Route path="/collaboration-models" element={<CollaborationModelsPage />} />
              <Route path="/our-services" element={<OurServicesPage />} />
              <Route path="/work-with-us" element={<WorkWithUsPage />} />
              <Route path="/quality-assurance" element={<QualityAssurancePage />} />
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
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<BlogDetailPage />} />
              <Route path="/jobs" element={<JobsPage />} />
              <Route path="/jobs/:id" element={<JobDetailPage />} />
              <Route path="/jobs/:id/apply" element={<JobApplicationPage />} />

              {/* Redirects for old/broken links */}
              <Route path="/labs" element={<Navigate to="/contact" replace />} />
              <Route path="/enroll" element={<Navigate to="/training" replace />} />
              <Route path="/programs" element={<Navigate to="/training/programs" replace />} />
              {/* 404 Catch-all */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </main>
        {!hideMainFooter && <Footer />}

        {/* Global Confirm Dialog */}
        <ConfirmDialog />
      </div>
    </Provider>
  );
}

export default App;

