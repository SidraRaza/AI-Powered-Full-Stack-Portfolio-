import { betterAuth } from "better-auth";
import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";

// Initialize SQLite database
const sqlite = new Database("sqlite.db");

const db = drizzle(sqlite);

// Create Better Auth instance
export const auth = betterAuth({
  database: {
    connection: db,
    type: "sqlite",
  },
  secret: process.env.AUTH_SECRET || "fallback-secret-change-this",
  emailAndPassword: {
    enabled: true,
  },
  account: {
    accountLinking: {
      enabled: true,
    },
  },
});