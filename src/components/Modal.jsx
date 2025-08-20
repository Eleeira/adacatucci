import { useEffect, useRef, useState } from "react";
import { TRANSITION_MS } from "@/components/Stage";
import { useI18n } from "@/i18n";

export default function Modal({
  open,
  title,
  onClose,
  children,
  backLabel,          
  className = "",
}) {
  const backRef = useRef(null);
  const [closing, setClosing] = useState(false);
  const { t } = useI18n();
  const label = backLabel ?? t("back");

  useEffect(() => {
    if (!open) return;
    setClosing(false);
    backRef.current?.focus();
    const onKey = (e) => e.key === "Escape" && handleClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  if (!open) return null;

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => onClose?.(), TRANSITION_MS);
  };

  return (
    <div className="fixed inset-0 z-[1000] grid place-items-center">
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/90 backdrop-blur-[1.5px]"
        aria-hidden
        onClick={handleClose}
      />
      {/* panel */}
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className={`glass relative z-10 rounded-2xl p-6
              w-[min(96vw,980px)] max-h-[min(86vh,780px)] overflow-y-auto
              ${closing ? "animate-out" : "animate-in"} ${className}`}
      >
        <header className="flex items-center justify-between gap-4">
          <h2
            id="modal-title"
            className="[font-family:var(--font-display)] text-2xl font-semibold tracking-wide"
          >
            <span className="text-cyber-neon">{title}</span>
          </h2>

          {/* Bottone BACK: rettangolare + solo testo */}
          <button
            ref={backRef}
            type="button"
            onClick={handleClose}
            className="btn rounded-none px-3 py-1.5"
            aria-label={label}
          >
            {label}
          </button>
        </header>

        <div className="mt-5">{children}</div>
      </section>
    </div>
  );
}

