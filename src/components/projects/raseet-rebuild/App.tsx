import { CaseStudyHero } from './components/CaseStudyHero';
import { ProjectMeta } from './components/ProjectMeta';
import { ProjectStatement } from './components/ProjectStatement';
import { DesignProcess } from './components/DesignProcess';
import { UserResearch } from './components/UserResearch';
import { KeyFindings } from './components/KeyFindings';
import { InsightsGlance } from './components/InsightsGlance';
import { Persona } from './components/Persona';
import { EmpathyMap } from './components/EmpathyMap';
import { UserJourney } from './components/UserJourney';
import { ImpactOfResearch } from './components/ImpactOfResearch';
import { ProductGoals } from './components/ProductGoals';
import { Solutions } from './components/Solutions';
import { DesignGoals } from './components/DesignGoals';
import { DesignSystem } from './components/DesignSystem';
import { Accessibility } from './components/Accessibility';
import { Wireframes } from './components/Wireframes';
import { UIDesign } from './components/UIDesign';
import { Retrospective } from './components/Retrospective';
import { Collaboration } from './components/Collaboration';
import { LessonsLearned } from './components/LessonsLearned';
import { ClosingReflections } from './components/ClosingReflections';
import { TableOfContents } from './components/TableOfContents';
import { ArrowUp } from 'lucide-react';
import { useState, useEffect } from 'react';

function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Table of Contents Sidebar */}
      <TableOfContents />
      
      {/* Main Content with left margin for sidebar on desktop */}
      <div className="lg:ml-64">
        {/* Scroll to Top Button */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 p-4 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition-all duration-200 hover:scale-110"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-6 h-6" />
          </button>
        )}

        {/* Case Study Content */}
        <div id="hero"><CaseStudyHero /></div>
        <div id="meta"><ProjectMeta /></div>
        <div id="statement"><ProjectStatement /></div>
        <div id="process"><DesignProcess /></div>
        <div id="research"><UserResearch /></div>
        <div id="findings"><KeyFindings /></div>
        <div id="insights"><InsightsGlance /></div>
        <div id="persona"><Persona /></div>
        <div id="empathy-map"><EmpathyMap /></div>
        <div id="user-journey"><UserJourney /></div>
        <div id="impact-of-research"><ImpactOfResearch /></div>
        <div id="goals"><ProductGoals /></div>
        <div id="solutions"><Solutions /></div>
        <div id="design-goals"><DesignGoals /></div>
        <div id="design-system"><DesignSystem /></div>
        <div id="accessibility"><Accessibility /></div>
        <div id="wireframes"><Wireframes /></div>
        <div id="ui-design"><UIDesign /></div>
        <div id="retrospective"><Retrospective /></div>
        <div id="collaboration"><Collaboration /></div>
        <div id="lessons"><LessonsLearned /></div>
        <div id="closing"><ClosingReflections /></div>
        
        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-4">Get in touch!</h3>
              <p className="text-gray-300 mb-2">
                If you are in pursuit of a designer committed to turning challenges into delightful experiences, let's talk!
              </p>
              <a 
                href="mailto:iamhtk@umich.edu" 
                className="text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                iamhtk@umich.edu
              </a>
            </div>
            
            <div className="flex justify-center gap-6 mb-8">
              <p className="text-sm text-gray-400">Logo Logo Logo Logo Logo</p>
            </div>
            
            <div className="text-center text-sm text-gray-400 border-t border-gray-800 pt-8">
              <p>© 2025 • Handmade with Figma, Framer, and love ❤️</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;