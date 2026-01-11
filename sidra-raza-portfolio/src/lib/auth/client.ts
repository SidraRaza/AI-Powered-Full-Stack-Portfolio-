// Client-side functions for Better Auth
import { createAuthClient } from "better-auth/client";

export const {
  signIn,
  signOut,
  signUp,
  getSession,
  useSession
} = createAuthClient({
  baseURL: typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000',
  fetchOptions: {
    onError: (error) => {
      console.error("Auth error:", error);
    }
  }
});