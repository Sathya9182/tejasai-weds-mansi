import { NotificationBroadcast } from '../types/wedding';

// Gentle wedding chime using Web Audio API
export const playNotificationChime = () => {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    
    // Play a gentle two-tone harmonic chime (E5 -> G#5 -> B5)
    const tones = [659.25, 830.61, 987.77];
    tones.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + index * 0.12);
      
      gain.gain.setValueAtTime(0, ctx.currentTime + index * 0.12);
      gain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + index * 0.12 + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + index * 0.12 + 0.9);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(ctx.currentTime + index * 0.12);
      osc.stop(ctx.currentTime + index * 0.12 + 1.0);
    });
  } catch {
    // Audio might be restricted until user gesture; ignore silently
  }
};

export const requestPushPermission = async (): Promise<NotificationPermission> => {
  if (!('Notification' in window)) {
    return 'denied';
  }
  try {
    const permission = await Notification.requestPermission();
    return permission;
  } catch {
    return 'default';
  }
};

export const triggerBrowserNotification = (broadcast: NotificationBroadcast) => {
  playNotificationChime();
  
  if ('Notification' in window && Notification.permission === 'granted') {
    try {
      new Notification(`Teja Sai & Mansi: ${broadcast.title}`, {
        body: broadcast.message,
        icon: '/favicon.ico',
        tag: broadcast.id,
      });
    } catch {
      // Notification failed in iframe sandbox, in-app toast will catch it
    }
  }
};
