import React, { useState } from 'react';
import { X, Printer, ChevronLeft, ChevronRight, Phone } from 'lucide-react';

interface InvitationCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  guestName?: string;
}

export const InvitationCardModal: React.FC<InvitationCardModalProps> = ({
  isOpen,
  onClose,
  guestName = 'Respected Guest & Family',
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border-2 border-purple-300 overflow-hidden my-auto">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-200 bg-zinc-950 text-white">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-widest text-pink-400 font-bold">
              Original Wedding Invitation Card
            </span>
            <span className="text-xs text-zinc-400 font-mono">
              (Page {currentPage} of 4)
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Quick Page Select Tabs */}
            <div className="hidden sm:flex items-center bg-zinc-800 p-0.5 rounded-xl text-xs">
              <button
                onClick={() => setCurrentPage(1)}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  currentPage === 1 ? 'bg-purple-600 font-bold text-white shadow-xs' : 'text-zinc-400 hover:text-white'
                }`}
              >
                1. తెలుగు పత్రిక
              </button>
              <button
                onClick={() => setCurrentPage(2)}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  currentPage === 2 ? 'bg-purple-600 font-bold text-white shadow-xs' : 'text-zinc-400 hover:text-white'
                }`}
              >
                2. English Card
              </button>
              <button
                onClick={() => setCurrentPage(3)}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  currentPage === 3 ? 'bg-purple-600 font-bold text-white shadow-xs' : 'text-zinc-400 hover:text-white'
                }`}
              >
                3. Cordially Yours
              </button>
              <button
                onClick={() => setCurrentPage(4)}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  currentPage === 4 ? 'bg-purple-600 font-bold text-white shadow-xs' : 'text-zinc-400 hover:text-white'
                }`}
              >
                4. Envelope
              </button>
            </div>

            <button
              onClick={handlePrint}
              className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors cursor-pointer"
              title="Print Invitation Card"
            >
              <Printer className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors cursor-pointer"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Card Canvas Container */}
        <div className="p-4 sm:p-8 md:p-12 overflow-y-auto max-h-[80vh] flex flex-col items-center justify-center bg-zinc-100">
          
          {/* Card Border Frame */}
          <div className="w-full max-w-3xl bg-white border-2 border-purple-200 rounded-2xl p-6 sm:p-10 shadow-lg relative min-h-[520px] flex flex-col justify-between">
            {/* Elegant Ornamental Corner Accents */}
            <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-purple-500" />
            <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-purple-500" />
            <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-pink-500" />
            <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-pink-500" />

            {/* PAGE 1: TELUGU SUBHA PATHRIKA */}
            {currentPage === 1 && (
              <div className="space-y-4 text-center font-telugu-script text-[#2C2523]">
                <div className="text-sm font-semibold tracking-wider text-[#9B7735]">
                  శ్రీరస్తు ! శుభమస్తు !! అవిఘ్నమస్తు !!!
                </div>

                <div className="flex justify-center my-2">
                  <div className="w-12 h-12 rounded-full border border-[#D4AF37] flex items-center justify-center text-[#9B7735] text-xl font-bold">
                    శ్రీ
                  </div>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-[#785A21]">
                  నల్లమేకల వారి వివాహ ఆహ్వాన పత్రిక
                </h2>

                <p className="text-xs sm:text-sm text-[#4A403A] italic font-serif leading-relaxed">
                  శ్లో|| కళ్యాణాద్భుత గాత్రాయ కామితార్థ ప్రదాయినే |<br />
                  శ్రీమద్వేంకటనాథాయ శ్రీనివాసాయ మంగళం ||
                </p>

                <p className="text-xs sm:text-sm text-[#3E342F] leading-relaxed max-w-2xl mx-auto">
                  స్వస్తిశ్రీ పరాభవ నామ సంవత్సర ఆశ్వీయుజమాస శుద్ధ షష్ఠి అనగా <strong className="text-[#785A21]">16-10-2026</strong> వ తేదీ శుక్రవారం ఉదయం <strong className="text-[#785A21]">07:58</strong> ని॥లకు మూల నక్షత్రయుక్త తులా లగ్న పుష్కరాంశము నందు
                </p>

                <div className="py-2 border-y border-[#EFE5D3] space-y-3">
                  <p className="text-xs sm:text-sm">
                    స్వర్గీయ శ్రీ నల్లమేకల సుబ్బన్న &amp; శ్రీమతి గురమ్మ గార్ల మనుమడు,<br />
                    శ్రీ నల్లమేకల నాగరాజు &amp; శ్రీమతి లక్ష్మీదేవి గార్ల కనిష్ట పుత్రుడు<br />
                    <span className="text-lg sm:text-xl font-bold text-[#2C2523] block mt-1">
                      చి॥ తేజ సాయి <span className="text-xs font-normal text-[#785A21]">(మేనేజింగ్ డైరెక్టర్ ఆఫ్ NAMATE)</span>
                    </span>
                  </p>

                  <div className="text-xs font-bold uppercase tracking-widest text-[#9B7735]">— తో —</div>

                  <p className="text-xs sm:text-sm">
                    వై.యస్.ఆర్. కడప జిల్లా, ప్రొద్దుటూరు టౌన్, గ్రీన్‌లాండ్ కాలనీ వాస్తవ్యులు<br />
                    శ్రీ పొత్తేండ్ల భగవాన్ &amp; శ్రీమతి అంజన గార్ల జ్యేష్ఠ పుత్రిక<br />
                    <span className="text-lg sm:text-xl font-bold text-[#2C2523] block mt-1">
                      చి॥ల॥సౌ॥ మాన్సి <span className="text-xs font-normal text-[#785A21]">(B.Tech Food Technology)</span>
                    </span>
                  </p>
                </div>

                <p className="text-xs text-[#5A504B] italic leading-relaxed">
                  వివాహము మామిడితోరణాలు.... మంచిగంధాలు..... మంగళవాయిద్యాలు..... వేదమంత్రాల నడుమ ఒక్కటవుతున్న శుభవేళ తామెల్లరు విచ్చేసి వధూవరులను ఆశీర్వదించ ప్రార్థన....
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2 border-t border-[#EFE5D3] text-left">
                  <div className="bg-[#FAF7F2] p-3 rounded border border-[#E8DEC8]">
                    <span className="font-bold text-[#785A21] block mb-1">కళ్యాణ వేదిక:</span>
                    <p className="font-semibold text-[#2C2523]">రెడ్డి కళ్యాణ మండపము</p>
                    <p className="text-[#5A504B]">పెన్నా నది తీరమున, యర్రగుంట్ల రోడ్, ప్రొద్దుటూరు, వై.యస్.ఆర్. కడప జిల్లా.</p>
                  </div>

                  <div className="bg-[#FAF7F2] p-3 rounded border border-[#E8DEC8]">
                    <span className="font-bold text-[#785A21] block mb-1">రిసెప్షన్, విందు, వినోదం:</span>
                    <p className="font-semibold text-[#2C2523]">15-10-2026 వ తేదీ గురువారం</p>
                    <p className="text-[#5A504B]">రాత్రి గం॥ 7:30 ని॥లకు</p>
                  </div>
                </div>

                <div className="text-xs text-[#5A504B] pt-2">
                  <span className="font-semibold text-[#2C2523]">ఆహ్వానించువారు:</span> శ్రీమతి &amp; శ్రీ నల్లమేకల లక్ష్మీదేవి - నాగరాజు, శ్రీ నీలకంఠేశ్వర స్టీల్స్, ప్రొద్దుటూరు.
                </div>
              </div>
            )}

            {/* PAGE 2: ENGLISH INVITATION */}
            {currentPage === 2 && (
              <div className="space-y-5 text-center text-[#2C2523]">
                <p className="text-xs uppercase tracking-widest font-serif-luxury font-semibold text-[#9B7735]">
                  Srirasthu ! Shubhamasthu!! Avignamasthu!!!
                </p>

                <div className="space-y-1">
                  <h2 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-[#2C2523]">
                    Nallamekala&apos;s Wedding Invitation
                  </h2>
                  <p className="text-xs sm:text-sm text-[#5A504B] italic font-serif">
                    We solicit your gracious presence with family and friends on the auspicious occasion of the marriage of
                  </p>
                </div>

                <div className="space-y-3 py-2 border-y border-[#EFE5D3]">
                  <div>
                    <p className="text-xs text-[#736862]">
                      Grand S/o. Late Sri Nallamekala Subbanna &amp; Smt. Guramma
                    </p>
                    <p className="text-xs text-[#736862]">
                      Sri Nallamekala Nagaraju &amp; Smt. Lakshmidevi&apos;s Youngest Son
                    </p>
                    <p className="text-xl sm:text-2xl font-serif-luxury font-bold text-[#785A21] mt-1">
                      Chi. Teja Sai <span className="text-xs font-sans-body font-normal text-[#5A504B]">Managing Director of NAMATE</span>
                    </p>
                  </div>

                  <p className="text-xs font-serif italic text-[#9B7735] font-semibold">With</p>

                  <div>
                    <p className="text-xl sm:text-2xl font-serif-luxury font-bold text-[#785A21]">
                      Chi.La.Sow. Mansi <span className="text-xs font-sans-body font-normal text-[#5A504B]">B.Tech (Food Technology)</span>
                    </p>
                    <p className="text-xs text-[#736862] mt-1">
                      Eldest D/o. Sri Pottendla Bhagavan &amp; Smt. Anjana
                    </p>
                    <p className="text-xs text-[#736862]">
                      Green Land Colony, Proddatur Town, YSR Kadapa Dist.
                    </p>
                  </div>
                </div>

                {/* Sumuhurtham Highlight */}
                <div className="my-2">
                  <div className="inline-block px-4 py-1 border-y border-[#C5A059] text-xs font-semibold uppercase tracking-widest text-[#785A21]">
                    SUMUHURTHAM
                  </div>
                  <p className="text-sm sm:text-base font-serif-luxury font-bold text-[#2C2523] mt-1">
                    On Friday, 16<sup>th</sup> October 2026 at 07:58 A.M. &ldquo;Tula Lagnam&rdquo;
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-left pt-2">
                  <div className="bg-[#FAF7F2] p-3 rounded border border-[#E8DEC8]">
                    <span className="font-bold text-[#785A21] block mb-1">Venue:</span>
                    <p className="font-semibold text-[#2C2523]">Reddy Function Hall</p>
                    <p className="text-[#5A504B]">Near Penna River, Proddatur, YSR Kadapa Dist.</p>
                  </div>

                  <div className="bg-[#FAF7F2] p-3 rounded border border-[#E8DEC8]">
                    <span className="font-bold text-[#785A21] block mb-1">Reception &amp; Dinner:</span>
                    <p className="font-semibold text-[#2C2523]">On Thursday, 15<sup>th</sup> October 2026</p>
                    <p className="text-[#5A504B]">At 7:30 p.m. onwards</p>
                  </div>
                </div>

                <p className="text-xs text-[#736862] italic pt-2">
                  With Best Compliments from: Nallamekala Family and Near &amp; Dear
                </p>
              </div>
            )}

            {/* PAGE 3: CORDIALLY YOURS */}
            {currentPage === 3 && (
              <div className="space-y-6 text-center text-[#2C2523] my-auto">
                <div className="py-4">
                  <h3 className="text-3xl sm:text-4xl font-serif-luxury font-bold text-[#2C2523] tracking-wide">
                    Teja Sai <span className="italic font-normal text-[#9B7735]">weds</span> Mansi
                  </h3>
                  <div className="w-24 h-[1px] bg-[#C5A059] mx-auto mt-4" />
                </div>

                <div className="space-y-2 max-w-md mx-auto">
                  <p className="text-xs uppercase tracking-widest text-[#9B7735] font-semibold">
                    Cordially Yours
                  </p>
                  <p className="text-base sm:text-lg font-serif-luxury font-semibold text-[#2C2523]">
                    Smt. Nallamekala Lakshmidevi &amp; Sri Nallamekala Nagaraju
                  </p>
                  <p className="text-sm font-medium text-[#785A21]">
                    Sri Neelakanteswara Steels, Proddatur
                  </p>
                  <p className="text-xs text-[#5A504B]">
                    Khadarabad Village, Proddatur Mdl., YSR Kadapa Dist.
                  </p>
                </div>

                <div className="pt-4 border-t border-[#EFE5D3] max-w-sm mx-auto">
                  <p className="text-xs text-[#736862] uppercase tracking-wider mb-2 font-semibold">
                    Contact &amp; Coordinators:
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    {['9440159587', '9000009370', '8886868780'].map((num) => (
                      <a
                        key={num}
                        href={`tel:${num}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FAF7F2] hover:bg-[#F3ECE2] border border-[#E8DEC8] rounded-md text-xs font-mono text-[#2C2523] transition-colors"
                      >
                        <Phone className="w-3 h-3 text-[#9B7735]" />
                        <span>{num}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* PAGE 4: ENVELOPE */}
            {currentPage === 4 && (
              <div className="space-y-6 text-center text-[#2C2523] my-auto">
                <div className="border border-[#D4AF37]/40 p-6 rounded-lg bg-[#FAF7F2]">
                  <p className="text-xs uppercase tracking-widest text-[#9B7735] font-semibold mb-2">
                    Nallamekala&apos;s Wedding Invitation
                  </p>
                  
                  <div className="py-4 text-left max-w-sm mx-auto border-b border-[#E0D3C1] space-y-1">
                    <span className="text-xs uppercase tracking-widest text-[#736862]">To:</span>
                    <p className="text-lg font-serif-luxury font-bold text-[#2C2523]">
                      {guestName}
                    </p>
                    <p className="text-xs text-[#5A504B]">
                      We joyfully invite you and your family to join us on this auspicious celebration.
                    </p>
                  </div>

                  <div className="py-4">
                    <p className="text-2xl font-serif-luxury font-bold text-[#785A21]">
                      Teja Sai <span className="italic font-normal text-sm font-serif">weds</span> Mansi
                    </p>
                    <p className="text-xs font-medium text-[#5A504B] mt-1">
                      Friday 16 October 2026 · Proddatur
                    </p>
                  </div>

                  <div className="text-left text-xs pt-4 border-t border-[#E0D3C1] space-y-1 text-[#5A504B]">
                    <span className="font-semibold text-[#2C2523]">From:</span>
                    <p>Smt. Nallamekala Lakshmidevi &amp; Sri Nallamekala Nagaraju</p>
                    <p>Sri Neelakanteswara Steels, Proddatur, Khadarabad Village, Proddatur Mdl.</p>
                    <p className="font-mono text-[#785A21]">Cell: 9440159587, 9000009370, 8886868780</p>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Bottom Pagination Controls */}
          <div className="flex items-center justify-between w-full max-w-3xl mt-4 px-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-[#5A504B] hover:text-[#2C2523] disabled:opacity-30 disabled:pointer-events-none rounded transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous Page</span>
            </button>

            <span className="text-xs text-[#736862] font-mono">
              Page {currentPage} of 4
            </span>

            <button
              onClick={() => setCurrentPage((p) => Math.min(4, p + 1))}
              disabled={currentPage === 4}
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-[#5A504B] hover:text-[#2C2523] disabled:opacity-30 disabled:pointer-events-none rounded transition-colors"
            >
              <span>Next Page</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
