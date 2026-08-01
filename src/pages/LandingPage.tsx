import { motion } from 'framer-motion';
import { useEffect, useState } from "react";
interface Props {
  onEnter: () => void;
  dark: boolean;
  onEasterEgg?: () => void;
}

export default function LandingPage({ onEnter, dark, onEasterEgg }: Props) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className={`min-h-screen flex flex-col items-center justify-center relative overflow-hidden ${
        dark ? 'bg-starry' : 'bg-romantic'
      }`}
      style={dark ? {
        background: 'linear-gradient(180deg, #0a0015 0%, #1a0030 50%, #0d001a 100%)'
      } : {
        background: 'linear-gradient(135deg, #fff0f5 0%, #ffe8f0 50%, #fff5fb 100%)'
      }}
    >
      {/* Floating particles */}
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl pointer-events-none"
          style={{
            left: `${Math.random() * 90 + 5}%`,
            top: `${Math.random() * 80 + 10}%`,
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 3 + i * 0.3,
            repeat: Infinity,
            delay: i * 0.4,
            ease: 'easeInOut',
          }}
        >
          {['💖', '💕', '✨', '🌸', '💫', '⭐', '🌟', '💝', '🦋', '🌺', '💗', '🌹'][i]}
        </motion.div>
      ))}

      {/* Main content */}
      <div className="flex flex-col items-center gap-8 z-20">
        {/* Animated name/greeting */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-center"
        >
          <p
            className="font-dancing text-2xl mb-2"
            style={{ color: dark ? '#ff9cc0' : '#e8344a' }}
          >
            something special, just for you
          </p>
          <h1
            className="font-playfair text-6xl md:text-7xl font-bold"
            style={{ color: dark ? '#fff' : '#1a1a1a' }}
          >
            With Love,
          </h1>
          <h1
            className="font-playfair text-6xl md:text-7xl font-bold gradient-text-pink"
          >
            Always 💕
          </h1>
        </motion.div>

        {/* Big bouncing heart button */}
          <motion.button
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            onClick={onEnter}
            onDoubleClick={onEasterEgg}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          animate={{
            scale: hovered ? 1.15 : [1, 1.08, 1, 1.12, 1],
          }}
          transition={hovered ? {} : {
            repeat: Infinity,
            duration: 1.5,
            ease: 'easeInOut',
          }}
          className="relative flex flex-col items-center gap-3 cursor-none"
        >
          {/* Glow rings */}
          <motion.div
            animate={{ scale: [1, 1.4], opacity: [0.4, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="absolute rounded-full"
            style={{
              width: 140,
              height: 140,
              background: 'rgba(255,107,157,0.3)',
              borderRadius: '50%',
            }}
          />
          <motion.div
            animate={{ scale: [1, 1.7], opacity: [0.2, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, delay: 0.3 }}
            className="absolute rounded-full"
            style={{
              width: 140,
              height: 140,
              background: 'rgba(255,107,157,0.2)',
              borderRadius: '50%',
            }}
          />

          {/* Heart SVG */}
          <div className="relative z-10">
            <svg viewBox="0 0 100 90" width="140" height="126">
              <defs>
                <linearGradient id="heartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ff6b9d" />
                  <stop offset="50%" stopColor="#e8344a" />
                  <stop offset="100%" stopColor="#c9184a" />
                </linearGradient>
                <filter id="shadow">
                  <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#ff6b9d" floodOpacity="0.4"/>
                </filter>
              </defs>
              <path
                d="M50 85 L10 45 C2 37 2 25 10 17 C18 9 30 9 38 17 L50 29 L62 17 C70 9 82 9 90 17 C98 25 98 37 90 45 Z"
                fill="url(#heartGrad)"
                filter="url(#shadow)"
              />
              {/* Shine */}
              <ellipse cx="35" cy="28" rx="8" ry="5" fill="rgba(255,255,255,0.3)" transform="rotate(-30, 35, 28)"/>
            </svg>
          </div>

          {/* Press me text */}
          <motion.div
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="flex items-center gap-2 px-6 py-2 rounded-full"
            style={{
              background: dark ? 'rgba(255,107,157,0.2)' : 'rgba(255,107,157,0.1)',
              border: '1px solid rgba(255,107,157,0.3)',
            }}
          >
            <span
              className="font-inter text-sm font-medium tracking-wider"
              style={{ color: dark ? '#ff9cc0' : '#e8344a' }}
            >
              Press me →
            </span>
          </motion.div>
        </motion.button>

        {/* Relationship counter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-center"
        >
          <RelationshipCounter dark={dark} />
        </motion.div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none">
          <path
            d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z"
            fill={dark ? 'rgba(255,107,157,0.1)' : 'rgba(255,182,193,0.3)'}
          />
        </svg>
      </div>
    </motion.div>
  );
}
function RelationshipCounter({ dark }: { dark: boolean }) {
  const birthDate = new Date("2002-08-02T00:00:00");

  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Calculate completed years
  let years = now.getFullYear() - birthDate.getFullYear();

  const birthdayThisYear = new Date(
    now.getFullYear(),
    birthDate.getMonth(),
    birthDate.getDate()
  );

  if (now < birthdayThisYear) {
    years--;
  }

  // Last birthday
  const lastBirthday = new Date(
    birthDate.getFullYear() + years,
    birthDate.getMonth(),
    birthDate.getDate()
  );

  const diff = now.getTime() - lastBirthday.getTime();

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (diff % (1000 * 60 * 60 * 24)) /
      (1000 * 60 * 60)
  );
  const minutes = Math.floor(
    (diff % (1000 * 60 * 60)) /
      (1000 * 60)
  );
  const seconds = Math.floor(
    (diff % (1000 * 60)) /
      1000
  );

  return (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    className="mx-auto mt-6 max-w-xl"
  >
    <div
      className="rounded-3xl px-8 py-6 text-center"
      style={{
        background: dark
          ? "rgba(255,255,255,0.05)"
          : "rgba(255,255,255,0.75)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255,107,157,0.15)",
      }}
    >
      <p
        className="font-dancing text-2xl mb-1"
        style={{ color: "#ff6b9d" }}
      >
        🎂 Since You Were Born
      </p>

      <p
        className="font-inter text-xs tracking-[0.25em] uppercase mb-4"
        style={{
          color: dark ? "rgba(255,255,255,.5)" : "#999",
        }}
      >
        August 2, 2002
      </p>

      <h2
        className="font-playfair text-4xl font-bold"
        style={{
          color: dark ? "#fff" : "#1a1a1a",
        }}
      >
        {years} Years
      </h2>

      <p
        className="font-inter text-lg mt-3"
        style={{
          color: dark ? "rgba(255,255,255,.75)" : "#666",
        }}
      >
        {days} Days • {hours} Hours
      </p>

      <motion.p
        key={seconds}
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="font-inter text-base mt-2"
        style={{
          color: "#ff6b9d",
          fontWeight: 600,
        }}
      >
        {minutes} Minutes • {seconds} Seconds
      </motion.p>
    </div>
  </motion.div>
);
}