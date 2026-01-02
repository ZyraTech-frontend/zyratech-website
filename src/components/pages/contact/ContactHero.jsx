import React, { useState, useEffect } from 'react';
import { ChevronRight, MapPin, Mail, Phone, Send, User, MessageSquare } from 'lucide-react';

const ContactHero = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    inquiryType: '',
    message: ''
  });

  const [isVisible, setIsVisible] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleFocus = (fieldName) => {
    setFocusedField(fieldName);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  return (
    <section className="pt-16 sm:pt-20 lg:pt-24 pb-12 bg-white from-white via-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Content - Contact Form */}
          <div className={`lg:col-span-2 p-6 sm:bg-white sm:rounded-2xl sm:border sm:border-gray-200 sm:shadow-lg hover:shadow-2xl sm:p-8 transition-all duration-700 hover:scale-[1.02] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            
            <div className="mb-8">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black leading-tight mb-4">
                Contact Zyra Tech Hub
              </h1>
              <p className="text-base text-gray-600 leading-relaxed">
                Let's build something great together. Reach out to us for partnerships, internships, services, or any inquiries.
              </p>
            </div>

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all duration-300 text-sm hover:border-gray-400"
                  placeholder="Full Name"
                />

                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all duration-300 text-sm hover:border-gray-400"
                  placeholder="Phone Number"
                />
              </div>

              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all duration-300 text-sm hover:border-gray-400"
                placeholder="Email Address"
              />

              <select
                id="inquiryType"
                name="inquiryType"
                value={formData.inquiryType}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all duration-300 text-sm hover:border-gray-400 appearance-none bg-white"
              >
                <option value="">Select inquiry type</option>
                <option value="partnership">Partnership</option>
                <option value="collaboration">Collaboration</option>
                <option value="general">General Inquiry</option>
                <option value="support">Support</option>
                <option value="media">Media & Press</option>
              </select>

              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all duration-300 resize-vertical text-sm hover:border-gray-400"
                placeholder="Tell us about your project or inquiry..."
              ></textarea>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full bg-white hover:from-[#000000] hover:to-[#000000] text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Send Message
                </button>
              </div>

              <div className="text-center pt-2">
                <p className="text-xs text-gray-500">
                  We respond within 24 business hours
                </p>
              </div>
            </form>
          </div>

          {/* Right Content - Contact Information */}
          <div className="space-y-6">
            
            {/* Contact Details */}
            <div className="space-y-4">
              
              <div className="group bg-white border border-gray-200 hover:border-[#004fa2]/30 px-5 py-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#004fa2]/10 group-hover:bg-[#004fa2]/20 rounded-lg flex items-center justify-center transition-colors duration-300">
                    <MapPin className="text-[#004fa2]" size={18} />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Our Location</div>
                    <span className="text-base text-gray-900 font-semibold">Zyra Tech Hub, Koforidua, Eastern Region, Ghana</span>
                  </div>
                </div>
              </div>

              <div className="group bg-white border border-gray-200 hover:border-[#004fa2]/30 px-5 py-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#004fa2]/10 group-hover:bg-[#004fa2]/20 rounded-lg flex items-center justify-center transition-colors duration-300">
                    <Mail className="text-[#004fa2]" size={18} />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Email Address</div>
                    <span className="text-base text-gray-900 font-semibold">info@zyratechhub.com</span>
                  </div>
                </div>
              </div>

              <div className="group bg-white border border-gray-200 hover:border-[#004fa2]/30 px-5 py-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#004fa2]/10 group-hover:bg-[#004fa2]/20 rounded-lg flex items-center justify-center transition-colors duration-300">
                    <Phone className="text-[#004fa2]" size={18} />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Phone Number</div>
                    <span className="text-base text-gray-900 font-semibold">+233 50 958 2497</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Social Media */}
            <div className="bg-white border border-gray-200 px-5 py-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Connect With Us</h3>
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <a href="https://www.facebook.com/zyratechhub" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-[#004fa2] hover:bg-[#004fa2]/5 transition-all duration-300 group">
                  <i className="fa-brands fa-facebook text-[#004fa2] group-hover:text-[#000000]"></i>
                  <span className="text-sm font-medium text-gray-700 group-hover:text-[#004fa2]">Facebook</span>
                </a>
                <a href="https://www.linkedin.com/company/zyratechhub" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-[#004fa2] hover:bg-[#004fa2]/5 transition-all duration-300 group">
                  <i className="fa-brands fa-linkedin text-[#004fa2] group-hover:text-[#000000]"></i>
                  <span className="text-sm font-medium text-gray-700 group-hover:text-[#004fa2]">LinkedIn</span>
                </a>
                <a href="https://www.instagram.com/zyratechhub" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-[#004fa2] hover:bg-[#004fa2]/5 transition-all duration-300 group">
                  <i className="fa-brands fa-square-instagram text-[#004fa2] group-hover:text-[#000000]"></i>
                  <span className="text-sm font-medium text-gray-700 group-hover:text-[#004fa2]">Instagram</span>
                </a>
              </div>
            </div>

          </div>
          
        </div>
      </div>
    </section>
  );
};

export default ContactHero;


