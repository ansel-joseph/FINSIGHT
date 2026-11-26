import { Sparkles, Construction } from "lucide-react";

function ModulePage({ title, description }) {
  return (
    <div className="mx-auto flex min-h-[65vh] max-w-5xl flex-col items-center justify-center text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-blue-400/20 bg-blue-500/10 text-blue-400">
        <Construction size={30} />
      </div>

      <div className="mt-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
        <Sparkles size={14} />
        FINSIGHT MODULE
      </div>

      <h1 className="mt-3 text-3xl font-semibold text-white">
        {title}
      </h1>

      <p className="mt-3 max-w-lg text-sm leading-7 text-slate-400">
        {description}
      </p>

      <div className="mt-8 rounded-full border border-white/10 bg-white/[0.03] px-5 py-2 text-xs text-slate-500">
        Module implementation pending
      </div>
    </div>
  );
}

export default ModulePage;