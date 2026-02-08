import {
  PROJECT_ORDER,
  PROJECT_TILE_MEDIA,
  CALMIRING_EXTERNAL_URL,
} from './projectOrder';

export interface ExploreMoreSectionProps {
  currentProjectId: string;
  onBack: () => void;
  onProjectClick?: (projectId: string) => void;
}

function handleProjectNav(projectId: string, onProjectClick?: (projectId: string) => void) {
  if (projectId === 'CalmiRing') {
    window.open(CALMIRING_EXTERNAL_URL, '_blank');
  } else {
    onProjectClick?.(projectId);
  }
}

export function ExploreMoreSection({
  currentProjectId,
  onBack,
  onProjectClick,
}: ExploreMoreSectionProps) {
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

  return (
    <div className="pt-24 pb-8">
      <div className="glass-panel rounded-2xl border border-black/[0.06] px-6 py-8 md:px-10 md:py-10 mb-12">
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
              <button
                type="button"
                onClick={() => handleProjectNav(prevProject.id, onProjectClick)}
                    className="p-0 m-0 border-0 bg-transparent text-left cursor-pointer block w-full max-w-[280px] group transition-all duration-300 ease-out hover:-translate-y-1"
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
                          className="w-full h-full object-cover object-left block transition-transform duration-300 ease-out group-hover:scale-105"
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
                          className="w-full h-full object-cover object-left block transition-transform duration-300 ease-out group-hover:scale-105"
                          loading="lazy"
                        />
                      ))}
                  </div>
                  <span className="text-[11px] tracking-[0.15em] text-gray-400 uppercase mb-1.5">
                    Previous
                  </span>
                  <span className="block w-full text-left text-[15px] md:text-[17px] text-gray-800 group-hover:opacity-80 transition-opacity duration-300 font-semibold leading-snug">
                    ← {prevProject.title}
                  </span>
                </div>
              </button>
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

          {/* Next / Right block */}
          <div
            className="min-w-0 flex-1 flex justify-end"
            style={{ maxWidth: 'min(48%, 480px)' }}
          >
            {hasNext ? (
              <button
                type="button"
                onClick={() => handleProjectNav(nextProject.id, onProjectClick)}
                className="p-0 m-0 border-0 bg-transparent cursor-pointer block w-full group transition-transform duration-300 ease-out hover:-translate-y-1"


              >
<div className="w-full transition-all duration-300 ease-out">



                  <div
                    className="rounded-lg overflow-hidden mb-4 shadow-[var(--shadow-subtle)] transition-all duration-300 ease-out group-hover:shadow-[var(--shadow-card)] w-full"



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
                          className="w-full h-full object-cover object-right block transition-transform duration-300 ease-out group-hover:scale-105"
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
                          className="w-full h-full object-cover object-right block transition-transform duration-300 ease-out group-hover:scale-105"
                          loading="lazy"
                        />
                      ))}
                  </div>
                  <div className="w-full flex flex-col items-end min-w-0">
  <div className="text-[11px] tracking-[0.15em] text-gray-400 uppercase mb-1.5 text-right w-full">
    Next
  </div>
  <div className="text-[15px] md:text-[17px] text-gray-800 group-hover:opacity-80 transition-opacity duration-300 font-semibold leading-snug text-right w-full">
    {nextProject.title} →
  </div>
</div>

                </div>
              </button>
            ) : (
              <div className="p-0 max-w-[280px] ml-auto opacity-60">
                <span className="text-[15px] md:text-[17px] text-gray-400">
                  Next project
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="mb-12">
        <button
          onClick={onBack}
          className="text-[17px] text-gray-700 hover:text-gray-900 transition-colors duration-300 font-medium focus-ring rounded focus:outline-none"
        >
          ← Back to Homepage
        </button>
      </div>
    </div>
  );
}
