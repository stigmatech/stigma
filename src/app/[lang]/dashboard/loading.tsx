import Image from "next/image";

export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-[#080910] text-white p-12 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-purple-600/5 blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        {/* Header Skeleton */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 animate-pulse">
          <div className="space-y-4">
            <div className="w-32 h-6 bg-white/5 rounded-full" />
            <div className="w-64 h-12 bg-white/5 rounded" />
          </div>
          <div className="w-48 h-14 bg-white/5 rounded" />
        </div>

        {/* Insight Tiles Skeletons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white/3 border border-white/5 p-8 h-40 animate-pulse rounded-lg" />
          ))}
        </div>

        {/* Subscription Grid Skeletons */}
        <div className="space-y-8 animate-pulse">
          <div className="flex items-center gap-4">
            <div className="w-32 h-4 bg-white/5 rounded" />
            <div className="flex-1 h-px bg-white/5" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white/2 border border-white/5 h-80 rounded-xl" />
            ))}
          </div>
        </div>
      </div>

      {/* Central Pulsating Branding */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative group">
          <div className="absolute inset-0 bg-purple-500/20 blur-3xl rounded-full scale-150 animate-pulse" />
          <div className="relative flex flex-col items-center gap-6">
            <Image
              src="/logoStigmaTechnologies188x64.png"
              alt="Loading"
              width={160}
              height={55}
              className="object-contain brightness-0 invert opacity-40 animate-pulse"
            />
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
              <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
              <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
