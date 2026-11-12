import Container from "@/app/_components/container";
import { HeroPost } from "@/app/_components/hero-post";
import { Intro } from "@/app/_components/intro";
import { MoreStories } from "@/app/_components/more-stories";
import { getAllPosts } from "@/lib/api";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Research Archive | Post-Quantum Bitcoin",
  description:
    "2025-2026 research articles, vulnerability assessments, and conference presentations on Bitcoin and quantum computing.",
};

export default function ArchivePage() {
  const allPosts = getAllPosts();

  const heroPost = allPosts[0];

  const morePosts = allPosts.slice(1);

  return (
    <main>
      <Container>
        <nav aria-label="Archive navigation" className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-cyber-dark-alt/80 text-cyber-cyan border border-cyber-cyan/40 hover:bg-cyber-pink/15 hover:text-cyber-pink hover:border-cyber-pink hover:shadow-[0_0_12px_rgba(255,0,110,0.35)] transition-all duration-300"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            <span>Back to Home</span>
          </Link>
        </nav>
        <Intro />
        {heroPost && (
          <HeroPost
            title={heroPost.title}
            coverImage={heroPost.coverImage}
            date={heroPost.date}
            author={heroPost.author}
            slug={heroPost.slug}
            excerpt={heroPost.excerpt}
          />
        )}
        {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        {allPosts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-cyber-cyan/70">
              No posts yet. Check back soon!
            </p>
          </div>
        )}
      </Container>
    </main>
  );
}
