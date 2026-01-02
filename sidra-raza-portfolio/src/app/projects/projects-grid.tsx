"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { projects } from "@/content/projects/projects-data";

export function ProjectsGrid() {
  return (
    <Section className="bg-surface/50">
      <div className="space-y-6 sm:space-y-8">
        {projects.map((project, index) => (
          <motion.div
            key={project.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="p-6 sm:p-8 rounded-2xl bg-background border border-border hover:border-primary/50 transition-all group"
          >
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-2xl font-bold group-hover:text-primary transition-colors">
                    {project.title}
                  </h2>
                  <ArrowUpRight className="w-5 h-5 text-text-dim group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </div>
                <div className="flex flex-wrap gap-2 text-sm text-text-muted">
                  <span>{project.client}</span>
                  <span>•</span>
                  <span>{project.industry}</span>
                </div>
              </div>
              {project.featured && (
                <Badge variant="primary">Featured</Badge>
              )}
            </div>

            {/* Content Grid */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Problem & Solution */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-error uppercase tracking-wide mb-2">
                    The Problem
                  </h3>
                  <p className="text-text-muted">{project.problem}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-success uppercase tracking-wide mb-2">
                    The Solution
                  </h3>
                  <p className="text-text-muted">{project.solution}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-text-dim uppercase tracking-wide mb-2">
                    Tech Stack
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <Badge key={tech} variant="default">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 gap-4">
                {project.metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="p-4 rounded-xl bg-surface border border-border"
                  >
                    <div className="text-2xl md:text-3xl font-bold text-primary mb-1">
                      {metric.value}
                    </div>
                    <div className="text-sm text-text-muted">{metric.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
