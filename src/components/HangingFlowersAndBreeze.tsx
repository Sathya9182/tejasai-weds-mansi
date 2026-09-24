import React, { useState, useMemo, useEffect } from 'react';
import { Wind, Sparkles } from 'lucide-react';
import userCustomFlowerImg from '../assets/images/user_custom_flower.png';

interface FlyingAirFlower {
  id: number;
  topPercent: number;
  size: number;
  duration: number;
  delay: number;
  rotation: number;
  opacity: number;
}

interface FallingAirFlower {
  id: number;
  leftPercent: number;
  size: number;
  duration: number;
  delay: number;
  rotation: number;
}

export const HangingFlowersAndBreeze: React.FC = () => {
  const [breezeIntensity, setBreezeIntensity] = useState<'gentle' | 'gust' | 'off'>('gentle');
  const [gustBurstKey, setGustBurstKey] = useState(0);

  // Alternating cycle: Air floating flowers appear for 10s, then turn off/disappear for 10s (repeating)
  // While Hanging Flowers on left and right borders stay ALWAYS ON!
  const [isAirFlowersVisible, setIsAirFlowersVisible] = useState(true);
  const [countdown, setCountdown] = useState(10);
  const [isAutoCycle, setIsAutoCycle] = useState(true);

  useEffect(() => {
    if (!isAutoCycle) {
      setIsAirFlowersVisible(true);
      setCountdown(10);
      return;
    }

    // 1-second countdown ticker for user visibility feedback
    const countdownInterval = setInterval(() => {
      setCountdown((prev) => (prev <= 1 ? 10 : prev - 1));
    }, 1000);

    // 10-second hard toggle for air floating flowers on/off
    const toggleInterval = setInterval(() => {
      setIsAirFlowersVisible((prev) => !prev);
    }, 10000);

    return () => {
      clearInterval(countdownInterval);
      clearInterval(toggleInterval);
    };
  }, [isAutoCycle]);

  // Exact flowers riding horizontally along the air currents across the screen
  const airCurrentFlowers: FlyingAirFlower[] = useMemo(() => {
    return Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      topPercent: 6 + (i * 5.1 + (i % 4) * 4) % 80,
      size: 26 + (i % 6) * 7, // 26px to 61px varied natural depth
      duration: 7.5 + (i % 5) * 1.6,
      delay: (i * 0.65) % 8,
      rotation: (i * 47) % 360,
      opacity: 0.85 + (i % 3) * 0.07,
    }));
  }, []);

  // Exact flowers gently floating and descending through the air columns
  const fallingAirFlowers: FallingAirFlower[] = useMemo(() => {
    return Array.from({ length: 14 }).map((_, i) => ({
      id: i,
      leftPercent: 6 + (i * 7.2 + (i % 5) * 3) % 88,
      size: 22 + (i % 5) * 6,
      duration: 11 + (i % 4) * 2.5,
      delay: (i * 1.1) % 9,
      rotation: (i * 63) % 360,
    }));
  }, []);

  const triggerGust = () => {
    // If air flowers were resting during the 10s disappear cycle, bring them on immediately
    setIsAirFlowersVisible(true);
    setCountdown(10);
    setBreezeIntensity('gust');
    setGustBurstKey((prev) => prev + 1);
    setTimeout(() => {
      setBreezeIntensity('gentle');
    }, 4500);
  };

  return (
    <>
      {/* ============================================================== */}
      {/* 1. AIR CURRENTS & EXACT FLOWERS BLOWING IN THE AIR            */}
      {/* Alternating 5s Active / 5s Off cycle                           */}
      {/* ============================================================== */}
      {isAirFlowersVisible && breezeIntensity !== 'off' && (
        <div
          className="fixed inset-0 pointer-events-none z-20 overflow-hidden animate-fadeIn"
          aria-hidden={!isAirFlowersVisible}
        >
          {/* Shimmering Air Breeze Streamlines */}
          <div className="absolute top-[12%] left-0 w-[60vw] h-14 animate-air-stream opacity-70">
            <svg viewBox="0 0 800 60" className="w-full h-full preserve-3d">
              <defs>
                <linearGradient id="windGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(244, 114, 182, 0)" />
                  <stop offset="25%" stopColor="rgba(244, 114, 182, 0.45)" />
                  <stop offset="60%" stopColor="rgba(168, 85, 247, 0.5)" />
                  <stop offset="85%" stopColor="rgba(255, 255, 255, 0.7)" />
                  <stop offset="100%" stopColor="rgba(168, 85, 247, 0)" />
                </linearGradient>
              </defs>
              <path
                d="M 0 30 Q 200 5, 400 32 T 800 28"
                fill="none"
                stroke="url(#windGrad1)"
                strokeWidth="2.5"
                strokeDasharray="18 10 35 12"
              />
              <path
                d="M 40 40 Q 250 18, 460 38 T 780 34"
                fill="none"
                stroke="rgba(255, 255, 255, 0.4)"
                strokeWidth="1.2"
                strokeDasharray="10 15 25 10"
              />
            </svg>
          </div>

          <div
            className="absolute top-[32%] left-0 w-[70vw] h-16 animate-air-stream opacity-65"
            style={{ animationDelay: '2.5s', animationDuration: '7.5s' }}
          >
            <svg viewBox="0 0 900 60" className="w-full h-full">
              <defs>
                <linearGradient id="windGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(192, 132, 252, 0)" />
                  <stop offset="30%" stopColor="rgba(236, 72, 153, 0.4)" />
                  <stop offset="70%" stopColor="rgba(147, 51, 234, 0.45)" />
                  <stop offset="100%" stopColor="rgba(244, 114, 182, 0)" />
                </linearGradient>
              </defs>
              <path
                d="M 0 35 Q 260 55, 520 22 T 900 35"
                fill="none"
                stroke="url(#windGrad2)"
                strokeWidth="2.8"
                strokeDasharray="25 14 45 16"
              />
            </svg>
          </div>

          <div
            className="absolute top-[60%] left-0 w-[55vw] h-12 animate-air-stream opacity-55"
            style={{ animationDelay: '4s', animationDuration: '8s' }}
          >
            <svg viewBox="0 0 700 50" className="w-full h-full">
              <path
                d="M 0 25 Q 220 5, 450 30 T 700 22"
                fill="none"
                stroke="url(#windGrad1)"
                strokeWidth="2"
                strokeDasharray="14 12 28 8"
              />
            </svg>
          </div>

          {/* Wind Air Wave Shimmer Ripples */}
          <div className="absolute top-[18%] left-[-20%] w-[140%] h-32 bg-gradient-to-r from-transparent via-purple-300/10 to-transparent blur-xl pointer-events-none" />

          {/* ============================================================== */}
          {/* EXACT FLOWERS RIDING THE HORIZONTAL AIR CURRENT BREEZE         */}
          {/* ============================================================== */}
          {airCurrentFlowers.map((flower) => {
            const currentDuration =
              breezeIntensity === 'gust' ? flower.duration * 0.5 : flower.duration;

            return (
              <div
                key={`air-flower-${flower.id}-${gustBurstKey}`}
                className="absolute animate-exact-flower-air select-none"
                style={{
                  top: `${flower.topPercent}%`,
                  left: '-60px',
                  width: `${flower.size}px`,
                  height: `${flower.size * 1.3}px`,
                  animationDuration: `${currentDuration}s`,
                  animationDelay: `${flower.delay}s`,
                  opacity: flower.opacity,
                  filter: 'drop-shadow(0 6px 12px rgba(124, 58, 237, 0.22))',
                }}
              >
                <img
                  src={userCustomFlowerImg}
                  alt="Flower floating in the air"
                  className="w-full h-full object-contain pointer-events-none transform transition-transform"
                  style={{
                    transform: `rotate(${flower.rotation}deg)`,
                  }}
                  loading="eager"
                />
              </div>
            );
          })}

          {/* ============================================================== */}
          {/* EXACT FLOWERS GENTLY FLOATING AND DESCENDING THROUGH THE AIR   */}
          {/* ============================================================== */}
          {fallingAirFlowers.map((flower) => {
            const currentDuration =
              breezeIntensity === 'gust' ? flower.duration * 0.6 : flower.duration;

            return (
              <div
                key={`falling-flower-${flower.id}-${gustBurstKey}`}
                className="absolute animate-exact-flower-descent select-none"
                style={{
                  left: `${flower.leftPercent}%`,
                  top: '-70px',
                  width: `${flower.size}px`,
                  height: `${flower.size * 1.3}px`,
                  animationDuration: `${currentDuration}s`,
                  animationDelay: `${flower.delay}s`,
                  filter: 'drop-shadow(0 4px 10px rgba(0, 0, 0, 0.12))',
                }}
              >
                <img
                  src={userCustomFlowerImg}
                  alt="Flower drifting in the air"
                  className="w-full h-full object-contain pointer-events-none"
                  style={{
                    transform: `rotate(${flower.rotation}deg)`,
                  }}
                  loading="eager"
                />
              </div>
            );
          })}
        </div>
      )}

      {/* ============================================================== */}
      {/* 2. LEFT SIDE HANGING FLOWERS (Cascading Garlands & Vines)      */}
      {/* ============================================================== */}
      <div
        className="fixed top-0 left-0 z-30 pointer-events-none select-none"
        aria-hidden="true"
      >
        {/* Top-Left Floral Header Swag / Arch Canopy */}
        <div className="absolute top-0 left-0 w-44 sm:w-56 md:w-68 h-20 -translate-x-4 -translate-y-2 opacity-95">
          <svg viewBox="0 0 280 80" className="w-full h-full drop-shadow-md">
            <defs>
              <linearGradient id="leftVineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#059669" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
              <linearGradient id="leftRoseGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F472B6" />
                <stop offset="100%" stopColor="#BE185D" />
              </linearGradient>
              <linearGradient id="leftPurpleGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#C084FC" />
                <stop offset="100%" stopColor="#6B21A8" />
              </linearGradient>
            </defs>
            {/* Vine branches */}
            <path
              d="M 0 10 Q 80 35, 180 15 T 280 5"
              fill="none"
              stroke="url(#leftVineGrad)"
              strokeWidth="4"
            />
            {/* Vine Leaves */}
            <path d="M 40 22 C 30 10, 50 5, 55 18 Z" fill="#10B981" />
            <path d="M 90 28 C 80 40, 105 38, 102 24 Z" fill="#059669" />
            <path d="M 150 18 C 140 8, 165 4, 162 16 Z" fill="#10B981" />
            <path d="M 210 12 C 200 25, 225 22, 220 10 Z" fill="#047857" />
            {/* Corner Blossom Swag */}
            <circle cx="20" cy="18" r="16" fill="url(#leftRoseGrad1)" />
            <circle cx="20" cy="18" r="10" fill="#FDF2F8" opacity="0.6" />
            <circle cx="65" cy="24" r="14" fill="url(#leftPurpleGrad1)" />
            <circle cx="65" cy="24" r="7" fill="#FAF5FF" opacity="0.7" />
            <circle cx="120" cy="20" r="15" fill="url(#leftRoseGrad1)" />
            <circle cx="175" cy="14" r="12" fill="url(#leftPurpleGrad1)" />
            <circle cx="225" cy="10" r="9" fill="#FFFFFF" stroke="#F472B6" strokeWidth="2" />
          </svg>
        </div>

        {/* Strand 1: Longest Luxurious Hanging Floral Garland (Leftmost) */}
        <div
          className={`absolute top-0 left-2 sm:left-4 origin-top ${
            breezeIntensity !== 'off' ? 'animate-breeze-sway-left' : ''
          }`}
          style={{ animationDuration: breezeIntensity === 'gust' ? '2.4s' : '4.6s' }}
        >
          <svg
            width="44"
            height="460"
            viewBox="0 0 50 500"
            className="w-8 sm:w-11 drop-shadow-lg"
          >
            <defs>
              <linearGradient id="leftStem1" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#059669" />
                <stop offset="100%" stopColor="#10B981" />
              </linearGradient>
            </defs>
            {/* Garland hanging cord/vine */}
            <path
              d="M 25 0 Q 23 120, 26 250 T 25 460"
              fill="none"
              stroke="url(#leftStem1)"
              strokeWidth="2.5"
            />

            {/* Blossom 1 - Royal Purple Orchid */}
            <g transform="translate(25, 30)">
              <ellipse cx="-10" cy="-6" rx="9" ry="6" fill="#A855F7" transform="rotate(-30)" />
              <ellipse cx="10" cy="-6" rx="9" ry="6" fill="#A855F7" transform="rotate(30)" />
              <ellipse cx="0" cy="8" rx="8" ry="11" fill="#7C3AED" />
              <circle cx="0" cy="0" r="5" fill="#FAF5FF" />
              <circle cx="0" cy="0" r="2.5" fill="#F59E0B" />
            </g>
            {/* Leaves */}
            <path d="M 23 60 C 12 55, 10 70, 24 68 Z" fill="#059669" />

            {/* Blossom 2 - Custom Featured Blossom */}
            <g transform="translate(25, 95)">
              <circle cx="0" cy="0" r="15" fill="rgba(244, 114, 182, 0.2)" />
              <image href={userCustomFlowerImg} x="-16" y="-19" width="32" height="38" preserveAspectRatio="xMidYMid meet" />
            </g>
            <path d="M 26 125 C 38 120, 36 135, 25 132 Z" fill="#10B981" />

            {/* Blossom 3 - White Mogra Jasmine Floret */}
            <g transform="translate(25, 155)">
              <circle cx="0" cy="0" r="9" fill="#FFFFFF" stroke="#E9D5FF" strokeWidth="1" />
              <circle cx="-5" cy="-3" r="5" fill="#FAF5FF" />
              <circle cx="5" cy="-3" r="5" fill="#FAF5FF" />
              <circle cx="0" cy="4" r="5" fill="#FAF5FF" />
              <circle cx="0" cy="0" r="2.5" fill="#FBBF24" />
            </g>
            <path d="M 24 185 C 13 180, 12 195, 25 192 Z" fill="#059669" />

            {/* Blossom 4 - Purple Orchid Blossom */}
            <g transform="translate(25, 220)">
              <ellipse cx="-9" cy="-5" rx="8" ry="5" fill="#C084FC" transform="rotate(-25)" />
              <ellipse cx="9" cy="-5" rx="8" ry="5" fill="#C084FC" transform="rotate(25)" />
              <ellipse cx="0" cy="7" rx="7" ry="10" fill="#9333EA" />
              <circle cx="0" cy="0" r="3" fill="#FFFFFF" />
            </g>

            {/* Blossom 5 - Custom Featured Blossom */}
            <g transform="translate(25, 280)">
              <circle cx="0" cy="0" r="14" fill="rgba(192, 132, 252, 0.2)" />
              <image href={userCustomFlowerImg} x="-15" y="-18" width="30" height="36" preserveAspectRatio="xMidYMid meet" />
            </g>
            <path d="M 26 315 C 36 310, 35 325, 25 322 Z" fill="#059669" />

            {/* Blossom 6 - Purple Wisteria Floret */}
            <g transform="translate(25, 345)">
              <circle cx="0" cy="0" r="8" fill="#8B5CF6" />
              <circle cx="0" cy="0" r="4" fill="#DDD6FE" />
            </g>

            {/* Blossom 7 - Soft Pink Bud */}
            <g transform="translate(25, 395)">
              <ellipse cx="0" cy="0" rx="6" ry="9" fill="#F472B6" />
              <ellipse cx="0" cy="0" rx="3" ry="5" fill="#FCE7F3" />
            </g>

            {/* Blossom 8 - Delicate Hanging Crystal Drop */}
            <g transform="translate(25, 450)">
              <path
                d="M 0 0 L 4 10 L 0 20 L -4 10 Z"
                fill="#FAF5FF"
                stroke="#A855F7"
                strokeWidth="1"
                opacity="0.9"
              />
              <circle cx="0" cy="22" r="2" fill="#F472B6" />
            </g>
          </svg>
        </div>

        {/* Strand 2: Medium Hanging Floral Garland (Left Inner) */}
        <div
          className={`absolute top-0 left-12 sm:left-20 origin-top ${
            breezeIntensity !== 'off' ? 'animate-breeze-sway-left' : ''
          }`}
          style={{
            animationDuration: breezeIntensity === 'gust' ? '2.1s' : '3.8s',
            animationDelay: '0.4s',
          }}
        >
          <svg
            width="38"
            height="340"
            viewBox="0 0 45 360"
            className="w-7 sm:w-10 drop-shadow-md"
          >
            <path
              d="M 22 0 Q 24 90, 20 180 T 22 330"
              fill="none"
              stroke="#059669"
              strokeWidth="2.2"
            />
            {/* Blossom 1 - Deep Pink Rose */}
            <g transform="translate(22, 25)">
              <circle cx="0" cy="0" r="13" fill="#BE185D" />
              <circle cx="0" cy="0" r="8" fill="#F472B6" />
              <circle cx="0" cy="0" r="3" fill="#FFFFFF" />
            </g>
            <path d="M 24 55 C 34 50, 32 65, 23 60 Z" fill="#10B981" />

            {/* Blossom 2 - Lilac Orchid */}
            <g transform="translate(22, 85)">
              <ellipse cx="-7" cy="-4" rx="7" ry="5" fill="#C084FC" />
              <ellipse cx="7" cy="-4" rx="7" ry="5" fill="#C084FC" />
              <ellipse cx="0" cy="6" rx="6" ry="8" fill="#9333EA" />
              <circle cx="0" cy="0" r="2.5" fill="#FAF5FF" />
            </g>

            {/* Blossom 3 - White Mogra Cluster */}
            <g transform="translate(22, 145)">
              <circle cx="-4" cy="0" r="6" fill="#FFFFFF" stroke="#F472B6" strokeWidth="0.8" />
              <circle cx="4" cy="0" r="6" fill="#FFFFFF" stroke="#F472B6" strokeWidth="0.8" />
              <circle cx="0" cy="5" r="5" fill="#FAF5FF" />
            </g>
            <path d="M 20 180 C 10 175, 10 190, 21 185 Z" fill="#047857" />

            {/* Blossom 4 - Royal Violet Peony */}
            <g transform="translate(22, 210)">
              <circle cx="0" cy="0" r="11" fill="#7C3AED" />
              <circle cx="0" cy="0" r="6" fill="#A855F7" />
              <circle cx="0" cy="0" r="2" fill="#FAF5FF" />
            </g>

            {/* Blossom 5 - Hanging Jasmine Bud & Pearl */}
            <g transform="translate(22, 270)">
              <ellipse cx="0" cy="0" rx="5" ry="8" fill="#FDF2F8" stroke="#DB2777" strokeWidth="0.8" />
              <circle cx="0" cy="15" r="3" fill="#F472B6" />
            </g>

            {/* Drop Accent */}
            <g transform="translate(22, 315)">
              <path d="M 0 0 L 3 8 L 0 15 L -3 8 Z" fill="#C084FC" opacity="0.85" />
            </g>
          </svg>
        </div>

        {/* Strand 3: Shorter Delicate Vine Garland (Left Inward) */}
        <div
          className={`hidden sm:block absolute top-0 left-28 sm:left-36 origin-top ${
            breezeIntensity !== 'off' ? 'animate-breeze-sway-left' : ''
          }`}
          style={{
            animationDuration: breezeIntensity === 'gust' ? '1.8s' : '3.4s',
            animationDelay: '0.8s',
          }}
        >
          <svg
            width="32"
            height="220"
            viewBox="0 0 35 240"
            className="w-6 sm:w-8 drop-shadow-xs"
          >
            <path d="M 18 0 Q 15 60, 20 120 T 18 210" fill="none" stroke="#10B981" strokeWidth="1.8" />
            <g transform="translate(18, 20)">
              <circle cx="0" cy="0" r="9" fill="#EC4899" />
              <circle cx="0" cy="0" r="4" fill="#FFFFFF" />
            </g>
            <g transform="translate(18, 70)">
              <circle cx="0" cy="0" r="8" fill="#A855F7" />
              <circle cx="0" cy="0" r="3" fill="#FAF5FF" />
            </g>
            <g transform="translate(18, 120)">
              <ellipse cx="0" cy="0" rx="5" ry="7" fill="#F472B6" />
            </g>
            <g transform="translate(18, 170)">
              <circle cx="0" cy="0" r="6" fill="#FFFFFF" stroke="#9333EA" strokeWidth="1" />
            </g>
            <g transform="translate(18, 205)">
              <circle cx="0" cy="0" r="3" fill="#F472B6" />
            </g>
          </svg>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 3. RIGHT SIDE HANGING FLOWERS (Cascading Garlands & Vines)     */}
      {/* ============================================================== */}
      <div
        className="fixed top-0 right-0 z-30 pointer-events-none select-none"
        aria-hidden="true"
      >
        {/* Top-Right Floral Header Swag / Arch Canopy */}
        <div className="absolute top-0 right-0 w-44 sm:w-56 md:w-68 h-20 translate-x-4 -translate-y-2 opacity-95">
          <svg viewBox="0 0 280 80" className="w-full h-full drop-shadow-md">
            <defs>
              <linearGradient id="rightVineGrad" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#059669" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
              <linearGradient id="rightRoseGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#DB2777" />
                <stop offset="100%" stopColor="#9D174D" />
              </linearGradient>
              <linearGradient id="rightPurpleGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#A855F7" />
                <stop offset="100%" stopColor="#581C87" />
              </linearGradient>
            </defs>
            {/* Vine branches */}
            <path
              d="M 280 10 Q 200 35, 100 15 T 0 5"
              fill="none"
              stroke="url(#rightVineGrad)"
              strokeWidth="4"
            />
            {/* Leaves */}
            <path d="M 240 22 C 250 10, 230 5, 225 18 Z" fill="#10B981" />
            <path d="M 190 28 C 200 40, 175 38, 178 24 Z" fill="#059669" />
            <path d="M 130 18 C 140 8, 115 4, 118 16 Z" fill="#10B981" />
            {/* Corner Blossom Swag */}
            <circle cx="260" cy="18" r="16" fill="url(#rightPurpleGrad1)" />
            <circle cx="260" cy="18" r="10" fill="#FAF5FF" opacity="0.6" />
            <circle cx="215" cy="24" r="14" fill="url(#rightRoseGrad1)" />
            <circle cx="215" cy="24" r="7" fill="#FDF2F8" opacity="0.7" />
            <circle cx="160" cy="20" r="15" fill="url(#rightPurpleGrad1)" />
            <circle cx="105" cy="14" r="12" fill="url(#rightRoseGrad1)" />
            <circle cx="55" cy="10" r="9" fill="#FFFFFF" stroke="#A855F7" strokeWidth="2" />
          </svg>
        </div>

        {/* Strand 1: Longest Luxurious Hanging Floral Garland (Rightmost) */}
        <div
          className={`absolute top-0 right-2 sm:right-4 origin-top ${
            breezeIntensity !== 'off' ? 'animate-breeze-sway-right' : ''
          }`}
          style={{ animationDuration: breezeIntensity === 'gust' ? '2.5s' : '4.8s' }}
        >
          <svg
            width="44"
            height="460"
            viewBox="0 0 50 500"
            className="w-8 sm:w-11 drop-shadow-lg"
          >
            <defs>
              <linearGradient id="rightStem1" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#059669" />
                <stop offset="100%" stopColor="#10B981" />
              </linearGradient>
            </defs>
            {/* Vine cord */}
            <path
              d="M 25 0 Q 27 120, 24 250 T 25 460"
              fill="none"
              stroke="url(#rightStem1)"
              strokeWidth="2.5"
            />

            {/* Blossom 1 - Pink Rose Blossom */}
            <g transform="translate(25, 30)">
              <circle cx="0" cy="0" r="15" fill="#EC4899" />
              <circle cx="0" cy="0" r="10" fill="#F472B6" />
              <circle cx="0" cy="0" r="5" fill="#BE185D" />
              <circle cx="0" cy="0" r="2" fill="#FFFFFF" />
            </g>
            <path d="M 27 60 C 38 55, 40 70, 26 68 Z" fill="#059669" />

            {/* Blossom 2 - Custom Featured Blossom */}
            <g transform="translate(25, 95)">
              <circle cx="0" cy="0" r="15" fill="rgba(192, 132, 252, 0.2)" />
              <image href={userCustomFlowerImg} x="-16" y="-19" width="32" height="38" preserveAspectRatio="xMidYMid meet" />
            </g>
            <path d="M 24 125 C 12 120, 14 135, 25 132 Z" fill="#10B981" />

            {/* Blossom 3 - White Mogra Jasmine Star */}
            <g transform="translate(25, 155)">
              <circle cx="0" cy="0" r="9" fill="#FFFFFF" stroke="#F472B6" strokeWidth="1" />
              <circle cx="-5" cy="-3" r="5" fill="#FDF2F8" />
              <circle cx="5" cy="-3" r="5" fill="#FDF2F8" />
              <circle cx="0" cy="4" r="5" fill="#FDF2F8" />
              <circle cx="0" cy="0" r="2.5" fill="#F59E0B" />
            </g>
            <path d="M 26 185 C 37 180, 38 195, 25 192 Z" fill="#059669" />

            {/* Blossom 4 - Magenta Peony Blossom */}
            <g transform="translate(25, 220)">
              <circle cx="0" cy="0" r="13" fill="#D946EF" />
              <circle cx="0" cy="0" r="8" fill="#C026D3" />
              <circle cx="0" cy="0" r="4" fill="#FAF5FF" />
            </g>

            {/* Blossom 5 - Custom Featured Blossom */}
            <g transform="translate(25, 280)">
              <circle cx="0" cy="0" r="14" fill="rgba(244, 114, 182, 0.2)" />
              <image href={userCustomFlowerImg} x="-15" y="-18" width="30" height="36" preserveAspectRatio="xMidYMid meet" />
            </g>
            <path d="M 24 315 C 14 310, 15 325, 25 322 Z" fill="#059669" />

            {/* Blossom 6 - Soft Pink Rose */}
            <g transform="translate(25, 345)">
              <circle cx="0" cy="0" r="10" fill="#F472B6" />
              <circle cx="0" cy="0" r="5" fill="#EC4899" />
              <circle cx="0" cy="0" r="2" fill="#FFFFFF" />
            </g>

            {/* Blossom 7 - Lilac Bud */}
            <g transform="translate(25, 395)">
              <ellipse cx="0" cy="0" rx="6" ry="9" fill="#C084FC" />
              <ellipse cx="0" cy="0" rx="3" ry="5" fill="#FAF5FF" />
            </g>

            {/* Blossom 8 - Hanging Crystal Jewel */}
            <g transform="translate(25, 450)">
              <path
                d="M 0 0 L 4 10 L 0 20 L -4 10 Z"
                fill="#FDF2F8"
                stroke="#EC4899"
                strokeWidth="1"
                opacity="0.9"
              />
              <circle cx="0" cy="22" r="2" fill="#A855F7" />
            </g>
          </svg>
        </div>

        {/* Strand 2: Medium Hanging Floral Garland (Right Inner) */}
        <div
          className={`absolute top-0 right-12 sm:right-20 origin-top ${
            breezeIntensity !== 'off' ? 'animate-breeze-sway-right' : ''
          }`}
          style={{
            animationDuration: breezeIntensity === 'gust' ? '2.2s' : '4.1s',
            animationDelay: '0.5s',
          }}
        >
          <svg
            width="38"
            height="340"
            viewBox="0 0 45 360"
            className="w-7 sm:w-10 drop-shadow-md"
          >
            <path
              d="M 23 0 Q 21 90, 25 180 T 23 330"
              fill="none"
              stroke="#059669"
              strokeWidth="2.2"
            />
            {/* Blossom 1 - Deep Purple Violet */}
            <g transform="translate(23, 25)">
              <circle cx="0" cy="0" r="13" fill="#6B21A8" />
              <circle cx="0" cy="0" r="8" fill="#A855F7" />
              <circle cx="0" cy="0" r="3" fill="#FFFFFF" />
            </g>
            <path d="M 21 55 C 11 50, 13 65, 22 60 Z" fill="#10B981" />

            {/* Blossom 2 - Vibrant Pink Rose */}
            <g transform="translate(23, 85)">
              <circle cx="0" cy="0" r="12" fill="#EC4899" />
              <circle cx="0" cy="0" r="7" fill="#F472B6" />
              <circle cx="0" cy="0" r="2.5" fill="#FAF5FF" />
            </g>

            {/* Blossom 3 - White Mogra Cluster */}
            <g transform="translate(23, 145)">
              <circle cx="-4" cy="0" r="6" fill="#FFFFFF" stroke="#A855F7" strokeWidth="0.8" />
              <circle cx="4" cy="0" r="6" fill="#FFFFFF" stroke="#A855F7" strokeWidth="0.8" />
              <circle cx="0" cy="5" r="5" fill="#FAF5FF" />
            </g>
            <path d="M 25 180 C 35 175, 35 190, 24 185 Z" fill="#047857" />

            {/* Blossom 4 - Orchid Blossom */}
            <g transform="translate(23, 210)">
              <ellipse cx="-6" cy="-4" rx="7" ry="5" fill="#F472B6" />
              <ellipse cx="6" cy="-4" rx="7" ry="5" fill="#F472B6" />
              <ellipse cx="0" cy="6" rx="6" ry="8" fill="#DB2777" />
              <circle cx="0" cy="0" r="2" fill="#FFFFFF" />
            </g>

            {/* Blossom 5 - Hanging Bud */}
            <g transform="translate(23, 270)">
              <ellipse cx="0" cy="0" rx="5" ry="8" fill="#FAF5FF" stroke="#7C3AED" strokeWidth="0.8" />
              <circle cx="0" cy="15" r="3" fill="#A855F7" />
            </g>

            {/* Drop Accent */}
            <g transform="translate(23, 315)">
              <path d="M 0 0 L 3 8 L 0 15 L -3 8 Z" fill="#EC4899" opacity="0.85" />
            </g>
          </svg>
        </div>

        {/* Strand 3: Shorter Accent Strand (Right Inward) */}
        <div
          className={`hidden sm:block absolute top-0 right-28 sm:right-36 origin-top ${
            breezeIntensity !== 'off' ? 'animate-breeze-sway-right' : ''
          }`}
          style={{
            animationDuration: breezeIntensity === 'gust' ? '1.9s' : '3.6s',
            animationDelay: '0.9s',
          }}
        >
          <svg
            width="32"
            height="220"
            viewBox="0 0 35 240"
            className="w-6 sm:w-8 drop-shadow-xs"
          >
            <path d="M 17 0 Q 20 60, 15 120 T 17 210" fill="none" stroke="#10B981" strokeWidth="1.8" />
            <g transform="translate(17, 20)">
              <circle cx="0" cy="0" r="9" fill="#9333EA" />
              <circle cx="0" cy="0" r="4" fill="#FFFFFF" />
            </g>
            <g transform="translate(17, 70)">
              <circle cx="0" cy="0" r="8" fill="#EC4899" />
              <circle cx="0" cy="0" r="3" fill="#FDF2F8" />
            </g>
            <g transform="translate(17, 120)">
              <ellipse cx="0" cy="0" rx="5" ry="7" fill="#C084FC" />
            </g>
            <g transform="translate(17, 170)">
              <circle cx="0" cy="0" r="6" fill="#FFFFFF" stroke="#DB2777" strokeWidth="1" />
            </g>
            <g transform="translate(17, 205)">
              <circle cx="0" cy="0" r="3" fill="#A855F7" />
            </g>
          </svg>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 4. DISCREET BREEZE & 5s AIR FLOWER CYCLE CONTROL PILL          */}
      {/* ============================================================== */}
      <div className="fixed bottom-5 left-4 sm:left-5 z-40 flex flex-wrap items-center gap-2 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-lg border border-purple-200/90 text-xs font-semibold text-zinc-800 transition-all hover:border-purple-400">
        <button
          onClick={triggerGust}
          className="flex items-center gap-1.5 hover:text-purple-700 transition-colors cursor-pointer"
          title="Send a fresh breeze through the flowers"
        >
          <Wind
            className={`w-3.5 h-3.5 text-purple-600 ${
              breezeIntensity === 'gust' ? 'animate-spin' : ''
            }`}
          />
          <span className="text-[11px]">
            {breezeIntensity === 'gust' ? 'Wind Blowing...' : 'Blow Fresh Breeze'}
          </span>
          <Sparkles className="w-3 h-3 text-pink-500 animate-pulse" />
        </button>

        <span className="w-px h-3 bg-zinc-200" />

        {/* 10s Alternating Appear / Disappear Indicator for Air Breeze Flowers */}
        <div
          className="flex items-center gap-1.5 text-[11px]"
          title="Air floating flowers appear for 10s and turn off for 10s (Hanging flowers are always on)"
        >
          <span
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              isAirFlowersVisible
                ? 'bg-emerald-500 ring-2 ring-emerald-200'
                : 'bg-amber-400 ring-2 ring-amber-100'
            }`}
          />
          <span className={isAirFlowersVisible ? 'text-purple-900 font-bold' : 'text-zinc-500 font-medium'}>
            {isAirFlowersVisible ? `Air Flowers: Active (${countdown}s)` : `Air Flowers: Off (${countdown}s)`}
          </span>
        </div>

        <span className="w-px h-3 bg-zinc-200" />

        {/* Hanging Flowers Status Badge */}
        <span
          className="text-[10px] text-pink-700 font-semibold bg-pink-50 px-2 py-0.5 rounded-full border border-pink-200"
          title="Hanging floral garlands on the left and right borders are always on"
        >
          Garlands: Always On
        </span>

        <span className="w-px h-3 bg-zinc-200" />

        {/* Toggle 10s Auto Cycle for Air Flowers */}
        <button
          onClick={() => {
            setIsAutoCycle((prev) => {
              const next = !prev;
              if (!next) {
                setIsAirFlowersVisible(true);
              } else {
                setCountdown(10);
              }
              return next;
            });
          }}
          className={`text-[10px] px-1.5 py-0.5 rounded-md transition-colors cursor-pointer ${
            isAutoCycle
              ? 'text-purple-700 bg-purple-50 font-bold hover:bg-purple-100'
              : 'text-zinc-500 hover:text-zinc-900'
          }`}
          title={isAutoCycle ? '10s air flower cycle is Active' : 'Air flowers set to Always On'}
        >
          {isAutoCycle ? '10s Cycle' : 'Always On'}
        </button>
      </div>
    </>
  );
};
