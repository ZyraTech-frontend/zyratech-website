import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, ShieldCheck, ClipboardCheck, BookOpen, Users, ArrowRight } from 'lucide-react';
import ToolsBentoGrid from '../../../components/pages/quality-assurance/ToolsBentoGrid';
import QAFaqSection from '../../../components/pages/quality-assurance/QAFaqSection';
import NewsletterHero from '../../../components/pages/home/NewsletterHero';
import HrContactSection from '../../../components/common/HrContactSection';
import ToolsOrbit from '../../../components/pages/quality-assurance/ToolsOrbit';

const qaServices = [
  { title: 'End-to-end testing', desc: 'Functional, integration and acceptance testing to validate user journeys.', icon: ClipboardCheck },
  { title: 'Test automation', desc: 'Design and build maintainable automation suites integrated into CI.', icon: BookOpen },
  { title: 'Performance testing', desc: 'Load and stress testing to ensure reliability at scale.', icon: ShieldCheck },
  { title: 'Security testing', desc: 'Vulnerability scanning and basic security reviews to reduce risk.', icon: ShieldCheck },
  { title: 'Manual & Exploratory QA', desc: 'Human-led testing for edge cases, usability and accessibility checks.', icon: Users },
  { title: 'QA consultancy & ops', desc: 'Roadmaps, tooling and hands-on support to embed QA practices.', icon: CheckCircle },
];

const QualityAssurance = () => {
  return (
    <div className="bg-white">
        {/* Hero section */}
        <section className="relative text-white overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="/images/quality-assurance-hero.jpg"
              alt="Quality Assurance"
              className="h-full w-full object-cover"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=1200';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/45 to-black/30" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#003d7a]/35 to-transparent" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24 min-h-[450px] sm:min-h-[520px] flex items-center">
            <div className="max-w-3xl w-full">
              <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight"
              >
                Quality Assurance
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.06 }}
                className="mt-4 sm:mt-5 text-sm sm:text-base md:text-lg text-white/90 max-w-2xl leading-relaxed"
              >
                Release with confidence. ZyraTech helps you build robust, secure and high-performing products through modern QA practices and automation.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.12 }}
                className="mt-6 sm:mt-8 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4"
              >
                <Link
                  to="/contact"
                  state={{ from: 'quality-assurance' }}
                  className="cta-btn rounded-xl px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base md:text-lg transform hover:-translate-y-0.5"
                >
                  Start a QA review
                  <ArrowRight className="w-5 h-5" />
                </Link>

                <Link
                  to="/training/programs"
                  className="cta-ghost rounded-xl px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base md:text-lg transform hover:-translate-y-0.5"
                >
                  QA Training
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* How Do We Work? */}
        <section className="py-8 sm:py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-4 sm:mb-6">How Do We Work?</h2>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">We continuously work towards delivering high-quality digital products and services to our global and local client base. Our development environment allows us to efficiently and effectively achieve these goals: we work in teams following agile principles while combining them with carefully selected tools and the V-model to ensure quality.</p>
            </div>
          </div>
        </section>

        {/* Our Quality Standards */}
        <section className="py-8 sm:py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-4 sm:mb-6">Our Quality Standards</h2>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6 sm:mb-10">We follow the highest international operating and security standards. Our industry certificates validate our commitment to excellence in service delivery, information security, and technological expertise, propelling us to drive global digital transformation with continuous learning and advancement.</p>
            </div>
            <div className="space-y-4 sm:space-y-8">
              <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
                <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">This certification affirms that we adhere to the stringent requirements outlined by the German Association of the Automotive Industry (VDA) and is a trusted partner within the automotive supply chain. By achieving TISAX certification, we demonstrate our dedication to safeguarding customer data and protecting sensitive information.</p>
                <p className="text-xs sm:text-sm text-green-600 font-semibold">Result: Achieved compliance status with no non-conformities and highest possible score, in accordance with ENX ISA Catalogue.</p>
              </div>
              <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
                <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">The ISO 27001:2013 certification ensures our capability in risk management, security control implementation, and safeguarding the confidentiality, integrity, and availability of information, providing clients and partners with peace of mind regarding data protection.</p>
                <p className="text-xs sm:text-sm text-green-600 font-semibold">Result: Achieved compliance status with no non-conformities in December 2021.</p>
              </div>
              <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
                <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">This globally acknowledged standard guarantees that we consistently meets customer demands. Through effective quality control and continuous improvement, we aim to surpass customer expectations and deliver outstanding value.</p>
                <p className="text-xs sm:text-sm text-green-600 font-semibold">Result: Achieved compliance status on the quality of process and procedures regarding how operations are carried out in the most efficient way</p>
              </div>
            </div>
          </div>
        </section>

        {/* Tools We Work With */}
        <section className="py-8 sm:py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-4 sm:mb-6">Tools We Work With</h2>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">Our comprehensive toolkit spans the entire software development lifecycle, from cloud infrastructure to quality assurance.</p>
            </div>
          </div>
          <ToolsOrbit />
        </section>

        {/* Our Quality Assurance - Clean Coding Standards */}
        <section className="bg-white py-10 sm:py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">Clean Coding Standards</h3>
              <ul className="space-y-3 sm:space-y-5 text-sm sm:text-base text-gray-600">
                <li className="flex items-start gap-4">
                  <span className="text-[#004fa2] mt-1">
                    <CheckCircle size={18} />
                  </span>
                  <span>We have adopted and internalized clean coding standards. Common principles are core to our quality standards.</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-[#004fa2] mt-1">
                    <CheckCircle size={18} />
                  </span>
                  <span>We expect most of our clients to have their own norms and standards and ensure to adopt them as part of project onboarding.</span>
                </li>
              </ul>
              <div className="mt-6 sm:mt-10">
                <Link to="/our-services" className="inline-block bg-[#004fa2] text-white px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base font-semibold rounded-sm">
                  Our Services
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800"
                  alt="Clean Coding Standards"
                  className="w-full h-64 sm:h-72 md:h-80 lg:h-[420px] object-cover"
                />
                <div className="absolute top-0 right-0 h-full w-3 bg-[#004fa2]" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Our Quality Assurance - Peer Reviews */}
        <section className="bg-gray-50 py-10 sm:py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 items-center">
            <motion.div
              className="lg:order-2"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">Peer Reviews</h3>
              <ul className="space-y-3 sm:space-y-5 text-sm sm:text-base text-gray-600">
                <li className="flex items-start gap-4">
                  <span className="text-[#004fa2] mt-1">
                    <CheckCircle size={18} />
                  </span>
                  <span>We use pair programming to improve quality, reduce error rate, and enable peer learning.</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-[#004fa2] mt-1">
                    <CheckCircle size={18} />
                  </span>
                  <span>Our development process standard integrates code reviews before the code is committed.</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-[#004fa2] mt-1">
                    <CheckCircle size={18} />
                  </span>
                  <span>We use code walkthroughs as an additional quality mechanism and to ensure broad knowledge of the code base across the team.</span>
                </li>
              </ul>
              <div className="mt-6 sm:mt-10">
                <Link to="/our-services" className="inline-block bg-[#004fa2] text-white px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base font-semibold rounded-sm">
                  Our Services
                </Link>
              </div>
            </motion.div>

            <motion.div
              className="lg:order-1"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800"
                  alt="Peer Reviews"
                  className="w-full h-64 sm:h-72 md:h-80 lg:h-[420px] object-cover"
                />
                <div className="absolute top-0 right-0 h-full w-3 bg-[#004fa2]" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Our Quality Assurance - Testing */}
        <section className="bg-white py-10 sm:py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">Testing</h3>
              <ul className="space-y-3 sm:space-y-5 text-sm sm:text-base text-gray-600">
                <li className="flex items-start gap-4">
                  <span className="text-[#004fa2] mt-1">
                    <CheckCircle size={18} />
                  </span>
                  <span>TDD and BDD are core principles of our development process. Our developers are trained to write unit tests for everything they do.</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-[#004fa2] mt-1">
                    <CheckCircle size={18} />
                  </span>
                  <span>Our dedicated QA specialists automate much of the testing process with a modern toolset.</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-[#004fa2] mt-1">
                    <CheckCircle size={18} />
                  </span>
                  <span>To ensure full coverage, we conduct extensive manual testing in addition to automated processes.</span>
                </li>
              </ul>
              <div className="mt-6 sm:mt-10">
                <Link to="/our-services" className="inline-block bg-[#004fa2] text-white px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base font-semibold rounded-sm">
                  Our Services
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800"
                  alt="Testing"
                  className="w-full h-64 sm:h-72 md:h-80 lg:h-[420px] object-cover"
                />
                <div className="absolute top-0 right-0 h-full w-3 bg-[#004fa2]" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Our Professional Development - In-house Seminars */}
        <section className="bg-gray-50 py-10 sm:py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 items-center">
            <motion.div
              className="lg:order-2"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">In-house Seminars and Workshops</h3>
              <ul className="space-y-3 sm:space-y-5 text-sm sm:text-base text-gray-600">
                <li className="flex items-start gap-4">
                  <span className="text-[#004fa2] mt-1">
                    <CheckCircle size={18} />
                  </span>
                  <span>Workshops focus on soft skills such as communication, teamwork, cooperation, productivity tools, protection, and working with people with disabilities, etc.</span>
                </li>
              </ul>
              <div className="mt-6 sm:mt-10">
                <Link to="/our-services" className="inline-block bg-[#004fa2] text-white px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base font-semibold rounded-sm">
                  Our Services
                </Link>
              </div>
            </motion.div>

            <motion.div
              className="lg:order-1"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800"
                  alt="In-house Seminars and Workshops"
                  className="w-full h-64 sm:h-72 md:h-80 lg:h-[420px] object-cover"
                />
                <div className="absolute top-0 right-0 h-full w-3 bg-[#004fa2]" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Our Professional Development - Technical Training */}
        <section className="bg-white py-10 sm:py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">Skill-Based And Technical Training</h3>
              <ul className="space-y-3 sm:space-y-5 text-sm sm:text-base text-gray-600">
                <li className="flex items-start gap-4">
                  <span className="text-[#004fa2] mt-1">
                    <CheckCircle size={18} />
                  </span>
                  <span>Programmes mainly focused on honing professional skills that will aid employees in carrying out their daily work duties – Programming, DevOps, Mentoring, etc.</span>
                </li>
              </ul>
              <div className="mt-6 sm:mt-10">
                <Link to="/our-services" className="inline-block bg-[#004fa2] text-white px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base font-semibold rounded-sm">
                  Our Services
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800"
                  alt="Skill-Based And Technical Training"
                  className="w-full h-64 sm:h-72 md:h-80 lg:h-[420px] object-cover"
                />
                <div className="absolute top-0 right-0 h-full w-3 bg-[#004fa2]" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Our Professional Development - Industry Certifications */}
        <section className="bg-gray-50 py-10 sm:py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 items-center">
            <motion.div
              className="lg:order-2"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">Industry Certifications</h3>
              <ul className="space-y-3 sm:space-y-5 text-sm sm:text-base text-gray-600">
                <li className="flex items-start gap-4">
                  <span className="text-[#004fa2] mt-1">
                    <CheckCircle size={18} />
                  </span>
                  <span>Employees are provided with personalized learning experiences. Certification programmes on niche topics relevant to an employee's role or client project requirements.</span>
                </li>
              </ul>
              <div className="mt-6 sm:mt-10">
                <Link to="/our-services" className="inline-block bg-[#004fa2] text-white px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base font-semibold rounded-sm">
                  Our Services
                </Link>
              </div>
            </motion.div>

            <motion.div
              className="lg:order-1"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800"
                  alt="Industry Certifications"
                  className="w-full h-64 sm:h-72 md:h-80 lg:h-[420px] object-cover"
                />
                <div className="absolute top-0 right-0 h-full w-3 bg-[#004fa2]" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Our Professional Development - Learning Community */}
        <section className="bg-white py-10 sm:py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">Learning Community</h3>
              <ul className="space-y-3 sm:space-y-5 text-sm sm:text-base text-gray-600">
                <li className="flex items-start gap-4">
                  <span className="text-[#004fa2] mt-1">
                    <CheckCircle size={18} />
                  </span>
                  <span>Employees can connect within the company, but also create networks outside the company.</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-[#004fa2] mt-1">
                    <CheckCircle size={18} />
                  </span>
                  <span>Internal platforms and events allow employees to receive and share best practices, knowledge, and experiences.</span>
                </li>
              </ul>
              <div className="mt-6 sm:mt-10">
                <Link to="/our-services" className="inline-block bg-[#004fa2] text-white px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base font-semibold rounded-sm">
                  Our Services
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800"
                  alt="Learning Community"
                  className="w-full h-64 sm:h-72 md:h-80 lg:h-[420px] object-cover"
                />
                <div className="absolute top-0 right-0 h-full w-3 bg-[#004fa2]" />
              </div>
            </motion.div>
          </div>
        </section>

        <QAFaqSection />

        {/* Let's Have A Conversation */}
        <HrContactSection />

        {/* Newsletter Hero */}
        <NewsletterHero />
    </div>
  );
};

export default QualityAssurance;
