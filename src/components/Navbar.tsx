import React, { useState } from 'react';
import { Calendar, Bell, Shield, Menu, X, Globe, Heart } from 'lucide-react';

interface NavbarProps {
  onOpenRSVP: () => void;
  onOpenOrganizer: () => void;
  onOpenCard: () => void;
  onOpenNotifications: () => void;
  unreadNotifsCount: number;
  currentLang: 'en' | 'te';
  onToggleLang: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenRSVP,
  onOpenOrganizer,
  onOpenCard,
  onOpenNotifications,
  unreadNotifsCount,
  currentLang,
  onToggleLang,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: currentLang === 'te' ? 'వేడుకలు' : 'Events', href: '#events' },
    { label: currentLang === 'te' ? 'ప్రయాణం & వేదిక' : 'Logistics', href: '#logistics' },
    { label: currentLang === 'te' ? 'చిత్రమాలిక' : 'Photos', href: '#photos' },
    { label: currentLang === 'te' ? 'శుభాకాంక్షలు' : 'Guestbook', href: '#guestbook' },
    { label: currentLang === 'te' ? 'కానుకలు' : 'Registry', href: '#registry' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Zone 1: Single Wordmark in Cormorant Garamond with 3D floral pink-purple accent */}
          <a
            href="#"
            className="group flex items-center gap-2 text-2xl md:text-3xl font-serif-luxury tracking-wide text-zinc-950 hover:text-purple-600 transition-colors"
          >
            <span className="font-semibold">Teja Sai</span>
            <span className="inline-block relative">
              <Heart className="w-4 h-4 text-pink-500 fill-pink-500 inline-block animate-pulse" />
              <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-purple-500 rounded-full" />
            </span>
            <span className="font-semibold">Mansi</span>
          </a>

          {/* Zone 2: 4-6 Clean Text Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-zinc-600">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-purple-700 transition-colors tracking-wide py-1 border-b border-transparent hover:border-pink-500"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={onOpenCard}
              className="text-xs uppercase tracking-widest text-purple-700 hover:text-pink-600 font-semibold border-b border-purple-200 hover:border-pink-500 transition-colors"
            >
              {currentLang === 'te' ? 'ఆహ్వాన పత్రిక' : 'Wedding Card'}
            </button>
          </nav>

          {/* Zone 3: 1-2 Primary Actions + Language Toggle + Host Portal */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language toggle */}
            <button
              onClick={onToggleLang}
              className="px-2.5 py-1.5 text-xs font-medium text-zinc-700 hover:text-zinc-950 hover:bg-pink-50 rounded-md transition-colors flex items-center gap-1.5 border border-zinc-200"
              title="Toggle Telugu / English"
            >
              <Globe className="w-3.5 h-3.5 text-purple-600" />
              <span className="uppercase text-[11px] font-semibold tracking-wider">
                {currentLang === 'te' ? 'English' : 'తెలుగు'}
              </span>
            </button>

            {/* Notification bell */}
            <button
              onClick={onOpenNotifications}
              className="relative p-2 text-zinc-700 hover:text-zinc-950 hover:bg-purple-50 rounded-full transition-colors"
              title="Real-time Announcements"
            >
              <Bell className="w-4 h-4" />
              {unreadNotifsCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-pink-500 rounded-full ring-2 ring-white" />
              )}
            </button>

            {/* Organizer Dashboard Button */}
            <button
              onClick={onOpenOrganizer}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-800 hover:text-zinc-950 hover:bg-zinc-100 rounded-md border border-zinc-200 transition-colors whitespace-nowrap"
              title="Organizer & Host Dashboard"
            >
              <Shield className="w-3.5 h-3.5 text-purple-600" />
              <span>Organizer</span>
            </button>

            {/* Primary RSVP Action - Pink and Purple Gradient */}
            <button
              onClick={onOpenRSVP}
              className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 hover:from-pink-600 hover:via-purple-700 hover:to-indigo-700 rounded-md shadow-xs hover:shadow-md transition-all whitespace-nowrap"
            >
              RSVP Now
            </button>

            {/* Mobile menu hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-zinc-700 hover:text-zinc-950 rounded-md"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-zinc-200 px-4 pt-3 pb-6 space-y-3">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-base font-medium text-zinc-700 hover:text-purple-700 hover:bg-pink-50 rounded-md"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCard();
              }}
              className="text-left px-3 py-2 text-base font-medium text-purple-700 hover:bg-purple-50 rounded-md flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>{currentLang === 'te' ? 'ఆహ్వాన పత్రిక వీక్షించండి' : 'View Original Invitation Card'}</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenOrganizer();
              }}
              className="text-left px-3 py-2 text-base font-medium text-zinc-800 hover:bg-zinc-100 rounded-md flex items-center gap-2"
            >
              <Shield className="w-4 h-4 text-purple-600" />
              <span>Host & Organizer Dashboard</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

