import { useMemo, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { marked } from "marked";
import { posts as ALL_POSTS } from "@/blog/posts";
import hero from "@/assets/images/hero.png";

export default function BlogPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = useMemo(() => ALL_POSTS.find(p => p.id === id), [id]);

  useEffect(() => { window.scrollTo(0,0); }, [id]);

  if (!post) {
    return (
      <main className="min-h-dvh grid place-items-center text-white">
        <div className="text-center space-y-3">
          <p className="text-white/70">Post not found.</p>
          <button className="btn rounded-none px-3 py-2" onClick={() => navigate("/blog")}>← Back to blog</button>
        </div>
      </main>
    );
  }

  const html = useMemo(() => marked.parse(post.content || ""), [post.content]);

  return (
    <main className="min-h-dvh flex flex-col relative text-white">
      {/* background */}
      <div className="absolute inset-0 -z-20 bg-cover bg-center" style={{ backgroundImage: `url(${hero})` }} />
      <div className="absolute inset-0 -z-10 bg-black/70" />

      <div className="relative z-10 max-w-3xl mx-auto w-full px-6 pt-16 pb-10">
        <div className="flex items-center justify-between gap-4 mb-3">
          <h1 className="[font-family:var(--font-display)] text-3xl font-semibold tracking-wide">
            <span className="text-cyber-neon">{post.title}</span>
          </h1>
          <Link to="/blog" className="btn rounded-none px-3 py-1.5">← Blog</Link>
        </div>
        <div className="text-white/60 text-sm">{post.date}</div>

        <article
          className="glass rounded-2xl p-5 mt-5 leading-relaxed text-white/90"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </main>
  );
}
