// This file maps project IDs to their components and defines homepage project order
import React from 'react';
import { AutomotiveUX_GMProject } from './AutomotiveUX_GM';
import { CWPCProject } from './CWPC';
import { RaseetHealthProject } from './RaseetHealth';
import { BMWProject } from './BMW';
import { CalmiRingProject } from './CalmiRing';
import { BoundProject } from './bound';
import { WeddingBlissProject } from './WeddingBliss';

export { PROJECT_ORDER } from './projectOrder';

export interface ProjectComponentProps {
  onBack: () => void;
  onProjectClick?: (projectId: string) => void;
}

export const projectComponents: Record<string, React.ComponentType<ProjectComponentProps>> = {
  CWPC: CWPCProject,
  AutomotiveUX_GM: AutomotiveUX_GMProject,
  RaseetHealth: RaseetHealthProject,
  BMW: BMWProject,
  CalmiRing: CalmiRingProject,
  bound: BoundProject,
  WeddingBliss: WeddingBlissProject,
};
