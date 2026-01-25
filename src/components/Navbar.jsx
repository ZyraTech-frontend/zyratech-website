import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    // Helper to close dropdowns
    const closeMenus = () => {
      setOpenDropdown(null);
      setMobileDropdown(null);
    };
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [persistDropdown, setPersistDropdown] = useState(null);
  const [mobileDropdown, setMobileDropdown] = useState(null);
  const navRef = useRef(null);

  // Services mega-menu content
  const servicesMenu = {
    image: '/images/services-menu.jpg',
    header: 'ZyraTech Services',
    mainLinks: [
      {
        label: 'Our Engagement Models',
        to: '/collaboration-models',
      },
      {
        label: 'Our Services',
        to: '/our-services',
      },
      {
        label: 'Quality Assurance',
        to: '/quality-assurance',
      },
      {
        label: 'Work With Us',
        to: '/work-with-us',
      },
      {
        label: 'Ambassador Programme',
        to: '/ambassador-programme',
      },
      {
        label: 'Our Value Proposition',
        subLinks: [
          {
            label: 'European Market',
            to: '/value-proposition/european-market',
          },
          {
            label: 'US Market',
            to: '/value-proposition/us-market',
          },
          {
            label: 'African Market',
            to: '/value-proposition/african-market',
          },
        ],
      },
    ],
  };
  const dropdownMenus = {
    about: [
      { name: 'Who We Are', path: '/about' },
      { name: 'Our Values', path: '/impact' },
      { name: 'FAQ', path: '/faq' }
    ],
    insights: [
      { name: 'Blog', path: '/blog' },
      { name: 'Media Gallery', path: '/gallery' },
      { name: 'Newsletter', path: '/newsletter' }
    ]
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', dropdown: 'about' },
    { name: 'Services', dropdown: 'services', isMegaMenu: true },
    { name: 'Projects', path: '/projects' },
    { name: 'Partnership', path: '/partner' },
    { name: 'Insights', dropdown: 'insights' },
    { name: 'Jobs', path: '/jobs' },
    { name: 'Contact', path: '/contact' },
    { name: 'ZyraTech Training', path: '/training', highlight: true }
  ];

  // Split mega-menu links into center column and value-proposition item
  const valueItem = servicesMenu.mainLinks.find((l) => l.subLinks);
  const centerLinks = servicesMenu.mainLinks.filter((l) => !l.subLinks);

  useEffect(() => {
    function handleDocClick(e) {
      if (!navRef.current) return;
      if (navRef.current.contains(e.target)) return; // click inside nav — ignore
      if (persistDropdown) {
        setPersistDropdown(null);
        setOpenDropdown(null);
      }
    }

    document.addEventListener('mousedown', handleDocClick);
    return () => document.removeEventListener('mousedown', handleDocClick);
  }, [persistDropdown]);

  return (
    <nav ref={navRef} className="bg-white/95 backdrop-blur-md shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16 lg:h-28 justify-between">
          <div className="flex items-center mr-4 lg:mr-12">
            <NavLink to="/" className="flex items-center hover:opacity-80 transition-opacity">
              <img 
                src="/zyratecpng.png" 
                alt="Zyra Tech Hub Logo" 
                className="h-16 md:h-20 lg:h-28 w-auto object-contain"
              />
            </NavLink>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-4 ml-auto relative">
            {navItems.map((item) => (
              item.dropdown ? (
                <div 
                  key={item.name}
                  className={`${item.isMegaMenu ? 'inline-block' : 'relative inline-block'}`}
                  onMouseEnter={() => setOpenDropdown(item.dropdown)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    onClick={() => {
                      // toggle persistent open on click
                      if (persistDropdown === item.dropdown) {
                        setPersistDropdown(null);
                        setOpenDropdown(null);
                      } else {
                        setPersistDropdown(item.dropdown);
                        setOpenDropdown(item.dropdown);
                      }
                    }}
                    aria-haspopup="true"
                    aria-expanded={openDropdown === item.dropdown}
                    className={`px-3 py-2 text-base font-medium transition-colors whitespace-nowrap flex items-center gap-1 ${
                      openDropdown === item.dropdown ? 'text-[#004fa2]' : 'text-gray-700 hover:text-[#004fa2]'
                    }`}
                  >
                    {item.name}
                    <svg className={`w-4 h-4 transition-transform ${openDropdown === item.dropdown ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {/* Services Mega Menu */}
                  {openDropdown === 'services' && item.isMegaMenu && (
                    <div
                      onMouseEnter={() => setOpenDropdown('services')}
                      onMouseLeave={() => {
                        if (persistDropdown !== 'services') setOpenDropdown(null);
                      }}
                      className="absolute top-full left-0 right-0 mt-2 z-50 flex justify-center"
                      role="menu"
                    >
                      <div className="bg-white shadow-2xl rounded-xl border border-gray-100 p-6 flex gap-6 min-w-[1100px]">
                          {/* Left - Image */}
                          <div className="w-64 flex-shrink-0 rounded-lg overflow-hidden">
                            <img
                              src={servicesMenu.image}
                              alt={servicesMenu.header}
                              className="w-full h-44 object-cover rounded-md"
                              onError={(e) => {
                                e.target.src = 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop';
                              }}
                            />
                          </div>

                          {/* Center - Header + Vertical Links */}
                          <div className="flex-1 flex items-center">
                            <div>
                              <div className="text-2xl font-bold text-[#004fa2] mb-4">{servicesMenu.header}</div>
                              <ul className="space-y-4">
                                {centerLinks.map((link) => (
                                  <li key={link.label}>
                                    <NavLink
                                      to={link.to}
                                      onClick={closeMenus}
                                      className="text-gray-800 hover:text-[#004fa2] text-lg font-medium"
                                    >
                                      {link.label}
                                    </NavLink>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          {/* Right - Our Value Proposition (markets) */}
                          <div className="w-64 flex flex-col justify-center">
                            {valueItem && (
                              <>
                                <div className="text-gray-800 font-semibold mb-3">{valueItem.label || 'Our Value Proposition'}</div>
                                <ul className="space-y-3">
                                  {valueItem.subLinks.map((s) => (
                                    <li key={s.label} className="flex items-center gap-3 text-gray-700">
                                      <span className="text-[#004fa2]">—</span>
                                      <NavLink to={s.to} onClick={closeMenus} className="hover:text-[#004fa2]">{s.label}</NavLink>
                                    </li>
                                  ))}
                                </ul>
                              </>
                            )}
                          </div>
                        </div>
                    </div>
                  )}
                  
                  {/* Regular Dropdown */}
                  {openDropdown === item.dropdown && !item.isMegaMenu && (
                    <div
                      onMouseEnter={() => setOpenDropdown(item.dropdown)}
                      onMouseLeave={() => {
                        if (persistDropdown !== item.dropdown) setOpenDropdown(null);
                      }}
                      className="absolute left-0 mt-0 pt-2 w-56 z-50"
                      role="menu"
                    >
                      <div className="bg-white shadow-lg rounded-lg border border-gray-100 py-2">
                        {dropdownMenus[item.dropdown].map((subItem) => (
                          <NavLink
                            key={subItem.name}
                            to={subItem.path}
                            onClick={() => setOpenDropdown(null)}
                            className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-[#004fa2] transition-colors"
                          >
                            <div className="text-sm font-medium">{subItem.name}</div>
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : item.highlight ? (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className="bg-[#004fa2] text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-[#003d7a] transition-all duration-300 shadow-md hover:shadow-lg ml-2"
                >
                  {item.name}
                </NavLink>
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
            ))}
          </div>

          {/* Mobile menu button (no spacer) */}
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
                  
                  {/* Mobile Services Menu */}
                  {mobileDropdown === 'services' && item.isMegaMenu && (
                    <div className="py-2 mx-2 bg-gray-50 rounded-lg">
                      <div className="px-4 py-2 text-[#004fa2] font-bold text-sm">{servicesMenu.header}</div>
                      <div className="space-y-1 px-2">
                        {centerLinks.map((link) => (
                          <NavLink
                            key={link.label}
                            to={link.to}
                            onClick={() => {
                              setIsOpen(false);
                              setMobileDropdown(null);
                            }}
                            className="block px-3 py-2 text-sm text-gray-700 hover:text-[#004fa2] hover:bg-blue-50 rounded"
                          >
                            {link.label}
                          </NavLink>
                        ))}
                      </div>
                      {valueItem && (
                        <>
                          <div className="px-4 py-2 mt-2 text-gray-800 font-semibold text-xs border-t border-gray-200">{valueItem.label}</div>
                          <div className="space-y-1 px-2">
                            {valueItem.subLinks.map((s) => (
                              <NavLink
                                key={s.label}
                                to={s.to}
                                onClick={() => {
                                  setIsOpen(false);
                                  setMobileDropdown(null);
                                }}
                                className="block px-3 py-2 text-sm text-gray-700 hover:text-[#004fa2] hover:bg-blue-50 rounded"
                              >
                                {s.label}
                              </NavLink>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  )}
                  
                  {/* Regular Mobile Dropdown */}
                  {mobileDropdown === item.dropdown && !item.isMegaMenu && (
                    <div className="pl-4 space-y-1 py-2 bg-gray-50 rounded-lg mx-2">
                      {dropdownMenus[item.dropdown].map((subItem) => (
                        <NavLink
                          key={subItem.name}
                          to={subItem.path}
                          onClick={() => {
                            setIsOpen(false);
                            setMobileDropdown(null);
                          }}
                          className={({ isActive }) =>
                            `block px-3 py-2 transition-colors rounded ${
                              isActive
                                ? 'text-[#004fa2] bg-blue-50 font-semibold'
                                : 'text-gray-600 hover:text-[#004fa2] hover:bg-blue-50'
                            }`
                          }
                        >
                          <div className="text-sm font-medium">{subItem.name}</div>
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              ) : item.highlight ? (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-3 text-base font-semibold bg-[#004fa2] text-white rounded-lg text-center mt-4"
                >
                  {item.name}
                </NavLink>
              ) : (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `block px-3 py-2 text-base font-medium transition-colors ${
                      isActive
                        ? 'text-[#004fa2] bg-blue-50 font-semibold'
                        : 'text-gray-700 hover:text-[#004fa2] hover:bg-gray-50'
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              )
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;



