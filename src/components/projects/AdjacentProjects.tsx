import { PROJECT_ORDER } from './projectOrder';

interface AdjacentProjectsProps {
  currentProjectId: string;
  onProjectClick?: (projectId: string) => void;
}

export function AdjacentProjects({ currentProjectId, onProjectClick }: AdjacentProjectsProps) {
  const projectIndex = PROJECT_ORDER.findIndex((p) => p.id === currentProjectId);
  const prevProject = projectIndex > 0 ? PROJECT_ORDER[projectIndex - 1] : null;
  const nextProject = projectIndex >= 0 && projectIndex < PROJECT_ORDER.length - 1 ? PROJECT_ORDER[projectIndex + 1] : null;

  return (
    <div className="flex flex-wrap items-center justify-between gap-6 mb-12">
      <div className="min-w-0 flex-1 text-left">
        {prevProject && onProjectClick ? (
          <button
            type="button"
            onClick={() => onProjectClick(prevProject.id)}
            className="text-[15px] md:text-[17px] text-gray-600 hover:text-gray-900 transition-colors font-medium text-left"
          >
            ← {prevProject.title}
          </button>
        ) : (
          <span className="text-[15px] md:text-[17px] text-gray-400" aria-hidden>Previous project</span>
        )}
      </div>
      <div className="min-w-0 flex-1 text-right">
        {nextProject && onProjectClick ? (
          <button
            type="button"
            onClick={() => onProjectClick(nextProject.id)}
            className="text-[15px] md:text-[17px] text-gray-600 hover:text-gray-900 transition-colors font-medium text-right ml-auto"
          >
            {nextProject.title} →
          </button>
        ) : (
          <span className="text-[15px] md:text-[17px] text-gray-400" aria-hidden>Next project</span>
        )}
      </div>
    </div>
  );
}
