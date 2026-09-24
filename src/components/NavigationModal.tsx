import React, { useState } from 'react';
import {
  X,
  Navigation,
  MapPin,
  Compass,
  Car,
  Train,
  Plane,
  Phone,
  Share2,
  Copy,
  Check,
  ExternalLink,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

interface NavigationModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang?: 'en' | 'te';
}

export const NavigationModal: React.FC<NavigationModalProps> = ({
  isOpen,
  onClose,
  currentLang = 'en',
}) => {
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<string>('yerraguntla');

  if (!isOpen) return null;

  const venueName = 'Reddy Function Hall (Reddy Kalyana Mandapam)';
  const venueAddress = 'Near Penna River, Yerraguntla Road, Proddatur, YSR Kadapa District, Andhra Pradesh - 516360';
  const geoQuery = encodeURIComponent('Reddy Function Hall, Yerraguntla Road, Proddatur, Andhra Pradesh 516360');
  const googleMapsNavUrl = `https://www.google.com/maps/dir/?api=1&destination=${geoQuery}`;
  const appleMapsUrl = `https://maps.apple.com/?daddr=${geoQuery}`;
  const wazeUrl = `https://waze.com/ul?q=${geoQuery}&navigate=yes`;

  const copyAddress = () => {
    navigator.clipboard.writeText(`${venueName}\n${venueAddress}`);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2500);
  };

  const shareViaWhatsApp = () => {
    const text = encodeURIComponent(
      `Directions to Teja Sai & Mansi's Wedding Venue:\n*${venueName}*\n${venueAddress}\n\nOpen Google Maps Navigation:\n${googleMapsNavUrl}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  const routes = [
    {
      id: 'yerraguntla',
      origin: 'From Yerraguntla Junction (YA Station)',
      distance: '12 km',
      duration: '15 mins',
      icon: Train,
      instructions: 'Head northeast on Yerraguntla-Proddatur Road (SH-57) towards Proddatur town. As you approach the Penna River bank, Reddy Function Hall will be prominently visible on your left, just before the main river bridge.',
      tip: 'Host shuttle vehicles are available at Yerraguntla station for arriving trains.',
    },
    {
      id: 'bus_station',
      origin: 'From Proddatur RTC Bus Complex',
      distance: '2.5 km',
      duration: '6 mins',
      icon: Car,
      instructions: 'Exit the RTC bus stand onto Yerraguntla Road. Head south toward the Penna River bank. Pass through the bypass circle; the venue entrance is 800 meters ahead with grand welcome arches.',
      tip: 'Auto-rickshaws are readily available 24/7 at the bus station (fare approx. ₹60-₹100).',
    },
    {
      id: 'kadapa',
      origin: 'From Kadapa Airport / Kadapa City (HX)',
      distance: '52 km',
      duration: '50-55 mins',
      icon: Plane,
      instructions: 'Take the NH-67 4-lane highway through Mydukur and enter Proddatur via the eastern bypass. Turn towards Yerraguntla Road at Penna River crossing.',
      tip: 'Pre-paid cabs and private taxis operate frequently between Kadapa and Proddatur.',
    },
    {
      id: 'hyderabad',
      origin: 'From Hyderabad / Kurnool (North)',
      distance: '340 km',
      duration: '5.5 hrs',
      icon: Compass,
      instructions: 'Follow NH-44 South via Kurnool, Dhone, and Gooty. Take the turn onto NH-67 towards Tadipatri and Jammalamadugu, leading straight to Proddatur town.',
      tip: 'Smooth 4-lane roads for majority of the route with convenient food stops near Kurnool.',
    },
    {
      id: 'bengaluru',
      origin: 'From Bengaluru / Anantapur (South-West)',
      distance: '260 km',
      duration: '5 hrs',
      icon: Compass,
      instructions: 'Take NH-44 North through Chikkaballapur to Anantapur. Divert towards Tadipatri onto SH-57 and proceed straight into Proddatur along Yerraguntla road.',
      tip: 'Reddy Function Hall is directly located on the entrance side when arriving via Yerraguntla.',
    },
  ];

  const activeRouteData = routes.find((r) => r.id === selectedRoute) || routes[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#FFFDF9] rounded-2xl shadow-2xl border border-[#DFBF7D]/60 overflow-hidden my-auto max-h-[92vh] flex flex-col animate-fadeIn">
        
        {/* Modal Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#EFE5D3] bg-[#FAF7F2] shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white border border-[#E0D3C1] flex items-center justify-center text-[#9B7735]">
              <Navigation className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif-luxury text-lg sm:text-xl font-bold text-[#2C2523]">
                {currentLang === 'te' ? 'కళ్యాణ మండపం రూట్ & నావిగేషన్' : 'Navigate to Function Hall'}
              </h3>
              <p className="text-xs text-[#736862]">
                Reddy Kalyana Mandapam, Proddatur
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#5A504B] hover:text-[#2C2523] hover:bg-[#F3ECE2] rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* Main Destination Card with Instant GPS Navigation */}
          <div className="bg-[#FAF7F2] p-5 sm:p-6 rounded-2xl border border-[#E8DEC8] space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <span className="text-[11px] font-semibold uppercase tracking-widest text-[#9B7735] flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  Wedding Destination
                </span>
                <h4 className="text-xl sm:text-2xl font-serif-luxury font-bold text-[#2C2523]">
                  {venueName}
                </h4>
                <p className="text-xs text-[#5A504B] leading-relaxed">
                  {venueAddress}
                </p>
              </div>
            </div>

            {/* Turn-by-Turn GPS Navigation CTA Buttons */}
            <div className="pt-2 flex flex-wrap gap-2.5">
              <a
                href={googleMapsNavUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-w-[200px] py-3 px-4 text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-[#C5A059] to-[#9B7735] hover:from-[#B89248] hover:to-[#866324] rounded-xl shadow-xs transition-all flex items-center justify-center gap-2"
              >
                <Navigation className="w-4 h-4" />
                <span>Start Google Maps Navigation</span>
              </a>

              <a
                href={appleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 text-xs font-semibold text-[#2C2523] bg-white hover:bg-[#F3ECE2] border border-[#E0D3C1] rounded-xl transition-colors flex items-center justify-center gap-1.5"
              >
                <Compass className="w-4 h-4 text-[#9B7735]" />
                <span>Apple Maps</span>
              </a>

              <a
                href={wazeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 text-xs font-semibold text-[#2C2523] bg-white hover:bg-[#F3ECE2] border border-[#E0D3C1] rounded-xl transition-colors flex items-center justify-center gap-1.5"
              >
                <Car className="w-4 h-4 text-[#9B7735]" />
                <span>Waze</span>
              </a>
            </div>

            {/* Quick Actions: Copy Address, WhatsApp Share */}
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#E8DEC8]">
              <button
                onClick={copyAddress}
                className="px-3 py-1.5 text-xs font-medium text-[#5A504B] hover:text-[#2C2523] bg-white hover:bg-[#F3ECE2] border border-[#E0D3C1] rounded-lg transition-colors flex items-center gap-1.5"
              >
                {copiedAddress ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedAddress ? 'Address Copied!' : 'Copy Full Address'}</span>
              </button>

              <button
                onClick={shareViaWhatsApp}
                className="px-3 py-1.5 text-xs font-medium text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <Share2 className="w-3.5 h-3.5 text-emerald-700" />
                <span>Share Location on WhatsApp</span>
              </button>

              <span className="text-[11px] text-[#736862] font-mono ml-auto hidden sm:inline">
                Coordinates: 14.7505° N, 78.5522° E
              </span>
            </div>
          </div>

          {/* Interactive Starting Point Route Finder */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h5 className="font-serif-luxury font-bold text-base sm:text-lg text-[#2C2523]">
                Where are you traveling from?
              </h5>
              <span className="text-xs text-[#9B7735] font-medium">
                Select your route for exact directions
              </span>
            </div>

            {/* Route Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
              {routes.map((route) => {
                const IconComp = route.icon;
                const isSelected = selectedRoute === route.id;
                return (
                  <button
                    key={route.id}
                    onClick={() => setSelectedRoute(route.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs whitespace-nowrap transition-all flex items-center gap-2 border ${
                      isSelected
                        ? 'bg-[#2C2523] text-white border-[#2C2523] font-medium shadow-xs'
                        : 'bg-white text-[#5A504B] border-[#E0D3C1] hover:bg-[#FAF7F2]'
                    }`}
                  >
                    <IconComp className={`w-3.5 h-3.5 ${isSelected ? 'text-[#DFBF7D]' : 'text-[#9B7735]'}`} />
                    <span>{route.origin.replace('From ', '')}</span>
                  </button>
                );
              })}
            </div>

            {/* Active Route Details Card */}
            <div className="bg-white p-5 rounded-xl border border-[#E8DEC8] space-y-3 shadow-2xs">
              <div className="flex items-center justify-between border-b border-[#F3ECE2] pb-3">
                <span className="font-semibold text-sm text-[#2C2523]">
                  {activeRouteData.origin}
                </span>
                <div className="flex items-center gap-3 text-xs">
                  <span className="font-mono text-[#9B7735] font-bold">
                    Distance: {activeRouteData.distance}
                  </span>
                  <span aria-hidden="true" className="text-[#E0D3C1]">·</span>
                  <span className="font-mono text-[#736862]">
                    Est. Time: {activeRouteData.duration}
                  </span>
                </div>
              </div>

              <p className="text-xs text-[#4A403A] leading-relaxed">
                {activeRouteData.instructions}
              </p>

              <div className="p-3 bg-[#FAF7F2] rounded-lg border border-[#EFE5D3] text-xs text-[#785A21] flex items-start gap-2">
                <Sparkles className="w-4 h-4 shrink-0 mt-0.5 text-[#9B7735]" />
                <span>{activeRouteData.tip}</span>
              </div>
            </div>
          </div>

          {/* Landmarks & Host Route Assistance */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-[#FAF7F2] rounded-xl border border-[#E8DEC8] space-y-2">
              <h6 className="text-xs font-bold uppercase tracking-wider text-[#2C2523]">
                Key Landmarks Nearby
              </h6>
              <ul className="text-xs text-[#5A504B] space-y-1.5 list-disc pl-4">
                <li>Directly on the banks of Penna River, Yerraguntla Road</li>
                <li>Opposite Sri Neelakanteswara Steels office precinct</li>
                <li>800m south of Proddatur Bypass Roundabout</li>
                <li>Ample valet parking on arrival inside mandapam compound</li>
              </ul>
            </div>

            <div className="p-4 bg-[#FAF7F2] rounded-xl border border-[#E8DEC8] space-y-2 flex flex-col justify-between">
              <div>
                <h6 className="text-xs font-bold uppercase tracking-wider text-[#2C2523]">
                  Need Help on the Road?
                </h6>
                <p className="text-xs text-[#5A504B] mt-1">
                  Call our family transport coordinators for instant live guidance:
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                <a
                  href="tel:9440159587"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-[#F3ECE2] border border-[#E0D3C1] rounded-md text-xs font-mono text-[#2C2523] transition-colors"
                >
                  <Phone className="w-3 h-3 text-[#9B7735]" />
                  <span>9440159587</span>
                </a>
                <a
                  href="tel:9000009370"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-[#F3ECE2] border border-[#E0D3C1] rounded-md text-xs font-mono text-[#2C2523] transition-colors"
                >
                  <Phone className="w-3 h-3 text-[#9B7735]" />
                  <span>9000009370</span>
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
