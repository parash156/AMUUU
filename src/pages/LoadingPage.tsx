import { useEffect } from 'react';
import { motion } from 'framer-motion';

interface Props {
  onDone: () => void;
  dark: boolean;
}

export default function LoadingPage({ onDone, dark }: Props) {
  useEffect(() => {
    const timer = setTimeout(onDone, 2800);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col items-center justify-center"
      style={{
        background: dark
          ? 'linear-gradient(180deg, #0a0015 0%, #1a0030 100%)'
          : 'linear-gradient(135deg, #fff0f5 0%, #ffe8f0 100%)',
      }}
    >
      {/* Animated hearts loading */}
      <div className="relative flex items-center justify-center w-32 h-32">
        {Array.from({ length: 4 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl"
            animate={{
              scale: [0.5, 1.2, 0.5],
              opacity: [0.3, 1, 0.3],
              rotate: [0, 15, -15, 0],
            }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              delay: i * 0.4,
              ease: 'easeInOut',
            }}
            style={{
              top: `${[0, 40, 40, 0][i]}%`,
              left: `${[40, 0, 80, 40][i]}%`,
            }}
          >
            💖
          </motion.div>
        ))}
        {/* Center heart */}
        <motion.div
          className="text-5xl z-10"
          animate={{
            scale: [1, 1.2, 1, 1.1, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          ❤️
        </motion.div>
      </div>

      {/* Loading text */}
      <motion.div
        className="mt-10 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <p
          className="font-playfair text-2xl font-semibold mb-2"
          style={{ color: dark ? '#fff' : '#1a1a1a' }}
        >
          Opening with love...
        </p>
        <p
          className="font-dancing text-lg"
          style={{ color: dark ? '#ff9cc0' : '#e8344a' }}
        >
          preparing all the memories ✨
        </p>
      </motion.div>

      {/* Progress bar */}
      <motion.div
        className="mt-8 w-48 h-1.5 rounded-full overflow-hidden"
        style={{
          background: dark ? 'rgba(255,255,255,0.1)' : 'rgba(255,107,157,0.2)',
        }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{
            background: 'linear-gradient(90deg, #ff6b9d, #c9b8e8)',
          }}
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 2.5, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* Floating hearts */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none text-2xl"
          style={{
            left: `${10 + i * 12}%`,
            bottom: '-50px',
          }}
          animate={{
            y: [0, -window.innerHeight - 100],
            opacity: [0, 0.6, 0],
            x: [0, (Math.random() - 0.5) * 100],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            delay: Math.random() * 2,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        >
          {['💕', '💖', '💗', '💓', '💝', '🌸', '✨', '💫'][i]}
        </motion.div>
      ))}
    </motion.div>
  );
}
