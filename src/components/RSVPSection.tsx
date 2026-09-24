import React, { useState } from 'react';
import { CheckCircle2, UserCheck, Calendar, Users, MapPin, Sparkles, AlertCircle, Phone, Mail } from 'lucide-react';
import { RSVPData, AttendanceStatus, DietaryPreference, TransportMode } from '../types/wedding';
import { saveRSVP } from '../services/storage';
import { triggerBrowserNotification } from '../services/notifications';

interface RSVPSectionProps {
  currentLang: 'en' | 'te';
}

export const RSVPSection: React.FC<RSVPSectionProps> = ({ currentLang }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    attending: 'both' as AttendanceStatus,
    guestCount: 2,
    childrenCount: 0,
    dietary: 'andhra_veg_feast' as DietaryPreference,
    needTravelAssistance: false,
    originCity: '',
    transportMode: 'car' as TransportMode,
    specialNotes: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [submittedRSVP, setSubmittedRSVP] = useState<RSVPData | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) return;

    setSubmitting(true);

    const newRSVP: RSVPData = {
      id: `RSVP-${Date.now().toString().slice(-5)}`,
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim() || `${formData.name.toLowerCase().replace(/\s+/g, '')}@guest.wedding`,
      attending: formData.attending,
      guestCount: Number(formData.guestCount),
      childrenCount: Number(formData.childrenCount),
      dietary: formData.dietary,
      needTravelAssistance: Boolean(formData.needTravelAssistance),
      originCity: formData.originCity.trim() || 'Proddatur',
      transportMode: formData.transportMode,
      specialNotes: formData.specialNotes.trim(),
      submittedAt: new Date().toISOString(),
      status: 'confirmed',
    };

    setTimeout(() => {
      saveRSVP(newRSVP);
      setSubmitting(false);
      setSubmittedRSVP(newRSVP);

      // Trigger push notification / sound confirmation
      triggerBrowserNotification({
        id: `notif-rsvp-${Date.now()}`,
        title: 'RSVP Received!',
        message: `Thank you ${newRSVP.name}! Your celebration pass for ${newRSVP.guestCount} guest(s) is confirmed.`,
        category: 'rsvp',
        sentAt: new Date().toISOString(),
        urgency: 'normal',
      });
    }, 500);
  };

  return (
    <section id="rsvp" className="py-16 md:py-24 bg-zinc-50 border-t border-zinc-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <p className="text-xs uppercase tracking-[0.2em] font-bold text-purple-700 flex items-center justify-center gap-1.5">
            <UserCheck className="w-3.5 h-3.5 text-pink-500" />
            <span>{currentLang === 'te' ? 'హాజరు ధృవీకరణ' : 'Kindly Respond'}</span>
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-luxury font-medium text-zinc-950">
            {currentLang === 'te' ? 'మీ రాకను తెలపండి (RSVP)' : 'RSVP for the Celebrations'}
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 font-sans-body">
            {currentLang === 'te'
              ? 'విందు మరియు బస ఏర్పాట్లను సజావుగా నిర్వహించడానికి దయచేసి మీ వివరాలను నమోదు చేయండి.'
              : 'Please confirm your attendance so our host families can arrange warm hospitality, comfortable stays, and festive banquets.'}
          </p>
        </div>

        {/* Confirmation Pass State */}
        {submittedRSVP ? (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-purple-300 shadow-xl text-center space-y-6 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-pink-50 border border-pink-200 flex items-center justify-center mx-auto text-pink-600">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest text-purple-700 font-bold">
                Official Wedding Pass
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-zinc-950">
                Thank You, {submittedRSVP.name}!
              </h3>
              <p className="text-sm text-zinc-600">
                Your response has been synchronized directly with the host family dashboard.
              </p>
            </div>

            {/* Pass Detail Summary */}
            <div className="max-w-md mx-auto bg-zinc-50 p-5 rounded-2xl border border-zinc-200 text-left text-xs space-y-2.5">
              <div className="flex items-center justify-between border-b border-zinc-200 pb-2">
                <span className="text-zinc-500">Confirmation Passcode:</span>
                <span className="font-mono font-bold text-purple-800">{submittedRSVP.id}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-500">Attending:</span>
                <span className="font-semibold text-zinc-950">
                  {submittedRSVP.attending === 'both'
                    ? 'Reception (Oct 15) & Muhurtham (Oct 16)'
                    : submittedRSVP.attending === 'reception_only'
                    ? 'Reception Only (Oct 15)'
                    : submittedRSVP.attending === 'muhurtham_only'
                    ? 'Sumuhurtham Only (Oct 16)'
                    : 'Regretfully Declined'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-500">Total Guests:</span>
                <span className="font-semibold text-zinc-950 tabular-nums">
                  {submittedRSVP.guestCount} Adult(s) {submittedRSVP.childrenCount > 0 && `+ ${submittedRSVP.childrenCount} Child`}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-500">Dietary Preference:</span>
                <span className="capitalize text-zinc-950">
                  {submittedRSVP.dietary.replace(/_/g, ' ')}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-500">Travel Assistance:</span>
                <span className="font-semibold text-purple-700">
                  {submittedRSVP.needTravelAssistance ? 'Requested (Host will contact)' : 'Self Arranged'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-500">Venue:</span>
                <span className="text-zinc-950">Reddy Function Hall, Proddatur</span>
              </div>
            </div>

            <div className="pt-2 flex justify-center gap-3">
              <button
                onClick={() => setSubmittedRSVP(null)}
                className="px-5 py-2.5 text-xs font-semibold text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100 rounded-xl border border-zinc-200 transition-colors"
              >
                Submit for Another Guest
              </button>
            </div>
          </div>
        ) : (
          /* RSVP Form */
          <div className="bg-white rounded-3xl p-5 sm:p-10 border-2 border-purple-200/80 shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Personal Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-900 mb-1.5">
                    Your Full Name / Family Name <span className="text-pink-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Sri K. Satish Kumar & Family"
                    className="w-full px-3.5 py-2.5 text-sm bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-zinc-950"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-900 mb-1.5">
                    Phone / WhatsApp Number <span className="text-pink-600">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. +91 98490 12345"
                    className="w-full px-3.5 py-2.5 text-sm bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-zinc-950"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-zinc-900 mb-1.5">
                    Email Address (Optional, for pass confirmation)
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. satish.kumar@namate.in"
                    className="w-full px-3.5 py-2.5 text-sm bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-zinc-950"
                  />
                </div>
              </div>

              {/* Attendance Choice */}
              <div>
                <label className="block text-xs font-semibold text-zinc-900 mb-2">
                  Will You Be Attending? <span className="text-pink-600">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    {
                      id: 'both',
                      title: 'Joyfully Attending Both Events',
                      desc: 'Reception (Oct 15) & Sumuhurtham (Oct 16)',
                    },
                    {
                      id: 'reception_only',
                      title: 'Reception & Dinner Only',
                      desc: 'Thursday, 15 Oct 2026 at 7:30 PM',
                    },
                    {
                      id: 'muhurtham_only',
                      title: 'Sumuhurtham Wedding Only',
                      desc: 'Friday, 16 Oct 2026 at 07:58 AM',
                    },
                    {
                      id: 'declined',
                      title: 'Regretfully Unable to Attend',
                      desc: 'Sending warm prayers from afar',
                    },
                  ].map((option) => (
                    <label
                      key={option.id}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                        formData.attending === option.id
                          ? 'bg-purple-50/70 border-purple-500 shadow-xs ring-1 ring-purple-500'
                          : 'bg-zinc-50 border-zinc-200 hover:bg-zinc-100'
                      }`}
                    >
                      <input
                        type="radio"
                        name="attendance"
                        value={option.id}
                        checked={formData.attending === option.id}
                        onChange={() => setFormData({ ...formData, attending: option.id as AttendanceStatus })}
                        className="mt-0.5 text-purple-600 focus:ring-purple-500"
                      />
                      <div>
                        <span className="block text-xs font-bold text-zinc-950">{option.title}</span>
                        <span className="block text-[11px] text-zinc-500 mt-0.5">{option.desc}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Guest Counts & Dietary (Show if not declining) */}
              {formData.attending !== 'declined' && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-zinc-200">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-900 mb-1.5">
                        Number of Adult Guests
                      </label>
                      <select
                        value={formData.guestCount}
                        onChange={(e) => setFormData({ ...formData, guestCount: Number(e.target.value) })}
                        className="w-full px-3.5 py-2.5 text-sm bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-zinc-950 font-medium"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                          <option key={num} value={num}>
                            {num} {num === 1 ? 'Guest' : 'Guests'}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-900 mb-1.5">
                        Children Accompanying
                      </label>
                      <select
                        value={formData.childrenCount}
                        onChange={(e) => setFormData({ ...formData, childrenCount: Number(e.target.value) })}
                        className="w-full px-3.5 py-2.5 text-sm bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-zinc-950 font-medium"
                      >
                        {[0, 1, 2, 3, 4].map((num) => (
                          <option key={num} value={num}>
                            {num} {num === 1 ? 'Child' : 'Children'}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Dietary Preference */}
                  <div>
                    <label className="block text-xs font-semibold text-zinc-900 mb-1.5">
                      Dietary Preference
                    </label>
                    <select
                      value={formData.dietary}
                      onChange={(e) => setFormData({ ...formData, dietary: e.target.value as DietaryPreference })}
                      className="w-full px-3.5 py-2.5 text-sm bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-zinc-950 font-medium"
                    >
                      <option value="andhra_veg_feast">
                        Traditional Andhra Vegetarian Feast (పసందైన ఆంధ్ర శాకాహార భోజనం)
                      </option>
                      <option value="jain_veg">Jain Vegetarian (Strictly no root vegetables)</option>
                      <option value="no_restrictions">Standard Multi-Cuisine Vegetarian</option>
                      <option value="other">Special Dietary Needs (Specify in notes)</option>
                    </select>
                  </div>

                  {/* Travel & Stay Logistics Support */}
                  <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <span className="text-xs font-bold text-zinc-950 block">
                          Need Travel / Accommodation Assistance?
                        </span>
                        <span className="text-[11px] text-zinc-500 block">
                          Host hospitality desk can reserve local hotel rooms and station pick-up.
                        </span>
                      </div>
                      <input
                        type="checkbox"
                        checked={formData.needTravelAssistance}
                        onChange={(e) => setFormData({ ...formData, needTravelAssistance: e.target.checked })}
                        className="h-4 w-4 text-purple-600 rounded focus:ring-purple-500"
                      />
                    </div>

                    {formData.needTravelAssistance && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-zinc-200">
                        <div>
                          <label className="block text-[11px] font-semibold text-zinc-700 mb-1">
                            Traveling From (City)
                          </label>
                          <input
                            type="text"
                            value={formData.originCity}
                            onChange={(e) => setFormData({ ...formData, originCity: e.target.value })}
                            placeholder="e.g. Hyderabad / Bangalore / Chennai"
                            className="w-full px-3 py-2 text-xs bg-white border border-zinc-200 rounded-xl text-zinc-950"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-zinc-700 mb-1">
                            Mode of Transport
                          </label>
                          <select
                            value={formData.transportMode}
                            onChange={(e) => setFormData({ ...formData, transportMode: e.target.value as TransportMode })}
                            className="w-full px-3 py-2 text-xs bg-white border border-zinc-200 rounded-xl text-zinc-950"
                          >
                            <option value="train">Train (Yerraguntla / Kadapa Jn)</option>
                            <option value="flight">Flight (Kadapa / Tirupati Airport)</option>
                            <option value="car">Personal Car</option>
                            <option value="bus">Intercity Bus</option>
                            <option value="local">Local Proddatur Resident</option>
                          </select>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}

              {/* Special Note */}
              <div>
                <label className="block text-xs font-semibold text-zinc-900 mb-1.5">
                  Message or Special Requests for the Hosts
                </label>
                <textarea
                  rows={2}
                  value={formData.specialNotes}
                  onChange={(e) => setFormData({ ...formData, specialNotes: e.target.value })}
                  placeholder="Any dietary restrictions, expected arrival time, or notes..."
                  className="w-full px-3.5 py-2 text-sm bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-zinc-950 resize-none"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full h-12 text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 hover:from-pink-600 hover:via-purple-700 hover:to-indigo-700 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>{submitting ? 'Confirming Your RSVP...' : 'Confirm RSVP Response'}</span>
              </button>

            </form>
          </div>
        )}

      </div>
    </section>
  );
};
