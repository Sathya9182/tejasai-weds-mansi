import { RSVPData, GuestbookEntry, NotificationBroadcast } from '../types/wedding';

const STORAGE_KEYS = {
  RSVPS: 'teja_mansi_wedding_rsvps_v1',
  GUESTBOOK: 'teja_mansi_wedding_guestbook_v1',
  NOTIFICATIONS: 'teja_mansi_wedding_notifications_v1',
  NOTIF_SUBSCRIPTION: 'teja_mansi_wedding_push_subscribed_v1',
};

export const INITIAL_RSVPS: RSVPData[] = [
  {
    id: 'RSVP-101',
    name: 'K. Satish Kumar & Family',
    email: 'satish.kumar@namate.in',
    phone: '+91 98490 12345',
    attending: 'both',
    guestCount: 3,
    childrenCount: 1,
    dietary: 'andhra_veg_feast',
    needTravelAssistance: true,
    originCity: 'Hyderabad',
    transportMode: 'train',
    specialNotes: 'Arriving at Yerraguntla station on 15th morning. Looking forward!',
    submittedAt: '2026-09-20T10:15:00Z',
    status: 'confirmed',
  },
  {
    id: 'RSVP-102',
    name: 'Dr. Ramesh Babu Pottendla',
    email: 'ramesh.pottendla@gmail.com',
    phone: '+91 94412 87654',
    attending: 'both',
    guestCount: 2,
    childrenCount: 0,
    dietary: 'andhra_veg_feast',
    needTravelAssistance: false,
    originCity: 'Proddatur',
    transportMode: 'local',
    specialNotes: 'Hearty congratulations to beloved niece Mansi & Teja Sai!',
    submittedAt: '2026-09-21T14:30:00Z',
    status: 'confirmed',
  },
  {
    id: 'RSVP-103',
    name: 'Suresh Reddy & Lakshmi',
    email: 'suresh.reddy@bluetek.com',
    phone: '+91 99801 34567',
    attending: 'reception_only',
    guestCount: 2,
    childrenCount: 0,
    dietary: 'no_restrictions',
    needTravelAssistance: false,
    originCity: 'Bengaluru',
    transportMode: 'car',
    specialNotes: 'Will join the Reception party on 15th evening.',
    submittedAt: '2026-09-22T09:00:00Z',
    status: 'confirmed',
  },
  {
    id: 'RSVP-104',
    name: 'A. Venkata Subbaiah',
    email: 'venkata.subbaiah@steels.org',
    phone: '+91 94405 67890',
    attending: 'muhurtham_only',
    guestCount: 2,
    childrenCount: 0,
    dietary: 'andhra_veg_feast',
    needTravelAssistance: false,
    originCity: 'Khadarabad',
    transportMode: 'local',
    specialNotes: 'Best compliments from Neelakanteswara Steels family.',
    submittedAt: '2026-09-22T16:20:00Z',
    status: 'confirmed',
  },
  {
    id: 'RSVP-105',
    name: 'Priyanka & Rahul Verma',
    email: 'priyanka.v@foodtech.edu',
    phone: '+91 91770 99887',
    attending: 'both',
    guestCount: 2,
    childrenCount: 0,
    dietary: 'jain_veg',
    needTravelAssistance: true,
    originCity: 'Chennai',
    transportMode: 'flight',
    specialNotes: 'Landing in Kadapa Airport. Mansi college batchmate!',
    submittedAt: '2026-09-23T11:45:00Z',
    status: 'confirmed',
  },
];

export const INITIAL_GUESTBOOK: GuestbookEntry[] = [
  {
    id: 'GB-1',
    name: 'Nallamekala Family Elders',
    relationship: 'Family & Relatives',
    message: 'చిరంజీవి తేజ సాయి, చిరంజీవి లక్ష్మీ సౌభాగ్యవతి మాన్సి లకు ఆ దేవదేవుని ఆశీస్సులతో నిండు నూరేళ్లు సుఖసంతోషాలతో వర్ధిల్లాలని మనసారా ఆశీర్వదిస్తున్నాము! May God Venkateswara bless this sacred union with boundless joy and prosperity.',
    blessingType: 'Sacred Blessings',
    likes: 24,
    createdAt: '2026-09-21T08:00:00Z',
  },
  {
    id: 'GB-2',
    name: 'NAMATE Executive Board & Team',
    relationship: 'Colleagues & Friends',
    message: 'Warmest congratulations to our visionary Managing Director, Chi. Teja Sai, and lovely Mansi! Wishing you both an extraordinary journey filled with love, laughter, and lifelong togetherness.',
    blessingType: 'Heartfelt Wishes',
    likes: 19,
    createdAt: '2026-09-22T10:30:00Z',
  },
  {
    id: 'GB-3',
    name: 'Anitha & Harish Rao',
    relationship: 'Family Friends, Proddatur',
    message: 'So overjoyed to celebrate this joyous occasion with Nagaraju garu and Lakshmidevi garu. Can not wait to witness the grand Sumuhurtham at Tula Lagnam!',
    blessingType: 'Warmest Congratulations',
    likes: 14,
    createdAt: '2026-09-23T12:00:00Z',
  },
  {
    id: 'GB-4',
    name: 'Pooja Reddy',
    relationship: 'Mansi’s College Best Friend',
    message: 'From sharing food technology lab notes to watching you marry the love of your life! You look ethereal, Mansi. Teja, you are taking home a gem! Cheers to endless happiness!',
    blessingType: 'Cheer & Celebration',
    likes: 28,
    createdAt: '2026-09-23T15:40:00Z',
  },
];

export const INITIAL_NOTIFICATIONS: NotificationBroadcast[] = [
  {
    id: 'NOTIF-1',
    title: 'Welcome to the Wedding Portal',
    message: 'We are thrilled to celebrate with you! Please submit your RSVP and explore travel logistics for Proddatur.',
    category: 'announcement',
    sentAt: '2026-09-20T10:00:00Z',
    urgency: 'normal',
  },
  {
    id: 'NOTIF-2',
    title: 'Reception Schedule & Venue Update',
    message: 'Grand Reception & Dinner starts at 7:30 PM on Thursday, 15th October at Reddy Function Hall, Penna River Road.',
    category: 'schedule',
    sentAt: '2026-09-22T14:00:00Z',
    urgency: 'important',
  },
];

// Local Storage Handlers
export const getStoredRSVPs = (): RSVPData[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.RSVPS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.RSVPS, JSON.stringify(INITIAL_RSVPS));
      return INITIAL_RSVPS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_RSVPS;
  }
};

export const saveRSVP = (rsvp: RSVPData): RSVPData[] => {
  const current = getStoredRSVPs();
  const existingIndex = current.findIndex((item) => item.phone === rsvp.phone || item.email.toLowerCase() === rsvp.email.toLowerCase());
  
  let updated: RSVPData[];
  if (existingIndex >= 0) {
    updated = [...current];
    updated[existingIndex] = { ...rsvp, id: current[existingIndex].id };
  } else {
    updated = [rsvp, ...current];
  }
  
  localStorage.setItem(STORAGE_KEYS.RSVPS, JSON.stringify(updated));
  window.dispatchEvent(new CustomEvent('wedding_rsvp_updated', { detail: updated }));
  return updated;
};

export const getStoredGuestbook = (): GuestbookEntry[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.GUESTBOOK);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.GUESTBOOK, JSON.stringify(INITIAL_GUESTBOOK));
      return INITIAL_GUESTBOOK;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_GUESTBOOK;
  }
};

export const saveGuestbookEntry = (entry: GuestbookEntry): GuestbookEntry[] => {
  const current = getStoredGuestbook();
  const updated = [entry, ...current];
  localStorage.setItem(STORAGE_KEYS.GUESTBOOK, JSON.stringify(updated));
  window.dispatchEvent(new CustomEvent('wedding_guestbook_updated', { detail: updated }));
  return updated;
};

export const likeGuestbookEntry = (id: string): GuestbookEntry[] => {
  const current = getStoredGuestbook();
  const updated = current.map((item) => item.id === id ? { ...item, likes: item.likes + 1 } : item);
  localStorage.setItem(STORAGE_KEYS.GUESTBOOK, JSON.stringify(updated));
  window.dispatchEvent(new CustomEvent('wedding_guestbook_updated', { detail: updated }));
  return updated;
};

export const getStoredNotifications = (): NotificationBroadcast[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(INITIAL_NOTIFICATIONS));
      return INITIAL_NOTIFICATIONS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_NOTIFICATIONS;
  }
};

export const broadcastNotification = (broadcast: NotificationBroadcast): NotificationBroadcast[] => {
  const current = getStoredNotifications();
  const updated = [broadcast, ...current];
  localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(updated));
  window.dispatchEvent(new CustomEvent('wedding_broadcast_sent', { detail: broadcast }));
  return updated;
};

// Push Subscription Flag
export const isPushSubscribed = (): boolean => {
  return localStorage.getItem(STORAGE_KEYS.NOTIF_SUBSCRIPTION) === 'true';
};

export const setPushSubscribed = (val: boolean) => {
  localStorage.setItem(STORAGE_KEYS.NOTIF_SUBSCRIPTION, val ? 'true' : 'false');
  window.dispatchEvent(new CustomEvent('wedding_push_status_changed', { detail: val }));
};

// Export to CSV Generator
export const exportRSVPsToCSV = (rsvps: RSVPData[]) => {
  const headers = [
    'RSVP ID',
    'Guest Name',
    'Phone',
    'Email',
    'Attendance',
    'Adult Guests',
    'Children',
    'Dietary Preference',
    'Needs Travel Assistance',
    'Origin City',
    'Transport Mode',
    'Special Notes / Wishes',
    'Submission Date (UTC)',
    'Status',
  ];

  const escapeCSV = (val: unknown) => {
    if (val === null || val === undefined) return '""';
    const str = String(val).replace(/"/g, '""');
    return `"${str}"`;
  };

  const rows = rsvps.map((r) => [
    escapeCSV(r.id),
    escapeCSV(r.name),
    escapeCSV(r.phone),
    escapeCSV(r.email),
    escapeCSV(
      r.attending === 'both'
        ? 'Both (Reception & Muhurtham)'
        : r.attending === 'reception_only'
        ? 'Reception Only (Oct 15)'
        : r.attending === 'muhurtham_only'
        ? 'Muhurtham Only (Oct 16)'
        : 'Declined'
    ),
    escapeCSV(r.guestCount),
    escapeCSV(r.childrenCount),
    escapeCSV(r.dietary),
    escapeCSV(r.needTravelAssistance ? 'YES' : 'NO'),
    escapeCSV(r.originCity || 'N/A'),
    escapeCSV(r.transportMode || 'N/A'),
    escapeCSV(r.specialNotes || ''),
    escapeCSV(new Date(r.submittedAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })),
    escapeCSV(r.status),
  ]);

  const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `TejaSai_Mansi_Wedding_Guests_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
