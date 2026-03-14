import { useState, useEffect, useRef } from 'react';
import { Navigation } from './components/Navigation';
import { HomePage } from './components/HomePage';
import { AboutPage } from './components/AboutPage';
import { FriendsPage } from './components/FriendsPage';
import { ResumePage } from './components/ResumePage';
import { projectComponents } from './components/projects';
import { PROJECT_ENABLED, PROJECT_SLUGS } from './components/projects/projectOrder';
import { Blog } from './components/Blog';
import { FavoritesPage } from './components/FavoritesPage';

type Page = 'work' | 'about' | 'friends' | 'resume' | 'favorites' | 'blog' | 'project';

const VALID_PAGES: Exclude<Page, 'project'>[] = ['work', 'about', 'friends', 'resume', 'favorites', 'blog'];
const VALID_PROJECT_IDS = Object.keys(projectComponents);

const SCROLL_RESTORE_KEY = 'portfolio_scroll_restore';

function saveScrollForRestore() {
  try {
    sessionStorage.setItem(
      SCROLL_RESTORE_KEY,
      JSON.stringify({ path: window.location.pathname, y: window.scrollY })
    );
  } catch {
    // ignore
  }
}

function restoreScrollIfSamePage() {
  try {
    const raw = sessionStorage.getItem(SCROLL_RESTORE_KEY);
    if (!raw) return;
    const { path, y } = JSON.parse(raw) as { path: string; y: number };
    sessionStorage.removeItem(SCROLL_RESTORE_KEY);
    if (path !== window.location.pathname || typeof y !== 'number') return;
    // Slight delay so expanded case study content is laid out before restoring scroll
    const isProject = path.startsWith('/project/');
    const delay = isProject ? 150 : 0;
    const restore = () => window.scrollTo({ top: y, left: 0, behavior: 'instant' });
    if (delay > 0) {
      setTimeout(() => {
        requestAnimationFrame(() => requestAnimationFrame(restore));
      }, delay);
    } else {
      requestAnimationFrame(() => requestAnimationFrame(restore));
    }
  } catch {
    // ignore
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ROUTE MAPPING - Professional URL paths
// ═══════════════════════════════════════════════════════════════════════════
// Map internal page IDs to professional URL paths
// To change URLs, update the values here (keep keys the same)
// ═══════════════════════════════════════════════════════════════════════════
const ROUTE_PATHS: Record<Page, string> = {
  'work': '/',
  'about': '/about-me',
  'friends': '/friends',
  'resume': '/resume-experience',
  'favorites': '/myfavorites',
  'blog': '/blog',
  'project': '/project', // Base path, will append project ID
};

// Reverse lookup: URL path → page ID
const PATH_TO_PAGE: Record<string, Page> = {
  '/': 'work',
  '/about-me': 'about',
  '/friends': 'friends',
  '/resume-experience': 'resume',
  '/myfavorites': 'favorites',
  '/blog': 'blog',
};

function getRouteFromPath(): { page: Page; projectId: string | null } {
  const path = window.location.pathname.toLowerCase().replace(/\/$/, '') || '/';
  
  // Handle project routes: /project/<slug> — match by slug first, then by id
  if (path.startsWith('/project/')) {
    const segment = path.slice(9); // Remove '/project/'
    const bySlug = Object.entries(PROJECT_SLUGS).find(([, slug]) => slug === segment)?.[0] ?? null;
    const byId = VALID_PROJECT_IDS.find((p) => p.toLowerCase() === segment) ?? null;
    const projectId = bySlug ?? byId;
    if (projectId === null || PROJECT_ENABLED[projectId] === false) {
      return { page: 'work', projectId: null };
    }
    return { page: 'project', projectId };
  }
  
  // Handle root: /
  if (path === '/') {
    return { page: 'work', projectId: null };
  }
  
  // Look up page from professional URL path
  const page = PATH_TO_PAGE[path] ?? 'work';
  return { page, projectId: null };
}

function buildPath(page: Page, projectId: string | null): string {
  if (page === 'project' && projectId) {
    const slug = PROJECT_SLUGS[projectId] ?? projectId.toLowerCase();
    return `/project/${slug}`;
  }
  return ROUTE_PATHS[page];
}

function pushRoute(page: Page, projectId: string | null) {
  const path = buildPath(page, projectId);
  const url = path + window.location.search;
  window.history.pushState({ page, projectId }, '', url);
}

function replaceRoute(page: Page, projectId: string | null) {
  const path = buildPath(page, projectId);
  const url = path + window.location.search;
  window.history.replaceState({ page, projectId }, '', url);
}

export const EXPAND_CASE_STUDY_PREFIX = 'portfolio_expand_case_study_';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('work');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const prevNavigationRef = useRef<{ page: Page; projectId: string | null } | null>(null);
  const isInitialMount = useRef(true);
  const didRestoreScroll = useRef(false);

  // When we're about to render a project and we have scroll-restore data (reload after edit),
  // tell the project to start with case study expanded so scroll restore lands in the right place.
  if (typeof window !== 'undefined' && currentPage === 'project' && selectedProjectId) {
    try {
      const raw = sessionStorage.getItem(SCROLL_RESTORE_KEY);
      if (raw) {
        const { path } = JSON.parse(raw) as { path: string };
        if (path === window.location.pathname) {
          sessionStorage.setItem(EXPAND_CASE_STUDY_PREFIX + path, '1');
        }
      }
    } catch {
      // ignore
    }
  }

  // Save scroll position before full page unload (e.g. HMR full reload) so we can restore
  useEffect(() => {
    window.addEventListener('beforeunload', saveScrollForRestore);
    return () => window.removeEventListener('beforeunload', saveScrollForRestore);
  }, []);

  // Sync state from URL on load and when user uses back/forward (or swipe)
  useEffect(() => {
    const applyRoute = (route: { page: Page; projectId: string | null }) => {
      setCurrentPage(route.page);
      setSelectedProjectId(route.projectId);
    };

    const handlePopState = () => {
      const route = getRouteFromPath();
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      applyRoute(route);
      replaceRoute(route.page, route.projectId);
    };

    if (isInitialMount.current) {
      isInitialMount.current = false;
      const route = getRouteFromPath();
      applyRoute(route);
      replaceRoute(route.page, route.projectId);
    }

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Scrollbar: show only while user is scrolling, hide after inactivity
  useEffect(() => {
    let hideScrollbarTimeout: ReturnType<typeof setTimeout> | null = null;
    const INACTIVITY_MS = 1200;

    const showScrollbar = () => {
      document.documentElement.classList.add('scrollbar-visible');
      if (hideScrollbarTimeout) clearTimeout(hideScrollbarTimeout);
      hideScrollbarTimeout = setTimeout(() => {
        document.documentElement.classList.remove('scrollbar-visible');
        hideScrollbarTimeout = null;
      }, INACTIVITY_MS);
    };

    window.addEventListener('scroll', showScrollbar, { passive: true });
    return () => {
      window.removeEventListener('scroll', showScrollbar);
      if (hideScrollbarTimeout) clearTimeout(hideScrollbarTimeout);
    };
  }, []);

  // Redirect to work and fix URL if we ever end up on a disabled project (safety net)
  useEffect(() => {
    if (currentPage === 'project' && selectedProjectId && PROJECT_ENABLED[selectedProjectId] === false) {
      setCurrentPage('work');
      setSelectedProjectId(null);
      replaceRoute('work', null);
    }
  }, [currentPage, selectedProjectId]);

  // Restore scroll position after full-page reload (e.g. after editing a file) on any page
  useEffect(() => {
    if (didRestoreScroll.current) return;
    didRestoreScroll.current = true;
    restoreScrollIfSamePage();
  }, [currentPage, selectedProjectId]);

  // Scroll to top only when user navigates (not on initial mount / hot reload)
  useEffect(() => {
    const prev = prevNavigationRef.current;
    const isNavigation = prev !== null && (prev.page !== currentPage || prev.projectId !== selectedProjectId);
    prevNavigationRef.current = { page: currentPage, projectId: selectedProjectId };
    if (isNavigation) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [currentPage, selectedProjectId]);

  const handleNavigate = (page: Exclude<Page, 'project'>) => {
    if (page === currentPage) return;
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    setCurrentPage(page);
    setSelectedProjectId(null);
    pushRoute(page, null);
  };

  const handleProjectClick = (projectId: string) => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    setSelectedProjectId(projectId);
    setCurrentPage('project');
    pushRoute('project', projectId);
  };

  const handleBackToWork = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    setCurrentPage('work');
    setSelectedProjectId(null);
    pushRoute('work', null);
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navigation currentPage={currentPage} onNavigate={handleNavigate} />

      <div className="page-transition">
        {currentPage === 'work' && <HomePage onProjectClick={handleProjectClick} />}
        {currentPage === 'about' && <AboutPage />}
        {currentPage === 'friends' && <FriendsPage />}
        {currentPage === 'resume' && <ResumePage />}
        {currentPage === 'favorites' && <FavoritesPage />}
        {currentPage === 'blog' && <Blog />}
        {currentPage === 'project' && selectedProjectId && (() => {
          if (PROJECT_ENABLED[selectedProjectId] === false) {
            return (
              <div className="min-h-screen pt-32 px-8 md:px-16">
                <h1 className="text-4xl">Project not available</h1>
                <p className="mt-4 text-gray-600">This project is not available.</p>
                <button
                  onClick={handleBackToWork}
                  className="mt-4 text-blue-600 hover:underline cursor-pointer"
                >
                  ← Back to Homepage
                </button>
              </div>
            );
          }
          const ProjectComponent = projectComponents[selectedProjectId];
          if (!ProjectComponent) {
            return (
              <div className="min-h-screen pt-32 px-8 md:px-16">
                <h1 className="text-4xl">Project not found</h1>
                <p className="mt-4 text-gray-600">Project "{selectedProjectId}" is not available yet.</p>
                <button 
                  onClick={handleBackToWork}
                  className="mt-4 text-blue-600 hover:underline cursor-pointer"
                >
                  ← Back to Homepage
                </button>
              </div>
            );
          }
          return (
            <div className="project-page-offset" key={selectedProjectId}>
              <ProjectComponent onBack={handleBackToWork} onProjectClick={handleProjectClick} />
            </div>
          );
        })()}
      </div>
    </div>
  );
}

export default App;