import React from "react";

export default function Loading() {
  return (
    <div className="p-12 max-w-7xl mx-auto space-y-12 pb-24 animate-pulse">
      {/* Header Skeleton */}
      <section className="space-y-4 mb-12">
        <div className="w-24 h-6 bg-white/5 rounded-full" />
        <div className="w-64 h-10 bg-white/5 rounded-sm" />
      </section>

      {/* Insight Tiles Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-40 bg-white/5 rounded-2xl border border-white/5 p-8 space-y-4">
            <div className="flex justify-between">
              <div className="w-10 h-10 bg-white/5 rounded-lg" />
              <div className="w-12 h-4 bg-white/5 rounded" />
            </div>
            <div className="space-y-2">
              <div className="w-20 h-3 bg-white/5 rounded" />
              <div className="w-12 h-8 bg-white/5 rounded" />
            </div>
          </div>
        ))}
      </div>

      {/* Grid Layout Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Identity Side Skeleton */}
        <div className="lg:col-span-1">
          <div className="h-[400px] bg-white/5 rounded-2xl border border-white/5 p-8 space-y-8">
            <div className="w-24 h-4 bg-white/5 rounded" />
            {[1, 2, 3].map(i => (
              <div key={i} className="space-y-2">
                <div className="w-16 h-2 bg-white/5 rounded" />
                <div className="w-48 h-4 bg-white/5 rounded" />
              </div>
            ))}
          </div>
        </div>

        {/* Team Side Skeleton */}
        <div className="lg:col-span-2 space-y-8">
          <div className="flex justify-between items-center">
            <div className="w-32 h-4 bg-white/5 rounded" />
            <div className="w-24 h-10 bg-white/5 rounded" />
          </div>
          <div className="h-[400px] bg-white/5 rounded-2xl border border-white/5 overflow-hidden">
            <div className="p-6 border-b border-white/5">
              <div className="grid grid-cols-3 gap-4">
                <div className="h-3 bg-white/5 rounded" />
                <div className="h-3 bg-white/5 rounded" />
                <div className="h-3 bg-white/5 rounded" />
              </div>
            </div>
            <div className="p-6 space-y-6">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="grid grid-cols-3 gap-4 items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-white/5" />
                    <div className="w-24 h-4 bg-white/5 rounded" />
                  </div>
                  <div className="w-32 h-4 bg-white/5 rounded" />
                  <div className="w-20 h-6 bg-white/5 rounded-full" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
