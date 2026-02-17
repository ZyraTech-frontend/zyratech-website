import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Footer = () => {
  // Get settings from Redux store
  const settings = useSelector((state) => state.settings.values);

  // Fallback values if settings not loaded
  const contactEmail = settings.contactEmail || 'info@zyratechhub.com';
  const contactPhone = settings.contactPhone || '+233 50 958 2497';
  const contactWhatsApp = settings.contactWhatsApp || '233509582497';
  const contactAddress = settings.contactAddress || 'Koforidua, Eastern Region, Ghana';
  const tagline = settings.tagline || 'Empowering Ghana\'s Future Through Technology and Innovation.';
  const siteName = settings.siteName || 'Zyra Tech Hub';

  // Social links
  const socialLinkedIn = settings.socialLinkedIn || 'https://www.linkedin.com/company/zyra-tech-hub';
  const socialTwitter = settings.socialTwitter || 'https://x.com/zyratechhub';
  const socialInstagram = settings.socialInstagram || 'https://www.instagram.com/zyratechhub';
  const socialFacebook = settings.socialFacebook || 'https://www.facebook.com/zyratechhub';

  return (
    <footer className="bg-black text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-6 mb-6">
          {/* Zyra Tech Hub Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="mb-4">
              <img
                src="/zyratecpng.png"
                alt={`${siteName} Logo`}
                loading="lazy"
                className="h-32 w-auto object-contain filter brightness-0 invert"
              />
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              {tagline}
            </p>
          </div>

          {/* About & Programs */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">About</h4>
            <ul className="space-y-1.5 mb-4">
              <li><Link to="/about" className="text-sm text-gray-300 hover:text-[#004fa2] transition-colors">Our Story</Link></li>
              <li><Link to="/impact" className="text-sm text-gray-300 hover:text-[#004fa2] transition-colors">Mission & Vision</Link></li>
              <li><Link to="/about#team" className="text-sm text-gray-300 hover:text-[#004fa2] transition-colors">Team</Link></li>
            </ul>

            <h4 className="text-sm font-semibold text-white mb-3">Programs</h4>
            <ul className="space-y-1.5">
              <li><Link to="/training" className="text-sm text-gray-300 hover:text-[#004fa2] transition-colors">Training</Link></li>
              <li><Link to="/projects" className="text-sm text-gray-300 hover:text-[#004fa2] transition-colors">Projects</Link></li>
              <li><Link to="/impact" className="text-sm text-gray-300 hover:text-[#004fa2] transition-colors">Impact</Link></li>
            </ul>
          </div>

          {/* Get Involved & Resources */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Get Involved</h4>
            <ul className="space-y-1.5 mb-4">
              <li><Link to="/partner" className="text-sm text-gray-300 hover:text-[#004fa2] transition-colors">Partner</Link></li>
              <li><Link to="/contact" className="text-sm text-gray-300 hover:text-[#004fa2] transition-colors">Join Us</Link></li>
            </ul>

            <h4 className="text-sm font-semibold text-white mb-3">Resources</h4>
            <ul className="space-y-1.5">
              <li><Link to="/blog" className="text-sm text-gray-300 hover:text-[#004fa2] transition-colors">Blog</Link></li>
              <li><Link to="/gallery" className="text-sm text-gray-300 hover:text-[#004fa2] transition-colors">Gallery</Link></li>
              <li><Link to="/faq" className="text-sm text-gray-300 hover:text-[#004fa2] transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Contact Us & Newsletter */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="text-sm font-semibold text-white mb-3">Contact Us</h4>
            <div className="space-y-1.5 mb-3">
              <p className="text-sm text-gray-300">
                <span className="font-semibold text-white">Address:</span> {contactAddress}
              </p>
              <p className="text-sm text-gray-300">
                <span className="font-semibold text-white">Email:</span> <a href={`mailto:${contactEmail}`} className="hover:text-[#004fa2] transition-colors">{contactEmail}</a>
              </p>
              <p className="text-sm text-gray-300">
                <span className="font-semibold text-white">Phone:</span> <a href={`tel:${contactPhone.replace(/\s/g, '')}`} className="hover:text-[#004fa2] transition-colors">{contactPhone}</a>
              </p>
            </div>

            {/* Social Media */}
            <div className="flex items-center space-x-3 mb-4">
              {socialLinkedIn && (
                <a href={socialLinkedIn} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-[#004fa2] rounded-lg flex items-center justify-center hover:bg-white hover:text-[#004fa2] transition-all duration-300 hover:-translate-y-1 shadow-md hover:shadow-lg" aria-label="LinkedIn">
                  <i className="fa-brands fa-linkedin-in text-lg"></i>
                </a>
              )}
              {socialTwitter && (
                <a href={socialTwitter} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-[#004fa2] rounded-lg flex items-center justify-center hover:bg-white hover:text-[#004fa2] transition-all duration-300 hover:-translate-y-1 shadow-md hover:shadow-lg" aria-label="X (formerly Twitter)">
                  <i className="fa-brands fa-x-twitter text-lg"></i>
                </a>
              )}
              {socialInstagram && (
                <a href={socialInstagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-[#004fa2] rounded-lg flex items-center justify-center hover:bg-white hover:text-[#004fa2] transition-all duration-300 hover:-translate-y-1 shadow-md hover:shadow-lg" aria-label="Instagram">
                  <i className="fa-brands fa-instagram text-xl"></i>
                </a>
              )}
              {socialFacebook && (
                <a href={socialFacebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-[#004fa2] rounded-lg flex items-center justify-center hover:bg-white hover:text-[#004fa2] transition-all duration-300 hover:-translate-y-1 shadow-md hover:shadow-lg" aria-label="Facebook">
                  <i className="fa-brands fa-facebook-f text-lg"></i>
                </a>
              )}
              {contactWhatsApp && (
                <a href={`https://wa.me/${contactWhatsApp}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-[#004fa2] rounded-lg flex items-center justify-center hover:bg-white hover:text-[#004fa2] transition-all duration-300 hover:-translate-y-1 shadow-md hover:shadow-lg" aria-label="WhatsApp">
                  <i className="fa-brands fa-whatsapp text-xl"></i>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 border-t border-gray-800">
          <div className="text-center">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} {siteName}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;




