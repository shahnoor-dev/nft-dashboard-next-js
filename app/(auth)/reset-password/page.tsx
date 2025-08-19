// app/reset-password/page.tsx
"use client";

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient'; // Adjust path if needed
import Link from 'next/link';

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handlePasswordReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    // IMPORTANT: Make sure you have an "Update Password" page for the redirect to work.
    // Supabase will send a link with a token to this URL.
    const redirectTo = `${window.location.origin}/update-password`;

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo,
    });

    if (error) {
      setError(error.message);
    } else {
      setMessage('Check your email for the password reset link!');
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-900">Reset Your Password</h1>
        <p className="text-sm text-center text-gray-600">
          Enter your email address and we will send you a link to reset your password.
        </p>
        <form onSubmit={handlePasswordReset} className="space-y-6">
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
            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-2 text-sm font-medium text-white bg-default-brand border border-transparent rounded-md shadow-sm hover:bg-default-brand/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-default-brand/50 disabled:bg-default-brand/30"
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </div>
        </form>
        {message && <p className="text-center text-sm text-default-brand">{message}</p>}
        {error && <p className="text-center text-sm text-red-600">{error}</p>}
        <p className="text-sm text-center text-gray-600">
          Remembered your password?{' '}
          <Link href="/signin" className="font-medium text-default-brand hover:text-default-brand/50">
              Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
