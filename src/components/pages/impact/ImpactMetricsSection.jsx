import React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation';
import {
    Users, Briefcase, Building, BookOpen, GraduationCap,
    Heart, Trophy, DollarSign, Globe, Star, Hash, Percent
} from 'lucide-react';

const ITEM_VARIANTS = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

const CONTAINER_VARIANTS = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.1 }
    }
};

const CATEGORY_COLORS = {
    'students': 'bg-blue-50 text-blue-600',
    'employment': 'bg-green-50 text-green-600',
    'partnerships': 'bg-purple-50 text-purple-600',
    'community': 'bg-amber-50 text-amber-600',
    'awards': 'bg-yellow-50 text-yellow-600',
    'financial': 'bg-emerald-50 text-emerald-600',
    'courses': 'bg-cyan-50 text-cyan-600',
};

const CATEGORY_ICONS = {
    'students': GraduationCap,
    'employment': Briefcase,
    'partnerships': Building,
    'community': Heart,
    'awards': Trophy,
    'financial': DollarSign,
    'courses': BookOpen
};

const ImpactMetricsSection = ({ metrics = [] }) => {
    // Only show active and featured metrics
    const displayMetrics = metrics
        .filter(m => m.active && m.featured)
        .sort((a, b) => a.displayOrder - b.displayOrder);

    if (displayMetrics.length === 0) return null;

    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">Our Impact in Numbers</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Quantifying our contribution to the tech ecosystem and community development.
                    </p>
                </div>

                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                    variants={CONTAINER_VARIANTS}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                >
                    {displayMetrics.map((metric) => {
                        const Icon = CATEGORY_ICONS[metric.category] || Star;
                        const colorClass = CATEGORY_COLORS[metric.category] || 'bg-gray-50 text-gray-600';

                        return (
                            <motion.div
                                key={metric.id}
                                variants={ITEM_VARIANTS}
                                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 flex flex-col items-center text-center"
                            >
                                <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-6 ${colorClass}`}>
                                    <Icon size={28} />
                                </div>

                                <h3 className="text-4xl font-bold text-gray-900 mb-2">
                                    {metric.prefix}{metric.value.toLocaleString()}{metric.suffix}
                                </h3>

                                <p className="text-lg font-medium text-gray-800 mb-2">
                                    {metric.title}
                                </p>

                                <p className="text-gray-500 text-sm leading-relaxed">
                                    {metric.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
};

export default ImpactMetricsSection;
