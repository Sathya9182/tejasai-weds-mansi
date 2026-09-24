import React, { useState, useEffect } from 'react';
import { MessageSquare, Heart, Send, Sparkles, Filter } from 'lucide-react';
import { GuestbookEntry } from '../types/wedding';
import { getStoredGuestbook, saveGuestbookEntry, likeGuestbookEntry } from '../services/storage';

interface GuestbookSectionProps {
  currentLang: 'en' | 'te';
}

const BLESSING_TYPES = [
  'Sacred Blessings',
  'Heartfelt Wishes',
  'Warmest Congratulations',
  'Cheer & Celebration',
];

const RELATIONSHIPS = [
  'Family & Relatives',
  'Friend of Teja Sai',
  'Friend of Mansi',
  'NAMATE Team Member',
  'Well Wisher',
];

export const GuestbookSection: React.FC<GuestbookSectionProps> = ({ currentLang }) => {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [name, setName] = useState('');
  const [relationship, setRelationship] = useState(RELATIONSHIPS[0]);
  const [blessingType, setBlessingType] = useState(BLESSING_TYPES[0]);
  const [message, setMessage] = useState('');
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [submitting, setSubmitting] = useState(false);
  const [successNotice, setSuccessNotice] = useState(false);

  useEffect(() => {
    setEntries(getStoredGuestbook());

    const handleUpdate = (e: Event) => {
      const custom = e as CustomEvent<GuestbookEntry[]>;
      if (custom.detail) {
        setEntries(custom.detail);
      } else {
        setEntries(getStoredGuestbook());
      }
    };

    window.addEventListener('wedding_guestbook_updated', handleUpdate);
    return () => window.removeEventListener('wedding_guestbook_updated', handleUpdate);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setSubmitting(true);
    const newEntry: GuestbookEntry = {
      id: `GB-${Date.now()}`,
      name: name.trim(),
      relationship,
      message: message.trim(),
      blessingType,
      likes: 1,
      createdAt: new Date().toISOString(),
    };

    setTimeout(() => {
      saveGuestbookEntry(newEntry);
      setName('');
      setMessage('');
      setSubmitting(false);
      setSuccessNotice(true);
      setTimeout(() => setSuccessNotice(false), 4000);
    }, 400);
  };

  const handleLike = (id: string) => {
    likeGuestbookEntry(id);
  };

  const filteredEntries =
    activeFilter === 'All'
      ? entries
      : entries.filter((item) => item.blessingType === activeFilter);

  return (
    <section id="guestbook" className="py-16 md:py-24 bg-white border-t border-zinc-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <p className="text-xs uppercase tracking-[0.2em] font-bold text-purple-700 flex items-center justify-center gap-1.5">
            <MessageSquare className="w-3.5 h-3.5 text-pink-500" />
            <span>{currentLang === 'te' ? 'శుభాశీస్సులు & సందేశాలు' : 'Guestbook & Wishes'}</span>
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-luxury font-medium text-zinc-950">
            {currentLang === 'te' ? 'వధూవరులకు మీ ఆశీస్సులు' : 'Blessings for Teja & Mansi'}
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 font-sans-body">
            {currentLang === 'te'
              ? 'కొత్త జీవితంలోకి అడుగుపెడుతున్న నూతన దంపతులకు మీ మనసులోని శుభాకాంక్షలను ఇక్కడ పంచుకోండి.'
              : 'Leave a note of love, wisdom, and blessings that the couple will cherish for a lifetime.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Write a Message Card */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border-2 border-purple-200/80 shadow-md sticky top-28">
            <div className="space-y-1 mb-6">
              <span className="text-xs uppercase tracking-wider text-purple-700 font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-pink-500" />
                Sign the Guestbook
              </span>
              <h3 className="text-xl sm:text-2xl font-serif-luxury font-bold text-zinc-950">
                Leave Your Message
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-900 mb-1">
                  Your Full Name <span className="text-pink-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Smt. & Sri Ravindra Reddy"
                  className="w-full px-3.5 py-2.5 text-sm bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-zinc-950 transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-900 mb-1">
                    Relationship
                  </label>
                  <select
                    value={relationship}
                    onChange={(e) => setRelationship(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-zinc-900 font-medium"
                  >
                    {RELATIONSHIPS.map((rel) => (
                      <option key={rel} value={rel}>
                        {rel}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-900 mb-1">
                    Blessing Category
                  </label>
                  <select
                    value={blessingType}
                    onChange={(e) => setBlessingType(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-zinc-900 font-medium"
                  >
                    {BLESSING_TYPES.map((bt) => (
                      <option key={bt} value={bt}>
                        {bt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-900 mb-1">
                  Your Words of Blessing <span className="text-pink-600">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write your wishes, blessings, or heartfelt memories here..."
                  className="w-full px-3.5 py-2.5 text-sm bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-zinc-950 transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 hover:from-pink-600 hover:via-purple-700 hover:to-indigo-700 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{submitting ? 'Posting Blessing...' : 'Post Blessing to Guestbook'}</span>
              </button>

              {successNotice && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 text-center font-semibold animate-fadeIn">
                  ✓ Your blessing has been added to the guestbook!
                </div>
              )}
            </form>
          </div>

          {/* Entries Feed */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
              {['All', ...BLESSING_TYPES].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl whitespace-nowrap transition-all ${
                    activeFilter === filter
                      ? 'bg-zinc-950 text-white shadow-xs'
                      : 'bg-white text-zinc-700 border border-zinc-200 hover:bg-zinc-100 hover:text-zinc-950'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* List of Entries */}
            <div className="space-y-4">
              {filteredEntries.map((entry) => (
                <div
                  key={entry.id}
                  className="bg-white p-5 sm:p-6 rounded-2xl border border-zinc-200 hover:border-purple-300 shadow-sm transition-all space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h4 className="font-serif-luxury font-bold text-base sm:text-lg text-zinc-950">
                        {entry.name}
                      </h4>
                      <div className="flex items-center gap-2 text-[11px] text-zinc-500 mt-0.5">
                        <span>{entry.relationship}</span>
                        <span aria-hidden="true">·</span>
                        <span className="text-purple-700 font-semibold">{entry.blessingType}</span>
                        <span aria-hidden="true">·</span>
                        <span>{new Date(entry.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleLike(entry.id)}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-50 hover:bg-pink-100 border border-pink-200 text-xs text-pink-700 transition-colors shadow-2xs"
                      title="Heart this blessing"
                    >
                      <Heart className="w-3.5 h-3.5 text-pink-600 fill-pink-500" />
                      <span className="font-mono text-[11px] font-bold">{entry.likes}</span>
                    </button>
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-700 font-sans-body leading-relaxed whitespace-pre-line">
                    {entry.message}
                  </p>
                </div>
              ))}

              {filteredEntries.length === 0 && (
                <div className="p-8 text-center bg-white rounded-2xl border border-zinc-200 text-xs text-zinc-500">
                  No messages found in this category yet. Be the first to share your blessing!
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
