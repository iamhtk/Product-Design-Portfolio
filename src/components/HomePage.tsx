import {
  Linkedin,
  Youtube,
  Instagram,
  Facebook,
} from "lucide-react";
import { ScrollToTop } from "./ScrollToTop";
import { useState } from "react";

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

  const projects = [
    {
      id: "CWPC",
      title: "CWPC: Unifying Interfaces for Speed and Consistency",
      company: "DESIGN SYSTEM | DOCUMENTATION | UX DESIGN & RESEARCH | ACCESSIBILITY",
      readTime: "10 MINUTE READ →",
      bgColor: "#6366F1",
      image:
        "/cwpc/main.png",
    },
    {
      id: "AutomotiveUX_GM",
      title: "Automotive UX - Cadillac Escalade Design Proposal",
      company: "END-TO-END PRODUCT DESIGN | UX DESIGN & RESEARCH",
      readTime: "12 MINUTE READ →",
      bgColor: "#f5f5f7",
      image:
        "gm/header.png",
    },
    {
      id: "RaseetHealth",
      title: "Raseet Health: Empowering Local Pharmacies",
      company: "END-TO-END PRODUCT DESIGN | UX RESEARCH | DESIGN SYSTEM",
      readTime: "16 MINUTE READ →",
      bgColor: "#4A90E2",
      image:
        "raseet/main.png",
    },
    {
      id: "BMW",
      title: "Redesigning BMW's Digital Interface",
      company: "AUTOMOTIVE UX DESIGN",
      readTime: "8 MINUTE READ →",
      bgColor: "#e8f4f8",
      image:
        "bmw/BMW_main.png",
    },
    {
      id: "CalmiRing",
      title: "CalmiRing",
      company: "IOT | END-TO-END UX DESIGN | UX RESEARCH",
      readTime: "10 MINUTE READ →",
      bgColor: "#f5f5f7",
      image:
        "calmi/main.png",
    },
    
    {
      id: "bound",
      title: "Bound International UX Audit: Identifying and Solving Key Usability Issues",
      company: "UX DESIGN & RESEARCH",
      readTime: "14 MINUTE READ →",
      bgColor: "#fff5f7",
      image:
        "bound/bound.png",
    },
    {
      id: "WeddingBliss",
      title: "Wedding Bliss - AR Planner Assistant",
      company: "AR/VR DESIGN | UX DESIGN | UX RESEARCH",
      readTime: "9 MINUTE READ →",
      bgColor: "#f5f5f7",
      image:
        "weddingbliss/weddingbliss.png",
    },
  ];

  return (
    <div className="min-h-screen bg-white pt-20 pb-12">
      <ScrollToTop />
      <div className="max-w-[1600px] mx-auto px-6 md:px-8 lg:px-12">
        {/* Hero Section */}
        <div className="mt-32 pt-32 md:mt-40 pb-16">
          <h1 className="text-[28px] md:text-[36px] lg:text-[42px] font-bold text-gray-900 mb-3 leading-[1.2] tracking-tight" style={{ fontWeight: 700 }}>
            Designer at IBM.
          </h1>
          <p className="text-[18px] md:text-[20px] lg:text-[22px] text-gray-900 mb-3 leading-relaxed">
            Previously Design Engineer at{" "}
            <span className="font-medium">CWPC, GM, Kryptonas, TUG</span><br />
            <span className="font-medium">University of Michigan, School of Information Alumni. Go Blue!</span>
            {/* <br />
            University of Michigan, School of Information Alumni. Go Blue! */}
          </p>
          <p className="text-[17px] md:text-[18px] text-gray-600 max-w-[500px] leading-relaxed">
            Curious about interfaces, intelligent systems
            and the ways in which we interact with them.
          </p>
        </div>

        {/* Section Header */}
        <div className="flex items-center justify-between mb-4 mt-20 md:mt-40">
          <h2 className="text-[11px] tracking-[0.2em] text-gray-400 uppercase">
            Selected Work
          </h2>
          <h2 className="text-[11px] tracking-[0.2em] text-gray-400 uppercase">
            Design x Engineering
          </h2>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-32 items-stretch">
          {projects.map((project) => {
            const isDisabled = project.id === 'bound' || project.id === 'WeddingBliss';
            return (
            <div
              key={project.id}
              onClick={() => {
                if (isDisabled) {
                  return; // Disabled - do nothing
                }
                if (project.id === 'CalmiRing') {
                  window.open('https://beautiful-leader-fa9.notion.site/Calmi-Ring-ad8e4dee5a794da48dda0e5ad4bdde33', '_blank');
                } else {
                  onProjectClick(project.id);
                }
              }}
              className={`h-full flex flex-col transition-transform duration-300 ease-out ${
                isDisabled 
                  ? 'cursor-not-allowed opacity-60' 
                  : 'cursor-pointer hover:-translate-y-1'
              }`}
            >
              {/* Project Image - Fixed aspect ratio container */}
              <div
                className={`mb-4 rounded-xl overflow-hidden shadow-sm w-full flex-shrink-0 transition-all duration-300 ease-out ${
                  project.id === 'CalmiRing' ? 'flex items-center justify-center' : ''
                } ${
                  isDisabled ? '' : 'hover:shadow-lg'
                }`}
                style={{ 
                  backgroundColor: project.bgColor,
                  aspectRatio: '4 / 3'
                }}
              >
                {project.image && (
                <img
                  src={project.image}
                  alt={project.title}
                    className={`transition-transform duration-300 ease-out ${
                      project.id === 'CalmiRing' 
                        ? 'max-w-full max-h-full object-contain' 
                        : 'w-full h-full object-cover'
                    } ${
                      isDisabled 
                        ? '' 
                        : 'hover:scale-105'
                    }`}
                    loading="lazy"
                />
                )}
              </div>

              {/* Project Info - Flex column with read time at bottom */}
              <div className="flex flex-col flex-1 space-y-2">
                <h3 className={`text-[16px] md:text-[17px] text-gray-900 font-semibold leading-[1.4] line-clamp-2 transition-opacity duration-300 ${
                  isDisabled ? '' : 'hover:opacity-70'
                }`}>
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
          );
          })}
        </div>

        {/* Mini Apps Section - commented out for now, uncomment when ready
        <div className="mb-32">
          <div className="mb-12">
            <h2 className="text-[11px] tracking-[0.2em] text-gray-400 uppercase mb-2">
              Side Projects
            </h2>
            <p className="text-[17px] text-gray-900">
              Small experiments & creative explorations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <a href="#" className="group cursor-pointer">
              <div className="mb-4 rounded-2xl overflow-hidden aspect-square bg-[#f5f5f7] shadow-sm">
                <img
                  src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&q=80"
                  alt="LE7ELS"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div>
                <h3 className="text-[15px] text-gray-900 mb-1 group-hover:opacity-60 transition-opacity">
                  LE7ELS
                </h3>
                <p className="text-[13px] text-gray-500">
                  Music Library Organizer
                </p>
              </div>
            </a>

            <a href="#" className="group cursor-pointer">
              <div className="mb-4 rounded-2xl overflow-hidden aspect-square bg-[#f5f5f7] shadow-sm">
                <img
                  src="https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=400&q=80"
                  alt="Stories"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div>
                <h3 className="text-[15px] text-gray-900 mb-1 group-hover:opacity-60 transition-opacity">
                  Stories
                </h3>
                <p className="text-[13px] text-gray-500">
                  Design System Builder
                </p>
              </div>
            </a>

            <a href="#" className="group cursor-pointer">
              <div className="mb-4 rounded-2xl overflow-hidden aspect-square bg-[#f5f5f7] shadow-sm">
                <img
                  src="https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&q=80"
                  alt="Flux"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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
            </a>

            <a href="#" className="group cursor-pointer">
              <div className="mb-4 rounded-2xl overflow-hidden aspect-square bg-[#f5f5f7] shadow-sm">
                <img
                  src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&q=80"
                  alt="Fibonacci"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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
          </div>
        </div>
        */}

        {/* Recommendations Section */}
        <div className="mb-32">
          <div className="mb-12">
            <h2 className="text-[11px] tracking-[0.2em] text-gray-400 uppercase mb-2">
              Testimonials
            </h2>
            <p className="text-[17px] text-gray-900">
              What people say about me
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Recommendation 1 */}
            <div className="group">
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
            <div className="group">
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
            <div className="group">
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
            <div className="group">
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
            <div className="group">
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
            <div className="group">
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
            <div className="group">
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
            <div className="group">
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
        </div>

        {/* Footer */}
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
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-900 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-[18px] h-[18px]" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-900 transition-colors"
              aria-label="YouTube"
            >
              <Youtube className="w-[18px] h-[18px]" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-900 transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-[18px] h-[18px]" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-900 transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-[18px] h-[18px]" />
            </a>
            <a
              href="https://x.com"
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
          </div>
        </div>
      </div>
    </div>
  );
}