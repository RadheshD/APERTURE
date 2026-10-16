# APERTURE

APERTURE is an immersive interactive design laboratory for complete beginners that teaches them to see, think, and build like designers by training perception before vocabulary.

---

## The Core Transformation

- **From:** "I know absolutely nothing about UI/UX."
- **To:** "I can independently approach and complete a real design problem."

### What APERTURE Rejects
* Video-course / video-lecture behavior
* Lesson-catalog-first LMS behavior
* Generic AI tutor behavior
* Premature Figma-clone behavior
* Gamification-first behavior

---

## 🔄 Product Philosophy & Learning Methodology

### The Learning Loop

$$\text{See} \rightarrow \text{Interact} \rightarrow \text{Choose} \rightarrow \text{Discover} \rightarrow \text{Understand} \rightarrow \text{Practice} \rightarrow \text{Build} \rightarrow \text{Test} \rightarrow \text{Iterate} \rightarrow \text{Solve}$$

This loop repeats per concept and scales from a short exercise to a full capstone project.

### Learner Model (13 Transformation Rungs)
Mastery is cumulative across 4 primary tiers:

1. **PERCEIVE** — Rungs 0–2: notice → recognize
2. **UNDERSTAND** — Rungs 3–5: explain → diagnose → fix
3. **BUILD** — Rungs 6–8: build → think about users → solve a design problem
4. **OWN** — Rungs 9–12: test → iterate → complete a real project → approach new work alone

### Engineering & Repository Principles
* **Perception before vocabulary:** Visual interaction leads, terminology follows.
* **Feedback over grades:** No arbitrary scores; focus on *why* and *what next*.
* **Transfer over memorization:** True mastery requires applying concepts to unseen problems.
* **Deterministic rule-based adaptation for MVP:** AI/ML is strictly deferred until real usage data exists.
* **Structured content over hard-coded experiences:** UI renders dynamically from schemas.
* **Minimal architecture:** Strict separation of concerns.
* **No speculative infrastructure:** No Redis, Docker, state-management libraries, or CI/CD until concretely needed.
* **No unnecessary files/dependencies:** A perfectly clean repository is a strict requirement.
* **UI/UX quality is part of the product itself:** The application must embody the design principles it teaches.

---

## 🏗️ Architecture

See **[ARCHITECTURE.md](./ARCHITECTURE.md)** for:
- System overview and module responsibilities
- Domain → Engine → UI data-flow diagram
- Key contracts and interfaces
- Security principles and existing controls
- Current limitations

---

## 🗺️ Implementation Status & Roadmap

See **[ROADMAP.md](./ROADMAP.md)** for the authoritative stage sequence with acceptance criteria, completed work, known content gaps, and deferred milestones.

| Stage | Blueprint Name | Status |
|-------|----------------|--------|
| **1** | Curriculum architecture + competency map | ✅ Complete |
| **2** | Prototype the first 30 minutes | ✅ Complete |
| **3** | Design system + motion language | ✅ Complete |
| **4** | Challenge engine | ✅ Complete |
| **5** | Interactive builder / editor | ✅ Complete |
| **6** | Adaptive mentor + assessment | 🔓 Tier A (rule-based) unblocked; 🔒 Tier B deferred |
| **7** | End-to-end capstone | ⏳ Planned |
| **8** | Beginner usability testing | ⏳ Planned |
| **9** | Performance + accessibility polish | ⏳ Planned |
| **10** | Public launch | ⏳ Planned |

---

## 🔒 Security

See **[SECURITY.md](./SECURITY.md)** for the vulnerability reporting process and current security scope.

---

## 🚀 Setup

### Prerequisites
- Node.js ≥ 18.17 (the minimum required by Next.js 14)
- npm

### Install
```bash
npm install
```

### Development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000).

### Verification commands

| Command | Purpose |
|---------|---------|
| `npm run typecheck` | TypeScript type-check (zero errors expected) |
| `npm test` | Run all tests (`tsx --test`) |
| `npm run build` | Production build (run only to validate) |
