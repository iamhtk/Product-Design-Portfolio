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
import { ExploreMoreSection } from './ExploreMoreSection';
import type { ContentBlock } from './types';

const CURRENT_PROJECT_ID = 'BMW';

interface BMWProjectProps {
  onBack: () => void;
  onProjectClick?: (projectId: string) => void;
}

const PROGRESS_BAR_HIDE_DELAY_MS = 400;

export function BMWProject({ onBack, onProjectClick }: BMWProjectProps) {
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
  
  const title = "Redesigning BMW's Digital Interface (iDrive)";
  const company = 'BMW';
  const subtitle = "A case study outlining my personal project as a part of my UofM curriculum to redesign the BMW vehicle's screens, aiming to improve the user experience while maintaining their minimalist aesthetic.";
  const headerColor = '#FFB84D';
  const icon = 'bmw/logo.png'; // Sidebar icon (left column) - Add image/video path here
  const headerIcon = '/bmw/cover2.png'; // Header section icon (top banner) - Add image/video path here (e.g., '/path/to/header-icon.png' or '/path/to/header-icon.mp4')
  const role = 'Product Designer';
  const team = 'Hrithik Sanyal, and Prof. James Rhampton';
  const when = 'January 2024 - May 2024';
  const overview = "In this personal project, I overhauled the screens in a BMW equipped with iDrive 8, inspired by my admiration for BMW and a keen interest in vehicle screen design. The journey started with thorough research and sketches of the BMW's exterior, leading to the development of wireframes for the interior screens. The final redesign prioritizes clarity and functionality, ensuring an enhanced user experience.";
  const speedReadChallenge = "The goal was to redesign BMW's iDrive 8 interface to enhance usability while preserving its minimalist aesthetic. Key challenges included improving information hierarchy, ensuring seamless navigation, and balancing aesthetics with functional clarity.";
  const speedReadProcess = "I conducted research, studied BMW's brand guide, sketched exterior and interior views, and developed wireframes for the four main interfaces—vehicle controls, driver display, main unit, and sub-unit.";
  const speedReadTakeaways = "Prioritizing layout and interaction in wireframes before color; designing default and dynamic screens that reflect real driving scenarios; balancing consistency with flexibility for future updates.";
  const speedReadImpact = "A coherent iDrive 8 redesign that enhances usability and maintains BMW's design language, with clear navigation, audio, and vehicle controls for both driver and passenger.";

  const scrollToCaseStudy = () => {
    document.getElementById('case-study-start')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Page content: add text or image/video in the order you want. Order here = order on page.
  const blocks: ContentBlock[] = [
    { type: 'text', header: "Why redesign the screens in a BMW?", content: "My fascination with BMW predates even their initial vehicle deliveries, making me a devoted fan of the brand. I've long been eager to embark on a personal project focused on redesigning vehicle screens. Given my affinity for BMW, it seemed like the ideal chance to merge my enthusiasm for the brand with my exploration of this creative endeavor, particularly with the advent of the iDrive 8 system." },
    
    { type: 'text', header: "User Research", content: "Before embarking on the redesign of the BMW iDrive 8 screens, I conducted initial research to gain a deeper understanding of the vehicle. This included studying BMW's brand styling guide and reviewing various articles on the car's development and target audience. Two particularly informative resources were:" },
    
    { type: 'text', header: "Exploring iDrive 8: Part One", content: "This exploration highlighted BMW's dedication to a sophisticated and minimalist aesthetic. This design ethos not only resonates with the preferences of BMW's customer base but also reflects the company's desired image. Personally, I am drawn to this minimalist approach and aim to integrate it into my redesign efforts.", indent: true },
    { type: 'image', src: '/bmw/bmw1.jpg' },
    
    { type: 'textImageRow', header: '2022, BMW i7', content: "BMW i7's Adaptive Cruise Control (ACC) interface, showcases a clear, user-friendly and intuitive interface. It allows users to customize following distances, following distance and enabling/disabling ACC and intervention thresholds making it more user-centric user-friendly for ease of interaction during driving.", src: '/bmw/bmw_compt.png' },
    
    { type: 'textImageRow', header: "2020, Mercedes-Benz S-Class", content: "We conducted user interviews, surveys, and analyzed in-app analytics to understand the pain points and user needs. We also studied competitor apps and industry trends to gather insights", src: '/bmw/merc_compt.png' },

    { type: 'textImageRow', header: "2019, Porche Taycan", content: "We conducted user interviews, surveys, and analyzed in-app analytics to understand the pain points and user needs. We also studied competitor apps and industry trends to gather insights", src: '/bmw/p_compt.png' },

    { type: 'text', header: "Takeaways & Considerations", content: "We conducted user interviews, surveys, and analyzed in-app analytics to understand the pain points and user needs. We also studied competitor apps and industry trends to gather insights", indent: true },
    { type: 'image', src: '/bmw/bmw6.jpeg' },


    { type: 'text', header: "Exterior Sketches", content: "At the beginning of the redesign process, I opted to craft intricate sketches of the BMW's exterior. This approach afforded me the flexibility to seamlessly incorporate these aspects into my redesign as required. I focused on two particular viewpoints: a lateral view and an aerial perspective of the vehicle, constructed using Figma." },
    
    { type: 'image', src: '/bmw/Ext.png' },

    { type: 'text', header: "Interior Sketches", content: "You can write here as much as you want, this text will always look nice, whether you write longer paragraphs or just a few words. Click here and try it out." },
    
    { type: 'image', src: '/bmw/int.png' },
    
    { type: 'text', header: "Screens with content blocks", content: "I began by crafting frames for each of the screens within the BMW iDrive 8 system using Figma. I opted not to redesign the small climate control screen located in the back seat, deeming it unnecessary for this project due to its simplicity. This decision was more intuitive than based on specific rationale; it felt unnecessary to alter something so straightforward." },
    { type: 'text', content: "Once the frames were set up, I began placing labeled content blocks within them to outline a potential layout. These placements weren't final but served as a preliminary step to visualize potential design directions. This phase was crucial for generating initial ideas and exploring how to approach the overall redesign."},
    
    { type: 'image', src: '/bmw/Frame1.png' },
    { type: 'image', src: '/bmw/center display landing page_v2.png', maxHeight: '640px' },
    
  
    { type: 'text', header: "Wireframes", content: "In the final stage of this redesign process, I developed wireframes focusing on BMW's iDrive 8 system. I began by crafting the default or idle screens for the four main interfaces. Subsequently, I expanded upon these by incorporating additional pages for both the head unit and subunits. For features such as vehicle controls and the driver display, I aimed for a single-page layout, where elements like the speedometer dynamically update during operation." },
    { type: 'text', content: "Deliberately opting for a black and white design approach, I prioritized layout and user interaction within the wireframes. By avoiding the complexity of color incorporation, I could streamline the wireframe creation process. This strategy, particularly pertinent for a personal project, maintains flexibility for potential future enhancements. It allows for the addition of color at a later stage, facilitating further refinement or expansion as desired"},
    
    { type: 'image', src: '/bmw/Full Display panel.png' },
    
    { type: 'text', header: "Default / Resting Screen", content: "During the redesign process, I developed default pages for each of the four primary screens in the BMW iDrive 8 system: vehicle controls, driver display, main unit, and sub-unit. These pages were carefully crafted to reflect an active driving scenario, such as displaying current speed on the driver display and indicating active defrosters in the vehicle controls, to provide a sense of being in the midst of a journey." },
    { type: 'text', content: "The vehicle controls and driver display were set to showcase a single, dynamic page where real-time updates occur, including changes in speed on the speedometer and vehicle alerts on the main unit. This design choice ensures that essential information is readily accessible to the driver at all times."},
    { type: 'text', content: "Meanwhile, the main unit and sub-unit were configured to display their default pages either at the start of a drive or if they haven't been interacted with since the drive began. The main unit's default page is optimized for efficiency, providing instant access to critical functions like navigation and audio playback. Similarly, the sub-unit automatically opens to the HVAC screen, enabling immediate adjustments to climate control settings. This screen layout prioritizes accessibility and ease of use, enhancing the overall driving experience for both drivers and passengers in the BMW iDrive 8 system."},
    
    { type: 'image', src: '/bmw/Full Display panel - Landing.png' },
    { type: 'image', src: '/bmw/Full Display panel - Map Landing.png' },
    { type: 'image', src: '/bmw/Full Display panel - Music Landing.png' },
    { type: 'image', src: '/bmw/Full Display panel - Settings Landing.png' },


    { type: 'text', header: "Head Unit Screens", content: "To showcase the functionality of the head unit's design, I focused on three primary pages within the BMW iDrive 8 system: the main navigation landing page, the navigation display while on an active route, and the layout for the audio page, using Spotify as the featured example due to its widespread popularity for music streaming." },
    { type: 'text', content: "Acknowledging the significance of music in the in-vehicle screen experience, my design ensures that users can engage with audio playback even while navigating. However, it's worth noting that the navigational pages offer limited music control compared to the comprehensive functionalities available on the dedicated audio page. Furthermore, I integrated a feature in the bottom right corner of the screen, enabling the front-seated passenger to adjust the volume or mute the audio. This decision recognizes that the driver already has access to these controls via the steering wheel, thus optimizing the interface for both driver and passenger convenience."},
    
    { type: 'text', header: "Navigation Panel", content: "" },
    { type: 'image', src: '/bmw/Navigation Panel.png' },

    { type: 'text', header: "Audio (Spotify) Panel", content: "" },
    { type: 'image', src: '/bmw/MUSIC Panel.png' },

    { type: 'text', header: "Vehicle Controls Panel", content: "" },
    { type: 'image', src: '/bmw/Settings Panel.png' },

    { type: 'text', header: "Sub Unit Screens", content: "For the sub unit's design, my focus was on crafting the vehicle settings pages for BMW's iDrive 8 system. I developed wireframes for the landing page of vehicle settings and specific pages for tire pressure and drive mode. To maintain easy access to HVAC controls, I implemented a dedicated control bar at the top of the sub unit for these functions, regardless of the current screen. Additionally, navigation controls for the sub unit are positioned at the bottom." },
    { type: 'text', content: "On the vehicle settings landing page, different setting options are arranged on the left side. To optimize space and add a visual element, I placed BMW's logo in the empty area. This strategic logo placement deviates from its usual location in the head unit, contributing to a unified brand experience within the vehicle's interface."},
    { type: 'text', content: "For the individual settings pages, the tire pressure page presents immediate information, such as tire pressure in psi for each tire, accompanied by a bird's eye view sketch. Meanwhile, the drive mode page offers straightforward options for adjustment, showcasing three different drive modes. This ensures that users can easily access important vehicle information or make adjustments with minimal effort, enhancing the user experience with BMW's iDrive 8 system."},
   
    { type: 'text', header: "Next Steps?", content: "Commencing the redesign of BMW's iDrive 8 screens, I was prompted to navigate the delicate equilibrium between aesthetic simplicity and functional clarity." },
    { type: 'text', content: "This project underscored the significance of commencing with comprehensive research and adhering to a minimalist design ethos that aligns with BMW's brand identity. Sketching and wireframing emerged as pivotal steps in visualizing the user interface, highlighting the imperative for an intuitive design that enhances the driving experience. By initially opting for a black and white palette, the focus was on scrutinizing layout and usability, establishing a versatile foundation for future enhancements."},
    { type: 'text', content: "This endeavor reaffirmed the importance of adaptability in design, the value of user-centric perspectives, and the potential for personal projects to drive creativity and innovation within the realm of design."},

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
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              width: '100%',
              height: '6px',
              backgroundColor: 'rgba(0,0,0,0.12)',
              zIndex: 9999,
              pointerEvents: 'none',
              transition: 'opacity 0.2s ease-out',
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${scrollProgress}%`,
                backgroundColor: headerColor,
                transition: 'width 0.15s ease-out',
              }}
            />
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
              className="text-[16px] text-gray-500 hover:text-gray-900 transition-colors hidden md:block cursor-pointer"
            >
              ← Back to Work
            </button>
          </div>

          <div className="space-y-16">
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
                <button
                  type="button"
                  onClick={scrollToCaseStudy}
                  className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 transition-colors cursor-pointer"
                  aria-label="Scroll to case study"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div id="case-study-start" className="space-y-16 mt-16" style={{ scrollMarginTop: 'var(--nav-height, 80px)' }}>
          {blocks.map((block, index) => {
            if (block.type === 'text') {
              return (
                <div
                  key={index}
                  className="space-y-6"
                  style={block.indent ? { marginLeft: '2.5rem' } : undefined}
                >
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
                  <ul className="space-y-2 text-[18px] leading-[1.85] text-gray-700 pl-6" style={{ listStyleType: 'disc' }}>
                    {block.items.map((item, i) => (
                      <li key={i} className="pl-1">{item}</li>
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
            if (block.type === 'textTextRow') {
              return (
                <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
                  <div className="space-y-6">
                    {block.headerLeft && (
                      <h3 className="text-[11px] tracking-[0.2em] text-gray-400 uppercase font-medium">
                        {block.headerLeft}
                      </h3>
                    )}
                    <p className="text-[18px] leading-[1.85] text-gray-700">{block.contentLeft}</p>
                  </div>
                  <div className="space-y-6">
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

          <ExploreMoreSection
            currentProjectId={CURRENT_PROJECT_ID}
            onBack={onBack}
            onProjectClick={onProjectClick}
          />

          <div className="md:hidden pt-8">
            <button 
              onClick={onBack}
              className="text-[13px] text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
            >
              ← Back to Work
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 md:px-8 lg:px-12" data-footer>
        <div
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-12 pb-8 text-[13px] text-gray-500"
        >
          <div className="flex flex-wrap items-center gap-2">
            <span className="whitespace-nowrap">
              Designed and Developed.
            </span>
            <span>© 2026</span>
          </div>

          <div className="flex items-center gap-3 md:gap-5">
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
