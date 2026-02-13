// import { useState } from 'react'; // for Me in a grid section
import { Linkedin, Youtube, Instagram, Facebook, Github, Figma /* Sun, Trash2, X - for Me in a grid */ } from 'lucide-react';
import { ScrollToTop } from './ScrollToTop';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { AnimateIn } from './AnimateIn';

export function AboutPage() {
  // const [pixelCount, setPixelCount] = useState(248);
  // const [reduced, setReduced] = useState(false);

  const images = [
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&q=80',
    'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
    'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80'
  ];

  return (
    <div className="min-h-screen pt-20">
      <ScrollToTop />
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        
        {/* Header - unchanged */}
        <AnimateIn variant="up-slow" rootMargin="0px" stagger="stagger-1" className="pt-20 pb-20 md:pb-16">
          <h1 className="text-[32px] md:text-[42px] leading-[1.2] text-gray-900">
            About Hrithik
          </h1>
        </AnimateIn>

        {/* Intro: two columns — left: text, right: image */}
        <AnimateIn variant="up" rootMargin="0px 0px -60px 0px" className="mt-2 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <p className="text-[18px] leading-[1.7] text-gray-700">
                I'm a Product Designer with 5+ years of industry experience. I specialize in applying design thinking to break down complex problems and craft helpful experiences.
                A Master's graduate in HCI/UX Design from the University of Michigan, School of Information,
                I've been learning from and collaborating with some of the best minds on the planet.
              </p>
            </div>
            <div className="w-full min-w-0 overflow-hidden rounded-lg" style={{ maxHeight: 'min(620px, 70vh)' }}>
              <ImageWithFallback
                src={"/about/more/IMG_3957.jpg"}
                alt="Workspace"
                className="w-full h-full object-cover"
                priority
              />
            </div>
          </div>
        </AnimateIn>

        

        {/* Content Section 1 */}
        <AnimateIn variant="up" rootMargin="0px 0px -60px 0px" className="mb-16">
          <h2 className="text-[17px] text-gray-900 mb-4 font-medium">
            CURRENTLY
          </h2>
          <p className="text-[18px] leading-[1.7] text-gray-700 mb-6">
            I'm currently a  Product Designer at <a href="#" onClick={(e) => e.preventDefault()} className="text-gray-900 underline" aria-hidden>CWPC</a>, where I work 
            on consumer-facing products that reach millions of users worldwide. Before joining CWPC, 
            I graduated from the University of Michigan's School of Information (#GoBlue💙), specializing in UX Design & Research and Human-Computer Interaction. My background in Electronics & Telecommunications gives me a unique edge in understanding and crafting interactions between people and technology.

          </p>
          <p className="text-[18px] leading-[1.7] text-gray-700">
          During my school at Umich, I was a Graduate Student Instructor (GSI), where I taught SI 364: Building Data-Driven Applications under Prof. Charles Severance (Dr. Chuck!!). and SI 658: Information Architecture under Prof. Dan Klyn. These experiences have allowed me to deepen my understanding of both programming and design, as well as mentor students in these fields.
          </p>
          <p className="text-[18px] leading-[1.7] text-gray-700">
          Outside of academia, I produce music, cook, and am learning Classical Piano. I am passionate about exploring different cuisines and enhancing my culinary skills. As a self-taught designer, I enjoy creating simple and effective solutions for complex systems and currently work as a freelancer, helping product teams build enjoyable user experiences. 
          </p>
        </AnimateIn>

        {/* Images Grid */}
        <AnimateIn variant="scale" className="grid grid-cols-2 gap-6 mb-16">
          <div className="w-full h-[400px] overflow-hidden rounded-lg">
            <ImageWithFallback 
              src={"/about/more/Untitled.PNG"}
              alt="Team collaboration"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-full h-[400px] overflow-hidden rounded-lg">
            <ImageWithFallback 
              src={"/about/more/IMG_3962.png"}
              alt="Design work"
              className="w-full h-full object-cover"
            />
          </div>
        </AnimateIn>
        
        {/* Images Grid */}
        <AnimateIn className="grid grid-cols-2 gap-6 mb-16">
          <div className="w-full h-[400px] overflow-hidden rounded-lg">
            <ImageWithFallback 
              src={"/about/more/Untitled2.PNG"}
              alt="Team collaboration"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-full h-[400px] overflow-hidden rounded-lg">
            <ImageWithFallback 
              src={"/about/more/IMG_9458.jpg"}
              alt="Design work"
              className="w-full h-full object-cover"
            />
          </div>
          
        </AnimateIn>
        
        {/* Image 2 */}
        <AnimateIn variant="fade" className="mb-16">
          <ImageWithFallback 
            src={"/about/more/IMG_9612.png"}
            alt="Presentation"
            className="w-full h-auto rounded-lg"
          />
        </AnimateIn>
        {/* Images Grid */}
        <AnimateIn className="grid grid-cols-2 gap-6 mb-16">
          {/* <img 
            src={images[2]}
            alt="Team collaboration"
            className="w-full h-auto rounded-lg"
          />
          <img 
            src={images[3]}
            alt="Design work"
            className="w-full h-auto rounded-lg"
          /> */}
        </AnimateIn>
        
        {/* Content Section 2 */}
        {/* <div className="mb-16">
          <h2 className="text-[17px] text-gray-900 mb-4 font-medium">
            BACKGROUND
          </h2>
          <p className="text-[18px] leading-[1.7] text-gray-700 mb-6">
            I've been in tech for over 9 years now, and it's been quite a ride. I studied Communication 
            Design at Washington University in St. Louis, which gave me a strong foundation in visual 
            communication, typography, and design thinking. Since then, I've grown from a junior designer 
            to leading design initiatives at some of the world's most recognizable brands.
          </p>
          <p className="text-[18px] leading-[1.7] text-gray-700">
            My approach blends user research, strategic thinking, and hands-on design craft. I believe 
            the best products come from deep empathy with users, close collaboration with cross-functional 
            teams, and relentless iteration based on feedback and data.
          </p>
        </div> */}

        {/* Images Grid */}
        {/* <div className="grid grid-cols-2 gap-6 mb-16">
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
        </div> */}

        {/* Content Section 3 */}
        {/* <div className="mb-20">
          <h2 className="text-[17px] text-gray-900 mb-4 font-medium">
            PHILOSOPHY
          </h2>
          <p className="text-[18px] leading-[1.7] text-gray-700 mb-6">
            I believe design is about solving problems, not just making things look pretty. Great design 
            is invisible—it anticipates user needs, removes friction, and creates moments of delight 
            without calling attention to itself.
          </p>
          <p className="text-[18px] leading-[1.7] text-gray-700">
            I'm passionate about mentorship and giving back to the design community. I regularly speak 
            at design conferences, conduct portfolio reviews for aspiring designers, and contribute to 
            open-source design resources.
          </p>
        </div> */}

        {/* Notable numbers - same 3-column grid as My toolset for alignment */}
        <AnimateIn variant="up" rootMargin="0px 0px -60px 0px" className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr_1fr] gap-8 md:gap-12">
            <div>
              <h2 className="text-[11px] tracking-[0.22em] text-gray-400 uppercase font-medium">
                Notable numbers
              </h2>
            </div>
            {/* Left stats column - aligns with "Here's a general look..." */}
            <div className="min-w-0 flex flex-col gap-0">
              <div>
                <div className="text-[44px] md:text-[56px] font-semibold text-gray-900 leading-none mb-2">4</div>
                <p className="text-[18px] md:text-[20px] text-gray-500 leading-relaxed">years of impact</p>
              </div>
              <div className="mt-[7rem] md:mt-[9rem]">
                <div className="text-[44px] md:text-[56px] font-semibold text-gray-900 leading-none mb-2">5+</div>
                <p className="text-[18px] md:text-[20px] text-gray-500 leading-relaxed">industries</p>
              </div>
            </div>
            {/* Right stats column - aligns with "Highly valuing the technical craft..." */}
            <div className="min-w-0 flex flex-col gap-0">
              <div>
                <div className="text-[44px] md:text-[56px] font-semibold text-gray-900 leading-none mb-2">60+</div>
                <p className="text-[18px] md:text-[20px] text-gray-500 leading-relaxed">design sprints</p>
              </div>
              <div className="mt-[7rem] md:mt-[9rem]">
                <div className="text-[44px] md:text-[56px] font-semibold text-gray-900 leading-none mb-2">∞</div>
                <p className="text-[18px] md:text-[20px] text-gray-500 leading-relaxed">coffees</p>
              </div>
            </div>
          </div>
        </AnimateIn>
        
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
              <p className="text-[18px] leading-[1.7] text-gray-700">
                Here's a general look at the tools and technologies I enjoy using in my line of work as a designer and engineer. As a curious person by nature, I find that there's too much to learn and simply not enough time.
              </p>
            </div>
            
            {/* Right Column - Description 2 */}
            <div>
              <p className="text-[18px] leading-[1.7] text-gray-700">
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

        {/* Me in a grid - commented out for now
        <AnimateIn variant="up" rootMargin="0px 0px -60px 0px" className="mb-20">
          <h2 className="text-[11px] tracking-[0.22em] text-gray-400 uppercase font-medium mb-8">
            Me in a grid
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
            <div
              className="rounded-2xl border border-black/[0.06] shadow-[var(--shadow-card)] p-6 text-white flex flex-col justify-between min-h-[200px] order-1"
              style={{ background: 'linear-gradient(180deg, #38bdf8 0%, #0ea5e9 50%, #0284c7 100%)' }}
            >
              <Sun className="w-14 h-14 text-amber-200 shrink-0" aria-hidden />
              <div className="mt-4">
                <div className="text-[44px] md:text-[52px] font-semibold leading-none">17°</div>
                <p className="text-[15px] text-white/95 mt-1">Clear Sky</p>
                <p className="text-[13px] text-white/80 mt-0.5">New York</p>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden border border-black/[0.06] shadow-[var(--shadow-card)] bg-[#121212] min-h-[200px] order-2">
              <iframe
                title="Spotify playlist"
                src="https://open.spotify.com/embed/playlist/37i9dQZF1DX4dyzvuaRJ0n?utm_source=generator"
                width="100%"
                height="352"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="block w-full min-h-[300px]"
              />
            </div>
            <div className="rounded-2xl border border-black/[0.06] shadow-[var(--shadow-card)] bg-white p-6 flex flex-col min-h-[200px] order-3">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-[17px] font-semibold text-gray-900">Drop pixels here</h3>
                <Trash2 className="w-4 h-4 text-gray-400" aria-hidden />
              </div>
              <p className="text-[14px] text-gray-500 mb-4">Helps me build this site :)</p>
              <p className="text-[12px] text-gray-400 mb-3">Click each color to add a pixel:</p>
              <div className="flex gap-2 h-14 rounded-xl overflow-hidden border-2 border-gray-200">
                <button
                  type="button"
                  onClick={() => setPixelCount((c) => c + 1)}
                  className="flex-1 bg-red-500 hover:brightness-110 active:scale-[0.98] transition-all min-w-0 cursor-pointer"
                  aria-label="Add red pixel"
                />
                <button
                  type="button"
                  onClick={() => setPixelCount((c) => c + 1)}
                  className="flex-1 bg-green-500 hover:brightness-110 active:scale-[0.98] transition-all min-w-0 cursor-pointer"
                  aria-label="Add green pixel"
                />
                <button
                  type="button"
                  onClick={() => setPixelCount((c) => c + 1)}
                  className="flex-1 bg-blue-500 hover:brightness-110 active:scale-[0.98] transition-all min-w-0 cursor-pointer"
                  aria-label="Add blue pixel"
                />
              </div>
              <p className="text-[15px] font-medium text-gray-700 mt-3">{pixelCount} pixels</p>
            </div>
            <div
              role="button"
              tabIndex={0}
              onClick={() => setReduced((r) => !r)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setReduced((r) => !r); } }}
              className="rounded-2xl border border-black/[0.06] shadow-[var(--shadow-card)] bg-white p-6 flex flex-col min-h-[200px] order-4 cursor-pointer hover:shadow-[var(--shadow-card-hover)] transition-all duration-300 relative focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2"
              aria-label={reduced ? 'Click to expand' : 'Click to reduce'}
            >
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-[17px] font-semibold text-amber-600">Reduce</h3>
                <X className="w-4 h-4 text-amber-500 shrink-0" aria-hidden />
              </div>
              <p className="text-[14px] text-gray-700 leading-relaxed">
                {reduced ? 'Less is more.' : 'Less is more through thoughtful reduction.'}
              </p>
              <p className="text-[13px] text-gray-500 mt-2">Laws of Simplicity by John Maeda.</p>
              {!reduced && (
                <div className="absolute right-5 top-1/2 -translate-y-1/2 flex flex-col gap-2 text-amber-400/80" aria-hidden>
                  <div className="flex gap-1.5 justify-end">{"•".repeat(5)}</div>
                  <div className="flex gap-1.5 justify-end">{"•".repeat(4)}</div>
                  <div className="flex gap-1.5 justify-end">{"•".repeat(3)}</div>
                </div>
              )}
              <p className="text-[11px] text-gray-400 mt-auto pt-2">{reduced ? 'Click again to expand' : 'Click to reduce'}</p>
            </div>
          </div>
        </AnimateIn>
        */}
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