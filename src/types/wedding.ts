export type AttendanceStatus = 'both' | 'reception_only' | 'muhurtham_only' | 'declined';

export type DietaryPreference = 'andhra_veg_feast' | 'jain_veg' | 'no_restrictions' | 'other';

export type TransportMode = 'train' | 'flight' | 'car' | 'bus' | 'local';

export interface RSVPData {
  id: string;
  name: string;
  email: string;
  phone: string;
  attending: AttendanceStatus;
  guestCount: number;
  childrenCount: number;
  dietary: DietaryPreference;
  needTravelAssistance: boolean;
  originCity: string;
  transportMode: TransportMode;
  specialNotes?: string;
  submittedAt: string;
  status: 'confirmed' | 'pending_review';
}

export interface GuestbookEntry {
  id: string;
  name: string;
  relationship: string;
  message: string;
  blessingType: string;
  likes: number;
  createdAt: string;
}

export interface NotificationBroadcast {
  id: string;
  title: string;
  message: string;
  category: 'schedule' | 'travel' | 'livestream' | 'announcement' | 'rsvp';
  sentAt: string;
  urgency: 'normal' | 'important';
}

export interface GalleryPhoto {
  id: string;
  url: string;
  title: string;
  caption: string;
  category: string;
  aspect: string;
}
