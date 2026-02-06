import { Download, Linkedin, Youtube, Instagram, Facebook } from 'lucide-react';
import { ScrollToTop } from './ScrollToTop';

// Set your resume PDF URL here (e.g. "/resume.pdf" if file is in public folder, or a full URL)
const RESUME_PDF_URL = '/resume.pdf';

export function ResumePage() {
  const handleCertClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const href = e.currentTarget.getAttribute('href');
    if (href && href !== '#') {
      e.preventDefault();
      window.open(href, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="max-w-[900px] mx-auto px-8 md:px-16">
        
        {/* Header with Download Button */}
        <div className="pt-20 pb-12 flex items-start justify-between">
          <div>
            <h1 className="text-[32px] md:text-[42px] leading-[1.2] text-gray-900 mb-3">
              Hrithik Sanyal
            </h1>
            <p className="text-[15px] leading-[1.7] text-gray-700 mb-2">
              <strong>Senior Product Designer</strong> - with 5+ years of experience. Specializing in<br />
              creating AI, AR/VR, FinTech products.<br />
              Drawing from my design and electronics engineering experience, I develop <br />
              user-first solutions that simplify decision-making, reduce friction, and build <br />
              trust while driving business outcomes.
            </p>
          </div>
          <a
            href={"https://drive.google.com/file/d/17T5MrPLpxk9qviueThkuLv0GGXuuQdg-/view"}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white text-[14px] rounded-lg hover:bg-gray-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            Download PDF
          </a>
        </div>

        {/* Mobile Download Button */}
        <a
          href={"https://drive.google.com/file/d/17T5MrPLpxk9qviueThkuLv0GGXuuQdg-/view"}
          download
          target="_blank"
          rel="noopener noreferrer"
          className="md:hidden w-full flex items-center justify-center gap-2 px-5 py-3 bg-gray-900 text-white text-[14px] rounded-lg hover:bg-gray-700 transition-colors mb-12"
        >
          <Download className="w-4 h-4" />
          Download PDF
        </a>

        {/* EXPERIENCE Section */}
        <div className="mb-16">
          <h2 className="text-[11px] tracking-wide text-gray-400 mb-8">
            EXPERIENCE
          </h2>

          {/* IBM */}
          <div className="mb-10">
            <h3 className="text-[15px] text-gray-900 mb-1">
              <strong>IBM</strong>, Product Designer
            </h3>
            <p className="text-[13px] text-gray-500 mb-4">
              <strong>March 2026—Present</strong> — San Jose, CA
            </p>
            <ul className="space-y-3">
              <li className="flex gap-3">
                <span className="text-green-600 text-[8px] mt-2">●</span>
                <span className="text-[15px] leading-[1.7] text-gray-700">
                  Being redesigned with <strong>Apple Services</strong>
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-green-600 text-[8px] mt-2">●</span>
                <span className="text-[15px] leading-[1.7] text-gray-700">
                  Relaunched <strong>Shazam</strong> Reusable to kids and for multiple business projects, added two more item - <strong>Business Download + Ad Platforms</strong>
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-green-600 text-[8px] mt-2">●</span>
                <span className="text-[15px] leading-[1.7] text-gray-700">
                  Re-worked brand identity of successful wireframes that facilitated the design of many of 5 years
                </span>
              </li>
            </ul>
          </div>

          {/* TechMentee */}
          <div className="mb-10">
            <h3 className="text-[15px] text-gray-900 mb-1">
              <strong>TechMentee, Inc</strong>,  Product Designer
            </h3>
            <p className="text-[13px] text-gray-500 mb-4">
              <strong>January 2026—March 2026</strong> — Palo Alto, CA
            </p>
            <ul className="space-y-3">
              <li className="flex gap-3">
                <span className="text-green-600 text-[8px] mt-2">●</span>
                <span className="text-[15px] leading-[1.7] text-gray-700">
                  Led UX design and research for CWPC platform including donate feature system, community scorecard, sponsorship packages, authentication flows, and design system with 200+ WCAG-compliant components. Collaborated with fire officials, community leaders, engineering, marketing, and executive teams through stakeholder workshops and usability testing to design Scorecard and donation platform through A/B testing, achieving 85% task success rate, 32% conversion increase, 25% recurring contributions, and improved onboarding completion from 60% to 82%
                </span>
              </li>
            </ul>
          </div>

          {/* CWPC */}
          <div className="mb-10">
            <h3 className="text-[15px] text-gray-900 mb-1">
              <strong>Catastrophic Wildfire Prevention Consortium (CWPC)</strong>, Product Designer
            </h3>
            <p className="text-[13px] text-gray-500 mb-4">
              <strong>July 2025—January 2026</strong> — San Francisco, CA
            </p>
            <ul className="space-y-3">
              <li className="flex gap-3">
                <span className="text-green-600 text-[8px] mt-2">●</span>
                <span className="text-[15px] leading-[1.7] text-gray-700">
                  Led UX design and research for CWPC platform including donate feature system, community scorecard, sponsorship packages, authentication flows, and design system with 200+ WCAG-compliant components. Collaborated with fire officials, community leaders, engineering, marketing, and executive teams through stakeholder workshops and usability testing to design Scorecard and donation platform through A/B testing, achieving 85% task success rate, 32% conversion increase, 25% recurring contributions, and improved onboarding completion from 60% to 82%
                </span>
              </li>
            </ul>
          </div>


          {/* UofM-GSI */}
          <div className="mb-10">
            <h3 className="text-[15px] text-gray-900 mb-1">
              <strong>University of Michigan</strong>, Graudate Student Instructor (GSI)<br />SI 364 – Building Data-Driven Applications
            </h3>
            <p className="text-[13px] text-gray-500 mb-4">
              <strong>August 2023—May 2024</strong> — Ann Arbor, MI
            </p>
            <ul className="space-y-3">
              <li className="flex gap-3">
                <span className="text-green-600 text-[8px] mt-2">●</span>
                <span className="text-[15px] leading-[1.7] text-gray-700">
                  Taught foundational web development to 238 students covering Python, Django, HTML, CSS, SQL, and API integrations through structured lab sessions, office hours, and individualized debugging support. Collaborating with lead instructor and teaching team, guided students through full-stack application development using MVC pattern and ORM, explaining RESTful API design, data normalization, and authentication principles through hands-on problem-solving.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-green-600 text-[8px] mt-2">●</span>
                <span className="text-[15px] leading-[1.7] text-gray-700">
                  Helped 90% of students successfully deploy Django applications with proper database models and authentication, with class achieving 15% higher average project scores compared to previous semester through structured debugging methodology and detailed code review feedback.
                </span>
              </li>
            </ul>
          </div>

          {/* General Motors */}
          <div className="mb-10">
            <h3 className="text-[15px] text-gray-900 mb-1">
              <strong>General Motors</strong>, Product Designer<br />UMSI x GM collaboration. 
            </h3>
            <p className="text-[13px] text-gray-500 mb-4">
              <strong>January 2024—May 2024</strong> — Ann Arbor, MI
            </p>
            <ul className="space-y-3">
              <li className="flex gap-3">
                <span className="text-green-600 text-[8px] mt-2">●</span>
                <span className="text-[15px] leading-[1.7] text-gray-700">
                  Designed AI-enhanced luxury infotainment interfaces for high-performance driving balancing AI capabilities with NHTSA compliance. Collaborated with engineering, product managers, and safety specialists through design sprints and usability testing with 50+ participants across 3 iterations, achieving 85% task success rate and 30% reduction in user interactions while maintaining compliance standards.
                </span>
              </li>
            </ul>
          </div>


          {/* TUG */}
          <div className="mb-10">
            <h3 className="text-[15px] text-gray-900 mb-1">
              <strong>The Understanding Group (TUG)</strong>, Information Architect Intern
            </h3>
            <p className="text-[13px] text-gray-500 mb-4">
              <strong>July 2023—December 2023</strong> — Ann Arbor, MI
            </p>
            <ul className="space-y-3">
              <li className="flex gap-3">
                <span className="text-green-600 text-[8px] mt-2">●</span>
                <span className="text-[15px] leading-[1.7] text-gray-700">
                  Conducted IA research across 15+ clients in healthcare, retail, and financial services, creating wireframes, site maps, and content taxonomies. Led card sorting and tree testing with 150+ participants, delivering 8 strategic deliverables that shaped client digital experiences.

                </span>
              </li>
            </ul>
          </div>
        </div>

          {/* UofM-GSI */}
          <div className="mb-10">
            <h3 className="text-[15px] text-gray-900 mb-1">
              <strong>University of Michigan</strong>, Graudate Student Instructor (GSI)<br />SI 658 – Information Architecture
            </h3>
            <p className="text-[13px] text-gray-500 mb-4">
              <strong>January 2023—May 2023</strong> — Ann Arbor, MI
            </p>
            <ul className="space-y-3">
              <li className="flex gap-3">
                <span className="text-green-600 text-[8px] mt-2">●</span>
                <span className="text-[15px] leading-[1.7] text-gray-700">
                  Facilitated information architecture workshops for graduate students, guiding analysis of real-world objects to understand IA principles including thingness, ontological granularity, and worldhood through weekly modeling exercises. Collaborating with lead instructor, broke down complex theoretical readings from Heidegger, Bogost, and Garrett into applied concepts, led small-group discussions, and provided individualized feedback on relational models helping students connect abstract IA theory to practical application. Students achieved 85% improvement in modeling complexity across the semester, with final projects demonstrating sophisticated understanding of context-dependent meaning and structural thinking applicable to digital information systems.
                </span>
              </li>
            </ul>
          </div>

        {/* BoundInt */}
          <div className="mb-10">
            <h3 className="text-[15px] text-gray-900 mb-1">
              <strong>Bound International</strong>, UX Researcher & Designer
            </h3>
            <p className="text-[13px] text-gray-500 mb-4">
              <strong>January 2023—May 2023</strong> — Ann Arbor, MI
            </p>
            <ul className="space-y-3">
              <li className="flex gap-3">
                <span className="text-green-600 text-[8px] mt-2">●</span>
                <span className="text-[15px] leading-[1.7] text-gray-700">
                  Led end-to-end UX research and redesign for study abroad platform serving 10,000+ prospective students annually, conducting stakeholder interviews, surveys, heuristic evaluation, and competitive analysis of 6 platforms to identify navigation barriers and content discoverability issues. Collaborating with Bound International product team and conducting usability testing with 5 study abroad students plus 15 additional remote participants, diagnosed 5 critical usability issues through Nielsen's heuristic principles and developed redesigned information architecture with streamlined navigation, search functionality, and mobile-responsive layouts. Delivered comprehensive redesign specifications and interactive prototypes making key program information 40% faster to locate, with recommendations adopted for Q2 2023 implementation addressing mobile usability issues affecting 65% of traffic.
                </span>
              </li>
            </ul>
          </div>

        {/* NCID */}
          <div className="mb-10">
            <h3 className="text-[15px] text-gray-900 mb-1">
              <strong>University of Michigan College of Literature, Science, and the Arts</strong><br />NCID: Spark Publications <br />User Experience Researcher
            </h3>
            <p className="text-[13px] text-gray-500 mb-4">
              <strong>August 2022—December 2022</strong> — Ann Arbor, MI
            </p>
            <ul className="space-y-3">
              <li className="flex gap-3">
                <span className="text-green-600 text-[8px] mt-2">●</span>
                <span className="text-[15px] leading-[1.7] text-gray-700">
                  Led comprehensive UX research initiative for NCID: Spark Publications editorial platform, conducting contextual inquiry across 50+ hours of workflow observation to identify automation opportunities and collaboration inefficiencies. Collaborating with editors, content strategists, and operations teams, designed and facilitated 15 semi-structured interviews, utilized affinity diagramming to synthesize 250+ qualitative insights, and mapped complete editorial workflows revealing that redundant manual tasks consumed 40% of project time and collaboration tool gaps caused 15-20% publishing delays. Developed journey maps, wireframes, and interactive prototypes demonstrating AI-assisted content tagging and centralized editorial dashboard with real-time versioning, presenting comprehensive research report with implementation roadmap to executive stakeholders, with Phase 1 recommendations (improved search and automated approvals) prioritized for 2023 Q1 development reducing projected editorial bottlenecks by 35%.
                </span>
              </li>
            </ul>
          </div>

        {/* Raseethealth */}
          <div className="mb-10">
            <h3 className="text-[15px] text-gray-900 mb-1">
              <strong>Kryptonas Innovations</strong>, Product Designer
            </h3>
            <p className="text-[13px] text-gray-500 mb-4">
              <strong>February 2020—June 2022</strong> — Noida, India
            </p>
            <ul className="space-y-3">
              <li className="flex gap-3">
                <span className="text-green-600 text-[8px] mt-2">●</span>
                <span className="text-[15px] leading-[1.7] text-gray-700">
                  Responsible for 0-to-1 design of e-pharmacy platform including onboarding, prescription management, checkout, MedScope design system with 60+ components, chronic care management, payment optimization, and pharmacy dashboards. Collaborating with co-founders, engineering, pharmacy partners, and medical advisors, grew platform from 0 to 10,000+ users with 68% retention, reducing prescription upload drop-off by 40%, and achieving 45% LTV increase.
                </span>
              </li>
            </ul>
          </div>
      
        {/* BEL */}
          <div className="mb-10">
            <h3 className="text-[15px] text-gray-900 mb-1">
              <strong>Bharat Electronics Limited</strong>, Electronics Systems Intern
            </h3>
            <p className="text-[13px] text-gray-500 mb-4">
              <strong>July 2017—November 2017</strong> — Pune, Maharashtra, India
            </p>
            <ul className="space-y-3">
              <li className="flex gap-3">
                <span className="text-green-600 text-[8px] mt-2">●</span>
                <span className="text-[15px] leading-[1.7] text-gray-700">
                  Worked as electronics engineering intern across production, quality assurance, and procurement departments at India’s leading defense electronics manufacturer. Collaborating with senior engineers and production teams, rotated through multiple divisions to understand end-to-end manufacturing workflows including railway systems, platform sliding doors, and cable assembly operations. Learned technical design tools including ActCAD and SolidWorks for component design, participated in site visits to observe production processes, and gained understanding of procurement cycles, tendering procedures, and quality assurance protocols for defense-grade electronics systems.
                </span>
              </li>
            </ul>
          </div>


        {/* AWARDS & FEATURES Section */}
        {/* <div className="mb-16">
          <h2 className="text-[11px] tracking-wide text-gray-400 mb-8">
            AWARDS & FEATURES
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-[15px] text-gray-900 mb-2">
                <strong>Apps at Glance's</strong> Top 10 Creative Apps
              </h3>
              <p className="text-[13px] text-gray-500 mb-3">
                <strong>April 30 to June</strong> (at "Player's special)
              </p>
              <p className="text-[15px] leading-[1.7] text-gray-700">
                Our New Glance App made in general (week) as part of new glance allocation of four features.
              </p>
            </div>

            <div>
              <h3 className="text-[15px] text-gray-900 mb-2">
                <strong>Star New Apps Of 2024</strong> — E-award (Europe)
              </h3>
              <p className="text-[13px] text-gray-500">
                <strong>See it online</strong> at <a href="#" className="text-gray-900 underline">Ideo Awards</a>
              </p>
            </div>

            <div>
              <h3 className="text-[15px] text-gray-900 mb-2">
                <strong>Top 5 online Of Shelter</strong> — at ideo online (Apple)
              </h3>
              <p className="text-[13px] text-gray-500">
                <strong>Silver Near Apps for</strong> <a href="#" className="text-gray-900 underline">Apple Storeside</a>
              </p>
            </div>

            <div>
              <h3 className="text-[15px] text-gray-900 mb-2">
                <strong>About Apps of 2024</strong> — in E-based (Europe)
              </h3>
              <p className="text-[13px] text-gray-500">
                <strong>See online</strong> at <a href="#" className="text-gray-900 underline">E-based Europe</a>
              </p>
            </div>

            <div>
              <h3 className="text-[15px] text-gray-900 mb-2">
                <strong>AppMotion, Version 2018</strong> — by content (UIKIT)
              </h3>
              <p className="text-[13px] text-gray-500">
                <strong>Military Spectrum Place 18</strong> at <a href="#" className="text-gray-900 underline">Angular 2018</a>
              </p>
            </div>

            <div>
              <h3 className="text-[15px] text-gray-900 mb-2">
                <strong>UX International Of</strong> at with Reading per-family
              </h3>
              <p className="text-[13px] text-gray-500">
                <strong>On International Of</strong> in with Reading group
              </p>
            </div>
          </div>
        </div> */}

        {/* EDUCATION Section */}
        <div className="mb-16">
          <h2 className="text-[11px] tracking-wide text-gray-400 mb-8">
            EDUCATION
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-[15px] text-gray-900 mb-1">
                <strong>University of Michigan</strong><br />School of Information
              </h3>
              <p className="text-[13px] text-gray-500">
                {/* Guest free Society of Design (Art Visual Arts)<br /> */}
                <strong>Master of Science in Information (MSI) – User Experience (UX), and Human-Computer Interaction (HCI) </strong>
              </p>
            </div>
          </div>
        </div>

        {/* TEACHING EXPERIENCE Section */}
        <div className="mb-16">
          <h2 className="text-[11px] tracking-wide text-gray-400 mb-8">
            TEACHING EXPERIENCE
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-[15px] text-gray-900 mb-1">
                <strong>University of Michigan, School of Information</strong> | Ann Arbor, MI | Jul 2023 - May 2024<br />
                Graduate Student Instructor (GSI) | SI 364 – Building Data-Driven Applications
              </h3>
              <ul className="space-y-3 mt-4">
                <li className="flex gap-3">
                  <span className="text-green-600 text-[8px] mt-2">●</span>
                  <span className="text-[15px] leading-[1.7] text-gray-700">
                    Facilitated bi-weekly discussion sections, a course with an average enrollment of 80 undergraduate students
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-green-600 text-[8px] mt-2">●</span>
                  <span className="text-[15px] leading-[1.7] text-gray-700">
                    Graded assignments and exams promptly and provided one-on-one assistance to students during office hours, maintaining a turnaround time of 48 hours and ensuring timely feedback for student improvement
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-[15px] text-gray-900 mb-1">
                <strong>University of Michigan, School of Information</strong> | Ann Arbor, MI | Jan 2023 - May 2023<br />
                Graduate Student Instructor (GSI) | SI 658 – Information Architecture
              </h3>
              <ul className="space-y-3 mt-4">
                <li className="flex gap-3">
                  <span className="text-green-600 text-[8px] mt-2">●</span>
                  <span className="text-[15px] leading-[1.7] text-gray-700">
                    Advocated in the refinement of course materials and assessments, resulting in a 20% improvement in student performance based on midterm evaluations
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-green-600 text-[8px] mt-2">●</span>
                  <span className="text-[15px] leading-[1.7] text-gray-700">
                    Offered personalized guidance during office hours, contributing to a 10% increase in students' confidence in tackling complex information architecture projects
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* SKILLS Section */}
        <div className="mb-16">
          <h2 className="text-[11px] tracking-wide text-gray-400 mb-8">
            SKILLS
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-[15px] text-gray-900 mb-3">
                <strong>UX Design & Research Skills:</strong>
              </h3>
              <p className="text-[15px] leading-[1.7] text-gray-700">
                A/B Testing, Affinity Mapping, Cognitive Ergonomics, Competitor Analysis, Contextual Inquiry, Design Thinking, Design Systems, Empathy Mapping, Ethnography, Heuristic Evaluation, Ideation Workshops, Information Architecture, Interaction Design, Journey Mapping, Persona, Prototyping, Qualitative Research, Quantitative Research, Rapid Prototyping, Responsive Design, Storyboarding, UI Design, Visual Design, Wireframing
              </p>
            </div>

            <div>
              <h3 className="text-[15px] text-gray-900 mb-3">
                <strong>UX Tools:</strong>
              </h3>
              <p className="text-[15px] leading-[1.7] text-gray-700">
                Adobe Creative Suite, Aero, Illustrator, Photoshop, Adobe XD, AfterEffects, Axure, Bezi, FigJam, Figma, Framer, Invision, Meta Spark Studio, Miro, Omnigraffle, Sketch, Snapchat Lens Studio, Unity, UserTesting.com, Webflow, Wireframe.cc, Accessibility Guidelines, Web Standards (W3C)
              </p>
            </div>

            <div>
              <h3 className="text-[15px] text-gray-900 mb-3">
                <strong>Project Management Frameworks/Tools:</strong>
              </h3>
              <p className="text-[15px] leading-[1.7] text-gray-700">
                Agile Methodologies, AWS Management, JIRA, Reetro, Scrum, Trello
              </p>
            </div>

            <div>
              <h3 className="text-[15px] text-gray-900 mb-3">
                <strong>Programming Languages:</strong>
              </h3>
              <p className="text-[15px] leading-[1.7] text-gray-700">
                Bootstrap, HTML5, CSS3, JavaScript, Python, React, GitHub, MySQL, Oracle, Xcode
              </p>
            </div>
          </div>
        </div>

        {/* RESEARCH EXPERIENCE Section */}
        <div className="mb-16">
          <h2 className="text-[11px] tracking-wide text-gray-400 mb-8">
            RESEARCH EXPERIENCE
          </h2>

          <div className="space-y-4 mb-6">
            <div className="flex flex-wrap gap-4">
              <a 
                href="https://ieeexplore.ieee.org/author/37088553575" 
                className="text-blue-600 hover:text-blue-800 text-[15px] underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                IEEE Xplore Profile
              </a>
              <a 
                href="https://link.springer.com/search?dc.creator=Hrithik%20Sanyal" 
                className="text-blue-600 hover:text-blue-800 text-[15px] underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Springer Profile
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-[15px] leading-[1.7] text-gray-700">
                [1]. <strong>H. Sanyal</strong>, S. Shukla and R. Agrawal, "Study of Depression Detection using Deep Learning," 2021 IEEE International Conference on Consumer Electronics (ICCE), Las Vegas, NV, USA, 2021, pp. 1-5, doi: 10.1109/ICCE50685.2021.9427624.
              </p>
            </div>

            <div>
              <p className="text-[15px] leading-[1.7] text-gray-700">
                [2]. <strong>H. Sanyal</strong>, S. Shukla, and R. Agrawal, "Natural Language Processing Technique for Generation of SQL Queries Dynamically," 2021 6th International Conference for Convergence in Technology (I2CT), Maharashtra, India, 2021, pp. 1-6, doi: 10.1109/I2CT51068.2021.9418091.
              </p>
            </div>

            <div>
              <p className="text-[15px] leading-[1.7] text-gray-700">
                [3]. S. Shukla, <strong>H. Sanyal</strong> and R. Agrawal, "Use of SLAM Technology to Enhance Performance & Accuracy of Bots," 2020 2nd International Conference on Advances in Computing, Communication Control and Networking (ICACCCN), Greater Noida, India, 2020, pp. 699-704, doi: 10.1109/ICACCCN51052.2020.9362944.
              </p>
            </div>

            <div>
              <p className="text-[15px] leading-[1.7] text-gray-700">
                [4]. P. Saxena and <strong>H. Sanyal</strong>, "Improved Rules and Authorization Key Processing for Secured Online Training," 2020 4th International Conference on Electronics, Communication and Aerospace Technology (ICECA), Coimbatore, India, 2020, pp. 690-694, doi: 10.1109/ICECA49313.2020.9297463.
              </p>
            </div>

            <div>
              <p className="text-[15px] leading-[1.7] text-gray-700">
                [5]. Sanyal, <strong>H.</strong>, Saxena, P., Agrawal, R. (2021). Enhanced Accuracy in Machine Learning Using Feature Set Bifurcation. In: Gunjan, V.K., Suganthan, P.N., Haase, J., Kumar, A. (eds) Cybernetics, Cognition and Machine Learning Applications. Algorithms for Intelligent Systems. Springer, Singapore. https://doi.org/10.1007/978-981-33-6691-6_46
              </p>
            </div>

            <div>
              <p className="text-[15px] leading-[1.7] text-gray-700">
                [6]. Sanyal, <strong>H.</strong>, Agrawal, R. (2021). Study of Holoportation: Using Network Errors for Improving Accuracy and Efficiency. In: Shakya, S., Balas, V.E., Haoxiang, W., Baig, Z. (eds) Proceedings of International Conference on Sustainable Expert Systems. Lecture Notes in Networks and Systems, vol 176. Springer, Singapore. https://doi.org/10.1007/978-981-33-4355-9_9
              </p>
            </div>
          </div>
        </div>

        {/* CERTIFICATIONS Section */}
        <div className="mb-16">
          <h2 className="text-[11px] tracking-wide text-gray-400 mb-8">
            CERTIFICATIONS
          </h2>

          <div className="space-y-3">
            {/* Replace the href="#" on each line with your credential URL */}
            <div>
              <a href="https://www.coursera.org/account/accomplishments/specialization/94Z5HK3665M5" target="_blank" rel="noopener noreferrer" onClick={handleCertClick} className="text-[15px] leading-[1.7] text-gray-700 hover:text-blue-600 transition-colors block cursor-pointer">
                • <strong>Google Project Management: Professional Certificate</strong>
              </a>
            </div>
            <div>
              <a href="https://www.coursera.org/account/accomplishments/specialization/BUHZNEZ7YDA7" target="_blank" rel="noopener noreferrer" onClick={handleCertClick} className="text-[15px] leading-[1.7] text-gray-700 hover:text-blue-600 transition-colors block cursor-pointer">
                • <strong>Google UX Design Professional Certificate</strong>
              </a>
            </div>
            <div>
              <a href="https://www.coursera.org/account/accomplishments/verify/VWPPBD8GUSEW?utm_source=link&utm_medium=certificate&utm_content=cert_image&utm_campaign=pdf_header_button&utm_product=course" target="_blank" rel="noopener noreferrer" onClick={handleCertClick} className="text-[15px] leading-[1.7] text-gray-700 hover:text-blue-600 transition-colors block cursor-pointer">
                • <strong>Google AI Essentials</strong>
              </a>
            </div>
            <div>
              <a href="https://www.coursera.org/account/accomplishments/verify/ZLG5TBFNNRL2?utm_source=link&utm_medium=certificate&utm_content=cert_image&utm_campaign=pdf_header_button&utm_product=course" target="_blank" rel="noopener noreferrer" onClick={handleCertClick} className="text-[15px] leading-[1.7] text-gray-700 hover:text-blue-600 transition-colors block cursor-pointer">
                • <strong>Google Introduction to Generative AI</strong>
              </a>
            </div>
            <div>
              <a href="https://www.coursera.org/account/accomplishments/specialization/P3FUPYV6LFKD?utm_source=link&utm_medium=certificate&utm_content=cert_image&utm_campaign=pdf_header_button&utm_product=s12n" target="_blank" rel="noopener noreferrer" onClick={handleCertClick} className="text-[15px] leading-[1.7] text-gray-700 hover:text-blue-600 transition-colors block cursor-pointer">
                • <strong>Google Introduction to Generative AI Learning Path Specialization</strong>
              </a>
            </div>
            <div>
              <a href="https://www.coursera.org/account/accomplishments/verify/2APBTE296DZ5" target="_blank" rel="noopener noreferrer" onClick={handleCertClick} className="text-[15px] leading-[1.7] text-gray-700 hover:text-blue-600 transition-colors block cursor-pointer">
                • <strong>Google Introduction to Git and GitHub</strong>
              </a>
            </div>
            <div>
              <a href="https://www.coursera.org/account/accomplishments/verify/PZW5J6DELJL3?utm_source=link&utm_medium=certificate&utm_content=cert_image&utm_campaign=sharing_cta&utm_product=course" target="_blank" rel="noopener noreferrer" onClick={handleCertClick} className="text-[15px] leading-[1.7] text-gray-700 hover:text-blue-600 transition-colors block cursor-pointer">
                • <strong>Google Introduction to Large Language Models</strong>
              </a>
            </div>
            <div>
              <a href="https://www.coursera.org/account/accomplishments/verify/ZMBD2SW8U68X?utm_source=link&utm_medium=certificate&utm_content=cert_image&utm_campaign=pdf_header_button&utm_product=course" target="_blank" rel="noopener noreferrer" onClick={handleCertClick} className="text-[15px] leading-[1.7] text-gray-700 hover:text-blue-600 transition-colors block cursor-pointer">
                • <strong>Meta: Version Control</strong>
              </a>
            </div>
            <div>
              <a href="https://www.coursera.org/account/accomplishments/verify/TEMBCEPGED5B" target="_blank" rel="noopener noreferrer" onClick={handleCertClick} className="text-[15px] leading-[1.7] text-gray-700 hover:text-blue-600 transition-colors block cursor-pointer">
                • <strong>Meta: What is the Metaverse?</strong>
              </a>
            </div>
            <div>
              <a href="https://www.coursera.org/account/accomplishments/verify/GTLB4DXA9NFF" target="_blank" rel="noopener noreferrer" onClick={handleCertClick} className="text-[15px] leading-[1.7] text-gray-700 hover:text-blue-600 transition-colors block cursor-pointer">
                • <strong>Meta: Foundations of AR</strong>
              </a>
            </div>
            <div>
              <a href="https://www.coursera.org/account/accomplishments/verify/SCPSBB974SCW?utm_source=link&utm_medium=certificate&utm_content=cert_image&utm_campaign=pdf_header_button&utm_product=course" target="_blank" rel="noopener noreferrer" onClick={handleCertClick} className="text-[15px] leading-[1.7] text-gray-700 hover:text-blue-600 transition-colors block cursor-pointer">
                • <strong>University of Virginia: Digital Product Management: Modern Fundamentals</strong>
              </a>
            </div>
            <div>
              <a href="chrome-extension://efaidnbmnnnibpcajpcglclefindmkaj/https://www.datacamp.com/statement-of-accomplishment/course/d2001e314eec951aebd134c8ece8491fc9a804ba?raw=1" target="_blank" rel="noopener noreferrer" onClick={handleCertClick} className="text-[15px] leading-[1.7] text-gray-700 hover:text-blue-600 transition-colors block cursor-pointer">
                • <strong>DataCamp: Introduction to Python</strong>
              </a>
            </div>
          </div>
        </div>
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
      <ScrollToTop />
    </div>
  );
}