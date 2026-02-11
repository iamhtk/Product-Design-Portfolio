import {
  Linkedin,
  Youtube,
  Instagram,
  Facebook,
  Github,
  Figma,
} from "lucide-react";
import { useState } from "react";
import { ScrollToTop } from "./ScrollToTop";
import { AnimateIn } from "./AnimateIn";

interface HomePageProps {
  onProjectClick: (id: string) => void;
}

export function HomePage({ onProjectClick }: HomePageProps) {
  const [expandedRecommendations, setExpandedRecommendations] = useState<Set<number>>(new Set());

  const toggleRecommendation = (index: number) => {
    setExpandedRecommendations((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // PROJECT CONFIGURATION
  // ═══════════════════════════════════════════════════════════════════════════
  // To enable/disable projects, set `enabled: true` or `enabled: false`
  // Disabled projects will still show with animations but won't be clickable
  // ═══════════════════════════════════════════════════════════════════════════
  
  const projects = [
    {
      id: "CWPC",
      title: "CWPC: Unifying Interfaces for Speed and Consistency",
      company: "DESIGN SYSTEM | DOCUMENTATION | UX DESIGN & RESEARCH | ACCESSIBILITY",
      readTime: "10 MINUTE READ →",
      bgColor: "#6366F1",
      image: "/main_title/main_cwpc.png",
      enabled: false, // ✅ Enabled - clickable
    },
    {
      id: "AutomotiveUX_GM",
      title: "Automotive UX - Cadillac Escalade Design Proposal",
      company: "END-TO-END PRODUCT DESIGN | UX DESIGN & RESEARCH",
      readTime: "12 MINUTE READ →",
      bgColor: "#f5f5f7",
      image: "/main_title/main_gm.png",
      enabled: true, // ✅ Enabled - clickable
    },
    {
      id: "RaseetHealth",
      title: "Raseet Health: Empowering Local Pharmacies",
      company: "END-TO-END PRODUCT DESIGN | UX RESEARCH | DESIGN SYSTEM",
      readTime: "16 MINUTE READ →",
      bgColor: "#4A90E2",
      image: "/main_title/main_raseet.png",
      enabled: false, // ✅ Enabled - clickable
    },
    {
      id: "BMW",
      title: "Redesigning BMW's Digital Interface",
      company: "AUTOMOTIVE UX DESIGN",
      readTime: "8 MINUTE READ →",
      bgColor: "#e8f4f8",
      image: "/main_title/main_bmw.png",
      enabled: true, // ✅ Enabled - clickable
    },
    {
      id: "CalmiRing",
      title: "CalmiRing",
      company: "IOT | END-TO-END UX DESIGN | UX RESEARCH",
      readTime: "10 MINUTE READ →",
      bgColor: "#f5f5f7",
      image: "/main_title/main_calmi.png",
      enabled: true, // ✅ Enabled - clickable
    },
    {
      id: "jobgenius",
      title: "JobGenius",
      company: "UX DESIGN | UX RESEARCH",
      readTime: "9 MINUTE READ →",
      bgColor: "#f5f5f7",
      image: "/main_title/main_jobgenius.png",
      enabled: false, // ❌ Disabled - not clickable (but still animated)
    },
    {
      id: "bound",
      title: "Bound International UX Audit: Identifying and Solving Key Usability Issues",
      company: "UX DESIGN & RESEARCH",
      readTime: "14 MINUTE READ →",
      bgColor: "#fff5f7",
      image: "/main_title/main_bound.png",
      enabled: false, // ❌ Disabled - not clickable (but still animated)
    },
    
    // {
    //   id: "WeddingBliss",
    //   title: "Wedding Bliss - AR Planner Assistant",
    //   company: "AR/VR DESIGN | UX DESIGN | UX RESEARCH",
    //   readTime: "9 MINUTE READ →",
    //   bgColor: "#f5f5f7",
    //   image: "/main_title/main_cwpc.png",
    //   enabled: false, // ❌ Disabled - not clickable (but still animated)
    // },
  ];

  return (
    <div className="min-h-screen pt-20">
      <ScrollToTop />
      <div className="max-w-[1600px] mx-auto px-6 md:px-8 lg:px-12">
        {/* Hero Section */}
        <div className="mt-32 pt-32 md:mt-40 pb-20 md:pb-24">
          <AnimateIn variant="up-slow" rootMargin="0px" className="mb-3">
            <h1 className="text-[28px] md:text-[36px] lg:text-[44px] font-bold text-gray-900 leading-[1.2] tracking-[-0.02em]" style={{ fontWeight: 700 }}>
              Product Designer at IBM.
            </h1>
          </AnimateIn>
          <AnimateIn variant="up-slow" rootMargin="0px" stagger="stagger-1" className="mb-3">
            <p className="text-[18px] md:text-[20px] lg:text-[22px] text-gray-900 leading-relaxed">
              Previously Design Engineer at{" "}
              <span className="font-medium">CWPC, GM, Kryptonas, TUG</span><br />
              <span className="font-medium">University of Michigan, School of Information Alumni. Go Blue!</span>
            </p>
          </AnimateIn>
          <AnimateIn variant="up-slow" rootMargin="0px" stagger="stagger-2">
            <p className="text-[17px] md:text-[20px] text-gray-500 max-w-[500px] leading-[1.65]">
              Curious about interfaces, intelligent systems
              and the ways in which we interact with them.
            </p>
          </AnimateIn>
        </div>

        {/* Section Header */}
        <AnimateIn variant="scale" rootMargin="0px 0px -60px 0px" className="flex items-center justify-between mb-4 mt-20 md:mt-40">
          <h2 className="text-[11px] tracking-[0.22em] text-gray-400 uppercase font-medium">
            Selected Work
          </h2>
          <h2 className="text-[11px] tracking-[0.22em] text-gray-400 uppercase font-medium">
            Design x Engineering
          </h2>
        </AnimateIn>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-32 items-stretch">
          {projects.map((project, index) => {
            // Check if project is enabled (defaults to true if not specified)
            const isEnabled = project.enabled !== false;
            const staggerKey = (['stagger-1','stagger-2','stagger-3','stagger-4','stagger-5','stagger-6','stagger-7','stagger-8','stagger-9'] as const)[Math.min(index, 8)];
            return (
            <AnimateIn key={project.id} stagger={staggerKey} rootMargin="0px 0px -80px 0px">
            <div
              onClick={() => {
                if (!isEnabled) {
                  return; // Disabled - do nothing (but animations still work)
                }
                if (project.id === 'CalmiRing') {
                  window.open('https://beautiful-leader-fa9.notion.site/Calmi-Ring-ad8e4dee5a794da48dda0e5ad4bdde33', '_blank');
                } else {
                  onProjectClick(project.id);
                }
              }}
              className={`h-full flex flex-col rounded-xl overflow-hidden border border-black/[0.06] shadow-[var(--shadow-card)] transition-all duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:-translate-y-1 hover:shadow-[var(--shadow-depth)] hover:border-black/[0.08] ${
                isEnabled 
                  ? 'cursor-pointer' 
                  : 'cursor-not-allowed'
              }`}
            >
              {/* Project Image - Fixed aspect ratio container */}
              <div
                className={`mb-4 w-full flex-shrink-0 overflow-hidden transition-transform duration-500 ease-out ${
                  project.id === 'CalmiRing' ? 'flex items-center justify-center' : ''
                }`}
                style={{ backgroundColor: project.bgColor, aspectRatio: '1 / 1' }}

              >
                {project.image && (
                  (() => {
                    const isVideo = /\.(mp4|webm|mov)(\?|$)/i.test(project.image);
                    const mediaClass = `transition-transform duration-300 ease-out ${
                      project.id === 'CalmiRing'
                        ? 'max-w-full max-h-full object-contain'
                        : 'w-full h-full object-cover'
                    } hover:scale-105`;
                    return isVideo ? (
                      <video
                        src={project.image}
                        className={mediaClass}
                        autoPlay
                        loop
                        muted
                        playsInline
                        aria-label={project.title}
                      />
                    ) : (
                      <img
                        src={project.image}
                        alt={project.title}
                        className={mediaClass}
                        loading="lazy"
                      />
                    );
                  })()
                )}
              </div>

              {/* Project Info - Flex column with read time at bottom */}
              <div className="flex flex-col flex-1 space-y-2 px-3 pb-3">
                <h3 className="text-[16px] md:text-[17px] text-gray-900 font-semibold leading-[1.4] line-clamp-2 transition-opacity duration-300 hover:opacity-70">
                  {project.title}
                </h3>
                <p className="text-[13px] md:text-[14px] text-gray-500 leading-relaxed line-clamp-2">
                  {project.company}
                </p>
                <p className="text-[12px] tracking-wide text-gray-400 pt-1 mt-auto">
                  {project.readTime}
                </p>
              </div>
            </div>
            </AnimateIn>
          );
          })}
        </div>

        <AnimateIn variant="scale" rootMargin="0px 0px -80px 0px" className="mb-32">
          <div className="mb-12">
            <h2 className="text-[11px] tracking-[0.22em] text-gray-400 uppercase font-medium mb-2">
              Side Projects - Mini Apps
            </h2>
            <p className="text-[17px] text-gray-900">
              Small experiments & creative explorations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a href="#" onClick={(e) => e.preventDefault()} className="group block cursor-pointer rounded-none overflow-hidden border border-black/[0.06] shadow-[var(--shadow-card)] transition-all duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:shadow-[var(--shadow-depth)] hover:-translate-y-1 hover:border-black/[0.08] px-4 pb-4" aria-hidden>
            <div className="mb-4 -mx-4 rounded-none overflow-hidden bg-[#f5f5f7]" style={{ aspectRatio: '4 / 3' }}>

                <img
                  src="miniapps/AVICII-FOREVER-ARTWORK-CLEAN_2.webp"
                  alt="LE7ELS"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
                />
              </div>
              <div>
                <h3 className="text-[15px] text-gray-900 mb-1 group-hover:opacity-70 transition-opacity">
                  LE7ELS
                </h3>
                <p className="text-[13px] text-gray-500">
                  Music Library Organizer
                </p>
              </div>
            </a>

            <a href="https://stories.hrithiksanyal.com/" target="_blank" rel="noopener noreferrer" className="group block cursor-pointer rounded-none overflow-hidden border border-black/[0.06] shadow-[var(--shadow-card)] transition-all duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:shadow-[var(--shadow-depth)] hover:-translate-y-1 hover:border-black/[0.08] px-4 pb-4">
              <div className="mb-4 -mx-4 rounded-none overflow-hidden bg-[#f5f5f7]" style={{ aspectRatio: '4 / 3' }}>
                <img
                  src="miniapps/avicii-stories-wallpaper-upscaled-3840-1900-v0-t0cxcu66a9of1.webp"
                  alt="Stories"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
                />
              </div>
              <div>
                <h3 className="text-[15px] text-gray-900 mb-1 group-hover:opacity-70 transition-opacity">
                  Stories
                </h3>
                <p className="text-[13px] text-gray-500">
                  Design System Builder
                </p>
              </div>
            </a>

            {/* <a href="https://flux.hrithiksanyal.com/" target="_blank" rel="noopener noreferrer" className="group block cursor-pointer rounded-2xl overflow-hidden border border-black/[0.06] shadow-[var(--shadow-card)] transition-all duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:shadow-[var(--shadow-depth)] hover:-translate-y-0.5 hover:border-black/[0.08]">
              <div className="mb-4 rounded-2xl overflow-hidden bg-[#f5f5f7]" style={{ aspectRatio: '4 / 3' }}>
                <img
                  src="miniapps/flux.png"
                  alt="Flux"
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                />
              </div>
              <div>
                <h3 className="text-[15px] text-gray-900 mb-1 group-hover:opacity-60 transition-opacity">
                  Flux
                </h3>
                <p className="text-[13px] text-gray-500">
                  CSS Card Generator
                </p>
              </div>
            </a> */}

            {/* <a href="https://www.fibonacci.hrithiksanyal.com/" target="_blank" rel="noopener noreferrer" className="group block cursor-pointer rounded-2xl overflow-hidden border border-black/[0.06] shadow-[var(--shadow-card)] transition-all duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:shadow-[var(--shadow-depth)] hover:-translate-y-0.5 hover:border-black/[0.08]">
              <div className="mb-4 rounded-2xl overflow-hidden bg-[#f5f5f7]" style={{ aspectRatio: '4 / 3' }}>
                <img
                  src="miniapps/f.png"
                  alt="Fibonacci"
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                />
              </div>
              <div>
                <h3 className="text-[15px] text-gray-900 mb-1 group-hover:opacity-60 transition-opacity">
                  Fibonacci
                </h3>
                <p className="text-[13px] text-gray-500">
                  Sequence Calculator
                </p>
              </div>
            </a>

            <a href="https://www.fizzbuzz.hrithiksanyal.com/" target="_blank" rel="noopener noreferrer" className="group block cursor-pointer rounded-none overflow-hidden border border-black/[0.06] shadow-[var(--shadow-card)] transition-all duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:shadow-[var(--shadow-depth)] hover:-translate-y-1 hover:border-black/[0.08] px-4 pb-4">
              <div className="mb-4 -mx-4 rounded-none overflow-hidden bg-[#f5f5f7]" style={{ aspectRatio: '4 / 3' }}>
                <img
                  src="miniapps/f2.png"
                  alt="Project Five"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
                />
              </div>
              <div>
                <h3 className="text-[15px] text-gray-900 mb-1 group-hover:opacity-70 transition-opacity">
                FizzBuzz Calculator
                </h3>
                <p className="text-[13px] text-gray-500">
                Generate FizzBuzz sequences with customizable rules
                </p>
              </div>
            </a> */}

            <a href="https://www.mathematical-sequence-generator.hrithiksanyal.com/" target="_blank" rel="noopener noreferrer" className="group block cursor-pointer rounded-none overflow-hidden border border-black/[0.06] shadow-[var(--shadow-card)] transition-all duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:shadow-[var(--shadow-depth)] hover:-translate-y-1 hover:border-black/[0.08] px-4 pb-4">
              <div className="mb-4 -mx-4 rounded-none overflow-hidden bg-[#f5f5f7]" style={{ aspectRatio: '4 / 3' }}>
                <img
                  src="miniapps/f3.png"
                  alt="Project Six"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
                />
              </div>
              <div>
                <h3 className="text-[15px] text-gray-900 mb-1 group-hover:opacity-70 transition-opacity">
                Mathematical Sequence Generator
                </h3>
                <p className="text-[13px] text-gray-500">
                Generate and customize FizzBuzz, Fibonacci sequences, and their combinations
                </p>
              </div>
            </a>
          </div>
        </AnimateIn>

        {/* Recommendations Section */}
        <AnimateIn variant="scale" rootMargin="0px 0px -80px 0px" className="mb-32">
          <div className="mb-12">
            <h2 className="text-[11px] tracking-[0.22em] text-gray-400 uppercase font-medium mb-2">
              Testimonials
            </h2>
            <p className="text-[17px] text-gray-900">
              What people say about me
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Recommendation 1 */}
            <div className={`group glass-card rounded-2xl border border-black/[0.06] bg-white/60 shadow-[var(--shadow-subtle)] p-6 md:p-8 transition-all duration-300 hover:shadow-[var(--shadow-card)] ${expandedRecommendations.has(0) ? 'depth-expanded' : ''}`}>
              <div 
                className={`text-[15px] text-gray-700 leading-relaxed mb-6 cursor-pointer transition-all overflow-hidden ${
                  expandedRecommendations.has(0) 
                    ? 'max-h-none' 
                    : 'max-h-[4.875rem]'
                }`}
                style={{
                  display: '-webkit-box',
                  WebkitLineClamp: expandedRecommendations.has(0) ? 'unset' : 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
                onClick={() => toggleRecommendation(0)}
              >
                <p className="whitespace-pre-line">
                  "I worked with Hrithik Sanyal as a colleague at the Catastrophic Wildfire Prevention Consortium (CWPC). From the start, he stood out as a thoughtful and collaborative professional. He brought a clear vision to our projects and paired it with a user-focused approach that helped our team grow and succeed.
                
                  Hrithik guided us in creating work that was both engaging and effective. His feedback consistently strengthened our projects and pushed me to improve by encouraging reflection and refinement in my design process. For example, when we developed a wireframe for our donation button feature, Hrithik kept the team focused on project goals while leaving space for creativity and meaningful user experiences. His ability to balance structure with flexibility always helped us move forward in the right direction.
                  Just as impressive as his expertise is his character. Hrithik is approachable, encouraging, and easy to collaborate with. He fostered an environment where sharing ideas and working came naturally, making our team more motivated and productive.
                  I highly recommend Hrithik. His UX skills, supportive style, and genuine care for users and his team make him an outstanding professional and asset to any organization."
                </p>
              </div>
              <div className="flex items-center gap-4">
                <img
                  src="/recommendations/IMG_E1850.JPG"
                  alt="Jessica Allen "
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="text-[15px] text-gray-900">
                  Jessica Allen  
                  </p>
                  <p className="text-[13px] text-gray-500">
                    Instructional Designer, CWPC
                  </p>
                </div>
              </div>
            </div>

            {/* Recommendation 2 */}
            <div className={`group glass-card rounded-2xl border border-black/[0.06] bg-white/60 shadow-[var(--shadow-subtle)] p-6 md:p-8 transition-all duration-300 hover:shadow-[var(--shadow-card)] ${expandedRecommendations.has(1) ? 'depth-expanded' : ''}`}>
              <div 
                className={`text-[15px] text-gray-700 leading-relaxed mb-6 cursor-pointer transition-all overflow-hidden ${
                  expandedRecommendations.has(1) 
                    ? 'max-h-none' 
                    : 'max-h-[4.875rem]'
                }`}
                style={{
                  display: '-webkit-box',
                  WebkitLineClamp: expandedRecommendations.has(1) ? 'unset' : 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
                onClick={() => toggleRecommendation(1)}
              >
                <p>
                "I am pleased to recommend Hrithik Sanyal for roles in UX research and design/development. Hrithik served as a graduate student instructor in my information architecture course at the University of Michigan, demonstrating exceptional personability and a quick grasp of new methods. His ability to connect with others and provoke curiosity is invaluable in UX. Hrithik's internship at The Understanding Group showcased his talent in meeting deadlines, generating ideas, and designing user experiences. He embodies the leadership and excellence we aim for at U-M, and I highly recommend him for full-time employment in HCI/UX. For more information, feel free to contact me directly."
              </p>
              </div>
              <div className="flex items-center gap-4">
                <img
                  src="recommendations/DanBW_500.webp"
                  alt="Daniel O'Neil"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="text-[15px] text-gray-900">
                    Dan Klyn
                  </p>
                  <p className="text-[13px] text-gray-500">
                  Lecturer & co-founder at The Understanding Group (TUG)
                  </p>
                </div>
              </div>
            </div>

            {/* Recommendation 3 */}
            <div className={`group glass-card rounded-2xl border border-black/[0.06] bg-white/60 shadow-[var(--shadow-subtle)] p-6 md:p-8 transition-all duration-300 hover:shadow-[var(--shadow-card)] ${expandedRecommendations.has(2) ? 'depth-expanded' : ''}`}>
              <div 
                className={`text-[15px] text-gray-700 leading-relaxed mb-6 cursor-pointer transition-all overflow-hidden ${
                  expandedRecommendations.has(2) 
                    ? 'max-h-none' 
                    : 'max-h-[4.875rem]'
                }`}
                style={{
                  display: '-webkit-box',
                  WebkitLineClamp: expandedRecommendations.has(2) ? 'unset' : 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
                onClick={() => toggleRecommendation(2)}
              >
                <p>
                "Hrithik is a thoughtful, engaging person who helped us a number of different projects while at TUG, especially in user research. He had a great ability to listen and ask questions and then turn what he learned into interesting and insightful design concepts. Hrithik is a great collaborator and always curious about how to do things better. Because our teams are small, people have to wear a lot of hats, and Hrithik was comfortable taking on whatever roles were needed. 
      <br /><br />
        Best of luck in your future efforts Hrithik!"
              </p>
              </div>
              <div className="flex items-center gap-4">
                <img
                  src="recommendations/daniel.webp"
                  alt="Emerald Paul"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="text-[15px] text-gray-900">
                    Daniel O'Neil
                  </p>
                  <p className="text-[13px] text-gray-500">
                  Analyst at The Understanding Group (TUG)
                  </p>
                </div>
              </div>
            </div>

            {/* Recommendation 4 */}
            <div className={`group glass-card rounded-2xl border border-black/[0.06] bg-white/60 shadow-[var(--shadow-subtle)] p-6 md:p-8 transition-all duration-300 hover:shadow-[var(--shadow-card)] ${expandedRecommendations.has(3) ? 'depth-expanded' : ''}`}>
              <div 
                className={`text-[15px] text-gray-700 leading-relaxed mb-6 cursor-pointer transition-all overflow-hidden ${
                  expandedRecommendations.has(3) 
                    ? 'max-h-none' 
                    : 'max-h-[4.875rem]'
                }`}
                style={{
                  display: '-webkit-box',
                  WebkitLineClamp: expandedRecommendations.has(3) ? 'unset' : 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
                onClick={() => toggleRecommendation(3)}
              >
                <p>
                "Hrithik Sanyal was a student in my Graphic Design and Visual Communication class at the University of Michigan School of Information. He showed great interest, actively participated in class activities, and worked well with Adobe Photoshop, Illustrator, and Figma. Hrithik understood design theory and performed well on assignments. He was open to feedback and willing to work extra time on revisions, refining his graphic and prototyping skills. His dedication and willingness to go the extra mile helped him develop a strong command of branding, identity, and design languages. Hrithik is a friendly and hardworking individual, and I highly recommend him for any future endeavors."
              </p>
              </div>
              <div className="flex items-center gap-4">
                <img
                  src="recommendations/elena.jpeg"
                  alt="Rajneesh Agrawal"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="text-[15px] text-gray-900">
                  Elena Godin
                  </p>
                  <p className="text-[13px] text-gray-500">
                  Designer, Researcher, Educator at University of Michigan
                  </p>
                </div>
              </div>
            </div>

            {/* Recommendation 5 */}
            <div className={`group glass-card rounded-2xl border border-black/[0.06] bg-white/60 shadow-[var(--shadow-subtle)] p-6 md:p-8 transition-all duration-300 hover:shadow-[var(--shadow-card)] ${expandedRecommendations.has(4) ? 'depth-expanded' : ''}`}>
              <div 
                className={`text-[15px] text-gray-700 leading-relaxed mb-6 cursor-pointer transition-all overflow-hidden ${
                  expandedRecommendations.has(4) 
                    ? 'max-h-none' 
                    : 'max-h-[4.875rem]'
                }`}
                style={{
                  display: '-webkit-box',
                  WebkitLineClamp: expandedRecommendations.has(4) ? 'unset' : 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
                onClick={() => toggleRecommendation(4)}
              >
                <p>
                  "
Hrithik played a key role in designing the donation feature for the CWPC website, translating complex organizational needs into a clear, user-friendly system that supports our mission and improves donor experience. Beyond this, he has consistently contributed to strengthening CWPC’s overall systems design, identifying gaps, improving workflows, and ensuring solutions were scalable and sustainable for a growing organization.
What truly sets Hrithik apart is his go-getter attitude and team-first mindset. He is always ready to jump in, proactively offer support, and help move work forward—often anticipating needs before they’re formally raised. His reliability, problem-solving skills, and positive energy make him a valued partner across teams.
Any organization would be lucky to have him on its systems or product team, especially in mission-driven environments that require both technical excellence and collaborative spirit."
                </p>
              </div>
              <div className="flex items-center gap-4">
                <img
                  src="recommendations/shubhi.jpeg"
                  alt="Sarah Chen"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="text-[15px] text-gray-900">
                  Shubhi Singla
                  </p>
                  <p className="text-[13px] text-gray-500">
                  Project Manager, CWPC @ CrowdDoing
                  </p>
                </div>
              </div>
            </div>

            {/* Recommendation 6 */}
            <div className={`group glass-card rounded-2xl border border-black/[0.06] bg-white/60 shadow-[var(--shadow-subtle)] p-6 md:p-8 transition-all duration-300 hover:shadow-[var(--shadow-card)] ${expandedRecommendations.has(5) ? 'depth-expanded' : ''}`}>
              <div 
                className={`text-[15px] text-gray-700 leading-relaxed mb-6 cursor-pointer transition-all overflow-hidden ${
                  expandedRecommendations.has(5) 
                    ? 'max-h-none' 
                    : 'max-h-[4.875rem]'
                }`}
                style={{
                  display: '-webkit-box',
                  WebkitLineClamp: expandedRecommendations.has(5) ? 'unset' : 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
                onClick={() => toggleRecommendation(5)}
              >
                <p>
                  "I’ve had the pleasure of working closely with Hrithik, the Design Lead at CWPC, and he is truly an exceptional designer and collaborator. He consistently guided the team toward clarity and cohesion, ensuring designs were not only visually strong but also purposeful, scalable, and deeply user-centered. He delivered highly effective design solutions at CWPC, particularly across the design system, donation platform, and wildfire prevention scorecard, bringing structure and clear vision to complex challenges with a strong understanding of both user needs and business impact.
Beyond his design expertise, Hrithik is a great team player who is approachable, supportive, and genuinely collaborative. I highly recommend him for his design leadership, strong instincts, and the positive energy and professionalism he brings to any team."
                </p>
              </div>
              <div className="flex items-center gap-4">
                <img
                  src="recommendations/priya.jpeg"
                  alt="Michael Torres"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="text-[15px] text-gray-900">
                  Haripriya Vijayan
                  </p>
                  <p className="text-[13px] text-gray-500">
                    Product Manager, CWPC @ CrowdDoing
                  </p>
                </div>
              </div>
            </div>

            {/* Recommendation 7 */}
            <div className={`group glass-card rounded-2xl border border-black/[0.06] bg-white/60 shadow-[var(--shadow-subtle)] p-6 md:p-8 transition-all duration-300 hover:shadow-[var(--shadow-card)] ${expandedRecommendations.has(6) ? 'depth-expanded' : ''}`}>
              <div 
                className={`text-[15px] text-gray-700 leading-relaxed mb-6 cursor-pointer transition-all overflow-hidden ${
                  expandedRecommendations.has(6) 
                    ? 'max-h-none' 
                    : 'max-h-[4.875rem]'
                }`}
                style={{
                  display: '-webkit-box',
                  WebkitLineClamp: expandedRecommendations.has(6) ? 'unset' : 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
                onClick={() => toggleRecommendation(6)}
              >
                <p>
                  "Hrithik is an excellent colleague who consistently delivered thoughtful, user-centered UI/UX solutions with speed and efficiency. He independently created a comprehensive system design for CWPC, providing clear structure and documentation that significantly improved team alignment and execution. His ability to translate complex requirements into practical, well-designed solutions made a meaningful impact on our work. I would gladly work with Hrithik again and highly recommend him."
                </p>
              </div>
              <div className="flex items-center gap-4">
                <img
                  src="recommendations/chernysheva_photo_12.webp"
                  alt="Jessica Liu"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="text-[15px] text-gray-900">
                  Natalia Chernysheva
                  </p>
                  <p className="text-[13px] text-gray-500">
                    Full Stack Developer, CWPC @ CrowdDoing
                  </p>
                </div>
              </div>
            </div>

            {/* Recommendation 8 */}
            <div className={`group glass-card rounded-2xl border border-black/[0.06] bg-white/60 shadow-[var(--shadow-subtle)] p-6 md:p-8 transition-all duration-300 hover:shadow-[var(--shadow-card)] ${expandedRecommendations.has(7) ? 'depth-expanded' : ''}`}>
              <div 
                className={`text-[15px] text-gray-700 leading-relaxed mb-6 cursor-pointer transition-all overflow-hidden ${
                  expandedRecommendations.has(7) 
                    ? 'max-h-none' 
                    : 'max-h-[4.875rem]'
                }`}
                style={{
                  display: '-webkit-box',
                  WebkitLineClamp: expandedRecommendations.has(7) ? 'unset' : 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
                onClick={() => toggleRecommendation(7)}
              >
                <p>
                  "Hrithik is very very hard working, sustainable and intelligent intellectual, who is best fit in all situation. He will certainly be an asset where ever he will work. Best Luck Hrithik."
                </p>
              </div>
              <div className="flex items-center gap-4">
                <img
                  src="https://images.unsplash.com/photo-1769636930047-4478f12cf430?w=100&q=80"
                  alt="James Williams"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="text-[15px] text-gray-900">
                  Rajneesh Agrawal
                  </p>
                  <p className="text-[13px] text-gray-500">
                  Mentor at Comp-Tel Consultancy (Pace Bureau)

                  </p>
                </div>
              </div>
            </div>
          </div>
        </AnimateIn>
      </div>

      {/* Footer - same container as Blog for consistent layout */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-8 lg:px-12">
        <div
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-12 pb-8 text-[13px] text-gray-500"
          data-footer
        >
          {/* Left - Copyright */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="whitespace-nowrap">
              Designed and Developed.
            </span>
            <span>© 2026</span>
          </div>

          {/* Right - Social Links */}
          <div className="flex items-center gap-3 md:gap-5">
            <a
              href="https://www.figma.com/@iamhtk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-900 transition-colors"
              aria-label="Figma"
            >
              <Figma className="w-[18px] h-[18px]" />
            </a>
            <a
              href="https://github.com/iamhtk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-900 transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-[18px] h-[18px]" />
            </a>
            <a
              href="https://www.linkedin.com/in/iamhtk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-900 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-[18px] h-[18px]" />
            </a>
            <a
              href="https://www.youtube.com/@avlnce"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-900 transition-colors"
              aria-label="YouTube"
            >
              <Youtube className="w-[18px] h-[18px]" />
            </a>
            <a
              href="https://www.instagram.com/hrithiksanyal/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-900 transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-[18px] h-[18px]" />
            </a>
            <a
              href="https://www.facebook.com/Avlnce/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-900 transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-[18px] h-[18px]" />
            </a>
            <a
              href="https://x.com/hrithiksanyal"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-900 transition-colors"
              aria-label="X (Twitter)"
            >
              <svg
                className="w-[18px] h-[18px]"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="https://soundcloud.com/avlncemusic"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-900 transition-colors"
              aria-label="SoundCloud"
            >
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