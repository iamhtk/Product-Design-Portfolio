// types.ts

/** One block in the page: text, image/video, or color palette. Order in array = order on page. */
export type ContentBlock =
  | {
      type: 'text';
      header?: string;
      subheader?: string;
      content: string;
      /** Optional bullet points below content */
      items?: string[];
      /** Align header, subheader, content, and items: left | center | right | justify */
      align?: 'left' | 'center' | 'right' | 'justify';
      /** Header indent: 0 = none, 1 = 2.5rem, 2 = 5rem */
      headerIndent?: 0 | 1 | 2;
      /** Subheader indent: 0 = none, 1 = 2.5rem, 2 = 5rem */
      subheaderIndent?: 0 | 1 | 2;
      /** Content indent: 0 = none, 1 = 2.5rem, 2 = 5rem */
      contentIndent?: 0 | 1 | 2;
      /** Items (bullet list) indent: 0 = default (1.5rem), 1 = 2.5rem, 2 = 5rem */
      itemsIndent?: 0 | 1 | 2;
      /** @deprecated Use contentIndent: 1 instead */
      indent?: boolean;
    }
  | {
      type: 'textBullets';
      header?: string;
      subheader?: string;
      items: string[];
      /** Align header, subheader, and items: left | center | right | justify */
      align?: 'left' | 'center' | 'right' | 'justify';
      /** Header indent: 0 = none, 1 = 2.5rem, 2 = 5rem */
      headerIndent?: 0 | 1 | 2;
      /** Subheader indent: 0 = none, 1 = 2.5rem, 2 = 5rem */
      subheaderIndent?: 0 | 1 | 2;
      /** Bullet list indent: 0 = default (1.5rem), 1 = 2.5rem, 2 = 5rem */
      listIndent?: 0 | 1 | 2;
      /** @deprecated Use listIndent: 1 instead */
      indent?: boolean;
      /** @deprecated Use listIndent: 2 instead */
      indentLevel?: 2;
    }
  | { type: 'image'; src: string; /** Align image: left | center | right */ align?: 'left' | 'center' | 'right' | 'justify'; indent?: boolean; indentLevel?: 2; maxHeight?: string; /** Optional grouping for row rendering */ group?: 'row' | 'row3' | 'mosaic4' }
  | { type: 'video'; src: string; /** Align video: left | center | right */ align?: 'left' | 'center' | 'right' | 'justify'; indent?: boolean; indentLevel?: 2; maxHeight?: string; /** Optional grouping for row rendering */ group?: 'row' | 'row3' | 'mosaic4' }
  | {
      type: 'textImageRow';
      header?: string;
      subheader?: string;
      content: string;
      /** Optional bullet points below content */
      items?: string[];
      src: string;
      /** Layout: 'right' = text left / image right (default), 'left' = image left / text right */
      imageSide?: 'left' | 'right';
      /** Align text column (header, subheader, content, items): left | center | right | justify */
      align?: 'left' | 'center' | 'right' | 'justify';
      /** Align image: left | center | right (within its column) */
      imageAlign?: 'left' | 'center' | 'right';
      /** Header indent: 0 = none, 1 = 2.5rem, 2 = 5rem */
      headerIndent?: 0 | 1 | 2;
      /** Subheader indent: 0 = none, 1 = 2.5rem, 2 = 5rem */
      subheaderIndent?: 0 | 1 | 2;
      /** Items (bullet list) indent: 0 = default (1.5rem), 1 = 2.5rem, 2 = 5rem */
      itemsIndent?: 0 | 1 | 2;
      /** Max height for the image (e.g. '640px') */
      maxHeight?: string;
      /** Max width for the image (e.g. '640px') */
      maxWidth?: string;
    }
  | { type: 'textTextRow'; headerLeft?: string; contentLeft: string; headerRight?: string; contentRight: string; /** Align both columns: left | center | right | justify */ align?: 'left' | 'center' | 'right' | 'justify' }
  | { type: 'colors'; colors: string[] }
  | { type: 'imageCaption'; src: string; caption: string; maxHeight?: string }
  | { type: 'externalLink'; label: string; href: string; variant?: 'button' | 'inline'; align?: 'left' | 'center' | 'right' }
  | { type: 'impactStatsInline' };

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
