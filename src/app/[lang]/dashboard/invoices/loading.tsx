import React from "react";

export default function Loading() {
  return (
    <div className="p-8 lg:p-12 max-w-7xl mx-auto space-y-12 pb-32 animate-pulse">
      {/* Header Skeleton */}
      <header className="space-y-4 mb-12">
        <div className="w-24 h-6 bg-white/5 rounded-full" />
        <div className="w-64 h-10 bg-white/5 rounded-sm" />
        <div className="w-96 h-4 bg-white/5 rounded-sm" />
      </header>

      {/* Insight Tiles Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2].map((i) => (
          <div key={i} className="h-64 bg-white/5 rounded-2xl border border-white/5 p-8 space-y-6">
            <div className="flex justify-between">
              <div className="w-12 h-12 bg-white/5 rounded-lg" />
              <div className="w-20 h-4 bg-white/5 rounded" />
            </div>
            <div className="space-y-2">
              <div className="w-16 h-3 bg-white/5 rounded" />
              <div className="w-48 h-12 bg-white/5 rounded" />
            </div>
            <div className="pt-6 border-t border-white/5">
              <div className="w-full h-12 bg-white/5 rounded" />
            </div>
          </div>
        ))}
      </div>

      {/* Table Skeleton */}
      <div className="space-y-6">
        <div className="w-32 h-4 bg-white/5 rounded" />
        <div className="bg-white/5 rounded-2xl border border-white/5 overflow-hidden">
          <div className="p-6 border-b border-white/5 bg-white/2">
             <div className="grid grid-cols-6 gap-4">
                {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="h-3 bg-white/5 rounded" />)}
             </div>
          </div>
          <div className="p-6 space-y-8">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="grid grid-cols-6 gap-4 items-center">
                <div className="h-4 bg-white/5 rounded w-24" />
                <div className="h-4 bg-white/5 rounded w-20" />
                <div className="h-4 bg-white/5 rounded w-32" />
                <div className="h-4 bg-white/5 rounded w-16" />
                <div className="h-6 bg-white/5 rounded-full w-20" />
                <div className="h-8 bg-white/5 rounded w-8 justify-self-end" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
