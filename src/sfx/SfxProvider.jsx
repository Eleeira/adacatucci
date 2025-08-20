import { createContext, useContext, useMemo, useRef, useState } from "react";

const SfxCtx = createContext({ muted: true, setMuted: () => {}, playHover: () => {}, playClick: () => {} });
const LS_KEY = "sfx-muted";

function useAudioEngine() {
  const ctxRef = useRef(null);
  const ensureCtx = async () => {
    if (!ctxRef.current) {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      ctxRef.current = new Ctx();
    }
    if (ctxRef.current.state === "suspended") await ctxRef.current.resume();
    return ctxRef.current;
  };

  const blip = async ({ type = "triangle", freq = 520, to = 0, ms = 120, gain = 0.06 }) => {
    const ctx = await ensureCtx();
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    const f = ctx.createBiquadFilter();
    f.type = "highpass"; f.frequency.value = 220;

    osc.type = type;
    osc.frequency.value = freq;
    const now = ctx.currentTime;
    const end = now + ms / 1000;

    // pitch envelope
    if (to && to !== freq) {
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(Math.max(40, to), end);
    }

    // amp envelope
    g.gain.setValueAtTime(0, now);
    g.gain.linearRampToValueAtTime(gain, now + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, end);

    osc.connect(f); f.connect(g); g.connect(ctx.destination);
    osc.start(now); osc.stop(end + 0.02);
  };

  return { blip };
}

export function SfxProvider({ children, defaultMuted = false }) {
  const [muted, setMuted] = useState(() => (localStorage.getItem(LS_KEY) ?? String(defaultMuted)) === "true");
  const { blip } = useAudioEngine();

  const playHover = () => { if (!muted) blip({ freq: 880, to: 740, ms: 90, gain: 0.045, type: "square" }); };
  const playClick = () => { if (!muted) blip({ freq: 520, to: 220, ms: 120, gain: 0.07, type: "triangle" }); };

  const api = useMemo(() => ({
    muted,
    setMuted: (m) => { localStorage.setItem(LS_KEY, String(m)); setMuted(m); },
    playHover, playClick
  }), [muted]);

  return <SfxCtx.Provider value={api}>{children}</SfxCtx.Provider>;
}

export const useSfx = () => useContext(SfxCtx);
