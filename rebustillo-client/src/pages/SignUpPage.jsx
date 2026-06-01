import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import AuthService from '../services/AuthService.js';

const inputClasses = 
  'mt-2 w-full rounded-xl border border-gray-700 bg-black px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-gray-500 focus:bg-gray-900';

const actionButtonClassName = 'w-full rounded-xl py-3 text-[11px] tracking-[0.2em]';

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [type, setType] = useState('editor');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !username.trim() ||
      !email.trim() ||
      !password.trim() ||
      !age.trim() ||
      !gender.trim()
    ) {
      setError('All fields are required to create an account.');
      return;
    }

    try {
      setError('');
      await AuthService.register({
        firstName,
        lastName,
        username,
        email,
        password,
        age,
        gender,
        type,
      });

      navigate('/auth/signin');
    } catch (err) {
      setError(err.message || 'Unable to create account.');
    }
  };

  return (
    <>
      <div className="mb-8">
        <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gray-400 mb-6">
          Espada Recruitment
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl mb-4">Join the Hollow Army</h1>
        <p className="text-base leading-7 text-gray-300">
          Create your account and unlock the power of the Arrancar. Aspiring Hollows and seekers of nihility, join Aizen's forces.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-12 space-y-6 bg-white/5 rounded-2xl border border-gray-700 p-8">
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="first-name" className="text-sm font-semibold text-gray-300 uppercase tracking-[0.1em]">
              First Name
            </label>
            <input
              id="first-name"
              type="text"
              placeholder="Ulquiorra..."
              autoComplete="given-name"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              className={inputClasses}
            />
          </div>
          <div>
            <label htmlFor="last-name" className="text-sm font-semibold text-gray-300 uppercase tracking-[0.1em]">
              Last Name
            </label>
            <input
              id="last-name"
              type="text"
              placeholder="Cifer..."
              autoComplete="family-name"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
              className={inputClasses}
            />
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="signup-username" className="text-sm font-semibold text-gray-300 uppercase tracking-[0.1em]">
              Username
            </label>
            <input
              id="signup-username"
              type="text"
              placeholder="ulquiorra"
              autoComplete="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className={inputClasses}
            />
          </div>
          <div>
            <label htmlFor="signup-age" className="text-sm font-semibold text-gray-300 uppercase tracking-[0.1em]">
              Age
            </label>
            <input
              id="signup-age"
              type="text"
              placeholder="26"
              value={age}
              onChange={(event) => setAge(event.target.value)}
              className={inputClasses}
            />
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="signup-email" className="text-sm font-semibold text-gray-300 uppercase tracking-[0.1em]">
              Email Address
            </label>
            <input
              id="signup-email"
              type="email"
              placeholder="hollow@aizen.com"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className={inputClasses}
            />
          </div>
          <div>
            <label htmlFor="signup-gender" className="text-sm font-semibold text-gray-300 uppercase tracking-[0.1em]">
              Gender
            </label>
            <select
              id="signup-gender"
              value={gender}
              onChange={(event) => setGender(event.target.value)}
              className={inputClasses}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="signup-password" className="text-sm font-semibold text-gray-300 uppercase tracking-[0.1em]">
              Cero Strength (Password)
            </label>
            <input
              id="signup-password"
              type="password"
              placeholder="••••••••"
              autoComplete="new-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className={inputClasses}
            />
            <p className="mt-3 text-xs leading-5 text-gray-400">
              Power required: 8+ characters with letters, numbers, and symbols.
            </p>
          </div>
          <div>
            <label htmlFor="signup-type" className="text-sm font-semibold text-gray-300 uppercase tracking-[0.1em]">
              Account Type
            </label>
            <select
              id="signup-type"
              value={type}
              onChange={(event) => setType(event.target.value)}
              className={inputClasses}
            >
              <option value="editor">Editor</option>
              <option value="viewer">Viewer</option>
            </select>
          </div>
        </div>

        {error && (
          <div className="rounded-xl border border-red-500 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {error}
          </div>
        )}

        <Button type="submit" variant="primary" className={actionButtonClassName}>
          Join the Espada
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
        Already joined?{' '}
        <Link to="/auth/signin" className="font-semibold text-white transition hover:text-gray-300">
          Log In
        </Link>
      </div>
    </>
  );
};

export default SignUpPage;