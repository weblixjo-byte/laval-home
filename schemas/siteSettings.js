export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Site Title',
      type: 'string',
      initialValue: 'Laval Luxury Homes'
    },
    {
      name: 'navbarLinks',
      title: 'Navbar Categories/Links',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'navbarLink',
          title: 'Navbar Link',
          fields: [
            { name: 'title', title: 'Link Title', type: 'string' },
            { name: 'path', title: 'Path (e.g. /properties?type=Villas or /about)', type: 'string' }
          ]
        }
      ],
    },
    {
      name: 'homeHero',
      title: 'Home Hero Section',
      type: 'object',
      fields: [
        { name: 'title', title: 'Hero Title', type: 'string' },
        { name: 'subtitle', title: 'Hero Subtitle', type: 'string' },
        { name: 'image', title: 'Hero Image', type: 'image', options: { hotspot: true } }
      ]
    },
    {
      name: 'featuredCollection',
      title: 'Featured Collection (Home Page)',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'property' }] }],
    },
    {
      name: 'featuredCategories',
      title: 'Featured Categories & Types',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'propertyType' }] }],
    },
    {
      name: 'homeHeritage',
      title: 'Home Architectural Narrative',
      type: 'object',
      fields: [
        { name: 'title', title: 'Title', type: 'string' },
        { name: 'text', title: 'Text', type: 'text' },
        { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }
      ]
    },
    {
      name: 'contactInfo',
      title: 'Contact Information',
      type: 'object',
      fields: [
        { name: 'generalEmail', title: 'General Inquiries', type: 'string', initialValue: 'concierge@lavalluxuryhomes.com' },
        { name: 'directEmail', title: 'Private Advisory', type: 'string', initialValue: 'advisory@lavalluxuryhomes.com' },
        { name: 'salesPhone', title: 'Acquisition Desk', type: 'string', initialValue: '+1 (404) 790-8336' },
        { name: 'servicePhone', title: 'Client Services', type: 'string', initialValue: '+1 (229) 237-4046' },
        { name: 'address', title: 'Office Address', type: 'string', initialValue: '110 Mansell Cir Suite 306, Roswell GA 30075' }
      ]
    },
    {
      name: 'footerText',
      title: 'Footer Copyright Text',
      type: 'string',
      initialValue: '© 2026 Laval Luxury Homes. All rights reserved.'
    }
  ]
};
