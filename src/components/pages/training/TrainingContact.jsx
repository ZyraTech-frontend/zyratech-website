import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Clock, Users } from 'lucide-react';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation.js';

const TrainingContact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const titleAnimation = useScrollAnimation({ type: 'slideUp', delay: 0 });

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
        name: '',
        email: '',
        phone: '',
        company: '',
        message: ''
      });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: Phone,
      label: 'Phone',
      value: '+233 50 123 4567',
      description: 'Mon-Fri 9AM-6PM GMT'
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'training@zyratechhub.com',
      description: '24/7 response guarantee'
    },
    {
      icon: MapPin,
      label: 'Office',
      value: 'Koforidua, Ghana',
      description: 'Visit us for consultation'
    }
  ];

  const quickInfo = [
    {
      icon: Clock,
      title: 'Business Hours',
      content: 'Monday - Friday: 9:00 AM - 6:00 PM GMT<br>Saturday: 10:00 AM - 2:00 PM GMT<br>Sunday: Closed'
    },
    {
      icon: Users,
      title: 'Training Team',
      content: '15+ certified trainers<br>Industry experts<br>Real-world experience'
    }
  ];

  return (
    <section id="training-contact" className="py-16 sm:py-20 bg-gray-50">
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
            Get in Touch
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Have questions about our training programs? Our team is ready to help you find the perfect solution for your organization
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {submitted ? (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-green-800 mb-2">Message Sent!</h3>
                <p className="text-green-700 mb-4">
                  Thank you for contacting us. Our training coordinator will get back to you within 24 hours.
                </p>
                <div className="text-sm text-green-600">
                  Reference ID: TC{Date.now()}
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
                <h3 className="text-xl font-bold text-black mb-6">Send us a Message</h3>
                
                <div className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004fa2] focus:border-transparent"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004fa2] focus:border-transparent"
                        placeholder="Your company"
                      />
                    </div>
                  </div>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004fa2] focus:border-transparent"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004fa2] focus:border-transparent"
                        placeholder="+233 50 123 4567"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004fa2] focus:border-transparent"
                      placeholder="Tell us about your training needs, questions, or requirements..."
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#004fa2] hover:bg-[#000000] disabled:bg-gray-400 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send size={20} />
                      </>
                    )}
                  </button>
                </div>
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
            {/* Contact Cards */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => {
                const IconComponent = info.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-[#004fa2]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <IconComponent size={24} className="text-[#004fa2]" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-black mb-1">{info.label}</h4>
                        <div className="text-lg font-medium text-[#004fa2] mb-1">{info.value}</div>
                        <div className="text-sm text-gray-500">{info.description}</div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Quick Information */}
            <div className="bg-[#004fa2] text-white rounded-2xl p-8">
              <h3 className="text-xl font-bold mb-6">Quick Information</h3>
              <div className="space-y-6">
                {quickInfo.map((info, index) => {
                  const IconComponent = info.icon;
                  return (
                    <div key={index} className="flex gap-4">
                      <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <IconComponent size={20} />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">{info.title}</h4>
                        <div 
                          className="text-white/90 text-sm"
                          dangerouslySetInnerHTML={{ __html: info.content }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
              <h4 className="font-bold text-yellow-800 mb-2">Need Immediate Assistance?</h4>
              <p className="text-yellow-700 mb-4 text-sm">
                For urgent training inquiries or same-day consultation requests, call our hotline.
              </p>
              <a 
                href="tel:+233501234567"
                className="inline-flex items-center gap-2 bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
              >
                <Phone size={18} />
                Emergency Hotline
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TrainingContact;
