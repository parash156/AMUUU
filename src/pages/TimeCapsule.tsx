import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  onBack: () => void;
  dark: boolean;
}

const CORRECT_PIN = '1617'; // ← change this (e.g. her birthday day/month)

const capsuleItems = [
  {
    id: 1,
    type: 'secret',
    emoji: '🏡',
    title: 'A Quiet Dream',
    content:
      "Sometimes I imagine a small home somewhere peaceful. Nothing too big or fancy just a place that feels warm. And in that picture, you're there. I don't say it out loud, but that dream stays with me.",
    openDate: 'Someday',
    color: '#a18cd1',
  },
  {
    id: 2,
    type: 'story',
    emoji: '📝',
    title: 'Little Plans',
    content:
      "I catch myself making small plans in my head places we could go, things we could try, ordinary days that somehow feel special. Most of them will probably stay just thoughts... but I still make them.",
    openDate: 'In my mind',
    color: '#89f7fe',
  },
  {
    id: 3,
    type: 'future',
    emoji: '🌸',
    title: 'What I Want For You',
    content:
      "I want your days to feel light. I want you to laugh easily, rest properly, and never feel alone in the hard moments. If I could quietly make your life a little softer and happier, I would.",
    openDate: 'Always',
    color: '#6ee7b7',
  },
  {
    id: 4,
    type: 'wish',
    emoji: '🎂',
    title: 'Next Birthday',
    content:
      "This year I built you a whole website. Next year... I hope I get to make your birthday special in person. Not through screens or code just by being there. That would mean more than anything.",
    openDate: 'Next August',
    color: '#fbc2eb',
  },
  {
    id: 5,
    type: 'memory',
    emoji: '🤍',
    title: 'A Soft Promise',
    content:
      "I don't know what the future holds. But I do know this: as long as I can, I want to keep finding small ways to make you feel special. Whether you ever know the full reason or not.",
    openDate: 'From now on',
    color: '#fddb92',
  },
  {
    id: 6,
    type: 'reason',
    emoji: '💻',
    title: 'Why This Website Exists',
    content:
      "I didn't make this just to impress you or to get a reaction. I made it because for once, I wanted to do something that was only about you no expectations, no pressure. Just a quiet way of saying you matter more than I usually show.",
    openDate: 'The real reason',
    color: '#ff9ec7',
  },
  {
    id: 7,
    type: 'feeling',
    emoji: '✨',
    title: 'How Special You Are',
    content:
  "Maybe you'll never know it, but somewhere between our quiet conversations, the stories you recommended, and the little moments we shared, you became someone special to me.\n\nYou don't always express yourself with many words, and that's okay. Sometimes silence says more than conversations ever could. Somehow, even through that silence, I found myself appreciating you more than I ever expected.\n\nI don't know if you realize it, but your reposts, notes, songs, and the little things you choose to share tell a quiet story. Maybe I understood them, maybe I didn't. But little by little, they helped me see a side of you beyond our conversations, and they made me want to know you a little more.\n\nI still don't know everything about you, and maybe I never will. But I do know this you've become someone genuinely special to me. More special than you probably realize. 🤍",
    openDate: 'Honestly',
    color: '#c9b8e8',
  },
];

export default function TimeCapsule({ onBack, dark }: Props) {
  const [unlocked, setUnlocked] = useState(false);
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const [opened, setOpened] = useState<number[]>([]);
  const [selected, setSelected] = useState<(typeof capsuleItems)[0] | null>(null);

  const handleDigit = (d: string) => {
    if (pin.length >= 4) return;
    const next = pin + d;
    setPin(next);

    if (next.length === 4) {
      setTimeout(() => {
        if (next === CORRECT_PIN) {
          setUnlocked(true);
        } else {
          setError(true);
          setShake(true);
          setTimeout(() => {
            setPin('');
            setError(false);
            setShake(false);
          }, 700);
        }
      }, 250);
    }
  };

  const handleDelete = () => {
    setPin((p) => p.slice(0, -1));
    setError(false);
  };

  const toggle = (item: (typeof capsuleItems)[0]) => {
    if (!opened.includes(item.id)) {
      setOpened((prev) => [...prev, item.id]);
    }
    setSelected(item);
  };

  // ─── LOCK SCREEN ───────────────────────────────────────────
  if (!unlocked) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden"
        style={{
          background: dark
            ? 'radial-gradient(ellipse at 50% 30%, #1a0a2e 0%, #0a0015 55%, #05000a 100%)'
            : 'radial-gradient(ellipse at 50% 20%, #fff0f7 0%, #fdf4ff 50%, #f8f0ff 100%)',
        }}
      >
        {/* Back */}
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={onBack}
          className="absolute top-6 left-6 font-inter text-xs tracking-widest uppercase px-4 py-2 rounded-full"
          style={{
            color: dark ? 'rgba(255,255,255,0.5)' : '#9ca3af',
            background: dark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.7)',
            border: dark
              ? '1px solid rgba(255,255,255,0.08)'
              : '1px solid rgba(0,0,0,0.06)',
          }}
        >
          ← Back
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-[320px] text-center"
        >
          <div className="text-5xl mb-5">🔒</div>

          <h1
            className="font-playfair text-2xl font-semibold mb-2"
            style={{ color: dark ? '#fff' : '#1a1225' }}
          >
            Time Capsule
          </h1>
          <p
            className="font-dancing text-lg mb-8"
            style={{ color: dark ? '#ff9cc0' : '#e8344a' }}
          >
            enter the code to unseal
          </p>

          {/* PIN dots */}
          <motion.div
            animate={shake ? { x: [-8, 8, -6, 6, 0] } : { x: 0 }}
            transition={{ duration: 0.4 }}
            className="flex justify-center gap-4 mb-6"
          >
            {Array.from({ length: 4 }).map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  scale: i < pin.length ? [1, 1.25, 1] : 1,
                  backgroundColor: error
                    ? '#e8344a'
                    : i < pin.length
                    ? '#ff6b9d'
                    : dark
                    ? 'rgba(255,255,255,0.15)'
                    : 'rgba(0,0,0,0.1)',
                }}
                className="w-3.5 h-3.5 rounded-full"
              />
            ))}
          </motion.div>

          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="font-inter text-xs mb-4"
                style={{ color: '#e8344a' }}
              >
                Wrong code… try again
              </motion.p>
            )}
          </AnimatePresence>

          {/* Keypad */}
          <div className="grid grid-cols-3 gap-2.5">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', '⌫'].map(
              (key, idx) => {
                if (key === '') return <div key={idx} />;
                return (
                  <motion.button
                    key={idx}
                    whileTap={{ scale: 0.9 }}
                    onClick={() =>
                      key === '⌫' ? handleDelete() : handleDigit(key)
                    }
                    className="h-14 rounded-2xl font-inter text-lg font-medium"
                    style={{
                      background:
                        key === '⌫'
                          ? dark
                            ? 'rgba(232,52,74,0.15)'
                            : 'rgba(232,52,74,0.08)'
                          : dark
                          ? 'rgba(255,255,255,0.06)'
                          : 'rgba(255,107,157,0.06)',
                      border: dark
                        ? '1px solid rgba(255,255,255,0.08)'
                        : '1px solid rgba(255,107,157,0.1)',
                      color: dark ? '#fff' : '#1a1225',
                    }}
                  >
                    {key}
                  </motion.button>
                );
              }
            )}
          </div>

          <p
            className="mt-6 font-inter text-[11px] tracking-wide"
            style={{ color: dark ? 'rgba(255,255,255,0.3)' : '#9ca3af' }}
          >
            Hint: Someone Mix Birth Date
          </p>
        </motion.div>
      </motion.div>
    );
  }

  // ─── UNLOCKED CONTENT ──────────────────────────────────────
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen py-12 px-4"
      style={{
        background: dark
          ? 'linear-gradient(180deg, #0a0015 0%, #1a0030 100%)'
          : 'linear-gradient(135deg, #fdf0ff 0%, #f0f8ff 100%)',
      }}
    >
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onBack}
            className="flex items-center gap-2 font-inter text-sm px-4 py-2 rounded-full"
            style={{
              color: dark ? '#ff9cc0' : '#e8344a',
              border: '1px solid rgba(255,107,157,0.2)',
              background: dark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.6)',
            }}
          >
            ← Back
          </motion.button>
          <div>
            <h1
              className="font-playfair text-3xl font-bold"
              style={{ color: dark ? '#fff' : '#1a1a1a' }}
            >
              📦 Time Capsule
            </h1>
            <p
              className="font-dancing text-lg"
              style={{ color: dark ? '#ff9cc0' : '#e8344a' }}
            >
              messages sealed for later
            </p>
          </div>
        </div>

        {/* Intro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl p-5 mb-8 text-center"
          style={{
            background: dark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.6)',
            border: '1px dashed rgba(255,107,157,0.35)',
          }}
        >
          <p className="text-3xl mb-2">⏳</p>
          <p
            className="font-playfair text-lg"
            style={{ color: dark ? '#fff' : '#1a1a1a' }}
          >
            These were sealed with care.
          </p>
          <p
            className="font-inter text-sm mt-1"
            style={{ color: dark ? 'rgba(255,255,255,0.5)' : '#6b7280' }}
          >
            Tap each one to open it.
          </p>
        </motion.div>

        {/* Items */}
        <div className="space-y-4">
          {capsuleItems.map((item, i) => (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ scale: 1.01, x: 3 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => toggle(item)}
              className="w-full rounded-2xl p-5 flex items-center gap-4 text-left relative overflow-hidden"
              style={{
                background: dark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.8)',
                border: opened.includes(item.id)
                  ? `1.5px solid ${item.color}`
                  : dark
                  ? '1px solid rgba(255,255,255,0.08)'
                  : '1px solid rgba(255,107,157,0.12)',
              }}
            >
              <div
                className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl"
                style={{ background: item.color }}
              />

              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
                style={{ background: `${item.color}28` }}
              >
                {opened.includes(item.id) ? item.emoji : '🔒'}
              </div>

              <div className="flex-1 min-w-0">
                <p
                  className="font-playfair text-lg font-semibold mb-0.5"
                  style={{ color: dark ? '#fff' : '#1a1a1a' }}
                >
                  {item.title}
                </p>
                <p className="font-inter text-xs" style={{ color: item.color }}>
                  {item.openDate}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(12px)' }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 280, damping: 24 }}
              className="max-w-md w-full rounded-3xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
              style={{
                background: dark ? '#1a0030' : '#fffef9',
                boxShadow: '0 25px 60px rgba(0,0,0,0.4)',
              }}
            >
              <div
                className="h-28 flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${selected.color}77, ${selected.color}33)`,
                }}
              >
                <span className="text-5xl">{selected.emoji}</span>
              </div>

              <div className="p-6">
                <p
                  className="font-inter text-[11px] uppercase tracking-wider mb-2"
                  style={{ color: selected.color }}
                >
                  {selected.openDate}
                </p>
                <h3
                  className="font-playfair text-2xl font-bold mb-4"
                  style={{ color: dark ? '#fff' : '#1a1a1a' }}
                >
                  {selected.title}
                </h3>
                <p
                  className="font-inter leading-relaxed text-[15px]"
                  style={{
                    color: dark ? 'rgba(255,255,255,0.8)' : '#2d2d2d',
                    lineHeight: 1.8,
                  }}
                >
                  {selected.content}
                </p>

                <motion.button
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setSelected(null)}
                  className="mt-6 w-full py-2.5 rounded-xl font-inter text-sm"
                  style={{
                    background: `${selected.color}22`,
                    color: dark ? '#fff' : '#1a1a1a',
                  }}
                >
                  Close
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
