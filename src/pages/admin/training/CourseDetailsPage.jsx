/**
 * Course Details Page (Admin)
 * Full-page view of course details for admins
 */

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import { getCourseImageUrl } from '../../../utils/imageUrl';
import { ArrowLeft, Edit, Clock, Users, BookOpen, Tag, Calendar, Award, Target, CheckCircle, User } from 'lucide-react';
import trainingService from '../../../services/trainingService';

// Helper to extract numeric price from string like "GHS 500.00"
const getPriceValue = (priceStr) => {
    if (!priceStr) return 0;
    if (typeof priceStr === 'number') return priceStr;
    const numStr = priceStr.toString().replace(/[^\d.]/g, '');
    return parseFloat(numStr) || 0;
};

// Helper to format price for display
const formatPrice = (priceStr) => {
    const value = getPriceValue(priceStr);
    if (value === 0) return null;
    return `GHS ${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

const CourseDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadCourse = async () => {
            try {
                setLoading(true);
                const response = await trainingService.getCourse(id);
                const courseData = response?.course || response?.data || response;
                setCourse(courseData);
            } catch (error) {
                console.error('Error loading course:', error);
            } finally {
                setLoading(false);
            }
        };
        loadCourse();
    }, [id]);

    const handleEdit = () => navigate(`/admin/training/edit/${id}`);
    const handleBack = () => navigate('/admin/training');

    if (loading) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <p className="text-gray-600">Loading course details...</p>
                    </div>
                </div>
            </AdminLayout>
        );
    }

    if (!course) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Course Not Found</h2>
                        <p className="text-gray-600 mb-4">The course you're looking for doesn't exist.</p>
                        <button onClick={handleBack} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                            Back to Courses
                        </button>
                    </div>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="space-y-6 pb-8">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button onClick={handleBack} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                            <ArrowLeft size={20} className="text-gray-600" />
                        </button>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Course Details</h1>
                            <p className="text-sm text-gray-600 mt-1">View and manage course information</p>
                        </div>
                    </div>
                    <button onClick={handleEdit} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
                        <Edit size={16} />
                        Edit Course
                    </button>
                </div>

                {/* Main Content Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    {/* Course Image */}
                    {getCourseImageUrl(course) && (
                        <div className="w-full h-80 bg-gradient-to-br from-blue-50 to-indigo-50">
                            <img src={getCourseImageUrl(course)} alt={course.title} className="w-full h-full object-cover" />
                        </div>
                    )}

                    <div className="p-8 space-y-8">
                        {/* Title and Badges */}
                        <div>
                            <div className="flex items-center gap-3 mb-3">
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${
                                    course.category === 'basic' ? 'bg-green-100 text-green-700 border border-green-200' :
                                    course.category === 'intermediate' ? 'bg-blue-100 text-blue-700 border border-blue-200' :
                                    course.category === 'advanced' ? 'bg-purple-100 text-purple-700 border border-purple-200' :
                                    course.category === 'matured' ? 'bg-orange-100 text-orange-700 border border-orange-200' :
                                    course.category === 'internship' ? 'bg-cyan-100 text-cyan-700 border border-cyan-200' :
                                    'bg-gray-100 text-gray-700 border border-gray-200'
                                }`}>
                                    {course.category}
                                </span>
                                {course.status === 'active' ? (
                                    <span className="px-3 py-1 bg-green-100 text-green-700 border border-green-200 rounded-full text-xs font-semibold">Active</span>
                                ) : (
                                    <span className="px-3 py-1 bg-gray-100 text-gray-700 border border-gray-200 rounded-full text-xs font-semibold">Draft</span>
                                )}
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">{course.title}</h2>
                            {course.heroInfoText && (
                                <p className="text-lg text-blue-600 font-medium italic">{course.heroInfoText}</p>
                            )}
                        </div>

                        {/* Quick Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                                <div className="flex items-center gap-2 text-gray-500 mb-1">
                                    <Clock size={16} />
                                    <span className="text-sm font-medium">Duration</span>
                                </div>
                                <p className="text-lg font-bold text-gray-900">{course.duration || 'N/A'}</p>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                                <div className="flex items-center gap-2 text-gray-500 mb-1">
                                    <Tag size={16} />
                                    <span className="text-sm font-medium">Price</span>
                                </div>
                                <p className="text-lg font-bold text-gray-900">{formatPrice(course.price) || 'FREE'}</p>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                                <div className="flex items-center gap-2 text-gray-500 mb-1">
                                    <Users size={16} />
                                    <span className="text-sm font-medium">Enrollments</span>
                                </div>
                                <p className="text-lg font-bold text-gray-900">{course.enrollments || 0}</p>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                                <div className="flex items-center gap-2 text-gray-500 mb-1">
                                    <BookOpen size={16} />
                                    <span className="text-sm font-medium">Level</span>
                                </div>
                                <p className="text-lg font-bold text-gray-900 capitalize">{course.level || course.category}</p>
                            </div>
                        </div>

                        {/* Short Description */}
                        {course.description && (
                            <div className="border-t border-gray-100 pt-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                                    <BookOpen size={18} />
                                    Description
                                </h3>
                                <p className="text-gray-600 leading-relaxed">{course.description}</p>
                            </div>
                        )}

                        {/* Long Description */}
                        {course.longDescription && (
                            <div className="border-t border-gray-100 pt-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-3">Detailed Description</h3>
                                <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">{course.longDescription}</p>
                            </div>
                        )}

                        {/* Program Overview */}
                        {course.programOverview && (
                            <div className="border-t border-gray-100 pt-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                                    <Target size={18} />
                                    Program Overview
                                </h3>
                                <p className="text-gray-600 leading-relaxed">{course.programOverview}</p>
                            </div>
                        )}

                        {/* Topics/What You Will Learn */}
                        {course.topics && course.topics.length > 0 && (
                            <div className="border-t border-gray-100 pt-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <CheckCircle size={18} />
                                    What You Will Learn
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {course.topics.map((topic, index) => (
                                        <div key={index} className="flex items-start gap-3 p-3 bg-green-50 border border-green-100 rounded-lg">
                                            <CheckCircle size={18} className="text-green-600 flex-shrink-0 mt-0.5" />
                                            <span className="text-gray-700">{topic}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Programme Objectives */}
                        {course.programmeObjectives && course.programmeObjectives.length > 0 && (
                            <div className="border-t border-gray-100 pt-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <Target size={18} />
                                    Programme Objectives
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {course.programmeObjectives.map((objective, index) => (
                                        <div key={index} className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-lg">
                                            <h4 className="font-bold text-gray-900 mb-2">{objective.title}</h4>
                                            <p className="text-gray-600 text-sm">{objective.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Additional Information Grid */}
                        <div className="border-t border-gray-100 pt-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Additional Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {course.instructor && (
                                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                                        <div className="flex items-center gap-2 text-gray-500 mb-1">
                                            <User size={16} />
                                            <span className="text-sm font-medium">Instructor</span>
                                        </div>
                                        <p className="text-gray-900 font-semibold">{course.instructor}</p>
                                    </div>
                                )}
                                {course.certificate && (
                                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                                        <div className="flex items-center gap-2 text-gray-500 mb-1">
                                            <Award size={16} />
                                            <span className="text-sm font-medium">Certificate</span>
                                        </div>
                                        <p className="text-gray-900 font-semibold">{course.certificate}</p>
                                    </div>
                                )}
                                {course.schedule && (
                                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                                        <div className="flex items-center gap-2 text-gray-500 mb-1">
                                            <Calendar size={16} />
                                            <span className="text-sm font-medium">Schedule</span>
                                        </div>
                                        <p className="text-gray-900 font-semibold">{course.schedule}</p>
                                    </div>
                                )}
                                {course.deadline && (
                                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                                        <div className="flex items-center gap-2 text-gray-500 mb-1">
                                            <Calendar size={16} />
                                            <span className="text-sm font-medium">Application Deadline</span>
                                        </div>
                                        <p className="text-gray-900 font-semibold">{course.deadline}</p>
                                    </div>
                                )}
                                {course.participants && (
                                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                                        <div className="flex items-center gap-2 text-gray-500 mb-1">
                                            <Users size={16} />
                                            <span className="text-sm font-medium">Max Participants</span>
                                        </div>
                                        <p className="text-gray-900 font-semibold">{course.participants}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default CourseDetailsPage;
