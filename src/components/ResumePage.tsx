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
    <div className="min-h-screen bg-white pt-20 pb-12">
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

        {/* Footer */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-12 pb-8 text-[13px] text-gray-500" data-footer>
          {/* Left - Copyright */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="whitespace-nowrap">Designed and Developed.</span>
            <span>© 2025</span>
          </div>
          
          {/* Right - Social Links */}
          <div className="flex items-center gap-3 md:gap-5">
            <a 
              href="https://www.linkedin.com/in/iamhtk/" 
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
              href="https://instagram.com/hrithiksanyal" 
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
              <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
      <ScrollToTop />
    </div>
  );
}