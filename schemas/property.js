export default {
  name: 'property',
  title: 'Properties',
  type: 'document',
  groups: [
    { name: 'overview', title: '1. Overview', default: true },
    { name: 'pricing', title: '2. Pricing & Status' },
    { name: 'media', title: '3. Media & Gallery' },
    { name: 'specs', title: '4. Specs & Amenities' },
    { name: 'location', title: '5. Location' },
    { name: 'narrative', title: '6. Narrative' },
  ],
  fields: [
    // --- 1. OVERVIEW ---
    {
      name: 'title',
      title: 'Property Title',
      type: 'string',
      group: 'overview',
      description: 'e.g. The Skyrise Penthouse, Buckhead Modern Estate, Lake Lanier Sanctuary',
      validation: (Rule) => Rule.required().error('Property title is required'),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'overview',
      options: {
        source: 'title',
        maxLength: 96,
        slugify: (input) =>
          input
            .toLowerCase()
            .trim()
            .replace(/\s+/g, '-')
            .slice(0, 96),
      },
      validation: (Rule) => Rule.required().error('Slug is required'),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      group: 'overview',
      description: 'Select a category from your configured categories list.',
    },
    {
      name: 'propertyType',
      title: 'Category Label (Manual / Fallback)',
      type: 'string',
      group: 'overview',
      description: 'Optional manual category label if not linking to a predefined category document.',
    },
    {
      name: 'isSold',
      title: 'Mark as Sold (Off-Market)',
      type: 'boolean',
      group: 'overview',
      description: 'When enabled, this residence is moved to the Sold portfolio and marked as archived.',
      initialValue: false,
    },
    {
      name: 'isFeatured',
      title: 'Featured Residence',
      type: 'boolean',
      group: 'overview',
      description: 'Highlight this residence in the exclusive portfolio on the homepage.',
      initialValue: false,
    },

    // --- 2. PRICING & STATUS ---
    {
      name: 'status',
      title: 'Market Status',
      type: 'string',
      group: 'pricing',
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
      name: 'priceDisplayMode',
      title: 'Price Display Mode',
      type: 'string',
      group: 'pricing',
      options: {
        list: [
          { title: 'Show Fixed Price', value: 'fixed' },
          { title: 'Price on Request (Confidential)', value: 'request' },
        ],
      },
      initialValue: 'fixed',
    },
    {
      name: 'price',
      title: 'Asking Price (USD)',
      type: 'number',
      group: 'pricing',
      description: 'Asking price in USD.',
      hidden: ({ document }) => document?.priceDisplayMode === 'request',
    },

    // --- 3. MEDIA & GALLERY ---
    {
      name: 'mainImage',
      title: 'Main Architectural Image',
      type: 'image',
      group: 'media',
      options: { hotspot: true },
      validation: (Rule) => Rule.required().error('Main image is required'),
    },
    {
      name: 'gallery',
      title: 'Property Photo Gallery',
      type: 'array',
      group: 'media',
      of: [{ type: 'image', options: { hotspot: true } }],
      options: {
        layout: 'grid',
      },
    },

    // --- 4. SPECS & AMENITIES ---
    {
      name: 'specifications',
      title: 'Property Specifications',
      type: 'object',
      group: 'specs',
      fields: [
        { name: 'bedrooms', title: 'Bedrooms', type: 'number' },
        { name: 'bathrooms', title: 'Bathrooms', type: 'number' },
        { name: 'sqft', title: 'Living Space (Sq Ft)', type: 'number' },
        { name: 'lotSize', title: 'Lot Size', type: 'string', description: 'e.g. 0.85 Acres, 1.2 Hectares' },
        { name: 'yearBuilt', title: 'Year Built', type: 'number' },
        { name: 'garageSpaces', title: 'Garage / Parking Spaces', type: 'number' },
      ],
    },
    {
      name: 'features',
      title: 'Key Features & Amenities',
      type: 'array',
      group: 'specs',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
      description: 'Type amenity and press Enter (e.g. Infinity Pool, Wine Cellar, Smart Home, Private Elevator, Spa)',
    },

    // --- 5. LOCATION ---
    {
      name: 'location',
      title: 'Location Details',
      type: 'object',
      group: 'location',
      fields: [
        { name: 'neighborhood', title: 'Neighborhood / Community', type: 'string', description: 'e.g. Historic Roswell, Buckhead, Tuxedo Park' },
        { name: 'city', title: 'City', type: 'string', initialValue: 'Roswell' },
        { name: 'state', title: 'State', type: 'string', initialValue: 'GA' },
      ],
    },

    // --- 6. NARRATIVE ---
    {
      name: 'description',
      title: 'Architectural & Lifestyle Narrative',
      type: 'text',
      group: 'narrative',
      rows: 6,
      description: 'Comprehensive narrative detailing architectural heritage, interior finishes, and luxury amenities.',
    },
  ],
  preview: {
    select: {
      title: 'title',
      categoryTitle: 'category.title',
      fallbackType: 'propertyType',
      price: 'price',
      priceMode: 'priceDisplayMode',
      isSold: 'isSold',
      isFeatured: 'isFeatured',
      media: 'mainImage',
    },
    prepare({ title, categoryTitle, fallbackType, price, priceMode, isSold, isFeatured, media }) {
      const type = categoryTitle || fallbackType || 'Uncategorized';
      const formattedPrice = priceMode === 'request'
        ? 'Price on Request'
        : price
          ? `$${Number(price).toLocaleString()}`
          : 'No Price';
      
      const badges = [];
      if (isSold) badges.push('[SOLD]');
      if (isFeatured) badges.push('[FEATURED]');

      return {
        title: `${badges.length ? badges.join(' ') + ' ' : ''}${title || 'Untitled Property'}`,
        subtitle: `${type} • ${formattedPrice}`,
        media,
      };
    },
  },
};
