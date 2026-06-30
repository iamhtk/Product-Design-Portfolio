import { ScrollToTop } from './ScrollToTop';
import { AnimateIn } from './AnimateIn';
import { PROJECT_ENABLED } from './projects/projectOrder';
import { ImageWithFallback } from './figma/ImageWithFallback';
import {
  getProjectCaseStudyHref,
  handleProjectCaseStudyAnchorClick,
  isExternalCaseStudyProject,
} from './projects/projectNav';
import { FooterCreditsRow } from './FooterAccessibilityLink';
import {
  Linkedin,
  Youtube,
  Instagram,
  Facebook,
  Github,
  Figma,
} from 'lucide-react';

type WorkProjectMetric = {
  value: string;
  label: string;
};

type WorkProjectTile = {
  id: string;
  title: string;
  company: string;
  description?: string;
  readTime: string;
  bgColor: string;
  image: string;
  metrics?: WorkProjectMetric[];
};

const TILE_STAGGER_KEYS = [
  'stagger-1',
  'stagger-2',
  'stagger-3',
  'stagger-4',
  'stagger-5',
  'stagger-6',
  'stagger-7',
  'stagger-8',
  'stagger-9',
] as const;

const MINI_APP_TILE_SHELL =
  'h-full flex flex-col rounded-xl overflow-hidden bg-white border border-solid border-black/[0.06] shadow-[var(--shadow-card)] transition-all duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:-translate-y-1 group-hover:shadow-[var(--shadow-depth)] group-hover:border-black/[0.08]';

const MINI_APP_LINK_CLASS =
  'group block h-full cursor-pointer no-underline text-inherit rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-gray-900/15 focus-visible:ring-offset-2';

const MINI_APP_ENABLED = {
  le7els: false,
  stories: false,
} as const;

function WorkProjectTileCard({
  project,
  index,
  onProjectClick,
}: {
  project: WorkProjectTile;
  index: number;
  onProjectClick: (id: string) => void;
}) {
  const isEnabled = PROJECT_ENABLED[project.id] !== false;
  const href = getProjectCaseStudyHref(project.id);
  const staggerKey = TILE_STAGGER_KEYS[Math.min(index, TILE_STAGGER_KEYS.length - 1)];
  const shellClass = `h-full flex flex-col rounded-xl overflow-hidden bg-white border border-black/[0.06] shadow-[var(--shadow-card)] transition-all duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:-translate-y-1 hover:shadow-[var(--shadow-depth)] hover:border-black/[0.08] ${
    isEnabled ? 'cursor-pointer' : 'cursor-not-allowed'
  }`;
  const linkExtra =
    'no-underline text-inherit outline-none focus-visible:ring-2 focus-visible:ring-gray-900/15 focus-visible:ring-offset-2';

  const cardInner = (
    <>
      <div
        className={`w-full flex-shrink-0 overflow-hidden transition-transform duration-500 ease-out ${
          project.id === 'CalmiRing' ? 'flex items-center justify-center' : ''
        }`}
        style={{ backgroundColor: project.bgColor, aspectRatio: '1 / 1' }}
      >
        {project.image &&
          (() => {
            const isVideo = /\.(mp4|webm|mov)(\?|$)/i.test(project.image);
            const mediaClass = `transition-transform duration-300 ease-out ${
              project.id === 'CalmiRing'
                ? 'max-w-full max-h-full object-contain'
                : 'w-full h-full object-cover'
            } hover:scale-105`;
            return isVideo ? (
              <video
                src={project.image}
                className={mediaClass}
                autoPlay
                loop
                muted
                playsInline
                aria-label={project.title}
              />
            ) : (
              <ImageWithFallback src={project.image} alt={project.title} className={mediaClass} />
            );
          })()}
      </div>

      <div className="project-card-meta flex flex-col flex-1">
        <p className="project-card-tags type-overline text-gray-400 truncate">{project.company}</p>
        <h3 className="project-card-title type-body-lg text-gray-900 font-semibold leading-[1.4] line-clamp-2 transition-opacity duration-300 hover:opacity-70">
          {project.title}
        </h3>
        {project.description && project.metrics && project.metrics.length > 0 ? (
          <p className="project-card-description type-caption text-gray-500 truncate">{project.description}</p>
        ) : null}
        {project.metrics && project.metrics.length > 0 ? (
          <div className="project-card-metrics">
            {project.metrics.map((metric) => (
              <div key={metric.label} className="project-card-metric">
                <div className="project-card-metric-value text-gray-900">{metric.value}</div>
                <span className="project-card-metric-label text-gray-500">{metric.label}</span>
              </div>
            ))}
          </div>
        ) : null}
        <p
          className={`project-card-read-time type-caption text-gray-400 mt-auto tracking-wide ${
            project.metrics && project.metrics.length > 0 ? '' : 'project-card-read-time--compact'
          }`}
        >
          {project.readTime}
        </p>
      </div>
    </>
  );

  return (
    <AnimateIn stagger={staggerKey} rootMargin="0px 0px -80px 0px">
      {href ? (
        <a
          href={href}
          {...(isExternalCaseStudyProject(project.id)
            ? { target: '_blank' as const, rel: 'noopener noreferrer' as const }
            : {})}
          onClick={(e) => handleProjectCaseStudyAnchorClick(e, project.id, onProjectClick)}
          className={`${shellClass} ${linkExtra}`}
        >
          {cardInner}
        </a>
      ) : (
        <div className={shellClass}>{cardInner}</div>
      )}
    </AnimateIn>
  );
}

interface WorkPageProps {
  onProjectClick: (id: string) => void;
}

export function WorkPage({ onProjectClick }: WorkPageProps) {
  const projects: WorkProjectTile[] = [
    {
      id: 'AutomotiveUX_GM',
      title: 'Automotive UX - Cadillac Escalade Design Proposal',
      company: 'AUTOMOTIVE UX | IN-CAR INTERFACE | MOBILE COMPANION | SPECULATIVE',
      description:
        'Develop a new In-vehicle experience for the luxury car segment focusing on in-car themes.',
      metrics: [
        { value: '2', label: 'Surfaces redesigned' },
        { value: '4', label: 'Core user flows defined' },
        { value: '0 to 1', label: 'Concept to high fidelity' },
      ],
      readTime: '12 minute read →',
      bgColor: '#f5f5f7',
      image: '/main_title/main_gm.png',
    },
    {
      id: 'RaseetHealth',
      title: 'Raseet Health: Empowering Local Pharmacies',
      company: 'HEALTHCARE | MULTI-PLATFORM | UX RESEARCH | DESIGN SYSTEM',
      description:
        'An intuitive platform for pharmacies, catering to users of all ages and tech levels, with a focus on a broad audience.',
      metrics: [
        { value: '229+', label: 'Pharmacies connected' },
        { value: '67,552+', label: 'Lives impacted' },
        { value: '4x', label: 'Faster prescription workflows' },
      ],
      readTime: '16 minute read →',
      bgColor: '#4A90E2',
      image: '/main_title/main_raseet.png',
    },
    {
      id: 'BMW',
      title: "Redesigning BMW's Digital Interface",
      company: 'AUTOMOTIVE UX DESIGN',
      readTime: '8 MINUTE READ →',
      bgColor: '#e8f4f8',
      image: '/main_title/main_bmw.png',
    },
    {
      id: 'CalmiRing',
      title: 'CalmiRing',
      company: 'IOT | END-TO-END UX DESIGN | UX RESEARCH',
      readTime: '10 MINUTE READ →',
      bgColor: '#f5f5f7',
      image: '/main_title/main_calmi.png',
    },
  ];

  const designSystemProjects: WorkProjectTile[] = [
    {
      id: 'CoyaxDesignSystem',
      title: 'Coyax Design System',
      company: 'B2B FINTECH | DESIGN SYSTEMS | TOKEN ARCHITECTURE | CODEBASE AUDIT',
      description:
        'Auditing a live production codebase and building a unified three-tier token system from scratch.',
      metrics: [
        { value: '13', label: 'Audit files' },
        { value: '2', label: 'Libraries unified' },
        { value: '40%', label: 'Faster handoff' },
      ],
      readTime: '10 minute read',
      bgColor: '#e7e5e4',
      image: '/coyax/DS/main-tile-silver.png',
    },
    {
      id: 'CWPC',
      title: 'CWPC: Design System',
      company: 'DESIGN SYSTEM | REACT | TYPESCRIPT | ACCESSIBILITY | WCAG AA',
      description:
        'A production-ready React + TypeScript design system with 68 documented components, 100+ tokens, and a Storybook-style docs site for CWPC emergency tools.',
      metrics: [
        { value: '68', label: 'Components built' },
        { value: 'WCAG AA', label: 'Accessibility met' },
        { value: '40%', label: 'Faster design handoff' },
      ],
      readTime: '10 minute read →',
      bgColor: '#6366F1',
      image: '/DS/prism-tile.png',
    },
    {
      id: 'RaseetHealth_DS',
      title: 'MedScope Design System',
      company: 'DESIGN SYSTEM | HEALTHCARE | MULTI-PLATFORM | TOKEN-FIRST',
      description:
        'Design-system lens on Raseet: shared patterns across mobile, partner pharmacy, and provider experiences, documented in Figma and shipped with consistent tokens.',
      metrics: [
        { value: '100', label: 'Components shipped' },
        { value: '4', label: 'Platforms unified' },
        { value: '1', label: 'Source of truth' },
      ],
      readTime: '12 minute read →',
      bgColor: '#4A90E2',
      image: '/DS/medscope-tile-2.png',
    },
  ];

  const builtAndDeployedProjects: WorkProjectTile[] = [
    {
      id: 'BuiltDeployed_Project1',
      title: 'Desi Pizza House',
      company: 'FULL-STACK RESTAURANT SITE | SQUARE + GOOGLE APIS | AWS AMPLIFY',
      readTime: '12 MINUTE READ →',
      bgColor: '#E8822A',
      image: '',
    },
    {
      id: 'BuiltDeployed_Project2',
      title: 'Tandoori Junction',
      company: 'BRAND SYSTEM | DUAL THEME | DOCKER + PRINT PIPELINE | AWS AMPLIFY',
      readTime: '14 MINUTE READ →',
      bgColor: '#D4641C',
      image: '',
    },
  ];

  return (
    <div className="min-h-screen pt-20">
      <ScrollToTop />
      <div className="max-w-[1600px] mx-auto px-6 md:px-8 lg:px-12">
        <div className="mt-32 pt-32 md:mt-40 pb-12 md:pb-16">
          <AnimateIn variant="up" rootMargin="0px">
            <h1 className="type-display text-gray-900">Work</h1>
            <p className="home-hero-tagline max-w-[560px] mt-6">
              Case studies, design systems, shipped products, and experiments built with AI.
            </p>
          </AnimateIn>
        </div>

        <AnimateIn variant="up" rootMargin="0px 0px -60px 0px" className="flex items-center justify-between mb-4 mt-8 md:mt-12">
          <h2 className="type-overline text-gray-400">Selected Work</h2>
          <h2 className="type-overline text-gray-400">Design x Engineering</h2>
        </AnimateIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-32 items-stretch">
          {projects.map((project, index) => (
            <WorkProjectTileCard
              key={project.id}
              project={project}
              index={index}
              onProjectClick={onProjectClick}
            />
          ))}
        </div>

        <AnimateIn variant="up" rootMargin="0px 0px -60px 0px" className="flex items-center justify-between mb-4">
          <h2 className="type-overline text-gray-400">Design systems</h2>
          <h2 className="type-overline text-gray-400">Tokens & components</h2>
        </AnimateIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-32 items-stretch">
          {designSystemProjects.map((project, index) => (
            <WorkProjectTileCard
              key={project.id}
              project={project}
              index={index}
              onProjectClick={onProjectClick}
            />
          ))}
        </div>

        <AnimateIn variant="up" rootMargin="0px 0px -60px 0px" className="mb-32">
          <div className="mb-12">
            <h2 className="type-overline text-gray-400 mb-2">BUILT AND DEPLOYED</h2>
            <p className="type-body-lg text-gray-900">
              Clients came with a problem. I shipped them a solution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-stretch">
            {builtAndDeployedProjects.map((project, index) => (
              <WorkProjectTileCard
                key={project.id}
                project={project}
                index={index}
                onProjectClick={onProjectClick}
              />
            ))}
          </div>
        </AnimateIn>

        <AnimateIn variant="up" rootMargin="0px 0px -80px 0px" className="mb-32">
          <div className="mb-12">
            <h2 className="type-overline text-gray-400 mb-2">
              BUILT WITH AI - Vibe coded. Shipped anyway!
            </h2>
            <p className="type-body-lg text-gray-900">
              Things I built fast, with AI, because the idea wouldn&apos;t leave me alone.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-stretch">
            <a
              href="https://framecut.butterbase.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className={MINI_APP_LINK_CLASS}
            >
              <div className={MINI_APP_TILE_SHELL}>
                <div className="mb-4 w-full flex-shrink-0 overflow-hidden bg-[#f5f5f7]" style={{ aspectRatio: '4 / 3' }}>
                  <ImageWithFallback
                    src="/hackathon/framecut/Tiles.png"
                    alt="Framecut"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
                  />
                </div>
                <div className="project-card-meta flex flex-col flex-1 space-y-2 px-3 pb-3">
                  <h3 className="type-body-lg text-gray-900 font-semibold leading-[1.4] group-hover:opacity-70 transition-opacity">
                    Framecut
                  </h3>
                  <p className="type-caption text-gray-600 leading-relaxed">
                    AI video studio that turns screenshots & notes into publish-ready videos
                  </p>
                  <div className="mt-2 rounded-lg border border-violet-200/80 bg-gradient-to-br from-violet-50 to-indigo-50/70 px-2.5 py-2.5 shadow-[0_1px_4px_rgba(79,70,229,0.08)] ring-1 ring-violet-100/60">
                    <p className="type-overline text-violet-700 mb-1.5 tracking-[0.06em]">
                      BETA SUPER HACKATHON · MOUNTAIN VIEW
                      <br />
                      MAY 2, 2026
                    </p>
                    <p className="text-[13px] font-medium text-gray-900 leading-[1.55]">
                      Built solo in one day at the Beta Super Hackathon, a full-day build sprint hosted by Beta
                      University at the Computer History Museum in Mountain View, Silicon Valley.
                    </p>
                  </div>
                </div>
              </div>
            </a>

            <a
              href="https://ghostuxapp.pages.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className={MINI_APP_LINK_CLASS}
            >
              <div className={MINI_APP_TILE_SHELL}>
                <div className="mb-4 w-full flex-shrink-0 overflow-hidden bg-[#f5f5f7]" style={{ aspectRatio: '4 / 3' }}>
                  <ImageWithFallback
                    src="/hackathon/ghost/ghost-app.png"
                    alt="Ghost"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
                  />
                </div>
                <div className="project-card-meta flex flex-col flex-1 space-y-2 px-3 pb-3">
                  <h3 className="type-body-lg text-gray-900 font-semibold leading-[1.4] group-hover:opacity-70 transition-opacity">
                    Ghost
                  </h3>
                  <p className="type-caption text-gray-600 leading-relaxed">
                    UX intelligence platform that resurrects your churned users
                  </p>
                  <div className="mt-2 rounded-lg border border-violet-200/80 bg-gradient-to-br from-violet-50 to-indigo-50/70 px-2.5 py-2.5 shadow-[0_1px_4px_rgba(79,70,229,0.08)] ring-1 ring-violet-100/60">
                    <p className="type-overline text-violet-700 mb-1.5 tracking-[0.06em]">
                      Agent Hack Day · San Francisco · Apr 11, 2026
                    </p>
                    <p className="text-[13px] font-medium text-gray-900 leading-[1.55]">
                      Built solo in one day at Agent Hack Day, a full-day build sprint hosted by Wordware at their
                      Beach House in The Presidio, San Francisco.
                    </p>
                  </div>
                </div>
              </div>
            </a>

            {MINI_APP_ENABLED.le7els ? (
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className={`${MINI_APP_LINK_CLASS} cursor-not-allowed`}
                aria-hidden
              >
                <div className={MINI_APP_TILE_SHELL}>
                  <div className="mb-4 w-full flex-shrink-0 overflow-hidden bg-[#f5f5f7]" style={{ aspectRatio: '4 / 3' }}>
                    <ImageWithFallback
                      src="miniapps/AVICII-FOREVER-ARTWORK-CLEAN_2.webp"
                      alt="LE7ELS"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
                    />
                  </div>
                  <div className="project-card-meta flex flex-col flex-1 space-y-2 px-3 pb-3">
                    <h3 className="type-body-lg text-gray-900 font-semibold leading-[1.4] group-hover:opacity-70 transition-opacity">
                      LE7ELS
                    </h3>
                    <p className="type-caption text-gray-500 leading-relaxed line-clamp-2">Music Library Organizer</p>
                  </div>
                </div>
              </a>
            ) : null}

            {MINI_APP_ENABLED.stories ? (
              <a
                href="https://stories.hrithiksanyal.com/"
                target="_blank"
                rel="noopener noreferrer"
                className={MINI_APP_LINK_CLASS}
              >
                <div className={MINI_APP_TILE_SHELL}>
                  <div className="mb-4 w-full flex-shrink-0 overflow-hidden bg-[#f5f5f7]" style={{ aspectRatio: '4 / 3' }}>
                    <ImageWithFallback
                      src="miniapps/avicii-stories-wallpaper-upscaled-3840-1900-v0-t0cxcu66a9of1.webp"
                      alt="Stories"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
                    />
                  </div>
                  <div className="project-card-meta flex flex-col flex-1 space-y-2 px-3 pb-3">
                    <h3 className="type-body-lg text-gray-900 font-semibold leading-[1.4] group-hover:opacity-70 transition-opacity">
                      Stories
                    </h3>
                    <p className="type-caption text-gray-500 leading-relaxed line-clamp-2">Design System Builder</p>
                  </div>
                </div>
              </a>
            ) : null}
          </div>
        </AnimateIn>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 md:px-8 lg:px-12">
        <div
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-12 pb-8 text-[13px] text-gray-500"
          data-footer
        >
          <FooterCreditsRow />
          <div className="flex items-center gap-3 md:gap-5">
            <a href="https://www.figma.com/@iamhtk" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-900 transition-colors" aria-label="Figma">
              <Figma className="w-[18px] h-[18px]" />
            </a>
            <a href="https://github.com/iamhtk" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-900 transition-colors" aria-label="GitHub">
              <Github className="w-[18px] h-[18px]" />
            </a>
            <a href="https://www.linkedin.com/in/iamhtk" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-900 transition-colors" aria-label="LinkedIn">
              <Linkedin className="w-[18px] h-[18px]" />
            </a>
            <a href="https://www.youtube.com/@avlnce" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-900 transition-colors" aria-label="YouTube">
              <Youtube className="w-[18px] h-[18px]" />
            </a>
            <a href="https://www.instagram.com/hrithiksanyal/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-900 transition-colors" aria-label="Instagram">
              <Instagram className="w-[18px] h-[18px]" />
            </a>
            <a href="https://www.facebook.com/Avlnce/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-900 transition-colors" aria-label="Facebook">
              <Facebook className="w-[18px] h-[18px]" />
            </a>
            <a href="https://x.com/hrithiksanyal" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-900 transition-colors" aria-label="X (Twitter)">
              <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
