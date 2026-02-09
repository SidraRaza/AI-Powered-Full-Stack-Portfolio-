import { Metadata } from "next";
import { redirect } from "next/navigation";

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
  // Redirect to sign-in page since sign-up is disabled
  redirect('/auth/sign-in');
}