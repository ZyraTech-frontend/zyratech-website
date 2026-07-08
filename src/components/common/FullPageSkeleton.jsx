import React from 'react';

const FullPageSkeleton = () => {
  return (
    <div role="status" aria-label="Loading content" className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="h-16 w-full rounded-2xl bg-slate-200/80 animate-pulse shadow-sm" />

        <div className="mt-6 h-64 md:h-96 w-full rounded-[2rem] bg-slate-200/80 animate-pulse shadow-sm" />

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="space-y-4 lg:col-span-2">
            <div className="h-7 w-2/3 rounded-full bg-slate-200/80 animate-pulse" />
            <div className="h-4 w-full rounded-full bg-slate-200/80 animate-pulse" />
            <div className="h-4 w-full rounded-full bg-slate-200/80 animate-pulse" />
            <div className="h-4 w-5/6 rounded-full bg-slate-200/80 animate-pulse" />

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="h-40 rounded-2xl bg-slate-200/80 animate-pulse shadow-sm" />
              <div className="h-40 rounded-2xl bg-slate-200/80 animate-pulse shadow-sm" />
            </div>
          </div>

          <aside className="space-y-4">
            <div className="h-8 w-2/3 rounded-full bg-slate-200/80 animate-pulse" />
            <div className="h-32 rounded-2xl bg-slate-200/80 animate-pulse shadow-sm" />
            <div className="h-20 rounded-2xl bg-slate-200/80 animate-pulse shadow-sm" />
          </aside>
        </div>

        <div className="mt-10 space-y-6">
          <div className="h-6 w-1/3 rounded-full bg-slate-200/80 animate-pulse" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="h-44 rounded-2xl bg-slate-200/80 animate-pulse shadow-sm" />
            <div className="h-44 rounded-2xl bg-slate-200/80 animate-pulse shadow-sm" />
            <div className="h-44 rounded-2xl bg-slate-200/80 animate-pulse shadow-sm" />
          </div>
        </div>

        <div className="mt-12 mb-8">
          <div className="h-24 w-full rounded-2xl bg-slate-200/80 animate-pulse shadow-sm" />
        </div>
      </div>
    </div>
  );
};

export default FullPageSkeleton;
