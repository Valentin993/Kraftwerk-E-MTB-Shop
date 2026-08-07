import {
  BikeSpecItem,
  TechnologyCardData,
  GalleryItem,
  Testimonial,
  ConfiguratorOption
} from '../types';

export const HERO_IMAGE = '/src/assets/images/hero_bike_sunrise_1786107678834.jpg';
export const FRAME_TECH_IMAGE = '/src/assets/images/frame_tech_detail_1786107692948.jpg';
export const BERLIN_HQ_IMAGE = '/src/assets/images/berlin_hq_studio_1786107706494.jpg';
export const BATTERY_TECH_IMAGE = '/src/assets/images/integrated_battery_tech_1786108989809.jpg';
export const OLED_COCKPIT_IMAGE = '/src/assets/images/oled_cockpit_display_1786109090026.jpg';
export const SUSPENSION_TECH_IMAGE = '/src/assets/images/dual_active_suspension_1786109195938.jpg';
export const TOPO_GPS_IMAGE = '/src/assets/images/topo_gps_navigation_1786109256522.jpg';
export const MOBILE_APP_IMAGE = '/src/assets/images/kraft_mobile_app_interface_1786109336705.jpg';
export const BRANDENBURG_ROCK_IMAGE = '/src/assets/images/brandenburg_rock_garden_1786109413223.jpg';
export const SUNSET_BERM_IMAGE = '/src/assets/images/sunset_berm_carve_1786109500928.jpg';

export const BRAND_NAME = 'KRAFTWERK®';
export const MODEL_NAME = 'KRAFT01 / E-PERFORMANCE';

export const PERFORMANCE_STATS = [
  { id: 'power', value: 750, label: 'Peak Power', unit: 'W', desc: 'Ultra-efficient German mid-drive vector motor' },
  { id: 'torque', value: 90, label: 'Max Torque', unit: 'Nm', desc: 'Instant low-end grunt for 45% steep technical ascents' },
  { id: 'range', value: 120, label: 'Max Range', unit: 'km', desc: '800Wh high-density dual-cell lithium integrated core' },
  { id: 'charge', value: 15, label: 'Fast Charge', unit: 'min', desc: '80% charge boost with Berlin Fast-Dock 10A' },
  { id: 'weight', value: 19.8, label: 'Carbon Frame', unit: 'kg', desc: 'Monocoque high-modulus T1000 aerospace carbon fiber' },
  { id: 'suspension', value: 160, label: 'Active Travel', unit: 'mm', desc: 'Dual-air active electronic valve dampening suspension' }
];

export const TERRAINS_DATA = [
  {
    id: 'grunewald',
    name: 'Grunewald Forest',
    location: 'Berlin, Germany',
    elevation: '+420m',
    difficulty: 'Moderate Flow',
    description: 'Fast-flowing pine needle singletracks with rapid s-bends and punchy sandy climbs requiring immediate torque vectoring.',
    image: 'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?auto=format&fit=crop&q=80&w=1600',
    topSpeed: '42 km/h',
    efficiency: '94%'
  },
  {
    id: 'brandenburg',
    name: 'Brandenburg Trails',
    location: 'Brandenburg, Germany',
    elevation: '+780m',
    difficulty: 'Technical Endurance',
    description: 'Rugged forest fire roads, root clusters, and gravel descents pushing battery thermals and frame rigidity to limits.',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=1600',
    topSpeed: '55 km/h',
    efficiency: '91%'
  },
  {
    id: 'alps',
    name: 'Bavarian Alps',
    location: 'Garmisch-Partenkirchen',
    elevation: '+2,100m',
    difficulty: 'Extreme Alpine',
    description: 'Rock gardens, loose slate chutes, and 30%+ vertical inclines where the 90Nm motor and 160mm suspension reign supreme.',
    image: 'https://images.unsplash.com/photo-1511994298241-608e28f14fde?auto=format&fit=crop&q=80&w=1600',
    topSpeed: '68 km/h',
    efficiency: '88%'
  }
];

export const TECHNOLOGY_CARDS: TechnologyCardData[] = [
  {
    id: 'battery',
    title: 'Integrated Battery',
    subtitle: '800Wh High-Density Cell Architecture',
    spec: '120 km Range',
    tag: 'Core Power',
    description: 'Encapsulated inside a structural carbon downtube with smart thermal dissipate channels and quick magnetic ejection.',
    image: BATTERY_TECH_IMAGE,
    detailSpecs: [
      { label: 'Cell Type', value: '21700 Tesla-Grade Lithium' },
      { label: 'Voltage', value: '52V Nominal / 10A' },
      { label: 'Weight', value: '3.4 kg Ejected' },
      { label: 'Ejection', value: 'Keyless NFC Eject' }
    ]
  },
  {
    id: 'motor',
    title: 'Berlin Mid-Drive Motor',
    subtitle: 'Brushless Vector Torque Engine',
    spec: '90 Nm Torque',
    tag: 'Propulsion',
    description: 'Engineered in Berlin-Schöneweide with magnesium housing, helical gears for silent operation, and sub-millisecond torque sensing.',
    image: FRAME_TECH_IMAGE,
    detailSpecs: [
      { label: 'Power Output', value: '250W Nominal / 750W Peak' },
      { label: 'Noise Rating', value: '< 42 dB Silent Glide' },
      { label: 'Cadence Range', value: '20 - 150 RPM' },
      { label: 'Efficiency', value: '93.8% Energy Transfer' }
    ]
  },
  {
    id: 'suspension',
    title: 'Dual Active Suspension',
    subtitle: '160mm Active Electronic Valve',
    spec: '160 mm Travel',
    tag: 'Control',
    description: 'Continuous terrain telemetry adjusts rebound and compression 500 times per second using integrated accelerometer sensors.',
    image: SUSPENSION_TECH_IMAGE,
    detailSpecs: [
      { label: 'Front Fork', value: 'KRAFT Air 38 Flight-Active' },
      { label: 'Rear Shock', value: 'Monarch Coil-Air Dual Valve' },
      { label: 'Sensor Rate', value: '500 Hz Active Sampling' },
      { label: 'Modes', value: 'Climb / Flow / DH Lockout' }
    ]
  },
  {
    id: 'display',
    title: 'OLED Cockpit',
    subtitle: 'Anti-Glare High Brightness Matrix',
    spec: '1,200 Nits',
    tag: 'Telemetry',
    description: 'Flush-mounted glass cockpit seamlessly recessed into the carbon stem with glove-friendly tactile haptic thumb pad.',
    image: OLED_COCKPIT_IMAGE,
    detailSpecs: [
      { label: 'Display Size', value: '2.8" High Contrast OLED' },
      { label: 'Readability', value: 'Direct Sunlight Clear' },
      { label: 'Connectivity', value: 'Bluetooth 5.3 / ANT+' },
      { label: 'Protection', value: 'Gorilla Glass Victus 2' }
    ]
  },
  {
    id: 'app',
    title: 'KRAFT Mobile App',
    subtitle: 'OTA Motor Tuning & Diagnostic Suite',
    spec: 'Custom Curves',
    tag: 'Software',
    description: 'Tailor motor acceleration curves, cadence sensitivity, battery conservation limits, and log trail telemetry to Strava automatically.',
    image: MOBILE_APP_IMAGE,
    detailSpecs: [
      { label: 'OS Support', value: 'iOS & Android Native' },
      { label: 'Updates', value: 'Over-The-Air Cellular/WiFi' },
      { label: 'Anti-Theft', value: 'Remote Motor Kill & GPS Tracking' },
      { label: 'Export', value: 'GPX, Komoot & Strava Sync' }
    ]
  },
  {
    id: 'gps',
    title: 'Topographic GPS',
    subtitle: 'Real-Time Vector Range Mapping',
    spec: '3D Topo Nav',
    tag: 'Navigation',
    description: 'Dynamic range calculation accounts for your weight, current slope grade, wind speed, and remaining battery percentage to guarantee home arrival.',
    image: TOPO_GPS_IMAGE,
    detailSpecs: [
      { label: 'Satellite', value: 'GPS / GLONASS / Galileo' },
      { label: 'Live Offline', value: 'European Maps Pre-loaded' },
      { label: 'Elevation', value: 'Barometric Altimeter' },
      { label: 'Safety', value: 'Automated Crash SOS Beacon' }
    ]
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g1',
    title: 'Grunewald Dawn Patrol',
    subtitle: 'Singletrack through pine forests',
    category: 'berlin',
    location: 'Grunewald, Berlin',
    imageUrl: HERO_IMAGE,
    aspectRatio: '16/9'
  },
  {
    id: 'g2',
    title: 'Monocoque Carbon Precision',
    subtitle: 'Matte black hand-laid carbon weave',
    category: 'details',
    location: 'Berlin Design Lab',
    imageUrl: FRAME_TECH_IMAGE,
    aspectRatio: '4/3'
  },
  {
    id: 'g3',
    title: 'Alps Alpine Ridge Ascent',
    subtitle: 'Testing torque at 2,200m elevation',
    category: 'alpine',
    location: 'Garmisch Alps',
    imageUrl: 'https://images.unsplash.com/photo-1511994298241-608e28f14fde?auto=format&fit=crop&q=80&w=1600',
    aspectRatio: '1/1'
  },
  {
    id: 'g4',
    title: 'Brandenburg Rock Garden',
    subtitle: '160mm active suspension in full compression',
    category: 'singletrack',
    location: 'Bad Belzig, Germany',
    imageUrl: BRANDENBURG_ROCK_IMAGE,
    aspectRatio: '4/3'
  },
  {
    id: 'g5',
    title: 'Berlin Industrial HQ',
    subtitle: 'Craftsmanship meets high-tech engineering',
    category: 'berlin',
    location: 'Mitte Studio, Berlin',
    imageUrl: BERLIN_HQ_IMAGE,
    aspectRatio: '16/9'
  },
  {
    id: 'g6',
    title: 'Sunset Berm Carve',
    subtitle: 'Hydraulic Magura MT7 4-piston braking',
    category: 'singletrack',
    location: 'Teufelsberg Trail',
    imageUrl: SUNSET_BERM_IMAGE,
    aspectRatio: '1/1'
  }
];

export const FULL_SPECIFICATIONS: BikeSpecItem[] = [
  { id: 's1', category: 'Powertrain', title: 'Motor', value: 'KRAFT Vector-S Mid-Drive', description: '250W Nominal / 750W Peak, magnesium housing, 90 Nm torque' },
  { id: 's2', category: 'Powertrain', title: 'Battery', value: 'KRAFT PowerCore 800Wh', description: 'Removable 52V Tesla 21700 cell architecture with NFC magnetic latch' },
  { id: 's3', category: 'Powertrain', title: 'Range', value: 'Up to 120 km', description: 'Real-world mixed trail mode with regenerative braking assistance' },
  { id: 's4', category: 'Powertrain', title: 'Charging Time', value: '1.5 hrs (0 to 80%)', description: 'Include 10A Berlin Fast-Charger with active cooling fan' },
  { id: 's5', category: 'Chassis', title: 'Frame', value: 'Full Monocoque Carbon T1000', description: 'Internal cable routing, integrated skid plate & chainstay guards' },
  { id: 's6', category: 'Chassis', title: 'Suspension Front', value: 'KRAFT Air 38 Flight-Active', description: '160mm travel, 38mm stanchions, e-active valving' },
  { id: 's7', category: 'Chassis', title: 'Suspension Rear', value: 'Monarch Coil-Air Flight', description: '160mm rear linkage travel with trunnion mount' },
  { id: 's8', category: 'Control', title: 'Brakes', value: 'Magura MT7 Pro 4-Piston', description: '220mm front & 203mm rear floating carbon-steel rotors' },
  { id: 's9', category: 'Control', title: 'Drivetrain', value: 'SRAM XX Eagle Transmission', description: 'Wireless AXS 1x12 speed electronic shifting with direct mount' },
  { id: 's10', category: 'Control', title: 'Wheels & Tires', value: 'DT Swiss HXC 1501 Spline Carbon', description: '29" Front / 27.5" Mullet rear, Maxxis Assegai 2.5 3C Exo+' },
  { id: 's11', category: 'Tech', title: 'Weight', value: '19.8 kg (Size M)', description: 'Industry-leading strength-to-weight ratio for full suspension' },
  { id: 's12', category: 'Tech', title: 'Display & App', value: 'OLED Glass Cockpit + iOS/Android', description: 'Live telemetry, GPS topography, motor curve tuning & anti-theft' }
];

export const COLOR_OPTIONS: ConfiguratorOption[] = [
  { id: 'stealth', name: 'Matte Stealth Black', colorCode: '#121316', priceDelta: 0, description: 'Aggressive anti-reflective matte finish inspired by stealth aircraft' },
  { id: 'forest', name: 'Deep Forest Graphite', colorCode: '#1A2922', priceDelta: 150, description: 'Deep dark olive hue inspired by Berlin’s Grunewald pine forest' },
  { id: 'lime', name: 'Electric Berlin Launch Edition', colorCode: '#2B331A', priceDelta: 360, description: 'Matte carbon with vibrant Electric Lime (#A3E635) badging & pinstripes' }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    author: 'Markus Lindner',
    title: 'Senior Editor, Mountain Bike Germany',
    location: 'Munich, Germany',
    quote: 'The KRAFTWERK 01 sets a new benchmark for European E-MTB engineering. The weight distribution and instantaneous 90Nm torque make 30% incline rock gardens feel like flat pavement.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    bikeModel: 'KRAFT01 Electric Berlin Edition',
    verifiedBuyer: true
  },
  {
    id: 't2',
    author: 'Elena Vance',
    title: 'Downhill & Enduro Pro Athlete',
    location: 'Innsbruck, Austria',
    quote: 'I was skeptical about electronic active suspension until I rode the KRAFTWERK down the Nordkette singletrail. The 500Hz sensor adjustment reacts before your brain even notices the bump.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200',
    bikeModel: 'KRAFT01 Stealth Black',
    verifiedBuyer: true
  },
  {
    id: 't3',
    author: 'Dr. Stefan Hoffman',
    title: 'Aerospace Systems Engineer',
    location: 'Berlin, Germany',
    quote: 'As a Berliner and engineer, seeing this level of craftsmanship built locally fills me with pride. The battery thermal management and carbon rigidity are flawless.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    bikeModel: 'KRAFT01 Deep Forest Graphite',
    verifiedBuyer: true
  }
];

export const SHOWROOM_LOCATIONS = [
  {
    id: 'berlin-hq',
    city: 'Berlin Flagship & Lab',
    address: 'Schönhauser Allee 172, 10119 Berlin, Germany',
    hours: 'Mon - Sat: 10:00 - 19:00',
    phone: '+49 30 8920 4400',
    coordinates: '52.5352° N, 13.4103° E',
    image: BERLIN_HQ_IMAGE
  },
  {
    id: 'munich-studio',
    city: 'Munich Alpine Experience Center',
    address: 'Maximilianstraße 48, 80538 München, Germany',
    hours: 'Mon - Sat: 10:00 - 18:30',
    phone: '+49 89 2102 9900',
    coordinates: '48.1391° N, 11.5833° E',
    image: 'https://images.unsplash.com/photo-1511994298241-608e28f14fde?auto=format&fit=crop&q=80&w=1600'
  }
];
