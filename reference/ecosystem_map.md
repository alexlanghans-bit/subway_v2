# Subway Transformation Ecosystem

**Version:** 1.0
**Date:** 2025-11-27

> This document maps all related projects that support the Subway strategic transformation. Projects are kept in separate repositories for clean code management but work together toward a unified goal.

---

## The Ecosystem at a Glance

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         SUBWAY TRANSFORMATION ECOSYSTEM                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   STRATEGY & VISION                     VISUAL DEMONSTRATION                 │
│   ┌─────────────┐                       ┌─────────────┐                      │
│   │ Subway-v2   │◄────────────────────►│ Devapp1     │                      │
│   │ (This Repo) │  Cross-reference      │ (Mockup)    │                      │
│   └──────┬──────┘                       └─────────────┘                      │
│          │                                                                   │
│          │ Strategic Framework                                               │
│          ▼                                                                   │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                        OPERATIONAL LAYER                             │   │
│   │                                                                      │   │
│   │  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐           │   │
│   │  │Subway-Reports│───►│ Keystone-Hub │───►│   Check-In   │           │   │
│   │  │ (Data)       │    │ (Intelligence)│    │ (Comms)      │           │   │
│   │  └──────────────┘    └──────────────┘    └──────┬───────┘           │   │
│   │                                                  │                   │   │
│   │                                                  ▼                   │   │
│   │                                          ┌──────────────┐           │   │
│   │                                          │AI Lever Sys  │           │   │
│   │                                          │ (Execution)  │           │   │
│   │                                          └──────────────┘           │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Project Directory

| Project | Path | Purpose | Status |
|---------|------|---------|--------|
| **Subway-v2** | `C:\Claude_Code\Code\Subway-v2` | Strategic planning & portfolio management | Active |
| **Devapp1** | `C:\Claude_Code\Code\Subway-Devapp1` | Visual mockup for franchisee pitch | Complete |
| **Keystone-Hub** | `C:\Claude_Code\Code\Keystone-Hub\keystone-hub` | AI-powered business intelligence | Active Dev |
| **Subway-Reports** | `C:\Claude_Code\Code\Subway\subway-reports` | Data extraction from FreshConnect | Production |
| **Check-In** | `C:\Claude_Code\Code\Check_In` | Franchisee-franchisor communication | Early-Mid Dev |
| **AI-Lever-System** | `C:\Claude_Code\Code\ai-lever-system` | AI tools for rapid execution | Early Dev |

---

## Detailed Project Profiles

### 1. Subway-v2 (Strategic Spine)
**Path:** `C:\Claude_Code\Code\Subway-v2`

**Purpose:** Comprehensive 10-year strategic transformation framework — "12-16k Elite Units"

**Contains:**
- Planning Architecture (4 Operating Systems)
- KPI Catalog & Data Governance
- Franchisee Incentive structures
- Portfolio management framework
- Unified Narrative (connecting all projects)

**Key Files:**
- `docs/PLANNING_ARCHITECTURE.md` — Master strategy
- `docs/UNIFIED_NARRATIVE.md` — Ecosystem narrative
- `docs/KPI_CATALOG.md` — Metric definitions
- `reference/ecosystem_map.md` — This file

**Connects to:**
- All projects (provides strategic framework)

---

### 2. Subway-Devapp1 (Visual Demo)
**Path:** `C:\Claude_Code\Code\Subway-Devapp1`

**Purpose:** Interactive mockup demonstrating "The Subway Comeback" — customer transparency, franchisee dashboards

**Tech Stack:** React 19 + Vite + Inline CSS

**Contains:**
- Customer app mockups (Test Kitchen, Store Profile, Chat, Events)
- Franchisee dashboard (metrics, actions, feedback)
- Multi-store (MUO) dashboard
- Evolution view (Today → Phase 1 → Phase 2)

**Key Files:**
- `src/App.jsx` — All components
- `planning_architecture.md` — Technical specs
- `README.md` — Overview

**Connects to:**
- Subway-v2: Visual demonstration of strategic concepts
- Keystone-Hub: Dashboard metrics could pull from this
- Check-In: UI patterns for communication features

---

### 3. Keystone-Hub (Intelligence Layer)
**Path:** `C:\Claude_Code\Code\Keystone-Hub\keystone-hub`

**Purpose:** AI-powered business intelligence platform for franchisees — aggregates data, provides insights, benchmarking

**Tech Stack:** FastAPI + Supabase + Redis + Celery + Claude AI + Streamlit

**Contains:**
- Data connectors (FreshConnect, Google Sheets)
- AI summarization services
- Real-time dashboards
- Background job processing

**Key Files:**
- `app/main.py` — FastAPI entry
- `app/ai/` — LLM integrations
- `app/connectors/` — Data source connectors
- `CURRENT_TASKS.md` — Active development
- `docs/KEYSTONE_HUB_DECISIONS_SUMMARY.md` — Architecture

**Connects to:**
- Subway-Reports: Receives data from FreshConnect extraction
- Subway-v2: Operationalizes KPI tracking and benchmarking
- Check-In: Could feed insights into communication platform
- AI-Lever-System: Intelligence informs lever recommendations

**Brand Agnostic:** Designed to work with any franchise brand, Subway is primary focus

---

### 4. Subway-Reports (Data Foundation)
**Path:** `C:\Claude_Code\Code\Subway\subway-reports`

**Purpose:** Extract operational data from FreshConnect POS system — sales, labor, inventory, control sheets

**Tech Stack:** Python + Supabase + Heroku + Celery Beat + Google Sheets API

**Contains:**
- FreshConnect API integrations
- Scheduled report generators (Control Sheet, Sales, Timeclock, WISR)
- Google Sheets delivery
- Multi-account management

**Key Files:**
- `get_control_sheet_unified_v2.py` — Weekly control sheet
- `get_sales_report_unified_v2.py` — Sales metrics
- `get_timeclock_report_unified_v2.py` — Labor tracking
- `CONTROL_SHEET_GUIDE.md` — Documentation
- `PRODUCTION_READY_CHECKLIST.md` — Deployment

**Connects to:**
- Keystone-Hub: Primary data source
- Subway-v2: Provides real operational data for KPIs
- AI-Lever-System: Historical data enables learning across stores

**Status:** Production — actively gathering data

---

### 5. Check-In (Communication Layer)
**Path:** `C:\Claude_Code\Code\Check_In`

**Purpose:** Franchisee-franchisor communication platform — regular check-ins, wellbeing tracking, AI-powered conversations

**Tech Stack:** React + Vite + Tailwind + Supabase + Claude API + Vercel

**Contains:**
- Multi-tenant brand hierarchy
- AI-powered check-in conversations
- Cost tracking (API usage)
- Authentication and RLS policies

**Key Files:**
- `src/pages/` — React components
- `api/` — Backend endpoints
- `docs/Planning/` — Architecture
- `PHASE_1_COMPLETE.md` — Progress

**Connects to:**
- Subway-v2: Operationalizes franchisee-franchisor partnership
- Keystone-Hub: Could receive performance insights
- Devapp1: UI patterns and design system

**Status:** Phase 1 complete, Phase 2-3 in progress

---

### 6. AI-Lever-System (Execution Layer)
**Path:** `C:\Claude_Code\Code\ai-lever-system`

**Purpose:** Modular AI tools for rapid business execution — hiring, sales, onboarding with brand consistency

**Tech Stack:** Next.js + TypeScript + Tailwind + Supabase

**Contains:**
- Brand profile system (three-tier hierarchy)
- Domain levers (hiring, sales, onboarding)
- Draft templates for AI generation
- Lever Studio web app

**Key Files:**
- `DESIGN_SPEC.md` — System architecture
- `domains/hiring/` — Hiring materials
- `domains/sales_leads/` — Sales automation
- `domains/onboarding/` — Employee onboarding
- `config/brand_profiles/` — Brand definitions
- `lever-studio/` — Web UI

**Connects to:**
- Subway-v2: Quick fixes for underperforming stores (Tier 2/3)
- Subway-Reports: Historical data enables system-wide learning
- Keystone-Hub: Intelligence informs which levers to pull
- Check-In: Levers could be triggered from check-in insights

**Key Innovation:** Instead of franchisees solving problems alone, leverage database of all stores to learn what works

---

## Data Flow Architecture

```
COLLECTION                    INTELLIGENCE                   ACTION
───────────                   ────────────                   ──────

FreshConnect POS
      │
      ▼
┌─────────────┐
│Subway-Reports│──── Raw Data ────►┌─────────────┐
│  (Extract)   │                   │Keystone-Hub │
└─────────────┘                    │ (Analyze)   │
                                   └──────┬──────┘
                                          │
                              ┌───────────┴───────────┐
                              │                       │
                              ▼                       ▼
                       ┌─────────────┐         ┌─────────────┐
                       │  Check-In   │         │AI Lever Sys │
                       │(Communicate)│         │  (Execute)  │
                       └─────────────┘         └─────────────┘
                              │                       │
                              └───────────┬───────────┘
                                          │
                                          ▼
                                   ┌─────────────┐
                                   │ Franchisee  │
                                   │  Success    │
                                   └─────────────┘
```

---

## Strategic Alignment

### How Each Project Supports the Transformation

| Project | Strategic Element | Contribution |
|---------|------------------|--------------|
| **Subway-v2** | All | Master framework, governance, KPIs |
| **Devapp1** | Customer Partnership | Transparency, participation features |
| **Keystone-Hub** | Tech OS | Data aggregation, AI insights, dashboards |
| **Subway-Reports** | Tech OS / Data Governance | Operational data collection |
| **Check-In** | Franchisee Partnership | Two-way communication platform |
| **AI-Lever-System** | Tiering Support | Quick fixes for struggling stores |

### Addressing the Three Partnerships

| Partnership | Primary Projects |
|-------------|------------------|
| **Customer ↔ Brand** | Devapp1 (transparency, voting, chat) |
| **Franchisee ↔ Franchisor** | Check-In (communication), Subway-v2 (governance) |
| **Store ↔ System Learning** | AI-Lever-System + Subway-Reports (learn from all stores) |

---

## Development Priorities

### Currently Active
1. **Subway-Reports** — Production, gathering data
2. **Keystone-Hub** — Active development, building intelligence layer
3. **Check-In** — Phase 2 in progress

### Awaiting Data
- **Subway-v2 Data Analysis** — Needs ScrapeHero purchase ($95)
- **AI-Lever-System full implementation** — Needs operational data patterns

### Complete (Maintenance)
- **Devapp1** — Visual mockup complete

---

## Cross-Reference Maintenance

When updating any project, consider impacts on:

| If you change... | Check these projects... |
|------------------|------------------------|
| KPI definitions | Subway-v2, Keystone-Hub, Devapp1 |
| Data schemas | Subway-Reports, Keystone-Hub |
| Brand hierarchy | Check-In, AI-Lever-System |
| UI patterns | Devapp1, Check-In, Lever Studio |
| Strategic framework | All projects |

---

## Quick Access Commands

```bash
# Open each project
cd C:\Claude_Code\Code\Subway-v2           # Strategy
cd C:\Claude_Code\Code\Subway-Devapp1      # Visual Demo
cd C:\Claude_Code\Code\Keystone-Hub\keystone-hub  # Intelligence
cd C:\Claude_Code\Code\Subway\subway-reports      # Data
cd C:\Claude_Code\Code\Check_In            # Communication
cd C:\Claude_Code\Code\ai-lever-system     # Execution
```

---

## Future Integration Opportunities

1. **Unified Authentication** — Single sign-on across Check-In, Keystone-Hub, Lever Studio
2. **Shared Data Layer** — Keystone-Hub as central data broker for all apps
3. **Event-Driven Architecture** — Check-In insights trigger AI-Lever recommendations
4. **Unified Dashboard** — Combine Devapp1 visuals with real Keystone-Hub data
5. **Cross-Store Learning** — AI-Lever-System learns from Subway-Reports patterns

---

*"Six projects, one vision: Transform Subway through data, intelligence, communication, and execution."*
