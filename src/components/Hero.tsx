import React, { useState, useEffect } from 'react';
import { Calendar, Heart, MapPin, Sparkles, Download } from 'lucide-react';

interface HeroProps {
  onOpenRSVP: () => void;
  onOpenCard: () => void;
  currentLang: 'en' | 'te';
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

export const Hero: React.FC<HeroProps> = ({ onOpenRSVP, onOpenCard, currentLang }) => {
  // Wedding Dates:
  // Reception: Oct 15, 2026 19:30 IST (+05:30)
  // Muhurtham: Oct 16, 2026 07:58 IST (+05:30)
  const receptionTarget = new Date('2026-10-15T19:30:00+05:30').getTime();
  const muhurthamTarget = new Date('2026-10-16T07:58:00+05:30').getTime();

  const [activeTimerTab, setActiveTimerTab] = useState<'muhurtham' | 'reception'>('muhurtham');
  const [timeLeft, setTimeLeft] = useState<TimeRemaining>({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: false });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date().getTime();
      const target = activeTimerTab === 'muhurtham' ? muhurthamTarget : receptionTarget;
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds, isPast: false });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [activeTimerTab, muhurthamTarget, receptionTarget]);

  // Calendar .ics download generator
  const downloadICS = () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Teja Sai & Mansi Wedding//Celebration//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
SUMMARY:Reception & Dinner: Teja Sai Weds Mansi
DESCRIPTION:Join us for the Grand Reception & Dinner celebrating the wedding of Chi. Teja Sai & Chi.La.Sow. Mansi.
DTSTART:20261015T140000Z
DTEND:20261015T173000Z
LOCATION:Reddy Function Hall, Near Penna River, Yerraguntla Road, Proddatur, Andhra Pradesh
STATUS:CONFIRMED
END:VEVENT
BEGIN:VEVENT
SUMMARY:Sumuhurtham Wedding: Teja Sai Weds Mansi
DESCRIPTION:Sumuhurtham of Chi. Teja Sai with Chi.La.Sow. Mansi at 07:58 AM (Tula Lagnam).
DTSTART:20261016T022800Z
DTEND:20261016T063000Z
LOCATION:Reddy Function Hall, Near Penna River, Yerraguntla Road, Proddatur, Andhra Pradesh
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Teja_Mansi_Wedding_2026.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24 bg-white">
      {/* Decorative ambient subtle background gradients in pink and purple */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none opacity-50">
        <div className="absolute top-10 left-1/4 w-96 h-96 rounded-full bg-pink-200/40 blur-3xl" />
        <div className="absolute top-20 right-1/4 w-96 h-96 rounded-full bg-purple-200/40 blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Sacred Invocation Header with 3D floral tag */}
        <div className="text-center space-y-2 mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gradient-to-r from-pink-50 to-purple-50 border border-purple-200/70 text-xs font-semibold text-purple-900 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-pink-500 animate-ping" />
            <span className="font-telugu-script text-xs sm:text-sm tracking-wider">
              {currentLang === 'te'
                ? 'శ్రీరస్తు · శుభమస్తు · అవిఘ్నమస్తు'
                : 'Srirasthu · Shubhamasthu · Avignamasthu'}
            </span>
          </div>

          <div className="flex items-center justify-center gap-3 text-xs tracking-[0.25em] uppercase text-zinc-500 pt-1">
            <span className="w-8 h-[1px] bg-gradient-to-r from-transparent to-pink-300" />
            <span>Nallamekala &amp; Pottendla Families</span>
            <span className="w-8 h-[1px] bg-gradient-to-l from-transparent to-purple-300" />
          </div>
        </div>

        {/* Main Wedding Announcement Headline */}
        <div className="text-center max-w-4xl mx-auto space-y-4 mb-10">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif-luxury font-medium text-zinc-950 tracking-tight leading-[1.08] text-balance">
            {currentLang === 'te' ? (
              <span>
                తేజ సాయి <span className="italic bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent font-normal">పరిణయం</span> మాన్సి
              </span>
            ) : (
              <span>
                Teja Sai <span className="italic bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent font-normal font-serif">&amp;</span> Mansi
              </span>
            )}
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-zinc-600 font-sans-body max-w-2xl mx-auto leading-relaxed">
            {currentLang === 'te' ? (
              <span>
                శ్రీ నల్లమేకల నాగరాజు &amp; లక్ష్మీదేవి గార్ల కనిష్ట పుత్రుడు <strong className="text-zinc-950">తేజ సాయి</strong>,
                శ్రీ పొత్తేండ్ల భగవాన్ &amp; అంజన గార్ల జ్యేష్ఠ పుత్రిక <strong className="text-zinc-950">మాన్సి</strong> ల పవిత్ర కళ్యాణ మహోత్సవమునకు ప్రేమతో ఆహ్వానిస్తున్నాము.
              </span>
            ) : (
              <span>
                Together with their families, <strong className="text-zinc-950 font-medium">Chi. Teja Sai</strong> (Managing Director, NAMATE) &amp; <strong className="text-zinc-950 font-medium">Chi.La.Sow. Mansi</strong> (B.Tech Food Technology) cordially invite you to celebrate their holy wedding ceremonies.
              </span>
            )}
          </p>

          {/* Quick Date and Location line */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm text-zinc-500 pt-2">
            <span className="inline-flex items-center gap-1.5 font-medium text-zinc-900 bg-pink-50/80 px-3 py-1 rounded-md border border-pink-200">
              <Calendar className="w-4 h-4 text-pink-600" />
              October 15 &amp; 16, 2026
            </span>
            <span aria-hidden="true" className="text-purple-300">·</span>
            <span className="inline-flex items-center gap-1.5 bg-purple-50/80 px-3 py-1 rounded-md border border-purple-200 text-zinc-900 font-medium">
              <MapPin className="w-4 h-4 text-purple-600" />
              Reddy Function Hall, Proddatur, YSR Kadapa
            </span>
          </div>
        </div>

        {/* Hero Image Showcase with 3D Floral & Royal Couple Editorial Framing */}
        <div className="relative max-w-5xl mx-auto mb-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            
            {/* Couple Royal Portrait */}
            <div className="md:col-span-8 p-2 sm:p-2.5 bg-white rounded-2xl shadow-xl border border-zinc-200/80 relative overflow-hidden group">
              <div className="relative overflow-hidden rounded-xl aspect-[16/10] bg-zinc-900">
                <img
                  src="/src/assets/images/hero_couple_portrait_1790219990819.jpg"
                  alt="Teja Sai and Mansi - Royal Portrait in Ivory and Silk"
                  className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 text-white flex items-end justify-between">
                  <div>
                    <span className="inline-block text-[11px] uppercase tracking-widest text-pink-300 font-semibold mb-1">
                      Royal Wedding Celebration
                    </span>
                    <p className="text-xl sm:text-2xl font-serif-luxury font-medium">
                      Teja Sai &amp; Mansi
                    </p>
                  </div>
                  <div className="hidden sm:block text-right">
                    <span className="text-xs tracking-wider bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/30 text-white font-medium">
                      Proddatur, Andhra Pradesh
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 3D Floral Bloom Showcase Card */}
            <div className="md:col-span-4 p-2 sm:p-2.5 bg-white rounded-2xl shadow-lg border border-pink-200/80 relative overflow-hidden group">
              <div className="relative overflow-hidden rounded-xl aspect-[4/5] bg-purple-950">
                <img
                  src="/src/assets/images/floral_3d_hero_bouquet_1790221067388.jpg"
                  alt="3D Blooming Pink Peonies and Purple Orchids"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-wider text-pink-400 mb-0.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>3D Floral Heritage</span>
                  </div>
                  <h4 className="font-serif-luxury text-base font-semibold leading-tight">
                    Blushing Peonies &amp; Royal Orchids
                  </h4>
                  <p className="text-[11px] text-zinc-300 mt-1">
                    An ethereal ambiance woven in delicate petals of pink and sacred purple.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Live Dual Countdown Timer in High-Contrast Obsidian & Crisp White */}
        <div className="max-w-2xl mx-auto bg-white rounded-2xl border-2 border-purple-200/80 p-6 sm:p-8 shadow-xl text-center relative overflow-hidden">
          {/* Subtle Pink/Purple Glow Accent */}
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-pink-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />

          {/* Segmented Timer Switch */}
          <div className="inline-flex items-center p-1 bg-zinc-100 rounded-xl mb-6 border border-zinc-200">
            <button
              onClick={() => setActiveTimerTab('muhurtham')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                activeTimerTab === 'muhurtham'
                  ? 'bg-zinc-950 text-white shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-950'
              }`}
            >
              Sumuhurtham (Oct 16 · 07:58 AM)
            </button>
            <button
              onClick={() => setActiveTimerTab('reception')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                activeTimerTab === 'reception'
                  ? 'bg-zinc-950 text-white shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-950'
              }`}
            >
              Reception &amp; Dinner (Oct 15 · 7:30 PM)
            </button>
          </div>

          <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-md mx-auto">
            <div className="p-3.5 bg-zinc-50 rounded-xl border border-zinc-200 shadow-2xs">
              <span className="block text-2xl sm:text-4xl font-serif-luxury font-bold text-zinc-950 tabular-nums">
                {String(timeLeft.days).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs uppercase tracking-wider font-semibold text-zinc-500">Days</span>
            </div>
            <div className="p-3.5 bg-zinc-50 rounded-xl border border-zinc-200 shadow-2xs">
              <span className="block text-2xl sm:text-4xl font-serif-luxury font-bold text-zinc-950 tabular-nums">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs uppercase tracking-wider font-semibold text-zinc-500">Hours</span>
            </div>
            <div className="p-3.5 bg-zinc-50 rounded-xl border border-zinc-200 shadow-2xs">
              <span className="block text-2xl sm:text-4xl font-serif-luxury font-bold text-zinc-950 tabular-nums">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs uppercase tracking-wider font-semibold text-zinc-500">Minutes</span>
            </div>
            <div className="p-3.5 bg-zinc-50 rounded-xl border border-purple-200 shadow-2xs bg-purple-50/50">
              <span className="block text-2xl sm:text-4xl font-serif-luxury font-bold text-purple-700 tabular-nums">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs uppercase tracking-wider font-bold text-pink-600">Seconds</span>
            </div>
          </div>

          <p className="text-xs text-zinc-500 mt-4 font-sans-body">
            {activeTimerTab === 'muhurtham'
              ? 'Auspicious Tula Lagnam, Moola Nakshatra Yuktha'
              : 'Join the grand evening celebration with music, feast & laughter'}
          </p>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-8">
          <button
            onClick={onOpenRSVP}
            className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 hover:from-pink-600 hover:via-purple-700 hover:to-indigo-700 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>RSVP to Celebrate</span>
          </button>

          <button
            onClick={onOpenCard}
            className="px-5 py-3.5 text-xs font-semibold text-zinc-900 bg-white hover:bg-zinc-50 border border-zinc-300 rounded-xl shadow-xs transition-colors flex items-center gap-2"
          >
            <Calendar className="w-4 h-4 text-purple-600" />
            <span>View Wedding Invitation Card</span>
          </button>

          <button
            onClick={downloadICS}
            className="px-4 py-3.5 text-xs font-semibold text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100 rounded-xl transition-colors flex items-center gap-1.5 border border-transparent hover:border-zinc-200"
            title="Download .ics Calendar Event"
          >
            <Download className="w-4 h-4 text-pink-600" />
            <span>Add to Calendar</span>
          </button>
        </div>

      </div>
    </section>
  );
};
