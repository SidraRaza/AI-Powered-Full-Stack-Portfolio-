import { ConstitutionSection } from '../types';

/**
 * Builds sections for the constitution document
 */
export class SectionBuilder {
  /**
   * Build standard sections for a project constitution
   * @param projectName Name of the project
   * @param projectDescription Description of the project
   * @returns Array of constitution sections
   */
  static buildStandardSections(projectName: string, projectDescription: string): ConstitutionSection[] {
    return [
      this.buildIntroductionSection(projectName, projectDescription),
      this.buildPurposeSection(projectName, projectDescription),
      this.buildGovernanceSection(),
      this.buildDevelopmentPracticesSection(),
      this.buildQualityStandardsSection(),
      this.buildSecuritySection(),
      this.buildCommunityGuidelinesSection()
    ].map((section, index) => ({
      ...section,
      order: index + 1
    }));
  }

  /**
   * Build introduction section
   * @param projectName Name of the project
   * @param projectDescription Description of the project
   * @returns Introduction section
   */
  private static buildIntroductionSection(projectName: string, projectDescription: string): ConstitutionSection {
    return {
      id: 'introduction',
      title: 'Introduction',
      content: `This document establishes the principles and guidelines for the ${projectName} project. ${projectDescription || `The ${projectName} project aims to deliver high-quality software solutions.`}`
    };
  }

  /**
   * Build purpose section
   * @param projectName Name of the project
   * @param projectDescription Description of the project
   * @returns Purpose section
   */
  private static buildPurposeSection(projectName: string, projectDescription: string): ConstitutionSection {
    return {
      id: 'purpose',
      title: 'Purpose and Scope',
      content: `The purpose of this constitution is to establish a shared understanding of how the ${projectName} project should be developed, maintained, and evolved. It defines the core principles that guide decision-making and development practices.\n\nScope:\n- Defines development standards and best practices\n- Establishes governance and decision-making processes\n- Sets quality and security standards\n- Guides project evolution and maintenance`
    };
  }

  /**
   * Build governance section
   * @returns Governance section
   */
  private static buildGovernanceSection(): ConstitutionSection {
    return {
      id: 'governance',
      title: 'Governance and Decision-Making',
      content: `This section outlines how decisions are made within the project:\n\n- **Major Decisions**: Require consensus among core maintainers\n- **Technical Decisions**: Made by area experts with review\n- **Policy Changes**: Require community discussion and formal approval\n- **Release Process**: Follows semantic versioning with proper testing`
    };
  }

  /**
   * Build development practices section
   * @returns Development practices section
   */
  private static buildDevelopmentPracticesSection(): ConstitutionSection {
    return {
      id: 'development-practices',
      title: 'Development Practices',
      content: `This section defines the standard practices that contributors should follow:\n\n- **Coding Standards**: Follow established style guides\n- **Code Reviews**: All changes require peer review\n- **Testing**: Maintain high test coverage\n- **Documentation**: Update documentation with code changes\n- **Commit Messages**: Follow conventional commit format\n- **Pull Requests**: Include proper descriptions and issue references`
    };
  }

  /**
   * Build quality standards section
   * @returns Quality standards section
   */
  private static buildQualityStandardsSection(): ConstitutionSection {
    return {
      id: 'quality-standards',
      title: 'Quality Standards',
      content: `This section establishes the quality standards that the codebase should meet:\n\n- **Code Quality**: Pass all linting and static analysis\n- **Test Coverage**: Maintain minimum 80% coverage\n- **Performance**: Meet defined benchmarks\n- **Security**: Pass security scans\n- **Accessibility**: Follow WCAG guidelines where applicable\n- **Maintainability**: Keep code complexity manageable`
    };
  }

  /**
   * Build security section
   * @returns Security section
   */
  private static buildSecuritySection(): ConstitutionSection {
    return {
      id: 'security',
      title: 'Security and Compliance',
      content: `This section outlines the security practices and compliance requirements:\n\n- **Secure Coding**: Follow secure coding practices\n- **Dependencies**: Keep dependencies updated and secure\n- **Secrets**: Never commit secrets to the repository\n- **Vulnerability Disclosure**: Follow responsible disclosure procedures\n- **Compliance**: Adhere to relevant standards (e.g., GDPR, HIPAA if applicable)`
    };
  }

  /**
   * Build community guidelines section
   * @returns Community guidelines section
   */
  private static buildCommunityGuidelinesSection(): ConstitutionSection {
    return {
      id: 'community',
      title: 'Community Guidelines',
      content: `This section defines the community standards and code of conduct:\n\n- **Respect**: Treat all community members with respect\n- **Inclusivity**: Foster an inclusive environment\n- **Collaboration**: Work together constructively\n- **Professionalism**: Maintain professional communication\n- **Openness**: Welcome contributions from everyone`
    };
  }

  /**
   * Build technology-specific sections
   * @param technologies Technologies used in the project
   * @returns Array of technology-specific sections
   */
  static buildTechnologySpecificSections(technologies: string[]): ConstitutionSection[] {
    const sections: ConstitutionSection[] = [];

    if (technologies.includes('TypeScript')) {
      sections.push({
        id: 'typescript-guidelines',
        title: 'TypeScript Guidelines',
        content: 'This project uses TypeScript for type safety:\n\n- Enable strict mode compilation\n- Define clear interfaces for all public APIs\n- Use discriminated unions for complex types\n- Avoid "any" type except where absolutely necessary\n- Maintain type consistency across the codebase'
      });
    }

    if (technologies.includes('React')) {
      sections.push({
        id: 'react-practices',
        title: 'React Development Practices',
        content: 'This project uses React for UI development:\n\n- Follow component composition patterns\n- Use hooks properly and follow the Rules of Hooks\n- Implement proper state management\n- Optimize performance with React.memo and useCallback\n- Follow accessibility best practices'
      });
    }

    if (technologies.includes('Node.js')) {
      sections.push({
        id: 'nodejs-standards',
        title: 'Node.js Development Standards',
        content: 'This project runs on Node.js:\n\n- Avoid blocking the event loop with synchronous operations\n- Handle errors properly in asynchronous code\n- Use streams for efficient data processing\n- Implement proper logging and monitoring\n- Manage memory usage efficiently'
      });
    }

    if (technologies.includes('Next.js')) {
      sections.push({
        id: 'nextjs-guidelines',
        title: 'Next.js Guidelines',
        content: 'This project uses Next.js:\n\n- Choose appropriate rendering strategy (SSR, SSG, CSR)\n- Implement proper API route error handling\n- Optimize images and assets\n- Use dynamic imports for code splitting\n- Follow file-system routing conventions'
      });
    }

    if (technologies.includes('GraphQL')) {
      sections.push({
        id: 'graphql-standards',
        title: 'GraphQL Standards',
        content: 'This project uses GraphQL:\n\n- Design schemas with client needs in mind\n- Implement proper error handling and validation\n- Use pagination for large datasets\n- Implement caching strategies appropriately\n- Secure endpoints against malicious queries'
      });
    }

    if (technologies.includes('Docker')) {
      sections.push({
        id: 'docker-practices',
        title: 'Docker Best Practices',
        content: 'This project uses Docker:\n\n- Use multi-stage builds to minimize image size\n- Use non-root users in containers\n- Scan images for vulnerabilities\n- Implement health checks\n- Follow proper tagging and versioning strategies'
      });
    }

    return sections.map((section, index) => ({
      ...section,
      order: 100 + index // Start ordering from 100 to differentiate from standard sections
    }));
  }

  /**
   * Build issue-specific sections
   * @param detectedIssues Issues detected in the project
   * @returns Array of issue-specific sections
   */
  static buildIssueSpecificSections(detectedIssues: any[]): ConstitutionSection[] {
    const sections: ConstitutionSection[] = [];
    const issueCategories = new Set(detectedIssues.map(issue => issue.category));

    if (issueCategories.has('security')) {
      sections.push({
        id: 'security-enhancements',
        title: 'Security Enhancements',
        content: 'Based on security issues detected in the codebase:\n\n- Implement additional security measures\n- Conduct regular security audits\n- Establish incident response procedures\n- Follow security best practices\n- Stay updated on security vulnerabilities'
      });
    }

    if (issueCategories.has('performance')) {
      sections.push({
        id: 'performance-standards',
        title: 'Performance Standards',
        content: 'Based on performance issues detected in the codebase:\n\n- Establish performance benchmarks\n- Monitor key performance indicators\n- Optimize critical paths\n- Implement caching strategies\n- Profile and optimize regularly'
      });
    }

    if (issueCategories.has('quality')) {
      sections.push({
        id: 'quality-assurance',
        title: 'Quality Assurance',
        content: 'Based on code quality issues detected in the codebase:\n\n- Strengthen code review processes\n- Implement additional quality gates\n- Improve automated testing\n- Address technical debt\n- Enforce coding standards'
      });
    }

    if (issueCategories.has('architecture')) {
      sections.push({
        id: 'architectural-guidelines',
        title: 'Architectural Guidelines',
        content: 'Based on architectural issues detected in the codebase:\n\n- Follow established architectural patterns\n- Maintain clear component boundaries\n- Implement proper separation of concerns\n- Address architectural debt\n- Plan for scalability and maintainability'
      });
    }

    return sections.map((section, index) => ({
      ...section,
      order: 200 + index // Start ordering from 200 to differentiate from other sections
    }));
  }

  /**
   * Build a custom section
   * @param id Unique identifier for the section
   * @param title Title of the section
   * @param content Content of the section
   * @param order Order of the section
   * @returns Custom constitution section
   */
  static buildCustomSection(id: string, title: string, content: string, order: number): ConstitutionSection {
    return {
      id,
      title,
      content,
      order
    };
  }

  /**
   * Combine multiple sets of sections
   * @param sectionSets Multiple sets of sections to combine
   * @returns Combined array of sections sorted by order
   */
  static combineSections(...sectionSets: ConstitutionSection[][]): ConstitutionSection[] {
    const allSections: ConstitutionSection[] = [];

    for (const sectionSet of sectionSets) {
      allSections.push(...sectionSet);
    }

    // Sort sections by order
    return allSections.sort((a, b) => a.order - b.order);
  }

  /**
   * Update section content with project-specific details
   * @param sections Sections to update
   * @param projectName Name of the project
   * @param projectDescription Description of the project
   * @returns Updated sections
   */
  static updateSectionsWithProjectDetails(
    sections: ConstitutionSection[],
    projectName: string,
    projectDescription: string
  ): ConstitutionSection[] {
    return sections.map(section => {
      let updatedContent = section.content;

      // Replace placeholders with project details
      updatedContent = updatedContent.replace(/\$\{projectName\}/g, projectName);
      updatedContent = updatedContent.replace(/\$\{projectDescription\}/g, projectDescription);

      return {
        ...section,
        content: updatedContent
      };
    });
  }
}