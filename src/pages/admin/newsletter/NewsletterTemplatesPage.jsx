/**
 * Newsletter Templates Management Page (Admin)
 * Manage and preview newsletter templates for campaigns
 */

import React, { useState } from 'react';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import {
    Mail,
    Eye,
    Copy,
    Plus,
    ArrowLeft,
    AlertCircle,
    CheckCircle
} from 'lucide-react';
import { ALL_TEMPLATES } from '../../../components/admin/newsletter/NewsletterTemplates';

const NewsletterTemplatesPage = () => {
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [copiedId, setCopiedId] = useState(null);

    const handleCopyTemplate = (template) => {
        const templateJSON = JSON.stringify(template, null, 2);
        navigator.clipboard.writeText(templateJSON);
        setCopiedId(template.id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    if (selectedTemplate) {
        return (
            <AdminLayout>
                <div className="space-y-6">
                    {/* Back Button */}
                    <button
                        onClick={() => setSelectedTemplate(null)}
                        className="flex items-center gap-2 text-[#004fa2] hover:text-blue-800 font-semibold"
                    >
                        <ArrowLeft size={16} />
                        Back to Templates
                    </button>

                    {/* Template Details */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <div className="mb-6">
                            <h1 className="text-2xl font-bold text-gray-900">{selectedTemplate.name}</h1>
                            <p className="text-gray-600 mt-2">Template ID: <code className="bg-gray-100 px-2 py-1 rounded text-sm">{selectedTemplate.id}</code></p>
                        </div>

                        {/* Subject Line */}
                        <div className="mb-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-3">Subject Line</h2>
                            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                <p className="text-gray-700 font-mono text-sm">{selectedTemplate.subject}</p>
                            </div>
                        </div>

                        {/* Content Preview */}
                        <div className="mb-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-3">Content Preview</h2>
                            <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
                                <iframe
                                    srcDoc={selectedTemplate.content}
                                    style={{
                                        width: '100%',
                                        minHeight: '600px',
                                        border: 'none'
                                    }}
                                    title={`${selectedTemplate.name} Preview`}
                                />
                            </div>
                        </div>

                        {/* HTML Content */}
                        <div className="mb-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-3">HTML Content</h2>
                            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 overflow-auto max-h-96">
                                <pre className="text-xs font-mono text-gray-700 whitespace-pre-wrap break-words">
                                    {selectedTemplate.content}
                                </pre>
                            </div>
                        </div>

                        {/* Template Metadata */}
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                            <h3 className="font-semibold text-blue-900 mb-3">Template Information</h3>
                            <div className="space-y-2 text-sm text-blue-800">
                                <p><strong>Template ID:</strong> <code>{selectedTemplate.id}</code></p>
                                <p><strong>Template Name:</strong> {selectedTemplate.name}</p>
                                <p><strong>Content Type:</strong> HTML Email</p>
                                <p><strong>Status:</strong> <span className="text-green-600 font-semibold">Ready for Backend</span></p>
                            </div>
                        </div>

                        {/* Copy Template Button */}
                        <button
                            onClick={() => handleCopyTemplate(selectedTemplate)}
                            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#004fa2] text-white rounded-lg hover:bg-blue-800 font-semibold transition-colors"
                        >
                            {copiedId === selectedTemplate.id ? (
                                <>
                                    <CheckCircle size={18} />
                                    JSON Copied!
                                </>
                            ) : (
                                <>
                                    <Copy size={18} />
                                    Copy Template JSON
                                </>
                            )}
                        </button>
                    </div>

                    {/* Backend Integration Notes */}
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
                        <h3 className="font-semibold text-amber-900 mb-3 flex items-center gap-2">
                            <AlertCircle size={20} />
                            Backend Integration
                        </h3>
                        <div className="text-sm text-amber-800 space-y-3">
                            <p>
                                This template is ready to be added to the backend. Share this JSON with the backend team 
                                to integrate it into the newsletter template system.
                            </p>
                            <div className="bg-white p-3 rounded border border-amber-200 font-mono text-xs">
                                <p className="text-gray-600 mb-2">Backend Implementation Example:</p>
                                <code className="text-gray-700">
                                    POST /api/admin/newsletter/templates/create<br/>
                                    {`{`}<br/>
                                    &nbsp;&nbsp;"id": "{selectedTemplate.id}",<br/>
                                    &nbsp;&nbsp;"name": "{selectedTemplate.name}",<br/>
                                    &nbsp;&nbsp;"subject": "...",<br/>
                                    &nbsp;&nbsp;"content": "..."{`}`}
                                </code>
                            </div>
                        </div>
                    </div>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm gap-3">
                    <div className="flex items-center gap-3">
                        <div className="bg-gradient-to-br from-[#004fa2] to-[#0066cc] p-3 rounded-lg shadow-sm">
                            <Mail size={20} className="text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl md:text-2xl font-bold text-gray-900">Newsletter Templates</h1>
                            <p className="text-sm text-gray-500 mt-1">Pre-designed templates for newsletter campaigns</p>
                        </div>
                    </div>
                    <div className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm font-semibold">
                        {ALL_TEMPLATES.length} Templates
                    </div>
                </div>

                {/* Info Box */}
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                    <p className="text-sm text-blue-800">
                        <strong>How to use:</strong> Select a template to view its details and copy the JSON. 
                        Share with the backend team to integrate into the newsletter system.
                    </p>
                </div>

                {/* Templates Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {ALL_TEMPLATES.map((template) => (
                        <div
                            key={template.id}
                            className="bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md hover:border-[#004fa2] transition-all p-4"
                        >
                            {/* Template Card */}
                            <div className="mb-4">
                                <h3 className="font-bold text-gray-900 text-lg">{template.name}</h3>
                                <code className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600 inline-block mt-2">
                                    {template.id}
                                </code>
                            </div>

                            {/* Preview Snippet */}
                            <div className="bg-gray-50 rounded border border-gray-200 p-3 mb-4 max-h-24 overflow-hidden">
                                <p className="text-xs text-gray-600 line-clamp-3">
                                    Subject: {template.subject}
                                </p>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setSelectedTemplate(template)}
                                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-[#004fa2] text-white rounded hover:bg-blue-800 transition-colors font-semibold text-sm"
                                >
                                    <Eye size={16} />
                                    View
                                </button>
                                <button
                                    onClick={() => handleCopyTemplate(template)}
                                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-gray-200 text-gray-700 rounded hover:bg-gray-50 transition-colors font-semibold text-sm"
                                >
                                    {copiedId === template.id ? (
                                        <>
                                            <CheckCircle size={16} className="text-green-600" />
                                        </>
                                    ) : (
                                        <>
                                            <Copy size={16} />
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    ))}

                    {/* Create Custom Template Card */}
                    <div className="bg-white rounded-lg border-2 border-dashed border-gray-300 shadow-sm hover:border-[#004fa2] hover:bg-blue-50 transition-all p-4 flex flex-col items-center justify-center min-h-full">
                        <Plus size={32} className="text-gray-400 mb-2" />
                        <p className="text-gray-600 font-semibold">Coming Soon</p>
                        <p className="text-xs text-gray-500 text-center mt-1">
                            Custom template builder
                        </p>
                    </div>
                </div>

                {/* Template Specifications */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">Template Specifications</h2>
                    <div className="space-y-4 text-sm text-gray-700">
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-1">Fields Required:</h3>
                            <ul className="list-disc list-inside space-y-1 text-gray-600">
                                <li><code className="bg-white px-2 py-1 rounded">id</code> - Unique template identifier (string)</li>
                                <li><code className="bg-white px-2 py-1 rounded">name</code> - Display name (string)</li>
                                <li><code className="bg-white px-2 py-1 rounded">subject</code> - Default subject line (string)</li>
                                <li><code className="bg-white px-2 py-1 rounded">content</code> - HTML content (string)</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-1">Content Format:</h3>
                            <p className="text-gray-600">
                                All templates use responsive HTML email format compatible with most email clients. 
                                Subject lines use template variables (e.g., [Date], [Event Name]).
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-1">Backend Integration:</h3>
                            <p className="text-gray-600">
                                Backend should store templates in a database and allow admins to select/customize before sending. 
                                Templates can be modified before sending (subject and content fields are editable).
                            </p>
                        </div>
                    </div>
                </div>

                {/* Export All Templates */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center justify-between">
                    <div>
                        <h3 className="font-semibold text-green-900">Export All Templates</h3>
                        <p className="text-sm text-green-700 mt-1">Download all templates as JSON for backend integration</p>
                    </div>
                    <button
                        onClick={() => {
                            const allTemplatesJSON = JSON.stringify(ALL_TEMPLATES, null, 2);
                            const blob = new Blob([allTemplatesJSON], { type: 'application/json' });
                            const url = URL.createObjectURL(blob);
                            const a = document.createElement('a');
                            a.href = url;
                            a.download = 'newsletter-templates.json';
                            a.click();
                        }}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold transition-colors"
                    >
                        Export JSON
                    </button>
                </div>
            </div>
        </AdminLayout>
    );
};

export default NewsletterTemplatesPage;
