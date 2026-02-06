import { Linkedin, Youtube, Instagram, Facebook, Github, Figma } from 'lucide-react';
import { ScrollToTop } from './ScrollToTop';

export function FriendsPage() {
  const friends = [
    { number: '01', name: 'Adriana Chen', role: 'AR/VR Designer', company: 'ByteDance', link: 'https://heyxadriana-art.webflow.io/' },
    { number: '02', name: 'Arantxa Lituma', role: 'UX Designer', company: 'DermAware', link: 'https://www.aranlituma.com/' },
    { number: '03', name: 'Bob Royce', role: 'CEO/Co-Founder', company: 'The Understanding Group (TUG)', link: 'https://understandinggroup.com/bob-royce' },
    { number: '04', name: 'Claudia Brenner', role: 'CEO', company: 'CWPC @ CrowdDoing', link: 'https://www.linkedin.com/in/claudia-brenner' },
    { number: '05', name: 'Dan Heck', role: 'Chief AI Ethicist', company: 'The Understanding Group (TUG)', link: 'https://understandinggroup.com/dan-heck' },
    { number: '06', name: 'Dan Klyn', role: 'Co-Founder', company: 'The Understanding Group (TUG)', link: 'https://understandinggroup.com/dan-klyn' },
    { number: '07', name: 'Daniel O Neil', role: 'Analyst', company: 'The Understanding Group (TUG)', link: 'https://understandinggroup.com/daniel-oneil' },
    { number: '08', name: 'Dhanush Nandish', role: 'UX Designer', company: 'CWPC @ CrowdDoing', link: 'https://in.linkedin.com/in/dhanush-nandish-07307125b' },
    { number: '09', name: 'Elena Godin', role: 'Teaching Professor and Lecturer IV', company: 'University of Michigan, School of Information', link: 'https://www.linkedin.com/in/elenagodin' },
    { number: '10', name: 'Emerald Paul', role: 'Business Analyst', company: 'CWPC @ CrowdDoing', link: 'https://www.linkedin.com/in/emerald-paul-365677b/' },
    { number: '11', name: 'Emily Claflin', role: 'Information Architect', company: 'The Understanding Group (TUG)', link: 'https://understandinggroup.com/emily-claflin' },
    { number: '12', name: 'Esty Zilberman', role: 'Senior UX/UI designer', company: 'Lebara NL', link: 'https://www.estyzilberman.com/' },
    { number: '13', name: 'Grant Carmichael', role: 'Information Architect', company: 'The Understanding Group (TUG)', link: 'https://understandinggroup.com/grant-carmichael' },
    { number: '14', name: 'Haripriya Vijayan', role: 'Product Manager', company: 'CWPC @ CrowdDoing', link: 'https://www.linkedin.com/in/haripriyavijayan' },
    { number: '15', name: 'Iris Yuning Ye', role: 'Product Manager', company: 'Microsoft', link: 'https://www.linkedin.com/in/irisyn-ye/' },
    { number: '16', name: 'James (Jim) Rampton', role: 'Lecturer III in Information', company: 'University of Michigan, School of Information', link: 'https://www.linkedin.com/in/jim-rampton-26a95440' },
    { number: '17', name: 'Jessica Allen', role: 'Instructional Designer', company: 'Empower Accessibility', link: 'https://www.linkedin.com/in/jessicaallen531' },
    { number: '18', name: 'Joe Elmendorf', role: 'Co-Founder', company: 'Maps and Mirror', link: 'https://www.mapsandmirror.com/' },
    { number: '19', name: 'Luke Bratic', role: 'Product Designer', company: 'eNGINE', link: 'https://www.linkedin.com/in/lbratic' },
    { number: '20', name: 'Michael Bogart', role: 'Student', company: 'University of Michigan, School of Information', link: '#' },
    { number: '21', name: 'Namita Nisal', role: 'Senior Product Designer', company: 'Cisco-Meraki', link: 'https://namitanisal.com/' },
    { number: '22', name: 'Nancy Weatherford', role: 'Operational and Financial Manager', company: 'The Understanding Group (TUG)', link: 'https://understandinggroup.com/nancy-weatherford' },
    { number: '23', name: 'Natalia Chernysheva', role: 'Teaching Associate Professor of Russian', company: 'The University of North Carolina at Chapel Hill', link: 'https://gsll.unc.edu/chernysheva-3/' },
    { number: '24', name: 'Pankaj Paneri', role: 'Product Manager', company: 'CWPC @ CrowdDoing', link: 'https://www.linkedin.com/in/pankaj-paneri' },
    { number: '25', name: 'Percy Long', role: 'Product Designer', company: 'Innovation AI', link: 'https://www.linkedin.com/in/baixipercylong' },
    { number: '26', name: 'Shubhi Singla', role: 'Program Manager', company: 'CWPC @ CrowdDoing', link: 'https://www.linkedin.com/in/shubhisingla' },
    { number: '27', name: 'Whitney Speck', role: 'Designer', company: 'JLR', link: 'https://www.linkedin.com/in/whitney-speck' },
    { number: '28', name: 'Xi Zhang', role: 'Product Designer', company: 'Crigloo', link: 'https://www.linkedin.com/in/xizh' },
    { number: '29', name: 'Rosalie Morrissey', role: 'Information Resources Associate Supervisor', company: 'University of Michigan, Michigan Law', link: 'https://www.rosaliemorrissey.com/' },
    { number: '30', name: 'Nicola Antonazzo', role: 'Senior Product Designer', company: 'Microsoft', link: 'https://antonazzonico.la/' },
    { number: '31', name: 'Kristin Isaac', role: 'CEO and Co-Founder', company: 'Strudel', link: 'https://www.linkedin.com/in/kristinisaac' },
    { number: '32', name: 'Shai Rubin', role: 'Co-Founder', company: 'Strudel', link: 'https://www.linkedin.com/in/shairubin/' },
    { number: '33', name: 'Linda Huber', role: 'PhD candidate', company: 'University of Michigan, School of Information', link: 'https://puellaludens.com/' },
    { number: '34', name: 'Phil Mendez', role: 'UX Researcher', company: 'Cisco', link: 'https://www.linkedin.com/in/philmendez' },
    { number: '35', name: 'Huiran Yi', role: 'PhD Candidate', company: 'University of Michigan, School of Information', link: 'https://www.huiranyi.com/' },
    { number: '36', name: 'Jenny Ye', role: 'Data Engineer II', company: 'The Washington Post', link: 'https://www.linkedin.com/in/hjennye' },
    { number: '37', name: 'Charles Severance (Dr. Chuck)', role: 'Clinical Associate Professor', company: 'University of Michigan', link: 'https://www.dr-chuck.com/' },
    // { number: '3', name: 'Yichen He', role: 'Senior Product Designer', company: 'GreenMile Bio', link: 'yichenhe.com' },
    // { number: '3', name: 'Yichen He', role: 'Senior Product Designer', company: 'GreenMile Bio', link: 'yichenhe.com' },
  ];

  return (
    <div className="pt-24">
      <div className="max-w-[1600px] mx-auto px-6 md:px-8 lg:px-12">
        <div className="py-12 md:py-20">
          <h1 className="text-[13px] tracking-[0.15em] text-gray-400 uppercase mb-12 md:mb-16">
            Friends
          </h1>
        </div>

        <div className="space-y-0">
          {friends.map((friend) => (
            <div 
              key={friend.number}
              className="grid grid-cols-[auto_1fr_auto] md:grid-cols-[auto_1fr_1.5fr_1fr_auto] gap-3 md:gap-8 py-4 md:py-6 border-b border-gray-200 hover:bg-gray-50 transition-colors group cursor-pointer items-start"
            >
              {/* Column 1: Number */}
              <div className="text-[12px] md:text-[13px] text-gray-400">
                {friend.number}
              </div>
              
              {/* Column 2: Name */}
              <div className="text-[14px] md:text-[15px] text-gray-900 group-hover:underline">
                {friend.name}
              </div>
              
              {/* Column 3: Role and Company (hidden on mobile) */}
              <div className="hidden md:block">
                <p className="text-[14px] md:text-[15px] text-gray-900">
                  {friend.role}
                </p>
                <p className="text-[12px] md:text-[13px] text-gray-400">
                  {friend.company}
                </p>
              </div>
              
              {/* Column 4: Website Link (hidden on mobile) */}
              <div className="hidden md:block text-[14px] md:text-[15px] text-gray-400 group-hover:underline">
                {friend.link}
              </div>
              
              {/* Column 5: Arrow */}
              <div className="text-gray-400">
                →
              </div>
            </div>
          ))}
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
      <ScrollToTop />
    </div>
  );
}