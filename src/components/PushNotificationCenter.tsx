import React, { useState, useEffect } from 'react';
import { Bell, BellRing, X, Sparkles, Check, Clock } from 'lucide-react';
import { NotificationBroadcast } from '../types/wedding';
import { getStoredNotifications, isPushSubscribed, setPushSubscribed } from '../services/storage';
import { requestPushPermission, playNotificationChime } from '../services/notifications';

interface PushNotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PushNotificationCenter: React.FC<PushNotificationCenterProps> = ({
  isOpen,
  onClose,
}) => {
  const [notifications, setNotifications] = useState<NotificationBroadcast[]>([]);
  const [isSubscribed, setIsSubscribedState] = useState<boolean>(false);
  const [activeToast, setActiveToast] = useState<NotificationBroadcast | null>(null);

  useEffect(() => {
    setNotifications(getStoredNotifications());
    setIsSubscribedState(isPushSubscribed());

    const handleBroadcast = (e: Event) => {
      const custom = e as CustomEvent<NotificationBroadcast>;
      if (custom.detail) {
        setNotifications(getStoredNotifications());
        setActiveToast(custom.detail);
        playNotificationChime();
        setTimeout(() => setActiveToast(null), 6000);
      }
    };

    window.addEventListener('wedding_broadcast_sent', handleBroadcast);
    return () => window.removeEventListener('wedding_broadcast_sent', handleBroadcast);
  }, []);

  const handleSubscribe = async () => {
    const perm = await requestPushPermission();
    if (perm === 'granted' || perm === 'default') {
      setPushSubscribed(true);
      setIsSubscribedState(true);
      playNotificationChime();

      setActiveToast({
        id: `perm-success-${Date.now()}`,
        title: 'Push Notifications Enabled',
        message: 'You will receive real-time updates for ceremony muhurtham alerts and reception announcements!',
        category: 'announcement',
        sentAt: new Date().toISOString(),
        urgency: 'normal',
      });
      setTimeout(() => setActiveToast(null), 5000);
    }
  };

  return (
    <>
      {/* Real-time Floating Toast Alert (Whenever a broadcast or event occurs) */}
      {activeToast && (
        <div className="fixed top-24 right-4 z-50 max-w-sm w-full bg-white rounded-2xl p-4 shadow-2xl border-2 border-purple-400 animate-slideDown flex items-start gap-3">
          <div className="p-2.5 bg-pink-50 rounded-xl text-pink-600 shrink-0 border border-pink-200">
            <BellRing className="w-5 h-5 animate-bounce" />
          </div>
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold tracking-wider text-purple-700">
                Wedding Live Update
              </span>
              <button
                onClick={() => setActiveToast(null)}
                className="text-zinc-400 hover:text-zinc-900 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <h5 className="font-serif-luxury font-bold text-sm text-zinc-950 leading-tight">
              {activeToast.title}
            </h5>
            <p className="text-xs text-zinc-600 leading-relaxed">
              {activeToast.message}
            </p>
          </div>
        </div>
      )}

      {/* Slide-out Notifications Modal / Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border-2 border-purple-300 overflow-hidden my-auto max-h-[85vh] flex flex-col">
            
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-200 bg-zinc-50">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-purple-600" />
                <h4 className="font-serif-luxury font-bold text-lg text-zinc-950">
                  Wedding Announcements
                </h4>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 text-zinc-400 hover:text-zinc-900 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Subscribe Banner if not subscribed */}
            <div className="p-4 bg-purple-50/50 border-b border-purple-100">
              {isSubscribed ? (
                <div className="flex items-center gap-2 text-xs text-emerald-800 font-semibold">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Real-time push notifications are active on this device.</span>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-xs text-zinc-600">
                    Get live notifications for muhurtham rituals, live stream link alerts, and transport updates.
                  </p>
                  <button
                    onClick={handleSubscribe}
                    className="w-full py-2.5 px-3 text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 hover:from-pink-600 hover:to-purple-700 rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                  >
                    <BellRing className="w-3.5 h-3.5" />
                    <span>Enable Real-Time Alerts</span>
                  </button>
                </div>
              )}
            </div>

            {/* Notifications List */}
            <div className="p-4 overflow-y-auto flex-1 space-y-3">
              {notifications.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 bg-zinc-50 hover:bg-white rounded-2xl border border-zinc-200 space-y-1.5 shadow-2xs transition-colors"
                >
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-purple-700 uppercase tracking-wider">
                      {item.category}
                    </span>
                    <span className="text-zinc-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(item.sentAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <h5 className="font-serif-luxury font-bold text-sm text-zinc-950">
                    {item.title}
                  </h5>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    {item.message}
                  </p>
                </div>
              ))}

              {notifications.length === 0 && (
                <p className="text-center text-xs text-zinc-500 py-8">
                  No notifications yet.
                </p>
              )}
            </div>

          </div>
        </div>
      )}
    </>
  );
};
