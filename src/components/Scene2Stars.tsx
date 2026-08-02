import { useEffect, useRef, useState } from 'react';

interface Props {
  onComplete: () => void;
}

interface Star {
  x: number;
  y: number;
  r: number;
  twinkleSpeed: number;
  twinkleOffset: number;
  born: number;
  vx?: number;
  vy?: number;
}

interface ConstellationPoint {
  x: number;
  y: number;
}

// Heart constellation
const heartPoints: [number, number][] = [
  [0.5, 0.33],
  [0.36, 0.26],
  [0.26, 0.30],
  [0.20, 0.39],
  [0.21, 0.50],
  [0.30, 0.60],
  [0.39, 0.68],
  [0.5, 0.76],
  [0.61, 0.68],
  [0.70, 0.60],
  [0.79, 0.50],
  [0.80, 0.39],
  [0.74, 0.30],
  [0.64, 0.26],
  [0.5, 0.33],
];

// Letter A
const letterAPoints: [number, number][] = [
  [0.50, 0.24],
  [0.33, 0.64],
  [0.41, 0.45],
  [0.59, 0.45],
  [0.67, 0.64],
  [0.50, 0.24],
  [0.41, 0.45],
  [0.59, 0.45],
];

export default function Scene2Stars({ onComplete }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const phaseRef = useRef<'stars' | 'heart' | 'letterA' | 'message' | 'done'>('stars');
  const animRef = useRef<number>(0);
  const [overlayText, setOverlayText] = useState('');
  const [textVisible, setTextVisible] = useState(false);
  const startTimeRef = useRef(Date.now());
  const constellationPointsRef = useRef<ConstellationPoint[]>([]);
  const phaseStartRef = useRef(Date.now());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d')!;
    
    const resize = () => {
      canvas.width = window.innerWidth * window.devicePixelRatio;
      canvas.height = window.innerHeight * window.devicePixelRatio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener('resize', resize);

    const addStar = () => {
      starsRef.current.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: Math.random() * 1.8 + 0.5,
        twinkleSpeed: Math.random() * 0.013 + 0.005,
        twinkleOffset: Math.random() * Math.PI * 2,
        born: Date.now(),
        vx: (Math.random() - 0.5) * 0.08,
        vy: (Math.random() - 0.5) * 0.08,
      });
    };

    // Stars appear slowly
    const starInterval = setInterval(() => {
      for (let i = 0; i < 5; i++) addStar();
    }, 90);

    // Timeline
    const t1 = setTimeout(() => {
      clearInterval(starInterval);
      phaseRef.current = 'heart';
      phaseStartRef.current = Date.now();
      constellationPointsRef.current = heartPoints.map(([nx, ny]) => ({
        x: nx * window.innerWidth,
        y: ny * window.innerHeight,
      }));
    }, 3800);

    const t2 = setTimeout(() => {
      phaseRef.current = 'letterA';
      phaseStartRef.current = Date.now();
      constellationPointsRef.current = letterAPoints.map(([nx, ny]) => ({
        x: nx * window.innerWidth,
        y: ny * window.innerHeight,
      }));
    }, 8200);

    const t3 = setTimeout(() => {
      phaseRef.current = 'message';
      setOverlayText('Every star here is a memory waiting to shine.');
      setTextVisible(true);
    }, 12500);

    const t4 = setTimeout(() => {
      setTextVisible(false);
    }, 16200);

    const t5 = setTimeout(() => {
      phaseRef.current = 'done';
      onComplete();
    }, 18000);

    // Draw loop
    const draw = () => {
      const now = Date.now();
      const t = (now - startTimeRef.current) / 1000;
      const w = window.innerWidth;
      const h = window.innerHeight;

      // Deep space
      const grad = ctx.createRadialGradient(w / 2, h * 0.38, 0, w / 2, h / 2, Math.max(w, h) * 0.9);
      grad.addColorStop(0, '#100220');
      grad.addColorStop(0.5, '#080014');
      grad.addColorStop(1, '#010005');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Soft purple nebula
      const nebula = ctx.createRadialGradient(w * 0.5, h * 0.32, 0, w * 0.5, h * 0.32, w * 0.5);
      nebula.addColorStop(0, 'rgba(150, 90, 210, 0.09)');
      nebula.addColorStop(0.5, 'rgba(190, 110, 190, 0.04)');
      nebula.addColorStop(1, 'transparent');
      ctx.fillStyle = nebula;
      ctx.fillRect(0, 0, w, h);

      // Floating stars
      starsRef.current.forEach((star) => {
        // gentle drift
        if (star.vx && star.vy) {
          star.x += star.vx;
          star.y += star.vy;
          if (star.x < 0) star.x = w;
          if (star.x > w) star.x = 0;
          if (star.y < 0) star.y = h;
          if (star.y > h) star.y = 0;
        }

        const age = (now - star.born) / 1000;
        const fadeIn = Math.min(age / 1.8, 1);
        const twinkle = 0.38 + 0.62 * Math.sin(t * star.twinkleSpeed * 60 + star.twinkleOffset);
        const alpha = fadeIn * twinkle;

        // Outer glow
        const glow = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.r * 7);
        glow.addColorStop(0, `rgba(225, 230, 255, ${alpha * 0.5})`);
        glow.addColorStop(0.4, `rgba(200, 210, 255, ${alpha * 0.18})`);
        glow.addColorStop(1, 'rgba(180,190,255,0)');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r * 7, 0, Math.PI * 2);
        ctx.fill();

        // Core
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // Constellation
      const phase = phaseRef.current;
      const points = constellationPointsRef.current;

      if ((phase === 'heart' || phase === 'letterA' || phase === 'message' || phase === 'done') && points.length > 0) {
        const elapsed = (now - phaseStartRef.current) / 1000;
        const progress = Math.min(elapsed / 3.2, 1);
        const visibleCount = Math.floor(progress * points.length);

        // Soft connecting lines
        if (visibleCount > 1) {
          ctx.strokeStyle = `rgba(255, 185, 235, ${0.48 * progress})`;
          ctx.lineWidth = 1.5;
          ctx.shadowColor = 'rgba(255, 140, 220, 0.85)';
          ctx.shadowBlur = 12;
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.beginPath();
          ctx.moveTo(points[0].x, points[0].y);
          for (let i = 1; i < visibleCount; i++) {
            ctx.lineTo(points[i].x, points[i].y);
          }
          ctx.stroke();
          ctx.shadowBlur = 0;
        }

        // Constellation stars
        for (let i = 0; i < visibleCount; i++) {
          const pt = points[i];
          const pulse = 0.6 + 0.4 * Math.sin(t * 1.9 + i * 0.5);

          // Big soft glow
          const glow = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, 20);
          glow.addColorStop(0, `rgba(255, 215, 245, ${0.95 * pulse})`);
          glow.addColorStop(0.35, `rgba(255, 170, 230, ${0.4 * pulse})`);
          glow.addColorStop(1, 'rgba(255,140,220,0)');
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 20, 0, Math.PI * 2);
          ctx.fill();

          // Bright core
          ctx.fillStyle = `rgba(255, 255, 255, ${pulse})`;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 3.3, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
      clearInterval(starInterval);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50">
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* Overlay text */}
      <div className="absolute inset-0 flex items-end justify-center pb-20 md:pb-28 px-6 pointer-events-none">
        <p
          style={{
            fontFamily: "'Georgia', 'Times New Roman', serif",
            fontSize: 'clamp(1.15rem, 3.1vw, 1.6rem)',
            color: 'rgba(245, 220, 255, 0.95)',
            letterSpacing: '0.03em',
            textAlign: 'center',
            maxWidth: '90%',
            opacity: textVisible ? 1 : 0,
            transform: textVisible ? 'translateY(0)' : 'translateY(22px)',
            transition: 'opacity 1.9s ease, transform 1.9s ease',
            textShadow: '0 0 36px rgba(200, 130, 255, 0.85)',
          }}
        >
          {overlayText}
        </p>
      </div>
    </div>
  );
}
