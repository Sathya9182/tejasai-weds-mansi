import React from 'react';
import { Calendar, Clock, MapPin, Sparkles, Music, Utensils, Download } from 'lucide-react';

interface EventsSectionProps {
  currentLang: 'en' | 'te';
  onOpenRSVP: () => void;
}

export const EventsSection: React.FC<EventsSectionProps> = ({ currentLang, onOpenRSVP }) => {
  const addToGoogleCalendar = (title: string, details: string, location: string, startIso: string, endIso: string) => {
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      title
    )}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(
      location
    )}&dates=${startIso}/${endIso}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="events" className="py-16 md:py-24 bg-zinc-50/60 border-t border-zinc-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <p className="text-xs uppercase tracking-[0.2em] font-bold text-purple-700">
            {currentLang === 'te' ? 'శుభ ముహూర్తము & విందు' : 'Auspicious Celebrations'}
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-luxury font-medium text-zinc-950">
            {currentLang === 'te' ? 'కళ్యాణ వేడుకల వివరాలు' : 'Wedding Schedule & Events'}
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 font-sans-body">
            {currentLang === 'te'
              ? 'శ్రీ వేంకటేశ్వర స్వామి వారి అనుగ్రహముతో జరిగే ఈ పవిత్ర వేడుకలలో పాల్గొని వధూవరులను ఆశీర్వదించండి.'
              : 'Join us across two days of joyous festivities, ancient rituals, music, and celebration.'}
          </p>
        </div>

        {/* 3D Floral Stage Mandap Feature Banner */}
        <div className="max-w-5xl mx-auto mb-10 overflow-hidden rounded-2xl border border-purple-200 shadow-md bg-zinc-950 relative group">
          <div className="aspect-[21/9] sm:aspect-[24/9] w-full overflow-hidden relative">
            <img
              src="/src/assets/images/floral_3d_arch_mandap_1790221081353.jpg"
              alt="3D Floral Wedding Arch and Mandap Installation"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/85 via-zinc-950/40 to-transparent flex items-center p-6 sm:p-10">
              <div className="max-w-md text-white space-y-2">
                <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-pink-400 font-bold bg-white/10 px-2.5 py-1 rounded-full border border-pink-400/30">
                  <Sparkles className="w-3 h-3 text-pink-400" />
                  3D Floral Mandap Setting
                </span>
                <h3 className="text-xl sm:text-2xl font-serif-luxury font-bold text-white">
                  Grand Stage at Reddy Kalyana Mandapam
                </h3>
                <p className="text-xs text-zinc-300 hidden sm:block">
                  Adorned with cascading fresh pink roses, lavender hydrangeas, and royal purple orchids for the holy union.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Events Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* EVENT 1: RECEPTION & DINNER */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-zinc-200 shadow-sm hover:shadow-md transition-shadow relative flex flex-col justify-between">
            <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-pink-50 border border-pink-200 text-pink-700 text-[11px] font-bold uppercase tracking-wider rounded-full shadow-2xs">
                <Music className="w-3 h-3" />
                Evening Gala
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-purple-700 block mb-1">
                  Event 01 · 15 October 2026
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-zinc-950">
                  {currentLang === 'te' ? 'రిసెప్షన్, విందు, వినోదం' : 'Reception & Gala Dinner'}
                </h3>
              </div>

              <div className="space-y-2 text-sm text-zinc-600 pt-2 border-t border-zinc-100">
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-purple-600 shrink-0" />
                  <span className="font-semibold text-zinc-900">7:30 PM Onwards (రాత్రి 7:30 ని॥లకు)</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-pink-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-zinc-900">Reddy Function Hall</span>
                    <p className="text-xs text-zinc-500">Penna River Road, Proddatur, YSR Kadapa Dist.</p>
                  </div>
                </div>
              </div>

              <p className="text-sm text-zinc-600 leading-relaxed pt-2">
                An enchanting evening of music, celebration, and heartfelt greetings as family and friends gather to welcome Teja Sai &amp; Mansi. Followed by an exquisite royal banquet dinner.
              </p>

              {/* Highlights & Dress code */}
              <div className="bg-zinc-50 p-4 rounded-xl space-y-2 text-xs text-zinc-600 border border-zinc-200">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-zinc-900">Dress Code:</span>
                  <span className="text-purple-700 font-semibold">Festive Indo-Western / Formal</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-zinc-900">Cuisine:</span>
                  <span className="text-zinc-600">Multi-cuisine Royal Buffet</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-5 sm:pt-6 mt-6 border-t border-zinc-100">
              <button
                onClick={() =>
                  addToGoogleCalendar(
                    'Reception & Dinner: Teja Sai Weds Mansi',
                    'Reception & Dinner celebration at Reddy Function Hall, Proddatur.',
                    'Reddy Function Hall, Penna River Road, Proddatur, Andhra Pradesh',
                    '20261015T140000Z',
                    '20261015T173000Z'
                  )
                }
                className="h-11 px-3.5 text-xs font-semibold text-zinc-800 bg-zinc-100 hover:bg-zinc-200 border border-zinc-200 rounded-xl transition-colors inline-flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5 text-purple-600" />
                <span>Add to Calendar</span>
              </button>

              <button
                onClick={onOpenRSVP}
                className="h-11 px-4 text-xs font-semibold text-white bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 rounded-xl transition-all sm:ml-auto shadow-2xs inline-flex items-center justify-center cursor-pointer"
              >
                RSVP for Reception
              </button>
            </div>
          </div>

          {/* EVENT 2: SUMUHURTHAM */}
          <div className="bg-white rounded-2xl p-5 sm:p-8 border-2 border-purple-300 shadow-sm hover:shadow-md transition-shadow relative flex flex-col justify-between">
            <div className="absolute top-3 right-3 sm:top-0 sm:right-0 sm:transform sm:translate-x-2 sm:-translate-y-2">
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-50 border border-purple-300 text-purple-800 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider rounded-full shadow-2xs">
                <Sparkles className="w-3 h-3 text-pink-500" />
                Sacred Muhurtham
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-pink-600 block mb-1">
                  Event 02 · 16 October 2026
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-zinc-950">
                  {currentLang === 'te' ? 'కళ్యాణ మహోత్సవం (సుముహూర్తం)' : 'Sumuhurtham Wedding Ceremony'}
                </h3>
              </div>

              <div className="space-y-2 text-sm text-zinc-600 pt-2 border-t border-zinc-100">
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-purple-600 shrink-0" />
                  <div>
                    <span className="font-bold text-zinc-950">07:58 AM Sharp</span>
                    <span className="text-xs text-purple-700 ml-2 font-semibold">Tula Lagnam, Moola Nakshatra</span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-pink-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-zinc-900">Reddy Function Hall (రెడ్డి కళ్యాణ మండపము)</span>
                    <p className="text-xs text-zinc-500">Penna River Bank, Yerraguntla Road, Proddatur</p>
                  </div>
                </div>
              </div>

              <p className="text-sm text-zinc-600 leading-relaxed pt-2">
                The sacred Vedic marriage ceremony uniting Teja Sai and Mansi in eternal companionship amidst Vedic chants, Mangala Vadyam, Jeelakarra Bellam, Mangalasutra Dharana, and Talambralu blessings.
              </p>

              {/* Highlights & Dress code */}
              <div className="bg-zinc-50 p-4 rounded-xl space-y-2 text-xs text-zinc-600 border border-zinc-200">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-zinc-900">Dress Code:</span>
                  <span className="text-pink-600 font-semibold">Traditional Silk / Ethnic Attire</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-zinc-900">Bhojanam:</span>
                  <span className="text-zinc-600 flex items-center gap-1">
                    <Utensils className="w-3 h-3 text-purple-600" />
                    Traditional Andhra Banana Leaf Feast
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-5 sm:pt-6 mt-6 border-t border-zinc-100">
              <button
                onClick={() =>
                  addToGoogleCalendar(
                    'Sumuhurtham: Teja Sai Weds Mansi',
                    'Sumuhurtham Wedding Ceremony at Reddy Function Hall, Proddatur at 07:58 AM Tula Lagnam.',
                    'Reddy Function Hall, Penna River Road, Proddatur, Andhra Pradesh',
                    '20261016T022800Z',
                    '20261016T063000Z'
                  )
                }
                className="h-11 px-3.5 text-xs font-semibold text-zinc-800 bg-zinc-100 hover:bg-zinc-200 border border-zinc-200 rounded-xl transition-colors inline-flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5 text-purple-600" />
                <span>Add to Calendar</span>
              </button>

              <button
                onClick={onOpenRSVP}
                className="h-11 px-4 text-xs font-semibold text-white bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 hover:from-pink-600 hover:to-purple-700 rounded-xl transition-all sm:ml-auto shadow-2xs inline-flex items-center justify-center cursor-pointer"
              >
                RSVP for Ceremony
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
