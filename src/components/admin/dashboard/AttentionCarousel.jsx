/**
 * AttentionCarousel Component
 * Minimal professional toast notification with deep colored backgrounds
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
            bg: 'bg-amber-400',
            border: 'border-amber-500',
            dot: 'bg-amber-700',
            text: 'text-amber-900',
            countText: 'text-amber-900',
            progress: 'bg-amber-700',
            progressBg: 'bg-amber-300'
        },
        blue: {
            bg: 'bg-blue-400',
            border: 'border-blue-500',
            dot: 'bg-blue-700',
            text: 'text-blue-900',
            countText: 'text-blue-900',
            progress: 'bg-blue-700',
            progressBg: 'bg-blue-300'
        },
        purple: {
            bg: 'bg-purple-400',
            border: 'border-purple-500',
            dot: 'bg-purple-700',
            text: 'text-purple-900',
            countText: 'text-purple-900',
            progress: 'bg-purple-700',
            progressBg: 'bg-purple-300'
        },
        emerald: {
            bg: 'bg-emerald-400',
            border: 'border-emerald-500',
            dot: 'bg-emerald-700',
            text: 'text-emerald-900',
            countText: 'text-emerald-900',
            progress: 'bg-emerald-700',
            progressBg: 'bg-emerald-300'
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
                    {/* Colored status dot */}
                    <div className={`w-1.5 h-1.5 rounded-full ${colors.dot}`} />
                    <h3 className={`text-[10px] font-bold ${colors.text} uppercase tracking-wider`}>Items Requiring Attention</h3>
                </div>

                {/* Progress dots only - no navigation arrows */}
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
                    <p className={`text-xs font-bold ${colors.text} mb-0.5`}>{currentItem.title}</p>
                    <p className={`text-[10px] ${colors.text} opacity-80`}>{currentItem.subtitle}</p>
                </div>
                <div className={`text-xl font-bold ${colors.countText} ml-3`}>
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
