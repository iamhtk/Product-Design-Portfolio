import { PROJECT_SLUGS } from '../components/projects/projectOrder';
import { DEFAULT_OG_IMAGE, SITE_URL } from './siteConfig';

/** Slug → public path under /og/projects/ (generated at build). */
const PROJECT_OG_PATH_BY_ID: Record<string, string> = {
  CWPC: '/og/projects/cwpc-prism-design-system.jpg',
  CWPC_DS: '/og/projects/cwpc-ds-case-study.jpg',
  AutomotiveUX_GM: '/og/projects/automotive-ux-cadillac-escalade.jpg',
  RaseetHealth: '/og/projects/raseet-health.jpg',
  RaseetHealth_DS: '/og/projects/raseet-health-ds-case-study.jpg',
  CoyaxDesignSystem: '/og/projects/coyax-design-system.jpg',
  BMW: '/og/projects/bmw-idrive-redesign.jpg',
  PortfolioDesignSystem: '/og/projects/portfolio-design-system.jpg',
  CalmiRing: '/og/projects/calmiring.jpg',
};

const PROJECT_OG_BY_SLUG: Record<string, string> = Object.fromEntries(
  Object.entries(PROJECT_OG_PATH_BY_ID).map(([id, path]) => [
    PROJECT_SLUGS[id] ?? id.toLowerCase(),
    `${SITE_URL}${path}`,
  ]),
);

export function getProjectOgImage(projectId: string): string {
  const slug = PROJECT_SLUGS[projectId] ?? projectId.toLowerCase();
  return PROJECT_OG_BY_SLUG[slug] ?? DEFAULT_OG_IMAGE;
}
