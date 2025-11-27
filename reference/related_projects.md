# Related Projects

> **Full Ecosystem Documentation:** See `ecosystem_map.md` in this folder for the complete 6-project ecosystem.

---

## Subway-Devapp1 (Interactive Mockup App)

**Location:** `C:\Claude_Code\Code\Subway-Devapp1`

**Purpose:** Interactive pitch mockup demonstrating "The Subway Comeback" strategy to franchisees

**Relationship to Subway-v2:** Visual demonstration of the strategic concepts documented here

### What It Contains

| Component | Description |
|-----------|-------------|
| **Evolution View** | 3-stage timeline: Today → Phase 1 (Local Engagement) → Phase 2 (AI-Powered) |
| **Single Store Dashboard** | Franchisee metrics, performance categories, suggested actions |
| **Multi-Store Dashboard** | MUO portfolio view with geographic filtering |
| **Customer App Mockups** | Test Kitchen voting, store profiles, chat, local events |

### Tech Stack
- React 19.2.0 + Vite 7.2.4
- Inline CSS styling
- Mock data (7 TX/OK stores)

### Key Files
- `src/App.jsx` — All components (3,800+ lines)
- `planning_architecture.md` — Technical specifications
- `README.md` — Project overview

### To Run
```bash
cd C:\Claude_Code\Code\Subway-Devapp1
npm install
npm run dev
# Opens at http://localhost:5173
```

---

## How Projects Connect

```
Subway-v2 (Strategy & Data)          Subway-Devapp1 (Visual Demo)
─────────────────────────────        ─────────────────────────────
"12k in 10" Portfolio Strategy   ←→  "Subway Comeback" Narrative
Planning Architecture docs       ←→  Evolution View (3 phases)
KPI Catalog                      ←→  Dashboard Metrics
Franchisee Incentives            ←→  Suggested Actions UI
Data Analysis (future)           ←→  Mock Performance Data
```

---

## Full Ecosystem Quick Reference

| Project | Path | Role |
|---------|------|------|
| **Subway-v2** | (this repo) | Strategic spine |
| **Devapp1** | `C:\Claude_Code\Code\Subway-Devapp1` | Visual demonstration |
| **Keystone-Hub** | `C:\Claude_Code\Code\Keystone-Hub\keystone-hub` | Intelligence layer (AI insights) |
| **Subway-Reports** | `C:\Claude_Code\Code\Subway\subway-reports` | Data foundation (FreshConnect) |
| **Check-In** | `C:\Claude_Code\Code\Check_In` | Communication layer |
| **AI-Lever-System** | `C:\Claude_Code\Code\ai-lever-system` | Execution layer (quick fixes) |

---

## Future Integration Opportunities

1. **Real Data** — When ScrapeHero data is purchased, could feed into Devapp1 dashboards
2. **Shared KPIs** — Align dashboard metrics with KPI_CATALOG.md definitions
3. **Unified Narrative** — Both projects tell the same transformation story
4. **Cross-Store Learning** — AI-Lever-System learns from Subway-Reports patterns
5. **Unified Authentication** — Single sign-on across platforms
