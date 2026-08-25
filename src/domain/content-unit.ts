/**
 * APERTURE Content Architecture (CONTENT_UNIT Contract)
 * Blueprint Slide 29
 * 
 * Defines the precise structured contract between curriculum and interaction engine.
 * 
 * Implementation Notes:
 * - Field names use TypeScript camelCase conventions (e.g. initialExperience, nextRecommendedUnitIds)
 *   to map the Blueprint's conceptual snake_case contract (initial_experience, next_recommended).
 * - `initialExperience.type` ('OBSERVE' | 'INTERACT' | 'DIAGNOSE' | 'BUILD') is an engine implementation
 *   discriminator to type-check exercise state payloads cleanly in TypeScript.
 */

import { z } from 'zod';

export const ContentUnitSchema = z.object({
  id: z.string().min(1),
  phaseId: z.enum([
    'PHASE_0_FIRST_CONTACT',
    'PHASE_1_TRAIN_THE_EYE',
    'PHASE_2_INTERFACE_DETECTIVE',
    'PHASE_3_INTERFACE_BUILDER',
    'PHASE_4_UX_THINKING',
    'PHASE_5_REAL_PRODUCT_DESIGN',
    'PHASE_6_INDEPENDENT',
  ]),
  competencyNodeIds: z.array(z.string()).min(1),
  objective: z.string().min(1),
  prerequisites: z.array(z.string()),
  
  initialExperience: z.object({
    type: z.enum(['OBSERVE', 'INTERACT', 'DIAGNOSE', 'BUILD']),
    prompt: z.string().min(1),
    initialState: z.record(z.unknown()),
  }),

  explanation: z.object({
    concept: z.string().min(1),
    visualDemonstration: z.string(),
    keyTakeaway: z.string().min(1),
  }),

  guidedPractice: z.object({
    task: z.string().min(1),
    scaffoldingLevel: z.enum(['HIGH', 'MEDIUM', 'LOW']),
    targetState: z.record(z.unknown()),
  }),

  independentPractice: z.object({
    task: z.string().min(1),
    unsupportedSuccessCriteria: z.array(z.string()).min(1),
  }),

  commonMistakes: z.array(
    z.object({
      pattern: z.string().min(1),
      explanation: z.string().min(1),
    })
  ),

  hints: z.array(z.string()),

  recoveryPath: z.object({
    triggerCondition: z.string().min(1),
    targetedDrillId: z.string().min(1),
  }),

  assessmentCriteria: z.object({
    competencyType: z.enum([
      'RECOGNITION',
      'DIAGNOSIS',
      'MANIPULATION',
      'CREATION',
      'REASONING',
      'TRANSFER',
    ]),
    rubric: z.array(z.string()).min(1),
  }),

  masteryCriteria: z.object({
    minimumRung: z.number().min(0).max(12),
    requiresUnaidedSuccess: z.boolean(),
  }),

  nextRecommendedUnitIds: z.array(z.string()),
});

export type ContentUnit = z.infer<typeof ContentUnitSchema>;
