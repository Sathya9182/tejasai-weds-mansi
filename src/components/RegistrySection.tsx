import React, { useState, useEffect, useMemo } from 'react';
import QRCode from 'qrcode';
import {
  Gift,
  Heart,
  QrCode,
  Check,
  Copy,
  Sparkles,
  Home,
  Flame,
  BookOpen,
  Download,
  ExternalLink,
  ShieldCheck,
  Smartphone,
  X,
} from 'lucide-react';

interface RegistrySectionProps {
  currentLang: 'en' | 'te';
}

export const RegistrySection: React.FC<RegistrySectionProps> = ({ currentLang }) => {
  const [copiedUPI, setCopiedUPI] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  const [pledgedFund, setPledgedFund] = useState<string | null>(null);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [qrThumbnailUrl, setQrThumbnailUrl] = useState<string>('');

  const upiId = '9440159587@upi';
  const payeeName = 'Teja Sai & Mansi';

  // Auspicious Indian Wedding Shagun amounts
  const shagunPresets = [
    { label: 'Any Amount', value: null },
    { label: '₹501', value: 501 },
    { label: '₹1,001', value: 1001 },
    { label: '₹2,100', value: 2100 },
    { label: '₹5,100', value: 5100 },
  ];

  // Authentic NPCI UPI Intent URI format
  const upiPaymentUri = useMemo(() => {
    let uri = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(payeeName)}&cu=INR&tn=${encodeURIComponent('Wedding Blessings and Shagun')}`;
    if (selectedAmount && selectedAmount > 0) {
      uri += `&am=${selectedAmount}`;
    }
    return uri;
  }, [upiId, payeeName, selectedAmount]);

  // Generate authentic scannable QR Code
  useEffect(() => {
    // Generate large high-resolution original QR code
    QRCode.toDataURL(upiPaymentUri, {
      width: 440,
      margin: 2,
      color: {
        dark: '#09090b',
        light: '#ffffff',
      },
      errorCorrectionLevel: 'H',
    })
      .then((url) => setQrCodeUrl(url))
      .catch((err) => console.error('Failed to generate high-res QR:', err));

    // Generate crisp thumbnail
    QRCode.toDataURL(upiPaymentUri, {
      width: 240,
      margin: 1,
      color: {
        dark: '#09090b',
        light: '#ffffff',
      },
      errorCorrectionLevel: 'M',
    })
      .then((url) => setQrThumbnailUrl(url))
      .catch((err) => console.error('Failed to generate thumbnail QR:', err));
  }, [upiPaymentUri]);

  const copyUPI = () => {
    navigator.clipboard.writeText(upiId);
    setCopiedUPI(true);
    setTimeout(() => setCopiedUPI(false), 2500);
  };

  const registryOptions = [
    {
      id: 'sacred_puja',
      title: 'Sacred Silverware & Mandir Setup',
      icon: Flame,
      description: 'Bless Teja & Mansi’s home mandir with traditional auspicious silver deepams, puja vessels, and sacred deities for daily prayers.',
      tag: 'Auspicious Heritage',
    },
    {
      id: 'home',
      title: 'New Home & Culinary Essentials',
      icon: Home,
      description: 'With Mansi’s food technology passion, help curate modern kitchen equipment and cozy living essentials for their new journey together.',
      tag: 'Home Setup',
    },
    {
      id: 'charity',
      title: 'Kadapa Rural Education Initiative',
      icon: BookOpen,
      description: 'Contribute in honor of the couple to sponsor books, nutrition, and school supplies for underprivileged children in YSR Kadapa District.',
      tag: 'Charitable Giving',
    },
  ];

  return (
    <section id="registry" className="py-16 md:py-24 bg-white border-t border-zinc-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <p className="text-xs uppercase tracking-[0.2em] font-semibold text-purple-700 flex items-center justify-center gap-1.5">
            <Gift className="w-3.5 h-3.5 text-pink-500" />
            <span>{currentLang === 'te' ? 'శుభాశీస్సులు & కానుకలు' : 'Blessings & Gift Registry'}</span>
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-luxury font-medium text-zinc-950">
            {currentLang === 'te' ? 'మీ రాకయే మాకు అమూల్యమైన కానుక' : 'Your Presence is Our Greatest Gift'}
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 font-sans-body">
            {currentLang === 'te'
              ? 'మీ ఆశీస్సులు మరియు శుభాకాంక్షలు మా జీవితానికి ఎంతో విలువైంది. ప్రత్యేకంగా కానుకలు అందించదలచిన వారికి కింద వివరాలు అందుబాటులో ఉన్నాయి.'
              : 'Having you celebrate our marriage with love and prayers is all we truly desire. For friends and family who have kindly inquired about gifting options, we have curated a few thoughtful ways below.'}
          </p>
        </div>

        {/* Digital Shagun Feature Card with Live Original QR Code */}
        <div className="max-w-3xl mx-auto bg-gradient-to-b from-white to-pink-50/30 rounded-2xl p-6 sm:p-8 border-2 border-purple-200/80 shadow-md mb-10 text-center space-y-6 relative overflow-hidden">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center mx-auto text-white shadow-xs">
            <Heart className="w-6 h-6 fill-white" />
          </div>

          <div>
            <h3 className="text-2xl font-serif-luxury font-bold text-zinc-950">
              Digital Shagun &amp; Blessings
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 mt-1 max-w-md mx-auto">
              Send traditional wedding blessings and shagun directly via any UPI App (Google Pay, PhonePe, Paytm, BHIM, or CRED).
            </p>
          </div>

          {/* Genuine QR Code Card Banner */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 p-4 sm:p-5 bg-white rounded-2xl border border-purple-100 shadow-sm max-w-lg mx-auto">
            {/* Real Scannable QR Code Thumbnail */}
            <div
              onClick={() => setShowQRModal(true)}
              className="group cursor-pointer relative p-2.5 bg-zinc-50 rounded-xl border-2 border-dashed border-pink-300 hover:border-purple-500 transition-all shadow-inner flex flex-col items-center"
              title="Click to view full original QR Code"
            >
              {qrThumbnailUrl ? (
                <img
                  src={qrThumbnailUrl}
                  alt="Original UPI QR Code"
                  className="w-32 h-32 sm:w-36 sm:h-36 object-contain rounded-lg transition-transform group-hover:scale-105"
                />
              ) : (
                <div className="w-32 h-32 sm:w-36 sm:h-36 bg-zinc-100 animate-pulse rounded-lg flex items-center justify-center">
                  <QrCode className="w-12 h-12 text-zinc-400" />
                </div>
              )}
              <span className="text-[10px] text-purple-700 font-semibold mt-1.5 flex items-center gap-1 group-hover:underline">
                <QrCode className="w-3 h-3" />
                <span>Tap to enlarge</span>
              </span>
            </div>

            {/* UPI ID & Quick Actions */}
            <div className="flex flex-col items-center sm:items-start space-y-3 text-center sm:text-left">
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-purple-50 text-purple-800 rounded-full border border-purple-200 text-[11px] font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
                <span>Verified UPI Payee: {payeeName}</span>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-2 bg-zinc-50 rounded-xl border border-zinc-200 text-xs font-mono text-zinc-900">
                <span className="text-zinc-500 font-sans">UPI ID:</span>
                <span className="font-bold text-purple-700 select-all">{upiId}</span>
                <button
                  onClick={copyUPI}
                  className="p-1 hover:bg-zinc-200 rounded text-zinc-600 hover:text-zinc-950 transition-colors ml-0.5"
                  title="Copy UPI ID"
                >
                  {copiedUPI ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setShowQRModal(true)}
                  className="px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 hover:from-pink-600 hover:via-purple-700 hover:to-indigo-700 rounded-xl transition-all inline-flex items-center gap-1.5 shadow-xs"
                >
                  <QrCode className="w-3.5 h-3.5" />
                  <span>View Original QR</span>
                </button>

                <a
                  href={upiPaymentUri}
                  className="px-3.5 py-2 text-xs font-semibold text-zinc-800 bg-zinc-100 hover:bg-zinc-200 border border-zinc-300 rounded-xl transition-colors inline-flex items-center gap-1"
                >
                  <Smartphone className="w-3.5 h-3.5 text-purple-600" />
                  <span>Pay via App</span>
                </a>
              </div>

              {copiedUPI && (
                <p className="text-xs text-emerald-700 font-medium">
                  ✓ UPI ID copied to clipboard!
                </p>
              )}
            </div>
          </div>

          {/* Supported UPI Apps logos */}
          <div className="pt-2">
            <span className="text-[11px] text-zinc-400 block mb-2 font-medium">
              Works with any UPI app on your smartphone:
            </span>
            <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] font-semibold text-zinc-600">
              <span className="px-2.5 py-1 bg-white border border-zinc-200 rounded-lg shadow-2xs">Google Pay</span>
              <span className="px-2.5 py-1 bg-white border border-zinc-200 rounded-lg shadow-2xs">PhonePe</span>
              <span className="px-2.5 py-1 bg-white border border-zinc-200 rounded-lg shadow-2xs">Paytm</span>
              <span className="px-2.5 py-1 bg-white border border-zinc-200 rounded-lg shadow-2xs">BHIM UPI</span>
              <span className="px-2.5 py-1 bg-white border border-zinc-200 rounded-lg shadow-2xs">CRED</span>
              <span className="px-2.5 py-1 bg-white border border-zinc-200 rounded-lg shadow-2xs">Any Bank App</span>
            </div>
          </div>
        </div>

        {/* Curated Registry Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {registryOptions.map((item) => {
            const IconComponent = item.icon;
            const isPledged = pledgedFund === item.id;
            return (
              <div
                key={item.id}
                className="bg-white p-6 rounded-2xl border border-zinc-200 flex flex-col justify-between hover:shadow-md hover:border-purple-300 transition-all space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-50 to-purple-50 border border-purple-200 flex items-center justify-center text-purple-700">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] uppercase tracking-wider text-purple-700 font-semibold bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-200">
                      {item.tag}
                    </span>
                  </div>

                  <h4 className="text-lg font-serif-luxury font-bold text-zinc-950">
                    {item.title}
                  </h4>

                  <p className="text-xs text-zinc-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-zinc-100">
                  {isPledged ? (
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-2 rounded-lg border border-emerald-200">
                      <Check className="w-4 h-4" />
                      <span>Thank you for your blessing!</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setShowQRModal(true);
                        setPledgedFund(item.id);
                      }}
                      className="w-full py-2 px-3 text-xs font-semibold text-zinc-900 bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 rounded-xl transition-colors inline-flex items-center justify-center gap-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-pink-500" />
                      <span>Contribute via UPI</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* ============================================================== */}
      {/* AUTHENTIC ORIGINAL UPI QR CODE MODAL                           */}
      {/* ============================================================== */}
      {showQRModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 border-2 border-purple-300 shadow-2xl text-center space-y-5 relative my-8 animate-fadeIn">
            {/* Close Button */}
            <button
              onClick={() => setShowQRModal(false)}
              className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-zinc-950 hover:bg-zinc-100 rounded-full transition-colors"
              aria-label="Close QR Modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Official BHIM UPI Header */}
            <div className="pt-1 flex flex-col items-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-emerald-50 via-purple-50 to-pink-50 border border-purple-200 rounded-full shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[11px] font-bold text-zinc-900 tracking-wider uppercase">
                  BHIM UPI • Scan &amp; Pay
                </span>
              </div>
              <h4 className="text-2xl font-serif-luxury font-bold text-zinc-950 mt-2">
                {payeeName}
              </h4>
              <p className="text-xs text-zinc-500 font-sans">
                Wedding Shagun &amp; Blessings
              </p>
            </div>

            {/* Genuine Scannable QR Code Frame */}
            <div className="p-4 bg-gradient-to-b from-zinc-50 to-zinc-100/60 rounded-2xl border-2 border-purple-200 inline-block shadow-inner relative">
              <div className="bg-white p-3 rounded-xl shadow-sm border border-zinc-200 flex flex-col items-center">
                {qrCodeUrl ? (
                  <img
                    src={qrCodeUrl}
                    alt="Original UPI QR Code"
                    className="w-56 h-56 sm:w-64 sm:h-64 object-contain rounded-md"
                  />
                ) : (
                  <div className="w-56 h-56 sm:w-64 sm:h-64 bg-zinc-50 animate-pulse flex items-center justify-center">
                    <QrCode className="w-16 h-16 text-zinc-400" />
                  </div>
                )}
                
                <div className="mt-2 flex items-center gap-1.5 text-xs text-zinc-700 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Scan using any UPI App camera or scanner</span>
                </div>
              </div>
            </div>

            {/* Auspicious Shagun Presets */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider block">
                Quick Shagun Amount (Optional)
              </span>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {shagunPresets.map((preset) => {
                  const isSelected = selectedAmount === preset.value;
                  return (
                    <button
                      key={preset.label}
                      onClick={() => setSelectedAmount(preset.value)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        isSelected
                          ? 'bg-purple-700 text-white shadow-xs'
                          : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200 border border-zinc-200'
                      }`}
                    >
                      {preset.label}
                    </button>
                  );
                })}
              </div>
              {selectedAmount && (
                <p className="text-[11px] text-purple-700 font-medium">
                  ✓ QR code updated with ₹{selectedAmount.toLocaleString('en-IN')} Shagun
                </p>
              )}
            </div>

            {/* UPI ID Display & Copy */}
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2.5 bg-zinc-50 rounded-xl border border-zinc-200">
                <div className="text-left pl-1">
                  <span className="text-[10px] text-zinc-500 block uppercase tracking-wider">
                    UPI ID
                  </span>
                  <span className="font-mono text-xs sm:text-sm font-bold text-zinc-900 select-all">
                    {upiId}
                  </span>
                </div>
                <button
                  onClick={copyUPI}
                  className="px-3 py-1.5 text-xs font-semibold text-zinc-800 bg-white hover:bg-zinc-100 border border-zinc-300 rounded-lg transition-colors inline-flex items-center gap-1.5 shadow-2xs"
                >
                  {copiedUPI ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-zinc-600" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Action Buttons: Pay directly on mobile & Download QR */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              <a
                href={upiPaymentUri}
                className="w-full py-2.5 px-3 text-xs font-semibold text-white bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 hover:from-pink-600 hover:via-purple-700 hover:to-indigo-700 rounded-xl transition-all inline-flex items-center justify-center gap-1.5 shadow-sm"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Open in UPI App</span>
              </a>

              {qrCodeUrl && (
                <a
                  href={qrCodeUrl}
                  download="Teja_Mansi_Wedding_UPI_QR.png"
                  className="w-full py-2.5 px-3 text-xs font-semibold text-zinc-800 bg-zinc-100 hover:bg-zinc-200 border border-zinc-300 rounded-xl transition-colors inline-flex items-center justify-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5 text-zinc-700" />
                  <span>Save QR to Photos</span>
                </a>
              )}
            </div>

            {/* Footer Blessing Note */}
            <p className="text-[11px] text-zinc-500 italic pt-1">
              Your heartfelt prayers, attendance, and love mean the world to us.
            </p>
          </div>
        </div>
      )}
    </section>
  );
};


