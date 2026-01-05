import Groq from 'groq-sdk';

/**
 * Server-side only Groq client configuration
 *
 * SECURITY NOTE: This client is designed to run exclusively on the server-side
 * to prevent exposing the GROQ_API_KEY to clients. The check below ensures
 * that the client will only initialize in a Node.js environment, not in the browser.
 *
 * This client should only be used in:
 * - API routes (app/api/[...]/route.ts)
 * - Server components
 * - Server actions
 * - Middleware
 *
 * NEVER use this client in client components or browser code.
 */
let groqClient: Groq;

// Initialize Groq client with API key from environment variables
// This check ensures the client only runs on the server-side (Node.js)
// and prevents the API key from being exposed to the browser
if (typeof window === 'undefined') {
  if (!process.env.GROQ_API_KEY) {
    throw new Error('GROQ_API_KEY is missing in environment variables');
  }

  groqClient = new Groq({
    apiKey: process.env.GROQ_API_KEY,
    dangerouslyAllowBrowser: false, // Explicitly prevent browser usage
  });
} else {
  throw new Error('Groq client should not be initialized in the browser environment. This client must run server-side only to protect the API key.');
}

export { groqClient };