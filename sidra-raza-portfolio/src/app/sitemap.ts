export default function sitemap() {
  const baseUrl = 'https://sidraraza.xyz';

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
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));
}
