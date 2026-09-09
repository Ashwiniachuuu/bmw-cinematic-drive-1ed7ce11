import { Mail, MapPin, Phone, ArrowUpRight } from "lucide-react";

const CARS = [
  {
    img: "/assets/car-1.jpg",
    name: "M8 Competition Coupé",
    spec: "625 hp · 0–100 in 3.2s",
    copy: "A grand tourer sharpened by motorsport. Carbon roof, M xDrive, and a twin-turbo V8 built for the long road.",
  },
  {
    img: "/assets/car-2.jpg",
    name: "i7 xDrive60",
    spec: "544 hp · 625 km range",
    copy: "Electric luxury without compromise. Silent propulsion, executive lounge seating, and an interior of pure calm.",
  },
  {
    img: "/assets/car-3.jpg",
    name: "X5 M Competition",
    spec: "617 hp · Adaptive M suspension",
    copy: "Presence and precision in one silhouette. Track-bred dynamics wrapped around everyday usability.",
  },
];

const TECH = [
  {
    img: "/assets/tech-1.jpg",
    title: "Curved Display",
    copy: "A single driver-oriented glass surface merging instrument cluster and control — information exactly where the eyes already are.",
  },
  {
    img: "/assets/tech-2.jpg",
    title: "Gen5 eDrive",
    copy: "High-density cells and a magnet-free motor deliver instant torque with exceptional efficiency and thermal stability.",
  },
  {
    img: "/assets/tech-3.jpg",
    title: "Laserlight",
    copy: "Adaptive high beam reaching up to 600 metres, shaping the road ahead without dazzling oncoming traffic.",
  },
];

export function About() {
  return (
    <section id="about" className="relative px-6 py-28 sm:px-10 sm:py-36">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="reveal group relative overflow-hidden rounded-sm">
          <img
            src="/assets/about-bmw.jpg"
            alt="BMW performance sedan under studio lighting"
            width={1600}
            height={1008}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
          />
          <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
          <div
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
            style={{
              background:
                "linear-gradient(120deg, transparent 40%, oklch(0.58 0.19 253 / 22%) 100%)",
            }}
          />
        </div>

        <div className="reveal">
          <p className="eyebrow">About</p>
          <h2 className="display-title mt-5 text-[clamp(2.2rem,6vw,4.4rem)]">
            A century of
            <br />
            forward motion
          </h2>
          <p className="mt-7 max-w-lg text-base leading-relaxed text-muted-foreground">
            Since 1916, BMW has built machines around a single idea: the driver. Every line is
            drawn for airflow, every chassis tuned for balance, every interface designed to
            disappear the moment the road demands attention.
          </p>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground">
            Today that philosophy moves electric — the same precision, delivered in silence.
          </p>

          <div className="mt-10 grid grid-cols-3 gap-4">
            {[
              ["1916", "Founded"],
              ["30+", "Models"],
              ["140", "Markets"],
            ].map(([k, v]) => (
              <div key={v} className="glass-panel rounded-sm px-4 py-5">
                <div className="display-title text-3xl text-foreground">{k}</div>
                <div className="mt-1 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  {v}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Cars() {
  return (
    <section id="cars" className="relative px-6 py-28 sm:px-10 sm:py-36">
      <div className="mx-auto max-w-6xl">
        <div className="reveal max-w-2xl">
          <p className="eyebrow">The Range</p>
          <h2 className="display-title mt-5 text-[clamp(2.2rem,6vw,4.4rem)]">Selected models</h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {CARS.map((c) => (
            <article
              key={c.name}
              className="reveal glass-panel group relative overflow-hidden rounded-sm transition-transform duration-500 ease-out hover:-translate-y-2"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="overflow-hidden">
                <img
                  src={c.img}
                  alt={c.name}
                  width={1200}
                  height={912}
                  loading="lazy"
                  className="h-56 w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="display-title text-2xl">{c.name}</h3>
                <p className="mt-2 text-[11px] uppercase tracking-[0.2em] text-primary">
                  {c.spec}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{c.copy}</p>
              </div>
              <div className="pointer-events-none absolute inset-0 opacity-0 shadow-[0_0_70px_-10px_oklch(0.58_0.19_253/45%)] transition-opacity duration-500 group-hover:opacity-100" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Technology() {
  return (
    <section id="technology" className="relative px-6 py-28 sm:px-10 sm:py-36">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, oklch(0.58 0.19 253 / 60%), transparent)",
        }}
      />
      <div className="mx-auto max-w-6xl">
        <div className="reveal max-w-2xl">
          <p className="eyebrow">Technology</p>
          <h2 className="display-title mt-5 text-[clamp(2.2rem,6vw,4.4rem)]">
            Intelligence, built in
          </h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {TECH.map((t) => (
            <div
              key={t.title}
              className="reveal glass-panel group relative overflow-hidden rounded-sm p-2"
            >
              <img
                src={t.img}
                alt={t.title}
                width={1200}
                height={800}
                loading="lazy"
                className="h-44 w-full rounded-sm object-cover opacity-90 transition-opacity duration-500 group-hover:opacity-100"
              />
              <div className="px-4 pb-6 pt-6">
                <h3 className="font-sans text-sm font-semibold uppercase tracking-[0.2em] text-foreground">
                  {t.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t.copy}</p>
              </div>
              <div className="pointer-events-none absolute -inset-px rounded-sm opacity-0 ring-1 ring-primary/40 transition-opacity duration-500 group-hover:opacity-100" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden">
      <div className="relative">
        <img
          src="/assets/contact-bmw.jpg"
          alt="BMW showroom at night"
          width={1600}
          height={912}
          loading="lazy"
          className="h-[70vh] w-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, oklch(0.08 0.008 260) 8%, oklch(0.08 0.008 260 / 55%) 60%, oklch(0.08 0.008 260) 100%)",
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
          <div className="reveal">
            <p className="eyebrow">Contact</p>
            <h2 className="display-title mt-5 text-[clamp(2.4rem,7vw,5.5rem)]">
              Book your drive
            </h2>
            <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
              Reserve a private viewing or a test drive with one of our product specialists.
            </p>
            <a
              href="mailto:experience@bmw-atelier.com"
              className="mt-9 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.24em] text-primary-foreground transition-all duration-300 hover:shadow-[0_0_50px_-6px_oklch(0.58_0.19_253/70%)]"
            >
              Request a test drive
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-20 sm:px-10">
        <div className="reveal grid gap-6 md:grid-cols-3">
          {[
            { Icon: Mail, label: "Email", value: "experience@bmw-atelier.com" },
            { Icon: Phone, label: "Phone", value: "+49 89 1250 16000" },
            { Icon: MapPin, label: "Atelier", value: "Petuelring 130, München" },
          ].map(({ Icon, label, value }) => (
            <div key={label} className="glass-panel rounded-sm px-6 py-7">
              <Icon className="h-5 w-5 text-primary" />
              <div className="mt-4 text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
                {label}
              </div>
              <div className="mt-2 text-sm text-foreground">{value}</div>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-border pt-8 sm:flex-row">
          <div className="flex items-center gap-3">
            <img
              src="/assets/bmw-logo.png"
              alt="BMW"
              width={28}
              height={28}
              loading="lazy"
              className="h-7 w-7 object-contain"
            />
            <span className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} BMW Atelier — concept showcase
            </span>
          </div>
          <div className="flex gap-6 text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
            {["Instagram", "YouTube", "LinkedIn", "X"].map((s) => (
              <a key={s} href="#contact" className="transition-colors hover:text-foreground">
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
