import { Menu, Search, Bell, CalendarDays } from "lucide-react";

function Topbar({ onMenuClick }) {
  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-white/5 bg-[#080e1b]/90 px-5 backdrop-blur-xl md:px-8">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="text-slate-400 hover:text-white lg:hidden"
        >
          <Menu size={23} />
        </button>

        <div>
          <p className="text-sm font-medium text-white">
            Financial Overview
          </p>
          <p className="hidden text-xs text-slate-500 sm:block">
            Your financial intelligence workspace
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-5">
        <div className="hidden items-center gap-2 rounded-lg border border-white/5 bg-white/[0.03] px-3 py-2 text-xs text-slate-500 sm:flex">
          <CalendarDays size={15} />
          November 2026
        </div>

        <button className="text-slate-400 transition hover:text-white">
          <Search size={19} />
        </button>

        <button className="relative text-slate-400 transition hover:text-white">
          <Bell size={19} />
          <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-blue-400" />
        </button>

        <div className="flex h-9 w-9 items-center justify-center rounded-full border border-blue-400/30 bg-blue-500/15 text-sm font-semibold text-blue-300">
          A
        </div>
      </div>
    </header>
  );
}

export default Topbar;