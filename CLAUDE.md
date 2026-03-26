# CLAUDE.md

## Project Overview

AI Token Cost Calculator — a React/TypeScript single-page app that estimates AI API costs through a guided wizard flow.

## Quick Reference

```bash
npm run dev       # Start dev server
npm run build     # Production build
npm test          # Run all tests (vitest)
npx tsc --noEmit  # Type-check without emitting
```

## Architecture

- **Framework:** React 19 + TypeScript + Vite + Tailwind CSS 4
- **State:** Single `useCalculatorState` hook manages all state, computes costs via `useMemo`, persists to localStorage (300ms debounce) and URL params
- **Layout:** 4-step vertical wizard (Model → Scale → Workflow → Results) with sticky footer showing cost totals

## Key Files

| Path | Purpose |
|------|---------|
| `src/App.tsx` | Root component, wizard step routing, Enter key + Next/Back navigation |
| `src/hooks/useCalculatorState.ts` | All calculator state, persistence, URL encoding |
| `src/calculator.ts` | Pure cost calculation function |
| `src/data/models.ts` | Model preset definitions (pricing per 1M tokens) |
| `src/lib/persistence.ts` | localStorage + URL param encode/decode |
| `src/components/steps/Step*.tsx` | One component per wizard step |
| `src/components/StickyFooter.tsx` | Anchored bottom bar with daily/monthly/annual costs |
| `src/components/TopBar.tsx` | Header with title, share button, step progress indicator |

## Design Requirements

- **Vertical wizard flow:** Walk the user top-to-bottom through inputs, one step at a time. Do NOT show all inputs simultaneously in a side-by-side layout.
- **Step navigation:** Next/Back buttons, Enter key advances (except when focused on input/select elements), clickable step indicators to jump to any step.
- **Sticky footer:** Always-visible cost output (daily/monthly/annual) anchored to the bottom of the viewport.
- **Single centered column:** Content is max-w-2xl centered, not a multi-column grid.

## Testing

Tests live alongside source files (`src/App.test.tsx`, `src/calculator.test.ts`, `src/persistence.test.ts`). Tests use Vitest + React Testing Library. The App tests navigate between wizard steps using `clickNext()` helper.

## Deployment

Production URL: https://token-cost-calculator.spoerico.com/
Deploy via `deploy.sh` to Hetzner server.
