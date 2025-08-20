import { useI18n } from "@/i18n";


export default function AboutPanel({
 
  links = {
    cv: "src/assets/adinacv.pdf",
    github: "https://github.com/Eleeira",
    linkedin: "https://www.linkedin.com/in/adadigitalservices",
  },
}) {
  const { t } = useI18n();

  // Liste derivate dalle stringhe pipe-separated
  const certs = (t("about.panel.certs") || "").split("|").map((s) => s.trim()).filter(Boolean);
  const what  = (t("about.panel.what")  || "").split("|").map((s) => s.trim()).filter(Boolean);

  const langs = [
    { code: "it", label: t("about.panel.langs.it.label"), hint: t("about.panel.langs.it.hint") },
    { code: "gb", label: t("about.panel.langs.en.label"), hint: t("about.panel.langs.en.hint") }, // flag-icons: GB per EN
    { code: "fr", label: t("about.panel.langs.fr.label"), hint: t("about.panel.langs.fr.hint") },
    { code: "es", label: t("about.panel.langs.es.label"), hint: t("about.panel.langs.es.hint") },
    { code: "se", label: t("about.panel.langs.sv.label"), hint: t("about.panel.langs.sv.hint") },
  ];

  return (
    <section className="space-y-6 text-white/85 leading-relaxed">
      {/* Intro */}
      <div className="space-y-3">
        <p>{t("about.panel.p1")}</p>
        <p>{t("about.panel.p2")}</p>
        <p>{t("about.panel.p3")}</p>
        <p>{t("about.panel.p4")}</p>
      </div>

      {/* Divider neon */}
      <div
        className="h-px w-full"
        style={{
          background: "linear-gradient(90deg, transparent, var(--color-cyber-neon), transparent)",
          boxShadow: "0 0 10px color-mix(in oklab, var(--color-cyber-neon) 60%, transparent)",
        }}
        aria-hidden="true"
      />

      {/* Quick facts */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Card title={t("about.panel.certsTitle")}>
          <ul className="space-y-1.5 text-sm">
            {certs.map((line, i) => <li key={i}>{line}</li>)}
          </ul>
        </Card>

        <Card title={t("about.panel.whatTitle")}>
          <ul className="space-y-1.5 text-sm">
            {what.map((line, i) => <li key={i}>• {line}</li>)}
          </ul>
        </Card>
      </div>

      {/* Languages */}
      <div className="space-y-2">
        <h4 className="text-white/80 text-sm uppercase tracking-wider">{t("about.panel.langsTitle")}</h4>
        <div className="flex flex-wrap gap-2">
          {langs.map((L) => (
            <LangChip key={L.code} code={L.code} label={L.label} hint={L.hint} />
          ))}
        </div>
      </div>

      {/* CTA / Links */}
      <div className="flex flex-wrap gap-2 pt-2">
        <a href={links.cv} target="_blank" rel="noreferrer" className="btn rounded-md px-3 py-2">
          📄 {t("about.panel.cta.cv")}
        </a>
        <a href={links.github} target="_blank" rel="noreferrer" className="btn rounded-md px-3 py-2">
          GitHub
        </a>
        <a href={links.linkedin} target="_blank" rel="noreferrer" className="btn rounded-md px-3 py-2">
          LinkedIn
        </a>
      </div>
    </section>
  );
}

/* ---------- subcomponents ---------- */
function Card({ title, children }) {
  return (
    <div className="glass p-4 rounded-2xl">
      <h4 className="[font-family:var(--font-display)] text-white/95 text-base tracking-wide mb-2">
        <span className="text-cyber-neon">{title}</span>
      </h4>
      {children}
    </div>
  );
}

function LangChip({ code, label, hint }) {
  return (
    <span className="chip rounded-md px-2 py-1 text-xs inline-flex items-center gap-1">
      {/* usa flag-icons già importato nel tuo index.css */}
      <span className={`fi fi-${code}`} aria-hidden style={{ fontSize: 14 }} />
      <span>{label}</span>
      {hint && <span className="text-white/60">({hint})</span>}
    </span>
  );
}
