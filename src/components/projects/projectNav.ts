import type { MouseEvent } from 'react';
import { allowBrowserDefaultNav } from '../../lib/spaLink';
import { CALMIRING_EXTERNAL_URL, PROJECT_ENABLED, PROJECT_SLUGS } from './projectOrder';

export function getProjectCaseStudyHref(projectId: string): string | null {
  if (PROJECT_ENABLED[projectId] === false) return null;
  if (projectId === 'CalmiRing') return CALMIRING_EXTERNAL_URL;
  const slug = PROJECT_SLUGS[projectId] ?? projectId.toLowerCase();
  return `/${slug}`;
}

export function isExternalCaseStudyProject(projectId: string): boolean {
  return projectId === 'CalmiRing';
}

/** Plain primary click on an in-app case study link: SPA navigate. External + modified clicks stay native. */
export function handleProjectCaseStudyAnchorClick(
  e: MouseEvent<HTMLAnchorElement>,
  projectId: string,
  navigate?: (id: string) => void,
): void {
  if (isExternalCaseStudyProject(projectId)) return;
  if (allowBrowserDefaultNav(e)) return;
  if (!navigate) return;
  e.preventDefault();
  navigate(projectId);
}
