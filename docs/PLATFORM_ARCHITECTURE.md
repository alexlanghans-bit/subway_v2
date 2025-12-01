# Subway 2.0 Platform Architecture Guide

## Overview

This document maps all platforms, systems, and their interconnections in the Subway 2.0 strategic transformation.

---

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         SUBWAY 2.0 ECOSYSTEM                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                      KEYSTONE HUB (Intelligence Layer)               │    │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌────────────┐  │    │
│  │  │ AI Agents   │  │ Data Lake   │  │ Analytics   │  │ Community  │  │    │
│  │  │ (Proactive/ │  │ (All Store  │  │ Engine      │  │ Platform   │  │    │
│  │  │  Reactive)  │  │  Data)      │  │             │  │            │  │    │
│  │  └─────────────┘  └─────────────┘  └─────────────┘  └────────────┘  │    │
│  └──────────────────────────────┬──────────────────────────────────────┘    │
│                                 │                                            │
│                                 ▼                                            │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                    OPERATING SYSTEMS (5 OS)                          │    │
│  │                                                                      │    │
│  │   ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐  │    │
│  │   │Labor OS │  │Real Est │  │ Tech OS │  │ Food OS │  │  Ops OS │  │    │
│  │   │         │  │   OS    │  │         │  │         │  │(Orchest)│  │    │
│  │   └────┬────┘  └────┬────┘  └────┬────┘  └────┬────┘  └────┬────┘  │    │
│  │        │            │            │            │            │        │    │
│  └────────┼────────────┼────────────┼────────────┼────────────┼────────┘    │
│           │            │            │            │            │              │
│           └────────────┴────────────┼────────────┴────────────┘              │
│                                     ▼                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                         STORE LEVEL                                  │    │
│  │  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────────┐  │    │
│  │  │ Corporate Spine │  │ Tier 1 Stores   │  │ Tier 2/3 Stores     │  │    │
│  │  │ (~600 stores)   │  │ (Franchisee)    │  │ (Franchisee)        │  │    │
│  │  │ Test & Validate │  │ Early Adopters  │  │ Staged Rollout      │  │    │
│  │  └─────────────────┘  └─────────────────┘  └─────────────────────┘  │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Keystone Hub - The Intelligence Layer

**Purpose:** AI-powered business intelligence platform that transforms raw data into actionable insights for franchisees and corporate.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            KEYSTONE HUB                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  DATA INPUTS                        AI AGENTS                    OUTPUTS    │
│  ───────────                        ─────────                    ───────    │
│                                                                              │
│  ┌──────────────┐                  ┌─────────────┐              ┌─────────┐ │
│  │ POS/Fresh-   │───┐              │ Daily       │──────────────│ Manager │ │
│  │ Connect      │   │              │ Analysis    │              │ Briefing│ │
│  └──────────────┘   │              │ Agent       │              └─────────┘ │
│                     │              └─────────────┘                          │
│  ┌──────────────┐   │              ┌─────────────┐              ┌─────────┐ │
│  │ Labor        │───┤              │ Weekly      │──────────────│ Owner   │ │
│  │ Systems      │   │              │ Strategy    │              │ Reports │ │
│  └──────────────┘   │              │ Agent       │              └─────────┘ │
│                     │              └─────────────┘                          │
│  ┌──────────────┐   │    ┌────┐    ┌─────────────┐              ┌─────────┐ │
│  │ Weather      │───┼───▶│DATA│───▶│ Real-time   │──────────────│ Alerts  │ │
│  │ APIs         │   │    │LAKE│    │ Monitor     │              │ & Flags │ │
│  └──────────────┘   │    └────┘    └─────────────┘              └─────────┘ │
│                     │              ┌─────────────┐              ┌─────────┐ │
│  ┌──────────────┐   │              │ Conversation│──────────────│ Chat    │ │
│  │ Local        │───┤              │ AI          │              │Interface│ │
│  │ Events       │   │              └─────────────┘              └─────────┘ │
│  └──────────────┘   │              ┌─────────────┐              ┌─────────┐ │
│                     │              │ Benchmark   │──────────────│ Peer    │ │
│  ┌──────────────┐   │              │ Engine      │              │ Compare │ │
│  │ Voluntary    │───┘              └─────────────┘              └─────────┘ │
│  │ Peer Data    │                                                           │
│  └──────────────┘                                                           │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## The Five Operating Systems

**Purpose:** Standardized frameworks that govern how each operational domain works across all stores.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         OPERATIONS OS (Orchestrator)                         │
│                    "The connective tissue for all 4 OS"                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│        Coordinates → Monitors → Diagnoses → Optimizes                        │
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │                                                                       │   │
│  │   ┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌───────┐ │   │
│  │   │  LABOR OS   │    │REAL ESTATE  │    │   TECH OS   │    │FOOD OS│ │   │
│  │   │             │    │     OS      │    │             │    │       │ │   │
│  │   │ • Scheduling│    │ • Site      │    │ • POS       │    │• Menu │ │   │
│  │   │ • SPLH      │    │   Selection │    │ • Digital   │    │• Prep │ │   │
│  │   │ • Training  │    │ • Layout    │    │ • Analytics │    │• Fresh│ │   │
│  │   │ • Pay Rates │    │ • Capacity  │    │ • Integrat. │    │• Waste│ │   │
│  │   └──────┬──────┘    └──────┬──────┘    └──────┬──────┘    └───┬───┘ │   │
│  │          │                  │                  │               │      │   │
│  │          └──────────────────┴──────────────────┴───────────────┘      │   │
│  │                                    │                                   │   │
│  │                                    ▼                                   │   │
│  │                        ┌─────────────────────┐                        │   │
│  │                        │    STORE LEVEL      │                        │   │
│  │                        │   Daily Execution   │                        │   │
│  │                        └─────────────────────┘                        │   │
│  │                                                                       │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### OS Responsibilities

| OS | Primary Focus | Key Metrics | Data to Keystone Hub |
|-----|---------------|-------------|----------------------|
| **Labor OS** | Staffing efficiency | SPLH, Labor %, Turnover | Hours, pay, scheduling patterns |
| **Real Estate OS** | Site optimization | AUV by site type, Trade area health | Location performance, capacity |
| **Tech OS** | Digital integration | System uptime, Digital sales % | Transaction data, app usage |
| **Food OS** | Product quality | Waste %, Freshness scores | Prep timing, ingredient usage |
| **Operations OS** | Orchestration | Overall store score | Aggregated operational health |

---

## Corporate Spine - Innovation Pipeline

**Purpose:** Network of ~600 corporate/JV stores that test and validate initiatives before franchisee rollout.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    TEST → PROVE → SCALE PIPELINE                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   PHASE 1: TEST                PHASE 2: PROVE              PHASE 3: SCALE   │
│   ─────────────                ──────────────              ──────────────   │
│                                                                              │
│   ┌─────────────┐             ┌─────────────┐             ┌─────────────┐   │
│   │ CORPORATE   │             │  KEYSTONE   │             │  TIER 1     │   │
│   │   SPINE     │────────────▶│    HUB      │────────────▶│ FRANCHISEES │   │
│   │  STORES     │             │  ANALYSIS   │             │             │   │
│   └─────────────┘             └─────────────┘             └──────┬──────┘   │
│         │                           │                            │          │
│         │                           │                            ▼          │
│         ▼                           ▼                     ┌─────────────┐   │
│   ┌───────────┐              ┌───────────┐               │  TIER 2/3   │   │
│   │ Controlled│              │ Validation│               │ FRANCHISEES │   │
│   │ Testing   │              │ & Proof   │               │ (Full       │   │
│   │           │              │           │               │  Network)   │   │
│   │ • Menu    │              │ • Lift %  │               └─────────────┘   │
│   │ • Pricing │              │ • Margin  │                                  │
│   │ • Tech    │              │ • Ops OK  │                                  │
│   │ • Format  │              │ • ROI     │                                  │
│   └───────────┘              └───────────┘                                  │
│                                                                              │
│   SPINE MARKETS:                                                            │
│   ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐        │
│   │ NYC    │ │ LA     │ │Chicago │ │ Dallas │ │ Miami  │ │Phoenix │        │
│   │ 45 strs│ │ 38 strs│ │ 32 strs│ │ 28 strs│ │ 24 strs│ │ 22 strs│        │
│   │Flagship│ │Format  │ │ Menu   │ │Drive-  │ │Regional│ │ Tech   │        │
│   │ Urban  │ │Testing │ │Innovate│ │ Thru   │ │Academy │ │Pilots  │        │
│   └────────┘ └────────┘ └────────┘ └────────┘ └────────┘ └────────┘        │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Franchisee Community Platform

**Purpose:** Continuous engagement infrastructure between corporate initiatives (town halls, regional meetings).

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      FRANCHISEE COMMUNITY PLATFORM                           │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   CORPORATE EVENTS                    KEYSTONE HUB FEATURES                  │
│   ────────────────                    ─────────────────────                  │
│                                                                              │
│   ┌─────────────────┐                 ┌─────────────────────────────────┐   │
│   │ Monthly Town    │                 │ Pre-Town Hall                    │   │
│   │ Halls           │◀───────────────▶│ Pulse Surveys                    │   │
│   │ (Started 9/25)  │                 │                                  │   │
│   └─────────────────┘                 │ Post-Town Hall                   │   │
│           │                           │ Commitment Tracker               │   │
│           │                           └─────────────────────────────────┘   │
│           │                                                                  │
│           ▼                           ┌─────────────────────────────────┐   │
│   ┌─────────────────┐                 │ Regional Performance Circles     │   │
│   │ Regional        │                 │ (Monthly peer calls)             │   │
│   │ Meetings        │◀───────────────▶│                                  │   │
│   │ (Starting 2026) │                 │ Regional Benchmarks              │   │
│   └─────────────────┘                 │ Market Challenges                │   │
│                                       │ Success Stories                  │   │
│                                       └─────────────────────────────────┘   │
│                                                                              │
│   ALWAYS-ON FEATURES:                                                        │
│   ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐       │
│   │ Innovation  │  │ Best        │  │ Recognition │  │ Peer        │       │
│   │ Suggestions │  │ Practice    │  │ Dashboard   │  │ Connections │       │
│   │             │  │ Library     │  │             │  │             │       │
│   │ Ideas →     │  │ Video tips  │  │ SPLH        │  │ 1,820       │       │
│   │ Vote →      │  │ Templates   │  │ Satisfaction│  │ connections │       │
│   │ Test →      │  │ Playbooks   │  │ Contribution│  │             │       │
│   │ Scale       │  │             │  │             │  │             │       │
│   └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘       │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Store Tiering System

**Purpose:** Segment stores by performance to enable targeted support, investment, and strategic decisions.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           PORTFOLIO TIERING                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                         TIER 1 (30%)                                 │   │
│   │                      Flagship / Growth                               │   │
│   │   ┌─────────────────────────────────────────────────────────────┐   │   │
│   │   │ • Top AUV performers ($750k+)                                │   │   │
│   │   │ • Fully compliant with brand standards                       │   │   │
│   │   │ • Priority access to new initiatives                         │   │   │
│   │   │ • Early pilots after spine validation                        │   │   │
│   │   │ • First option on new development                            │   │   │
│   │   └─────────────────────────────────────────────────────────────┘   │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                     │                                        │
│                                     ▼                                        │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                         TIER 2 (45%)                                 │   │
│   │                        Transitional                                  │   │
│   │   ┌─────────────────────────────────────────────────────────────┐   │   │
│   │   │ • Clear 12-month improvement plan                            │   │   │
│   │   │ • Access to training and operational support                 │   │   │
│   │   │ • Regular check-ins and milestones                           │   │   │
│   │   │ • Path to Tier 1 or managed transition                       │   │   │
│   │   └─────────────────────────────────────────────────────────────┘   │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                     │                                        │
│                                     ▼                                        │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                         TIER 3 (25%)                                 │   │
│   │                      Exit / Consolidate                              │   │
│   │   ┌─────────────────────────────────────────────────────────────┐   │   │
│   │   │ • Managed closure or transfer                                │   │   │
│   │   │ • Relocation assistance for good operators                   │   │   │
│   │   │ • Internal transfer system                                   │   │   │
│   │   │ • Corporate bridge if no buyer                               │   │   │
│   │   └─────────────────────────────────────────────────────────────┘   │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Data Flow: Complete Picture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         COMPLETE DATA FLOW                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│                              EXTERNAL DATA                                   │
│                     ┌────────────┬────────────┐                             │
│                     │  Weather   │   Local    │                             │
│                     │   APIs     │   Events   │                             │
│                     └─────┬──────┴──────┬─────┘                             │
│                           │             │                                    │
│                           ▼             ▼                                    │
│   ┌──────────────────────────────────────────────────────────────────┐      │
│   │                                                                   │      │
│   │   STORE LEVEL           5 OPERATING             KEYSTONE HUB     │      │
│   │   ───────────           SYSTEMS                 ────────────     │      │
│   │                         ─────────                                │      │
│   │   ┌─────────┐          ┌─────────┐          ┌─────────────────┐ │      │
│   │   │ POS     │─────────▶│ Tech OS │─────────▶│                 │ │      │
│   │   │ Trans-  │          └─────────┘          │                 │ │      │
│   │   │ actions │                               │    DATA LAKE    │ │      │
│   │   └─────────┘          ┌─────────┐          │                 │ │      │
│   │   ┌─────────┐          │ Labor   │          │  ┌───────────┐  │ │      │
│   │   │ Labor   │─────────▶│   OS    │─────────▶│  │AI Agents  │  │ │      │
│   │   │ System  │          └─────────┘          │  └───────────┘  │ │      │
│   │   └─────────┘                               │        │        │ │      │
│   │   ┌─────────┐          ┌─────────┐          │        ▼        │ │      │
│   │   │ Prep/   │─────────▶│ Food OS │─────────▶│  ┌───────────┐  │ │      │
│   │   │ Waste   │          └─────────┘          │  │ Insights  │  │ │      │
│   │   └─────────┘                               │  └───────────┘  │ │      │
│   │                        ┌─────────┐          │                 │ │      │
│   │                        │ Ops OS  │◀────────▶│                 │ │      │
│   │                        │(Orch.)  │          └────────┬────────┘ │      │
│   │                        └─────────┘                   │          │      │
│   │                                                      │          │      │
│   └──────────────────────────────────────────────────────┼──────────┘      │
│                                                          │                  │
│                                                          ▼                  │
│                              ┌────────────────────────────────────┐         │
│                              │           OUTPUTS                  │         │
│                              │                                    │         │
│                              │  • Daily Manager Briefings         │         │
│                              │  • Weekly Owner Reports            │         │
│                              │  • Real-time Alerts                │         │
│                              │  • Peer Benchmarks                 │         │
│                              │  • Initiative Validation           │         │
│                              │  • Community Insights              │         │
│                              └────────────────────────────────────┘         │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 10-Year Phase Timeline

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         10-YEAR TRANSFORMATION                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   PHASE 1: OBVIOUS SURGERY (Years 0-3)                                       │
│   ────────────────────────────────────                                       │
│   Stores: 20,000 → 17,000-18,000                                            │
│   Focus: Remove unviable locations, launch consolidation fund               │
│   ┌────────────────────────────────────────────────────────────────┐        │
│   │ • Tiering live                                                  │        │
│   │ • First spine markets operational                               │        │
│   │ • Relocation program active                                     │        │
│   │ • Food OS 1.0 locked                                           │        │
│   └────────────────────────────────────────────────────────────────┘        │
│                                     │                                        │
│                                     ▼                                        │
│   PHASE 2: STRATEGIC CLEANUP (Years 3-6)                                     │
│   ──────────────────────────────────────                                     │
│   Stores: 17,000-18,000 → 14,500-15,500                                     │
│   Focus: Trade-area optimization, operator development                       │
│   ┌────────────────────────────────────────────────────────────────┐        │
│   │ • Overlap resolved                                              │        │
│   │ • Tier-1 skew (more stores in top tier)                        │        │
│   │ • Tech standardized                                             │        │
│   │ • Spine expanded                                                │        │
│   └────────────────────────────────────────────────────────────────┘        │
│                                     │                                        │
│                                     ▼                                        │
│   PHASE 3: PRECISION & LOCK-IN (Years 6-10)                                 │
│   ─────────────────────────────────────────                                  │
│   Stores: 14,500-15,500 → 12,000-14,000                                     │
│   Focus: Non-renew marginal, selective A+ openings                          │
│   ┌────────────────────────────────────────────────────────────────┐        │
│   │ • 100% compliant                                                │        │
│   │ • 5%+ spine (~600+ corporate stores)                           │        │
│   │ • All stores profitable                                         │        │
│   │ • Food OS 3.0                                                   │        │
│   └────────────────────────────────────────────────────────────────┘        │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Key Metrics Dashboard

| Category | Metric | Current | Target | Timeline |
|----------|--------|---------|--------|----------|
| **Network** | Store Count | 20,162 | 12,000-14,000 | 2035 |
| **Network** | AUV | ~$430k | $750k+ | 2030 |
| **Network** | Tier 1 % | ~20% | 40%+ | 2030 |
| **Operations** | SPLH | ~$55 | $65+ | 2028 |
| **Operations** | Labor % | ~30% | <28% | 2028 |
| **Corporate Spine** | Spine Stores | ~200 | 600+ (5%+) | 2030 |
| **Community** | Active Peer Connections | 500 | 2,000+ | 2027 |

---

## Technology Stack (Development)

For the demo application:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         DEMO APP TECH STACK                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   Frontend                    Build                     Deployment           │
│   ────────                    ─────                     ──────────           │
│   ┌─────────────┐            ┌─────────────┐           ┌─────────────┐      │
│   │   React 19  │────────────│   Vite      │───────────│   Vercel    │      │
│   │             │            │             │           │             │      │
│   │ • useState  │            │ • HMR       │           │ • CDN       │      │
│   │ • Fragment  │            │ • ESBuild   │           │ • Edge      │      │
│   │ • Inline    │            │ • Dev Server│           │ • Auto SSL  │      │
│   │   Styles    │            │             │           │             │      │
│   └─────────────┘            └─────────────┘           └─────────────┘      │
│                                                                              │
│   Production URL: https://app-seven-iota-14.vercel.app                      │
│   Local Dev: http://localhost:5175                                          │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Quick Reference: Platform Purposes

| Platform/System | Purpose | Key Question It Answers |
|-----------------|---------|-------------------------|
| **Keystone Hub** | Intelligence layer | "What's happening and what should we do?" |
| **Operations OS** | Orchestration | "How do we execute daily at store level?" |
| **Labor OS** | Staffing efficiency | "Who works when and how efficiently?" |
| **Real Estate OS** | Site optimization | "Where should stores be and how should they be configured?" |
| **Tech OS** | Digital integration | "What systems connect and how?" |
| **Food OS** | Product quality | "How do we maintain freshness and minimize waste?" |
| **Corporate Spine** | Innovation pipeline | "What should we test before asking franchisees to invest?" |
| **Community Platform** | Franchisee engagement | "How do we keep franchisees connected and heard?" |
| **Tiering System** | Portfolio management | "Which stores need what level of support or intervention?" |

---

*Last updated: December 2025*
