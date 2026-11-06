/**
 * AttentionCarousel Component
 * Auto-rotating carousel that cycles through items requiring attention
 * Shows one item at a time for 4 seconds, then slides to the next
 */

import React, { useState, useEffect } from 'react';
import { AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';

const AttentionCarousel = ({ items = [] }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    // Auto-advance every 4 seconds
    useEffect(() => {
        if (isPaused || items.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % items.length);
        }, 4000);

        return () => clearInterval(interval);
    }, [isPaused, items.length]);

    if (!items || items.length === 0) return null;

    const currentItem = items[currentIndex];
    const Icon = currentItem.icon;

    const colorClasses = {
        amber: {
            bg: 'bg-amber-50',
            border: 'border-amber-200',
            iconBg: 'bg-amber-100',
            iconText: 'text-amber-600',
            countText: 'text-amber-600',
            dot: 'bg-amber-600'
        },
        blue: {
            bg: 'bg-blue-50',
            border: 'border-blue-200',
            iconBg: 'bg-blue-100',
            iconText: 'text-blue-600',
            countText: 'text-blue-600',
            dot: 'bg-blue-600'
        },
        purple: {
            bg: 'bg-purple-50',
            border: 'border-purple-200',
            iconBg: 'bg-purple-100',
            iconText: 'text-purple-600',
            countText: 'text-purple-600',
            dot: 'bg-purple-600'
        },
        emerald: {
            bg: 'bg-emerald-50',
            border: 'border-emerald-200',
            iconBg: 'bg-emerald-100',
            iconText: 'text-emerald-600',
            countText: 'text-emerald-600',
            dot: 'bg-emerald-600'
        }
    };

    const colors = colorClasses[currentItem.color] || colorClasses.amber;

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
        setIsPaused(true);
        setTimeout(() => setIsPaused(false), 8000); // Pause for 8 seconds after manual navigation
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % items.length);
        setIsPaused(true);
        setTimeout(() => setIsPaused(false), 8000);
    };

    return (
        <div className="mb-6">
            <div
                className={`relative ${colors.bg} ${colors.border} border rounded-xl p-5 transition-all duration-500 ease-in-out overflow-hidden`}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                {/* Header with Icon and Title */}
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <AlertCircle className="text-white" size={20} />
                    </div>
                    <h2 className="text-base font-bold text-gray-900">Items Requiring Attention</h2>
                    
                    {/* Progress Dots */}
                    {items.length > 1 && (
                        <div className="flex items-center gap-1.5 ml-auto">
                            {items.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => {
                                        setCurrentIndex(index);
                                        setIsPaused(true);
                                        setTimeout(() => setIsPaused(false), 8000);
                                    }}
                                    className={`h-1.5 rounded-full transition-all duration-300 ${
                                        index === currentIndex 
                                            ? `${colors.dot} w-6` 
                                            : 'bg-gray-300 w-1.5 hover:bg-gray-400'
                                    }`}
                                    aria-label={`Go to item ${index + 1}`}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Content - Clickable Card */}
                <button
                    onClick={currentItem.onClick}
                    className="w-full text-left group"
                >
                    <div className="flex items-center gap-4">
                        {/* Icon */}
                        <div className={`w-14 h-14 ${colors.iconBg} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200`}>
                            <Icon className={colors.iconText} size={28} />
                        </div>

                        {/* Text Content */}
                        <div className="flex-1">
                            <div className="flex items-baseline gap-3">
                                <h3 className="text-lg font-bold text-gray-900 group-hover:underline">{currentItem.title}</h3>
                                <span className={`text-3xl font-bold ${colors.countText}`}>
                                    {currentItem.count}
                                </span>
                            </div>
                            <p className="text-sm text-gray-600 mt-0.5">{currentItem.subtitle}</p>
                        </div>

                        {/* Navigation Arrows - Only show if multiple items */}
                        {items.length > 1 && (
                            <div className="flex items-center gap-1 ml-auto">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handlePrev();
                                    }}
                                    className="p-2 hover:bg-white/50 rounded-lg transition-colors"
                                    aria-label="Previous item"
                                >
                                    <ChevronLeft className="text-gray-600" size={18} />
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleNext();
                                    }}
                                    className="p-2 hover:bg-white/50 rounded-lg transition-colors"
                                    aria-label="Next item"
                                >
                                    <ChevronRight className="text-gray-600" size={18} />
                                </button>
                            </div>
                        )}
                    </div>
                </button>

                {/* Auto-play indicator */}
                {items.length > 1 && !isPaused && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-200">
                        <div 
                            className={`h-full ${colors.dot} transition-all`}
                            style={{
                                animation: 'progress 4s linear',
                                transformOrigin: 'left'
                            }}
                        />
                    </div>
                )}
            </div>

            <style jsx>{`
                @keyframes progress {
                    from {
                        transform: scaleX(0);
                    }
                    to {
                        transform: scaleX(1);
                    }
                }
            `}</style>
        </div>
    );
};

export default AttentionCarousel;
