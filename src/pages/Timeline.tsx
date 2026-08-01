import { motion } from 'framer-motion';

interface Props {
  onBack: () => void;
  dark: boolean;
}

const events = [
  {
    date: "August 2, 2002",
    title: "A Beautiful Beginning 🌸",
    desc: "The day a wonderful soul entered the world and began writing her own story.",
    emoji: "👶",
    color: "#ff6b9d",
  },

  {
    date: "2006 – 2014",
    title: "Dreaming Big ☁️",
    desc: "Every little dream became another step toward the amazing person you are today.",
    emoji: "🧸",
    color: "#c9b8e8",
  },

  {
    date: "2015 – 2021",
    title: "Growing & Learning 📚",
    desc: "New friendships, lessons, and unforgettable memories shaped your journey.",
    emoji: "🎒",
    color: "#89f7fe",
  },

  {
    date: "2022 – Present",
    title: "A Heart That Cares ❤️",
    desc: "Choosing nursing means choosing kindness, compassion, and helping others every day.",
    emoji: "🩺",
    color: "#6ee7b7",
  },

  {
    date: "August 2, 2026",
    title: "Another Beautiful Chapter 🎂",
    desc: "Today isn't just another birthday—it's another year of growth, strength, and beautiful memories waiting to be made.",
    emoji: "🎉",
    color: "#f7971e",
  },

  {
    date: "The Future",
    title: "Dreams Waiting Ahead ✨",
    desc: "May every tomorrow bring happiness, success, good health, and countless reasons to smile.",
    emoji: "🌈",
    color: "#00c6fb",
  },
];

export default function Timeline({ onBack, dark }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen py-12 px-4"
      style={{
        background: dark
          ? 'linear-gradient(180deg, #0a0015 0%, #1a0030 100%)'
          : 'linear-gradient(135deg, #fff0f5 0%, #f9f0ff 100%)',
      }}
    >
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-12">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onBack}
            className="flex items-center gap-2 font-inter text-sm cursor-none px-4 py-2 rounded-full glass"
            style={{ color: dark ? '#ff9cc0' : '#e8344a', border: '1px solid rgba(255,107,157,0.2)' }}
          >
            ← Back
          </motion.button>
          <div>
            <h1 className="font-playfair text-3xl font-bold" style={{ color: dark ? '#fff' : '#1a1a1a' }}>
              📅 Timeline
            </h1>
            <p className="font-dancing text-lg" style={{ color: dark ? '#ff9cc0' : '#e8344a' }}>
              the story of beautiful girl
            </p>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <div
            className="absolute left-8 top-0 bottom-0 w-0.5"
            style={{
              background: 'linear-gradient(to bottom, #ff6b9d, #c9b8e8, #b8e8d0, #fddb92)',
            }}
          />

          {events.map((event, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="relative pl-20 pb-10"
            >
              {/* Dot */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.1 + 0.2, type: 'spring', bounce: 0.5 }}
                className="absolute left-5 w-7 h-7 rounded-full flex items-center justify-center text-sm shadow-lg"
                style={{
                  background: event.color,
                  top: 8,
                  border: '3px solid white',
                }}
              >
                <span style={{ fontSize: 12 }}>{event.emoji}</span>
              </motion.div>

              {/* Card */}
              <motion.div
                whileHover={{ x: 5, scale: 1.01 }}
                className="rounded-2xl p-5 shadow-lg"
                style={{
                  background: dark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.8)',
                  border: dark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(255,107,157,0.1)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <p
                      className="font-inter text-xs mb-1 font-medium tracking-wider uppercase"
                      style={{ color: event.color }}
                    >
                      {event.date}
                    </p>
                    <h3
                      className="font-playfair text-xl font-bold mb-2"
                      style={{ color: dark ? '#fff' : '#1a1a1a' }}
                    >
                      {event.title}
                    </h3>
                    <p
                      className="font-inter text-sm leading-relaxed"
                      style={{ color: dark ? 'rgba(255,255,255,0.6)' : '#6b7280' }}
                    >
                      {event.desc}
                    </p>
                  </div>
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                    style={{ background: `${event.color}22` }}
                  >
                    {event.emoji}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
