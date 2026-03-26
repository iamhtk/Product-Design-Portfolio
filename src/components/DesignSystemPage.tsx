import { useState, type ReactNode } from 'react';
import {
  Linkedin,
  Youtube,
  Instagram,
  Facebook,
  Github,
  Figma,
  Layers,
  Grid,
  Zap,
  AlignLeft,
} from 'lucide-react';

type DSSection = 'landing' | 'foundation' | 'components' | 'interactions' | 'principles';

type NavigatePage =
  | 'work'
  | 'about'
  | 'friends'
  | 'resume'
  | 'favorites'
  | 'blog'
  | 'analytics'
  | 'design-system';

export interface DesignSystemPageProps {
  onNavigate: (page: NavigatePage) => void;
  currentPage: NavigatePage | 'project';
}

function DSSiteFooter() {
  return (
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
            <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="currentColor">
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
              <path
                d="M101.875 163.438C99.375 163.438 97.5 165.313 97.1875 168.125L90 255.625L97.1875 340.313C97.5 342.813 99.375 345 101.875 345C104.375 345 106.25 343.125 106.563 340.313L114.687 255.625L106.563 168.125C106.25 165.313 104.063 163.438 101.875 163.438Z"
                fill="currentColor"
              />
              <path
                d="M133.75 169.062C130.938 169.062 128.438 171.25 128.438 174.375L121.875 255.625L128.438 340.937C128.75 344.062 130.938 346.25 133.75 346.25C136.563 346.25 138.75 344.062 139.062 340.937L146.562 255.625L139.062 174.375C138.75 171.25 136.563 169.062 133.75 169.062Z"
                fill="currentColor"
              />
              <path
                d="M38.75 180.312C37.1875 180.312 35.625 181.562 35.3125 183.438L27.5 255.312L35.3125 325.625C35.625 327.5 36.875 328.75 38.75 328.75C40.3125 328.75 41.875 327.5 42.1875 325.625L51.25 255.312L42.1875 183.438C41.5625 181.875 40.3125 180.312 38.75 180.312Z"
                fill="currentColor"
              />
              <path
                d="M9.06248 207.812C7.49998 207.812 5.93748 209.063 5.93748 210.938L0 255.625L5.93748 299.375C6.24998 301.25 7.49998 302.5 9.06248 302.5C10.625 302.5 11.875 301.25 12.1875 299.375L19.0625 255.625L12.1875 211.25C11.875 209.375 10.625 207.812 9.06248 207.812Z"
                fill="currentColor"
              />
              <path
                d="M198.438 86.5625C194.688 86.5625 191.875 89.375 191.563 93.125L185.625 255.625L191.563 340.625C191.875 344.375 194.688 347.187 198.438 347.187C202.188 347.187 205 344.375 205.313 340.625L211.875 255.625L205.313 93.125C205 89.375 201.875 86.5625 198.438 86.5625Z"
                fill="currentColor"
              />
              <path
                d="M70 166.25C67.8125 166.25 66.25 167.812 65.9375 170.312L58.4375 255.625L65.9375 337.812C66.25 340 67.8125 341.875 70 341.875C72.1875 341.875 73.75 340.312 74.0625 338.125L82.5 255.938L74.0625 170.625C73.75 168.125 72.1875 166.25 70 166.25Z"
                fill="currentColor"
              />
              <path
                d="M165.938 117.5C162.813 117.5 160 120 160 123.437L153.75 255.625L160 340.938C160.313 344.375 162.813 346.875 165.938 346.875C169.063 346.875 171.875 344.375 171.875 340.938L179.063 255.625L171.875 123.437C171.875 120 169.063 117.5 165.938 117.5Z"
                fill="currentColor"
              />
              <path
                d="M364.375 42.1875C358.75 42.1875 354.375 46.5625 354.375 52.1875L350.625 255.313L354.375 336.875C354.375 342.5 359.063 346.875 364.375 346.875C370 346.875 374.375 342.188 374.375 336.875L378.75 255.313L374.375 52.1875C374.688 46.875 370 42.1875 364.375 42.1875Z"
                fill="currentColor"
              />
              <path
                d="M230.937 72.1875C226.875 72.1875 223.75 75.3125 223.438 79.6875L217.812 255.625L223.438 339.687C223.438 343.75 226.875 346.875 230.937 346.875C235 346.875 238.125 343.75 238.438 339.375L244.688 255.313L238.438 79.3751C238.438 75.6251 235 72.1875 230.937 72.1875Z"
                fill="currentColor"
              />
              <path
                d="M701.563 150.625C688.125 150.625 675.313 153.438 663.438 158.125C655.625 69.375 581.25 0 490.625 0C468.438 0 446.875 4.37506 427.812 11.8751C420.312 14.6876 418.438 17.8125 418.438 23.4375V335.625C418.438 341.563 423.125 346.563 429.063 347.188C429.375 347.188 700 347.188 701.875 347.188C756.25 347.188 800.313 303.125 800.313 248.75C800 194.688 755.938 150.625 701.563 150.625Z"
                fill="currentColor"
              />
              <path
                d="M398.125 23.125C392.187 23.125 387.5 28.125 387.187 34.0625L382.812 255.625L387.187 335.937C387.187 341.875 392.187 346.562 398.125 346.562C404.062 346.562 408.75 341.562 409.062 335.625L413.75 255L409.062 33.4375C408.75 28.125 404.062 23.125 398.125 23.125Z"
                fill="currentColor"
              />
              <path
                d="M264.062 65.625C259.687 65.625 256.25 69.0625 255.937 73.75L250.938 255.625L255.937 339.063C255.937 343.438 259.687 347.188 264.062 347.188C268.437 347.188 271.875 343.75 272.188 339.063L277.812 255.625L272.188 73.75C271.875 69.0625 268.437 65.625 264.062 65.625Z"
                fill="currentColor"
              />
              <path
                d="M297.188 69.6875C292.5 69.6875 288.438 73.4375 288.438 78.4375L283.75 255.625L288.438 338.438C288.438 343.438 292.5 347.187 297.188 347.187C301.875 347.187 305.937 343.438 305.937 338.438L311.25 255.625L305.937 78.4375C305.937 73.4375 302.188 69.6875 297.188 69.6875Z"
                fill="currentColor"
              />
              <path
                d="M330.625 75.3125C325.313 75.3125 321.25 79.375 321.25 84.6875L316.875 255.625L321.25 337.812C321.25 343.125 325.625 347.188 330.625 347.188C335.938 347.188 340 343.125 340 337.812L344.688 255.625L340 84.6875C340 79.6875 335.938 75.3125 330.625 75.3125Z"
                fill="currentColor"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

function DSLanding({
  onNavigate: _onNavigate,
  onSectionChange,
}: {
  onNavigate: (page: NavigatePage) => void;
  onSectionChange: (s: DSSection) => void;
}) {
  const cards: {
    id: Exclude<DSSection, 'landing'>;
    icon: typeof Layers;
    title: string;
    description: string;
  }[] = [
    {
      id: 'foundation',
      icon: Layers,
      title: 'Foundation',
      description: 'Color, typography, spacing, and border radius. The single source of truth.',
    },
    {
      id: 'components',
      icon: Grid,
      title: 'Components',
      description: 'Live instances of every reusable UI element on this site.',
    },
    {
      id: 'interactions',
      icon: Zap,
      title: 'Interactions',
      description: 'Hover states, transitions, and the nav behavior rules.',
    },
    {
      id: 'principles',
      icon: AlignLeft,
      title: 'Principles',
      description: 'The editorial decisions behind the system — why things are the way they are.',
    },
  ];

  return (
    <div className="min-h-screen">
      <div className="max-w-[1600px] mx-auto px-6 md:px-8 lg:px-12">
        <div style={{ paddingTop: 'var(--nav-height)' }} className="min-h-[50vh] flex flex-col justify-center">
          <div className="flex flex-col md:flex-row md:items-end gap-12">
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-3 mb-2">
                <h1
                  style={{ fontSize: 'var(--type-h1)' }}
                  className="text-gray-900 font-light tracking-tight"
                >
                  Hrithik Sanyal
                </h1>
                <span className="text-[11px] tracking-widest text-gray-400 border border-black/10 rounded px-2 py-0.5 font-mono">
                  V 1.0
                </span>
              </div>
            <p className="text-[11px] tracking-widest uppercase text-gray-400 mt-2">
              Design System · V 1.0
            </p>
            <p className="text-[11px] tracking-widest uppercase text-gray-400 mt-1">
              Designed & Developed by Hrithik Sanyal
            </p>
            <p
              style={{ fontSize: 'var(--type-body-lg)' }}
              className="text-gray-500 leading-relaxed max-w-lg mt-6"
            >
              A design system built around precision and clarity. Every token, component, and interaction rule on this
              site has a reason. Titillium Web. White space. No accidents.
            </p>
            </div>
            <div className="hidden md:block flex-1 min-w-0" aria-hidden />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-8">
          {cards.map(({ id, icon: Icon, title, description }) => (
            <div
              key={id}
              onClick={() => onSectionChange(id)}
              className="border border-black/10 rounded-[var(--radius-card)] p-8 cursor-pointer transition-all duration-[350ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-0.5 group"
            >
              <div className="mb-4">
                <Icon className="w-5 h-5 text-gray-400" />
              </div>
              <h3 className="text-[17px] font-medium text-gray-900">{title}</h3>
              <p className="text-[14px] text-gray-400 leading-relaxed mt-2">{description}</p>
              <p className="text-[13px] text-gray-400 group-hover:text-gray-900 transition-colors duration-300 mt-6">→</p>
            </div>
          ))}
        </div>

        <div className="mt-16 border-t border-black/[0.06] pt-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className="text-[13px] text-gray-400">Built in Figma. Implemented with Cursor.</p>
            <a
              href="https://www.figma.com/@iamhtk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] text-gray-900 hover:opacity-60 transition-opacity duration-300"
            >
              View Figma File →
            </a>
          </div>
        </div>
      </div>

      <DSSiteFooter />
    </div>
  );
}

function DSLayout({
  activeSection,
  onSectionChange,
  onNavigate: _onNavigate,
  children,
}: {
  activeSection: Exclude<DSSection, 'landing'>;
  onSectionChange: (s: DSSection) => void;
  onNavigate: (page: NavigatePage) => void;
  children: ReactNode;
}) {
  const sections: { id: Exclude<DSSection, 'landing'>; label: string; icon: typeof Layers }[] = [
    { id: 'foundation', label: 'Foundation', icon: Layers },
    { id: 'components', label: 'Components', icon: Grid },
    { id: 'interactions', label: 'Interactions', icon: Zap },
    { id: 'principles', label: 'Principles', icon: AlignLeft },
  ];

  return (
    <div style={{ paddingTop: 'var(--nav-height)' }} className="min-h-screen">
      <div className="max-w-[1600px] mx-auto px-6 md:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row gap-16 relative">
          <aside className="hidden md:block w-52 shrink-0">
            <div className="sticky top-0 pt-[calc(var(--nav-height)+2rem)] pb-8">
              <button
                type="button"
                onClick={() => onSectionChange('landing')}
                className="text-[13px] text-gray-400 hover:text-gray-900 transition-colors duration-300 mb-6 flex items-center gap-2 cursor-pointer border-0 bg-transparent p-0"
              >
                ← Hrithik Sanyal
              </button>

              <div className="border-b border-black/[0.06] mb-4 pb-4">
                <p className="text-[13px] font-medium text-gray-900">Design System</p>
                <p className="text-[11px] tracking-widest uppercase text-gray-400 mt-0.5">V 1.0</p>
              </div>

              <nav className="flex flex-col gap-1">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() => onSectionChange(section.id)}
                    className={`relative text-left py-2 pl-4 pr-2 text-[14px] rounded transition-colors duration-200 cursor-pointer border-0 bg-transparent w-full ${
                      activeSection === section.id
                        ? 'text-gray-900 font-medium'
                        : 'text-gray-400 hover:text-gray-900'
                    }`}
                  >
                    {activeSection === section.id && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-gray-900 rounded-full" />
                    )}
                    {section.label}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          <div className="md:hidden flex gap-4 border-b border-black/[0.06] pt-6 pb-0 mb-8 overflow-x-auto w-full">
            {sections.map((section) => {
              const active = activeSection === section.id;
              return (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => onSectionChange(section.id)}
                  className={`text-[13px] pb-3 whitespace-nowrap border-b-2 transition-colors duration-200 cursor-pointer bg-transparent shrink-0 ${
                    active ? 'border-gray-900 text-gray-900 font-medium' : 'border-transparent text-gray-400'
                  }`}
                >
                  {section.label}
                </button>
              );
            })}
          </div>

          <main className="flex-1 min-w-0 pt-12 pb-16 md:pt-12">{children}</main>
        </div>
      </div>

      <DSSiteFooter />
    </div>
  );
}

function SubpageHeader({
  overline,
  title,
  subtitle,
}: {
  overline: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="mb-12">
      <p className="text-[11px] tracking-widest uppercase text-gray-400 mb-3">{overline}</p>
      <h2 style={{ fontSize: 'var(--type-h2)', fontWeight: 300 }} className="text-gray-900">
        {title}
      </h2>
      <p style={{ fontSize: 'var(--type-body)' }} className="text-gray-500 mt-3 max-w-lg leading-relaxed">
        {subtitle}
      </p>
    </div>
  );
}

function DSFoundation() {
  return (
    <div>
      <SubpageHeader
        overline="Foundation"
        title="Design Tokens"
        subtitle="The CSS variables that power every visual decision on this site."
      />

      <h3 style={{ fontSize: 'var(--type-h3)', fontWeight: 300 }} className="text-gray-900 mt-16 mb-6">
        Color
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-16">
        {(
          [
            { role: 'Background', value: '#ffffff', colorValue: '#ffffff', isWhite: true },
            { role: 'Foreground', value: 'oklch(0.18 0.01 265)', colorValue: 'oklch(0.18 0.01 265)', isWhite: false },
            { role: 'Muted', value: '#ececf0', colorValue: '#ececf0', isWhite: false },
            { role: 'Muted Foreground', value: '#717182', colorValue: '#717182', isWhite: false },
            { role: 'Border', value: 'rgba(0,0,0,0.1)', colorValue: 'rgba(0,0,0,0.1)', isWhite: false },
            { role: 'Primary', value: '#030213', colorValue: '#030213', isWhite: false },
          ] as const
        ).map((row) => (
          <div key={row.role} className="border border-black/10 rounded-[var(--radius-card)] overflow-hidden">
            {row.isWhite ? (
              <div className="h-20 w-full bg-white border-b border-black/10" />
            ) : (
              <div className="h-20 w-full" style={{ background: row.colorValue }} />
            )}
            <div className="px-4 py-3">
              <p className="text-[13px] font-medium text-gray-900">{row.role}</p>
              <p className="text-[11px] text-gray-400 font-mono mt-0.5">{row.value}</p>
            </div>
          </div>
        ))}
      </div>

      <h3 style={{ fontSize: 'var(--type-h3)', fontWeight: 300 }} className="text-gray-900 mt-16 mb-6">
        Typography
      </h3>
      <div className="flex items-baseline gap-4 border border-black/10 rounded-[var(--radius-card)] px-6 py-4 mb-8">
        <span style={{ fontSize: 'var(--type-h2)', fontWeight: 300 }} className="text-gray-900">
          Aa
        </span>
        <div>
          <p className="text-[14px] font-medium text-gray-900">Titillium Web</p>
          <p className="text-[11px] text-gray-400 mt-1">Google Fonts · Primary typeface</p>
        </div>
      </div>

      {(
        [
          { label: 'DISPLAY', varName: 'var(--type-display)' as const, weight: 300, meta: '2.75rem / 300' },
          { label: 'H1', varName: 'var(--type-h1)' as const, weight: 400, meta: '2.125rem / 400' },
          { label: 'H2', varName: 'var(--type-h2)' as const, weight: 400, meta: '1.625rem / 400' },
          { label: 'H3', varName: 'var(--type-h3)' as const, weight: 400, meta: '1.375rem / 400' },
          { label: 'BODY LG', varName: 'var(--type-body-lg)' as const, weight: 400, meta: '1.125rem / 400' },
          { label: 'BODY', varName: 'var(--type-body)' as const, weight: 400, meta: '0.9375rem / 400' },
          { label: 'CAPTION', varName: 'var(--type-caption)' as const, weight: 400, meta: '0.8125rem / 400' },
        ] as const
      ).map((row) => (
        <div
          key={row.label}
          className="flex items-baseline gap-6 py-6 border-b border-black/[0.06]"
        >
          <span className="text-[11px] tracking-widest uppercase text-gray-400 shrink-0 w-32">{row.label}</span>
          <span
            style={{ fontSize: row.varName, fontWeight: row.weight }}
            className="text-gray-900 flex-1 min-w-0"
          >
            The quick brown fox
          </span>
          <span
            className="text-[11px] text-gray-400 font-mono text-right shrink-0 w-40"
          >
            {row.meta}
          </span>
        </div>
      ))}

      <div className="flex items-baseline gap-6 py-6 border-b border-black/[0.06]">
        <span className="text-[11px] tracking-widest uppercase text-gray-400 shrink-0 w-32">OVERLINE</span>
        <span
          style={{ fontSize: 'var(--type-overline)', fontWeight: 500 }}
          className="text-gray-900 flex-1 min-w-0 tracking-widest uppercase"
        >
          The quick brown fox
        </span>
        <span
          className="text-[11px] text-gray-400 font-mono text-right shrink-0 w-40"
        >
          0.6875rem / 500 / uppercase
        </span>
      </div>

      <h3 style={{ fontSize: 'var(--type-h3)', fontWeight: 300 }} className="text-gray-900 mt-16 mb-6">
        Spacing
      </h3>
      <p style={{ fontSize: 'var(--type-body)' }} className="text-gray-500 mb-6">
        8pt grid. Every value is a multiple of 4 or 8.
      </p>
      {(
        [
          { k: 'xs', px: 4 },
          { k: 'sm', px: 8 },
          { k: 'md', px: 16 },
          { k: 'lg', px: 24 },
          { k: 'xl', px: 32 },
          { k: '2xl', px: 48 },
          { k: '3xl', px: 64 },
          { k: '4xl', px: 80 },
        ] as const
      ).map((row) => (
        <div key={row.k} className="flex items-center gap-4 py-3 border-b border-black/[0.06]">
          <span className="text-[11px] text-gray-400 font-mono shrink-0 w-8">
            {row.k}
          </span>
          <div
            className="bg-gray-900 h-2 rounded-full flex-shrink-0"
            style={{ width: `${row.px}px` }}
          />
          <span className="text-[11px] text-gray-400 font-mono">
            {row.px}px
          </span>
        </div>
      ))}

      <h3 style={{ fontSize: 'var(--type-h3)', fontWeight: 300 }} className="text-gray-900 mt-16 mb-6">
        Shadows & Radius
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          className="border border-black/10 rounded-[var(--radius-card)] p-8 flex flex-col gap-3 min-h-[120px] justify-between"
          style={{ boxShadow: 'var(--shadow-card)' }}
        >
          <p className="text-[14px] text-gray-900">Card</p>
          <code className="text-[11px] font-mono text-gray-400 bg-[#ececf0] px-2 py-1 rounded self-start">
            var(--shadow-card)
          </code>
        </div>
        <div
          className="border border-black/10 rounded-[var(--radius-card)] p-8 flex flex-col gap-3 min-h-[120px] justify-between"
          style={{ boxShadow: 'var(--shadow-card-hover)' }}
        >
          <div
            className="flex items-start justify-between w-full"
          >
            <p className="text-[14px] text-gray-900">Card Hover</p>
          </div>
          <code className="text-[11px] font-mono text-gray-400 bg-[#ececf0] px-2 py-1 rounded self-start">
            var(--shadow-card-hover)
          </code>
        </div>
      </div>
    </div>
  );
}

function DSComponents() {
  return (
    <div>
      <SubpageHeader
        overline="COMPONENTS"
        title="Live Components"
        subtitle="Every reusable UI element from this site, rendered in place."
      />

      <div className="mb-10">
        <p className="text-[11px] tracking-widest uppercase text-gray-400 mt-16 mb-6">NAV LINK</p>
        <div className="flex gap-12 items-start flex-wrap">
          <div className="border border-black/10 rounded-[var(--radius-card)] p-8 mb-4">
            <button type="button" className="relative group focus-ring rounded py-2 px-1 border-0 bg-transparent cursor-default">
              <span className="text-[15px] text-gray-500">Work</span>
            </button>
            <p className="text-[11px] text-gray-400 mt-3">DEFAULT</p>
          </div>
          <div className="border border-black/10 rounded-[var(--radius-card)] p-8 mb-4">
            <button type="button" className="relative group focus-ring rounded py-2 px-1 border-0 bg-transparent cursor-default">
              <span className="text-[15px] text-gray-900 font-medium">Work</span>
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-gray-900 rounded-full" />
            </button>
            <p className="text-[11px] text-gray-400 mt-3">ACTIVE</p>
          </div>
        </div>
      </div>

      <div className="mb-10">
        <p className="text-[11px] tracking-widest uppercase text-gray-400 mt-16 mb-6">METADATA TAG</p>
        <div className="border border-black/10 rounded-[var(--radius-card)] p-8 mb-4">
          <p className="text-[11px] tracking-widest uppercase text-gray-400 leading-relaxed">
            DESIGN SYSTEM | REACT + TYPESCRIPT | 68 COMPONENTS | DOCUMENTATION
          </p>
        </div>
      </div>

      <div className="mb-10">
        <p className="text-[11px] tracking-widest uppercase text-gray-400 mt-16 mb-6">READ TIME</p>
        <div className="border border-black/10 rounded-[var(--radius-card)] p-8 mb-4">
          <p className="text-[13px] text-gray-400">10 MINUTE READ →</p>
        </div>
      </div>

      <div className="mb-10">
        <p className="text-[11px] tracking-widest uppercase text-gray-400 mt-16 mb-6">SECTION LABEL</p>
        <div className="border border-black/10 rounded-[var(--radius-card)] p-8 mb-4">
          <h2 className="type-overline text-gray-400">DESIGN x ENGINEERING</h2>
        </div>
      </div>

      <div className="mb-10">
        <p className="text-[11px] tracking-widest uppercase text-gray-400 mt-16 mb-6">PROJECT CARD (MINI)</p>
        <div className="border border-black/10 rounded-[var(--radius-card)] p-8 mb-4">
          <div className="h-full flex flex-col rounded-xl overflow-hidden bg-white border border-black/[0.06] shadow-[var(--shadow-card)]">
            <div className="bg-gray-100 w-full aspect-video rounded-[var(--radius-card)] mb-5" />
            <div className="project-card-meta flex flex-col flex-1 space-y-2 px-3 pb-3">
              <h3 className="type-body-lg text-gray-900 font-semibold leading-[1.4] line-clamp-2">
                Portfolio Design System
              </h3>
              <p className="text-[11px] tracking-widest uppercase text-gray-400 leading-relaxed mt-2">
                SOLO PROJECT | FIGMA + CURSOR | 2025
              </p>
              <p className="text-[13px] text-gray-400 mt-1">8 MINUTE READ →</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-10">
        <p className="text-[11px] tracking-widest uppercase text-gray-400 mt-16 mb-6">OVERLINE / SECTION IDENTIFIER</p>
        <div className="border border-black/10 rounded-[var(--radius-card)] p-8 mb-4">
          <div className="space-y-4">
          <p className="text-[11px] tracking-widest uppercase text-gray-400">SELECTED WORK</p>
          <p className="text-[11px] tracking-widest uppercase text-gray-400">DESIGN x ENGINEERING</p>
          <p className="text-[11px] tracking-widest uppercase text-gray-400">SIDE PROJECTS — MINI APPS</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function NavDotDemo() {
  const [on, setOn] = useState(false);
  return (
    <button
      type="button"
      onClick={() => setOn((v) => !v)}
      className="relative group focus-ring rounded py-2 px-1 border-0 bg-transparent cursor-pointer"
    >
      <span className="text-[15px] text-gray-900 font-medium">Work</span>
      {on ? (
        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-gray-900 rounded-full" />
      ) : null}
    </button>
  );
}

function DSInteractions() {
  return (
    <div>
      <SubpageHeader
        overline="INTERACTIONS"
        title="Motion & Behavior"
        subtitle="Hover states, transitions, and the rules that govern them."
      />

      <div className="border border-black/10 rounded-[var(--radius-card)] px-6 py-5 mb-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-[14px] text-gray-900 font-medium">Premium Transition</p>
          <code
            className="text-[12px] text-gray-400 bg-[#ececf0] px-3 py-1 rounded"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)
          </code>
        </div>
        <p className="text-[13px] text-gray-400 mt-2">Applied to: card hovers, link fades, shadow transitions.</p>
      </div>

      <p className="text-[11px] tracking-widest uppercase text-gray-400 mb-4">HOVER STATES</p>
      <div className="flex gap-6 flex-wrap mb-10">
        <div className="flex-1 min-w-[160px] border border-black/10 rounded-[var(--radius-card)] p-6 flex flex-col items-center justify-center gap-4 min-h-[140px]">
          <button
            type="button"
            className="text-[15px] text-gray-900 hover:opacity-60 transition-opacity duration-300 cursor-pointer border-0 bg-transparent"
          >
            Hover me
          </button>
          <p className="text-[11px] text-gray-400">Opacity · duration-300</p>
        </div>
        <div className="flex-1 min-w-[160px] border border-black/10 rounded-[var(--radius-card)] p-6 flex flex-col items-center justify-center gap-4 min-h-[140px]">
          <div className="border border-black/10 rounded-[var(--radius-card)] px-6 py-4 cursor-pointer transition-all duration-300 hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-1 text-[14px] text-gray-900">
            Hover me
          </div>
          <p className="text-[11px] text-gray-400">Shadow lift · var(--shadow-card-hover)</p>
        </div>
        <div className="flex-1 min-w-[160px] border border-black/10 rounded-[var(--radius-card)] p-6 flex flex-col items-center justify-center gap-4 min-h-[140px]">
          <NavDotDemo />
          <p className="text-[11px] text-gray-400 text-center">Nav active dot · click to toggle</p>
        </div>
      </div>

      <div className="mt-10 border border-black/10 rounded-[var(--radius-card)] px-6 py-5">
        <p className="text-[14px] font-medium text-gray-900">Scroll Behavior</p>
        <p className="text-[13px] text-gray-400 mt-2">
          Nav applies liquid-glass frosted backdrop after 24px scroll. The nav-scrolled class triggers box-shadow:
          var(--shadow-nav-scrolled).
        </p>
        <code
          className="text-[12px] text-gray-400 bg-[#ececf0] px-3 py-1 rounded mt-3 inline-block"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          window.scrollY &gt; 24 → nav-scrolled
        </code>
      </div>
    </div>
  );
}

function DSPrinciples() {
  const items: { heading: string; body: string }[] = [
    {
      heading: 'One typeface.',
      body: 'Titillium Web is not a neutral choice. It is geometric and slightly technical — matching work that spans healthcare systems, automotive interfaces, and design infrastructure. Hierarchy comes from weight and size, not font switching.',
    },
    {
      heading: 'No accent color.',
      body: 'The portfolio itself is colorless by design: white background, near-black text, muted gray for metadata. The case study work provides all the color. The portfolio is a frame, not a painting.',
    },
    {
      heading: '8pt grid, no exceptions.',
      body: 'Every spacing value — padding, margin, gap — is a multiple of 4 or 8. This creates visual rhythm the eye reads as calm without knowing why.',
    },
    {
      heading: 'Semantic tokens only.',
      body: 'Colors are named by role (muted-foreground, border) not by value. Spacing by relative size (md, xl) not by pixel count. When the system grows, components never need to know what color gray is — only what role it plays.',
    },
    {
      heading: 'Liquid glass nav.',
      body: 'The navigation uses backdrop-filter: blur that activates on scroll past 24px. It stays out of the way until you need it, then signals its presence without a hard border.',
    },
  ];

  return (
    <div>
      <SubpageHeader
        overline="PRINCIPLES"
        title="Design Decisions"
        subtitle="Why things are the way they are."
      />
      {items.map((item) => (
        <div key={item.heading} className="py-10 border-b border-black/[0.06]">
          <h3 style={{ fontSize: 'var(--type-body-lg)' }} className="text-gray-900 font-medium">
            {item.heading}
          </h3>
          <p
            style={{ fontSize: 'var(--type-body)', maxWidth: '42rem' }}
            className="text-gray-500 leading-relaxed mt-3"
          >
            {item.body}
          </p>
        </div>
      ))}
    </div>
  );
}

export function DesignSystemPage({ onNavigate, currentPage: _currentPage }: DesignSystemPageProps) {
  const [activeSection, setActiveSection] = useState<DSSection>('landing');

  if (activeSection === 'landing') {
    return <DSLanding onNavigate={onNavigate} onSectionChange={setActiveSection} />;
  }

  return (
    <DSLayout activeSection={activeSection} onSectionChange={setActiveSection} onNavigate={onNavigate}>
      {activeSection === 'foundation' && <DSFoundation />}
      {activeSection === 'components' && <DSComponents />}
      {activeSection === 'interactions' && <DSInteractions />}
      {activeSection === 'principles' && <DSPrinciples />}
    </DSLayout>
  );
}
