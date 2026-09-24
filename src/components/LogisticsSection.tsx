import React from 'react';
import { MapPin, Navigation, Train, Plane, Car, Phone, Hotel, HelpCircle, ExternalLink } from 'lucide-react';

interface LogisticsSectionProps {
  currentLang: 'en' | 'te';
}

export const LogisticsSection: React.FC<LogisticsSectionProps> = ({ currentLang }) => {
  const openGoogleMaps = () => {
    window.open(
      'https://www.google.com/maps/search/?api=1&query=Reddy+Function+Hall+Proddatur+Yerraguntla+Road',
      '_blank',
      'noopener,noreferrer'
    );
  };

  const familyContacts = [
    { name: 'Sri Nallamekala Nagaraju', role: 'Groom’s Father / Neelakanteswara Steels', phone: '9440159587' },
    { name: 'Event & Guest Helpdesk', role: 'Accommodation & Local Pickup', phone: '9000009370' },
    { name: 'Travel Coordination Desk', role: 'Station & Transit Support', phone: '8886868780' },
  ];

  const accommodations = [
    {
      name: 'Hotel RRR Grand',
      location: 'Near Old Bus Stand, Proddatur',
      distance: '2.5 km from Venue',
      type: 'Premium AC Rooms & Suites',
    },
    {
      name: 'Royal Palace Residency',
      location: 'Bypass Road, Proddatur',
      distance: '3.0 km from Venue',
      type: 'Family Suites & Banquet',
    },
    {
      name: 'Sri Balaji Comforts',
      location: 'Yerraguntla Road, Proddatur',
      distance: '1.2 km from Venue',
      type: 'Closest to Wedding Mandapam',
    },
  ];

  return (
    <section id="logistics" className="py-16 md:py-24 bg-white border-t border-zinc-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <p className="text-xs uppercase tracking-[0.2em] font-bold text-purple-700">
            {currentLang === 'te' ? 'వేదిక & ప్రయాణ మార్గదర్శి' : 'Venue & Travel Guide'}
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-luxury font-medium text-zinc-950">
            {currentLang === 'te' ? 'కళ్యాణ వేదిక మరియు లాజిస్టిక్స్' : 'Wedding Day Logistics'}
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 font-sans-body">
            {currentLang === 'te'
              ? 'ప్రొద్దుటూరు చేరుకోవడానికి మరియు సౌకర్యవంతంగా బస చేయడానికి అవసరమైన వివరాలు.'
              : 'Everything you need to plan your arrival, stay, and seamless journey to Proddatur.'}
          </p>
        </div>

        {/* Venue Spotlight Card */}
        <div className="bg-gradient-to-br from-white to-pink-50/30 rounded-2xl p-6 sm:p-8 border-2 border-purple-200 shadow-md mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-purple-700 bg-purple-50 px-3 py-1 rounded-md border border-purple-200">
                <MapPin className="w-3.5 h-3.5 text-pink-600" />
                <span>Ceremony &amp; Reception Venue</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-zinc-950">
                Reddy Function Hall (రెడ్డి కళ్యాణ మండపము)
              </h3>

              <p className="text-sm text-zinc-600 leading-relaxed">
                Situated along the serene banks of the sacred Penna River on the Yerraguntla Road, Reddy Function Hall offers spacious banquet halls, lush lawns, dedicated valet parking, and traditional mandapam amenities.
              </p>

              <div className="p-4 bg-white rounded-xl border border-zinc-200 space-y-2 text-xs text-zinc-600 shadow-2xs">
                <div className="flex items-start gap-2">
                  <span className="font-semibold text-zinc-900 shrink-0">Address:</span>
                  <span>Near Penna River, Yerraguntla Road, Proddatur, YSR Kadapa District, Andhra Pradesh - 516360.</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-zinc-900">Host Firm:</span>
                  <span>Sri Neelakanteswara Steels (Khadarabad Village, Proddatur Mdl.)</span>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={openGoogleMaps}
                  className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 hover:from-pink-600 hover:to-purple-700 rounded-xl transition-all inline-flex items-center gap-2 shadow-sm"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Get Driving Directions on Google Maps</span>
                </button>
              </div>
            </div>

            {/* Stylized Map View Box */}
            <div className="lg:col-span-5">
              <div className="bg-white p-3 rounded-2xl border border-zinc-200 shadow-sm">
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-zinc-100 flex flex-col items-center justify-center p-6 text-center group cursor-pointer" onClick={openGoogleMaps}>
                  <div className="absolute inset-0 bg-[radial-gradient(#C084FC_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />
                  <div className="relative z-10 space-y-3">
                    <div className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center mx-auto text-purple-600 group-hover:scale-110 transition-transform border border-purple-200">
                      <MapPin className="w-6 h-6 text-pink-600" />
                    </div>
                    <div>
                      <p className="font-serif-luxury font-bold text-lg text-zinc-950">
                        Reddy Kalyana Mandapam
                      </p>
                      <p className="text-xs text-zinc-500 mt-0.5">Penna River Bank, Proddatur</p>
                    </div>
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-purple-700 bg-white px-3 py-1 rounded-md border border-purple-200 shadow-2xs">
                      Click to open GPS Navigation
                      <ExternalLink className="w-3 h-3 text-pink-500" />
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Travel Information Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          {/* BY TRAIN */}
          <div className="bg-zinc-50 p-6 rounded-2xl border border-zinc-200 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-white border border-purple-200 flex items-center justify-center text-purple-600 shadow-2xs">
              <Train className="w-5 h-5" />
            </div>
            <h4 className="text-lg font-serif-luxury font-bold text-zinc-950">By Train (Railways)</h4>
            <ul className="text-xs text-zinc-600 space-y-2">
              <li>
                <strong className="text-zinc-900">Yerraguntla Junction (YA):</strong> 12 km (15-20 mins). Major junction connecting Mumbai, Chennai, Bengaluru, and Hyderabad.
              </li>
              <li>
                <strong className="text-zinc-900">Kadapa Station (HX):</strong> 55 km (~1 hr). Regular express trains &amp; cabs available.
              </li>
              <li>
                <em className="text-purple-700 font-medium">Tip: Shuttle cars will be arranged from Yerraguntla station for guests upon RSVP request.</em>
              </li>
            </ul>
          </div>

          {/* BY AIR */}
          <div className="bg-zinc-50 p-6 rounded-2xl border border-zinc-200 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-white border border-pink-200 flex items-center justify-center text-pink-600 shadow-2xs">
              <Plane className="w-5 h-5" />
            </div>
            <h4 className="text-lg font-serif-luxury font-bold text-zinc-950">By Air (Flight)</h4>
            <ul className="text-xs text-zinc-600 space-y-2">
              <li>
                <strong className="text-zinc-900">Kadapa Airport (CDP):</strong> 50 km (~50 mins drive). Direct flights from Hyderabad, Chennai, and Bengaluru.
              </li>
              <li>
                <strong className="text-zinc-900">Tirupati Intl (TIR):</strong> 190 km (~3.5 hrs drive).
              </li>
              <li>
                <strong className="text-zinc-900">Bengaluru Airport (BLR):</strong> 260 km (~5 hrs via NH-44 &amp; NH-67).
              </li>
            </ul>
          </div>

          {/* BY ROAD */}
          <div className="bg-zinc-50 p-6 rounded-2xl border border-zinc-200 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-white border border-purple-200 flex items-center justify-center text-purple-600 shadow-2xs">
              <Car className="w-5 h-5" />
            </div>
            <h4 className="text-lg font-serif-luxury font-bold text-zinc-950">By Road &amp; Bus</h4>
            <ul className="text-xs text-zinc-600 space-y-2">
              <li>
                <strong className="text-zinc-900">Direct Luxury Buses:</strong> Daily APSRTC &amp; private sleeper buses operate from Hyderabad, Bangalore, Chennai, and Vijayawada.
              </li>
              <li>
                <strong className="text-zinc-900">Driving:</strong> Well-paved 4-lane highways connecting via Mydukur, Yerraguntla, and Jammalamadugu bypass.
              </li>
              <li>
                <strong className="text-zinc-900">Parking:</strong> Ample secure parking is available inside Reddy Function Hall.
              </li>
            </ul>
          </div>

        </div>

        {/* Accommodations & Stay in Proddatur */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-zinc-200 mb-12 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="space-y-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-purple-700 flex items-center gap-1.5">
                <Hotel className="w-4 h-4 text-pink-500" />
                Guest Stay &amp; Hospitality
              </span>
              <h4 className="text-xl sm:text-2xl font-serif-luxury font-bold text-zinc-950">
                Accommodations in Proddatur
              </h4>
            </div>
            <div className="text-xs text-zinc-500">
              Host hospitality desk will assist room check-ins
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {accommodations.map((hotel) => (
              <div key={hotel.name} className="p-4 bg-zinc-50 rounded-xl border border-zinc-200 space-y-1.5 hover:border-purple-300 transition-colors">
                <h5 className="font-semibold text-sm text-zinc-950">{hotel.name}</h5>
                <p className="text-xs text-zinc-500">{hotel.location}</p>
                <div className="text-[11px] text-purple-700 font-semibold pt-1 border-t border-zinc-200">
                  {hotel.distance} · {hotel.type}
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs text-zinc-500 mt-4 italic">
            * Note: If you require family accommodation reserved by the hosts, please select &ldquo;Need Travel / Stay Assistance&rdquo; in the RSVP form below.
          </p>
        </div>

        {/* Coordinator Phone Numbers from Card */}
        <div className="bg-gradient-to-r from-pink-50/50 via-purple-50/50 to-pink-50/50 rounded-2xl p-6 border border-purple-200">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-zinc-950 mb-4 text-center">
            Family Contacts &amp; Logistics Helpdesk
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {familyContacts.map((contact) => (
              <div key={contact.phone} className="bg-white p-4 rounded-xl border border-zinc-200 text-center space-y-1 shadow-2xs">
                <p className="font-semibold text-sm text-zinc-950">{contact.name}</p>
                <p className="text-xs text-zinc-500">{contact.role}</p>
                <div className="pt-2">
                  <a
                    href={`tel:${contact.phone}`}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-purple-700 hover:text-purple-900 bg-purple-50 px-3 py-1 rounded-md border border-purple-200 transition-colors"
                  >
                    <Phone className="w-3 h-3 text-pink-600" />
                    <span>+91 {contact.phone}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
