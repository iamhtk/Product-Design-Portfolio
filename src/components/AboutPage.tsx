import { Linkedin, Youtube, Instagram, Facebook } from 'lucide-react';
import { ScrollToTop } from './ScrollToTop';

export function AboutPage() {
  const images = [
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&q=80',
    'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
    'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80'
  ];

  return (
    <div className="min-h-screen bg-white pt-20 pb-12">
      <ScrollToTop />
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="pt-20 pb-12">
          <h1 className="text-[32px] md:text-[42px] leading-[1.2] text-gray-900 mb-8">
            About Hrithik Sanyal
          </h1>
          <p className="text-[15px] leading-[1.7] text-gray-700 mb-6">
          I'm a Product Designer with 5+ years of industry experience. I specialize in applying design thinking to break down complex problems and craft helpful experiences.
          A Master's graduate in HCI/UX Design from the University of Michigan, School of Information, 
          I've been learning from and collaborating with some of the best minds on the planet.
          <br/>
          {/* <br/>
          Currently, open to full time Product/UX Design roles. */}
          </p>
        </div>

        {/* Image 1 */}
        <div className="mb-16 flex justify-center">
          <div className="w-full max-w-[800px] h-[400px] overflow-hidden rounded-lg">
            <img 
              src={"/about/more/IMG_3957.jpg"}
              alt="Workspace"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Content Section 1 */}
        <div className="mb-16">
          <h2 className="text-[17px] text-gray-900 mb-4 font-medium">
            CURRENTLY
          </h2>
          <p className="text-[15px] leading-[1.7] text-gray-700 mb-6">
            I'm currently a  Product Designer at <a href="#" className="text-gray-900 underline">IBM</a>, where I work 
            on consumer-facing products that reach millions of users worldwide. Before joining IBM, 
            I graduated from the University of Michigan's School of Information (#GoBlue💙), specializing in UX Design & Research and Human-Computer Interaction. My background in Electronics & Telecommunications gives me a unique edge in understanding and crafting interactions between people and technology.

          </p>
          <p className="text-[15px] leading-[1.7] text-gray-700">
          During my school at Umich, I was a Graduate Student Instructor (GSI), where I taught SI 364: Building Data-Driven Applications under Prof. Charles Severance (Dr. Chuck!!). and SI 658: Information Architecture under Prof. Dan Klyn. These experiences have allowed me to deepen my understanding of both programming and design, as well as mentor students in these fields.
          </p>
          <p className="text-[15px] leading-[1.7] text-gray-700">
          Outside of academia, I produce music, cook, and am learning Classical Piano. I am passionate about exploring different cuisines and enhancing my culinary skills. As a self-taught designer, I enjoy creating simple and effective solutions for complex systems and currently work as a freelancer, helping product teams build enjoyable user experiences. 
          </p>
        </div>

        {/* Images Grid */}
        <div className="grid grid-cols-2 gap-6 mb-16">
          <div className="w-full h-[400px] overflow-hidden rounded-lg">
            <img 
              src={"/about/more/Untitled.PNG"}
              alt="Team collaboration"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-full h-[400px] overflow-hidden rounded-lg">
            <img 
              src={"/about/more/IMG_3962.png"}
              alt="Design work"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        {/* Images Grid */}
        <div className="grid grid-cols-2 gap-6 mb-16">
          <div className="w-full h-[400px] overflow-hidden rounded-lg">
            <img 
              src={"/about/more/Untitled2.PNG"}
              alt="Team collaboration"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-full h-[400px] overflow-hidden rounded-lg">
            <img 
              src={"/about/more/IMG_9458.jpg"}
              alt="Design work"
              className="w-full h-full object-cover"
            />
          </div>
          
        </div>
        
        {/* Image 2 */}
        <div className="mb-16">
          <img 
            src={"/about/more/IMG_9612.png"}
            alt="Presentation"
            className="w-full h-auto rounded-lg"
          />
        </div>
        "/about/more/IMG_9612.png"
        {/* Images Grid */}
        <div className="grid grid-cols-2 gap-6 mb-16">
          <img 
            src={images[2]}
            alt="Team collaboration"
            className="w-full h-auto rounded-lg"
          />
          <img 
            src={images[3]}
            alt="Design work"
            className="w-full h-auto rounded-lg"
          />
        </div>
        
        {/* Content Section 2 */}
        {/* <div className="mb-16">
          <h2 className="text-[17px] text-gray-900 mb-4 font-medium">
            BACKGROUND
          </h2>
          <p className="text-[15px] leading-[1.7] text-gray-700 mb-6">
            I've been in tech for over 9 years now, and it's been quite a ride. I studied Communication 
            Design at Washington University in St. Louis, which gave me a strong foundation in visual 
            communication, typography, and design thinking. Since then, I've grown from a junior designer 
            to leading design initiatives at some of the world's most recognizable brands.
          </p>
          <p className="text-[15px] leading-[1.7] text-gray-700">
            My approach blends user research, strategic thinking, and hands-on design craft. I believe 
            the best products come from deep empathy with users, close collaboration with cross-functional 
            teams, and relentless iteration based on feedback and data.
          </p>
        </div> */}

        {/* Images Grid */}
        <div className="grid grid-cols-2 gap-6 mb-16">
          <img 
            src={images[2]}
            alt="Team collaboration"
            className="w-full h-auto rounded-lg"
          />
          <img 
            src={images[3]}
            alt="Design work"
            className="w-full h-auto rounded-lg"
          />
        </div>

        {/* Content Section 3 */}
        {/* <div className="mb-20">
          <h2 className="text-[17px] text-gray-900 mb-4 font-medium">
            PHILOSOPHY
          </h2>
          <p className="text-[15px] leading-[1.7] text-gray-700 mb-6">
            I believe design is about solving problems, not just making things look pretty. Great design 
            is invisible—it anticipates user needs, removes friction, and creates moments of delight 
            without calling attention to itself.
          </p>
          <p className="text-[15px] leading-[1.7] text-gray-700">
            I'm passionate about mentorship and giving back to the design community. I regularly speak 
            at design conferences, conduct portfolio reviews for aspiring designers, and contribute to 
            open-source design resources.
          </p>
        </div> */}

        {/* My Toolset Section */}
        <div className="mb-20">
          {/* Section Header with 3-column layout */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr_1fr] gap-8 md:gap-12 mb-16">
            {/* Left Column - Title */}
            <div>
              <h2 className="text-[28px] md:text-[32px] leading-[1.2] text-gray-900">
                My toolset across design and engineering
              </h2>
            </div>
            
            {/* Middle Column - Description 1 */}
            <div>
              <p className="text-[14px] md:text-[15px] leading-[1.7] text-gray-700">
                Here's a general look at the tools and technologies I enjoy using in my line of work as a designer and engineer. As a curious person by nature, I find that there's too much to learn and simply not enough time.
              </p>
            </div>
            
            {/* Right Column - Description 2 */}
            <div>
              <p className="text-[14px] md:text-[15px] leading-[1.7] text-gray-700">
                Highly valuing the technical craft and precision this interdisciplinary field of work can require, I genuinely enjoy my efforts spent in this space.
              </p>
            </div>
          </div>

          {/* Tools Grid - Design Tools */}
          <div className="space-y-0 mb-12 md:pl-[33%]">
            {[
              { tool: 'Figma', category: 'User Interface', link: 'https://figma.com', displayLink: 'Figma.com' },
              { tool: 'Protopie', category: 'Prototyping', link: 'https://protopie.io', displayLink: 'Protopie.io' },
              { tool: 'Play', category: 'iOS Prototyping', link: 'https://createwithplay.com', displayLink: 'Createwithplay.com' },
              { tool: 'Adobe Suite', category: 'Design Tools', link: 'https://adobe.com', displayLink: 'Adobe.com' },
              { tool: 'Blender', category: '3D Modeling', link: 'https://blender.org', displayLink: 'Blender.org' },
            ].map((item, index) => (
              <a
                key={index}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="grid grid-cols-[1fr_auto] md:grid-cols-[1fr_1.2fr_1fr_auto] gap-3 md:gap-8 py-4 md:py-5 border-b border-gray-200 hover:bg-gray-50 transition-colors group cursor-pointer items-start md:items-center no-underline"
              >
                <div className="text-[14px] md:text-[15px] text-gray-900">{item.tool}</div>
                <div className="text-[14px] md:text-[15px] text-gray-500 hidden md:block">{item.category}</div>
                <div className="text-[14px] md:text-[15px] text-gray-400 group-hover:underline truncate">{item.displayLink}</div>
                <div className="text-gray-400">→</div>
              </a>
            ))}
          </div>

          {/* Tools Grid - Dev Environment */}
          <div className="space-y-0 mb-12 md:pl-[33%]">
            {[
              { tool: 'Hyper Terminal', category: 'Command Line', link: 'https://hyper.is', displayLink: 'Hyper.is' },
              { tool: 'Cursor', category: 'Code Editor', link: 'https://cursor.com', displayLink: 'Cursor.com' },
              { tool: 'Firefox Dev', category: 'Browser', link: 'https://mozilla.org', displayLink: 'Mozilla.org' },
              { tool: 'Xcode', category: 'Apple IDE', link: 'https://developer.apple.com', displayLink: 'Developer.apple.com' },
            ].map((item, index) => (
              <a
                key={index}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="grid grid-cols-[1fr_auto] md:grid-cols-[1fr_1.2fr_1fr_auto] gap-3 md:gap-8 py-4 md:py-5 border-b border-gray-200 hover:bg-gray-50 transition-colors group cursor-pointer items-start md:items-center no-underline"
              >
                <div className="text-[14px] md:text-[15px] text-gray-900">{item.tool}</div>
                <div className="text-[14px] md:text-[15px] text-gray-500 hidden md:block">{item.category}</div>
                <div className="text-[14px] md:text-[15px] text-gray-400 group-hover:underline truncate">{item.displayLink}</div>
                <div className="text-gray-400">→</div>
              </a>
            ))}
          </div>

          {/* Tools Grid - Programming Languages */}
          <div className="space-y-0 mb-12 md:pl-[33%]">
            {[
              { tool: 'HTML, CSS & JS', category: 'Programming Languages', link: 'https://developer.mozilla.org', displayLink: 'Developer.mozilla.org' },
              { tool: 'TypeScript', category: 'Programming Language', link: 'https://typescriptlang.org', displayLink: 'Typescriptlang.org' },
              { tool: 'Vue & Nuxt', category: 'JavaScript Frameworks', link: 'https://nuxt.com', displayLink: 'Nuxt.com' },
              { tool: 'React & Next', category: 'JavaScript Frameworks', link: 'https://nextjs.org', displayLink: 'Nextjs.org' },
              { tool: 'Swift', category: 'Programming Language', link: 'https://developer.apple.com', displayLink: 'Developer.apple.com' },
            ].map((item, index) => (
              <a
                key={index}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="grid grid-cols-[1fr_1.2fr_1fr_auto] gap-4 md:gap-8 py-4 md:py-5 border-b border-gray-200 hover:bg-gray-50 transition-colors group cursor-pointer items-center no-underline"
              >
                <div className="text-[14px] md:text-[15px] text-gray-900">{item.tool}</div>
                <div className="text-[14px] md:text-[15px] text-gray-500">{item.category}</div>
                <div className="text-[14px] md:text-[15px] text-gray-400 group-hover:underline">{item.displayLink}</div>
                <div className="text-gray-400">→</div>
              </a>
            ))}
          </div>

          {/* Tools Grid - Productivity & Apps */}
          <div className="space-y-0 md:pl-[33%]">
            {[
              { tool: 'iOS, iPadOS, macOS', category: 'Apple Products', link: 'https://apple.com', displayLink: 'Apple.com' },
              { tool: 'Raycast', category: 'Productivity Tooling', link: 'https://raycast.com', displayLink: 'Raycast.com' },
              { tool: 'Arc Browser', category: 'Browser', link: 'https://arc.net', displayLink: 'Arc.net' },
              { tool: 'Mullvad VPN', category: 'VPN', link: 'https://mullvad.net', displayLink: 'Mullvad.net' },
              { tool: 'Raindrop', category: 'Bookmarking', link: 'https://raindrop.io', displayLink: 'Raindrop.io' },
            ].map((item, index) => (
              <a
                key={index}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="grid grid-cols-[1fr_1.2fr_1fr_auto] gap-4 md:gap-8 py-4 md:py-5 border-b border-gray-200 hover:bg-gray-50 transition-colors group cursor-pointer items-center no-underline"
              >
                <div className="text-[14px] md:text-[15px] text-gray-900">{item.tool}</div>
                <div className="text-[14px] md:text-[15px] text-gray-500">{item.category}</div>
                <div className="text-[14px] md:text-[15px] text-gray-400 group-hover:underline">{item.displayLink}</div>
                <div className="text-gray-400">→</div>
              </a>
            ))}
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