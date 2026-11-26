import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ChartNoAxesCombined,
  ArrowLeftRight,
  TrendingUp,
  Wallet,
  Settings,
  Landmark,
  ChevronLeft,
} from "lucide-react";

const navigation = [
  { name: "Dashboard", path: "/", icon: LayoutDashboard },
  { name: "Analytics", path: "/analytics", icon: ChartNoAxesCombined },
  { name: "Transactions", path: "/transactions", icon: ArrowLeftRight },
  { name: "Forecasting", path: "/forecasting", icon: TrendingUp },
  { name: "Budgets", path: "/budgets", icon: Wallet },
];

function Sidebar({ open, onClose }) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-white/5 bg-[#0b1120] transition-transform duration-300 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-20 items-center justify-between border-b border-white/5 px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/15 text-blue-400">
              <Landmark size={23} />
            </div>

            <div>
              <h1 className="text-xl font-bold tracking-[0.15em] text-white">
                FINSIGHT
              </h1>
              <p className="text-[10px] tracking-[0.2em] text-slate-500">
                FINANCIAL INTELLIGENCE
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-500 hover:text-white lg:hidden"
          >
            <ChevronLeft size={22} />
          </button>
        </div>

        <div className="px-5 pt-8">
          <p className="mb-4 px-3 text-[10px] font-semibold tracking-[0.2em] text-slate-500">
            WORKSPACE
          </p>

          <nav className="space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  end={item.path === "/"}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                      isActive
                        ? "bg-blue-500/15 text-blue-400"
                        : "text-slate-400 hover:bg-white/5 hover:text-white"
                    }`
                  }
                >
                  <Icon size={19} />
                  {item.name}
                </NavLink>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto px-5 pb-6">
          <div className="rounded-xl border border-blue-500/15 bg-blue-500/5 p-4">
            <p className="text-xs font-semibold text-blue-300">
              FINSIGHT AI ENGINE
            </p>
            <p className="mt-2 text-xs leading-relaxed text-slate-500">
              Financial intelligence and predictive analytics.
            </p>
            <div className="mt-3 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span className="text-[11px] text-emerald-400">
                Interface online
              </span>
            </div>
          </div>

          <NavLink
            to="/settings"
            onClick={onClose}
            className={({ isActive }) =>
              `mt-5 flex items-center gap-3 rounded-xl px-4 py-3 text-sm ${
                isActive
                  ? "bg-blue-500/15 text-blue-400"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`
            }
          >
            <Settings size={19} />
            Settings
          </NavLink>

          <p className="mt-5 px-4 text-[10px] text-slate-600">
            FINSIGHT v1.0.0 · PROJECT BUILD
          </p>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;