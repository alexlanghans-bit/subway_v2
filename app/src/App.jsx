import { useState, Fragment } from 'react'

// ============================================
// DESIGN SYSTEM
// ============================================
// Official Subway Brand Colors (2017 Brand Guide)
const colors = {
  // Primary Palette
  green: '#028940',         // Subway® Green (PMS 2426 C)
  greenDark: '#006230',     // Spinach Green (PMS 3425 C) - secondary
  greenLight: '#8BCD32',    // Lettuce Green (PMS 3561 C) - secondary
  yellow: '#FFC20D',        // Subway® Yellow (PMS 7548 C)
  white: '#FFFFFF',

  // Secondary Palette (inspired by ingredients)
  waterBlue: '#00A7E9',     // Water Blue (PMS 2202 C)
  onionPurple: '#4C006A',   // Onion Purple (PMS 2607 C)
  carrotOrange: '#FF8200',  // Carrot Orange (PMS 151 C)
  tomatoRed: '#DE3804',     // Tomato Red (PMS 172 C)

  // UI Colors
  gray: '#F5F5F5',
  grayMedium: '#E0E0E0',
  grayDark: '#666666',
  text: '#1A1A1A',
  textLight: '#555555',
  background: '#0A0A0A',    // Black background to let Subway Green elements pop
  cardBg: '#FFFFFF',
  red: '#DE3804',           // Use Tomato Red
  orange: '#FF8200',        // Use Carrot Orange
}

// ============================================
// DATA
// ============================================
const phaseData = {
  current: 1,
  phases: [
    {
      id: 1,
      name: 'Obvious Surgery',
      years: '0-3',
      status: 'active',
      storeStart: 19000,
      storeEnd: '16,000-17,000',
      storeEndNum: 16500,
      focus: 'Remove unviable locations, launch consolidation fund, lock Food OS 1.0',
      milestones: ['Tiering live', 'First spine markets', 'Relocation program active'],
    },
    {
      id: 2,
      name: 'Strategic Cleanup',
      years: '3-6',
      status: 'upcoming',
      storeStart: '16,000-17,000',
      storeEnd: '13,500-14,500',
      storeEndNum: 14000,
      focus: 'Trade-area optimization, operator development, expand spine',
      milestones: ['Overlap resolved', 'Tier-1 skew', 'Tech standardized'],
    },
    {
      id: 3,
      name: 'Precision & Lock-In',
      years: '6-10',
      status: 'future',
      storeStart: '13,500-14,500',
      storeEnd: '11,000-13,000',
      storeEndNum: 12000,
      focus: 'Non-renew marginal, selective A+ openings, institutionalize',
      milestones: ['100% compliant', '5%+ spine', 'All stores profitable'],
    },
  ],
  // Franchisee-First Philosophy
  franchiseePhilosophy: {
    headline: 'Fewer, Stronger, More Profitable',
    principle: 'This isn\'t about shrinking Subway — it\'s about making every remaining store a thriving business for the franchisee who runs it.',
    transitionPaths: [
      {
        scenario: 'Good Operator, Weak Location',
        approach: 'Relocation assistance',
        detail: 'Franchisees who have given their lives to the brand deserve support. If their store isn\'t viable due to location, they get priority access to better sites, relocation funding, and transition support.',
      },
      {
        scenario: 'Operator Needs Development',
        approach: 'Improvement program',
        detail: 'Clear 12-month improvement plan with training, coaching, and operational support. Regular check-ins and measurable milestones. Goal is success, not exit.',
      },
      {
        scenario: 'Unwilling or Unable to Improve',
        approach: 'Managed transition',
        detail: 'Internal transfer system connects stores with qualified buyers. Dignified exit with fair valuation. No store left to struggle and damage the brand.',
      },
      {
        scenario: 'No Viable Buyer',
        approach: 'Corporate bridge',
        detail: 'Subway Corporate takes temporary operational control until a qualified franchisee is found. Prevents store deterioration and protects customer experience.',
      },
    ],
    benefitStatement: 'When every store is stronger and more profitable, everyone wins: franchisees build real wealth, the franchisor has a sustainable royalty base, and the entire ecosystem (vendors, supply chain, landlords) operates on solid footing.',
  },
}

const kpiData = [
  { label: 'Current Stores', value: '20,162', subtitle: 'Nov 2025', icon: '🏪', trend: 'down', change: '-21% since 2022' },
  { label: 'Target Stores', value: '12-14k', subtitle: 'By 2035', icon: '🎯', trend: 'target' },
  { label: 'Current AUV', value: '~$430k', subtitle: 'System average', icon: '💰', trend: 'neutral' },
  { label: 'Target AUV', value: '$750k+', subtitle: 'Min by 2030', icon: '🚀', trend: 'target', change: '+74% growth needed' },
]

const tierData = [
  { tier: 1, name: 'Flagship/Growth', description: 'Top AUV, compliant, priority access', color: colors.green, percent: 30 },
  { tier: 2, name: 'Transitional', description: 'Clear improvement plan, time-bound', color: colors.yellow, percent: 45 },
  { tier: 3, name: 'Exit/Consolidate', description: 'Managed closure or transfer', color: colors.red, percent: 25 },
]

const partnershipData = [
  {
    title: 'Customer ↔ Brand',
    old: 'Transactional (deals for data)',
    new: 'Partnership (participation, transparency)',
    icon: '👥',
  },
  {
    title: 'Franchisee ↔ Franchisor',
    old: 'Tenancy (rules + risk)',
    new: 'Partnership (shared decisions, shared risk)',
    icon: '🤝',
  },
  {
    title: 'Store ↔ Community',
    old: 'Generic national chain',
    new: 'Local presence (events, engagement)',
    icon: '🏘️',
  },
]

// Deep Dive Data
const operationsOSData = {
  tagline: 'The connective tissue that makes the other 4 OS work together',
  description: 'Operations OS is not a separate silo — it\'s the orchestration layer that coordinates Labor, Real Estate, Tech, and Food OS at the store level. It defines how a store runs day-to-day and creates feedback loops for continuous improvement.',
  orchestrates: [
    { os: 'Labor OS', coordination: 'Who\'s working when, skill matching to demand, training windows' },
    { os: 'Real Estate OS', coordination: 'Store layout flow, capacity utilization, peak hour spacing' },
    { os: 'Tech OS', coordination: 'System handoffs, data capture at each step, real-time alerts' },
    { os: 'Food OS', coordination: 'Prep timing, freshness windows, build sequence optimization' },
  ],
  feedbackLoops: [
    { signal: 'Speed of service slow', diagnosis: 'Labor (understaffed?) → Food (prep delays?) → Tech (POS issues?) → Operations (workflow gaps?)' },
    { signal: 'Quality complaints rising', diagnosis: 'Food (freshness?) → Labor (training?) → Operations (rush shortcuts?) → Tech (alerts missed?)' },
    { signal: 'Customer satisfaction drop', diagnosis: 'Operations diagnoses which underlying OS needs attention and routes the fix' },
    { signal: 'Waste above target', diagnosis: 'Food (over-prep?) → Operations (demand forecasting?) → Tech (data accuracy?) → Labor (execution?)' },
  ],
  principles: [
    { principle: 'No Blame, Only Learning', detail: 'When something goes wrong, Operations OS traces root cause across all systems — not to blame, but to fix' },
    { principle: 'Continuous Improvement', detail: 'Every day generates data. Operations OS turns that data into better tomorrow.' },
    { principle: 'Store-Level Ownership', detail: 'Franchisees own their Operations OS execution. Corporate provides the playbook and tools.' },
    { principle: 'Cross-Training Required', detail: 'Staff understand how their actions impact all 4 OS, not just their immediate task.' },
  ],
}

const operatingSystemsData = [
  {
    id: 'labor',
    name: 'Labor OS',
    icon: '👥',
    tagline: 'Right people, right skills, right time',
    description: 'Standardized labor management across all stores to optimize staffing, training, and productivity.',
    components: [
      { name: 'Staffing Model', detail: 'Data-driven scheduling based on traffic patterns and order complexity' },
      { name: 'Training Standards', detail: 'Unified certification program: Sandwich Artist → Shift Lead → Manager' },
      { name: 'Sales Per Labor Hour (SPLH)', detail: 'Target SPLH varies by local wage rates — $15/hr wage needs ~$60 SPLH for 25% labor cost' },
      { name: 'True Labor Cost', detail: 'Wages + payroll taxes + workers comp + benefits = real hourly cost from payroll data' },
    ],
    kpis: [
      { metric: 'Labor Cost %', target: '25-28%', current: '~30%' },
      { metric: 'SPLH vs Target', target: 'Wage-adjusted', current: 'Varies by market' },
      { metric: 'Training Completion', target: '100%', current: '~75%' },
    ],
  },
  {
    id: 'realestate',
    name: 'Real Estate OS',
    icon: '🏢',
    tagline: 'Right locations, right size, right economics',
    description: 'Strategic portfolio management with franchisee protection built in — optimizing placement while ensuring sustainable occupancy costs.',
    components: [
      { name: 'Trade Area Analysis', detail: 'GIS-based analysis of population density, competition, and traffic patterns' },
      { name: 'Cannibalization Model', detail: 'Identify overlapping stores within 1-mile radius for consolidation review' },
      { name: 'Total Occupancy Cost', detail: 'Full picture: base rent + CAM + taxes + insurance + snow removal + landscaping + maintenance reserves' },
      { name: 'Lease Protection Triggers', detail: 'Alert system when occupancy exceeds 8% — mitigation options before crisis point at 10%' },
      { name: 'Pass-Through Protection', detail: 'Track unexpected landlord charges: roof repairs, parking lot resurfacing, capital improvements' },
      { name: 'Relocation Pipeline', detail: 'Proactive identification of A+ sites for Tier 1 operator expansion' },
    ],
    kpis: [
      { metric: 'Avg Store Distance', target: '2+ miles', current: '~0.8 miles' },
      { metric: 'Total Occupancy %', target: '5-7%', current: 'Varies' },
      { metric: 'Stores Above 10%', target: '0 (red alert)', current: 'Monitoring' },
      { metric: 'Cannibalization Rate', target: '<5%', current: '~15%' },
    ],
  },
  {
    id: 'tech',
    name: 'Tech OS',
    icon: '💻',
    tagline: 'Unified platform, real-time visibility, actionable insights',
    description: 'Integrated technology stack enabling transparency, efficiency, and data-driven decisions.',
    components: [
      { name: 'POS Integration', detail: 'Single platform for orders, payments, and loyalty across all channels' },
      { name: 'Franchisee Dashboard', detail: 'Real-time KPIs, benchmarking, and suggested actions' },
      { name: 'Customer App', detail: 'Test Kitchen voting, store transparency, direct chat, local events' },
      { name: 'Data Pipeline', detail: 'Centralized data warehouse feeding all reporting and AI systems' },
    ],
    kpis: [
      { metric: 'Digital Order %', target: '50%+', current: '~35%' },
      { metric: 'App Engagement', target: '40% MAU', current: '~20%' },
      { metric: 'Data Freshness', target: 'Real-time', current: '~24hr lag' },
    ],
  },
  {
    id: 'food',
    name: 'Food OS',
    icon: '🥪',
    tagline: 'Consistent quality, efficient prep, reduced waste',
    description: 'Standardized food operations ensuring every sandwich meets quality standards.',
    components: [
      { name: 'Recipe Standards', detail: 'Precise portioning, prep procedures, and presentation guidelines' },
      { name: 'Supply Chain', detail: 'Approved vendor network with quality audits and cost optimization' },
      { name: 'Freshness Protocols', detail: 'Temperature monitoring, expiration tracking, FIFO enforcement' },
      { name: 'Menu Governance', detail: 'Test Kitchen → Regional Test → National Rollout pipeline' },
    ],
    kpis: [
      { metric: 'Food Cost %', target: '28-30%', current: '~32%' },
      { metric: 'Waste %', target: '<3%', current: '~5%' },
      { metric: 'Audit Pass Rate', target: '95%+', current: '~82%' },
    ],
  },
]

const tieringDetailData = {
  auvGoal: {
    target: '$750,000',
    deadline: '2030',
    current: '~$430,000',
    growth: '+74%',
    rationale: 'Closing low-volume stores removes drag on the average. Remaining stores + operational improvements get you there.',
  },
  auvMath: {
    explanation: 'Store closures disproportionately remove low-AUV locations, naturally raising the network average.',
  },
  inflationAdjustment: {
    principle: 'The minimum AUV floor should adjust for inflation annually to maintain real purchasing power.',
    schedule: [
      { year: '2030', minimum: '$750,000', note: 'Baseline target' },
      { year: '2033', minimum: '$820,000', note: '+3%/year inflation' },
      { year: '2035', minimum: '$870,000', note: 'Adjusted floor' },
      { year: '2040', minimum: '$1,000,000', note: 'Long-term floor' },
    ],
    mechanism: 'Annual review tied to CPI or QSR industry index. Published 18 months ahead so franchisees can plan.',
  },
  criteria: [
    { tier: 1, auv: '$750k+', auvFuture: 'At goal', compliance: '95%+', growth: 'Expansion priority', support: 'Priority LTO access, reduced royalties, new store rights' },
    { tier: 2, auv: '$500-750k', auvFuture: 'Path to goal', compliance: '80-95%', growth: 'Improvement plan', support: 'Coaching, milestone tracking, marketing support' },
    { tier: 3, auv: '<$500k', auvFuture: 'Below floor', compliance: '<80%', growth: 'Exit/Transfer/Turnaround', support: 'Intensive intervention or managed exit' },
  ],
  exitStrategies: [
    { strategy: 'Voluntary Exit', description: 'Up to $50k exit package for clean store closure', timeline: '90 days' },
    { strategy: 'Store Transfer', description: 'Facilitated sale to Tier 1 operator or corporate spine', timeline: '6-12 months' },
    { strategy: 'Non-Renewal', description: 'Lease not renewed at expiration, managed wind-down', timeline: 'At lease end' },
    { strategy: 'Forced Exit', description: 'Compliance violations, last resort after remediation fails', timeline: '30-90 days' },
  ],
  consolidationFund: {
    size: '$500M over 5 years',
    sources: ['Royalty allocation (0.5%)', 'Corporate contribution', 'Roark Capital support'],
    uses: [
      { use: 'Exit Packages', amount: '$50k/store', total: '~$150M' },
      { use: 'Remodel Co-Fund', amount: 'Up to 50%', total: '~$200M' },
      { use: 'Relocation Capex', amount: 'Up to $250k', total: '~$100M' },
      { use: 'Operator Training', amount: 'Programs', total: '~$50M' },
    ],
  },
}

const kpiCatalogData = [
  {
    category: 'Financial Performance',
    metrics: [
      { name: 'AUV (Average Unit Volume)', definition: 'Annual sales per store', formula: 'Total Sales / Store Count', target: '$750k+ by 2030', frequency: 'Monthly' },
      { name: '4-Wall EBITDA', definition: 'Store-level profitability', formula: '(Revenue - COGS - Labor - Rent - Utilities) / Revenue', target: '18%+', frequency: 'Monthly' },
      { name: 'Same-Store Sales', definition: 'Year-over-year growth for stores open 12+ months', formula: '(Current Year Sales - Prior Year) / Prior Year', target: '+5-8%', frequency: 'Monthly' },
    ],
  },
  {
    category: 'Operational Excellence',
    metrics: [
      { name: 'Order Accuracy', definition: 'Orders made correctly without remakes', formula: 'Correct Orders / Total Orders', target: '98%+', frequency: 'Daily' },
      { name: 'Speed of Service', definition: 'Time from order to handoff', formula: 'Average transaction time', target: '<3 min', frequency: 'Daily' },
      { name: 'Freshness Score', definition: 'Audit-based quality rating', formula: 'Audit points / Maximum points', target: '95%+', frequency: 'Weekly' },
    ],
  },
  {
    category: 'Customer Experience',
    metrics: [
      { name: 'Guest Satisfaction', definition: 'Customer survey score', formula: 'Avg rating (1-5 scale)', target: '4.5+', frequency: 'Weekly' },
      { name: 'Net Promoter Score', definition: 'Likelihood to recommend', formula: '% Promoters - % Detractors', target: '50+', frequency: 'Monthly' },
      { name: 'Loyalty Participation', definition: 'Transactions with loyalty ID', formula: 'Loyalty Transactions / Total Transactions', target: '60%+', frequency: 'Daily' },
    ],
  },
  {
    category: 'Network Health',
    metrics: [
      { name: 'Tier 1 Distribution', definition: 'Percentage of stores in Tier 1', formula: 'Tier 1 Stores / Total Stores', target: '40%+', frequency: 'Quarterly' },
      { name: 'Compliance Rate', definition: 'Stores meeting all standards', formula: 'Compliant Stores / Total Stores', target: '95%+', frequency: 'Monthly' },
      { name: 'Closure Rate', definition: 'Net store closures', formula: 'Closures - Openings', target: 'Per plan', frequency: 'Monthly' },
    ],
  },
]

const learningDevData = {
  challenge: 'Formalizing peer learning is tricky. Too much structure kills the trust and authenticity that makes it work. The goal is to enable, not control.',
  principles: [
    { principle: 'Enable, Don\'t Mandate', detail: 'Create spaces and tools for learning. Don\'t force participation — make it valuable enough that people want in.' },
    { principle: 'Protect the Organic', detail: 'The WhatsApp coalition works because it\'s franchisee-owned. Corporate\'s role is to support, not take over.' },
    { principle: 'Make Sharing Easy', detail: 'Reduce friction for sharing wins and lessons. One-click submissions, not 10-page forms.' },
    { principle: 'Celebrate Learners', detail: 'Recognition for those who share and those who improve. Learning is a badge of honor, not weakness.' },
  ],
  industryLearning: {
    description: 'Curated insights from outside Subway — what\'s working in QSR, retail, and adjacent industries.',
    sources: [
      { source: 'Competitor Watch', detail: 'What McDonald\'s, Chick-fil-A, Chipotle are doing (and what\'s working)' },
      { source: 'Industry Benchmarks', detail: 'NRA data, QSR Magazine metrics, regional labor trends' },
      { source: 'Innovation Radar', detail: 'Emerging tech, ordering trends, customer behavior shifts' },
      { source: 'Regulatory Updates', detail: 'Health codes, labor laws, food safety requirements by state' },
    ],
    delivery: 'Weekly digest + searchable library in franchisee dashboard',
  },
  peerLearning: {
    description: 'Franchisees learning from each other — the most trusted and actionable source of improvement.',
    mechanisms: [
      { mechanism: 'Benchmarking Dashboard', detail: 'See how your KPIs compare to similar stores (same volume, same region). Anonymized but actionable.', formality: 'Low' },
      { mechanism: 'Best Practice Spotlights', detail: 'Monthly features on what\'s working at specific stores. Operator-told stories, not corporate spin.', formality: 'Low' },
      { mechanism: 'Regional Operator Calls', detail: 'Opt-in calls for operators in same region. Loose agenda, real talk.', formality: 'Medium' },
      { mechanism: 'Mentorship Matching', detail: 'Tier 1 operators volunteer to support Tier 2 stores. Relationship-based, not assigned.', formality: 'Medium' },
      { mechanism: 'WhatsApp/Community Groups', detail: 'Support existing groups. Provide resources when asked. Don\'t try to own them.', formality: 'Organic' },
      { mechanism: 'Annual Operator Summit', detail: 'In-person gathering for top performers to share and connect. Builds the network.', formality: 'High' },
    ],
  },
  existingAssets: [
    { asset: 'WhatsApp Coalition', status: '~60 franchisees, 1,000-1,500 stores', opportunity: 'Pilot group for new learning initiatives. Ask them what they need.' },
    { asset: 'NAASF', status: 'Established national association', opportunity: 'Partner on industry learning content. Leverage their credibility.' },
    { asset: 'Tier 1 Operators', status: '~30% of network', opportunity: 'The teachers. Make it easy and rewarding for them to share.' },
  ],
  feedbackLoop: 'Learning isn\'t one-way. The best insights come FROM franchisees, get validated, then shared back. Corporate curates, franchisees create.',
}

const newDevelopmentData = {
  philosophy: 'New stores only when economics work for franchisees. Growth serves operators, not just corporate royalty revenue.',
  overdevelopmentLesson: {
    headline: 'From Overdevelopment to Focused Growth',
    stats: '25,000+ stores at peak → 19,000 today → 11-13k target by 2035',
    lesson: 'Subway prioritized unit count over unit economics for decades. Franchisees carried the cost of cannibalization, weak sites, and margin pressure. That era is over.',
    newApproach: 'Development must now be surgical: right location, right operator, right economics. Fewer stores, but every one profitable and sustainable.',
  },
  currentProblem: 'Historically, new stores were approved to hit unit count targets, often cannibalizing existing franchisees. Growth was celebrated even when individual stores struggled.',
  principles: [
    { principle: 'Franchisee-First Economics', detail: 'No new store approved unless projected to hit Tier 1 AUV ($750k+) within 24 months.' },
    { principle: 'Cannibalization Protection', detail: 'Must prove <10% impact on existing stores within 2-mile radius. Affected franchisees have right of first refusal.' },
    { principle: 'Operator Quality Gate', detail: 'New stores only awarded to Tier 1 operators with proven track record. No new franchisees until network is stabilized.' },
    { principle: 'Site Economics Proof', detail: 'Full P&L projection required. Must show 18%+ 4-wall EBITDA at conservative volume estimates.' },
  ],
  approvalCriteria: [
    { criteria: 'Trade Area Analysis', requirement: 'Population density, traffic patterns, competition mapping must support $750k+ AUV', gate: 'Required' },
    { criteria: 'Cannibalization Study', requirement: 'Impact on stores within 2 miles must be <10%. Affected franchisees consulted.', gate: 'Required' },
    { criteria: 'Operator Qualification', requirement: 'Must be current Tier 1 operator OR corporate spine location', gate: 'Required' },
    { criteria: 'Financial Pro Forma', requirement: 'Conservative case shows 18%+ EBITDA, payback <36 months', gate: 'Required' },
    { criteria: 'Franchisee Council Review', requirement: 'Regional council reviews and can flag concerns', gate: 'Advisory' },
    { criteria: 'Real Estate OS Approval', requirement: 'Site fits into strategic network plan, not opportunistic', gate: 'Required' },
  ],
  rightOfFirstRefusal: {
    description: 'Existing franchisees in the trade area get first option on new development.',
    process: [
      'New site identified by Real Estate OS',
      'Existing franchisees within 3 miles notified',
      '60-day window to express interest',
      'If multiple interest, awarded to highest-tier operator',
      'If no interest, open to other Tier 1 operators',
    ],
  },
  restrictions: [
    'No new stores in trade areas with >15% cannibalization risk',
    'No new franchisees until network stabilizes at target range (12-14k)',
    'No development deals that lock in unit counts without site approval',
    'Corporate cannot mandate development as condition of renewal',
  ],
}

const remodelGovernanceData = {
  currentReality: {
    typicalCost: '$40,000 - $80,000',
    problem: 'Remodels are often mandated without clear ROI proof. Corporate designs the package, franchisee carries the debt.',
    tension: 'A $60k remodel on a $350k AUV store with 10% margins means 17+ months of profit to break even — before any sales lift.',
  },
  principles: [
    { principle: 'Profit-First Design', detail: 'Every element of a remodel package must justify its cost with projected sales lift or cost savings.' },
    { principle: 'No Mandate Without Proof', detail: 'Packages must be piloted and measured before system-wide rollout. Actual ROI, not projections.' },
    { principle: 'AUV-Appropriate Requirements', detail: 'A $600k store and a $350k store shouldn\'t have the same remodel mandate. Tiered requirements.' },
    { principle: 'Franchisee Voice in Design', detail: 'Operators on the Franchisee Advisory Council review and approve package elements.' },
  ],
  packageTiers: [
    { tier: 'Essential', cost: '$25-40k', focus: 'Customer-facing refresh', elements: ['New signage', 'Fresh paint', 'Updated menu boards', 'Lighting upgrade'], roi: '12-18 month payback' },
    { tier: 'Standard', cost: '$40-60k', focus: 'Full refresh', elements: ['Essential +', 'New flooring', 'Counter updates', 'Seating refresh'], roi: '18-24 month payback' },
    { tier: 'Premium', cost: '$60-80k', focus: 'Complete modernization', elements: ['Standard +', 'Kitchen upgrades', 'Digital integration', 'Layout optimization'], roi: '24-36 month payback' },
  ],
  costTransparency: {
    note: 'All tier costs are total build-to-cost: materials + labor + permits fully installed.',
    quoteSharing: 'Standardized quote sharing across the brand — franchisees submit contractor bids to a central database, creating visibility into what remodels actually cost by region and scope. Know the benchmark. Know if you\'re getting ripped off.',
  },
  process: [
    { stage: 'Design', requirement: 'Franchisee Advisory Council reviews all package elements. Must justify each cost.' },
    { stage: 'Pilot', requirement: 'Test in 30-50 stores across different AUV levels. Measure actual sales lift for 6 months.' },
    { stage: 'ROI Gate', requirement: 'Must demonstrate payback period under 36 months in pilot. If not, revise package.' },
    { stage: 'Tiered Rollout', requirement: 'Different requirements by tier. Tier 3 stores may get Essential only or exit path.' },
    { stage: 'Co-Investment', requirement: 'Consolidation fund covers 25-50% for qualifying stores. Corporate has skin in the game.' },
    { stage: 'Timeline Flexibility', requirement: 'Reasonable windows (12-18 months). Hardship provisions for struggling stores.' },
  ],
  coInvestment: {
    fund: 'Consolidation & Reinvestment Fund',
    tiers: [
      { storeTier: 'Tier 1', coverage: 'Up to 25%', rationale: 'Already profitable, lower risk' },
      { storeTier: 'Tier 2', coverage: 'Up to 50%', rationale: 'Need support to improve' },
      { storeTier: 'Tier 3', coverage: 'Case-by-case or exit', rationale: 'May not make sense to remodel' },
    ],
  },
  killCriteria: [
    'Pilot shows <5% sales lift after 6 months',
    'Payback period exceeds 36 months',
    'Franchisee council votes against rollout',
    'Cost increases >15% from original estimate',
  ],
}

const keystoneHubData = {
  brandName: 'Subway Intelligence',
  poweredBy: 'Powered by Keystone Hub',
  vision: 'AI-powered business intelligence that works FOR franchisees — proactive insights, voluntary data sharing, and regional benchmarking.',
  tagline: 'From data overload to actionable intelligence',
  agents: {
    proactive: [
      { name: 'Daily Analysis Agent', schedule: '6:00 AM daily', description: 'Analyzes yesterday\'s performance, flags variances, generates manager briefings with 3-5 key points.' },
      { name: 'Weekly Strategy Agent', schedule: 'Sundays', description: 'Executive summaries for multi-unit owners. Network-wide trends and strategic KPI analysis.' },
      { name: 'Real-time Monitor', schedule: 'Every 30 min', description: 'Flags anomalies as they occur. Escalation system via Slack/SMS/email.' },
    ],
    reactive: [
      { name: 'Conversational AI', trigger: 'On-demand', description: 'Multi-turn chat. Ask questions, get deep dive analysis. "Why were Tuesday sales down?"' },
      { name: 'Comparison Engine', trigger: 'On-demand', description: 'Compare your store to similar stores, regional averages, or your own history.' },
    ],
  },
  dataSources: [
    { source: 'POS/FreshConnect', data: 'Sales, transactions, product mix, dayparts' },
    { source: 'Labor Systems', data: 'Hours, SPLH, pay rates, scheduling efficiency' },
    { source: 'Pricing Data', data: 'Menu prices, promo impact, competitive pricing' },
    { source: 'Weather APIs', data: 'Current conditions, forecasts, historical patterns' },
    { source: 'Local Events', data: 'Concerts, sports, school schedules, holidays' },
    { source: 'Reviews/Feedback', data: 'Yelp, Google, in-app feedback' },
    { source: 'Voluntary Sharing', data: 'Anonymized peer data from opted-in franchisees' },
  ],
  // Labor metrics and benchmarks
  laborMetrics: {
    splhTarget: 60, // Sales Per Labor Hour target
    splhGood: 65,
    splhExcellent: 70,
    payRates: {
      regularCrew: { avg: 12.50, range: '11.00-14.00' },
      allCrew: { avg: 13.25, range: '11.00-16.00' },
      management: { avg: 17.50, range: '15.00-22.00' },
    },
    laborTargetPercent: 28, // Target labor as % of sales
  },
  // Pricing tracking
  pricingData: {
    footlongAvg: 9.49,
    sixInchAvg: 6.49,
    comboUplift: 3.00,
    avgTicket: 11.85,
    recentChanges: [
      { item: 'Footlong Combos', change: '+$0.50', date: 'Oct 2025' },
      { item: 'Premium Proteins', change: '+$0.30', date: 'Sep 2025' },
    ],
  },
  voluntarySharing: {
    principle: 'Franchisees choose to share anonymized data to help each other succeed. No mandates — value drives participation.',
    benefits: [
      { benefit: 'Regional Heat Maps', detail: 'See sales averages by area. Identify high/low performing trade areas.' },
      { benefit: 'Weather Impact Analysis', detail: 'How does rain affect YOUR area? Compare to similar markets.' },
      { benefit: 'Event Correlation', detail: 'Which local events drive traffic? Learn from other stores\' patterns.' },
      { benefit: 'KPI Benchmarking', detail: 'Compare SPLH, labor %, food cost to similar stores.' },
      { benefit: 'Pricing Intelligence', detail: 'How do regional price changes affect traffic and ticket?' },
      { benefit: 'Best Practice Discovery', detail: 'What do top performers in your region do differently?' },
    ],
    privacy: 'All shared data is anonymized. No store names, just patterns. You control what you share.',
  },
  dashboardFeatures: [
    { feature: 'Manager Briefing', icon: '📋', description: 'Daily 3-5 bullet points: what happened, what to watch, what to do.' },
    { feature: 'SPLH Tracker', icon: '⏱️', description: 'Real-time sales per labor hour with shift-level breakdown.' },
    { feature: 'Heat Maps', icon: '🗺️', description: 'Regional sales patterns, weather correlations, competitive density.' },
    { feature: 'Pricing Impact', icon: '💲', description: 'Track how price changes affect transactions and ticket.' },
    { feature: 'Anomaly Alerts', icon: '⚠️', description: 'Automatic flags when metrics deviate from expected ranges.' },
    { feature: 'Chat Interface', icon: '💬', description: 'Ask questions in plain English. "Show me lunch SPLH trends."' },
  ],
  exampleInsight: {
    title: '5-Store Network Performance',
    period: 'Week of Nov 11-17, 2025',
    summary: '$62,400 total revenue (+2% vs forecast)',
    weeklyAvgPerStore: '$12,480',
    dailyAvgPerStore: '$1,783',
    attention: [
      'Store 412: SPLH declining ($52 vs $60 target) for 3rd consecutive week → Recommend scheduling audit',
      'Weekend Dinner: Soft network-wide (-8% vs last year) → Possible competitive pressure from new Chipotle',
    ],
    opportunities: [
      'Breakfast momentum: All stores showing +6% vs trend — SPLH strong at $68 during AM daypart',
      'Catering surge: Orders up 40% vs last month — high margin, consider dedicated prep time',
    ],
    topPerformer: 'Store 567 — $15,200/week, $64 SPLH, 26% labor (best in network)',
  },
  // Weather correlation data (from BI platform)
  weatherData: {
    correlation: 0.72,
    impacts: [
      { condition: 'Sunny', icon: '☀️', impact: '+8%', avgSales: 1980, count: 12, color: '#FFC20D' },
      { condition: 'Cloudy', icon: '⛅', impact: 'Normal', avgSales: 1840, count: 8, color: '#9E9E9E' },
      { condition: 'Rainy', icon: '🌧️', impact: '-12%', avgSales: 1620, count: 6, color: '#2196F3' },
      { condition: 'Stormy', icon: '⛈️', impact: '-18%', avgSales: 1510, count: 3, color: '#1565C0' },
    ],
    temperatureImpact: [
      { range: '<40°F', sales: 85, color: '#2196F3' },
      { range: '40-60°F', sales: 95, color: '#4CAF50' },
      { range: '60-80°F', sales: 108, color: '#8BC34A' },
      { range: '80-95°F', sales: 102, color: '#FFC107' },
      { range: '>95°F', sales: 92, color: '#FF5722' },
    ],
    forecast: [
      { day: 'Fri', weather: '☀️', temp: 62, predicted: 2100, impact: '+5%' },
      { day: 'Sat', weather: '☀️', temp: 65, predicted: 2250, impact: '+8%' },
      { day: 'Sun', weather: '🌧️', temp: 58, predicted: 1680, impact: '-10%' },
      { day: 'Mon', weather: '⛅', temp: 55, predicted: 1820, impact: 'Normal' },
      { day: 'Tue', weather: '🌧️', temp: 52, predicted: 1620, impact: '-12%' },
    ],
  },
  // Benchmarking data (from BI platform)
  // Boundaries: lowerBound = below this is red flag, upperBound = expected ceiling for this metric
  // Status: 'normal' = within bounds, 'flag' = outside expected range, 'excellent' = exceeding expectations
  benchmarkData: [
    { metric: 'Sales Volume', you: 62, peer: 50, top: 90, goal: 70, lowerBound: 25, upperBound: 85, status: 'normal', insight: 'Within expected range for your market type' },
    { metric: 'SPLH', you: 73, peer: 50, top: 90, goal: 80, lowerBound: 35, upperBound: 85, status: 'normal', insight: 'Strong efficiency — above peer average' },
    { metric: 'Labor Efficiency', you: 45, peer: 50, top: 90, goal: 65, lowerBound: 30, upperBound: 80, status: 'flag', insight: 'Below peer average — review scheduling patterns' },
    { metric: 'Food Cost %', you: 68, peer: 50, top: 90, goal: 75, lowerBound: 40, upperBound: 85, status: 'normal', insight: 'Healthy food cost control' },
    { metric: 'Customer Sat.', you: 78, peer: 50, top: 90, goal: 85, lowerBound: 35, upperBound: 95, status: 'excellent', insight: 'Top quartile performance — maintain current practices' },
  ],
  // Actionable recommendations (from BI platform)
  recommendations: [
    { id: 1, category: 'Labor', priority: 'high', title: 'Optimize Lunch Rush Scheduling', description: 'Shift peak staffing from 11am-2pm to 11:30am-1pm based on transaction patterns', potentialSavings: '$1,200/month', effort: 'Low', timeline: 'This Week' },
    { id: 2, category: 'Weather', priority: 'medium', title: 'Rain Day Delivery Push', description: 'Increase delivery promo visibility by 20% on forecasted rain days — region sees +12% delivery on rain', potentialGain: '+8% sales', effort: 'Low', timeline: 'Immediate' },
    { id: 3, category: 'Operations', priority: 'medium', title: 'Reduce Food Waste', description: 'Current waste at 4.2%. Top performers at 2.1%. Implement batch prep tracking.', potentialSavings: '$650/month', effort: 'Medium', timeline: 'This Month' },
    { id: 4, category: 'Marketing', priority: 'high', title: 'Launch Catering Program', description: 'Catering orders up 40% — avg ticket $142. Target 10 local businesses within 2 miles.', potentialGain: '+18% revenue', effort: 'High', timeline: 'This Quarter' },
  ],
  // Economic context (from BI platform)
  economicData: [
    { indicator: 'Local Unemployment', value: '3.8%', trend: 'down', impact: 'positive', change: '-0.3%', insight: 'More discretionary spending' },
    { indicator: 'Gas Prices', value: '$3.42/gal', trend: 'up', impact: 'caution', change: '+$0.15', insight: 'May reduce dine-in traffic' },
    { indicator: 'Consumer Confidence', value: '68.2', trend: 'up', impact: 'positive', change: '+2.1', insight: 'Spending sentiment improving' },
    { indicator: 'Median Income (Area)', value: '$67.3K', trend: 'up', impact: 'positive', change: '+2.8%', insight: 'Strong local economy' },
  ],
  // Correlation factors
  correlationFactors: [
    { factor: 'Weather (Temperature)', correlation: 0.72, strength: 'Strong', action: 'Plan promos around forecast' },
    { factor: 'Day of Week', correlation: 0.65, strength: 'Strong', action: 'Optimize staffing by day' },
    { factor: 'Local Events', correlation: 0.58, strength: 'Moderate', action: 'Track events calendar' },
    { factor: 'Gas Prices', correlation: -0.42, strength: 'Moderate (Inverse)', action: 'Value deals when gas up' },
  ],
  // Regional heat map data
  regionalData: [
    { region: 'Downtown', sales: 112, cogs: 27.2, labor: 26.8, growth: '+12%', stores: 8, color: '#028940' },
    { region: 'University', sales: 109, cogs: 27.8, labor: 26.5, growth: '+9%', stores: 5, color: '#028940' },
    { region: 'Mall/Retail', sales: 105, cogs: 28.5, labor: 27.2, growth: '+5%', stores: 6, color: '#8BC34A' },
    { region: 'Highway/Travel', sales: 104, cogs: 28.1, labor: 27.5, growth: '+4%', stores: 4, color: '#8BC34A' },
    { region: 'Suburban', sales: 98, cogs: 29.8, labor: 28.9, growth: '-2%', stores: 9, color: '#FFC107' },
    { region: 'Rural', sales: 92, cogs: 30.2, labor: 29.8, growth: '-8%', stores: 3, color: '#FF9800' },
  ],
  // Corporate Spine Architecture
  corporateSpine: {
    headline: 'The Corporate Spine',
    tagline: 'Test → Prove → Scale',
    description: '5%+ of stores (~600) are corporate/JV owned, serving as permanent labs to test innovations before rolling out to franchisees.',
    purpose: [
      { icon: '🧪', title: 'Test New Initiatives', description: 'Menu items, pricing, tech, and formats are tested in controlled environments first' },
      { icon: '📊', title: 'Prove with Data', description: 'Subway Intelligence captures real performance data to validate or kill initiatives' },
      { icon: '📈', title: 'Scale What Works', description: 'Only proven initiatives roll out to the franchise network' },
      { icon: '🎓', title: 'Training Ground', description: 'Regional academies and certification programs anchored in spine markets' },
    ],
    dataFlow: [
      { step: 1, label: 'Spine Stores', description: 'Corporate/JV stores run controlled tests' },
      { step: 2, label: 'Subway Intelligence', description: 'AI agents collect and analyze performance data' },
      { step: 3, label: 'Prove Thresholds', description: 'Minimum lift and margin thresholds must be met' },
      { step: 4, label: 'Tier 1 Pilot', description: 'Top-performing franchisees pilot next' },
      { step: 5, label: 'Network Rollout', description: 'Staged rollout with enablement kits' },
    ],
    spineMarkets: [
      // Urban Markets
      { dma: 'New York', stores: 45, role: 'Flagship Urban', status: 'active', category: 'Urban' },
      { dma: 'Chicago', stores: 32, role: 'Menu Innovation', status: 'active', category: 'Urban' },
      // Suburban Markets
      { dma: 'Dallas Suburbs', stores: 28, role: 'Drive-Thru Labs', status: 'active', category: 'Suburban' },
      { dma: 'Phoenix', stores: 22, role: 'Tech Pilots', status: 'planned', category: 'Suburban' },
      // Rural/Small Town Markets
      { dma: 'Central Ohio', stores: 15, role: 'Small Town Model', status: 'planned', category: 'Rural' },
      { dma: 'Iowa Corridor', stores: 12, role: 'Rural Economics', status: 'planned', category: 'Rural' },
      // Market Revival Program
      { dma: 'Philadelphia', stores: 35, role: 'Market Revival', status: 'priority', category: 'Revival' },
      { dma: 'Detroit', stores: 25, role: 'Market Revival', status: 'planned', category: 'Revival' },
    ],
    marketRevival: {
      headline: 'Market Revival Program',
      problem: 'For decades, struggling markets were left to franchisees to fix — dumping their cash into problem stores without corporate support. Markets like Philadelphia have historically underperformed, with franchisees bearing all the risk.',
      solution: 'Corporate takes ownership of struggling markets, invests in revitalization (remodels, marketing, operations), proves the model works, then refranchises to qualified Tier 1 operators.',
      principle: 'Franchisees are brand partners, not owners of the brand itself. Corporate must own the hardest problems — not pass them to franchisees.',
      benefits: [
        'Corporate proves turnaround is possible before asking franchisees to invest',
        'Tier 1 operators get proven, revitalized markets — not fixer-uppers',
        'Brand reputation rebuilt in historically weak markets',
        'Creates playbook for market revival that can be repeated',
      ],
    },
    keystoneRole: 'Subway Intelligence is the intelligence layer that makes the Corporate Spine work. It captures real-time data from spine stores, identifies patterns, validates hypotheses, and generates the proof needed before any initiative goes network-wide.',
    testProtocol: {
      test: { description: 'Corporate/JV spine + Tier-1 operators', requirements: 'Clear hypotheses, KPIs, timelines' },
      prove: { description: 'Minimum lift and margin thresholds met', requirements: 'Ops feasibility confirmed' },
      scale: { description: 'Staged rollout with enablement kits', requirements: 'Kill-criteria defined in advance' },
    },
  },
  // Community Engagement - Leveraging Subway's New Initiatives
  communityEngagement: {
    headline: 'Franchisee Community',
    tagline: 'Stronger Together Through Connection',
    description: 'Subway\'s new leadership has prioritized franchisee connection with monthly town halls and regional meetings. Subway Intelligence amplifies these connections with always-on community features.',

    // New corporate initiatives (2025-2026)
    corporateInitiatives: [
      {
        name: 'Monthly Virtual Town Halls',
        startDate: 'September 2025',
        icon: '🏛️',
        description: 'Leadership-driven monthly updates connecting HQ to all franchisees',
        frequency: 'Monthly',
        status: 'active'
      },
      {
        name: 'Regional Meetings',
        startDate: '2026',
        icon: '🗺️',
        description: 'Replacing national convention with regional gatherings for closer connection',
        frequency: 'Annual',
        status: 'upcoming'
      },
    ],

    // How Keystone Hub enables deeper engagement
    keystoneEnhancements: [
      {
        icon: '💬',
        title: 'Pre-Town Hall Pulse Surveys',
        description: 'Before each town hall, franchisees submit questions and vote on topics. AI aggregates themes so leadership addresses what matters most.',
        benefit: 'Ensures town halls address real franchisee concerns, not just HQ agenda'
      },
      {
        icon: '📊',
        title: 'Post-Town Hall Action Tracking',
        description: 'Commitments made during town halls are tracked publicly. Franchisees see progress on promises.',
        benefit: 'Builds trust through accountability and transparency'
      },
      {
        icon: '🤝',
        title: 'Regional Performance Circles',
        description: 'Between regional meetings, Subway Intelligence connects franchisees in similar markets for monthly peer calls.',
        benefit: 'Continuous learning year-round, not just at annual events'
      },
      {
        icon: '💡',
        title: 'Innovation Suggestions',
        description: 'Franchisees submit ideas for menu, ops, or marketing. Peers vote. Top ideas get spine store testing.',
        benefit: 'Bottoms-up innovation with clear path to scale'
      },
      {
        icon: '🏆',
        title: 'Recognition Dashboard',
        description: 'Regional and national leaderboards for SPLH, customer satisfaction, and community contributions.',
        benefit: 'Healthy competition and peer recognition beyond just corporate awards'
      },
      {
        icon: '📚',
        title: 'Best Practice Library',
        description: 'Franchisees share what works. Video tips, scheduling templates, local marketing plays. Peer-reviewed and rated.',
        benefit: 'Leverage collective wisdom of 19,000+ operators'
      },
    ],

    // Regional meeting integration
    regionalIntegration: {
      title: 'Regional Meeting Supercharger',
      description: 'When franchisees meet regionally in 2026, they arrive prepared with data-driven insights specific to their market.',
      features: [
        { feature: 'Regional Benchmarks', detail: 'See how your region compares to others on key metrics before the meeting' },
        { feature: 'Market Challenges', detail: 'AI identifies common pain points in your region to focus discussion' },
        { feature: 'Success Stories', detail: 'Top performers in your region flagged for knowledge sharing' },
        { feature: 'Action Plans', detail: 'Regional commitments tracked in Subway Intelligence after each meeting' },
      ]
    },

    // Community metrics (sample)
    communityMetrics: {
      activeForums: 47,
      monthlyPosts: 2340,
      ideasSubmitted: 156,
      ideasInTesting: 8,
      bestPracticesShared: 412,
      peerConnections: 1820,
    },

    // Quote/testimonial
    quote: {
      text: 'The town halls are great, but what happens between them matters more. Subway Intelligence keeps the conversation going.',
      attribution: 'Multi-unit franchisee, Pennsylvania',
    },
  },
}

// ============================================
// SUBWAY COMEBACK / CUSTOMER EXPERIENCE DATA
// ============================================
const comebackTrackerData = {
  nationalSuccessRate: 74,
  headline: 'The Subway Comeback',
  tagline: 'Radical Transparency at 19,000+ Locations',
  description: 'Open-source our performance metrics to customers. Every store\'s Success Rate visible to anyone. In real-time.',
  revolutionaryIdea: 'No restaurant chain has ever done this. The industry hides behind mystery shoppers and sanitized marketing. Subway is saying: "Here\'s how we\'re actually doing. Judge us."',
  weeklyProgress: [
    { week: 'Week 1', rate: 68, stores: 17500 },
    { week: 'Week 2', rate: 70, stores: 17200 },
    { week: 'Week 3', rate: 72, stores: 16800 },
    { week: 'Week 4', rate: 74, stores: 16500 },
  ],
  topStores: [
    { rank: 1, name: 'Downtown Portland #412', rate: 96, badge: 'Top Performer' },
    { rank: 2, name: 'Austin South Lamar #1089', rate: 94, badge: 'Top Performer' },
    { rank: 3, name: 'Denver LoDo #567', rate: 93, badge: 'Top Performer' },
  ],
  improvingStores: 1247,
  customerReviews: 12500,
}

const successRateFormulaData = {
  title: 'Success Rate Formula',
  description: 'A composite score visible to customers — how each store measures up.',
  components: [
    { name: 'Order Accuracy', weight: 25, score: 78, icon: '✓', color: '#028940', description: 'Orders made correctly without remakes' },
    { name: 'Freshness & Quality', weight: 25, score: 72, icon: '🥬', color: '#8BCD32', description: 'Audit-based food quality rating' },
    { name: 'Speed of Service', weight: 20, score: 68, icon: '⚡', color: '#FFC20D', description: 'Time from order to handoff' },
    { name: 'Staff Friendliness', weight: 15, score: 82, icon: '😊', color: '#00A7E9', description: 'Customer-rated service quality' },
    { name: 'Cleanliness', weight: 15, score: 76, icon: '✨', color: '#4C006A', description: 'Store appearance and hygiene' },
  ],
  calculation: 'Weighted average of all components = National Success Rate',
  transparencyNote: 'Customers see these scores for every store. Underperformers are visible — and motivated to improve.',
}

const customerExperienceData = {
  headline: 'Customers as Partners',
  tagline: 'From transactions to participation',
  oldModel: {
    title: 'Old Model',
    flow: 'Customer → Gives data → Gets deals → Repeat purchase',
    description: 'Transactional. Customers are passive recipients of discounts.',
  },
  newModel: {
    title: 'New Model',
    flow: 'Customer → Participates → Shapes the brand → Invested in success',
    description: 'Partnership. Customers become active participants in rebuilding Subway.',
  },
  features: [
    {
      id: 'testKitchen',
      name: 'Test Kitchen Voting',
      icon: '🍽️',
      description: 'Vote on new menu items before they launch',
      benefit: 'Real demand signals, not corporate guesses',
      example: 'Current vote: Spicy Korean BBQ vs. Nashville Hot Chicken',
      stats: { votes: 24500, items: 12 },
    },
    {
      id: 'storeProfile',
      name: 'Store Transparency',
      icon: '📊',
      description: 'See your local store\'s real performance scores',
      benefit: 'Accountability drives improvement',
      example: 'Success Rate, Order Accuracy, Freshness — all visible',
      stats: { profileViews: 85000, photoSubmissions: 3200 },
    },
    {
      id: 'directChat',
      name: 'Direct Chat',
      icon: '💬',
      description: 'Talk directly to your local Subway team',
      benefit: 'Human connection, real-time problem resolution',
      example: '"My order was wrong" → Resolved in minutes',
      stats: { conversations: 4500, resolutionRate: 94 },
    },
    {
      id: 'localEvents',
      name: 'Local Events',
      icon: '🎉',
      description: 'Community fundraisers and neighborhood gatherings',
      benefit: 'Store becomes a community hub, not just a restaurant',
      example: 'School fundraiser night, Little League sponsorship',
      stats: { eventsHosted: 320, raised: 45000 },
    },
  ],
  loyaltyShift: {
    from: ['Give us your data', 'Discounts as reward', 'One-way extraction', 'Customers are targets'],
    to: ['Help us get better', 'Influence as reward', 'Two-way investment', 'Customers are stakeholders'],
  },
  quote: '"Your loyal customers already want you to succeed. Give them a way to help."',
}

const transparencyNarrativeData = {
  title: 'Transparency Makes Us Stronger',
  sections: [
    {
      title: 'Why This Works',
      points: [
        'Good stores shine — Top performers finally get recognized',
        'Bad stores face pressure — Customer visibility forces improvement or exit',
        'Customers become partners — They help identify what\'s working',
        'Competitors can\'t follow — They\'d expose their own inconsistencies',
      ],
    },
    {
      title: 'The Strategic Backbone',
      risks: [
        { risk: 'Bad stores exposed', solution: 'Portfolio management — close/fix/transfer them' },
        { risk: 'Inconsistent quality', solution: 'Food OS + Tech OS — standardize operations' },
        { risk: 'Weak operators visible', solution: 'Tiering system — Tier 3 exits, Tier 1 rewarded' },
        { risk: '"What if we look bad?"', solution: 'Right-size to 11-13k elite stores first' },
      ],
    },
  ],
  callout: 'The strategy exists to make transparency survivable — and powerful.',
  subwayAdvantage: 'Subway\'s biggest weakness (inconsistency across 20k stores) becomes its biggest differentiator. By exposing performance publicly, good stores get recognized and bad stores face pressure to improve.',
}

const implementationRoadmapData = [
  {
    phase: 1,
    name: 'Foundation',
    years: '0-3',
    quarters: [
      { q: 'Q1-Q2 Y1', focus: 'Infrastructure', actions: ['Deploy tiering system', 'Launch franchisee dashboard MVP', 'Establish consolidation fund'] },
      { q: 'Q3-Q4 Y1', focus: 'First Wave', actions: ['Begin Tier 3 exit conversations', 'Pilot Food OS 1.0 in 50 stores', 'Launch Test Kitchen in select markets'] },
      { q: 'Y2', focus: 'Acceleration', actions: ['1,500-2,000 closures', 'Expand Food OS to 500+ stores', 'Corporate spine: 5 markets'] },
      { q: 'Y3', focus: 'Stabilization', actions: ['Reach ~17,500 stores', 'Tech OS integration complete', 'Full transparency rollout'] },
    ],
  },
  {
    phase: 2,
    name: 'Strategic Cleanup',
    years: '3-6',
    quarters: [
      { q: 'Y4', focus: 'Trade Area Surgery', actions: ['Resolve 80% of cannibalization', 'Operator consolidation program', 'Remodel wave 2'] },
      { q: 'Y5', focus: 'Operator Excellence', actions: ['Tier 1 skew to 35%', 'Multi-unit operator expansion', 'AI-powered recommendations'] },
      { q: 'Y6', focus: 'Network Optimization', actions: ['Reach ~14,000 stores', 'Food OS 2.0 national', 'Full loyalty reimagination'] },
    ],
  },
  {
    phase: 3,
    name: 'Precision & Lock-In',
    years: '6-10',
    quarters: [
      { q: 'Y7-8', focus: 'Precision Pruning', actions: ['Non-renew marginal leases', 'Selective A+ openings only', '100% compliant network'] },
      { q: 'Y9-10', focus: 'Institutionalization', actions: ['Reach 11-13k elite stores', 'Food OS 3.0 with AI', '5%+ corporate spine', 'Model fully institutionalized'] },
    ],
  },
]

const presentationSlides = [
  {
    id: 1,
    title: 'The Subway Transformation',
    subtitle: '11-13k Elite Units in 10 Years',
    content: 'A strategic reset from 19,000 inconsistent stores to a right-sized network of profitable, modern, community-connected locations.',
    type: 'title',
  },
  {
    id: 2,
    title: 'The Revolutionary Idea',
    subtitle: 'Radical Transparency at Scale',
    content: 'Open-source our performance metrics to customers. Every store\'s Success Rate, Order Accuracy, Freshness scores — visible to anyone. At 19,000+ locations. In real-time.',
    highlight: 'No restaurant chain has ever done this.',
    type: 'concept',
  },
  {
    id: 3,
    title: 'Why Transparency Requires Strategy',
    subtitle: 'You cannot promise transparency without the spine to survive it',
    bullets: [
      'Bad stores exposed → Portfolio management (close/fix them)',
      'Inconsistent quality → Food OS + Tech OS standardization',
      'Weak operators visible → Tiering system with real exits',
      '"What if we look bad?" → Right-size to elite stores first',
    ],
    type: 'bullets',
  },
  {
    id: 4,
    title: 'Loyalty Reimagined',
    subtitle: 'From Transactions to Partnership',
    comparison: {
      old: { title: 'Old Model', items: ['Give us your data', 'Get deals', 'Repeat purchase'] },
      new: { title: 'New Model', items: ['Participate', 'Shape the brand', 'Invested in success'] },
    },
    type: 'comparison',
  },
  {
    id: 5,
    title: 'The Franchisee Partnership',
    subtitle: 'From Landlord to Partner',
    content: 'Franchisees carry the debt. Franchisees sign the leases. Franchisees pay the labor. Yet they have minimal say in decisions that determine success.',
    highlight: 'This is not partnership. This is tenancy.',
    type: 'concept',
  },
  {
    id: 6,
    title: 'The New Social Contract',
    subtitle: 'Shared Risk, Shared Voice',
    twoColumn: {
      left: { title: 'Franchisor Commits', items: ['No margin-killing promos without input', 'Co-investment in capex', 'Transparent economics', 'Real voice in decisions'] },
      right: { title: 'Franchisee Commits', items: ['Meet operational standards', 'Invest in store', 'Embrace accountability', 'Share performance data'] },
    },
    type: 'twoColumn',
  },
  {
    id: 7,
    title: 'Three Partnerships, One Comeback',
    subtitle: 'All must change together',
    content: 'Customers can\'t be partners if stores aren\'t good → need franchisee buy-in. Franchisees won\'t buy in without voice → need franchisor partnership. Communities won\'t engage if stores don\'t participate → need local empowerment.',
    type: 'concept',
  },
  {
    id: 8,
    title: 'Community as Infrastructure',
    subtitle: 'The comeback needs people, not just software',
    stats: [
      { label: 'WhatsApp Coalition', value: '~60 franchisees', detail: '1,000-1,500 stores (5-7% of network)' },
      { label: 'NAASF', value: 'National Association', detail: 'Opportunity to align adversarial → partnership' },
    ],
    highlight: '"You can build the best strategy in the world. But without a community to carry it, it stays on paper."',
    type: 'stats',
  },
  {
    id: 9,
    title: 'The 10-Year Journey',
    subtitle: 'Three Phases to Elite Network',
    phases: phaseData.phases,
    type: 'timeline',
  },
  {
    id: 10,
    title: 'The Ecosystem',
    subtitle: '6 Projects, One Vision',
    ecosystem: [
      { name: 'Subway-v2', role: 'Strategic spine', status: 'Active' },
      { name: 'Devapp1', role: 'Visual demonstration', status: 'Complete' },
      { name: 'Subway Intelligence', role: 'Intelligence layer (Powered by Keystone Hub)', status: 'In Dev' },
      { name: 'Subway-Reports', role: 'Data foundation', status: 'Production' },
      { name: 'Check-In', role: 'Communication layer', status: 'In Dev' },
      { name: 'AI-Lever-System', role: 'Execution layer', status: 'Early Dev' },
    ],
    type: 'ecosystem',
  },
  {
    id: 11,
    title: 'The Path Forward',
    subtitle: 'What Success Looks Like',
    bullets: [
      '11-13k stores that are profitable, modern, and community-connected',
      'Customers as partners, not just buyers',
      'Franchisees with voice and shared success',
      'Technology that enables transparency and action',
      'A brand worth being proud of again',
    ],
    type: 'bullets',
  },
]

// ============================================
// STYLES
// ============================================
const styles = {
  app: {
    minHeight: '100vh',
    backgroundColor: colors.background,
    fontFamily: 'system-ui, -apple-system, sans-serif',
    color: colors.text,
  },
  header: {
    backgroundColor: colors.green,
    padding: '20px 40px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  logoText: {
    color: colors.white,
    fontSize: '24px',
    fontWeight: '700',
    margin: 0,
  },
  logoSubtext: {
    color: colors.yellow,
    fontSize: '14px',
    fontWeight: '500',
  },
  nav: {
    display: 'flex',
    gap: '8px',
  },
  navButton: (active) => ({
    padding: '10px 24px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    backgroundColor: active ? colors.yellow : 'rgba(255,255,255,0.2)',
    color: active ? colors.text : colors.white,
    transition: 'all 0.2s ease',
  }),
  main: {
    padding: '40px',
    maxWidth: '1400px',
    margin: '0 auto',
  },
  // Dashboard styles
  dashboardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '20px',
    marginBottom: '40px',
  },
  kpiCard: {
    backgroundColor: colors.cardBg,
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  kpiIcon: {
    fontSize: '32px',
    marginBottom: '8px',
  },
  kpiValue: {
    fontSize: '32px',
    fontWeight: '700',
    color: colors.text,
    margin: '0 0 4px 0',
  },
  kpiLabel: {
    fontSize: '14px',
    color: colors.textLight,
    margin: '0 0 4px 0',
  },
  kpiSubtitle: {
    fontSize: '12px',
    color: colors.grayDark,
  },
  kpiChange: (trend) => ({
    fontSize: '12px',
    color: trend === 'down' ? colors.red : trend === 'up' ? colors.green : colors.grayDark,
    marginTop: '8px',
  }),
  sectionTitle: {
    fontSize: '20px',
    fontWeight: '600',
    color: colors.white,
    marginBottom: '20px',
  },
  phaseContainer: {
    display: 'flex',
    gap: '20px',
    marginBottom: '40px',
  },
  phaseCard: (status) => ({
    flex: 1,
    backgroundColor: colors.cardBg,
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    borderTop: `4px solid ${status === 'active' ? colors.green : status === 'upcoming' ? colors.yellow : colors.grayMedium}`,
    opacity: status === 'future' ? 0.7 : 1,
  }),
  phaseBadge: (status) => ({
    display: 'inline-block',
    padding: '4px 12px',
    borderRadius: '16px',
    fontSize: '12px',
    fontWeight: '600',
    backgroundColor: status === 'active' ? colors.green : status === 'upcoming' ? colors.yellow : colors.grayMedium,
    color: status === 'active' ? colors.white : colors.text,
    marginBottom: '12px',
  }),
  phaseYears: {
    fontSize: '14px',
    color: colors.grayDark,
    marginBottom: '8px',
  },
  phaseName: {
    fontSize: '18px',
    fontWeight: '600',
    color: colors.text,
    marginBottom: '8px',
  },
  phaseStores: {
    fontSize: '24px',
    fontWeight: '700',
    color: colors.green,
    marginBottom: '12px',
  },
  phaseFocus: {
    fontSize: '14px',
    color: colors.textLight,
    marginBottom: '16px',
    lineHeight: '1.5',
  },
  phaseMilestone: {
    fontSize: '12px',
    color: colors.textLight,
    padding: '4px 0',
    borderBottom: `1px solid ${colors.grayMedium}`,
  },
  twoColumnGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '40px',
    marginBottom: '40px',
  },
  tierContainer: {
    backgroundColor: colors.cardBg,
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  tierRow: {
    display: 'flex',
    alignItems: 'center',
    padding: '16px 0',
    borderBottom: `1px solid ${colors.grayMedium}`,
  },
  tierBadge: (color) => ({
    width: '40px',
    height: '40px',
    borderRadius: '8px',
    backgroundColor: color,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: colors.white,
    fontWeight: '700',
    marginRight: '16px',
  }),
  tierInfo: {
    flex: 1,
  },
  tierName: {
    fontSize: '16px',
    fontWeight: '600',
    color: colors.text,
    marginBottom: '4px',
  },
  tierDesc: {
    fontSize: '13px',
    color: colors.textLight,
  },
  tierPercent: {
    fontSize: '24px',
    fontWeight: '700',
    color: colors.text,
  },
  partnershipContainer: {
    backgroundColor: colors.cardBg,
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  partnershipRow: {
    padding: '16px 0',
    borderBottom: `1px solid ${colors.grayMedium}`,
  },
  partnershipTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    fontSize: '16px',
    fontWeight: '600',
    color: colors.text,
    marginBottom: '8px',
  },
  partnershipChange: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '13px',
  },
  partnershipOld: {
    color: colors.red,
    textDecoration: 'line-through',
  },
  partnershipArrow: {
    color: colors.grayDark,
  },
  partnershipNew: {
    color: colors.green,
    fontWeight: '500',
  },
  // Presentation styles
  slideContainer: {
    backgroundColor: colors.cardBg,
    borderRadius: '16px',
    padding: '60px',
    minHeight: '500px',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
  },
  slideNav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '40px',
  },
  slideNavButton: {
    padding: '12px 24px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    backgroundColor: colors.green,
    color: colors.white,
    transition: 'all 0.2s ease',
  },
  slideNavButtonDisabled: {
    backgroundColor: colors.grayMedium,
    color: colors.grayDark,
    cursor: 'not-allowed',
  },
  slideCounter: {
    fontSize: '14px',
    color: colors.grayDark,
  },
  slideTitle: {
    fontSize: '36px',
    fontWeight: '700',
    color: colors.text,
    marginBottom: '8px',
  },
  slideSubtitle: {
    fontSize: '20px',
    color: colors.green,
    marginBottom: '32px',
  },
  slideContent: {
    fontSize: '18px',
    color: colors.textLight,
    lineHeight: '1.8',
    flex: 1,
  },
  slideHighlight: {
    backgroundColor: colors.yellow,
    padding: '16px 24px',
    borderRadius: '8px',
    fontSize: '18px',
    fontWeight: '600',
    color: colors.text,
    marginTop: '24px',
  },
  slideBullets: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  slideBullet: {
    fontSize: '18px',
    color: colors.textLight,
    padding: '12px 0',
    paddingLeft: '32px',
    position: 'relative',
    borderBottom: `1px solid ${colors.grayMedium}`,
  },
  comparisonGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr auto 1fr',
    gap: '40px',
    alignItems: 'center',
  },
  comparisonBox: (isNew) => ({
    backgroundColor: isNew ? `${colors.green}15` : `${colors.red}15`,
    borderRadius: '12px',
    padding: '24px',
    border: `2px solid ${isNew ? colors.green : colors.red}`,
  }),
  comparisonTitle: (isNew) => ({
    fontSize: '16px',
    fontWeight: '600',
    color: isNew ? colors.green : colors.red,
    marginBottom: '16px',
  }),
  comparisonItem: {
    fontSize: '16px',
    color: colors.textLight,
    padding: '8px 0',
  },
  comparisonArrow: {
    fontSize: '48px',
    color: colors.green,
  },
  timelineContainer: {
    display: 'flex',
    gap: '24px',
  },
  timelinePhase: (status) => ({
    flex: 1,
    backgroundColor: status === 'active' ? `${colors.green}15` : colors.gray,
    borderRadius: '12px',
    padding: '24px',
    border: `2px solid ${status === 'active' ? colors.green : colors.grayMedium}`,
  }),
  ecosystemGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px',
  },
  ecosystemCard: {
    backgroundColor: colors.gray,
    borderRadius: '8px',
    padding: '16px',
  },
  ecosystemName: {
    fontSize: '16px',
    fontWeight: '600',
    color: colors.text,
    marginBottom: '4px',
  },
  ecosystemRole: {
    fontSize: '14px',
    color: colors.textLight,
    marginBottom: '8px',
  },
  ecosystemStatus: (status) => ({
    fontSize: '12px',
    padding: '4px 8px',
    borderRadius: '4px',
    backgroundColor: status === 'Production' || status === 'Complete' ? colors.green :
                     status === 'Active' ? colors.yellow : colors.grayMedium,
    color: status === 'Production' || status === 'Complete' ? colors.white : colors.text,
    display: 'inline-block',
  }),
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '24px',
    marginBottom: '24px',
  },
  statCard: {
    backgroundColor: colors.gray,
    borderRadius: '12px',
    padding: '24px',
  },
  statLabel: {
    fontSize: '14px',
    color: colors.grayDark,
    marginBottom: '8px',
  },
  statValue: {
    fontSize: '24px',
    fontWeight: '700',
    color: colors.text,
    marginBottom: '4px',
  },
  statDetail: {
    fontSize: '14px',
    color: colors.textLight,
  },
  // Deep Dive styles
  deepDiveContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
  },
  deepDiveSection: {
    backgroundColor: colors.cardBg,
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
  },
  deepDiveSectionHeader: (expanded, color = colors.green) => ({
    padding: '24px 32px',
    backgroundColor: expanded ? color : colors.gray,
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    transition: 'all 0.2s ease',
  }),
  deepDiveSectionTitle: (expanded) => ({
    fontSize: '20px',
    fontWeight: '600',
    color: expanded ? colors.white : colors.text,
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  }),
  deepDiveSectionIcon: {
    fontSize: '28px',
  },
  deepDiveExpand: (expanded) => ({
    fontSize: '24px',
    color: expanded ? colors.white : colors.grayDark,
    transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
    transition: 'transform 0.2s ease',
  }),
  deepDiveContent: {
    padding: '32px',
  },
  osGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '24px',
  },
  osCard: (color) => ({
    backgroundColor: colors.gray,
    borderRadius: '12px',
    padding: '24px',
    borderLeft: `4px solid ${color}`,
  }),
  osCardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '8px',
  },
  osCardIcon: {
    fontSize: '32px',
  },
  osCardTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: colors.text,
  },
  osCardTagline: {
    fontSize: '14px',
    color: colors.green,
    fontStyle: 'italic',
    marginBottom: '12px',
  },
  osCardDesc: {
    fontSize: '14px',
    color: colors.textLight,
    marginBottom: '16px',
    lineHeight: '1.5',
  },
  osComponent: {
    padding: '12px 0',
    borderBottom: `1px solid ${colors.grayMedium}`,
  },
  osComponentName: {
    fontSize: '14px',
    fontWeight: '600',
    color: colors.text,
    marginBottom: '4px',
  },
  osComponentDetail: {
    fontSize: '13px',
    color: colors.textLight,
  },
  osKpiGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '12px',
    marginTop: '16px',
  },
  osKpiCard: {
    backgroundColor: colors.white,
    borderRadius: '8px',
    padding: '12px',
    textAlign: 'center',
  },
  osKpiMetric: {
    fontSize: '12px',
    color: colors.grayDark,
    marginBottom: '4px',
  },
  osKpiTarget: {
    fontSize: '16px',
    fontWeight: '700',
    color: colors.green,
  },
  osKpiCurrent: {
    fontSize: '12px',
    color: colors.red,
  },
  tableContainer: {
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  tableHeader: {
    backgroundColor: colors.gray,
    textAlign: 'left',
    padding: '12px 16px',
    fontSize: '14px',
    fontWeight: '600',
    color: colors.text,
    borderBottom: `2px solid ${colors.grayMedium}`,
  },
  tableCell: {
    padding: '12px 16px',
    fontSize: '14px',
    color: colors.textLight,
    borderBottom: `1px solid ${colors.grayMedium}`,
  },
  tableCellBold: {
    padding: '12px 16px',
    fontSize: '14px',
    fontWeight: '600',
    color: colors.text,
    borderBottom: `1px solid ${colors.grayMedium}`,
  },
  fundCard: {
    backgroundColor: colors.gray,
    borderRadius: '12px',
    padding: '24px',
    marginBottom: '24px',
  },
  fundSize: {
    fontSize: '32px',
    fontWeight: '700',
    color: colors.green,
    marginBottom: '16px',
  },
  fundSources: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap',
    marginBottom: '16px',
  },
  fundSourceBadge: {
    backgroundColor: colors.white,
    padding: '8px 16px',
    borderRadius: '20px',
    fontSize: '13px',
    color: colors.text,
  },
  roadmapPhase: {
    marginBottom: '32px',
  },
  roadmapPhaseHeader: (phase) => ({
    backgroundColor: phase === 1 ? colors.green : phase === 2 ? colors.yellow : colors.grayMedium,
    color: phase === 1 ? colors.white : colors.text,
    padding: '16px 24px',
    borderRadius: '12px 12px 0 0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  }),
  roadmapPhaseName: {
    fontSize: '18px',
    fontWeight: '600',
  },
  roadmapPhaseYears: {
    fontSize: '14px',
    opacity: 0.8,
  },
  roadmapQuarters: {
    backgroundColor: colors.gray,
    borderRadius: '0 0 12px 12px',
    padding: '24px',
  },
  roadmapQuarter: {
    display: 'grid',
    gridTemplateColumns: '120px 140px 1fr',
    gap: '16px',
    padding: '16px 0',
    borderBottom: `1px solid ${colors.grayMedium}`,
    alignItems: 'start',
  },
  roadmapQuarterLabel: {
    fontSize: '14px',
    fontWeight: '600',
    color: colors.text,
  },
  roadmapQuarterFocus: {
    fontSize: '14px',
    color: colors.green,
    fontWeight: '500',
  },
  roadmapActions: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
  },
  roadmapAction: {
    backgroundColor: colors.white,
    padding: '6px 12px',
    borderRadius: '4px',
    fontSize: '13px',
    color: colors.textLight,
  },
  kpiCategory: {
    marginBottom: '32px',
  },
  kpiCategoryTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: colors.text,
    marginBottom: '16px',
    paddingBottom: '8px',
    borderBottom: `2px solid ${colors.green}`,
  },
  // Operations OS styles
  opsOSHero: {
    backgroundColor: colors.green,
    borderRadius: '12px',
    padding: '32px',
    marginBottom: '32px',
    textAlign: 'center',
  },
  opsOSHeroTitle: {
    fontSize: '28px',
    fontWeight: '700',
    color: colors.white,
    marginBottom: '8px',
  },
  opsOSHeroTagline: {
    fontSize: '18px',
    color: colors.yellow,
    fontStyle: 'italic',
  },
  opsOSDesc: {
    fontSize: '16px',
    color: colors.textLight,
    lineHeight: '1.7',
    marginBottom: '32px',
    maxWidth: '900px',
  },
  opsOSDiagram: {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr 1fr',
    gap: '24px',
    alignItems: 'center',
    marginBottom: '32px',
  },
  opsOSPillar: {
    backgroundColor: colors.gray,
    borderRadius: '12px',
    padding: '20px',
    textAlign: 'center',
  },
  opsOSPillarIcon: {
    fontSize: '32px',
    marginBottom: '8px',
  },
  opsOSPillarName: {
    fontSize: '14px',
    fontWeight: '600',
    color: colors.text,
    marginBottom: '4px',
  },
  opsOSPillarCoord: {
    fontSize: '12px',
    color: colors.textLight,
  },
  opsOSCenter: {
    backgroundColor: colors.green,
    borderRadius: '16px',
    padding: '32px',
    textAlign: 'center',
    color: colors.white,
  },
  opsOSCenterTitle: {
    fontSize: '24px',
    fontWeight: '700',
    marginBottom: '8px',
  },
  opsOSCenterSub: {
    fontSize: '14px',
    opacity: 0.9,
  },
  opsOSArrow: {
    fontSize: '24px',
    color: colors.green,
    textAlign: 'center',
  },
  rhythmContainer: {
    display: 'flex',
    gap: '16px',
    overflowX: 'auto',
    paddingBottom: '16px',
  },
  rhythmCard: {
    flex: '0 0 200px',
    backgroundColor: colors.gray,
    borderRadius: '12px',
    padding: '20px',
    borderTop: `4px solid ${colors.green}`,
  },
  rhythmTime: {
    fontSize: '14px',
    fontWeight: '600',
    color: colors.green,
    marginBottom: '12px',
  },
  rhythmActivity: {
    fontSize: '13px',
    color: colors.textLight,
    padding: '6px 0',
    borderBottom: `1px solid ${colors.grayMedium}`,
  },
  feedbackCard: {
    backgroundColor: colors.gray,
    borderRadius: '12px',
    padding: '20px',
    marginBottom: '16px',
  },
  feedbackSignal: {
    fontSize: '16px',
    fontWeight: '600',
    color: colors.red,
    marginBottom: '8px',
  },
  feedbackDiagnosis: {
    fontSize: '14px',
    color: colors.textLight,
    lineHeight: '1.6',
  },
  principleGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '20px',
  },
  principleCard: {
    backgroundColor: colors.gray,
    borderRadius: '12px',
    padding: '24px',
    borderLeft: `4px solid ${colors.yellow}`,
  },
  principleName: {
    fontSize: '16px',
    fontWeight: '600',
    color: colors.text,
    marginBottom: '8px',
  },
  principleDetail: {
    fontSize: '14px',
    color: colors.textLight,
    lineHeight: '1.5',
  },
  // Learning & Development styles
  learningChallenge: {
    backgroundColor: colors.yellow,
    borderRadius: '12px',
    padding: '24px',
    marginBottom: '32px',
  },
  learningChallengeText: {
    fontSize: '16px',
    color: colors.text,
    lineHeight: '1.6',
    fontStyle: 'italic',
  },
  learningTwoCol: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '32px',
    marginBottom: '32px',
  },
  learningColumn: {
    backgroundColor: colors.gray,
    borderRadius: '12px',
    padding: '24px',
  },
  learningColumnTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: colors.text,
    marginBottom: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  learningColumnDesc: {
    fontSize: '14px',
    color: colors.textLight,
    marginBottom: '16px',
    lineHeight: '1.5',
  },
  learningSource: {
    padding: '12px 0',
    borderBottom: `1px solid ${colors.grayMedium}`,
  },
  learningSourceName: {
    fontSize: '14px',
    fontWeight: '600',
    color: colors.text,
    marginBottom: '4px',
  },
  learningSourceDetail: {
    fontSize: '13px',
    color: colors.textLight,
  },
  learningMechanism: {
    padding: '16px',
    backgroundColor: colors.white,
    borderRadius: '8px',
    marginBottom: '12px',
  },
  learningMechanismHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
  },
  learningMechanismName: {
    fontSize: '14px',
    fontWeight: '600',
    color: colors.text,
  },
  learningFormalityBadge: (formality) => ({
    fontSize: '11px',
    padding: '4px 8px',
    borderRadius: '12px',
    backgroundColor: formality === 'Organic' ? colors.green :
                     formality === 'Low' ? colors.greenLight :
                     formality === 'Medium' ? colors.yellow : colors.orange,
    color: formality === 'Organic' || formality === 'Low' ? colors.white : colors.text,
  }),
  learningMechanismDetail: {
    fontSize: '13px',
    color: colors.textLight,
    lineHeight: '1.5',
  },
  learningAssetCard: {
    backgroundColor: colors.white,
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '12px',
    borderLeft: `4px solid ${colors.green}`,
  },
  learningAssetName: {
    fontSize: '14px',
    fontWeight: '600',
    color: colors.text,
  },
  learningAssetStatus: {
    fontSize: '12px',
    color: colors.grayDark,
    marginBottom: '8px',
  },
  learningAssetOpp: {
    fontSize: '13px',
    color: colors.green,
    fontStyle: 'italic',
  },
  learningFeedback: {
    backgroundColor: colors.green,
    borderRadius: '12px',
    padding: '24px',
    marginTop: '32px',
  },
  learningFeedbackText: {
    fontSize: '16px',
    color: colors.white,
    lineHeight: '1.6',
    textAlign: 'center',
  },
  // Remodel Governance styles
  remodelReality: {
    backgroundColor: colors.red,
    borderRadius: '12px',
    padding: '24px',
    marginBottom: '32px',
    color: colors.white,
  },
  remodelRealityCost: {
    fontSize: '32px',
    fontWeight: '700',
    marginBottom: '12px',
  },
  remodelRealityProblem: {
    fontSize: '16px',
    marginBottom: '12px',
    lineHeight: '1.5',
  },
  remodelRealityTension: {
    fontSize: '14px',
    opacity: 0.9,
    fontStyle: 'italic',
  },
  remodelTierGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '20px',
    marginBottom: '32px',
  },
  remodelTierCard: (tier) => ({
    backgroundColor: tier === 'Essential' ? colors.gray : tier === 'Standard' ? `${colors.yellow}20` : `${colors.green}15`,
    borderRadius: '12px',
    padding: '24px',
    border: `2px solid ${tier === 'Essential' ? colors.grayMedium : tier === 'Standard' ? colors.yellow : colors.green}`,
  }),
  remodelTierName: {
    fontSize: '18px',
    fontWeight: '600',
    color: colors.text,
    marginBottom: '4px',
  },
  remodelTierCost: {
    fontSize: '24px',
    fontWeight: '700',
    color: colors.green,
    marginBottom: '8px',
  },
  remodelTierFocus: {
    fontSize: '14px',
    color: colors.textLight,
    marginBottom: '16px',
  },
  remodelTierElement: {
    fontSize: '13px',
    color: colors.text,
    padding: '6px 0',
    borderBottom: `1px solid ${colors.grayMedium}`,
  },
  remodelTierROI: {
    marginTop: '16px',
    fontSize: '13px',
    fontWeight: '600',
    color: colors.green,
  },
  remodelProcessStep: {
    display: 'grid',
    gridTemplateColumns: '120px 1fr',
    gap: '16px',
    padding: '16px 0',
    borderBottom: `1px solid ${colors.grayMedium}`,
  },
  remodelProcessStage: {
    fontSize: '14px',
    fontWeight: '600',
    color: colors.green,
  },
  remodelProcessReq: {
    fontSize: '14px',
    color: colors.textLight,
    lineHeight: '1.5',
  },
  remodelCoInvest: {
    backgroundColor: colors.gray,
    borderRadius: '12px',
    padding: '24px',
    marginBottom: '24px',
  },
  remodelCoInvestTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: colors.text,
    marginBottom: '16px',
  },
  remodelCoInvestGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px',
  },
  remodelCoInvestCard: {
    backgroundColor: colors.white,
    borderRadius: '8px',
    padding: '16px',
    textAlign: 'center',
  },
  remodelCoInvestTier: {
    fontSize: '14px',
    fontWeight: '600',
    color: colors.text,
    marginBottom: '4px',
  },
  remodelCoInvestCoverage: {
    fontSize: '20px',
    fontWeight: '700',
    color: colors.green,
    marginBottom: '4px',
  },
  remodelCoInvestRationale: {
    fontSize: '12px',
    color: colors.textLight,
  },
  remodelKillCriteria: {
    backgroundColor: `${colors.red}15`,
    borderRadius: '12px',
    padding: '24px',
    border: `2px solid ${colors.red}`,
  },
  remodelKillTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: colors.red,
    marginBottom: '16px',
  },
  remodelKillItem: {
    fontSize: '14px',
    color: colors.text,
    padding: '8px 0',
    paddingLeft: '24px',
    position: 'relative',
    borderBottom: `1px solid ${colors.grayMedium}`,
  },
  // New Development styles
  newDevPhilosophy: {
    backgroundColor: colors.green,
    borderRadius: '12px',
    padding: '24px',
    marginBottom: '24px',
    color: colors.white,
    textAlign: 'center',
  },
  newDevPhilosophyText: {
    fontSize: '18px',
    fontWeight: '500',
    lineHeight: '1.6',
  },
  newDevProblem: {
    backgroundColor: `${colors.red}15`,
    borderRadius: '12px',
    padding: '20px',
    marginBottom: '32px',
    border: `2px solid ${colors.red}`,
  },
  newDevProblemTitle: {
    fontSize: '14px',
    fontWeight: '600',
    color: colors.red,
    marginBottom: '8px',
  },
  newDevProblemText: {
    fontSize: '14px',
    color: colors.text,
    lineHeight: '1.5',
  },
  newDevCriteriaRow: {
    display: 'grid',
    gridTemplateColumns: '180px 1fr 100px',
    gap: '16px',
    padding: '16px 0',
    borderBottom: `1px solid ${colors.grayMedium}`,
    alignItems: 'center',
  },
  newDevCriteriaName: {
    fontSize: '14px',
    fontWeight: '600',
    color: colors.text,
  },
  newDevCriteriaReq: {
    fontSize: '13px',
    color: colors.textLight,
  },
  newDevCriteriaGate: (gate) => ({
    fontSize: '12px',
    padding: '4px 12px',
    borderRadius: '12px',
    textAlign: 'center',
    backgroundColor: gate === 'Required' ? colors.green : colors.yellow,
    color: gate === 'Required' ? colors.white : colors.text,
    fontWeight: '600',
  }),
  newDevROFR: {
    backgroundColor: colors.gray,
    borderRadius: '12px',
    padding: '24px',
    marginBottom: '24px',
  },
  newDevROFRTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: colors.text,
    marginBottom: '8px',
  },
  newDevROFRDesc: {
    fontSize: '14px',
    color: colors.textLight,
    marginBottom: '16px',
  },
  newDevROFRStep: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '10px 0',
    borderBottom: `1px solid ${colors.grayMedium}`,
  },
  newDevROFRNum: {
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    backgroundColor: colors.green,
    color: colors.white,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    fontWeight: '600',
    flexShrink: 0,
  },
  newDevRestriction: {
    fontSize: '14px',
    color: colors.text,
    padding: '10px 0',
    paddingLeft: '24px',
    position: 'relative',
    borderBottom: `1px solid ${colors.grayMedium}`,
  },
  // Keystone Hub / Intelligence Layer styles
  keystoneHero: {
    background: `linear-gradient(135deg, ${colors.green} 0%, #1a5e3a 100%)`,
    borderRadius: '16px',
    padding: '32px',
    marginBottom: '32px',
    textAlign: 'center',
    color: colors.white,
  },
  keystoneHeroTitle: {
    fontSize: '28px',
    fontWeight: '700',
    marginBottom: '8px',
  },
  keystoneHeroTagline: {
    fontSize: '16px',
    opacity: 0.9,
  },
  keystoneVision: {
    backgroundColor: colors.gray,
    borderRadius: '12px',
    padding: '24px',
    marginBottom: '32px',
    borderLeft: `4px solid ${colors.green}`,
    fontStyle: 'italic',
    fontSize: '15px',
    color: colors.text,
    lineHeight: '1.6',
  },
  keystoneAgentSection: {
    marginBottom: '32px',
  },
  keystoneAgentType: {
    fontSize: '18px',
    fontWeight: '600',
    color: colors.text,
    marginBottom: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  keystoneAgentGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '16px',
  },
  keystoneAgentCard: (isProactive) => ({
    backgroundColor: isProactive ? '#e8f5e9' : '#e3f2fd',
    borderRadius: '12px',
    padding: '20px',
    borderLeft: `4px solid ${isProactive ? colors.green : '#2196f3'}`,
  }),
  keystoneAgentName: {
    fontSize: '16px',
    fontWeight: '600',
    color: colors.text,
    marginBottom: '6px',
  },
  keystoneAgentSchedule: {
    fontSize: '12px',
    color: colors.grayDark,
    marginBottom: '10px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  keystoneAgentDesc: {
    fontSize: '14px',
    color: colors.textLight,
    lineHeight: '1.5',
  },
  keystoneDataSourcesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '12px',
    marginBottom: '32px',
  },
  keystoneDataSource: {
    backgroundColor: colors.gray,
    borderRadius: '10px',
    padding: '16px',
    textAlign: 'center',
  },
  keystoneDataSourceName: {
    fontSize: '14px',
    fontWeight: '600',
    color: colors.text,
    marginBottom: '4px',
  },
  keystoneDataSourceDetail: {
    fontSize: '12px',
    color: colors.textLight,
  },
  keystoneSharingBox: {
    backgroundColor: '#fff3e0',
    borderRadius: '16px',
    padding: '28px',
    marginBottom: '32px',
    border: `2px solid ${colors.yellow}`,
  },
  keystoneSharingTitle: {
    fontSize: '20px',
    fontWeight: '700',
    color: colors.text,
    marginBottom: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  keystoneSharingPrinciple: {
    fontSize: '15px',
    color: colors.textLight,
    marginBottom: '20px',
    lineHeight: '1.6',
  },
  keystoneSharingBenefits: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '16px',
    marginBottom: '20px',
  },
  keystoneSharingBenefit: {
    backgroundColor: colors.white,
    borderRadius: '10px',
    padding: '16px',
  },
  keystoneSharingBenefitTitle: {
    fontSize: '15px',
    fontWeight: '600',
    color: colors.text,
    marginBottom: '6px',
  },
  keystoneSharingBenefitDetail: {
    fontSize: '13px',
    color: colors.textLight,
    lineHeight: '1.5',
  },
  keystoneSharingPrivacy: {
    backgroundColor: colors.white,
    borderRadius: '8px',
    padding: '12px 16px',
    fontSize: '13px',
    color: colors.grayDark,
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  keystoneDashboardFeatures: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: '16px',
    marginBottom: '32px',
  },
  keystoneDashboardFeature: {
    backgroundColor: colors.gray,
    borderRadius: '12px',
    padding: '20px',
    textAlign: 'center',
  },
  keystoneDashboardFeatureIcon: {
    fontSize: '32px',
    marginBottom: '10px',
  },
  keystoneDashboardFeatureTitle: {
    fontSize: '14px',
    fontWeight: '600',
    color: colors.text,
    marginBottom: '6px',
  },
  keystoneDashboardFeatureDesc: {
    fontSize: '12px',
    color: colors.textLight,
    lineHeight: '1.4',
  },
  keystoneExampleInsight: {
    backgroundColor: colors.white,
    borderRadius: '16px',
    border: `2px solid ${colors.grayMedium}`,
    overflow: 'hidden',
  },
  keystoneInsightHeader: {
    backgroundColor: colors.green,
    color: colors.white,
    padding: '16px 24px',
  },
  keystoneInsightTitle: {
    fontSize: '18px',
    fontWeight: '600',
    marginBottom: '4px',
  },
  keystoneInsightPeriod: {
    fontSize: '13px',
    opacity: 0.9,
  },
  keystoneInsightBody: {
    padding: '24px',
  },
  keystoneInsightSummary: {
    fontSize: '20px',
    fontWeight: '700',
    color: colors.green,
    marginBottom: '20px',
    textAlign: 'center',
  },
  keystoneInsightSection: {
    marginBottom: '20px',
  },
  keystoneInsightSectionTitle: {
    fontSize: '14px',
    fontWeight: '600',
    color: colors.text,
    marginBottom: '10px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  keystoneInsightItem: {
    fontSize: '13px',
    color: colors.textLight,
    padding: '8px 0',
    paddingLeft: '20px',
    borderLeft: `3px solid ${colors.grayMedium}`,
    marginBottom: '8px',
    lineHeight: '1.5',
  },
  keystoneInsightHighlight: {
    backgroundColor: '#e8f5e9',
    borderRadius: '8px',
    padding: '12px 16px',
    fontSize: '14px',
    color: colors.green,
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  // Comeback Tracker styles
  comebackContainer: {
    backgroundColor: colors.cardBg,
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
    marginBottom: '40px',
  },
  comebackHeader: {
    background: `linear-gradient(135deg, ${colors.green} 0%, ${colors.greenDark} 100%)`,
    padding: '32px 40px',
    color: colors.white,
    textAlign: 'center',
  },
  comebackHeadline: {
    fontSize: '28px',
    fontWeight: '700',
    marginBottom: '8px',
    color: colors.white,
  },
  comebackTagline: {
    fontSize: '16px',
    color: colors.yellow,
    fontWeight: '500',
  },
  comebackBody: {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
    gap: '32px',
    padding: '32px 40px',
  },
  successRateCircle: {
    width: '200px',
    height: '200px',
    borderRadius: '50%',
    background: `conic-gradient(${colors.green} 0% 74%, ${colors.grayMedium} 74% 100%)`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto',
    boxShadow: '0 4px 20px rgba(2, 137, 64, 0.3)',
  },
  successRateInner: {
    width: '160px',
    height: '160px',
    borderRadius: '50%',
    backgroundColor: colors.white,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  successRateValue: {
    fontSize: '48px',
    fontWeight: '700',
    color: colors.green,
    lineHeight: 1,
  },
  successRateLabel: {
    fontSize: '14px',
    color: colors.textLight,
    marginTop: '4px',
  },
  comebackStats: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  comebackDescription: {
    fontSize: '16px',
    color: colors.textLight,
    lineHeight: 1.6,
    marginBottom: '16px',
  },
  comebackQuote: {
    backgroundColor: colors.yellow,
    padding: '16px 20px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    color: colors.text,
    fontStyle: 'italic',
  },
  topStoresList: {
    marginTop: '16px',
  },
  topStoreItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 0',
    borderBottom: `1px solid ${colors.grayMedium}`,
  },
  topStoreName: {
    fontSize: '14px',
    fontWeight: '500',
    color: colors.text,
  },
  topStoreBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  topStoreRate: {
    fontSize: '18px',
    fontWeight: '700',
    color: colors.green,
  },
  topStoreBadgeLabel: {
    fontSize: '11px',
    backgroundColor: colors.green,
    color: colors.white,
    padding: '4px 8px',
    borderRadius: '4px',
    fontWeight: '600',
  },
  // Success Rate Formula styles
  formulaContainer: {
    backgroundColor: colors.cardBg,
    borderRadius: '16px',
    padding: '32px',
    marginBottom: '40px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
  },
  formulaTitle: {
    fontSize: '20px',
    fontWeight: '600',
    color: colors.text,
    marginBottom: '8px',
  },
  formulaDescription: {
    fontSize: '14px',
    color: colors.textLight,
    marginBottom: '24px',
  },
  formulaGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gap: '16px',
    marginBottom: '24px',
  },
  formulaComponent: (color) => ({
    backgroundColor: `${color}15`,
    borderRadius: '12px',
    padding: '20px',
    textAlign: 'center',
    borderTop: `4px solid ${color}`,
  }),
  formulaComponentIcon: {
    fontSize: '28px',
    marginBottom: '8px',
  },
  formulaComponentName: {
    fontSize: '13px',
    fontWeight: '600',
    color: colors.text,
    marginBottom: '4px',
  },
  formulaComponentWeight: {
    fontSize: '11px',
    color: colors.textLight,
    marginBottom: '12px',
  },
  formulaComponentScore: {
    fontSize: '28px',
    fontWeight: '700',
  },
  formulaComponentBar: (score, color) => ({
    height: '6px',
    backgroundColor: colors.grayMedium,
    borderRadius: '3px',
    marginTop: '12px',
    overflow: 'hidden',
    position: 'relative',
  }),
  formulaComponentBarFill: (score, color) => ({
    position: 'absolute',
    left: 0,
    top: 0,
    height: '100%',
    width: `${score}%`,
    backgroundColor: color,
    borderRadius: '3px',
  }),
  formulaEquation: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '16px',
    padding: '20px',
    backgroundColor: colors.gray,
    borderRadius: '12px',
    marginBottom: '16px',
  },
  formulaNote: {
    fontSize: '14px',
    color: colors.textLight,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  // Customer Experience styles
  customerExpContainer: {
    backgroundColor: colors.cardBg,
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
    marginBottom: '40px',
  },
  customerExpHeader: {
    background: `linear-gradient(135deg, ${colors.waterBlue} 0%, ${colors.green} 100%)`,
    padding: '32px 40px',
    color: colors.white,
  },
  customerExpHeadline: {
    fontSize: '24px',
    fontWeight: '700',
    marginBottom: '8px',
    color: colors.white,
  },
  customerExpTagline: {
    fontSize: '15px',
    color: colors.yellow,
    fontWeight: '500',
  },
  customerExpBody: {
    padding: '32px 40px',
  },
  modelComparison: {
    display: 'grid',
    gridTemplateColumns: '1fr auto 1fr',
    gap: '24px',
    alignItems: 'center',
    marginBottom: '32px',
  },
  modelBox: (isNew) => ({
    backgroundColor: isNew ? `${colors.green}10` : `${colors.grayMedium}`,
    borderRadius: '12px',
    padding: '24px',
    border: `2px solid ${isNew ? colors.green : colors.grayDark}`,
  }),
  modelTitle: (isNew) => ({
    fontSize: '16px',
    fontWeight: '700',
    color: isNew ? colors.green : colors.grayDark,
    marginBottom: '8px',
  }),
  modelFlow: {
    fontSize: '13px',
    color: colors.textLight,
    marginBottom: '8px',
    fontFamily: 'monospace',
  },
  modelDescription: {
    fontSize: '14px',
    color: colors.text,
  },
  modelArrow: {
    fontSize: '32px',
    color: colors.green,
    fontWeight: '700',
  },
  featureGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '20px',
    marginTop: '24px',
  },
  featureCard: {
    backgroundColor: colors.gray,
    borderRadius: '12px',
    padding: '24px',
    textAlign: 'center',
  },
  featureIcon: {
    fontSize: '40px',
    marginBottom: '12px',
  },
  featureName: {
    fontSize: '16px',
    fontWeight: '600',
    color: colors.text,
    marginBottom: '8px',
  },
  featureDescription: {
    fontSize: '13px',
    color: colors.textLight,
    marginBottom: '12px',
  },
  featureBenefit: {
    fontSize: '12px',
    color: colors.green,
    fontWeight: '500',
    backgroundColor: `${colors.green}15`,
    padding: '6px 10px',
    borderRadius: '4px',
    display: 'inline-block',
  },
  featureExample: {
    fontSize: '11px',
    color: colors.grayDark,
    marginTop: '12px',
    fontStyle: 'italic',
  },
  featureStats: {
    display: 'flex',
    justifyContent: 'center',
    gap: '16px',
    marginTop: '12px',
    fontSize: '12px',
    color: colors.textLight,
  },
  loyaltyQuote: {
    marginTop: '32px',
    textAlign: 'center',
    padding: '24px',
    backgroundColor: colors.yellow,
    borderRadius: '12px',
    fontSize: '18px',
    fontWeight: '600',
    color: colors.text,
    fontStyle: 'italic',
  },
  // Transparency Narrative styles
  transparencyContainer: {
    backgroundColor: colors.cardBg,
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
    marginBottom: '40px',
  },
  transparencyHeader: {
    backgroundColor: colors.greenDark,
    padding: '24px 40px',
    color: colors.white,
  },
  transparencyTitle: {
    fontSize: '22px',
    fontWeight: '700',
    color: colors.white,
  },
  transparencyBody: {
    padding: '32px 40px',
  },
  transparencySections: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '32px',
    marginBottom: '24px',
  },
  transparencySection: {
    backgroundColor: colors.gray,
    borderRadius: '12px',
    padding: '24px',
  },
  transparencySectionTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: colors.text,
    marginBottom: '16px',
  },
  transparencyPoint: {
    fontSize: '14px',
    color: colors.textLight,
    padding: '8px 0',
    paddingLeft: '24px',
    position: 'relative',
    borderBottom: `1px solid ${colors.grayMedium}`,
  },
  transparencyRiskRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '10px 0',
    borderBottom: `1px solid ${colors.grayMedium}`,
  },
  transparencyRisk: {
    fontSize: '13px',
    color: colors.red,
    fontWeight: '500',
    minWidth: '140px',
  },
  transparencySolution: {
    fontSize: '13px',
    color: colors.green,
    fontWeight: '500',
  },
  transparencyCallout: {
    backgroundColor: colors.green,
    color: colors.white,
    padding: '20px 24px',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: '16px',
  },
  transparencyAdvantage: {
    fontSize: '14px',
    color: colors.textLight,
    lineHeight: 1.6,
    textAlign: 'center',
  },
}

// ============================================
// COMPONENTS
// ============================================

function KPICard({ data }) {
  return (
    <div style={styles.kpiCard}>
      <div style={styles.kpiIcon}>{data.icon}</div>
      <div style={styles.kpiValue}>{data.value}</div>
      <div style={styles.kpiLabel}>{data.label}</div>
      <div style={styles.kpiSubtitle}>{data.subtitle}</div>
      {data.change && <div style={styles.kpiChange(data.trend)}>{data.change}</div>}
    </div>
  )
}

function PhaseCard({ phase }) {
  // Handle both numbers and string ranges for store counts
  const formatStoreCount = (count) => {
    if (typeof count === 'number') return count.toLocaleString()
    return count // Already a formatted string range
  }

  return (
    <div style={styles.phaseCard(phase.status)}>
      <div style={styles.phaseBadge(phase.status)}>
        {phase.status === 'active' ? '● Active' : phase.status === 'upcoming' ? '○ Next' : '○ Future'}
      </div>
      <div style={styles.phaseYears}>Years {phase.years}</div>
      <div style={styles.phaseName}>Phase {phase.id}: {phase.name}</div>
      <div style={styles.phaseStores}>
        {formatStoreCount(phase.storeStart)} → {formatStoreCount(phase.storeEnd)}
      </div>
      <div style={styles.phaseFocus}>{phase.focus}</div>
      <div>
        {phase.milestones.map((m, i) => (
          <div key={i} style={styles.phaseMilestone}>✓ {m}</div>
        ))}
      </div>
    </div>
  )
}

function TierSection() {
  return (
    <div style={styles.tierContainer}>
      <h3 style={{ ...styles.sectionTitle, color: colors.text, marginTop: 0 }}>Portfolio Tiering</h3>
      {tierData.map((tier) => (
        <div key={tier.tier} style={styles.tierRow}>
          <div style={styles.tierBadge(tier.color)}>{tier.tier}</div>
          <div style={styles.tierInfo}>
            <div style={styles.tierName}>{tier.name}</div>
            <div style={styles.tierDesc}>{tier.description}</div>
          </div>
          <div style={styles.tierPercent}>{tier.percent}%</div>
        </div>
      ))}
    </div>
  )
}

function PartnershipsSection() {
  return (
    <div style={styles.partnershipContainer}>
      <h3 style={{ ...styles.sectionTitle, color: colors.text, marginTop: 0 }}>Three Partnerships</h3>
      {partnershipData.map((p, i) => (
        <div key={i} style={styles.partnershipRow}>
          <div style={styles.partnershipTitle}>
            <span>{p.icon}</span>
            <span>{p.title}</span>
          </div>
          <div style={styles.partnershipChange}>
            <span style={styles.partnershipOld}>{p.old}</span>
            <span style={styles.partnershipArrow}>→</span>
            <span style={styles.partnershipNew}>{p.new}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

// Subway Comeback Tracker Component
function ComebackTracker() {
  return (
    <div style={styles.comebackContainer}>
      <div style={styles.comebackHeader}>
        <div style={styles.comebackHeadline}>{comebackTrackerData.headline}</div>
        <div style={styles.comebackTagline}>{comebackTrackerData.tagline}</div>
      </div>
      <div style={styles.comebackBody}>
        <div>
          <div style={styles.successRateCircle}>
            <div style={styles.successRateInner}>
              <div style={styles.successRateValue}>{comebackTrackerData.nationalSuccessRate}%</div>
              <div style={styles.successRateLabel}>National Success Rate</div>
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '16px' }}>
            <div style={{ fontSize: '13px', color: colors.textLight }}>
              {comebackTrackerData.improvingStores.toLocaleString()} stores improving
            </div>
            <div style={{ fontSize: '13px', color: colors.green, fontWeight: '500', marginTop: '4px' }}>
              {comebackTrackerData.customerReviews.toLocaleString()} customer reviews this week
            </div>
          </div>
        </div>
        <div style={styles.comebackStats}>
          <div style={styles.comebackDescription}>{comebackTrackerData.description}</div>
          <div style={styles.comebackQuote}>{comebackTrackerData.revolutionaryIdea}</div>
          <div style={styles.topStoresList}>
            <div style={{ fontSize: '14px', fontWeight: '600', color: colors.text, marginBottom: '12px' }}>
              Top Performing Stores
            </div>
            {comebackTrackerData.topStores.map((store, i) => (
              <div key={i} style={styles.topStoreItem}>
                <div style={styles.topStoreName}>
                  <span style={{ color: colors.grayDark, marginRight: '8px' }}>#{store.rank}</span>
                  {store.name}
                </div>
                <div style={styles.topStoreBadge}>
                  <span style={styles.topStoreRate}>{store.rate}%</span>
                  <span style={styles.topStoreBadgeLabel}>{store.badge}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Success Rate Formula Component
function SuccessRateFormula() {
  return (
    <div style={styles.formulaContainer}>
      <div style={styles.formulaTitle}>{successRateFormulaData.title}</div>
      <div style={styles.formulaDescription}>{successRateFormulaData.description}</div>
      <div style={styles.formulaGrid}>
        {successRateFormulaData.components.map((comp, i) => (
          <div key={i} style={styles.formulaComponent(comp.color)}>
            <div style={styles.formulaComponentIcon}>{comp.icon}</div>
            <div style={styles.formulaComponentName}>{comp.name}</div>
            <div style={styles.formulaComponentWeight}>{comp.weight}% weight</div>
            <div style={{ ...styles.formulaComponentScore, color: comp.color }}>{comp.score}%</div>
            <div style={styles.formulaComponentBar(comp.score, comp.color)}>
              <div style={styles.formulaComponentBarFill(comp.score, comp.color)} />
            </div>
            <div style={{ fontSize: '10px', color: colors.grayDark, marginTop: '8px' }}>{comp.description}</div>
          </div>
        ))}
      </div>
      <div style={styles.formulaEquation}>
        {successRateFormulaData.components.map((comp, i) => (
          <span key={i}>
            <span style={{ fontWeight: '600', color: comp.color }}>{comp.score}%</span>
            <span style={{ fontSize: '12px', color: colors.grayDark }}> x {comp.weight}%</span>
            {i < successRateFormulaData.components.length - 1 && (
              <span style={{ margin: '0 8px', color: colors.grayDark }}>+</span>
            )}
          </span>
        ))}
        <span style={{ margin: '0 12px', color: colors.text, fontWeight: '700' }}>=</span>
        <span style={{ fontSize: '24px', fontWeight: '700', color: colors.green }}>74%</span>
      </div>
      <div style={styles.formulaNote}>{successRateFormulaData.transparencyNote}</div>
    </div>
  )
}

// Customer Experience Section Component
function CustomerExperienceSection() {
  return (
    <div style={styles.customerExpContainer}>
      <div style={styles.customerExpHeader}>
        <div style={styles.customerExpHeadline}>{customerExperienceData.headline}</div>
        <div style={styles.customerExpTagline}>{customerExperienceData.tagline}</div>
      </div>
      <div style={styles.customerExpBody}>
        <div style={styles.modelComparison}>
          <div style={styles.modelBox(false)}>
            <div style={styles.modelTitle(false)}>{customerExperienceData.oldModel.title}</div>
            <div style={styles.modelFlow}>{customerExperienceData.oldModel.flow}</div>
            <div style={styles.modelDescription}>{customerExperienceData.oldModel.description}</div>
          </div>
          <div style={styles.modelArrow}>→</div>
          <div style={styles.modelBox(true)}>
            <div style={styles.modelTitle(true)}>{customerExperienceData.newModel.title}</div>
            <div style={styles.modelFlow}>{customerExperienceData.newModel.flow}</div>
            <div style={styles.modelDescription}>{customerExperienceData.newModel.description}</div>
          </div>
        </div>
        <div style={{ fontSize: '18px', fontWeight: '600', color: colors.text, marginBottom: '8px' }}>
          How Customers Help Rebuild
        </div>
        <div style={styles.featureGrid}>
          {customerExperienceData.features.map((feature) => (
            <div key={feature.id} style={styles.featureCard}>
              <div style={styles.featureIcon}>{feature.icon}</div>
              <div style={styles.featureName}>{feature.name}</div>
              <div style={styles.featureDescription}>{feature.description}</div>
              <div style={styles.featureBenefit}>{feature.benefit}</div>
              <div style={styles.featureExample}>{feature.example}</div>
            </div>
          ))}
        </div>
        <div style={styles.loyaltyQuote}>{customerExperienceData.quote}</div>
      </div>
    </div>
  )
}

// Transparency Narrative Component
function TransparencyNarrative() {
  return (
    <div style={styles.transparencyContainer}>
      <div style={styles.transparencyHeader}>
        <div style={styles.transparencyTitle}>{transparencyNarrativeData.title}</div>
      </div>
      <div style={styles.transparencyBody}>
        <div style={styles.transparencySections}>
          {transparencyNarrativeData.sections.map((section, i) => (
            <div key={i} style={styles.transparencySection}>
              <div style={styles.transparencySectionTitle}>{section.title}</div>
              {section.points ? (
                section.points.map((point, j) => (
                  <div key={j} style={styles.transparencyPoint}>
                    <span style={{ position: 'absolute', left: 0, color: colors.green }}>→</span>
                    {point}
                  </div>
                ))
              ) : (
                section.risks.map((item, j) => (
                  <div key={j} style={styles.transparencyRiskRow}>
                    <span style={styles.transparencyRisk}>{item.risk}</span>
                    <span style={{ color: colors.grayDark }}>→</span>
                    <span style={styles.transparencySolution}>{item.solution}</span>
                  </div>
                ))
              )}
            </div>
          ))}
        </div>
        <div style={styles.transparencyCallout}>{transparencyNarrativeData.callout}</div>
        <div style={styles.transparencyAdvantage}>{transparencyNarrativeData.subwayAdvantage}</div>
      </div>
    </div>
  )
}

function Dashboard() {
  return (
    <div>
      {/* The Subway Comeback Tracker - Prominent at top */}
      <ComebackTracker />

      {/* Success Rate Formula */}
      <SuccessRateFormula />

      <h2 style={styles.sectionTitle}>Key Metrics</h2>
      <div style={styles.dashboardGrid}>
        {kpiData.map((kpi, i) => (
          <KPICard key={i} data={kpi} />
        ))}
      </div>

      <h2 style={styles.sectionTitle}>10-Year Phases</h2>
      <div style={styles.phaseContainer}>
        {phaseData.phases.map((phase) => (
          <PhaseCard key={phase.id} phase={phase} />
        ))}
      </div>

      {/* Franchisee-First Philosophy */}
      <div style={{
        background: colors.cardBg,
        borderRadius: '16px',
        padding: '32px',
        marginBottom: '32px',
        border: `2px solid ${colors.green}`
      }}>
        <h3 style={{ color: colors.green, fontSize: '24px', marginBottom: '8px' }}>
          {phaseData.franchiseePhilosophy.headline}
        </h3>
        <p style={{ color: colors.text, fontSize: '16px', marginBottom: '24px', lineHeight: '1.6' }}>
          {phaseData.franchiseePhilosophy.principle}
        </p>

        <h4 style={{ color: colors.yellow, fontSize: '18px', marginBottom: '16px' }}>Transition Paths for Franchisees</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '24px' }}>
          {phaseData.franchiseePhilosophy.transitionPaths.map((path, idx) => (
            <div key={idx} style={{
              background: 'rgba(255,255,255,0.03)',
              borderRadius: '12px',
              padding: '20px',
              borderLeft: `4px solid ${idx === 0 ? colors.green : idx === 1 ? colors.yellow : idx === 2 ? '#FF9800' : colors.red}`
            }}>
              <div style={{ color: colors.text, fontWeight: '700', fontSize: '14px', marginBottom: '4px' }}>{path.scenario}</div>
              <div style={{ color: colors.green, fontSize: '12px', fontWeight: '600', marginBottom: '8px' }}>{path.approach}</div>
              <div style={{ color: colors.textLight, fontSize: '13px', lineHeight: '1.5' }}>{path.detail}</div>
            </div>
          ))}
        </div>

        <div style={{
          background: 'rgba(2, 137, 64, 0.1)',
          padding: '16px 20px',
          borderRadius: '8px',
          borderLeft: `4px solid ${colors.green}`
        }}>
          <p style={{ color: colors.text, fontSize: '14px', margin: 0, lineHeight: '1.6', fontStyle: 'italic' }}>
            {phaseData.franchiseePhilosophy.benefitStatement}
          </p>
        </div>
      </div>

      <div style={styles.twoColumnGrid}>
        <TierSection />
        <PartnershipsSection />
      </div>

      {/* Customer Experience Section */}
      <h2 style={styles.sectionTitle}>Customer Experience: From Transactions to Partnership</h2>
      <CustomerExperienceSection />

      {/* Transparency Narrative */}
      <h2 style={styles.sectionTitle}>Why Transparency Works</h2>
      <TransparencyNarrative />
    </div>
  )
}

function SlideContent({ slide }) {
  switch (slide.type) {
    case 'title':
      return (
        <div style={{ textAlign: 'center', paddingTop: '60px' }}>
          <div style={{ ...styles.slideTitle, fontSize: '48px' }}>{slide.title}</div>
          <div style={{ ...styles.slideSubtitle, fontSize: '24px' }}>{slide.subtitle}</div>
          <div style={{ ...styles.slideContent, maxWidth: '600px', margin: '0 auto' }}>{slide.content}</div>
        </div>
      )

    case 'concept':
      return (
        <div>
          <div style={styles.slideTitle}>{slide.title}</div>
          <div style={styles.slideSubtitle}>{slide.subtitle}</div>
          <div style={styles.slideContent}>{slide.content}</div>
          {slide.highlight && <div style={styles.slideHighlight}>{slide.highlight}</div>}
        </div>
      )

    case 'bullets':
      return (
        <div>
          <div style={styles.slideTitle}>{slide.title}</div>
          <div style={styles.slideSubtitle}>{slide.subtitle}</div>
          <ul style={styles.slideBullets}>
            {slide.bullets.map((bullet, i) => (
              <li key={i} style={styles.slideBullet}>
                <span style={{ position: 'absolute', left: 0, color: colors.green }}>→</span>
                {bullet}
              </li>
            ))}
          </ul>
        </div>
      )

    case 'comparison':
      return (
        <div>
          <div style={styles.slideTitle}>{slide.title}</div>
          <div style={styles.slideSubtitle}>{slide.subtitle}</div>
          <div style={styles.comparisonGrid}>
            <div style={styles.comparisonBox(false)}>
              <div style={styles.comparisonTitle(false)}>{slide.comparison.old.title}</div>
              {slide.comparison.old.items.map((item, i) => (
                <div key={i} style={styles.comparisonItem}>{item}</div>
              ))}
            </div>
            <div style={styles.comparisonArrow}>→</div>
            <div style={styles.comparisonBox(true)}>
              <div style={styles.comparisonTitle(true)}>{slide.comparison.new.title}</div>
              {slide.comparison.new.items.map((item, i) => (
                <div key={i} style={styles.comparisonItem}>{item}</div>
              ))}
            </div>
          </div>
        </div>
      )

    case 'twoColumn':
      return (
        <div>
          <div style={styles.slideTitle}>{slide.title}</div>
          <div style={styles.slideSubtitle}>{slide.subtitle}</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
            <div style={styles.comparisonBox(false)}>
              <div style={styles.comparisonTitle(false)}>{slide.twoColumn.left.title}</div>
              {slide.twoColumn.left.items.map((item, i) => (
                <div key={i} style={styles.comparisonItem}>• {item}</div>
              ))}
            </div>
            <div style={styles.comparisonBox(true)}>
              <div style={styles.comparisonTitle(true)}>{slide.twoColumn.right.title}</div>
              {slide.twoColumn.right.items.map((item, i) => (
                <div key={i} style={styles.comparisonItem}>• {item}</div>
              ))}
            </div>
          </div>
        </div>
      )

    case 'stats':
      return (
        <div>
          <div style={styles.slideTitle}>{slide.title}</div>
          <div style={styles.slideSubtitle}>{slide.subtitle}</div>
          <div style={styles.statsGrid}>
            {slide.stats.map((stat, i) => (
              <div key={i} style={styles.statCard}>
                <div style={styles.statLabel}>{stat.label}</div>
                <div style={styles.statValue}>{stat.value}</div>
                <div style={styles.statDetail}>{stat.detail}</div>
              </div>
            ))}
          </div>
          {slide.highlight && <div style={styles.slideHighlight}>{slide.highlight}</div>}
        </div>
      )

    case 'timeline':
      return (
        <div>
          <div style={styles.slideTitle}>{slide.title}</div>
          <div style={styles.slideSubtitle}>{slide.subtitle}</div>
          <div style={styles.timelineContainer}>
            {slide.phases.map((phase) => (
              <div key={phase.id} style={styles.timelinePhase(phase.status)}>
                <div style={{ fontSize: '14px', color: colors.grayDark }}>Years {phase.years}</div>
                <div style={{ fontSize: '18px', fontWeight: '600', color: colors.text, margin: '8px 0' }}>
                  Phase {phase.id}: {phase.name}
                </div>
                <div style={{ fontSize: '24px', fontWeight: '700', color: colors.green }}>
                  {phase.storeEnd.toLocaleString()} stores
                </div>
              </div>
            ))}
          </div>
        </div>
      )

    case 'ecosystem':
      return (
        <div>
          <div style={styles.slideTitle}>{slide.title}</div>
          <div style={styles.slideSubtitle}>{slide.subtitle}</div>
          <div style={styles.ecosystemGrid}>
            {slide.ecosystem.map((item, i) => (
              <div key={i} style={styles.ecosystemCard}>
                <div style={styles.ecosystemName}>{item.name}</div>
                <div style={styles.ecosystemRole}>{item.role}</div>
                <div style={styles.ecosystemStatus(item.status)}>{item.status}</div>
              </div>
            ))}
          </div>
        </div>
      )

    default:
      return <div>{slide.content}</div>
  }
}

function Presentation() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const slide = presentationSlides[currentSlide]

  return (
    <div>
      <div style={styles.slideContainer}>
        <div style={styles.slideNav}>
          <button
            style={{
              ...styles.slideNavButton,
              ...(currentSlide === 0 ? styles.slideNavButtonDisabled : {}),
            }}
            onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
            disabled={currentSlide === 0}
          >
            ← Previous
          </button>
          <div style={styles.slideCounter}>
            {currentSlide + 1} / {presentationSlides.length}
          </div>
          <button
            style={{
              ...styles.slideNavButton,
              ...(currentSlide === presentationSlides.length - 1 ? styles.slideNavButtonDisabled : {}),
            }}
            onClick={() => setCurrentSlide(Math.min(presentationSlides.length - 1, currentSlide + 1))}
            disabled={currentSlide === presentationSlides.length - 1}
          >
            Next →
          </button>
        </div>
        <SlideContent slide={slide} />
      </div>

      {/* Slide thumbnails */}
      <div style={{ display: 'flex', gap: '8px', marginTop: '24px', flexWrap: 'wrap' }}>
        {presentationSlides.map((s, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              backgroundColor: i === currentSlide ? colors.green : colors.grayMedium,
              color: i === currentSlide ? colors.white : colors.text,
              fontWeight: '600',
            }}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  )
}

// ============================================
// DEEP DIVE COMPONENT
// ============================================
function DeepDive() {
  const [expandedSections, setExpandedSections] = useState({
    operationsOS: true,
    learningDev: false,
    operatingSystems: false,
    portfolioManagement: false,
    remodelGovernance: false,
    newDevelopment: false,
    kpiCatalog: false,
    implementationRoadmap: false,
    keystoneHub: false,
    corporateSpine: false,
    franchiseeCommunity: false,
  })

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  return (
    <div style={styles.deepDiveContainer}>
      {/* Operations OS - The Connective Tissue */}
      <div style={styles.deepDiveSection}>
        <div
          style={styles.deepDiveSectionHeader(expandedSections.operationsOS)}
          onClick={() => toggleSection('operationsOS')}
        >
          <div style={styles.deepDiveSectionTitle(expandedSections.operationsOS)}>
            <span style={styles.deepDiveSectionIcon}>🔄</span>
            Operations OS: The Connective Tissue
          </div>
          <span style={styles.deepDiveExpand(expandedSections.operationsOS)}>▼</span>
        </div>
        {expandedSections.operationsOS && (
          <div style={styles.deepDiveContent}>
            {/* Hero */}
            <div style={styles.opsOSHero}>
              <div style={styles.opsOSHeroTitle}>Operations OS</div>
              <div style={styles.opsOSHeroTagline}>{operationsOSData.tagline}</div>
            </div>

            <p style={styles.opsOSDesc}>{operationsOSData.description}</p>

            {/* Visual Diagram */}
            <h4 style={{ color: colors.text, marginBottom: '20px' }}>How It Connects the 4 OS</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
              {operationsOSData.orchestrates.map((item, i) => (
                <div key={i} style={styles.opsOSPillar}>
                  <div style={styles.opsOSPillarIcon}>
                    {item.os === 'Labor OS' ? '👥' : item.os === 'Real Estate OS' ? '🏢' : item.os === 'Tech OS' ? '💻' : '🥪'}
                  </div>
                  <div style={styles.opsOSPillarName}>{item.os}</div>
                  <div style={styles.opsOSPillarCoord}>{item.coordination}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <div style={{ fontSize: '32px', color: colors.green }}>↓ ↓ ↓ ↓</div>
              <div style={styles.opsOSCenter}>
                <div style={styles.opsOSCenterTitle}>Operations OS</div>
                <div style={styles.opsOSCenterSub}>Orchestrates all 4 at the store level, every day</div>
              </div>
            </div>

            {/* Daily Rhythm */}
            <h4 style={{ color: colors.text, marginBottom: '20px' }}>The Daily Rhythm</h4>
            <p style={{ color: colors.textLight, marginBottom: '20px', lineHeight: '1.6' }}>
              Every store has its own rhythm — shaped by location, community patterns, and team dynamics. Operations OS uses AI as a partner to help identify and adapt to your store's natural flow, coordinating the right activities at the right moments throughout each day. Instead of rigid schedules, intelligent systems learn what works best for your specific context and continuously optimize.
            </p>

            {/* Feedback Loops */}
            <h4 style={{ color: colors.text, marginTop: '32px', marginBottom: '20px' }}>Feedback Loops: "We All Need to Get Better"</h4>
            <p style={{ color: colors.textLight, marginBottom: '20px', lineHeight: '1.6' }}>
              When something goes wrong, Operations OS doesn't point fingers — it traces root cause across all systems to find the fix.
            </p>
            {operationsOSData.feedbackLoops.map((loop, i) => (
              <div key={i} style={styles.feedbackCard}>
                <div style={styles.feedbackSignal}>Signal: {loop.signal}</div>
                <div style={styles.feedbackDiagnosis}>{loop.diagnosis}</div>
              </div>
            ))}

            {/* Principles */}
            <h4 style={{ color: colors.text, marginTop: '32px', marginBottom: '20px' }}>Operating Principles</h4>
            <div style={styles.principleGrid}>
              {operationsOSData.principles.map((p, i) => (
                <div key={i} style={styles.principleCard}>
                  <div style={styles.principleName}>{p.principle}</div>
                  <div style={styles.principleDetail}>{p.detail}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Learning & Development Section */}
      <div style={styles.deepDiveSection}>
        <div
          style={styles.deepDiveSectionHeader(expandedSections.learningDev, colors.yellow)}
          onClick={() => toggleSection('learningDev')}
        >
          <div style={styles.deepDiveSectionTitle(expandedSections.learningDev)}>
            <span style={styles.deepDiveSectionIcon}>📚</span>
            Learning & Development
          </div>
          <span style={styles.deepDiveExpand(expandedSections.learningDev)}>▼</span>
        </div>
        {expandedSections.learningDev && (
          <div style={styles.deepDiveContent}>
            {/* The Challenge */}
            <div style={styles.learningChallenge}>
              <div style={styles.learningChallengeText}>
                "{learningDevData.challenge}"
              </div>
            </div>

            {/* Principles */}
            <h4 style={{ color: colors.text, marginBottom: '20px' }}>Guiding Principles</h4>
            <div style={styles.principleGrid}>
              {learningDevData.principles.map((p, i) => (
                <div key={i} style={styles.principleCard}>
                  <div style={styles.principleName}>{p.principle}</div>
                  <div style={styles.principleDetail}>{p.detail}</div>
                </div>
              ))}
            </div>

            {/* Two Sources */}
            <h4 style={{ color: colors.text, marginTop: '32px', marginBottom: '20px' }}>Two Sources of Learning</h4>
            <div style={styles.learningTwoCol}>
              {/* Industry Learning */}
              <div style={styles.learningColumn}>
                <div style={styles.learningColumnTitle}>
                  <span>🌐</span> Industry Learning
                </div>
                <div style={styles.learningColumnDesc}>{learningDevData.industryLearning.description}</div>
                {learningDevData.industryLearning.sources.map((s, i) => (
                  <div key={i} style={styles.learningSource}>
                    <div style={styles.learningSourceName}>{s.source}</div>
                    <div style={styles.learningSourceDetail}>{s.detail}</div>
                  </div>
                ))}
                <div style={{ marginTop: '16px', fontSize: '13px', color: colors.green, fontWeight: '500' }}>
                  Delivery: {learningDevData.industryLearning.delivery}
                </div>
              </div>

              {/* Peer Learning */}
              <div style={styles.learningColumn}>
                <div style={styles.learningColumnTitle}>
                  <span>🤝</span> Peer Learning
                </div>
                <div style={styles.learningColumnDesc}>{learningDevData.peerLearning.description}</div>
                {learningDevData.peerLearning.mechanisms.map((m, i) => (
                  <div key={i} style={styles.learningMechanism}>
                    <div style={styles.learningMechanismHeader}>
                      <span style={styles.learningMechanismName}>{m.mechanism}</span>
                      <span style={styles.learningFormalityBadge(m.formality)}>{m.formality}</span>
                    </div>
                    <div style={styles.learningMechanismDetail}>{m.detail}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Existing Assets */}
            <h4 style={{ color: colors.text, marginBottom: '20px' }}>Existing Assets to Build On</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
              {learningDevData.existingAssets.map((a, i) => (
                <div key={i} style={styles.learningAssetCard}>
                  <div style={styles.learningAssetName}>{a.asset}</div>
                  <div style={styles.learningAssetStatus}>{a.status}</div>
                  <div style={styles.learningAssetOpp}>{a.opportunity}</div>
                </div>
              ))}
            </div>

            {/* Feedback Loop */}
            <div style={styles.learningFeedback}>
              <div style={styles.learningFeedbackText}>
                {learningDevData.feedbackLoop}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Operating Systems Section */}
      <div style={styles.deepDiveSection}>
        <div
          style={styles.deepDiveSectionHeader(expandedSections.operatingSystems)}
          onClick={() => toggleSection('operatingSystems')}
        >
          <div style={styles.deepDiveSectionTitle(expandedSections.operatingSystems)}>
            <span style={styles.deepDiveSectionIcon}>⚙️</span>
            The 4 Operating Systems
          </div>
          <span style={styles.deepDiveExpand(expandedSections.operatingSystems)}>▼</span>
        </div>
        {expandedSections.operatingSystems && (
          <div style={styles.deepDiveContent}>
            <p style={{ color: colors.textLight, marginBottom: '24px', lineHeight: '1.6' }}>
              The transformation relies on four interlocking Operating Systems that standardize
              operations across all stores while enabling local excellence. <span style={{ fontStyle: 'italic', fontSize: '0.9em', opacity: 0.8 }}>*Some numbers used for data are estimates and do not reflect current information.</span>
            </p>
            <div style={styles.osGrid}>
              {operatingSystemsData.map((os) => (
                <div key={os.id} style={styles.osCard(colors.green)}>
                  <div style={styles.osCardHeader}>
                    <span style={styles.osCardIcon}>{os.icon}</span>
                    <span style={styles.osCardTitle}>{os.name}</span>
                  </div>
                  <div style={styles.osCardTagline}>{os.tagline}</div>
                  <div style={styles.osCardDesc}>{os.description}</div>

                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ fontSize: '13px', fontWeight: '600', color: colors.text, marginBottom: '8px' }}>
                      Key Components:
                    </div>
                    {os.components.map((comp, i) => (
                      <div key={i} style={styles.osComponent}>
                        <div style={styles.osComponentName}>{comp.name}</div>
                        <div style={styles.osComponentDetail}>{comp.detail}</div>
                      </div>
                    ))}
                  </div>

                  <div style={styles.osKpiGrid}>
                    {os.kpis.map((kpi, i) => (
                      <div key={i} style={styles.osKpiCard}>
                        <div style={styles.osKpiMetric}>{kpi.metric}</div>
                        <div style={styles.osKpiTarget}>{kpi.target}</div>
                        <div style={styles.osKpiCurrent}>Current: {kpi.current}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Portfolio Management Section */}
      <div style={styles.deepDiveSection}>
        <div
          style={styles.deepDiveSectionHeader(expandedSections.portfolioManagement, colors.yellow)}
          onClick={() => toggleSection('portfolioManagement')}
        >
          <div style={styles.deepDiveSectionTitle(expandedSections.portfolioManagement)}>
            <span style={styles.deepDiveSectionIcon}>📊</span>
            Portfolio Management & Tiering
          </div>
          <span style={styles.deepDiveExpand(expandedSections.portfolioManagement)}>▼</span>
        </div>
        {expandedSections.portfolioManagement && (
          <div style={styles.deepDiveContent}>
            {/* AUV Goal Hero */}
            <div style={{
              background: `linear-gradient(135deg, ${colors.green} 0%, ${colors.greenDark} 100%)`,
              borderRadius: '12px',
              padding: '32px',
              marginBottom: '32px',
              color: colors.white,
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: '24px',
              textAlign: 'center'
            }}>
              <div>
                <div style={{ fontSize: '14px', opacity: 0.9, marginBottom: '4px' }}>Current AUV</div>
                <div style={{ fontSize: '32px', fontWeight: '700' }}>{tieringDetailData.auvGoal.current}</div>
              </div>
              <div>
                <div style={{ fontSize: '14px', opacity: 0.9, marginBottom: '4px' }}>Target AUV by {tieringDetailData.auvGoal.deadline}</div>
                <div style={{ fontSize: '40px', fontWeight: '700', color: colors.yellow }}>{tieringDetailData.auvGoal.target}</div>
                <div style={{ fontSize: '16px', marginTop: '4px' }}>{tieringDetailData.auvGoal.growth} growth required</div>
              </div>
              <div>
                <div style={{ fontSize: '14px', opacity: 0.9, marginBottom: '4px' }}>How We Get There</div>
                <div style={{ fontSize: '14px', lineHeight: '1.5' }}>{tieringDetailData.auvGoal.rationale}</div>
              </div>
            </div>

            {/* The Math of Closures */}
            <div style={{
              backgroundColor: colors.gray,
              borderRadius: '12px',
              padding: '24px',
              marginBottom: '32px',
              borderLeft: `4px solid ${colors.green}`
            }}>
              <h4 style={{ color: colors.text, marginBottom: '12px', fontSize: '16px' }}>Why Closures Raise AUV</h4>
              <p style={{ color: colors.textLight, marginBottom: '12px', lineHeight: '1.6' }}>
                {tieringDetailData.auvMath.explanation}
              </p>
              <div style={{
                backgroundColor: colors.white,
                borderRadius: '8px',
                padding: '16px',
                fontFamily: 'monospace',
                fontSize: '14px',
                color: colors.text
              }}>
                {tieringDetailData.auvMath.example}
              </div>
            </div>

            {/* Inflation Adjustment */}
            <div style={{
              backgroundColor: `${colors.yellow}15`,
              borderRadius: '12px',
              padding: '24px',
              marginBottom: '32px',
              border: `2px solid ${colors.yellow}`
            }}>
              <h4 style={{ color: colors.text, marginBottom: '12px', fontSize: '16px' }}>Inflation-Adjusted Minimum Floor</h4>
              <p style={{ color: colors.textLight, marginBottom: '16px', lineHeight: '1.6' }}>
                {tieringDetailData.inflationAdjustment.principle}
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '16px' }}>
                {tieringDetailData.inflationAdjustment.schedule.map((item, i) => (
                  <div key={i} style={{
                    backgroundColor: colors.white,
                    borderRadius: '8px',
                    padding: '16px',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '14px', color: colors.grayDark, marginBottom: '4px' }}>{item.year}</div>
                    <div style={{ fontSize: '20px', fontWeight: '700', color: colors.green }}>{item.minimum}</div>
                    <div style={{ fontSize: '11px', color: colors.textLight }}>{item.note}</div>
                  </div>
                ))}
              </div>
              <div style={{ fontSize: '13px', color: colors.textLight, fontStyle: 'italic' }}>
                {tieringDetailData.inflationAdjustment.mechanism}
              </div>
            </div>

            <h4 style={{ color: colors.text, marginBottom: '16px' }}>Tiering Criteria</h4>
            <div style={styles.tableContainer}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.tableHeader}>Tier</th>
                    <th style={styles.tableHeader}>AUV</th>
                    <th style={styles.tableHeader}>Compliance</th>
                    <th style={styles.tableHeader}>Growth Path</th>
                    <th style={styles.tableHeader}>Support Level</th>
                  </tr>
                </thead>
                <tbody>
                  {tieringDetailData.criteria.map((row, i) => (
                    <tr key={i}>
                      <td style={{ ...styles.tableCellBold, color: row.tier === 1 ? colors.green : row.tier === 2 ? colors.orange : colors.red }}>
                        Tier {row.tier}
                      </td>
                      <td style={styles.tableCell}>{row.auv}</td>
                      <td style={styles.tableCell}>{row.compliance}</td>
                      <td style={styles.tableCell}>{row.growth}</td>
                      <td style={styles.tableCell}>{row.support}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h4 style={{ color: colors.text, marginTop: '32px', marginBottom: '16px' }}>Exit Strategies</h4>
            <div style={styles.tableContainer}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.tableHeader}>Strategy</th>
                    <th style={styles.tableHeader}>Description</th>
                    <th style={styles.tableHeader}>Timeline</th>
                  </tr>
                </thead>
                <tbody>
                  {tieringDetailData.exitStrategies.map((row, i) => (
                    <tr key={i}>
                      <td style={styles.tableCellBold}>{row.strategy}</td>
                      <td style={styles.tableCell}>{row.description}</td>
                      <td style={styles.tableCell}>{row.timeline}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h4 style={{ color: colors.text, marginTop: '32px', marginBottom: '16px' }}>Consolidation & Reinvestment Fund</h4>
            <div style={styles.fundCard}>
              <div style={styles.fundSize}>{tieringDetailData.consolidationFund.size}</div>
              <div style={{ fontSize: '14px', color: colors.grayDark, marginBottom: '8px' }}>Funding Sources:</div>
              <div style={styles.fundSources}>
                {tieringDetailData.consolidationFund.sources.map((source, i) => (
                  <span key={i} style={styles.fundSourceBadge}>{source}</span>
                ))}
              </div>
            </div>
            <div style={styles.tableContainer}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.tableHeader}>Use of Funds</th>
                    <th style={styles.tableHeader}>Per-Unit</th>
                    <th style={styles.tableHeader}>Total Allocation</th>
                  </tr>
                </thead>
                <tbody>
                  {tieringDetailData.consolidationFund.uses.map((row, i) => (
                    <tr key={i}>
                      <td style={styles.tableCellBold}>{row.use}</td>
                      <td style={styles.tableCell}>{row.amount}</td>
                      <td style={styles.tableCell}>{row.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Remodel Governance Section */}
      <div style={styles.deepDiveSection}>
        <div
          style={styles.deepDiveSectionHeader(expandedSections.remodelGovernance, colors.orange)}
          onClick={() => toggleSection('remodelGovernance')}
        >
          <div style={styles.deepDiveSectionTitle(expandedSections.remodelGovernance)}>
            <span style={styles.deepDiveSectionIcon}>🔧</span>
            Remodel Governance
          </div>
          <span style={styles.deepDiveExpand(expandedSections.remodelGovernance)}>▼</span>
        </div>
        {expandedSections.remodelGovernance && (
          <div style={styles.deepDiveContent}>
            {/* Current Reality */}
            <div style={styles.remodelReality}>
              <div style={styles.remodelRealityCost}>Typical Remodel: {remodelGovernanceData.currentReality.typicalCost}</div>
              <div style={styles.remodelRealityProblem}>{remodelGovernanceData.currentReality.problem}</div>
              <div style={styles.remodelRealityTension}>{remodelGovernanceData.currentReality.tension}</div>
            </div>

            {/* Principles */}
            <h4 style={{ color: colors.text, marginBottom: '20px' }}>Governing Principles</h4>
            <div style={styles.principleGrid}>
              {remodelGovernanceData.principles.map((p, i) => (
                <div key={i} style={styles.principleCard}>
                  <div style={styles.principleName}>{p.principle}</div>
                  <div style={styles.principleDetail}>{p.detail}</div>
                </div>
              ))}
            </div>

            {/* Package Tiers */}
            <h4 style={{ color: colors.text, marginTop: '32px', marginBottom: '20px' }}>Tiered Package Options</h4>
            <div style={styles.remodelTierGrid}>
              {remodelGovernanceData.packageTiers.map((pkg, i) => (
                <div key={i} style={styles.remodelTierCard(pkg.tier)}>
                  <div style={styles.remodelTierName}>{pkg.tier}</div>
                  <div style={styles.remodelTierCost}>{pkg.cost}</div>
                  <div style={styles.remodelTierFocus}>{pkg.focus}</div>
                  {pkg.elements.map((el, ei) => (
                    <div key={ei} style={styles.remodelTierElement}>• {el}</div>
                  ))}
                  <div style={styles.remodelTierROI}>Target: {pkg.roi}</div>
                </div>
              ))}
            </div>

            {/* Cost Transparency */}
            <div style={{ backgroundColor: colors.gray, borderRadius: '12px', padding: '20px', marginTop: '20px', marginBottom: '32px' }}>
              <p style={{ color: colors.text, fontWeight: '600', marginBottom: '8px' }}>{remodelGovernanceData.costTransparency.note}</p>
              <p style={{ color: colors.textLight, lineHeight: '1.6', margin: 0 }}>{remodelGovernanceData.costTransparency.quoteSharing}</p>
            </div>

            {/* Process */}
            <h4 style={{ color: colors.text, marginBottom: '20px' }}>Governance Process</h4>
            <div style={{ backgroundColor: colors.gray, borderRadius: '12px', padding: '24px', marginBottom: '32px' }}>
              {remodelGovernanceData.process.map((step, i) => (
                <div key={i} style={styles.remodelProcessStep}>
                  <div style={styles.remodelProcessStage}>{i + 1}. {step.stage}</div>
                  <div style={styles.remodelProcessReq}>{step.requirement}</div>
                </div>
              ))}
            </div>

            {/* Co-Investment */}
            <h4 style={{ color: colors.text, marginBottom: '20px' }}>Corporate Co-Investment</h4>
            <div style={styles.remodelCoInvest}>
              <div style={styles.remodelCoInvestTitle}>{remodelGovernanceData.coInvestment.fund}</div>
              <div style={styles.remodelCoInvestGrid}>
                {remodelGovernanceData.coInvestment.tiers.map((t, i) => (
                  <div key={i} style={styles.remodelCoInvestCard}>
                    <div style={styles.remodelCoInvestTier}>{t.storeTier}</div>
                    <div style={styles.remodelCoInvestCoverage}>{t.coverage}</div>
                    <div style={styles.remodelCoInvestRationale}>{t.rationale}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Kill Criteria */}
            <h4 style={{ color: colors.text, marginBottom: '20px' }}>Kill Criteria</h4>
            <div style={styles.remodelKillCriteria}>
              <div style={styles.remodelKillTitle}>Package gets revised or scrapped if:</div>
              {remodelGovernanceData.killCriteria.map((criteria, i) => (
                <div key={i} style={styles.remodelKillItem}>
                  <span style={{ position: 'absolute', left: 0, color: colors.red }}>✕</span>
                  {criteria}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* New Store Development Section */}
      <div style={styles.deepDiveSection}>
        <div
          style={styles.deepDiveSectionHeader(expandedSections.newDevelopment, colors.greenLight)}
          onClick={() => toggleSection('newDevelopment')}
        >
          <div style={styles.deepDiveSectionTitle(expandedSections.newDevelopment)}>
            <span style={styles.deepDiveSectionIcon}>🏗️</span>
            New Store Development
          </div>
          <span style={styles.deepDiveExpand(expandedSections.newDevelopment)}>▼</span>
        </div>
        {expandedSections.newDevelopment && (
          <div style={styles.deepDiveContent}>
            {/* Overdevelopment Lesson */}
            <div style={{
              background: `linear-gradient(135deg, ${colors.text} 0%, #333 100%)`,
              borderRadius: '12px',
              padding: '32px',
              marginBottom: '24px',
              color: colors.white,
            }}>
              <div style={{ fontSize: '24px', fontWeight: '700', marginBottom: '8px' }}>
                {newDevelopmentData.overdevelopmentLesson.headline}
              </div>
              <div style={{ fontSize: '20px', color: colors.yellow, marginBottom: '16px', fontFamily: 'monospace' }}>
                {newDevelopmentData.overdevelopmentLesson.stats}
              </div>
              <div style={{ fontSize: '16px', lineHeight: '1.6', marginBottom: '16px', opacity: 0.9 }}>
                {newDevelopmentData.overdevelopmentLesson.lesson}
              </div>
              <div style={{
                backgroundColor: colors.green,
                borderRadius: '8px',
                padding: '16px',
                fontSize: '15px',
                lineHeight: '1.5',
              }}>
                {newDevelopmentData.overdevelopmentLesson.newApproach}
              </div>
            </div>

            {/* Philosophy */}
            <div style={styles.newDevPhilosophy}>
              <div style={styles.newDevPhilosophyText}>{newDevelopmentData.philosophy}</div>
            </div>

            {/* The Problem */}
            <div style={styles.newDevProblem}>
              <div style={styles.newDevProblemTitle}>The Historical Problem</div>
              <div style={styles.newDevProblemText}>{newDevelopmentData.currentProblem}</div>
            </div>

            {/* Principles */}
            <h4 style={{ color: colors.text, marginBottom: '20px' }}>Development Principles</h4>
            <div style={styles.principleGrid}>
              {newDevelopmentData.principles.map((p, i) => (
                <div key={i} style={styles.principleCard}>
                  <div style={styles.principleName}>{p.principle}</div>
                  <div style={styles.principleDetail}>{p.detail}</div>
                </div>
              ))}
            </div>

            {/* Approval Criteria */}
            <h4 style={{ color: colors.text, marginTop: '32px', marginBottom: '20px' }}>Approval Criteria</h4>
            <div style={{ backgroundColor: colors.gray, borderRadius: '12px', padding: '24px', marginBottom: '32px' }}>
              <div style={{ ...styles.newDevCriteriaRow, borderBottom: `2px solid ${colors.grayMedium}`, fontWeight: '600' }}>
                <div style={{ color: colors.text }}>Criteria</div>
                <div style={{ color: colors.text }}>Requirement</div>
                <div style={{ color: colors.text, textAlign: 'center' }}>Gate</div>
              </div>
              {newDevelopmentData.approvalCriteria.map((item, i) => (
                <div key={i} style={styles.newDevCriteriaRow}>
                  <div style={styles.newDevCriteriaName}>{item.criteria}</div>
                  <div style={styles.newDevCriteriaReq}>{item.requirement}</div>
                  <div style={styles.newDevCriteriaGate(item.gate)}>{item.gate}</div>
                </div>
              ))}
            </div>

            {/* Right of First Refusal */}
            <h4 style={{ color: colors.text, marginBottom: '20px' }}>Right of First Refusal</h4>
            <div style={styles.newDevROFR}>
              <div style={styles.newDevROFRTitle}>Existing Franchisee Priority</div>
              <div style={styles.newDevROFRDesc}>{newDevelopmentData.rightOfFirstRefusal.description}</div>
              {newDevelopmentData.rightOfFirstRefusal.process.map((step, i) => (
                <div key={i} style={styles.newDevROFRStep}>
                  <div style={styles.newDevROFRNum}>{i + 1}</div>
                  <div style={{ fontSize: '14px', color: colors.textLight }}>{step}</div>
                </div>
              ))}
            </div>

            {/* Restrictions */}
            <h4 style={{ color: colors.text, marginBottom: '20px' }}>Hard Restrictions</h4>
            <div style={{
              backgroundColor: `${colors.red}15`,
              borderRadius: '12px',
              padding: '24px',
              border: `2px solid ${colors.red}`
            }}>
              {newDevelopmentData.restrictions.map((restriction, i) => (
                <div key={i} style={styles.newDevRestriction}>
                  <span style={{ position: 'absolute', left: 0, color: colors.red }}>⛔</span>
                  {restriction}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* KPI Catalog Section */}
      <div style={styles.deepDiveSection}>
        <div
          style={styles.deepDiveSectionHeader(expandedSections.kpiCatalog, colors.greenDark)}
          onClick={() => toggleSection('kpiCatalog')}
        >
          <div style={styles.deepDiveSectionTitle(expandedSections.kpiCatalog)}>
            <span style={styles.deepDiveSectionIcon}>📈</span>
            KPI Catalog
          </div>
          <span style={styles.deepDiveExpand(expandedSections.kpiCatalog)}>▼</span>
        </div>
        {expandedSections.kpiCatalog && (
          <div style={styles.deepDiveContent}>
            {kpiCatalogData.map((category, ci) => (
              <div key={ci} style={styles.kpiCategory}>
                <div style={styles.kpiCategoryTitle}>{category.category}</div>
                <div style={styles.tableContainer}>
                  <table style={styles.table}>
                    <thead>
                      <tr>
                        <th style={styles.tableHeader}>Metric</th>
                        <th style={styles.tableHeader}>Definition</th>
                        <th style={styles.tableHeader}>Formula</th>
                        <th style={styles.tableHeader}>Target</th>
                        <th style={styles.tableHeader}>Frequency</th>
                      </tr>
                    </thead>
                    <tbody>
                      {category.metrics.map((metric, mi) => (
                        <tr key={mi}>
                          <td style={styles.tableCellBold}>{metric.name}</td>
                          <td style={styles.tableCell}>{metric.definition}</td>
                          <td style={{ ...styles.tableCell, fontFamily: 'monospace', fontSize: '12px' }}>{metric.formula}</td>
                          <td style={{ ...styles.tableCell, color: colors.green, fontWeight: '600' }}>{metric.target}</td>
                          <td style={styles.tableCell}>{metric.frequency}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Implementation Roadmap Section */}
      <div style={styles.deepDiveSection}>
        <div
          style={styles.deepDiveSectionHeader(expandedSections.implementationRoadmap, colors.green)}
          onClick={() => toggleSection('implementationRoadmap')}
        >
          <div style={styles.deepDiveSectionTitle(expandedSections.implementationRoadmap)}>
            <span style={styles.deepDiveSectionIcon}>🗓️</span>
            Implementation Roadmap
          </div>
          <span style={styles.deepDiveExpand(expandedSections.implementationRoadmap)}>▼</span>
        </div>
        {expandedSections.implementationRoadmap && (
          <div style={styles.deepDiveContent}>
            {implementationRoadmapData.map((phase) => (
              <div key={phase.phase} style={styles.roadmapPhase}>
                <div style={styles.roadmapPhaseHeader(phase.phase)}>
                  <span style={styles.roadmapPhaseName}>Phase {phase.phase}: {phase.name}</span>
                  <span style={styles.roadmapPhaseYears}>Years {phase.years}</span>
                </div>
                <div style={styles.roadmapQuarters}>
                  {phase.quarters.map((quarter, qi) => (
                    <div key={qi} style={styles.roadmapQuarter}>
                      <div style={styles.roadmapQuarterLabel}>{quarter.q}</div>
                      <div style={styles.roadmapQuarterFocus}>{quarter.focus}</div>
                      <div style={styles.roadmapActions}>
                        {quarter.actions.map((action, ai) => (
                          <span key={ai} style={styles.roadmapAction}>{action}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Keystone Hub / Intelligence Layer Section */}
      <div style={styles.deepDiveSection}>
        <div
          style={styles.deepDiveSectionHeader(expandedSections.keystoneHub, colors.green)}
          onClick={() => toggleSection('keystoneHub')}
        >
          <div style={styles.deepDiveSectionTitle(expandedSections.keystoneHub)}>
            <span style={styles.deepDiveSectionIcon}>🧠</span>
            {keystoneHubData.brandName}: The Intelligence Layer
          </div>
          <span style={styles.deepDiveExpand(expandedSections.keystoneHub)}>▼</span>
        </div>
        {expandedSections.keystoneHub && (
          <div style={styles.deepDiveContent}>
            {/* Hero */}
            <div style={styles.keystoneHero}>
              <div style={styles.keystoneHeroTitle}>{keystoneHubData.brandName}</div>
              <div style={{ fontSize: '0.9em', color: 'rgba(255, 255, 255, 0.8)', marginBottom: '8px' }}>{keystoneHubData.poweredBy}</div>
              <div style={styles.keystoneHeroTagline}>{keystoneHubData.tagline}</div>
            </div>

            {/* Vision */}
            <div style={styles.keystoneVision}>
              "{keystoneHubData.vision}"
            </div>

            {/* Data Sources */}
            <h4 style={{ color: colors.text, marginBottom: '16px' }}>Data Sources</h4>
            <div style={styles.keystoneDataSourcesGrid}>
              {keystoneHubData.dataSources.map((ds, i) => (
                <div key={i} style={styles.keystoneDataSource}>
                  <div style={styles.keystoneDataSourceName}>{ds.source}</div>
                  <div style={styles.keystoneDataSourceDetail}>{ds.data}</div>
                </div>
              ))}
            </div>

            {/* Proactive Agents */}
            <div style={styles.keystoneAgentSection}>
              <div style={styles.keystoneAgentType}>
                <span>🤖</span> Proactive Agents
                <span style={{ fontSize: '12px', color: colors.textLight, fontWeight: 'normal' }}>(Work automatically on schedule)</span>
              </div>
              <div style={styles.keystoneAgentGrid}>
                {keystoneHubData.agents.proactive.map((agent, i) => (
                  <div key={i} style={styles.keystoneAgentCard(true)}>
                    <div style={styles.keystoneAgentName}>{agent.name}</div>
                    <div style={styles.keystoneAgentSchedule}>
                      <span>⏰</span> {agent.schedule}
                    </div>
                    <div style={styles.keystoneAgentDesc}>{agent.description}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reactive Agents */}
            <div style={styles.keystoneAgentSection}>
              <div style={styles.keystoneAgentType}>
                <span>💬</span> Reactive Agents
                <span style={{ fontSize: '12px', color: colors.textLight, fontWeight: 'normal' }}>(Respond to your questions)</span>
              </div>
              <div style={styles.keystoneAgentGrid}>
                {keystoneHubData.agents.reactive.map((agent, i) => (
                  <div key={i} style={styles.keystoneAgentCard(false)}>
                    <div style={styles.keystoneAgentName}>{agent.name}</div>
                    <div style={styles.keystoneAgentSchedule}>
                      <span>⚡</span> {agent.trigger}
                    </div>
                    <div style={styles.keystoneAgentDesc}>{agent.description}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Voluntary Sharing */}
            <div style={styles.keystoneSharingBox}>
              <div style={styles.keystoneSharingTitle}>
                <span>🤝</span> Voluntary Data Sharing Network
              </div>
              <div style={styles.keystoneSharingPrinciple}>
                {keystoneHubData.voluntarySharing.principle}
              </div>
              <div style={styles.keystoneSharingBenefits}>
                {keystoneHubData.voluntarySharing.benefits.map((b, i) => (
                  <div key={i} style={styles.keystoneSharingBenefit}>
                    <div style={styles.keystoneSharingBenefitTitle}>{b.benefit}</div>
                    <div style={styles.keystoneSharingBenefitDetail}>{b.detail}</div>
                  </div>
                ))}
              </div>
              <div style={styles.keystoneSharingPrivacy}>
                <span>🔒</span> {keystoneHubData.voluntarySharing.privacy}
              </div>
            </div>

            {/* Dashboard Features */}
            <h4 style={{ color: colors.text, marginBottom: '16px' }}>Dashboard Features</h4>
            <div style={styles.keystoneDashboardFeatures}>
              {keystoneHubData.dashboardFeatures.map((feature, i) => (
                <div key={i} style={styles.keystoneDashboardFeature}>
                  <div style={styles.keystoneDashboardFeatureIcon}>{feature.icon}</div>
                  <div style={styles.keystoneDashboardFeatureTitle}>{feature.feature}</div>
                  <div style={styles.keystoneDashboardFeatureDesc}>{feature.description}</div>
                </div>
              ))}
            </div>

            {/* Example Insight */}
            <h4 style={{ color: colors.text, marginBottom: '16px' }}>Example: AI-Generated Weekly Briefing</h4>
            <div style={styles.keystoneExampleInsight}>
              <div style={styles.keystoneInsightHeader}>
                <div style={styles.keystoneInsightTitle}>{keystoneHubData.exampleInsight.title}</div>
                <div style={styles.keystoneInsightPeriod}>{keystoneHubData.exampleInsight.period}</div>
              </div>
              <div style={styles.keystoneInsightBody}>
                <div style={styles.keystoneInsightSummary}>
                  {keystoneHubData.exampleInsight.summary}
                </div>

                <div style={styles.keystoneInsightSection}>
                  <div style={styles.keystoneInsightSectionTitle}>
                    <span>⚠️</span> Needs Attention
                  </div>
                  {keystoneHubData.exampleInsight.attention.map((item, i) => (
                    <div key={i} style={styles.keystoneInsightItem}>{item}</div>
                  ))}
                </div>

                <div style={styles.keystoneInsightSection}>
                  <div style={styles.keystoneInsightSectionTitle}>
                    <span>📈</span> Opportunities
                  </div>
                  {keystoneHubData.exampleInsight.opportunities.map((item, i) => (
                    <div key={i} style={styles.keystoneInsightItem}>{item}</div>
                  ))}
                </div>

                <div style={styles.keystoneInsightHighlight}>
                  <span>🏆</span> Top Performer: {keystoneHubData.exampleInsight.topPerformer}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Corporate Spine Section */}
      <div style={styles.deepDiveSection}>
        <div
          style={styles.deepDiveSectionHeader(expandedSections.corporateSpine, '#FF6B35')}
          onClick={() => toggleSection('corporateSpine')}
        >
          <div style={styles.deepDiveSectionTitle(expandedSections.corporateSpine)}>
            <span style={styles.deepDiveSectionIcon}>🏗️</span>
            The Corporate Spine: Test → Prove → Scale
          </div>
          <span style={styles.deepDiveExpand(expandedSections.corporateSpine)}>▼</span>
        </div>
        {expandedSections.corporateSpine && (
          <div style={styles.deepDiveContent}>
            {/* Hero */}
            <div style={{
              background: `linear-gradient(135deg, rgba(255, 107, 53, 0.2) 0%, rgba(2, 137, 64, 0.1) 100%)`,
              borderRadius: '16px',
              padding: '32px',
              marginBottom: '32px',
              border: '1px solid #FF6B35',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '36px', fontWeight: '700', color: colors.text, marginBottom: '8px' }}>
                {keystoneHubData.corporateSpine.headline}
              </div>
              <div style={{ fontSize: '24px', color: '#FF6B35', fontWeight: '600', marginBottom: '16px' }}>
                {keystoneHubData.corporateSpine.tagline}
              </div>
              <div style={{ fontSize: '16px', color: colors.textLight, maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>
                {keystoneHubData.corporateSpine.description}
              </div>
            </div>

            {/* Why This Is Revolutionary */}
            <div style={{
              background: colors.cardBg,
              borderRadius: '12px',
              padding: '24px',
              marginBottom: '32px',
              borderLeft: `4px solid ${colors.yellow}`
            }}>
              <h4 style={{ color: colors.yellow, marginBottom: '12px', fontSize: '18px' }}>Why This Is a Huge Departure</h4>
              <p style={{ color: colors.text, lineHeight: '1.7', margin: 0 }}>
                Subway is 100% franchisee-owned — there are no corporate stores today. This is precisely why the Corporate Spine strategy is so significant.
                By creating <strong style={{ color: colors.green }}>corporate/JV-owned innovation labs</strong>, Subway builds an engine to
                test and validate initiatives before asking franchisees to invest. No more "mandate first, measure later."
                Every new menu item, pricing strategy, tech rollout, and format change gets proven in spine stores first — protecting franchisees from unproven initiatives while accelerating what actually works.
              </p>
            </div>

            {/* Purpose Grid */}
            <h4 style={{ color: colors.text, marginBottom: '20px', fontSize: '20px' }}>The Four Purposes of the Spine</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' }}>
              {keystoneHubData.corporateSpine.purpose.map((item, idx) => (
                <div key={idx} style={{
                  background: colors.cardBg,
                  borderRadius: '12px',
                  padding: '24px',
                  textAlign: 'center',
                  borderTop: `4px solid ${colors.green}`
                }}>
                  <div style={{ fontSize: '40px', marginBottom: '12px' }}>{item.icon}</div>
                  <div style={{ color: colors.text, fontWeight: '700', fontSize: '16px', marginBottom: '8px' }}>{item.title}</div>
                  <div style={{ color: colors.textLight, fontSize: '13px', lineHeight: '1.5' }}>{item.description}</div>
                </div>
              ))}
            </div>

            {/* Data Flow Pipeline */}
            <h4 style={{ color: colors.text, marginBottom: '20px', fontSize: '20px' }}>The Innovation Pipeline</h4>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '8px',
              marginBottom: '32px',
              flexWrap: 'wrap'
            }}>
              {keystoneHubData.corporateSpine.dataFlow.map((step, idx) => (
                <Fragment key={idx}>
                  <div style={{
                    background: idx === 1 ? 'rgba(2, 137, 64, 0.2)' : colors.cardBg,
                    borderRadius: '12px',
                    padding: '20px',
                    flex: '1',
                    minWidth: '150px',
                    textAlign: 'center',
                    border: idx === 1 ? `2px solid ${colors.green}` : '1px solid rgba(255,255,255,0.1)'
                  }}>
                    <div style={{
                      background: '#FF6B35',
                      color: '#fff',
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 12px',
                      fontWeight: '700',
                      fontSize: '14px'
                    }}>{step.step}</div>
                    <div style={{ color: colors.text, fontWeight: '700', fontSize: '14px', marginBottom: '4px' }}>{step.label}</div>
                    <div style={{ color: colors.textLight, fontSize: '12px' }}>{step.description}</div>
                  </div>
                  {idx < keystoneHubData.corporateSpine.dataFlow.length - 1 && (
                    <div style={{ color: '#FF6B35', fontSize: '24px', fontWeight: '700' }}>→</div>
                  )}
                </Fragment>
              ))}
            </div>

            {/* Spine Markets */}
            <h4 style={{ color: colors.text, marginBottom: '8px', fontSize: '20px' }}>Spine Market Deployment</h4>
            <p style={{ color: colors.textLight, marginBottom: '20px', fontSize: '14px' }}>
              Strategic cross-section of market types to capture insights across urban, suburban, rural, and revival contexts.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' }}>
              {keystoneHubData.corporateSpine.spineMarkets.map((market, idx) => (
                <div key={idx} style={{
                  background: colors.cardBg,
                  borderRadius: '12px',
                  padding: '20px',
                  borderLeft: `4px solid ${market.status === 'active' ? colors.green : market.status === 'priority' ? '#FF6B35' : colors.yellow}`
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <div style={{ color: colors.text, fontWeight: '700', fontSize: '16px' }}>{market.dma}</div>
                    <div style={{
                      background: market.status === 'active' ? 'rgba(2, 137, 64, 0.2)' : market.status === 'priority' ? 'rgba(255, 107, 53, 0.2)' : 'rgba(255, 194, 13, 0.2)',
                      color: market.status === 'active' ? colors.green : market.status === 'priority' ? '#FF6B35' : colors.yellow,
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '11px',
                      fontWeight: '600'
                    }}>{market.status === 'active' ? '● Active' : market.status === 'priority' ? '★ Priority' : '○ Planned'}</div>
                  </div>
                  <div style={{ color: colors.textLight, fontSize: '12px', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{market.category}</div>
                  <div style={{ color: colors.text, fontSize: '13px', marginBottom: '4px' }}>{market.role}</div>
                  <div style={{ color: '#FF6B35', fontSize: '14px', fontWeight: '600' }}>{market.stores} stores</div>
                </div>
              ))}
            </div>

            {/* Market Revival Program */}
            <div style={{
              background: `linear-gradient(135deg, rgba(255, 107, 53, 0.15) 0%, ${colors.cardBg} 100%)`,
              borderRadius: '16px',
              padding: '24px',
              marginBottom: '32px',
              border: '2px solid #FF6B35'
            }}>
              <h4 style={{ color: '#FF6B35', marginBottom: '12px', fontSize: '18px' }}>
                🔄 {keystoneHubData.corporateSpine.marketRevival.headline}
              </h4>
              <p style={{ color: colors.text, lineHeight: '1.7', marginBottom: '16px' }}>
                <strong>The Problem:</strong> {keystoneHubData.corporateSpine.marketRevival.problem}
              </p>
              <p style={{ color: colors.text, lineHeight: '1.7', marginBottom: '16px' }}>
                <strong>The Solution:</strong> {keystoneHubData.corporateSpine.marketRevival.solution}
              </p>
              <div style={{
                background: 'rgba(255, 107, 53, 0.1)',
                padding: '16px',
                borderRadius: '8px',
                marginBottom: '16px',
                borderLeft: '4px solid #FF6B35'
              }}>
                <p style={{ color: colors.text, fontStyle: 'italic', margin: 0, lineHeight: '1.6' }}>
                  "{keystoneHubData.corporateSpine.marketRevival.principle}"
                </p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                {keystoneHubData.corporateSpine.marketRevival.benefits.map((benefit, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <span style={{ color: colors.green }}>✓</span>
                    <span style={{ color: colors.textLight, fontSize: '14px' }}>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Test Protocol */}
            <h4 style={{ color: colors.text, marginBottom: '20px', fontSize: '20px' }}>The Protocol: No Shortcuts</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '32px' }}>
              {Object.entries(keystoneHubData.corporateSpine.testProtocol).map(([phase, data], idx) => (
                <div key={idx} style={{
                  background: colors.cardBg,
                  borderRadius: '12px',
                  padding: '24px',
                  border: `2px solid ${idx === 0 ? '#FF6B35' : idx === 1 ? colors.yellow : colors.green}`
                }}>
                  <div style={{
                    fontSize: '24px',
                    fontWeight: '700',
                    color: idx === 0 ? '#FF6B35' : idx === 1 ? colors.yellow : colors.green,
                    marginBottom: '12px',
                    textTransform: 'uppercase'
                  }}>{phase}</div>
                  <div style={{ color: colors.text, fontSize: '14px', marginBottom: '12px', lineHeight: '1.5' }}>{data.description}</div>
                  <div style={{ color: colors.textLight, fontSize: '12px', fontStyle: 'italic' }}>{data.requirements}</div>
                </div>
              ))}
            </div>

            {/* Keystone Hub Integration */}
            <div style={{
              background: `linear-gradient(135deg, rgba(2, 137, 64, 0.15) 0%, ${colors.cardBg} 100%)`,
              borderRadius: '16px',
              padding: '24px',
              border: `1px solid ${colors.green}`
            }}>
              <h4 style={{ color: colors.green, marginBottom: '12px', fontSize: '18px' }}>
                🧠 How {keystoneHubData.brandName} Powers the Spine
              </h4>
              <p style={{ color: colors.text, lineHeight: '1.7', margin: 0 }}>
                {keystoneHubData.corporateSpine.keystoneRole}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Franchisee Community Section */}
      <div style={styles.deepDiveSection}>
        <div
          style={styles.deepDiveSectionHeader(expandedSections.franchiseeCommunity, '#9C27B0')}
          onClick={() => toggleSection('franchiseeCommunity')}
        >
          <div style={styles.deepDiveSectionTitle(expandedSections.franchiseeCommunity)}>
            <span style={styles.deepDiveSectionIcon}>🤝</span>
            Franchisee Community: Stronger Together
          </div>
          <span style={styles.deepDiveExpand(expandedSections.franchiseeCommunity)}>▼</span>
        </div>
        {expandedSections.franchiseeCommunity && (
          <div style={styles.deepDiveContent}>
            {/* Hero */}
            <div style={{
              background: `linear-gradient(135deg, rgba(156, 39, 176, 0.2) 0%, rgba(2, 137, 64, 0.1) 100%)`,
              borderRadius: '16px',
              padding: '32px',
              marginBottom: '32px',
              border: '1px solid #9C27B0',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '36px', fontWeight: '700', color: colors.text, marginBottom: '8px' }}>
                {keystoneHubData.communityEngagement.headline}
              </div>
              <div style={{ fontSize: '24px', color: '#9C27B0', fontWeight: '600', marginBottom: '16px' }}>
                {keystoneHubData.communityEngagement.tagline}
              </div>
              <div style={{ fontSize: '16px', color: colors.textLight, maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>
                {keystoneHubData.communityEngagement.description}
              </div>
            </div>

            {/* Why This Matters */}
            <div style={{
              background: colors.cardBg,
              borderRadius: '12px',
              padding: '24px',
              marginBottom: '32px',
              borderLeft: `4px solid ${colors.yellow}`
            }}>
              <h4 style={{ color: colors.yellow, marginBottom: '12px', fontSize: '18px' }}>A New Era of Franchisee Connection</h4>
              <p style={{ color: colors.text, lineHeight: '1.7', margin: 0 }}>
                Under new leadership, Subway is fundamentally changing how it engages with franchisees. Gone are the days of
                top-down mandates and annual conventions that felt more like sales pitches than dialogue. The new model prioritizes
                <strong style={{ color: colors.green }}> continuous connection, regional relevance, and two-way communication</strong>.
                Monthly town halls started in September 2025. Regional meetings replace the national convention in 2026.
                But the real transformation is what happens between these events — and that's where technology becomes the enabler.
              </p>
            </div>

            {/* Corporate Initiatives */}
            <h4 style={{ color: colors.text, marginBottom: '20px', fontSize: '20px' }}>New Corporate Initiatives</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginBottom: '32px' }}>
              {keystoneHubData.communityEngagement.corporateInitiatives.map((initiative, idx) => (
                <div key={idx} style={{
                  background: colors.cardBg,
                  borderRadius: '12px',
                  padding: '24px',
                  border: `2px solid ${initiative.status === 'active' ? colors.green : '#9C27B0'}`
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                    <span style={{ fontSize: '48px' }}>{initiative.icon}</span>
                    <div>
                      <div style={{ color: colors.text, fontWeight: '700', fontSize: '20px' }}>{initiative.name}</div>
                      <div style={{
                        color: initiative.status === 'active' ? colors.green : '#9C27B0',
                        fontSize: '14px',
                        fontWeight: '600'
                      }}>
                        {initiative.status === 'active' ? '● Active since' : '○ Starting'} {initiative.startDate}
                      </div>
                    </div>
                  </div>
                  <div style={{ color: colors.textLight, fontSize: '15px', lineHeight: '1.6', marginBottom: '12px' }}>{initiative.description}</div>
                  <div style={{ color: colors.text, fontSize: '14px' }}>
                    <strong>Frequency:</strong> {initiative.frequency}
                  </div>
                </div>
              ))}
            </div>

            {/* Deeper Engagement Features */}
            <h4 style={{ color: colors.text, marginBottom: '20px', fontSize: '20px' }}>Deeper Engagement Through Technology</h4>
            <p style={{ color: colors.textLight, marginBottom: '20px', fontSize: '15px' }}>
              Town halls and regional meetings happen periodically. But community doesn't pause between events.
              These features keep franchisees connected every day:
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '32px' }}>
              {keystoneHubData.communityEngagement.keystoneEnhancements.map((enhancement, idx) => (
                <div key={idx} style={{
                  background: colors.cardBg,
                  borderRadius: '12px',
                  padding: '20px',
                  borderLeft: `4px solid #9C27B0`
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                    <span style={{ fontSize: '32px' }}>{enhancement.icon}</span>
                    <div style={{ color: colors.text, fontWeight: '700', fontSize: '16px' }}>{enhancement.title}</div>
                  </div>
                  <div style={{ color: colors.textLight, fontSize: '14px', marginBottom: '12px', lineHeight: '1.5' }}>{enhancement.description}</div>
                  <div style={{
                    background: 'rgba(156, 39, 176, 0.15)',
                    padding: '10px 14px',
                    borderRadius: '6px',
                    color: '#CE93D8',
                    fontSize: '13px',
                    fontWeight: '600'
                  }}>
                    💡 {enhancement.benefit}
                  </div>
                </div>
              ))}
            </div>

            {/* Regional Meeting Supercharger */}
            <div style={{
              background: `linear-gradient(135deg, ${colors.cardBg} 0%, rgba(156, 39, 176, 0.1) 100%)`,
              borderRadius: '16px',
              padding: '28px',
              marginBottom: '32px',
              border: `1px solid #9C27B0`
            }}>
              <h4 style={{ color: '#CE93D8', marginBottom: '12px', fontSize: '20px' }}>
                🗺️ {keystoneHubData.communityEngagement.regionalIntegration.title}
              </h4>
              <p style={{ color: colors.textLight, marginBottom: '24px', fontSize: '15px', lineHeight: '1.6' }}>
                {keystoneHubData.communityEngagement.regionalIntegration.description}
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
                {keystoneHubData.communityEngagement.regionalIntegration.features.map((item, idx) => (
                  <div key={idx} style={{
                    background: colors.cardBg,
                    padding: '16px',
                    borderRadius: '8px',
                    textAlign: 'center'
                  }}>
                    <div style={{ color: colors.text, fontWeight: '700', fontSize: '14px', marginBottom: '8px' }}>{item.feature}</div>
                    <div style={{ color: colors.textLight, fontSize: '12px', lineHeight: '1.4' }}>{item.detail}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quote */}
            <div style={{
              background: colors.cardBg,
              borderRadius: '12px',
              padding: '28px',
              borderLeft: `4px solid #9C27B0`,
              fontStyle: 'italic'
            }}>
              <div style={{ color: colors.text, fontSize: '20px', marginBottom: '16px', lineHeight: '1.6' }}>
                "{keystoneHubData.communityEngagement.quote.text}"
              </div>
              <div style={{ color: colors.textLight, fontSize: '15px' }}>
                — {keystoneHubData.communityEngagement.quote.attribution}
              </div>
            </div>

            {/* Keystone Hub Integration */}
            <div style={{
              background: `linear-gradient(135deg, rgba(2, 137, 64, 0.15) 0%, ${colors.cardBg} 100%)`,
              borderRadius: '16px',
              padding: '24px',
              marginTop: '32px',
              border: `1px solid ${colors.green}`
            }}>
              <h4 style={{ color: colors.green, marginBottom: '12px', fontSize: '18px' }}>
                🧠 How {keystoneHubData.brandName} Enables Community
              </h4>
              <p style={{ color: colors.text, lineHeight: '1.7', margin: 0 }}>
                Subway Intelligence is the infrastructure that makes continuous franchisee engagement possible. It aggregates pulse survey responses,
                tracks commitments from town halls, matches franchisees in similar markets for peer circles, surfaces best practices from
                the community, and routes innovation suggestions through the test→prove→scale pipeline. The platform doesn't replace
                human connection — it amplifies it by ensuring no insight is lost and every voice can be heard.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ============================================
// KEYSTONE HUB PAGE
// ============================================
function KeystoneHubPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [selectedStore, setSelectedStore] = useState('all')

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'architecture', label: 'Architecture', icon: '🏗️' },
    { id: 'community', label: 'Community', icon: '🤝' },
    { id: 'weather', label: 'Weather', icon: '🌤️' },
    { id: 'benchmark', label: 'Benchmarking', icon: '📈' },
    { id: 'agents', label: 'AI Agents', icon: '🤖' },
    { id: 'sharing', label: 'Regional', icon: '🗺️' },
    { id: 'chat', label: 'Ask AI', icon: '💬' },
  ]

  const mockStores = [
    { id: 'all', name: 'All Stores (5)' },
    { id: '412', name: 'Store #412 - Downtown' },
    { id: '567', name: 'Store #567 - Mall Location' },
    { id: '891', name: 'Store #891 - University' },
    { id: '234', name: 'Store #234 - Highway' },
    { id: '678', name: 'Store #678 - Suburb' },
  ]

  const keystoneStyles = {
    container: {
      maxWidth: '1400px',
      margin: '0 auto',
    },
    header: {
      background: `linear-gradient(135deg, ${colors.green} 0%, ${colors.greenDark} 100%)`,
      borderRadius: '16px',
      padding: '32px',
      marginBottom: '24px',
      color: colors.white,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '20px',
    },
    headerLeft: {
      flex: 1,
    },
    headerTitle: {
      fontSize: '32px',
      fontWeight: '700',
      marginBottom: '8px',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
    },
    headerSubtitle: {
      fontSize: '16px',
      opacity: 0.9,
    },
    storeSelector: {
      backgroundColor: 'rgba(255,255,255,0.15)',
      borderRadius: '8px',
      padding: '12px 16px',
      border: 'none',
      color: colors.white,
      fontSize: '14px',
      cursor: 'pointer',
      minWidth: '200px',
    },
    tabBar: {
      display: 'flex',
      gap: '8px',
      marginBottom: '24px',
      backgroundColor: colors.gray,
      borderRadius: '12px',
      padding: '8px',
    },
    tab: (active) => ({
      flex: 1,
      padding: '14px 20px',
      borderRadius: '8px',
      border: 'none',
      backgroundColor: active ? colors.white : 'transparent',
      color: active ? colors.green : colors.textLight,
      fontWeight: active ? '600' : '400',
      fontSize: '14px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      boxShadow: active ? '0 2px 8px rgba(0,0,0,0.1)' : 'none',
      transition: 'all 0.2s ease',
    }),
    content: {
      backgroundColor: colors.cardBg,
      borderRadius: '16px',
      padding: '32px',
      minHeight: '500px',
    },
    briefingCard: {
      backgroundColor: colors.white,
      borderRadius: '16px',
      border: `2px solid ${colors.grayMedium}`,
      overflow: 'hidden',
      marginBottom: '24px',
    },
    briefingHeader: {
      backgroundColor: colors.green,
      color: colors.white,
      padding: '20px 24px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    briefingTitle: {
      fontSize: '18px',
      fontWeight: '600',
    },
    briefingDate: {
      fontSize: '13px',
      opacity: 0.9,
    },
    briefingBody: {
      padding: '24px',
    },
    briefingSummary: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '16px',
      marginBottom: '24px',
    },
    summaryCard: (color) => ({
      backgroundColor: color === 'green' ? '#e8f5e9' : color === 'yellow' ? '#fff8e1' : color === 'red' ? '#ffebee' : colors.gray,
      borderRadius: '12px',
      padding: '20px',
      textAlign: 'center',
    }),
    summaryValue: (color) => ({
      fontSize: '28px',
      fontWeight: '700',
      color: color === 'green' ? colors.green : color === 'yellow' ? '#f9a825' : color === 'red' ? colors.red : colors.text,
      marginBottom: '4px',
    }),
    summaryLabel: {
      fontSize: '13px',
      color: colors.textLight,
    },
    alertsSection: {
      marginBottom: '24px',
    },
    alertsTitle: {
      fontSize: '16px',
      fontWeight: '600',
      color: colors.text,
      marginBottom: '12px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    alertItem: (type) => ({
      backgroundColor: type === 'warning' ? '#fff8e1' : type === 'success' ? '#e8f5e9' : colors.gray,
      borderRadius: '8px',
      padding: '14px 18px',
      marginBottom: '10px',
      borderLeft: `4px solid ${type === 'warning' ? '#f9a825' : type === 'success' ? colors.green : colors.grayMedium}`,
      fontSize: '14px',
      color: colors.text,
      lineHeight: '1.5',
    }),
    agentGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '20px',
    },
    agentCard: (isProactive) => ({
      backgroundColor: isProactive ? '#e8f5e9' : '#e3f2fd',
      borderRadius: '16px',
      padding: '24px',
      borderLeft: `5px solid ${isProactive ? colors.green : colors.waterBlue}`,
    }),
    agentHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '12px',
    },
    agentName: {
      fontSize: '18px',
      fontWeight: '600',
      color: colors.text,
    },
    agentBadge: (isProactive) => ({
      backgroundColor: isProactive ? colors.green : colors.waterBlue,
      color: colors.white,
      padding: '4px 10px',
      borderRadius: '12px',
      fontSize: '11px',
      fontWeight: '600',
    }),
    agentSchedule: {
      fontSize: '13px',
      color: colors.grayDark,
      marginBottom: '12px',
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
    },
    agentDesc: {
      fontSize: '14px',
      color: colors.textLight,
      lineHeight: '1.6',
      marginBottom: '16px',
    },
    agentStatus: (active) => ({
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontSize: '12px',
      color: active ? colors.green : colors.grayDark,
    }),
    heatMapPlaceholder: {
      backgroundColor: colors.gray,
      borderRadius: '12px',
      height: '300px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '24px',
      border: `2px dashed ${colors.grayMedium}`,
    },
    heatMapText: {
      textAlign: 'center',
      color: colors.textLight,
    },
    sharingStats: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
      gap: '16px',
      marginBottom: '24px',
    },
    sharingStat: {
      backgroundColor: colors.gray,
      borderRadius: '12px',
      padding: '20px',
      textAlign: 'center',
    },
    sharingStatValue: {
      fontSize: '32px',
      fontWeight: '700',
      color: colors.green,
      marginBottom: '4px',
    },
    sharingStatLabel: {
      fontSize: '13px',
      color: colors.textLight,
    },
    chatContainer: {
      height: '450px',
      display: 'flex',
      flexDirection: 'column',
    },
    chatMessages: {
      flex: 1,
      backgroundColor: colors.gray,
      borderRadius: '12px',
      padding: '20px',
      marginBottom: '16px',
      overflowY: 'auto',
    },
    chatMessage: (isAI) => ({
      display: 'flex',
      justifyContent: isAI ? 'flex-start' : 'flex-end',
      marginBottom: '16px',
    }),
    chatBubble: (isAI) => ({
      maxWidth: '70%',
      backgroundColor: isAI ? colors.white : colors.green,
      color: isAI ? colors.text : colors.white,
      padding: '14px 18px',
      borderRadius: isAI ? '4px 16px 16px 16px' : '16px 4px 16px 16px',
      fontSize: '14px',
      lineHeight: '1.5',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    }),
    chatInputContainer: {
      display: 'flex',
      gap: '12px',
    },
    chatInput: {
      flex: 1,
      padding: '14px 18px',
      borderRadius: '12px',
      border: `2px solid ${colors.grayMedium}`,
      fontSize: '14px',
      outline: 'none',
    },
    chatSend: {
      backgroundColor: colors.green,
      color: colors.white,
      border: 'none',
      borderRadius: '12px',
      padding: '14px 24px',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer',
    },
    suggestedQuestions: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8px',
      marginTop: '12px',
    },
    suggestedQ: {
      backgroundColor: colors.white,
      border: `1px solid ${colors.grayMedium}`,
      borderRadius: '20px',
      padding: '8px 14px',
      fontSize: '12px',
      color: colors.textLight,
      cursor: 'pointer',
    },
  }

  return (
    <div style={keystoneStyles.container}>
      {/* Header */}
      <div style={keystoneStyles.header}>
        <div style={keystoneStyles.headerLeft}>
          <div style={keystoneStyles.headerTitle}>
            <span>🧠</span> {keystoneHubData.brandName}
          </div>
          <div style={keystoneStyles.headerSubtitle}>
            {keystoneHubData.poweredBy} • AI-powered business intelligence working FOR you
          </div>
        </div>
        <select
          style={keystoneStyles.storeSelector}
          value={selectedStore}
          onChange={(e) => setSelectedStore(e.target.value)}
        >
          {mockStores.map(store => (
            <option key={store.id} value={store.id}>{store.name}</option>
          ))}
        </select>
      </div>

      {/* Tab Bar */}
      <div style={keystoneStyles.tabBar}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            style={keystoneStyles.tab(activeTab === tab.id)}
            onClick={() => setActiveTab(tab.id)}
          >
            <span>{tab.icon}</span> {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={keystoneStyles.content}>
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div>
            {/* Today's Briefing */}
            <div style={keystoneStyles.briefingCard}>
              <div style={keystoneStyles.briefingHeader}>
                <div style={keystoneStyles.briefingTitle}>Today's AI Briefing</div>
                <div style={keystoneStyles.briefingDate}>Thursday, Nov 28, 2025 • Generated 6:00 AM</div>
              </div>
              <div style={keystoneStyles.briefingBody}>
                <div style={keystoneStyles.briefingSummary}>
                  <div style={keystoneStyles.summaryCard('green')}>
                    <div style={keystoneStyles.summaryValue('green')}>$8,920</div>
                    <div style={keystoneStyles.summaryLabel}>Yesterday's Revenue (+3% vs forecast)</div>
                  </div>
                  <div style={keystoneStyles.summaryCard('green')}>
                    <div style={keystoneStyles.summaryValue('green')}>$62</div>
                    <div style={keystoneStyles.summaryLabel}>SPLH (Target: $60)</div>
                  </div>
                  <div style={keystoneStyles.summaryCard('yellow')}>
                    <div style={keystoneStyles.summaryValue('yellow')}>29%</div>
                    <div style={keystoneStyles.summaryLabel}>Labor % (Target: 28%)</div>
                  </div>
                  <div style={keystoneStyles.summaryCard('green')}>
                    <div style={keystoneStyles.summaryValue('green')}>$11.92</div>
                    <div style={keystoneStyles.summaryLabel}>Avg Ticket (+$0.07 vs LW)</div>
                  </div>
                </div>

                <div style={keystoneStyles.alertsSection}>
                  <div style={keystoneStyles.alertsTitle}>
                    <span>⚠️</span> Needs Attention
                  </div>
                  <div style={keystoneStyles.alertItem('warning')}>
                    <strong>Store #412:</strong> SPLH declining ($52 vs $60 target) for 3rd consecutive week. Lunch shift overstaffed — recommend scheduling audit.
                  </div>
                  <div style={keystoneStyles.alertItem('warning')}>
                    <strong>Weekend Dinner:</strong> Transactions down -8% vs last year. Possible impact from new Chipotle (opened 0.4 mi away).
                  </div>
                </div>

                <div style={keystoneStyles.alertsSection}>
                  <div style={keystoneStyles.alertsTitle}>
                    <span>📈</span> Opportunities
                  </div>
                  <div style={keystoneStyles.alertItem('success')}>
                    <strong>Breakfast momentum:</strong> AM daypart +6% vs trend, SPLH hitting $68. Consider extending breakfast menu until 11am.
                  </div>
                  <div style={keystoneStyles.alertItem('success')}>
                    <strong>Catering surge:</strong> Orders up 40% vs last month. Avg catering ticket $142 — high margin, consider dedicated prep block.
                  </div>
                </div>

                <div style={{ ...keystoneStyles.alertItem('success'), display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '24px' }}>🏆</span>
                  <div>
                    <strong>Top Performer:</strong> Store #567 — $2,170/day, $64 SPLH, 26% labor (best in network)
                  </div>
                </div>
              </div>
            </div>

            {/* Labor & Pricing Quick View */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
              {/* SPLH by Daypart */}
              <div style={{ backgroundColor: colors.gray, borderRadius: '12px', padding: '20px' }}>
                <h4 style={{ color: colors.text, marginBottom: '16px', fontSize: '15px' }}>Yesterday's SPLH by Daypart</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: colors.textLight, fontSize: '14px' }}>Breakfast (6-11am)</span>
                    <span style={{ color: colors.green, fontWeight: '600' }}>$68</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: colors.textLight, fontSize: '14px' }}>Lunch (11am-2pm)</span>
                    <span style={{ color: colors.green, fontWeight: '600' }}>$72</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: colors.textLight, fontSize: '14px' }}>Afternoon (2-5pm)</span>
                    <span style={{ color: '#f9a825', fontWeight: '600' }}>$54</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: colors.textLight, fontSize: '14px' }}>Dinner (5-9pm)</span>
                    <span style={{ color: colors.green, fontWeight: '600' }}>$61</span>
                  </div>
                </div>
                <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: `1px solid ${colors.grayMedium}`, display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: colors.text, fontSize: '14px', fontWeight: '600' }}>Daily Avg</span>
                  <span style={{ color: colors.green, fontWeight: '700' }}>$62</span>
                </div>
              </div>

              {/* Pay Rates & Labor */}
              <div style={{ backgroundColor: colors.gray, borderRadius: '12px', padding: '20px' }}>
                <h4 style={{ color: colors.text, marginBottom: '16px', fontSize: '15px' }}>Labor Metrics (Network Avg)</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: colors.textLight, fontSize: '14px' }}>Regular Crew Avg</span>
                    <span style={{ color: colors.text, fontWeight: '600' }}>$12.50/hr</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: colors.textLight, fontSize: '14px' }}>All Crew Avg</span>
                    <span style={{ color: colors.text, fontWeight: '600' }}>$13.25/hr</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: colors.textLight, fontSize: '14px' }}>Management Avg</span>
                    <span style={{ color: colors.text, fontWeight: '600' }}>$17.50/hr</span>
                  </div>
                </div>
                <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: `1px solid ${colors.grayMedium}`, display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: colors.text, fontSize: '14px', fontWeight: '600' }}>SPLH Target</span>
                  <span style={{ color: colors.green, fontWeight: '700' }}>$60+</span>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <h3 style={{ color: colors.text, marginBottom: '16px' }}>Week-to-Date Performance (5 Stores)</h3>
            <div style={keystoneStyles.briefingSummary}>
              <div style={keystoneStyles.summaryCard()}>
                <div style={{ ...keystoneStyles.summaryValue(), color: colors.text }}>$62,400</div>
                <div style={keystoneStyles.summaryLabel}>Total Revenue</div>
              </div>
              <div style={keystoneStyles.summaryCard()}>
                <div style={{ ...keystoneStyles.summaryValue(), color: colors.text }}>5,265</div>
                <div style={keystoneStyles.summaryLabel}>Transactions</div>
              </div>
              <div style={keystoneStyles.summaryCard()}>
                <div style={{ ...keystoneStyles.summaryValue(), color: colors.text }}>$11.85</div>
                <div style={keystoneStyles.summaryLabel}>Avg Ticket</div>
              </div>
              <div style={keystoneStyles.summaryCard()}>
                <div style={{ ...keystoneStyles.summaryValue(), color: colors.green }}>+2%</div>
                <div style={keystoneStyles.summaryLabel}>vs. Forecast</div>
              </div>
            </div>

            {/* Actionable Recommendations */}
            <h3 style={{ color: colors.text, marginTop: '32px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>🎯</span> Actionable Recommendations
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {keystoneHubData.recommendations.map((rec, i) => {
                const priorityColors = {
                  high: { bg: '#ffebee', border: colors.red },
                  medium: { bg: '#fff3e0', border: colors.orange },
                  low: { bg: '#e8f5e9', border: colors.green }
                }
                const pc = priorityColors[rec.priority]
                return (
                  <div key={i} style={{
                    backgroundColor: pc.bg,
                    borderRadius: '12px',
                    padding: '20px',
                    borderLeft: `5px solid ${pc.border}`,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    gap: '20px'
                  }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                        <span style={{
                          fontSize: '11px',
                          fontWeight: '600',
                          padding: '4px 8px',
                          borderRadius: '4px',
                          backgroundColor: pc.border,
                          color: 'white',
                          textTransform: 'uppercase'
                        }}>
                          {rec.priority}
                        </span>
                        <span style={{ fontSize: '11px', color: colors.grayDark }}>{rec.category}</span>
                      </div>
                      <div style={{ fontSize: '16px', fontWeight: '600', color: colors.text, marginBottom: '6px' }}>{rec.title}</div>
                      <div style={{ fontSize: '14px', color: colors.textLight, lineHeight: 1.5 }}>{rec.description}</div>
                    </div>
                    <div style={{ textAlign: 'right', minWidth: '140px' }}>
                      <div style={{ fontSize: '18px', fontWeight: '700', color: rec.potentialSavings ? colors.green : colors.waterBlue }}>
                        {rec.potentialSavings || rec.potentialGain}
                      </div>
                      <div style={{ fontSize: '12px', color: colors.textLight }}>{rec.effort} effort • {rec.timeline}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Architecture Tab - Corporate Spine */}
        {activeTab === 'architecture' && (
          <div>
            <h3 style={{ color: colors.text, marginBottom: '8px' }}>{keystoneHubData.brandName} + Corporate Spine</h3>
            <p style={{ color: colors.textLight, marginBottom: '24px' }}>
              How {keystoneHubData.brandName} powers the test→prove→scale innovation pipeline.
              <em style={{ display: 'block', marginTop: '8px', color: colors.yellow }}>
                → See Deep Dive for full Corporate Spine strategy
              </em>
            </p>

            {/* Hero Integration Box */}
            <div style={{
              background: `linear-gradient(135deg, rgba(2, 137, 64, 0.2) 0%, ${colors.cardBg} 100%)`,
              borderRadius: '16px',
              padding: '28px',
              marginBottom: '24px',
              border: `2px solid ${colors.green}`
            }}>
              <h4 style={{ color: colors.green, marginBottom: '16px', fontSize: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span>🧠</span> {keystoneHubData.brandName}'s Role
              </h4>
              <p style={{ color: colors.text, fontSize: '15px', lineHeight: '1.7', marginBottom: '20px' }}>
                {keystoneHubData.corporateSpine.keystoneRole}
              </p>

              {/* Data Flow Summary */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
                {['Spine Stores', 'Subway Intelligence', 'Prove', 'Scale'].map((step, i) => (
                  <Fragment key={i}>
                    <div style={{
                      background: i === 1 ? colors.green : colors.cardBg,
                      padding: '12px 20px',
                      borderRadius: '8px',
                      color: i === 1 ? colors.white : colors.text,
                      fontWeight: '600',
                      fontSize: '14px',
                      border: i === 1 ? 'none' : `1px solid ${colors.green}`
                    }}>{step}</div>
                    {i < 3 && <span style={{ color: colors.green, fontSize: '20px' }}>→</span>}
                  </Fragment>
                ))}
              </div>
            </div>

            {/* What Subway Intelligence Does */}
            <h4 style={{ color: colors.yellow, marginBottom: '16px', fontSize: '18px' }}>What {keystoneHubData.brandName} Captures from Spine Stores</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
              {[
                { icon: '📊', label: 'Performance Data', detail: 'Sales, traffic, ticket, dayparts' },
                { icon: '⏱️', label: 'Operational Metrics', detail: 'Speed, labor efficiency, waste' },
                { icon: '👥', label: 'Customer Feedback', detail: 'Satisfaction, complaints, patterns' },
                { icon: '💰', label: 'Financial Impact', detail: 'Margin, ROI, payback period' },
              ].map((item, idx) => (
                <div key={idx} style={{
                  background: colors.cardBg,
                  borderRadius: '12px',
                  padding: '20px',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '32px', marginBottom: '12px' }}>{item.icon}</div>
                  <div style={{ color: colors.text, fontWeight: '700', fontSize: '14px', marginBottom: '4px' }}>{item.label}</div>
                  <div style={{ color: colors.textLight, fontSize: '12px' }}>{item.detail}</div>
                </div>
              ))}
            </div>

            {/* AI Analysis */}
            <div style={{
              background: colors.cardBg,
              borderRadius: '12px',
              padding: '24px',
              borderLeft: `4px solid ${colors.yellow}`
            }}>
              <h4 style={{ color: colors.yellow, marginBottom: '12px', fontSize: '16px' }}>AI-Powered Validation</h4>
              <p style={{ color: colors.text, fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
                Subway Intelligence's AI agents continuously analyze spine store data to determine if initiatives meet
                prove thresholds. When an initiative consistently delivers the required lift and margin improvement,
                it automatically generates a "ready for pilot" recommendation with supporting evidence.
                No more gut-feel decisions — every scale recommendation is backed by real data.
              </p>
            </div>
          </div>
        )}

        {/* Community Tab */}
        {activeTab === 'community' && (
          <div>
            <h3 style={{ color: colors.text, marginBottom: '8px' }}>{keystoneHubData.brandName} + Community</h3>
            <p style={{ color: colors.textLight, marginBottom: '24px' }}>
              How {keystoneHubData.brandName} keeps franchisees connected between town halls and meetings.
              <em style={{ display: 'block', marginTop: '8px', color: colors.yellow }}>
                → See Deep Dive for full Franchisee Community strategy
              </em>
            </p>

            {/* Hero Integration Box */}
            <div style={{
              background: `linear-gradient(135deg, rgba(2, 137, 64, 0.2) 0%, ${colors.cardBg} 100%)`,
              borderRadius: '16px',
              padding: '28px',
              marginBottom: '24px',
              border: `2px solid ${colors.green}`
            }}>
              <h4 style={{ color: colors.green, marginBottom: '16px', fontSize: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span>🧠</span> How {keystoneHubData.brandName} Enables Community
              </h4>
              <p style={{ color: colors.text, fontSize: '15px', lineHeight: '1.7', margin: 0 }}>
                Subway Intelligence is the infrastructure that makes continuous franchisee engagement possible.
                It aggregates pulse survey responses, tracks commitments from town halls, matches franchisees
                in similar markets for peer circles, surfaces best practices, and routes innovation suggestions
                through the test→prove→scale pipeline.
              </p>
            </div>

            {/* Platform Features */}
            <h4 style={{ color: colors.yellow, marginBottom: '16px', fontSize: '18px' }}>Community Features in {keystoneHubData.brandName}</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
              {[
                { icon: '💬', title: 'Pre-Town Hall Surveys', detail: 'Submit questions, vote on topics before each town hall' },
                { icon: '📊', title: 'Commitment Tracker', detail: 'Public dashboard tracking HQ promises and progress' },
                { icon: '🤝', title: 'Peer Circles', detail: 'Monthly calls with franchisees in similar markets' },
                { icon: '💡', title: 'Innovation Pipeline', detail: 'Submit ideas → peer voting → spine testing' },
                { icon: '📚', title: 'Best Practices', detail: 'Peer-reviewed tips, templates, and playbooks' },
                { icon: '🏆', title: 'Recognition', detail: 'Leaderboards for performance and contribution' },
              ].map((item, idx) => (
                <div key={idx} style={{
                  background: colors.cardBg,
                  borderRadius: '12px',
                  padding: '20px',
                  borderLeft: `4px solid ${colors.green}`
                }}>
                  <div style={{ fontSize: '28px', marginBottom: '12px' }}>{item.icon}</div>
                  <div style={{ color: colors.text, fontWeight: '700', fontSize: '14px', marginBottom: '4px' }}>{item.title}</div>
                  <div style={{ color: colors.textLight, fontSize: '13px', lineHeight: '1.4' }}>{item.detail}</div>
                </div>
              ))}
            </div>

            {/* Community Metrics */}
            <h4 style={{ color: colors.yellow, marginBottom: '16px', fontSize: '18px' }}>Community Activity</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '12px' }}>
              {[
                { label: 'Active Forums', value: keystoneHubData.communityEngagement.communityMetrics.activeForums, icon: '💬' },
                { label: 'Monthly Posts', value: keystoneHubData.communityEngagement.communityMetrics.monthlyPosts.toLocaleString(), icon: '📝' },
                { label: 'Ideas Submitted', value: keystoneHubData.communityEngagement.communityMetrics.ideasSubmitted, icon: '💡' },
                { label: 'Ideas in Testing', value: keystoneHubData.communityEngagement.communityMetrics.ideasInTesting, icon: '🧪' },
                { label: 'Best Practices', value: keystoneHubData.communityEngagement.communityMetrics.bestPracticesShared, icon: '📚' },
                { label: 'Peer Connections', value: keystoneHubData.communityEngagement.communityMetrics.peerConnections.toLocaleString(), icon: '🤝' },
              ].map((metric, idx) => (
                <div key={idx} style={{
                  background: colors.cardBg,
                  borderRadius: '8px',
                  padding: '16px',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '24px', marginBottom: '8px' }}>{metric.icon}</div>
                  <div style={{ color: colors.green, fontSize: '24px', fontWeight: '700' }}>{metric.value}</div>
                  <div style={{ color: colors.textLight, fontSize: '11px' }}>{metric.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Weather Tab */}
        {activeTab === 'weather' && (
          <div>
            <h3 style={{ color: colors.text, marginBottom: '8px' }}>Weather Analytics</h3>
            <p style={{ color: colors.textLight, marginBottom: '24px' }}>
              Understanding how weather impacts your sales — correlation strength: <strong style={{ color: colors.green }}>0.72 (Strong)</strong>
            </p>

            {/* Weather Impact Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' }}>
              {keystoneHubData.weatherData.impacts.map((w, i) => (
                <div key={i} style={{ backgroundColor: colors.gray, borderRadius: '12px', padding: '20px', textAlign: 'center', borderTop: `4px solid ${w.color}` }}>
                  <div style={{ fontSize: '40px', marginBottom: '8px' }}>{w.icon}</div>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: colors.text, marginBottom: '4px' }}>{w.condition}</div>
                  <div style={{ fontSize: '24px', fontWeight: '700', color: w.impact.includes('+') ? colors.green : w.impact.includes('-') ? colors.red : colors.text }}>{w.impact}</div>
                  <div style={{ fontSize: '12px', color: colors.textLight, marginTop: '8px' }}>Avg: ${w.avgSales.toLocaleString()}/day</div>
                  <div style={{ fontSize: '11px', color: colors.grayDark }}>{w.count} days analyzed</div>
                </div>
              ))}
            </div>

            {/* 5-Day Forecast */}
            <h4 style={{ color: colors.text, marginBottom: '16px' }}>5-Day Sales Forecast</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px', marginBottom: '32px' }}>
              {keystoneHubData.weatherData.forecast.map((f, i) => (
                <div key={i} style={{ backgroundColor: colors.gray, borderRadius: '12px', padding: '16px', textAlign: 'center' }}>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: colors.text, marginBottom: '8px' }}>{f.day}</div>
                  <div style={{ fontSize: '32px', marginBottom: '4px' }}>{f.weather}</div>
                  <div style={{ fontSize: '13px', color: colors.textLight }}>{f.temp}°F</div>
                  <div style={{ fontSize: '18px', fontWeight: '700', color: colors.text, marginTop: '8px' }}>${f.predicted.toLocaleString()}</div>
                  <div style={{ fontSize: '12px', color: f.impact.includes('+') ? colors.green : f.impact.includes('-') ? colors.red : colors.textLight, fontWeight: '500' }}>{f.impact}</div>
                </div>
              ))}
            </div>

            {/* Temperature Impact */}
            <h4 style={{ color: colors.text, marginBottom: '16px' }}>Temperature Impact on Sales</h4>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
              {keystoneHubData.weatherData.temperatureImpact.map((t, i) => (
                <div key={i} style={{ flex: 1, backgroundColor: t.color, borderRadius: '8px', padding: '16px', color: colors.white, textAlign: 'center' }}>
                  <div style={{ fontSize: '13px', marginBottom: '4px' }}>{t.range}</div>
                  <div style={{ fontSize: '24px', fontWeight: '700' }}>{t.sales}%</div>
                  <div style={{ fontSize: '11px', opacity: 0.9 }}>of baseline</div>
                </div>
              ))}
            </div>

            {/* Action Items */}
            <div style={{ backgroundColor: '#e8f5e9', borderRadius: '12px', padding: '20px', borderLeft: `5px solid ${colors.green}` }}>
              <h4 style={{ color: colors.green, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>💡</span> Weather-Based Actions
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div style={{ fontSize: '14px', color: colors.text }}>
                  <strong>Rain days:</strong> Push delivery promos +20% — region sees +12% delivery orders
                </div>
                <div style={{ fontSize: '14px', color: colors.text }}>
                  <strong>Hot days (80°F+):</strong> Feature cold drinks — 15% higher attachment rate
                </div>
                <div style={{ fontSize: '14px', color: colors.text }}>
                  <strong>Cold days (&lt;40°F):</strong> Promote soups and hot subs
                </div>
                <div style={{ fontSize: '14px', color: colors.text }}>
                  <strong>Sunday rain forecast:</strong> Consider cutting 1 afternoon shift
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Benchmarking Tab */}
        {activeTab === 'benchmark' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
              <div>
                <h3 style={{ color: colors.text, marginBottom: '8px' }}>Performance Benchmarking</h3>
                <p style={{ color: colors.textLight, margin: 0 }}>
                  See where you stand relative to expected performance boundaries. Flags indicate areas needing attention.
                </p>
              </div>
              {/* Geographic Filter */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {['National', 'Region', 'State', 'County'].map((level) => (
                  <button
                    key={level}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '8px',
                      border: level === 'County' ? `2px solid ${colors.green}` : `1px solid ${colors.grayMedium}`,
                      backgroundColor: level === 'County' ? colors.green : 'transparent',
                      color: level === 'County' ? 'white' : colors.text,
                      fontSize: '13px',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            {/* Current Filter Context */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 16px',
              backgroundColor: colors.gray,
              borderRadius: '8px',
              marginBottom: '24px'
            }}>
              <span style={{ fontSize: '13px', color: colors.textLight }}>Comparing against:</span>
              <span style={{ fontSize: '14px', fontWeight: '600', color: colors.green }}>Montgomery County, PA</span>
              <span style={{ fontSize: '13px', color: colors.textLight }}>•</span>
              <span style={{ fontSize: '13px', color: colors.textLight }}>47 participating stores</span>
              <span style={{ fontSize: '13px', color: colors.textLight }}>•</span>
              <span style={{ fontSize: '13px', color: colors.textLight }}>Similar demographics & market conditions</span>
            </div>

            {/* Performance Metrics with Boundaries */}
            <div style={{ marginBottom: '32px' }}>
              {keystoneHubData.benchmarkData.map((b, i) => {
                const statusColor = b.status === 'flag' ? '#dc3545' : b.status === 'excellent' ? colors.green : colors.text;
                const statusBg = b.status === 'flag' ? 'rgba(220, 53, 69, 0.1)' : b.status === 'excellent' ? 'rgba(2, 137, 64, 0.1)' : 'transparent';
                const statusIcon = b.status === 'flag' ? '🚩' : b.status === 'excellent' ? '⭐' : '✓';
                const statusLabel = b.status === 'flag' ? 'Needs Attention' : b.status === 'excellent' ? 'Excellent' : 'Within Bounds';

                return (
                  <div key={i} style={{ marginBottom: '24px', padding: '16px', backgroundColor: statusBg, borderRadius: '12px', border: b.status === 'flag' ? '1px solid rgba(220, 53, 69, 0.3)' : 'none' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '14px', fontWeight: '600', color: colors.text }}>{b.metric}</span>
                        <span style={{
                          fontSize: '11px',
                          padding: '2px 8px',
                          borderRadius: '4px',
                          backgroundColor: b.status === 'flag' ? '#dc3545' : b.status === 'excellent' ? colors.green : colors.grayMedium,
                          color: b.status === 'normal' ? colors.text : 'white',
                          fontWeight: '600'
                        }}>
                          {statusIcon} {statusLabel}
                        </span>
                      </div>
                      <span style={{ fontSize: '14px', color: statusColor, fontWeight: '600' }}>
                        {b.you}th percentile
                      </span>
                    </div>
                    <div style={{ position: 'relative', height: '32px', backgroundColor: colors.grayMedium, borderRadius: '16px', overflow: 'hidden' }}>
                      {/* Expected bounds zone (shaded area) */}
                      <div style={{
                        position: 'absolute',
                        left: `${b.lowerBound}%`,
                        width: `${b.upperBound - b.lowerBound}%`,
                        top: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(2, 137, 64, 0.15)',
                        zIndex: 1
                      }} />
                      {/* Lower bound marker */}
                      <div style={{ position: 'absolute', left: `${b.lowerBound}%`, top: 0, bottom: 0, width: '2px', backgroundColor: '#dc3545', zIndex: 2 }} />
                      {/* Peer average marker */}
                      <div style={{ position: 'absolute', left: `${b.peer}%`, top: 0, bottom: 0, width: '2px', backgroundColor: colors.grayDark, zIndex: 2 }} />
                      {/* Upper bound marker */}
                      <div style={{ position: 'absolute', left: `${b.upperBound}%`, top: 0, bottom: 0, width: '2px', backgroundColor: colors.green, zIndex: 2 }} />
                      {/* Your position bar */}
                      <div style={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        bottom: 0,
                        width: `${b.you}%`,
                        background: b.status === 'flag'
                          ? `linear-gradient(90deg, rgba(220, 53, 69, 0.3), #dc3545)`
                          : b.status === 'excellent'
                            ? `linear-gradient(90deg, ${colors.green}40, ${colors.green})`
                            : `linear-gradient(90deg, ${colors.yellow}40, ${colors.yellow})`,
                        borderRadius: '16px',
                        transition: 'width 0.5s ease'
                      }} />
                      {/* Your position dot */}
                      <div style={{
                        position: 'absolute',
                        left: `calc(${b.you}% - 12px)`,
                        top: '4px',
                        width: '24px',
                        height: '24px',
                        backgroundColor: b.status === 'flag' ? '#dc3545' : b.status === 'excellent' ? colors.green : colors.yellow,
                        borderRadius: '50%',
                        border: '3px solid white',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '10px',
                        fontWeight: '700',
                        zIndex: 3
                      }}>
                        {b.you}
                      </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px', fontSize: '11px', color: colors.grayDark }}>
                      <span style={{ color: '#dc3545' }}>Lower Bound ({b.lowerBound}th)</span>
                      <span>Peer Avg ({b.peer}th)</span>
                      <span style={{ color: colors.green }}>Upper Bound ({b.upperBound}th)</span>
                    </div>
                    <div style={{ marginTop: '8px', fontSize: '13px', color: statusColor, fontStyle: 'italic' }}>
                      {b.insight}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Legend */}
            <div style={{ display: 'flex', gap: '24px', marginBottom: '24px', padding: '16px', backgroundColor: colors.gray, borderRadius: '8px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '40px', height: '16px', backgroundColor: 'rgba(2, 137, 64, 0.15)', border: '1px solid rgba(2, 137, 64, 0.3)', borderRadius: '4px' }} />
                <span style={{ fontSize: '13px', color: colors.text }}>Expected Range</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '2px', height: '16px', backgroundColor: '#dc3545' }} />
                <span style={{ fontSize: '13px', color: colors.text }}>Lower Bound (Flag if below)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '2px', height: '16px', backgroundColor: colors.grayDark }} />
                <span style={{ fontSize: '13px', color: colors.text }}>Peer Average</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '16px', height: '16px', backgroundColor: '#dc3545', borderRadius: '50%', border: '2px solid white' }} />
                <span style={{ fontSize: '13px', color: colors.text }}>🚩 Needs Attention</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '16px', height: '16px', backgroundColor: colors.green, borderRadius: '50%', border: '2px solid white' }} />
                <span style={{ fontSize: '13px', color: colors.text }}>⭐ Excellent</span>
              </div>
            </div>

            {/* Strengths & Focus Areas */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              <div style={{ backgroundColor: '#e8f5e9', borderRadius: '12px', padding: '20px' }}>
                <h4 style={{ color: colors.green, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>💪</span> Strengths
                </h4>
                <ul style={{ margin: 0, paddingLeft: '20px', color: colors.text, fontSize: '14px', lineHeight: 1.8 }}>
                  <li>Customer Satisfaction in top quartile (78th)</li>
                  <li>SPLH above peer average (73rd)</li>
                  <li>Food Cost % well controlled (68th)</li>
                </ul>
              </div>
              <div style={{ backgroundColor: '#fff3e0', borderRadius: '12px', padding: '20px' }}>
                <h4 style={{ color: colors.orange, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>🎯</span> Focus Areas
                </h4>
                <ul style={{ margin: 0, paddingLeft: '20px', color: colors.text, fontSize: '14px', lineHeight: 1.8 }}>
                  <li>Labor Efficiency below peer avg (45th) — 20 pts to goal</li>
                  <li>Sales Volume room to grow (62nd) — 8 pts to goal</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Agents Tab */}
        {activeTab === 'agents' && (
          <div>
            <h3 style={{ color: colors.text, marginBottom: '8px' }}>AI Agents Working For You</h3>
            <p style={{ color: colors.textLight, marginBottom: '24px' }}>
              Proactive agents run on schedule. Reactive agents respond to your questions.
            </p>

            <h4 style={{ color: colors.text, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>🟢</span> Proactive Agents
            </h4>
            <div style={keystoneStyles.agentGrid}>
              {keystoneHubData.agents.proactive.map((agent, i) => (
                <div key={i} style={keystoneStyles.agentCard(true)}>
                  <div style={keystoneStyles.agentHeader}>
                    <div style={keystoneStyles.agentName}>{agent.name}</div>
                    <div style={keystoneStyles.agentBadge(true)}>PROACTIVE</div>
                  </div>
                  <div style={keystoneStyles.agentSchedule}>
                    <span>⏰</span> {agent.schedule}
                  </div>
                  <div style={keystoneStyles.agentDesc}>{agent.description}</div>
                  <div style={keystoneStyles.agentStatus(true)}>
                    <span>●</span> Active
                  </div>
                </div>
              ))}
            </div>

            <h4 style={{ color: colors.text, marginTop: '32px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>🔵</span> Reactive Agents
            </h4>
            <div style={keystoneStyles.agentGrid}>
              {keystoneHubData.agents.reactive.map((agent, i) => (
                <div key={i} style={keystoneStyles.agentCard(false)}>
                  <div style={keystoneStyles.agentHeader}>
                    <div style={keystoneStyles.agentName}>{agent.name}</div>
                    <div style={keystoneStyles.agentBadge(false)}>ON-DEMAND</div>
                  </div>
                  <div style={keystoneStyles.agentSchedule}>
                    <span>⚡</span> {agent.trigger}
                  </div>
                  <div style={keystoneStyles.agentDesc}>{agent.description}</div>
                  <div style={keystoneStyles.agentStatus(true)}>
                    <span>●</span> Ready
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Network Insights Tab */}
        {activeTab === 'sharing' && (
          <div>
            <h3 style={{ color: colors.text, marginBottom: '8px' }}>Regional Performance</h3>
            <p style={{ color: colors.textLight, marginBottom: '24px' }}>
              Powered by voluntary data sharing from 47 participating franchisees in your region.
            </p>

            <div style={keystoneStyles.sharingStats}>
              <div style={keystoneStyles.sharingStat}>
                <div style={keystoneStyles.sharingStatValue}>47</div>
                <div style={keystoneStyles.sharingStatLabel}>Stores Sharing Data</div>
              </div>
              <div style={keystoneStyles.sharingStat}>
                <div style={keystoneStyles.sharingStatValue}>$1,840</div>
                <div style={keystoneStyles.sharingStatLabel}>Regional Avg Daily/Store</div>
              </div>
              <div style={keystoneStyles.sharingStat}>
                <div style={keystoneStyles.sharingStatValue}>$58</div>
                <div style={keystoneStyles.sharingStatLabel}>Avg SPLH</div>
              </div>
              <div style={keystoneStyles.sharingStat}>
                <div style={keystoneStyles.sharingStatValue}>$11.65</div>
                <div style={keystoneStyles.sharingStatLabel}>Avg Ticket</div>
              </div>
            </div>

            {/* Regional Heat Map */}
            <h4 style={{ color: colors.text, marginBottom: '16px' }}>Regional Performance Heat Map</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '24px' }}>
              {keystoneHubData.regionalData.map((r, i) => (
                <div key={i} style={{
                  backgroundColor: r.color,
                  borderRadius: '12px',
                  padding: '20px',
                  color: colors.white,
                  cursor: 'pointer',
                  transition: 'transform 0.2s, box-shadow 0.2s'
                }}>
                  <div style={{ fontSize: '12px', opacity: 0.9, marginBottom: '4px' }}>{r.region}</div>
                  <div style={{ fontSize: '28px', fontWeight: '700', marginBottom: '4px' }}>{r.growth}</div>
                  <div style={{ fontSize: '12px', opacity: 0.9 }}>Index: {r.sales}</div>
                  <div style={{ fontSize: '11px', opacity: 0.8, marginTop: '8px' }}>{r.stores} stores</div>
                  <div style={{ display: 'flex', gap: '12px', marginTop: '8px', fontSize: '11px', opacity: 0.9 }}>
                    <span>COGS: {r.cogs}%</span>
                    <span>Labor: {r.labor}%</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Economic Context */}
            <h4 style={{ color: colors.text, marginBottom: '16px' }}>Local Economic Context</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '24px' }}>
              {keystoneHubData.economicData.map((e, i) => (
                <div key={i} style={{
                  backgroundColor: colors.gray,
                  borderRadius: '12px',
                  padding: '16px',
                  borderLeft: `4px solid ${e.impact === 'positive' ? colors.green : colors.orange}`
                }}>
                  <div style={{ fontSize: '12px', color: colors.textLight, marginBottom: '4px' }}>{e.indicator}</div>
                  <div style={{ fontSize: '20px', fontWeight: '700', color: colors.text }}>{e.value}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                    <span style={{ color: e.trend === 'up' ? colors.green : e.trend === 'down' ? colors.red : colors.textLight }}>
                      {e.trend === 'up' ? '↑' : e.trend === 'down' ? '↓' : '→'} {e.change}
                    </span>
                  </div>
                  <div style={{ fontSize: '11px', color: colors.grayDark, marginTop: '6px' }}>{e.insight}</div>
                </div>
              ))}
            </div>

            <h4 style={{ color: colors.text, marginBottom: '16px' }}>Insights from the Network</h4>
            <div style={keystoneStyles.alertItem('success')}>
              <strong>Weather Impact:</strong> Rainy days correlate with +12% delivery orders in your area. Consider staffing up on forecasted rain days.
            </div>
            <div style={keystoneStyles.alertItem('success')}>
              <strong>Local Event:</strong> University football game this Saturday — similar stores see +25% lunch traffic.
            </div>
            <div style={keystoneStyles.alertItem('success')}>
              <strong>Best Practice:</strong> Top performers in your region run breakfast until 11am (not 10:30am). Average +8% breakfast revenue.
            </div>

            <div style={{ marginTop: '24px', padding: '16px', backgroundColor: '#fff3e0', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '24px' }}>🔒</span>
              <div style={{ fontSize: '13px', color: colors.text }}>
                <strong>Privacy First:</strong> All shared data is anonymized. You see patterns and averages, never individual store data. You control what you share.
              </div>
            </div>
          </div>
        )}

        {/* Chat Tab */}
        {activeTab === 'chat' && (
          <div style={keystoneStyles.chatContainer}>
            <div style={keystoneStyles.chatMessages}>
              <div style={keystoneStyles.chatMessage(true)}>
                <div style={keystoneStyles.chatBubble(true)}>
                  <strong>Keystone AI</strong><br/><br/>
                  Good morning! I'm your AI assistant. I can help you understand your business performance, compare metrics, and identify opportunities. What would you like to know?
                </div>
              </div>
              <div style={keystoneStyles.chatMessage(false)}>
                <div style={keystoneStyles.chatBubble(false)}>
                  Why was my SPLH low yesterday?
                </div>
              </div>
              <div style={keystoneStyles.chatMessage(true)}>
                <div style={keystoneStyles.chatBubble(true)}>
                  <strong>SPLH Analysis — Wednesday Nov 27:</strong><br/><br/>
                  Your SPLH was $48 (vs $60 target). Here's the breakdown:<br/><br/>
                  <strong>Revenue:</strong> $1,420 (down 18% from typical Wednesday)<br/>
                  <strong>Labor Hours:</strong> 29.6 hrs (normal scheduling)<br/><br/>
                  <strong>Contributing factors:</strong><br/>
                  • Pre-Thanksgiving slowdown — traffic down across region<br/>
                  • Afternoon shift overstaffed (3 crew, only needed 2)<br/>
                  • $54 SPLH at lunch, but $38 from 2-5pm<br/><br/>
                  <strong>Recommendation:</strong> Consider cutting 1 afternoon shift on holiday-adjacent days. Similar stores saw same pattern.
                </div>
              </div>
            </div>
            <div style={keystoneStyles.chatInputContainer}>
              <input
                type="text"
                style={keystoneStyles.chatInput}
                placeholder="Ask anything about your business..."
              />
              <button style={keystoneStyles.chatSend}>Send</button>
            </div>
            <div style={keystoneStyles.suggestedQuestions}>
              <span style={{ fontSize: '12px', color: colors.textLight }}>Try asking:</span>
              <button style={keystoneStyles.suggestedQ}>What's my SPLH by daypart?</button>
              <button style={keystoneStyles.suggestedQ}>Compare my labor % to region</button>
              <button style={keystoneStyles.suggestedQ}>How did price changes affect tickets?</button>
              <button style={keystoneStyles.suggestedQ}>Which shifts are overstaffed?</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ============================================
// MAIN APP
// ============================================
function App() {
  const [view, setView] = useState('presentation')

  return (
    <div style={styles.app}>
      <header style={styles.header}>
        <div style={styles.logo}>
          <div>
            <h1 style={styles.logoText}>SUBWAY 2.0</h1>
            <div style={styles.logoSubtext}>Strategic Transformation</div>
          </div>
        </div>
        <nav style={styles.nav}>
          <button
            style={styles.navButton(view === 'presentation')}
            onClick={() => setView('presentation')}
          >
            📽️ Presentation
          </button>
          <button
            style={styles.navButton(view === 'dashboard')}
            onClick={() => setView('dashboard')}
          >
            📊 Dashboard
          </button>
          <button
            style={styles.navButton(view === 'deepdive')}
            onClick={() => setView('deepdive')}
          >
            🔍 Deep Dive
          </button>
          <button
            style={styles.navButton(view === 'keystone')}
            onClick={() => setView('keystone')}
          >
            🧠 {keystoneHubData.brandName}
          </button>
        </nav>
      </header>

      <main style={styles.main}>
        {view === 'dashboard' && <Dashboard />}
        {view === 'deepdive' && <DeepDive />}
        {view === 'presentation' && <Presentation />}
        {view === 'keystone' && <KeystoneHubPage />}
      </main>
    </div>
  )
}

export default App
