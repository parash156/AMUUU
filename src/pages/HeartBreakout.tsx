import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  onBack: () => void;
  dark: boolean;
}

const COLS = 8;
const ROWS = 5;
const BLOCK_COLORS = [
  '#ff6b9d', '#fbc2eb', '#c9b8e8', '#a18cd1',
  '#fddb92', '#96fbc4', '#89f7fe', '#ff9a9e',
];

type GameState = 'idle' | 'playing' | 'paused' | 'won' | 'lost';

export default function HeartBreakout({ onBack, dark }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<GameState>('idle');
  const animRef = useRef<number>(0);
  const [gameState, setGameState] = useState<GameState>('idle');
  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(0);

  const gameData = useRef({
    ballX: 0, ballY: 0, ballDX: 3, ballDY: -3,
    paddleX: 0, paddleW: 80, paddleH: 12,
    blocks: [] as { x: number; y: number; alive: boolean; color: string; emoji: string }[],
    lives: 3, score: 0,
    canvasW: 480, canvasH: 400,
  });

  const initGame = useCallback(() => {
    const d = gameData.current;
    d.canvasW = Math.min(window.innerWidth - 40, 480);
    d.canvasH = 400;
    d.ballX = d.canvasW / 2;
    d.ballY = d.canvasH - 60;
    d.ballDX = 3.5;
    d.ballDY = -3.5;
    d.paddleX = d.canvasW / 2 - d.paddleW / 2;
    d.lives = 3;
    d.score = 0;
    setLives(3);
    setScore(0);

    const blockW = (d.canvasW - 20) / COLS;
    const blockH = 28;
    const emojis = ['💖', '💕', '💗', '💓', '💝', '🌸', '✨', '⭐'];
    d.blocks = [];
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        d.blocks.push({
          x: 10 + c * blockW,
          y: 50 + r * (blockH + 6),
          alive: true,
          color: BLOCK_COLORS[(r * COLS + c) % BLOCK_COLORS.length],
          emoji: emojis[(r + c) % emojis.length],
        });
      }
    }
  }, []);

  const drawHeart = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string) => {
    ctx.save();
    ctx.fillStyle = color;
    ctx.translate(x, y);
    ctx.scale(size / 30, size / 30);
    ctx.beginPath();
    ctx.moveTo(0, -8);
    ctx.bezierCurveTo(8, -16, 20, -8, 0, 8);
    ctx.bezierCurveTo(-20, -8, -8, -16, 0, -8);
    ctx.fill();
    ctx.restore();
  };

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const d = gameData.current;

    // Background
    ctx.clearRect(0, 0, d.canvasW, d.canvasH);
    const grad = ctx.createLinearGradient(0, 0, 0, d.canvasH);
    grad.addColorStop(0, dark ? '#0a0015' : '#fff0f5');
    grad.addColorStop(1, dark ? '#1a0030' : '#ffe8f0');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, d.canvasW, d.canvasH);

    // Blocks
    const blockW = (d.canvasW - 20) / COLS;
    const blockH = 28;
    d.blocks.forEach(b => {
      if (!b.alive) return;
      const radius = 8;
      ctx.save();
      ctx.fillStyle = b.color;
      ctx.shadowColor = b.color;
      ctx.shadowBlur = 6;
      // Rounded rect
      ctx.beginPath();
      ctx.moveTo(b.x + radius, b.y);
      ctx.lineTo(b.x + blockW - 4 - radius, b.y);
      ctx.arcTo(b.x + blockW - 4, b.y, b.x + blockW - 4, b.y + radius, radius);
      ctx.lineTo(b.x + blockW - 4, b.y + blockH - radius);
      ctx.arcTo(b.x + blockW - 4, b.y + blockH, b.x + blockW - 4 - radius, b.y + blockH, radius);
      ctx.lineTo(b.x + radius, b.y + blockH);
      ctx.arcTo(b.x, b.y + blockH, b.x, b.y + blockH - radius, radius);
      ctx.lineTo(b.x, b.y + radius);
      ctx.arcTo(b.x, b.y, b.x + radius, b.y, radius);
      ctx.closePath();
      ctx.fill();

      // Emoji text
      ctx.shadowBlur = 0;
      ctx.font = `${Math.min(blockH - 8, 16)}px serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(b.emoji, b.x + (blockW - 4) / 2, b.y + blockH / 2);
      ctx.restore();
    });

    // Paddle
    ctx.save();
    const paddleGrad = ctx.createLinearGradient(d.paddleX, 0, d.paddleX + d.paddleW, 0);
    paddleGrad.addColorStop(0, '#ff6b9d');
    paddleGrad.addColorStop(1, '#c9b8e8');
    ctx.fillStyle = paddleGrad;
    ctx.shadowColor = '#ff6b9d';
    ctx.shadowBlur = 12;
    const pr = 6;
    const py = d.canvasH - 25;
    ctx.beginPath();
    ctx.moveTo(d.paddleX + pr, py);
    ctx.lineTo(d.paddleX + d.paddleW - pr, py);
    ctx.arcTo(d.paddleX + d.paddleW, py, d.paddleX + d.paddleW, py + pr, pr);
    ctx.lineTo(d.paddleX + d.paddleW, py + d.paddleH - pr);
    ctx.arcTo(d.paddleX + d.paddleW, py + d.paddleH, d.paddleX + d.paddleW - pr, py + d.paddleH, pr);
    ctx.lineTo(d.paddleX + pr, py + d.paddleH);
    ctx.arcTo(d.paddleX, py + d.paddleH, d.paddleX, py + d.paddleH - pr, pr);
    ctx.lineTo(d.paddleX, py + pr);
    ctx.arcTo(d.paddleX, py, d.paddleX + pr, py, pr);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // Ball (heart)
    drawHeart(ctx, d.ballX, d.ballY, 22, '#ff6b9d');
    // Ball glow
    ctx.save();
    ctx.shadowColor = '#ff6b9d';
    ctx.shadowBlur = 20;
    drawHeart(ctx, d.ballX, d.ballY, 22, '#ff6b9d');
    ctx.restore();
  }, [dark]);

  const update = useCallback(() => {
    const d = gameData.current;
    if (stateRef.current !== 'playing') return;

    d.ballX += d.ballDX;
    d.ballY += d.ballDY;

    // Wall bounce
    if (d.ballX <= 12 || d.ballX >= d.canvasW - 12) d.ballDX *= -1;
    if (d.ballY <= 12) d.ballDY *= -1;

    // Paddle bounce
    const py = d.canvasH - 25;
    if (
      d.ballY >= py - 11 && d.ballY <= py + d.paddleH + 11 &&
      d.ballX >= d.paddleX - 4 && d.ballX <= d.paddleX + d.paddleW + 4
    ) {
      const hit = (d.ballX - d.paddleX) / d.paddleW;
      d.ballDX = (hit - 0.5) * 8;
      d.ballDY = -Math.abs(d.ballDY);
    }

    // Block collision
    const blockW = (d.canvasW - 20) / COLS;
    const blockH = 28;
    let allDead = true;
    d.blocks.forEach(b => {
      if (!b.alive) return;
      allDead = false;
      if (
        d.ballX >= b.x && d.ballX <= b.x + blockW - 4 &&
        d.ballY >= b.y && d.ballY <= b.y + blockH
      ) {
        b.alive = false;
        d.ballDY *= -1;
        d.score += 10;
        setScore(d.score);
      }
    });

    if (allDead) {
      stateRef.current = 'won';
      setGameState('won');
      return;
    }

    // Fall off bottom
    if (d.ballY >= d.canvasH + 20) {
      d.lives--;
      setLives(d.lives);
      if (d.lives <= 0) {
        stateRef.current = 'lost';
        setGameState('lost');
        return;
      }
      d.ballX = d.canvasW / 2;
      d.ballY = d.canvasH - 60;
      d.ballDX = 3.5;
      d.ballDY = -3.5;
    }
  }, []);

  const gameLoop = useCallback(() => {
    update();
    draw();
    animRef.current = requestAnimationFrame(gameLoop);
  }, [update, draw]);

  const startGame = () => {
    initGame();
    stateRef.current = 'playing';
    setGameState('playing');
  };

  useEffect(() => {
    if (gameState === 'playing') {
      animRef.current = requestAnimationFrame(gameLoop);
    }
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [gameState, gameLoop]);

  // Mouse/touch controls
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const d = gameData.current;

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      d.paddleX = e.clientX - rect.left - d.paddleW / 2;
      d.paddleX = Math.max(0, Math.min(d.canvasW - d.paddleW, d.paddleX));
    };
    const onTouch = (e: TouchEvent) => {
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      d.paddleX = e.touches[0].clientX - rect.left - d.paddleW / 2;
      d.paddleX = Math.max(0, Math.min(d.canvasW - d.paddleW, d.paddleX));
    };
    canvas.addEventListener('mousemove', onMove);
    canvas.addEventListener('touchmove', onTouch, { passive: false });
    return () => {
      canvas.removeEventListener('mousemove', onMove);
      canvas.removeEventListener('touchmove', onTouch);
    };
  }, []);

  // Draw idle state
  useEffect(() => {
    initGame();
    draw();
  }, [initGame, draw, dark]);

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
      {/* Header */}
      <div className="max-w-lg mx-auto">
        <div className="flex items-center gap-4 mb-6">
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
              🎮 Heart Breakout
            </h1>
          </div>
        </div>

        {/* Score & Lives */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <span className="font-inter text-sm" style={{ color: dark ? 'rgba(255,255,255,0.6)' : '#6b7280' }}>Score:</span>
            <span className="font-playfair text-xl font-bold" style={{ color: dark ? '#ff9cc0' : '#e8344a' }}>
              {score}
            </span>
          </div>
          <div className="flex gap-1">
            {Array.from({ length: 3 }).map((_, i) => (
              <span key={i} className="text-xl" style={{ opacity: i < lives ? 1 : 0.2 }}>❤️</span>
            ))}
          </div>
        </div>

        {/* Canvas */}
        <div className="relative">
          <canvas
            ref={canvasRef}
            width={gameData.current.canvasW}
            height={gameData.current.canvasH}
            className="w-full rounded-2xl shadow-2xl"
            style={{
              border: '2px solid rgba(255,107,157,0.3)',
              cursor: 'none',
              display: 'block',
            }}
          />

          {/* Overlay for non-playing states */}
          <AnimatePresence>
            {gameState !== 'playing' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl"
                style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}
              >
                {gameState === 'idle' && (
                  <div className="text-center p-6">
                    <motion.div
                      animate={{ scale: [1, 1.15, 1] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                      className="text-6xl mb-4"
                    >
                      🎮
                    </motion.div>
                    <h2 className="font-playfair text-2xl font-bold text-white mb-2">Heart Breakout</h2>
                    <p className="font-inter text-sm text-white/70 mb-6">
                      Break all the heart blocks!<br />Move your mouse to control the paddle.
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={startGame}
                      className="cursor-none px-8 py-3 rounded-2xl font-inter font-semibold text-white"
                      style={{ background: 'linear-gradient(135deg, #ff6b9d, #c9b8e8)' }}
                    >
                      Play 💖
                    </motion.button>
                  </div>
                )}
                {gameState === 'won' && (
                  <div className="text-center p-6">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                      transition={{ repeat: Infinity, duration: 1 }}
                      className="text-6xl mb-4"
                    >
                      🎉
                    </motion.div>
                    <h2 className="font-playfair text-2xl font-bold text-white mb-1">You Won!</h2>
                    <p className="font-dancing text-xl text-pink-300 mb-2">Just like you win my heart every day 💕</p>
                    <p className="font-inter text-white/70 mb-6">Score: {score}</p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={startGame}
                      className="cursor-none px-8 py-3 rounded-2xl font-inter font-semibold text-white"
                      style={{ background: 'linear-gradient(135deg, #ff6b9d, #c9b8e8)' }}
                    >
                      Play Again 🌸
                    </motion.button>
                  </div>
                )}
                {gameState === 'lost' && (
                  <div className="text-center p-6">
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ repeat: Infinity, duration: 1 }}
                      className="text-6xl mb-4"
                    >
                      💔
                    </motion.div>
                    <h2 className="font-playfair text-2xl font-bold text-white mb-1">Aww, try again!</h2>
                    <p className="font-dancing text-xl text-pink-300 mb-2">Even when you lose, I love you more 💕</p>
                    <p className="font-inter text-white/70 mb-6">Score: {score}</p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={startGame}
                      className="cursor-none px-8 py-3 rounded-2xl font-inter font-semibold text-white"
                      style={{ background: 'linear-gradient(135deg, #ff6b9d, #c9b8e8)' }}
                    >
                      Try Again 💖
                    </motion.button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Instructions */}
        {gameState === 'playing' && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center font-inter text-xs mt-4"
            style={{ color: dark ? 'rgba(255,255,255,0.4)' : '#9ca3af' }}
          >
            Move your mouse over the game to control the paddle 🎮
          </motion.p>
        )}
      </div>
    </motion.div>
  );
}
