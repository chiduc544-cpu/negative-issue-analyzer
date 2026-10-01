'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@negativescope.ai');
  const [password, setPassword] = useState('admin123!');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed.');
      }

      router.push('/dashboard');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unexpected error');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="card-glass rounded-[28px] p-6 md:p-8">
      <div className="mb-6">
        <div className="text-xs uppercase tracking-[0.2em] text-blue-300">Admin portal</div>
        <h2 className="mt-3 text-3xl font-bold text-white">Secure sign in</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="mb-2 block text-sm text-slate-300">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-2xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-white outline-none ring-0 transition focus:border-blue-500"
            placeholder="admin@negativescope.ai"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-slate-300">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-2xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-white outline-none ring-0 transition focus:border-blue-500"
            placeholder="••••••••"
            required
          />
        </div>

        {error ? (
          <div className="rounded-xl border border-red-400/30 bg-red-500/10 p-3 text-sm text-red-200">
            {error}
          </div>
        ) : null}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-2xl bg-blue-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-400 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isLoading ? 'Signing in...' : 'Sign in to dashboard'}
        </button>
      </form>

      <div className="mt-5 rounded-2xl border border-slate-700 bg-slate-950/60 p-3 text-xs text-slate-400">
        Default demo credentials: admin@negativescope.ai / admin123!
      </div>
    </div>
  );
}
