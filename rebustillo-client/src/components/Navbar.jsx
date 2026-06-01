import { NavLink } from 'react-router-dom';
import logoImage from '../assets/logo.jpg';

const links = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Articles', to: '/articles' },
  ({ label: 'Sign In', to: '/auth/signin' }),
  ({ label: 'Sign Up', to: '/auth/signup' }),
];

const navLinkClassName = ({ isActive }) =>
  [
    'rounded-full border-2 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] transition',
    isActive
      ? 'border-white bg-white text-black'
      : 'border-transparent text-zinc-300 hover:border-white hover:bg-white/10 hover:text-white',
  ].join(' ');

const NavBar = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <NavLink to="/" className="flex items-center gap-3">
          <img
            src={logoImage}
            alt="Ulquiorra Cifer logo"
            className="h-10 w-10 rounded-full border-2 border-zinc-900 object-cover"
          />
          <div className="space-y-0.5">
            <p className="text-xl font-bold text-white">Ulquiorra Cifer</p>
          </div>
        </NavLink>

        <nav className="hidden items-center gap-2 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={navLinkClassName}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default NavBar;