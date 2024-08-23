'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@auth0/nextjs-auth0/client';

export default function Home() {
  const router = useRouter();
  const { user, error, isLoading } = useUser();
  const [debugInfo, setDebugInfo] = useState('');

  useEffect(() => {
    const redirect = async () => {
      if (user && !isLoading) {
        setDebugInfo('User authenticated, attempting to redirect...');
        try {
          await router.push('/home');
          setDebugInfo('Redirect initiated');
        } catch (e) {
          setDebugInfo(`Redirect failed: ${e.message}`);
        }
      }
    };

    redirect();
  }, [user, isLoading, router]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Welcome to Our App</h1>
      {user ? (
        <div>
          <p>User is authenticated. You should be redirected soon.</p>
          <p>Debug info: {debugInfo}</p>
          <pre>{JSON.stringify(user, null, 2)}</pre>
          <a
            href="/api/auth/logout"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 inline-block"
          >
            Logout
          </a>
        </div>
      ) : (
        <a
          href="/api/auth/logout"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          logout
        </a>
      )}
    </main>
  );
}