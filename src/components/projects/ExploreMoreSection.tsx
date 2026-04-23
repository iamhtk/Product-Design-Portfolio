import {
  PROJECT_ORDER,
  PROJECT_TILE_MEDIA,
  PROJECT_ENABLED,
} from './projectOrder';
import { allowBrowserDefaultNav } from '../../lib/spaLink';
import {
  getProjectCaseStudyHref,
  handleProjectCaseStudyAnchorClick,
  isExternalCaseStudyProject,
} from './projectNav';

export interface ExploreMoreSectionProps {
  currentProjectId: string;
  onBack: () => void;
  onProjectClick?: (projectId: string) => void;
  /** Prev/next project titles (e.g. `#ffffff` on dark case studies). Default dark for light pages. */
  projectTitleColor?: string;
}

function isProjectEnabled(projectId: string): boolean {
  return PROJECT_ENABLED[projectId] !== false;
}

export function ExploreMoreSection({
  currentProjectId,
  onBack,
  onProjectClick,
  projectTitleColor,
}: ExploreMoreSectionProps) {
  const titleEnabledColor = projectTitleColor ?? '#111827';
  const titleDisabledColor = projectTitleColor ? 'rgba(255,255,255,0.45)' : undefined;
  const index = PROJECT_ORDER.findIndex((p) => p.id === currentProjectId);
  const calmiRing = PROJECT_ORDER.find((p) => p.id === 'CalmiRing')!;
  const prevProject =
    index === 0
      ? calmiRing
      : index > 0
        ? PROJECT_ORDER[index - 1]
        : null;
  const nextProject =
    index >= 0 && index < PROJECT_ORDER.length - 1 ? PROJECT_ORDER[index + 1] : null;

  const hasPrev = !!prevProject;
  const hasNext = !!nextProject;
  const prevHref = prevProject ? getProjectCaseStudyHref(prevProject.id) : null;
  const nextHref = nextProject ? getProjectCaseStudyHref(nextProject.id) : null;

  return (
    <div className="pt-24 pb-8">
      <div className="mb-12">
        <p className="text-[11px] tracking-[0.2em] text-gray-400 uppercase font-medium mb-6">
          Explore more
        </p>
        <div className="flex flex-wrap items-stretch justify-between gap-10 md:gap-12">
          {/* Previous / Left block */}
          <div
            className="min-w-0 flex-1 flex justify-start"
            style={{ maxWidth: 'min(48%, 480px)' }}
          >
            {hasPrev ? (
              prevHref ? (
                <a
                  href={prevHref}
                  {...(isExternalCaseStudyProject(prevProject.id)
                    ? { target: '_blank' as const, rel: 'noopener noreferrer' as const }
                    : {})}
                  onClick={(e) =>
                    handleProjectCaseStudyAnchorClick(e, prevProject.id, onProjectClick)
                  }
                  className="p-0 m-0 border-0 bg-transparent text-left cursor-pointer block w-full max-w-[280px] group transition-all duration-300 ease-out hover:-translate-y-1 no-underline text-inherit rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-gray-900/15 focus-visible:ring-offset-2"
                >
                  <div className="p-0 h-full flex flex-col transition-all duration-300 ease-out">
                    <div
                      className="flex-shrink-0 w-full rounded-lg overflow-hidden mb-4 shadow-[var(--shadow-subtle)] transition-all duration-300 ease-out group-hover:shadow-[var(--shadow-card)]"
                      style={{
                        backgroundColor:
                          PROJECT_TILE_MEDIA[prevProject.id]?.bgColor ?? '#f5f5f5',
                        aspectRatio: '4 / 3',
                      }}
                    >
                      {PROJECT_TILE_MEDIA[prevProject.id] &&
                        (/\.(mp4|webm|mov)(\?|$)/i.test(
                          PROJECT_TILE_MEDIA[prevProject.id].image
                        ) ? (
                          <video
                            src={PROJECT_TILE_MEDIA[prevProject.id].image}
                            className={`w-full h-full object-cover object-left block transition-transform duration-300 ease-out ${
                              isProjectEnabled(prevProject.id) ? 'group-hover:scale-105' : ''
                            }`}
                            autoPlay
                            loop
                            muted
                            playsInline
                            aria-label={prevProject.title}
                          />
                        ) : (
                          <img
                            src={PROJECT_TILE_MEDIA[prevProject.id].image}
                            alt={prevProject.title}
                            className={`w-full h-full object-cover object-left block transition-transform duration-300 ease-out ${
                              isProjectEnabled(prevProject.id) ? 'group-hover:scale-105' : ''
                            }`}
                            loading="lazy"
                          />
                        ))}
                    </div>
                    <span className="text-[11px] tracking-[0.15em] text-gray-400 uppercase mb-1.5">
                      Previous
                    </span>
                    <span
                      className={`block w-full text-left text-[15px] md:text-[17px] font-semibold leading-snug transition-opacity duration-300 ${
                        isProjectEnabled(prevProject.id) ? 'group-hover:opacity-80' : ''
                      } ${!isProjectEnabled(prevProject.id) && !projectTitleColor ? 'text-gray-500' : ''}`}
                      style={{
                        color: isProjectEnabled(prevProject.id)
                          ? titleEnabledColor
                          : titleDisabledColor,
                      }}
                    >
                      ← {prevProject.title}
                    </span>
                  </div>
                </a>
              ) : (
                <div className="p-0 m-0 block w-full max-w-[280px] group cursor-not-allowed opacity-70">
                  <div className="p-0 h-full flex flex-col transition-all duration-300 ease-out">
                    <div
                      className="flex-shrink-0 w-full rounded-lg overflow-hidden mb-4 shadow-[var(--shadow-subtle)] transition-all duration-300 ease-out"
                      style={{
                        backgroundColor:
                          PROJECT_TILE_MEDIA[prevProject.id]?.bgColor ?? '#f5f5f5',
                        aspectRatio: '4 / 3',
                      }}
                    >
                      {PROJECT_TILE_MEDIA[prevProject.id] &&
                        (/\.(mp4|webm|mov)(\?|$)/i.test(
                          PROJECT_TILE_MEDIA[prevProject.id].image
                        ) ? (
                          <video
                            src={PROJECT_TILE_MEDIA[prevProject.id].image}
                            className="w-full h-full object-cover object-left block transition-transform duration-300 ease-out"
                            autoPlay
                            loop
                            muted
                            playsInline
                            aria-label={prevProject.title}
                          />
                        ) : (
                          <img
                            src={PROJECT_TILE_MEDIA[prevProject.id].image}
                            alt={prevProject.title}
                            className="w-full h-full object-cover object-left block transition-transform duration-300 ease-out"
                            loading="lazy"
                          />
                        ))}
                    </div>
                    <span className="text-[11px] tracking-[0.15em] text-gray-400 uppercase mb-1.5">
                      Previous
                    </span>
                    <span
                      className={`block w-full text-left text-[15px] md:text-[17px] font-semibold leading-snug ${
                        !isProjectEnabled(prevProject.id) && !projectTitleColor ? 'text-gray-500' : ''
                      }`}
                      style={{
                        color: isProjectEnabled(prevProject.id)
                          ? titleEnabledColor
                          : titleDisabledColor,
                      }}
                    >
                      ← {prevProject.title}
                    </span>
                  </div>
                </div>
              )
            ) : (
              <div className="p-0 max-w-[280px] opacity-60">
                <span className="text-[15px] md:text-[17px] text-gray-400">
                  Previous project
                </span>
              </div>
            )}
          </div>

          <div
            className="hidden md:block flex-shrink-0 w-px bg-gray-200/60 self-stretch"
            aria-hidden
          />

          {/* Next / Right block, 280px card, content right-aligned to match image */}
          <div
            className="min-w-0 flex-1 flex justify-end"
            style={{ maxWidth: 'min(48%, 480px)' }}
          >
            {hasNext ? (
              nextHref ? (
                <a
                  href={nextHref}
                  {...(isExternalCaseStudyProject(nextProject.id)
                    ? { target: '_blank' as const, rel: 'noopener noreferrer' as const }
                    : {})}
                  onClick={(e) =>
                    handleProjectCaseStudyAnchorClick(e, nextProject.id, onProjectClick)
                  }
                  className={`p-0 m-0 border-0 bg-transparent w-full max-w-[280px] group transition-all duration-300 ease-out no-underline text-inherit rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-gray-900/15 focus-visible:ring-offset-2 ${
                    isProjectEnabled(nextProject.id)
                      ? 'cursor-pointer hover:-translate-y-1'
                      : 'cursor-not-allowed opacity-70'
                  }`}
                  style={{ textAlign: 'right' }}
                >
                  <div
                    className={`rounded-lg overflow-hidden mb-4 shadow-[var(--shadow-subtle)] transition-all duration-300 ease-out ${
                      isProjectEnabled(nextProject.id) ? 'group-hover:shadow-[var(--shadow-card)]' : ''
                    }`}
                    style={{
                      backgroundColor:
                        PROJECT_TILE_MEDIA[nextProject.id]?.bgColor ?? '#f5f5f5',
                      aspectRatio: '4 / 3',
                    }}
                  >
                    {PROJECT_TILE_MEDIA[nextProject.id] &&
                      (/\.(mp4|webm|mov)(\?|$)/i.test(
                        PROJECT_TILE_MEDIA[nextProject.id].image
                      ) ? (
                        <video
                          src={PROJECT_TILE_MEDIA[nextProject.id].image}
                          className={`w-full h-full object-cover object-right block transition-transform duration-300 ease-out ${
                            isProjectEnabled(nextProject.id) ? 'group-hover:scale-105' : ''
                          }`}
                          autoPlay
                          loop
                          muted
                          playsInline
                          aria-label={nextProject.title}
                        />
                      ) : (
                        <img
                          src={PROJECT_TILE_MEDIA[nextProject.id].image}
                          alt={nextProject.title}
                          className={`w-full h-full object-cover object-right block transition-transform duration-300 ease-out ${
                            isProjectEnabled(nextProject.id) ? 'group-hover:scale-105' : ''
                          }`}
                          loading="lazy"
                        />
                      ))}
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div className="text-[11px] tracking-[0.15em] text-gray-400 uppercase mb-1.5">
                      Next
                    </div>
                    <div
                      className={`text-[15px] md:text-[17px] font-semibold leading-snug transition-opacity duration-300 ${
                        isProjectEnabled(nextProject.id) ? 'group-hover:opacity-80' : ''
                      } ${!isProjectEnabled(nextProject.id) && !projectTitleColor ? 'text-gray-500' : ''}`}
                      style={{
                        color: isProjectEnabled(nextProject.id)
                          ? titleEnabledColor
                          : titleDisabledColor,
                      }}
                    >
                      {nextProject.title} →
                    </div>
                  </div>
                </a>
              ) : (
                <div
                  className="p-0 m-0 w-full max-w-[280px] group cursor-not-allowed opacity-70"
                  style={{ textAlign: 'right' }}
                >
                  <div
                    className="rounded-lg overflow-hidden mb-4 shadow-[var(--shadow-subtle)] transition-all duration-300 ease-out"
                    style={{
                      backgroundColor:
                        PROJECT_TILE_MEDIA[nextProject.id]?.bgColor ?? '#f5f5f5',
                      aspectRatio: '4 / 3',
                    }}
                  >
                    {PROJECT_TILE_MEDIA[nextProject.id] &&
                      (/\.(mp4|webm|mov)(\?|$)/i.test(
                        PROJECT_TILE_MEDIA[nextProject.id].image
                      ) ? (
                        <video
                          src={PROJECT_TILE_MEDIA[nextProject.id].image}
                          className="w-full h-full object-cover object-right block transition-transform duration-300 ease-out"
                          autoPlay
                          loop
                          muted
                          playsInline
                          aria-label={nextProject.title}
                        />
                      ) : (
                        <img
                          src={PROJECT_TILE_MEDIA[nextProject.id].image}
                          alt={nextProject.title}
                          className="w-full h-full object-cover object-right block transition-transform duration-300 ease-out"
                          loading="lazy"
                        />
                      ))}
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div className="text-[11px] tracking-[0.15em] text-gray-400 uppercase mb-1.5">
                      Next
                    </div>
                    <div
                      className={`text-[15px] md:text-[17px] font-semibold leading-snug ${
                        !isProjectEnabled(nextProject.id) && !projectTitleColor ? 'text-gray-500' : ''
                      }`}
                      style={{
                        color: isProjectEnabled(nextProject.id)
                          ? titleEnabledColor
                          : titleDisabledColor,
                      }}
                    >
                      {nextProject.title} →
                    </div>
                  </div>
                </div>
              )
            ) : (
              <div className="p-0 max-w-[280px] ml-auto opacity-60 text-right">
                <span className="text-[15px] md:text-[17px] text-gray-400">
                  Next project
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="mb-12">
        <a
          href="/"
          onClick={(e) => {
            if (allowBrowserDefaultNav(e)) return;
            e.preventDefault();
            onBack();
          }}
          className="inline-block text-[17px] text-gray-700 hover:text-gray-900 transition-colors duration-300 font-medium cursor-pointer focus-ring rounded focus:outline-none no-underline"
        >
          ← Back to Homepage
        </a>
      </div>
    </div>
  );
}
