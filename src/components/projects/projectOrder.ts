/** Homepage project order (id + title). Used for prev/next navigation at end of case studies. */
export const PROJECT_ORDER: { id: string; title: string }[] = [
  { id: 'CWPC', title: 'CWPC: Unifying Interfaces for Speed and Consistency' },
  { id: 'AutomotiveUX_GM', title: "Automotive UX - Cadillac Escalade Design Proposal" },
  { id: 'RaseetHealth', title: 'Raseet Health: Empowering Local Pharmacies' },
  { id: 'BMW', title: "Redesigning BMW's Digital Interface" },
  { id: 'CalmiRing', title: 'CalmiRing' },
  { id: 'jobgenius', title: 'JobGenius' },
  { id: 'bound', title: 'Bound International UX Audit: Identifying and Solving Key Usability Issues' },
  { id: 'WeddingBliss', title: 'Wedding Bliss - AR Planner Assistant' },
];

// ═══════════════════════════════════════════════════════════════════════════
// ENABLE / DISABLE PROJECTS (single source of truth)
// ═══════════════════════════════════════════════════════════════════════════
// Used by: HomePage (tiles clickable or not) and ExploreMoreSection (prev/next).
// Set to true = clickable; false = tile still visible but not clickable.
// ═══════════════════════════════════════════════════════════════════════════
export const PROJECT_ENABLED: Record<string, boolean> = {
  CWPC: false,
  AutomotiveUX_GM: true,
  RaseetHealth: false,
  BMW: true,
  CalmiRing: true,
  jobgenius: false,
  bound: false,
  WeddingBliss: false,
};

/** CalmiRing case study opens in external Notion link (used in Explore more section). */
export const CALMIRING_EXTERNAL_URL = 'https://beautiful-leader-fa9.notion.site/Calmi-Ring-ad8e4dee5a794da48dda0e5ad4bdde33';

/** Project tile media for Explore more tiles (mirrors HomePage main title images). */
export const PROJECT_TILE_MEDIA: Record<string, { image: string; bgColor: string }> = {
  CWPC: { image: '/main_title/main_cwpc.png', bgColor: '#6366F1' },
  AutomotiveUX_GM: { image: '/main_title/main_gm.png', bgColor: '#f5f5f7' },
  RaseetHealth: { image: '/main_title/main_raseet.png', bgColor: '#4A90E2' },
  BMW: { image: '/main_title/main_bmw.png', bgColor: '#e8f4f8' },
  CalmiRing: { image: '/main_title/main_calmi.png', bgColor: '#f5f5f7' },
  jobgenius: { image: '/main_title/main_jobgenius.png', bgColor: '#f5f5f7' },
  bound: { image: '/main_title/main_bound.png', bgColor: '#fff5f7' },
  WeddingBliss: { image: '/main_title/main_weddingbliss.png', bgColor: '#f5f5f7' },
};
