import { Suspense } from "react";
import { Metadata } from "next";
import SignInClient from "./sign-in-client";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Sign In",
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <SignInClient />
    </Suspense>
  );
}

function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      Loading sign-in…
    </div>
  );
}
