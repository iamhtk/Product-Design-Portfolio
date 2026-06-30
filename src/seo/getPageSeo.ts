import { PROJECT_ENABLED, PROJECT_ORDER, PROJECT_SLUGS } from '../components/projects/projectOrder';
import { SITE_CONTENT_PATHS } from '../sitePaths';
import {
  CONTACT_EMAIL,
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  DEFAULT_TITLE,
  SITE_NAME,
  SITE_ROLE,
  SITE_URL,
} from './siteConfig';
import { getProjectOgImage } from './projectOgImages';

export type SeoPage =
  | 'home'
  | 'work'
  | 'about'
  | 'friends'
  | 'resume'
  | 'favorites'
  | 'blog'
  | 'analytics'
  | 'project';

export type PageSeo = {
  title: string;
  description: string;
  canonical: string;
  ogImage: string;
  ogType: 'website' | 'article';
  noindex: boolean;
};

const CONTENT_PAGE_SEO: Record<
  Exclude<SeoPage, 'project' | 'analytics'>,
  Pick<PageSeo, 'title' | 'description'>
> = {
  home: {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },
  work: {
    title: `Work — ${SITE_NAME}`,
    description:
      'Selected case studies, design systems, shipped products, and AI-built experiments by Hrithik Sanyal, Design Engineer.',
  },
  about: {
    title: `About — ${SITE_NAME}`,
    description:
      'Learn about Hrithik Sanyal — Design Engineer, University of Michigan School of Information alum, and experience across IBM, GM, CWPC, and more.',
  },
  resume: {
    title: `Resume & Experience — ${SITE_NAME}`,
    description:
      'Resume and professional experience for Hrithik Sanyal — Design Engineer with work in HealthTech, automotive, design systems, and SaaS.',
  },
  blog: {
    title: `Blog — ${SITE_NAME}`,
    description: 'Writing on design, engineering, interfaces, and building thoughtful products.',
  },
  friends: {
    title: `Friends & Collaborators — ${SITE_NAME}`,
    description:
      'People Hrithik Sanyal has worked and collaborated with across design, product, and engineering.',
  },
  favorites: {
    title: `Favorites — ${SITE_NAME}`,
    description: 'Music, books, and cultural favorites from Hrithik Sanyal.',
  },
};

function projectTitleById(projectId: string): string {
  return PROJECT_ORDER.find((p) => p.id === projectId)?.title ?? projectId;
}

function projectDescription(projectId: string, title: string): string {
  return `Case study: ${title}. By ${SITE_NAME}, ${SITE_ROLE}.`;
}

function buildCanonical(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  if (normalized === '/') return `${SITE_URL}/`;
  return `${SITE_URL}${normalized}`;
}

export function buildPathForSeo(page: SeoPage, projectId: string | null): string {
  if (page === 'project' && projectId) {
    const slug = PROJECT_SLUGS[projectId] ?? projectId.toLowerCase();
    return `/${slug}`;
  }
  if (page === 'project') return '/';
  return SITE_CONTENT_PATHS[page as keyof typeof SITE_CONTENT_PATHS];
}

export function getPageSeo(page: SeoPage, projectId: string | null): PageSeo {
  const path = buildPathForSeo(page, projectId);

  if (page === 'analytics') {
    return {
      title: `Analytics — ${SITE_NAME}`,
      description: 'Private analytics dashboard.',
      canonical: buildCanonical(path),
      ogImage: DEFAULT_OG_IMAGE,
      ogType: 'website',
      noindex: true,
    };
  }

  if (page === 'project' && projectId && PROJECT_ENABLED[projectId] !== false) {
    const title = projectTitleById(projectId);
    return {
      title: `${title} — ${SITE_NAME}`,
      description: projectDescription(projectId, title),
      canonical: buildCanonical(path),
      ogImage: getProjectOgImage(projectId),
      ogType: 'article',
      noindex: false,
    };
  }

  const content = CONTENT_PAGE_SEO[page as Exclude<SeoPage, 'project' | 'analytics'>];
  return {
    ...content,
    canonical: buildCanonical(path),
    ogImage: DEFAULT_OG_IMAGE,
    ogType: 'website',
    noindex: false,
  };
}

export function getPersonJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: SITE_NAME,
    jobTitle: SITE_ROLE,
    url: SITE_URL,
    email: CONTACT_EMAIL,
    sameAs: [
      'https://www.linkedin.com/in/iamhtk',
      'https://github.com/iamhtk',
      'https://www.figma.com/@iamhtk',
      'https://www.youtube.com/@avlnce',
    ],
    knowsAbout: [
      'Product Design',
      'Design Systems',
      'User Experience',
      'HealthTech',
      'Automotive UX',
      'Design Engineering',
    ],
  };
}

export function getWebSiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: `${SITE_NAME} — ${SITE_ROLE}`,
    url: SITE_URL,
    description: DEFAULT_DESCRIPTION,
    inLanguage: 'en-US',
    author: { '@type': 'Person', name: SITE_NAME, url: SITE_URL },
  };
}

export function getCreativeWorkJsonLd(seo: PageSeo, projectId: string) {
  const title = projectTitleById(projectId);
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: title,
    headline: title,
    description: seo.description,
    url: seo.canonical,
    author: { '@type': 'Person', name: SITE_NAME, url: SITE_URL },
    inLanguage: 'en-US',
  };
}
