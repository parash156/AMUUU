import { useState } from 'react';

interface Petal {
  id: number;
  x: number;
  size: number;
  delay: number;
  duration: number;
  type: number;
}

const PETAL_EMOJIS = ['🌸', '🌺', '💮', '🌹', '🌷'];

export default function SakuraPetals({ count = 15 }: { count?: number }) {
  const [petals] = useState<Petal[]>(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 16 + 12,
      delay: Math.random() * 8,
      duration: Math.random() * 6 + 8,
      type: Math.floor(Math.random() * PETAL_EMOJIS.length),
    }))
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {petals.map(p => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            top: '-50px',
            fontSize: `${p.size}px`,
            animation: `sakuraFall ${p.duration}s ${p.delay}s linear infinite`,
            opacity: 0.7,
          }}
        >
          {PETAL_EMOJIS[p.type]}
        </div>
      ))}
    </div>
  );
}
