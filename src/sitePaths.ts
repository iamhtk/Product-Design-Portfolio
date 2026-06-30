import { PROJECT_SLUGS } from './components/projects/projectOrder';

/** Set to true when the Work page and /work route are ready to ship. */
export const WORK_PAGE_ENABLED = false;

/** Case study paths keyed by project id (e.g. CoyaxDesignSystem → /coyax-design-system). */
export const PROJECT_PATHS: Record<string, string> = Object.fromEntries(
  Object.entries(PROJECT_SLUGS).map(([id, slug]) => [id, `/${slug}`]),
);

/** Reverse lookup: /coyax-design-system → CoyaxDesignSystem */
export const CASE_STUDY_PATH_TO_PROJECT_ID: Record<string, string> = Object.fromEntries(
  Object.entries(PROJECT_SLUGS).map(([id, slug]) => [`/${slug}`, id]),
);

/** Paths for main site sections (not case studies). Single source for URLs + SPA routing. */
export const SITE_CONTENT_PATHS = {
  home: '/',
  work: '/work',
  about: '/about-me',
  friends: '/friends',
  resume: '/resume-experience',
  favorites: '/myfavorites',
  blog: '/blog',
  analytics: '/analytics',
} as const;

export type SiteContentPage = keyof typeof SITE_CONTENT_PATHS;

export const SITE_PATH_TO_CONTENT_PAGE: Record<string, SiteContentPage> = {
  '/': 'home',
  '/work': 'work',
  '/about-me': 'about',
  '/friends': 'friends',
  '/resume-experience': 'resume',
  '/myfavorites': 'favorites',
  '/blog': 'blog',
  '/analytics': 'analytics',
};
