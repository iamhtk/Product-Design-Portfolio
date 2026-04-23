/** Paths for main site sections (not case studies). Single source for URLs + SPA routing. */
export const SITE_CONTENT_PATHS = {
  work: '/',
  about: '/about-me',
  friends: '/friends',
  resume: '/resume-experience',
  favorites: '/myfavorites',
  blog: '/blog',
  analytics: '/analytics',
} as const;

export type SiteContentPage = keyof typeof SITE_CONTENT_PATHS;

export const SITE_PATH_TO_CONTENT_PAGE: Record<string, SiteContentPage> = {
  '/': 'work',
  '/about-me': 'about',
  '/friends': 'friends',
  '/resume-experience': 'resume',
  '/myfavorites': 'favorites',
  '/blog': 'blog',
  '/analytics': 'analytics',
};
