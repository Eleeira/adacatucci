import { useEffect } from "react";

export const WIPE_DURATION = 520;

export default function ScreenWipe({ play = false, mode = "both", onDone }) {
  useEffect(() => {
    if (!play) return;
    const id = setTimeout(() => onDone?.(), WIPE_DURATION);
    return () => clearTimeout(id);
  }, [play, onDone]);

  if (!play) return null;

  return (
    <div className="fx-overlay z-50">
      {/* grana */}
      <div className="absolute inset-0 fx-grain" />
      {/* scanlines */}
      {(mode === "scan" || mode === "both") && (
        <div className="absolute inset-0 fx-scan" />
      )}
      {/* iris */}
      {(mode === "iris" || mode === "both") && (
        <div className="absolute inset-0 fx-iris" />
      )}
    </div>
  );
}
