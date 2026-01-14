export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/', // Agar koi private folder ho toh yahan likhein
    },
    sitemap: 'https://sidraraza.xyz/sitemap.xml',
  }
}