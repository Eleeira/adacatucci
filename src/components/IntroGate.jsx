import { useState } from "react";
import { useI18n } from "@/i18n";

export default function IntroGate({ gifSrc, cta, onStart, glitchMs = 140 }) {
  const { t } = useI18n();
  const label = cta ?? t("start");
  const [glitch, setGlitch] = useState(false);

  const handleClick = () => {
    setGlitch(true);
    setTimeout(() => {
      setGlitch(false);
      onStart?.();
    }, glitchMs);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`relative w-[min(84vw,480px)] aspect-square grid place-items-center rounded-full ring-1 ring-white/10 shadow-[0_0_45px_rgba(84,193,230,.25)] ${glitch ? "glitching" : ""}`}
      aria-label={label}
    >
      {/* immagine base */}
      <img
        src={gifSrc}
        alt=""
        className="absolute inset-0 w-full h-full object-contain select-none pointer-events-none"
        draggable={false}
      />
      {/* cloni colorati per il glitch */}
      <img src={gifSrc} alt="" className="intro-img-glitch intro-img-r" draggable={false} />
      <img src={gifSrc} alt="" className="intro-img-glitch intro-img-c" draggable={false} />

      {/* CTA */}
      <span className="chip rounded-none px-5 py-2">
        <span className="[font-family:var(--font-display)] text-[15px] tracking-wide uppercase">{label}</span>
      </span>
    </button>
  );
}