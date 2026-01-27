// particle.types.ts
export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  isMouse?: boolean;
}

export interface ParticleConfig {
  density: number; // 화면 대비 파티클 밀도
  color: string; // 점 & 선 색상
  pointRadius: number; // 점 크기
  lineWidth: number; // 선 두께

}