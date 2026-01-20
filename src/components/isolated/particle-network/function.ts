import type { Particle, ParticleConfig } from "./type";

export const createParticles = (
  width: number,
  height: number,
  config: ParticleConfig
): Particle[] => {
  const count = Math.floor((width * height) / config.density);
  const particles: Particle[] = [];

  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
    });
  }

  return particles;
};

export const updateParticles = (
  particles: Particle[],
  width: number,
  height: number
) => {
  for (const p of particles) {
    if (p.isMouse) continue;

    if (p.x < -20 || p.x > width + 20) p.vx *= -1;
    if (p.y < -20 || p.y > height + 20) p.vy *= -1;

    p.x += p.vx;
    p.y += p.vy;
  }
};

export const drawConnections = (
  ctx: CanvasRenderingContext2D,
  particles: Particle[],
  config: ParticleConfig
) => {
  ctx.strokeStyle = config.color;
  ctx.lineWidth = config.lineWidth;

  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = dx * dx + dy * dy;

      if (dist < 14400) {
        ctx.globalAlpha = (14400 - dist) / 14400;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
};

export const drawParticles = (
  ctx: CanvasRenderingContext2D,
  particles: Particle[],
  config: ParticleConfig
) => {
  ctx.fillStyle = config.color;
  ctx.globalAlpha = 0.7;

  for (const p of particles) {
    ctx.beginPath();
    ctx.arc(
      p.x,
      p.y,
      config.pointRadius, // ⭐ 적용
      0,
      Math.PI * 2
    );
    ctx.fill();
  }
};