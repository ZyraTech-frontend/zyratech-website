import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Building, Users, Calendar, CheckCircle, Send } from 'lucide-react';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation.js';

const TrainingEnrollment = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    jobTitle: '',
    program: '',
    participants: '',
    startDate: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const titleAnimation = useScrollAnimation({ type: 'slideUp', delay: 0 });

  const trainingPrograms = [
    'DevOps Engineering',
    'Full Stack Web Development',
    'Cybersecurity Fundamentals',
    'Data Science & Analytics',
    'Cloud Architecture',
    'AI & Machine Learning',
    'Custom Corporate Training'
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        jobTitle: '',
        program: '',
        participants: '',
        startDate: '',
        message: ''
      });
    }, 3000);
  };

  return (
    <section id="training-enrollment" className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div 
          ref={titleAnimation.ref}
          initial={titleAnimation.initial}
          animate={titleAnimation.animate}
          variants={titleAnimation.variants}
          transition={titleAnimation.transition}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-4">
            Enroll Your Team
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Take the first step towards transforming your team's capabilities. Fill out the form below and our training coordinator will contact you within 24 hours.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          
          {/* Enrollment Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {submitted ? (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-green-800 mb-2">Enrollment Request Received!</h3>
                <p className="text-green-700 mb-4">
                  Thank you for your interest in our training programs. Our training coordinator will contact you within 24 hours to discuss your requirements.
                </p>
                <div className="text-sm text-green-600">
                  Reference ID: TRN{Date.now()}
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Personal Information */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-black mb-4">Personal Information</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004fa2] focus:border-transparent"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004fa2] focus:border-transparent"
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                  
                  <div className="grid sm:grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004fa2] focus:border-transparent"
                        placeholder="john@company.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004fa2] focus:border-transparent"
                        placeholder="+233 50 123 4567"
                      />
                    </div>
                  </div>
                </div>

                {/* Company Information */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-black mb-4">Company Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Company Name *</label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004fa2] focus:border-transparent"
                        placeholder="Acme Corporation"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Job Title *</label>
                      <input
                        type="text"
                        name="jobTitle"
                        value={formData.jobTitle}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004fa2] focus:border-transparent"
                        placeholder="HR Manager"
                      />
                    </div>
                  </div>
                </div>

                {/* Training Requirements */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-black mb-4">Training Requirements</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Training Program *</label>
                      <select
                        name="program"
                        value={formData.program}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004fa2] focus:border-transparent"
                      >
                        <option value="">Select a program</option>
                        {trainingPrograms.map((program) => (
                          <option key={program} value={program}>{program}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Number of Participants *</label>
                        <input
                          type="number"
                          name="participants"
                          value={formData.participants}
                          onChange={handleInputChange}
                          required
                          min="1"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004fa2] focus:border-transparent"
                          placeholder="10"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Start Date</label>
                        <input
                          type="date"
                          name="startDate"
                          value={formData.startDate}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004fa2] focus:border-transparent"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Additional Requirements</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004fa2] focus:border-transparent"
                        placeholder="Tell us about your specific training needs, goals, or any custom requirements..."
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#004fa2] hover:bg-[#000000] disabled:bg-gray-400 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      Submit Enrollment Request
                      <Send size={20} />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Contact Card */}
            <div className="bg-[#004fa2] text-white rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                    <Phone size={20} />
                  </div>
                  <div>
                    <div className="font-semibold">Phone</div>
                    <div className="text-white/90">+233 50 123 4567</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                    <Mail size={20} />
                  </div>
                  <div>
                    <div className="font-semibold">Email</div>
                    <div className="text-white/90">training@zyratechhub.com</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                    <Building size={20} />
                  </div>
                  <div>
                    <div className="font-semibold">Office</div>
                    <div className="text-white/90">Koforidua, Ghana</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Process Timeline */}
            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-black mb-6">Enrollment Process</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-[#004fa2] text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
                  <div>
                    <div className="font-semibold text-black mb-1">Submit Request</div>
                    <div className="text-gray-600 text-sm">Fill out the enrollment form with your requirements</div>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-[#004fa2] text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div>
                  <div>
                    <div className="font-semibold text-black mb-1">Consultation Call</div>
                    <div className="text-gray-600 text-sm">Our training coordinator contacts you within 24 hours</div>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-[#004fa2] text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">3</div>
                  <div>
                    <div className="font-semibold text-black mb-1">Custom Proposal</div>
                    <div className="text-gray-600 text-sm">Receive a tailored training program and pricing</div>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-[#004fa2] text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">4</div>
                  <div>
                    <div className="font-semibold text-black mb-1">Begin Training</div>
                    <div className="text-gray-600 text-sm">Start your team's transformation journey</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-gradient-to-r from-[#004fa2] to-[#2A2D7C] text-white rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6">Why Choose Us</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">500+</div>
                  <div className="text-white/90 text-sm">Professionals Trained</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">95%</div>
                  <div className="text-white/90 text-sm">Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">15+</div>
                  <div className="text-white/90 text-sm">Expert Trainers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">50+</div>
                  <div className="text-white/90 text-sm">Corporate Programs</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TrainingEnrollment;
