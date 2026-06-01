import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-black/95 text-zinc-400">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-zinc-500">
            Ulquiorra Cifer
          </p>
          <p>
            A hollow record of emptiness, power, and philosophy.
          </p>
          <p>
            Cuantro-Espada
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-[11px] uppercase tracking-[0.24em] text-zinc-300">
          <Link to="/" className="hover:text-white">
            Home
          </Link>
          <Link to="/about" className="hover:text-white">
            About
          </Link>
          <Link to="/articles" className="hover:text-white">
            Articles
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
