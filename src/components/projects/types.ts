// types.ts

/** One block in the page: text, image/video, or color palette. Order in array = order on page. */
export type ContentBlock =
  | { type: 'text'; header?: string; content: string; indent?: boolean }
  | { type: 'textBullets'; header?: string; items: string[]; indent?: boolean; indentLevel?: 2 }
  | { type: 'image'; src: string; indent?: boolean; indentLevel?: 2; maxHeight?: string }
  | { type: 'video'; src: string; indent?: boolean; indentLevel?: 2; maxHeight?: string }
  | { type: 'textImageRow'; header?: string; content: string; src: string }
  | { type: 'textTextRow'; headerLeft?: string; contentLeft: string; headerRight?: string; contentRight: string }
  | { type: 'colors'; colors: string[] };

export type ProjectSection = {
  header?: string; // Optional - leave empty if you don't want a header
  content: string;
};

export type ProjectMetaItem = {
  label: string;
  value: string | string[];
};

export type ProjectBlock =
  | { type: 'hero'; title?: string; subtitle?: string; image: string; badges?: string[] }
  | { type: 'spacer'; size?: 'sm' | 'md' | 'lg' }
  | { type: 'divider' }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'p'; text: string }
  | { type: 'bullets'; items: string[] }
  | { type: 'metaGrid'; items: ProjectMetaItem[] }
  | {
      type: 'cards';
      columns?: 2 | 3 | 4;
      items: { title: string; text: string }[];
    }
  | { type: 'image'; src: string; alt?: string; caption?: string; wide?: boolean }
  | {
      type: 'gallery';
      columns?: 2 | 3;
      images: { src: string; alt?: string }[];
    }
  | {
      type: 'mosaic';
      images: { src: string; alt?: string }[];
    }
  | {
      type: 'twoCol';
      left: { title?: string; text: string };
      right: { title?: string; text: string };
    }
  | {
      type: 'callout';
      title?: string;
      text: string;
    }
  | {
      type: 'cta';
      title: string;
      text: string;
      email?: string;
    };

export type Project = {
  title: string;
  company: string;
  subtitle: string;
  headerColor: string;
  /** Progress bar color (scroll indicator). Each project defines its own const; not from projectOrder. */
  progressBarColor?: string;
  /** Color for the "scroll to case study" arrow. Falls back to headerColor if not set. */
  arrowColor?: string;
  icon?: string;
  role: string;
  team: string;
  when: string;
  overview: string;

  // Old system (kept so other projects do not break)
  sections: ProjectSection[];
  images: string[];

  // New system
  theme?: 'light' | 'dark';
  blocks?: ProjectBlock[];

  colorPalette?: string[];
};
