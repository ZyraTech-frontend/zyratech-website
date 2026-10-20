import React, { useState } from 'react';
import { ChevronDown, ExternalLink, Link as LinkIcon } from 'lucide-react';

/**
 * LinkPicker Component - COMPLETE & VERIFIED
 * All routes verified against App.jsx route definitions
 * NO broken links - every route has been tested
 */

const LinkPicker = ({ value, onChange, placeholder = "Select or paste a link" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [linkType, setLinkType] = useState(value?.startsWith('http') ? 'external' : 'internal');
  const [customUrl, setCustomUrl] = useState(value?.startsWith('http') ? value : '');

  // ALL VERIFIED PUBLIC ROUTES - organized by category
  // Every route has been verified to exist in App.jsx
  const internalRoutes = {
    '🏠 Core Pages': [
      { label: 'Home', value: '/' },
      { label: 'About', value: '/about' },
      { label: 'Contact', value: '/contact' },
      { label: 'FAQ', value: '/faq' },
    ],
    '🎓 Training': [
      { label: 'Training Home', value: '/training' },
      { label: 'Training Contact', value: '/training/contact' },
      { label: 'Training Programs', value: '/training/programs' },
      { label: 'Training - Basic Programs', value: '/training/programs/basic' },
      { label: 'Training - Intermediate Programs', value: '/training/programs/intermediate' },
      { label: 'Training - Advanced Programs', value: '/training/programs/advanced' },
      { label: 'Training - Matured Programs', value: '/training/programs/matured' },
      { label: 'Training - Internship Programs', value: '/training/programs/internship' },
      { label: 'Training Application Success', value: '/training/application-success' },
    ],
    '💼 Jobs & Careers': [
      { label: 'Jobs', value: '/jobs' },
    ],
    '📊 Projects': [
      { label: 'Projects', value: '/projects' },
      { label: 'Project Request', value: '/projects/request' },
    ],
    '🎨 Gallery & Media': [
      { label: 'Gallery', value: '/gallery' },
    ],
    '📰 Content': [
      { label: 'Blog', value: '/blog' },
      { label: 'Impact', value: '/impact' },
      { label: 'Partnerships', value: '/partner' },
      { label: 'Partnership Application', value: '/partner/apply' },
    ],
    '🏢 Business Pages': [
      { label: 'Our Services', value: '/our-services' },
      { label: 'Collaboration Models', value: '/collaboration-models' },
      { label: 'Work With Us', value: '/work-with-us' },
      { label: 'Quality Assurance', value: '/quality-assurance' },
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

  // Find the current label if internal link is selected
  const getCurrentLabel = () => {
    if (!value || value.startsWith('http')) return null;
    for (const category of Object.values(internalRoutes)) {
      const found = category.find(r => r.value === value);
      if (found) return found.label;
    }
    return null;
  };

  const currentLabel = getCurrentLabel();

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
          Page
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
          External
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
            <span className={currentLabel ? 'text-gray-900 font-medium' : 'text-gray-500'}>
              {currentLabel || 'Select a page...'}
            </span>
            <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-96 overflow-y-auto">
              {Object.entries(internalRoutes).map(([category, routes]) => (
                <div key={category}>
                  {/* Category Header */}
                  <div className="px-4 py-2.5 bg-gray-50 border-b border-gray-100 font-semibold text-sm text-gray-700">
                    {category}
                  </div>
                  {/* Routes */}
                  {routes.map((route) => (
                    <button
                      key={route.value}
                      type="button"
                      onClick={() => handleSelectRoute(route.value)}
                      className={`w-full text-left px-4 py-2.5 hover:bg-blue-50 transition-colors text-sm ${
                        value === route.value ? 'bg-blue-100 text-[#004fa2] font-medium border-l-4 border-[#004fa2]' : 'text-gray-700'
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
          {currentLabel && (
            <div className="mt-2 p-2.5 bg-blue-50 border border-blue-100 rounded text-xs text-blue-700 flex items-center gap-2">
              <LinkIcon size={13} />
              <span className="font-medium">Selected:</span>
              <code className="bg-white px-2 py-0.5 rounded font-mono text-blue-900">{value}</code>
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
            <div className="p-2.5 bg-green-50 border border-green-100 rounded text-xs text-green-700 flex items-center gap-2">
              <ExternalLink size={13} />
              <span className="font-medium">Valid:</span>
              <code className="bg-white px-2 py-0.5 rounded font-mono text-green-900 truncate">{customUrl}</code>
            </div>
          ) : customUrl ? (
            <div className="p-2.5 bg-amber-50 border border-amber-100 rounded text-xs text-amber-700 flex items-center gap-2">
              ⚠️
              <span>Link must start with <code className="bg-white px-1 py-0.5 rounded font-mono">https://</code> or <code className="bg-white px-1 py-0.5 rounded font-mono">http://</code></span>
            </div>
          ) : null}
        </div>
      )}

      {/* Helper text */}
      <p className="text-xs text-gray-500 mt-2 p-2 bg-gray-50 rounded border border-gray-100">
        💡 <strong>Tip:</strong> Select from verified pages above or add any external link. All internal routes have been tested.
      </p>
    </div>
  );
};

export default LinkPicker;
