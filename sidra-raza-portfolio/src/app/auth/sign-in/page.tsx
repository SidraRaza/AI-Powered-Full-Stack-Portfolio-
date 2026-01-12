import { Suspense } from "react";
import SignInClient from "./sign-in-client";

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
