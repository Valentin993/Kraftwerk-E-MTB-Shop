export interface BikeSpecItem {
  id: string;
  category: string;
  title: string;
  value: string;
  unit?: string;
  description: string;
  highlight?: boolean;
}

export interface TechnologyCardData {
  id: string;
  title: string;
  subtitle: string;
  spec: string;
  description: string;
  image: string;
  tag: string;
  detailSpecs: { label: string; value: string }[];
}

export interface GalleryItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'all' | 'berlin' | 'alpine' | 'singletrack' | 'details';
  location: string;
  imageUrl: string;
  aspectRatio: string;
}

export interface Testimonial {
  id: string;
  author: string;
  title: string;
  location: string;
  quote: string;
  rating: number;
  avatar: string;
  bikeModel: string;
  verifiedBuyer: boolean;
}

export interface ConfiguratorOption {
  id: string;
  name: string;
  colorCode?: string;
  priceDelta: number;
  description: string;
  image?: string;
}

export interface TestRideBookingData {
  location: string;
  date: string;
  timeSlot: string;
  bikeSize: 'S' | 'M' | 'L' | 'XL';
  fullName: string;
  email: string;
  phone: string;
  experienceLevel: 'beginner' | 'intermediate' | 'pro';
}
