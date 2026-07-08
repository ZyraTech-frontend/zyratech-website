import React from 'react';

const variants = {
  default: (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 py-10 sm:py-12">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 space-y-4">
          <div className="h-4 w-32 rounded-full bg-slate-200/80 animate-pulse" />
          <div className="h-12 w-full max-w-xl rounded-2xl bg-slate-200/80 animate-pulse" />
          <div className="h-5 w-full max-w-2xl rounded-full bg-slate-200/80 animate-pulse" />
        </div>

        <div className="h-72 rounded-3xl bg-slate-200/80 animate-pulse shadow-sm mb-8" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          <div className="h-40 rounded-2xl bg-slate-200/80 animate-pulse shadow-sm" />
          <div className="h-40 rounded-2xl bg-slate-200/80 animate-pulse shadow-sm" />
          <div className="h-40 rounded-2xl bg-slate-200/80 animate-pulse shadow-sm" />
        </div>
      </div>
    </div>
  ),
  about: (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="space-y-4 mb-8">
          <div className="h-4 w-24 rounded-full bg-slate-200/80 animate-pulse" />
          <div className="h-10 w-2/3 rounded-2xl bg-slate-200/80 animate-pulse" />
          <div className="h-5 w-full rounded-full bg-slate-200/80 animate-pulse" />
          <div className="h-5 w-11/12 rounded-full bg-slate-200/80 animate-pulse" />
        </div>

        <div className="h-56 sm:h-72 rounded-3xl bg-slate-200/80 animate-pulse shadow-sm" />
      </div>
    </div>
  ),
  projects: (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 space-y-4">
          <div className="h-4 w-28 rounded-full bg-slate-200/80 animate-pulse" />
          <div className="h-12 w-full max-w-2xl rounded-2xl bg-slate-200/80 animate-pulse" />
          <div className="h-5 w-full max-w-3xl rounded-full bg-slate-200/80 animate-pulse" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          <div className="h-64 rounded-3xl bg-slate-200/80 animate-pulse shadow-sm" />
          <div className="h-64 rounded-3xl bg-slate-200/80 animate-pulse shadow-sm" />
          <div className="h-64 rounded-3xl bg-slate-200/80 animate-pulse shadow-sm" />
        </div>
      </div>
    </div>
  ),
  training: (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 space-y-4">
          <div className="h-4 w-32 rounded-full bg-slate-200/80 animate-pulse" />
          <div className="h-12 w-full max-w-2xl rounded-2xl bg-slate-200/80 animate-pulse" />
        </div>

        <div className="h-64 sm:h-80 rounded-3xl bg-slate-200/80 animate-pulse shadow-sm mb-6" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
          <div className="h-40 rounded-2xl bg-slate-200/80 animate-pulse shadow-sm" />
          <div className="h-40 rounded-2xl bg-slate-200/80 animate-pulse shadow-sm" />
        </div>
      </div>
    </div>
  ),
  blog: (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 p-4 sm:p-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 space-y-4">
          <div className="h-4 w-24 rounded-full bg-slate-200/80 animate-pulse" />
          <div className="h-10 w-full max-w-2xl rounded-2xl bg-slate-200/80 animate-pulse" />
        </div>

        <div className="space-y-4 lg:space-y-5">
          <div className="h-40 rounded-3xl bg-slate-200/80 animate-pulse shadow-sm" />
          <div className="h-40 rounded-3xl bg-slate-200/80 animate-pulse shadow-sm" />
          <div className="h-40 rounded-3xl bg-slate-200/80 animate-pulse shadow-sm" />
        </div>
      </div>
    </div>
  ),
  jobs: (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 p-4 sm:p-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 space-y-4">
          <div className="h-4 w-24 rounded-full bg-slate-200/80 animate-pulse" />
          <div className="h-12 w-full max-w-2xl rounded-2xl bg-slate-200/80 animate-pulse" />
        </div>

        <div className="grid grid-cols-1 gap-4 lg:gap-5">
          <div className="h-20 rounded-2xl bg-slate-200/80 animate-pulse shadow-sm" />
          <div className="h-20 rounded-2xl bg-slate-200/80 animate-pulse shadow-sm" />
          <div className="h-20 rounded-2xl bg-slate-200/80 animate-pulse shadow-sm" />
        </div>
      </div>
    </div>
  ),
};

const RouteSkeleton = ({ variant = 'default' }) => {
  return variants[variant] || variants.default;
};

export default RouteSkeleton;
