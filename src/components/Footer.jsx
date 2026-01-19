import React from 'react';

const Footer = () => {

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
                alt="Zyra Tech Hub Logo" 
                className="h-32 w-auto object-contain filter brightness-0 invert"
              />
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              Empowering Ghana's Future Through Technology and Innovation.
            </p>
          </div>
          
          {/* About & Programs */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">About</h4>
            <ul className="space-y-1.5 mb-4">
              <li><a href="/about" className="text-sm text-gray-300 hover:text-[#004fa2] transition-colors">Our Story</a></li>
              <li><a href="/impact" className="text-sm text-gray-300 hover:text-[#004fa2] transition-colors">Mission & Vision</a></li>
              <li><a href="/about#team" className="text-sm text-gray-300 hover:text-[#004fa2] transition-colors">Team</a></li>
            </ul>
            
            <h4 className="text-sm font-semibold text-white mb-3">Programs</h4>
            <ul className="space-y-1.5">
              <li><a href="/training" className="text-sm text-gray-300 hover:text-[#004fa2] transition-colors">Training</a></li>
              <li><a href="/projects" className="text-sm text-gray-300 hover:text-[#004fa2] transition-colors">Projects</a></li>
              <li><a href="/impact" className="text-sm text-gray-300 hover:text-[#004fa2] transition-colors">Impact</a></li>
            </ul>
          </div>
          
          {/* Get Involved & Resources */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Get Involved</h4>
            <ul className="space-y-1.5 mb-4">
              <li><a href="/partner" className="text-sm text-gray-300 hover:text-[#004fa2] transition-colors">Partner</a></li>
              <li><a href="/contact" className="text-sm text-gray-300 hover:text-[#004fa2] transition-colors">Join Us</a></li>
            </ul>
            
            <h4 className="text-sm font-semibold text-white mb-3">Resources</h4>
            <ul className="space-y-1.5">
              <li><a href="/blog" className="text-sm text-gray-300 hover:text-[#004fa2] transition-colors">Blog</a></li>
              <li><a href="/gallery" className="text-sm text-gray-300 hover:text-[#004fa2] transition-colors">Gallery</a></li>
              <li><a href="/faq" className="text-sm text-gray-300 hover:text-[#004fa2] transition-colors">FAQ</a></li>
            </ul>
          </div>
          
          {/* Contact Us & Newsletter */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="text-sm font-semibold text-white mb-3">Contact Us</h4>
            <div className="space-y-1.5 mb-3">
              <p className="text-sm text-gray-300">
                <span className="font-semibold text-white">Address:</span> Koforidua, Eastern Region, Ghana
              </p>
              <p className="text-sm text-gray-300">
                <span className="font-semibold text-white">Email:</span> <a href="mailto:info@zyratechhub.com" className="hover:text-[#004fa2] transition-colors">info@zyratechhub.com</a>
              </p>
              <p className="text-sm text-gray-300">
                <span className="font-semibold text-white">Phone:</span> <a href="tel:+233509582497" className="hover:text-[#004fa2] transition-colors">+233 50 958 2497</a>
              </p>
            </div>
            
            {/* Social Media */}
            <div className="flex items-center space-x-3 mb-4">
              <a href="https://www.linkedin.com/company/zyra-tech-hub" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-[#004fa2] rounded flex items-center justify-center hover:bg-white hover:text-[#004fa2] transition-colors" aria-label="LinkedIn">
                <i className="fa-brands fa-linkedin text-white"></i>
              </a>
              <a href="https://x.com/zyratechhub" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-[#004fa2] rounded flex items-center justify-center hover:bg-white hover:text-[#004fa2] transition-colors" aria-label="X (formerly Twitter)">
                <i className="fa-brands fa-x-twitter text-white"></i>
              </a>
              <a href="https://www.instagram.com/zyratechhub" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-[#004fa2] rounded flex items-center justify-center hover:bg-white hover:text-[#004fa2] transition-colors" aria-label="Instagram">
                <i className="fa-brands fa-square-instagram text-white"></i>
              </a>
              <a href="https://www.facebook.com/zyratechhub" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-[#004fa2] rounded flex items-center justify-center hover:bg-white hover:text-[#004fa2] transition-colors" aria-label="Facebook">
                <i className="fa-brands fa-facebook text-white"></i>
              </a>
              <a href="https://wa.me/233509582497" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-[#004fa2] rounded flex items-center justify-center hover:bg-white hover:text-[#004fa2] transition-colors" aria-label="WhatsApp">
                <i className="fa-brands fa-square-whatsapp text-white"></i>
              </a>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="pt-6 border-t border-gray-800">
          <div className="text-center">
            <p className="text-sm text-gray-400">
              © 2025 Zyra Tech Hub. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;




