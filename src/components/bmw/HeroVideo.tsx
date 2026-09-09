import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function HeroVideo() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const progress = useRef(0);
  const smoothed = useRef(0);
  const velocity = useRef(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const video = videoRef.current;
    if (!video) return;

    video.pause();
    let duration = 0;
    let raf = 0;
    let lastP = 0;

    const onMeta = () => {
      duration = video.duration || 0;
      try {
        video.currentTime = 0;
      } catch {
        /* noop */
      }
      ScrollTrigger.refresh();
    };
    if (video.readyState >= 1) onMeta();
    video.addEventListener("loadedmetadata", onMeta);

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: wrapRef.current,
        start: "top top",
        end: "+=650%",
        pin: stageRef.current,
        pinSpacing: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          progress.current = self.progress;
        },
      });

      gsap.to(overlayRef.current, {
        opacity: 0,
        y: -40,
        ease: "none",
        scrollTrigger: {
          trigger: wrapRef.current,
          start: "top top",
          end: "+=90%",
          scrub: true,
        },
      });
    }, wrapRef);

    const tick = () => {
      raf = requestAnimationFrame(tick);
      const target = progress.current;
      // critically-damped-ish smoothing: fast scroll stays responsive, slow scroll is precise
      const diff = target - smoothed.current;
      smoothed.current += diff * 0.16;
      if (Math.abs(diff) < 0.00005) smoothed.current = target;

      velocity.current += (Math.abs(smoothed.current - lastP) - velocity.current) * 0.1;
      lastP = smoothed.current;

      if (duration > 0 && video.readyState >= 2) {
        const t = Math.min(
          Math.max(smoothed.current, 0) * duration,
          Math.max(duration - 0.03, 0),
        );
        if (Math.abs(video.currentTime - t) > 1 / 120) {
          video.currentTime = t;
        }
      }

      // subtle cinematic forward push, amplified slightly by scroll speed
      const zoom = 1.14 - 0.14 * smoothed.current + Math.min(velocity.current * 6, 0.06);
      video.style.transform = `scale(${zoom.toFixed(4)})`;
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      video.removeEventListener("loadedmetadata", onMeta);
      ctx.revert();
    };
  }, []);

  return (
    <div ref={wrapRef} id="home" className="relative" style={{ zIndex: 1 }}>
      <div ref={stageRef} className="relative h-screen w-full overflow-hidden bg-background">
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src="/assets/bmw-cinematic.mp4"
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          style={{ willChange: "transform" }}
        />

        {/* cinematic grade — never alters the source video content */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 40%, oklch(0.05 0.01 260 / 78%) 100%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3"
          style={{
            background: "linear-gradient(to top, oklch(0.08 0.008 260) 0%, transparent 100%)",
          }}
        />

        <div
          ref={overlayRef}
          className="pointer-events-none absolute inset-x-0 bottom-[14vh] px-6 text-center sm:px-10"
        >
          <p className="eyebrow">Sheer Driving Pleasure</p>
          <h1 className="display-title mt-4 text-[clamp(2.8rem,10vw,8rem)] text-foreground drop-shadow-[0_0_40px_rgba(0,0,0,0.7)]">
            Engineered Emotion
          </h1>
          <p className="mx-auto mt-5 max-w-md text-sm text-muted-foreground">
            Scroll to drive the film — every frame under your control.
          </p>
        </div>
      </div>
    </div>
  );
}
