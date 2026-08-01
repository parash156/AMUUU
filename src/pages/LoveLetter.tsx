import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  onBack: () => void;
  dark: boolean;
}

export default function LoveLetter({ onBack, dark }: Props) {
  const [opened, setOpened] = useState(false);
  const [showLetter, setShowLetter] = useState(false);

  const handleOpen = () => {
    setOpened(true);
    setTimeout(() => setShowLetter(true), 800);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen py-12 px-4"
      style={{
        background: dark
          ? 'radial-gradient(ellipse at 50% 0%, #140a22 0%, #0a0612 55%, #050308 100%)'
          : 'linear-gradient(135deg, #fff0f5 0%, #fdf4ff 50%, #f8f0ff 100%)',
      }}
    >
      {/* Back */}
      <motion.button
        whileHover={{ x: -3 }}
        whileTap={{ scale: 0.97 }}
        onClick={onBack}
        className="mb-10 font-inter text-[11px] tracking-[0.2em] uppercase px-4 py-2.5 rounded-full"
        style={{
          color: dark ? 'rgba(255,255,255,0.5)' : '#9ca3af',
          background: dark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.7)',
          border: dark
            ? '1px solid rgba(255,255,255,0.08)'
            : '1px solid rgba(0,0,0,0.06)',
        }}
      >
        ← Back
      </motion.button>

      {!showLetter ? (
        /* Envelope */
        <div className="flex flex-col items-center justify-center min-h-[70vh]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <p
              className="font-inter text-[10px] tracking-[0.3em] uppercase mb-3"
              style={{ color: dark ? 'rgba(255,255,255,0.35)' : '#9ca3af' }}
            >
              A quiet note
            </p>
            <h1
              className="font-playfair text-4xl md:text-5xl font-medium tracking-tight mb-3"
              style={{ color: dark ? '#fff' : '#1a1225' }}
            >
              For you
            </h1>
            <p
              className="font-dancing text-xl"
              style={{ color: dark ? '#ff9cc0' : '#e8344a' }}
            >
              open when you’re ready
            </p>
          </motion.div>

          <motion.button
            onClick={handleOpen}
            whileHover={{ scale: 1.04, y: -4 }}
            whileTap={{ scale: 0.97 }}
            animate={opened ? {} : { y: [0, -8, 0] }}
            transition={opened ? {} : { repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
            className="relative focus:outline-none"
          >
            <svg viewBox="0 0 200 160" width="280" height="224">
              <defs>
                <linearGradient id="envGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffc1d8" />
                  <stop offset="100%" stopColor="#ff6b9d" />
                </linearGradient>
                <linearGradient id="flapGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ff6b9d" />
                  <stop offset="100%" stopColor="#e8344a" />
                </linearGradient>
              </defs>

              <rect x="5" y="40" width="190" height="115" rx="10" fill="url(#envGrad)" />
              <path d="M5,155 L100,95 L195,155" fill="rgba(255,255,255,0.12)" />
              <path d="M5,40 L100,95 L195,40" fill="rgba(255,255,255,0.08)" />

              <motion.path
                d="M5,40 L100,95 L195,40 Q195,28 183,28 L17,28 Q5,28 5,40Z"
                fill="url(#flapGrad)"
                animate={
                  opened
                    ? { d: 'M5,40 L100,-12 L195,40 Q195,28 183,28 L17,28 Q5,28 5,40Z' }
                    : {}
                }
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              />

              {!opened && (
                <text x="100" y="78" textAnchor="middle" fontSize="22">
                  ✉️
                </text>
              )}
            </svg>

            <motion.div
              animate={{ opacity: [0.25, 0.5, 0.25] }}
              transition={{ repeat: Infinity, duration: 2.4 }}
              className="absolute inset-0 pointer-events-none rounded-full"
              style={{
                background:
                  'radial-gradient(circle, rgba(255,107,157,0.25) 0%, transparent 70%)',
              }}
            />
          </motion.button>
        </div>
      ) : (
        /* Letter */
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-xl mx-auto"
          >
            <div
              className="rounded-sm overflow-hidden"
              style={{
                background: dark ? 'rgba(255,255,255,0.04)' : '#f7f2eb',
                border: dark
                  ? '1px solid rgba(255,255,255,0.08)'
                  : '1px solid rgba(0,0,0,0.05)',
                boxShadow: dark
                  ? '0 25px 60px rgba(0,0,0,0.4)'
                  : '0 25px 60px rgba(180,80,120,0.1)',
              }}
            >
              {/* Top accent */}
              <div
                className="h-1"
                style={{
                  background:
                    'linear-gradient(90deg, transparent, #ff6b9d, transparent)',
                }}
              />

              <div className="px-8 py-10 md:px-11 md:py-12">
                <p
                  className="font-inter text-[11px] tracking-[0.25em] uppercase mb-6"
                  style={{ color: dark ? 'rgba(255,180,200,0.6)' : '#b8957a' }}
                >
                  Written quietly
                </p>

                <h2
                  className="font-playfair text-2xl md:text-3xl mb-8 leading-snug"
                  style={{ color: dark ? '#fff' : '#1c1814' }}
                >
                  For Amisha
                </h2>

                <div className="space-y-5">
                  {[
  "Dear Amisha,",
  "Happy Birthday. 🤍🎉 I wanted to do something a little different this year, so I made this small corner of the internet just for you.",
  "It's funny how our conversations started with simple things a drama recommendation, a book, or a random reel. Somehow those little moments became memories worth keeping.",
  "Thank you for introducing me to stories like The First Frost and Welcome to Samdal-ri. You really do have great taste. 😄",
  "As you continue your nursing journey, I hope you always carry the same kindness and compassion that make you who you are. I know you'll make a difference in many lives.",
  "And of course... I couldn't forget the August-born Leo girl. 😄 I hope this new year brings you happiness, success, good health, and everything you've been wishing for.",
  "Keep smiling, keep chasing your dreams, and keep those 10/10 recommendations coming. 🌸",
  "Happy Birthday once again. I hope today is as wonderful as you are. 🤍",
].map((para, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 + i * 0.12 }}
                      className="text-[15px] leading-[1.9]"
                      style={{
                        color: dark ? 'rgba(255,255,255,0.78)' : '#2e2820',
                        fontFamily: 'Georgia, "Times New Roman", serif',
                      }}
                    >
                      {para}
                    </motion.p>
                  ))}
                </div>

                {/* Signature */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="mt-10 pt-6"
                  style={{
                    borderTop: dark
                      ? '1px solid rgba(255,255,255,0.08)'
                      : '1px solid rgba(0,0,0,0.06)',
                  }}
                >
                  <p
                    className="font-inter text-xs mb-2"
                    style={{ color: dark ? 'rgba(255,255,255,0.35)' : '#9c8f7e' }}
                  >
                    With best wishes,
                  </p>
                  <p
                    className="font-dancing text-2xl"
                    style={{ color: dark ? '#ff9cc0' : '#e8344a' }}
                  >
                    From someone who notices
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </motion.div>
  );
}