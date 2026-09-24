export default {
  name: 'property',
  title: 'Properties',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Property Title',
      type: 'string',
      description: 'e.g. The Skyrise Penthouse, Roswell Modern Estate',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'propertyType',
      title: 'Property Type',
      type: 'string',
      options: {
        list: [
          { title: 'Villa', value: 'Villa' },
          { title: 'Penthouse', value: 'Penthouse' },
          { title: 'Modern Estate', value: 'Modern Estate' },
          { title: 'Waterfront', value: 'Waterfront' },
          { title: 'Mansion', value: 'Mansion' },
          { title: 'Townhouse', value: 'Townhouse' },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'For Sale', value: 'For Sale' },
          { title: 'Pending', value: 'Pending' },
          { title: 'Sold / Leased', value: 'Sold / Leased' },
          { title: 'Off-Market', value: 'Off-Market' },
        ],
      },
      initialValue: 'For Sale',
    },
    {
      name: 'price',
      title: 'Price (USD)',
      type: 'number',
      description: 'Numerical asking price in USD.',
      hidden: ({ document }) => document?.priceDisplayMode === 'request',
    },
    {
      name: 'priceDisplayMode',
      title: 'Price Display Mode',
      type: 'string',
      options: {
        list: [
          { title: 'Show Fixed Price', value: 'fixed' },
          { title: 'Price on Request', value: 'request' },
        ],
      },
      initialValue: 'fixed',
    },
    {
      name: 'isFeatured',
      title: 'Show in Exclusive / Featured Portfolio?',
      type: 'boolean',
      description: 'If toggled, this residence will be highlighted on the home page.',
      initialValue: false,
    },
    {
      name: 'isSold',
      title: 'Mark as Sold / Off-Market?',
      type: 'boolean',
      description: 'If toggled, this property will appear as Sold / Archived.',
      initialValue: false,
    },
    {
      name: 'location',
      title: 'Location Details',
      type: 'object',
      fields: [
        { name: 'neighborhood', title: 'Neighborhood / Community', type: 'string', description: 'e.g. Historic Roswell, Buckhead, Lake Lanier' },
        { name: 'city', title: 'City', type: 'string', initialValue: 'Roswell' },
        { name: 'state', title: 'State', type: 'string', initialValue: 'GA' },
      ],
    },
    {
      name: 'specifications',
      title: 'Property Specifications',
      type: 'object',
      fields: [
        { name: 'bedrooms', title: 'Bedrooms', type: 'number' },
        { name: 'bathrooms', title: 'Bathrooms', type: 'number' },
        { name: 'sqft', title: 'Living Space (Sq Ft)', type: 'number' },
        { name: 'lotSize', title: 'Lot Size', type: 'string', description: 'e.g. 0.85 Acres' },
        { name: 'yearBuilt', title: 'Year Built', type: 'number' },
        { name: 'garageSpaces', title: 'Garage / Parking Spaces', type: 'number' },
      ],
    },
    {
      name: 'features',
      title: 'Key Features & Amenities',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
      description: 'e.g. Infinity Pool, Wine Cellar, Smart Home, Panoramic Views, Spa, Private Cinema',
    },
    {
      name: 'mainImage',
      title: 'Main Architectural Image',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'gallery',
      title: 'Property Gallery',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      options: {
        layout: 'grid',
      },
    },
    {
      name: 'description',
      title: 'Architectural & Lifestyle Narrative',
      type: 'text',
      rows: 5,
      description: 'Rich narrative detailing architecture, materials, and lifestyle.',
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'propertyType',
      media: 'mainImage',
    },
  },
};
