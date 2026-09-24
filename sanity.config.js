import { defineConfig, buildLegacyTheme } from 'sanity';
import { structureTool } from 'sanity/structure';
import property from './schemas/property';
import propertyType from './schemas/propertyType';
import review from './schemas/review';
import financeApplication from './schemas/financeApplication';
import siteSettings from './schemas/siteSettings';
import pageAbout from './schemas/pageAbout';
import pageFinancing from './schemas/pageFinancing';
import pageServices from './schemas/pageServices';

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
  title: 'Laval Luxury Homes | Admin Desk',
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
            S.documentTypeListItem('property').title('Properties (Inventory)'),
            S.documentTypeListItem('propertyType').title('Property Types & Locations'),
            S.documentTypeListItem('financeApplication').title('Mortgage Pre-Approvals'),
            S.documentTypeListItem('review').title('Testimonials'),
            S.divider(),
            S.documentTypeListItem('siteSettings').title('Site Settings'),
            S.documentTypeListItem('pageAbout').title('About Page Settings'),
            S.documentTypeListItem('pageServices').title('Services Page Settings'),
            S.documentTypeListItem('pageFinancing').title('Mortgage Page Settings'),
          ]),
    }),
  ],

  schema: {
    types: [
      property,
      propertyType,
      financeApplication,
      review,
      siteSettings,
      pageAbout,
      pageServices,
      pageFinancing,
    ],
  },
});
