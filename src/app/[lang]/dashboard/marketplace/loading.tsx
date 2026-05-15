export default function MarketplaceLoading() {
  return (
    <div className="p-12 max-w-7xl mx-auto space-y-12">
      <div className="space-y-4">
        <div className="h-4 w-32 bg-white/5 animate-pulse" />
        <div className="h-12 w-96 bg-white/5 animate-pulse" />
        <div className="h-4 w-64 bg-white/5 animate-pulse" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="dashboard-card aspect-[4/5] p-8 space-y-8 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="w-16 h-16 bg-white/5 animate-pulse rounded-lg" />
              <div className="space-y-3">
                <div className="h-6 w-3/4 bg-white/5 animate-pulse" />
                <div className="h-4 w-1/2 bg-white/5 animate-pulse" />
              </div>
              <div className="space-y-2">
                <div className="h-3 w-full bg-white/5 animate-pulse" />
                <div className="h-3 w-full bg-white/5 animate-pulse" />
                <div className="h-3 w-4/5 bg-white/5 animate-pulse" />
              </div>
            </div>
            <div className="pt-6 border-t border-white/5 flex items-center justify-between">
              <div className="h-6 w-24 bg-white/5 animate-pulse" />
              <div className="h-10 w-32 bg-white/5 animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
