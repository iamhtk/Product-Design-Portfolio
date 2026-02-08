/** Homepage project order (id + title). Used for prev/next navigation at end of case studies. */
export const PROJECT_ORDER: { id: string; title: string }[] = [
  { id: 'CWPC', title: 'CWPC: Unifying Interfaces for Speed and Consistency' },
  { id: 'AutomotiveUX_GM', title: "Automotive UX - Cadillac Escalade Design Proposal" },
  { id: 'RaseetHealth', title: 'Raseet Health: Empowering Local Pharmacies' },
  { id: 'BMW', title: "Redesigning BMW's Digital Interface" },
  { id: 'CalmiRing', title: 'CalmiRing' },
  { id: 'bound', title: 'Bound International UX Audit: Identifying and Solving Key Usability Issues' },
  { id: 'WeddingBliss', title: 'Wedding Bliss - AR Planner Assistant' },
];

/** CalmiRing case study opens in external Notion link (used in Explore more section). */
export const CALMIRING_EXTERNAL_URL = 'https://beautiful-leader-fa9.notion.site/Calmi-Ring-ad8e4dee5a794da48dda0e5ad4bdde33';

/** Project tile media for Explore more tiles (mirrors HomePage). */
export const PROJECT_TILE_MEDIA: Record<string, { image: string; bgColor: string }> = {
  CWPC: { image: '/cwpc/tile_main2.mp4', bgColor: '#6366F1' },
  RaseetHealth: { image: 'raseet/main.png', bgColor: '#4A90E2' },
  AutomotiveUX_GM: { image: 'gm/main_title.png', bgColor: '#f5f5f7' },
  BMW: { image: 'bmw/BMW_main.png', bgColor: '#e8f4f8' },
  CalmiRing: { image: 'calmi/main.png', bgColor: '#f5f5f7' },
  bound: { image: 'bound/bound.png', bgColor: '#fff5f7' },
  WeddingBliss: { image: 'weddingbliss/weddingbliss.png', bgColor: '#f5f5f7' },
};
