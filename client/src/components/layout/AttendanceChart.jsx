import { DAYS } from "@/assets/data";

export function AttendanceChart() {
  // Generate attendance data for this week
  const days = DAYS;
  const attendanceData = days.map(() => ({
    day: days[Math.floor(Math.random() * days.length)],
    value: Math.floor(Math.random() * (95 - 65 + 1)) + 65,
    total: 100,
  }));

  const max = Math.max(...attendanceData.map((d) => d.value));
  const today = new Date().getDay(); // 0 = Sunday, 1 = Monday

  return (
    <div className="bg-white rounded-2xl border border-[#E5E7EB] p-5 flex flex-col gap-4 h-full">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[15px] font-semibold text-[#08060d]">
            Kehadiran Minggu Ini
          </h2>
          <p className="text-[12px] text-[#9ca3af] mt-0.5">
            Persentase kehadiran siswa harian
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#6C63FF] inline-block" />
          <span className="text-[12px] text-[#6b6375]">Kehadiran (%)</span>
        </div>
      </div>

      {/* Chart */}
      <div className="flex items-end gap-2.5 flex-1 pt-2">
        {attendanceData.map((d, i) => {
          const heightPct = (d.value / max) * 100;
          const isToday = i === (today === 0 ? 6 : today - 1);
          return (
            <div
              key={d.day + i}
              className="flex flex-col items-center gap-2 flex-1 group"
            >
              <div className="relative flex flex-col items-center w-full">
                {/* Tooltip */}
                <span className="absolute -top-7 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-[11px] font-semibold text-[#6C63FF] bg-[rgba(108,99,255,0.08)] px-2 py-0.5 rounded-md whitespace-nowrap">
                  {d.value}%
                </span>
                {/* Bar background */}
                <div
                  className="w-full rounded-xl overflow-hidden"
                  style={{
                    height: "140px",
                    background: "rgba(108,99,255,0.06)",
                  }}
                >
                  {/* Bar fill */}
                  <div
                    className="w-full rounded-xl transition-all duration-700 mt-auto"
                    style={{
                      height: `${heightPct}%`,
                      marginTop: `${100 - heightPct}%`,
                      background: isToday
                        ? "linear-gradient(180deg, #6C63FF, #8A7BFF)"
                        : "linear-gradient(180deg, #A5A0FF, #C4C1FF)",
                      boxShadow: isToday
                        ? "0 4px 12px rgba(108,99,255,0.3)"
                        : "none",
                    }}
                  />
                </div>
              </div>
              <span
                className="text-[11px] font-medium"
                style={{ color: isToday ? "#6C63FF" : "#9ca3af" }}
              >
                {d.day}
              </span>
            </div>
          );
        })}
      </div>

      {/* Average */}
      <div className="flex items-center justify-between pt-3 border-t border-[#F1F5F9]">
        <span className="text-[12px] text-[#9ca3af]">Rata-rata minggu ini</span>
        <span className="text-[14px] font-bold text-[#6C63FF]">
          {Math.round(
            attendanceData.reduce((s, d) => s + d.value, 0) /
              attendanceData.length,
          )}
          %
        </span>
      </div>
    </div>
  );
}