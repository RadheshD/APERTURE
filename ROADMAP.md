# APERTURE — Roadmap

This is the authoritative stage sequence derived from the Master Product Blueprint. Each stage lists its objective, dependencies, acceptance criteria, and verified status.

Stages 1–5 are confirmed complete against source code, test results, and Git history as of 2026-10-16.

---

## Stage 1 — Curriculum Architecture & Competency Map

**Objective:** Establish the foundational domain schemas and competency graph that all subsequent stages depend on.

**Acceptance criteria:**
- 7 curriculum phases defined with guidance-level metadata
- 4 transformation tiers and 13 rung labels (0–12) defined
- 6 assessment competency types defined
- Prerequisite competency graph modelled
- `ContentUnit` schema (Zod) fully specified

**Status: ✅ Complete** — Commit `d573acd`

**Evidence:**
- `src/domain/curriculum.ts` — 7 phases
- `src/domain/competency.ts` — 4 tiers, 13 rungs (0–12), 6 assessment competencies, 3 skill domains, prerequisite graph (`COMPETENCY_NODES`)
- `src/domain/content-unit.ts` — `ContentUnitSchema` + `ContentUnit` type

---

## Stage 2 — Prototype the First 30 Minutes

**Objective:** Build the Phase 0 First Contact interactive prototype covering the learner's first 30 minutes.

**Acceptance criteria:**
- Phase 0 content units authored and schema-validated
- Interactive canvas rendering exercises
- Explanation overlay flow functional
- Route accessible at `/lab`

**Status: ✅ Complete** — Commit `e09f640`

**Evidence:**
- `src/domain/phase-0-data.ts` — Phase 0 `ContentUnit` records
- `src/components/lab/` — `PhaseZeroContainer`, `ExerciseCanvas`, `ExplanationOverlay`, `exercises/`
- `src/app/lab/page.tsx` — route

---

## Stage 3 — Design System & Motion Language

**Objective:** Establish the visual foundation and micro-interaction system that the entire product must adhere to.

**Acceptance criteria:**
- CSS custom property design tokens defined (color, spacing, motion)
- 8px grid system established
- `prefers-reduced-motion` supported
- Base component resets and focus-visible styles set
- Motion easings and durations defined

**Status: ✅ Complete** — Commit `9a074db`

**Evidence:**
- `src/app/globals.css` — full design token system, motion language, accessibility resets

---

## Stage 4 — Challenge Engine

**Objective:** Build a deterministic, rule-based evaluation and routing infrastructure that later stages consume.

> This is infrastructure, not a learner-facing adaptive assessment system. It does not evaluate mastery adaptively; it applies explicit configuration thresholds.

**Acceptance criteria:**
- Attempt evaluation against `ContentUnit.guidedPractice.targetState`
- 5-part `FeedbackSequence` derived from domain content
- Immutable `LearnerState` with rung non-degradation guarantee
- Mastery evaluation with transfer requirement
- Deterministic routing (PROCEED / RETRY / RECOVERY / TRANSFER / STAY)
- Rule-based scaffolding escalation
- Telemetry event contract with 14 named event types
- Composition orchestrator uniting all primitives
- 7 engine test suites covering all modules

**Status: ✅ Complete** — Commit `2560bd3`

**Evidence:**
- `src/engine/` — 7 modules (assessment, learner-state, mastery, orchestrator, router, scaffolding, telemetry)
- `test/engine/` — 7 test files covering all 7 modules (24 tests at the time of verification, 2026-10-16)

---

## Stage 5 — Interactive Builder / Editor

**Objective:** Build the Phase 3 Interface Builder: a three-unit interactive canvas where learners manipulate visual hierarchy, spatial rhythm, and container grouping, evaluated by the Stage 4 Challenge Engine.

**Acceptance criteria:**
- Phase 3 content units authored (`UNIT_3_1_HIERARCHY`, `UNIT_3_2_SPACING`, `UNIT_3_3_SYNTHESIS`) and schema-validated
- Pure builder state functions (reorder, update emphasis/spacing/container) — immutable
- `deriveCanvasAssessmentState()` — deterministic evaluation of canvas arrangement
- `BuilderCanvas` — visual canvas grouped by container, keyboard-navigable
- `BuilderControls` — properties panel with mouse and keyboard (`Alt+Up`/`Alt+Down`) reorder
- `BuilderContainer` — integrates canvas, controls, and `ChallengeEngine` into a complete exercise flow
- Feedback modal driven by engine assessment result
- Scaffolding level displayed reactively
- Route accessible at `/builder`
- Home page links to both `/lab` and `/builder`
- Builder + engine integration tests passing

**Status: ✅ Complete** — Commit `5ed6f8b` (2026-09-02)

**Evidence:**
- `src/domain/phase-3-builder-data.ts` — 3 units + pure state functions + assessment derivation
- `src/components/builder/` — `BuilderContainer`, `BuilderCanvas`, `BuilderControls`
- `src/app/builder/page.tsx` — route
- `test/builder/builder-logic.test.ts` — pure builder state and assessment derivation
- `test/builder/builder-engine.test.ts` — Phase 3 ↔ ChallengeEngine integration
- Run `npm test` for current results

---

## Stage 6 — Adaptive Mentor & Assessment

**Blueprint name:** Adaptive mentor + assessment

**Blueprint references (verified against the local blueprint PDF):**
- p.16 — Adaptive learning: repeated weak spacing triggers targeted spacing drills.
- p.17 — Two tiers: *MVP rule-based* (fixed mastery thresholds, templated drills triggered by rules) and *later true adaptive model* (learned, generated practice, only once real mistake-pattern data exists from MVP cohorts).
- p.30 — MVP includes rule-based feedback and competency tracking; the full adaptive AI mentor model is explicitly not in MVP.
- p.33 — "Stage 6 (adaptive mentor) explicitly depends on real usage data from Stages 4–5."

**Repository principle:** *"Deterministic rule-based adaptation for MVP: AI/ML is strictly deferred until real usage data exists."*

### Tier A — Rule-based MVP 🔓 Unblocked, pending implementation-plan approval

Fixed mastery thresholds and templated targeted drills triggered by deterministic rules (e.g. 3 weak spacing attempts → spacing micro-drill), per blueprint p.17. No AI/ML. Existing `ChallengeEngine`, `LearnerState` and `router` contracts appear able to support it.

**Interpretation note:** this document reads the p.33 usage-data dependency as applying to Tier B (the learned model), because p.17 describes Tier A as fixed rules needing no training data. Confirm this reading before treating Tier A as approved work.

**Acceptance criteria (proposed — to be confirmed):**
- Rule set maps repeated weak attempts on a competency to a targeted micro-drill
- Drill routing integrated into `determineNextAction`, reusing `ContentUnit.recoveryPath`
- Rules are pure, deterministic and unit-tested
- Content units exist for the phases the drills target (Phases 1 and 2 currently have none)

**Suggested first steps:** (1) finalize the acceptance criteria above; (2) author `ContentUnit` records for Phases 1 and 2; (3) route drills through `determineNextAction`.

**Status: 🔓 Unblocked, not started** — No implementation until a plan is separately approved.

### Tier B — True adaptive (learned models, generated practice) 🔒 Deferred

Requires real usage data from MVP cohorts, backend persistence of learner state, and a telemetry backend sink. Do not begin until those exist.

**Status: 🔒 Deferred** — Blocked on the usage-data dependency (blueprint p.17, p.33), backend persistence and a telemetry sink.

---

## Stage 7 — End-to-End Capstone ⏳ Planned

**Objective:** Build the complete Phase 5 Real Product Design capstone flow — a professional-grade design brief that a learner works through start to finish, demonstrating mastery across all prior competency nodes.

**Dependencies:** Stages 1–5 complete ✅; Stage 6 scoped or explicitly separated.

**Status: ⏳ Planned** — No implementation.

---

## Stage 8 — Beginner Usability Testing ⏳ Planned

**Objective:** Conduct structured usability testing with real beginners (Rung 0 learners). Identify confusion points, vocabulary mismatches, and flow breakdowns.

**Dependencies:** Stage 7 complete; at least a navigable end-to-end flow exists.

**Status: ⏳ Planned** — No implementation.

---

## Stage 9 — Performance & Accessibility Polish ⏳ Planned

**Objective:** Achieve WCAG 2.1 AA accessibility compliance, Core Web Vitals targets, and full `prefers-reduced-motion` coverage across the complete product.

**Dependencies:** Stage 8 findings incorporated; final feature scope stable.

**Status: ⏳ Planned** — No implementation.

---

## Stage 10 — Public Launch ⏳ Planned

**Objective:** Launch APERTURE to the public. Includes production deployment, monitoring, error tracking, security headers, rate limiting, and privacy policy.

**Dependencies:** All prior stages complete; security controls per `ARCHITECTURE.md` in place.

**Status: ⏳ Planned** — No implementation.

---

## Content Roadmap (Cross-cutting)

Curriculum content (`ContentUnit` data) exists only for Phase 0 and Phase 3. The following phases have no authored content yet and block the learner journey:

| Phase | Title | Content status |
|-------|-------|----------------|
| Phase 0 | First Contact | ✅ Authored (`phase-0-data.ts`) |
| Phase 1 | Train the Eye | ❌ No content |
| Phase 2 | Interface Detective | ❌ No content |
| Phase 3 | Interface Builder | ✅ Authored (`phase-3-builder-data.ts`, 3 units) |
| Phase 4 | UX Thinking | ❌ No content |
| Phase 5 | Real Product Design | ❌ No content |
| Phase 6 | Independent | ❌ No content |

Content authorship for Phases 1, 2, 4, 5, and 6 is not a separate implementation stage in the current roadmap — it is work that must be done as part of the relevant stage (Stage 7 requires at minimum Phase 5 content).
