import { useState } from 'react';
import { Menu, X } from 'lucide-react';

type Page = 'work' | 'about' | 'friends' | 'resume' | 'favorites' | 'blog';

interface NavigationProps {
  currentPage: Page | 'project';
  onNavigate: (page: Page) => void;
}

export function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const links: { label: string; page: Page }[] = [
    { label: 'Work', page: 'work' },
    { label: 'Resume', page: 'resume' },
    { label: 'Blogs', page: 'blog' },
    { label: 'Friends', page: 'friends' },
    { label: 'About', page: 'about' },
  ];

  const socialLinks = [
    { label: 'Figma', url: '#' },
    { label: 'Github', url: '#' },
    { label: 'LinkedIn', url: '#' },
    { label: 'Twitter', url: '#' },
  ];

  const handleNavigation = (page: Page) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Desktop & Mobile Nav Bar - Liquid Glass effect */}
      <nav className="liquid-glass fixed top-0 left-0 right-0 z-50 min-h-[var(--nav-height)] flex items-center">
        <div className="max-w-[1600px] mx-auto px-6 md:px-8 lg:px-12 py-5 flex items-center justify-between w-full">
          <button 
            onClick={() => handleNavigation('work')}
            className="text-[15px] text-gray-900 hover:opacity-60 transition-opacity"
          >
            Hrithik Sanyal
          </button>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 md:gap-8">
            {links.map((link) => (
              <button
                key={link.page}
                onClick={() => onNavigate(link.page)}
                className="relative group"
              >
                <span className={`text-[15px] transition-all duration-200 ease-out ${
                  currentPage === link.page 
                    ? 'text-gray-900' 
                    : 'text-gray-400 hover:text-gray-900'
                }`}>
                  {link.label}
                </span>
                {/* Apple-style dot indicator */}
                {currentPage === link.page && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-gray-900 rounded-full transition-all duration-200 ease-out" />
                )}
              </button>
            ))}
            <button className="text-[15px] text-gray-900 hover:opacity-60 transition-opacity duration-200 ease-out">
              Email
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-900 p-2"
            aria-label="Toggle menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white md:hidden">
          <div className="flex flex-col h-full">
            {/* Mobile Menu Header */}
            <div className="px-8 py-5 flex items-center justify-between border-b border-gray-100">
              <button 
                onClick={() => handleNavigation('work')}
                className="text-[15px] text-gray-900"
              >
                Hrithik Sanyal
              </button>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-900 p-2"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Mobile Menu Content */}
            <div className="flex-1 flex flex-col justify-between px-8 py-12">
              {/* Navigation Links */}
              <nav className="space-y-6">
                {links.map((link) => (
                  <button
                    key={link.page}
                    onClick={() => handleNavigation(link.page)}
                    className={`block text-[20px] text-left relative ${
                      currentPage === link.page 
                        ? 'text-gray-900' 
                        : 'text-gray-400'
                    }`}
                  >
                    {link.label}
                    {/* Mobile indicator - small dot */}
                    {currentPage === link.page && (
                      <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 w-1.5 h-1.5 bg-gray-900 rounded-full" />
                    )}
                  </button>
                ))}
              </nav>

              {/* Social Links & Email */}
              <div className="space-y-6 pt-12 border-t border-gray-100">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.url}
                    className="block text-[15px] text-gray-500 hover:text-gray-900"
                  >
                    {social.label}
                  </a>
                ))}
                <button className="block text-[15px] text-gray-900">
                  Email
                </button>
                <p className="text-[13px] text-gray-400 pt-6">
                  © 2025
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}