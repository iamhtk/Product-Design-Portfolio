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

interface RaseetHealthProjectProps {
  onBack: () => void;
}

const PROGRESS_BAR_HIDE_DELAY_MS = 400;

export function RaseetHealthProject({ onBack }: RaseetHealthProjectProps) {
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
  
  const title = 'Raseet Health';
  const company = 'Raseet Health';
  const subtitle = 'An intuitive platform for pharmacies, catering to users of all ages and tech levels, with a focus on a broad audience.';
  const headerColor = '#50C878';
  const icon = ''; // Sidebar icon (left column) - Add image/video path here
  const headerIcon = '/raseet/test5.png'; // Header section icon (top banner) - Add image/video path here (e.g., '/path/to/header-icon.png' or '/path/to/header-icon.mp4')
  const role = 'UX Research, End to end Product Design, UX/UI Design, Design Systems';
  const team = 'Solo Designer with Cross-functional Collaboration';
  const when = '2021 - 2022';
  const overview = 'Raseet Health is a comprehensive platform designed to digitize local pharmacies, helping them evolve into e-commerce-ready, one-stop-shops for customers\' health and wellness needs. The platform connects pharmacies, healthcare providers, and customers by offering features like electronic medical records (EMRs), inventory management, and a seamless e-commerce experience. Through Raseet, pharmacies can offer trusted healthcare and wellness services such as doctor consultations, lab tests, and health insurance, all while reducing operational inefficiencies.';
  const speedReadChallenge = 'Creating a digital platform to empower local pharmacies as e-commerce-ready, one-stop health hubs. Key challenges: seamless stakeholder collaboration, simple adoption for pharmacies, and a frictionless yet compliant customer experience.';
  const speedReadProcess = 'User research (interviews, contextual inquiries, competitor analysis); wireframes for pharmacists, customers, and providers; high-fidelity prototypes and iterative usability testing for onboarding, navigation, and checkout.';
  const speedReadTakeaways = 'Designing for diverse users in a regulated healthcare domain; simplifying complex workflows and building trust; the value of iterative feedback with stakeholders.';
  const speedReadImpact = 'Operational efficiency improved (30% reduction in manual tasks); customer engagement up, cart abandonment down 25%, repeat orders up 35%; 20% revenue increase for partner pharmacies within three months.';

  const scrollToCaseStudy = () => {
    document.getElementById('case-study-start')?.scrollIntoView({ behavior: 'smooth' });
  };

  // CONTENT SECTIONS - Edit these to change what appears on the page
  const sections = [
    {
      header: 'SPEED READ - IN A RUSH? HERE\'S THE GIST',
      content: 'Challenge: The goal was to create a digital platform that empowers local pharmacies to transition into e-commerce-ready, one-stop health and wellness hubs. The key challenges included ensuring seamless collaboration among stakeholders, simplifying technical adoption for pharmacies, and providing a frictionless customer experience while prioritizing data security and compliance. Process: I conducted in-depth user research, including interviews, contextual inquiries, and competitor analysis, to uncover pain points and opportunities. The design process involved three phases: Wireframes (Created role-specific dashboards for pharmacists, customers, and healthcare providers), Prototyping (Built high-fidelity prototypes to test user flows and interactions), and Iterative Testing (Conducted usability tests and incorporated feedback to refine navigation, onboarding, and checkout processes). Takeaways: This project enhanced my ability to design for diverse user needs within a highly regulated healthcare domain. I honed skills in simplifying complex workflows, fostering user trust, and designing accessible, scalable systems. Collaborating with stakeholders taught me the value of iterative feedback loops in delivering impactful solutions. Impact: The platform improved operational efficiency for pharmacies, reducing manual tasks by 30%. Customer engagement increased, with cart abandonment rates dropping by 25% and repeat orders growing by 35%. Raseet Health successfully positioned itself as a leading platform, driving a 20% revenue increase for partner pharmacies within three months.'
    },
    {
      header: 'PROJECT STATEMENT',
      content: 'Mission: Raseet\'s mission is to make quality healthcare accessible to everyone by empowering local pharmacies. By addressing stagnant revenues and low customer lifetime value for pharmacies, Raseet also aims to reduce out-of-pocket healthcare expenses for customers, ensuring trust and timely assistance. Vision: To empower local pharmacists to compete with e-pharmacy giants by providing a "Vocal for Local" platform that transforms their business into a sustainable, digitally-driven model. Raseet connects credible healthcare providers to customers via local pharmacies, creating a collaborative and mutually beneficial ecosystem. Target Audience includes Healthcare Providers (Doctors and healthcare professionals requiring secure and collaborative patient record systems), Customers (Individuals seeking convenient, trusted, and transparent healthcare services), and Pharmacies (Small to mid-sized pharmacies looking to expand their reach and boost revenue, owners struggling with outdated systems and limited digital presence).'
    },
    {
      header: 'VALUE PROPOSITION',
      content: 'Increasing Revenue for Partner Pharmacies: Attracting new customers through enhanced online presence and services. Simplifying Health Management for Patients: Offering tools for prescription refills, health record management, and online consultations. Enhancing Delivery and Order Fulfillment: Providing real-time tracking and streamlined logistics for superior user experience.'
    },
    {
      header: 'DESIGN PROCESS',
      content: 'Designing Raseet Health\'s digital experience required a structured yet flexible design process, rooted in Agile methodologies and Design Sprints. Our goal was to create an intuitive, scalable, and accessible pharmacy platform while balancing business goals and technical feasibility. I followed a user-centered iterative design approach with rapid prototyping, continuous feedback loops, and close cross-functional collaboration. The design process followed a dual-track Agile framework, where design and development ran in parallel to ensure continuous iteration and refinement. This included Design Sprints (Rapid 5-day sprints to ideate, prototype, and validate concepts), Agile UX (Weekly stand-ups with the product and development teams to align design deliverables with sprint cycles), Cross-functional Collaboration (Close coordination with engineers, marketers, and business stakeholders), and Data-Driven Decision-Making (A/B testing and usability research informed key iterations). This framework enabled fast iterations, allowing the team to validate hypotheses early and avoid costly design changes later.'
    },
    {
      header: 'USER RESEARCH - BACKGROUND & OBJECTIVES',
      content: 'To design a solution that meets the needs of pharmacies, healthcare providers, and customers, it was essential to understand their existing workflows, pain points, and expectations. Through a mix of qualitative and quantitative research, we identified gaps in the current ecosystem and opportunities to create a more streamlined, user-friendly platform. Research Objectives: Identify inefficiencies in pharmacy operations and customer engagement. Understand barriers to digital adoption for pharmacies and customers. Explore how healthcare providers and pharmacies collaborate to manage patient data and prescriptions.'
    },
    {
      header: 'RESEARCH METHODOLOGY',
      content: 'We employed a multi-method research approach to gather insights from diverse stakeholders. User Interviews: Conducted 1-hour interviews with 10 pharmacists and pharmacy staff, 15 customers across urban and semi-urban areas, and 5 healthcare providers (doctors, lab technicians) focusing on workflows, challenges, and expectations. Open-ended questions like "What is your biggest challenge when managing prescriptions or inventory?" encouraged participants to share detailed experiences. Surveys: Reached 50 pharmacy owners and 150 customers with key focus on frequency of pharmacy visits, preferred features for managing health records digitally, and trust factors influencing digital adoption. Key Insights showed 72% of respondents preferred a simplified interface for order tracking and 63% indicated concerns about data privacy in healthcare apps. Contextual Inquiries: Observed 5 pharmacies over 2 weeks, shadowing pharmacy staff during inventory updates, order management, and customer interactions. We documented pain points, bottlenecks, and opportunities for digital intervention. A pharmacy owner spent over 3 hours manually reconciling orders and inventory. Competitor Analysis studied platforms like 1mg (pharmacy application providing specialized and generic medicines with home delivery, medicines calculator, 24-hour service, appointment options, and doctor consultations), PharmEasy (another famous online pharmacy offering pharmaceutical and healthcare products with similar features), and Zeno Health (Mumbai-based pharmacy application providing generic and branded medicines with home delivery and doctor consultations).'
    },
    {
      header: 'KEY FINDINGS FROM RESEARCH',
      content: 'Pharmacy Workflows Are Inefficient: Pharmacists rely heavily on manual processes for inventory management and order tracking. "Managing stock manually is exhausting. I\'ve lost customers due to delays." This created a critical need for dynamic inventory management and order fulfillment tools. Digital Adoption Barriers for Pharmacies: Many pharmacy owners feel overwhelmed by the technical setup required to go online. "I\'m not familiar with digital tools. It feels like too much work." Simplified onboarding workflows and dedicated support are essential for adoption. Customers Struggle With Navigation: Poor search functionality and complex checkout processes lead to frustration and drop-offs. "It took me ages to find what I needed. The filters were confusing." Intuitive navigation and personalized search recommendations are top priorities. Lack of Guidance Post-Rejection: Customers feel lost when prescriptions or orders are rejected due to incomplete information. "I didn\'t know why my prescription was rejected or what to do next." Clear guidance and actionable steps are needed to rebuild trust and retain users. Trust Issues With Digital Platforms: Privacy concerns are a significant barrier to adoption. "I\'m worried about sharing my health data. How can I be sure it\'s secure?" Transparent communication about data security and compliance is vital.'
    },
    {
      header: 'IMPACT OF RESEARCH',
      content: 'The insights from user research directly informed the design goals and solutions for Raseet Health. User-Centric Onboarding: Simplified workflows to reduce onboarding time by 50%. Enhanced Navigation: Redesigned search and checkout processes increased order completion rates by 25%. Privacy Assurance: Clear communication about data security built trust among users. These insights served as a valuable tool to identify opportunities for introducing a potential solution. More than 20% increase in overall pharmacy revenue by combining improved workflows, faster onboarding, and enhanced customer experiences. Unified platform equals improved efficiency plus enhanced customer trust plus higher pharmacy adoption rates.'
    },
    {
      header: 'PRODUCT GOALS: SORT QUALITATIVE FEEDBACK',
      content: 'The success of Raseet Health depended on aligning business objectives with user needs, ensuring a seamless and scalable experience for all stakeholders. By analyzing research insights and market trends, we defined core product goals. Business Goals: (1) Seamless integration between stakeholders - Establish a connected ecosystem where pharmacies, healthcare providers, and customers interact efficiently. (2) Easier onboarding for partner pharmacies - Reduce technical barriers, enabling small to mid-sized pharmacies to transition into e-commerce-ready businesses with minimal effort. User Goals: (1) Easy refill prescription scheduling - Allow customers to set automated refills, reducing friction in managing recurring medications. (2) Easy inventory management - Enable pharmacies to track stock levels, receive alerts for low inventory, and optimize order fulfillment. Shared Goals (User plus Business): (1) Online access to medicines/storefront - Provide a reliable digital storefront, making healthcare products more accessible while driving pharmacy revenue. (2) Better health outcomes - Improve medication adherence and patient engagement by offering a user-friendly and trustworthy healthcare platform.'
    },
    {
      header: 'SOLUTION 1: SEAMLESS INTEGRATION OF STAKEHOLDER SYSTEMS',
      content: 'Problem: Disconnected systems for pharmacies, doctors, and customers led to inefficiencies, missed opportunities, and frustration. Solution: Unified Dashboards and Secure Collaboration Tools with Role-Based Dashboards. For Pharmacists: A centralized dashboard consolidates inventory levels, order statuses, and customer data with real-time alerts for stock depletion and order processing to streamline daily operations. For Doctors: Secure access to patient prescriptions and medical records enables informed decision-making with real-time updates ensuring accurate and timely care for patients. For Patients: A personal dashboard allows users to manage prescriptions, view health records, and track orders seamlessly. Three-way platform Integration connects pharmacies, healthcare providers, and customers, ensuring real-time data flow and consistency. Example: A doctor updates a prescription, which is immediately reflected in the pharmacy and customer dashboards. Secure Data Sharing implemented end-to-end encryption and role-based access control to safeguard sensitive data like medical records and prescriptions. Impact: "Finally, everything I need is in one place. It saves me so much time and keeps everything organized." Reduced operational errors by 30%, saving pharmacies an average of 5 hours per week. Enhanced collaboration between stakeholders increased prescription fulfillment rates by 20%.'
    },
    {
      header: 'SOLUTION 2: SIMPLIFYING COMPLEX ONBOARDING FOR PHARMACIES',
      content: 'Problem: Small pharmacies struggled with the technical barriers of going digital, including setting up online catalogs and training staff. Solution: Automated Onboarding Workflows. Features include Bulk Catalog Uploads where pharmacies upload product catalogs via .xls files, saving time on manual data entry. The system automatically flags and corrects errors, ensuring clean data. Example: A pharmacy with 500 plus SKUs onboarded in under 30 minutes. Step-by-Step Onboarding Guides provided interactive walkthroughs guiding pharmacy owners through system setup, from uploading inventories to customizing their storefront. Progress trackers provide visibility into onboarding milestones. Dedicated Support offered 24/7 live chat support for troubleshooting during setup and on-call assistance for pharmacies with specific needs or technical challenges. Impact: "The onboarding guide was so straightforward. I was up and running in no time!" Reduced onboarding time by 50%, with most pharmacies completing setup within 2 to 3 days. Onboarding success rate increased to 85%, enabling faster adoption across partner pharmacies.'
    },
    {
      header: 'SOLUTION 3: ENHANCING UX IN E-COMMERCE',
      content: 'Problem: Customers struggled with poor navigation, complex checkout processes, and lack of real-time updates, leading to high drop-off rates. Solution: Intuitive Navigation and Streamlined Checkout. Features include Advanced Search and Filters with voice-enabled search for faster discovery of products, AI-driven recommendations based on purchase history and customer preferences, and filters for categories, price range, and availability to reduce frustration during browsing. Streamlined Checkout uses auto-fill forms for returning users to reduce the time required to complete a purchase, with multiple payment options including UPI, credit/debit cards, and cash on delivery catering to diverse user needs. Example: A returning customer completed their order in under 2 minutes. Real-Time Order Tracking sends push notifications informing users at every stage: order confirmation, processing, dispatch, and delivery. A visual progress tracker provides transparency and reduces customer anxiety. Impact: "Shopping for medicines has never been this easy. I love how fast and smooth the process is now." Product discovery time reduced by 40%, allowing customers to find what they need faster. Cart abandonment rates decreased by 25%, and order completion rates increased by 20%.'
    },
    {
      header: 'DESIGN GOALS & CONSIDERATIONS',
      content: 'Information Architecture: To create a seamless and efficient user experience, the information architecture was carefully designed to cater to different user roles (pharmacists, healthcare providers, and customers). The goal was to structure the platform in a way that improves discoverability, usability, and accessibility while ensuring smooth navigation for all stakeholders. Key Considerations included Role-Specific Navigation (Tailored dashboards for pharmacies, customers, and healthcare providers to minimize cognitive load and present relevant information), E-Commerce and Healthcare Services (A clear distinction between shopping for medications, managing prescriptions, and accessing healthcare services), Search and Filtering (Robust search functionality and category-based navigation to enhance product and service discovery), Support and Accessibility (Dedicated help sections, including FAQs, live chat, and feedback options, ensuring users can easily seek assistance), and Security and Privacy (Profile management with role-based access control to safeguard sensitive user and medical data). Structure Breakdown: Pharmacies get inventory management, order tracking, CRM integration, and analytics. Healthcare Providers access patient records, collaboration tools, and prescription management. Customers use dashboard for health records, shopping, and order tracking. Global Components include header (search, filters, profile), footer (privacy policies, support), and system notifications.'
    },
    {
      header: 'TASK FLOWS',
      content: 'Three key scenarios were mapped: Scenario 1 - Pharmacy staff managing stock and placing bulk orders. Scenario 2 - Customer ordering medicines for the first time. Scenario 3 - Reordering medicines for elderly patients. These task flows ensured that each user journey was optimized for efficiency and clarity.'
    },
    {
      header: 'FEATURE HIGHLIGHTS',
      content: 'A complete view of operations ensures efficiency and better customer service. Simplified processes improve convenience and trust in the platform. Real-time updates and secure data sharing enhance care delivery. Key features delivered measurable impact: Saved pharmacies an average of 5 hours per week by automating workflows. Reduced drop-off rates by 25% and increased order completion rates by 20%. Partner pharmacies experienced a 20% increase in revenue within three months of adoption.'
    },
    {
      header: 'MEDSCOPE: A SCALABLE & SYSTEMATIC DESIGN SYSTEM',
      content: 'The Challenge: As Raseet Health expanded, maintaining design consistency, efficiency, and scalability became a challenge. A fragmented UI led to inconsistencies in components, longer design cycles, and increased development overhead. The need for a unified design system became evident to streamline collaboration, reduce redundancy, and enhance the user experience across all touchpoints. The Goal: Establish a scalable design system following Atomic Design Principles. Ensure cross-platform consistency while allowing flexibility for future expansions. Improve efficiency by reducing time spent on repetitive UI decisions. Enable a structured decision-making process to govern component usage and modifications. MedScope was built using Atomic Design Principles (Breaking down components into atoms, molecules, organisms, templates, and pages for modular reusability), A Reusable Component Library (Standardizing UI elements to ensure consistency across different features), and Scalability Standards (Creating a foundation for future expansion without compromising usability). The design system encompassed Typography and Color Systems (Ensuring accessibility and brand alignment), Spacing and Grid Systems (Providing a structured layout framework), Component Library (Predefined UI elements for seamless design iteration), and Interactive Patterns and States (Standardizing hover states, transitions, and user feedback mechanisms).'
    },
    {
      header: 'MEDSCOPE DECISION-MAKING PROCESS',
      content: 'A structured decision-making framework was implemented to maintain consistency and prevent design fragmentation. Step 1 - Assess the Need: Does a similar component exist in MedScope? If Yes, use the existing component. If No, proceed to the next step. Step 2 - Modify vs. Create: Can an existing component be adapted for this use case? If Yes, modify and document changes in the system. If No, move to prototyping. Step 3 - Prototype and Validation: If the component cannot be generalized, it is added as a one-off to the repository. If it can be standardized, it is documented and integrated into MedScope for global reuse. Step 4 - Integration and Documentation: The new/updated component is incorporated into the design system, and guidelines and best practices are documented for seamless adoption. Key Outcomes and Impact: (1) 50% faster design iterations due to reusable components. (2) 30% reduction in inconsistencies by enforcing MedScope guidelines. (3) Scalability ensured for future growth and expansion. (4) Stronger developer-designer collaboration through standardized documentation and clear workflows.'
    },
    {
      header: 'ACCESSIBILITY: DESIGNING FOR AN INCLUSIVE EXPERIENCE',
      content: 'The Goal: Given that a significant portion of Raseet Health\'s target audience includes chronic and geriatric patients, accessibility was a core consideration in the design process. The goal was to create an intuitive and frictionless experience that accommodates users with varying levels of digital literacy and physical limitations. Key Outcomes and Impact: (1) 40% faster product discovery for users with limited tech proficiency. (2) Increased order completion rate by 20%, reducing frustration and improving overall user satisfaction. (3) Higher adoption rate among elderly users, attributed to an intuitive, minimal-interaction design approach.'
    },
    {
      header: 'WIREFRAMES & UI DESIGN',
      content: 'Once the usability issues were resolved, I moved on to design the final screens in Figma. My goal was to create a visual identity that\'s aligned with the brand\'s values and message. The design followed a fresh, clean visual style optimized for mobile-first experiences. I ensured the platform worked seamlessly across Android and iOS devices, with special attention to low-end devices common in rural areas. The final design reflected learnings about users through simplified navigation, clear visual hierarchy, generous touch targets for elderly users, and high-contrast color schemes for better readability.'
    },
    {
      header: 'RETROSPECTIVE: KEY LEARNINGS',
      content: 'Empathy-Driven Design: The iterative design process, grounded in user feedback, ensured that the platform met the unique needs of pharmacists, healthcare providers, and customers. "The changes make it so much easier to manage everything. My staff and I feel more confident now." Importance of Simplicity: Simplified workflows and intuitive interfaces reduced onboarding barriers and user frustration. Streamlined experiences, like the improved checkout process, significantly boosted user satisfaction and engagement. Leveraging Ecosystem Synergy: Integrating tools and features within the Raseet Health ecosystem enhanced its value proposition for both users and the business. Example: The seamless connection between inventory management and customer-facing features created a cohesive experience.'
    },
    {
      header: 'COLLABORATION AT RASEET HEALTH',
      content: 'At Raseet Health, collaboration was a fundamental part of the design process. As the Product/UX Designer, I worked closely with cross-functional teams, ensuring that design decisions were aligned with business goals, technical feasibility, and user needs. How Collaboration Shaped the Final Product: (1) Iterative Design Process - Constant feedback loops from engineers and stakeholders ensured smooth development and reduced rework. (2) Cross-Team Alignment - Regular stand-ups and sprint reviews ensured transparency and rapid iteration. (3) Enhanced User Experience - By incorporating business insights and user feedback, we designed a seamless pharmacy ordering and inventory management system.'
    },
    {
      header: 'LESSONS LEARNED',
      content: 'Continuous Feedback Is Key: Regular usability testing and feedback loops were instrumental in identifying areas for improvement and driving iterative changes. Localized Solutions Matter: Localized onboarding guides and multilingual support helped expand adoption in diverse regions. Trust Is Foundational: Transparent communication about data privacy and security built confidence among users, addressing one of the biggest barriers to digital adoption.'
    },
    {
      header: 'CLOSING REFLECTIONS',
      content: 'The success of Raseet Health lies in its ability to empower local pharmacies, improve healthcare accessibility for customers, and foster seamless collaboration across stakeholders. By continuously iterating based on user feedback and leveraging technology to solve real-world problems, Raseet Health achieved its mission to make quality healthcare accessible and equitable. This project enhanced my ability to design for diverse user needs within a highly regulated healthcare domain, teaching me invaluable lessons about simplifying complex workflows, fostering user trust, and designing accessible, scalable systems that create meaningful impact in underserved communities.'
    }
  ];
  
  // IMAGES - Add your image URLs or file paths here
  const images = [
    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80',
    'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80'
  ];
  const colorPalette = ['#50C878', '#7AD699', '#A3E4BA', '#CCF1DB'];

  // Single list in page order: first image, then all sections, then rest of images, then colors
  const blocks: ContentBlock[] = [
    ...(images[0] ? [{ type: 'image' as const, src: images[0] }] : []),
    ...sections.map((s) => ({ type: 'text' as const, header: s.header, content: s.content })),
    ...images.slice(1).map((src) => ({ type: 'image' as const, src })),
    ...(colorPalette?.length ? [{ type: 'colors' as const, colors: colorPalette }] : []),
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
