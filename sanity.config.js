import { defineConfig, buildLegacyTheme } from 'sanity';
import { structureTool } from 'sanity/structure';
import property from './schemas/property';

const props = {
  '--laval-white': '#ffffff',
  '--laval-black': '#0D0E10',
  '--laval-grey': '#f8f9fa',
  '--laval-accent': '#D4AF37',
};

export const myTheme = buildLegacyTheme({
  /* Base theme colors */
  '--black': props['--laval-black'],
  '--white': props['--laval-white'],

  '--gray': '#8e8e93',
  '--gray-base': '#8e8e93',

  '--component-bg': props['--laval-white'],
  '--component-text-color': props['--laval-black'],

  /* Brand */
  '--brand-primary': props['--laval-accent'],

  /* Default button */
  '--default-button-color': '#555',
  '--default-button-primary-color': props['--laval-accent'],
  '--default-button-success-color': '#2e7d32',
  '--default-button-warning-color': '#ed6c02',
  '--default-button-danger-color': '#d32f2f',

  /* State */
  '--state-info-color': props['--laval-accent'],
  '--state-success-color': '#2e7d32',
  '--state-warning-color': '#ed6c02',
  '--state-danger-color': '#d32f2f',

  /* Navbar */
  '--main-navigation-color': props['--laval-white'],
  '--main-navigation-color--inverted': props['--laval-black'],

  '--focus-color': props['--laval-accent'],
});

export default defineConfig({
  name: 'default',
  title: 'Laval Luxury Homes | Properties Manager',
  theme: myTheme,

  projectId: 'g983wkxj',
  dataset: 'production',
  basePath: '/studio',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Portfolio Management')
          .items([
            S.documentTypeListItem('property').title('Properties (Add / Edit / Sold)'),
          ]),
    }),
  ],

  schema: {
    types: [
      property,
    ],
  },
});
