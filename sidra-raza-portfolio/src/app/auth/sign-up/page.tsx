import { Metadata } from "next";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AnimatedCard } from "@/components/ui/animated-card";
import { AnimatedButton } from "@/components/ui/animated-button";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Sign Up",
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default function SignUpPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to sign-in page since sign-up is disabled
    router.push('/auth/sign-in');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <AnimatedCard className="w-full max-w-md p-8">
        <h1 className="text-2xl font-bold text-foreground mb-6 text-center">Sign Up Disabled</h1>

        <div className="text-center">
          <p className="mb-6 text-text-muted">Account registration is disabled.</p>

          <p className="mb-6 text-text-muted">
            <strong>Demo credentials:</strong><br />
            Name: <code>sidra</code> or Email: <code>sidra@example.com</code><br />
            Password: <code>1234</code>
          </p>

          <AnimatedButton
            variant="primary"
            onClick={() => router.push('/auth/sign-in')}
          >
            Go to Sign In
          </AnimatedButton>
        </div>
      </AnimatedCard>
    </div>
  );
}