import { useEffect, useState } from 'react';
import { Linkedin, Youtube, Instagram, Facebook } from 'lucide-react';
import { ScrollToTop } from './ScrollToTop';

export function Blog() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      
      const totalScrollableHeight = documentHeight - windowHeight;
      const progress = (scrollTop / totalScrollableHeight) * 100;
      
      setScrollProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const blogPosts = [
    {
      title: 'Cadillac Escalade Design Proposal — Elevating Luxury & Redefining Automotive UX',
      subtitle: 'Elevating Luxury & Redefining Automotive UX',
      description: 'In the design of user interfaces (UI) for luxury vehicles, a significant challenge lies in creating a cross-channel UI that not only meets the expectations of luxury and personalization but also ensures that driver safety is never compromised. The primary concern is how to design a system that seamlessly integrates the vehicle’s internal controls with mobile and other device interfaces while maintaining a focus on minimizing driver distraction and cognitive load.',
      image: 'blogs/M3.png',
      link: 'https://medium.com/design-bootcamp/vice-elevating-luxury-redefining-automotive-ux-03e417868173',
      date: 'January 2025'
    },
    {
      title: 'AI and UX: Shaping the Future of Design Together',
      subtitle: 'Shaping the Future of Design Together',
      description: 'As we navigate the intersection of Artificial Intelligence (AI) and User Experience (UX) design, we witness a transformative fusion that redefines our digital landscape. AI, now a central element in UX design, offers unprecedented personalization, efficiency, and engagement by harnessing deep data insights and human-centered design principles. This synergy enables the creation of experiences that anticipate needs, adapt to preferences, and seamlessly integrate technology with human interaction. By leveraging AI computational power alongside the empathic touch of UX design, we can craft intuitive and emotionally resonant digital experiences. This exploration delves into five key principles guiding this integration, aiming to elevate and empower user-centric design',
      image: 'blogs/M2.png',
      link: 'https://medium.com/design-bootcamp/ai-and-ux-shaping-the-future-of-design-together-eef99a88ea8c',
      date: 'December 2024'
    },
    {
      title: 'Empowering Human Creativity: How AI Principles Can Shape the Future of UX Design Tools',
      subtitle: 'How AI Principles Can Shape the Future of UX Design Tools',
      description: 'In the realm of User Experience (UX) design, the integration of Artificial Intelligence (AI) principles can significantly enhance the effectiveness of UX tools. By aligning with these principles, designers can leverage AI to augment creativity, personalize learning paths, foster empathy, facilitate storytelling, recognize emotions, and provide adaptive assistance. Through the lens of these principles, we envision a future where AI empowers designers to unleash their creativity, facilitates personalized learning experiences, fosters empathy, enables narrative-driven design, acknowledges emotional nuances, and adapts assistance according to users’ proficiency levels and contexts. Let’s explore each principle in detail with examples and insights on how AI has influenced these perspectives.',
      image: 'blogs/M1.png',
      link: 'https://hrithiksanyal.medium.com/op-ed-1-empowering-human-creativity-how-ai-principles-can-shape-the-future-of-ux-design-tools-1fa2f12a89c5',
      date: 'November 2024'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <ScrollToTop />
      
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-100 z-50">
        <div 
          className="h-full bg-gray-900 transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Main Content */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-20 md:py-32">
        {/* Header */}
        <div className="mb-20 md:mb-32">
          <h1 className="text-[48px] md:text-[72px] mb-6">Blogs</h1>
          <p className="text-[15px] md:text-[16px] text-gray-600 leading-[1.8] max-w-[700px]">
            Recently, I began writing articles and sharing them on Medium, expressing my thoughts on miscellaneous subjects like Generative AI and UX Design.
          </p>
        </div>

        {/* Blog Posts */}
        <div className="space-y-24 md:space-y-32">
          {blogPosts.map((post, index) => (
            <article key={index} className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
              {/* Left Column - Content */}
              <div className="space-y-6">
                {/* Date */}
                <div className="text-[11px] tracking-[0.15em] text-gray-400 uppercase">
                  {post.date}
                </div>

                {/* Title and Subtitle */}
                <div>
                  <h2 className="text-[32px] md:text-[42px] leading-[1.2] mb-3">
                    {post.title}
                  </h2>
                  <p className="text-[18px] md:text-[20px] text-gray-600">
                    {post.subtitle}
                  </p>
                </div>

                {/* Description */}
                <p className="text-[15px] md:text-[16px] text-gray-600 leading-[1.8]">
                  {post.description}
                </p>

                {/* Read More Link */}
                <a
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-[15px] text-gray-900 hover:text-gray-600 transition-colors group"
                >
                  <span>Read on Medium</span>
                  <svg 
                    className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>

              {/* Right Column - Image */}
              <a
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 block cursor-pointer hover:opacity-90 transition-opacity"
              >
                <img 
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-contain"
                />
              </a>
            </article>
          ))}
        </div>

        {/* Footer */}
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 pb-12 mt-20" data-footer>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-12 border-t border-gray-200 text-[13px] text-gray-500">
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
    </div>
  );
}