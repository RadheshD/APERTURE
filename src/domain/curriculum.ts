/**
 * APERTURE Curriculum Architecture Domain Model
 * Blueprint Slides 10-14
 * 
 * Defines the strict 7 curriculum phases.
 * Independent of React and UI components.
 */

export const CURRICULUM_PHASES = [
  'PHASE_0_FIRST_CONTACT',
  'PHASE_1_TRAIN_THE_EYE',
  'PHASE_2_INTERFACE_DETECTIVE',
  'PHASE_3_INTERFACE_BUILDER',
  'PHASE_4_UX_THINKING',
  'PHASE_5_REAL_PRODUCT_DESIGN',
  'PHASE_6_INDEPENDENT',
] as const;

export type CurriculumPhaseId = (typeof CURRICULUM_PHASES)[number];

export interface CurriculumPhase {
  id: CurriculumPhaseId;
  numericPhase: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  title: string;
  guidanceLevel: 'MAXIMUM' | 'HIGH' | 'MODERATE' | 'BALANCED' | 'GUIDED' | 'MINIMAL' | 'INDEPENDENT';
  description: string;
}

export const CURRICULUM_PHASE_DEFINITIONS: Record<CurriculumPhaseId, CurriculumPhase> = {
  PHASE_0_FIRST_CONTACT: {
    id: 'PHASE_0_FIRST_CONTACT',
    numericPhase: 0,
    title: 'First Contact',
    guidanceLevel: 'MAXIMUM',
    description: 'Curiosity, first interaction, visual hierarchy, spacing, alignment, diagnosis, fix, build tiny screen, reflection.',
  },
  PHASE_1_TRAIN_THE_EYE: {
    id: 'PHASE_1_TRAIN_THE_EYE',
    numericPhase: 1,
    title: 'Train the Eye',
    guidanceLevel: 'HIGH',
    description: 'Perception training before vocabulary. Spotting hierarchy, spacing, typography, and contrast differences.',
  },
  PHASE_2_INTERFACE_DETECTIVE: {
    id: 'PHASE_2_INTERFACE_DETECTIVE',
    numericPhase: 2,
    title: 'Interface Detective',
    guidanceLevel: 'MODERATE',
    description: 'Diagnosing flawed interfaces, explaining visual bugs, identifying underlying usability violations.',
  },
  PHASE_3_INTERFACE_BUILDER: {
    id: 'PHASE_3_INTERFACE_BUILDER',
    numericPhase: 3,
    title: 'Interface Builder',
    guidanceLevel: 'BALANCED',
    description: 'Constructing components and micro-interfaces using core visual design rules.',
  },
  PHASE_4_UX_THINKING: {
    id: 'PHASE_4_UX_THINKING',
    numericPhase: 4,
    title: 'UX Thinking',
    guidanceLevel: 'GUIDED',
    description: 'User goals, user flows, information architecture, and accessibility fundamentals.',
  },
  PHASE_5_REAL_PRODUCT_DESIGN: {
    id: 'PHASE_5_REAL_PRODUCT_DESIGN',
    numericPhase: 5,
    title: 'Real Product Design',
    guidanceLevel: 'MINIMAL',
    description: 'Complete capstone briefs following professional product design pipeline.',
  },
  PHASE_6_INDEPENDENT: {
    id: 'PHASE_6_INDEPENDENT',
    numericPhase: 6,
    title: 'Independent',
    guidanceLevel: 'INDEPENDENT',
    description: 'Approaching and solving new, unseen design problems without system scaffolding.',
  },
};
