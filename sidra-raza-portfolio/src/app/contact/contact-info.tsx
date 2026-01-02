"use client";

import { motion } from "framer-motion";
import { Calendar, Mail, Linkedin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/config/site";

export function ContactInfo() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
      className="space-y-8"
    >
      {/* Book a Call */}
      <div className="p-6 rounded-xl bg-primary-muted border border-primary/30">
        <div className="flex items-center gap-3 mb-4">
          <Calendar className="w-6 h-6 text-primary" />
          <h2 className="text-xl font-semibold">Book a Call</h2>
        </div>
        <p className="text-text-muted mb-4">
          30-minute strategy call. Free. No pitch, just value.
        </p>
        <Button asChild>
          <a
            href={siteConfig.links.calendly}
            target="_blank"
            rel="noopener noreferrer"
          >
            Schedule on Calendly
          </a>
        </Button>
      </div>

      {/* Direct Contact */}
      <div className="p-6 rounded-xl bg-surface border border-border">
        <h2 className="text-xl font-semibold mb-4">Direct Contact</h2>
        <div className="space-y-4">
          <a
            href={`mailto:${siteConfig.links.email}`}
            className="flex items-center gap-3 text-text-muted hover:text-primary transition-colors"
          >
            <Mail className="w-5 h-5" />
            {siteConfig.links.email}
          </a>
          <a
            href={siteConfig.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-text-muted hover:text-primary transition-colors"
          >
            <Linkedin className="w-5 h-5" />
            LinkedIn
          </a>
        </div>
      </div>

      {/* Response Time */}
      <div className="p-6 rounded-xl bg-surface border border-border">
        <div className="flex items-center gap-3 mb-4">
          <Clock className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-semibold">Response Time</h2>
        </div>
        <p className="text-text-muted">Within 24 hours (usually faster)</p>
      </div>

      {/* What Happens Next */}
      <div className="p-6 rounded-xl bg-surface border border-border">
        <h2 className="text-xl font-semibold mb-4">What Happens Next</h2>
        <ol className="space-y-3 text-text-muted">
          <li className="flex items-start gap-3">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-background text-sm font-medium shrink-0">
              1
            </span>
            You send a message or book a call
          </li>
          <li className="flex items-start gap-3">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-background text-sm font-medium shrink-0">
              2
            </span>
            I respond within 24 hours
          </li>
          <li className="flex items-start gap-3">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-background text-sm font-medium shrink-0">
              3
            </span>
            We have a no-pressure conversation
          </li>
          <li className="flex items-start gap-3">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-background text-sm font-medium shrink-0">
              4
            </span>
            If we&apos;re a fit, I send a proposal within 48 hours
          </li>
        </ol>
      </div>
    </motion.div>
  );
}
