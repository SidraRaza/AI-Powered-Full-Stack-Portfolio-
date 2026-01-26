import { Metadata } from "next";
import { getSession } from "@/lib/auth";
import DashboardClient from "./dashboard-client";

// Interface for analytics data
interface AnalyticsDataPoint {
  day?: string;
  week?: string;
  month?: string;
  users: number;
}

interface CountryDataPoint {
  [key: string]: string | number;
  name: string;
  value: number;
}

interface Session {
  userId: string;
  name: string;
  email?: string;
  user?: {
    name?: string;
    email?: string;
  };
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Dashboard",
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function DashboardPage() {
  const session = await getSession();

  if (!session) {
    // Show access denied page with noindex
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Access Denied</h1>
          <p className="text-text-muted mb-6">Please log in to access the dashboard</p>
          <a
            href="/auth/sign-in"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Sign In
          </a>
        </div>
      </div>
    );
  }

  // Pass session data to the client component
  return <DashboardClient initialSession={session} />;
}