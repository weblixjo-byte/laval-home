export default {
  name: 'category',
  title: 'Categories',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Category Title (اسم التصنيف)',
      type: 'string',
      description: 'e.g. Modern Villa, Penthouse, Waterfront Estate, Luxury Mansion, Townhouse, أراضي استثمارية',
      validation: (Rule) => Rule.required().error('Category title is required / اسم التصنيف مطلوب'),
    },
    {
      name: 'slug',
      title: 'Slug (الرابط الدلالي)',
      type: 'slug',
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
      validation: (Rule) => Rule.required().error('Slug is required / الرابط الدلالي مطلوب'),
    },
    {
      name: 'order',
      title: 'Display Order (ترتيب الظهور)',
      type: 'number',
      description: 'Determines the tab position in the website filter bar (e.g. 1, 2, 3...)',
      initialValue: 1,
    },
    {
      name: 'description',
      title: 'Description (وصف التصنيف - اختياري)',
      type: 'text',
      rows: 2,
      description: 'Short description of properties in this category',
    },
    {
      name: 'image',
      title: 'Category Cover Image (صورة التصنيف - اختياري)',
      type: 'image',
      options: { hotspot: true },
    },
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Title A-Z',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'slug.current',
      order: 'order',
      media: 'image',
    },
    prepare({ title, subtitle, order, media }) {
      return {
        title: title || 'Untitled Category',
        subtitle: subtitle ? `#${order || 1} • /${subtitle}` : `Order: ${order || 1}`,
        media,
      };
    },
  },
};
