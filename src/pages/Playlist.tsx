import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  onBack: () => void;
  dark: boolean;
}

const songs = [
  { id: 1, title: 'August', artist: 'Taylor Swift', spotifyId: '3hUxzQpSfdDqwM3ZTFQY0K', emoji: '🦁', color: '#ff7ed8' },
  { id: 2, title: 'Kaise Ab Kahein', artist: 'Hrishi Giridhar, Pratik Gangavane', spotifyId: '3eSm4iAkLsn3BeggfiQOH9', emoji: '🧿', color: '#e64a4f' },
  { id: 3, title: 'Jeena Jeena', artist: 'Atif Aslam', spotifyId: '5lKE040hUfDAKOR8HLG92p', emoji: '💕', color: '#fa5757' },
  { id: 4, title: 'Blank Space', artist: 'Taylor Swift', spotifyId: '1u8c2t2Cy7UBoG4ArRcF5g', emoji: '🦁', color: '#ff7ed8' },
  { id: 5, title: 'Her', artist: 'JVKE', spotifyId: '6G9YlbU3ByPJQvOFDRdwyM', emoji: '🎹', color: '#a18cd1' },
  { id: 6, title: 'Jo Tum Mere Ho', artist: 'Anuv Jain', spotifyId: '0eCajpR75pDW0r64U6hP2x', emoji: '🎶', color: '#d4fc79' },
  { id: 7, title: 'Dooron Dooron', artist: 'Paresh Pahuja', spotifyId: '0q5e5KtUOhYQujmhLP0pKd', emoji: '🌹', color: '#fddb92' },
  { id: 8, title: 'JHOL', artist: 'Maanu, Annural Khalid', spotifyId: '4XTgFBxBHN6var1BzAgE1m', emoji: '💝', color: '#96fbc4' },
  { id: 9, title: 'Perfect', artist: 'Ed Sheeran', spotifyId: '0tgVpDi06FyKpA1z0VMD4v', emoji: '🎸', color: '#ff9a9e' },
  { id: 10, title: 'Jahaan', artist: 'Lost Stories, Jai Dhir', spotifyId: '2chmRmAiEmWcBfEmD0b5DA', emoji: '💍', color: '#4656e9' },
  { id: 11, title: 'Bairiyaa', artist: 'Atif Aslam · Shreya Ghoshal', spotifyId: '0FSzNhQsAe3uVMy5ukATMO', emoji: '🦚', color: '#ff9854' },
];

export default function Playlist({ onBack, dark }: Props) {
  const [activeSong, setActiveSong] = useState<typeof songs[0] | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen relative overflow-hidden"
      style={{
        background: dark
          ? 'radial-gradient(ellipse at 30% 20%, #1a0a2e 0%, #0a0015 50%, #05000a 100%)'
          : 'radial-gradient(ellipse at 70% 10%, #fff0f7 0%, #f8f0ff 50%, #f0f4ff 100%)',
      }}
    >
      {/* Soft ambient glow */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none opacity-20 blur-3xl"
        style={{
          background: activeSong
            ? `radial-gradient(circle, ${activeSong.color}66 0%, transparent 70%)`
            : 'radial-gradient(circle, rgba(255,120,180,0.3) 0%, transparent 70%)',
        }}
      />

      {/* Back button */}
      <div className="absolute top-6 left-6 z-30">
        <motion.button
          whileHover={{ x: -3 }}
          whileTap={{ scale: 0.96 }}
          onClick={onBack}
          className="flex items-center gap-2 font-inter text-sm px-4 py-2 rounded-full"
          style={{
            color: dark ? '#ff9cc0' : '#e8344a',
            background: dark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.6)',
            border: '1px solid rgba(255,107,157,0.2)',
            backdropFilter: 'blur(10px)',
          }}
        >
          ← Back
        </motion.button>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-20 pb-40">
        {/* Header */}
        <div className="mb-12">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-inter text-xs tracking-[0.25em] uppercase mb-3"
            style={{ color: dark ? 'rgba(255,255,255,0.4)' : '#9ca3af' }}
          >
            A collection made for you
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-playfair text-4xl md:text-5xl font-bold tracking-tight"
            style={{ color: dark ? '#fff' : '#1a1225' }}
          >
            Shared Frequency
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="font-dancing text-xl mt-2"
            style={{ color: dark ? '#ff9cc0' : '#e8344a' }}
          >
            songs that feel like something
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* ========== TRACK LIST ========== */}
          <div className="lg:col-span-5 space-y-1">
            {songs.map((song, i) => {
              const isActive = activeSong?.id === song.id;
              return (
                <motion.button
                  key={song.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                  onClick={() => setActiveSong(isActive ? null : song)}
                  className="w-full group flex items-center gap-4 px-4 py-3.5 rounded-2xl text-left transition-all duration-300"
                  style={{
                    background: isActive
                      ? dark
                        ? 'rgba(255,107,157,0.12)'
                        : 'rgba(255,107,157,0.08)'
                      : 'transparent',
                    border: isActive
                      ? '1px solid rgba(255,107,157,0.25)'
                      : '1px solid transparent',
                  }}
                >
                  {/* Number / Emoji */}
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0 transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background: isActive ? `${song.color}33` : dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
                    }}
                  >
                    {isActive ? (
                      <div className="flex gap-0.5 items-end h-4">
                        {[1, 2, 3].map((b) => (
                          <motion.div
                            key={b}
                            className="w-0.5 rounded-full"
                            style={{ background: song.color }}
                            animate={{ height: [4, 14, 4] }}
                            transition={{ repeat: Infinity, duration: 0.55, delay: b * 0.12 }}
                          />
                        ))}
                      </div>
                    ) : (
                      <span className="text-sm opacity-60">{song.emoji}</span>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p
                      className="font-inter font-medium text-sm truncate"
                      style={{ color: dark ? '#fff' : '#1a1225' }}
                    >
                      {song.title}
                    </p>
                    <p
                      className="font-inter text-xs truncate mt-0.5"
                      style={{ color: dark ? 'rgba(255,255,255,0.45)' : '#9ca3af' }}
                    >
                      {song.artist}
                    </p>
                  </div>

                  {/* Playing indicator */}
                  {isActive && (
                    <span
                      className="text-[10px] tracking-widest uppercase font-medium"
                      style={{ color: '#ff6b9d' }}
                    >
                      Now
                    </span>
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* ========== NOW PLAYING VISUAL ========== */}
          <div className="lg:col-span-7 flex items-center justify-center">
            <AnimatePresence mode="wait">
              {activeSong ? (
                <motion.div
                  key={activeSong.id}
                  initial={{ opacity: 0, scale: 0.92, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 22 }}
                  className="w-full max-w-md"
                >
                  {/* Large visual */}
                  <div
                    className="relative aspect-square rounded-3xl overflow-hidden mb-6 flex items-center justify-center"
                    style={{
                      background: `radial-gradient(circle at 40% 35%, ${activeSong.color}55 0%, ${activeSong.color}22 50%, transparent 80%)`,
                      border: `1px solid ${activeSong.color}33`,
                      boxShadow: `0 25px 60px ${activeSong.color}22`,
                    }}
                  >
                    <motion.span
                      animate={{ scale: [1, 1.08, 1] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                      className="text-8xl md:text-9xl"
                    >
                      {activeSong.emoji}
                    </motion.span>

                    {/* Soft rings */}
                    <div
                      className="absolute inset-8 rounded-full border opacity-20"
                      style={{ borderColor: activeSong.color }}
                    />
                    <div
                      className="absolute inset-16 rounded-full border opacity-10"
                      style={{ borderColor: activeSong.color }}
                    />
                  </div>

                  <div className="text-center">
                    <h2
                      className="font-playfair text-2xl md:text-3xl font-bold mb-1"
                      style={{ color: dark ? '#fff' : '#1a1225' }}
                    >
                      {activeSong.title}
                    </h2>
                    <p
                      className="font-inter text-sm"
                      style={{ color: dark ? 'rgba(255,255,255,0.5)' : '#6b7280' }}
                    >
                      {activeSong.artist}
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center px-8"
                >
                  <div
                    className="w-32 h-32 mx-auto mb-6 rounded-full flex items-center justify-center text-5xl"
                    style={{
                      background: dark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)',
                      border: '1px solid rgba(255,107,157,0.15)',
                    }}
                  >
                    🎵
                  </div>
                  <p
                    className="font-playfair text-xl"
                    style={{ color: dark ? 'rgba(255,255,255,0.5)' : '#9ca3af' }}
                  >
                    Select a song to begin
                  </p>
                  <p
                    className="font-inter text-sm mt-2"
                    style={{ color: dark ? 'rgba(255,255,255,0.3)' : '#d1d5db' }}
                  >
                    Every track holds a piece of us
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ========== SPOTIFY PLAYER ========== */}
      <AnimatePresence>
        {activeSong && (
          <motion.div
            initial={{ y: 120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 120, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
            className="fixed bottom-0 left-0 right-0 z-40"
            style={{
              background: dark ? 'rgba(8,0,18,0.92)' : 'rgba(255,255,255,0.92)',
              backdropFilter: 'blur(24px)',
              borderTop: '1px solid rgba(255,107,157,0.15)',
              boxShadow: '0 -10px 40px rgba(0,0,0,0.15)',
            }}
          >
            <div className="max-w-3xl mx-auto px-5 py-4">
              <iframe
                src={`https://open.spotify.com/embed/track/${activeSong.spotifyId}?utm_source=generator&theme=${dark ? 0 : 1}`}
                width="100%"
                height="80"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                style={{ borderRadius: 12, display: undefined }}
                title={activeSong.title}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}