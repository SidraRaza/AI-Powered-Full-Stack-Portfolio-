"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatedCard } from "@/components/ui/animated-card";
import { AnimatedButton } from "@/components/ui/animated-button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { signUp } from "@/lib/auth";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const result = await signUp({
        email,
        password,
        name,
      });

      if (result?.error) {
        setError(result.error);
      } else {
        router.push("/auth/sign-in");
      }
    } catch (err) {
      setError("An error occurred during sign up");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <AnimatedCard className="w-full max-w-md p-8">
        <h1 className="text-2xl font-bold text-foreground mb-6 text-center">Sign Up</h1>

        {error && <div className="mb-4 p-3 bg-error/20 text-error rounded-lg text-center">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-text-muted mb-2">Name</label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full bg-surface-light border border-border text-foreground"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-text-muted mb-2">Email</label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-surface-light border border-border text-foreground"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-text-muted mb-2">Password</label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-surface-light border border-border text-foreground"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-text-muted mb-2">Confirm Password</label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full bg-surface-light border border-border text-foreground"
            />
          </div>

          <AnimatedButton type="submit" className="w-full mt-6">
            Sign Up
          </AnimatedButton>
        </form>

        <div className="mt-6 text-center text-text-muted">
          <p>
            Already have an account?{" "}
            <Link href="/auth/sign-in" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </AnimatedCard>
    </div>
  );
}