import { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { HomePage } from './components/HomePage';
import { AboutPage } from './components/AboutPage';
import { FriendsPage } from './components/FriendsPage';
import { ResumePage } from './components/ResumePage';
import { projectComponents } from './components/projects';
import { Blog } from './components/Blog';

type Page = 'work' | 'about' | 'friends' | 'resume' | 'favorites' | 'blog' | 'project';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('work');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Scroll to top whenever page changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage, selectedProjectId]);

  const handleNavigate = (page: Exclude<Page, 'project'>) => {
    if (page === currentPage) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentPage(page);
      setSelectedProjectId(null);
      setTimeout(() => setIsTransitioning(false), 50);
    }, 150);
  };

  const handleProjectClick = (projectId: string) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedProjectId(projectId);
      setCurrentPage('project');
      setTimeout(() => setIsTransitioning(false), 50);
    }, 150);
  };

  const handleBackToWork = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentPage('work');
      setSelectedProjectId(null);
      setTimeout(() => setIsTransitioning(false), 50);
    }, 150);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation currentPage={currentPage} onNavigate={handleNavigate} />
      
      <div 
        className={`page-transition transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          isTransitioning 
            ? 'opacity-0 translate-y-2' 
            : 'opacity-100 translate-y-0'
        }`}
      >
        {currentPage === 'work' && <HomePage onProjectClick={handleProjectClick} />}
        {currentPage === 'about' && <AboutPage />}
        {currentPage === 'friends' && <FriendsPage />}
        {currentPage === 'resume' && <ResumePage />}
        {currentPage === 'favorites' && (
          <div className="min-h-screen pt-32 px-8 md:px-16">
            <h1 className="text-4xl">Favorites Page</h1>
            <p className="mt-4 text-gray-600">Coming soon...</p>
          </div>
        )}
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
          return <ProjectComponent onBack={handleBackToWork} />;
        })()}
      </div>
    </div>
  );
}

export default App;