// app/signin/page.tsx
"use client";

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient'; // Adjust path if needed
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      // Redirect to settings page after successful sign-in
      router.push('/settings'); // Or your desired protected route
      router.refresh(); // Important to re-fetch user session on the server
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-900">Sign In</h1>
        <form onSubmit={handleSignIn} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-default-brand/50 focus:border-default-brand/50"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-default-brand/50 focus:border-default-brand/50"
              placeholder="••••••••"
            />
          </div>
          <div className="text-sm text-right">
            <Link href="/reset-password"
                className="font-medium text-default-brand hover:text-default-brand/50">
                Forgot your password?
            </Link>
          </div>
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-2 text-sm font-medium text-white bg-default-brand border border-transparent rounded-md shadow-sm hover:bg-default-brand/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-default-brand/50 disabled:bg-default-brand/30"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </div>
        </form>
        {error && <p className="text-center text-sm text-red-600">{error}</p>}
        <p className="text-sm text-center text-gray-600">
          Don't have an account?{' '}
          <Link href="/signup" className="font-medium text-default-brand hover:text-default-brand/50">
              Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
