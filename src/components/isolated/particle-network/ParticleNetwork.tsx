import { useEffect, useRef, useCallback } from 'react';
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
  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  const mergedConfig: ParticleConfig = {
    ...DEFAULT_OPTION,
    ...config,
  };

  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !canvas.parentElement) return;

    const dpr = window.devicePixelRatio;

    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '1';

    // 픽셀 크기 설정 (고해상도 대응)
    canvas.width = canvas.offsetWidth * dpr;
    canvas.height = canvas.offsetHeight * dpr;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(dpr, dpr);
    }

    // particles 재생성
    particlesRef.current = createParticles(canvas.offsetWidth, canvas.offsetHeight, mergedConfig);

    // mouseRef 초기화 및 추가
    mouseRef.current = {
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      isMouse: true,
    };
    particlesRef.current.push(mouseRef.current);
  }, [mergedConfig]);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

    updateParticles(particlesRef.current, canvas.offsetWidth, canvas.offsetHeight);
    drawConnections(ctx, particlesRef.current, mergedConfig);
    ctx.globalAlpha = 1;
    drawParticles(ctx, particlesRef.current, mergedConfig);

    rafRef.current = requestAnimationFrame(animate);
  }, [mergedConfig]);

  const onMouseMove = useCallback((e: MouseEvent) => {
    const canvas = canvasRef.current;
    if (!mouseRef.current || !canvas) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.offsetWidth / rect.width;
    const scaleY = canvas.offsetHeight / rect.height;

    mouseRef.current.x = (e.clientX - rect.left) * scaleX;
    mouseRef.current.y = (e.clientY - rect.top) * scaleY;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 초기 resize
    resize();

    // ResizeObserver 설정 (부모만 관찰, 오류 방지)
    resizeObserverRef.current = new ResizeObserver(resize);
    resizeObserverRef.current.observe(canvas.parentElement!);

    // animate 시작
    animate();

    // 이벤트 리스너
    window.addEventListener('mousemove', onMouseMove);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
      }
    };
  }, [resize, animate, onMouseMove]);

  return <canvas ref={canvasRef} />;
};
