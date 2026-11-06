/**
 * AttentionCarousel Component
 * Professional toast notification with deep colors and white text
 */

import React, { useState, useEffect } from 'react';

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
            bg: 'bg-amber-500',
            border: 'border-amber-600',
            dot: 'bg-white',
            progress: 'bg-white',
            progressBg: 'bg-amber-400'
        },
        blue: {
            bg: 'bg-blue-500',
            border: 'border-blue-600',
            dot: 'bg-white',
            progress: 'bg-white',
            progressBg: 'bg-blue-400'
        },
        purple: {
            bg: 'bg-purple-500',
            border: 'border-purple-600',
            dot: 'bg-white',
            progress: 'bg-white',
            progressBg: 'bg-purple-400'
        },
        emerald: {
            bg: 'bg-emerald-500',
            border: 'border-emerald-600',
            dot: 'bg-white',
            progress: 'bg-white',
            progressBg: 'bg-emerald-400'
        }
    };

    const colors = colorClasses[currentItem.color] || colorClasses.amber;

    return (
        <button
            onClick={currentItem.onClick}
            className={`w-full ${colors.bg} rounded-xl p-2.5 mb-3 text-left relative overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border ${colors.border}`}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                    {/* White status dot */}
                    <div className={`w-1.5 h-1.5 rounded-full ${colors.dot}`} />
                    <h3 className="text-xs font-bold text-white uppercase tracking-wider">Items Requiring Attention</h3>
                </div>

                {/* Progress dots only */}
                {items.length > 1 && (
                    <div className="flex items-center gap-0.5">
                        {items.map((_, index) => (
                            <button
                                key={index}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setCurrentIndex(index);
                                    setIsPaused(true);
                                    setTimeout(() => setIsPaused(false), 8000);
                                }}
                                className={`h-0.5 rounded-full transition-all duration-300 ${
                                    index === currentIndex ? `${colors.progress} w-3` : `${colors.progressBg} w-0.5`
                                }`}
                                aria-label={`Go to item ${index + 1}`}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="flex items-center justify-between">
                <div className="flex-1">
                    <p className="text-sm font-bold text-white mb-0.5">{currentItem.title}</p>
                    <p className="text-xs text-white opacity-90">{currentItem.subtitle}</p>
                </div>
                <div className="text-2xl font-bold text-white ml-3">
                    {currentItem.count}
                </div>
            </div>

            {/* Progress bar */}
            {items.length > 1 && !isPaused && (
                <div className={`absolute bottom-0 left-0 right-0 h-0.5 ${colors.progressBg}`}>
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
