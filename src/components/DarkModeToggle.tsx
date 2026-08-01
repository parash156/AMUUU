import { motion } from 'framer-motion';

interface Props {
  dark: boolean;
  onToggle: () => void;
}

export default function DarkModeToggle({ dark, onToggle }: Props) {
  return (
    <motion.button
      onClick={onToggle}
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.1 }}
      className="fixed top-5 right-5 z-50 w-12 h-12 rounded-full glass flex items-center justify-center shadow-lg border border-pink-100"
      title="Toggle dark mode"
    >
      <span className="text-xl">{dark ? '🌙' : '☀️'}</span>
    </motion.button>
  );
}
