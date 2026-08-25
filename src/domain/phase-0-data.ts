/**
 * APERTURE Phase 0 / First 30 Minutes Structured Data
 * Blueprint Slide 15
 * 
 * Defines the initial 30-minute experience units adhering to the CONTENT_UNIT contract.
 */

import type { ContentUnit } from './content-unit';

export const PHASE_0_FIRST_THIRTY_MINUTES: ContentUnit[] = [
  {
    id: 'p0-unit-0-curiosity',
    phaseId: 'PHASE_0_FIRST_CONTACT',
    competencyNodeIds: ['vis-hierarchy'],
    objective: 'Spark curiosity, complete first interaction, feel immediate success before minute 5.',
    prerequisites: [],
    initialExperience: {
      type: 'INTERACT',
      prompt: 'Notice what draws your eye first. Tap the element that feels out of place.',
      initialState: { elementId: 'cta-button', size: 'tiny', emphasis: 'low' },
    },
    explanation: {
      concept: 'Visual Weight & Hierarchy',
      visualDemonstration: 'demonstration/visual-weight-contrast',
      keyTakeaway: 'Important actions must claim visual dominance.',
    },
    guidedPractice: {
      task: 'Scale the primary button until it becomes the immediate focal point.',
      scaffoldingLevel: 'HIGH',
      targetState: { elementId: 'cta-button', size: 'large', emphasis: 'high' },
    },
    independentPractice: {
      task: 'Adjust the heading and button of a new card to direct focus to the action.',
      unsupportedSuccessCriteria: ['Primary CTA has highest visual weight', 'Heading has secondary weight'],
    },
    commonMistakes: [
      {
        pattern: 'Making secondary actions larger than primary actions',
        explanation: 'Creates visual confusion and misdirects user attention.',
      },
    ],
    hints: [
      'Compare the size of the button relative to the surrounding text.',
      'The primary action should stand out within 1 second of looking at the screen.',
    ],
    recoveryPath: {
      triggerCondition: '3 consecutive incorrect adjustments',
      targetedDrillId: 'drill-visual-weight-contrast',
    },
    assessmentCriteria: {
      competencyType: 'RECOGNITION',
      rubric: ['Identifies visual focal point correctly', 'Recognizes hierarchy inversion'],
    },
    masteryCriteria: {
      minimumRung: 1,
      requiresUnaidedSuccess: false,
    },
    nextRecommendedUnitIds: ['p0-unit-1-hierarchy'],
  },
  {
    id: 'p0-unit-1-hierarchy',
    phaseId: 'PHASE_0_FIRST_CONTACT',
    competencyNodeIds: ['vis-hierarchy'],
    objective: 'Understand and arrange visual hierarchy principles.',
    prerequisites: ['p0-unit-0-curiosity'],
    initialExperience: {
      type: 'OBSERVE',
      prompt: 'Compare two screens: one with flat typography and one with structured hierarchy.',
      initialState: { screenA: 'flat', screenB: 'structured' },
    },
    explanation: {
      concept: 'Typographic Scale & Structure',
      visualDemonstration: 'demonstration/type-scale',
      keyTakeaway: 'Size, weight, and contrast create readable scanning paths.',
    },
    guidedPractice: {
      task: 'Assign appropriate typographic weights to Title, Subtitle, and Body text.',
      scaffoldingLevel: 'MEDIUM',
      targetState: { titleWeight: 700, subtitleWeight: 500, bodyWeight: 400 },
    },
    independentPractice: {
      task: 'Format an unstyled article layout using typographic hierarchy principles.',
      unsupportedSuccessCriteria: ['Heading levels are distinct', 'Body text is readable'],
    },
    commonMistakes: [
      {
        pattern: 'Using too many distinct font sizes',
        explanation: 'Clutters visual organization and increases cognitive load.',
      },
    ],
    hints: ['Stick to 3 distinct sizes: Header, Subheader, Body.'],
    recoveryPath: {
      triggerCondition: 'Hierarchy score below 80%',
      targetedDrillId: 'drill-type-hierarchy',
    },
    assessmentCriteria: {
      competencyType: 'DIAGNOSIS',
      rubric: ['Accurately identifies broken type scale', 'Fixes font size relationships'],
    },
    masteryCriteria: {
      minimumRung: 2,
      requiresUnaidedSuccess: true,
    },
    nextRecommendedUnitIds: ['p0-unit-2-spacing'],
  },
  {
    id: 'p0-unit-2-spacing',
    phaseId: 'PHASE_0_FIRST_CONTACT',
    competencyNodeIds: ['vis-spacing'],
    objective: 'Master spacing and alignment fundamentals.',
    prerequisites: ['p0-unit-1-hierarchy'],
    initialExperience: {
      type: 'DIAGNOSE',
      prompt: 'Inspect this crowded list card and spot spacing violations.',
      initialState: { padding: 2, margin: 0 },
    },
    explanation: {
      concept: 'Whitespace & Proximity',
      visualDemonstration: 'demonstration/proximity-grouping',
      keyTakeaway: 'Elements that belong together must sit closer together.',
    },
    guidedPractice: {
      task: 'Adjust padding and margins using an 8px spatial grid system.',
      scaffoldingLevel: 'MEDIUM',
      targetState: { padding: 16, gap: 8 },
    },
    independentPractice: {
      task: 'Space out a messy navigation bar and content section using grid units.',
      unsupportedSuccessCriteria: ['Consistent outer padding', 'Uniform element gaps'],
    },
    commonMistakes: [
      {
        pattern: 'Arbitrary spatial values (e.g. 7px, 13px, 19px)',
        explanation: 'Breaks visual rhythm and predictability.',
      },
    ],
    hints: ['Use multiples of 8 (8, 16, 24, 32).'],
    recoveryPath: {
      triggerCondition: 'Off-grid spacing applied',
      targetedDrillId: 'drill-grid-spacing',
    },
    assessmentCriteria: {
      competencyType: 'MANIPULATION',
      rubric: ['Applies consistent spatial system', 'Resolves proximity conflicts'],
    },
    masteryCriteria: {
      minimumRung: 4,
      requiresUnaidedSuccess: true,
    },
    nextRecommendedUnitIds: ['p0-unit-3-diagnose-fix'],
  },
  {
    id: 'p0-unit-3-diagnose',
    phaseId: 'PHASE_0_FIRST_CONTACT',
    competencyNodeIds: ['vis-hierarchy', 'vis-spacing'],
    objective: 'Diagnose flawed interface in minute 13–18.',
    prerequisites: ['p0-unit-2-spacing'],
    initialExperience: {
      type: 'DIAGNOSE',
      prompt: 'Interface Detective: Identify 3 visual hierarchy and spacing errors on this dashboard card.',
      initialState: { errorCount: 3 },
    },
    explanation: {
      concept: 'Interface Audit & Problem Identification',
      visualDemonstration: 'demonstration/ui-audit-workflow',
      keyTakeaway: 'Identify structural visual flaws before attempting code or layout changes.',
    },
    guidedPractice: {
      task: 'Locate and flag contrast, hierarchy, and alignment violations on the card.',
      scaffoldingLevel: 'MEDIUM',
      targetState: { errorsFlagged: 3 },
    },
    independentPractice: {
      task: 'Audit a cluttered mobile settings screen and isolate all design bugs.',
      unsupportedSuccessCriteria: ['All 3 errors correctly identified', 'No false positives'],
    },
    commonMistakes: [
      {
        pattern: 'Confusing visual preference with design rule violations',
        explanation: 'Focus strictly on visual weight, contrast ratios, and grid spacing alignment.',
      },
    ],
    hints: ['Check headline contrast first, then look at button padding.'],
    recoveryPath: {
      triggerCondition: 'Missed diagnosis items',
      targetedDrillId: 'drill-interface-detective-diagnose',
    },
    assessmentCriteria: {
      competencyType: 'DIAGNOSIS',
      rubric: ['Accurately pinpoints design flaws'],
    },
    masteryCriteria: {
      minimumRung: 4,
      requiresUnaidedSuccess: true,
    },
    nextRecommendedUnitIds: ['p0-unit-4-fix'],
  },
  {
    id: 'p0-unit-4-fix',
    phaseId: 'PHASE_0_FIRST_CONTACT',
    competencyNodeIds: ['vis-hierarchy', 'vis-spacing'],
    objective: 'Fix flawed interface in minute 18–23.',
    prerequisites: ['p0-unit-3-diagnose'],
    initialExperience: {
      type: 'INTERACT',
      prompt: 'Interface Repair: Correct the 3 diagnosed visual bugs on the dashboard card.',
      initialState: { errorCount: 3 },
    },
    explanation: {
      concept: 'Interface Repair & Rule Application',
      visualDemonstration: 'demonstration/ui-repair-workflow',
      keyTakeaway: 'Apply hierarchy and spacing rules systematically to restore visual balance.',
    },
    guidedPractice: {
      task: 'Fix headline contrast, button hierarchy, and container padding step-by-step.',
      scaffoldingLevel: 'LOW',
      targetState: { errorCount: 0 },
    },
    independentPractice: {
      task: 'Repair the flawed mobile settings screen based on your audit.',
      unsupportedSuccessCriteria: ['All 3 errors resolved', 'No new visual bugs introduced'],
    },
    commonMistakes: [
      {
        pattern: 'Fixing spacing without correcting contrast first',
        explanation: 'Leaves readability unaddressed despite clean alignment.',
      },
    ],
    hints: ['Increase headline font weight before adjusting margin space.'],
    recoveryPath: {
      triggerCondition: 'Unresolved visual bugs',
      targetedDrillId: 'drill-interface-detective-fix',
    },
    assessmentCriteria: {
      competencyType: 'MANIPULATION',
      rubric: ['Executes precision visual repair'],
    },
    masteryCriteria: {
      minimumRung: 5,
      requiresUnaidedSuccess: true,
    },
    nextRecommendedUnitIds: ['p0-unit-5-build-tiny-screen'],
  },
  {
    id: 'p0-unit-5-build-tiny-screen',
    phaseId: 'PHASE_0_FIRST_CONTACT',
    competencyNodeIds: ['vis-hierarchy', 'vis-spacing'],
    objective: 'Build a tiny screen from scratch in minute 23–27.',
    prerequisites: ['p0-unit-4-fix'],
    initialExperience: {
      type: 'BUILD',
      prompt: 'Interface Builder: Assemble a complete Profile Card using learned visual rules.',
      initialState: { canvas: 'empty' },
    },
    explanation: {
      concept: 'Composition & Synthesis',
      visualDemonstration: 'demonstration/profile-card-assembly',
      keyTakeaway: 'Combine hierarchy, spacing, and contrast into a cohesive unit.',
    },
    guidedPractice: {
      task: 'Place avatar, name, bio, and primary follow button into a balanced layout.',
      scaffoldingLevel: 'LOW',
      targetState: { layoutComplete: true, visualBalanceScore: 90 },
    },
    independentPractice: {
      task: 'Build a complete Notification Toast component unaided.',
      unsupportedSuccessCriteria: ['Correct visual hierarchy', 'Grid-aligned spacing', 'Clear primary action'],
    },
    commonMistakes: [
      {
        pattern: 'Overcrowding elements inside small containers',
        explanation: 'Destroys breathing room and reduces legibility.',
      },
    ],
    hints: ['Give the avatar sufficient top padding.', 'Ensure the action button is distinctly visible.'],
    recoveryPath: {
      triggerCondition: 'Unbalanced composition score',
      targetedDrillId: 'drill-tiny-screen-composition',
    },
    assessmentCriteria: {
      competencyType: 'CREATION',
      rubric: ['Assembles functional micro-screen', 'Applies visual principles independently'],
    },
    masteryCriteria: {
      minimumRung: 6,
      requiresUnaidedSuccess: true,
    },
    nextRecommendedUnitIds: ['p0-unit-6-reflection'],
  },
  {
    id: 'p0-unit-6-reflection',
    phaseId: 'PHASE_0_FIRST_CONTACT',
    competencyNodeIds: ['vis-hierarchy', 'vis-spacing'],
    objective: 'Reflection and self-assessment of initial competence in minute 27–30.',
    prerequisites: ['p0-unit-5-build-tiny-screen'],
    initialExperience: {
      type: 'OBSERVE',
      prompt: 'Review your initial screen before vs. after applying design perception rules.',
      initialState: { view: 'comparison' },
    },
    explanation: {
      concept: 'Metacognition & Perception Awareness',
      visualDemonstration: 'demonstration/before-after-transformation',
      keyTakeaway: 'You have moved from "knowing nothing" to actively perceiving and fixing visual structures.',
    },
    guidedPractice: {
      task: 'Self-assess your confidence in spotting visual hierarchy and spacing rules.',
      scaffoldingLevel: 'LOW',
      targetState: { reflectionComplete: true },
    },
    independentPractice: {
      task: 'Summarize the core visual rule you discovered during the first 30 minutes.',
      unsupportedSuccessCriteria: ['Identifies hierarchy or spacing principle correctly'],
    },
    commonMistakes: [
      {
        pattern: 'Attributing design success to subjective luck rather than observable rules',
        explanation: 'Design decisions are grounded in visual perception principles.',
      },
    ],
    hints: ['Think back to how scaling the button immediately directed visual focus.'],
    recoveryPath: {
      triggerCondition: 'Low self-assessment alignment',
      targetedDrillId: 'drill-reflection-guided',
    },
    assessmentCriteria: {
      competencyType: 'REASONING',
      rubric: ['Demonstrates metacognitive awareness of visual perception progress'],
    },
    masteryCriteria: {
      minimumRung: 2,
      requiresUnaidedSuccess: false,
    },
    nextRecommendedUnitIds: [],
  },
];
