import {
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  TrendingUp,
  CreditCard,
  PiggyBank,
  MoreHorizontal,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const stats = [
  {
    title: "Total Income",
    value: "₹12,000",
    change: "+8.2%",
    description: "Compared to last month",
    icon: TrendingUp,
    positive: true,
  },
  {
    title: "Total Expenses",
    value: "₹4,269",
    change: "-4.5%",
    description: "Compared to last month",
    icon: CreditCard,
    positive: true,
  },
  {
    title: "Net Savings",
    value: "₹7,731",
    change: "+12.8%",
    description: "Compared to last month",
    icon: PiggyBank,
    positive: true,
  },
  {
    title: "Savings Rate",
    value: "64.4%",
    change: "+3.2%",
    description: "Of your total income",
    icon: Wallet,
    positive: true,
  },
];

const spending = [
  { month: "Jun", income: 75, expense: 40 },
  { month: "Jul", income: 90, expense: 48 },
  { month: "Aug", income: 65, expense: 35 },
  { month: "Sep", income: 80, expense: 50 },
  { month: "Oct", income: 72, expense: 42 },
  { month: "Nov", income: 95, expense: 38 },
];

const categories = [
  { name: "Shopping", amount: "₹1,800", percent: 42, color: "bg-blue-400" },
  { name: "Food & Dining", amount: "₹1,100", percent: 26, color: "bg-violet-400" },
  { name: "Utilities", amount: "₹950", percent: 22, color: "bg-cyan-400" },
  { name: "Transport", amount: "₹419", percent: 10, color: "bg-amber-400" },
];

const transactions = [
  { name: "Amazon Purchase", category: "Shopping", date: "Nov 03, 2026", amount: "-₹1,800", icon: "A", color: "bg-orange-500/15 text-orange-400" },
  { name: "Electricity Bill", category: "Utilities", date: "Nov 04, 2026", amount: "-₹950", icon: "E", color: "bg-yellow-500/15 text-yellow-400" },
  { name: "Monthly Stipend", category: "Income", date: "Nov 02, 2026", amount: "+₹12,000", icon: "M", color: "bg-emerald-500/15 text-emerald-400" },
  { name: "Swiggy Order", category: "Food & Dining", date: "Nov 01, 2026", amount: "-₹450", icon: "S", color: "bg-orange-500/15 text-orange-400" },
];

function StatCard({ item }) {
  const Icon = item.icon;

  return (
    <div className="rounded-2xl border border-white/[0.06] bg-[#101a2b] p-5 transition hover:border-blue-500/20">
      <div className="flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
          <Icon size={20} />
        </div>

        <button className="text-slate-600 hover:text-white">
          <MoreHorizontal size={20} />
        </button>
      </div>

      <p className="mt-5 text-sm text-slate-400">{item.title}</p>

      <div className="mt-2 flex flex-wrap items-center gap-2">
        <h2 className="text-2xl font-semibold tracking-tight text-white">
          {item.value}
        </h2>

        <span className="flex items-center gap-1 rounded-md bg-emerald-500/10 px-2 py-1 text-[11px] font-medium text-emerald-400">
          <ArrowUpRight size={13} />
          {item.change}
        </span>
      </div>

      <p className="mt-2 text-xs text-slate-500">{item.description}</p>
    </div>
  );
}

function Dashboard() {
  return (
    <div className="mx-auto max-w-[1500px] space-y-8">
      {/* Page heading */}
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-blue-400">
            <Sparkles size={14} />
            Financial Intelligence
          </div>

          <h1 className="text-3xl font-semibold tracking-tight text-white">
            Dashboard
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Here's what's happening with your finances.
          </p>
        </div>

        <button className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-slate-300 transition hover:bg-white/[0.07]">
          <CalendarDaysIcon />
          This Month
        </button>
      </section>

      {/* Summary cards */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <StatCard key={item.title} item={item} />
        ))}
      </section>

      {/* Charts */}
      <section className="grid gap-5 xl:grid-cols-3">
        <div className="rounded-2xl border border-white/[0.06] bg-[#101a2b] p-5 xl:col-span-2">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="font-semibold text-white">
                Income vs Expenses
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Monthly financial activity · Illustrative data
              </p>
            </div>

            <div className="flex gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-blue-400" />
                Income
              </span>
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-violet-400" />
                Expenses
              </span>
            </div>
          </div>

          <div className="mt-8 flex h-64 items-end justify-around gap-3 border-b border-l border-white/10 px-3">
            {spending.map((item) => (
              <div
                key={item.month}
                className="flex h-full flex-1 flex-col items-center justify-end gap-3"
              >
                <div className="flex h-[85%] w-full items-end justify-center gap-1 sm:gap-2">
                  <div
                    style={{ height: `${item.income}%` }}
                    className="w-3 rounded-t-md bg-blue-400 transition-all hover:bg-blue-300 sm:w-6"
                    title={`Income: ${item.income}`}
                  />

                  <div
                    style={{ height: `${item.expense}%` }}
                    className="w-3 rounded-t-md bg-violet-400 transition-all hover:bg-violet-300 sm:w-6"
                    title={`Expenses: ${item.expense}`}
                  />
                </div>

                <span className="pb-2 text-xs text-slate-500">
                  {item.month}
                </span>
              </div>
            ))}
          </div>

          <p className="mt-3 text-[10px] text-slate-600">
            Chart values are demonstration data, not actual historical records.
          </p>
        </div>

        {/* Spending categories */}
        <div className="rounded-2xl border border-white/[0.06] bg-[#101a2b] p-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-white">
                Spending Breakdown
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Expenses by category
              </p>
            </div>

            <button className="text-slate-500 hover:text-white">
              <MoreHorizontal size={20} />
            </button>
          </div>

          <div className="mt-8 space-y-6">
            {categories.map((category) => (
              <div key={category.name}>
                <div className="mb-2 flex items-center justify-between gap-2 text-sm">
                  <span className="text-slate-300">{category.name}</span>
                  <span className="font-medium text-white">
                    {category.amount}
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-white/5">
                  <div
                    className={`h-full rounded-full ${category.color}`}
                    style={{ width: `${category.percent}%` }}
                  />
                </div>

                <p className="mt-1 text-right text-[10px] text-slate-500">
                  {category.percent}%
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transactions and insight */}
      <section className="grid gap-5 xl:grid-cols-3">
        <div className="rounded-2xl border border-white/[0.06] bg-[#101a2b] p-5 xl:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-white">
                Recent Transactions
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Your latest financial activity
              </p>
            </div>

            <button className="flex items-center gap-2 text-xs text-blue-400 hover:text-blue-300">
              View all <ArrowRight size={14} />
            </button>
          </div>

          <div className="mt-5 space-y-1">
            {transactions.map((transaction) => (
              <div
                key={transaction.name}
                className="flex items-center justify-between gap-3 rounded-xl px-2 py-3 transition hover:bg-white/[0.03]"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-semibold ${transaction.color}`}>
                    {transaction.icon}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-slate-200">
                      {transaction.name}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {transaction.category} · {transaction.date}
                    </p>
                  </div>
                </div>

                <span className={`shrink-0 text-sm font-semibold ${
                  transaction.amount.startsWith("+")
                    ? "text-emerald-400"
                    : "text-slate-200"
                }`}>
                  {transaction.amount}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Intelligence panel */}
        <div className="relative overflow-hidden rounded-2xl border border-blue-500/15 bg-gradient-to-br from-blue-500/10 via-[#101a2b] to-[#101a2b] p-5">
          <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-blue-500/10 blur-3xl" />

          <div className="relative">
            <div className="flex items-center gap-2 text-blue-400">
              <Sparkles size={18} />
              <span className="text-xs font-semibold tracking-wider">
                FINSIGHT INSIGHT
              </span>
            </div>

            <h2 className="mt-6 text-xl font-semibold text-white">
              Your financial snapshot
            </h2>

            <p className="mt-3 text-sm leading-7 text-slate-400">
              Your current sample records show expenses of ₹4,269 against
              income of ₹12,000. That leaves ₹7,731 before any additional
              unrecorded expenses.
            </p>

            <div className="mt-6 rounded-xl border border-white/5 bg-black/20 p-4">
              <p className="text-xs text-slate-500">
                Current savings ratio
              </p>
              <p className="mt-1 text-2xl font-semibold text-blue-300">
                64.4%
              </p>
            </div>

            <p className="mt-5 text-[10px] leading-relaxed text-slate-600">
              Demonstration insight calculated from the sample transaction
              dataset. Automated AI-generated insights will be integrated
              later.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

function CalendarDaysIcon() {
  return <span className="text-blue-400">▦</span>;
}

export default Dashboard;