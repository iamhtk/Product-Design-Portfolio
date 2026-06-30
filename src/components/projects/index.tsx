// This file maps project IDs to their components and defines homepage project order
import React, { lazy } from 'react';

export { PROJECT_ORDER } from './projectOrder';

export interface ProjectComponentProps {
  onBack: () => void;
  onProjectClick?: (projectId: string) => void;
}

export const projectComponents: Record<string, React.LazyExoticComponent<React.ComponentType<ProjectComponentProps>>> = {
  CWPC: lazy(() => import('./CWPC').then(m => ({ default: m.CWPCProject }))),
  AutomotiveUX_GM: lazy(() => import('./AutomotiveUX_GM').then(m => ({ default: m.AutomotiveUX_GMProject }))),
  RaseetHealth: lazy(() => import('./RaseetHealth').then(m => ({ default: m.RaseetHealthProject }))),
  BMW: lazy(() => import('./BMW').then(m => ({ default: m.BMWProject }))),
  CalmiRing: lazy(() => import('./CalmiRing').then(m => ({ default: m.CalmiRingProject }))),
  bound: lazy(() => import('./bound').then(m => ({ default: m.BoundProject }))),
  WeddingBliss: lazy(() => import('./WeddingBliss').then(m => ({ default: m.WeddingBlissProject }))),
  PortfolioDesignSystem: lazy(() => import('./PortfolioDesignSystem').then(m => ({ default: m.PortfolioDesignSystemProject }))),
  CWPC_DS: lazy(() => import('./CwpcDsCaseStudy').then(m => ({ default: m.CwpcDsCaseStudyProject }))),
  RaseetHealth_DS: lazy(() => import('./RaseetHealthDsCaseStudy').then(m => ({ default: m.RaseetHealthDsCaseStudyProject }))),
  BuiltDeployed_Project1: lazy(() => import('./DesiPizzaHouse').then(m => ({ default: m.DesiPizzaHouseProject }))),
  BuiltDeployed_Project2: lazy(() => import('./TandooriJunction').then(m => ({ default: m.TandooriJunctionProject }))),
  CoyaxDesignSystem: lazy(() => import('./CoyaxDesignSystem').then(m => ({ default: m.CoyaxDesignSystemProject }))),
};
