import { useI18n } from "@/i18n";


export default function ServicesPanel() {
  const { t } = useI18n();

  const split = (k) => (t(k) || "").split("|").map(s => s.trim()).filter(Boolean);

  const basicIncludes    = split("services.panel.basic.includes");
  const standardIncludes = split("services.panel.standard.includes");
  const nightIncludes    = split("services.panel.night.includes");
  const creativeIncludes = split("services.panel.creatives.includes");

  return (
    <section className="space-y-6 text-white/85 leading-relaxed">
      {/* Header */}
      <header className="space-y-2">
        <h3 className="[font-family:var(--font-display)] text-2xl font-semibold tracking-wide">
          <span className="text-cyber-neon">{t("services.panel.heroTitle")}</span>
        </h3>
        <p className="text-white/80">{t("services.panel.heroSubtitle")}</p>
      </header>

      {/* Billing notes */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="chip rounded-md px-2 py-1 text-xs">{t("services.panel.vatNote")}</span>
        <span className="chip rounded-md px-2 py-1 text-xs">
          {t("services.panel.billingVia")} <strong className="ml-1">Frilans&nbsp;Finans</strong>
        </span>
      </div>

      {/* Grid */}
      <div className="grid gap-4 sm:grid-cols-2">
        <TierCard
          emoji="💪"
          title={t("services.panel.basic.title")}
          subtitle={t("services.panel.basic.subtitle")}
          items={basicIncludes}
          price={t("services.panel.basic.price")}
        />

        <TierCard
          emoji="🔋"
          title={t("services.panel.standard.title")}
          subtitle={t("services.panel.standard.subtitle")}
          items={standardIncludes}
          price={t("services.panel.standard.price")}
          highlight
        />

        <TierCard
          emoji="🌙"
          title={t("services.panel.night.title")}
          subtitle={t("services.panel.night.subtitle")}
          items={nightIncludes}
          ctaLabel={t("services.panel.night.cta")}
          onCta={() =>
            window.open(`mailto:${LINKS.email}?subject=${encodeURIComponent("Services - Night/Custom Quote")}`)
          }
        />

        <TierCard
          emoji="👩‍💻"
          title={t("services.panel.creatives.title")}
          subtitle={t("services.panel.creatives.subtitle")}
          items={creativeIncludes}
        />
      </div>
    </section>
  );
}

/* ---------- subcomponents ---------- */
function TierCard({ emoji, title, subtitle, items = [], price, ctaLabel, onCta, highlight = false }) {
  return (
    <article
      className={`glass p-4 rounded-2xl ${highlight ? "ring-1 ring-cyber-neon/40" : ""}`}
    >
      <header className="mb-2">
        <h4 className="[font-family:var(--font-display)] text-white/95 text-base tracking-wide flex items-center gap-2">
          <span aria-hidden>{emoji}</span>
          <span className="text-cyber-neon">{title}</span>
        </h4>
        {subtitle && <p className="text-white/70 text-sm mt-1">{subtitle}</p>}
      </header>

      {!!items.length && (
        <ul className="space-y-1.5 text-sm">
          {items.map((line, i) => (
            <li key={i}>• {line}</li>
          ))}
        </ul>
      )}

      {price && (
        <div className="mt-3 text-sm text-white/85">
          <span className="chip rounded-md px-2 py-1">{price}</span>
        </div>
      )}

      {ctaLabel && (
        <div className="mt-3">
          <button type="button" onClick={onCta} className="btn rounded-md px-3 py-2">
            {ctaLabel}
          </button>
        </div>
      )}
    </article>
  );
}
