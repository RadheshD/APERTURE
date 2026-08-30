# APERTURE

APERTURE is an immersive interactive design laboratory for complete beginners that teaches them to see, think, and build like designers by training perception before vocabulary.

---

## 🎯 Core Transformation

- **From:** “I know absolutely nothing about UI/UX.”
- **To:** “I can independently approach and complete a real design problem.”

### What APERTURE Rejects
* Video-course / video-lecture behavior
* Lesson-catalog-first LMS behavior
* Generic AI tutor behavior
* Premature Figma-clone behavior
* Gamification-first behavior

---

## 🔄 Product Philosophy & Learning Methodology (Blueprint Vision)

### The Learning Loop
The core concept loop is explicitly:

$$\text{See} \rightarrow \text{Interact} \rightarrow \text{Choose} \rightarrow \text{Discover} \rightarrow \text{Understand} \rightarrow \text{Practice} \rightarrow \text{Build} \rightarrow \text{Test} \rightarrow \text{Iterate} \rightarrow \text{Solve}$$

This loop repeats per concept and scales from a short exercise to a full capstone project.

### Learner Model (13 Transformation Rungs)
Mastery is cumulative across 4 primary tiers. This serves as the foundation for the curriculum graph:

1. **PERCEIVE**
   * 0 — I know nothing
   * 1 — I can notice
   * 2 — I can recognize
2. **UNDERSTAND**
   * 3 — I can explain
   * 4 — I can diagnose
   * 5 — I can fix
3. **BUILD**
   * 6 — I can build
   * 7 — I can think about users
   * 8 — I can solve a design problem
4. **OWN**
   * 9 — I can test my solution
   * 10 — I can iterate
   * 11 — I can complete a real project
   * 12 — I can approach new work alone

### Engineering & Repository Principles
* **Perception before vocabulary:** Visual interaction leads, terminology follows.
* **Feedback over grades:** No arbitrary scores; focus on 'why' and 'what next'.
* **Transfer over memorization:** True mastery requires applying concepts to unseen problems.
* **Deterministic rule-based adaptation for MVP:** AI/ML is strictly deferred until real usage data exists.
* **Structured content over hard-coded experiences:** UI renders dynamically from schemas.
* **Minimal architecture:** Strict separation of concerns.
* **No speculative infrastructure:** No Redis, Docker, state-management libraries, or CI/CD until concretely needed.
* **No unnecessary files/dependencies:** A perfectly clean repository is a strict requirement.
* **UI/UX quality is part of the product itself:** The application must embody the design principles it teaches.

---

## 🏗️ Major Product Architecture (Actual Implementation)

The current implementation is client-side/local and does not yet include backend persistence. It focuses exclusively on the foundational domain schemas, engine infrastructure, and initial prototypes.

The architecture is strictly separated into:

1. **Domain / Content System (`src/domain`)**
   * Acts as the single source of truth for the curriculum.
   * Defines strict schema contracts (`ContentUnit`, `CompetencyNode`).
   * Content is structured data, detailing objectives, practice states, mistakes, and hints.

2. **Challenge Engine (`src/engine`)**
   * A deterministic engine infrastructure milestone that processes learner interactions. It is infrastructure that later stages can consume, rather than a finished learner-facing adaptive assessment system.
   * **Assessment:** Evaluates attempt correctness and dynamically generates a 5-part `FeedbackSequence` by combining live evidence with authored domain content. Does *not* evaluate mastery.
   * **Mastery:** Evaluates transfer requirements and competency graduation rules.
   * **Learner State:** Immutable pure functions tracking hints, retries, and competency evidence.
   * **Scaffolding:** Dynamically computes UI constraints (hints, limits) based on learner velocity.
   * **Router:** Deterministically decides the next action (Proceed, Retry, Recovery, Transfer) using explicit configuration thresholds.
   * **Orchestrator:** A pure composition layer uniting the primitives.
   * **Telemetry:** An event abstraction contract currently decoupled from persistence.

3. **Interaction / Runtime Layer (`src/app`, `src/components`)**
   * Consumes the `ContentUnit` schemas to render the interactive UI laboratory.
   * Implements the Stage 2 First 30-Minute prototype.
   * Includes the Stage 3 Design System and Motion Language.

---

## 🗺️ Implementation Status & Future Roadmap

The roadmap is derived directly from the Master Product Blueprint.

| Stage | Blueprint name | Status | Evidence / current state |
|-------|----------------|--------|--------------------------|
| **1** | Curriculum architecture + competency map | ✅ Complete | Domain contracts and 13-rung graph exist in `src/domain/` (commit `d573acd`). |
| **2** | Prototype the first 30 minutes | ✅ Complete | React canvas/UI prototype built for Phase 0 (commit `e09f640`). |
| **3** | Design system + motion language | ✅ Complete | Visual foundation and micro-interactions established (commit `9a074db`). |
| **4** | Challenge engine | ✅ Complete | Deterministic evaluation/routing infrastructure built (commit `2560bd3`). |
| **5** | Interactive builder / editor | 🚧 Current / In Progress | (Currently pending implementation) |
| **6** | Adaptive mentor + assessment | 🔒 Deferred | 🔒 Deferred |
| **7** | End-to-end capstone | ⏳ Planned | |
| **8** | Beginner usability testing | ⏳ Planned | |
| **9** | Performance + accessibility polish | ⏳ Planned | |
| **10** | Public launch | ⏳ Planned | |
