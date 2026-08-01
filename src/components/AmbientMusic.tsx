import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function AmbientMusic() {
  const [playing, setPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // encodeURI handles spaces in "kaise ab kahein.mp3" safely
    const audioPath = encodeURI('/music/kaise ab kahein.mp3');
    const audio = new Audio(audioPath);
    audio.loop = true;
    audio.volume = 0.5; // Set starting volume
    audioRef.current = audio;

    // Helper function to trigger audio on first user click anywhere
    const handleFirstInteraction = () => {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current
          .play()
          .then(() => {
            setPlaying(true);
            console.log('🎵 Audio started playing successfully!');
          })
          .catch((err) => {
            console.warn('⚠️ Audio play prevented or failed:', err);
          });
      }
    };

    // Listen for the first user interaction on the page
    window.addEventListener('click', handleFirstInteraction, { once: true });
    window.addEventListener('keydown', handleFirstInteraction, { once: true });
    window.addEventListener('touchstart', handleFirstInteraction, { once: true });

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const toggle = (e: React.MouseEvent) => {
    // Prevent event from bubbling up to window click listeners
    e.stopPropagation();

    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
      console.log('🔇 Audio paused');
    } else {
      audio
        .play()
        .then(() => {
          setPlaying(true);
          console.log('🎶 Audio resumed');
        })
        .catch((err) => {
          console.error('❌ Could not play audio. Check if file path exists:', err);
        });
    }
  };

  return (
    <motion.button
      onClick={toggle}
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.1 }}
      className="fixed bottom-6 left-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-pink-100 shadow-lg glass"
      title={playing ? 'Mute ambient music' : 'Play ambient music'}
    >
      <motion.span
        animate={playing ? { rotate: [0, 10, -10, 0] } : { rotate: 0 }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="text-xl"
      >
        {playing ? '🎶' : '🔇'}
      </motion.span>
      {playing && (
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-pink-400"
          animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        />
      )}
    </motion.button>
  );
}