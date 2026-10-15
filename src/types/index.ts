export interface Shelter {
  id: string;
  name: string;
  type: 'Safe Shelter' | 'Official Relief Camp' | 'Hospital & Medical Centre' | 'Emergency Response Centre';
  address: string;
  city: string;
  state: string;
  lat: number;
  lng: number;
  contactNumber: string;
  capacity: number;
  currentOccupancy: number;
  status: string;
  isVerified: boolean;
  isDemoData: boolean;
  lastVerified: string;
  elevationMeters: number;
  wheelchairAccessible: boolean;
  facilities: string[];
  distanceKm?: number;
}

export interface RescueRequest {
  id: string;
  referenceNumber: string;
  fullName: string;
  isAnonymous: boolean;
  phoneNumber: string;
  hasConsent: boolean;
  location: {
    address: string;
    landmark?: string;
    lat?: number;
    lng?: number;
  };
  totalPeople: number;
  childrenCount: number;
  elderlyCount: number;
  mobilityAssistanceNeeded: boolean;
  emergencyType: 'trapped_water' | 'medical_emergency' | 'stranded_family' | 'evacuation_assist' | 'food_water_shortage' | 'other';
  urgencyLevel: 'critical' | 'high' | 'medium';
  description: string;
  status: 'Submitted' | 'Received by Response Team' | 'Assistance Dispatched' | 'Rescue Team On-Site' | 'Evacuated / Resolved';
  statusNotes?: string;
  createdAt: string;
  updatedAt: string;
  isSimulation: boolean;
}

export interface FloodAlert {
  id: string;
  severity: 'High Warning' | 'Moderate Advisory' | 'Watch Notice';
  title: string;
  affectedArea: string;
  source: string;
  publishedAt: string;
  isVerified: boolean;
  summary: string;
  actionRequired: string;
}

export interface EmergencyContact {
  id: string;
  title: string;
  category: 'National' | 'Disaster Response' | 'Medical & Police' | 'Specialized';
  number: string;
  description: string;
  badge: string;
  isTollFree: boolean;
  availableHours: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  isError?: boolean;
}

export interface UserLocation {
  lat: number;
  lng: number;
  accuracy?: number;
  address?: string;
}
