import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Users, Award, Target, BookOpen, Briefcase, Heart, ArrowRight } from 'lucide-react';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation.js';
import ParallaxDivider from '../../common/ParallaxDivider.jsx';

const TrainingAbout = () => {
  const titleAnimation = useScrollAnimation({ type: 'slideUp', delay: 0 });
  const featuresAnimation = useScrollAnimation({ type: 'slideUp', delay: 0.1 });

  return (
    <section id="training-about" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header - ZyraTech Style */}
        <motion.div 
          ref={titleAnimation.ref}
          initial={titleAnimation.initial}
          animate={titleAnimation.animate}
          variants={titleAnimation.variants}
          transition={titleAnimation.transition}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6">
            About ZyraTech Training
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            At ZyraTech, we're committed to transforming the tech landscape in Ghana and beyond. 
            Our training programs offer modern learning environments tailored to tech enthusiasts and professionals 
            eager to make their mark in the tech industry. Whether you're just starting out or looking to enhance 
            your existing skills, our academy is designed to take you to the next level.
          </p>
        </motion.div>

        <ParallaxDivider
          heightClassName="h-56 sm:h-64 md:h-72"
          className="my-12 sm:my-16 w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]"
        />

        {/* Why Choose ZyraTech */}
        <div className="mb-16">
          <motion.div
            ref={featuresAnimation.ref}
            initial={featuresAnimation.initial}
            animate={featuresAnimation.animate}
            variants={featuresAnimation.variants}
            transition={featuresAnimation.transition}
          >
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6 sm:mb-12 md:mb-16">
              Why Choose ZyraTech
            </h3>

            {/* ===== MOBILE VERSION - Compact Card Grid (hidden on sm+) ===== */}
            <div className="sm:hidden">
              <div className="grid grid-cols-2 gap-3 mb-6">
                {/* Industry-Relevant Curriculum */}
                <div className="bg-white rounded-xl p-3 border border-gray-200">
                  <div className="w-8 h-8 bg-[#004fa2] rounded-lg flex items-center justify-center mb-2">
                    <CheckCircle className="text-white" size={16} />
                  </div>
                  <h4 className="text-xs font-bold text-gray-900 mb-1 leading-tight">Industry-Relevant Curriculum</h4>
                  <p className="text-xs text-gray-600 leading-snug">Real-world skills from industry experts.</p>
                </div>

                {/* Hands-On Learning */}
                <div className="bg-white rounded-xl p-3 border border-gray-200">
                  <div className="w-8 h-8 bg-[#004fa2] rounded-lg flex items-center justify-center mb-2">
                    <BookOpen className="text-white" size={16} />
                  </div>
                  <h4 className="text-xs font-bold text-gray-900 mb-1 leading-tight">Hands-On Learning</h4>
                  <p className="text-xs text-gray-600 leading-snug">Projects & labs to build your portfolio.</p>
                </div>

                {/* Career Support */}
                <div className="bg-white rounded-xl p-3 border border-gray-200">
                  <div className="w-8 h-8 bg-[#004fa2] rounded-lg flex items-center justify-center mb-2">
                    <Award className="text-white" size={16} />
                  </div>
                  <h4 className="text-xs font-bold text-gray-900 mb-1 leading-tight">Career Support</h4>
                  <p className="text-xs text-gray-600 leading-snug">Job offers upon completion.</p>
                </div>

                {/* Experienced Mentors */}
                <div className="bg-white rounded-xl p-3 border border-gray-200">
                  <div className="w-8 h-8 bg-[#004fa2] rounded-lg flex items-center justify-center mb-2">
                    <Users className="text-white" size={16} />
                  </div>
                  <h4 className="text-xs font-bold text-gray-900 mb-1 leading-tight">Experienced Mentors</h4>
                  <p className="text-xs text-gray-600 leading-snug">Learn from industry practitioners.</p>
                </div>

                {/* Inclusive Environment */}
                <div className="bg-white rounded-xl p-3 border border-gray-200">
                  <div className="w-8 h-8 bg-[#004fa2] rounded-lg flex items-center justify-center mb-2">
                    <Heart className="text-white" size={16} />
                  </div>
                  <h4 className="text-xs font-bold text-gray-900 mb-1 leading-tight">Inclusive Environment</h4>
                  <p className="text-xs text-gray-600 leading-snug">Supportive community for all levels.</p>
                </div>

                {/* Social Impact */}
                <div className="bg-white rounded-xl p-3 border border-gray-200">
                  <div className="w-8 h-8 bg-[#004fa2] rounded-lg flex items-center justify-center mb-2">
                    <Target className="text-white" size={16} />
                  </div>
                  <h4 className="text-xs font-bold text-gray-900 mb-1 leading-tight">Social Impact</h4>
                  <p className="text-xs text-gray-600 leading-snug">Opportunities for underserved communities.</p>
                </div>
              </div>

              {/* Mobile Image */}
              <div className="relative">
                <img 
                  src="/images/image3.png"
                  alt="ZyraTech Training"
                  loading="lazy"
                  className="w-full h-40 rounded-xl shadow-lg object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-xl"></div>
              </div>
            </div>

            {/* ===== TABLET/DESKTOP VERSION - Original Layout (hidden on mobile) ===== */}
            <div className="hidden sm:block">
              {/* First 3 Benefits */}
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mt-6 mb-12 lg:mb-16">
                {/* Left Column - Benefits 1-3 */}
                <div className="space-y-6 sm:space-y-8">
                  {/* Industry-Relevant Curriculum */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#004fa2] rounded-lg flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="text-white" size={24} />
                    </div>
                    <div>
                      <h4 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">Industry-Relevant Curriculum</h4>
                      <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                        Our training programs are designed in close collaboration with industry experts to ensure 
                        you're learning skills that matter most in today's tech world. We focus on real-world 
                        applications, giving you practical experience needed to excel in your career.
                      </p>
                    </div>
                  </div>

                  {/* Hands-On Learning */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#004fa2] rounded-lg flex items-center justify-center flex-shrink-0">
                      <BookOpen className="text-white" size={24} />
                    </div>
                    <div>
                      <h4 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">Hands-On Learning</h4>
                      <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                        Our programs are packed with projects, labs, and exercises that allow you to apply 
                        what you've learned practically. Upon completion of any of our programs, you'll have 
                        a robust portfolio to highlight your professionalism.
                      </p>
                    </div>
                  </div>

                  {/* Career Support */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#004fa2] rounded-lg flex items-center justify-center flex-shrink-0">
                      <Award className="text-white" size={24} />
                    </div>
                    <div>
                      <h4 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">Career Support</h4>
                      <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                        Beyond technical training, we provide career development support. Many of our 
                        training programs come with job offers upon completion.
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Right Column - Image */}
                <div className="order-first lg:order-last">
                  <div className="relative">
                    <img 
                      src="/images/image3.png"
                      alt="ZyraTech Training Benefits"
                      loading="lazy"
                      className="w-full h-auto rounded-xl shadow-lg object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl"></div>
                  </div>
                </div>
              </div>

              <ParallaxDivider
                heightClassName="h-56 sm:h-64 md:h-72"
                className="my-12 sm:my-16 w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]"
              />

              {/* Second 3 Benefits */}
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mt-10">
                {/* Left Column - Benefits 4-6 */}
                <div className="space-y-6 sm:space-y-8">
                  {/* Experienced Mentors */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#004fa2] rounded-lg flex items-center justify-center flex-shrink-0">
                      <Users className="text-white" size={24} />
                    </div>
                    <div>
                      <h4 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">Experienced Mentors</h4>
                      <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                        At ZyraTech, you'll learn from the best. Our instructors are not just teachers; 
                        they are industry practitioners who bring years of experience and a passion for 
                        mentoring the next generation of tech professionals.
                      </p>
                    </div>
                  </div>

                  {/* Inclusive Learning Environment */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#004fa2] rounded-lg flex items-center justify-center flex-shrink-0">
                      <Heart className="text-white" size={24} />
                    </div>
                    <div>
                      <h4 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">Inclusive Learning Environment</h4>
                      <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                        We are committed to creating an inclusive learning environment where everyone can thrive. 
                        Whether you're a beginner or looking to advance your skills, our supportive community 
                        ensures you'll receive the encouragement and resources you need to succeed.
                      </p>
                    </div>
                  </div>

                  {/* Committed to Social Impact */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#004fa2] rounded-lg flex items-center justify-center flex-shrink-0">
                      <Target className="text-white" size={24} />
                    </div>
                    <div>
                      <h4 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">Committed to Social Impact</h4>
                      <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                        When you choose ZyraTech, you're also contributing to a larger mission. We are 
                        dedicated to making a positive impact by providing quality tech education and 
                        creating employment opportunities in underserved communities.
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Right Column - Image */}
                <div className="order-first lg:order-last">
                  <div className="relative">
                    <img 
                      src="/images/image2.png"
                      alt="ZyraTech Training Impact"
                      loading="lazy"
                      className="w-full h-auto rounded-xl shadow-lg object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl"></div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <ParallaxDivider
          heightClassName="h-56 sm:h-64 md:h-72"
          className="my-12 sm:my-16 w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]"
        />

        {/* Testimonial Section - ZyraTech Style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gradient-to-br from-[#004fa2] to-[#2A2D7C] text-white rounded-xl p-6 sm:p-8 mb-12 sm:mb-16"
        >
          <div className="flex flex-col md:flex-row gap-4 sm:gap-8 items-center">
            <div className="flex-shrink-0">
              <div className="w-14 h-14 sm:w-20 sm:h-20 bg-[#004fa2] rounded-full flex items-center justify-center">
                <Users className="text-white" size={24} />
              </div>
            </div>
            <div className="flex-1">
              <blockquote className="text-sm sm:text-base md:text-lg text-white/90 italic mb-3 sm:mb-4">
                "My journey at ZyraTech transformed my career completely. In just six months, I developed 
                my skills in software development and was offered a position as a Full Stack Developer. 
                The training and mentorship I received was exceptional."
              </blockquote>
              <footer className="text-white">
                <div className="font-semibold">— Kwame Asante</div>
                <div className="text-sm text-white/80">Full Stack Development Programme</div>
              </footer>
            </div>
          </div>
        </motion.div>

        {/* Our Training Team - ZyraTech Style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-12 sm:mb-16"
        >
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8">Our Training Team</h3>
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            {/* Left Column - Content */}
            <div>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-4 sm:mb-6">
                Our team comprises seasoned professionals who bring a wealth of knowledge and real-world 
                experience to every session. With a deep understanding of the industry's demands, our 
                trainers go beyond the basics, offering insights that you won't find in any textbook.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                At ZyraTech, you're not just learning from experts—you're learning from people who 
                are shaping the future of tech.
              </p>
            </div>
            
            {/* Right Column - Image */}
            <div className="order-first lg:order-last">
              <div className="relative">
                <img 
                  src="/images/image2.png"
                  alt="ZyraTech Training Team"
                  loading="lazy"
                  className="w-full h-auto rounded-xl shadow-lg object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl"></div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Section - ZyraTech Style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-gradient-to-br from-[#004fa2] to-[#2A2D7C] text-white rounded-xl p-8 mb-16"
        >
          <h4 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Our Impact</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2">500+</div>
              <div className="text-white/90 text-xs sm:text-sm">Professionals Trained</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2">95%</div>
              <div className="text-white/90 text-xs sm:text-sm">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2">50+</div>
              <div className="text-white/90 text-xs sm:text-sm">Training Programs</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2">15+</div>
              <div className="text-white/90 text-xs sm:text-sm">Expert Trainers</div>
            </div>
          </div>
        </motion.div>

        {/* CTA Section - ZyraTech Style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
            Ready to take the next step in your tech career?
          </h3>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto">
            Explore our diverse range of training programs, tailored to meet the needs of aspiring developers, 
            cloud engineers, and digital professionals. From internship programs to specialized programs in 
            software engineering and beyond, we have something for everyone.
          </p>
          <Link 
            to="/training/programs"
            className="inline-flex items-center gap-2 bg-[#004fa2] hover:bg-[#2A2D7C] text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            Explore Training Programs
            <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default TrainingAbout;
