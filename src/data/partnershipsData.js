/**
 * Partnerships Data
 * Single source of truth for partnership types, statuses, and configurations
 * Used by both admin and public partnership forms
 */

// ADMIN PARTNERSHIP TYPES - For internal management
export const PARTNERSHIP_TYPES = {
    corporate: {
        value: 'corporate',
        label: 'Corporate',
        description: 'Corporate business partnership',
        colorClass: 'bg-blue-100 text-blue-700 border-blue-200'
    },
    academic: {
        value: 'academic',
        label: 'Academic',
        description: 'Educational institution partnership',
        colorClass: 'bg-purple-100 text-purple-700 border-purple-200'
    },
    training: {
        value: 'training',
        label: 'Training',
        description: 'Training and development partnership',
        colorClass: 'bg-green-100 text-green-700 border-green-200'
    },
    technology: {
        value: 'technology',
        label: 'Technology',
        description: 'Technology and innovation partnership',
        colorClass: 'bg-cyan-100 text-cyan-700 border-cyan-200'
    },
    ngo: {
        value: 'ngo',
        label: 'NGO/Non-Profit',
        description: 'NGO or non-profit organization partnership',
        colorClass: 'bg-amber-100 text-amber-700 border-amber-200'
    },
    government: {
        value: 'government',
        label: 'Government',
        description: 'Government agency partnership',
        colorClass: 'bg-red-100 text-red-700 border-red-200'
    }
};

// PUBLIC PARTNERSHIP TYPES - For public applications
export const PUBLIC_PARTNERSHIP_TYPES = [
    'Corporate Partner',
    'Sponsor Partner',
    'Educational Partner',
    'Technology Partner',
    'Community Partner',
    'NGO Partner'
];

// PARTNERSHIP INTERESTS - Areas of collaboration
export const PARTNERSHIP_INTERESTS = [
    'Student Training & Development',
    'Internship Programs',
    'Equipment Donations',
    'Funding & Sponsorship',
    'Technology Collaboration',
    'Research & Development',
    'Community Impact Projects',
    'CSR Initiatives'
];

// Partnership Status Configurations
export const PARTNERSHIP_STATUSES = {
    pending: {
        value: 'pending',
        label: 'Pending Review',
        description: 'Application pending review',
        colorClass: 'bg-gradient-to-r from-amber-500 to-orange-500 text-white',
        dotColor: 'bg-amber-500'
    },
    negotiating: {
        value: 'negotiating',
        label: 'Negotiating',
        description: 'Terms being negotiated',
        colorClass: 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white',
        dotColor: 'bg-blue-500'
    },
    active: {
        value: 'active',
        label: 'Active',
        description: 'Partnership is active',
        colorClass: 'bg-gradient-to-r from-green-500 to-emerald-500 text-white',
        dotColor: 'bg-green-500'
    },
    expired: {
        value: 'expired',
        label: 'Expired',
        description: 'Partnership has expired',
        colorClass: 'bg-gradient-to-r from-red-500 to-rose-500 text-white',
        dotColor: 'bg-red-500'
    },
    paused: {
        value: 'paused',
        label: 'Paused',
        description: 'Partnership is temporarily paused',
        colorClass: 'bg-gray-100 text-gray-600 border border-gray-200',
        dotColor: 'bg-gray-400'
    }
};

// Get partnership type options as array
export const getPartnershipTypes = () => {
    return Object.values(PARTNERSHIP_TYPES);
};

// Get partnership status options as array
export const getPartnershipStatuses = () => {
    return Object.values(PARTNERSHIP_STATUSES);
};

// Get partnership type by value
export const getPartnershipType = (typeValue) => {
    return PARTNERSHIP_TYPES[typeValue] || null;
};

// Get partnership status by value
export const getPartnershipStatus = (statusValue) => {
    return PARTNERSHIP_STATUSES[statusValue] || null;
};
