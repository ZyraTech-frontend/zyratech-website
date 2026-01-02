import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileDropdown, setMobileDropdown] = useState(null);

  const dropdownMenus = {
    services: [
      { name: 'Education & Internship', description: 'Practical training in coding, robotics, and IT systems with professional mentorship and real-world experience.', path: '/services/education' },
      { name: 'IT & Networking', description: 'LAN/WAN installation, WiFi setup, server deployment, and digital infrastructure solutions.', path: '/services/software' },
      { name: 'Web & Software', description: 'Custom websites, management systems, and cloud-based tools for schools and businesses.', path: '/services/software' },
      { name: 'Consulting & Support', description: 'Digital transformation consulting, system optimization, and ongoing technical support.', path: '/services/software' }
    ],
    projects: [
      { name: 'Projects', path: '/projects' },
      { name: 'Impact & Stories', path: '/impact' }
    ],
    blogMedia: [
      { name: 'Blog', path: '/blog' },
      { name: 'Media Gallery', path: '/gallery' },
      { name: 'Newsletter', path: '/newsletter' }
    ]
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', dropdown: 'services' },
    { name: 'Training', path: '/training', external: true },
    { name: 'Projects & Impact', dropdown: 'projects' },
    { name: 'Partnership', path: '/partner' },
    { name: 'Blog & Media', dropdown: 'blogMedia' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-28">
          <div className="flex items-center">
            <NavLink to="/" className="flex items-center hover:opacity-80 transition-opacity">
              <img 
                src="/zyratecpng.png" 
                alt="Zyra Tech Hub Logo" 
                className="h-28 w-auto object-contain"
              />
            </NavLink>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1 ml-32">
            {navItems.map((item) => (
              item.dropdown ? (
                <div 
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(item.dropdown)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    className="text-gray-700 hover:text-[#004fa2] px-3 py-2 text-base font-medium transition-colors whitespace-nowrap"
                  >
                    {item.name}
                  </button>
                  {openDropdown === item.dropdown && (
                    <div className="absolute left-0 mt-0 pt-2 w-80 z-50">
                      <div className="bg-white shadow-lg rounded-lg border border-gray-100 py-2">
                        {dropdownMenus[item.dropdown].map((subItem) => (
                          <NavLink
                            key={subItem.name}
                            to={subItem.path}
                            onClick={() => setOpenDropdown(null)}
                            className="block px-4 py-3 hover:bg-purple-50 hover:text-[#004fa2] transition-colors border-b border-gray-100 last:border-b-0"
                          >
                            <div className="text-base font-semibold text-gray-900 hover:text-[#004fa2]">{subItem.name}</div>
                            {subItem.description && (
                              <div className="text-sm text-gray-600 mt-1">{subItem.description}</div>
                            )}
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                item.external ? (
                  <a
                    key={item.name}
                    href={item.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-[#004fa2] px-3 py-2 text-base font-medium transition-colors whitespace-nowrap flex items-center gap-1"
                  >
                    {item.name}
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                ) : (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    className={({ isActive }) =>
                      `text-gray-700 hover:text-[#004fa2] px-3 py-2 text-base font-medium transition-colors whitespace-nowrap ${
                        isActive ? 'text-[#004fa2] font-semibold' : ''
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                )
              )
            ))}
          </div>

          {/* Spacer */}
          <div className="flex-1"></div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
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
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              item.dropdown ? (
                <div key={item.name}>
                  <button
                    onClick={() => setMobileDropdown(mobileDropdown === item.dropdown ? null : item.dropdown)}
                    className="w-full flex items-center justify-between px-3 py-2 text-base font-medium text-gray-700 hover:text-[#004fa2] hover:bg-gray-50 transition-colors"
                  >
                    <span>{item.name}</span>
                    <svg 
                      className={`w-4 h-4 transition-transform ${mobileDropdown === item.dropdown ? 'rotate-180' : ''}`}
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {mobileDropdown === item.dropdown && (
                    <div className="pl-6 space-y-2 py-2">
                      {dropdownMenus[item.dropdown].map((subItem) => (
                        <NavLink
                          key={subItem.name}
                          to={subItem.path}
                          onClick={() => {
                            setIsOpen(false);
                            setMobileDropdown(null);
                          }}
                          className={({ isActive }) =>
                            `block px-3 py-2 transition-colors ${
                              isActive
                                ? 'text-[#004fa2] bg-purple-50 font-semibold'
                                : 'text-gray-600 hover:text-[#004fa2] hover:bg-gray-50'
                            }`
                          }
                        >
                          <div className="text-sm font-semibold">{subItem.name}</div>
                          {subItem.description && (
                            <div className="text-xs text-gray-500 mt-1">{subItem.description}</div>
                          )}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                item.external ? (
                  <a
                    key={item.name}
                    href={item.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between px-3 py-2 text-base font-medium text-gray-700 hover:text-[#004fa2] hover:bg-gray-50 transition-colors"
                  >
                    <span>{item.name}</span>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                ) : (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `block px-3 py-2 text-base font-medium transition-colors ${
                        isActive
                          ? 'text-[#004fa2] bg-purple-50 font-semibold'
                          : 'text-gray-700 hover:text-[#004fa2] hover:bg-gray-50'
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                )
              )
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;



