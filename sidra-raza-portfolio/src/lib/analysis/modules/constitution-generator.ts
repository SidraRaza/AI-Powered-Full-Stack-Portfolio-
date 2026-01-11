import { ConstitutionDocument, ProjectInfo, CodebaseScanResult } from '../types';
import { ConstitutionTemplate } from './constitution-template';
import { PrincipleGenerator } from './principle-generator';
import { SectionBuilder } from './section-builder';
import { ConfigManager } from '../config';

/**
 * Generates a complete constitution document based on project analysis data
 */
export class ConstitutionGenerator {
  private configManager: ConfigManager;

  constructor(configManager: ConfigManager) {
    this.configManager = configManager;
  }

  /**
   * Generate a constitution based on project analysis data
   * @param projectInfo Information about the project
   * @param scanResult Results from the codebase scan
   * @returns Generated constitution document
   */
  generateConstitution(projectInfo: ProjectInfo, scanResult: CodebaseScanResult): ConstitutionDocument {
    // Extract relevant information from the analysis
    const projectName = projectInfo.name;
    const projectDescription = projectInfo.description;
    const technologies = projectInfo.technologies;
    const detectedIssues = scanResult.issues;

    // Generate principles based on analysis data
    const principles = PrincipleGenerator.generatePrinciples(
      projectName,
      projectDescription,
      technologies,
      detectedIssues
    );

    // Build standard sections
    const standardSections = SectionBuilder.buildStandardSections(projectName, projectDescription);

    // Build technology-specific sections
    const techSections = SectionBuilder.buildTechnologySpecificSections(technologies);

    // Build issue-specific sections
    const issueSections = SectionBuilder.buildIssueSpecificSections(detectedIssues);

    // Combine all sections
    const allSections = SectionBuilder.combineSections(
      standardSections,
      techSections,
      issueSections
    );

    // Update sections with project-specific details
    const updatedSections = SectionBuilder.updateSectionsWithProjectDetails(
      allSections,
      projectName,
      projectDescription
    );

    // Create the constitution document
    const constitution: ConstitutionDocument = {
      id: `constitution_${Date.now()}`,
      title: `Project Constitution for ${projectName}`,
      version: '1.0.0',
      createdAt: new Date(),
      updatedAt: new Date(),
      sections: updatedSections,
      principles,
      authors: [] // This could be populated from git history or project metadata
    };

    return constitution;
  }

  /**
   * Generate a constitution based on project information only
   * @param projectInfo Information about the project
   * @returns Generated constitution document
   */
  generateBasicConstitution(projectInfo: ProjectInfo): ConstitutionDocument {
    const projectName = projectInfo.name;
    const projectDescription = projectInfo.description;
    const technologies = projectInfo.technologies;

    // Generate basic principles
    const basicPrinciples = PrincipleGenerator.generatePrinciples(
      projectName,
      projectDescription,
      technologies,
      []
    );

    // Build standard sections
    const standardSections = SectionBuilder.buildStandardSections(projectName, projectDescription);

    // Build technology-specific sections
    const techSections = SectionBuilder.buildTechnologySpecificSections(technologies);

    // Combine all sections
    const allSections = SectionBuilder.combineSections(
      standardSections,
      techSections
    );

    // Update sections with project-specific details
    const updatedSections = SectionBuilder.updateSectionsWithProjectDetails(
      allSections,
      projectName,
      projectDescription
    );

    // Create the constitution document
    const constitution: ConstitutionDocument = {
      id: `constitution_${Date.now()}`,
      title: `Project Constitution for ${projectName}`,
      version: '1.0.0',
      createdAt: new Date(),
      updatedAt: new Date(),
      sections: updatedSections,
      principles: basicPrinciples,
      authors: []
    };

    return constitution;
  }

  /**
   * Enhance an existing constitution with new analysis data
   * @param existingConstitution The existing constitution to enhance
   * @param projectInfo Updated project information
   * @param scanResult Updated scan results
   * @returns Enhanced constitution document
   */
  enhanceConstitution(
    existingConstitution: ConstitutionDocument,
    projectInfo: ProjectInfo,
    scanResult: CodebaseScanResult
  ): ConstitutionDocument {
    const projectName = projectInfo.name;
    const projectDescription = projectInfo.description;
    const technologies = projectInfo.technologies;
    const detectedIssues = scanResult.issues;

    // Generate new principles based on updated analysis
    const newPrinciples = PrincipleGenerator.generatePrinciples(
      projectName,
      projectDescription,
      technologies,
      detectedIssues
    );

    // Enhance existing principles with new context
    const enhancedPrinciples = PrincipleGenerator.enhancePrinciples(
      existingConstitution.principles,
      {
        criticalSecurityIssues: detectedIssues.some(i => i.severity === 'error' && i.category === 'security'),
        performanceConstraints: detectedIssues.some(i => i.category === 'performance'),
        teamSize: projectInfo.dependencies.length > 10 ? 15 : 5 // Rough proxy for team size
      }
    );

    // Build new issue-specific sections
    const issueSections = SectionBuilder.buildIssueSpecificSections(detectedIssues);

    // Combine existing sections with new issue-specific sections
    const allSections = SectionBuilder.combineSections(
      existingConstitution.sections,
      issueSections
    );

    // Update sections with project-specific details
    const updatedSections = SectionBuilder.updateSectionsWithProjectDetails(
      allSections,
      projectName,
      projectDescription
    );

    // Create the enhanced constitution document
    const enhancedConstitution: ConstitutionDocument = {
      ...existingConstitution,
      updatedAt: new Date(),
      sections: updatedSections,
      principles: enhancedPrinciples
    };

    return enhancedConstitution;
  }

  /**
   * Generate a customized constitution with specific focus areas
   * @param projectInfo Information about the project
   * @param scanResult Results from the codebase scan
   * @param focusAreas Areas to emphasize in the constitution
   * @returns Customized constitution document
   */
  generateCustomizedConstitution(
    projectInfo: ProjectInfo,
    scanResult: CodebaseScanResult,
    focusAreas: ('security' | 'performance' | 'quality' | 'architecture' | 'testing' | 'deployment')[]
  ): ConstitutionDocument {
    const baseConstitution = this.generateConstitution(projectInfo, scanResult);

    // Emphasize the specified focus areas in the constitution
    const emphasizedSections = baseConstitution.sections.map(section => {
      if (focusAreas.some(area => section.title.toLowerCase().includes(area))) {
        // Enhance the content to emphasize this area
        return {
          ...section,
          content: `${section.content}\n\n**EMPHASIS AREA**: This section is particularly important for the project's focus on ${focusAreas.join(' and ')}.`
        };
      }
      return section;
    });

    // Adjust principle priorities based on focus areas
    const adjustedPrinciples = baseConstitution.principles.map(principle => {
      if (focusAreas.includes(principle.category as any)) {
        // Upgrade priority if it matches a focus area
        if (principle.priority === 'medium') {
          principle.priority = 'high';
        }
      }
      return principle;
    });

    // Create the customized constitution
    const customizedConstitution: ConstitutionDocument = {
      ...baseConstitution,
      sections: emphasizedSections,
      principles: adjustedPrinciples
    };

    return customizedConstitution;
  }

  /**
   * Generate a lightweight constitution for small projects
   * @param projectInfo Information about the project
   * @returns Lightweight constitution document
   */
  generateLightweightConstitution(projectInfo: ProjectInfo): ConstitutionDocument {
    const projectName = projectInfo.name;
    const projectDescription = projectInfo.description;
    const technologies = projectInfo.technologies;

    // Generate only essential principles
    const essentialPrinciples = PrincipleGenerator.generatePrinciples(
      projectName,
      projectDescription,
      technologies,
      []
    ).filter(principle => principle.priority === 'high');

    // Build only essential sections
    const essentialSections = [
      SectionBuilder.buildIntroductionSection(projectName, projectDescription),
      SectionBuilder.buildPurposeSection(projectName, projectDescription),
      SectionBuilder.buildDevelopmentPracticesSection(),
      SectionBuilder.buildQualityStandardsSection(),
      SectionBuilder.buildSecuritySection()
    ].map((section, index) => ({
      ...section,
      order: index + 1
    }));

    // Add technology-specific sections if relevant technologies are detected
    const techSections = SectionBuilder.buildTechnologySpecificSections(technologies);

    // Combine all sections
    const allSections = SectionBuilder.combineSections(
      essentialSections,
      techSections
    );

    // Update sections with project-specific details
    const updatedSections = SectionBuilder.updateSectionsWithProjectDetails(
      allSections,
      projectName,
      projectDescription
    );

    // Create the lightweight constitution document
    const constitution: ConstitutionDocument = {
      id: `lightweight-constitution_${Date.now()}`,
      title: `Lightweight Project Constitution for ${projectName}`,
      version: '1.0.0',
      createdAt: new Date(),
      updatedAt: new Date(),
      sections: updatedSections,
      principles: essentialPrinciples,
      authors: []
    };

    return constitution;
  }

  /**
   * Generate a customized constitution with specific options
   * @param projectInfo Information about the project
   * @param options Customization options for the constitution
   * @returns Customized constitution document
   */
  generateCustomizedConstitutionWithOptions(
    projectInfo: ProjectInfo,
    options: {
      includeSecurityFocus?: boolean;
      includePerformanceFocus?: boolean;
      includeQualityFocus?: boolean;
      includeArchitectureFocus?: boolean;
      includeTestingFocus?: boolean;
      includeDeploymentFocus?: boolean;
      customSections?: { id: string; title: string; content: string }[];
      customPrinciples?: { name: string; description: string; category: string; priority: string }[];
      excludeSections?: string[];
      excludePrinciples?: string[];
      version?: string;
      authors?: string[];
    }
  ): ConstitutionDocument {
    const projectName = projectInfo.name;
    const projectDescription = projectInfo.description;
    const technologies = projectInfo.technologies;

    // Generate principles based on project info
    let principles = PrincipleGenerator.generatePrinciples(
      projectName,
      projectDescription,
      technologies,
      []
    );

    // Apply custom principles if provided
    if (options.customPrinciples) {
      options.customPrinciples.forEach(customPrinciple => {
        principles.push({
          id: `custom-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
          name: customPrinciple.name,
          description: customPrinciple.description,
          category: customPrinciple.category as any,
          priority: customPrinciple.priority as any
        });
      });
    }

    // Filter out excluded principles
    if (options.excludePrinciples) {
      principles = principles.filter(principle => !options.excludePrinciples?.includes(principle.name));
    }

    // Build sections based on options
    let sections = SectionBuilder.buildStandardSections(projectName, projectDescription);

    // Add technology-specific sections
    const techSections = SectionBuilder.buildTechnologySpecificSections(technologies);
    sections = [...sections, ...techSections];

    // Add custom sections if provided
    if (options.customSections) {
      const customSections = options.customSections.map((section, index) => ({
        id: section.id,
        title: section.title,
        content: section.content,
        order: 1000 + index // Start from 1000 to ensure they come after standard sections
      }));
      sections = [...sections, ...customSections];
    }

    // Filter out excluded sections
    if (options.excludeSections) {
      sections = sections.filter(section => !options.excludeSections?.includes(section.title));
    }

    // Update sections with project-specific details
    const updatedSections = SectionBuilder.updateSectionsWithProjectDetails(
      sections,
      projectName,
      projectDescription
    );

    // Create the customized constitution document
    const constitution: ConstitutionDocument = {
      id: `custom-constitution_${Date.now()}`,
      title: options.includeSecurityFocus || options.includePerformanceFocus || options.includeQualityFocus
        ? `Custom Project Constitution for ${projectName} (${[
            options.includeSecurityFocus && 'Security',
            options.includePerformanceFocus && 'Performance',
            options.includeQualityFocus && 'Quality',
            options.includeArchitectureFocus && 'Architecture',
            options.includeTestingFocus && 'Testing',
            options.includeDeploymentFocus && 'Deployment'
          ].filter(Boolean).join('/')}-Focused)`
        : `Project Constitution for ${projectName}`,
      version: options.version || '1.0.0',
      createdAt: new Date(),
      updatedAt: new Date(),
      sections: updatedSections,
      principles,
      authors: options.authors || []
    };

    return constitution;
  }
}