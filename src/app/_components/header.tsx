import Link from "next/link";

const Header = () => {
  return (
    <header className="mb-20 mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <Link
        href="/"
        className="text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight neon-cyan hover:neon-pink transition-all duration-300"
      >
        Post-Quantum Bitcoin
      </Link>
      <Link
        href="/archive"
        className="text-sm font-medium text-cyber-cyan/80 hover:text-cyber-pink transition-colors duration-300 self-start sm:self-auto"
      >
        &larr; Research Archive
      </Link>
    </header>
  );
};

export default Header;
