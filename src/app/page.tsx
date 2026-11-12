import Container from "@/app/_components/container";
import Link from "next/link";

export default function Index() {
  return (
    <main className="min-h-[calc(100vh-12rem)] flex flex-col justify-center py-16 md:py-24">
      <Container>
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tighter leading-tight text-gradient-cyber animate-pulse-neon mb-6">
            Post-Quantum Bitcoin
          </h1>

          <p className="text-lg sm:text-xl text-cyber-cyan max-w-2xl mx-auto mb-12">
            Exploring the intersection of Bitcoin and Quantum Computing
          </p>

          <section
            aria-labelledby="revamp-heading"
            className="cyber-gradient neon-border-cyan border rounded-2xl p-8 sm:p-10 text-left shadow-md"
          >
            <h2
              id="revamp-heading"
              className="text-xl sm:text-2xl font-semibold text-white mb-4"
            >
              A New Focus for Post-Quantum Bitcoin
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              We are expanding and restructuring this site from a personal
              research blog into a general, objective informational resource
              covering all aspects of Bitcoin&rsquo;s post-quantum transition.
            </p>
            <p className="text-gray-300 leading-relaxed mb-8">
              While the updated site is being prepared, all prior articles,
              vulnerability assessments, and conference presentations remain
              available in the archive.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center pt-6 border-t border-cyber-cyan/20">
              <Link
                href="/archive"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm bg-cyber-cyan/10 text-cyber-cyan border border-cyber-cyan/60 hover:bg-cyber-pink/15 hover:text-cyber-pink hover:border-cyber-pink hover:shadow-[0_0_16px_rgba(255,0,110,0.4)] transition-all duration-300"
              >
                <span>View Previous Page &amp; Archive</span>
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
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </Link>
            </div>
          </section>
        </div>
      </Container>
    </main>
  );
}
