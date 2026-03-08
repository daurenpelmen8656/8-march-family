import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

type View = "home" | "mother" | "sister";

type SectionTheme = {
  key: Exclude<View, "home">;
  label: string;
  accent: string;
  glow: string;
  background: string;
  petalClassName: string;
  photos: string[];
  poem: string[];
};

const motherTheme: SectionTheme = {
  key: "mother",
  label: "Мамы",
  accent: "from-violet-700 via-fuchsia-600 to-violet-500",
  glow: "shadow-[0_0_70px_rgba(132,74,255,0.45)]",
  background: "from-[#44308d] via-[#6d4cc7] to-[#c793ff]",
  petalClassName: "petal-violet",
  photos: ["/images/mom-1.jpeg", "/images/mom-2.jpeg", "/images/mom-3.jpg"],
  poem: [
    "Мама, с Женским днём, с весною!",
    "Я хочу, чтоб каждый год",
    "Был согрет моей душою,",
    "Даже если некомфортно.",
    "",
    "Ты прости, что не подарки —",
    "Рифмы тихие дарю.",
    "Просто будь со мною рядом,",
    "Я так сильно тебя люблю!",
    "",
    "Сколько б дней ни пролетело,",
    "Сколько б не было зимы,",
    "Ты на свете — главное дело,",
    "Самая лучшая, мама, ты!",
  ],
};

const sisterTheme: SectionTheme = {
  key: "sister",
  label: "Сестры",
  accent: "from-pink-300 via-rose-400 to-fuchsia-400",
  glow: "shadow-[0_0_70px_rgba(255,145,187,0.45)]",
  background: "from-[#f7c2d7] via-[#f7aacb] to-[#ffd9ea]",
  petalClassName: "petal-rose",
  photos: ["/images/sis-1.jpeg", "/images/sis-2.jpg", "/images/sis-3.jpg"],
  poem: [
    "Наша гордость, наша радость,",
    "И улыбка до ушей.",
    "Ты — улыбок наших сладость,",
    "Лучший дантист для всех людей!",
    "",
    "С ней всегда царит веселье,",
    "С ней не страшен даже гром.",
    "Ты по жизни — вдохновенье,",
    "И уютно нам втроём.",
    "",
    "К чему веду я эти строки?",
    "Хочу простых сказать вещей:",
    "Ты — опора в жизни строгой,",
    "Нет тебя мне ближе и родней.",
    "",
    "С 8 Марта, милая сестрёнка,",
    "Пусть сбываются мечты.",
    "Ждём тебя мы в гости звонко,",
    "Света, счастья, доброты!",
  ],
};

const floatingFlowers = Array.from({ length: 7 }, (_, index) => ({
  id: index,
  size: 120 + index * 28,
  left: `${8 + index * 13}%`,
  top: `${10 + (index % 3) * 24}%`,
  delay: index * 0.35,
  duration: 8 + index,
}));

const petals = Array.from({ length: 16 }, (_, index) => ({
  id: index,
  left: `${4 + ((index * 7) % 92)}%`,
  delay: index * 0.7,
  duration: 10 + (index % 5),
  scale: 0.7 + (index % 4) * 0.16,
}));

function useAutoSlider(length: number) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % length);
    }, 4200);

    return () => window.clearInterval(id);
  }, [length]);

  return { index, setIndex };
}

function PhotoSlider({ photos, label }: { photos: string[]; label: string }) {
  const { index, setIndex } = useAutoSlider(photos.length);

  const previous = () => setIndex((current) => (current - 1 + photos.length) % photos.length);
  const next = () => setIndex((current) => (current + 1) % photos.length);

  return (
    <div className="w-full max-w-3xl mx-auto"> 
      <div className="relative overflow-hidden rounded-[2rem] border border-white/30 bg-white/12 p-3 shadow-[0_24px_80px_rgba(30,20,80,0.2)] backdrop-blur-2xl">
        <div className="aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-white/25">
          <AnimatePresence mode="wait">
            <motion.img
              key={photos[index]}
              src={photos[index]}
              alt={`${label} ${index + 1}`}
              className="h-full w-full object-contain bg-black/10"  // <- object-contain + фон для контраста
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </AnimatePresence>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-5 flex items-center justify-center gap-2">
          {photos.map((_, dotIndex) => (
            <button
              key={dotIndex}
              type="button"
              aria-label={`Показать фото ${dotIndex + 1}`}
              className={`pointer-events-auto h-2.5 rounded-full transition-all ${
                dotIndex === index ? "w-8 bg-white" : "w-2.5 bg-white/45"
              }`}
              onClick={() => setIndex(dotIndex)}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={previous}
          className="absolute left-5 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/35 bg-white/18 text-white backdrop-blur-xl transition hover:bg-white/28"
          aria-label="Предыдущее фото"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <button
          type="button"
          onClick={next}
          className="absolute right-5 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/35 bg-white/18 text-white backdrop-blur-xl transition hover:bg-white/28"
          aria-label="Следующее фото"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

    </div>
  );
}

function PoemBlock({ lines }: { lines: string[] }) {
  return (
    <div className="glass-panel mx-auto max-w-3xl px-6 py-8 text-center text-white sm:px-10 sm:py-10">
      <div className="script-text whitespace-pre-line text-[1.65rem] leading-[1.55] sm:text-[2rem]">
        {lines.join("\n")}
      </div>
    </div>
  );
}

function PetalField({ className }: { className: string }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {petals.map((petal) => (
        <span
          key={petal.id}
          className={`petal ${className}`}
          style={{
            left: petal.left,
            animationDelay: `${petal.delay}s`,
            animationDuration: `${petal.duration}s`,
            transform: `scale(${petal.scale})`,
          }}
        />
      ))}
    </div>
  );
}

function GreetingSection({ theme, onBack }: { theme: SectionTheme; onBack: () => void }) {
  return (
    <motion.section
      key={theme.key}
      initial={{ clipPath: "circle(0% at 50% 50%)", opacity: 0.4 }}
      animate={{ clipPath: "circle(150% at 50% 50%)", opacity: 1 }}
      exit={{ clipPath: "circle(0% at 50% 50%)", opacity: 0.2 }}
      transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
      className={`relative min-h-screen overflow-hidden bg-gradient-to-br ${theme.background}`}
    >
      <PetalField className={theme.petalClassName} />

      <div className="relative mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center gap-8 px-5 py-20 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="space-y-3 text-center text-white"
        >
          <p className="text-sm uppercase tracking-[0.38em] text-white/70">8 марта</p>
          <h2 className="text-4xl font-semibold tracking-[0.04em] sm:text-6xl">Для {theme.label.toLowerCase()}</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.32, duration: 0.75 }}
          className="w-full"
        >
          <PhotoSlider photos={theme.photos} label={theme.label} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.75 }}
          className="w-full"
        >
          <PoemBlock lines={theme.poem} />
        </motion.div>

        <motion.button
          type="button"
          onClick={onBack}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.58, duration: 0.65 }}
          className="glass-panel mt-2 inline-flex items-center gap-3 px-6 py-3 text-sm font-medium uppercase tracking-[0.18em] text-white transition hover:bg-white/22"
        >
          <ArrowLeft className="h-4 w-4" />
          Назад
        </motion.button>
      </div>
    </motion.section>
  );
}

export function App() {
  const [activeView, setActiveView] = useState<View>("home");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => setIsLoaded(true), 180);
    return () => window.clearTimeout(id);
  }, []);

  const currentTheme = useMemo(() => {
    if (activeView === "mother") return motherTheme;
    if (activeView === "sister") return sisterTheme;
    return null;
  }, [activeView]);

  return (
    <main className="min-h-screen overflow-hidden bg-[#f7eef7] text-white">
      <AnimatePresence mode="wait">
        {activeView === "home" ? (
          <motion.section
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-[#b894dd] via-[#edd6e6] to-[#f7d3df] px-5 py-12"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.7),transparent_38%),radial-gradient(circle_at_bottom,rgba(255,255,255,0.45),transparent_40%)]" />

            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              {floatingFlowers.map((flower) => (
                <motion.div
                  key={flower.id}
                  className="flower-blur"
                  style={{ left: flower.left, top: flower.top, width: flower.size, height: flower.size }}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={isLoaded ? { opacity: 0.55, scale: 1 } : { opacity: 0, scale: 0.85 }}
                  transition={{ delay: flower.delay, duration: 1.3, ease: "easeOut" }}
                />
              ))}
            </div>

            <PetalField className="petal-soft" />

            <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center justify-center gap-8 text-center">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="space-y-5"
              >
                <p className="text-sm uppercase tracking-[0.45em] text-white/70">8 марта</p>
                <h1 className="text-4xl font-semibold tracking-[0.05em] text-white sm:text-6xl lg:text-7xl">
                  Для самых любимых
                </h1>
                <p className="mx-auto max-w-2xl text-base leading-7 text-white/82 sm:text-lg">
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.35, duration: 0.9 }}
                className="flex w-full flex-col items-center justify-center gap-6 sm:flex-row sm:gap-10"
              >
                <button
                  type="button"
                  onClick={() => setActiveView("mother")}
                  className="circle-button group bg-gradient-to-br from-violet-900 via-violet-700 to-fuchsia-500"
                >
                  <span className="circle-button__shine" />
                  <span className="relative z-10 flex flex-col items-center gap-3 text-center">
                    <Sparkles className="h-7 w-7 text-white/80" />
                    <span className="text-3xl font-semibold tracking-[0.08em] text-white"></span>
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveView("sister")}
                  className="circle-button group bg-gradient-to-br from-rose-200 via-pink-300 to-fuchsia-400"
                >
                  <span className="circle-button__shine" />
                  <span className="relative z-10 flex flex-col items-center gap-3 text-center">
                    <Sparkles className="h-7 w-7 text-white/80" />
                    <span className="text-3xl font-semibold tracking-[0.08em] text-white"></span>
                  </span>
                </button>
              </motion.div>
            </div>
          </motion.section>
        ) : (
          currentTheme && <GreetingSection theme={currentTheme} onBack={() => setActiveView("home")} />
        )}
      </AnimatePresence>
    </main>
  );
}
