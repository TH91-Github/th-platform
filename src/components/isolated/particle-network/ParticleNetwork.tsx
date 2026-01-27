import { useEffect, useRef } from 'react';
import type { Particle, ParticleConfig } from './type';
import { createParticles, drawConnections, drawParticles, updateParticles } from './function';

// 🔹점과 선 연결 UI 용 컴포넌트 독립적 isolated 폴더 
interface ParticleNetworkProps {
  config?: Partial<ParticleConfig>;
}

// 기본 옵션
export const DEFAULT_OPTION: ParticleConfig = {
  density: 70000, // 숫자 높을수록 적은 수
  color: '#dbdbdb',
  pointRadius: 1,
  lineWidth: 0.3,
};

export const ParticleNetwork = ({ config }: ParticleNetworkProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef<Particle | null>(null);
  const rafRef = useRef<number | null>(null);

  const mergedConfig: ParticleConfig = {
    ...DEFAULT_OPTION,
    ...config,
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      particlesRef.current = createParticles(
        canvas.width,
        canvas.height,
        mergedConfig
      );

      mouseRef.current = {
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        isMouse: true,
      };

      particlesRef.current.push(mouseRef.current);
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      updateParticles(
        particlesRef.current,
        canvas.width,
        canvas.height
      );

      drawConnections(ctx, particlesRef.current, mergedConfig);
      ctx.globalAlpha = 1;
      drawParticles(ctx, particlesRef.current, mergedConfig);

      rafRef.current = requestAnimationFrame(animate);
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!mouseRef.current || !canvas) return;
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;

      mouseRef.current.x = (e.clientX - rect.left) * scaleX;
      mouseRef.current.y = (e.clientY - rect.top) * scaleY;
    };

    resize();
    animate();

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouseMove);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [mergedConfig]);

  return <canvas ref={canvasRef} />;
};
