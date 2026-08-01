import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Fireworks from '../components/Fireworks';
import Scene2Stars from '../components/Scene2Stars';


interface Props {
  dark?: boolean;
  onFinish?: () => void;
}

type Scene =
  | 'darkness'
  | 'stars'
  | 'gift'
  | 'cake'
  | 'fireworks'
  | 'letter'
  | 'memories'
  | 'universe'
  | 'final';

const LETTER_TEXT = `For Amisha,

Some people receive birthday wishes.
You received a little corner of the internet,
made with time, care, and a lot of thought.

It's funny how simple things
a book, a drama recommendation,
or a random reel
turned into memories worth keeping.

Thank you for every conversation,
every recommendation,
and every little moment along the way.

I hope your nursing journey brings you endless opportunities,
your dreams become reality,
and your August-born Leo spirit never loses its fire.

May life always be kind to you.
May your happiness outshine every star in the sky.
May you always have a reason to smile,
and people who appreciate you for exactly who you are.

Happy Birthday, Amisha. 🤍

With warm wishes,

— Parash 🌸`;

export default function UniverseForAmisha({ onFinish }: Props) {
  const [scene, setScene] = useState<Scene>('darkness');
  const [giftOpened, setGiftOpened] = useState(false);
  const [wishMade, setWishMade] = useState(false);
  const [letterOpen, setLetterOpen] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [showHidden, setShowHidden] = useState(false);
  const [showShootingStar, setShowShootingStar] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const typeInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  // Scene timeline
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    if (scene === 'darkness') {
      timers.push(setTimeout(() => setScene('stars'), 7000));
    }
    if (scene === 'fireworks') {
      timers.push(setTimeout(() => setScene('letter'), 9000));
    }
    if (scene === 'memories') {
      timers.push(setTimeout(() => setScene('universe'), 10000));
    }
    if (scene === 'universe') {
      timers.push(setTimeout(() => setScene('final'), 8000));
    }

    return () => timers.forEach(clearTimeout);
  }, [scene]);

  // Typewriter letter
  useEffect(() => {
    if (scene === 'letter' && letterOpen) {
      let i = 0;
      setTypedText('');
      typeInterval.current = setInterval(() => {
        i++;
        setTypedText(LETTER_TEXT.slice(0, i));
        if (i >= LETTER_TEXT.length) {
          if (typeInterval.current) clearInterval(typeInterval.current);
          setTimeout(() => setScene('memories'), 8500);
        }
      }, 28);
    }
    return () => {
      if (typeInterval.current) clearInterval(typeInterval.current);
    };
  }, [scene, letterOpen]);

  // Shooting star on final
  useEffect(() => {
    if (scene !== 'final') return;
    const id = setInterval(() => {
      setShowShootingStar(true);
      setTimeout(() => setShowShootingStar(false), 1800);
    }, 12000);
    return () => clearInterval(id);
  }, [scene]);

  const openGift = () => {
    if (giftOpened) return;
    setGiftOpened(true);
    setTimeout(() => setScene('cake'), 2200);
  };

  const makeWish = () => {
    if (wishMade) return;
    setWishMade(true);
    setTimeout(() => setScene('fireworks'), 1800);
  };

  const openLetter = () => {
    if (letterOpen) return;
    setLetterOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black text-white select-none">
      <AnimatePresence mode="wait">
        {/* ═══ SCENE 1 — DARKNESS ═══ */}
        {scene === 'darkness' && (
          <motion.div
            key="darkness"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0 flex flex-col items-center justify-center bg-black px-6 text-center"
          >
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 1.5 }}
              className="font-playfair text-xl md:text-2xl text-white/90 max-w-md leading-relaxed"
            >
              Some people deserve more than just a birthday wish...
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.8, duration: 1.8 }}
              className="font-playfair text-xl md:text-2xl text-pink-300/90 mt-6 max-w-md"
            >
              they deserve their own universe.
            </motion.p>
          </motion.div>
        )}

        {/* ═══ SCENE 2 — STARS ═══ */}
        {scene === 'stars' && (
          <Scene2Stars
            key="stars-scene"
            onComplete={() => setScene('gift')}
          />
        )}

        {/* ═══ SCENE 3 — GIFT ═══ */}
{scene === 'gift' && (
  <motion.div
    key="gift"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden"
    style={{
      background:
        'radial-gradient(ellipse at 50% 40%, #1a0a30 0%, #0a0018 55%, #03000a 100%)',
    }}
  >
    {/* Soft particles */}
    {!prefersReducedMotion &&
      Array.from({ length: 25 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: 'rgba(255,200,150,0.7)',
          }}
          animate={{
            opacity: [0.1, 0.5, 0.1],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        />
      ))}

    {/* Glow behind gift */}
    <div
      className="absolute w-64 h-64 rounded-full blur-3xl opacity-40 pointer-events-none"
      style={{
        background:
          'radial-gradient(circle, rgba(255,180,100,0.5) 0%, transparent 70%)',
      }}
    />

    <motion.p
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: giftOpened ? 0 : 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="font-inter text-[11px] tracking-[0.3em] uppercase text-white/40 mb-8"
    >
      A gift for you
    </motion.p>

    <motion.button
      onClick={openGift}
      disabled={giftOpened}
      whileHover={{ scale: giftOpened ? 1 : 1.06 }}
      whileTap={{ scale: giftOpened ? 1 : 0.96 }}
      className="relative focus:outline-none"
    >
      <motion.div
        animate={
          giftOpened
            ? { y: -40, scale: 1.15, rotate: [0, -5, 5, 0] }
            : { y: [0, -14, 0], rotate: [0, 1.5, -1.5, 0] }
        }
        transition={
          giftOpened
            ? { duration: 1 }
            : { duration: 3.2, repeat: Infinity, ease: 'easeInOut' }
        }
        className="text-8xl md:text-9xl"
        style={{
          filter: 'drop-shadow(0 0 40px rgba(255,180,100,0.55))',
        }}
      >
        🎁
      </motion.div>

      {/* Opening light burst */}
      <AnimatePresence>
        {giftOpened && (
          <>
            <motion.div
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 5, opacity: 0 }}
              transition={{ duration: 2 }}
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  'radial-gradient(circle, rgba(255,230,180,0.9) 0%, transparent 70%)',
              }}
            />
            {!prefersReducedMotion &&
              Array.from({ length: 18 }).map((_, i) => {
                const angle = (i / 18) * Math.PI * 2;
                return (
                  <motion.div
                    key={i}
                    className="absolute left-1/2 top-1/2 text-lg"
                    initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
                    animate={{
                      x: Math.cos(angle) * 140,
                      y: Math.sin(angle) * 140,
                      opacity: 0,
                      scale: 1.2,
                    }}
                    transition={{ duration: 1.4, delay: 0.1 }}
                  >
                    ✨
                  </motion.div>
                );
              })}
          </>
        )}
      </AnimatePresence>
    </motion.button>

    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: giftOpened ? 0 : 1 }}
      transition={{ delay: 0.6 }}
      className="mt-10 font-dancing text-2xl md:text-3xl text-pink-300/90"
    >
      Open me
    </motion.p>
  </motion.div>
)}

{/* ═══ SCENE 4 — CAKE ═══ */}
{scene === 'cake' && (
  <motion.div
    key="cake"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0, transition: { duration: 1.2 } }}
    className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden"
    style={{
      background:
        'radial-gradient(ellipse at 50% 45%, #2a1040 0%, #120820 50%, #060010 100%)',
    }}
  >
    {/* Ambient particles */}
    {!prefersReducedMotion &&
      Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-pink-200/40"
          style={{
            width: Math.random() * 2.5 + 0.5,
            height: Math.random() * 2.5 + 0.5,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{ opacity: [0.15, 0.5, 0.15], y: [0, -15, 0] }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

    {/* Soft glow under cake */}
    <div
      className="absolute w-72 h-40 rounded-full blur-3xl opacity-35 pointer-events-none"
      style={{
        background:
          'radial-gradient(circle, rgba(255,150,180,0.45) 0%, transparent 70%)',
        top: '48%',
      }}
    />

    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="font-inter text-[11px] tracking-[0.3em] uppercase text-white/40 mb-6"
    >
      Make a wish
    </motion.p>

    {/* Cake */}
    <motion.div
      initial={{ scale: 0.4, opacity: 0, y: 30 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 14, delay: 0.25 }}
      className="relative text-8xl md:text-9xl mb-4"
      style={{
        filter: 'drop-shadow(0 0 35px rgba(255,160,190,0.4))',
      }}
    >
      🎂
    </motion.div>

    {/* Candles */}
    <div className="flex gap-4 mb-2">
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{
            opacity: 1,
            y: !wishMade && !prefersReducedMotion ? [0, -3, 0] : 0,
          }}
          transition={
            !wishMade
              ? { duration: 0.7 + i * 0.08, repeat: Infinity, delay: 0.5 + i * 0.1 }
              : { delay: 0.5 + i * 0.08 }
          }
          className="text-2xl"
        >
          {wishMade ? '💨' : '🕯️'}
        </motion.div>
      ))}
    </div>

    {/* Smoke when blown */}
    <AnimatePresence>
      {wishMade &&
        !prefersReducedMotion &&
        Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={`smoke-${i}`}
            className="absolute text-lg opacity-40"
            style={{ left: `calc(50% + ${(i - 4) * 18}px)`, top: '42%' }}
            initial={{ y: 0, opacity: 0.5, scale: 0.6 }}
            animate={{ y: -80, opacity: 0, scale: 1.4 }}
            transition={{ duration: 1.6, delay: i * 0.05 }}
          >
            ☁️
          </motion.div>
        ))}
    </AnimatePresence>

    <AnimatePresence>
      {!wishMade && (
        <motion.button
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ delay: 1.1 }}
          onClick={makeWish}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          className="mt-12 px-12 py-4 rounded-full font-inter font-medium text-white tracking-wide"
          style={{
            background: 'linear-gradient(135deg, #ff6b9d, #c9b8e8)',
            boxShadow:
              '0 12px 40px rgba(255,107,157,0.45), 0 0 0 1px rgba(255,255,255,0.1)',
          }}
        >
          Make a Wish ✨
        </motion.button>
      )}
    </AnimatePresence>

    {wishMade && (
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-10 font-dancing text-2xl md:text-3xl text-pink-300/90"
      >
        Wish locked in the stars…
      </motion.p>
    )}
  </motion.div>
)}
        {/* ═══ SCENE 5 — FIREWORKS ═══ */}
        {scene === 'fireworks' && (
          <motion.div
            key="fireworks"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1.4 } }}
            className="absolute inset-0 bg-black overflow-hidden"
          >
            <div className="absolute inset-0 opacity-70">
              <Fireworks active={true} />
            </div>

            {!prefersReducedMotion &&
              Array.from({ length: 36 }).map((_, i) => {
                const angle = (i / 36) * Math.PI * 2;
                return (
                  <motion.div
                    key={`center-${i}`}
                    className="absolute left-1/2 top-1/2 text-xl md:text-2xl"
                    initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
                    animate={{
                      x: Math.cos(angle) * (220 + (i % 3) * 40),
                      y: Math.sin(angle) * (220 + (i % 3) * 40),
                      scale: 1.6,
                      opacity: 0,
                    }}
                    transition={{
                      duration: 2.1,
                      delay: 0.15 + (i % 5) * 0.03,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    {['✨', '🌟', '💫', '⭐', '✦'][i % 5]}
                  </motion.div>
                );
              })}

            {!prefersReducedMotion &&
              Array.from({ length: 28 }).map((_, i) => {
                const t = (i / 28) * Math.PI * 2;
                const heartX = 16 * Math.pow(Math.sin(t), 3);
                const heartY = -(
                  13 * Math.cos(t) -
                  5 * Math.cos(2 * t) -
                  2 * Math.cos(3 * t) -
                  Math.cos(4 * t)
                );
                return (
                  <motion.div
                    key={`heart-${i}`}
                    className="absolute left-1/2 top-[45%] text-lg"
                    initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
                    animate={{
                      x: heartX * 9,
                      y: heartY * 9,
                      scale: 1.3,
                      opacity: 0,
                    }}
                    transition={{
                      duration: 2.4,
                      delay: 0.9 + i * 0.025,
                      ease: 'easeOut',
                    }}
                  >
                    💖
                  </motion.div>
                );
              })}

            {!prefersReducedMotion &&
              Array.from({ length: 50 }).map((_, i) => (
                <motion.div
                  key={`rain-${i}`}
                  className="absolute text-sm md:text-base pointer-events-none"
                  style={{ left: `${Math.random() * 100}%` }}
                  initial={{ y: -30, opacity: 0 }}
                  animate={{
                    y: '115vh',
                    opacity: [0, 0.95, 0.95, 0],
                    rotate: Math.random() * 520,
                  }}
                  transition={{
                    duration: 5 + Math.random() * 3.5,
                    delay: 1.6 + Math.random() * 2.8,
                    ease: 'linear',
                  }}
                >
                  {['✨', '🌟', '💫', '⭐', '✦'][i % 5]}
                </motion.div>
              ))}

            {!prefersReducedMotion &&
              Array.from({ length: 11 }).map((_, i) => (
                <motion.div
                  key={`up-${i}`}
                  className="absolute text-3xl md:text-4xl"
                  style={{ left: `${4 + i * 8.5}%` }}
                  initial={{ y: '110vh', opacity: 0 }}
                  animate={{
                    y: '-18vh',
                    opacity: [0, 0.95, 0.95, 0],
                    x: [0, Math.sin(i * 1.3) * 28, 0],
                  }}
                  transition={{
                    duration: 9 + i * 0.35,
                    delay: 2.1 + i * 0.18,
                    ease: 'easeOut',
                  }}
                >
                  {i % 3 === 0 ? '💖' : i % 2 === 0 ? '🎈' : '🤍'}
                </motion.div>
              ))}

            <div className="absolute inset-0 flex flex-col items-center justify-center z-30 pointer-events-none">
              <motion.p
                initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ delay: 2.0, duration: 1 }}
                className="font-playfair text-sm md:text-base tracking-[0.35em] text-white/70 uppercase mb-3"
              >
                Happy Birthday
              </motion.p>

              <motion.h1
                initial={{ scale: 0.25, opacity: 0, filter: 'blur(12px)' }}
                animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
                transition={{
                  delay: 2.5,
                  type: 'spring',
                  stiffness: 110,
                  damping: 14,
                }}
                className="font-playfair text-5xl md:text-7xl lg:text-8xl font-bold tracking-[0.18em]"
                style={{
                  background:
                    'linear-gradient(135deg, #fff0f7 0%, #ff8fb8 35%, #e0c3fc 70%, #89f7fe 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  filter:
                    'drop-shadow(0 0 18px rgba(255,130,180,0.7)) drop-shadow(0 0 45px rgba(255,100,160,0.35))',
                }}
              >
                AMISHA
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 4.0, duration: 1.4 }}
                className="mt-8 font-dancing text-xl md:text-2xl text-pink-200/90 max-w-sm text-center px-4"
              >
                The entire universe is celebrating you tonight
              </motion.p>
            </div>

            <div
              className="absolute inset-0 pointer-events-none z-20"
              style={{
                background:
                  'radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.65) 100%)',
              }}
            />
          </motion.div>
        )}

        {/* ═══ SCENE 6 — LETTER ═══ */}
        {scene === 'letter' && (
          <motion.div
            key="letter"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-[#0a0014] px-4"
          >
            {!letterOpen ? (
              <motion.button
                onClick={openLetter}
                whileHover={{ scale: 1.06, y: -6 }}
                whileTap={{ scale: 0.97 }}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-7xl focus:outline-none"
              >
                💌
              </motion.button>
            ) : (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="max-w-lg w-full bg-[#fffaf5] text-[#2a1a1a] rounded-sm shadow-2xl p-8 md:p-10 relative"
                style={{
                  boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
                  fontFamily: 'Georgia, serif',
                }}
              >
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-pink-300 via-rose-200 to-amber-200" />
                <pre className="whitespace-pre-wrap font-serif text-[15px] leading-relaxed tracking-wide">
                  {typedText}
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.6 }}
                    className="inline-block w-0.5 h-4 bg-pink-400 ml-0.5 align-middle"
                  />
                </pre>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* ═══ SCENE 7 — THINGS I NOTICED ═══ */}
{scene === 'memories' && (
  <motion.div
    key="memories"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="absolute inset-0 overflow-y-auto overflow-x-hidden"
    style={{
      background:
        'radial-gradient(ellipse at 50% 30%, #140a24 0%, #0a0014 55%, #05000c 100%)',
    }}
  >
    {/* Soft particles */}
    {Array.from({ length: 14 }).map((_, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full bg-white/25 pointer-events-none"
        style={{
          width: Math.random() * 2 + 0.5,
          height: Math.random() * 2 + 0.5,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        animate={{ opacity: [0.1, 0.35, 0.1], y: [0, -10, 0] }}
        transition={{
          duration: 5 + Math.random() * 4,
          repeat: Infinity,
          delay: Math.random() * 3,
        }}
      />
    ))}

    {/* Title */}
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="pt-10 pb-6 text-center font-inter text-[10px] md:text-[11px] tracking-[0.25em] uppercase text-white/40"
    >
      Quiet things I noticed
    </motion.p>

    {/* Cards — responsive grid */}
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5 px-4 md:px-8 pb-24 max-w-3xl mx-auto">
      {[
        {
          id: 1,
          emoji: '📺',
          title: 'The dramas she loves\nheal more than entertain',
          color: '#ff9ec7',
        },
        {
          id: 2,
          emoji: '🦁',
          title: 'An August Leo\nwho carries her own fire',
          color: '#fddb92',
        },
        {
         id: 9,
         emoji: "🌙",
         title: "Reserved,\nyet thoughtful",
         color: "#ff6b9d",
        },
        {
          id: 3,
          emoji: '📖',
          title: 'The book she was looking for\nand the way she cared about it',
          color: '#c9b8e8',
        },
        {
          id: 4,
          emoji: '🏥',
          title: 'Long hospital days\nand still finding softness',
          color: '#89f7fe',
        },
        {
          id: 5,
          emoji: '🌸',
          title: 'Quiet replies\nthat somehow stay longer',
          color: '#fbc2eb',
        },
        {
          id: 6,
          emoji: '✨',
          title: 'The way she shares\nwhat she genuinely likes',
          color: '#ff6b9d',
        },
        {
          id: 7,
          emoji: "🤍",
          title: "Quiet,\nyet caring",
          color: "#fbc2eb",
        },
        
      ].map((m, i) => (
        <motion.div
          key={m.id}
          initial={{ opacity: 0, y: 28, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            delay: 0.35 + i * 0.1,
            type: 'spring',
            stiffness: 120,
            damping: 18,
          }}
          className="rounded-2xl flex flex-col items-center justify-center p-3 md:p-5 text-center min-h-[140px] md:min-h-[180px]"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            backdropFilter: 'blur(12px)',
            boxShadow: `0 10px 30px ${m.color}14`,
          }}
        >
          <div className="text-2xl md:text-3xl mb-2 md:mb-3">{m.emoji}</div>
          <p className="font-inter text-[11px] md:text-[13px] leading-relaxed text-white/80 whitespace-pre-line">
            {m.title}
          </p>
        </motion.div>
      ))}
    </div>

    {/* Bottom line */}
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2 }}
      className="absolute bottom-6 left-0 right-0 text-center font-dancing text-base md:text-lg text-pink-200/70 px-5"
    >
      Some people are noticed in the quiet details
    </motion.p>
  </motion.div>
)}

        {/* ═══ SCENE 8 — UNIVERSE ═══ */}
        {scene === 'universe' && (
          <motion.div
            key="universe"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-black"
          >
            {!prefersReducedMotion &&
              Array.from({ length: 80 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-white"
                  style={{
                    width: Math.random() * 2 + 0.5,
                    height: Math.random() * 2 + 0.5,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{ opacity: [0.2, 0.9, 0.2] }}
                  transition={{
                    duration: 2 + Math.random() * 3,
                    repeat: Infinity,
                  }}
                />
              ))}

            <motion.div
              initial={{ scale: 0.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 3, ease: 'easeOut' }}
              className="text-center"
            >
              <motion.div
                className="text-6xl mb-4"
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🤍
              </motion.div>
              <h1
                className="font-playfair text-5xl md:text-7xl font-bold tracking-widest"
                style={{
                  background: 'linear-gradient(135deg, #ff9ec7, #c9b8e8, #89f7fe)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                AMISHA
              </h1>
            </motion.div>
          </motion.div>
        )}

      {/* ═══ SCENE 9 — FINAL ═══ */}
{scene === 'final' && (
  <motion.div
    key="final"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="absolute inset-0 flex flex-col items-center justify-center bg-black px-6 text-center overflow-hidden"
  >
    {/* Soft starfield */}
    {!prefersReducedMotion &&
      Array.from({ length: 60 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            width: Math.random() * 2 + 0.4,
            height: Math.random() * 2 + 0.4,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{ opacity: [0.1, 0.5, 0.1] }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        />
      ))}

    {/* Soft center glow */}
    <div
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] rounded-full pointer-events-none opacity-30 blur-3xl"
      style={{
        background:
          'radial-gradient(circle, rgba(255,130,180,0.35) 0%, transparent 70%)',
      }}
    />

    {/* Line 1 */}
    <motion.p
      initial={{ opacity: 0, y: 24, filter: 'blur(10px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ delay: 0.8, duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
      className="font-playfair text-3xl md:text-5xl text-white/95 tracking-wide"
    >
      Happy Birthday, Amisha.
    </motion.p>

    {/* Line 2 */}
    <motion.p
      initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ delay: 2.8, duration: 1.6 }}
      className="font-playfair text-xl md:text-2xl text-pink-200/90 mt-8"
    >
      I'm glad our paths crossed.
    </motion.p>

    {/* Line 3 */}
    <motion.p
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 4.8, duration: 1.8 }}
      className="font-playfair text-base md:text-lg text-white/55 mt-8 max-w-lg leading-relaxed"
    >
      May every wish you carry quietly find its way to you. 🤍
    </motion.p>

    {/* Soft divider */}
    <motion.div
      initial={{ scaleX: 0, opacity: 0 }}
      animate={{ scaleX: 1, opacity: 1 }}
      transition={{ delay: 6.2, duration: 1.2 }}
      className="mt-12 h-px w-24 origin-center"
      style={{
        background:
          'linear-gradient(90deg, transparent, rgba(255,180,200,0.5), transparent)',
      }}
    />

    {/* Secret heart */}
    <motion.button
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 7.2, type: 'spring', stiffness: 120 }}
      onClick={() => setShowHidden((v) => !v)}
      className="mt-10 text-4xl focus:outline-none"
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.95 }}
    >
      🤍
    </motion.button>

    <AnimatePresence>
      {showHidden && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="mt-6 font-inter text-sm text-pink-300/80 max-w-xs leading-relaxed"
        >
          This universe will always be here whenever you want to visit again.
        </motion.p>
      )}
    </AnimatePresence>

    {/* Home button */}
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 8.2, duration: 1 }}
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => onFinish?.()}
      className="mt-12 px-10 py-3.5 rounded-full font-inter text-sm tracking-[0.15em] uppercase"
      style={{
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,180,200,0.3)',
        color: 'rgba(255,255,255,0.9)',
        backdropFilter: 'blur(12px)',
        boxShadow: '0 0 30px rgba(255,140,180,0.12)',
      }}
    >
      Return home
    </motion.button>

    {/* Shooting star */}
    <AnimatePresence>
      {showShootingStar && (
        <motion.div
          initial={{ x: -100, y: 80, opacity: 0 }}
          animate={{ x: '100vw', y: 200, opacity: [0, 1, 0] }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.6, ease: 'easeIn' }}
          className="absolute top-20 left-0 text-2xl cursor-pointer"
          onClick={() =>
            alert(
              'P.S. Every time you visit this page, a different constellation appears just for you.'
            )
          }
        >
          ☄️
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
)}
      </AnimatePresence>
    </div>
  );
}