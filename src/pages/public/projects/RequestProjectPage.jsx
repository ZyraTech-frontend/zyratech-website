import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Navbar from '../../../components/Navbar';
import MultiStepForm from '../../../components/pages/projects/MultiStepForm';
import { GraduationCap, Briefcase, Building2 } from 'lucide-react';

const RequestProjectPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const packageType = searchParams.get('package') || 'student-projects';

  // Package-specific hero content
  const heroContent = {
    'student-projects': {
      title: 'Student Project Request',
      subtitle: 'Final year project? Capstone? We\'ll build it with you.',
      icon: GraduationCap,
      banner: 'Special rates for students! We work with your academic timeline and provide documentation support.'
    },
    'business-projects': {
      title: 'Business Project Request',
      subtitle: 'Full-stack applications, IoT systems, and custom solutions for your business.',
      icon: Briefcase,
      banner: 'End-to-end project delivery with Agile methodology. Includes extended support and deployment assistance.'
    },
    'enterprise': {
      title: 'Enterprise Solution Request',
      subtitle: 'Large-scale systems with dedicated support and scalable architecture.',
      icon: Building2,
      banner: 'Dedicated account manager, custom timelines, and long-term maintenance packages available.'
    }
  };

  const content = heroContent[packageType] || heroContent['student-projects'];
  const Icon = content.icon;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#004fa2] to-[#003d7a] text-white py-16 sm:py-20 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-10 lg:px-14 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-2xl mb-6">
            <Icon className="w-8 h-8" />
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 leading-tight">{content.title}</h1>
          <p className="text-base sm:text-lg md:text-xl font-semibold text-blue-100 leading-relaxed">
            {content.subtitle}
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Info Banner */}
          <div className="bg-blue-50 border-l-4 border-[#004fa2] p-4 mb-8 rounded-lg">
            <p className="text-sm text-gray-700">
              {content.banner}
            </p>
          </div>

          <MultiStepForm onSubmit={() => navigate('/projects')} />

          {/* Additional Info */}
          <div className="mt-8 text-center text-sm text-gray-600">
            <p>Questions? Contact us at <a href="mailto:info@zyratechhub.com" className="text-[#004fa2] hover:underline">info@zyratechhub.com</a></p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RequestProjectPage;
