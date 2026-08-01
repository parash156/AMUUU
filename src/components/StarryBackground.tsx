import { useState } from 'react';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
}

export default function StarryBackground() {
  const [stars] = useState<Star[]>(() =>
    Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 3,
      duration: Math.random() * 2 + 1,
    }))
  );

  return (
    <div className="absolute inset-0 overflow-hidden">
      {stars.map(star => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white animate-star-twinkle"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
          }}
        />
      ))}
      {/* Shooting stars */}
      <div
        className="absolute h-px bg-gradient-to-r from-transparent via-white to-transparent"
        style={{
          top: '20%',
          left: '-10%',
          width: '100px',
          animation: 'sakuraFall 4s 2s linear infinite',
          transform: 'rotate(-45deg)',
        }}
      />
      <div
        className="absolute h-px bg-gradient-to-r from-transparent via-pink-300 to-transparent"
        style={{
          top: '50%',
          left: '-10%',
          width: '60px',
          animation: 'sakuraFall 6s 5s linear infinite',
          transform: 'rotate(-30deg)',
        }}
      />
    </div>
  );
}
