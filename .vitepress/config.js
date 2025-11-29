import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Subway Transformation',
  description: 'Strategic Documentation for the Subway Comeback',

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/subway-icon.svg' }]
  ],

  themeConfig: {
    logo: '/subway-icon.svg',

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Strategy', link: '/docs/UNIFIED_NARRATIVE' },
      { text: 'Deep Dive', link: '/docs/DEEP_DIVE' },
      { text: 'Architecture', link: '/docs/PLANNING_ARCHITECTURE' }
    ],

    sidebar: [
      {
        text: 'Overview',
        items: [
          { text: 'Introduction', link: '/' },
          { text: 'Changelog', link: '/CHANGELOG' }
        ]
      },
      {
        text: 'Strategic Framework',
        items: [
          { text: 'Unified Narrative', link: '/docs/UNIFIED_NARRATIVE' },
          { text: 'Planning Architecture', link: '/docs/PLANNING_ARCHITECTURE' },
          { text: 'Deep Dive (OS & Community)', link: '/docs/DEEP_DIVE' }
        ]
      },
      {
        text: 'Operational Docs',
        items: [
          { text: 'KPI Catalog', link: '/docs/KPI_CATALOG' },
          { text: 'Data Governance', link: '/docs/DATA_GOVERNANCE' },
          { text: 'Franchisee Incentives', link: '/docs/FRANCHISEE_INCENTIVES_MENU' },
          { text: 'Supply Chain OS', link: '/docs/SUPPLY_CHAIN_OS_TEMPLATE' }
        ]
      },
      {
        text: 'Reference',
        items: [
          { text: 'Ecosystem Map', link: '/reference/ecosystem_map' },
          { text: 'Related Projects', link: '/reference/related_projects' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/alexlanghans-bit/subway_v2' }
    ],

    footer: {
      message: 'Subway Transformation Initiative',
      copyright: 'Strategic Documentation'
    },

    search: {
      provider: 'local'
    },

    outline: {
      level: [2, 3]
    }
  },

  markdown: {
    theme: {
      light: 'github-light',
      dark: 'github-dark'
    }
  }
})
