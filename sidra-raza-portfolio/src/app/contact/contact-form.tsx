"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const projectTypes = [
  "AI Strategy Session",
  "Agentic System Build",
  "AI Integration",
  "Consulting/Advisory",
  "Other",
];

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-8 rounded-xl bg-surface border border-border text-center"
      >
        <div className="p-4 rounded-full bg-success/10 w-fit mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-success" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Message Received!</h3>
        <p className="text-text-muted">
          I&apos;ll respond within 24 hours. Looking forward to connecting.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h2 className="text-2xl font-bold mb-6">Send a Message</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid sm:grid-cols-2 gap-4">
          <Input
            label="Name"
            id="name"
            name="name"
            placeholder="Your name"
            required
          />
          <Input
            label="Email"
            id="email"
            name="email"
            type="email"
            placeholder="your@email.com"
            required
          />
        </div>

        <Input
          label="Company (optional)"
          id="company"
          name="company"
          placeholder="Your company"
        />

        <div>
          <label className="block text-sm font-medium text-text-muted mb-2">
            Project Type
          </label>
          <select
            name="projectType"
            className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-foreground focus:outline-none focus:border-primary focus:shadow-[0_0_10px_var(--primary-muted)]"
            required
          >
            <option value="">Select a project type</option>
            {projectTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <Textarea
          label="Message"
          id="message"
          name="message"
          placeholder="Tell me about your project or ask any questions..."
          rows={5}
          required
        />

        <Button type="submit" size="lg" isLoading={isSubmitting}>
          <Send className="mr-2 w-4 h-4" />
          Send Message
        </Button>
      </form>
    </motion.div>
  );
}
