import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/site/page-shell";
import { PageCta } from "@/components/site/page-cta";
import { posts, getPost, getRelated } from "@/lib/blog-data";
import { getBlogBody } from "@/lib/blog-bodies";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Field notes · IC Vacation" };
  return {
    title: `${post.title} · IC Vacation`,
    description: post.dek,
  };
}


export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = getRelated(slug, 3);
  const blocks = getBlogBody(slug);

  return (
    <PageShell>
      {/* HERO */}
      <article>
        <header className="relative pt-24 lg:pt-28 pb-5 lg:pb-7 bg-background overflow-hidden">
          <img
            src="/dandelion-yellow.svg"
            alt=""
            aria-hidden="true"
            className="absolute -top-12 -right-24 w-[28rem] h-[28rem] opacity-[0.05] animate-drift-slow pointer-events-none"
          />
          <div className="relative z-10 max-w-[860px] mx-auto px-6 lg:px-12">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 label-ticker text-white/55 hover:text-brand-green transition-colors mb-6"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to field notes
            </Link>
            <div className="flex flex-wrap items-center gap-4 label-ticker text-white/55 mb-5">
              <span className="text-brand-green">{post.category}</span>
              <span className="w-1 h-1 rounded-full bg-white/30" />
              <span>{post.date}</span>
              <span className="w-1 h-1 rounded-full bg-white/30" />
              <span>{post.read}</span>
            </div>
            <h1
              className="font-display-tight text-white leading-[0.92] tracking-[-0.03em]"
              style={{ fontSize: "clamp(2.4rem, 6vw, 5.2rem)", textWrap: "balance" }}
            >
              {post.title}
            </h1>
            <p
              className="mt-5 font-editorial italic text-[18px] lg:text-[22px] text-white/75 leading-[1.5]"
              style={{ textWrap: "pretty" }}
            >
              {post.dek}
            </p>
            <div className="mt-6 pt-5 border-t border-foreground/10 flex items-center gap-4">
              <div className="w-11 h-11 rounded-full bg-brand-yellow/15 border border-brand-yellow/40 flex items-center justify-center font-display text-brand-yellow">
                {post.author.charAt(0)}
              </div>
              <div>
                <p className="text-sm text-white">{post.author}</p>
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/45 mt-0.5">
                  IC Vacation · Advisor
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* COVER IMAGE */}
        <div className="relative bg-background pb-6 lg:pb-8">
          <div className="max-w-[900px] mx-auto px-6 lg:px-12">
            <div className="relative aspect-[21/9] overflow-hidden">
              <img
                src={post.image}
                alt=""
                aria-hidden="true"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* BODY */}
        <div className="relative bg-background pb-24">
          <div className="max-w-[720px] mx-auto px-6 lg:px-0">
            {blocks.map((b, i) => {
              if (b.type === "h") {
                return (
                  <h2
                    key={i}
                    className="font-display text-white text-2xl lg:text-3xl leading-tight tracking-tight mt-12 mb-5"
                  >
                    {b.text}
                  </h2>
                );
              }
              if (b.type === "pull") {
                return (
                  <blockquote
                    key={i}
                    className="my-12 border-l-2 border-brand-yellow pl-6 font-serif italic text-white/85 text-[22px] lg:text-[28px] leading-[1.45]"
                    style={{ textWrap: "pretty" }}
                  >
                    {b.text}
                  </blockquote>
                );
              }
              return (
                <p
                  key={i}
                  className={`font-editorial text-[18px] lg:text-[19px] text-white/82 leading-[1.7] mb-6 ${
                    i === 0 ? "drop-cap" : ""
                  }`}
                  style={{
                    textWrap: "pretty",
                    fontVariationSettings: "'opsz' 20",
                  }}
                >
                  {b.text}
                </p>
              );
            })}

            <div className="mt-16 pt-8 border-t border-foreground/10 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.22em] text-white/45">
              <span>Filed under {post.category}</span>
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-brand-green hover:translate-x-0.5 transition-transform"
              >
                All field notes <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </article>

      {/* RELATED */}
      <section className="relative py-20 bg-background border-t border-foreground/10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex items-baseline justify-between mb-10">
            <h3
              className="font-display-tight text-white leading-[0.95]"
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}
            >
              Adjacent
              <span className="font-serif italic text-brand-yellow"> reading.</span>
            </h3>
            <Link
              href="/blog"
              className="hidden lg:inline-flex items-center gap-2 label-ticker text-white/55 hover:text-brand-green transition-colors"
            >
              All entries <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-foreground/10">
            {related.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="group bg-background p-6 flex flex-col gap-3"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-brand-green">
                  {p.category} · {p.read}
                </span>
                <h4
                  className="font-display text-white text-xl lg:text-2xl leading-[1.15] tracking-tight group-hover:text-brand-yellow transition-colors"
                  style={{ textWrap: "balance" }}
                >
                  {p.title}
                </h4>
                <p className="font-editorial italic text-[14px] text-white/55 leading-snug line-clamp-2">
                  {p.dek}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <PageCta
        eyebrow="// Plan a trip"
        title="Read enough?"
        emphasis="Let's build it."
        subtitle="If you'd like Isaac to shape your next trip personally, tell us the shape and we'll come back with one considered plan."
      />
    </PageShell>
  );
}
