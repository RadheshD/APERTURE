import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  BuilderCanvasState,
  BuilderElement,
  deriveCanvasAssessmentState,
  reorderElements,
  updateElementContainer,
  updateElementEmphasis,
  updateElementSpacing,
} from '../../src/domain/phase-3-builder-data';

describe('Pure Builder Logic & Immutability', () => {
  const initialElements: BuilderElement[] = [
    { id: 'el_heading', type: 'heading', label: 'Title', emphasis: 'low', spacingBelow: 8, containerId: 'card_a' },
    { id: 'el_body', type: 'body_text', label: 'Body Text', emphasis: 'medium', spacingBelow: 16, containerId: 'card_a' },
    { id: 'el_primary_btn', type: 'primary_button', label: 'Submit', emphasis: 'low', spacingBelow: 24, containerId: 'card_a' },
  ];

  const initialState: BuilderCanvasState = {
    elements: initialElements,
    selectedElementId: 'el_heading',
  };

  it('reorders elements immutably and produces a new array', () => {
    const nextState = reorderElements(initialState, 0, 2);
    assert.notEqual(nextState, initialState);
    assert.notEqual(nextState.elements, initialState.elements);
    assert.equal(nextState.elements[0].id, 'el_body');
    assert.equal(nextState.elements[2].id, 'el_heading');
    // Ensure original state was not mutated
    assert.equal(initialState.elements[0].id, 'el_heading');
  });

  it('updates element emphasis immutably', () => {
    const nextState = updateElementEmphasis(initialState, 'el_heading', 'high');
    assert.notEqual(nextState, initialState);
    assert.equal(nextState.elements[0].emphasis, 'high');
    assert.equal(initialState.elements[0].emphasis, 'low');
  });

  it('updates element spacing immutably', () => {
    const nextState = updateElementSpacing(initialState, 'el_heading', 32);
    assert.equal(nextState.elements[0].spacingBelow, 32);
    assert.equal(initialState.elements[0].spacingBelow, 8);
  });

  it('updates element container immutably', () => {
    const nextState = updateElementContainer(initialState, 'el_primary_btn', 'card_b');
    assert.equal(nextState.elements[2].containerId, 'card_b');
    assert.equal(initialState.elements[2].containerId, 'card_a');
  });
});

describe('Pure Assessment Derivation & Boundary Testing', () => {
  it('evaluates valid visual hierarchy and primary action dominance', () => {
    const validState: BuilderCanvasState = {
      elements: [
        { id: 'el_heading', type: 'heading', label: 'Title', emphasis: 'high', spacingBelow: 8, containerId: 'card_a' },
        { id: 'el_body', type: 'body_text', label: 'Body', emphasis: 'low', spacingBelow: 24, containerId: 'card_a' },
        { id: 'el_primary_btn', type: 'primary_button', label: 'Action', emphasis: 'high', spacingBelow: 16, containerId: 'card_a' },
        { id: 'el_secondary_btn', type: 'secondary_button', label: 'Cancel', emphasis: 'low', spacingBelow: 16, containerId: 'card_a' },
      ],
      selectedElementId: null,
    };

    const derived = deriveCanvasAssessmentState(validState, 'UNIT_3_1_HIERARCHY');
    assert.equal(derived.hierarchyCorrect, true);
    assert.equal(derived.primaryActionDominant, true);
    assert.equal(derived.spatialRhythmCorrect, true);
    assert.equal(derived.groupingCorrect, true);
  });

  it('fails spatial rhythm if spacing is off-grid (e.g. 13px)', () => {
    const offGridState: BuilderCanvasState = {
      elements: [
        { id: 'el_heading', type: 'heading', label: 'Title', emphasis: 'high', spacingBelow: 13 as any, containerId: 'card_a' },
        { id: 'el_body', type: 'body_text', label: 'Body', emphasis: 'low', spacingBelow: 24, containerId: 'card_a' },
        { id: 'el_primary_btn', type: 'primary_button', label: 'Action', emphasis: 'high', spacingBelow: 16, containerId: 'card_a' },
      ],
      selectedElementId: null,
    };

    const derived = deriveCanvasAssessmentState(offGridState, 'UNIT_3_1_HIERARCHY');
    assert.equal(derived.spatialRhythmCorrect, false);
    assert.equal(derived.hierarchyCorrect, false);
  });

  it('fails hierarchy if elements are in wrong visual order', () => {
    const invertedState: BuilderCanvasState = {
      elements: [
        { id: 'el_body', type: 'body_text', label: 'Body', emphasis: 'low', spacingBelow: 8, containerId: 'card_a' },
        { id: 'el_heading', type: 'heading', label: 'Title', emphasis: 'high', spacingBelow: 8, containerId: 'card_a' },
        { id: 'el_primary_btn', type: 'primary_button', label: 'Action', emphasis: 'high', spacingBelow: 16, containerId: 'card_a' },
      ],
      selectedElementId: null,
    };

    const derived = deriveCanvasAssessmentState(invertedState, 'UNIT_3_1_HIERARCHY');
    assert.equal(derived.hierarchyCorrect, false);
  });

  it('handles empty or malformed state safely without crashing', () => {
    const emptyState: BuilderCanvasState = { elements: [], selectedElementId: null };
    const derivedEmpty = deriveCanvasAssessmentState(emptyState, 'UNIT_3_1_HIERARCHY');
    assert.deepEqual(derivedEmpty, {
      hierarchyCorrect: false,
      primaryActionDominant: false,
      spatialRhythmCorrect: false,
      groupingCorrect: false,
    });

    const nullState = deriveCanvasAssessmentState(null as any, 'UNIT_3_1_HIERARCHY');
    assert.deepEqual(nullState, {
      hierarchyCorrect: false,
      primaryActionDominant: false,
      spatialRhythmCorrect: false,
      groupingCorrect: false,
    });
  });

  it('verifies assessment derivation does not mutate builder state', () => {
    const rawState: BuilderCanvasState = {
      elements: [
        { id: 'el_heading', type: 'heading', label: 'Title', emphasis: 'high', spacingBelow: 8, containerId: 'card_a' },
        { id: 'el_body', type: 'body_text', label: 'Body', emphasis: 'low', spacingBelow: 24, containerId: 'card_a' },
        { id: 'el_primary_btn', type: 'primary_button', label: 'Action', emphasis: 'high', spacingBelow: 16, containerId: 'card_a' },
      ],
      selectedElementId: null,
    };

    const cloneBefore = JSON.parse(JSON.stringify(rawState));
    deriveCanvasAssessmentState(rawState, 'UNIT_3_1_HIERARCHY');
    assert.deepEqual(rawState, cloneBefore);
  });
});
