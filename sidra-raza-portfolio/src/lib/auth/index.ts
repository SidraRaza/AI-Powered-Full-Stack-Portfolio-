// This file exports client-side functions only
// Server-side auth instance should only be imported in server components/api routes

// Client-side functions
export { signIn, signOut, signUp, getSession, useSession } from "./client";

// Server-side functions - commented out to prevent client bundling
// export { auth } from "./server";