export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/auth/', '/dashboard/'], // Private/login pages block
      },
    ],
    sitemap: 'https://sidraraza.xyz/sitemap.xml',
  }
}
