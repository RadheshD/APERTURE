# CLAUDE.md — APERTURE

Persistent instructions for Claude / Claude Code. Read this first; then inspect the repo rather than trusting any snapshot below.

## Project purpose

APERTURE is an interaction-first learning product that takes a UI/UX beginner to independently solving a real design problem. Learners act first (manipulate, diagnose, build), then receive structured explanation and feedback — not lectures followed by quizzes.

**Implemented today:** a client-side Next.js app with a Phase 0 lab (`/lab`), a Phase 3 interface builder (`/builder`), and a deterministic challenge engine.
**Vision / not built:** the remaining curriculum phases, backend persistence, accounts, adaptive mentoring, capstone, public launch. Never describe these as existing.

## Architecture (verified; see ARCHITECTURE.md for detail)

Strict one-way dependencies: **Domain ← Engine ← UI**. No reverse imports.

- `src/domain/` — curriculum, competency model, `ContentUnit` Zod schema, authored content (`phase-0-data.ts`, `phase-3-builder-data.ts`). Pure TypeScript, no React.
- `src/engine/` — `assessment`, `learner-state`, `mastery`, `scaffolding`, `router`, `orchestrator` (`ChallengeEngine`), `telemetry`. Pure, deterministic, no React.
- `src/app/`, `src/components/` — Next.js App Router pages and React components (`lab/`, `builder/`).

Rules to preserve:
- `LearnerState` is immutable; updaters return new objects; competency rungs never degrade.
- `ChallengeEngine` is stateless apart from its `TelemetryRecorder`; components own React state.
- `RoutingRules` (`recoveryThreshold`, `retryLimit`) are required constructor config, not defaults.
- All `ContentUnit` data must validate against `ContentUnitSchema`.
- Telemetry is in-memory only. No external state library.

## Development workflow

Scripts in `package.json`: `npm run dev`, `build`, `start`, `typecheck` (`tsc --noEmit`), `test` (`tsx --test`, Node native runner, tests in `test/`). `npm run lint` is present but ESLint is **not** configured — do not rely on it.

- After changes, run `npm run typecheck` and `npm test`; run `npm run build` for route/UI changes.
- Add tests beside existing ones (`test/engine/`, `test/builder/`, `test/domain.test.ts`) for any engine or domain logic. React components currently have no unit tests.
- Keep changes small and focused. No new dependencies, abstractions, files, or refactors unless the task needs them. Don't break existing tests.

## Git safety (mandatory)

- Never force-push, `reset --hard`, `checkout --`/`restore` over uncommitted work, `clean -fd`, or otherwise discard user work.
- Before proposing any commit or push, inspect `git status`, current branch, remotes, and divergence from `origin` (`git fetch` then compare).
- Review every modified and untracked file. Before every push, audit for unnecessary or generated clutter; genuinely local/generated files go in `.gitignore`, everything else tracked must be deliberate.
- Never `git add .` or `git add -A`. Stage named files only.
- Show the proposed file list and the staged diff, then get **explicit user approval to commit**, and **separate explicit approval to push**.
- If history diverges or a conflict occurs, stop and explain a safe recovery plan; do not resolve it unilaterally.
- Commit trailers follow the harness-provided attribution instructions.

## Documentation discipline

Canonical docs: `README.md`, `ARCHITECTURE.md`, `ROADMAP.md`, `SECURITY.md`, and this file. Keep them consistent (exact filename case: `ARCHITECTURE.md`).
- Verify claims against source and tests before writing them; label planned or unverified items as such.
- Update the relevant doc in the same change when behavior, structure, or stage status changes.
- Don't duplicate content across docs — link instead. Don't add point-in-time status files (commit hashes, test counts); Git history and the test run are the source of truth. `Reference/` (blueprint PDFs) is git-ignored and local-only.

## Security and privacy

- Never commit secrets, credentials, or `.env*` files.
- Validate untrusted input at boundaries (Zod for content; bounds checks for builder operations).
- Do not add authentication, persistence, external services, or AI/ML without an approved scope. The repo principle: deterministic rule-based adaptation for MVP; AI/ML deferred until real usage data exists.
- Do not claim the app is secure or production-ready; see `SECURITY.md` for known gaps.

## Current project state (time-sensitive — verify, don't trust)

- Stack: Next.js 14 (App Router), React 18, TypeScript 5, Zod 3, `tsx` test runner. Client-side only; no backend.
- Roadmap Stages 1–5 are recorded complete; Stage 6 is split into Tier A (rule-based MVP, unblocked but needs an approved plan) and Tier B (learned/generated adaptation, deferred pending real usage data). See `ROADMAP.md`, including its note on blueprint p.33.
- Content exists only for Phases 0 and 3.
- Stage 6 Tier A/B are **not implemented** unless source in `src/engine/` and tests confirm it. Commit hashes, test counts, and stage status in any document go stale: run `git log`, `git status`, `npm test`, and inspect `src/` before relying on them.
