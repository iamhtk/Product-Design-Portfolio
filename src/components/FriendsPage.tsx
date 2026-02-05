import { Linkedin, Youtube, Instagram, Facebook } from 'lucide-react';
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
    { number: '10', name: 'Emerald Paul', role: 'Business Analyst', company: 'CWPC @ CrowdDoing', link: '#' },
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
    // { number: '30', name: 'Rory Shi', role: 'Senior Product Designer', company: 'Tinder', link: 'roryshi.com' },
    // { number: '31', name: 'Sean Deklara', role: 'Principal Product Designer', company: 'Freelance', link: 'seandeklara.com' },
    // { number: '32', name: 'Stephen Oey', role: 'Product Designer', company: 'Meta', link: 'stephanoey.com' },
    // { number: '33', name: 'Suji Gaglani', role: 'Senior Product Designer', company: 'Freelance', link: 'sujigaglani.com' },
    // { number: '34', name: 'Xavier Mao', role: 'Product Designer', company: 'Discord', link: 'xaviermao' },
    // { number: '35', name: 'Yichen He', role: 'Senior Product Designer', company: 'GreenMile Bio', link: 'yichenhe.com' },
  ];

  return (
    <div className="pt-24 pb-20">
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

        {/* Footer */}
        <div className="mt-32 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[13px] text-gray-500" data-footer>
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
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
      <ScrollToTop />
    </div>
  );
}