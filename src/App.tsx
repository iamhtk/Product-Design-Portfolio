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

function getRouteFromHash(): { page: Page; projectId: string | null } {
  const hash = window.location.hash.slice(1).toLowerCase() || 'work';
  if (hash.startsWith('project/')) {
    const id = hash.slice(8);
    const projectId = VALID_PROJECT_IDS.find((p) => p.toLowerCase() === id) ?? null;
    return { page: 'project', projectId };
  }
  const page = (VALID_PAGES.find((p) => p === hash) ?? 'work') as Exclude<Page, 'project'>;
  return { page, projectId: null };
}

function buildHash(page: Page, projectId: string | null) {
  if (page === 'project' && projectId) return `#project/${projectId}`;
  if (page === 'work') return '#';
  return `#${page}`;
}

function pushRoute(page: Page, projectId: string | null) {
  const url = window.location.pathname + window.location.search + buildHash(page, projectId);
  window.history.pushState({ page, projectId }, '', url);
}

function replaceRoute(page: Page, projectId: string | null) {
  const url = window.location.pathname + window.location.search + buildHash(page, projectId);
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
      const route = getRouteFromHash();
      setIsTransitioning(true);
      applyRoute(route);
      setTimeout(() => setIsTransitioning(false), 50);
    };

    if (isInitialMount.current) {
      isInitialMount.current = false;
      const route = getRouteFromHash();
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
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentPage(page);
      setSelectedProjectId(null);
      pushRoute(page, null);
      setTimeout(() => setIsTransitioning(false), 50);
    }, 150);
  };

  const handleProjectClick = (projectId: string) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedProjectId(projectId);
      setCurrentPage('project');
      pushRoute('project', projectId);
      setTimeout(() => setIsTransitioning(false), 50);
    }, 150);
  };

  const handleBackToWork = () => {
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
                  className="mt-4 text-blue-600 hover:underline"
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