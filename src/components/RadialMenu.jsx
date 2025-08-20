import { useMemo, useRef, useState } from "react";
import { useSfx } from "@/sfx/SfxProvider";

/** Util: deg -> rad + polare → cartesiano */
const d2r = (d) => (d * Math.PI) / 180;
function polar(cx, cy, r, deg) {
  const a = d2r(deg);
  return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
}

/** Path ring-segment (anello) tra due raggi e due angoli */
function ringSegmentPath(cx, cy, rInner, rOuter, a0, a1) {
  const [x1o, y1o] = polar(cx, cy, rOuter, a0);
  const [x2o, y2o] = polar(cx, cy, rOuter, a1);
  const [x2i, y2i] = polar(cx, cy, rInner, a1);
  const [x1i, y1i] = polar(cx, cy, rInner, a0);

  // sweep normalizzato a [0,360) per decidere large-arc flag
  const sweep = ((a1 - a0) % 360 + 360) % 360;
  const large = sweep > 180 ? 1 : 0;

  return [
    `M ${x1o} ${y1o}`,
    `A ${rOuter} ${rOuter} 0 ${large} 1 ${x2o} ${y2o}`,
    `L ${x2i} ${y2i}`,
    `A ${rInner} ${rInner} 0 ${large} 0 ${x1i} ${y1i}`,
    "Z",
  ].join(" ");
}

const RIPPLE_MS = 360; // durata ripple prima dell'apertura

/**
 * RadialMenu
 * props:
 *  - title, subtitle
 *  - items: [{ key, label, desc? }]
 *  - onOpen: (key) => void
 *  - size (px), inner, outer, startDeg, sweepDeg
 */
export default function RadialMenu({
  title = "Menu",
  subtitle,
  items = [],
  onOpen,
  size = 420,
  inner = 110,
  outer = 190,
  startDeg = -210, // inizio arco (gradi)
  sweepDeg = 240,  // ampiezza totale (gradi)
}) {
  const [hover, setHover] = useState(null);
  const [ripples, setRipples] = useState([]); // id animazioni ripple
  const hoverRef = useRef(null);
  const { playHover, playClick } = useSfx();

  const cx = size / 2;
  const cy = size / 2;

  const segs = useMemo(() => {
    const n = Math.max(items.length, 1);
    const step = sweepDeg / n;
    const gap = Math.min(4, step * 0.08); // piccolo gap visivo
    return items.map((it, i) => {
      const a0 = startDeg + i * step + gap / 2;
      const a1 = startDeg + (i + 1) * step - gap / 2;
      const mid = (a0 + a1) / 2;
      const [tx, ty] = polar(cx, cy, (inner + outer) / 2, mid);
      return { ...it, a0, a1, mid, tx, ty, i };
    });
  }, [items, startDeg, sweepDeg, cx, cy, inner, outer]);

  const triggerRipple = () => {
    const id = (crypto?.randomUUID?.() || `${Date.now()}-${Math.random()}`).toString();
    setRipples((r) => [...r, id]);
    setTimeout(() => setRipples((r) => r.filter((x) => x !== id)), RIPPLE_MS + 80);
  };

  return (
    <div className="w-full max-w-xl mx-auto text-center">
      {/* Header */}
      <h1 className="[font-family:var(--font-display)] text-3xl md:text-4xl font-semibold tracking-wider uppercase">
        <span className="text-cyber-neon">{title}</span>
      </h1>
      {subtitle && <p className="mt-2 text-white/70">{subtitle}</p>}

      {/* Mobile fallback: lista */}
      <ul className="mt-6 grid gap-3 md:hidden">
        {items.map((it) => (
          <li key={it.key}>
            <button
              type="button"
              onClick={() => {
                playClick();
                onOpen?.(it.key);
              }}
              className="group w-full rounded-2xl border border-cyber-azz/40 bg-cyber-azz/10 px-4 py-3 text-left transition hover:bg-cyber-azz/20"
            >
              <div className="relative flex items-center justify-between">
                <div>
                  <div className="text-lg font-medium">{it.label}</div>
                  {it.desc && <div className="text-sm text-white/60">{it.desc}</div>}
                </div>
                <span className="text-cyber-neon">→</span>
              </div>
            </button>
          </li>
        ))}
      </ul>

      {/* Radial (desktop/tablet) */}
      <div className="hidden md:block mt-6">
        <div className="relative mx-auto" style={{ width: size, height: size }}>
          {/* Glow centrale (decorativo) */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(closest-side, rgba(84,193,230,.20), transparent 70%)",
              filter: "blur(12px)",
            }}
            aria-hidden="true"
          />

          <svg
            viewBox={`0 0 ${size} ${size}`}
            width={size}
            height={size}
            className="block mx-auto"
          >
            {/* cerchio base (wireframe) */}
            <circle
                cx={cx}
                cy={cy}
                r={(inner + outer) / 2}
                fill="none"
                stroke="rgba(84,193,230,.35)"
                strokeDasharray="6 8"
                vectorEffect="non-scaling-stroke"
                className="radial-rotor spin-cw"
                aria-hidden="true"
            />

            {segs.map((s) => {
              const active = hover === s.i;
              return (
                <g
                  key={s.key || s.i}
                  className="radial-enter"
                  style={{ animationDelay: `${s.i * 70}ms` }}
                >
                  {/* segmento cliccabile */}
                  <path
                    d={ringSegmentPath(cx, cy, inner, outer, s.a0, s.a1)}
                    fill={active ? "rgba(84,193,230,.28)" : "rgba(84,193,230,.16)"}
                    stroke="rgba(84,193,230,.45)"
                    strokeWidth="1"
                    vectorEffect="non-scaling-stroke"
                    className="cursor-pointer radial-wedge"
                    style={{
                      filter: active ? "drop-shadow(0 0 16px rgba(84,193,230,.55))" : "none",
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label={s.label}
                    onMouseEnter={() => {
                      if (hoverRef.current !== s.i) {
                        playHover();
                        hoverRef.current = s.i;
                      }
                      setHover(s.i);
                    }}
                    onMouseLeave={() => setHover(null)}
                    onFocus={() => setHover(s.i)}
                    onBlur={() => setHover(null)}
                    onMouseDown={(e) => e.preventDefault()} // evita il rettangolo di focus
                    onClick={() => {
                      playClick();
                      triggerRipple();
                      setTimeout(() => onOpen?.(s.key), RIPPLE_MS);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault(); // niente scroll con Space
                        playClick();
                        triggerRipple();
                        setTimeout(() => onOpen?.(s.key), RIPPLE_MS);
                      }
                    }}
                  />

                  {/* label al centro segmento (non interattiva) */}
                  <g transform={`translate(${s.tx},${s.ty})`}>
                    <text
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="select-none pointer-events-none"
                      fill={active ? "rgba(254,232,1,1)" : "rgba(255,255,255,.92)"}
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: 14,
                        letterSpacing: "0.06em",
                      }}
                    >
                      {s.label}
                    </text>
                  </g>
                </g>
              );
            })}

            {/* hub centrale (decorativo) */}
            <circle
              cx={cx}
              cy={cy}
              r={inner - 26}
              fill="none"
              stroke="rgba(254,232,1,.85)"
              strokeWidth="1.5"
              strokeDasharray="2 6"
              vectorEffect="non-scaling-stroke"
              className="radial-rotor spin-ccw"
              aria-hidden="true"
            />
          
            <text
              x={cx}
              y={cy}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="rgba(255,255,255,.9)"
              style={{ fontFamily: "var(--font-display)", fontSize: 12, letterSpacing: "0.12em" }}
              aria-hidden="true"
            >
              SELECT
            </text>
          </svg>

          {/* Ripple layer (centrato) */}
          <div className="ripple-layer">
            {ripples.map((id) => (
              <span key={id} className="ripple-ring" />
            ))}
            {ripples.map((id) => (
              <span key={`${id}-2`} className="ripple-ring ripple-ring--2" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
