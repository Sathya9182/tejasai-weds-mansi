import React from 'react';
import { Heart, Phone, ArrowUp, Shield } from 'lucide-react';

interface FooterProps {
  onOpenOrganizer: () => void;
  onOpenRSVP: () => void;
  onOpenCard: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenOrganizer,
  onOpenRSVP,
  onOpenCard,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-zinc-950 border-t border-zinc-800 text-zinc-400 pt-14 pb-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Sacred Sloka Banner */}
        <div className="text-center max-w-xl mx-auto space-y-2">
          <p className="font-telugu-script text-xs sm:text-sm text-pink-400/90 italic leading-relaxed">
            శ్లో|| కళ్యాణాద్భుత గాత్రాయ కామితార్థ ప్రదాయినే |<br />
            శ్రీమద్వేంకటనాథాయ శ్రీనివాసాయ మంగళం ||
          </p>
          <div className="w-16 h-[1px] bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 mx-auto mt-2" />
        </div>

        {/* Brand & Family lockup */}
        <div className="text-center space-y-3">
          <h3 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-white tracking-wide">
            Teja Sai <span className="font-serif italic font-normal text-pink-400">&amp;</span> Mansi
          </h3>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto">
            Grandson of Late Sri Nallamekala Subbanna &amp; Smt. Guramma<br />
            Son of Sri Nallamekala Nagaraju &amp; Smt. Lakshmidevi<br />
            <span className="font-medium text-purple-300">Sri Neelakanteswara Steels, Proddatur</span>
          </p>
        </div>

        {/* Quick Footer Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-zinc-400 pt-4 border-t border-zinc-800">
          <a href="#events" className="hover:text-pink-400 transition-colors">
            Events &amp; Schedule
          </a>
          <a href="#logistics" className="hover:text-pink-400 transition-colors">
            Venue &amp; Travel
          </a>
          <a href="#photos" className="hover:text-pink-400 transition-colors">
            Photo Gallery
          </a>
          <a href="#registry" className="hover:text-pink-400 transition-colors">
            Gift Registry
          </a>
          <a href="#guestbook" className="hover:text-pink-400 transition-colors">
            Guestbook
          </a>
          <button
            onClick={onOpenCard}
            className="hover:text-pink-400 transition-colors cursor-pointer"
          >
            Digital Wedding Card
          </button>
          <button
            onClick={onOpenOrganizer}
            className="inline-flex items-center gap-1.5 hover:text-purple-400 transition-colors font-bold cursor-pointer text-zinc-300"
          >
            <Shield className="w-3.5 h-3.5 text-purple-400" />
            <span>Organizer Portal</span>
          </button>
        </div>

        {/* Bottom Copyright & Back to Top */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 pt-6 border-t border-zinc-800">
          <p>
            With Best Compliments from Nallamekala &amp; Pottendla Families and Near &amp; Dear.
          </p>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 transition-colors cursor-pointer border border-zinc-800"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-pink-400" />
          </button>
        </div>

      </div>
    </footer>
  );
};
