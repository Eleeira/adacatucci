// src/i18n/I18nProvider.jsx
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { locales } from "./locales";

const I18nContext = createContext(null);

export function I18nProvider({ children, defaultLang = "en", persist = true, detect = false }) {
  const [lang, setLang] = useState(defaultLang);

  // load saved lang
  useEffect(() => {
    if (!persist) return;
    try {
      const saved = localStorage.getItem("lang");
      if (saved && locales[saved]) setLang(saved);
    } catch {}
  }, [persist]);

  // auto-detect (optional)
  useEffect(() => {
    if (!detect) return;
    const nav = navigator.language?.slice(0, 2);
    if (nav && locales[nav]) setLang(nav);
  }, [detect]);

  // persist on change
  useEffect(() => {
    if (!persist) return;
    try { localStorage.setItem("lang", lang); } catch {}
  }, [lang, persist]);

  const t = useMemo(() => {
    const dict = locales[lang] || locales.en;
    return (path, vars) => {
      const val = path.split(".").reduce((acc, k) => (acc ? acc[k] : undefined), dict);
      if (val == null) return "";
      const str = String(val);
      if (!vars) return str;
      return str.replace(/\{(\w+)\}/g, (_, k) => (vars[k] ?? `{${k}}`));
    };
  }, [lang]);

  const value = useMemo(() => ({ lang, setLang, t }), [lang, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
