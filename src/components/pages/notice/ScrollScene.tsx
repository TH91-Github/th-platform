import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ScrollScene = () => {
  /* ===========================
   * refs
   * =========================== */
  const titleRef = useRef<HTMLHeadingElement>(null);
  const charRefs = useRef<HTMLSpanElement[]>([]);

  const expandSectionRef = useRef<HTMLDivElement>(null);
  const expandBoxRef = useRef<HTMLDivElement>(null);

  const shrinkSectionRef = useRef<HTMLDivElement>(null);
  const shrinkBoxRef = useRef<HTMLDivElement>(null);

  const TEXT = "SCROLL ANIMATION";

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      /* ===========================
       * 1️⃣ 타이틀 – 글자 하나씩 서서히 등장
       * =========================== */
      gsap.fromTo(
        charRefs.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 70%",
            end: "top 30%",
            scrub: 1,
          },
        }
      );

      /* ===========================
       * 2️⃣ 박스 A – 가운데 → 풀 → 다시 작아짐
       * =========================== */
      gsap.timeline({
        scrollTrigger: {
          trigger: expandSectionRef.current,
          start: "top top",
          end: "+=2000",
          scrub: true,
          pin: true,
        },
      })
        .fromTo(
          expandBoxRef.current,
          { scale: 0.4, borderRadius: 24 },
          { scale: 1, borderRadius: 0, ease: "none" }
        )
        .to(expandBoxRef.current, {
          scale: 0.4,
          borderRadius: 24,
          ease: "none",
        });

      /* ===========================
       * 3️⃣ 박스 B – 풀 → 가운데로 축소
       * =========================== */
      gsap.fromTo(
        shrinkBoxRef.current,
        { scale: 1, borderRadius: 0 },
        {
          scale: 0.2,
          borderRadius: 24,
          ease: "none",
          scrollTrigger: {
            trigger: shrinkSectionRef.current,
            start: "top top",
            end: "+=2000",
            scrub: true,
            pin: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div style={{ background: "#020617", color: "#fff" }}>
      {/* 위 여백 */}
      <section style={{ height: "100vh" }} />

      {/* ================= 타이틀 ================= */}
      <section
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1
          ref={titleRef}
          style={{
            fontSize: "64px",
            fontWeight: 800,
            letterSpacing: "0.1em",
          }}
        >
          {TEXT.split("").map((char, i) => (
            <span
              key={i}
              ref={(el) => {
                if (el) charRefs.current[i] = el;
              }}
              style={{
                display: "inline-block",
                opacity: 0,
              }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>
      </section>

      {/* ================= 박스 A ================= */}
      <section
        ref={expandSectionRef}
        style={{
          height: "100vh",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          ref={expandBoxRef}
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(135deg, #6366f1, #22d3ee)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "40px",
            fontWeight: 700,
            transformOrigin: "center",
          }}
        >
          CENTER → FULL → CENTER
        </div>
      </section>

      {/* ================= 박스 B ================= */}
      <section
        ref={shrinkSectionRef}
        style={{
          height: "100vh",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          ref={shrinkBoxRef}
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(135deg, #ec4899, #f97316)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "36px",
            fontWeight: 700,
            transformOrigin: "center",
          }}
        >
          FULL → CENTER
        </div>
      </section>

      {/* 아래 여백 */}
      <section style={{ height: "100vh" }} />
    </div>
  );
};

export default ScrollScene;