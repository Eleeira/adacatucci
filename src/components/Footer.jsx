import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";


/* ---------------- Icons ---------------- */
function GitHubIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.42c.58.11.79-.25.79-.56v-2c-3.22.7-3.9-1.55-3.9-1.55a3.08 3.08 0 0 0-1.29-1.7c-1.06-.73.08-.72.08-.72a2.43 2.43 0 0 1 1.78 1.2 2.47 2.47 0 0 0 3.37 1 2.47 2.47 0 0 1 .74-1.55c-2.57-.29-5.27-1.29-5.27-5.74A4.5 4.5 0 0 1 6 7.38a4.2 4.2 0 0 1 .11-3.1s.97-.31 3.18 1.2a10.96 10.96 0 0 1 5.8 0c2.2-1.51 3.17-1.2 3.17-1.2.22.7.23 1.5.05 2.23a4.5 4.5 0 0 1 1.2 3.13c0 4.46-2.7 5.45-5.28 5.73a2.77 2.77 0 0 1 .79 2.15v3.19c0 .31.21.68.8.56A11.5 11.5 0 0 0 12 .5Z" fill="currentColor"/>
    </svg>
  );
}

function LinkedInIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="currentColor" d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.5 8.98h3v11.5h-3V8.98Zm6.25 0h2.88v1.57h.04c.4-.76 1.39-1.57 2.86-1.57 3.06 0 3.62 2.01 3.62 4.63v6.87h-3V14.6c0-1.2-.02-2.75-1.68-2.75-1.69 0-1.95 1.32-1.95 2.66v5.97h-3V8.98Z"/>
    </svg>
  );
}



/* ---------------- Helpers ---------------- */
const pad = (n) => String(n).padStart(2, "0");
const formatUptime = (s) => {
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return `${pad(h)}:${pad(m)}:${pad(sec)}`;
};

/* ---------------- Subcomponents ---------------- */
function StatusBar() {
  const [uptime, setUptime] = useState(0);
  const [ping, setPing] = useState(22);

  useEffect(() => {
    const t0 = Date.now();
    const iv1 = setInterval(() => setUptime(Math.floor((Date.now() - t0) / 1000)), 1000);
    const iv2 = setInterval(() => {
      // finto ping con jitter morbido
      setPing((p) => {
        let next = p + (Math.random() * 6 - 3);
        next = Math.max(8, Math.min(42, next));
        return Math.round(next);
      });
    }, 1100);
    return () => { clearInterval(iv1); clearInterval(iv2); };
  }, []);

  return (
    <div className="status-bar">
      <div className="status-inner">
        <span className="status-dot" aria-hidden="true">●</span>
        <span className="font-mono text-xs text-white/85">LIVE</span>
        <span aria-hidden="true" className="sep">•</span>
        <span className="font-mono text-xs text-white/85">Uptime: {formatUptime(uptime)}</span>
        <span aria-hidden="true" className="sep">•</span>
        <span className="font-mono text-xs text-white/85">Ping: {ping}ms</span>
      </div>
    </div>
  );
}

function Marquee() {
  const items = [
    " | ",
    "ADINA DIGITAL SERVICES",
    "NOW BOOKING Q4 2025",
    "REACT • VITE • TAILWIND",
    "NEON UI • MOTION • A11Y",
    "LET’S BUILD SOMETHING WILD",
  ];
  // raddoppio il contenuto per loop seamless
  const row = [...items, ...items, ...items];
  return (
    <div className="marquee-wrap" aria-hidden="true">
      <div className="marquee-track">
        {row.map((t, i) => (
          <span key={i} className="marquee-item">{t}</span>
        ))}
      </div>
    </div>
  );
}




/* ---------------- Footer ---------------- */
export default function Footer() {
  const year = useMemo(() => new Date().getFullYear(), []);
  return (
    <footer role="contentinfo" className="footer-glass relative mt-16 border-t border-white/10">
      {/* neon divider */}
      <div className="neon-divider" aria-hidden="true" />
      {/* scanlines sottili */}
      <div className="footer-scan" aria-hidden="true" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-6 sm:px-6 sm:py-8 grid gap-6 md:gap-10 md:grid-cols-3 md:place-items-center">
        {/* Brand */}
        <div className="text-left">
          <h3 className="[font-family:var(--font-display)] text-2xl font-semibold tracking-wide">
            <span className="text-cyber-neon">ADA</span> <span className="text-white/80">Digital_Services</span>
          </h3>
          <p>Your Human Digital Assistant, always one step ahead.</p>
        




          {/* Social */}
          <div className="mt-4 flex gap-2">
            <a className="social-btn" href="https://github.com/eleeira" target="_blank" rel="noreferrer" aria-label="GitHub">
              <GitHubIcon className="w-4 h-4" />
            </a>
            
            <a className="social-btn" href="https://www.linkedin.com/in/adadigitalservices/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <LinkedInIcon className="w-4 h-4" />
            </a>
        
          </div>
        </div>

        

        {/* Contatti */}
        <div className="grid gap-2">
          <div className="text-white/60 text-xs uppercase tracking-wider">Contact</div>
          <a className="link-neon" href="mailto:adacatucci@proton.me">adacatucci@proton.me</a>
          <span className="text-white/70 text-sm">Bromma, SE</span>
          <span className="text-white/70 text-sm">UTC+1/+2 (CET/CEST)</span>
        </div>



        {/* Mini-log / credits */}
<div className="grid gap-2">
  <div className="text-white/60 text-xs uppercase tracking-wider">Build</div>
  <ul className="text-white/70 text-sm space-y-1">
    <li>React • Vite • Tailwind</li>
    <li>i18n, modali, menu radiale</li>
    <li>FX: scanlines, iris, ripple</li>
    <li className="pt-2">
      <nav className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <Link to="/privacy-policy" className="hover:underline">Privacy Policy</Link>
        {/* opzionale separatore e altri link */}
        {/* <span aria-hidden className="opacity-40">•</span>
        <Link to="/cookies" className="hover:underline">Cookies</Link> */}
      </nav>
    </li>
  </ul>
</div></div>



      {/* Marquee glitch */}
      <Marquee />
      



      {/* Status bar */}
      <StatusBar />

      {/* bottom bar */}
      <div className="footer-bottom relative z-10 border-t border-white/10 px-6 py-4 text-center text-white/60 text-xs">
       <div>
          © {new Date().getFullYear()} {t.brand} ·{" "}
          <a
          href="https://beaniestech.dev/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-[var(--clr-primary-600)] transition-colors"
        >
        designed & built by BEANIES.TECH
      </a>
    </div>
      </div>
    </footer>
  );
}
