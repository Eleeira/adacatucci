import { useSfx } from "@/sfx/SfxProvider";

export default function MuteToggle({ className = "" }) {
  const { muted, setMuted } = useSfx();
  return (
    <button
      type="button"
      onClick={() => setMuted(!muted)}
      className={`btn px-2 py-1 rounded-none ${className}`}
      aria-pressed={!muted}
      aria-label={muted ? "Unmute sounds" : "Mute sounds"}
      title={muted ? "Unmute sounds" : "Mute sounds"}
    >
      <span className="text-lg align-middle">{muted ? "🔇" : "🔊"}</span>
    </button>
  );
}
