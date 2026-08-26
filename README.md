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

## 🔄 The Learning Method

The core concept loop is explicitly:

$$\text{See} \rightarrow \text{Interact} \rightarrow \text{Choose} \rightarrow \text{Discover} \rightarrow \text{Understand} \rightarrow \text{Practice} \rightarrow \text{Build} \rightarrow \text{Test} \rightarrow \text{Iterate} \rightarrow \text{Solve}$$

This loop repeats per concept and scales from a short exercise to a full capstone project.

---

## 🪜 Learner Model (13 Transformation Rungs)

Mastery is cumulative across 4 primary tiers:

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

---

## 📚 Curriculum Phases & First 30 Minutes

### 7 Curriculum Phases
* **Phase 0:** First Contact *(Highest Guidance)*
* **Phase 1:** Train the Eye
* **Phase 2:** Interface Detective
* **Phase 3:** Interface Builder
* **Phase 4:** UX Thinking
* **Phase 5:** Real Product Design
* **Phase 6:** Independent *(Lowest Guidance)*

### First 30-Minute Intended Flow
* `00–03 min`: Curiosity, first interaction, immediate success
* `03–08 min`: Visual hierarchy
* `08–13 min`: Spacing & alignment
* `13–18 min`: Diagnose flawed interface
* `18–23 min`: Fix interface
* `23–27 min`: Build tiny screen
* `27–30 min`: Reflection

*Goal:* Genuine feeling of competence before Minute 5.

---

## ⚙️ Core Architecture & Tech Stack

### Frontend & Rendering Strategy
* **Framework:** React / Next.js
* **Rendering Split:**
  * **~90% DOM / CSS / Motion:** Standard interactive UI elements, layout exercises, and challenges.
  * **~10% WebGL / Canvas:** Reserved specifically for spatial navigation experiences (e.g., Skill Graph & Project Workspace).

### Backend & Storage (Provisional)
* **API Layer:** FastAPI (Python) — *Provisional choice for AI/Adaptive integration*
* **Persistence:** PostgreSQL — *Durable storage for learner state, attempts, and projects*

### Architectural Constraints
* **No Speculative Infrastructure:** No Redis, Zustand, Docker, or CI/CD pipelines until concrete runtime requirements emerge.
* **Modular Architecture:** Clear system boundaries between Interaction Engine, Learner State & Assessment, AI Mentor Layer, and Content System.

---

## 📦 Content Architecture (`CONTENT_UNIT`)

Learning units are structured data rather than hard-coded screens. The underlying contract:
* `objective`
* `prerequisite`
* `initial_experience`
* `explanation`
* `guided_practice`
* `independent_practice`
* `common_mistakes`
* `hints`
* `recovery_path`
* `assessment_criteria`
* `mastery_criteria`
* `next_recommended`

---

## 🚀 MVP Scope

### In Scope for MVP
* First-Contact Experience (Phase 0)
* Train-the-Eye Challenges (Phase 1)
* Interface Detective + Builder (Phases 2–3)
* One Guided Mini-Project
* Rule-Based Adaptation (fixed thresholds, templated drills, deterministic branching)
* One End-to-End Capstone Brief

### Excluded from MVP
* Full learned adaptive AI model (comes after real usage data)
* Social / Community features & Marketplaces
* Certificates
* Full Phase 4–6 breadth
* Sound design system & Native mobile apps

---

## 🗺️ Roadmap Status

1. **Stage 1: Curriculum Architecture & Competency Map** (COMPLETE)
   * Domain contracts for `CONTENT_UNIT` and Competency Rungs verified.
2. **Stage 2: First 30 Minutes Experience Prototype** (COMPLETE)
   * Plays through the full 0–30 min onboarding loop using dynamic visual exercises.
3. **Stage 3: Design System + Motion Language** (NEXT - UNIMPLEMENTED)
4. **Stage 4: Challenge Engine** (UNIMPLEMENTED)
5. **Stage 5: Interactive Builder / Editor** (UNIMPLEMENTED)
6. **Stage 6: Adaptive Mentor + Assessment** (UNIMPLEMENTED)
7. **Stage 7: End-to-End Capstone** (UNIMPLEMENTED)
8. **Stage 8: Beginner Usability Testing** (UNIMPLEMENTED)
9. **Stage 9: Performance + Accessibility Polish** (UNIMPLEMENTED)
10. **Stage 10: Public Launch** (UNIMPLEMENTED)

---

## 🛠️ Implemented System Architecture (Stage 2 Status)

The system currently implements a local client-side orchestration model to run the First 30 Minutes laboratory experience without speculative backend or state-management frameworks.

### Implemented Routes & Components
- `/` — Lab Entry point introducing the core laboratory transformation.
- `/lab` — Orchestration shell rendering:
  - `PhaseZeroContainer.tsx` — Linear state-machine tracking progression via local `stepIndex`.
  - `ExerciseCanvas.tsx` — Consumes `PHASE_0_FIRST_THIRTY_MINUTES` raw content to render the 7 core visual interactive exercises.
  - `ExplanationOverlay.tsx` — Implements the "Understand" beat, showing takeaways *after* discovery criteria are satisfied.

### Interaction Architecture & Verification Metrics
1. **0–3 min (Curiosity):** Scaling slider targeting button emphasis (Success: scale $\ge 1.5$).
2. **3–8 min (Visual Hierarchy):** A/B structure option chooser (Success: clicks correct layout B).
3. **8–13 min (Spacing & Alignment):** Spacing adjuster aligning padding and gap parameters to an 8px grid (Success: padding = 16px, gap = 8px).
4. **13–18 min (Diagnose Flawed Interface):** Audit pin tool to mark contrast, hierarchy, and layout anomalies (Success: pins all 3 flaws).
5. **18–23 min (Fix Interface):** Contextual sliders correcting diagnosed visual parameters (Success: targets met).
6. **23–27 min (Build Tiny Screen):** Keyboard-accessible vertical item sorting tool (Success: order resolves to Avatar -> Name -> Bio -> Button).
7. **27–30 min (Reflection):** Multiple choice check selecting design principle recognition.

---

## 🧪 Verification & Gate Checks
- **Typechecking:** Passed (`npm run typecheck` / `tsc --noEmit` verified).
- **Tests:** Stage 1 unit tests (`npm test` / `tsx --test`) fully verified.
- **Production Build:** Next.js static output builds compiled successfully (`npm run build`).
