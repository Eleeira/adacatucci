import ArrowIcon from "./ArrowIcon";

export default function CyberMenu({ title="Menu", subtitle, items=[], onOpen, disabled=false }) {
  return (
    <div className="w-full max-w-xl mx-auto text-center">
      <h1 className="font-display text-3xl md:text-4xl font-semibold tracking-wider uppercase">
        <span className="text-cyber-neon">{title}</span>
      </h1>
      {subtitle && <p className="mt-3 text-white/70">{subtitle}</p>}

      <ul className="mt-8 grid gap-4">
        {items.map((it) => (
          <li key={it.key}>
            <button
              type="button"
              disabled={disabled}
              onClick={() => !disabled && onOpen?.(it.key)}
              className={`group relative w-full overflow-hidden rounded-none border border-cyber-azz/40 bg-cyber-azz/10 px-5 py-4 text-left transition
                ${disabled ? "opacity-60 cursor-not-allowed" : "hover:bg-cyber-azz/20"}`}
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-0 blur-xl transition group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(120px 60px at 10% 0%, rgba(84,193,230,.18), transparent)," +
                    "radial-gradient(120px 60px at 90% 100%, rgba(254,232,1,.15), transparent)",
                }}
              />

              <div className="relative flex items-center justify-between">
                <div>
                  <div className="text-lg font-medium">{it.label}</div>
                  {it.desc && <div className="text-sm text-white/60">{it.desc}</div>}
                </div>
                <ArrowIcon className="h-6 w-6 shrink-0 text-cyber-neon transition group-hover:translate-x-1" />
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}