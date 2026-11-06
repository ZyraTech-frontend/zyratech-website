/**
 * AttentionCarousel Component
 * Minimal compact toast notification for items requiring attention
 */

import React, { useState, useEffect } from 'react';
import { AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';

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
        amber: { bg: 'bg-amber-50', border: 'border-amber-200', countText: 'text-amber-600', dot: 'bg-amber-500' },
        blue: { bg: 'bg-blue-50', border: 'border-blue-200', countText: 'text-blue-600', dot: 'bg-blue-500' },
        purple: { bg: 'bg-purple-50', border: 'border-purple-200', countText: 'text-purple-600', dot: 'bg-purple-500' },
        emerald: { bg: 'bg-emerald-50', border: 'border-emerald-200', countText: 'text-emerald-600', dot: 'bg-emerald-500' }
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
            className={`w-full ${colors.bg} ${colors.border} border rounded-lg p-2.5 mb-4 transition-all duration-300 hover:shadow-sm text-left relative overflow-hidden`}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <div className="flex items-center gap-2.5">
                {/* Alert Icon - Small */}
                <div className="w-7 h-7 bg-gradient-to-br from-amber-500 to-orange-600 rounded-md flex items-center justify-center flex-shrink-0">
                    <AlertCircle className="text-white" size={14} />
                </div>

                {/* Title */}
                <h3 className="text-xs font-bold text-gray-900 flex-shrink-0">Items Requiring Attention</h3>

                {/* Progress Dots - Smaller */}
                {items.length > 1 && (
                    <div className="flex items-center gap-1 ml-auto">
                        {items.map((_, index) => (
                            <div
                                key={index}
                                className={`h-0.5 rounded-full transition-all duration-300 ${
                                    index === currentIndex ? `${colors.dot} w-3` : 'bg-gray-300 w-0.5'
                                }`}
                            />
                        ))}
                    </div>
                )}

                {/* Navigation - Smaller */}
                {items.length > 1 && (
                    <div className="flex items-center">
                        <button onClick={handlePrev} className="p-0.5 hover:bg-gray-200/50 rounded transition-colors" aria-label="Previous">
                            <ChevronLeft className="text-gray-600" size={14} />
                        </button>
                        <button onClick={handleNext} className="p-0.5 hover:bg-gray-200/50 rounded transition-colors" aria-label="Next">
                            <ChevronRight className="text-gray-600" size={14} />
                        </button>
                    </div>
                )}
            </div>

            {/* Item Content - No Icon, Just Text */}
            <div className="flex items-center gap-2 mt-1.5 ml-9">
                <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2">
                        <p className="text-xs font-bold text-gray-900">{currentItem.title}</p>
                        <span className={`text-base font-bold ${colors.countText}`}>{currentItem.count}</span>
                    </div>
                    <p className="text-[10px] text-gray-600">{currentItem.subtitle}</p>
                </div>
            </div>

            {/* Progress Bar */}
            {items.length > 1 && !isPaused && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-200">
                    <div className={`h-full ${colors.dot}`} style={{ animation: 'progress 4s linear', transformOrigin: 'left' }} />
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
