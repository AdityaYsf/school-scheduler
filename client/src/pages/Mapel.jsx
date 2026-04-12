import { useState, useMemo } from "react";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  X,
  BookOpen,
  Users,
  Clock,
  Code,
  MoreVertical,
  GraduationCap,
  RefreshCw,
  AlertCircle,
} from "lucide-react";
import Swal from "sweetalert2";
import { useMapel } from "@/hooks/useMapel";
import StatCard from "@/components/layout/StatCard";
import { MapelCard } from "@/components/layout/MapelCard";
import { SkeletonCard } from "@/components/layout/SkeletonCard";
import { EmptyState } from "@/components/layout/EmptyState";
import DetailModal from "@/components/layout/DetailModal";

export default function MapelPage() {
  const { mapel, loading, error, addMapel, updateMapel, deleteMapel } =
    useMapel();
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(null);
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => {
    if (!search.trim()) return mapel;
    const lcSearch = search.toLowerCase();
    return mapel.filter(
      (m) =>
        (m.name || "").toLowerCase().includes(lcSearch) ||
        (m.code || "").toLowerCase().includes(lcSearch) ||
        (m.teacher || "").toLowerCase().includes(lcSearch),
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
        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Mapel berhasil dihapus",
          timer: 1500,
        });
      } catch (err) {
        Swal.fire({ icon: "error", title: "Gagal", text: err.message });
      }
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col h-full bg-[#F8FAFC] overflow-hidden">
        <div className="shrink-0 px-8 pt-7 pb-5 bg-white border-b border-[#E5E7EB]">
          <h1 className="text-2xl font-bold text-[#08060d] tracking-tight">
            Manajemen Mata Pelajaran
          </h1>
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
          <h1 className="text-2xl font-bold text-[#08060d] tracking-tight">
            Manajemen Mata Pelajaran
          </h1>
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
            <h1 className="text-2xl font-bold text-[#08060d] tracking-tight">
              Manajemen Mata Pelajaran
            </h1>
            <p className="text-sm text-[#9ca3af] mt-0.5">
              Kelola semua mata pelajaran dan informasi guru pengampu
            </p>
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
          <StatCard
            icon={BookOpen}
            label="Total Mapel"
            value={mapel.length}
            color="bg-[#6C63FF]"
          />
          <StatCard
            icon={GraduationCap}
            label="Guru Unik"
            value={new Set(mapel.map((m) => m.teacher)).size}
            color="bg-[#10B981]"
          />
          <StatCard
            icon={Users}
            label="Total Jam"
            value={mapel.reduce((a, m) => a + (m.hours || 0), 0)}
            color="bg-[#F59E0B]"
          />
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
          <EmptyState
            message={
              search ? "Tidak ada mapel ditemukan" : "Belum ada mata pelajaran"
            }
          />
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
            {filtered.map((m, idx) => (
              <MapelCard
                key={m.id}
                mapel={m}
                index={idx}
                onEdit={() => {
                  setSelected(m);
                  setModal("edit");
                }}
                onDelete={() => handleDelete(m)}
                onView={() => {
                  setSelected(m);
                  setModal("detail");
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modals */}
      {modal === "detail" && selected && (
        <DetailModal
          mapel={selected}
          onClose={() => {
            setModal(null);
            setSelected(null);
          }}
        />
      )}
    </div>
  );
}
