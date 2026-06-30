import { designTokens } from '../../lib/designTokens';

/** Homepage project order (id + title). Used for prev/next navigation at end of case studies. */
export const PROJECT_ORDER: { id: string; title: string }[] = [
  { id: 'CWPC', title: 'CWPC: Unifying Interfaces for Speed and Consistency' },
  { id: 'CWPC_DS', title: 'CWPC DS Case study' },
  { id: 'AutomotiveUX_GM', title: "Automotive UX - Cadillac Escalade Design Proposal" },
  { id: 'RaseetHealth', title: 'Raseet Health: Empowering Local Pharmacies' },
  { id: 'RaseetHealth_DS', title: 'Raseet Health DS Case study' },
  { id: 'CoyaxDesignSystem', title: 'Coyax Design System' },
  { id: 'BMW', title: "Redesigning BMW's Digital Interface" },
  { id: 'CalmiRing', title: 'CalmiRing' },
  { id: 'jobgenius', title: 'JobGenius' },
  { id: 'bound', title: 'Bound International UX Audit: Identifying and Solving Key Usability Issues' },
  { id: 'WeddingBliss', title: 'Wedding Bliss - AR Planner Assistant' },
  { id: 'BuiltDeployed_Project1', title: 'Desi Pizza House' },
  { id: 'BuiltDeployed_Project2', title: 'Tandoori Junction' },
];

// ═══════════════════════════════════════════════════════════════════════════
// ENABLE / DISABLE PROJECTS (single source of truth)
// ═══════════════════════════════════════════════════════════════════════════
// Used by: HomePage (tiles clickable or not) and ExploreMoreSection (prev/next).
// Set to true = clickable; false = tile still visible but not clickable.
// ═══════════════════════════════════════════════════════════════════════════
export const PROJECT_ENABLED: Record<string, boolean> = {
  CWPC: true,
  CWPC_DS: true,
  AutomotiveUX_GM: true,
  RaseetHealth: true,
  RaseetHealth_DS: true,
  CoyaxDesignSystem: true,
  BMW: true,
  PortfolioDesignSystem: true,
  CalmiRing: true,
  jobgenius: false,
  bound: false,
  WeddingBliss: false,
  BuiltDeployed_Project1: true,
  BuiltDeployed_Project2: true,
};

/** URL slugs for project pages. Used in /project/<slug>. Omit entry to use id.toLowerCase(). */
export const PROJECT_SLUGS: Record<string, string> = {
  CWPC: 'cwpc-prism-design-system',
  CWPC_DS: 'cwpc-ds-case-study',
  AutomotiveUX_GM: 'automotive-ux-cadillac-escalade',
  RaseetHealth: 'raseet-health',
  RaseetHealth_DS: 'raseet-health-ds-case-study',
  CoyaxDesignSystem: 'coyax-design-system',
  BMW: 'bmw-idrive-redesign',
  PortfolioDesignSystem: 'portfolio-design-system',
  CalmiRing: 'calmiring',
  jobgenius: 'jobgenius',
  bound: 'bound-international-ux-audit',
  WeddingBliss: 'wedding-bliss',
  BuiltDeployed_Project1: 'desi-pizza-house',
  BuiltDeployed_Project2: 'tandoori-junction',
};

/** CalmiRing case study opens in external Notion link (used in Explore more section). */
export const CALMIRING_EXTERNAL_URL = 'https://beautiful-leader-fa9.notion.site/Calmi-Ring-ad8e4dee5a794da48dda0e5ad4bdde33';

/** Project tile media for Explore more tiles (mirrors HomePage main title images). */
export const PROJECT_TILE_MEDIA: Record<string, { image: string; bgColor: string }> = {
  CWPC: { image: '/DS/prism-tile.webp', bgColor: '#6366F1' },
  CWPC_DS: { image: '/main_title/main_cwpc.webp', bgColor: '#6366F1' },
  AutomotiveUX_GM: { image: '/main_title/main_gm.webp', bgColor: '#f5f5f7' },
  RaseetHealth: { image: '/main_title/main_raseet.webp', bgColor: '#4A90E2' },
  RaseetHealth_DS: { image: '/main_title/main_raseet.webp', bgColor: '#4A90E2' },
  CoyaxDesignSystem: { image: '/coyax/DS/main-tile-silver.webp', bgColor: '#e7e5e4' },
  BMW: { image: '/main_title/main_bmw.webp', bgColor: '#e8f4f8' },
  PortfolioDesignSystem: {
    image: '/miniapps/f3.png',
    bgColor: designTokens.colors.imagePlaceholder,
  },
  CalmiRing: { image: '/main_title/main_calmi.webp', bgColor: '#f5f5f7' },
  jobgenius: { image: '/main_title/main_jobgenius.png', bgColor: '#f5f5f7' },
  bound: { image: '/main_title/main_bound.png', bgColor: '#fff5f7' },
  WeddingBliss: { image: '/main_title/main_weddingbliss.png', bgColor: '#f5f5f7' },
  BuiltDeployed_Project1: { image: '', bgColor: '#E8822A' },
  BuiltDeployed_Project2: { image: '', bgColor: '#D4641C' },
};
