// smoothScroll.ts
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "./scrollTrigger";

// 인스턴스 외부 공유용
let lenisInstance: Lenis | null = null;

export const getLenis = () => lenisInstance;

export const initSmoothScroll = () => {
  const lenis = new Lenis({
    duration: 0.8,
    smoothWheel: true,
  });

  lenisInstance = lenis; // 저장

  lenis.on("scroll", ScrollTrigger.update);

  const ticker = (time: number) => {
    lenis.raf(time * 1000);
  };

  gsap.ticker.add(ticker);
  gsap.ticker.lagSmoothing(0);

  return lenis;
};