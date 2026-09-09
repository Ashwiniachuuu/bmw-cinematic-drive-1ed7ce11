import { useEffect, useState } from "react";

const LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "cars", label: "Cars" },
  { id: "technology", label: "Technology" },
  { id: "contact", label: "Contact" },
];

export default function Nav({
  onNavigate,
  visible,
}: {
  onNavigate: (id: string) => void;
  visible: boolean;
}) {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      let current = "home";
      for (const l of LINKS) {
        const el = document.getElementById(l.id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.4) {
          current = l.id;
        }
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed left-1/2 top-4 z-50 w-[min(1180px,94vw)] -translate-x-1/2 transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "pointer-events-none -translate-y-6 opacity-0"
      }`}
    >
      <nav className="glass-panel flex items-center justify-between rounded-full px-4 py-2.5 sm:px-6">
        <button
          onClick={() => onNavigate("home")}
          className="flex items-center gap-3"
          aria-label="BMW home"
        >
          <img
            src="/assets/bmw-logo.png"
            alt="BMW"
            width={36}
            height={36}
            className="h-8 w-8 object-contain sm:h-9 sm:w-9"
          />
          <span className="display-title hidden text-lg text-foreground sm:block">BMW</span>
        </button>

        <ul className="flex items-center gap-1 sm:gap-2">
          {LINKS.map((l) => (
            <li key={l.id}>
              <button
                onClick={() => onNavigate(l.id)}
                className={`relative rounded-full px-2.5 py-1.5 text-[10px] font-medium uppercase tracking-[0.18em] transition-colors sm:px-4 sm:text-xs sm:tracking-[0.24em] ${
                  active === l.id
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {l.label}
                <span
                  className={`absolute inset-x-2 -bottom-0.5 h-px bg-primary transition-transform duration-300 ${
                    active === l.id ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
