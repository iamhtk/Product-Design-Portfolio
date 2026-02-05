// ═══════════════════════════════════════════════════════════════════════════
// ✏️  EDIT THIS FILE TO CHANGE YOUR PROJECT
// ═══════════════════════════════════════════════════════════════════════════
// 
// This file contains EVERYTHING for this project - both data AND display!
// Just edit the content below and the website will update automatically.
//
// ═══════════════════════════════════════════════════════════════════════════

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Linkedin, Youtube, Instagram, Facebook } from 'lucide-react';
import { ScrollToTop } from '../ScrollToTop';
import type { ContentBlock } from './types';

interface ProductivityProjectProps {
  onBack: () => void;
}

const PROGRESS_BAR_HIDE_DELAY_MS = 400;

export function ProductivityProject({ onBack }: ProductivityProjectProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [progressBarVisible, setProgressBarVisible] = useState(false);
  const hideBarTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  // ═══════════════════════════════════════════════════════════════════════
  // EDIT YOUR PROJECT CONTENT BELOW
  // ═══════════════════════════════════════════════════════════════════════
  
  const title = 'Apple';
  const company = 'Apple';
  const subtitle = 'Innovative without saying so.';
  const headerColor = '#A2C4E0';
  const icon = ''; // Sidebar icon (left column) - Add image/video path here
  const headerIcon = ''; // Header section icon (top banner) - Add image/video path here (e.g., '/path/to/header-icon.png' or '/path/to/header-icon.mp4')
  const role = 'Product Design Intern';
  const team = 'Rachel Kim, Tom Chen, Sarah Zhang';
  const when = 'Summer 2024';
  const overview = 'During my internship at Apple, I contributed to product design explorations for a confidential project. This work involved collaborating with engineers, designers, and HCI researchers.';
  const speedReadChallenge = 'Contributing to product design explorations for a confidential project at Apple.';
  const speedReadProcess = 'Collaborating with engineers, designers, and HCI researchers; daily stand-ups, design critiques, and prototyping sessions; experimentation and learning encouraged.';
  const speedReadTakeaways = 'Learning Apple\'s design process; working with cross-functional teams; contributing to products used by millions.';
  const speedReadImpact = 'Gained hands-on experience in a world-class design environment and contributed to impactful product explorations.';

  const scrollToCaseStudy = () => {
    document.getElementById('case-study-start')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Page content: add text or image/video in the order you want. Order here = order on page.
  const blocks: ContentBlock[] = [
    { type: 'text', header: 'WHY I JOINED THIS INTERNSHIP', content: 'Apple has consistently set the bar for intuitive, delightful user experiences. I was excited to learn their design process and contribute to products used by millions of people worldwide.' },
    { type: 'image', src: 'https://images.unsplash.com/photo-1761795084688-bb007bc51697?w=1200&q=80' },
    { type: 'text', header: 'DAY IN THE LIFE', content: 'As an intern, I collaborated with product managers, engineers, and fellow designers. We had daily stand-ups, design critiques, and prototyping sessions. The team encouraged experimentation and learning.' },
    { type: 'image', src: 'https://images.unsplash.com/photo-1650467881002-d98835b41f7b?w=1200&q=80' },
    { type: 'text', header: 'KEY LEARNINGS', content: "I learned the importance of sweating the details - every pixel, every animation, every interaction matters. I also discovered how cross-functional collaboration leads to stronger solutions. Working within Apple's design system taught me the value of consistency at scale." },
    { type: 'colors', colors: ['#A2C4E0', '#B8D3E8', '#CEE2F0', '#E4F1F8'] },
  ];

  // ═══════════════════════════════════════════════════════════════════════
  // DISPLAY CODE BELOW - Don't edit unless you know what you're doing
  // ═══════════════════════════════════════════════════════════════════════

  // Helper function to render icon (image or video)
  const renderIcon = (iconPath: string, size: 'large' | 'small') => {
    if (!iconPath) return null;
    
    const isVideo = iconPath.endsWith('.mp4') || iconPath.endsWith('.webm') || iconPath.endsWith('.mov');
    const sizeClasses = size === 'large' 
      ? 'w-[120px] h-[120px] md:w-[180px] md:h-[180px] object-contain' 
      : 'max-w-[48px] max-h-[48px] w-auto h-auto object-contain';
    
    if (isVideo) {
      return (
        <video 
          src={iconPath} 
          className={sizeClasses}
          autoPlay
          loop
          muted
          playsInline
        />
      );
    }
    
    return (
      <img 
        src={iconPath} 
        alt={`${title} icon`}
        className={sizeClasses}
      />
    );
  };

  return (
    <div className="min-h-screen bg-white" style={{ paddingTop: 'var(--nav-height)' }}>
      <ScrollToTop />
      
      {progressBarVisible &&
        createPortal(
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, width: '100%', height: '6px', backgroundColor: 'rgba(0,0,0,0.12)', zIndex: 9999, pointerEvents: 'none', transition: 'opacity 0.2s ease-out' }}>
            <div style={{ height: '100%', width: `${scrollProgress}%`, backgroundColor: headerColor, transition: 'width 0.15s ease-out' }} />
          </div>,
          document.body
        )}

      {/* Header Banner - image centered and contained within hero */}
      <div 
        className="w-full h-[300px] md:h-[500px] flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: headerColor }}
      >
        <div className="h-full w-full flex items-center justify-center p-4">
          {headerIcon ? (
            <div className="h-full w-full flex items-center justify-center min-h-0">
              {(() => {
                const iconPath = headerIcon;
                if (!iconPath) return null;
                const isVideo = iconPath.endsWith('.mp4') || iconPath.endsWith('.webm') || iconPath.endsWith('.mov');
                const sizeClasses = 'max-h-full max-w-full object-contain';
                if (isVideo) {
                  return (
                    <video src={iconPath} className={sizeClasses} autoPlay loop muted playsInline />
                  );
                }
                return (
                  <img src={iconPath} alt={`${title} icon`} className={sizeClasses} />
                );
              })()}
            </div>
          ) : (
            <svg className="w-[60px] h-[60px] md:w-[80px] md:h-[80px]" viewBox="0 0 24 24" fill="white">
              <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
            </svg>
          )}
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-12 md:gap-16">
          <div className="space-y-8">
            {icon ? (
              <div className="hidden md:block" style={{ width: 48, height: 48 }}>
                <img
                  src={icon.startsWith('/') ? icon : `/${icon}`}
                  alt={`${title} icon`}
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              </div>
            ) : (
              <div className="hidden md:block">
                <svg className="w-[48px] h-[48px]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                </svg>
              </div>
            )}

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
            </div>

            <button 
              onClick={onBack}
              className="text-[16px] text-gray-500 hover:text-gray-900 transition-colors hidden md:block"
            >
              ← Back to Work
            </button>
          </div>

          <div className="space-y-16">
            <div className="md:hidden">
              <button 
                onClick={onBack}
                className="text-[15px] text-gray-500 hover:text-gray-900 transition-colors"
              >
                ← Back to Homepage
              </button>
            </div>

            <div className="space-y-6">
              <h1 className="text-[48px] md:text-[64px] lg:text-[72px] leading-[1.1] font-bold text-gray-900 tracking-tight">
                {title}
              </h1>
              <p className="text-[26px] md:text-[28px] lg:text-[30px] text-gray-700 leading-relaxed font-medium">
                {subtitle}
              </p>
            </div>

            {/* Speed Read / Gist */}
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
                <p className="text-[18px] leading-[1.85] text-gray-700">Got more time? :)</p>
                <p className="text-[16px] leading-relaxed text-gray-500">Click the arrow to read the entire case study</p>
                <button type="button" onClick={scrollToCaseStudy} className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 transition-colors" aria-label="Scroll to case study">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div id="case-study-start" className="space-y-16 mt-16" style={{ scrollMarginTop: 'var(--nav-height, 80px)' }}>
          {blocks.map((block, index) => {
            if (block.type === 'text') {
              return (
                <div key={index} className="space-y-6" style={block.indent ? { marginLeft: '2.5rem' } : undefined}>
                  {block.header && (
                    <h3 className="text-[11px] tracking-[0.2em] text-gray-400 uppercase font-medium">
                      {block.header}
                    </h3>
                  )}
                  <p className="text-[18px] leading-[1.85] text-gray-700">{block.content}</p>
                </div>
              );
            }
            if (block.type === 'textBullets') {
              const marginLeft = block.indentLevel === 2 ? '5rem' : block.indent ? '2.5rem' : undefined;
              return (
                <div key={index} className="space-y-6" style={marginLeft ? { marginLeft } : undefined}>
                  {block.header && (
                    <h3 className="text-[11px] tracking-[0.2em] text-gray-400 uppercase font-medium">
                      {block.header}
                    </h3>
                  )}
                  <ul className="list-disc pl-6 space-y-2 text-[18px] leading-[1.85] text-gray-700">
                    {block.items.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              );
            }
            if (block.type === 'textImageRow') {
              const isVideo = block.src.endsWith('.mp4') || block.src.endsWith('.webm') || block.src.endsWith('.mov');
              return (
                <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
                  <div className="space-y-6">
                    {block.header && (
                      <h3 className="text-[11px] tracking-[0.2em] text-gray-400 uppercase font-medium">
                        {block.header}
                      </h3>
                    )}
                    <p className="text-[18px] leading-[1.85] text-gray-700">{block.content}</p>
                  </div>
                  <div className="w-full max-h-[120px] overflow-hidden rounded-lg">
                    {isVideo ? (
                      <video src={block.src} controls className="w-full h-full max-h-[120px] object-cover rounded-lg" playsInline>
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <img src={block.src} alt={`${title} - ${index + 1}`} className="w-full h-full max-h-[120px] object-cover rounded-lg" />
                    )}
                  </div>
                </div>
              );
            }
            if (block.type === 'image') {
              const isVideo = block.src.endsWith('.mp4') || block.src.endsWith('.webm') || block.src.endsWith('.mov');
              const marginLeft = block.indentLevel === 2 ? '5rem' : block.indent ? '2.5rem' : undefined;
              const containerStyle = {
                ...(marginLeft && { marginLeft }),
                ...(block.maxHeight && { maxHeight: block.maxHeight, overflow: 'hidden' as const }),
              };
              const mediaStyle = block.maxHeight ? { maxHeight: block.maxHeight, objectFit: 'contain' as const } : undefined;
              return (
                <div key={index} className="w-full" style={containerStyle}>
                  {isVideo ? (
                    <video src={block.src} controls className="w-full h-auto" playsInline style={mediaStyle}>
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <img src={block.src} alt={`${title} - ${index + 1}`} className="w-full h-auto" style={mediaStyle} />
                  )}
                </div>
              );
            }
            if (block.type === 'colors') {
              return (
                <div key={index} className="grid grid-cols-4 gap-4">
                  {block.colors.map((color, i) => (
                    <div key={i} className="aspect-square rounded-lg" style={{ backgroundColor: color }} />
                  ))}
                </div>
              );
            }
            return null;
          })}

          <div className="pt-24 pb-8">
            <div className="mb-12">
              <button 
                onClick={onBack}
                className="text-[17px] text-gray-700 hover:text-gray-900 transition-colors font-medium"
              >
                ← Back to Homepage
              </button>
            </div>
          </div>

          <div className="md:hidden pt-8">
            <button 
              onClick={onBack}
              className="text-[13px] text-gray-500 hover:text-gray-900 transition-colors"
            >
              ← Back to Work
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 pb-12" data-footer>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-12 border-t border-gray-200 text-[13px] text-gray-500">
          <div className="flex flex-wrap items-center gap-2">
            <span className="whitespace-nowrap">Designed and Developed.</span>
            <span>© 2025</span>
          </div>
          
          <div className="flex items-center gap-3 md:gap-5">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-900 transition-colors" aria-label="LinkedIn">
              <Linkedin className="w-[18px] h-[18px]" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-900 transition-colors" aria-label="YouTube">
              <Youtube className="w-[18px] h-[18px]" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-900 transition-colors" aria-label="Instagram">
              <Instagram className="w-[18px] h-[18px]" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-900 transition-colors" aria-label="Facebook">
              <Facebook className="w-[18px] h-[18px]" />
            </a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-900 transition-colors" aria-label="X (Twitter)">
              <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
