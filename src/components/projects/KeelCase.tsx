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
import { Linkedin, Youtube, Instagram, Facebook, Github, Figma } from 'lucide-react';
import { ScrollToTop } from '../ScrollToTop';
import { useLightbox } from '../Lightbox';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { ExploreMoreSection } from './ExploreMoreSection';
import { getInitialCaseStudyVisible } from './caseStudyRestore';
import { getHeaderIndentMargin, getListIndentMargin } from './indentHelpers';
import { getAlignClass, getBlockAlignClass } from './alignHelpers';
import type { ContentBlock } from './types';

/** Looping video (GIF-style): autoplay, muted, loop. Uses ref + play() for reliable autoplay. */
function LoopingVideo({ src, className, style }: { src: string; className?: string; style?: React.CSSProperties }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const play = () => {
      el.muted = true;
      el.play().catch(() => {});
    };
    el.addEventListener('loadeddata', play);
    play();
    return () => el.removeEventListener('loadeddata', play);
  }, [src]);
  return (
    <video
      ref={videoRef}
      src={src}
      className={className}
      style={style}
      loop
      muted
      playsInline
      preload="none"
      aria-label="Looping video"
    >
      Your browser does not support the video tag.
    </video>
  );
}

const CURRENT_PROJECT_ID = 'Keel';

interface KeelCaseProjectProps {
  onBack: () => void;
  onProjectClick?: (projectId: string) => void;
}

const PROGRESS_BAR_HIDE_DELAY_MS = 400;

export function KeelCaseProject({ onBack, onProjectClick }: KeelCaseProjectProps) {
  const { openLightbox } = useLightbox();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [progressBarVisible, setProgressBarVisible] = useState(false);
  const [caseStudyVisible, setCaseStudyVisible] = useState(getInitialCaseStudyVisible);
  const hideBarTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const totalScrollableHeight = Math.max(documentHeight - windowHeight, 1);
      const progress = (scrollTop / totalScrollableHeight) * 100;
      setScrollProgress(Math.min(Math.max(progress, 0), 100));

      // Show bar while scrolling; hide after user pauses
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
  
  const title = 'Keel';
  const company = 'Freelance / NDA — Client Name Withheld';
  const subtitle = 'AI-Native Finance Copilot';
  const headerColor = '#000000';
  const progressBarColor = '#4FF79E';
  const arrowColor = '#4FF79E';
  const icon = '/gm/gm_logo.png'; // Sidebar icon (left column) - Add image/video path here
  const headerIcon = '/gm/header.png'; // Header section icon (top banner) - Add image/video path here (e.g., '/path/to/header-icon.png' or '/path/to/header-icon.mp4')
  const role = 'Founding Product Designer';
  const team = <>Hrithik Sanyal, 3 Engineers, 1 PM</>;
  const when = 'September 2024 – December 2024';
  // Speed Read / Gist (2x2 grid in right column)
  const speedReadChallenge = "Placeholder: articulate the finance copilot opportunity and constraints.";
  const speedReadProcess = "Placeholder: summarize the 0→1 design arc alongside engineering.";
  const speedReadTakeaways = "Placeholder: highlight guardrails, trust, and mobile-first decisions.";
  const speedReadImpact = "Placeholder: add outcomes or next steps for Keel once finalized.";

  const scrollToCaseStudy = () => {
    if (!caseStudyVisible) {
      setCaseStudyVisible(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          document.getElementById('case-study-start')?.scrollIntoView({ behavior: 'smooth' });
        });
      });
    } else {
      document.getElementById('case-study-start')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Page content: add text or image/video in the order you want. Order here = order on page.
  const blocks: ContentBlock[] = [
    { type: 'text', header: 'Case study body', content: 'Placeholder: full narrative, media, and diagrams will be added in the next content pass. Layout, spacing, and components match the GM case study template.' },
  ];

  // ═══════════════════════════════════════════════════════════════════════
  // DISPLAY CODE BELOW - Don't edit unless you know what you're doing
  // ═══════════════════════════════════════════════════════════════════════

  return (
    <div className="min-h-screen bg-white">
      <ScrollToTop />
      
      {/* Scroll Progress Bar - fixed at top, fills as user scrolls; inline styles so it’s always visible above nav */}
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
          document.body
        )}

      {/* Header Banner */}
      <div 
        className="w-full h-[300px] md:h-[500px] flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: headerColor }}
      >
        <div className="h-full w-full flex items-center justify-center p-4 min-h-0 min-w-0">
          {headerIcon ? (
            <div className="h-full w-full flex items-center justify-center min-h-0 min-w-0">
              {(() => {
                const iconPath = headerIcon;
                if (!iconPath) return null;
                const isVideo = iconPath.endsWith('.mp4') || iconPath.endsWith('.webm') || iconPath.endsWith('.mov');
                const sizeClasses = 'h-full w-auto max-h-full object-contain';
                if (isVideo) {
                  return (
                    <video src={iconPath} className={sizeClasses} autoPlay loop muted playsInline />
                  );
                }
                return (
                  <ImageWithFallback src={iconPath} alt={`${title} icon`} className={sizeClasses} priority enableLightbox={false} />
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

      {/* Content Container */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-12 md:gap-16">
          {/* Left Sidebar */}
          <div className="space-y-8 order-2 md:order-none">
            {icon ? (
              <div className="block" style={{ width: 48, height: 48 }}>
                <img
                  src={icon.startsWith('/') ? icon : `/${icon}`}
                  alt={`${title} icon`}
                  onClick={(e) => {
                    e.stopPropagation();
                    const src = icon.startsWith('/') ? icon : `/${icon}`;
                    openLightbox([{ src, alt: `${title} icon`, caption: `${title} icon` }], 0);
                  }}
                  style={{ width: '100%', height: '100%', objectFit: 'contain', cursor: 'zoom-in' }}
                />
              </div>
            ) : (
              <div className="block">
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
              className="text-[16px] text-gray-500 hover:text-gray-900 transition-colors hidden md:block cursor-pointer"
            >
              ← Back to Work
            </button>
          </div>

          {/* Right Column */}
          <div className="space-y-16 order-1 md:order-none">
            <div className="md:hidden">
              <button 
                onClick={onBack}
                className="text-[15px] text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
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
                <h3 className="text-[11px] tracking-[0.2em] text-gray-400 uppercase font-medium">
                  Speed Read
                </h3>
                <p className="text-[18px] leading-[1.85] text-gray-700">
                  In a rush? Here&apos;s the gist.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                <div className="space-y-4">
                  <h4 className="text-[11px] tracking-[0.2em] text-gray-400 uppercase font-medium">
                    Challenge
                  </h4>
                  <p className="text-[18px] leading-[1.85] text-gray-700">
                    {speedReadChallenge}
                  </p>
                </div>
                <div className="space-y-4">
                  <h4 className="text-[11px] tracking-[0.2em] text-gray-400 uppercase font-medium">
                    Process
                  </h4>
                  <p className="text-[18px] leading-[1.85] text-gray-700">
                    {speedReadProcess}
                  </p>
                </div>
                <div className="space-y-4">
                  <h4 className="text-[11px] tracking-[0.2em] text-gray-400 uppercase font-medium">
                    Takeaways
                  </h4>
                  <p className="text-[18px] leading-[1.85] text-gray-700">
                    {speedReadTakeaways}
                  </p>
                </div>
                <div className="space-y-4">
                  <h4 className="text-[11px] tracking-[0.2em] text-gray-400 uppercase font-medium">
                    Impact
                  </h4>
                  <p className="text-[18px] leading-[1.85] text-gray-700">
                    {speedReadImpact}
                  </p>
                </div>
              </div>

              <div className="space-y-4 pt-4 flex flex-col items-center text-center">
                <p className="text-[18px] leading-[1.85] text-gray-700">
                  Got more time? :)
                </p>
                <p className="text-[16px] leading-relaxed text-gray-500">
                  Click the arrow to read the entire case study
                </p>
                <button
                  type="button"
                  onClick={scrollToCaseStudy}
                  aria-label="Scroll to case study"
                  className="group block cursor-pointer border-0 bg-transparent p-0 mt-8 min-h-[44px] min-w-[44px] transition-transform duration-300 ease-out hover:scale-105 focus:outline-none focus:ring-0"
                >
                  <svg
                    width={44}
                    height={52}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                      display: 'block',
                      flexShrink: 0,
                      color: arrowColor,
                      filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.08))',
                    }}
                    className="arrow-float-premium"
                  >
                    <path
                      d="M7 6l5 5 5-5"
                      stroke="currentColor"
                      strokeWidth="2.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      opacity="0.45"
                    />
                    <path
                      d="M7 10l5 5 5-5"
                      stroke="currentColor"
                      strokeWidth="2.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      opacity="0.7"
                    />
                    <path
                      d="M7 14l5 5 5-5"
                      stroke="currentColor"
                      strokeWidth="2.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      opacity="1"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {caseStudyVisible ? (
          <>
        {/* Main Content */}
        <div id="case-study-start" className="space-y-16 mt-16" style={{ scrollMarginTop: 'var(--nav-height, 80px)', overflowX: 'hidden' }}>
          {blocks.map((block, index) => {
            if (block.type === 'text') {
              return (
                <div key={index} className={`space-y-6 ${getAlignClass(block.align)}`} style={block.indent ? { marginLeft: '2.5rem' } : undefined}>
                  {block.header && (
                    <h3 className="text-[11px] tracking-[0.2em] text-gray-400 uppercase font-medium">
                      {block.header}
                    </h3>
                  )}
                  {block.subheader && (
                    <h3 className="text-[11px] tracking-[0.2em] text-gray-400 uppercase font-medium">
                      {block.subheader}
                    </h3>
                  )}
                  <p className="text-[18px] leading-[1.85] text-gray-700">{block.content}</p>
                </div>
              );
            }
            if (block.type === 'textBullets') {
              const marginLeft = block.indentLevel === 2 ? '5rem' : block.indent ? '2.5rem' : undefined;
              return (
                <div key={index} className={`space-y-6 ${getAlignClass(block.align)}`} style={marginLeft ? { marginLeft } : undefined}>
                  {block.header && (
                    <h3 className="text-[11px] tracking-[0.2em] text-gray-400 uppercase font-medium">
                      {block.header}
                    </h3>
                  )}
                  {block.subheader && (
                    <h3
                      className="text-[11px] tracking-[0.2em] text-gray-400 uppercase font-medium"
                      style={
                        block.subheaderIndent !== undefined && block.subheaderIndent !== 0
                          ? { marginLeft: getHeaderIndentMargin(block.subheaderIndent) }
                          : undefined
                      }
                    >
                      {block.subheader}
                    </h3>
                  )}
                  <ul
                    className="space-y-2 text-[18px] leading-[1.85] text-gray-700"
                    style={{ listStyleType: 'disc', paddingLeft: '1.5rem' }}
                  >
                    {block.items.map((item, i) => (
                      <li key={i} style={{ display: 'list-item' }}>{item}</li>
                    ))}
                  </ul>
                </div>
              );
            }
            if (block.type === 'textImageRow') {
              const isVideo = block.src.endsWith('.mp4') || block.src.endsWith('.webm') || block.src.endsWith('.mov');
              const imageOnLeft = block.imageSide === 'left';
              return (
                <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
                  <div className={`space-y-6 ${getAlignClass(block.align)} ${imageOnLeft ? 'order-2 md:order-none md:col-start-2' : 'order-1 md:order-none md:col-start-1'}`}>
                    {block.header && (
                      <h3
                        className="text-[11px] tracking-[0.2em] text-gray-400 uppercase font-medium"
                        style={
                          block.headerIndent !== undefined && block.headerIndent !== 0
                            ? { marginLeft: getHeaderIndentMargin(block.headerIndent) }
                            : undefined
                        }
                      >
                        {block.header}
                      </h3>
                    )}
                    {block.subheader && (
                      <h3
                        className="text-[11px] tracking-[0.2em] text-gray-400 uppercase font-medium"
                        style={
                          block.subheaderIndent !== undefined && block.subheaderIndent !== 0
                            ? { marginLeft: getHeaderIndentMargin(block.subheaderIndent) }
                            : undefined
                        }
                      >
                        {block.subheader}
                      </h3>
                    )}
                    <p className="text-[18px] leading-[1.85] text-gray-700">{block.content}</p>
                    {block.items && block.items.length > 0 && (
                      <ul
                        className="space-y-2 text-[18px] leading-[1.85] text-gray-700 pl-6"
                        style={{ listStyleType: 'disc', marginLeft: getListIndentMargin(block.itemsIndent) }}
                      >
                        {block.items.map((item, i) => (
                          <li key={i} className="pl-1">{item}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className={`w-full max-h-[400px] overflow-hidden rounded-lg ${getBlockAlignClass(block.imageAlign)} ${imageOnLeft ? 'order-1 md:order-none md:col-start-1' : 'order-2 md:order-none md:col-start-2'}`}>
                    {isVideo ? (
                      <video src={block.src} controls className="w-full h-full max-h-[400px] object-cover rounded-lg" playsInline>
                  Your browser does not support the video tag.
                </video>
              ) : (
                      <ImageWithFallback src={block.src} alt={`${title} - ${index + 1}`} className="w-full h-full max-h-[400px] object-cover rounded-lg" />
              )}
            </div>
                </div>
              );
            }
            if (block.type === 'textTextRow') {
              const alignClass = getAlignClass(block.align);
              return (
                <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
                  <div className={`space-y-6 ${alignClass}`}>
                    {block.headerLeft && (
                      <h3 className="text-[11px] tracking-[0.2em] text-gray-400 uppercase font-medium">
                        {block.headerLeft}
                      </h3>
                    )}
                    <p className="text-[18px] leading-[1.85] text-gray-700">{block.contentLeft}</p>
                  </div>
                  <div className={`space-y-6 ${alignClass}`}>
                    {block.headerRight && (
                      <h3 className="text-[11px] tracking-[0.2em] text-gray-400 uppercase font-medium">
                        {block.headerRight}
                </h3>
              )}
                    <p className="text-[18px] leading-[1.85] text-gray-700">{block.contentRight}</p>
                  </div>
                </div>
              );
            }
            if (block.type === 'video') {
              const marginLeft = block.indentLevel === 2 ? '5rem' : block.indent ? '2.5rem' : undefined;
              const containerStyle = {
                ...(marginLeft && { marginLeft, maxWidth: marginLeft === '5rem' ? 'calc(100% - 5rem)' : 'calc(100% - 2.5rem)' }),
                ...(block.maxHeight && { maxHeight: block.maxHeight, overflow: 'hidden' as const }),
              };
              const videoStyle = block.maxHeight ? { maxHeight: block.maxHeight, objectFit: 'contain' as const } : undefined;
              return (
                <div key={index} className={`w-full flex ${block.align === 'center' ? 'justify-center' : block.align === 'right' ? 'justify-end' : 'justify-start'}`} style={containerStyle}>
                  <LoopingVideo src={block.src} className="w-full h-auto max-w-full" style={videoStyle} />
            </div>
              );
            }
            if (block.type === 'image') {
              const isVideo = block.src.endsWith('.mp4') || block.src.endsWith('.webm') || block.src.endsWith('.mov');
              const marginLeft = block.indentLevel === 2 ? '5rem' : block.indent ? '2.5rem' : undefined;
              const containerStyle = {
                ...(marginLeft && { marginLeft, maxWidth: marginLeft === '5rem' ? 'calc(100% - 5rem)' : 'calc(100% - 2.5rem)' }),
                ...(block.maxHeight && { maxHeight: block.maxHeight, overflow: 'hidden' as const }),
              };
              const mediaStyle = block.maxHeight ? { maxHeight: block.maxHeight, objectFit: 'contain' as const } : undefined;
              return (
                <div key={index} className={`w-full flex ${block.align === 'center' ? 'justify-center' : block.align === 'right' ? 'justify-end' : 'justify-start'}`} style={containerStyle}>
                  {isVideo ? (
                    <video src={block.src} controls className="w-full h-auto max-w-full" playsInline style={mediaStyle}>
                  Your browser does not support the video tag.
                </video>
              ) : (
                    <ImageWithFallback src={block.src} alt={`${title} - ${index + 1}`} className="w-full h-auto max-w-full" style={mediaStyle} />
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

          <ExploreMoreSection
            currentProjectId={CURRENT_PROJECT_ID}
            onBack={onBack}
            onProjectClick={onProjectClick}
          />

          <div className="md:hidden pt-8">
            <button 
              onClick={onBack}
                className="text-[15px] text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
            >
              ← Back to Work
            </button>
          </div>
        </div>
          </>
        ) : (
          <ExploreMoreSection
            currentProjectId={CURRENT_PROJECT_ID}
            onBack={onBack}
            onProjectClick={onProjectClick}
          />
        )}
      </div>

      {/* Footer */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-8 lg:px-12" data-footer>
        <div
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-12 pb-8 text-[13px] text-gray-500"
        >
          <div className="flex flex-wrap items-center gap-2">
            <span className="whitespace-nowrap">
              Designed & Developed by Hrithik Sanyal.
            </span>
            <span>© 2026</span>
          </div>
          
          <div className="flex items-center gap-3 md:gap-5">
            <a href="https://www.figma.com/@iamhtk" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-900 transition-colors" aria-label="Figma">
              <Figma className="w-[18px] h-[18px]" />
            </a>
            <a href="https://github.com/iamhtk" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-900 transition-colors" aria-label="GitHub">
              <Github className="w-[18px] h-[18px]" />
            </a>
            <a href="https://www.linkedin.com/in/iamhtk" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-900 transition-colors" aria-label="LinkedIn">
              <Linkedin className="w-[18px] h-[18px]" />
            </a>
            <a href="https://www.youtube.com/@avlnce" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-900 transition-colors" aria-label="YouTube">
              <Youtube className="w-[18px] h-[18px]" />
            </a>
            <a href="https://www.instagram.com/hrithiksanyal/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-900 transition-colors" aria-label="Instagram">
              <Instagram className="w-[18px] h-[18px]" />
            </a>
            <a href="https://www.facebook.com/Avlnce/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-900 transition-colors" aria-label="Facebook">
              <Facebook className="w-[18px] h-[18px]" />
            </a>
            <a href="https://x.com/hrithiksanyal" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-900 transition-colors" aria-label="X (Twitter)">
              <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a href="https://soundcloud.com/avlncemusic" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-900 transition-colors" aria-label="SoundCloud">
              <svg className="w-[18px] h-[18px]" viewBox="0 0 800 348" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M101.875 163.438C99.375 163.438 97.5 165.313 97.1875 168.125L90 255.625L97.1875 340.313C97.5 342.813 99.375 345 101.875 345C104.375 345 106.25 343.125 106.563 340.313L114.687 255.625L106.563 168.125C106.25 165.313 104.063 163.438 101.875 163.438Z" fill="currentColor" />
                <path d="M133.75 169.062C130.938 169.062 128.438 171.25 128.438 174.375L121.875 255.625L128.438 340.937C128.75 344.062 130.938 346.25 133.75 346.25C136.563 346.25 138.75 344.062 139.062 340.937L146.562 255.625L139.062 174.375C138.75 171.25 136.563 169.062 133.75 169.062Z" fill="currentColor" />
                <path d="M38.75 180.312C37.1875 180.312 35.625 181.562 35.3125 183.438L27.5 255.312L35.3125 325.625C35.625 327.5 36.875 328.75 38.75 328.75C40.3125 328.75 41.875 327.5 42.1875 325.625L51.25 255.312L42.1875 183.438C41.5625 181.875 40.3125 180.312 38.75 180.312Z" fill="currentColor" />
                <path d="M9.06248 207.812C7.49998 207.812 5.93748 209.063 5.93748 210.938L0 255.625L5.93748 299.375C6.24998 301.25 7.49998 302.5 9.06248 302.5C10.625 302.5 11.875 301.25 12.1875 299.375L19.0625 255.625L12.1875 211.25C11.875 209.375 10.625 207.812 9.06248 207.812Z" fill="currentColor" />
                <path d="M198.438 86.5625C194.688 86.5625 191.875 89.375 191.563 93.125L185.625 255.625L191.563 340.625C191.875 344.375 194.688 347.187 198.438 347.187C202.188 347.187 205 344.375 205.313 340.625L211.875 255.625L205.313 93.125C205 89.375 201.875 86.5625 198.438 86.5625Z" fill="currentColor" />
                <path d="M70 166.25C67.8125 166.25 66.25 167.812 65.9375 170.312L58.4375 255.625L65.9375 337.812C66.25 340 67.8125 341.875 70 341.875C72.1875 341.875 73.75 340.312 74.0625 338.125L82.5 255.938L74.0625 170.625C73.75 168.125 72.1875 166.25 70 166.25Z" fill="currentColor" />
                <path d="M165.938 117.5C162.813 117.5 160 120 160 123.437L153.75 255.625L160 340.938C160.313 344.375 162.813 346.875 165.938 346.875C169.063 346.875 171.875 344.375 171.875 340.938L179.063 255.625L171.875 123.437C171.875 120 169.063 117.5 165.938 117.5Z" fill="currentColor" />
                <path d="M364.375 42.1875C358.75 42.1875 354.375 46.5625 354.375 52.1875L350.625 255.313L354.375 336.875C354.375 342.5 359.063 346.875 364.375 346.875C370 346.875 374.375 342.188 374.375 336.875L378.75 255.313L374.375 52.1875C374.688 46.875 370 42.1875 364.375 42.1875Z" fill="currentColor" />
                <path d="M230.937 72.1875C226.875 72.1875 223.75 75.3125 223.438 79.6875L217.812 255.625L223.438 339.687C223.438 343.75 226.875 346.875 230.937 346.875C235 346.875 238.125 343.75 238.438 339.375L244.688 255.313L238.438 79.3751C238.438 75.6251 235 72.1875 230.937 72.1875Z" fill="currentColor" />
                <path d="M701.563 150.625C688.125 150.625 675.313 153.438 663.438 158.125C655.625 69.375 581.25 0 490.625 0C468.438 0 446.875 4.37506 427.812 11.8751C420.312 14.6876 418.438 17.8125 418.438 23.4375V335.625C418.438 341.563 423.125 346.563 429.063 347.188C429.375 347.188 700 347.188 701.875 347.188C756.25 347.188 800.313 303.125 800.313 248.75C800 194.688 755.938 150.625 701.563 150.625Z" fill="currentColor" />
                <path d="M398.125 23.125C392.187 23.125 387.5 28.125 387.187 34.0625L382.812 255.625L387.187 335.937C387.187 341.875 392.187 346.562 398.125 346.562C404.062 346.562 408.75 341.562 409.062 335.625L413.75 255L409.062 33.4375C408.75 28.125 404.062 23.125 398.125 23.125Z" fill="currentColor" />
                <path d="M264.062 65.625C259.687 65.625 256.25 69.0625 255.937 73.75L250.938 255.625L255.937 339.063C255.937 343.438 259.687 347.188 264.062 347.188C268.437 347.188 271.875 343.75 272.188 339.063L277.812 255.625L272.188 73.75C271.875 69.0625 268.437 65.625 264.062 65.625Z" fill="currentColor" />
                <path d="M297.188 69.6875C292.5 69.6875 288.438 73.4375 288.438 78.4375L283.75 255.625L288.438 338.438C288.438 343.438 292.5 347.187 297.188 347.187C301.875 347.187 305.937 343.438 305.937 338.438L311.25 255.625L305.937 78.4375C305.937 73.4375 302.188 69.6875 297.188 69.6875Z" fill="currentColor" />
                <path d="M330.625 75.3125C325.313 75.3125 321.25 79.375 321.25 84.6875L316.875 255.625L321.25 337.812C321.25 343.125 325.625 347.188 330.625 347.188C335.938 347.188 340 343.125 340 337.812L344.688 255.625L340 84.6875C340 79.6875 335.938 75.3125 330.625 75.3125Z" fill="currentColor" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
