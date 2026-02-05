/**
 * Regular Admin Dashboard
 * Focused on operational tasks: content management, inquiries, and daily workflow.
 */

import React, { useState, useEffect } from 'react';
import {
    Briefcase,
    GraduationCap,
    MessageSquare,
    Image,
    FileText,
    Calendar,
    CheckCircle,
    Clock,
    ArrowRight,
    TrendingUp,
    Layout
} from 'lucide-react';
import { trainingCourses } from '../../../data/trainingCourses';
import { jobsData } from '../../../data/jobsData';

const RegularAdminDashboard = ({ user }) => {
    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentDate(new Date()), 60000);
        return () => clearInterval(timer);
    }, []);

    // Operational Metrics
    const metrics = {
        jobs: jobsData.length,
        courses: trainingCourses.length,
        inquiries: 12, // Mock pending
        pendingReviews: 5
    };

    const formattedDate = currentDate.toLocaleDateString('en-US', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });

    const timeOfDay = currentDate.getHours() < 12 ? 'morning' : currentDate.getHours() < 18 ? 'afternoon' : 'evening';

    return (
        <div className="space-y-6 pb-8">
            {/* Search/Header Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Good {timeOfDay}, {user?.name?.split(' ')[0] || 'Admin'}</h1>
                    <p className="text-gray-500 text-sm mt-1">Here is your daily briefing for {formattedDate}.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-[#004fa2] text-white rounded-lg hover:bg-[#003d7a] transition shadow-sm text-sm font-medium">
                        <FileText size={16} /> Create Post
                    </button>
                </div>
            </div>

            {/* Task Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Job Management */}
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:border-blue-300 transition-colors group">
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-lg flex items-center justify-center group-hover:bg-orange-100 transition">
                            <Briefcase size={20} />
                        </div>
                        <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full font-medium">{metrics.jobs} Active</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">Job Listings</h3>
                    <p className="text-sm text-gray-500 mt-1 mb-4">Manage open positions and applications.</p>
                    <button className="text-sm text-[#004fa2] font-semibold hover:underline flex items-center gap-1">
                        Manage Jobs <ArrowRight size={14} />
                    </button>
                </div>

                {/* Course Management */}
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:border-blue-300 transition-colors group">
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition">
                            <GraduationCap size={20} />
                        </div>
                        <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full font-medium">{metrics.courses} Active</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">Training Courses</h3>
                    <p className="text-sm text-gray-500 mt-1 mb-4">Update curriculum and schedules.</p>
                    <button className="text-sm text-[#004fa2] font-semibold hover:underline flex items-center gap-1">
                        View Courses <ArrowRight size={14} />
                    </button>
                </div>

                {/* Inbox / Inquiries */}
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:border-blue-300 transition-colors group">
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center group-hover:bg-indigo-100 transition">
                            <MessageSquare size={20} />
                        </div>
                        {metrics.inquiries > 0 && (
                            <span className="bg-indigo-100 text-indigo-600 text-xs px-2 py-1 rounded-full font-medium">{metrics.inquiries} New</span>
                        )}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">Inquiries</h3>
                    <p className="text-sm text-gray-500 mt-1 mb-4">Respond to messages and questions.</p>
                    <button className="text-sm text-[#004fa2] font-semibold hover:underline flex items-center gap-1">
                        Go to Inbox <ArrowRight size={14} />
                    </button>
                </div>
            </div>

            {/* Quick Actions & Recent Items */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                        <h3 className="font-bold text-gray-900">Pending Actions</h3>
                    </div>
                    <div className="divide-y divide-gray-100">
                        {[
                            { title: 'New Job Application: Senior Dev', time: '10 mins ago', type: 'urgent' },
                            { title: 'Course Inquiry: Data Science', time: '1 hour ago', type: 'normal' },
                            { title: 'Content Review: Blog Post Draft', time: '3 hours ago', type: 'normal' },
                            { title: 'New Partner Application', time: 'Yesterday', type: 'normal' }
                        ].map((task, i) => (
                            <div key={i} className="p-4 flex items-center justify-between hover:bg-gray-50 transition">
                                <div className="flex items-center gap-3">
                                    <div className={`w-2 h-2 rounded-full ${task.type === 'urgent' ? 'bg-red-500' : 'bg-blue-400'}`}></div>
                                    <span className="text-sm font-medium text-gray-700">{task.title}</span>
                                </div>
                                <span className="text-xs text-gray-400">{task.time}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
                    <h3 className="font-bold text-gray-900 mb-4">Quick Tools</h3>
                    <div className="space-y-3">
                        <button className="w-full bg-white p-3 rounded-lg border border-gray-200 text-left text-sm font-medium text-gray-700 hover:border-blue-400 hover:text-blue-600 transition flex items-center gap-3">
                            <Image size={18} className="text-gray-400" /> Upload Image to Gallery
                        </button>
                        <button className="w-full bg-white p-3 rounded-lg border border-gray-200 text-left text-sm font-medium text-gray-700 hover:border-blue-400 hover:text-blue-600 transition flex items-center gap-3">
                            <Calendar size={18} className="text-gray-400" /> Schedule Event
                        </button>
                        <button className="w-full bg-white p-3 rounded-lg border border-gray-200 text-left text-sm font-medium text-gray-700 hover:border-blue-400 hover:text-blue-600 transition flex items-center gap-3">
                            <Layout size={18} className="text-gray-400" /> Edit Homepage
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegularAdminDashboard;
