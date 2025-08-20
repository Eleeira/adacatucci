import { I18nProvider, useI18n } from "@/i18n";

export default function LanguageToggle({ className = "" }) {
  const { lang, setLang } = useI18n();
  
  const langs = [{ code: "en", label: "EN" }, { code: "it", label: "IT" }, { code: "sv", label: "SV" }];
  
  
  return (
    <div className={`flex gap-2 ${className}`}>
      {langs.map((l) => (
        <button
          key={l.code}
          type="button"
          onClick={() => setLang(l.code)}
          className={`btn px-4 py-1 rounded-none ${lang === l.code ? "ring-1 ring-cyber-neon/60" : ""}`}
          aria-pressed={lang === l.code}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}
