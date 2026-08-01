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
}

interface ConstellationPoint {
  x: number;
  y: number;
}

// Heart constellation (normalized 0-1)
const heartPoints: [number, number][] = [
  [0.5, 0.35], [0.38, 0.28], [0.28, 0.3], [0.22, 0.38], [0.22, 0.47],
  [0.3, 0.56], [0.38, 0.63], [0.5, 0.72],
  [0.62, 0.63], [0.7, 0.56], [0.78, 0.47], [0.78, 0.38],
  [0.72, 0.3], [0.62, 0.28], [0.5, 0.35], // close the heart
];

// Letter A constellation
const letterAPoints: [number, number][] = [
  [0.5, 0.22],
  [0.35, 0.58],
  [0.42, 0.42],
  [0.58, 0.42],
  [0.65, 0.58],
  [0.5, 0.22],
  [0.42, 0.42],
  [0.58, 0.42],
];

export default function Scene2Stars({ onComplete }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const phaseRef = useRef<'stars' | 'heart' | 'letterA' | 'done'>('stars');
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
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const addStar = () => {
      starsRef.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.8 + 0.4,
        twinkleSpeed: Math.random() * 0.015 + 0.006,
        twinkleOffset: Math.random() * Math.PI * 2,
        born: Date.now(),
      });
    };

    // Stars appear in bursts
    const starInterval = setInterval(() => {
      for (let i = 0; i < 7; i++) addStar();
    }, 70);

    // Timeline
    const t1 = setTimeout(() => {
      clearInterval(starInterval);
      phaseRef.current = 'heart';
      phaseStartRef.current = Date.now();
      constellationPointsRef.current = heartPoints.map(([nx, ny]) => ({
        x: nx * canvas.width,
        y: ny * canvas.height,
      }));
    }, 3400);

    const t2 = setTimeout(() => {
      phaseRef.current = 'letterA';
      phaseStartRef.current = Date.now();
      constellationPointsRef.current = letterAPoints.map(([nx, ny]) => ({
        x: nx * canvas.width,
        y: ny * canvas.height,
      }));
    }, 7200);

    const t3 = setTimeout(() => {
      phaseRef.current = 'done';
      setOverlayText('Every star here is a memory waiting to shine.');
      setTextVisible(true);
    }, 10800);

    const t4 = setTimeout(() => {
      setTextVisible(false);
    }, 14200);

    const t5 = setTimeout(() => {
      onComplete();
    }, 15500);

    // Draw loop
    const draw = () => {
      const now = Date.now();
      const t = (now - startTimeRef.current) / 1000;
      const w = canvas.width;
      const h = canvas.height;

      // Deep space background
      const grad = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, Math.max(w, h) * 0.8);
      grad.addColorStop(0, '#0c0018');
      grad.addColorStop(0.6, '#05000f');
      grad.addColorStop(1, '#000003');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Stars
      starsRef.current.forEach((star) => {
        const age = (now - star.born) / 1000;
        const fadeIn = Math.min(age / 1.4, 1);
        const twinkle = 0.45 + 0.55 * Math.sin(t * star.twinkleSpeed * 60 + star.twinkleOffset);
        const alpha = fadeIn * twinkle;

        // Soft glow
        const glow = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.r * 5);
        glow.addColorStop(0, `rgba(210, 220, 255, ${alpha * 0.7})`);
        glow.addColorStop(1, 'rgba(200,210,255,0)');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r * 5, 0, Math.PI * 2);
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

      if ((phase === 'heart' || phase === 'letterA' || phase === 'done') && points.length > 0) {
        const elapsed = (now - phaseStartRef.current) / 1000;
        const progress = Math.min(elapsed / 2.8, 1);
        const visibleCount = Math.floor(progress * points.length);

        // Connecting lines
        if (visibleCount > 1) {
          ctx.strokeStyle = `rgba(255, 170, 220, ${0.55 * progress})`;
          ctx.lineWidth = 1.2;
          ctx.shadowColor = 'rgba(255, 120, 200, 0.7)';
          ctx.shadowBlur = 8;
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
          const pulse = 0.7 + 0.3 * Math.sin(t * 2.2 + i * 0.5);

          const glow = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, 14);
          glow.addColorStop(0, `rgba(255, 200, 240, ${0.85 * pulse})`);
          glow.addColorStop(1, 'rgba(255,150,220,0)');
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 14, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = `rgba(255,255,255,${pulse})`;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 2.8, 0, Math.PI * 2);
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
            fontSize: 'clamp(1.05rem, 2.8vw, 1.5rem)',
            color: 'rgba(230, 200, 255, 0.95)',
            letterSpacing: '0.05em',
            textAlign: 'center',
            maxWidth: '90%',
            opacity: textVisible ? 1 : 0,
            transform: textVisible ? 'translateY(0)' : 'translateY(18px)',
            transition: 'opacity 1.6s ease, transform 1.6s ease',
            textShadow: '0 0 28px rgba(180,100,255,0.75)',
          }}
        >
          {overlayText}
        </p>
      </div>
    </div>
  );
}