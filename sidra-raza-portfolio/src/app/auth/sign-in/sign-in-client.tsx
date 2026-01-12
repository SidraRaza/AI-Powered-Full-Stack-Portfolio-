"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatedCard } from "@/components/ui/animated-card";
import { AnimatedButton } from "@/components/ui/animated-button";
import { Input } from "@/components/ui/input";
import { signIn } from "@/lib/auth";

export default function SignInClient() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const result: { error?: { message: string } | string } | undefined = await signIn("credentials", {
        email,
        password,
        callbackURL: callbackUrl,
      });

      if (!result || 'error' in result) {
        const errorMessage = result?.error;
        setError(typeof errorMessage === 'string' ? errorMessage : errorMessage?.message || "Invalid email or password");
      } else {
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (err) {
      setError("An error occurred during sign in");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <AnimatedCard className="w-full max-w-md p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">Sign In</h1>

        {error && (
          <div className="mb-4 p-3 bg-red-500/20 text-red-500 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email or name"
            required
          />
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <AnimatedButton type="submit" className="w-full">
            Sign In
          </AnimatedButton>
        </form>
      </AnimatedCard>
    </div>
  );
}
