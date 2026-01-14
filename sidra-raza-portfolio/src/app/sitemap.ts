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

  return routes.map((route) => {
    // Set different changeFrequency and priority for specific routes
    let changeFrequency = 'weekly';
    let priority = 0.8;

    if (route === '') {
      changeFrequency = 'daily';
      priority = 1;
    } else if (route === '/agents' || route.startsWith('/agents/')) {
      changeFrequency = 'daily';
      priority = route === '/agents' ? 0.9 : 0.7;
    } else if (route === '/contact') {
      changeFrequency = 'monthly';
      priority = 0.7;
    } else if (route === '/auth/sign-in' || route === '/auth/sign-up') {
      changeFrequency = 'monthly';
      priority = 0.5;
    } else if (route === '/dashboard') {
      changeFrequency = 'daily';
      priority = 0.6;
    }

    return {
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency,
      priority,
    };
  });
}
