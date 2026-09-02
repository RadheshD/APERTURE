/**
 * Phase 3 Interface Builder Domain Models & Evaluation Logic
 */

import { ContentUnit } from './content-unit';

export type ElementType = 'heading' | 'subheading' | 'body_text' | 'primary_button' | 'secondary_button';
export type ElementEmphasis = 'low' | 'medium' | 'high';
export type GridSpacing = 8 | 16 | 24 | 32;
export type ContainerId = 'card_a' | 'card_b' | 'none';

export interface BuilderElement {
  id: string;
  type: ElementType;
  label: string;
  emphasis: ElementEmphasis;
  spacingBelow: GridSpacing;
  containerId: ContainerId;
}

export interface BuilderCanvasState {
  elements: BuilderElement[];
  selectedElementId: string | null;
}

export interface DerivedCanvasAssessment {
  hierarchyCorrect: boolean;
  primaryActionDominant: boolean;
  spatialRhythmCorrect: boolean;
  groupingCorrect: boolean;
}

/**
 * Pure state updater functions (immutable)
 */
export function reorderElements(state: BuilderCanvasState, fromIndex: number, toIndex: number): BuilderCanvasState {
  if (
    fromIndex < 0 ||
    fromIndex >= state.elements.length ||
    toIndex < 0 ||
    toIndex >= state.elements.length ||
    fromIndex === toIndex
  ) {
    return state;
  }

  const newElements = [...state.elements];
  const [movedItem] = newElements.splice(fromIndex, 1);
  newElements.splice(toIndex, 0, movedItem);

  return {
    ...state,
    elements: newElements,
  };
}

export function updateElementEmphasis(
  state: BuilderCanvasState,
  elementId: string,
  emphasis: ElementEmphasis
): BuilderCanvasState {
  return {
    ...state,
    elements: state.elements.map((el) => (el.id === elementId ? { ...el, emphasis } : el)),
  };
}

export function updateElementSpacing(
  state: BuilderCanvasState,
  elementId: string,
  spacingBelow: GridSpacing
): BuilderCanvasState {
  return {
    ...state,
    elements: state.elements.map((el) => (el.id === elementId ? { ...el, spacingBelow } : el)),
  };
}

export function updateElementContainer(
  state: BuilderCanvasState,
  elementId: string,
  containerId: ContainerId
): BuilderCanvasState {
  return {
    ...state,
    elements: state.elements.map((el) => (el.id === elementId ? { ...el, containerId } : el)),
  };
}

const VALID_GRID_VALUES: number[] = [8, 16, 24, 32];
const VALID_EMPHASIS: ElementEmphasis[] = ['low', 'medium', 'high'];

/**
 * Deterministic assessment derivation from raw/malformed builder state.
 */
export function deriveCanvasAssessmentState(state: BuilderCanvasState, unitId: string): DerivedCanvasAssessment {
  if (!state || !Array.isArray(state.elements) || state.elements.length === 0) {
    return {
      hierarchyCorrect: false,
      primaryActionDominant: false,
      spatialRhythmCorrect: false,
      groupingCorrect: false,
    };
  }

  const elements = state.elements;

  // 1. Grid & raw state boundary check
  const allSpacingsOnGrid = elements.every((el) => VALID_GRID_VALUES.includes(Number(el.spacingBelow)));
  const allEmphasisValid = elements.every((el) => VALID_EMPHASIS.includes(el.emphasis));

  if (!allSpacingsOnGrid || !allEmphasisValid) {
    return {
      hierarchyCorrect: false,
      primaryActionDominant: false,
      spatialRhythmCorrect: false,
      groupingCorrect: false,
    };
  }

  // Helper getters
  const findEl = (id: string) => elements.find((el) => el.id === id);
  const getIndex = (id: string) => elements.findIndex((el) => el.id === id);

  const heading = findEl('el_heading');
  const subheading = findEl('el_subheading');
  const bodyText = findEl('el_body');
  const primaryBtn = findEl('el_primary_btn');
  const secondaryBtn = findEl('el_secondary_btn');

  // Hierarchy Evaluation
  let hierarchyCorrect = false;
  if (heading && bodyText && primaryBtn) {
    const headingIdx = getIndex('el_heading');
    const bodyIdx = getIndex('el_body');
    const primaryIdx = getIndex('el_primary_btn');

    let sequenceValid = headingIdx < bodyIdx && bodyIdx < primaryIdx;

    if (subheading) {
      const subIdx = getIndex('el_subheading');
      sequenceValid = sequenceValid && headingIdx < subIdx && subIdx < bodyIdx;
    }

    if (secondaryBtn) {
      const secIdx = getIndex('el_secondary_btn');
      sequenceValid = sequenceValid && primaryIdx < secIdx;
    }

    const headingEmphasisValid = heading.emphasis === 'high';
    hierarchyCorrect = sequenceValid && headingEmphasisValid;
  }

  // Primary Action Dominance
  let primaryActionDominant = false;
  if (primaryBtn) {
    if (primaryBtn.emphasis === 'high') {
      if (secondaryBtn) {
        primaryActionDominant = secondaryBtn.emphasis === 'medium' || secondaryBtn.emphasis === 'low';
      } else {
        primaryActionDominant = true;
      }
    }
  }

  // Spatial Rhythm Evaluation (Internal proximity <= External spacing)
  let spatialRhythmCorrect = false;
  if (heading && bodyText) {
    const internalSpacing = heading.spacingBelow;
    const externalSpacing = bodyText.spacingBelow;
    // Spatial rhythm requires tight proximity inside content block (8/16) and larger spacing before action/section (24/32)
    spatialRhythmCorrect = internalSpacing <= 16 && externalSpacing >= 24;
  }

  // Container Grouping Evaluation
  let groupingCorrect = false;
  if (unitId === 'UNIT_3_1_HIERARCHY') {
    groupingCorrect = elements.every((el) => el.containerId === 'card_a');
  } else if (unitId === 'UNIT_3_2_SPACING' || unitId === 'UNIT_3_3_SYNTHESIS') {
    const cardAOk = elements
      .filter((el) => ['el_heading', 'el_subheading', 'el_body'].includes(el.id))
      .every((el) => el.containerId === 'card_a');
    const cardBOk = elements
      .filter((el) => ['el_primary_btn', 'el_secondary_btn'].includes(el.id))
      .every((el) => el.containerId === 'card_b');
    groupingCorrect = cardAOk && cardBOk;
  }

  return {
    hierarchyCorrect,
    primaryActionDominant,
    spatialRhythmCorrect,
    groupingCorrect,
  };
}

/**
 * Phase 3 Content Units conforming to ContentUnitSchema
 */
export const UNIT_3_1_HIERARCHY: ContentUnit = {
  id: 'UNIT_3_1_HIERARCHY',
  phaseId: 'PHASE_3_INTERFACE_BUILDER',
  competencyNodeIds: ['comp_visual_hierarchy'],
  objective: 'Manipulate interface elements to establish visual hierarchy and primary action dominance.',
  prerequisites: ['PHASE_0_UNIT_1'],
  initialExperience: {
    type: 'BUILD',
    prompt: 'Organize the hero banner elements so the title is prominent and the primary CTA stands out.',
    initialState: {
      elements: [
        { id: 'el_body', type: 'body_text', label: 'Start building professional interfaces today.', emphasis: 'medium', spacingBelow: 24, containerId: 'card_a' },
        { id: 'el_primary_btn', type: 'primary_button', label: 'Get Started Now', emphasis: 'low', spacingBelow: 16, containerId: 'card_a' },
        { id: 'el_heading', type: 'heading', label: 'Master Visual Design', emphasis: 'low', spacingBelow: 8, containerId: 'card_a' },
        { id: 'el_secondary_btn', type: 'secondary_button', label: 'Learn More', emphasis: 'high', spacingBelow: 16, containerId: 'card_a' },
      ],
    },
  },
  explanation: {
    concept: 'Visual Hierarchy & Primary Action Dominance',
    visualDemonstration: 'High-emphasis titles draw immediate focus, while primary buttons dominate secondary actions.',
    keyTakeaway: 'Size, weight, and order dictate visual reading order and direct user action.',
  },
  guidedPractice: {
    task: 'Reorder elements into Heading -> Body -> Primary Action -> Secondary Action, set Heading to High emphasis, and Primary Button to High emphasis.',
    scaffoldingLevel: 'HIGH',
    targetState: {
      hierarchyCorrect: true,
      primaryActionDominant: true,
    },
  },
  independentPractice: {
    task: 'Unaided hierarchy arrangement.',
    unsupportedSuccessCriteria: ['hierarchyCorrect', 'primaryActionDominant'],
  },
  commonMistakes: [
    {
      pattern: 'secondary_button_dominant',
      explanation: 'Secondary action button has equal or higher visual weight than primary action button.',
    },
    {
      pattern: 'inverted_hierarchy',
      explanation: 'Body text or actions appear before the primary heading.',
    },
  ],
  hints: [
    'Move the title heading to the top and set its emphasis to High.',
    'Make sure the primary button has High emphasis and secondary action has Low or Medium emphasis.',
  ],
  recoveryPath: {
    triggerCondition: '3 repeated hierarchy errors',
    targetedDrillId: 'DRILL_HIERARCHY_RECOVERY',
  },
  assessmentCriteria: {
    competencyType: 'MANIPULATION',
    rubric: ['Heading placed at top with High emphasis', 'Primary button dominates secondary action'],
  },
  masteryCriteria: {
    minimumRung: 3,
    requiresUnaidedSuccess: false,
  },
  nextRecommendedUnitIds: ['UNIT_3_2_SPACING'],
};

export const UNIT_3_2_SPACING: ContentUnit = {
  id: 'UNIT_3_2_SPACING',
  phaseId: 'PHASE_3_INTERFACE_BUILDER',
  competencyNodeIds: ['comp_spatial_rhythm'],
  objective: 'Apply proximity reasoning and spatial rhythm to group related content elements.',
  prerequisites: ['UNIT_3_1_HIERARCHY'],
  initialExperience: {
    type: 'BUILD',
    prompt: 'Adjust spacing and container grouping to create clear relationships between content and actions.',
    initialState: {
      elements: [
        { id: 'el_heading', type: 'heading', label: 'Account Dashboard', emphasis: 'high', spacingBelow: 24, containerId: 'card_a' },
        { id: 'el_subheading', type: 'subheading', label: 'Manage your settings and preferences.', emphasis: 'medium', spacingBelow: 8, containerId: 'card_a' },
        { id: 'el_body', type: 'body_text', label: 'Your account is active and verified.', emphasis: 'low', spacingBelow: 8, containerId: 'card_b' },
        { id: 'el_primary_btn', type: 'primary_button', label: 'Save Changes', emphasis: 'high', spacingBelow: 16, containerId: 'card_a' },
        { id: 'el_secondary_btn', type: 'secondary_button', label: 'Cancel', emphasis: 'low', spacingBelow: 16, containerId: 'card_a' },
      ],
    },
  },
  explanation: {
    concept: 'Spatial Proximity & Container Grouping',
    visualDemonstration: 'Elements grouped inside shared containers with tight internal spacing create clear semantic units.',
    keyTakeaway: 'Spacing inside a group must be smaller than spacing between distinct groups.',
  },
  guidedPractice: {
    task: 'Group content in Card A and actions in Card B. Set heading spacing below to 8px/16px and body spacing below to 24px/32px.',
    scaffoldingLevel: 'MEDIUM',
    targetState: {
      spatialRhythmCorrect: true,
      groupingCorrect: true,
    },
  },
  independentPractice: {
    task: 'Unaided spatial grouping.',
    unsupportedSuccessCriteria: ['spatialRhythmCorrect', 'groupingCorrect'],
  },
  commonMistakes: [
    {
      pattern: 'loose_internal_spacing',
      explanation: 'Internal spacing between title and body is larger than external section spacing.',
    },
    {
      pattern: 'misgrouped_actions',
      explanation: 'Action buttons are assigned to unrelated content containers.',
    },
  ],
  hints: [
    'Assign heading, subheading, and body text to Card A, and action buttons to Card B.',
    'Ensure heading spacing is 8px or 16px, and body spacing is 24px or 32px.',
  ],
  recoveryPath: {
    triggerCondition: '3 repeated spacing errors',
    targetedDrillId: 'DRILL_SPACING_RECOVERY',
  },
  assessmentCriteria: {
    competencyType: 'REASONING',
    rubric: ['Tight internal proximity inside Card A', 'Action buttons correctly grouped in Card B'],
  },
  masteryCriteria: {
    minimumRung: 3,
    requiresUnaidedSuccess: false,
  },
  nextRecommendedUnitIds: ['UNIT_3_3_SYNTHESIS'],
};

export const UNIT_3_3_SYNTHESIS: ContentUnit = {
  id: 'UNIT_3_3_SYNTHESIS',
  phaseId: 'PHASE_3_INTERFACE_BUILDER',
  competencyNodeIds: ['comp_interface_synthesis'],
  objective: 'Independently synthesize visual hierarchy, primary action dominance, spatial rhythm, and container grouping.',
  prerequisites: ['UNIT_3_2_SPACING'],
  initialExperience: {
    type: 'BUILD',
    prompt: 'Construct a complete interface composition from scratch unifying hierarchy, spatial rhythm, and grouping.',
    initialState: {
      elements: [
        { id: 'el_body', type: 'body_text', label: 'Review your subscription plan details below.', emphasis: 'high', spacingBelow: 8, containerId: 'card_b' },
        { id: 'el_secondary_btn', type: 'secondary_button', label: 'Decline', emphasis: 'high', spacingBelow: 24, containerId: 'card_a' },
        { id: 'el_heading', type: 'heading', label: 'Upgrade Subscription', emphasis: 'low', spacingBelow: 32, containerId: 'card_b' },
        { id: 'el_primary_btn', type: 'primary_button', label: 'Confirm Upgrade', emphasis: 'low', spacingBelow: 8, containerId: 'card_a' },
      ],
    },
  },
  explanation: {
    concept: 'Independent Interface Synthesis',
    visualDemonstration: 'Complete UI layout where hierarchy, action dominance, spatial rhythm, and container grouping work together.',
    keyTakeaway: 'Professional design unifies all spatial and visual principles into a cohesive composition.',
  },
  guidedPractice: {
    task: 'Synthesize the composition: order elements correctly, set title and primary button emphasis to High, set internal spacing <= 16px and section spacing >= 24px, and assign content to Card A and actions to Card B.',
    scaffoldingLevel: 'LOW',
    targetState: {
      hierarchyCorrect: true,
      primaryActionDominant: true,
      spatialRhythmCorrect: true,
      groupingCorrect: true,
    },
  },
  independentPractice: {
    task: 'Unaided interface composition synthesis.',
    unsupportedSuccessCriteria: ['hierarchyCorrect', 'primaryActionDominant', 'spatialRhythmCorrect', 'groupingCorrect'],
  },
  commonMistakes: [
    {
      pattern: 'unbalanced_synthesis',
      explanation: 'The layout fails to establish clear primary action dominance or proper spatial grouping.',
    },
  ],
  hints: [
    'Place heading first in Card A with High emphasis.',
    'Set Primary Button to High emphasis in Card B and Secondary Button to Low emphasis.',
  ],
  recoveryPath: {
    triggerCondition: '3 repeated synthesis errors',
    targetedDrillId: 'DRILL_SYNTHESIS_RECOVERY',
  },
  assessmentCriteria: {
    competencyType: 'TRANSFER',
    rubric: ['Unified hierarchy, action dominance, spatial rhythm, and container grouping'],
  },
  masteryCriteria: {
    minimumRung: 4,
    requiresUnaidedSuccess: true,
  },
  nextRecommendedUnitIds: [],
};
