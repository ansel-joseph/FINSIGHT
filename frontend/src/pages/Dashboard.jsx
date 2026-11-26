
import { useState } from "react";
import {
  ArrowUpRight,
  TrendingUp,
  CreditCard,
  PiggyBank,
  Wallet,
  Upload,
  FileSpreadsheet,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  LoaderCircle,
} from "lucide-react";

import { uploadTransactions } from "../services/api";

function StatCard({ title, value, icon: Icon, description }) {
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-[#101a2b] p-5">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
        <Icon size={20} />
      </div>

      <p className="mt-5 text-sm text-slate-400">{title}</p>

      <h2 className="mt-2 text-2xl font-semibold text-white">
        {value}
      </h2>

      <p className="mt-2 text-xs text-slate-500">{description}</p>
    </div>
  );
}

function Dashboard() {
  const [file, setFile] = useState(null);
  const [financialData, setFinancialData] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a CSV file first.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const result = await uploadTransactions(file);

      setFinancialData(result.summary);
      setTransactions(result.transactions || []);
      setSuccess(result.message);

    } catch (err) {
      setError(err.message);

    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(value || 0);

  const savingsRate =
    financialData && financialData.total_income > 0
      ? (
          financialData.net_savings /
          financialData.total_income
        ) * 100
      : 0;

  const stats = [
    {
      title: "Total Income",
      value: financialData
        ? formatCurrency(financialData.total_income)
        : "₹0.00",
      icon: TrendingUp,
      description: "Based on uploaded transactions",
    },
    {
      title: "Total Expenses",
      value: financialData
        ? formatCurrency(financialData.total_expenses)
        : "₹0.00",
      icon: CreditCard,
      description: "Based on uploaded transactions",
    },
    {
      title: "Net Savings",
      value: financialData
        ? formatCurrency(financialData.net_savings)
        : "₹0.00",
      icon: PiggyBank,
      description: "Income minus expenses",
    },
    {
      title: "Savings Rate",
      value: financialData
        ? `${savingsRate.toFixed(1)}%`
        : "0.0%",
      icon: Wallet,
      description: "Savings as a percentage of income",
    },
  ];

  return (
    <div className="mx-auto max-w-[1500px] space-y-8">

      {/* Heading */}
      <section>
        <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-blue-400">
          <Sparkles size={14} />
          Financial Intelligence
        </div>

        <h1 className="text-3xl font-semibold text-white">
          Dashboard
        </h1>

        <p className="mt-2 text-sm text-slate-400">
          Your financial intelligence workspace.
        </p>
      </section>

      {/* Upload Section */}
      <section className="rounded-2xl border border-blue-500/15 bg-[#101a2b] p-6">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
          <div>
            <div className="flex items-center gap-2 text-blue-400">
              <FileSpreadsheet size={20} />
              <h2 className="font-semibold text-white">
                Import Transactions
              </h2>
            </div>

            <p className="mt-2 text-sm text-slate-400">
              Upload your financial transaction CSV to analyse your finances.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-300 hover:bg-white/[0.07]">
              <Upload size={17} />
              Choose CSV

              <input
                type="file"
                accept=".csv"
                className="hidden"
                onChange={(e) => {
                  setFile(e.target.files?.[0] || null);
                  setError("");
                  setSuccess("");
                }}
              />
            </label>

            <button
              onClick={handleUpload}
              disabled={loading || !file}
              className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? (
                <>
                  <LoaderCircle size={17} className="animate-spin" />
                  Analysing...
                </>
              ) : (
                <>
                  <ArrowUpRight size={17} />
                  Analyse Transactions
                </>
              )}
            </button>
          </div>
        </div>

        {file && (
          <p className="mt-4 text-xs text-slate-400">
            Selected file: {file.name}
          </p>
        )}

        {error && (
          <div className="mt-4 flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400">
            <AlertCircle size={17} />
            {error}
          </div>
        )}

        {success && (
          <div className="mt-4 flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/10 p-3 text-sm text-emerald-400">
            <CheckCircle2 size={17} />
            {success}
          </div>
        )}
      </section>

      {/* Summary Cards */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <StatCard key={item.title} {...item} />
        ))}
      </section>

      {/* Transaction Summary */}
      <section className="rounded-2xl border border-white/[0.06] bg-[#101a2b] p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-white">
              Uploaded Transactions
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              {transactions.length} records processed
            </p>
          </div>
        </div>

        {transactions.length === 0 ? (
          <div className="py-12 text-center">
            <FileSpreadsheet
              size={35}
              className="mx-auto text-slate-600"
            />

            <p className="mt-4 text-sm text-slate-400">
              No transactions loaded yet.
            </p>

            <p className="mt-1 text-xs text-slate-600">
              Upload a CSV file to see your financial records.
            </p>
          </div>
        ) : (
          <div className="mt-5 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 text-xs text-slate-500">
                  <th className="px-3 py-3">Date</th>
                  <th className="px-3 py-3">Description</th>
                  <th className="px-3 py-3">Type</th>
                  <th className="px-3 py-3 text-right">Amount</th>
                </tr>
              </thead>

              <tbody>
                {transactions.map((transaction, index) => (
                  <tr
                    key={index}
                    className="border-b border-white/5 hover:bg-white/[0.02]"
                  >
                    <td className="px-3 py-4 text-slate-400">
                      {String(transaction.date).slice(0, 10)}
                    </td>

                    <td className="px-3 py-4 text-slate-200">
                      {transaction.description}
                    </td>

                    <td className="px-3 py-4">
                      <span className={`rounded-md px-2 py-1 text-xs ${
                        transaction.type === "income"
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "bg-orange-500/10 text-orange-400"
                      }`}>
                        {transaction.type}
                      </span>
                    </td>

                    <td className="px-3 py-4 text-right font-medium text-white">
                      {formatCurrency(transaction.amount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Savings Insight */}
      {financialData && (
        <section className="rounded-2xl border border-blue-500/15 bg-blue-500/5 p-6">
          <div className="flex items-center gap-2 text-blue-400">
            <Sparkles size={18} />
            <h2 className="font-semibold">Financial Snapshot</h2>
          </div>

          <p className="mt-3 text-sm leading-7 text-slate-300">
            Based on the uploaded dataset, your savings rate is{" "}
            <strong>{savingsRate.toFixed(1)}%</strong>.
            You have saved{" "}
            <strong>
              {formatCurrency(financialData.net_savings)}
            </strong>{" "}
            after accounting for your recorded expenses.
          </p>

          <p className="mt-3 text-xs text-slate-500">
            This is a statistical summary, not an ML-generated recommendation.
          </p>
        </section>
      )}
    </div>
  );
}

export default Dashboard;
