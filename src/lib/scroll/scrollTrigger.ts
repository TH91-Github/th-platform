import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// 1번만 main.tsx 실행
gsap.registerPlugin(ScrollTrigger);

export const initScrollTrigger = () => {
  ScrollTrigger.config({
    ignoreMobileResize: true,
  });

  ScrollTrigger.normalizeScroll(true);
};

export const refreshScroll = () => {
  requestAnimationFrame(() => {
    ScrollTrigger.refresh();
  });
};

export { ScrollTrigger };