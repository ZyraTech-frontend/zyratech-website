import React from 'react';

const variants = {
  default: (
    <div className="min-h-screen flex items-start justify-center bg-white py-12">
      <div className="w-full max-w-5xl px-4">
        <div className="h-12 w-48 rounded bg-gray-200 animate-pulse mb-6" />
        <div className="h-64 rounded bg-gray-200 animate-pulse mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="h-40 rounded bg-gray-200 animate-pulse" />
          <div className="h-40 rounded bg-gray-200 animate-pulse" />
          <div className="h-40 rounded bg-gray-200 animate-pulse" />
        </div>
      </div>
    </div>
  ),
  about: (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="h-10 w-1/3 rounded bg-gray-200 animate-pulse mb-4" />
        <div className="h-6 w-full rounded bg-gray-200 animate-pulse mb-2" />
        <div className="h-6 w-full rounded bg-gray-200 animate-pulse mb-2" />
        <div className="h-6 w-3/4 rounded bg-gray-200 animate-pulse mb-8" />
        <div className="h-48 rounded bg-gray-200 animate-pulse" />
      </div>
    </div>
  ),
  projects: (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="h-12 w-48 rounded bg-gray-200 animate-pulse mb-6" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="h-56 rounded bg-gray-200 animate-pulse" />
          <div className="h-56 rounded bg-gray-200 animate-pulse" />
          <div className="h-56 rounded bg-gray-200 animate-pulse" />
        </div>
      </div>
    </div>
  ),
  training: (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="h-12 w-48 rounded bg-gray-200 animate-pulse mb-6" />
        <div className="h-64 rounded bg-gray-200 animate-pulse mb-6" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="h-40 rounded bg-gray-200 animate-pulse" />
          <div className="h-40 rounded bg-gray-200 animate-pulse" />
        </div>
      </div>
    </div>
  ),
  blog: (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-5xl mx-auto">
        <div className="h-10 w-1/3 rounded bg-gray-200 animate-pulse mb-6" />
        <div className="space-y-4">
          <div className="h-40 rounded bg-gray-200 animate-pulse" />
          <div className="h-40 rounded bg-gray-200 animate-pulse" />
          <div className="h-40 rounded bg-gray-200 animate-pulse" />
        </div>
      </div>
    </div>
  ),
  jobs: (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-5xl mx-auto">
        <div className="h-12 w-64 rounded bg-gray-200 animate-pulse mb-6" />
        <div className="grid grid-cols-1 gap-4">
          <div className="h-20 rounded bg-gray-200 animate-pulse" />
          <div className="h-20 rounded bg-gray-200 animate-pulse" />
          <div className="h-20 rounded bg-gray-200 animate-pulse" />
        </div>
      </div>
    </div>
  ),
};

const RouteSkeleton = ({ variant = 'default' }) => {
  return variants[variant] || variants.default;
};

export default RouteSkeleton;
