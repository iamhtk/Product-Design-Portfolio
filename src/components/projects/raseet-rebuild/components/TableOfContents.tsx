import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export function TableOfContents() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const sections = [
    { id: 'hero', label: 'Overview' },
    { id: 'meta', label: 'Project Info' },
    { id: 'statement', label: 'Mission & Vision' },
    { id: 'process', label: 'Design Process' },
    { id: 'research', label: 'User Research' },
    { id: 'findings', label: 'Key Findings' },
    { id: 'insights', label: 'Insights' },
    { id: 'goals', label: 'Product Goals' },
    { id: 'solutions', label: 'Solutions' },
    { id: 'design-goals', label: 'Design Goals' },
    { id: 'design-system', label: 'Design System' },
    { id: 'accessibility', label: 'Accessibility' },
    { id: 'retrospective', label: 'Retrospective' },
    { id: 'collaboration', label: 'Collaboration' },
    { id: 'lessons', label: 'Lessons Learned' },
    { id: 'closing', label: 'Closing' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i].id);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-6 left-6 z-50 lg:hidden p-3 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition-all"
        aria-label="Toggle table of contents"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 z-40 transition-transform duration-300 overflow-y-auto ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Case Study</h2>
          
          <nav>
            <ul className="space-y-1">
              {sections.map((section) => (
                <li key={section.id}>
                  <button
                    onClick={() => scrollToSection(section.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      activeSection === section.id
                        ? 'bg-indigo-50 text-indigo-600 font-semibold'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    {section.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
