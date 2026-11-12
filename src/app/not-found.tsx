import Container from "@/app/_components/container";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex-1 flex flex-col justify-center py-12">
      <Container>
        <div className="max-w-xl mx-auto text-center">
          <p className="text-sm font-mono uppercase tracking-widest text-cyber-pink mb-3">
            Error 404
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tighter text-gradient-cyber mb-4">
            Page Not Found
          </h1>
          <p className="text-gray-300 leading-relaxed mb-8">
            The page you are looking for does not exist or has moved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm bg-cyber-cyan/10 text-cyber-cyan border border-cyber-cyan/60 hover:bg-cyber-pink/15 hover:text-cyber-pink hover:border-cyber-pink hover:shadow-[0_0_16px_rgba(255,0,110,0.4)] transition-all duration-300"
            >
              <span>Return Home</span>
            </Link>
            <Link
              href="/archive"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg font-medium text-sm bg-cyber-dark-alt/80 text-gray-300 border border-cyber-cyan/30 hover:text-cyber-cyan hover:border-cyber-cyan/70 transition-all duration-300"
            >
              <span>Browse Research Archive</span>
            </Link>
          </div>
        </div>
      </Container>
    </main>
  );
}
