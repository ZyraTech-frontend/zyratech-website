import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Users, Star, Award, Check, CheckCircle, Calendar, Briefcase, TrendingUp, UsersRound, Target, BookOpen } from 'lucide-react';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation.js';
import TrainingLayout from '../../../components/TrainingLayout';
import TrainingBreadcrumb from '../../../components/pages/training/TrainingBreadcrumb';
import NewsletterHero from '../../../components/pages/home/NewsletterHero';
import HrContactCard from '../../../components/common/HrContactCard';
import { getTrainingCourseById } from '../../../data/trainingCourses.js';
import useSEO from '../../../hooks/useSEO';

const CourseDetailPage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const _motion = motion;

  const titleAnimation = useScrollAnimation({ type: 'slideUp', delay: 0 });

  const course = getTrainingCourseById(courseId);
  const heroImage = course?.heroImage || '/images/image1.png';
  const parallaxImage = '/images/image3.png';

  useSEO({
    title: course ? course.title : 'Course Details',
    description: course 
      ? `${course.title} - ${course.duration} training program at Zyra Tech Hub. ${course.tagline || 'Build practical skills for your tech career.'}`
      : 'Explore training course details at Zyra Tech Hub.'
  });

  if (!course) {
    return (
      <TrainingLayout>
        <div className="flex items-center justify-center px-4 py-16">
          <div className="text-center max-w-md">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">Program not found</h1>
            <p className="text-gray-600 mb-8">The program you’re looking for doesn’t exist or may have been moved.</p>
            <button
              onClick={() => navigate('/training/programs')}
              className="bg-[#004fa2] hover:bg-[#2A2D7C] text-white px-6 py-3 rounded-lg font-bold transition-colors"
            >
              Back to Programs
            </button>
          </div>
        </div>
      </TrainingLayout>
    );
  }

  const programmeObjectives = course.programmeObjectives || [];

  const pillars = [
    {
      title: 'Employment Pathways',
      description: 'Build job-ready skills and a portfolio that positions you for real opportunities.',
      Icon: Briefcase,
    },
    {
      title: 'Skill Enhancement',
      description: 'Gain practical, in-demand skills aligned with modern software development roles.',
      Icon: TrendingUp,
    },
    {
      title: 'Talent Development',
      description: 'Learn with mentorship, peer support, and structured feedback throughout the program.',
      Icon: UsersRound,
    },
    {
      title: 'Bridging the Gap',
      description: 'Bridge theory to practice with hands-on labs, projects, and real-world workflows.',
      Icon: Target,
    },
  ];

  const deliveryModel = [
    {
      title: 'Instructor-led Sessions',
      description: 'Guided lessons, reviews, and practical walkthroughs with direct instructor support.',
    },
    {
      title: 'Hands-on Practice',
      description: 'Labs and projects to apply concepts and build confidence through doing.',
    },
    {
      title: 'Self-paced Learning',
      description: 'Structured exercises and assessments to reinforce learning at your own pace.',
    },
    {
      title: 'Collaborative Learning',
      description: 'Peer learning, group check-ins, and teamwork to strengthen problem-solving skills.',
    },
    {
      title: 'Individual Feedback',
      description: 'Targeted feedback to help you improve faster and stay on track.',
    },
  ];

  const handleEnroll = () => {
    navigate(`/training/course/${course.id}/apply`, {
      state: {
        courseTitle: course.title
      }
    });
  };

  const heroTitle = course.title;
  const heroSubtitle = course.longDescription || course.description;
  const heroInfoText = course.heroInfoText || 'Learn modern technologies and best practices.';

  return (
    <TrainingLayout>
        {/* Course Header */}
        <section
          className="relative min-h-screen flex items-center bg-center bg-cover"
          style={{ backgroundImage: `url('${heroImage}')` }}
        >
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute z-20 top-6 left-4 sm:left-6 lg:left-8">
            <TrainingBreadcrumb
              variant="light"
              items={[
                { label: 'Programs', link: '/training/programs' },
                { label: course.category.charAt(0).toUpperCase() + course.category.slice(1), link: `/training/programs/${course.category}` },
                { label: course.title }
              ]}
            />
          </div>
          <div className="absolute z-20 bottom-10 left-4 right-4 sm:left-6 sm:right-6 lg:left-auto lg:right-8">
            <div className="bg-white/10 backdrop-blur-[10px] rounded-2xl px-6 py-4 border border-white/20 shadow-lg whitespace-nowrap w-fit mx-auto lg:mx-0">
              <div className="text-white font-semibold">
                {heroInfoText}
              </div>
            </div>
          </div>
          <div className="relative z-10 w-full py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                ref={titleAnimation.ref}
                initial={titleAnimation.initial}
                animate={titleAnimation.animate}
                variants={titleAnimation.variants}
                transition={titleAnimation.transition}
              >
                <div className="grid lg:grid-cols-3 gap-10 items-start">
                  <div className="lg:col-span-2 text-center lg:text-left">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                      {heroTitle}
                    </h1>
                    <p className="text-white/90 text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto lg:mx-0">
                      {heroSubtitle}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="bg-white border-b border-gray-200 rounded-b-[40px] overflow-hidden shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-3">
                  <Clock size={18} className="text-[#004fa2]" />
                  <div className="text-sm font-semibold text-gray-900">{course.duration}</div>
                </div>
                <div className="flex items-center gap-3">
                  <BookOpen size={18} className="text-[#004fa2]" />
                  <div className="text-sm font-semibold text-gray-900">{course.format}</div>
                </div>
                <div className="flex items-center gap-3">
                  <Award size={18} className="text-[#004fa2]" />
                  <div className="text-sm font-semibold text-gray-900">{course.certificate || 'Certificate'}</div>
                </div>
                <div className="flex items-center gap-3">
                  <UsersRound size={18} className="text-[#004fa2]" />
                  <div className="text-sm font-semibold text-gray-900">Expert Support</div>
                </div>
              </div>

              <button
                onClick={handleEnroll}
                className="bg-[#004fa2] hover:bg-[#2A2D7C] text-white px-8 py-4 rounded font-bold transition-colors shadow-md"
              >
                Enroll Now - {course.price}
              </button>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Program Overview
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {course.programOverview}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="flex flex-col justify-center">
                <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">Programme Objectives</h3>

                <div className="space-y-6">
                  {programmeObjectives.map((objective) => (
                    <div key={objective.title} className="flex items-start gap-4">
                      <div className="mt-1 flex-shrink-0">
                        <Check className="w-5 h-5 text-orange-600" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">{objective.title}</div>
                        <p className="text-slate-600 leading-relaxed">{objective.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative p-8 sm:p-10">
                <div className="absolute left-0 top-10 bottom-10 w-3 sm:w-4 bg-orange-600 z-0 rounded-sm" />
                <div className="relative z-10">
                  <img
                    src={heroImage}
                    alt="Trainee working"
                    className="w-full h-[320px] sm:h-[380px] lg:h-[420px] object-cover rounded-2xl shadow-xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Parallax Divider Section */}
        <section
          className="relative h-96 bg-fixed bg-center bg-cover"
          style={{ backgroundImage: `url('${parallaxImage}')` }}
        >
          <div className="absolute inset-0 bg-black/60" />
        </section>

        {/* Application Process Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Steps List */}
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Application Process</h2>
                <ol className="relative border-l-4 border-[#004fa2] pl-8 space-y-8">
                  {course.applicationProcess
                    .filter(step => step.title !== 'Phone Interview' && step.title !== 'Assessment')
                    .map((step, idx) => (
                      <li key={step.title} className="ml-2">
                        <div className="absolute -left-5 top-1.5 w-6 h-6 rounded-full bg-[#004fa2] flex items-center justify-center text-white font-bold text-base shadow-md">
                          {idx + 1}
                        </div>
                        <div className="ml-4">
                          <div className="font-bold text-lg text-[#004fa2] mb-1">{step.title}</div>
                          <div className="text-gray-700 text-base">{step.description}</div>
                        </div>
                      </li>
                    ))}
                </ol>
              </div>
              {/* Illustration or Accent Image */}
              <div className="flex justify-center items-center">
                <img src="/images/image2.png" alt="Application Process" className="w-full max-w-lg h-[300px] sm:h-[340px] object-cover rounded-2xl shadow-xl border-4 border-[#004fa2]/10" />
              </div>
            </div>
          </div>
        </section>

        {/* Parallax Divider Section */}
        <section
          className="relative h-64 bg-fixed bg-center bg-cover"
          style={{ backgroundImage: `url('${parallaxImage}')` }}
        >
          <div className="absolute inset-0 bg-black/60" />
        </section>

        {/* How the Program Works Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Illustration or Accent Image */}
              <div className="flex justify-center items-center order-2 md:order-1">
                <img src="/images/image1.png" alt="How the Program Works" className="w-full max-w-lg h-[300px] sm:h-[340px] object-cover rounded-2xl shadow-xl border-4 border-[#004fa2]/10" />
              </div>
              {/* Steps List */}
              <div className="order-1 md:order-2">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">How the Program Works</h2>
                <ul className="space-y-6">
                  {deliveryModel.map((item) => (
                    <li key={item.title} className="flex items-start gap-4">
                      <div className="mt-1 flex-shrink-0">
                        <CheckCircle className="w-6 h-6 text-[#004fa2]" />
                      </div>
                      <div>
                        <div className="font-bold text-lg text-[#004fa2]">{item.title}</div>
                        <p className="text-gray-700 leading-relaxed">{item.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {pillars.map(({ title, description, Icon: IconComponent }) => (
                <div key={title} className="bg-gray-50 rounded-xl p-6 border border-gray-200 shadow-sm">
                  <div className="w-12 h-12 rounded-lg bg-[#004fa2]/10 flex items-center justify-center mb-5">
                    <IconComponent className="w-6 h-6 text-[#004fa2]" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

      {/* Available Cohorts Section */}
      <section className="py-16 bg-[#004fa2]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Available cohorts for 2026</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {['January to April', 'April to July', 'July to October'].map((cohort, idx) => (
              <motion.div
                key={cohort}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15, type: 'spring', stiffness: 80 }}
                className="bg-[#004fa2] rounded-xl border border-white/20 p-6 shadow-lg hover:scale-105 hover:shadow-2xl transition-transform duration-300 cursor-pointer"
              >
                <div className="font-bold text-lg text-white mb-2">{cohort}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Parallax Divider Section */}
      <section
        className="relative h-96 bg-fixed bg-center bg-cover"
        style={{ backgroundImage: `url('${parallaxImage}')` }}
      >
        <div className="absolute inset-0 bg-black/60" />
      </section>
      {/* Modern CTA Section with Brand Colors and Clean Layout */}
      <section className="bg-[#004fa2] py-20 text-center font-sans text-white">
        <div className="max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto px-4 flex flex-col items-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Join Us?</h2>
          <p className="text-lg md:text-xl leading-relaxed mb-8 text-[#e0e0e0]">
            Become part of a community shaping the future of technology. This is more than training—it's your launchpad to a tech career.
          </p>
          <p className="text-lg font-medium mb-10">
            <span className="text-white/80">Deadline:</span> <span className="font-bold">{course.deadline}</span>
          </p>
          <button
            onClick={handleEnroll}
            className="inline-block bg-[#ff5a00] hover:bg-[#e04e00] text-white font-bold py-4 px-12 rounded transition-colors duration-300 text-lg shadow-md"
          >
            Apply Now
          </button>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white" id="training-contact">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-10 items-stretch">
            <HrContactCard
              name={course.contactPerson.name}
              title={course.contactPerson.title}
              imageUrl={course.contactPerson.imageUrl || '/images/Dalene.png'}
              heightClassName="h-[380px] md:h-[420px]"
              className="rounded-2xl max-w-none w-full mx-0 md:ml-0"
            />

            <div className="bg-slate-50 rounded-2xl border border-gray-200 p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Do you have any questions?</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Please feel free to contact {course.contactPerson.name}, {course.contactPerson.title}. We’ll help you understand the program requirements, schedule, and how to apply.
              </p>

              <div className="space-y-4 mb-8">
                <a
                  href={`mailto:${course.contactPerson.email}`}
                  className="flex items-center justify-between bg-white border border-gray-200 rounded-xl p-4 hover:border-[#004fa2]/40 transition-colors"
                >
                  <div>
                    <div className="text-sm text-gray-500">Email</div>
                    <div className="font-semibold text-gray-900">{course.contactPerson.email}</div>
                  </div>
                  <span className="text-[#004fa2] font-bold">→</span>
                </a>
                <a
                  href={`tel:${course.contactPerson.phone}`}
                  className="flex items-center justify-between bg-white border border-gray-200 rounded-xl p-4 hover:border-[#004fa2]/40 transition-colors"
                >
                  <div>
                    <div className="text-sm text-gray-500">Phone</div>
                    <div className="font-semibold text-gray-900">{course.contactPerson.phone}</div>
                  </div>
                  <span className="text-[#004fa2] font-bold">→</span>
                </a>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleEnroll}
                  className="bg-[#004fa2] hover:bg-[#2A2D7C] text-white px-8 py-4 rounded-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Apply Now
                </button>
                <a
                  href={`mailto:${course.contactPerson.email}`}
                  className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 px-8 py-4 rounded-lg font-bold transition-all duration-300 inline-flex items-center justify-center"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Parallax Divider Section */}
      <section
        className="relative h-96 bg-fixed bg-center bg-cover"
        style={{ backgroundImage: `url('${parallaxImage}')` }}
      >
        <div className="absolute inset-0 bg-black/60" />
      </section>

      <NewsletterHero />
    </TrainingLayout>
  );
};

export default CourseDetailPage;

