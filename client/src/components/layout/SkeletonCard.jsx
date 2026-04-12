export function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-[#E5E7EB] p-5 space-y-4 animate-pulse">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[#F1F5F9]" />
        <div className="space-y-1.5 flex-1">
          <div className="h-3.5 bg-[#F1F5F9] rounded-md w-3/4" />
          <div className="h-3 bg-[#F1F5F9] rounded-md w-1/2" />
        </div>
      </div>
      <div className="h-6 bg-[#F1F5F9] rounded-full w-20" />
      <div className="space-y-2">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-3 bg-[#F1F5F9] rounded-md w-full" />
        ))}
      </div>
    </div>
  );
}