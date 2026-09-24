import { REAL_ESTATE_IMAGES } from './realEstateImages';

export const FALLBACK_PROPERTIES = [
  {
    id: 'prop-skyrise-penthouse',
    title: 'The Skyrise Penthouse',
    propertyType: 'Penthouse',
    status: 'For Sale',
    price: 4850000,
    priceDisplayMode: 'fixed',
    isFeatured: true,
    isSold: false,
    location: {
      neighborhood: 'Downtown Skyline',
      city: 'Atlanta',
      state: 'GA'
    },
    specifications: {
      bedrooms: 4,
      bathrooms: 5,
      sqft: 5400,
      lotSize: 'Wrap-Around Sky Deck',
      yearBuilt: 2024,
      garageSpaces: 3
    },
    features: [
      '360° Panoramic City Views',
      'Private Keyed Elevator',
      'Temperature-Controlled Wine Room',
      'Poliform Italian Custom Cabinetry',
      'Calacatta Gold Marble Fireplace',
      'Heated Outdoor Terrace Spa'
    ],
    mainImage: REAL_ESTATE_IMAGES.skyrisePenthouse,
    gallery: [
      REAL_ESTATE_IMAGES.livingDoubleHeight,
      REAL_ESTATE_IMAGES.kitchenMarble,
      REAL_ESTATE_IMAGES.masterSuiteSanctuary,
      REAL_ESTATE_IMAGES.terraceSkyline,
      REAL_ESTATE_IMAGES.wineCellar,
      REAL_ESTATE_IMAGES.spaBathroom
    ],
    description: `Occupying the premier top two levels of Atlanta's most coveted residential tower, The Skyrise Penthouse is an uncompromising architectural statement. Floor-to-ceiling curtain glass walls flood the 22-foot double-height salon with natural light and frame uninterrupted panoramic city vistas. 

Finishes include vein-matched Calacatta marble, custom acoustic oak millwork, Gaggenau 400 Series culinary appliances, and a private sky terrace equipped with heated limestone flooring and an infinity hydrotherapy plunge spa.`
  },
  {
    id: 'prop-roswell-modern-estate',
    title: 'Roswell Modernist Estate',
    propertyType: 'Modern Estate',
    status: 'For Sale',
    price: 3650000,
    priceDisplayMode: 'fixed',
    isFeatured: true,
    isSold: false,
    location: {
      neighborhood: 'Historic Roswell',
      city: 'Roswell',
      state: 'GA'
    },
    specifications: {
      bedrooms: 6,
      bathrooms: 7,
      sqft: 7200,
      lotSize: '1.45 Secluded Acres',
      yearBuilt: 2023,
      garageSpaces: 4
    },
    features: [
      'Infinity-Edge Saltwater Pool',
      'Full Crestron Smart Home Automation',
      'Dual Chef Culinary Kitchens',
      'Primary Spa Suite with Steam Shower',
      'Outdoor Kitchen Pavilion',
      'Gated Private Woodland Drive'
    ],
    mainImage: REAL_ESTATE_IMAGES.modernEstateRoswell,
    gallery: [
      REAL_ESTATE_IMAGES.heroVillaTwilight,
      REAL_ESTATE_IMAGES.kitchenMarble,
      REAL_ESTATE_IMAGES.livingDoubleHeight,
      REAL_ESTATE_IMAGES.reflectionPoolCourtyard,
      REAL_ESTATE_IMAGES.spaBathroom,
      REAL_ESTATE_IMAGES.wineCellar
    ],
    description: `Set discreetly behind a private automated gate amidst 1.45 acres of mature Roswell hardwoods, this custom contemporary estate redefines modern luxury living. The floor plan dissolves the boundary between indoors and nature with 14-foot motorized Fleetwood sliding glass pockets opening directly to a zero-edge reflection pool.

A dual kitchen setup—with a showpiece marble island and an enclosed secondary catering prep scullery—caters to grand-scale entertaining. The primary wing is an oasis featuring acoustic slat oak walls, dual dressing rooms, and an outdoor courtyard shower.`
  },
  {
    id: 'prop-lake-lanier-waterfront',
    title: 'The Peninsula Waterfront Villa',
    propertyType: 'Waterfront',
    status: 'For Sale',
    price: 5200000,
    priceDisplayMode: 'fixed',
    isFeatured: true,
    isSold: false,
    location: {
      neighborhood: 'North Peninsula',
      city: 'Gainesville',
      state: 'GA'
    },
    specifications: {
      bedrooms: 5,
      bathrooms: 6,
      sqft: 6850,
      lotSize: '2.10 Waterfront Acres',
      yearBuilt: 2022,
      garageSpaces: 3
    },
    features: [
      'Private Deep-Water Two-Slip Dock',
      'Resort Infinity Pool & Lake Sunset Views',
      'Detached Lakefront Guest Residence',
      'Outdoor Dining Loggia with Fireplace',
      'Climate-Controlled 1,000-Bottle Cellar',
      'Private Boat Ramp'
    ],
    mainImage: REAL_ESTATE_IMAGES.lakeLanierWaterfront,
    gallery: [
      REAL_ESTATE_IMAGES.heroWaterfront,
      REAL_ESTATE_IMAGES.terraceSkyline,
      REAL_ESTATE_IMAGES.livingDoubleHeight,
      REAL_ESTATE_IMAGES.masterSuiteSanctuary,
      REAL_ESTATE_IMAGES.kitchenMarble,
      REAL_ESTATE_IMAGES.wineCellar
    ],
    description: `Perched on a commanding point with over 380 feet of shoreline, The Peninsula Villa provides an idyllic lakefront compound experience. Designed by renowned modernist architects, the residence features Brazilian Ipe decking, board-formed architectural concrete, and expansive limestone terraces.

A private double-decker dock with electric lifts accommodates multiple watercraft. Inside, soaring ceilings, automated solar louvers, and a sommelier-curated wine tasting lounge create a sanctuary for relaxation.`
  },
  {
    id: 'prop-buckhead-contemporary',
    title: 'Tuxedo Park Contemporary Villa',
    propertyType: 'Villa',
    status: 'For Sale',
    price: 4100000,
    priceDisplayMode: 'fixed',
    isFeatured: true,
    isSold: false,
    location: {
      neighborhood: 'Buckhead / Tuxedo Park',
      city: 'Atlanta',
      state: 'GA'
    },
    specifications: {
      bedrooms: 5,
      bathrooms: 6,
      sqft: 6100,
      lotSize: '0.92 Landscaped Acres',
      yearBuilt: 2023,
      garageSpaces: 3
    },
    features: [
      'Inner Zen Courtyard & Water Feature',
      'Private Wellness Spa & Sauna',
      'Zero-Threshold Glass Pivot Doors',
      'Custom Boffi Bathrooms',
      'Sub-Zero / Wolf Gourmet Suite',
      'Security Compound Perimeter'
    ],
    mainImage: REAL_ESTATE_IMAGES.buckheadContemporary,
    gallery: [
      REAL_ESTATE_IMAGES.roswellHardwoodEstate,
      REAL_ESTATE_IMAGES.reflectionPoolCourtyard,
      REAL_ESTATE_IMAGES.kitchenMarble,
      REAL_ESTATE_IMAGES.spaBathroom,
      REAL_ESTATE_IMAGES.livingDoubleHeight
    ],
    description: `Positioned in prestigious Tuxedo Park, this residence represents clean European minimalism at its pinnacle. Designed around a central courtyard featuring Japanese maples and reflecting pools, the home offers complete serenity in the heart of Buckhead.

Highlights include 11-foot custom pivot doors, integrated hidden linear diffusers, automated concealed motorized shades, and a private wellness wing featuring a Finnish cedar sauna and cold plunge.`
  },
  {
    id: 'prop-milton-equestrian-estate',
    title: 'Milton Equestrian Modern Manor',
    propertyType: 'Mansion',
    status: 'For Sale',
    price: 6450000,
    priceDisplayMode: 'fixed',
    isFeatured: false,
    isSold: false,
    location: {
      neighborhood: 'Birmingham Crossroads',
      city: 'Milton',
      state: 'GA'
    },
    specifications: {
      bedrooms: 7,
      bathrooms: 9,
      sqft: 9800,
      lotSize: '5.20 Pasture Acres',
      yearBuilt: 2023,
      garageSpaces: 6
    },
    features: [
      '5.2 Pasture Acres with Fencing',
      'Custom 4-Stall Barn & Riding Arena',
      'Olympic-Length Swimming Pool',
      'Screening Cinema Room',
      'Full Separate Carriage House',
      'Geothermal Energy Heating'
    ],
    mainImage: REAL_ESTATE_IMAGES.miltonEquestrianVilla,
    gallery: [
      REAL_ESTATE_IMAGES.heroHillside,
      REAL_ESTATE_IMAGES.livingDoubleHeight,
      REAL_ESTATE_IMAGES.kitchenMarble,
      REAL_ESTATE_IMAGES.masterSuiteSanctuary,
      REAL_ESTATE_IMAGES.wineCellar
    ],
    description: `A masterclass in modern agrarian architecture, this Milton estate merges sprawling pasture tranquility with cutting-edge residential technology. The main manor features soaring timber-beamed cathedral ceilings, honed limestone hearths, and seamless transitional living verandas.

The grounds include a designer 4-stall equestrian facility, climate-controlled tack room, lighted regulation arena, and an executive carriage guest house with a private entrance.`
  },
  {
    id: 'prop-chastain-glass-residence',
    title: 'Chastain Park Glass Pavilion',
    propertyType: 'Modern Estate',
    status: 'Pending',
    price: 3250000,
    priceDisplayMode: 'fixed',
    isFeatured: false,
    isSold: false,
    location: {
      neighborhood: 'Chastain Park',
      city: 'Atlanta',
      state: 'GA'
    },
    specifications: {
      bedrooms: 4,
      bathrooms: 5,
      sqft: 4800,
      lotSize: '0.75 Acres',
      yearBuilt: 2024,
      garageSpaces: 3
    },
    features: [
      'Cantilevered Glass Architecture',
      'Heated Saltwater Lap Pool',
      'Rooftop Stargazing Lounge',
      'Dornbracht Platinum Fixtures',
      'Level 5 Smooth Wall Finishes'
    ],
    mainImage: REAL_ESTATE_IMAGES.chastainParkModern,
    gallery: [
      REAL_ESTATE_IMAGES.modernEstateRoswell,
      REAL_ESTATE_IMAGES.livingDoubleHeight,
      REAL_ESTATE_IMAGES.terraceSkyline,
      REAL_ESTATE_IMAGES.kitchenMarble
    ],
    description: `Under contract with private advisory representation. A structural masterpiece of cantilevers and floating glass planes nestled on a wooded hillside overlooking Chastain Park.`
  },
  {
    id: 'prop-historic-roswell-villa',
    title: 'The Mill Creek Architectural Villa',
    propertyType: 'Villa',
    status: 'Sold / Leased',
    price: 2890000,
    priceDisplayMode: 'fixed',
    isFeatured: false,
    isSold: true,
    location: {
      neighborhood: 'Historic District',
      city: 'Roswell',
      state: 'GA'
    },
    specifications: {
      bedrooms: 4,
      bathrooms: 4,
      sqft: 4300,
      lotSize: '0.65 Acres',
      yearBuilt: 2022,
      garageSpaces: 2
    },
    features: [
      'Historic District Location',
      'Modern Courtyard Design',
      'Sold at Record PSF by Laval Luxury Homes'
    ],
    mainImage: REAL_ESTATE_IMAGES.tuxedoParkManor,
    gallery: [
      REAL_ESTATE_IMAGES.roswellHardwoodEstate,
      REAL_ESTATE_IMAGES.livingDoubleHeight,
      REAL_ESTATE_IMAGES.spaBathroom
    ],
    description: `Successfully transacted off-market by Laval Luxury Homes Private Advisory. Represented both buyer and seller in a discreet, confidential closing.`
  }
];
