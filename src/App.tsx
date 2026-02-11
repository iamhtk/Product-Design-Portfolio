import { useState, useEffect, useRef } from 'react';
import { Navigation } from './components/Navigation';
import { HomePage } from './components/HomePage';
import { AboutPage } from './components/AboutPage';
import { FriendsPage } from './components/FriendsPage';
import { ResumePage } from './components/ResumePage';
import { projectComponents } from './components/projects';
import { Blog } from './components/Blog';
import { FavoritesPage } from './components/FavoritesPage';

type Page = 'work' | 'about' | 'friends' | 'resume' | 'favorites' | 'blog' | 'project';

const VALID_PAGES: Exclude<Page, 'project'>[] = ['work', 'about', 'friends', 'resume', 'favorites', 'blog'];
const VALID_PROJECT_IDS = Object.keys(projectComponents);

// ═══════════════════════════════════════════════════════════════════════════
// ROUTE MAPPING - Professional URL paths
// ═══════════════════════════════════════════════════════════════════════════
// Map internal page IDs to professional URL paths
// To change URLs, update the values here (keep keys the same)
// ═══════════════════════════════════════════════════════════════════════════
const ROUTE_PATHS: Record<Page, string> = {
  'work': '/',
  'about': '/about-me',
  'friends': '/network-collaborators',
  'resume': '/resume-experience',
  'favorites': '/favorites-books-music',
  'blog': '/design-blog-articles',
  'project': '/project', // Base path, will append project ID
};

// Reverse lookup: URL path → page ID
const PATH_TO_PAGE: Record<string, Page> = {
  '/': 'work',
  '/about-me': 'about',
  '/network-collaborators': 'friends',
  '/resume-experience': 'resume',
  '/favorites-books-music': 'favorites',
  '/design-blog-articles': 'blog',
};

function getRouteFromPath(): { page: Page; projectId: string | null } {
  const path = window.location.pathname.toLowerCase().replace(/\/$/, '') || '/';
  
  // Handle project routes: /project/cwpc
  if (path.startsWith('/project/')) {
    const id = path.slice(9); // Remove '/project/'
    const projectId = VALID_PROJECT_IDS.find((p) => p.toLowerCase() === id) ?? null;
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
    return `/project/${projectId.toLowerCase()}`;
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

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('work');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const prevNavigationRef = useRef<{ page: Page; projectId: string | null } | null>(null);
  const isInitialMount = useRef(true);

  // Sync state from URL on load and when user uses back/forward (or swipe)
  useEffect(() => {
    const applyRoute = (route: { page: Page; projectId: string | null }) => {
      setCurrentPage(route.page);
      setSelectedProjectId(route.projectId);
    };

    const handlePopState = () => {
      const route = getRouteFromPath();
      setIsTransitioning(true);
      // Always jump to top when navigating via browser back/forward
      window.scrollTo(0, 0);
      applyRoute(route);
      setTimeout(() => setIsTransitioning(false), 50);
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

  // Scroll to top only when user navigates (not on initial mount / hot reload)
  useEffect(() => {
    const prev = prevNavigationRef.current;
    const isNavigation = prev !== null && (prev.page !== currentPage || prev.projectId !== selectedProjectId);
    prevNavigationRef.current = { page: currentPage, projectId: selectedProjectId };
    if (isNavigation) {
      window.scrollTo(0, 0);
    }
  }, [currentPage, selectedProjectId]);

  const handleNavigate = (page: Exclude<Page, 'project'>) => {
    if (page === currentPage) return;
    // Ensure we start at the top whenever changing sections
    window.scrollTo(0, 0);
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentPage(page);
      setSelectedProjectId(null);
      pushRoute(page, null);
      setTimeout(() => setIsTransitioning(false), 50);
    }, 150);
  };

  const handleProjectClick = (projectId: string) => {
    // Jump to top when opening a project
    window.scrollTo(0, 0);
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedProjectId(projectId);
      setCurrentPage('project');
      pushRoute('project', projectId);
      setTimeout(() => setIsTransitioning(false), 50);
    }, 150);
  };

  const handleBackToWork = () => {
    // Jump to top when going back to work/home
    window.scrollTo(0, 0);
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentPage('work');
      setSelectedProjectId(null);
      pushRoute('work', null);
      setTimeout(() => setIsTransitioning(false), 50);
    }, 150);
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navigation currentPage={currentPage} onNavigate={handleNavigate} />
      
      <div 
        className={`page-transition ${
          isTransitioning 
            ? 'opacity-0 translate-y-4' 
            : 'opacity-100 translate-y-0'
        }`}
      >
        {currentPage === 'work' && <HomePage onProjectClick={handleProjectClick} />}
        {currentPage === 'about' && <AboutPage />}
        {currentPage === 'friends' && <FriendsPage />}
        {currentPage === 'resume' && <ResumePage />}
        {currentPage === 'favorites' && <FavoritesPage />}
        {currentPage === 'blog' && <Blog />}
        {currentPage === 'project' && selectedProjectId && (() => {
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
          return <ProjectComponent onBack={handleBackToWork} onProjectClick={handleProjectClick} />;
        })()}
      </div>
    </div>
  );
}

export default App;