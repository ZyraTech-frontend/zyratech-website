/**
 * AttentionCarousel Component
 * Professional 3D toast notification with modern design
 */

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const AttentionCarousel = ({ items = [] }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        if (isPaused || items.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % items.length);
        }, 4000);

        return () => clearInterval(interval);
    }, [isPaused, items.length]);

    if (!items || items.length === 0) return null;

    const currentItem = items[currentIndex];

    const colorClasses = {
        amber: {
            dot: 'bg-amber-500',
            accent: 'bg-amber-500',
            text: 'text-amber-600',
            progress: 'bg-amber-500'
        },
        blue: {
            dot: 'bg-blue-500',
            accent: 'bg-blue-500',
            text: 'text-blue-600',
            progress: 'bg-blue-500'
        },
        purple: {
            dot: 'bg-purple-500',
            accent: 'bg-purple-500',
            text: 'text-purple-600',
            progress: 'bg-purple-500'
        },
        emerald: {
            dot: 'bg-emerald-500',
            accent: 'bg-emerald-500',
            text: 'text-emerald-600',
            progress: 'bg-emerald-500'
        }
    };

    const colors = colorClasses[currentItem.color] || colorClasses.amber;

    const handlePrev = (e) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
        setIsPaused(true);
        setTimeout(() => setIsPaused(false), 8000);
    };

    const handleNext = (e) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev + 1) % items.length);
        setIsPaused(true);
        setTimeout(() => setIsPaused(false), 8000);
    };

    return (
        <button
            onClick={currentItem.onClick}
            className="w-full bg-white rounded-2xl p-4 mb-4 text-left relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
            style={{
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(0, 0, 0, 0.05)'
            }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* Colored accent border on left */}
            <div className={`absolute left-0 top-0 bottom-0 w-1 ${colors.accent}`} />

            {/* Header */}
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    {/* Colored status dot */}
                    <div className={`w-2 h-2 rounded-full ${colors.dot}`} />
                    <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wide">Items Requiring Attention</h3>
                </div>

                <div className="flex items-center gap-2">
                    {/* Progress dots */}
                    {items.length > 1 && (
                        <div className="flex items-center gap-1">
                            {items.map((_, index) => (
                                <div
                                    key={index}
                                    className={`h-1 rounded-full transition-all duration-300 ${
                                        index === currentIndex ? `${colors.progress} w-4` : 'bg-gray-300 w-1'
                                    }`}
                                />
                            ))}
                        </div>
                    )}

                    {/* Navigation */}
                    {items.length > 1 && (
                        <div className="flex items-center gap-0.5 ml-2">
                            <button
                                onClick={handlePrev}
                                className="p-1 hover:bg-gray-100 rounded transition-colors"
                                aria-label="Previous"
                            >
                                <ChevronLeft className="text-gray-400" size={14} />
                            </button>
                            <button
                                onClick={handleNext}
                                className="p-1 hover:bg-gray-100 rounded transition-colors"
                                aria-label="Next"
                            >
                                <ChevronRight className="text-gray-400" size={14} />
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="flex items-center justify-between pl-0.5">
                <div className="flex-1">
                    <p className="text-sm font-bold text-gray-900 mb-0.5">{currentItem.title}</p>
                    <p className="text-xs text-gray-500">{currentItem.subtitle}</p>
                </div>
                <div className={`text-2xl font-bold ${colors.text} ml-4`}>
                    {currentItem.count}
                </div>
            </div>

            {/* Progress bar */}
            {items.length > 1 && !isPaused && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-100">
                    <div
                        className={`h-full ${colors.progress}`}
                        style={{
                            animation: 'progress 4s linear',
                            transformOrigin: 'left'
                        }}
                    />
                </div>
            )}

            <style jsx>{`
                @keyframes progress {
                    from { transform: scaleX(0); }
                    to { transform: scaleX(1); }
                }
            `}</style>
        </button>
    );
};

export default AttentionCarousel;
