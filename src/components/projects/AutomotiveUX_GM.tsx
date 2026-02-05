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
      preload="auto"
      aria-label="Looping video"
    >
      Your browser does not support the video tag.
    </video>
  );
}

interface AutomotiveUX_GMProjectProps {
  onBack: () => void;
}

const PROGRESS_BAR_HIDE_DELAY_MS = 400;

export function AutomotiveUX_GMProject({ onBack }: AutomotiveUX_GMProjectProps) {
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
  
  const title = 'Automotive UX - Cadillac Escalade Design Proposal';
  const company = 'GM';
  const subtitle = 'Develop a new In-vehicle experience for the luxury car segment focusing on in-car themes.';
  const headerColor = '#4A90E2';
  const icon = '/gm/gm_logo.png'; // Sidebar icon (left column) - Add image/video path here
  const headerIcon = '/gm/header.png'; // Header section icon (top banner) - Add image/video path here (e.g., '/path/to/header-icon.png' or '/path/to/header-icon.mp4')
  const role = 'Product Designer';
  const team = 'Hrithik Sanyal, Luke Bratic, and Prof. James Rhampton';
  const when = 'January 2024 - May 2024';
  const overview = "General Motors (GM) partnered with the University of Michigan (UofM) to facilitate students' exploration and comprehension of the design of in-vehicle infotainment (IVI) systems. As part of this collaboration, we visited GM's office in Warren, MI, where we received a comprehensive design brief and gained insight into GM's IVI design process. We learned about the specific approaches taken by various GM car teams, such as those responsible for Buick, Chevrolet, and Cadillac vehicles.";
  const overview2 = "Develop a new In-vehicle experience for the luxury car segment focusing on in-car themes.";

  // Speed Read / Gist (2x2 grid in right column)
  const speedReadChallenge = "In 2024, I redesigned the Cadillac Escalade's UX, focusing on integrating personalized AI and augmented HUD features. The goal was to enhance in-car interactions with advanced technology while maintaining a safe and luxurious experience.";
  const speedReadProcess = "I led user research, designed wireframes, and iterated through three phases: low-fidelity sketches, high-fidelity prototypes, and usability testing. Using Figma, I ensured AI personalization and HCM principles were central to the design, balancing safety and innovation.";
  const speedReadTakeaways = "I gained valuable experience in integrating AI into UX while collaborating closely with engineers. I also honed my skills in creating intuitive designs for complex systems like automotive interfaces.";
  const speedReadImpact = "The design was well-received by stakeholders and recognized for its user-centered approach, earning a spot in my portfolio and attention from the automotive design community.";

  const scrollToCaseStudy = () => {
    document.getElementById('case-study-start')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Page content: add text or image/video in the order you want. Order here = order on page.
  const blocks: ContentBlock[] = [
    // DEFAULT CONTENT  BLOCKS
    // { type: 'text', header: "User Research", content: "Before embarking on the redesign of the BMW iDrive 8 screens, I conducted initial research to gain a deeper understanding of the vehicle. This included studying BMW's brand styling guide and reviewing various articles on the car's development and target audience. Two particularly informative resources were:" },
    
    // { type: 'text', header: "Exploring iDrive 8: Part One", content: "This exploration highlighted BMW's dedication to a sophisticated and minimalist aesthetic. This design ethos not only resonates with the preferences of BMW's customer base but also reflects the company's desired image. Personally, I am drawn to this minimalist approach and aim to integrate it into my redesign efforts.", indent: true },
    // { type: 'image', src: '/bmw/bmw1.jpg' },

    // { type: 'textBullets', header: "Mass Market cars", items: [
    //   "Large center display accessible to the front passenger is a fundamental requirement.",
    //   "Optional driver displays to provide cost-saving options for customers.",
    //   "Emphasis on easy navigation and functionality tailored to essential features.",
    //   "Prioritized functions are Audio, Maps, and Clean content options.",
    // ], indent: true, indentLevel: 2 },

    // { type: 'textImageRow', header: '2022, BMW i7', content: "BMW i7's Adaptive Cruise Control (ACC) interface, showcases a clear, user-friendly and intuitive interface. It allows users to customize following distances, following distance and enabling/disabling ACC and intervention thresholds making it more user-centric user-friendly for ease of interaction during driving.", src: '/bmw/bmw2.jpg' },

    // { type: 'text', header: "Takeaways & Considerations", content: "We conducted user interviews, surveys, and analyzed in-app analytics to understand the pain points and user needs. We also studied competitor apps and industry trends to gather insights", indent: true },
    // { type: 'image', src: '/bmw/bmw6.jpeg' },

    // { type: 'text', header: "Screens with content blocks", content: "I began by crafting frames for each of the screens within the BMW iDrive 8 system using Figma. I opted not to redesign the small climate control screen located in the back seat, deeming it unnecessary for this project due to its simplicity. This decision was more intuitive than based on specific rationale; it felt unnecessary to alter something so straightforward." },
    // { type: 'text', content: "Once the frames were set up, I began placing labeled content blocks within them to outline a potential layout. These placements weren't final but served as a preliminary step to visualize potential design directions. This phase was crucial for generating initial ideas and exploring how to approach the overall redesign."},
    
    // { type: 'image', src: '/bmw/Frame1.png' },
    // { type: 'image', src: '/bmw/center display landing page_v2png' },


    { type: 'image', src: '/gm/Cover Page.png' },
    
    { type: 'text', header: "Project Statement", content: "Designing a luxury vehicle experience integrating advanced personalization, AI-driven features, and ergonomic design to enhance comfort, convenience, and safety." },
    
    { type: 'text', header: "Overview / Summary", content: "General Motors gave us an assignment to create a cross-channel experience that integrates in-vehicle systems with a mobile app for the luxury segment. Our goal was to design features that enhance the driving experience without compromising safety. We focused on personalization, advanced technology, seamless integration, and safety, incorporating customizable themes, AI-driven voice assistants, and an ergonomic HUD to meet luxury user expectations and ensure a superior experience.", indent: true },

    { type: 'text', header: "Problem Statement", content: "General Motors tasked us with developing a new cross-channel experience, integrating in-vehicle systems with a mobile app, for one of three predefined customer segments: mass market, performance, and luxury. We chose to focus on the luxury segment. Our goal was to design features that appeal to luxury users, including a required in-vehicle theme feature. Therefore, we formulated the following problem statement: How can we integrate advanced, personalized features into a luxury vehicle to enhance the driving experience without compromising driver safety?", indent: true },


    { type: 'text', header: "Process", content: "This category details the step-by-step approach taken during the project, including research, planning, design, development, testing, and optimization phases." },

    { type: 'text', header: "Research", content: "Conducted market research to identify existing scheduling challenges and user preferences. Defined target audience segments and outlined key features based on user needs and market trends.", indent: true },

    { type: 'text', header: "Design & Prototyping", content: "Collaborated with designers to create intuitive user interfaces and interactive prototypes. Iteratively refined designs based on user feedback to enhance usability and visual appeal.", indent: true },

    { type: 'text', header: "Implementation", content: "Leveraged agile development methodologies to build the scheduling app from the ground up. Prioritized feature development based on user feedback and technical feasibility. Implemented AI algorithms to analyze user behavior and optimize scheduling recommendations.", indent: true },

    { type: 'text', header: "Testing & Optimization", content: "Conducted rigorous testing across various devices and platforms to ensure compatibility and performance. Gathered user feedback through beta testing and iteratively optimized the app based on usability metrics and user satisfaction.", indent: true },

    { type: 'text', header: "User research", content: "We conducted a literature review, analyzing existing research articles, reports, and publications on luxury vehicle features and user expectations." },

    // { type: 'text', header: "", content: "We conducted a literature review, analyzing existing research articles, reports, and publications on luxury vehicle features and user expectations." },

    { type: 'text', header: "Global car Market Overview", content: "" },
    { type: 'image', src: '/gm/gcm.png' },
    { type: 'text', header: "", content: "We Began by familiarizing ourselves with the key players in the automotive sector. Although our primary focus lies on luxury cars, it's crucial to comprehend the broader market spectrum and their respective priorities. Here is what we found:" },

    { type: 'textBullets', header: "Mass Market cars", items: [
      "Large center display accessible to the front passenger is a fundamental requirement.",
      "Optional driver displays to provide cost-saving options for customers.",
      "Emphasis on easy navigation and functionality tailored to essential features.",
      "Prioritized functions are Audio, Maps, and Clean content options.",
    ], indent: true},

    { type: 'textBullets', header: "Luxury cars", items: [
      "No restrictions on screen sizes and technology",
      "Consideration for passenger displays to enhance the overall luxury experience.",
      "The luxury car users care about comfort, features, and convenience above all else.",
      "Luxury car brands use elegance, aesthetics, sound, storytelling, sensual imagery, lighting, ambiance, and lifestyle associations, to create a captivating experience.",
    ], indent: true},

    { type: 'textBullets', header: "Performance cars", items: [
      "Cluster and HUD screens are prioritized over center displays for performance enhancement." ,"Focus primarily on the driver; less concern for passenger comfort.", "Gauges take precedence over audio and map functionalities.",
    ], indent: true},

    { type: 'image', src: '/gm/rev.png' },

    { type: 'text', header: "", content: "According to market research, the luxury car market is expected to grow soon. This makes it even more important for us to keep in mind the increasing size of the market, especially because competitors are trying hard to stand out. Companies are paying close attention to how cars look, feel, and function inside. They're taking advantage of this opportunity by adding features that transform the in-car experience, like changing screen graphics, lighting, motion, and even sound." },

    { type: 'text', header: "", content: "Luxury car owners want more than just basic transportation - they're after something extra!." },

    { type: 'text', header: "The Benchmarks", content: "" },
    { type: 'image', src: '/gm/comp.png' },
    { type: 'text', header: "Summary of Key Insights", content: "Luxury vehicle users prioritize four main aspects: comfort, advanced features, convenience, and safety. Personalized comfort features, advanced technology, and high-quality entertainment options enhance the luxury driving experience. Seamless integration and reliable voice command systems provide convenience, while robust driver assistance systems and distraction-free interfaces ensure safety. Our design decisions, including theme customization, AI-driven personalization, and ergonomic HUD design, align with these priorities and aim to deliver a superior user experience." },


    { type: 'text', header: "User Persona", content: "" },
    { type: 'text', header: "", content: "Luxury vehicle users prioritize four main aspects: comfort, advanced features, convenience, and safety. Personalized comfort features, advanced technology, and high-quality entertainment options enhance the luxury driving experience. Seamless integration and reliable voice command systems provide convenience, while robust driver assistance systems and distraction-free interfaces ensure safety. Our design decisions, including theme customization, AI-driven personalization, and ergonomic HUD design, align with these priorities and aim to deliver a superior user experience." },
    { type: 'video', src: '/gm/personas.mp4' },

    { type: 'text', header: "Decoding Luxury", content: "Through conversations and insights into people's perceptions of luxury, we sought to unravel what luxury truly means to people. From these discussions, emerged key themes, with a prevailing notion being that luxury equates to 'Agency over time.' This fundamental concept served as the foundation for our overarching theme, 'Vice Theme.'" },
    { type: 'image', src: '/gm/lux.png' },
   
    { type: 'text', header: "Design  Constraints", content: "General Motors (GM) provided us with specific design constraints, detailing the exact dimensions for each screen within the car, including those for the front/bottom console, instrument cluster, and center display." },
    { type: 'image', src: '/gm/const.png' },

    { type: 'text', header: "Design  Considerations", content: "" },
    { type: 'text', header: "NHTSA Guidelines", content: "National Highway Traffic Safety Administration's (NHTSA)  guidelines were a crucial consideration during the design of our In-Vehicle Infotainment (IVI) system. These include:" },
    { type: 'textBullets', header: "", items: [
      "The driver should be able to keep at least one hand on the steering wheel while performing a secondary task." ,
      "The distraction induced by any secondary task performed while driving should not exceed that associated with a baseline reference task.", 
      "Any task performed by a driver should be interruptible at any time.",
      "The driver, not the system/device, should control the pace of task interactions.",
      "Displays should be easy for the driver to see and content presented should be easily discernible.",
    ], indent: true},

    
    { type: 'text', header: "Psychology in Automotive UX", content: "We integrated psychology concepts into our HMI design, laying the groundwork for the design phase." },
    { type: 'text', header: "Jakob’s Law", content: "This law states that users spend most of their time on other sites, and they prefer your site to work the same as all the other sites they already know. Design considerations stemming from this principle include:", indent: true },
    { type: 'textBullets', header: "", items: [
      "Maintain consistent navigation patterns across different screens to ensure users can easily find their way around." ,
      "Use commonly recognized icons and symbols for functions such as navigation, settings, and multimedia controls.", 
      "Design interactions and gestures that are intuitive and resemble those used in popular smartphone apps, reducing the learning curve for users.",
    ], indent: true},

    { type: 'text', header: "Fitt's Law", content: "This law states that the time to acquire a target is a function of the distance to and size of the target. Design considerations stemming from this principle include:", indent: true },
    { type: 'textBullets', header: "", items: [
      "Touch targets should be large enough for user’s to accurately select them. Touch minimum of 72dpi." ,
      "Touch targets should have ample spacing between them.", 
      "Touch targets should be placed in areas of an interface that allow them to be easily acquired.",
    ], indent: true},


    { type: 'text', header: "Jakob’s Law", content: "This law states that the time it takes to make a decision increases with the number and complexity of choices. Design considerations stemming from this principle include:", indent: true },
    { type: 'textBullets', header: "", items: [
      "Reduce the number of choices, especially if time is limited. Keep in mind that introducing in-car themes gives a fresh and exciting experience but keeps the complexity of the tasks simple." ,
      "Break down complex tasks into smaller, more manageable steps. For ex. Adjusting the climate control settings can be broken down into smaller, sequential steps. For example: Select temperature, then adjust fan speed and then choose airflow direction.",
    ], indent: true},


    

    { type: 'text', header: "Sketches", content: "" },
    { type: 'image', src: '/gm/Group 1.png' },


    { type: 'text', header: "Information Architectur", content: "" },
    { type: 'video', src: '/gm/IA.mp4' },
    { type: 'text', header: "Front Display Information Architecture", content: "", indent: true },
    { type: 'image', src: '/gm/Front Display IA.png', maxHeight: '640px' },
    { type: 'text', header: "Center Display Information Architecture", content: "", indent: true },
    { type: 'image', src: '/gm/Center Display IA.png', maxHeight: '640px' },
    { type: 'text', header: "Mobile Application Display Information Architecture", content: "", indent: true },
    { type: 'image', src: '/gm/Mobile App IA.png', maxHeight: '640px' },


    { type: 'text', header: "Design Decisions & Recommendations", content: "" },
    { type: 'text', header: "#1 - Theme Customization: A Journey in Personalization", content: "We included extensive theme customization options, allowing drivers to tailor their vehicle’s aesthetic and sensory environment. Users can modify the vehicle interface colors, ambient lighting, and music, ensuring a consistent experience whether inside the vehicle or interacting remotely via the mobile app. This decision is grounded in the finding that personalization is paramount for luxury vehicle users (Automotive World, 2023).", indent: true },
    { type: 'image', src: '/gm/1.png', indent: true},
    { type: 'image', src: '/gm/2.png', indent: true},

    { type: 'text', header: "#2 - AI & Personalization: Enhancing Driver-Vehicle Interaction", content: "We integrated advanced AI-driven voice assistant features to support users in navigating complex controls, responding to natural language commands, and making proactive suggestions based on context. This decision reflects the research indicating that luxury car buyers highly value advanced technology and seamless interaction with vehicle controls (Automotive World, 2023; J.D. Power, 2023)", indent: true },
    { type: 'image', src: '/gm/3.png', indent: true},


    { type: 'text', header: "#3 - Heads-Up Display (HUD): A Paradigm of Safety and Convenience", content: "Our HUD design focuses on the ergonomic placement of controls and the use of large, easy-to-target touchpoints, ensuring essential adjustments can be made swiftly, keeping the driver’s attention on the road. This decision addresses safety concerns, emphasizing intuitive and minimally intrusive interfaces to reduce driver distraction (Consumer Reports, 2023; NHTSA study).", indent: true },
    { type: 'image', src: '/gm/4.png', indent: true},



    { type: 'text', header: "High Fidelity Prototype", content: "" },
    
    { type: 'text', header: "#1 - Vice Theme", content: ""},
    { type: 'image', src: '/gm/Apple Car Components_vice1.png', indent: true},

    { type: 'text', header: "#2 - Neutral Theme", content: ""},
    { type: 'image', src: '/gm/Apple Car Components_bw1.png', indent: true},

    { type: 'text', header: "Mobile App Design", content: "Luxury vehicle users prioritize four main aspects: comfort, advanced features, convenience, and safety. Personalized comfort features, advanced technology, and high-quality entertainment options enhance the luxury driving experience. Seamless integration and reliable voice command systems provide convenience, while robust driver assistance systems and distraction-free interfaces ensure safety. Our design decisions, including theme customization, AI-driven personalization, and ergonomic HUD design, align with these priorities and aim to deliver a superior user experience." },
    
    { type: 'image', src: '/gm/7.png', maxHeight: '640px' },
    { type: 'video', src: '/gm/Screen 1.mp4', maxHeight: '640px' },
    { type: 'video', src: '/gm/Screen 2.mp4', maxHeight: '640px' },
    { type: 'video', src: '/gm/Screen 3.mp4', maxHeight: '640px' },
    { type: 'video', src: '/gm/Screen 4.mp4', maxHeight: '640px' }, 


    { type: 'text', header: "Styleguide", content: "Luxury vehicle users prioritize four main aspects: comfort, advanced features, convenience, and safety. Personalized comfort features, advanced technology, and high-quality entertainment options enhance the luxury driving experience. Seamless integration and reliable voice command systems provide convenience, while robust driver assistance systems and distraction-free interfaces ensure safety. Our design decisions, including theme customization, AI-driven personalization, and ergonomic HUD design, align with these priorities and aim to deliver a superior user experience." },
    
    { type: 'image', src: '/gm/Style Guide.png'},

    { type: 'text', header: "Reflection / What we learned?", content: "" },

    { type: 'textBullets', header: "", items: [
      "A significant lesson I learned was adopting a task-oriented approach in HMI design. We structured interface elements based on user workflows or tasks, giving priority to crucial actions and information." ,
      "I came to realize that Automotive UX design inherently involves a level of complexity that cannot be entirely simplified. For instance, incorporating telltales is a regulatory requirement.",
      "We realized that it's crucial to prioritize designs that don't cause delays in loading or processing information, especially in time-sensitive situations like those in cars. This will be a big focus for our future designs.",
    ], indent: true},

    { type: 'text', header: "Acknowledgements", content: "None of this would have been possible without Prof. James Rampton and his invaluable guidance and support throughout this Automotive UX project in collaboration with General Motors (GM)." },
    

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
      
      {/* Scroll Progress Bar - fixed at top, fills as user scrolls; inline styles so it’s always visible above nav */}
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

      {/* Content Container */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-12 md:gap-16">
          {/* Left Sidebar */}
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

          {/* Right Column */}
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
                  className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 transition-colors"
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

        {/* Main Content */}
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
            if (block.type === 'video') {
              const marginLeft = block.indentLevel === 2 ? '5rem' : block.indent ? '2.5rem' : undefined;
              const containerStyle = {
                ...(marginLeft && { marginLeft }),
                ...(block.maxHeight && { maxHeight: block.maxHeight, overflow: 'hidden' as const }),
              };
              const videoStyle = block.maxHeight ? { maxHeight: block.maxHeight, objectFit: 'contain' as const } : undefined;
              return (
                <div key={index} className="w-full" style={containerStyle}>
                  <LoopingVideo src={block.src} className="w-full h-auto" style={videoStyle} />
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
                className="text-[15px] text-gray-500 hover:text-gray-900 transition-colors"
            >
              ← Back to Work
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
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
