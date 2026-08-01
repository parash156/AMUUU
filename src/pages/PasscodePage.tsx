import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CORRECT_PIN = '2002'; // Change this!

interface Props {
  onSuccess: () => void;
  dark: boolean;
}

export default function PasscodePage({ onSuccess, dark }: Props) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const handleDigit = (d: string) => {
    if (pin.length >= 4) return;
    const newPin = pin + d;
    setPin(newPin);

    if (newPin.length === 4) {
      setTimeout(() => {
        if (newPin === CORRECT_PIN) {
          onSuccess();
        } else {
          setError(true);
          setShake(true);
          setTimeout(() => { setPin(''); setError(false); setShake(false); }, 700);
        }
      }, 300);
    }
  };

  const handleDelete = () => {
    setPin(p => p.slice(0, -1));
    setError(false);
  };

  const bg = dark
    ? 'linear-gradient(180deg, #0a0015 0%, #1a0030 100%)'
    : 'linear-gradient(135deg, #fff0f5 0%, #ffe8f0 100%)';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col items-center justify-center"
      style={{ background: bg }}
    >
      <motion.div
        className="glass rounded-3xl p-8 w-full max-w-sm mx-4 shadow-2xl"
        style={{
          background: dark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.8)',
          border: dark ? '1px solid rgba(255,107,157,0.3)' : '1px solid rgba(255,107,157,0.2)',
        }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            animate={pin.length > 0 ? {
              scale: [1, 1.2, 1],
              rotate: [0, -5, 5, 0],
            } : {}}
            transition={{ duration: 0.3 }}
            className="text-5xl mb-4"
          >
            🔐
          </motion.div>
          <h2 className="font-playfair text-2xl font-bold" style={{ color: dark ? '#fff' : '#1a1a1a' }}>
            Secret Passcode
          </h2>
          <p className="font-dancing text-lg mt-1" style={{ color: dark ? '#ff9cc0' : '#e8344a' }}>
            only you know the way in...
          </p>
        </div>

        {/* PIN dots */}
        <motion.div
          animate={shake ? { x: [-10, 10, -10, 10, 0] } : { x: 0 }}
          transition={{ duration: 0.4 }}
          className="flex justify-center gap-4 mb-8"
        >
          {Array.from({ length: 4 }).map((_, i) => (
            <motion.div
              key={i}
              animate={{
                scale: i < pin.length ? [1, 1.3, 1] : 1,
                backgroundColor: error
                  ? '#e8344a'
                  : i < pin.length
                  ? '#ff6b9d'
                  : dark ? 'rgba(255,255,255,0.2)' : '#e5e7eb',
              }}
              transition={{ duration: 0.2 }}
              className="w-4 h-4 rounded-full"
            />
          ))}
        </motion.div>

        {/* Error message */}
        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-center text-sm font-inter mb-4"
              style={{ color: '#e8344a' }}
            >
              💔 Wrong code, try again...
            </motion.p>
          )}
        </AnimatePresence>

        {/* Keypad */}
        <div className="grid grid-cols-3 gap-3">
          {['1','2','3','4','5','6','7','8','9','','0','⌫'].map((key, idx) => {
            if (key === '') return <div key={idx} />;
            return (
              <motion.button
                key={idx}
                whileTap={{ scale: 0.85 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => key === '⌫' ? handleDelete() : handleDigit(key)}
                className="h-14 rounded-2xl font-inter text-xl font-medium transition-all cursor-none"
                style={{
                  background: key === '⌫'
                    ? (dark ? 'rgba(232,52,74,0.2)' : 'rgba(232,52,74,0.1)')
                    : (dark ? 'rgba(255,255,255,0.1)' : 'rgba(255,107,157,0.08)'),
                  border: dark
                    ? '1px solid rgba(255,255,255,0.15)'
                    : '1px solid rgba(255,107,157,0.15)',
                  color: dark ? '#fff' : '#1a1a1a',
                }}
              >
                {key === '⌫' ? '⌫' : key}
              </motion.button>
            );
          })}
        </div>

        {/* Hint */}
        <p
          className="text-center font-inter text-xs mt-6 opacity-50"
          style={{ color: dark ? '#fff' : '#666' }}
        >
          Hint: A Princess's Birthday Year✨
        </p>
      </motion.div>
    </motion.div>
  );
}
