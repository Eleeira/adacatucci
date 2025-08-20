import { useEffect, useState } from "react";

export const TRANSITION_MS = 200;

export default function Stage({ show, children }) {
  const [render, setRender] = useState(show);
  const [anim, setAnim] = useState("");

  useEffect(() => {
    if (show) {
      setRender(true);
      requestAnimationFrame(() => setAnim("animate-in"));
    } else if (render) {
      setAnim("animate-out");
      const id = setTimeout(() => setRender(false), TRANSITION_MS);
      return () => clearTimeout(id);
    }
  }, [show, render]);

  if (!render) return null;

  return (
    <div className={`stage-layer transform-gpu ${anim} pointer-events-none`}>
      <div className="pointer-events-auto">{children}</div>
    </div>
  );
}
