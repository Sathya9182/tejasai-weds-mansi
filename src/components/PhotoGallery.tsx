import React, { useState } from 'react';
import { Camera, X, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { GalleryPhoto } from '../types/wedding';

interface PhotoGalleryProps {
  currentLang: 'en' | 'te';
}

const PHOTOS: GalleryPhoto[] = [
  {
    id: 'photo-1',
    url: '/src/assets/images/hero_couple_portrait_1790219990819.jpg',
    title: 'The Royal Portrait',
    caption: 'Chi. Teja Sai & Chi.La.Sow. Mansi in timeless royal ivory and silk attire.',
    category: 'Couple Portrait',
    aspect: 'col-span-12 md:col-span-7',
  },
  {
    id: 'photo-3d-arch',
    url: '/src/assets/images/floral_3d_arch_mandap_1790221081353.jpg',
    title: '3D Floral Arch & Mandap Installation',
    caption: 'Bespoke 3D floral design in romantic blush pink peonies and sacred purple orchids.',
    category: '3D Floral Concept',
    aspect: 'col-span-12 md:col-span-5',
  },
  {
    id: 'photo-2',
    url: '/src/assets/images/couple_engagement_editorial_1790220005500.jpg',
    title: 'Sunlit Courtyard Moments',
    caption: 'Celebrating smiles, shared laughter, and new beginnings during the engagement festivities.',
    category: 'Engagement Celebration',
    aspect: 'col-span-12 md:col-span-5',
  },
  {
    id: 'photo-3',
    url: '/src/assets/images/traditional_muhurtham_ceremony_1790220019346.jpg',
    title: 'Sacred Vows & Heritage',
    caption: 'Hands clasped in devotion with fragrant jasmine blossoms, sacred rings, and Vedic mantras.',
    category: 'Sacred Rituals',
    aspect: 'col-span-12 md:col-span-4',
  },
  {
    id: 'photo-4',
    url: '/src/assets/images/floral_3d_hero_bouquet_1790221067388.jpg',
    title: 'Blossoming Peonies & Orchids',
    caption: 'Symbolizing everlasting love, prosperity, and joy for Chi. Teja Sai and Chi.La.Sow. Mansi.',
    category: 'Floral Symbolism',
    aspect: 'col-span-12 md:col-span-3',
  },
];

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({ currentLang }) => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedPhotoIndex(index);
  };

  const closeLightbox = () => {
    setSelectedPhotoIndex(null);
  };

  const nextPhoto = () => {
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((selectedPhotoIndex + 1) % PHOTOS.length);
    }
  };

  const prevPhoto = () => {
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((selectedPhotoIndex - 1 + PHOTOS.length) % PHOTOS.length);
    }
  };

  return (
    <section id="photos" className="py-16 md:py-24 bg-zinc-50/70 border-t border-zinc-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <p className="text-xs uppercase tracking-[0.2em] font-bold text-purple-700 flex items-center justify-center gap-1.5">
            <Camera className="w-3.5 h-3.5 text-pink-500" />
            <span>{currentLang === 'te' ? 'చిత్రమాలిక' : 'Moments & Memories'}</span>
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-luxury font-medium text-zinc-950">
            {currentLang === 'te' ? 'వధూవరుల సుందర చిత్రాలు' : 'Photos of Teja & Mansi'}
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 font-sans-body">
            {currentLang === 'te'
              ? 'తేజ సాయి మరియు మాన్సి ల మధుర జ్ఞాపకాలు, ముందస్తు వేడుకల చిత్రాలు.'
              : 'Glimpses into our story, engagement festivities, and the 3D floral atmosphere in Proddatur.'}
          </p>
        </div>

        {/* Gallery Bento Grid */}
        <div className="grid grid-cols-12 gap-4 sm:gap-6">
          {PHOTOS.map((photo, index) => (
            <div
              key={photo.id}
              onClick={() => openLightbox(index)}
              className={`${photo.aspect} group relative overflow-hidden rounded-2xl cursor-pointer bg-zinc-900 border border-zinc-200 shadow-sm hover:shadow-xl transition-all duration-300`}
            >
              <div className="aspect-[16/10] w-full overflow-hidden">
                <img
                  src={photo.url}
                  alt={photo.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
              </div>

              {/* Scrim overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/85 via-zinc-950/25 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              {/* Details & Category */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white flex items-end justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-pink-300 font-bold block mb-1">
                    {photo.category}
                  </span>
                  <h3 className="text-base sm:text-lg font-serif-luxury font-semibold text-white leading-tight">
                    {photo.title}
                  </h3>
                  <p className="text-xs text-zinc-300 line-clamp-1 mt-1 hidden sm:block">
                    {photo.caption}
                  </p>
                </div>
                <button
                  className="p-2 bg-white/20 backdrop-blur-md hover:bg-pink-500 text-white rounded-full transition-colors shrink-0 ml-3"
                  aria-label="View photo"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {selectedPhotoIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 backdrop-blur-md p-4">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors z-50"
            aria-label="Close photo view"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Previous Button */}
          <button
            onClick={prevPhoto}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors z-50"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Current Photo Frame */}
          <div className="max-w-4xl max-h-[85vh] flex flex-col items-center justify-center">
            <img
              src={PHOTOS[selectedPhotoIndex].url}
              alt={PHOTOS[selectedPhotoIndex].title}
              className="max-h-[70vh] w-auto max-w-full object-contain rounded-xl shadow-2xl border border-white/20"
            />
            <div className="mt-4 text-center text-white max-w-xl">
              <span className="text-xs uppercase tracking-widest text-pink-400 font-bold">
                {PHOTOS[selectedPhotoIndex].category}
              </span>
              <h4 className="text-xl font-serif-luxury font-medium mt-0.5">
                {PHOTOS[selectedPhotoIndex].title}
              </h4>
              <p className="text-xs text-zinc-300 mt-1">
                {PHOTOS[selectedPhotoIndex].caption}
              </p>
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={nextPhoto}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors z-50"
            aria-label="Next photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </section>
  );
};
