import React, { useState } from 'react';
import { ChevronDown, ExternalLink, Link as LinkIcon } from 'lucide-react';

/**
 * LinkPicker Component
 * User-friendly link selector for non-technical users
 * Provides predefined internal routes + custom external link support
 */

const LinkPicker = ({ value, onChange, placeholder = "Select or paste a link" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [linkType, setLinkType] = useState(value?.startsWith('http') ? 'external' : 'internal');
  const [customUrl, setCustomUrl] = useState(value?.startsWith('http') ? value : '');

  // Internal routes organized by category
  const internalRoutes = {
    'Training': [
      { label: 'Training Home', value: '/training' },
      { label: 'Training Programs', value: '/training/programs' },
      { label: 'Training Courses', value: '/training/courses' },
      { label: 'Training Apply', value: '/training/apply' },
    ],
    'Company': [
      { label: 'Home', value: '/' },
      { label: 'About', value: '/about' },
      { label: 'Services', value: '/services' },
      { label: 'Work With Us', value: '/work-with-us' },
      { label: 'Quality Assurance', value: '/quality-assurance' },
      { label: 'Impact', value: '/impact' },
      { label: 'Gallery', value: '/gallery' },
      { label: 'Blog', value: '/blog' },
    ],
    'Contact': [
      { label: 'Contact Us', value: '/contact' },
    ],
  };

  const handleSelectRoute = (route) => {
    onChange(route);
    setIsOpen(false);
    setLinkType('internal');
  };

  const handleExternalLinkChange = (e) => {
    const url = e.target.value;
    setCustomUrl(url);
    // Only update parent if valid URL
    if (url && (url.startsWith('http://') || url.startsWith('https://'))) {
      onChange(url);
    }
  };

  const handleLinkTypeChange = (type) => {
    setLinkType(type);
    if (type === 'external') {
      setCustomUrl('');
    }
  };

  return (
    <div className="space-y-3">
      {/* Link Type Selector */}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => handleLinkTypeChange('internal')}
          className={`flex-1 px-3 py-2 rounded-lg font-medium text-sm transition-all ${
            linkType === 'internal'
              ? 'bg-[#004fa2] text-white shadow-sm'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <LinkIcon size={14} className="inline mr-1.5" />
          Internal Link
        </button>
        <button
          type="button"
          onClick={() => handleLinkTypeChange('external')}
          className={`flex-1 px-3 py-2 rounded-lg font-medium text-sm transition-all ${
            linkType === 'external'
              ? 'bg-[#004fa2] text-white shadow-sm'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <ExternalLink size={14} className="inline mr-1.5" />
          External Link
        </button>
      </div>

      {/* Internal Link Dropdown */}
      {linkType === 'internal' && (
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all text-left flex items-center justify-between bg-white"
          >
            <span className={value && !value.startsWith('http') ? 'text-gray-900' : 'text-gray-500'}>
              {value && !value.startsWith('http') 
                ? Object.values(internalRoutes).flat().find(r => r.value === value)?.label || value
                : 'Select a page...'}
            </span>
            <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-64 overflow-y-auto">
              {Object.entries(internalRoutes).map(([category, routes]) => (
                <div key={category}>
                  {/* Category Header */}
                  <div className="px-4 py-2 bg-gray-50 border-b border-gray-100 font-semibold text-xs text-gray-600">
                    {category}
                  </div>
                  {/* Routes */}
                  {routes.map((route) => (
                    <button
                      key={route.value}
                      type="button"
                      onClick={() => handleSelectRoute(route.value)}
                      className={`w-full text-left px-4 py-2 hover:bg-blue-50 transition-colors text-sm ${
                        value === route.value ? 'bg-blue-100 text-[#004fa2] font-medium' : 'text-gray-700'
                      }`}
                    >
                      {route.label}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          )}

          {/* Current Selection Display */}
          {value && !value.startsWith('http') && (
            <div className="mt-2 p-2 bg-blue-50 border border-blue-100 rounded text-xs text-blue-700 flex items-center gap-2">
              <LinkIcon size={12} />
              Page link: <code className="bg-white px-1.5 py-0.5 rounded font-mono">{value}</code>
            </div>
          )}
        </div>
      )}

      {/* External Link Input */}
      {linkType === 'external' && (
        <div className="space-y-2">
          <input
            type="url"
            value={customUrl}
            onChange={handleExternalLinkChange}
            placeholder="https://example.com"
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all"
          />
          {customUrl && (customUrl.startsWith('http://') || customUrl.startsWith('https://')) ? (
            <div className="p-2 bg-green-50 border border-green-100 rounded text-xs text-green-700 flex items-center gap-2">
              <ExternalLink size={12} />
              External link: <code className="bg-white px-1.5 py-0.5 rounded font-mono truncate">{customUrl}</code>
            </div>
          ) : customUrl ? (
            <div className="p-2 bg-amber-50 border border-amber-100 rounded text-xs text-amber-700">
              ⚠️ Link must start with https:// or http://
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default LinkPicker;
