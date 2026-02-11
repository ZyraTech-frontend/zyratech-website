/**
 * Impact Service
 * Handles API calls for impact metrics and success stories
 */

import api from './api';

// Category configuration
export const IMPACT_CATEGORIES = {
    'students': {
        label: 'Students & Graduates',
        color: 'bg-blue-100 text-blue-700 border-blue-200',
        gradient: 'from-blue-500 to-cyan-500'
    },
    'employment': {
        label: 'Employment',
        color: 'bg-green-100 text-green-700 border-green-200',
        gradient: 'from-green-500 to-emerald-500'
    },
    'partnerships': {
        label: 'Partnerships',
        color: 'bg-purple-100 text-purple-700 border-purple-200',
        gradient: 'from-purple-500 to-violet-500'
    },
    'community': {
        label: 'Community',
        color: 'bg-amber-100 text-amber-700 border-amber-200',
        gradient: 'from-amber-500 to-orange-500'
    },
    'awards': {
        label: 'Awards & Recognition',
        color: 'bg-yellow-100 text-yellow-700 border-yellow-200',
        gradient: 'from-yellow-500 to-amber-500'
    },
    'courses': {
        label: 'Courses & Programs',
        color: 'bg-cyan-100 text-cyan-700 border-cyan-200',
        gradient: 'from-cyan-500 to-blue-500'
    },
    'financial': {
        label: 'Financial Impact',
        color: 'bg-emerald-100 text-emerald-700 border-emerald-200',
        gradient: 'from-emerald-500 to-green-500'
    },
    'projects': {
        label: 'Projects & Delivery',
        color: 'bg-indigo-100 text-indigo-700 border-indigo-200',
        gradient: 'from-indigo-500 to-purple-500'
    },
    'training': {
        label: 'Training Outcomes',
        color: 'bg-rose-100 text-rose-700 border-rose-200',
        gradient: 'from-rose-500 to-pink-500'
    }
};

// Metric types
export const METRIC_TYPES = {
    'number': { label: 'Number', icon: 'Hash' },
    'percentage': { label: 'Percentage', icon: 'Percent' },
    'currency': { label: 'Currency', icon: 'DollarSign' },
    'rating': { label: 'Rating', icon: 'Star' },
    'text': { label: 'Text/Range', icon: 'Type' }
};

// Display locations - where metrics can appear on the public site
export const DISPLAY_LOCATIONS = {
    'home': { label: 'Home Page', description: 'Stats shown on the home page' },
    'partnership': { label: 'Partnership Page', description: 'Stats shown on the partnership page' },
    'projects': { label: 'Projects Page', description: 'Stats shown on the projects page hero' },
    'training': { label: 'Training Page', description: 'Stats shown on the training benefits section' },
    'about': { label: 'About Page', description: 'Stats shown on the about page' },
    'impact': { label: 'Impact Page', description: 'Stats shown on the impact page' }
};

// Mock impact metrics (will be replaced with API calls)
const mockMetrics = [
    // ========== PARTNERSHIP PAGE METRICS ==========
    {
        id: 'MET-P001',
        title: 'Active Partners',
        value: 50,
        previousValue: 40,
        type: 'number',
        category: 'partnerships',
        description: 'Number of active corporate and institutional partners',
        suffix: '+',
        prefix: '',
        featured: true,
        active: true,
        displayOrder: 1,
        displayLocations: ['partnership'],
        lastUpdated: '2024-12-19T10:00:00Z',
        trend: 'up'
    },
    {
        id: 'MET-P002',
        title: 'Students Trained',
        value: 100,
        previousValue: 80,
        type: 'number',
        category: 'students',
        description: 'Total number of students trained through partnerships',
        suffix: 'K+',
        prefix: '',
        featured: true,
        active: true,
        displayOrder: 2,
        displayLocations: ['partnership'],
        lastUpdated: '2024-12-19T10:00:00Z',
        trend: 'up'
    },
    {
        id: 'MET-P003',
        title: 'Projects Completed',
        value: 100,
        previousValue: 85,
        type: 'number',
        category: 'projects',
        description: 'Total number of projects completed with partners',
        suffix: '+',
        prefix: '',
        featured: true,
        active: true,
        displayOrder: 3,
        displayLocations: ['partnership'],
        lastUpdated: '2024-12-19T10:00:00Z',
        trend: 'up'
    },
    {
        id: 'MET-P004',
        title: 'Lives Impacted',
        value: 500,
        previousValue: 400,
        type: 'number',
        category: 'community',
        description: 'Number of lives positively impacted through our programs',
        suffix: '+',
        prefix: '',
        featured: true,
        active: true,
        displayOrder: 4,
        displayLocations: ['partnership'],
        lastUpdated: '2024-12-19T10:00:00Z',
        trend: 'up'
    },

    // ========== PROJECTS PAGE METRICS ==========
    {
        id: 'MET-PR001',
        title: 'Projects Delivered',
        value: 50,
        previousValue: 40,
        type: 'number',
        category: 'projects',
        description: 'Total number of projects successfully delivered',
        suffix: '+',
        prefix: '',
        featured: true,
        active: true,
        displayOrder: 1,
        displayLocations: ['projects'],
        lastUpdated: '2024-12-19T10:00:00Z',
        trend: 'up'
    },
    {
        id: 'MET-PR002',
        title: 'Student Success',
        value: 100,
        previousValue: 95,
        type: 'percentage',
        category: 'students',
        description: 'Percentage of students who successfully complete projects',
        suffix: '%',
        prefix: '',
        featured: true,
        active: true,
        displayOrder: 2,
        displayLocations: ['projects'],
        lastUpdated: '2024-12-19T10:00:00Z',
        trend: 'up'
    },
    {
        id: 'MET-PR003',
        title: 'Weeks Delivery',
        value: '2-8',
        previousValue: null,
        type: 'text',
        category: 'projects',
        description: 'Average project delivery timeline in weeks',
        suffix: '',
        prefix: '',
        featured: true,
        active: true,
        displayOrder: 3,
        displayLocations: ['projects'],
        lastUpdated: '2024-12-19T10:00:00Z',
        trend: 'up'
    },

    // ========== HOME PAGE METRICS ==========
    {
        id: 'MET-H001',
        title: 'Students Trained',
        value: 500,
        previousValue: 400,
        type: 'number',
        category: 'students',
        description: 'Total students trained at ZyraTech',
        suffix: '+',
        prefix: '',
        featured: true,
        active: true,
        displayOrder: 1,
        displayLocations: ['home'],
        lastUpdated: '2024-12-19T10:00:00Z',
        trend: 'up'
    },
    {
        id: 'MET-H002',
        title: 'Partner Schools',
        value: 10,
        previousValue: 8,
        type: 'number',
        category: 'partnerships',
        description: 'Number of partner schools and institutions',
        suffix: '+',
        prefix: '',
        featured: true,
        active: true,
        displayOrder: 2,
        displayLocations: ['home'],
        lastUpdated: '2024-12-19T10:00:00Z',
        trend: 'up'
    },
    {
        id: 'MET-H003',
        title: 'Affordable Internship Fee',
        value: 350,
        previousValue: 350,
        type: 'currency',
        category: 'financial',
        description: 'Affordable internship program fee',
        suffix: '',
        prefix: 'GHS',
        featured: true,
        active: true,
        displayOrder: 3,
        displayLocations: ['home'],
        lastUpdated: '2024-12-19T10:00:00Z',
        trend: 'up'
    },
    {
        id: 'MET-H004',
        title: 'Professional Projects',
        value: 20,
        previousValue: 15,
        type: 'number',
        category: 'projects',
        description: 'Professional projects completed',
        suffix: '+',
        prefix: '',
        featured: true,
        active: true,
        displayOrder: 4,
        displayLocations: ['home'],
        lastUpdated: '2024-12-19T10:00:00Z',
        trend: 'up'
    },

    // ========== TRAINING PAGE METRICS ==========
    {
        id: 'MET-T001',
        title: 'Productivity Increase',
        value: 40,
        previousValue: 35,
        type: 'percentage',
        category: 'training',
        description: 'Average productivity increase after training',
        suffix: '%',
        prefix: '',
        featured: true,
        active: true,
        displayOrder: 1,
        displayLocations: ['training'],
        lastUpdated: '2024-12-19T10:00:00Z',
        trend: 'up'
    },
    {
        id: 'MET-T002',
        title: 'Satisfaction Rate',
        value: 95,
        previousValue: 92,
        type: 'percentage',
        category: 'training',
        description: 'Training satisfaction rate from participants',
        suffix: '%',
        prefix: '',
        featured: true,
        active: true,
        displayOrder: 2,
        displayLocations: ['training'],
        lastUpdated: '2024-12-19T10:00:00Z',
        trend: 'up'
    },
    {
        id: 'MET-T003',
        title: 'ROI on Training',
        value: '3x',
        previousValue: null,
        type: 'text',
        category: 'training',
        description: 'Return on investment for corporate training',
        suffix: '',
        prefix: '',
        featured: true,
        active: true,
        displayOrder: 3,
        displayLocations: ['training'],
        lastUpdated: '2024-12-19T10:00:00Z',
        trend: 'up'
    },
    {
        id: 'MET-T004',
        title: 'Skill Retention',
        value: 85,
        previousValue: 80,
        type: 'percentage',
        category: 'training',
        description: 'Percentage of skills retained after 6 months',
        suffix: '%',
        prefix: '',
        featured: true,
        active: true,
        displayOrder: 4,
        displayLocations: ['training'],
        lastUpdated: '2024-12-19T10:00:00Z',
        trend: 'up'
    },

    // ========== GENERAL/IMPACT PAGE METRICS ==========
    {
        id: 'MET-001',
        title: 'Total Students Trained',
        value: 2500,
        previousValue: 2100,
        type: 'number',
        category: 'students',
        description: 'Total number of students who have completed training programs',
        suffix: '+',
        prefix: '',
        featured: true,
        active: true,
        displayOrder: 1,
        displayLocations: ['impact'],
        lastUpdated: '2024-12-19T10:00:00Z',
        trend: 'up'
    },
    {
        id: 'MET-002',
        title: 'Employment Rate',
        value: 87,
        previousValue: 82,
        type: 'percentage',
        category: 'employment',
        description: 'Percentage of graduates employed within 6 months of completion',
        suffix: '%',
        prefix: '',
        featured: true,
        active: true,
        displayOrder: 2,
        displayLocations: ['impact'],
        lastUpdated: '2024-12-18T14:30:00Z',
        trend: 'up'
    },
    {
        id: 'MET-003',
        title: 'Partner Companies',
        value: 45,
        previousValue: 38,
        type: 'number',
        category: 'partnerships',
        description: 'Number of corporate and institutional partners',
        suffix: '+',
        prefix: '',
        featured: true,
        active: true,
        displayOrder: 3,
        displayLocations: ['impact'],
        lastUpdated: '2024-12-17T09:15:00Z',
        trend: 'up'
    },
    {
        id: 'MET-004',
        title: 'Courses Offered',
        value: 25,
        previousValue: 20,
        type: 'number',
        category: 'courses',
        description: 'Total number of training courses and programs available',
        suffix: '',
        prefix: '',
        featured: false,
        active: true,
        displayOrder: 4,
        displayLocations: ['impact'],
        lastUpdated: '2024-12-16T11:45:00Z',
        trend: 'up'
    },
    {
        id: 'MET-005',
        title: 'Student Satisfaction',
        value: 4.8,
        previousValue: 4.6,
        type: 'rating',
        category: 'students',
        description: 'Average student satisfaction rating out of 5.0',
        suffix: '/5.0',
        prefix: '',
        featured: true,
        active: true,
        displayOrder: 5,
        displayLocations: ['impact'],
        lastUpdated: '2024-12-19T08:00:00Z',
        trend: 'up'
    },
    {
        id: 'MET-006',
        title: 'Community Events',
        value: 120,
        previousValue: 95,
        type: 'number',
        category: 'community',
        description: 'Number of community events and workshops hosted',
        suffix: '+',
        prefix: '',
        featured: false,
        active: true,
        displayOrder: 6,
        displayLocations: ['impact'],
        lastUpdated: '2024-12-15T16:20:00Z',
        trend: 'up'
    },
    {
        id: 'MET-007',
        title: 'Industry Awards',
        value: 12,
        previousValue: 10,
        type: 'number',
        category: 'awards',
        description: 'Number of industry awards and recognitions received',
        suffix: '',
        prefix: '',
        featured: false,
        active: true,
        displayOrder: 7,
        displayLocations: ['impact'],
        lastUpdated: '2024-12-10T13:00:00Z',
        trend: 'up'
    },
    {
        id: 'MET-008',
        title: 'Scholarships Awarded',
        value: 350000,
        previousValue: 280000,
        type: 'currency',
        category: 'financial',
        description: 'Total value of scholarships awarded to students (GHS)',
        suffix: '',
        prefix: 'GHS ',
        featured: true,
        active: true,
        displayOrder: 8,
        displayLocations: ['impact'],
        lastUpdated: '2024-12-18T10:30:00Z',
        trend: 'up'
    }
];

const mockStories = [
    {
        id: 'STORY-001',
        name: 'Kwame Asante',
        title: 'From Unemployed to Lead Developer',
        role: 'Senior Software Developer',
        organization: 'TechVision Ltd',
        location: 'Accra, Ghana',
        image: null,
        quote: 'Zyra Tech Hub transformed my career completely. Within 6 months of completing the program, I landed my dream job.',
        featured: true,
        active: true,
        datePublished: '2024-11-15'
    },
    {
        id: 'STORY-002',
        name: 'Ama Mensah',
        title: 'Becoming Ghana\'s First Female Cloud Architect',
        role: 'Cloud Solutions Architect',
        organization: 'AWS Ghana',
        location: 'Kumasi, Ghana',
        image: null,
        quote: 'The AWS certification training prepared me for a role I never thought possible. I am now leading cloud migrations for major companies.',
        featured: true,
        active: true,
        datePublished: '2024-10-20'
    },
    {
        id: 'STORY-003',
        name: 'Kofi Boateng',
        title: 'Building AI Solutions for African Healthcare',
        role: 'AI/ML Engineer',
        organization: 'HealthTech Africa',
        location: 'Takoradi, Ghana',
        image: null,
        quote: 'The data science program gave me the skills to build AI solutions that are now helping diagnose diseases in rural Ghana.',
        featured: true,
        active: true,
        datePublished: '2024-09-05'
    }
];

/**
 * IMPACT METRICS API METHODS
 */

// Get all metrics
export const fetchImpactMetrics = async () => {
    try {
        // TODO: Replace with actual API call once backend is ready
        // const response = await api.get('/api/impact/metrics');
        // return response.data;
        
        // For now, return mock data
        return mockMetrics;
    } catch (error) {
        console.error('Error fetching impact metrics:', error);
        throw error;
    }
};

// Get metrics by display location (for public pages)
export const fetchMetricsByLocation = async (location) => {
    try {
        // TODO: Replace with actual API call
        // const response = await api.get(`/api/impact/metrics?location=${location}`);
        // return response.data;
        
        // Filter metrics by location, only return active ones, sorted by displayOrder
        return mockMetrics
            .filter(m => m.active && m.displayLocations?.includes(location))
            .sort((a, b) => a.displayOrder - b.displayOrder);
    } catch (error) {
        console.error(`Error fetching metrics for location ${location}:`, error);
        throw error;
    }
};

// Get single metric
export const fetchImpactMetric = async (id) => {
    try {
        // TODO: Replace with actual API call
        // const response = await api.get(`/api/impact/metrics/${id}`);
        // return response.data;
        
        return mockMetrics.find(m => m.id === id);
    } catch (error) {
        console.error(`Error fetching metric ${id}:`, error);
        throw error;
    }
};

// Create metric
export const createImpactMetric = async (metricData) => {
    try {
        // TODO: Replace with actual API call
        // const response = await api.post('/api/impact/metrics', metricData);
        // return response.data;
        
        const newMetric = {
            id: `MET-${Date.now()}`,
            ...metricData,
            lastUpdated: new Date().toISOString()
        };
        mockMetrics.push(newMetric);
        return newMetric;
    } catch (error) {
        console.error('Error creating metric:', error);
        throw error;
    }
};

// Update metric
export const updateImpactMetric = async (id, metricData) => {
    try {
        // TODO: Replace with actual API call
        // const response = await api.put(`/api/impact/metrics/${id}`, metricData);
        // return response.data;
        
        const index = mockMetrics.findIndex(m => m.id === id);
        if (index !== -1) {
            mockMetrics[index] = {
                ...mockMetrics[index],
                ...metricData,
                lastUpdated: new Date().toISOString()
            };
            return mockMetrics[index];
        }
        throw new Error('Metric not found');
    } catch (error) {
        console.error(`Error updating metric ${id}:`, error);
        throw error;
    }
};

// Delete metric
export const deleteImpactMetric = async (id) => {
    try {
        // TODO: Replace with actual API call
        // const response = await api.delete(`/api/impact/metrics/${id}`);
        // return response.data;
        
        const index = mockMetrics.findIndex(m => m.id === id);
        if (index !== -1) {
            mockMetrics.splice(index, 1);
            return { success: true };
        }
        throw new Error('Metric not found');
    } catch (error) {
        console.error(`Error deleting metric ${id}:`, error);
        throw error;
    }
};

// Toggle metric active status
export const toggleMetricActive = async (id, active) => {
    try {
        return updateImpactMetric(id, { active });
    } catch (error) {
        console.error(`Error toggling metric ${id}:`, error);
        throw error;
    }
};

// Toggle metric featured status
export const toggleMetricFeatured = async (id, featured) => {
    try {
        return updateImpactMetric(id, { featured });
    } catch (error) {
        console.error(`Error toggling metric featured ${id}:`, error);
        throw error;
    }
};

/**
 * SUCCESS STORIES API METHODS
 */

// Get all success stories
export const fetchSuccessStories = async () => {
    try {
        // TODO: Replace with actual API call
        // const response = await api.get('/api/impact/stories');
        // return response.data;
        
        return mockStories;
    } catch (error) {
        console.error('Error fetching success stories:', error);
        throw error;
    }
};

// Get single story
export const fetchSuccessStory = async (id) => {
    try {
        // TODO: Replace with actual API call
        // const response = await api.get(`/api/impact/stories/${id}`);
        // return response.data;
        
        return mockStories.find(s => s.id === id);
    } catch (error) {
        console.error(`Error fetching story ${id}:`, error);
        throw error;
    }
};

// Create success story
export const createSuccessStory = async (storyData) => {
    try {
        // TODO: Replace with actual API call
        // const response = await api.post('/api/impact/stories', storyData);
        // return response.data;
        
        const newStory = {
            id: `STORY-${Date.now()}`,
            ...storyData,
            datePublished: storyData.datePublished || new Date().toISOString().split('T')[0]
        };
        mockStories.push(newStory);
        return newStory;
    } catch (error) {
        console.error('Error creating story:', error);
        throw error;
    }
};

// Update success story
export const updateSuccessStory = async (id, storyData) => {
    try {
        // TODO: Replace with actual API call
        // const response = await api.put(`/api/impact/stories/${id}`, storyData);
        // return response.data;
        
        const index = mockStories.findIndex(s => s.id === id);
        if (index !== -1) {
            mockStories[index] = {
                ...mockStories[index],
                ...storyData
            };
            return mockStories[index];
        }
        throw new Error('Story not found');
    } catch (error) {
        console.error(`Error updating story ${id}:`, error);
        throw error;
    }
};

// Delete success story
export const deleteSuccessStory = async (id) => {
    try {
        // TODO: Replace with actual API call
        // const response = await api.delete(`/api/impact/stories/${id}`);
        // return response.data;
        
        const index = mockStories.findIndex(s => s.id === id);
        if (index !== -1) {
            mockStories.splice(index, 1);
            return { success: true };
        }
        throw new Error('Story not found');
    } catch (error) {
        console.error(`Error deleting story ${id}:`, error);
        throw error;
    }
};

// Toggle story active status
export const toggleStoryActive = async (id, active) => {
    try {
        return updateSuccessStory(id, { active });
    } catch (error) {
        console.error(`Error toggling story ${id}:`, error);
        throw error;
    }
};

// Toggle story featured status
export const toggleStoryFeatured = async (id, featured) => {
    try {
        return updateSuccessStory(id, { featured });
    } catch (error) {
        console.error(`Error toggling story featured ${id}:`, error);
        throw error;
    }
};

export default {
    IMPACT_CATEGORIES,
    METRIC_TYPES,
    DISPLAY_LOCATIONS,
    fetchImpactMetrics,
    fetchMetricsByLocation,
    fetchImpactMetric,
    createImpactMetric,
    updateImpactMetric,
    deleteImpactMetric,
    toggleMetricActive,
    toggleMetricFeatured,
    fetchSuccessStories,
    fetchSuccessStory,
    createSuccessStory,
    updateSuccessStory,
    deleteSuccessStory,
    toggleStoryActive,
    toggleStoryFeatured
};
