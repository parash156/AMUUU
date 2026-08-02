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
  | 'final';

const LETTER_TEXT = `For Amisha,

If you've reached this page...

Thank you.

You might still be wondering why someone like me would spend so much time building an entire website for your birthday.

The truth is... I don't really have a complicated answer.

At some point, I started noticing the birthday reels you reposted. Some were happy, some were emotional, but every time I came across one, it quietly stayed in my mind. It made me feel that birthdays weren't just another date on the calendar for you. Maybe I understood them the wrong way, maybe I didn't... they made me stop and think.

You always seem like a strong August-born Leo girl someone who keeps moving forward no matter what. But even the strongest people deserve a day where they feel appreciated, celebrated, and genuinely khusi.

That's why I made this.

Not because I expected anything in return. Not because I wanted to impress you. I simply thought... if a random person like me could make your birthday a little brighter, even if it was only for a few minutes, then every late night, every page, every animation, and every tiny detail would be completely worth it.

It's funny how everything started with such simple things... a drama recommendation, a book, or a random reel. Somehow, those little conversations turned into memories I genuinely enjoyed. Thank you for introducing me to The First Frost and Welcome to Samdal-ri. They'll always remind me of the person who recommended them.

Life gives us countless ordinary days, but birthdays come only once every year. So I sincerely hope that today gives you beautiful memories, genuine laughter, and reminds you just how special you are.

Maybe years from now you'll come across this little website again. If that happens, I hope you don't remember the code or the animations... I hope you simply remember that someone, who was just another person in your life, genuinely wanted to make your birthday a little more special.

Sadhai khusi rahanu, afno sapana haru pura gardai janu, and never lose that spark that makes you... you.

Happy Birthday once again, Amisha.
Take care.

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
  const [letterDone, setLetterDone] = useState(false);
  const letterBodyRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  if (letterBodyRef.current) {
    letterBodyRef.current.scrollTop = letterBodyRef.current.scrollHeight;
  }
}, [typedText]);

  // Scene timeline
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    if (scene === 'darkness') {
      timers.push(setTimeout(() => setScene('stars'), 28000));
    }
    if (scene === 'fireworks') {
      timers.push(setTimeout(() => setScene('letter'), 9000));
    }
    if (scene === 'memories') {
      timers.push(setTimeout(() => setScene('final'), 10000));
    }

    return () => timers.forEach(clearTimeout);
  }, [scene]);

  /// Typewriter letter
useEffect(() => {
  if (scene === 'letter' && letterOpen) {
    let i = 0;
    setTypedText('');
    setLetterDone(false);
    typeInterval.current = setInterval(() => {
      i++;
      setTypedText(LETTER_TEXT.slice(0, i));
      if (i >= LETTER_TEXT.length) {
        if (typeInterval.current) clearInterval(typeInterval.current);
        setLetterDone(true); // wait for Continue button — no auto skip
      }
    }, 22); // slightly faster for long letter
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
        
      {/* ═══ SCENE 1 — A STAR FOUND SOMEONE (FINAL GRAND) ═══ */}
{scene === 'darkness' && (
  <motion.div
    key="darkness"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0, transition: { duration: 2.2 } }}
    transition={{ duration: 1.5 }}
    className="absolute inset-0 flex flex-col items-center justify-center bg-black overflow-hidden"
  >
    {/* Soft night sky gradient */}
    <div
      className="absolute inset-0"
      style={{
        background:
          'radial-gradient(ellipse at 50% 20%, #0a1628 0%, #050d18 45%, #02060e 100%)',
      }}
    />

    {/* ── COUNTDOWN ── */}
    <div className="absolute inset-0 flex items-center justify-center z-40">
      {[3, 2, 1].map((num, i) => (
        <motion.span
          key={num}
          initial={{ opacity: 0, scale: 0.15 }}
          animate={{
            opacity: [0, 1, 1, 0],
            scale: [0.15, 1.3, 1, 1.7],
          }}
          transition={{
            duration: 1.4,
            times: [0, 0.2, 0.7, 1],
            delay: 0.7 + i * 1.5,
          }}
          className="absolute font-playfair text-8xl md:text-9xl font-medium text-white tracking-tighter"
        >
          {num}
        </motion.span>
      ))}
    </div>

    {/* ── STARS ── */}
    {!prefersReducedMotion &&
      Array.from({ length: 140 }).map((_, i) => {
        const size = Math.random() * 2.4 + 0.7;
        return (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: size,
              height: size,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, Math.random() * 0.75 + 0.2, Math.random() * 0.5 + 0.15],
              scale: 1,
            }}
            transition={{
              delay: 5.8 + Math.random() * 3.5,
              duration: 2.6 + Math.random() * 2,
              ease: 'easeOut',
            }}
          />
        );
      })}

    {/* ── THE MOON ── */}
    <motion.div
      className="absolute left-1/2 -translate-x-1/2 z-20
                 top-[20%] md:top-[28%]"   // ← higher on mobile, balanced on desktop
      initial={{ scale: 0.15, opacity: 0 }}
      animate={{
        scale: 1,
        opacity: 1,
      }}
      transition={{
        delay: 10.5,
        duration: 5.5,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {/* Soft moon glow */}
      <div
        className="absolute inset-0 rounded-full blur-3xl opacity-50"
        style={{
          background: 'radial-gradient(circle, rgba(255,240,210,0.55) 0%, transparent 70%)',
          transform: 'scale(1.9)',
        }}
      />

      {/* Moon body */}
      <div
        className="relative w-36 h-36 md:w-48 md:h-48 rounded-full overflow-hidden"
        style={{
          background:
            'radial-gradient(circle at 35% 30%, #fff8e7 0%, #f0e0c0 40%, #d4c4a0 75%, #b8a888 100%)',
          boxShadow:
            '0 0 70px rgba(255,240,200,0.4), inset -22px -16px 40px rgba(0,0,0,0.18)',
        }}
      >
        {/* Soft craters */}
        <div className="absolute rounded-full opacity-20" style={{ width: 28, height: 28, top: '26%', left: '22%', background: 'rgba(0,0,0,0.25)' }} />
        <div className="absolute rounded-full opacity-15" style={{ width: 18, height: 18, top: '55%', left: '58%', background: 'rgba(0,0,0,0.25)' }} />
        <div className="absolute rounded-full opacity-12" style={{ width: 14, height: 14, top: '40%', left: '70%', background: 'rgba(0,0,0,0.2)' }} />
        <div className="absolute rounded-full opacity-10" style={{ width: 11, height: 11, top: '68%', left: '32%', background: 'rgba(0,0,0,0.18)' }} />
      </div>
    </motion.div>

    {/* ── CINEMATIC TEXT ── */}
    <div className="absolute inset-0 flex flex-col items-center justify-end 
                    pb-[20%] md:pb-[11%] z-30 px-6">
      
      <motion.p
        initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ delay: 15.0, duration: 2.2 }}
        className="font-playfair text-sm md:text-lg tracking-[0.22em] text-white/90 mb-3 md:mb-4"
        style={{ textShadow: '0 0 24px rgba(255,255,255,0.3)' }}
      >
        Among billions of stars
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ delay: 17.4, duration: 2.0 }}
        className="font-playfair text-lg md:text-2xl text-pink-100 mb-6 md:mb-8 max-w-md text-center leading-relaxed"
        style={{ textShadow: '0 0 28px rgba(255,180,200,0.4)' }}
      >
        Today, one shines a little brighter
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 20.0, duration: 1.6 }}
        className="font-inter text-[10px] md:text-[11px] tracking-[0.42em] uppercase text-white/75 mb-4 md:mb-5"
      >
        August 2
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 24, filter: 'blur(10px)', scale: 0.97 }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
        transition={{ delay: 21.6, duration: 2.4, ease: [0.16, 1, 0.3, 1] }}
        className="font-playfair text-3xl md:text-5xl lg:text-6xl text-white tracking-wide text-center"
        style={{ textShadow: '0 0 40px rgba(255,255,255,0.18)' }}
      >
        Happy Birthday,
        <br />
        <span
          className="inline-block mt-1"
          style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #ffc2d4 45%, #e8c4ff 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Amisha
        </span>
      </motion.h1>
    </div>

    {/* Soft vignette */}
    <div
      className="absolute inset-0 pointer-events-none z-10"
      style={{
        background:
          'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.55) 100%)',
      }}
    />
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
    className="absolute inset-0 flex items-center justify-center overflow-hidden"
    style={{
      background:
        'radial-gradient(ellipse at 50% 30%, #1a0c2e 0%, #0d0618 40%, #06030c 70%, #020108 100%)',
    }}
  >
    {/* Particles */}
    {!prefersReducedMotion &&
      Array.from({ length: 28 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 2.5 + 0.5,
            height: Math.random() * 2.5 + 0.5,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: 'rgba(255, 200, 220, 0.7)',
          }}
          animate={{ opacity: [0.1, 0.45, 0.1], y: [0, -16, 0] }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        />
      ))}

    {/* Glow */}
    <div
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[420px] rounded-full pointer-events-none opacity-30 blur-3xl"
      style={{
        background:
          'radial-gradient(circle, rgba(255,130,180,0.4) 0%, rgba(180,100,200,0.15) 45%, transparent 70%)',
      }}
    />

    {/* Vignette */}
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        background:
          'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.5) 100%)',
      }}
    />

    {!letterOpen ? (
      /* Envelope */
      <motion.button
        onClick={openLetter}
        whileHover={{ scale: 1.06, y: -8 }}
        whileTap={{ scale: 0.97 }}
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-10 focus:outline-none flex flex-col items-center gap-6"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          className="text-8xl"
          style={{
            filter: 'drop-shadow(0 0 30px rgba(255,150,180,0.45))',
          }}
        >
          💌
        </motion.div>
        <p className="font-dancing text-2xl text-pink-300/90">
          A letter for you
        </p>
      </motion.button>
    ) : (
      /* Letter paper */
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-lg max-h-[82vh] flex flex-col px-3"
      >
        <div
          className="relative flex-1 overflow-hidden rounded-sm flex flex-col"
          style={{
            background: 'linear-gradient(180deg, #fffef9 0%, #f7f0e6 100%)',
            boxShadow:
              '0 30px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,200,180,0.15)',
          }}
        >
          {/* Top ribbon */}
          <div
            className="h-2 shrink-0"
            style={{
              background:
                'linear-gradient(90deg, #ffb3c8, #ff6b9d, #e0c3fc, #ffb3c8)',
            }}
          />

          <div className="absolute top-4 left-4 text-lg opacity-25">🌸</div>
          <div className="absolute top-4 right-4 text-lg opacity-25">🌸</div>

          {/* Scrollable text */}
          <div
            ref={letterBodyRef}
            className="flex-1 overflow-y-auto px-6 py-7 md:px-9 md:py-8"
          >
            <p
              className="font-inter text-[10px] tracking-[0.3em] uppercase mb-5"
              style={{ color: '#c9a07a' }}
            >
              Written with care
            </p>

            <pre
              className="whitespace-pre-wrap text-[13.5px] md:text-[14.5px] leading-[1.85] tracking-wide"
              style={{
                fontFamily: 'Georgia, "Times New Roman", serif',
                color: '#2c2419',
              }}
            >
              {typedText}
              {!letterDone && (
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.55 }}
                  className="inline-block w-[2px] h-[14px] bg-pink-400 ml-0.5 align-middle rounded-full"
                />
              )}
            </pre>
          </div>
        </div>

        {/* Continue */}
        <AnimatePresence>
          {letterDone && (
            <motion.button
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setScene('memories')}
              className="mt-5 mx-auto px-10 py-3.5 rounded-full font-inter text-sm tracking-wide text-white shrink-0"
              style={{
                background: 'linear-gradient(135deg, #ff6b9d 0%, #c9b8e8 100%)',
                boxShadow:
                  '0 12px 35px rgba(255,107,157,0.4), 0 0 0 1px rgba(255,255,255,0.1)',
              }}
            >
              Continue →
            </motion.button>
          )}
        </AnimatePresence>
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
