import { motion } from 'framer-motion';

type Section =
  | "letter"
  | "memories"
  | "playlist"
  | "game"
  | "timeline"
  | "capsule"
  | "chat"
  | "birthday";

interface Props {
  onNavigate: (s: Section) => void;
  dark: boolean;
}

const cards = [
  {
    id: 'letter' as Section,
    emoji: '💌',
    title: 'A Letter from the Stars',
    subtitle: 'Words written only for you',
    color: 'from-pink-100 to-rose-100',
    darkColor: 'from-pink-900/30 to-rose-900/30',
    border: 'border-pink-200',
    darkBorder: 'border-pink-700/30',
    accent: '#ff6b9d',
  },
  {
    id: 'memories' as Section,
    emoji: '📷',
    title: 'Garden of Memories',
    subtitle: 'Moments frozen in time',
    color: 'from-purple-100 to-pink-100',
    darkColor: 'from-purple-900/30 to-pink-900/30',
    border: 'border-purple-200',
    darkBorder: 'border-purple-700/30',
    accent: '#c9b8e8',
  },
  {
    id: 'playlist' as Section,
    emoji: '🎵',
    title: 'Melodies for You',
    subtitle: 'Every song tells a story',
    color: 'from-blue-50 to-purple-100',
    darkColor: 'from-blue-900/30 to-purple-900/30',
    border: 'border-blue-200',
    darkBorder: 'border-blue-700/30',
    accent: '#93c5fd',
  },
  {
    id: 'timeline' as Section,
    emoji: '📅',
    title: 'Journey Through Time',
    subtitle: 'Every chapter led to today',
    color: 'from-amber-50 to-orange-100',
    darkColor: 'from-amber-900/30 to-orange-900/30',
    border: 'border-amber-200',
    darkBorder: 'border-amber-700/30',
    accent: '#fbbf24',
  },
  {
    id: 'chat' as Section,
    emoji: '💬',
    title: 'Sweet Messages',
    subtitle: 'Our favorite convos',
    color: 'from-green-50 to-teal-100',
    darkColor: 'from-green-900/30 to-teal-900/30',
    border: 'border-green-200',
    darkBorder: 'border-green-700/30',
    accent: '#6ee7b7',
  },
  {
    id: 'capsule' as Section,
    emoji: '📦',
    title: 'Time Capsule',
    subtitle: 'For the future',
    color: 'from-indigo-50 to-blue-100',
    darkColor: 'from-indigo-900/30 to-blue-900/30',
    border: 'border-indigo-200',
    darkBorder: 'border-indigo-700/30',
    accent: '#818cf8',
  },
  {
    id: 'game' as Section,
    emoji: '🎮',
    title: 'Birthday Magic',
    subtitle: 'Heart breakout arcade',
    color: 'from-rose-50 to-pink-100',
    darkColor: 'from-rose-900/30 to-pink-900/30',
    border: 'border-rose-200',
    darkBorder: 'border-rose-700/30',
    accent: '#fb7185',
  },
];

function RelationshipStats({ dark }: { dark: boolean }) {

  const stats = [
  {
    label: "Birthday Wishes",
    value: "∞",
    emoji: "🎂",
  },
  {
    label: "Reasons to Smile",
    value: "365+",
    emoji: "😊",
  },
  {
    label: "Dreams Ahead",
    value: "Unlimited",
    emoji: "✨",
  },
  {
    label: "Today's Celebration",
    value: "Special",
    emoji: "🎉",
  },
];

  return (
    <div>
      <p className="font-dancing text-2xl mb-4" style={{ color: '#ff6b9d' }}>
         ✨ A Little Universe Created For You
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div key={i} className="text-center">
            <div className="text-2xl mb-1">{s.emoji}</div>
            <div className="font-playfair text-2xl font-bold" style={{ color: dark ? '#fff' : '#1a1a1a' }}>
              {s.value}
            </div>
            <div className="font-inter text-xs mt-1" style={{ color: dark ? 'rgba(255,255,255,0.5)' : '#9ca3af' }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function MainMenu({ onNavigate, dark }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen py-16 px-4"
      style={{
        background: dark
          ? 'linear-gradient(180deg, #0a0015 0%, #1a0030 100%)'
          : 'linear-gradient(135deg, #fff0f5 0%, #f9f0ff 50%, #fff5fb 100%)',
      }}
    >
      {/* Header */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', bounce: 0.5 }}
          className="text-6xl mb-4"
        >
          🥳
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-playfair text-4xl font-bold mb-2"
          style={{ color: dark ? '#fff' : '#1a1a1a' }}
        >
          Happy Birthday, Amisha
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="font-dancing text-xl"
          style={{ color: dark ? '#ff9cc0' : '#e8344a' }}
        >
          Let's make today a little more magical 🌸✨
        </motion.p>
      </div>

      {/* Cards Grid */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, i) => (
          <motion.button
            key={card.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i + 0.3, type: 'spring', bounce: 0.3 }}
            whileHover={{ y: -8, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onNavigate(card.id)}
            className={`relative p-6 rounded-3xl border cursor-none text-left overflow-hidden shadow-lg transition-shadow hover:shadow-2xl ${
              dark ? `bg-gradient-to-br ${card.darkColor} ${card.darkBorder}` : `bg-gradient-to-br ${card.color} ${card.border}`
            }`}
          >
            {/* Background decoration */}
            <div
              className="absolute -right-4 -top-4 text-8xl opacity-10 pointer-events-none"
            >
              {card.emoji}
            </div>

            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 opacity-0 pointer-events-none"
              style={{
                background: `linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)`,
              }}
              whileHover={{ opacity: 1, x: ['-100%', '100%'] }}
              transition={{ duration: 0.6 }}
            />

            <div className="relative z-10">
              <motion.div
                className="text-4xl mb-4"
                whileHover={{ rotate: [0, -10, 10, 0], scale: 1.2 }}
                transition={{ duration: 0.4 }}
              >
                {card.emoji}
              </motion.div>
              <h3
                className="font-playfair text-xl font-bold mb-1"
                style={{ color: dark ? '#fff' : '#1a1a1a' }}
              >
                {card.title}
              </h3>
              <p
                className="font-inter text-sm"
                style={{ color: dark ? 'rgba(255,255,255,0.6)' : '#6b7280' }}
              >
                {card.subtitle}
              </p>
            </div>

            {/* Corner accent */}
            <div
              className="absolute bottom-3 right-3 w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: `${card.accent}30` }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke={card.accent} strokeWidth="2" width="14" height="14">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Relationship counter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="max-w-4xl mx-auto mt-8"
      >
        <div
          className="rounded-3xl p-6 text-center glass"
          style={{
            background: dark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.6)',
            border: '1px solid rgba(255,107,157,0.15)',
          }}
        >
          <RelationshipStats dark={dark} />
        </div>
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="text-center mt-8"
      >
        <p
  className="font-dancing text-lg"
  style={{ color: dark ? "#ff9cc0" : "#e8344a" }}
>
  Made with infinite love{" "}
  <motion.span
    className="cursor-pointer inline-block"
    whileHover={{ scale: 1.25 }}
    whileTap={{ scale: 0.9 }}
    onDoubleClick={() => onNavigate("birthday")}
  >
    💖
  </motion.span>
</p>
        <p
  className="font-inter text-xs mt-1 opacity-40"
  style={{ color: dark ? "#fff" : "#666" }}
>
  💡 Secret: Double-click the heart above for a surprise.
</p>
      </motion.div>
    </motion.div>
  );
}
