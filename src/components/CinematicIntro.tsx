import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  onDone: () => void;
}

const sequence = [
  { text: 'Some moments deserve to last forever.', sub: null, duration: 2600 },
  { text: 'Some birthdays deserve their own universe.', sub: null, duration: 3200 },
  { text: 'This is one of them.', sub: null, duration: 2600 },
  { text: 'Happy Birthday', sub: 'Amisha 🌸', duration: 4000 },
];

export default function CinematicIntro({ onDone }: Props) {
  const [step, setStep] = useState(-1);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const start = setTimeout(() => setStep(0), 1100);
    return () => clearTimeout(start);
  }, []);

  useEffect(() => {
    if (step < 0) return;

    if (step < sequence.length) {
      const timer = setTimeout(() => setStep((s) => s + 1), sequence[step].duration);
      return () => clearTimeout(timer);
    }

    const end = setTimeout(() => {
      setExiting(true);
      setTimeout(onDone, 1200);
    }, 1000);

    return () => clearTimeout(end);
  }, [step, onDone]);

  const skip = () => {
    setExiting(true);
    setTimeout(onDone, 700);
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: exiting ? 0 : 1 }}
      transition={{ duration: 1.2, ease: 'easeInOut' }}
      onClick={skip}
      className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden cursor-pointer"
      style={{
        background: 'radial-gradient(ellipse at 50% 40%, #0d0818 0%, #05030a 55%, #020105 100%)',
      }}
    >
      {/* Soft particles */}
      {Array.from({ length: 40 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 2 + 0.5,
            height: Math.random() * 2 + 0.5,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: 'rgba(255, 200, 230, 0.7)',
          }}
          animate={{
            opacity: [0.1, 0.45, 0.1],
            y: [0, -14, 0],
          }}
          transition={{
            duration: 5 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 4,
          }}
        />
      ))}

      {/* Soft glow */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[320px] rounded-full pointer-events-none opacity-25 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(255,130,180,0.35) 0%, transparent 70%)',
        }}
      />

      {/* Text */}
      <div className="relative z-10 max-w-2xl px-8 text-center">
        <AnimatePresence mode="wait">
          {step >= 0 && step < sequence.length && (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -16, filter: 'blur(6px)' }}
              transition={{ duration: 1.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="font-playfair text-3xl md:text-5xl font-light text-white/95 tracking-wide leading-snug">
                {sequence[step].text}
              </p>

              {sequence[step].sub && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 1 }}
                  className="font-dancing text-3xl md:text-4xl mt-5"
                  style={{
                    background: 'linear-gradient(135deg, #ffb8d9, #ff6b9d, #e0c3fc)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {sequence[step].sub}
                </motion.p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Progress */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {sequence.map((_, i) => (
          <motion.div
            key={i}
            className="h-[2px] rounded-full"
            animate={{
              width: i === step ? 22 : 6,
              background:
                i <= step ? 'rgba(255,150,190,0.75)' : 'rgba(255,255,255,0.12)',
            }}
            transition={{ duration: 0.45 }}
          />
        ))}
      </div>

      {/* Skip */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.28 }}
        transition={{ delay: 2 }}
        className="absolute bottom-6 right-8 font-inter text-[10px] tracking-[0.2em] uppercase text-white z-20"
      >
        Tap to skip
      </motion.p>
    </motion.div>
  );
}