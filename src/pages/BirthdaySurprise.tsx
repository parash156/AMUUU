import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Fireworks from '../components/Fireworks';

interface Props {
  onContinue: () => void;
  dark: boolean;
}

const BIRTHDAY_WISHES = [
  "On this special day, I want you to know that the world became infinitely more beautiful the day you were born in it. 🌸",
  "Every year with you is a gift I never want to return. Here's to more adventures, more laughter, more us. 🎉",
  "You deserve every wish that comes true today and every day after. Happy birthday, my love. 💖",
];

export default function BirthdaySurprise({ onContinue, dark }: Props) {
  const [wishIndex, setWishIndex] = useState(0);
  const [showFireworks, setShowFireworks] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setWishIndex(i => (i + 1) % BIRTHDAY_WISHES.length);
    }, 3500);
    const fwTimer = setTimeout(() => setShowFireworks(false), 8000);
    return () => { clearInterval(interval); clearTimeout(fwTimer); };
  }, []);

  const confetti = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 3,
    duration: Math.random() * 3 + 4,
    emoji: ['🎂', '🎁', '🎈', '🎊', '🎉', '🌟', '💖', '✨'][Math.floor(Math.random() * 8)],
    size: Math.random() * 16 + 14,
  }));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{
        background: dark
          ? 'linear-gradient(180deg, #0a0015 0%, #1a0030 100%)'
          : 'linear-gradient(135deg, #fff0f5 0%, #ffe8f0 50%, #fdf4ff 100%)',
      }}
    >
      <Fireworks active={showFireworks} />

      {/* Falling confetti */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {confetti.map(c => (
          <div
            key={c.id}
            style={{
              position: 'absolute',
              left: `${c.x}%`,
              top: '-30px',
              fontSize: c.size,
              animation: `confettiFall ${c.duration}s ${c.delay}s linear infinite`,
            }}
          >
            {c.emoji}
          </div>
        ))}
      </div>

      {/* Main card */}
      <motion.div
        initial={{ scale: 0, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', bounce: 0.4, delay: 0.3 }}
        className="relative z-10 max-w-md w-full mx-4 rounded-3xl overflow-hidden shadow-2xl"
        style={{
          background: dark ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.9)',
          backdropFilter: 'blur(20px)',
          border: '2px solid rgba(255,107,157,0.3)',
        }}
      >
        {/* Gradient top band */}
        <div
          className="h-4"
          style={{ background: 'linear-gradient(90deg, #ff6b9d, #c9b8e8, #fddb92, #89f7fe, #ff6b9d)' }}
        />

        <div className="p-8 text-center">
          {/* Cake animation */}
          <motion.div
            animate={{ scale: [1, 1.1, 1], rotate: [0, -5, 5, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-7xl mb-4"
          >
            🎂
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="font-playfair text-4xl font-bold mb-1"
            style={{ color: dark ? '#fff' : '#1a1a1a' }}
          >
            Happy Birthday
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="font-dancing text-3xl mb-6"
            style={{ color: '#ff6b9d' }}
          >
            my love 💕
          </motion.p>

          {/* Rotating wishes */}
          <AnimatePresence mode="wait">
            <motion.div
              key={wishIndex}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
              className="mb-8 px-2"
            >
              <p
                className="font-inter leading-relaxed text-sm"
                style={{ color: dark ? 'rgba(255,255,255,0.75)' : '#4b5563', lineHeight: '1.8' }}
              >
                {BIRTHDAY_WISHES[wishIndex]}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Wish dots */}
          <div className="flex justify-center gap-2 mb-8">
            {BIRTHDAY_WISHES.map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full transition-all duration-300"
                style={{
                  background: i === wishIndex ? '#ff6b9d' : 'rgba(255,107,157,0.3)',
                  transform: i === wishIndex ? 'scale(1.3)' : 'scale(1)',
                }}
              />
            ))}
          </div>

          {/* Stars */}
          <div className="flex justify-center gap-2 mb-6 text-2xl">
            {Array.from({ length: 5 }).map((_, i) => (
              <motion.span
                key={i}
                animate={{ y: [0, -8, 0], scale: [1, 1.2, 1] }}
                transition={{ delay: i * 0.15, repeat: Infinity, duration: 1.5 }}
              >
                ⭐
              </motion.span>
            ))}
          </div>

          {/* CTA Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onContinue}
            className="cursor-none w-full py-3 rounded-2xl font-inter font-semibold text-white shadow-lg"
            style={{ background: 'linear-gradient(135deg, #ff6b9d, #c9b8e8)' }}
          >
            Open Your Gift 🎁
          </motion.button>
        </div>

        {/* Bottom band */}
        <div
          className="h-4"
          style={{ background: 'linear-gradient(90deg, #fddb92, #96fbc4, #fbc2eb, #ff6b9d, #fddb92)' }}
        />
      </motion.div>
    </motion.div>
  );
}
