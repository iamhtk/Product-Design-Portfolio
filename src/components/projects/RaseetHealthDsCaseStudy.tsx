import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  Facebook,
  Figma,
  Github,
  Instagram,
  Linkedin,
  Youtube,
} from 'lucide-react';
import { ScrollToTop } from '../ScrollToTop';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { ExploreMoreSection } from './ExploreMoreSection';
import { SHOW_PROJECT_OVERVIEW } from './projectConfig';
import { DesignSystemExploreCallout } from './DesignSystemExploreCallout';

const CURRENT_PROJECT_ID = 'RaseetHealth_DS';
const PROGRESS_BAR_HIDE_DELAY_MS = 400;
const HEADER_COLOR = '#1A6B8A';
const HEADER_ICON = '/DS/medscope-hero-2.png';

const RASEET_FIGMA_MOBILE_URL =
  'https://www.figma.com/proto/XKSlqw5bsQYbJAoudCEzjy/iOS_RaseetHealth_v2?node-id=4628-357&p=f&viewport=369%2C429%2C0.02&t=kg6GHaKkbVY0NcZZ-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=4628%3A13344&page-id=4628%3A264&show-proto-sidebar=1&hide-ui=1';
const RASEET_FIGMA_PARTNER_DASHBOARD_URL =
  'https://www.figma.com/proto/XKSlqw5bsQYbJAoudCEzjy/iOS_RaseetHealth_v2?node-id=6602-4394&p=f&viewport=60%2C472%2C0.09&t=eQG2dOI3a4xSIRlo-1&scaling=scale-down&content-scaling=fixed&page-id=6602%3A2&starting-point-node-id=6602%3A4394&hide-ui=1';
const RASEET_FIGMA_HCP_DASHBOARD_URL =
  'https://www.figma.com/proto/XKSlqw5bsQYbJAoudCEzjy/iOS_RaseetHealth_v2?node-id=6602-4&viewport=-2691%2C197%2C0.41&t=mL1Fml7UK3LEasph-1&scaling=scale-down&content-scaling=fixed&page-id=6602%3A3&hide-ui=1';
// const RASEET_FIGMA_FILE_URL =
//   'https://www.figma.com/design/XKSlqw5bsQYbJAoudCEzjy/iOS_RaseetHealth_v2';

export interface RaseetHealthDsCaseStudyProjectProps {
  onBack: () => void;
  onProjectClick?: (projectId: string) => void;
}

export function RaseetHealthDsCaseStudyProject({ onBack, onProjectClick }: RaseetHealthDsCaseStudyProjectProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [progressBarVisible, setProgressBarVisible] = useState(false);
  const hideBarTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const title = 'MedScope Design System';
  const company = 'Kryptonas Innovations';
  const subtitle =
    'Design-system lens on Raseet: shared patterns across mobile, partner pharmacy, and provider experiences, documented in Figma and shipped with consistent tokens.';
  const role = 'Design System, UX, Figma Libraries, Cross-platform UI';
  const team = 'Lead Product Designer';
  const when = '2019 - 2022';
  const progressBarColor = '#1A6B8A';
  const overview: string | undefined = '';
  const speedReadChallenge =
    'Healthcare workflows span patients, pharmacies, and clinicians without a shared system, every screen reinvents spacing, type, and interaction patterns.';
  const speedReadProcess =
    'I mapped reusable foundations (color, type, elevation) and component patterns across the mobile app and dashboard surfaces, then linked flows in Figma so teams could trace each screen back to the same library.';
  const speedReadTakeaways =
    'In regulated, high-trust domains, the design system is part of the safety story: predictable UI reduces errors and speeds review.';
  const speedReadImpact =
    'A single Figma source for core journeys, with prototypes for mobile, partner, and provider tools ready to scale as the product grows.';

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const totalScrollableHeight = Math.max(documentHeight - windowHeight, 1);
      const progress = (scrollTop / totalScrollableHeight) * 100;
      setScrollProgress(Math.min(Math.max(progress, 0), 100));
      setProgressBarVisible(true);
      if (hideBarTimeoutRef.current) clearTimeout(hideBarTimeoutRef.current);
      hideBarTimeoutRef.current = setTimeout(() => {
        setProgressBarVisible(false);
        hideBarTimeoutRef.current = null;
      }, PROGRESS_BAR_HIDE_DELAY_MS);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (hideBarTimeoutRef.current) clearTimeout(hideBarTimeoutRef.current);
    };
  }, []);

  const exploreActions = [
    { label: 'Open Storybook', href: "https://medscope.storybook.raseethealth.hrithiksanyal.com/?path=/docs/introduction--docs", variant: 'primary' as const },
    { label: 'View Component Showcase', href: "https://medscope.raseethealth.hrithiksanyal.com/", variant: 'secondary' as const },
    // { label: 'View Docs', href: "https://prism.cwpc.hrithiksanyal.com/docs/", variant: 'secondary' as const },
    // { label: 'View Figma File', href: PRISM_FIGMA_URL, variant: 'secondary' as const, showArrow: false },
    { label: 'View Mobile App Prototype', href: RASEET_FIGMA_MOBILE_URL, variant: 'secondary' as const },
    { label: 'View Partner Pharmacy Dashboard', href: RASEET_FIGMA_PARTNER_DASHBOARD_URL, variant: 'secondary' as const },
    { label: 'View HealthcareProvider Dashboard', href: RASEET_FIGMA_HCP_DASHBOARD_URL, variant: 'secondary' as const },
    // { label: 'View Figma File', href: RASEET_FIGMA_FILE_URL, variant: 'secondary' as const, showArrow: false },
  ];

  return (
    <div className="min-h-screen bg-white w-full min-w-0 overflow-x-clip">
      <ScrollToTop />

      {progressBarVisible &&
        createPortal(
          <div
            className="liquid-glass-progress-strip"
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              width: '100%',
              height: '6px',
              zIndex: 9999,
              pointerEvents: 'none',
              transition: 'opacity 0.2s ease-out',
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${scrollProgress}%`,
                backgroundColor: progressBarColor,
                transition: 'width 0.15s ease-out',
              }}
            />
          </div>,
          document.body,
        )}

      <div
        className="w-full flex items-center justify-center overflow-hidden"
        style={{ height: 'clamp(300px, 42vw, 500px)', backgroundColor: HEADER_COLOR }}
      >
        <div className="h-full w-full flex items-center justify-center p-4 min-h-0">
          <ImageWithFallback
            src={HEADER_ICON}
            alt="Raseet Health"
            className="max-h-full max-w-full object-contain"
            priority
            enableLightbox={false}
          />
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 pt-12 md:pt-16 pb-8 w-full min-w-0 box-border">
        <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-12 md:gap-16 min-w-0">
          <div className="space-y-8 order-2 md:order-none">
            <div className="block" style={{ width: 48, height: 48 }}>
              <ImageWithFallback
                src="/raseet/raseet_logo2.png"
                alt="Raseet Health"
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>

            <div className="space-y-8">
              <div>
                <div className="text-gray-400 uppercase tracking-wider mb-2 text-[11px]">Company</div>
                <div className="text-gray-700 text-[18px] leading-relaxed">{company}</div>
              </div>
              <div>
                <div className="text-gray-400 uppercase tracking-wider mb-2 text-[11px]">My Deliverables</div>
                <div className="text-gray-700 text-[18px] leading-relaxed">{role}</div>
              </div>
              <div>
                <div className="text-gray-400 uppercase tracking-wider mb-2 text-[11px]">Team</div>
                <div className="text-gray-700 text-[18px] leading-relaxed">{team}</div>
              </div>
              <div>
                <div className="text-gray-400 uppercase tracking-wider mb-2 text-[11px]">When</div>
                <div className="text-gray-700 text-[18px] leading-relaxed">{when}</div>
              </div>
              {/* <div>
                <div className="text-gray-400 uppercase tracking-wider mb-2 text-[11px]">Live Links</div>
                <div className="flex flex-col gap-2">
                  <a
                    href={RASEET_FIGMA_MOBILE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[15px] font-bold text-[#1A6B8A] underline underline-offset-[3px] decoration-[rgba(26,107,138,0.45)] hover:decoration-[rgba(21,90,116,0.95)]"
                  >
                    Mobile App Prototype ↗
                  </a>
                  <a
                    href={RASEET_FIGMA_PARTNER_DASHBOARD_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[15px] font-bold text-[#1A6B8A] underline underline-offset-[3px] decoration-[rgba(26,107,138,0.45)] hover:decoration-[rgba(21,90,116,0.95)]"
                  >
                    Partner Pharmacy Dashboard ↗
                  </a>
                  <a
                    href={RASEET_FIGMA_HCP_DASHBOARD_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[15px] font-bold text-[#1A6B8A] underline underline-offset-[3px] decoration-[rgba(26,107,138,0.45)] hover:decoration-[rgba(21,90,116,0.95)]"
                  >
                    Healthcare Provider Dashboard ↗
                  </a>
                  <a
                    href={RASEET_FIGMA_FILE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[15px] font-bold text-[#1A6B8A] underline underline-offset-[3px] decoration-[rgba(26,107,138,0.45)] hover:decoration-[rgba(21,90,116,0.95)]"
                  >
                    Figma Library ↗
                  </a>
                </div>
              </div> */}
            </div>

            <button
              type="button"
              onClick={onBack}
              className="text-[15px] text-gray-500 hover:text-gray-900 transition-colors hidden md:block cursor-pointer"
            >
              ← Back to Work
            </button>
          </div>

          <div className="space-y-16 order-1 md:order-none min-w-0 max-w-full">
            <div className="md:hidden">
              <button
                type="button"
                onClick={onBack}
                className="text-[15px] text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
              >
                ← Back to Work
              </button>
            </div>

            <div className="space-y-6">
              <h1 className="text-[48px] md:text-[64px] lg:text-[72px] leading-[1.1] font-bold text-gray-900 tracking-tight">
                {title}
              </h1>
              <p className="text-[26px] md:text-[28px] lg:text-[30px] text-gray-700 leading-relaxed font-medium">
                {subtitle}
              </p>
              {SHOW_PROJECT_OVERVIEW && overview ? (
                <p className="text-[18px] md:text-[20px] text-gray-700 leading-[1.8]">{overview}</p>
              ) : null}
            </div>

            <div className="space-y-8">
              <div className="space-y-2 text-center">
                <h3 className="text-[11px] tracking-[0.2em] text-gray-400 uppercase font-medium">Speed Read</h3>
                <p className="text-[18px] leading-[1.85] text-gray-700">In a rush? Here&apos;s the gist.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                <div className="space-y-4">
                  <h4 className="text-[11px] tracking-[0.2em] text-gray-400 uppercase font-medium">Challenge</h4>
                  <p className="text-[18px] leading-[1.85] text-gray-700">{speedReadChallenge}</p>
                </div>
                <div className="space-y-4">
                  <h4 className="text-[11px] tracking-[0.2em] text-gray-400 uppercase font-medium">Process</h4>
                  <p className="text-[18px] leading-[1.85] text-gray-700">{speedReadProcess}</p>
                </div>
                <div className="space-y-4">
                  <h4 className="text-[11px] tracking-[0.2em] text-gray-400 uppercase font-medium">Takeaways</h4>
                  <p className="text-[18px] leading-[1.85] text-gray-700">{speedReadTakeaways}</p>
                </div>
                <div className="space-y-4">
                  <h4 className="text-[11px] tracking-[0.2em] text-gray-400 uppercase font-medium">Impact</h4>
                  <p className="text-[18px] leading-[1.85] text-gray-700">{speedReadImpact}</p>
                </div>
              </div>

              <div className="space-y-4 pt-4 flex flex-col items-center text-center">
                <p className="text-[18px] leading-[1.85] text-gray-700">Have more time?</p>
                <p className="text-[16px] leading-relaxed text-gray-500">
                  Open Figma prototypes and the design file for mobile, partner, and provider experiences.
                </p>
                <div className="w-full max-w-[960px] mt-6">
                  <DesignSystemExploreCallout
                    theme="raseet"
                    sectionLabel="Explore Raseet Health DS"
                    headlineLine1="Multi-platform patterns. Shared foundations."
                    headlineLine2="One system for every surface."
                    subtext="Every journey mapped in Figma. Every dashboard tied to the same library."
                    actions={exploreActions}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          id="case-study-start"
          className="space-y-16 mt-16 w-full min-w-0 max-w-full"
          style={{ scrollMarginTop: 'var(--nav-height, 80px)' }}
        >
          <div className="rounded-2xl border border-gray-200 bg-gray-50 px-6 py-16 md:px-12 text-center">
            <p className="text-[18px] leading-relaxed text-gray-600">
              {/* Full narrative for the Raseet Health design system case study is coming soon. Use the links above for
              Figma prototypes and the design file. */}
            </p>
          </div>
          <ExploreMoreSection
            currentProjectId={CURRENT_PROJECT_ID}
            onBack={onBack}
            onProjectClick={onProjectClick}
          />
          <div className="md:hidden pt-8">
            <button
              type="button"
              onClick={onBack}
              className="text-[15px] text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
            >
              ← Back to Work
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 md:px-8 lg:px-12" data-footer>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-12 pb-8 text-[13px] text-gray-500">
          <div className="flex flex-wrap items-center gap-2">
            <span className="whitespace-nowrap">Designed & Developed by Hrithik Sanyal.</span>
            <span>© 2026</span>
          </div>
          <div className="flex items-center gap-3 md:gap-5">
            <a
              href="https://www.figma.com/@iamhtk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-900 transition-colors"
              aria-label="Figma"
            >
              <Figma className="w-[18px] h-[18px]" />
            </a>
            <a
              href="https://github.com/iamhtk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-900 transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-[18px] h-[18px]" />
            </a>
            <a
              href="https://www.linkedin.com/in/iamhtk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-900 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-[18px] h-[18px]" />
            </a>
            <a
              href="https://www.youtube.com/@avlnce"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-900 transition-colors"
              aria-label="YouTube"
            >
              <Youtube className="w-[18px] h-[18px]" />
            </a>
            <a
              href="https://www.instagram.com/hrithiksanyal/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-900 transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-[18px] h-[18px]" />
            </a>
            <a
              href="https://www.facebook.com/Avlnce/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-900 transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-[18px] h-[18px]" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
