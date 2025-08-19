// components/auth-redirect.tsx
"use client";

import { useRouter } from 'next/navigation';
import { LockKeyhole } from 'lucide-react'; // A nice icon for visual flair

export default function AuthRedirect() {
  const router = useRouter();

  const handleSignInClick = () => {
    router.push('/signin');
  };

  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <div className="p-4 bg-gray-200 rounded-full mb-4">
        <LockKeyhole className="w-8 h-8 text-gray-600" />
      </div>
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        Authentication Required
      </h2>
      <p className="text-gray-600 mb-6 max-w-sm">
        You need to be signed in to access this page. Please sign in to continue.
      </p>
      <button
        onClick={handleSignInClick}
        className="px-6 py-2 text-sm font-medium text-white bg-default-brand border border-transparent rounded-lg shadow-sm hover:bg-default-brand/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-default-brand/50 transition-colors"
      >
        Go to Sign In Page
      </button>
    </div>
  );
}
