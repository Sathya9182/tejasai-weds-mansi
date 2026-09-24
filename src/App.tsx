/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { EventsSection } from './components/EventsSection';
import { LogisticsSection } from './components/LogisticsSection';
import { PhotoGallery } from './components/PhotoGallery';
import { RegistrySection } from './components/RegistrySection';
import { GuestbookSection } from './components/GuestbookSection';
import { RSVPSection } from './components/RSVPSection';
import { Footer } from './components/Footer';
import { InvitationCardModal } from './components/InvitationCardModal';
import { OrganizerDashboardModal } from './components/OrganizerDashboardModal';
import { PushNotificationCenter } from './components/PushNotificationCenter';
import { HangingFlowersAndBreeze } from './components/HangingFlowersAndBreeze';
import { getStoredNotifications } from './services/storage';

export default function App() {
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);
  const [isOrganizerModalOpen, setIsOrganizerModalOpen] = useState(false);
  const [isNotifsModalOpen, setIsNotifsModalOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState<'en' | 'te'>('en');
  const [unreadNotifsCount, setUnreadNotifsCount] = useState(0);

  useEffect(() => {
    const notifs = getStoredNotifications();
    setUnreadNotifsCount(notifs.length);

    const handleBroadcast = () => {
      const updated = getStoredNotifications();
      setUnreadNotifsCount(updated.length);
    };

    window.addEventListener('wedding_broadcast_sent', handleBroadcast);
    return () => window.removeEventListener('wedding_broadcast_sent', handleBroadcast);
  }, []);

  const handleOpenRSVP = () => {
    const rsvpElement = document.getElementById('rsvp');
    if (rsvpElement) {
      rsvpElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleToggleLang = () => {
    setCurrentLang((prev) => (prev === 'en' ? 'te' : 'en'));
  };

  return (
    <div className="min-h-screen bg-white text-zinc-950 flex flex-col font-sans-body selection:bg-pink-100 selection:text-purple-900 relative">
      {/* Hanging Flowers on Left & Right with Dynamic Air Breeze */}
      <HangingFlowersAndBreeze />

      {/* Navigation */}
      <Navbar
        onOpenRSVP={handleOpenRSVP}
        onOpenOrganizer={() => setIsOrganizerModalOpen(true)}
        onOpenCard={() => setIsCardModalOpen(true)}
        onOpenNotifications={() => setIsNotifsModalOpen(true)}
        unreadNotifsCount={unreadNotifsCount}
        currentLang={currentLang}
        onToggleLang={handleToggleLang}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero
          onOpenRSVP={handleOpenRSVP}
          onOpenCard={() => setIsCardModalOpen(true)}
          currentLang={currentLang}
        />

        <EventsSection
          currentLang={currentLang}
          onOpenRSVP={handleOpenRSVP}
        />

        <LogisticsSection
          currentLang={currentLang}
        />

        <PhotoGallery
          currentLang={currentLang}
        />

        <GuestbookSection
          currentLang={currentLang}
        />

        <RegistrySection
          currentLang={currentLang}
        />

        <RSVPSection
          currentLang={currentLang}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenOrganizer={() => setIsOrganizerModalOpen(true)}
        onOpenRSVP={handleOpenRSVP}
        onOpenCard={() => setIsCardModalOpen(true)}
      />

      {/* Modals & Overlays */}
      <InvitationCardModal
        isOpen={isCardModalOpen}
        onClose={() => setIsCardModalOpen(false)}
      />

      <OrganizerDashboardModal
        isOpen={isOrganizerModalOpen}
        onClose={() => setIsOrganizerModalOpen(false)}
      />

      <PushNotificationCenter
        isOpen={isNotifsModalOpen}
        onClose={() => setIsNotifsModalOpen(false)}
      />
    </div>
  );
}
