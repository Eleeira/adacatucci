import { useMemo } from "react";
import { useI18n } from "@/i18n";
import hero from "@/assets/images/hero.png";
import LanguageToggle from "@/components/LanguageToggle";
import MuteToggle from "@/components/MuteToggle";
import Footer from "@/components/Footer";
import { Link, useSearchParams } from "react-router-dom";
import { posts as ALL_POSTS } from "@/blog/posts";

function groupMonths(posts) {
  // ritorna un array tipo [{key:"2025-08", label:"2025-08", count:3}, ...] desc
  const map = new Map();
  for (const p of posts) {
    const ym = (p.date || "").slice(0, 7);
    if (!ym) continue;
    map.set(ym, (map.get(ym) || 0) + 1);
  }
  return Array.from(map.entries())
    .sort((a, b) => b[0].localeCompare(a[0]))
    .map(([key, count]) => ({ key, label: key, count }));
}

export default function BlogPage() {
  const { t } = useI18n();
  const [params, setParams] = useSearchParams();
  const month = params.get("m"); 

  const posts = useMemo(() => {
    const sorted = [...ALL_POSTS].sort((a, b) => b.date.localeCompare(a.date));
    return month ? sorted.filter(p => p.date.startsWith(month)) : sorted;
  }, [month]);

  const months = useMemo(() => groupMonths(ALL_POSTS), []);

  return (
    <main className="min-h-dvh flex flex-col relative text-white">
      {/* background */}
      <div className="absolute inset-0 -z-20 bg-cover bg-center" style={{ backgroundImage: `url(${hero})` }} />
      <div className="absolute inset-0 -z-10 bg-black/70" />

      {/* controls */}
      <div className="absolute top-4 right-4 z-40 flex gap-2">
        <MuteToggle />
        <LanguageToggle />
      </div>

      {/* header */}
      <header className="relative z-10 max-w-5xl mx-auto w-full px-6 pt-16">
        <div className="flex items-center justify-between gap-4">
          <h1 className="[font-family:var(--font-display)] text-3xl sm:text-4xl font-semibold tracking-wide">
            <span className="text-cyber-neon">Blog</span>
          </h1>
          <Link
            to="/"
            state={{ startAt: "menu" }}
            replace
            className="btn rounded-none px-3 py-1.5"
          >
            ← {t("back")}
          </Link>
        </div>
        <p className="mt-2 text-white/80">Notes, experiments, and case studies.</p>

        {/* Archivio: pilloline filtro mese */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setParams({})}
            className={`btn rounded-none px-2 py-1 text-xs ${!month ? "ring-2 ring-cyber-neon/40" : ""}`}
          >
            All
          </button>
          {months.map(m => (
            <button
              key={m.key}
              type="button"
              onClick={() => setParams({ m: m.key })}
              className={`btn rounded-none px-2 py-1 text-xs ${month === m.key ? "ring-2 ring-cyber-neon/40" : ""}`}
              title={`${m.key} (${m.count})`}
            >
              {m.label} <span className="text-white/60">({m.count})</span>
            </button>
          ))}
        </div>
      </header>

      {/* content */}
      <section className="relative z-10 flex-1 w-full max-w-5xl mx-auto px-6 py-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <article key={p.id} className="glass rounded-none p-4 flex flex-col">
              <div className="text-xs text-white/60">
                {new Date(p.date).toLocaleDateString()}
              </div>
              <h3 className="[font-family:var(--font-display)] text-lg mt-1 text-cyber-neon">
                {p.title}
              </h3>
              <p className="text-sm text-white/80 mt-2 flex-1">{p.excerpt}</p>
              <Link
                to={`/blog/${p.id}`}
                className="btn rounded-none px-3 py-1.5 mt-3 self-start"
              >
                Read
              </Link>
            </article>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
