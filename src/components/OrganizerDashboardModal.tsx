import React, { useState, useEffect } from 'react';
import {
  X,
  Lock,
  Download,
  Search,
  Filter,
  Users,
  Calendar,
  Utensils,
  Car,
  Bell,
  Send,
  CheckCircle2,
  Phone,
  Mail,
  Shield,
  Sparkles,
} from 'lucide-react';
import { RSVPData, NotificationBroadcast } from '../types/wedding';
import { getStoredRSVPs, exportRSVPsToCSV, broadcastNotification } from '../services/storage';
import { triggerBrowserNotification } from '../services/notifications';

interface OrganizerDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OrganizerDashboardModal: React.FC<OrganizerDashboardModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [passcodeError, setPasscodeError] = useState(false);

  const [rsvps, setRsvps] = useState<RSVPData[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'both' | 'reception_only' | 'muhurtham_only' | 'declined' | 'travel_need'>('all');

  // Push notification broadcast form
  const [broadcastTitle, setBroadcastTitle] = useState('');
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [broadcastCategory, setBroadcastCategory] = useState<'schedule' | 'travel' | 'livestream' | 'announcement'>('schedule');
  const [broadcastSuccess, setBroadcastSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setRsvps(getStoredRSVPs());
    }

    const handleUpdate = (e: Event) => {
      const custom = e as CustomEvent<RSVPData[]>;
      if (custom.detail) {
        setRsvps(custom.detail);
      } else {
        setRsvps(getStoredRSVPs());
      }
    };

    window.addEventListener('wedding_rsvp_updated', handleUpdate);
    return () => window.removeEventListener('wedding_rsvp_updated', handleUpdate);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.toLowerCase() === 'namate2026' || passcode.toLowerCase() === 'tejamansi' || passcode === '1234') {
      setIsAuthenticated(true);
      setPasscodeError(false);
    } else {
      setPasscodeError(true);
    }
  };

  const handleExportCSV = () => {
    exportRSVPsToCSV(rsvps);
  };

  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastTitle.trim() || !broadcastMessage.trim()) return;

    const newBroadcast: NotificationBroadcast = {
      id: `BROADCAST-${Date.now()}`,
      title: broadcastTitle.trim(),
      message: broadcastMessage.trim(),
      category: broadcastCategory,
      sentAt: new Date().toISOString(),
      urgency: 'important',
    };

    broadcastNotification(newBroadcast);
    triggerBrowserNotification(newBroadcast);

    setBroadcastTitle('');
    setBroadcastMessage('');
    setBroadcastSuccess(true);
    setTimeout(() => setBroadcastSuccess(false), 4000);
  };

  // Metrics computation
  const totalRsvps = rsvps.length;
  const attendingRsvps = rsvps.filter((r) => r.attending !== 'declined');
  const totalAdults = attendingRsvps.reduce((acc, curr) => acc + (curr.guestCount || 1), 0);
  const totalChildren = attendingRsvps.reduce((acc, curr) => acc + (curr.childrenCount || 0), 0);
  const totalAttendingGuests = totalAdults + totalChildren;

  const receptionAttendees = rsvps
    .filter((r) => r.attending === 'both' || r.attending === 'reception_only')
    .reduce((acc, curr) => acc + curr.guestCount + curr.childrenCount, 0);

  const muhurthamAttendees = rsvps
    .filter((r) => r.attending === 'both' || r.attending === 'muhurtham_only')
    .reduce((acc, curr) => acc + curr.guestCount + curr.childrenCount, 0);

  const travelHelpCount = rsvps.filter((r) => r.needTravelAssistance && r.attending !== 'declined').length;
  const declinedCount = rsvps.filter((r) => r.attending === 'declined').length;

  const filteredRsvps = rsvps.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.phone.includes(searchQuery) ||
      item.originCity.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (statusFilter === 'all') return true;
    if (statusFilter === 'travel_need') return item.needTravelAssistance;
    return item.attending === statusFilter;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-[#FFFDF9] rounded-2xl shadow-2xl border border-[#DFBF7D]/50 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Modal Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-200 bg-zinc-950 text-white shrink-0">
          <div className="flex items-center gap-2.5">
            <Shield className="w-5 h-5 text-pink-400" />
            <h3 className="font-serif-luxury text-lg sm:text-xl font-bold text-white">
              Organizer &amp; Host Management Portal
            </h3>
            <span className="text-xs text-zinc-400 hidden sm:inline">
              (Sri Neelakanteswara Steels &amp; Family)
            </span>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                onClick={handleExportCSV}
                className="px-3.5 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 hover:from-pink-600 hover:to-purple-700 rounded-xl transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
                title="Download complete guest list as CSV"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Export Guest List CSV</span>
                <span className="sm:hidden">CSV</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="p-1.5 text-zinc-400 hover:text-white rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6 bg-white">
          
          {/* Authentication Lock Screen */}
          {!isAuthenticated ? (
            <div className="max-w-md mx-auto py-12 text-center space-y-6">
              <div className="w-14 h-14 rounded-2xl bg-purple-50 border border-purple-200 flex items-center justify-center mx-auto text-purple-700">
                <Lock className="w-6 h-6" />
              </div>

              <div className="space-y-1">
                <h4 className="text-xl font-serif-luxury font-bold text-zinc-950">
                  Host Security Verification
                </h4>
                <p className="text-xs text-zinc-600">
                  This private portal is reserved for Teja Sai &amp; Mansi’s organizing committee and immediate family.
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-3">
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter Host Passcode (e.g. namate2026)"
                  className="w-full px-4 py-2.5 text-sm bg-zinc-50 border border-zinc-200 rounded-xl text-center font-mono focus:outline-none focus:ring-2 focus:ring-purple-500 text-zinc-950"
                />

                {passcodeError && (
                  <p className="text-xs text-rose-600 font-medium">
                    Incorrect passcode. Try &ldquo;namate2026&rdquo;.
                  </p>
                )}

                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="flex-1 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 hover:from-pink-600 hover:to-purple-700 rounded-xl transition-all shadow-xs cursor-pointer"
                  >
                    Unlock Organizer Portal
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setPasscode('namate2026');
                      setIsAuthenticated(true);
                    }}
                    className="px-3.5 py-2.5 text-xs font-semibold text-purple-700 hover:bg-purple-50 border border-purple-200 rounded-xl cursor-pointer"
                  >
                    Host Preview
                  </button>
                </div>
              </form>

              <div className="text-[11px] text-zinc-500 bg-zinc-50 p-3 rounded-xl border border-zinc-200">
                Default demo passkey: <code className="font-mono text-purple-700 font-bold">namate2026</code>
              </div>
            </div>
          ) : (
            /* Authenticated Portal Content */
            <div className="space-y-6">
              
              {/* Stat Metric Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
                <div className="bg-zinc-50 p-4 rounded-2xl border border-zinc-200">
                  <span className="text-[11px] uppercase tracking-wider text-zinc-500 font-bold block">
                    Total RSVPs
                  </span>
                  <p className="text-2xl sm:text-3xl font-serif-luxury font-bold text-zinc-950 mt-1 tabular-nums">
                    {totalRsvps}
                  </p>
                  <span className="text-[10px] text-purple-700 font-semibold">Across all invitees</span>
                </div>

                <div className="bg-zinc-50 p-4 rounded-2xl border border-zinc-200">
                  <span className="text-[11px] uppercase tracking-wider text-zinc-500 font-bold block">
                    Confirmed Guests
                  </span>
                  <p className="text-2xl sm:text-3xl font-serif-luxury font-bold text-zinc-950 mt-1 tabular-nums">
                    {totalAttendingGuests}
                  </p>
                  <span className="text-[10px] text-emerald-700 font-bold">
                    {totalAdults} Adults · {totalChildren} Kids
                  </span>
                </div>

                <div className="bg-zinc-50 p-4 rounded-2xl border border-zinc-200">
                  <span className="text-[11px] uppercase tracking-wider text-zinc-500 font-bold block">
                    Reception Count
                  </span>
                  <p className="text-2xl sm:text-3xl font-serif-luxury font-bold text-pink-600 mt-1 tabular-nums">
                    {receptionAttendees}
                  </p>
                  <span className="text-[10px] text-zinc-500">Oct 15 Gala Dinner</span>
                </div>

                <div className="bg-zinc-50 p-4 rounded-2xl border border-zinc-200">
                  <span className="text-[11px] uppercase tracking-wider text-zinc-500 font-bold block">
                    Muhurtham Count
                  </span>
                  <p className="text-2xl sm:text-3xl font-serif-luxury font-bold text-purple-700 mt-1 tabular-nums">
                    {muhurthamAttendees}
                  </p>
                  <span className="text-[10px] text-zinc-500">Oct 16 07:58 AM</span>
                </div>

                <div className="bg-zinc-50 p-4 rounded-2xl border border-zinc-200 col-span-2 lg:col-span-1">
                  <span className="text-[11px] uppercase tracking-wider text-zinc-500 font-bold block">
                    Travel / Stay Help
                  </span>
                  <p className="text-2xl sm:text-3xl font-serif-luxury font-bold text-indigo-700 mt-1 tabular-nums">
                    {travelHelpCount}
                  </p>
                  <span className="text-[10px] text-zinc-500">{declinedCount} declined</span>
                </div>
              </div>

              {/* Push Broadcast Tool for Real-Time Updates */}
              <div className="bg-gradient-to-br from-pink-50/40 to-purple-50/40 p-5 sm:p-6 rounded-2xl border border-purple-200 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4 text-purple-600" />
                    <h4 className="text-sm font-bold uppercase tracking-wider text-zinc-950">
                      Push Notification Broadcast Center
                    </h4>
                  </div>
                  <span className="text-[11px] text-zinc-500 hidden sm:inline">
                    Sends real-time updates to all attending guests
                  </span>
                </div>

                <form onSubmit={handleSendBroadcast} className="grid grid-cols-1 md:grid-cols-12 gap-3">
                  <div className="md:col-span-4">
                    <input
                      type="text"
                      required
                      value={broadcastTitle}
                      onChange={(e) => setBroadcastTitle(e.target.value)}
                      placeholder="Title: e.g. Reception Dinner Buffet Open"
                      className="w-full px-3 py-2 text-xs bg-white border border-zinc-200 rounded-xl text-zinc-950"
                    />
                  </div>

                  <div className="md:col-span-3">
                    <select
                      value={broadcastCategory}
                      onChange={(e) => setBroadcastCategory(e.target.value as unknown as 'schedule' | 'travel' | 'livestream' | 'announcement')}
                      className="w-full px-3 py-2 text-xs bg-white border border-zinc-200 rounded-xl text-zinc-900 font-medium"
                    >
                      <option value="schedule">Schedule &amp; Timings</option>
                      <option value="travel">Travel &amp; Shuttle Logistics</option>
                      <option value="livestream">Live Stream Announcement</option>
                      <option value="announcement">General Host Greeting</option>
                    </select>
                  </div>

                  <div className="md:col-span-5 flex gap-2">
                    <input
                      type="text"
                      required
                      value={broadcastMessage}
                      onChange={(e) => setBroadcastMessage(e.target.value)}
                      placeholder="Message text for guest notification..."
                      className="flex-1 px-3 py-2 text-xs bg-white border border-zinc-200 rounded-xl text-zinc-950"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 rounded-xl transition-all inline-flex items-center gap-1 shrink-0 cursor-pointer shadow-xs"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Send</span>
                    </button>
                  </div>
                </form>

                {broadcastSuccess && (
                  <p className="text-xs text-emerald-700 font-semibold">
                    ✓ Push notification broadcast dispatched to guests!
                  </p>
                )}
              </div>

              {/* Filter & Search Bar */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="relative flex-1 max-w-sm">
                  <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by name, phone, city..."
                    className="w-full pl-9 pr-3 py-2 text-xs bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-950 focus:ring-2 focus:ring-purple-500 outline-none"
                  />
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
                  <button
                    onClick={() => setStatusFilter('all')}
                    className={`px-3 py-1.5 rounded-xl whitespace-nowrap cursor-pointer transition-all ${
                      statusFilter === 'all'
                        ? 'bg-zinc-950 text-white font-bold'
                        : 'bg-zinc-50 text-zinc-600 border border-zinc-200 hover:bg-zinc-100'
                    }`}
                  >
                    All ({rsvps.length})
                  </button>
                  <button
                    onClick={() => setStatusFilter('both')}
                    className={`px-3 py-1.5 rounded-xl whitespace-nowrap cursor-pointer transition-all ${
                      statusFilter === 'both'
                        ? 'bg-zinc-950 text-white font-bold'
                        : 'bg-zinc-50 text-zinc-600 border border-zinc-200 hover:bg-zinc-100'
                    }`}
                  >
                    Both Events
                  </button>
                  <button
                    onClick={() => setStatusFilter('reception_only')}
                    className={`px-3 py-1.5 rounded-xl whitespace-nowrap cursor-pointer transition-all ${
                      statusFilter === 'reception_only'
                        ? 'bg-zinc-950 text-white font-bold'
                        : 'bg-zinc-50 text-zinc-600 border border-zinc-200 hover:bg-zinc-100'
                    }`}
                  >
                    Reception
                  </button>
                  <button
                    onClick={() => setStatusFilter('muhurtham_only')}
                    className={`px-3 py-1.5 rounded-xl whitespace-nowrap cursor-pointer transition-all ${
                      statusFilter === 'muhurtham_only'
                        ? 'bg-zinc-950 text-white font-bold'
                        : 'bg-zinc-50 text-zinc-600 border border-zinc-200 hover:bg-zinc-100'
                    }`}
                  >
                    Muhurtham
                  </button>
                  <button
                    onClick={() => setStatusFilter('travel_need')}
                    className={`px-3 py-1.5 rounded-xl whitespace-nowrap cursor-pointer transition-all ${
                      statusFilter === 'travel_need'
                        ? 'bg-purple-700 text-white font-bold'
                        : 'bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-100'
                    }`}
                  >
                    Needs Travel Help ({travelHelpCount})
                  </button>
                </div>
              </div>

              {/* Guests Table */}
              <div className="border border-zinc-200 rounded-2xl overflow-hidden bg-white shadow-2xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-zinc-50 text-zinc-600 border-b border-zinc-200 font-bold">
                      <tr>
                        <th className="py-3 px-4">Pass ID</th>
                        <th className="py-3 px-4">Guest Name</th>
                        <th className="py-3 px-4">Contact</th>
                        <th className="py-3 px-4">Attending</th>
                        <th className="py-3 px-4 text-center">Count</th>
                        <th className="py-3 px-4">Dietary</th>
                        <th className="py-3 px-4">Travel / City</th>
                        <th className="py-3 px-4">Notes</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100 text-zinc-900">
                      {filteredRsvps.map((guest) => (
                        <tr key={guest.id} className="hover:bg-purple-50/30 transition-colors">
                          <td className="py-3 px-4 font-mono text-[11px] text-purple-700 font-bold whitespace-nowrap">
                            {guest.id}
                          </td>
                          <td className="py-3 px-4 font-semibold whitespace-nowrap text-zinc-950">
                            {guest.name}
                          </td>
                          <td className="py-3 px-4 whitespace-nowrap font-mono text-[11px]">
                            <a href={`tel:${guest.phone}`} className="text-purple-600 hover:underline block font-semibold">
                              {guest.phone}
                            </a>
                            <span className="text-[10px] text-zinc-400 truncate block max-w-[120px]">
                              {guest.email}
                            </span>
                          </td>
                          <td className="py-3 px-4 whitespace-nowrap">
                            {guest.attending === 'both' ? (
                              <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                                Both Events
                              </span>
                            ) : guest.attending === 'reception_only' ? (
                              <span className="text-pink-700 font-semibold bg-pink-50 px-2 py-0.5 rounded-md border border-pink-200">
                                Reception Only
                              </span>
                            ) : guest.attending === 'muhurtham_only' ? (
                              <span className="text-purple-700 font-semibold bg-purple-50 px-2 py-0.5 rounded-md border border-purple-200">
                                Muhurtham Only
                              </span>
                            ) : (
                              <span className="text-rose-700 font-semibold bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200">
                                Declined
                              </span>
                            )}
                          </td>
                          <td className="py-3 px-4 text-center font-mono font-bold tabular-nums">
                            {guest.attending === 'declined' ? '0' : guest.guestCount + guest.childrenCount}
                          </td>
                          <td className="py-3 px-4 capitalize whitespace-nowrap text-zinc-600">
                            {guest.dietary.replace(/_/g, ' ')}
                          </td>
                          <td className="py-3 px-4 whitespace-nowrap">
                            {guest.needTravelAssistance ? (
                              <span className="text-purple-700 font-bold bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                                Needs Help · {guest.originCity} ({guest.transportMode})
                              </span>
                            ) : (
                              <span className="text-zinc-500">{guest.originCity}</span>
                            )}
                          </td>
                          <td className="py-3 px-4 max-w-[160px] truncate text-zinc-500">
                            {guest.specialNotes || '—'}
                          </td>
                        </tr>
                      ))}

                      {filteredRsvps.length === 0 && (
                        <tr>
                          <td colSpan={8} className="py-8 text-center text-zinc-500">
                            No matching RSVP entries found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
