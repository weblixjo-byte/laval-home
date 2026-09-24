export default {
  name: 'propertyType',
  title: 'Property Types & Categories',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Category / Collection Name',
      type: 'string',
      description: 'e.g. Villas, Penthouses, Estates, Waterfront',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which this collection appears in the navigation filter',
    },
    {
      name: 'description',
      title: 'Category Summary',
      type: 'text',
      rows: 2,
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'order',
    },
  },
};
