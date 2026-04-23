import { PROJECT_ORDER } from './projectOrder';
import {
  getProjectCaseStudyHref,
  handleProjectCaseStudyAnchorClick,
  isExternalCaseStudyProject,
} from './projectNav';

interface AdjacentProjectsProps {
  currentProjectId: string;
  onProjectClick?: (projectId: string) => void;
}

export function AdjacentProjects({ currentProjectId, onProjectClick }: AdjacentProjectsProps) {
  const projectIndex = PROJECT_ORDER.findIndex((p) => p.id === currentProjectId);
  const prevProject = projectIndex > 0 ? PROJECT_ORDER[projectIndex - 1] : null;
  const nextProject =
    projectIndex >= 0 && projectIndex < PROJECT_ORDER.length - 1
      ? PROJECT_ORDER[projectIndex + 1]
      : null;

  const prevHref = prevProject ? getProjectCaseStudyHref(prevProject.id) : null;
  const nextHref = nextProject ? getProjectCaseStudyHref(nextProject.id) : null;

  const linkClass =
    'text-[15px] md:text-[17px] text-gray-600 hover:text-gray-900 transition-colors font-medium no-underline rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-gray-900/15 focus-visible:ring-offset-2';

  return (
    <div className="flex flex-wrap items-center justify-between gap-6 mb-12">
      <div className="min-w-0 flex-1 text-left">
        {prevProject && onProjectClick ? (
          prevHref ? (
            <a
              href={prevHref}
              {...(isExternalCaseStudyProject(prevProject.id)
                ? { target: '_blank' as const, rel: 'noopener noreferrer' as const }
                : {})}
              onClick={(e) =>
                handleProjectCaseStudyAnchorClick(e, prevProject.id, onProjectClick)
              }
              className={`${linkClass} text-left`}
            >
              ← {prevProject.title}
            </a>
          ) : (
            <span className="text-[15px] md:text-[17px] text-gray-400">
              ← {prevProject.title}
            </span>
          )
        ) : (
          <span className="text-[15px] md:text-[17px] text-gray-400" aria-hidden>
            Previous project
          </span>
        )}
      </div>
      <div className="min-w-0 flex-1 text-right">
        {nextProject && onProjectClick ? (
          nextHref ? (
            <a
              href={nextHref}
              {...(isExternalCaseStudyProject(nextProject.id)
                ? { target: '_blank' as const, rel: 'noopener noreferrer' as const }
                : {})}
              onClick={(e) =>
                handleProjectCaseStudyAnchorClick(e, nextProject.id, onProjectClick)
              }
              className={`${linkClass} text-right ml-auto inline-block`}
            >
              {nextProject.title} →
            </a>
          ) : (
            <span className="text-[15px] md:text-[17px] text-gray-400 inline-block ml-auto">
              {nextProject.title} →
            </span>
          )
        ) : (
          <span className="text-[15px] md:text-[17px] text-gray-400" aria-hidden>
            Next project
          </span>
        )}
      </div>
    </div>
  );
}
