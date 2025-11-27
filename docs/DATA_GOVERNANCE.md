# Data Governance — Subway 2.0
**Version:** 0.1 • **Date:** 2025-11-27

## Purpose
Establish ownership, quality, security, and usage standards for all data driving Subway 2.0 (12k-in-10) decisions.

## Scope & Systems
- **POS / KDS** — transactions, throughput, order accuracy.
- **Loyalty / App / Web** — profiles, behavior, personalization.
- **Scheduling / Labor** — timecards, staffing templates, wage data.
- **Inventory / COGS** — purchases, waste, variances.
- **3P Delivery** — sales/mix/fees (mapped to 1P schema where possible).
- **Finance** — royalties, ad fund, P&L.
- **Portfolio** — store tiers, remodel status, site attributes, trade-area scores.

## Roles & Ownership (RACI)
| Domain | Owner | Steward | Consumer | Notes |
|---|---|---|---|---|
| POS/KDS | Tech Ops | Data Eng | Field, Analytics | Source of truth for sales/throughput |
| Loyalty | CRM | Data Eng | Marketing, Analytics | PII controls & consent management |
| Labor | HRIS | Data Eng | Field, Analytics | Sensitive data handling |
| Inventory/COGS | Supply Chain | Data Eng | Ops, Analytics | Vendor integrations |
| Finance | Finance | Data Eng | Execs, Analytics | Close cadence alignment |
| Portfolio | Dev/RE | Analytics | Execs, Field | Site approvals, tiers, compliance |

## Definitions & Dictionary
- Maintain a **central data dictionary** (terms, formulas, owners, sources, cadence).
- Version control via Git; changes reviewed by Data Governance Board monthly.

## Quality & SLAs
- **Freshness SLAs:** POS daily, labor daily, inventory weekly close, finance monthly close.
- **QA checks:** schema validation, outlier detection (AUV, labor%, COGS%), reconciliation vs finance.
- **Issue management:** Jira queue; severity, owner, ETA; post-mortems for Sev-1.

## Privacy & Security
- **Access by role:** Field read-only dashboards; PII limited to CRM team; aggregated views for most users.
- **PII:** stored encrypted; consent & deletion flows; minimum retention.
- **Vendor access:** time-bound, audited, contractual data protection.

## Retention & Archival
- Raw POS: 7 years; loyalty PII: minimum needed; anonymized aggregates for long horizon modeling.
- Immutable monthly finance snapshots for audits.

## Change Control
- RFC process for schema or source changes; versioned migrations; backfills planned with comms to stakeholders.

## Governance Board
- Members: Tech Ops, Data Eng, CRM, Finance, Ops, Legal, Analytics.
- Cadence: monthly decision meeting; quarterly policy review.
