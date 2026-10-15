import { Shelter, EmergencyContact, FloodAlert } from '../types';

export const INITIAL_SHELTERS: Shelter[] = [
  {
    id: 'sh-01',
    name: 'Government Model Higher Secondary School Relief Camp',
    type: 'Official Relief Camp',
    address: 'High School Road, Central Ridge Zone',
    city: 'Silchar',
    state: 'Assam',
    lat: 24.8250,
    lng: 92.7950,
    contactNumber: '+91 3842 245671',
    capacity: 450,
    currentOccupancy: 285,
    status: 'Open & Operational',
    isVerified: true,
    isDemoData: true,
    lastVerified: '15 mins ago',
    elevationMeters: 42,
    wheelchairAccessible: true,
    facilities: [
      'Clean Drinking Water',
      'First Aid & Tetanus Vaccines',
      'Dry Food Rations',
      'Solar Power Phone Charging',
      'Baby Care & Milk Supplies',
      'Sanitary Facilities'
    ]
  },
  {
    id: 'sh-02',
    name: 'District Community Hall & Indoor Sports Complex',
    type: 'Safe Shelter',
    address: 'Station Road, North Hill Sector',
    city: 'Silchar',
    state: 'Assam',
    lat: 24.8450,
    lng: 92.8100,
    contactNumber: '+91 3842 247890',
    capacity: 600,
    currentOccupancy: 410,
    status: 'Open & Operational',
    isVerified: true,
    isDemoData: true,
    lastVerified: '30 mins ago',
    elevationMeters: 48,
    wheelchairAccessible: true,
    facilities: [
      'Emergency Medical Doctor On-site',
      'Separate Dorms for Women & Children',
      'Purified RO Water',
      'Hot Meals Kitchen',
      'Pet Designated Area'
    ]
  },
  {
    id: 'sh-03',
    name: 'Civil District Hospital & Emergency Trauma Centre',
    type: 'Hospital & Medical Centre',
    address: 'Hospital Link Road, Medical Enclave',
    city: 'Silchar',
    state: 'Assam',
    lat: 24.8180,
    lng: 92.7820,
    contactNumber: '+91 3842 233333',
    capacity: 250,
    currentOccupancy: 215,
    status: 'Operational - Emergency Only',
    isVerified: true,
    isDemoData: true,
    lastVerified: '8 mins ago',
    elevationMeters: 51,
    wheelchairAccessible: true,
    facilities: [
      '24/7 ICU & Trauma Care',
      'Emergency Snakebite Antivenom',
      'Surgical Care',
      'Blood Bank',
      'Ambulance Station'
    ]
  },
  {
    id: 'sh-04',
    name: 'St. Xavier Community Mission Centre',
    type: 'Safe Shelter',
    address: 'Convent Road, Elevated Sector 3',
    city: 'Silchar',
    state: 'Assam',
    lat: 24.8520,
    lng: 92.7680,
    contactNumber: '+91 3842 251122',
    capacity: 300,
    currentOccupancy: 120,
    status: 'Open & Operational',
    isVerified: true,
    isDemoData: true,
    lastVerified: '45 mins ago',
    elevationMeters: 55,
    wheelchairAccessible: false,
    facilities: [
      'Clean Water & Hydration Kits',
      'Thermal Blankets',
      'Dry Food Packets',
      'Charging Docks'
    ]
  },
  {
    id: 'sh-05',
    name: 'Town Hall & NDRF Stage-1 Relief Base',
    type: 'Emergency Response Centre',
    address: 'Administrative Boulevard, Civic Center',
    city: 'Silchar',
    state: 'Assam',
    lat: 24.8360,
    lng: 92.7880,
    contactNumber: '+91 112',
    capacity: 350,
    currentOccupancy: 190,
    status: 'Open & Operational',
    isVerified: true,
    isDemoData: true,
    lastVerified: '12 mins ago',
    elevationMeters: 46,
    wheelchairAccessible: true,
    facilities: [
      'NDRF Quick Reaction Team Base',
      'Satellite Phone Communication',
      'Rubber Dinghies & Life Vests',
      'Emergency Water Purification',
      'First Aid Response'
    ]
  },
  {
    id: 'sh-06',
    name: 'Patna College Sports Complex High-Ground Camp',
    type: 'Official Relief Camp',
    address: 'Ashok Rajpath, Near Riverfront Promenade',
    city: 'Patna',
    state: 'Bihar',
    lat: 25.6190,
    lng: 85.1720,
    contactNumber: '+91 612 2670123',
    capacity: 700,
    currentOccupancy: 380,
    status: 'Open & Operational',
    isVerified: true,
    isDemoData: true,
    lastVerified: '20 mins ago',
    elevationMeters: 53,
    wheelchairAccessible: true,
    facilities: [
      'Central Relief Distribution Point',
      'Infant Milk & Nutrition Station',
      'Mobile Medical Van',
      'Clean Water Tankers',
      'Security Patrol'
    ]
  }
];

export const FLOOD_HAZARDS = [
  {
    id: 'haz-01',
    name: 'Submerged Bridge & Embankment Breach',
    type: 'Critical Inundation',
    lat: 24.8210,
    lng: 92.8020,
    description: 'Road fully inundated under 4.5 feet turbulent water. Closed to all vehicular and pedestrian traffic.',
    severity: 'High',
    isDemoData: true
  },
  {
    id: 'haz-02',
    name: 'Low-Lying Urban Waterlogging',
    type: 'Road Waterlogged',
    lat: 24.8410,
    lng: 92.7750,
    description: '2 to 3 feet standing water. Submerged open drains. Hazardous for two-wheelers and pedestrians.',
    severity: 'Medium',
    isDemoData: true
  }
];

export const EMERGENCY_CONTACTS: EmergencyContact[] = [
  {
    id: 'c-112',
    title: 'National Emergency Helpline (ERSS)',
    category: 'National',
    number: '112',
    description: 'All-in-one unified emergency number for Police, Fire, Ambulance, and Disaster assistance across India.',
    badge: 'Immediate Priority',
    isTollFree: true,
    availableHours: '24/7 round the clock'
  },
  {
    id: 'c-ndrf',
    title: 'National Disaster Response Force (NDRF)',
    category: 'Disaster Response',
    number: '011-24363260',
    description: 'HQ Emergency Operation Centre. Specialized federal search and boat rescue operations in flood disaster zones.',
    badge: 'Federal Rescue',
    isTollFree: false,
    availableHours: '24/7 dedicated control room'
  },
  {
    id: 'c-ndrf-alt',
    title: 'NDRF 24/7 Helpline Mobile',
    category: 'Disaster Response',
    number: '9711077372',
    description: 'Direct duty officer for emergency rescue coordination and distress message intake.',
    badge: 'Direct Rescue Cell',
    isTollFree: false,
    availableHours: '24/7 active line'
  },
  {
    id: 'c-sdma',
    title: 'State Disaster Management Authority (SDMA)',
    category: 'Disaster Response',
    number: '1070',
    description: 'State emergency operation centre for flood warnings, shelter assignments, and relief boat deployment.',
    badge: 'State Control Room',
    isTollFree: true,
    availableHours: '24/7 operational'
  },
  {
    id: 'c-ddma',
    title: 'District Disaster Management Authority (DDMA)',
    category: 'Disaster Response',
    number: '1077',
    description: 'District magistrate flood cell for local relief supplies, dry rations, and evacuation transport.',
    badge: 'District Emergency',
    isTollFree: true,
    availableHours: '24/7 active'
  },
  {
    id: 'c-ambulance',
    title: 'National Ambulance Service',
    category: 'Medical & Police',
    number: '108',
    description: 'Emergency medical response, trauma care, maternity, and patient transport to high-ground hospitals.',
    badge: 'Medical Trauma',
    isTollFree: true,
    availableHours: '24/7 ambulance dispatch'
  },
  {
    id: 'c-fire',
    title: 'Fire & Rescue Service',
    category: 'Medical & Police',
    number: '101',
    description: 'Inflatable boat teams, submerged tree clearing, water pumping, and structural collapse response.',
    badge: 'Rescue & Fire',
    isTollFree: true,
    availableHours: '24/7 emergency'
  },
  {
    id: 'c-police',
    title: 'Police Emergency Response',
    category: 'Medical & Police',
    number: '100',
    description: 'Law enforcement, road cordon enforcement around submerged bridges, and law & order in relief camps.',
    badge: 'Police Dispatch',
    isTollFree: true,
    availableHours: '24/7 service'
  },
  {
    id: 'c-women',
    title: 'Women in Distress Helpline',
    category: 'Specialized',
    number: '1091',
    description: 'Dedicated support for vulnerable women and girls displaced in flood camps and temporary shelters.',
    badge: 'Protection',
    isTollFree: true,
    availableHours: '24/7 confidential'
  },
  {
    id: 'c-childline',
    title: 'National Childline',
    category: 'Specialized',
    number: '1098',
    description: 'Emergency protection for missing, separated, or unaccompanied children during flood evacuations.',
    badge: 'Child Safety',
    isTollFree: true,
    availableHours: '24/7 toll-free'
  }
];

export const INITIAL_ALERTS: FloodAlert[] = [
  {
    id: 'alt-01',
    severity: 'High Warning',
    title: 'Barak River Basin Inundation: Water Level +1.45m Above Danger Level',
    affectedArea: 'Cachar, Karimganj, Hailakandi Lowland Sub-Divisions',
    source: 'Central Water Commission (CWC) & Assam SDMA',
    publishedAt: 'Today, 06:30 AM IST',
    isVerified: true,
    summary: 'Continuous upstream torrential rainfall has breached local irrigation bunds. High probability of urban lowland inundation over the next 18 hours.',
    actionRequired: 'Move families, livestock, and critical medicines to designated municipal high-ground shelters. Disconnect main power switches before leaving.'
  },
  {
    id: 'alt-02',
    severity: 'Moderate Advisory',
    title: 'Flash Flood Watch & Heavy Rainfall Warning for Next 36 Hours',
    affectedArea: 'North Bank Tributaries & Low-Lying Rural Wards',
    source: 'India Meteorological Department (IMD)',
    publishedAt: 'Today, 04:15 AM IST',
    isVerified: true,
    summary: 'Sustained monsoon rain squalls forecasted. Waterlogging likely to submerge ground-floor residential units in unprotected valley zones.',
    actionRequired: 'Charge emergency flashlights and phones. Store at least 3 days of boiled drinking water in sealed plastic carboys.'
  }
];

export const SURVIVAL_KIT_ITEMS = [
  { id: 'k1', category: 'Water & Food', label: 'Clean Drinking Water (At least 3L per person/day for 3 days)', essential: true },
  { id: 'k2', category: 'Water & Food', label: 'Non-perishable food (energy bars, dry fruits, roasted grains, biscuits)', essential: true },
  { id: 'k3', category: 'Water & Food', label: 'Water purification tablets (Halazone/Chlorine) or portable filter', essential: true },
  { id: 'k4', category: 'Medical & First Aid', label: 'Essential daily prescription medicines (minimum 7-day supply)', essential: true },
  { id: 'k5', category: 'Medical & First Aid', label: 'First aid kit (sterile gauze, antiseptic ointment, ORS packets, bandage tape)', essential: true },
  { id: 'k6', category: 'Lighting & Power', label: 'High-power LED flashlight with extra sealed alkaline batteries', essential: true },
  { id: 'k7', category: 'Lighting & Power', label: 'Fully charged mobile power bank in a double zip-lock pouch', essential: true },
  { id: 'k8', category: 'Lighting & Power', label: 'Battery-powered or hand-crank AM/FM emergency radio', essential: false },
  { id: 'k9', category: 'Communication & Signaling', label: 'Loud emergency whistle (for signaling rescue boats without losing voice)', essential: true },
  { id: 'k10', category: 'Documents & Cash', label: 'Waterproof pouch with Aadhaar/IDs, medical cards, deeds, and emergency cash', essential: true },
  { id: 'k11', category: 'Clothing & Warmth', label: 'Raincoats, waterproof boots, and thermal foil emergency blankets', essential: false },
  { id: 'k12', category: 'Sanitation', label: 'Liquid soap, chlorine bleach, heavy-duty trash bags, and sanitary pads', essential: false }
];
