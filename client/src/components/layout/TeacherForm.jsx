import { useState } from "react";

export const TEACHER_FORM_DEFAULT = {
  name: "",
  subject: "",
  email: "",
  phone: "",
  status: "Active",
  rating: 0,
  students: 0,
  courses: 0,
  joinDate: "",
};

 export function TeacherForm({
  initial = TEACHER_FORM_DEFAULT,
  onSave,
  onClose,
  isEdit,
}) {
  const [form, setForm] = useState({ ...TEACHER_FORM_DEFAULT, ...initial });
  const set = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSave = () => {
    if (!form.name.trim() || !form.email.trim() || !form.subject.trim()) {
      Swal.fire(
        "Lengkapi Form",
        "Nama, Email, dan Mata Pelajaran wajib diisi",
        "warning",
      );
      return;
    }
    onSave(form);
    onClose();
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-[#6b6375] mb-1.5">
            Nama
          </label>
          <input
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            placeholder="Nama guru"
            className="w-full h-10 px-3 rounded-xl border border-[#E5E7EB] text-sm text-[#08060d] placeholder:text-[#c4c0cc] focus:outline-none focus:border-[#6C63FF] focus:ring-2 focus:ring-[rgba(108,99,255,0.12)] transition-all"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-[#6b6375] mb-1.5">
            Mata Pelajaran
          </label>
          <input
            value={form.subject}
            onChange={(e) => set("subject", e.target.value)}
            placeholder="cth. Matematika"
            className="w-full h-10 px-3 rounded-xl border border-[#E5E7EB] text-sm text-[#08060d] placeholder:text-[#c4c0cc] focus:outline-none focus:border-[#6C63FF] focus:ring-2 focus:ring-[rgba(108,99,255,0.12)] transition-all"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-[#6b6375] mb-1.5">
            Email
          </label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            placeholder="example@domain.com"
            className="w-full h-10 px-3 rounded-xl border border-[#E5E7EB] text-sm text-[#08060d] placeholder:text-[#c4c0cc] focus:outline-none focus:border-[#6C63FF] focus:ring-2 focus:ring-[rgba(108,99,255,0.12)] transition-all"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-[#6b6375] mb-1.5">
            Telepon
          </label>
          <input
            value={form.phone}
            onChange={(e) => set("phone", e.target.value)}
            placeholder="+62 ..."
            className="w-full h-10 px-3 rounded-xl border border-[#E5E7EB] text-sm text-[#08060d] placeholder:text-[#c4c0cc] focus:outline-none focus:border-[#6C63FF] focus:ring-2 focus:ring-[rgba(108,99,255,0.12)] transition-all"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-[#6b6375] mb-1.5">
            Status
          </label>
          <select
            value={form.status}
            onChange={(e) => set("status", e.target.value)}
            className="w-full h-10 px-3 rounded-xl border border-[#E5E7EB] text-sm text-[#08060d] focus:outline-none focus:border-[#6C63FF] transition-all bg-white"
          >
            <option>Active</option>
            <option>Inactive</option>
            <option>On Leave</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-[#6b6375] mb-1.5">
            Join Date
          </label>
          <input
            value={form.joinDate}
            onChange={(e) => set("joinDate", e.target.value)}
            placeholder="Feb 2021"
            className="w-full h-10 px-3 rounded-xl border border-[#E5E7EB] text-sm text-[#08060d] placeholder:text-[#c4c0cc] focus:outline-none focus:border-[#6C63FF] focus:ring-2 focus:ring-[rgba(108,99,255,0.12)] transition-all"
          />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="block text-xs font-medium text-[#6b6375] mb-1.5">
            Rating
          </label>
          <input
            type="number"
            min={0}
            max={5}
            step={0.1}
            value={form.rating}
            onChange={(e) => set("rating", Number(e.target.value))}
            className="w-full h-10 px-3 rounded-xl border border-[#E5E7EB] text-sm text-[#08060d] focus:outline-none focus:border-[#6C63FF] focus:ring-2 focus:ring-[rgba(108,99,255,0.12)] transition-all"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-[#6b6375] mb-1.5">
            Siswa
          </label>
          <input
            type="number"
            min={0}
            value={form.students}
            onChange={(e) => set("students", Number(e.target.value))}
            className="w-full h-10 px-3 rounded-xl border border-[#E5E7EB] text-sm text-[#08060d] focus:outline-none focus:border-[#6C63FF] focus:ring-2 focus:ring-[rgba(108,99,255,0.12)] transition-all"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-[#6b6375] mb-1.5">
            Kursus
          </label>
          <input
            type="number"
            min={0}
            value={form.courses}
            onChange={(e) => set("courses", Number(e.target.value))}
            className="w-full h-10 px-3 rounded-xl border border-[#E5E7EB] text-sm text-[#08060d] focus:outline-none focus:border-[#6C63FF] focus:ring-2 focus:ring-[rgba(108,99,255,0.12)] transition-all"
          />
        </div>
      </div>
      <div className="flex gap-2.5 pt-2">
        <button
          onClick={onClose}
          className="flex-1 h-10 rounded-xl border border-[#E5E7EB] text-sm font-medium text-[#6b6375] hover:bg-[#F8FAFC] transition-colors"
        >
          Batal
        </button>
        <button
          onClick={handleSave}
          className="flex-1 h-10 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
          style={{ background: "linear-gradient(135deg, #6C63FF, #8A7BFF)" }}
        >
          {isEdit ? "Simpan Perubahan" : "Tambah Guru"}
        </button>
      </div>
    </div>
  );
}