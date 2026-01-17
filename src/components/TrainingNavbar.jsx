import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const TrainingNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState(false);

  const trainingLinks = [
    { name: 'Home', path: '/training' },
    { name: 'About Programs', path: '/training/programs' }
  ];

  const programCategoryLinks = [
    { name: 'Basic Programs', path: '/training/programs/basic' },
    { name: 'Intermediate Programs', path: '/training/programs/intermediate' },
    { name: 'Advanced Programs', path: '/training/programs/advanced' },
    { name: 'Internship Programme', path: '/training/programs/internship' },
    { name: 'Matured Programme', path: '/training/programs/matured' }
  ];

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          
          {/* Logo/Brand */}
          <div className="flex items-center">
            <NavLink to="/training" className="flex items-center hover:opacity-80 transition-opacity">
              <img 
                src="/zyratecpng.png" 
                alt="Zyra Tech Hub Logo" 
                className="h-20 w-auto object-contain"
              />
            </NavLink>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {trainingLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                end={link.path === '/training'}
                className={({ isActive }) =>
                  `text-gray-700 hover:text-[#004fa2] px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap rounded-lg ${
                    isActive ? 'bg-[#004fa2]/10 text-[#004fa2] font-semibold' : ''
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}

            <div className="relative group">
              <button
                type="button"
                className="text-gray-700 hover:text-[#004fa2] px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap rounded-lg"
              >
                Program Categories
              </button>
              <div className="absolute left-0 top-full pt-2 hidden group-hover:block">
                <div className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden min-w-[240px]">
                  {programCategoryLinks.map((link) => (
                    <NavLink
                      key={link.name}
                      to={link.path}
                      className={({ isActive }) =>
                        `block px-4 py-3 text-sm transition-colors ${
                          isActive
                            ? 'bg-[#004fa2]/10 text-[#004fa2] font-semibold'
                            : 'text-gray-700 hover:bg-gray-50 hover:text-[#004fa2]'
                        }`
                      }
                    >
                      {link.name}
                    </NavLink>
                  ))}
                </div>
              </div>
            </div>

            <NavLink
              to="/training/contact"
              className={({ isActive }) =>
                `text-gray-700 hover:text-[#004fa2] px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap rounded-lg ${
                  isActive ? 'bg-[#004fa2]/10 text-[#004fa2] font-semibold' : ''
                }`
              }
            >
              Contact
            </NavLink>
            
            {/* Back to Main Site */}
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 bg-[#004fa2] hover:bg-[#000000] text-white px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200"
            >
              Main Site
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100"
            >
              {isOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {trainingLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                end={link.path === '/training'}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2 text-base font-medium transition-colors rounded-lg ${
                    isActive
                      ? 'text-[#004fa2] bg-purple-50 font-semibold'
                      : 'text-gray-700 hover:text-[#004fa2] hover:bg-gray-50'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}

            {/* Program Categories Dropdown */}
            <div>
              <button
                onClick={() => setMobileDropdown(!mobileDropdown)}
                className="w-full flex items-center justify-between px-3 py-2 text-base font-medium text-gray-700 hover:text-[#004fa2] hover:bg-gray-50 transition-colors rounded-lg"
              >
                <span>Program Categories</span>
                <svg 
                  className={`w-4 h-4 transition-transform duration-200 ${mobileDropdown ? 'rotate-180' : ''}`}
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {mobileDropdown && (
                <div className="pl-4 space-y-1 py-2 bg-gray-50 rounded-lg mt-1">
                  {programCategoryLinks.map((link) => (
                    <NavLink
                      key={link.name}
                      to={link.path}
                      onClick={() => {
                        setIsOpen(false);
                        setMobileDropdown(false);
                      }}
                      className={({ isActive }) =>
                        `block px-3 py-2 text-sm font-medium transition-colors rounded-lg ${
                          isActive
                            ? 'text-[#004fa2] bg-white font-semibold'
                            : 'text-gray-600 hover:text-[#004fa2] hover:bg-white'
                        }`
                      }
                    >
                      {link.name}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>

            <NavLink
              to="/training/contact"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-2 text-base font-medium transition-colors rounded-lg ${
                  isActive
                    ? 'text-[#004fa2] bg-purple-50 font-semibold'
                    : 'text-gray-700 hover:text-[#004fa2] hover:bg-gray-50'
                }`
              }
            >
              Contact
            </NavLink>
            
            {/* Back to Main Site - Mobile */}
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="block px-3 py-2 text-base font-medium text-white bg-[#004fa2] hover:bg-[#000000] rounded-lg transition-colors mt-4"
            >
              Main Site
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default TrainingNavbar;
