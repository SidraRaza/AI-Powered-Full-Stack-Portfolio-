import React from 'react';

// Client-side functions for Custom Auth
export const signIn = async (provider: string, credentials: { email: string; password: string; callbackURL?: string }) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: credentials.email,
      password: credentials.password,
    }),
  });

  const result = await response.json();

  if (response.ok) {
    // Wait for a moment to ensure the cookie is set by the browser
    // We'll use a simple page reload to ensure cookies are synced
    if (credentials.callbackURL) {
      window.location.href = credentials.callbackURL;
    } else {
      window.location.href = '/dashboard';
    }
    return { success: true };
  } else {
    return { error: { message: result.error || 'Login failed' } };
  }
};

export const signOut = async () => {
  try {
    const response = await fetch('/api/auth/logout', {
      method: 'POST',
    });

    if (response.ok) {
      window.location.href = '/';
    } else {
      // Even if the logout API fails, still redirect to home
      window.location.href = '/';
    }
  } catch (error) {
    // If there's an error, still redirect to home
    window.location.href = '/';
  }
};

export const getSession = async () => {
  const response = await fetch('/api/auth/session');
  if (response.ok) {
    return await response.json();
  }
  return null;
};

export const signUp = () => Promise.resolve({ error: { message: "Sign up is disabled" } });

// Placeholder for useSession hook
export const useSession = () => {
  // This is a simplified version - in a real app you'd want to properly implement this
  const [session, setSession] = React.useState(null);
  React.useEffect(() => {
    const fetchSession = async () => {
      const sess = await getSession();
      setSession(sess);
    };
    fetchSession();
  }, []);
  return { data: session, status: session ? 'authenticated' : 'unauthenticated' };
};