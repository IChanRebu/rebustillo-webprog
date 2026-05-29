import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import AuthService from '../services/AuthService.js';

const inputClasses = 
  'mt-2 w-full rounded-xl border border-gray-700 bg-black px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-gray-500 focus:bg-gray-900';

const actionButtonClassName = 'w-full rounded-xl py-3 text-[11px] tracking-[0.2em]';

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError('Both email and password are required to enter.');
      return;
    }

    try {
      setError('');
      const response = await AuthService.login({ email, password });

      if (response.type === 'viewer') {
        setError('Viewers are not allowed to log in to the dashboard.');
        return;
      }

      AuthService.setAuth({
        token: response.token,
        type: response.type,
        firstName: response.firstName,
        email: response.user,
      });

      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Unable to sign in.');
    }
  };

  return (
    <>
      <div className="mb-8">
        <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gray-400 mb-6">
          Espada Access
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl mb-4">Enter the Abyss</h1>
        <p className="text-base leading-7 text-gray-300">
          Access your Hollow account. Only the worthy shall pass through the veil of nihility.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-12 space-y-6 bg-white/5 rounded-2xl border border-gray-700 p-8">
        <div>
          <label htmlFor="signin-email" className="text-sm font-semibold text-gray-300 uppercase tracking-[0.1em]">
            Email Address
          </label>
          <input
            id="signin-email"
            type="email"
            placeholder="hollow@aizen.com"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className={inputClasses}
          />
        </div>

        <div>
          <label htmlFor="signin-password" className="text-sm font-semibold text-gray-300 uppercase tracking-[0.1em]">
            Spiritual Pressure (Password)
          </label>
          <input
            id="signin-password"
            type="password"
            placeholder="••••••••"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className={inputClasses}
          />
          <p className="mt-3 text-xs leading-5 text-gray-400">
            Minimum 8 characters with letters, numbers, and symbols required.
          </p>
        </div>

        {error && (
          <div className="rounded-xl border border-red-500 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {error}
          </div>
        )}

        <div className="flex items-center justify-between gap-4 text-sm">
          <label className="flex items-center gap-2 text-gray-300">
            <input type="checkbox" className="h-4 w-4 rounded border-gray-700 accent-white" />
            <span>Remember this vessel</span>
          </label>
          <button type="button" className="font-medium text-gray-400 transition hover:text-gray-200">
            Regain Access?
          </button>
        </div>

        <Button type="submit" variant="primary" className={actionButtonClassName}>
          Enter
        </Button>

        <div className="grid gap-3 pt-2 sm:grid-cols-2">
          <Button type="button" variant="secondary" className={actionButtonClassName}>
            Continue with Google
          </Button>
          <Button type="button" variant="secondary" className={actionButtonClassName}>
            Continue with Apple
          </Button>
        </div>
      </form>

      <div className="mt-8 pt-6 text-sm text-gray-400">
        Not yet awakened?{' '}
        <Link to="/auth/signup" className="font-semibold text-white transition hover:text-gray-300">
          Join the Espada
        </Link>
      </div>
    </>
  );
};

export default SignInPage;