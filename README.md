# AI Token Cost Calculator

A web-based calculator for estimating AI API costs based on model selection, usage scale, and workflow parameters. Built with React + TypeScript, Vite, and Tailwind CSS.

**Live:** https://token-cost-calculator.spoerico.com/

## Features

- **Vertical wizard flow** — 4-step guided input (Model, Scale, Workflow, Results) with Next/Back navigation and Enter key support
- **30+ model presets** — Pre-configured pricing for Anthropic, OpenAI, xAI, DeepSeek, MiniMax, Mistral, Meta, Amazon, Cohere, Alibaba, Moonshot, Google, plus custom manual entry
- **Smart caching support** — Toggle prompt caching with configurable cache hit rate; automatically disabled for models that don't offer discounted caching
- **Agentic multi-turn loops** — Multiply token usage for multi-step agent workflows
- **Reasoning/thinking tokens** — Output multiplier for models that use hidden reasoning tokens
- **Token estimator** — Convert page/word counts to approximate token counts
- **Adjust Inputs sidebar** — On the Results step, open a slide-out panel to tweak any parameter and see costs update in real time
- **Sticky footer** — Monthly cost summary always visible at the bottom
- **Shareable URLs** — Encode calculator state into a URL for sharing
- **Persistent state** — Saves to localStorage with URL parameter override

## User Flow

The calculator uses a vertical step-by-step wizard:

1. **Model** — Choose an AI model (or custom), toggle caching, view/edit pricing per 1M tokens
2. **Scale** — Set number of users and uses per user per day
3. **Workflow** — Configure input/output tokens, agentic loops, and reasoning token multiplier
4. **Results** — View monthly cost breakdown chart, table, and optionally adjust all inputs via sidebar

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

Deployed to Hetzner via `pull_build_start_container.sh`. See the script for details.

## Ideas for Future Improvements

- **Side-by-side model comparison** — Let users select 2-3 models and view their costs in parallel columns or an overlay chart, making it easy to compare providers at a glance
- **Batch/fine-tuning pricing** — Many providers offer discounted batch API pricing (e.g., 50% off for async jobs) and fine-tuning costs; add toggles for these pricing tiers
- **Cost-per-task estimates** — Instead of just tokens, let users describe tasks (e.g., "summarize a 10-page PDF", "translate 5000 words") and auto-estimate the token counts
- **Historical pricing trends** — Track model pricing over time and show a chart of how costs have changed, helping users anticipate future price drops
- **API-driven pricing updates** — Fetch model pricing from provider APIs or a central aggregator automatically instead of hardcoding, keeping presets always current
- **Budget alerts and thresholds** — Let users set a monthly budget and highlight when their configuration exceeds it, with suggestions for cheaper alternatives
- **Export to spreadsheet** — Add CSV/Excel export of the cost breakdown for finance teams and procurement workflows
- **Multi-model workflow builder** — Some agentic workflows use different models for different steps (e.g., cheap model for classification, expensive model for generation); support modeling these composite pipelines
- **Organization-level calculator** — Scale beyond a single use case: model multiple teams/projects with different models and aggregate into a company-wide cost projection
- **Dark mode** — Add a theme toggle for dark mode support
