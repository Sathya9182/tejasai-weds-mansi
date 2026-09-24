import React, { useMemo } from 'react';
import userCustomFlowerImg from '../assets/images/user_custom_flower.png';

interface Petal {
  id: number;
  left: number; // percentage across screen
  size: number;
  duration: number;
  delay: number;
  rotation: number;
}

export const Floating3DFlowers: React.FC = () => {
  const petals: Petal[] = useMemo(() => {
    return Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      left: (i * 5.5 + (i % 4) * 3) % 94,
      size: 24 + (i % 6) * 6,
      duration: 11 + (i % 5) * 2,
      delay: (i * 0.8) % 10,
      rotation: Math.floor(Math.random() * 360),
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden" aria-hidden="true">
      {petals.map((petal) => {
        return (
          <div
            key={petal.id}
            className="absolute animate-exact-flower-descent"
            style={{
              left: `${petal.left}%`,
              top: '-40px',
              width: `${petal.size}px`,
              height: `${petal.size * 1.3}px`,
              animationDuration: `${petal.duration}s`,
              animationDelay: `${petal.delay}s`,
              filter: 'drop-shadow(0 4px 8px rgba(124, 58, 237, 0.18))',
            }}
          >
            <img
              src={userCustomFlowerImg}
              alt="Floating flower"
              className="w-full h-full object-contain pointer-events-none"
              style={{
                transform: `rotate(${petal.rotation}deg)`,
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

