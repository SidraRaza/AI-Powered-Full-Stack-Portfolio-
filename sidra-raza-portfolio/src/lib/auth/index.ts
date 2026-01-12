// This file exports client-side functions only
// Server-side auth instance should only be imported in server components/api routes

// Client-side functions
export { signIn, signOut, signUp, getSession, useSession } from "./client";

// Server-side functions
export { auth } from "./server";