import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

import Nav from "@/components/bmw/Nav";
import LogoIntro from "@/components/bmw/LogoIntro";
import HeroVideo from "@/components/bmw/HeroVideo";
import { About, Cars, Technology, Contact } from "@/components/bmw/Sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BMW Atelier — Cinematic Scroll Experience" },
      {
        name: "description",
        content:
          "A premium BMW-inspired one-page experience: a scroll-assembled roundel, a scroll-driven cinematic film, and the range, technology and contact in one continuous journey.",
      },
      { property: "og:title", content: "BMW Atelier — Cinematic Scroll Experience" },
      {
        property: "og:description",
        content:
          "Scroll to assemble the roundel, drive the film frame by frame, and explore the BMW range, technology and atelier.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [navVisible, setNavVisible] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      syncTouch: true,
      touchMultiplier: 1.4,
    });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const onScroll = () => setNavVisible(window.scrollY > window.innerHeight * 1.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // reveal animations for the lightweight sections
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 48 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none reverse" },
          },
        );
      });
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      gsap.ticker.remove(raf);
      ctx.revert();
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const goTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    lenisRef.current?.scrollTo(el, { offset: 0, duration: 1.6 });
  };

  return (
    <main className="relative bg-background">
      <Nav onNavigate={goTo} visible={navVisible} />
      <LogoIntro />
      <HeroVideo />
      <div className="relative z-10 bg-background">
        <About />
        <Cars />
        <Technology />
        <Contact />
      </div>
    </main>
  );
}
