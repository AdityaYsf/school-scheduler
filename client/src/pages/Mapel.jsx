import { useState, useMemo } from "react";
import {
  Plus, Search, Edit2, Trash2, X,
  BookOpen, Users, Clock, Code,
  MoreVertical, GraduationCap, RefreshCw,
  AlertCircle,
} from "lucide-react";
import Swal from "sweetalert2";
import { useMapel } from "@/hooks/useMapel";

const SUBJECT_COLORS = [
  { bg: "bg-[rgba(108,99,255,0.12)]", text: "text-[#534AB7]", dot: "bg-[#6C63FF]" },
  { bg: "bg-[rgba(29,158,117,0.12)]", text: "text-[#0F6E56]", dot: "bg-[#10B981]" },
  { bg: "bg-[rgba(216,90,48,0.12)]",  text: "text-[#993C1D]", dot: "bg-[#F97316]" },
  { bg: "bg-[rgba(212,83,126,0.12)]", text: "text-[#993556]", dot: "bg-[#EC4899]" },
  { bg: "bg-[rgba(59,130,246,0.12)]", text: "text-[#1E40AF]", dot: "bg-[#3B82F6]" },
];

function getStatusClasses(status) {
  if (status === "Active")   return "bg-[#ECFDF5] text-[#047857]";
  if (status === "Inactive") return "bg-[#FEF2F2] text-[#B91C1C]";
  return "bg-[#E5E7EB] text-[#6B7280]";
}

function StatCard({ icon: Icon, label, value, color }) {
  return (
    <div className="flex items-center gap-3 bg-white rounded-2xl border border-[#E5E7EB] px-5 py-4 shadow-sm">
      <div className={`flex items-center justify-center w-10 h-10 rounded-xl ${color}`}>
        <Icon size={18} className="text-white" />
      </div>
      <div>
        <p className="text-2xl font-bold text-[#08060d] leading-none">{value}</p>
        <p className="text-xs text-[#9ca3af] mt-0.5">{label}</p>
      </div>
    </div>
  );
}

function MapelCard({ mapel, index, onEdit, onDelete, onView }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const c = SUBJECT_COLORS[index % SUBJECT_COLORS.length];

  return (
    <div
      className="group bg-white rounded-2xl border border-[#E5E7EB] p-5 hover:border-[#c4c0ff] hover:shadow-[0_4px_20px_rgba(108,99,255,0.1)] transition-all duration-200 cursor-pointer"
      onClick={() => onView(mapel)}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full ${c.bg} ${c.text} flex items-center justify-center text-[13px] font-semibold shrink-0`}>
            {mapel.code?.slice(0, 2).toUpperCase() || "M"}
          </div>
          <div>
            <p className="font-semibold text-[14px] text-[#08060d] leading-snug">{mapel.name}</p>
            <p className="text-xs text-[#9ca3af] mt-0.5">{mapel.code ?? "-"}</p>
          </div>
        </div>
        <div className="relative" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center justify-center w-7 h-7 rounded-lg text-[#9ca3af] hover:bg-[#F1F5F9] hover:text-[#08060d] transition-colors opacity-0 group-hover:opacity-100"
          >
            <MoreVertical size={14} />
          </button>
          {menuOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
              <div className="absolute right-0 top-8 w-36 bg-white rounded-xl border border-[#E5E7EB] shadow-lg z-20 overflow-hidden">
                <button
                  onClick={() => { onEdit(mapel); setMenuOpen(false); }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-[#6b6375] hover:bg-[#F8FAFC] hover:text-[#08060d] transition-colors"
                >
                  <Edit2 size={13} /> Edit
                </button>
                <button
                  onClick={() => { onDelete(mapel); setMenuOpen(false); }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-[#FF4757] hover:bg-[#FFF1F2] transition-colors"
                >
                  <Trash2 size={13} /> Hapus
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <span className={`inline-flex items-center justify-center rounded-full px-2.5 py-1 text-[11px] font-semibold mb-4 ${getStatusClasses(mapel.status)}`}>
        {mapel.status ?? "Unknown"}
      </span>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs text-[#6b6375]">
          <GraduationCap size={12} className="text-[#9ca3af] shrink-0" />
          <span className="font-medium">Guru: {mapel.teacher ?? "-"}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-[#6b6375]">
          <Code size={12} className="text-[#9ca3af] shrink-0" />
          <span>Level: {mapel.level ?? "-"}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-[#6b6375]">
          <BookOpen size={12} className="text-[#9ca3af] shrink-0" />
          <span>{mapel.credits ?? 0} SKS</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-[#6b6375]">
          <Clock size={12} className="text-[#9ca3af] shrink-0" />
          <span>{mapel.hours ?? 0} jam</span>
        </div>
      </div>
    </div>
  );
}

function SkeletonCard() {
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
        {[1,2,3,4].map((i) => (
          <div key={i} className="h-3 bg-[#F1F5F9] rounded-md w-full" />
        ))}
      </div>
    </div>
  );
}

function EmptyState({ message = "Belum ada data mata pelajaran" }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4">
      <div className="w-16 h-16 rounded-2xl bg-[rgba(108,99,255,0.08)] flex items-center justify-center">
        <BookOpen size={28} className="text-[#6C63FF]" />
      </div>
      <div className="text-center">
        <p className="font-semibold text-[#08060d] text-sm">{message}</p>
        <p className="text-xs text-[#9ca3af] mt-1">Klik tombol "Tambah Mapel" untuk mulai menambahkan data</p>
      </div>
    </div>
  );
}

function DetailModal({ mapel, onClose }) {
  const c = SUBJECT_COLORS[0];
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#E5E7EB]">
          <h2 className="text-base font-semibold text-[#08060d]">Detail Mata Pelajaran</h2>
          <button
            onClick={onClose}
            className="flex items-center justify-center w-8 h-8 rounded-xl text-[#9ca3af] hover:bg-[#F1F5F9] hover:text-[#08060d] transition-colors"
          >
            <X size={16} />
          </button>
        </div>
        
        <div className="space-y-4">
          <div className={`flex items-center gap-3 p-4 rounded-2xl ${c.bg}`}>
            <div className={`flex items-center justify-center w-10 h-10 rounded-xl bg-white/60 ${c.text}`}>
              <BookOpen size={18} />
            </div>
            <div>
              <p className={`font-semibold text-[15px] ${c.text}`}>{mapel.name}</p>
              <p className={`text-xs ${c.text} opacity-70`}>{mapel.code}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#F8FAFC] rounded-xl p-3">
              <div className="flex items-center gap-1.5 text-[#9ca3af] mb-1">
                <GraduationCap size={12} />
                <span className="text-xs">Guru Pengampu</span>
              </div>
              <p className="text-sm font-semibold text-[#08060d]">{mapel.teacher}</p>
            </div>
            <div className="bg-[#F8FAFC] rounded-xl p-3">
              <div className="flex items-center gap-1.5 text-[#9ca3af] mb-1">
                <Code size={12} />
                <span className="text-xs">Level</span>
              </div>
              <p className="text-sm font-semibold text-[#08060d]">{mapel.level}</p>
            </div>
            <div className="bg-[#F8FAFC] rounded-xl p-3">
              <div className="flex items-center gap-1.5 text-[#9ca3af] mb-1">
                <BookOpen size={12} />
                <span className="text-xs">SKS</span>
              </div>
              <p className="text-sm font-semibold text-[#08060d]">{mapel.credits}</p>
            </div>
            <div className="bg-[#F8FAFC] rounded-xl p-3">
              <div className="flex items-center gap-1.5 text-[#9ca3af] mb-1">
                <Clock size={12} />
                <span className="text-xs">Jam</span>
              </div>
              <p className="text-sm font-semibold text-[#08060d]">{mapel.hours}</p>
            </div>
          </div>

          {mapel.description && (
            <div className="bg-[#F8FAFC] rounded-xl p-3">
              <p className="text-xs text-[#9ca3af] mb-1">Deskripsi</p>
              <p className="text-sm text-[#6b6375]">{mapel.description}</p>
            </div>
          )}

          <button
            onClick={onClose}
            className="w-full h-10 rounded-xl border border-[#E5E7EB] text-sm font-medium text-[#6b6375] hover:bg-[#F8FAFC] transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}

export default function MapelPage() {
  const { mapel, loading, error, addMapel, updateMapel, deleteMapel } = useMapel();
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(null);
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => {
    if (!search.trim()) return mapel;
    const lcSearch = search.toLowerCase();
    return mapel.filter((m) =>
      (m.name || "").toLowerCase().includes(lcSearch) ||
      (m.code || "").toLowerCase().includes(lcSearch) ||
      (m.teacher || "").toLowerCase().includes(lcSearch)
    );
  }, [mapel, search]);

  const handleDelete = async (m) => {
    const result = await Swal.fire({
      title: "Hapus Mapel?",
      text: `Apakah kamu yakin menghapus ${m.name}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FF4757",
      cancelButtonColor: "#E5E7EB",
      confirmButtonText: "Hapus",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      try {
        await deleteMapel(m.id);
        Swal.fire({ icon: "success", title: "Berhasil", text: "Mapel berhasil dihapus", timer: 1500 });
      } catch (err) {
        Swal.fire({ icon: "error", title: "Gagal", text: err.message });
      }
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col h-full bg-[#F8FAFC] overflow-hidden">
        <div className="shrink-0 px-8 pt-7 pb-5 bg-white border-b border-[#E5E7EB]">
          <h1 className="text-2xl font-bold text-[#08060d] tracking-tight">Manajemen Mata Pelajaran</h1>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <RefreshCw size={28} className="text-[#6C63FF] animate-spin" />
            <p className="text-[#6b6375]">Memuat mata pelajaran...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col h-full bg-[#F8FAFC] overflow-hidden">
        <div className="shrink-0 px-8 pt-7 pb-5 bg-white border-b border-[#E5E7EB]">
          <h1 className="text-2xl font-bold text-[#08060d] tracking-tight">Manajemen Mata Pelajaran</h1>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3 text-center">
            <AlertCircle size={28} className="text-red-500" />
            <p className="text-[#6b6375]">Error: {error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-[#6C63FF] text-white rounded-xl text-sm font-medium hover:opacity-90"
            >
              Coba Lagi
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC] overflow-hidden">
      {/* Header */}
      <div className="shrink-0 px-8 pt-7 pb-5 bg-white border-b border-[#E5E7EB]">
        <div className="flex items-start justify-between mb-5">
          <div>
            <h1 className="text-2xl font-bold text-[#08060d] tracking-tight">Manajemen Mata Pelajaran</h1>
            <p className="text-sm text-[#9ca3af] mt-0.5">Kelola semua mata pelajaran dan informasi guru pengampu</p>
          </div>
          <button
            onClick={() => setModal("add")}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white shadow-[0_4px_14px_rgba(108,99,255,0.4)] hover:shadow-[0_4px_20px_rgba(108,99,255,0.5)] hover:scale-[1.02] transition-all duration-200"
            style={{ background: "linear-gradient(135deg, #6C63FF, #8A7BFF)" }}
          >
            <Plus size={16} /> Tambah Mapel
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <StatCard icon={BookOpen} label="Total Mapel" value={mapel.length} color="bg-[#6C63FF]" />
          <StatCard icon={GraduationCap} label="Guru Unik" value={new Set(mapel.map(m => m.teacher)).size} color="bg-[#10B981]" />
          <StatCard icon={Users} label="Total Jam" value={mapel.reduce((a, m) => a + (m.hours || 0), 0)} color="bg-[#F59E0B]" />
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto px-8 py-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="relative flex items-center h-10 px-4 gap-2 rounded-xl border border-[#E5E7EB] bg-white flex-1 max-w-sm hover:border-[#c4c0ff] focus-within:border-[#6C63FF] focus-within:ring-2 focus-within:ring-[rgba(108,99,255,0.12)] transition-all">
            <Search size={15} className="text-[#9ca3af] shrink-0" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari mapel atau guru..."
              className="flex-1 bg-transparent text-sm text-[#08060d] placeholder:text-[#9ca3af] outline-none"
            />
          </div>
        </div>

        {filtered.length === 0 ? (
          <EmptyState message={search ? "Tidak ada mapel ditemukan" : "Belum ada mata pelajaran"} />
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
            {filtered.map((m, idx) => (
              <MapelCard
                key={m.id}
                mapel={m}
                index={idx}
                onEdit={() => { setSelected(m); setModal("edit"); }}
                onDelete={() => handleDelete(m)}
                onView={() => { setSelected(m); setModal("detail"); }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modals */}
      {modal === "detail" && selected && (
        <DetailModal mapel={selected} onClose={() => { setModal(null); setSelected(null); }} />
      )}
    </div>
  );
}
