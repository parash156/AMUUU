import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  onComplete: () => void; // called when the sequence finishes → start birthday universe
}

export default function MoonLetter({ onComplete }: Props) {
  const [phase, setPhase] = useState<
    'sky' | 'moon-approach' | 'letter-fall' | 'moon-speaks' | 'letter-open' | 'message' | 'done'
  >('sky');

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase('moon-approach'), 1800),
      setTimeout(() => setPhase('letter-fall'), 4800),
      setTimeout(() => setPhase('moon-speaks'), 7200),
      setTimeout(() => setPhase('letter-open'), 10500),
      setTimeout(() => setPhase('message'), 12800),
      setTimeout(() => setPhase('done'), 17500),
      setTimeout(() => onComplete(), 19500),
    ];

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black select-none">
      {/* Peaceful night sky */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, #0a1628 0%, #050d18 40%, #02060e 100%)',
        }}
      />

      {/* Soft stars */}
      {Array.from({ length: 80 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            width: Math.random() * 1.8 + 0.4,
            height: Math.random() * 1.8 + 0.4,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{ opacity: [0.15, 0.6, 0.15] }}
          transition={{
            duration: 3 + Math.random() * 4,
            delay: Math.random() * 5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Distant soft clouds */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none opacity-20"
        style={{
          background:
            'linear-gradient(to top, rgba(100,140,200,0.15), transparent)',
        }}
      />

      {/* ========== THE MOON ========== */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 z-20"
        initial={{ top: '8%', scale: 0.55, opacity: 0.7 }}
        animate={
          phase === 'sky'
            ? { top: '8%', scale: 0.55, opacity: 0.7 }
            : phase === 'moon-approach' || phase === 'letter-fall' || phase === 'moon-speaks'
            ? { top: '22%', scale: 1.05, opacity: 1 }
            : { top: '18%', scale: 0.95, opacity: 0.85 }
        }
        transition={{ duration: 2.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Moon glow */}
        <div
          className="absolute inset-0 rounded-full blur-3xl opacity-50"
          style={{
            background: 'radial-gradient(circle, rgba(255,240,210,0.5) 0%, transparent 70%)',
            transform: 'scale(1.8)',
          }}
        />

        {/* Moon body */}
        <div
          className="relative w-36 h-36 md:w-48 md:h-48 rounded-full overflow-hidden"
          style={{
            background:
              'radial-gradient(circle at 35% 30%, #fff8e7 0%, #f0e0c0 40%, #d4c4a0 75%, #b8a888 100%)',
            boxShadow:
              '0 0 60px rgba(255,240,200,0.35), inset -20px -15px 40px rgba(0,0,0,0.15)',
          }}
        >
          {/* Soft craters */}
          <div
            className="absolute rounded-full opacity-20"
            style={{
              width: 28,
              height: 28,
              top: '28%',
              left: '22%',
              background: 'rgba(0,0,0,0.25)',
            }}
          />
          <div
            className="absolute rounded-full opacity-15"
            style={{
              width: 18,
              height: 18,
              top: '55%',
              left: '58%',
              background: 'rgba(0,0,0,0.25)',
            }}
          />
          <div
            className="absolute rounded-full opacity-10"
            style={{
              width: 14,
              height: 14,
              top: '40%',
              left: '70%',
              background: 'rgba(0,0,0,0.2)',
            }}
          />
        </div>
      </motion.div>

      {/* ========== LETTER FALLING FROM THE MOON ========== */}
      <AnimatePresence>
        {(phase === 'letter-fall' ||
          phase === 'moon-speaks' ||
          phase === 'letter-open' ||
          phase === 'message' ||
          phase === 'done') && (
          <motion.div
            initial={{ top: '28%', opacity: 0, scale: 0.4, rotate: -12 }}
            animate={{
              top: phase === 'letter-fall' ? '48%' : '52%',
              opacity: 1,
              scale: 1,
              rotate: 0,
            }}
            transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-1/2 -translate-x-1/2 z-30"
          >
            {/* Envelope / Letter */}
            <motion.div
              className="relative"
              animate={
                phase === 'letter-open' || phase === 'message' || phase === 'done'
                  ? { scale: 1.05 }
                  : {}
              }
            >
              {/* Closed envelope look */}
              {(phase === 'letter-fall' || phase === 'moon-speaks') && (
                <div
                  className="w-28 h-20 md:w-36 md:h-24 rounded-sm flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, #f8f0e3 0%, #e8d9c0 100%)',
                    boxShadow: '0 12px 30px rgba(0,0,0,0.35)',
                    border: '1px solid rgba(200,180,140,0.4)',
                  }}
                >
                  <span className="text-3xl">✉️</span>
                </div>
              )}

              {/* Open letter */}
              {(phase === 'letter-open' || phase === 'message' || phase === 'done') && (
                <motion.div
                  initial={{ height: 80, opacity: 0.8 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  className="w-72 md:w-80 rounded-sm overflow-hidden"
                  style={{
                    background: '#fdf8f0',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.4)',
                  }}
                >
                  {/* Top decorative line */}
                  <div
                    className="h-1.5"
                    style={{
                      background: 'linear-gradient(90deg, #e8c4a0, #f0d8b8, #e8c4a0)',
                    }}
                  />

                  <div className="px-6 py-7 text-center">
                    <AnimatePresence mode="wait">
                      {phase === 'letter-open' && (
                        <motion.p
                          key="open"
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="font-serif text-[15px] leading-relaxed text-[#3a2a1a]"
                        >
                          Someone asked me to deliver this to you today.
                        </motion.p>
                      )}

                      {(phase === 'message' || phase === 'done') && (
                        <motion.div
                          key="message"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="font-serif text-[15px] leading-relaxed text-[#3a2a1a]"
                        >
                          <p className="mb-3">Someone asked me to deliver this to you today.</p>
                          <p className="text-[#8b5e3c] italic">
                            A whole universe is waiting for you...
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========== MOON SPEAKS ========== */}
      <AnimatePresence>
        {phase === 'moon-speaks' && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 1.4 }}
            className="absolute left-0 right-0 top-[62%] text-center px-8 z-20"
          >
            <span
              className="font-playfair text-lg md:text-xl text-white/90"
              style={{ textShadow: '0 0 20px rgba(255,240,200,0.3)' }}
            >
              I've been watching your smiles for years...
            </span>
          </motion.p>
        )}
      </AnimatePresence>

      {/* Soft vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.45) 100%)',
        }}
      />
    </div>
  );
}