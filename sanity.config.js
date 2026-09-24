import React from 'react';
import { defineConfig, buildLegacyTheme } from 'sanity';
import { structureTool } from 'sanity/structure';
import { Building2, Home, CheckCircle2, Tags, Layers } from 'lucide-react';
import property from './schemas/property';
import category from './schemas/category';

// Luxury Brand Palette (Obsidian & Champagne Gold)
const props = {
  '--laval-black': '#0B0C0E',
  '--laval-surface': '#14161D',
  '--laval-surface-card': '#1B1E28',
  '--laval-white': '#FFFFFF',
  '--laval-text-muted': '#94A3B8',
  '--laval-gold': '#D4AF37',
  '--laval-gold-hover': '#DFBE52',
  '--laval-emerald': '#10B981',
  '--laval-amber': '#F59E0B',
  '--laval-ruby': '#EF4444',
};

export const luxuryTheme = buildLegacyTheme({
  /* Base theme colors */
  '--black': props['--laval-black'],
  '--white': props['--laval-white'],

  '--gray': props['--laval-text-muted'],
  '--gray-base': props['--laval-surface-card'],

  '--component-bg': props['--laval-surface'],
  '--component-text-color': props['--laval-white'],

  /* Brand */
  '--brand-primary': props['--laval-gold'],

  /* Default button */
  '--default-button-color': props['--laval-surface-card'],
  '--default-button-primary-color': props['--laval-gold'],
  '--default-button-success-color': props['--laval-emerald'],
  '--default-button-warning-color': props['--laval-amber'],
  '--default-button-danger-color': props['--laval-ruby'],

  /* State */
  '--state-info-color': props['--laval-gold'],
  '--state-success-color': props['--laval-emerald'],
  '--state-warning-color': props['--laval-amber'],
  '--state-danger-color': props['--laval-ruby'],

  /* Navbar */
  '--main-navigation-color': props['--laval-black'],
  '--main-navigation-color--inverted': props['--laval-white'],

  '--focus-color': props['--laval-gold'],
});

const LavalStudioLogo = () =>
  React.createElement(
    'div',
    { style: { display: 'flex', alignItems: 'center', gap: '10px', padding: '4px 6px' } },
    React.createElement('img', {
      src: '/logo-light.webp',
      alt: 'Laval Luxury Homes',
      style: { height: '26px', width: 'auto', objectFit: 'contain' },
      onError: (e) => {
        e.currentTarget.style.display = 'none';
      },
    }),
    React.createElement(
      'div',
      { style: { display: 'flex', flexDirection: 'column', lineHeight: 1.2 } },
      React.createElement(
        'span',
        { style: { fontSize: '13px', fontWeight: '700', letterSpacing: '0.08em', color: '#FFFFFF' } },
        'LAVAL LUXURY HOMES'
      ),
      React.createElement(
        'span',
        { style: { fontSize: '9px', fontWeight: '600', letterSpacing: '0.18em', color: '#D4AF37', textTransform: 'uppercase' } },
        'PROPERTIES & CATEGORIES DASHBOARD'
      )
    )
  );

export default defineConfig({
  name: 'default',
  title: 'Laval Luxury Homes | Studio',
  theme: luxuryTheme,

  projectId: 'g983wkxj',
  dataset: 'production',
  basePath: '/studio',
  releases: {
    enabled: false,
  },
  scheduledDrafts: {
    enabled: false,
  },
  tools: (prev) => prev.filter((tool) => tool.name !== 'releases'),

  studio: {
    components: {
      logo: LavalStudioLogo,
    },
  },

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Executive Studio Menu')
          .items([
            // 1. All Properties
            S.listItem()
              .title('All Residences')
              .icon(Building2)
              .child(
                S.documentList()
                  .title('All Residences (Add / Edit / Delete)')
                  .filter('_type == "property"')
                  .defaultOrdering([{ field: '_createdAt', direction: 'desc' }])
              ),

            // 2. Active Residences
            S.listItem()
              .title('Active (For Sale)')
              .icon(Home)
              .child(
                S.documentList()
                  .title('Active Portfolio (For Sale)')
                  .filter('_type == "property" && (isSold != true || !defined(isSold))')
                  .defaultOrdering([{ field: '_createdAt', direction: 'desc' }])
              ),

            // 3. Sold / Closed
            S.listItem()
              .title('Sold & Off-Market')
              .icon(CheckCircle2)
              .child(
                S.documentList()
                  .title('Sold & Off-Market Residences')
                  .filter('_type == "property" && (isSold == true || status == "Sold / Leased")')
                  .defaultOrdering([{ field: '_createdAt', direction: 'desc' }])
              ),

            S.divider(),

            // 4. Categories Management
            S.listItem()
              .title('Property Categories')
              .icon(Tags)
              .child(
                S.documentList()
                  .title('Categories (Add / Edit / Delete)')
                  .filter('_type == "category"')
                  .defaultOrdering([{ field: 'order', direction: 'asc' }])
              ),
          ]),
    }),
  ],

  schema: {
    types: [
      property,
      category,
    ],
  },
});
