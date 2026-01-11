import { ConstitutionDocument } from '../types';

/**
 * Formats constitution documents in various output formats
 */
export class ConstitutionFormatter {
  /**
   * Format a constitution document as Markdown
   * @param constitution Constitution document to format
   * @returns Markdown representation of the constitution
   */
  static toMarkdown(constitution: ConstitutionDocument): string {
    let markdown = `# ${constitution.title}\n\n`;
    markdown += `**Version**: ${constitution.version}\n`;
    markdown += `**Created**: ${constitution.createdAt.toISOString()}\n`;
    markdown += `**Last Updated**: ${constitution.updatedAt.toISOString()}\n\n`;

    if (constitution.authors.length > 0) {
      markdown += `**Authors**: ${constitution.authors.join(', ')}\n\n`;
    }

    // Add table of contents
    markdown += '## Table of Contents\n\n';
    const sections = [...constitution.sections].sort((a, b) => a.order - b.order);
    sections.forEach(section => {
      const safeTitle = section.title.replace(/[^\w\s]/gi, '').replace(/\s+/g, '-').toLowerCase();
      markdown += `- [${section.title}](#${safeTitle})\n`;
    });
    markdown += '\n';

    // Add sections
    sections.forEach(section => {
      const safeTitle = section.title.replace(/[^\w\s]/gi, '').replace(/\s+/g, '-').toLowerCase();
      markdown += `## ${section.title} {#${safeTitle}}\n\n`;
      markdown += `${section.content}\n\n`;
    });

    // Add principles
    if (constitution.principles.length > 0) {
      markdown += '## Core Principles\n\n';
      const sortedPrinciples = [...constitution.principles].sort((a, b) => {
        // Sort by priority: high -> medium -> low, then alphabetically
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        if (priorityOrder[b.priority] !== priorityOrder[a.priority]) {
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        }
        return a.name.localeCompare(b.name);
      });

      sortedPrinciples.forEach(principle => {
        markdown += `### ${principle.name}\n\n`;
        markdown += `${principle.description}\n\n`;
        markdown += `**Category**: ${principle.category} | **Priority**: ${principle.priority}\n\n`;
      });
    }

    return markdown;
  }

  /**
   * Format a constitution document as HTML
   * @param constitution Constitution document to format
   * @returns HTML representation of the constitution
   */
  static toHtml(constitution: ConstitutionDocument): string {
    let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${constitution.title}</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; margin: 40px; }
    h1 { color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px; }
    h2 { color: #34495e; margin-top: 30px; }
    h3 { color: #5d6d7e; }
    .metadata { background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin-bottom: 20px; }
    .toc { background-color: #e8f4fd; padding: 15px; border-radius: 5px; margin: 20px 0; }
    .principle { border-left: 4px solid #3498db; padding: 10px; margin: 10px 0; background-color: #f8f9fa; }
    .category { display: inline-block; background-color: #95a5a6; color: white; padding: 2px 6px; border-radius: 3px; font-size: 0.8em; }
    .priority-high { background-color: #e74c3c; }
    .priority-medium { background-color: #f39c12; }
    .priority-low { background-color: #2ecc71; }
  </style>
</head>
<body>
  <h1>${constitution.title}</h1>

  <div class="metadata">
    <p><strong>Version</strong>: ${constitution.version}</p>
    <p><strong>Created</strong>: ${constitution.createdAt.toISOString()}</p>
    <p><strong>Last Updated</strong>: ${constitution.updatedAt.toISOString()}</p>`;

    if (constitution.authors.length > 0) {
      html += `<p><strong>Authors</strong>: ${constitution.authors.join(', ')}</p>`;
    }

    html += `</div>

  <div class="toc">
    <h3>Table of Contents</h3>
    <ul>`;

    const sections = [...constitution.sections].sort((a, b) => a.order - b.order);
    sections.forEach(section => {
      const safeTitle = section.title.replace(/[^\w\s]/gi, '').replace(/\s+/g, '-').toLowerCase();
      html += `      <li><a href="#${safeTitle}">${section.title}</a></li>\n`;
    });

    html += `    </ul>
  </div>`;

    // Add sections
    sections.forEach(section => {
      const safeTitle = section.title.replace(/[^\w\s]/gi, '').replace(/\s+/g, '-').toLowerCase();
      html += `  <h2 id="${safeTitle}">${section.title}</h2>\n  <div>${section.content.replace(/\n/g, '<br />')}</div>\n\n`;
    });

    // Add principles
    if (constitution.principles.length > 0) {
      html += `  <h2>Core Principles</h2>\n`;
      const sortedPrinciples = [...constitution.principles].sort((a, b) => {
        // Sort by priority: high -> medium -> low, then alphabetically
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        if (priorityOrder[b.priority] !== priorityOrder[a.priority]) {
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        }
        return a.name.localeCompare(b.name);
      });

      sortedPrinciples.forEach(principle => {
        const priorityClass = `priority-${principle.priority}`;
        html += `  <div class="principle">\n    <h3>${principle.name}</h3>\n    <p>${principle.description}</p>\n    <span class="category ${priorityClass}">${principle.category} | ${principle.priority}</span>\n  </div>\n\n`;
      });
    }

    html += `</body>
</html>`;

    return html;
  }

  /**
   * Format a constitution document as JSON
   * @param constitution Constitution document to format
   * @returns JSON representation of the constitution
   */
  static toJson(constitution: ConstitutionDocument): string {
    return JSON.stringify(constitution, null, 2);
  }

  /**
   * Format a constitution document as plain text
   * @param constitution Constitution document to format
   * @returns Plain text representation of the constitution
   */
  static toPlainText(constitution: ConstitutionDocument): string {
    let text = `${constitution.title}\n`;
    text += `${'='.repeat(constitution.title.length)}\n\n`;
    text += `Version: ${constitution.version}\n`;
    text += `Created: ${constitution.createdAt.toISOString()}\n`;
    text += `Last Updated: ${constitution.updatedAt.toISOString()}\n\n`;

    if (constitution.authors.length > 0) {
      text += `Authors: ${constitution.authors.join(', ')}\n\n`;
    }

    // Add sections
    const sections = [...constitution.sections].sort((a, b) => a.order - b.order);
    sections.forEach(section => {
      text += `${section.title}\n`;
      text += `${'-'.repeat(section.title.length)}\n`;
      text += `${section.content}\n\n`;
    });

    // Add principles
    if (constitution.principles.length > 0) {
      text += `Core Principles\n`;
      text += `${'='.repeat(15)}\n\n`;
      const sortedPrinciples = [...constitution.principles].sort((a, b) => {
        // Sort by priority: high -> medium -> low, then alphabetically
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        if (priorityOrder[b.priority] !== priorityOrder[a.priority]) {
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        }
        return a.name.localeCompare(b.name);
      });

      sortedPrinciples.forEach(principle => {
        text += `• ${principle.name}\n`;
        text += `  ${principle.description}\n`;
        text += `  Category: ${principle.category}, Priority: ${principle.priority}\n\n`;
      });
    }

    return text;
  }

  /**
   * Format a constitution document as a structured object
   * @param constitution Constitution document to format
   * @returns Structured object representation of the constitution
   */
  static toStructuredObject(constitution: ConstitutionDocument): any {
    return {
      title: constitution.title,
      version: constitution.version,
      metadata: {
        createdAt: constitution.createdAt,
        updatedAt: constitution.updatedAt,
        authors: constitution.authors
      },
      content: {
        sections: [...constitution.sections].sort((a, b) => a.order - b.order).map(section => ({
          id: section.id,
          title: section.title,
          content: section.content
        })),
        principles: [...constitution.principles].sort((a, b) => {
          // Sort by priority: high -> medium -> low, then alphabetically
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          if (priorityOrder[b.priority] !== priorityOrder[a.priority]) {
            return priorityOrder[b.priority] - priorityOrder[a.priority];
          }
          return a.name.localeCompare(b.name);
        })
      }
    };
  }

  /**
   * Format a constitution document for printing (condensed version)
   * @param constitution Constitution document to format
   * @returns Condensed printable representation of the constitution
   */
  static toPrintable(constitution: ConstitutionDocument): string {
    let text = `${constitution.title}\n`;
    text += `Version: ${constitution.version} | Created: ${constitution.createdAt.toISOString()} | Updated: ${constitution.updatedAt.toISOString()}\n`;
    text += `Authors: ${constitution.authors.join(', ')}\n\n`;

    // Add sections
    const sections = [...constitution.sections].sort((a, b) => a.order - b.order);
    sections.forEach(section => {
      text += `${section.title}\n`;
      text += `${section.content}\n\n`;
    });

    // Add principles
    if (constitution.principles.length > 0) {
      text += `CORE PRINCIPLES:\n`;
      const sortedPrinciples = [...constitution.principles].sort((a, b) => {
        // Sort by priority: high -> medium -> low, then alphabetically
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        if (priorityOrder[b.priority] !== priorityOrder[a.priority]) {
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        }
        return a.name.localeCompare(b.name);
      });

      sortedPrinciples.forEach(principle => {
        text += `• ${principle.name}: ${principle.description}\n`;
      });
    }

    return text;
  }
}