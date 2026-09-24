export default {
  name: 'property',
  title: 'Properties',
  type: 'document',
  groups: [
    { name: 'overview', title: '1. Overview / النظرة العامة', default: true },
    { name: 'pricing', title: '2. Pricing & Status / السعر والحالة' },
    { name: 'media', title: '3. Media & Gallery / الصور والمعرض' },
    { name: 'specs', title: '4. Specs & Amenities / المواصفات والميزات' },
    { name: 'location', title: '5. Location / الموقع' },
    { name: 'narrative', title: '6. Narrative / الوصف المعماري' },
  ],
  fields: [
    // --- 1. OVERVIEW ---
    {
      name: 'title',
      title: 'Property Title / عنوان العقار',
      type: 'string',
      group: 'overview',
      description: 'e.g. The Skyrise Penthouse, Buckhead Modern Estate, Lake Lanier Sanctuary',
      validation: (Rule) => Rule.required().error('Property title is required / عنوان العقار مطلوب'),
    },
    {
      name: 'slug',
      title: 'Slug / الرابط الدلالي',
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
      validation: (Rule) => Rule.required().error('Slug is required / الرابط الدلالي مطلوب'),
    },
    {
      name: 'category',
      title: 'Category / التصنيف',
      type: 'reference',
      to: [{ type: 'category' }],
      group: 'overview',
      description: 'اختر تصنيف العقار من قائمة التصنيفات التي قمت بإنشائها.',
    },
    {
      name: 'propertyType',
      title: 'Category Label (Fallback / يدوي)',
      type: 'string',
      group: 'overview',
      description: 'يمكنك كتابة تصنيف يدوي هنا إذا لم ترغب بربطه بتصنيف مسجل في قائمة التصنيفات.',
    },
    {
      name: 'isSold',
      title: 'Mark as Sold / تم البيع (Off-Market)',
      type: 'boolean',
      group: 'overview',
      description: 'عند تفعيل هذا الخيار، سيتم عرض العقار تلقائياً كعقار تم بيعه وإخفاؤه من العقارات المعروضة للبيع.',
      initialValue: false,
    },
    {
      name: 'isFeatured',
      title: 'Featured Residence / عقار مميز بالصفحة الرئيسية',
      type: 'boolean',
      group: 'overview',
      description: 'تثبيت العقار في قسم العقارات المميزة في الصفحة الرئيسية.',
      initialValue: false,
    },

    // --- 2. PRICING & STATUS ---
    {
      name: 'status',
      title: 'Market Status / حالة العقار',
      type: 'string',
      group: 'pricing',
      options: {
        list: [
          { title: 'For Sale / معروض للبيع', value: 'For Sale' },
          { title: 'Pending / قيد التفاوض والتعاقد', value: 'Pending' },
          { title: 'Sold / Leased / تم البيع أو التأجير', value: 'Sold / Leased' },
          { title: 'Off-Market / خارج العرض العام', value: 'Off-Market' },
        ],
      },
      initialValue: 'For Sale',
    },
    {
      name: 'priceDisplayMode',
      title: 'Price Display / طريقة عرض السعر',
      type: 'string',
      group: 'pricing',
      options: {
        list: [
          { title: 'Show Fixed Price / إظهار السعر المحدد', value: 'fixed' },
          { title: 'Price on Request / السعر عند الطلب (سري)', value: 'request' },
        ],
      },
      initialValue: 'fixed',
    },
    {
      name: 'price',
      title: 'Price (USD) / السعر بالدولار',
      type: 'number',
      group: 'pricing',
      description: 'القيمة المالية للعقار بالدولار الأمريكي (USD).',
      hidden: ({ document }) => document?.priceDisplayMode === 'request',
    },

    // --- 3. MEDIA & GALLERY ---
    {
      name: 'mainImage',
      title: 'Main Architectural Image / الصورة الرئيسية',
      type: 'image',
      group: 'media',
      options: { hotspot: true },
      validation: (Rule) => Rule.required().error('Main image is required / الصورة الرئيسية مطلوبة'),
    },
    {
      name: 'gallery',
      title: 'Property Gallery / ألبوم صور العقار',
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
      title: 'Property Specifications / المواصفات الفنية',
      type: 'object',
      group: 'specs',
      fields: [
        { name: 'bedrooms', title: 'Bedrooms / غرف النوم', type: 'number' },
        { name: 'bathrooms', title: 'Bathrooms / دورات المياه', type: 'number' },
        { name: 'sqft', title: 'Living Space (Sq Ft) / المساحة الداخلية بالقدم المربع', type: 'number' },
        { name: 'lotSize', title: 'Lot Size / مساحة الأرض الإجمالية', type: 'string', description: 'e.g. 0.85 Acres, 1.2 Hectares' },
        { name: 'yearBuilt', title: 'Year Built / سنة البناء', type: 'number' },
        { name: 'garageSpaces', title: 'Garage / عدد مواقف السيارات', type: 'number' },
      ],
    },
    {
      name: 'features',
      title: 'Key Features & Amenities / الميزات والخدمات',
      type: 'array',
      group: 'specs',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
      description: 'اكتب الميزة واضغط Enter، مثال: Infinity Pool, Smart Home Automation, Private Elevator, Wine Cellar, Spa',
    },

    // --- 5. LOCATION ---
    {
      name: 'location',
      title: 'Location Details / تفاصيل الموقع',
      type: 'object',
      group: 'location',
      fields: [
        { name: 'neighborhood', title: 'Neighborhood / الحي أو المنطقة', type: 'string', description: 'e.g. Historic Roswell, Buckhead, Tuxedo Park' },
        { name: 'city', title: 'City / المدينة', type: 'string', initialValue: 'Roswell' },
        { name: 'state', title: 'State / الولاية أو المقاطعة', type: 'string', initialValue: 'GA' },
      ],
    },

    // --- 6. NARRATIVE ---
    {
      name: 'description',
      title: 'Architectural & Lifestyle Narrative / الوصف المعماري الكامل',
      type: 'text',
      group: 'narrative',
      rows: 6,
      description: 'وصف تفصيلي للتصميم المعماري، المواد المستخدمة، والإطلالات الفاخرة.',
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
      if (isSold) badges.push('🔴 [SOLD]');
      if (isFeatured) badges.push('⭐ [FEATURED]');

      return {
        title: `${badges.length ? badges.join(' ') + ' ' : ''}${title || 'Untitled Property'}`,
        subtitle: `${type} • ${formattedPrice}`,
        media,
      };
    },
  },
};
