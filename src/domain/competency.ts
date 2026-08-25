/**
 * APERTURE Learner & Competency Model
 * Blueprint Slides 9, 19, 20
 * 
 * Defines the 4 tiers, 13 transformation rungs (0-12), 
 * 6 assessment competencies, and domain skill categories.
 * Independent of React and UI components.
 */

export const TRANSFORMATION_TIERS = ['PERCEIVE', 'UNDERSTAND', 'BUILD', 'OWN'] as const;
export type TransformationTier = (typeof TRANSFORMATION_TIERS)[number];

export type RungNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export interface TransformationRung {
  rung: RungNumber;
  tier: TransformationTier;
  label: string;
}

export const TRANSFORMATION_RUNGS: Record<RungNumber, TransformationRung> = {
  0: { rung: 0, tier: 'PERCEIVE', label: 'I know nothing' },
  1: { rung: 1, tier: 'PERCEIVE', label: 'I can notice' },
  2: { rung: 2, tier: 'PERCEIVE', label: 'I can recognize' },
  3: { rung: 3, tier: 'UNDERSTAND', label: 'I can explain' },
  4: { rung: 4, tier: 'UNDERSTAND', label: 'I can diagnose' },
  5: { rung: 5, tier: 'UNDERSTAND', label: 'I can fix' },
  6: { rung: 6, tier: 'BUILD', label: 'I can build' },
  7: { rung: 7, tier: 'BUILD', label: 'I can think about users' },
  8: { rung: 8, tier: 'BUILD', label: 'I can solve a design problem' },
  9: { rung: 9, tier: 'OWN', label: 'I can test my solution' },
  10: { rung: 10, tier: 'OWN', label: 'I can iterate' },
  11: { rung: 11, tier: 'OWN', label: 'I can complete a real project' },
  12: { rung: 12, tier: 'OWN', label: 'I can approach new work alone' },
};

export const ASSESSMENT_COMPETENCIES = [
  'RECOGNITION',
  'DIAGNOSIS',
  'MANIPULATION',
  'CREATION',
  'REASONING',
  'TRANSFER',
] as const;

export type AssessmentCompetency = (typeof ASSESSMENT_COMPETENCIES)[number];

export const SKILL_DOMAINS = ['VISUAL_DESIGN', 'UX', 'PRODUCT_DESIGN'] as const;
export type SkillDomain = (typeof SKILL_DOMAINS)[number];

export interface CompetencyNode {
  id: string;
  name: string;
  domain: SkillDomain;
  requiredTier: TransformationTier;
  prerequisiteNodeIds: string[];
}

export const COMPETENCY_NODES: Record<string, CompetencyNode> = {
  'vis-hierarchy': {
    id: 'vis-hierarchy',
    name: 'Visual Hierarchy',
    domain: 'VISUAL_DESIGN',
    requiredTier: 'PERCEIVE',
    prerequisiteNodeIds: [],
  },
  'vis-spacing': {
    id: 'vis-spacing',
    name: 'Spacing & Alignment',
    domain: 'VISUAL_DESIGN',
    requiredTier: 'PERCEIVE',
    prerequisiteNodeIds: ['vis-hierarchy'],
  },
  'vis-typography': {
    id: 'vis-typography',
    name: 'Typography',
    domain: 'VISUAL_DESIGN',
    requiredTier: 'PERCEIVE',
    prerequisiteNodeIds: ['vis-spacing'],
  },
  'vis-color-contrast': {
    id: 'vis-color-contrast',
    name: 'Color & Contrast',
    domain: 'VISUAL_DESIGN',
    requiredTier: 'PERCEIVE',
    prerequisiteNodeIds: ['vis-hierarchy'],
  },
  'vis-consistency': {
    id: 'vis-consistency',
    name: 'Consistency',
    domain: 'VISUAL_DESIGN',
    requiredTier: 'UNDERSTAND',
    prerequisiteNodeIds: ['vis-spacing', 'vis-typography'],
  },
  'ux-user-goals': {
    id: 'ux-user-goals',
    name: 'User Goals & Needs',
    domain: 'UX',
    requiredTier: 'BUILD',
    prerequisiteNodeIds: [],
  },
  'ux-flows-ia': {
    id: 'ux-flows-ia',
    name: 'User Flows & Information Architecture',
    domain: 'UX',
    requiredTier: 'BUILD',
    prerequisiteNodeIds: ['ux-user-goals'],
  },
  'ux-usability-a11y': {
    id: 'ux-usability-a11y',
    name: 'Usability & Accessibility',
    domain: 'UX',
    requiredTier: 'UNDERSTAND',
    prerequisiteNodeIds: ['vis-color-contrast'],
  },
  'prod-framing': {
    id: 'prod-framing',
    name: 'Problem Framing & Ideation',
    domain: 'PRODUCT_DESIGN',
    requiredTier: 'BUILD',
    prerequisiteNodeIds: ['ux-user-goals'],
  },
  'prod-prototyping-testing': {
    id: 'prod-prototyping-testing',
    name: 'Prototyping & Usability Testing',
    domain: 'PRODUCT_DESIGN',
    requiredTier: 'OWN',
    prerequisiteNodeIds: ['prod-framing', 'ux-flows-ia'],
  },
  'prod-iteration': {
    id: 'prod-iteration',
    name: 'Iteration & Portfolio Case Study',
    domain: 'PRODUCT_DESIGN',
    requiredTier: 'OWN',
    prerequisiteNodeIds: ['prod-prototyping-testing'],
  },
};
