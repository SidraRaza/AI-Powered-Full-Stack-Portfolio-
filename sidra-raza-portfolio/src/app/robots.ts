export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/auth/', '/dashboard/'], // Block private/login pages
      },
    ],
    sitemap: 'https://sidraraza.xyz/sitemap.xml',
  };
}
