import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import {
  trackNavClick,
  trackOutboundLink,
  trackEmailClick,
  trackMobileMenuOpen,
} from '../services/analytics';

type Page =
  | 'work'
  | 'about'
  | 'friends'
  | 'resume'
  | 'favorites'
  | 'blog'
  | 'analytics';

interface NavigationProps {
  currentPage: Page | 'project';
  onNavigate: (page: Page) => void;
}

export function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links: { label: string; page: Page }[] = [
    { label: 'Work', page: 'work' },
    { label: 'Resume', page: 'resume' },
    { label: 'Blog', page: 'blog' },
    { label: 'Friends', page: 'friends' },
    { label: 'Favorites', page: 'favorites' },
    { label: 'About', page: 'about' },
  ];

  const socialLinks = [
    { label: 'Figma', url: 'https://www.figma.com/@iamhtk' },
    { label: 'GitHub', url: 'https://github.com/iamhtk' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/iamhtk' },
    { label: 'YouTube', url: 'https://www.youtube.com/@avlnce' },
    { label: 'Instagram', url: 'https://www.instagram.com/hrithiksanyal/' },
    { label: 'Facebook', url: 'https://www.facebook.com/Avlnce/' },
    { label: 'X (Twitter)', url: 'https://x.com/hrithiksanyal' },
    { label: 'SoundCloud', url: 'https://soundcloud.com/avlncemusic' },
  ];

  const handleNavigation = (page: Page) => {
    trackNavClick(page);
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen((open) => {
      const next = !open;
      if (next) trackMobileMenuOpen();
      return next;
    });
  };

  const linkIsActive = (page: Page) => {
    if (currentPage === page) return true;
    if (page === 'work' && currentPage === 'project') return true;
    return false;
  };

  return (
    <>
      <nav
        className={`liquid-glass fixed top-0 left-0 right-0 z-50 min-h-[var(--nav-height)] flex flex-row items-center w-full ${
          scrolled ? 'nav-scrolled' : ''
        }`}
      >
        <div className="w-full max-w-[1600px] mx-auto px-6 md:px-8 lg:px-12 py-5 flex flex-row flex-nowrap items-center justify-between gap-4 min-w-0">
          <button
            type="button"
            onClick={() => handleNavigation('work')}
            className="text-[15px] text-gray-900 hover:opacity-60 transition-opacity duration-300 focus-ring rounded py-2 px-1 cursor-pointer"
          >
            Hrithik Sanyal
          </button>

          <div className="hidden md:flex md:flex-shrink-0 items-center gap-6 md:gap-8" role="navigation" aria-label="Main">
            {links.map((link) => (
              <button
                key={link.page}
                type="button"
                onClick={() => handleNavigation(link.page)}
                className="relative group focus-ring rounded py-2 px-1 cursor-pointer"
                aria-current={linkIsActive(link.page) ? 'page' : undefined}
              >
                <span
                  className={`text-[15px] transition-colors duration-300 ${
                    linkIsActive(link.page)
                      ? 'text-gray-900 font-medium'
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  {link.label}
                </span>
                {linkIsActive(link.page) && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-gray-900 rounded-full transition-all duration-200 ease-out" />
                )}
              </button>
            ))}
            <a
              href="mailto:sanyalhrithik@gmail.com"
              onClick={() => {
                trackEmailClick();
              }}
              className="text-[15px] text-gray-900 hover:opacity-60 transition-opacity duration-300 ease-out focus-ring rounded py-2 px-1"
            >
              Email
            </a>
          </div>

          <button
            type="button"
            onClick={toggleMobileMenu}
            className="md:hidden text-gray-900 p-3 min-h-[44px] min-w-[44px] cursor-pointer"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white md:hidden">
          <div className="flex flex-col h-full">
            <div className="px-8 py-5 flex items-center justify-between border-b border-gray-100/80 bg-white">
              <button
                type="button"
                onClick={() => handleNavigation('work')}
                className="text-[15px] text-gray-900 cursor-pointer"
              >
                Hrithik Sanyal
              </button>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-900 p-3 min-h-[44px] min-w-[44px] cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 flex flex-col justify-between px-8 py-12">
              <nav className="space-y-6" aria-label="Main">
                {links.map((link) => (
                  <button
                    key={link.page}
                    type="button"
                    onClick={() => handleNavigation(link.page)}
                    className={`block text-[20px] text-left relative cursor-pointer ${
                      linkIsActive(link.page) ? 'text-gray-900' : 'text-gray-400'
                    }`}
                    aria-current={linkIsActive(link.page) ? 'page' : undefined}
                  >
                    {link.label}
                    {linkIsActive(link.page) && (
                      <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 w-1.5 h-1.5 bg-gray-900 rounded-full" />
                    )}
                  </button>
                ))}
              </nav>

              <div className="space-y-6 pt-12 border-t border-gray-100">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.url}
                    onClick={() => trackOutboundLink(social.label, social.url)}
                    className="block text-[15px] text-gray-500 hover:text-gray-900"
                  >
                    {social.label}
                  </a>
                ))}
                <a
                  href="mailto:sanyalhrithik@gmail.com"
                  onClick={() => {
                    trackEmailClick();
                  }}
                  className="block text-[15px] text-gray-900"
                >
                  Email
                </a>
                <p className="text-[13px] text-gray-400 pt-6">© 2026</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}


