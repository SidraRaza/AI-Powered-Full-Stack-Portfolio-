export default function sitemap() {
  const baseUrl = 'https://sidraraza.xyz';

  // Define all your routes
  const routes = [
    '', // Homepage
    '/about',
    '/services',
    '/skills',
    '/projects',
    '/agents',
    '/agents/ai-assistant',
    '/agents/business-validator',
    '/agents/content-strategist',
    '/agents/proposal-generator',
    '/contact',
    '/auth/sign-in',
    '/auth/sign-up',
    '/dashboard',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly', // Homepage updates more often
    priority: route === '' ? 1 : 0.8, // Homepage has highest priority
  }));
}
