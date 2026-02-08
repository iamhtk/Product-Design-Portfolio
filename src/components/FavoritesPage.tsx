import { useState } from 'react';
import { Linkedin, Youtube, Instagram, Facebook, Github, Figma } from 'lucide-react';
import { ScrollToTop } from './ScrollToTop';

const MUSIC: { album: string; artist: string; coverUrl: string; artistUrl: string }[] = [
  { album: 'Warning:', artist: 'Green Day', coverUrl: '/favorites/green-day-warning.png', artistUrl: 'https://www.greenday.com/' },
  { album: 'American Idiot', artist: 'Green Day', coverUrl: '/favorites/green-day-american-idiot.png', artistUrl: 'https://www.greenday.com/' },
  { album: 'Random Access Memories', artist: 'Daft Punk', coverUrl: 'https://picsum.photos/seed/ram/400/400', artistUrl: 'https://www.daftpunk.com/' },
  { album: 'Blonde', artist: 'Frank Ocean', coverUrl: 'https://picsum.photos/seed/blonde/400/400', artistUrl: 'https://frankocean.com/' },
  { album: 'Currents', artist: 'Tame Impala', coverUrl: 'https://picsum.photos/seed/currents/400/400', artistUrl: 'https://www.tameimpala.com/' },
  { album: 'In Rainbows', artist: 'Radiohead', coverUrl: 'https://picsum.photos/seed/inrainbows/400/400', artistUrl: 'https://www.radiohead.com/' },
  { album: 'The Dark Side of the Moon', artist: 'Pink Floyd', coverUrl: 'https://picsum.photos/seed/darkside/400/400', artistUrl: 'https://www.pinkfloyd.com/' },
  { album: 'Abbey Road', artist: 'The Beatles', coverUrl: 'https://picsum.photos/seed/abbey/400/400', artistUrl: 'https://www.thebeatles.com/' },
  { album: 'Kind of Blue', artist: 'Miles Davis', coverUrl: 'https://picsum.photos/seed/kindofblue/400/400', artistUrl: 'https://www.milesdavis.com/' },
  { album: 'Discovery', artist: 'Daft Punk', coverUrl: 'https://picsum.photos/seed/discovery/400/400', artistUrl: 'https://www.daftpunk.com/' },
  { album: 'To Pimp a Butterfly', artist: 'Kendrick Lamar', coverUrl: 'https://picsum.photos/seed/tpab/400/400', artistUrl: 'https://www.kendricklamar.com/' },
];

const BOOKS: { title: string; author: string; coverUrl?: string; isbn?: string; publisherUrl?: string }[] = [
  { title: 'The Design of Everyday Things', author: 'Don Norman', isbn: '0465050654' },
  { title: "Don't Make Me Think", author: 'Steve Krug', isbn: '0321344758' },
  { title: 'Steal Like an Artist', author: 'Austin Kleon', isbn: '0761169253' },
  { title: 'Sprint', author: 'Jake Knapp', isbn: '1501163404' },
  { title: 'Hooked', author: 'Nir Eyal', isbn: '0316230878' },
  { title: 'Atomic Habits', author: 'James Clear', isbn: '0735211299' },
  { title: 'Deep Work', author: 'Cal Newport', isbn: '1455586692' },
  { title: 'Thinking, Fast and Slow', author: 'Daniel Kahneman', isbn: '0374533555' },
  { title: 'Zero to One', author: 'Peter Thiel', isbn: '0804139296' },
  { title: 'The Lean Startup', author: 'Eric Ries', isbn: '0307887898' },
  { title: 'Inspired', author: 'Marty Cagan', isbn: '1119387507' },
  { title: 'Refactoring', author: 'Martin Fowler', isbn: '0134757599' },
  { title: 'Clean Code', author: 'Robert C. Martin', isbn: '0132350882' },
  { title: 'The Mom Test', author: 'Rob Fitzpatrick', isbn: '1492180742' },
  { title: 'Contagious', author: 'Jonah Berger', isbn: '1451686579' },
  { title: 'Made to Stick', author: 'Chip Heath', isbn: '1400064287' },
  { title: 'Creativity, Inc.', author: 'Ed Catmull', isbn: '0812993012' },
  { title: 'Shape Up', author: 'Ryan Singer', isbn: '0578573962' },
  { title: 'The Elements of User Experience', author: 'Jesse James Garrett', isbn: '0321683684' },
  { title: 'Articulating Design Decisions', author: 'Tom Greever', isbn: '1491921562' },
  { title: 'Designing for the Digital Age', author: 'Kim Goodwin', isbn: '0470229101' },
];

function getCoverUrl(book: (typeof BOOKS)[0]): string {
  if (book.coverUrl) return book.coverUrl;
  if (book.isbn) return `https://covers.openlibrary.org/b/isbn/${book.isbn}-M.jpg`;
  return '';
}

function MusicCard({ item }: { item: (typeof MUSIC)[0] }) {
  const [coverFailed, setCoverFailed] = useState(false);
  const showImage = !coverFailed;

  return (
    <div className="group flex flex-col rounded-none overflow-hidden border border-black/[0.06] bg-white shadow-[var(--shadow-card)] transition-all duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:shadow-[var(--shadow-depth)] hover:-translate-y-1 hover:border-black/[0.08] cursor-default">
      {/* Square light grey box - same as books. LP/album cover inside. */}
      <div
        className="w-full aspect-square flex items-center justify-center rounded-none overflow-hidden p-1 md:p-1.5 bg-[#F8F8F8] border border-gray-200/80 transition-colors duration-300 group-hover:border-gray-300"
        style={{ backgroundColor: '#F8F8F8' }}
      >
        {showImage ? (
          <img
            src={item.coverUrl}
            alt={item.album}
            className="max-w-full max-h-full w-auto h-auto object-contain transition-transform duration-500 ease-out group-hover:scale-105"
            loading="lazy"
            onError={() => setCoverFailed(true)}
          />
        ) : (
          <span className="text-gray-400 text-4xl font-serif">
            {item.album.charAt(0)}
          </span>
        )}
      </div>
      {/* Album name, artist, and Visit Artist - same layout as books */}
      <div className="flex flex-row items-start justify-between gap-4 mt-3 md:mt-4 px-4 pb-4">
        <div className="min-w-0 flex-1">
          <h2 className="text-[15px] md:text-[16px] font-semibold text-gray-900 leading-snug transition-opacity duration-300 group-hover:opacity-80">
            {item.album}
          </h2>
          <p className="text-[13px] md:text-[14px] text-gray-500 mt-1 font-normal">
            {item.artist}
          </p>
        </div>
        <a
          href={item.artistUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 text-[11px] md:text-[12px] tracking-wide text-gray-400 hover:text-gray-700 transition-colors whitespace-nowrap uppercase"
        >
          Visit Artist →
        </a>
      </div>
    </div>
  );
}

function BookCard({ book }: { book: (typeof BOOKS)[0] }) {
  const coverUrl = getCoverUrl(book);
  const [coverFailed, setCoverFailed] = useState(false);
  const showImage = coverUrl && !coverFailed;
  const publisherLink = book.publisherUrl ?? (book.isbn ? `https://openlibrary.org/isbn/${book.isbn}` : '#');

  return (
    <div className="group flex flex-col rounded-none overflow-hidden border border-black/[0.06] bg-white shadow-[var(--shadow-card)] transition-all duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:shadow-[var(--shadow-depth)] hover:-translate-y-1 hover:border-black/[0.08] cursor-default">
      {/* Square light grey box - same for all books. Minimal padding so all book images appear the same size. */}
      <div
        className="w-full aspect-square flex items-center justify-center rounded-none overflow-hidden p-1 md:p-1.5 bg-[#F8F8F8] border border-gray-200/80 transition-colors duration-300 group-hover:border-gray-300"
        style={{ backgroundColor: '#F8F8F8' }}
      >
        {showImage ? (
          <img
            src={coverUrl}
            alt={book.title}
            className="max-w-full max-h-full w-auto h-auto object-contain transition-transform duration-500 ease-out group-hover:scale-105"
            loading="lazy"
            onError={() => setCoverFailed(true)}
          />
        ) : (
          <span className="text-gray-400 text-4xl font-serif">
            {book.title.charAt(0)}
          </span>
        )}
      </div>
      {/* Title, author, and Visit Publisher - no card, just spacing */}
      <div className="flex flex-row items-start justify-between gap-4 mt-3 md:mt-4 px-4 pb-4">
        <div className="min-w-0 flex-1">
          <h2 className="text-[15px] md:text-[16px] font-semibold text-gray-900 leading-snug transition-opacity duration-300 group-hover:opacity-80">
            {book.title}
          </h2>
          <p className="text-[13px] md:text-[14px] text-gray-500 mt-1 font-normal">
            {book.author}
          </p>
        </div>
        <a
          href={publisherLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 text-[11px] md:text-[12px] tracking-wide text-gray-400 hover:text-gray-700 transition-colors whitespace-nowrap uppercase"
        >
          Visit Publisher →
        </a>
      </div>
    </div>
  );
}

export function FavoritesPage() {
  return (
    <div className="min-h-screen bg-white">
      <ScrollToTop />
      <div className="max-w-[1600px] mx-auto px-6 md:px-8 lg:px-12 pt-24 pb-16">
        {/* Favorite music - same layout as Favorite books */}
        <h2 className="text-[13px] tracking-[0.15em] text-gray-400 uppercase mb-12 md:mb-16">
          Favorite music
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-10 lg:gap-12 items-start mb-20 md:mb-24">
          {MUSIC.map((item) => (
            <MusicCard key={`${item.album}-${item.artist}`} item={item} />
          ))}
        </div>

        {/* Favorite books */}
        <h1 className="text-[13px] tracking-[0.15em] text-gray-400 uppercase mb-12 md:mb-16">
          Favorite books
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-10 lg:gap-12 items-start">
          {BOOKS.map((book) => (
            <BookCard key={`${book.title}-${book.author}`} book={book} />
          ))}
        </div>
      </div>

      {/* Footer - same as FriendsPage / HomePage */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-8 lg:px-12">
        <div
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-12 pb-8 text-[13px] text-gray-500"
          data-footer
        >
          <div className="flex flex-wrap items-center gap-2">
            <span className="whitespace-nowrap">Designed and Developed.</span>
            <span>© 2026</span>
          </div>
          <div className="flex items-center gap-3 md:gap-5">
            <a href="https://www.figma.com/@iamhtk" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-900 transition-colors" aria-label="Figma">
              <Figma className="w-[18px] h-[18px]" />
            </a>
            <a href="https://github.com/iamhtk" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-900 transition-colors" aria-label="GitHub">
              <Github className="w-[18px] h-[18px]" />
            </a>
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
