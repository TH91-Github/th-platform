import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "@/lib/scroll/scrollTrigger";
import styles from "./MatchScroll.module.scss";
import { cn } from "@/utils/common";
import { NavLink, useNavigate } from "react-router-dom";
import { ArrowNavLink } from "@/components/element/button/ArrowNavLink";
import { InnerHTML } from "@/components/ui/text/InnerHTML";
import { IconArrowRight } from "@/assets/icon";
import { TitlePoint } from "@/components/ui/text/TitlePoint";

interface MatchItemType {
  id: string;
  title?: string;
  desc?: string;
  imgSrc?: string;
  url?: string;
}

interface MatchScrollPropsType {
  data: MatchItemType[];
  bgImages?: string[];
  className?: string;
}

export default function MatchScroll({
  data,
  bgImages = [],
  className,
}: MatchScrollPropsType) {
  const navigate = useNavigate();

  const wrapRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLElement>(null);
  const contRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);
  const scrollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);

  useGSAP(
    () => {
      const wrap = wrapRef.current;
      const inner = innerRef.current;
      const cont = contRef.current;

      if (!wrap || !inner || !cont || data.length === 0) return;

      // bg box 
      const bgItems = gsap.utils.toArray<HTMLImageElement>(
        wrap.querySelectorAll(`.${styles.bgBox}`)
      );

      ScrollTrigger.create({
        trigger: inner,
        start: "top top",
        end: "bottom bottom",
        pin: cont,
        scrub: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (isScrollingRef.current) return; // 클릭 스크롤 중엔 무시

          const total = data.length;
          const raw = self.progress * total;
          const base = Math.floor(raw);
          const progress = raw - base;
          const prev = activeIndexRef.current;
          const THRESHOLD = 0.15;
          let next = prev;

          if (base > prev && progress >= THRESHOLD) {
            next = base;
          } else if (base < prev) {
            next = base;
          }
          if (next !== prev) {
            activeIndexRef.current = next;
            setActiveIndex(next);
          }
        },
      });

      bgItems.forEach((img, i) => {
        gsap.to(img, {
          y: -200,
          rotation: i % 2 === 0 ? 8 : -8,
          ease: "none",
          scrollTrigger: {
            trigger: inner,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    },
    {
      scope: wrapRef,
      dependencies: [data.length, bgImages.length],
    }
  );
  const handleTitleClick = (idx: number) => {
    const inner = innerRef.current;
    if (!inner) return;

    // 즉시 목적지 index로 설정하고 스크롤 중 업데이트 차단
    isScrollingRef.current = true;
    activeIndexRef.current = idx;
    setActiveIndex(idx);

    if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);

    const total = data.length;
    const targetProgress = (idx + 0.2) / total;
    const innerTop = inner.getBoundingClientRect().top + window.scrollY;
    const innerHeight = inner.offsetHeight;
    const targetY = innerTop + innerHeight * targetProgress - 100;

    window.scrollTo({ top: targetY, behavior: "smooth" });

    // smooth scroll 끝날 때쯤 차단 해제
    scrollTimerRef.current = setTimeout(() => {
      isScrollingRef.current = false;
    }, 800);
  };

  const handleLinkClick = (url: string | undefined) => {
    if (url) navigate(url);
  }
  
  return (
    <div 
      ref={wrapRef} 
      className={cn(styles.wrap, className)}
    >
      <section 
        ref={innerRef} 
        className={styles.inner}
        style={{ height: `${data.length * 100}svh` }}
      >
        <div ref={contRef} className={styles.cont}>
          <div className={styles.matchBox}>
            <ul className={styles.titList}>
              {data.map((item, idx) => (
                <li
                  key={item.id}
                  className={cn(idx === activeIndex && styles.active)}
                >
                  <button
                    type="button"
                    onClick={() => handleTitleClick(idx)}
                  >
                    <TitlePoint 
                      title={item.id}
                      pointType="underline"
                      className={styles.tit}
                    />
                  </button>
                </li>
              ))}
            </ul>

            <div className={styles.boxLists}>
              {data.map((boxItem, idx) => (
                <div
                  key={boxItem.id}
                  className={cn(
                    styles.boxItem,
                    idx === activeIndex && styles.active
                  )}
                >
                  {boxItem.imgSrc && (
                    <div className={styles.img}>
                      <img
                        src={boxItem.imgSrc}
                        alt={boxItem.title ?? boxItem.id}
                        loading={idx === 0 ? "eager" : "lazy"}
                      />
                    </div>
                  )}
                  {boxItem.title && (
                    <div className={styles.info}>
                      <TitlePoint 
                        titleTag='p'
                        title={boxItem.title}
                        className={styles.title}
                      />
                      <p className={styles.desc}><InnerHTML text={boxItem.desc || ''}/></p>
                      {boxItem.url && (
                        <div className={styles.btnWrap}>
                          <button
                            type="button" 
                            className={styles.btnLink}
                            onClick={() => handleLinkClick(boxItem.url)} 
                          >
                            <span>자세히 보기</span>
                            <span className={styles.icon}><IconArrowRight /></span>
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {bgImages.length > 0 && (
            <div className={styles.bgBox} aria-hidden="true">
              {bgImages.map((imgSrc, index) => (
                <span
                  className={styles.bgBoxItem}
                  key={`${imgSrc}-${index}`}
                  // style={{ backgroundImage: imgSrc }}
                >
                  <img src={imgSrc} alt="" />
                </span>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}