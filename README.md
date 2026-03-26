# AI Token Cost Calculator

A web-based calculator for estimating AI API costs based on model selection, usage scale, and workflow parameters. Built with React + TypeScript, Vite, and Tailwind CSS.

**Live:** https://token-cost-calculator.spoerico.com/

## Features

- **Vertical wizard flow** — 4-step guided input (Model, Scale, Workflow, Results) with Next/Back navigation and Enter key support
- **Model presets** — Pre-configured pricing for Claude, GPT-4o, o3-mini, Gemini models, plus custom manual entry
- **Caching support** — Toggle prompt caching with configurable cache hit rate
- **Agentic multi-turn loops** — Multiply token usage for multi-step agent workflows
- **Reasoning/thinking tokens** — Output multiplier for models that use hidden reasoning tokens
- **Token estimator** — Convert page/word counts to approximate token counts
- **Sticky footer** — Daily, monthly, and annual cost summaries always visible at the bottom
- **Shareable URLs** — Encode calculator state into a URL for sharing
- **Persistent state** — Saves to localStorage with URL parameter override

## User Flow

The calculator uses a vertical step-by-step wizard:

1. **Model** — Choose an AI model (or custom), toggle caching, view/edit pricing per 1M tokens
2. **Scale** — Set number of users and uses per user per day
3. **Workflow** — Configure input/output tokens, agentic loops, and reasoning token multiplier
4. **Results** — View cost breakdown chart and daily cost table

Users navigate with Next/Back buttons, clickable step indicators in the header, or Enter key to advance. The sticky footer shows computed costs at all times.

## Quick Start (Docker)

```bash
docker compose build
docker compose up
```

Open [http://localhost:8080](http://localhost:8080).

## Local Development

```bash
npm install
npm run dev       # Dev server at localhost:5173
npm run build     # Production build to dist/
npm test          # Run tests
```

## Deployment

Deployed to Hetzner via `deploy.sh`. See the script for details.
