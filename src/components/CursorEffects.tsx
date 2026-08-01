import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeartParticle {
  id: number;
  x: number;
  y: number;
}

export default function CursorEffects() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [glowPos, setGlowPos] = useState({ x: -100, y: -100 });
  const [hearts, setHearts] = useState<HeartParticle[]>([]);
  const counterRef = useRef(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setTimeout(() => setGlowPos({ x: e.clientX, y: e.clientY }), 80);
    };
    const onClick = (e: MouseEvent) => {
      const id = counterRef.current++;
      const newHearts: HeartParticle[] = Array.from({ length: 5 }, (_, i) => ({
        id: id * 10 + i,
        x: e.clientX + (Math.random() - 0.5) * 40,
        y: e.clientY + (Math.random() - 0.5) * 40,
      }));
      setHearts(prev => [...prev, ...newHearts]);
      setTimeout(() => {
        setHearts(prev => prev.filter(h => !newHearts.find(n => n.id === h.id)));
      }, 1000);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('click', onClick);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('click', onClick);
    };
  }, []);

  return (
    <>
      {/* Glow */}
      <div
        className="cursor-glow"
        style={{ left: glowPos.x, top: glowPos.y }}
      />
      {/* Heart cursor */}
      <div
        className="custom-cursor"
        style={{ left: pos.x, top: pos.y }}
      >
        <svg viewBox="0 0 24 24" fill="#ff6b9d" width="20" height="20">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      </div>
      {/* Heart particles on click */}
      <AnimatePresence>
        {hearts.map(heart => (
          <motion.div
            key={heart.id}
            initial={{ scale: 0, opacity: 1, x: heart.x, y: heart.y }}
            animate={{ scale: 1.5, opacity: 0, y: heart.y - 80 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{ position: 'fixed', left: 0, top: 0, pointerEvents: 'none', zIndex: 99997 }}
          >
            <span style={{ fontSize: Math.random() * 16 + 10 + 'px' }}>
              {['💖', '💕', '💗', '💓', '✨'][Math.floor(Math.random() * 5)]}
            </span>
          </motion.div>
        ))}
      </AnimatePresence>
    </>
  );
}
