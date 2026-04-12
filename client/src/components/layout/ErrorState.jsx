export function ErrorState({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4">
      <div className="w-16 h-16 rounded-2xl bg-[rgba(225,29,72,0.08)] flex items-center justify-center">
        <AlertCircle size={28} className="text-[#E11D48]" />
      </div>
      <div className="text-center">
        <p className="font-semibold text-[#08060d] text-sm">
          Gagal memuat data
        </p>
        <p className="text-xs text-[#9ca3af] mt-1">{message}</p>
      </div>
      <button
        onClick={onRetry}
        className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium text-[#6C63FF] border border-[rgba(108,99,255,0.3)] hover:bg-[rgba(108,99,255,0.06)] transition-colors"
      >
        <RefreshCw size={13} /> Coba lagi
      </button>
    </div>
  );
}