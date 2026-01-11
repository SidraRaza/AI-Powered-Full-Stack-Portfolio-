import { ConstitutionDocument, ConstitutionSection, Principle } from '../types';

/**
 * Template system for generating project constitutions
 */
export class ConstitutionTemplate {
  /**
   * Generate a basic constitution template
   * @param projectName Name of the project
   * @param projectDescription Description of the project
   * @returns Basic constitution template
   */
  static generateBasicTemplate(projectName: string, projectDescription: string): ConstitutionDocument {
    return {
      id: `constitution_${Date.now()}`,
      title: `Project Constitution for ${projectName}`,
      version: '1.0.0',
      createdAt: new Date(),
      updatedAt: new Date(),
      sections: this.generateDefaultSections(projectName, projectDescription),
      principles: this.generateDefaultPrinciples(),
      authors: []
    };
  }

  /**
   * Generate default sections for a constitution
   * @param projectName Name of the project
   * @param projectDescription Description of the project
   * @returns Array of constitution sections
   */
  private static generateDefaultSections(projectName: string, projectDescription: string): ConstitutionSection[] {
    return [
      {
        id: 'intro',
        title: 'Introduction',
        content: `This document establishes the principles and guidelines for the ${projectName} project. ${projectDescription}`,
        order: 1
      },
      {
        id: 'purpose',
        title: 'Purpose and Scope',
        content: `The purpose of this constitution is to establish a shared understanding of how the ${projectName} project should be developed, maintained, and evolved. It defines the core principles that guide decision-making and development practices.`,
        order: 2
      },
      {
        id: 'governance',
        title: 'Governance and Decision-Making',
        content: 'This section outlines how decisions are made within the project, who has authority to make different types of decisions, and the processes for proposing and implementing changes.',
        order: 3
      },
      {
        id: 'development-practices',
        title: 'Development Practices',
        content: 'This section defines the standard practices that contributors should follow when working on the codebase, including coding standards, testing requirements, and code review processes.',
        order: 4
      },
      {
        id: 'quality-standards',
        title: 'Quality Standards',
        content: 'This section establishes the quality standards that the codebase should meet, including code quality metrics, testing coverage requirements, and performance benchmarks.',
        order: 5
      },
      {
        id: 'security',
        title: 'Security and Compliance',
        content: 'This section outlines the security practices and compliance requirements that must be followed when developing and maintaining the project.',
        order: 6
      },
      {
        id: 'community',
        title: 'Community Guidelines',
        content: 'This section defines the community standards and code of conduct for project contributors and users.',
        order: 7
      }
    ];
  }

  /**
   * Generate default principles for a project
   * @returns Array of principles
   */
  private static generateDefaultPrinciples(): Principle[] {
    return [
      {
        id: 'simplicity',
        name: 'Simplicity First',
        description: 'We prioritize simple, understandable solutions over complex ones. Code should be readable and maintainable.',
        category: 'development',
        priority: 'high'
      },
      {
        id: 'test-driven',
        name: 'Test-Driven Development',
        description: 'All functionality should be covered by appropriate tests. Tests should be written before or alongside the implementation.',
        category: 'testing',
        priority: 'high'
      },
      {
        id: 'security-by-default',
        name: 'Security by Default',
        description: 'Security considerations should be part of every decision. The default configuration should be secure.',
        category: 'security',
        priority: 'high'
      },
      {
        id: 'performance-conscious',
        name: 'Performance Conscious',
        description: 'We consider performance implications in all design decisions. Code should be efficient and scalable.',
        category: 'performance',
        priority: 'medium'
      },
      {
        id: 'inclusive-design',
        name: 'Inclusive Design',
        description: 'We design for all users, considering accessibility and diverse needs from the beginning.',
        category: 'development',
        priority: 'medium'
      },
      {
        id: 'documentation-first',
        name: 'Documentation First',
        description: 'We maintain comprehensive documentation for all features, APIs, and development processes.',
        category: 'development',
        priority: 'medium'
      },
      {
        id: 'continuous-improvement',
        name: 'Continuous Improvement',
        description: 'We continuously evaluate and improve our processes, tools, and codebase based on feedback and changing requirements.',
        category: 'development',
        priority: 'high'
      }
    ];
  }

  /**
   * Generate a technology-specific constitution template
   * @param projectName Name of the project
   * @param projectDescription Description of the project
   * @param technologies Technologies used in the project
   * @returns Technology-specific constitution template
   */
  static generateTechnologySpecificTemplate(
    projectName: string,
    projectDescription: string,
    technologies: string[]
  ): ConstitutionDocument {
    const baseConstitution = this.generateBasicTemplate(projectName, projectDescription);

    // Add technology-specific sections
    const techSections = this.generateTechnologySpecificSections(technologies);
    baseConstitution.sections = [...baseConstitution.sections, ...techSections];

    // Add technology-specific principles
    const techPrinciples = this.generateTechnologySpecificPrinciples(technologies);
    baseConstitution.principles = [...baseConstitution.principles, ...techPrinciples];

    return baseConstitution;
  }

  /**
   * Generate technology-specific sections
   * @param technologies Technologies used in the project
   * @returns Array of technology-specific sections
   */
  private static generateTechnologySpecificSections(technologies: string[]): ConstitutionSection[] {
    const sections: ConstitutionSection[] = [];

    if (technologies.includes('TypeScript')) {
      sections.push({
        id: 'typescript-standards',
        title: 'TypeScript Standards',
        content: 'This project uses TypeScript for type safety. All public APIs should be properly typed, and strict mode should be enabled.',
        order: 10
      });
    }

    if (technologies.includes('React')) {
      sections.push({
        id: 'react-practices',
        title: 'React Development Practices',
        content: 'This project uses React for UI development. Components should follow best practices for performance and maintainability, including proper state management and component composition.',
        order: 11
      });
    }

    if (technologies.includes('Node.js')) {
      sections.push({
        id: 'nodejs-standards',
        title: 'Node.js Development Standards',
        content: 'This project runs on Node.js. Asynchronous operations should be handled properly, and the event loop should not be blocked by synchronous operations.',
        order: 12
      });
    }

    if (technologies.includes('Next.js')) {
      sections.push({
        id: 'nextjs-guidelines',
        title: 'Next.js Guidelines',
        content: 'This project uses Next.js for the application framework. Pages, API routes, and static generation should follow Next.js best practices.',
        order: 13
      });
    }

    if (technologies.includes('GraphQL')) {
      sections.push({
        id: 'graphql-standards',
        title: 'GraphQL Standards',
        content: 'This project uses GraphQL for API communication. Schema design should follow best practices, and proper error handling should be implemented.',
        order: 14
      });
    }

    return sections;
  }

  /**
   * Generate technology-specific principles
   * @param technologies Technologies used in the project
   * @returns Array of technology-specific principles
   */
  private static generateTechnologySpecificPrinciples(technologies: string[]): Principle[] {
    const principles: Principle[] = [];

    if (technologies.includes('TypeScript')) {
      principles.push({
        id: 'typescript-strict',
        name: 'TypeScript Strict Mode',
        description: 'All TypeScript code should be written in strict mode to catch type errors at compile time.',
        category: 'development',
        priority: 'high'
      });
    }

    if (technologies.includes('React')) {
      principles.push({
        id: 'react-hooks',
        name: 'React Hooks Best Practices',
        description: 'React components should use hooks following the rules of hooks and best practices for state management.',
        category: 'development',
        priority: 'medium'
      });
    }

    if (technologies.includes('Node.js')) {
      principles.push({
        id: 'nodejs-non-blocking',
        name: 'Non-blocking I/O',
        description: 'Node.js applications should avoid blocking the event loop with synchronous operations.',
        category: 'performance',
        priority: 'high'
      });
    }

    if (technologies.includes('Next.js')) {
      principles.push({
        id: 'nextjs-ssr-ssg',
        name: 'Next.js Rendering Strategy',
        description: 'Choose the appropriate rendering strategy (SSR, SSG, CSR) based on the use case for optimal performance.',
        category: 'performance',
        priority: 'medium'
      });
    }

    if (technologies.includes('GraphQL')) {
      principles.push({
        id: 'graphql-schema-design',
        name: 'GraphQL Schema Design',
        description: 'GraphQL schemas should be designed with care for performance, maintainability, and client needs.',
        category: 'architecture',
        priority: 'high'
      });
    }

    return principles;
  }

  /**
   * Generate a project-specific constitution based on analysis results
   * @param projectName Name of the project
   * @param projectDescription Description of the project
   * @param technologies Technologies detected in the project
   * @param detectedIssues Issues detected in the project
   * @returns Project-specific constitution
   */
  static generateProjectSpecificConstitution(
    projectName: string,
    projectDescription: string,
    technologies: string[],
    detectedIssues: any[] = []
  ): ConstitutionDocument {
    // Start with the technology-specific template
    const constitution = this.generateTechnologySpecificTemplate(projectName, projectDescription, technologies);

    // Add sections based on detected issues
    if (detectedIssues.length > 0) {
      const issueBasedSections = this.generateIssueBasedSections(detectedIssues);
      constitution.sections = [...constitution.sections, ...issueBasedSections];

      const issueBasedPrinciples = this.generateIssueBasedPrinciples(detectedIssues);
      constitution.principles = [...constitution.principles, ...issueBasedPrinciples];
    }

    // Update the last modified date
    constitution.updatedAt = new Date();

    return constitution;
  }

  /**
   * Generate sections based on detected issues
   * @param detectedIssues Issues detected in the project
   * @returns Array of issue-based sections
   */
  private static generateIssueBasedSections(detectedIssues: any[]): ConstitutionSection[] {
    const sections: ConstitutionSection[] = [];
    const issueCategories = new Set(detectedIssues.map(issue => issue.category));

    if (issueCategories.has('security')) {
      sections.push({
        id: 'security-enhancements',
        title: 'Security Enhancements',
        content: 'Based on security issues detected in the codebase, this section outlines additional security measures and practices that should be followed.',
        order: 100
      });
    }

    if (issueCategories.has('performance')) {
      sections.push({
        id: 'performance-standards',
        title: 'Performance Standards',
        content: 'Based on performance issues detected in the codebase, this section outlines performance benchmarks and optimization practices.',
        order: 101
      });
    }

    if (issueCategories.has('quality')) {
      sections.push({
        id: 'quality-assurance',
        title: 'Quality Assurance',
        content: 'Based on code quality issues detected in the codebase, this section outlines additional quality measures and practices that should be followed.',
        order: 102
      });
    }

    return sections;
  }

  /**
   * Generate principles based on detected issues
   * @param detectedIssues Issues detected in the project
   * @returns Array of issue-based principles
   */
  private static generateIssueBasedPrinciples(detectedIssues: any[]): Principle[] {
    const principles: Principle[] = [];
    const issueTypes = new Set(detectedIssues.map(issue => issue.ruleId || issue.message));

    // Add principles based on common issue patterns
    if (Array.from(issueTypes).some(type => type.includes('eslint') || type.includes('quality'))) {
      principles.push({
        id: 'linting-mandatory',
        name: 'Mandatory Code Linting',
        description: 'All code must pass linting checks before being merged. Linting rules should be enforced in the CI/CD pipeline.',
        category: 'development',
        priority: 'high'
      });
    }

    if (Array.from(issueTypes).some(type => type.includes('performance') || type.includes('bottleneck'))) {
      principles.push({
        id: 'performance-testing',
        name: 'Performance Testing',
        description: 'Changes that could impact performance should be tested before merging. Performance benchmarks should be maintained.',
        category: 'performance',
        priority: 'medium'
      });
    }

    return principles;
  }
}