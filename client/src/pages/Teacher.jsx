import { useState } from "react";
import {
  Plus,
  Search,
  Trash2,
  Users,
  GraduationCap,
  CheckCircle2,
  UserCheck,
} from "lucide-react";
import Swal from "sweetalert2";
import { useTeachers } from "@/hooks/useTeachers";
import StatCard from "@/components/layout/StatCard";
import { TeacherCard } from "@/components/layout/TeacherCard";
import { SkeletonCard } from "@/components/layout/SkeletonCard";
import { EmptyState } from "@/components/layout/EmptyState";
import { ErrorState } from "@/components/layout/ErrorState";
import Modal from "@/components/layout/Modal";
import {
  TeacherForm,
  TEACHER_FORM_DEFAULT,
} from "@/components/layout/TeacherForm";

export default function Teacher() {
  const {
    teachers,
    loading,
    error,
    addTeacher,
    updateTeacher,
    deleteTeacher,
    refetch,
  } = useTeachers();
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(null);
  const [selected, setSelected] = useState(null);

  const filtered = (teachers ?? []).filter(
    (t) =>
      !search ||
      t.name?.toLowerCase().includes(search.toLowerCase()) ||
      t.subject?.toLowerCase().includes(search.toLowerCase()),
  );

  const activeCount = (teachers ?? []).filter(
    (t) => t.status === "Active",
  ).length;
  const onLeaveCount = (teachers ?? []).filter(
    (t) => t.status === "On Leave",
  ).length;
  const totalStudents = (teachers ?? []).reduce(
    (a, t) => a + (t.students ?? 0),
    0,
  );

  const onSaveTeacher = async (data) => {
    try {
      if (selected) {
        await updateTeacher(selected.id, data);
        Swal.fire("Berhasil", "Data guru berhasil diupdate", "success");
      } else {
        await addTeacher(data);
        Swal.fire("Berhasil", "Guru baru berhasil ditambahkan", "success");
      }
      refetch();
      setModal(null);
    } catch (err) {
      Swal.fire("Gagal", err.message || "Terjadi kesalahan", "error");
    }
  };

  const onDelete = async () => {
    try {
      await deleteTeacher(selected.id);
      Swal.fire("Terhapus", "Guru telah dihapus", "success");
      refetch();
      setModal(null);
    } catch (err) {
      Swal.fire("Gagal", err.message || "Terjadi kesalahan", "error");
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC] overflow-hidden">
      <div className="shrink-0 px-8 pt-7 pb-5 bg-white border-b border-[#E5E7EB]">
        <div className="flex items-start justify-between mb-5">
          <div>
            <h1 className="text-2xl font-bold text-[#08060d] tracking-tight">
              Manajemen Guru
            </h1>
            <p className="text-sm text-[#9ca3af] mt-0.5">
              Kelola data guru dan informasi pengajar
            </p>
          </div>
          <button
            onClick={() => {
              setSelected(null);
              setModal("form");
            }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white shadow-[0_4px_14px_rgba(108,99,255,0.4)] hover:shadow-[0_4px_20px_rgba(108,99,255,0.5)] hover:scale-[1.02] transition-all duration-200"
            style={{ background: "linear-gradient(135deg, #6C63FF, #8A7BFF)" }}
          >
            <Plus size={16} />
            Tambah Guru
          </button>
        </div>

        <div className="grid grid-cols-4 gap-3">
          <StatCard
            icon={GraduationCap}
            label="Total Guru"
            value={loading ? "-" : (teachers?.length ?? 0)}
            color="bg-[#6C63FF]"
          />
          <StatCard
            icon={CheckCircle2}
            label="Aktif"
            value={loading ? "-" : activeCount}
            color="bg-[#10B981]"
          />
          <StatCard
            icon={UserCheck}
            label="Cuti / Izin"
            value={loading ? "-" : onLeaveCount}
            color="bg-[#F59E0B]"
          />
          <StatCard
            icon={Users}
            label="Total Siswa"
            value={loading ? "-" : totalStudents}
            color="bg-[#6366F1]"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-8 py-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="relative flex items-center h-10 px-4 gap-2 rounded-xl border border-[#E5E7EB] bg-white flex-1 max-w-sm hover:border-[#c4c0ff] focus-within:border-[#6C63FF] focus-within:ring-2 focus-within:ring-[rgba(108,99,255,0.12)] transition-all">
            <Search size={15} className="text-[#9ca3af] shrink-0" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari guru atau mata pelajaran..."
              className="flex-1 bg-transparent text-sm text-[#08060d] placeholder:text-[#9ca3af] outline-none"
            />
          </div>
          {!loading && !error && (
            <span className="text-xs text-[#9ca3af]">
              {filtered.length} guru ditemukan
            </span>
          )}
        </div>

        {loading && (
          <div className="grid grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {!loading && error && <ErrorState message={error} onRetry={refetch} />}

        {!loading && !error && filtered.length === 0 && (
          <EmptyState message="Belum ada data guru" dataIdentity="Guru" />
        )}

        {!loading && !error && filtered.length > 0 && (
          <div className="grid grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
            {filtered.map((teacher, index) => (
              <TeacherCard
                key={teacher.id}
                teacher={teacher}
                index={index}
                onEdit={(t) => {
                  setSelected(t);
                  setModal("form");
                }}
                onDelete={(t) => {
                  setSelected(t);
                  setModal("delete");
                }}
              />
            ))}
          </div>
        )}
      </div>

      {modal === "form" && (
        <Modal
          title={selected ? "Edit Guru" : "Tambah Guru"}
          onClose={() => setModal(null)}
        >
          <TeacherForm
            initial={selected || TEACHER_FORM_DEFAULT}
            onSave={onSaveTeacher}
            onClose={() => setModal(null)}
            isEdit={Boolean(selected)}
          />
        </Modal>
      )}

      {modal === "delete" && selected && (
        <Modal title="Hapus Guru" onClose={() => setModal(null)}>
          <div className="space-y-4">
            <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-red-50 mx-auto">
              <Trash2 size={22} className="text-red-500" />
            </div>
            <p className="text-sm text-[#6b6375] text-center leading-relaxed">
              Apakah kamu yakin ingin menghapus{" "}
              <span className="font-semibold text-[#08060d]">
                {selected.name}
              </span>
              ?<br />
              Tindakan ini tidak dapat dibatalkan.
            </p>
            <div className="flex gap-2.5">
              <button
                onClick={() => setModal(null)}
                className="flex-1 h-10 rounded-xl border border-[#E5E7EB] text-sm font-medium text-[#6b6375] hover:bg-[#F8FAFC] transition-colors"
              >
                Batal
              </button>
              <button
                onClick={onDelete}
                className="flex-1 h-10 rounded-xl bg-[#FF4757] text-white text-sm font-semibold hover:bg-[#e03546] transition-colors"
              >
                Hapus
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
