import * as path from 'path';
import * as fs from 'fs-extra';
import { ConfigManager } from '../config';

/**
 * Detects the technology stack used in a project
 */
export class TechStackDetector {
  private configManager: ConfigManager;

  constructor(configManager: ConfigManager) {
    this.configManager = configManager;
  }

  /**
   * Detect the technology stack of a project
   * @param projectPath Path to the project to analyze
   * @returns Array of detected technologies
   */
  async detect(projectPath: string): Promise<string[]> {
    const technologies: string[] = [];

    // Check for common configuration files that indicate technologies
    const techIndicators = {
      // Languages
      'TypeScript': ['tsconfig.json', '.ts', '.tsx'],
      'JavaScript': ['package.json', '.js', '.jsx'],
      'Python': ['.py', 'requirements.txt', 'setup.py', 'Pipfile', 'pyproject.toml'],
      'Java': ['.java', 'pom.xml', 'build.gradle', 'build.gradle.kts'],
      'C#': ['.cs', '.csproj', '.sln'],
      'Go': ['.go', 'go.mod', 'Gopkg.toml'],
      'Rust': ['.rs', 'Cargo.toml'],
      'PHP': ['.php', 'composer.json'],
      'Ruby': ['.rb', 'Gemfile', 'Rakefile'],
      'C++': ['.cpp', '.cxx', '.cc', '.hpp', '.hxx', '.hh'],
      'C': ['.c', '.h'],
      'Swift': ['.swift'],
      'Kotlin': ['.kt', '.kts'],
      'Scala': ['.scala', '.sc'],
      'Dart': ['.dart'],
      'Lua': ['.lua'],
      'R': ['.R', '.r'],
      'Shell': ['.sh', '.bash', '.zsh', '.fish'],

      // Frontend Frameworks
      'React': ['react', '@types/react', 'react-dom'],
      'Angular': ['angular', '@angular/core'],
      'Vue.js': ['vue', '@vue/cli-service'],
      'Svelte': ['svelte', 'svelte-check'],
      'Next.js': ['next', 'next.config.js', 'next.config.ts'],
      'Nuxt.js': ['nuxt', 'nuxt.config.js'],
      'Gatsby': ['gatsby', 'gatsby-config.js'],
      'Astro': ['astro', 'astro.config.mjs'],
      'Remix': ['@remix-run/react', '@remix-run/node'],

      // Backend Frameworks
      'Node.js': ['package.json', 'server.js', 'app.js'],
      'Express.js': ['express'],
      'Fastify': ['fastify'],
      'Koa': ['koa'],
      'NestJS': ['@nestjs/core', '@nestjs/common'],
      'LoopBack': ['@loopback/rest'],
      'Hapi': ['@hapi/hapi'],
      'Feathers': ['@feathersjs/feathers'],
      'AdonisJS': ['@adonisjs/core'],
      'Strapi': ['strapi'],
      'Sanity': ['sanity', '@sanity/image-url'],
      'Prisma': ['prisma', '@prisma/client'],

      // Mobile Development
      'React Native': ['react-native'],
      'Flutter': ['flutter', 'pubspec.yaml'],
      'Ionic': ['@ionic/angular', '@ionic/react'],
      'NativeScript': ['nativescript'],

      // Databases
      'PostgreSQL': ['pg', 'postgresql.conf'],
      'MySQL': ['mysql', 'mysql2', 'sequelize'],
      'MongoDB': ['mongodb', 'mongoose', 'typeorm'],
      'SQLite': ['sqlite3', 'better-sqlite3'],
      'Redis': ['redis', '@redis/client'],
      'Firebase': ['firebase', 'firestore'],
      'Supabase': ['@supabase/supabase-js'],
      'Drizzle ORM': ['drizzle-orm', 'drizzle-kit'],
      'Prisma': ['@prisma/client', 'prisma'],
      'TypeORM': ['typeorm'],
      'Sequelize': ['sequelize'],

      // Testing
      'Jest': ['jest', '@jest/globals'],
      'Vitest': ['vitest'],
      'Mocha': ['mocha'],
      'Chai': ['chai'],
      'Cypress': ['cypress'],
      'Playwright': ['@playwright/test'],
      'Testing Library': ['@testing-library/react', '@testing-library/jest-dom'],
      'Enzyme': ['enzyme'],

      // Build Tools & Bundlers
      'Webpack': ['webpack', 'webpack.config.js'],
      'Vite': ['vite'],
      'Rollup': ['rollup'],
      'Parcel': ['parcel'],
      'Snowpack': ['snowpack'],
      'Turbopack': ['@rspack/core'], // Note: experimental

      // Transpilers
      'Babel': ['@babel/core', 'babel-loader'],
      'SWC': ['@swc/core', '@swc/helpers'],

      // Linters & Formatters
      'ESLint': ['eslint', '@typescript-eslint/parser'],
      'Prettier': ['prettier'],
      'Stylelint': ['stylelint'],

      // CSS & Styling
      'Tailwind CSS': ['tailwindcss'],
      'Sass': ['sass', 'node-sass'],
      'Less': ['less'],
      'Styled Components': ['styled-components'],
      'Emotion': ['@emotion/react', '@emotion/styled'],
      'CSS Modules': ['@css-modules/core'], // Note: placeholder, actual usage varies

      // State Management
      'Redux': ['redux', '@reduxjs/toolkit'],
      'MobX': ['mobx', 'mobx-react'],
      'Zustand': ['zustand'],
      'Recoil': ['recoil'],
      'Jotai': ['jotai'],
      'Valtio': ['valtio'],

      // GraphQL
      'GraphQL': ['graphql', 'apollo-server-express', '@apollo/client'],
      'Apollo Client': ['@apollo/client'],
      'Relay': ['relay-runtime'],
      'Hasura': ['@hasura/graphql-client'],

      // DevOps & Cloud
      'Docker': ['Dockerfile', 'docker-compose.yml'],
      'Kubernetes': ['.yaml', '.yml', 'k8s'], // files often have k8s configs
      'AWS': ['aws-sdk', '@aws-sdk/client-s3'],
      'Azure': ['@azure/storage-blob'],
      'Google Cloud': ['@google-cloud/storage'],
      'Vercel': ['vercel.json', 'now.json'],
      'Netlify': ['netlify.toml'],

      // Monitoring & Analytics
      'Sentry': ['@sentry/react', '@sentry/node'],
      'Datadog': ['@datadog/browser-logs'],
      'New Relic': ['newrelic'],
      'Google Analytics': ['react-ga4', 'gtag'],
      'Mixpanel': ['mixpanel-browser'],

      // Authentication
      'Auth0': ['auth0'],
      'Passport.js': ['passport'],
      'NextAuth.js': ['next-auth'],
      'Firebase Auth': ['firebase/auth'],
      'Clerk': ['@clerk/nextjs'],

      // AI/ML
      'TensorFlow.js': ['@tensorflow/tfjs'],
      'PyTorch': ['.py', 'torch'], // Python-based
      'Scikit-learn': ['.py', 'sklearn'], // Python-based

      // Documentation
      'Storybook': ['@storybook/react', '@storybook/vue3'],
      'Docusaurus': ['@docusaurus/core'],
      'GitBook': ['gitbook'],
      'MDX': ['@mdx-js/react'],

      // Architecture
      'Microservices': ['docker-compose.yml', 'kubernetes'], // Indicators
      'Serverless': ['serverless.yml', '@serverless/aws-lambda'],
      'Monorepo': ['lerna.json', 'nx.json', 'turbo.json', 'pnpm-workspace.yaml', 'packages'],
    };

    // Check for package.json dependencies first
    try {
      const packageJsonPath = path.join(projectPath, 'package.json');
      if (await fs.pathExists(packageJsonPath)) {
        const packageJson = await fs.readJSON(packageJsonPath);
        const allDeps = { ...packageJson.dependencies, ...packageJson.devDependencies };
        const depNames = Object.keys(allDeps);

        // Check which technologies are indicated by dependencies
        for (const [tech, indicators] of Object.entries(techIndicators)) {
          // Special case for frontend frameworks that depend on React
          if (['Next.js', 'Gatsby', 'Remix'].includes(tech)) {
            if (depNames.includes('react') && depNames.some(dep => dep.includes(tech.toLowerCase().split('.')[0]))) {
              technologies.push(tech);
            }
          } else {
            // Check if any of the indicators are present in dependencies
            const hasTechIndicator = indicators.some((indicator: string) =>
              depNames.includes(indicator) && !indicator.startsWith('.') && !indicator.startsWith('@types/')
            );

            if (hasTechIndicator) {
              technologies.push(tech);
            }
          }
        }
      }
    } catch (error) {
      console.warn('Could not analyze package.json for technology stack:', error);
    }

    // Check for specific files that indicate technologies
    for (const [tech, indicators] of Object.entries(techIndicators)) {
      // Skip if already added via dependencies
      if (technologies.includes(tech)) continue;

      for (const indicator of indicators) {
        // Skip dependency names since we already checked those
        if (!indicator.startsWith('.') && !indicator.startsWith('@types/') && !['react', 'react-dom', 'next', 'vue', 'angular', '@angular/core', 'express', 'fastify', 'jest', 'cypress', 'vite', 'webpack', 'tailwindcss', 'redux', 'graphql', 'apollo-client', 'prisma', 'drizzle-orm', 'mysql', 'pg', 'mongodb', 'mongoose', 'redis', 'aws-sdk', 'firebase', 'auth0', 'passport', 'next-auth', 'sentry', 'newrelic', 'mixpanel', 'storyblok', 'docusaurus', 'gitbook', 'mdx', 'serverless', 'lerna', 'nx', 'turbo', 'pnpm', 'docker', 'kubernetes', 'k8s', 'aws', 'azure', 'gcp', 'vercel', 'netlify', 'hasura', 'relay', 'recoil', 'jotai', 'valtio', 'styled-components', 'emotion', 'sass', 'less', 'css-modules', 'babel', 'swc', 'eslint', 'prettier', 'stylelint', 'webpack', 'rollup', 'parcel', 'snowpack', 'turbopack', 'testing-library', 'enzyme', 'playwright', 'vitest', 'mocha', 'chai', 'typescript', 'javascript', 'python', 'java', 'csharp', 'go', 'rust', 'php', 'ruby', 'cpp', 'c', 'swift', 'kotlin', 'scala', 'dart', 'lua', 'r', 'shell', 'flutter', 'react-native', 'ionic', 'nativescript', 'angular', 'vue', 'svelte', 'nuxt', 'astrot', 'tensorflow', 'pytorch', 'scikit', 'clerk', 'tensorflow.js'].includes(indicator.toLowerCase())) {
          continue;
        }

        // For file extensions, check if any files with that extension exist
        if (indicator.startsWith('.')) {
          const filesWithExt = await this.findFilesWithExtension(projectPath, indicator);
          if (filesWithExt.length > 0) {
            technologies.push(tech);
            break;
          }
        } else {
          // For configuration files, check if the file exists
          const configPath = path.join(projectPath, indicator);
          if (await fs.pathExists(configPath)) {
            technologies.push(tech);
            break;
          }

          // Also check variations of the config file name
          const variations = [
            indicator,
            `.${indicator}`,
            `${indicator}.json`,
            `${indicator}.js`,
            `${indicator}.ts`,
            `${indicator}.yml`,
            `${indicator}.yaml`,
            `${indicator}.toml`,
            `${indicator}.config.js`,
            `${indicator}.config.ts`
          ];

          for (const variation of variations) {
            const varPath = path.join(projectPath, variation);
            if (await fs.pathExists(varPath)) {
              technologies.push(tech);
              break;
            }
          }
        }
      }
    }

    // Remove duplicates and return
    return [...new Set(technologies)];
  }

  /**
   * Find all files with a specific extension in a project
   * @param projectPath Path to the project
   * @param extension Extension to search for (e.g., '.ts', '.js')
   * @returns Array of file paths
   */
  private async findFilesWithExtension(projectPath: string, extension: string): Promise<string[]> {
    const glob = require('glob');
    const pattern = `${projectPath}/**/*${extension}`;

    try {
      return await new Promise<string[]>((resolve, reject) => {
        glob(pattern, { nodir: true }, (err: Error | null, files: string[]) => {
          if (err) {
            reject(err);
          } else {
            resolve(files.map(file => path.relative(projectPath, file)));
          }
        });
      });
    } catch (error) {
      console.warn(`Could not find files with extension ${extension}:`, error);
      return [];
    }
  }

  /**
   * Detect version information for detected technologies
   * @param projectPath Path to the project
   * @param technologies List of detected technologies
   * @returns Object mapping technologies to their versions
   */
  async detectVersions(projectPath: string, technologies: string[]): Promise<{ [tech: string]: string }> {
    const versions: { [tech: string]: string } = {};

    try {
      const packageJsonPath = path.join(projectPath, 'package.json');
      if (await fs.pathExists(packageJsonPath)) {
        const packageJson = await fs.readJSON(packageJsonPath);
        const allDeps = { ...packageJson.dependencies, ...packageJson.devDependencies };

        // Map technology names to common package names
        const techToPackageMap: { [tech: string]: string[] } = {
          'React': ['react', '@types/react'],
          'Next.js': ['next'],
          'TypeScript': ['typescript', 'ts-node'],
          'Jest': ['jest', '@jest/globals'],
          'Webpack': ['webpack'],
          'Vite': ['vite'],
          'Tailwind CSS': ['tailwindcss'],
          'Redux': ['redux', '@reduxjs/toolkit'],
          'GraphQL': ['graphql'],
          'Prisma': ['prisma', '@prisma/client'],
          'Drizzle ORM': ['drizzle-orm'],
          'PostgreSQL': ['pg'],
          'MongoDB': ['mongodb', 'mongoose'],
          'Redis': ['redis'],
          'Docker': ['dockerode'], // Runtime Docker client
          'AWS': ['aws-sdk', '@aws-sdk/client-s3'],
          'Firebase': ['firebase', 'firebase-admin'],
          'Auth0': ['auth0'],
          'Sentry': ['@sentry/react', '@sentry/node'],
          'Storybook': ['@storybook/react'],
          'Cypress': ['cypress'],
          'Playwright': ['@playwright/test'],
          'ESLint': ['eslint'],
          'Prettier': ['prettier'],
        };

        for (const tech of technologies) {
          const packages = techToPackageMap[tech] || [tech.toLowerCase()];

          for (const pkg of packages) {
            if (allDeps[pkg]) {
              versions[tech] = typeof allDeps[pkg] === 'string'
                ? allDeps[pkg]
                : JSON.stringify(allDeps[pkg]);
              break;
            }
          }
        }
      }
    } catch (error) {
      console.warn('Could not detect versions for technologies:', error);
    }

    return versions;
  }

  /**
   * Identify potential technology stack issues
   * @param projectPath Path to the project
   * @returns Array of technology stack issues
   */
  async identifyTechStackIssues(projectPath: string): Promise<string[]> {
    const issues: string[] = [];

    try {
      const technologies = await this.detect(projectPath);

      // Check for mixed technologies that might indicate inconsistency
      const frontendFrameworks = technologies.filter(t =>
        ['React', 'Angular', 'Vue.js', 'Svelte'].includes(t)
      );
      if (frontendFrameworks.length > 1) {
        issues.push(`Multiple frontend frameworks detected: ${frontendFrameworks.join(', ')}. This may indicate inconsistent architecture.`);
      }

      // Check for mixed backend technologies
      const backendTechnologies = technologies.filter(t =>
        ['Express.js', 'Fastify', 'Koa', 'NestJS', 'LoopBack', 'Hapi', 'Feathers', 'AdonisJS'].includes(t)
      );
      if (backendTechnologies.length > 2) {
        issues.push(`Multiple backend frameworks detected: ${backendTechnologies.join(', ')}. Consider standardizing.`);
      }

      // Check for outdated technology combinations
      if (technologies.includes('AngularJS') && technologies.includes('React')) {
        issues.push('Legacy AngularJS and React detected in the same project. Consider migration strategy.');
      }

      // Check for missing key technologies
      if (technologies.includes('TypeScript') && !technologies.includes('ESLint')) {
        issues.push('TypeScript detected without ESLint. Consider adding linting for better code quality.');
      }

      if (technologies.includes('React') && !technologies.includes('Jest') && !technologies.includes('Vitest') && !technologies.includes('Cypress')) {
        issues.push('React detected without testing framework. Consider adding tests for better maintainability.');
      }
    } catch (error) {
      console.warn('Could not identify technology stack issues:', error);
    }

    return issues;
  }
}