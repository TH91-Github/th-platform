import { useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { colors, colorsText } from '@/assets/style/emotion/variables';

// 🔹 원형, 텍스트 이펙트
interface RotatingSphereProps {
  canvasSize?: number,
  pointCount?: number,
  dotColor?: string,
  dotSize?: number, //
  rotateY?: number, // Y축 회전 속도 - 음수로 주면 반대 방향 회전
  rotateX?: number, // X축 회전 속도 - 음수로 주면 반대 방향 회전
  text?: string,
  textSize?: number,
  textColor?: string,
}

export const RotatingSphere = ({
  canvasSize = 100,
  pointCount = 50,
  dotColor,
  dotSize = 2.2,
  rotateY = 0.0015,
  rotateX = 0.0008,
  text = '',
  textSize = 16,
  textColor = colorsText.titleB,
}: RotatingSphereProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvasSize * dpr;
    canvas.height = canvasSize * dpr;
    canvas.style.width = `${canvasSize}px`;
    canvas.style.height = `${canvasSize}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const CAMERA = {
      z: -canvasSize * 2.5,
      focus: canvasSize * 1.2,
      project(p: { x: number; y: number; z: number }) {
        const depth = p.z - this.z;
        if (depth <= 0) return null;
        const scale = this.focus / depth;
        return {
          x: canvasSize / 2 + p.x * scale,
          y: canvasSize / 2 - p.y * scale,
          scale,
        };
      },
    };
    // 기준 사이즈에 맞게 구 설정
    const MARGIN = 0.9;
    const TARGET = (canvasSize / 2) * MARGIN;
    const RADIUS =
      (TARGET * -CAMERA.z) / (CAMERA.focus + TARGET);

    // 작은 포인터
    class Point {
      constructor(
        public x: number,
        public y: number,
        public z: number
      ) {}

      rotateY(a: number) {
        const c = Math.cos(a);
        const s = Math.sin(a);
        const x = this.x * c - this.z * s;
        const z = this.z * c + this.x * s;
        this.x = x;
        this.z = z;
      }

      rotateX(a: number) {
        const c = Math.cos(a);
        const s = Math.sin(a);
        const y = this.y * c - this.z * s;
        const z = this.z * c + this.y * s;
        this.y = y;
        this.z = z;
      }

      draw(ctx: CanvasRenderingContext2D) {
        const p = CAMERA.project(this);
        if (!p) return;

        const scale =  p.scale;
        const size = Math.max(1, dotSize * scale);
        const light = 40 + Math.min(40, scale * 40);

        ctx.beginPath();
        ctx.fillStyle = dotColor ?? colors.blue;
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const points: Point[] = [];
    for (let i = 0; i < pointCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);

      points.push(
        new Point(
          RADIUS * Math.sin(phi) * Math.cos(theta),
          RADIUS * Math.cos(phi),
          RADIUS * Math.sin(phi) * Math.sin(theta)
        )
      );
    }
    
    // text
    const drawCenterText = () => {
      if (!text) return;
      const c = CAMERA.project({ x: 0, y: 0, z: 0 });
      if (!c) return;

      ctx.save();
      ctx.beginPath();
      ctx.arc(c.x, c.y, RADIUS * c.scale, 0, Math.PI * 2);
      ctx.clip();

      ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
      ctx.shadowBlur = 2;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 1;
      ctx.fillStyle = textColor;
      ctx.font = `600 ${textSize}px 'Pretendard', sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, c.x, c.y);

      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvasSize, canvasSize);

      drawCenterText();

      points.forEach(p => {
        p.rotateY(rotateY);
        p.rotateX(rotateX);
      });

      points
        .sort((a, b) => b.z - a.z)
        .forEach(p => p.draw(ctx));

      frameRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(frameRef.current);
  }, [
    canvasSize,
    pointCount,
    dotColor,
    dotSize,
    rotateY,
    rotateX,
    text,
    textSize,
    textColor,
  ]);

  return (
    <Wrapper $size={canvasSize}>
      <canvas ref={canvasRef} />
    </Wrapper>
  );
};

const Wrapper = styled.div<{ $size: number }>`
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
`;
