import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden">
      {/* Sidebar */}
      <Sidebar defaultActive="Home" />

      {/* Main area */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Navbar */}
        <Navbar />

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children ?? (
            <div className="flex flex-col items-center justify-center h-full gap-3 text-[#9ca3af]">
              <div className="w-16 h-16 rounded-2xl bg-[rgba(108,99,255,0.08)] flex items-center justify-center">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <rect x="4" y="4" width="24" height="4" rx="2" fill="#6C63FF" opacity="0.3" />
                  <rect x="4" y="13" width="16" height="4" rx="2" fill="#6C63FF" opacity="0.5" />
                  <rect x="4" y="22" width="20" height="4" rx="2" fill="#6C63FF" opacity="0.7" />
                </svg>
              </div>
              <p className="text-sm font-medium">Tambahin Disini bang</p>
              <p className="text-xs text-[#c4c0ff]">{'<Layout> children </Layout>'}</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}