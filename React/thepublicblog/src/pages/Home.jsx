import { useNavigate } from "react-router-dom";
import { PenLine, BookOpen, Users } from "lucide-react";

export default function Home() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <PenLine size={22} strokeWidth={1.5} />,
      title: "Write freely",
      desc: "A distraction-free editor built for people who love words.",
    },
    {
      icon: <BookOpen size={22} strokeWidth={1.5} />,
      title: "Read everything",
      desc: "Discover stories, ideas, and perspectives from writers worldwide.",
    },
    {
      icon: <Users size={22} strokeWidth={1.5} />,
      title: "Build an audience",
      desc: "Share your voice with readers who are genuinely interested.",
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-default">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span
            className="font-display font-bold text-[20vw] leading-none"
            style={{ color: "var(--border-subtle)" }}
          >
            Words.
          </span>
        </div>
        <div className="relative max-w-4xl mx-auto px-6 py-32 text-center fade-in">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-default bg-surface text-xs text-muted mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-amber inline-block" />
            Open to everyone. Free forever.
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-semibold leading-tight tracking-tight text-foreground mb-6">
            Your ideas deserve{" "}
            <span className="text-amber italic">to be heard.</span>
          </h1>
          <p className="text-lg md:text-xl text-muted font-light max-w-xl mx-auto mb-10 leading-relaxed">
            ThePublicBlog is a place where anyone can write, share stories,
            and connect with curious readers around the world.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => navigate("/signup")}
              className="px-8 py-3.5 bg-amber text-[oklch(0.08_0_0)] font-medium rounded-xl hover:opacity-90 transition-opacity text-sm"
            >
              Start writing today
            </button>
            <button
              onClick={() => navigate("/all-posts")}
              className="px-8 py-3.5 border border-default text-foreground font-medium rounded-xl hover:bg-surface-raised transition-colors text-sm"
            >
              Browse posts
            </button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-6 py-20 stagger">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map(({ icon, title, desc }) => (
            <div
              key={title}
              className="fade-in p-6 rounded-2xl border border-default bg-surface hover:border-amber/40 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-glow flex items-center justify-center text-amber mb-4">
                {icon}
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                {title}
              </h3>
              <p className="text-sm text-muted leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-default bg-surface">
        <div className="max-w-3xl mx-auto px-6 py-16 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-4">
            Ready to share your story?
          </h2>
          <p className="text-muted mb-8 font-light">
            Join thousands of writers publishing on ThePublicBlog.
          </p>
          <button
            onClick={() => navigate("/signup")}
            className="px-8 py-3.5 bg-amber text-[oklch(0.08_0_0)] font-medium rounded-xl hover:opacity-90 transition-opacity text-sm"
          >
            Create a free account
          </button>
        </div>
      </section>
    </>
  );
}