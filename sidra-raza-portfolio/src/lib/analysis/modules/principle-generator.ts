import { Principle } from '../types';

/**
 * Generates principles based on analysis results and project characteristics
 */
export class PrincipleGenerator {
  /**
   * Generate principles based on project analysis results
   * @param projectName Name of the project
   * @param projectDescription Description of the project
   * @param technologies Technologies used in the project
   * @param detectedIssues Issues detected in the project
   * @returns Array of generated principles
   */
  static generatePrinciples(
    projectName: string,
    projectDescription: string,
    technologies: string[],
    detectedIssues: any[] = []
  ): Principle[] {
    const principles: Principle[] = [];

    // Generate general principles
    principles.push(...this.generateGeneralPrinciples());

    // Generate technology-specific principles
    principles.push(...this.generateTechnologySpecificPrinciples(technologies));

    // Generate issue-specific principles
    principles.push(...this.generateIssueSpecificPrinciples(detectedIssues));

    // Generate project-specific principles
    principles.push(...this.generateProjectSpecificPrinciples(projectName, projectDescription));

    return principles;
  }

  /**
   * Generate general principles that apply to most projects
   * @returns Array of general principles
   */
  private static generateGeneralPrinciples(): Principle[] {
    return [
      {
        id: 'simple-first',
        name: 'Simple First',
        description: 'Prefer simple, understandable solutions over complex ones. Code should be readable and maintainable by others.',
        category: 'development',
        priority: 'high'
      },
      {
        id: 'test-coverage',
        name: 'Test Coverage',
        description: 'All functionality should be covered by appropriate tests. Strive for high test coverage with meaningful tests.',
        category: 'testing',
        priority: 'high'
      },
      {
        id: 'security-default',
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
        id: 'documentation-required',
        name: 'Documentation Required',
        description: 'Maintain comprehensive documentation for all features, APIs, and development processes.',
        category: 'development',
        priority: 'medium'
      },
      {
        id: 'consistent-style',
        name: 'Consistent Style',
        description: 'Follow consistent coding standards and style guides across the entire codebase.',
        category: 'development',
        priority: 'medium'
      },
      {
        id: 'fail-fast',
        name: 'Fail Fast',
        description: 'Detect and report errors as early as possible in the development or runtime process.',
        category: 'development',
        priority: 'medium'
      }
    ];
  }

  /**
   * Generate principles specific to the technologies used in the project
   * @param technologies Technologies used in the project
   * @returns Array of technology-specific principles
   */
  private static generateTechnologySpecificPrinciples(technologies: string[]): Principle[] {
    const principles: Principle[] = [];

    if (technologies.includes('TypeScript')) {
      principles.push({
        id: 'typescript-strict-mode',
        name: 'TypeScript Strict Mode',
        description: 'All TypeScript code should be written in strict mode to catch type errors at compile time.',
        category: 'development',
        priority: 'high'
      });
    }

    if (technologies.includes('React')) {
      principles.push({
        id: 'react-hooks-rules',
        name: 'React Hooks Rules',
        description: 'Follow the Rules of Hooks and use React hooks properly for state management and side effects.',
        category: 'development',
        priority: 'medium'
      });
    }

    if (technologies.includes('Node.js')) {
      principles.push({
        id: 'nodejs-non-blocking',
        name: 'Non-blocking Operations',
        description: 'Avoid blocking the Node.js event loop with synchronous operations.',
        category: 'performance',
        priority: 'high'
      });
    }

    if (technologies.includes('Next.js')) {
      principles.push({
        id: 'nextjs-optimization',
        name: 'Next.js Optimization',
        description: 'Use Next.js built-in optimizations like Image optimization, automatic code splitting, and static generation.',
        category: 'performance',
        priority: 'medium'
      });
    }

    if (technologies.includes('GraphQL')) {
      principles.push({
        id: 'graphql-best-practices',
        name: 'GraphQL Best Practices',
        description: 'Follow GraphQL best practices for schema design, resolver implementation, and security.',
        category: 'development',
        priority: 'high'
      });
    }

    if (technologies.includes('Docker')) {
      principles.push({
        id: 'docker-optimization',
        name: 'Docker Image Optimization',
        description: 'Optimize Docker images by using multi-stage builds, minimizing layers, and using appropriate base images.',
        category: 'deployment',
        priority: 'medium'
      });
    }

    if (technologies.includes('Kubernetes')) {
      principles.push({
        id: 'k8s-best-practices',
        name: 'Kubernetes Best Practices',
        description: 'Follow Kubernetes best practices for deployments, networking, and resource management.',
        category: 'deployment',
        priority: 'high'
      });
    }

    return principles;
  }

  /**
   * Generate principles based on issues detected in the project
   * @param detectedIssues Issues detected in the project
   * @returns Array of issue-specific principles
   */
  private static generateIssueSpecificPrinciples(detectedIssues: any[]): Principle[] {
    const principles: Principle[] = [];
    const issueCategories = new Set(detectedIssues.map(issue => issue.category));
    const issueRules = new Set(detectedIssues.map(issue => issue.ruleId));

    // Generate principles based on security issues
    if (issueCategories.has('security')) {
      principles.push({
        id: 'security-first',
        name: 'Security First',
        description: 'Security reviews should be mandatory for all code changes, especially those involving user data or system access.',
        category: 'security',
        priority: 'high'
      });

      // Check for specific security issues
      if ([...issueRules].some(rule => rule && rule.includes('xss'))) {
        principles.push({
          id: 'input-sanitization',
          name: 'Input Sanitization',
          description: 'All user input must be properly sanitized to prevent injection attacks.',
          category: 'security',
          priority: 'high'
        });
      }

      if ([...issueRules].some(rule => rule && rule.includes('sql') || rule.includes('injection'))) {
        principles.push({
          id: 'prevent-injection',
          name: 'Prevent Injection Attacks',
          description: 'Use parameterized queries and proper input validation to prevent injection attacks.',
          category: 'security',
          priority: 'high'
        });
      }
    }

    // Generate principles based on performance issues
    if (issueCategories.has('performance')) {
      principles.push({
        id: 'performance-monitoring',
        name: 'Performance Monitoring',
        description: 'Implement performance monitoring to detect bottlenecks and regressions.',
        category: 'performance',
        priority: 'medium'
      });

      if ([...issueRules].some(rule => rule && rule.includes('loop') || rule.includes('inefficient'))) {
        principles.push({
          id: 'optimize-algorithms',
          name: 'Optimize Algorithms',
          description: 'Choose appropriate algorithms and data structures for optimal performance.',
          category: 'performance',
          priority: 'medium'
        });
      }
    }

    // Generate principles based on quality issues
    if (issueCategories.has('quality')) {
      principles.push({
        id: 'code-review-required',
        name: 'Mandatory Code Reviews',
        description: 'All code changes must undergo peer review before merging.',
        category: 'development',
        priority: 'high'
      });

      if ([...issueRules].some(rule => rule && rule.includes('lint') || rule.includes('eslint'))) {
        principles.push({
          id: 'automated-quality-checks',
          name: 'Automated Quality Checks',
          description: 'Implement automated quality checks (linting, formatting) in the development workflow.',
          category: 'development',
          priority: 'high'
        });
      }
    }

    return principles;
  }

  /**
   * Generate principles specific to the project based on its name and description
   * @param projectName Name of the project
   * @param projectDescription Description of the project
   * @returns Array of project-specific principles
   */
  private static generateProjectSpecificPrinciples(projectName: string, projectDescription: string): Principle[] {
    const principles: Principle[] = [];

    // Generate principles based on project description
    if (projectDescription.toLowerCase().includes('api')) {
      principles.push({
        id: 'api-consistency',
        name: 'API Consistency',
        description: 'Maintain consistent API design patterns across all endpoints and services.',
        category: 'development',
        priority: 'medium'
      });
    }

    if (projectDescription.toLowerCase().includes('real-time') || projectDescription.toLowerCase().includes('live')) {
      principles.push({
        id: 'realtime-performance',
        name: 'Real-time Performance',
        description: 'Optimize for low latency and high throughput in real-time features.',
        category: 'performance',
        priority: 'high'
      });
    }

    if (projectDescription.toLowerCase().includes('ecommerce') || projectDescription.toLowerCase().includes('payment')) {
      principles.push({
        id: 'payment-security',
        name: 'Payment Security',
        description: 'Implement PCI DSS compliance and additional security measures for payment processing.',
        category: 'security',
        priority: 'high'
      });
    }

    if (projectDescription.toLowerCase().includes('data') || projectDescription.toLowerCase().includes('analytics')) {
      principles.push({
        id: 'data-privacy',
        name: 'Data Privacy',
        description: 'Implement strong data privacy controls and comply with relevant regulations (GDPR, CCPA).',
        category: 'security',
        priority: 'high'
      });
    }

    // Generate principles based on project name
    if (projectName.toLowerCase().includes('microservice') || projectName.toLowerCase().includes('micro-service')) {
      principles.push({
        id: 'loose-coupling',
        name: 'Loose Coupling',
        description: 'Maintain loose coupling between services with well-defined interfaces.',
        category: 'architecture',
        priority: 'high'
      });
    }

    if (projectName.toLowerCase().includes('dashboard') || projectName.toLowerCase().includes('ui')) {
      principles.push({
        id: 'user-experience',
        name: 'User Experience Focus',
        description: 'Prioritize intuitive design and responsive user interfaces.',
        category: 'development',
        priority: 'high'
      });
    }

    return principles;
  }

  /**
   * Enhance existing principles based on additional context
   * @param existingPrinciples Existing principles to enhance
   * @param additionalContext Additional context for enhancement
   * @returns Enhanced principles
   */
  static enhancePrinciples(existingPrinciples: Principle[], additionalContext: any): Principle[] {
    const enhancedPrinciples = [...existingPrinciples];

    // Adjust priorities based on context
    if (additionalContext?.criticalSecurityIssues) {
      enhancedPrinciples.forEach(principle => {
        if (principle.category === 'security') {
          principle.priority = 'high';
        }
      });
    }

    if (additionalContext?.performanceConstraints) {
      enhancedPrinciples.forEach(principle => {
        if (principle.category === 'performance') {
          principle.priority = 'high';
        }
      });
    }

    // Add new principles based on context
    if (additionalContext?.teamSize && additionalContext.teamSize > 10) {
      // Check if team collaboration principle already exists
      const exists = enhancedPrinciples.some(p => p.id === 'team-collaboration');
      if (!exists) {
        enhancedPrinciples.push({
          id: 'team-collaboration',
          name: 'Team Collaboration',
          description: 'Establish clear communication protocols and code ownership for large teams.',
          category: 'development',
          priority: 'medium'
        });
      }
    }

    if (additionalContext?.regulatoryRequirements) {
      // Check if compliance principle already exists
      const exists = enhancedPrinciples.some(p => p.id === 'compliance-standards');
      if (!exists) {
        enhancedPrinciples.push({
          id: 'compliance-standards',
          name: 'Compliance Standards',
          description: 'Ensure all development practices comply with relevant regulatory requirements.',
          category: 'security',
          priority: 'high'
        });
      }
    }

    return enhancedPrinciples;
  }
}