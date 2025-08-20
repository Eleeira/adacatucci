import { useI18n } from "@/i18n";

export default function ContactPanel({
  email    = "adacatucci@proton.me",
  linkedin = "https://www.linkedin.com/in/adadigitalservices/",
  github   = "https://github.com/Eleeira",
}) {
  const { t } = useI18n();
  const T = (k, fb) => t(k) || fb;
  const enc = encodeURIComponent;

  const mailto = () => {
    const subject = T("contact.panel.subject", "Contact — Portfolio");
    const body    = T("contact.panel.bodyIntro", "Hi Adina,");
    window.location.href = `mailto:${email}?subject=${enc(subject)}&body=${enc(body)}`;
  };

  return (
    <section className="space-y-6 text-white/85 leading-relaxed">
      {/* Header */}
      <header className="space-y-1">
        <h3 className="[font-family:var(--font-display)] text-2xl font-semibold tracking-wide">
          <span className="text-cyber-neon">
            {T("contact.panel.title", "Let’s talk")}
          </span>
        </h3>
        <p className="text-white/80 text-sm">
          {T("contact.panel.subtitle", "Quick links to reach me.")}
        </p>
      </header>

      {/* Actions */}
      <div className="grid gap-2 sm:grid-cols-3">
        <button
          type="button"
          onClick={mailto}
          className="btn rounded-none px-3 py-2 text-center"
        >
          ✉️ {T("contact.panel.email", "Email")}
        </button>

        <a
          href={linkedin}
          target="_blank"
          rel="noreferrer"
          className="btn rounded-none px-3 py-2 text-center"
        >
          in {T("contact.panel.linkedin", "LinkedIn")}
        </a>

        <a
          href={github}
          target="_blank"
          rel="noreferrer"
          className="btn rounded-none px-3 py-2 text-center"
        >
          ⧉ {T("contact.panel.github", "GitHub")}
        </a>
      </div>

      {/* Tiny meta (facoltativo ma carino) */}
      <div className="flex flex-wrap items-center gap-2 text-xs text-white/60">
        <span className="chip rounded-md px-2 py-1">Bromma, SE</span>
        <span className="chip rounded-md px-2 py-1">CET/CEST</span>
      </div>
    </section>
  );
}
