import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const PIECES = 8;

function wedgeClip(index: number) {
  const step = 360 / PIECES;
  const start = index * step - 90;
  const pts = ["50% 50%"];
  for (let a = start; a <= start + step + 0.001; a += step / 6) {
    const r = (a * Math.PI) / 180;
    pts.push(`${(50 + 80 * Math.cos(r)).toFixed(2)}% ${(50 + 80 * Math.sin(r)).toFixed(2)}%`);
  }
  return `polygon(${pts.join(",")})`;
}

export default function LogoIntro() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const shatterRef = useRef<HTMLImageElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const veilRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const pieces = gsap.utils.toArray<HTMLElement>(".logo-piece");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapRef.current,
          start: "top top",
          end: "+=300%",
          pin: stageRef.current,
          pinSpacing: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // pieces converge
      pieces.forEach((p, i) => {
        const angle = ((i * 360) / PIECES - 90) * (Math.PI / 180);
        tl.fromTo(
          p,
          {
            x: Math.cos(angle) * 260,
            y: Math.sin(angle) * 260,
            rotate: i % 2 === 0 ? 26 : -26,
            scale: 0.82,
            opacity: 0.75,
            filter: "blur(3px)",
          },
          {
            x: 0,
            y: 0,
            rotate: 0,
            scale: 1,
            opacity: 1,
            filter: "blur(0px)",
            ease: "power2.inOut",
            duration: 0.62,
          },
          0,
        );
      });

      tl.fromTo(
        shatterRef.current,
        { opacity: 0.55, scale: 1.04 },
        { opacity: 0, scale: 1.18, ease: "power1.out", duration: 0.5 },
        0,
      )
        .fromTo(
          logoRef.current,
          { scale: 0.78 },
          { scale: 1.05, ease: "power1.inOut", duration: 0.62 },
          0,
        )
        .to(copyRef.current, { opacity: 0, y: -30, duration: 0.25 }, 0.42)
        // zoom through the assembled roundel
        .to(logoRef.current, { scale: 16, ease: "power2.in", duration: 0.36 }, 0.64)
        .to(logoRef.current, { opacity: 0, duration: 0.18 }, 0.8)
        .fromTo(veilRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0.7);
    }, wrapRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapRef} className="relative" style={{ zIndex: 2 }}>
      <div
        ref={stageRef}
        className="relative flex h-screen w-full items-center justify-center overflow-hidden"
        style={{ background: "var(--gradient-navy)" }}
      >
        <div className="pointer-events-none absolute inset-0 opacity-70">
          <div
            className="absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background:
                "radial-gradient(circle, oklch(0.58 0.19 253 / 22%) 0%, transparent 68%)",
            }}
          />
        </div>

        <img
          ref={shatterRef}
          src="/assets/bmw-logo-shattered.png"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 w-[min(92vw,900px)] -translate-x-1/2 -translate-y-1/2 object-contain mix-blend-screen"
        />

        <div
          ref={logoRef}
          className="relative h-[min(46vmin,340px)] w-[min(46vmin,340px)]"
          style={{ willChange: "transform" }}
        >
          {Array.from({ length: PIECES }).map((_, i) => (
            <div
              key={i}
              className="logo-piece absolute inset-0 bg-contain bg-center bg-no-repeat"
              style={{
                backgroundImage: "url(/assets/bmw-logo.png)",
                clipPath: wedgeClip(i),
                willChange: "transform, opacity",
              }}
            />
          ))}
        </div>

        <div
          ref={copyRef}
          className="pointer-events-none absolute bottom-[12vh] left-1/2 w-full -translate-x-1/2 text-center"
        >
          <p className="eyebrow">The Ultimate Driving Machine</p>
          <p className="mt-4 text-[11px] uppercase tracking-[0.3em] text-muted-foreground/70">
            Scroll to assemble
          </p>
          <div className="mx-auto mt-4 h-10 w-px bg-gradient-to-b from-primary to-transparent" />
        </div>

        <div
          ref={veilRef}
          className="pointer-events-none absolute inset-0 bg-background opacity-0"
        />
      </div>
    </div>
  );
}
