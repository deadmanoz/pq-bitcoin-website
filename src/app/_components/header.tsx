import Link from "next/link";

const Header = () => {
  return (
    <h2 className="text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight mb-20 mt-8 flex items-center">
      <Link href="/" className="neon-cyan hover:neon-pink transition-all duration-300">
        Post-Quantum Bitcoin
      </Link>
    </h2>
  );
};

export default Header;
