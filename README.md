# AI Token Cost Calculator

A React + TypeScript SPA for modeling AI inference costs. Built with Vite, styled with Tailwind CSS, and containerized with Docker.

## Features

- Configure scale (users, usage frequency), workflow (token counts, agentic loops), and model pricing
- Toggle context caching and adjust cache hit rates to see cost impact
- Executive dashboard with daily/monthly/annual projections and stacked bar chart

## Quick Start (Docker)

1. **Build the image:**
   ```bash
   docker compose build
   ```

2. **Run the container:**
   ```bash
   docker compose up
   ```

3. **Open the app:**
   Visit [http://localhost:8080](http://localhost:8080)

## Local Development

```bash
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173).
