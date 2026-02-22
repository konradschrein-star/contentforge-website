import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { archiveConfig } from '../config';
import { ArrowRight, Trophy, FolderOpen } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function Archive() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const noteRef = useRef<HTMLDivElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  if (!archiveConfig.title) return null;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      const trigger1 = ScrollTrigger.create({
        trigger: titleRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(
            titleRef.current,
            { y: 60, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: 'expo.out' }
          );
        },
        once: true,
      });
      triggersRef.current.push(trigger1);

      // Subtitle animation
      const trigger2 = ScrollTrigger.create({
        trigger: subtitleRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(
            subtitleRef.current,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: 'expo.out', delay: 0.1 }
          );
        },
        once: true,
      });
      triggersRef.current.push(trigger2);

      // Grid cards animation
      const trigger3 = ScrollTrigger.create({
        trigger: gridRef.current,
        start: 'top 80%',
        onEnter: () => {
          const cards = gridRef.current?.querySelectorAll('.archive-card');
          if (cards) {
            gsap.fromTo(
              cards,
              { y: 50, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.7,
                stagger: 0.1,
                ease: 'expo.out',
              }
            );
          }
        },
        once: true,
      });
      triggersRef.current.push(trigger3);

      // Note animation
      const trigger4 = ScrollTrigger.create({
        trigger: noteRef.current,
        start: 'top 85%',
        onEnter: () => {
          gsap.fromTo(
            noteRef.current,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: 'expo.out' }
          );
        },
        once: true,
      });
      triggersRef.current.push(trigger4);
    }, sectionRef);

    return () => {
      ctx.revert();
      triggersRef.current.forEach((t) => t.kill());
      triggersRef.current = [];
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="archive"
      className="relative w-full py-24 md:py-32 lg:py-40 bg-black"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        {/* Section label */}
        <div className="mb-8 md:mb-12">
          <span className="text-xs md:text-sm text-white/40 tracking-[0.3em] uppercase">
            Archive
          </span>
        </div>

        {/* Title */}
        <h2
          ref={titleRef}
          className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold text-white tracking-tight mb-4 md:mb-6 opacity-0"
        >
          {archiveConfig.title}
        </h2>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-lg md:text-xl text-white/50 max-w-2xl mb-12 md:mb-16 opacity-0"
        >
          {archiveConfig.subtitle}
        </p>

        {/* Comparison Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
        >
          {archiveConfig.items.map((item) => (
            <div
              key={item.id}
              className="archive-card group relative p-6 md:p-8 border border-white/10 hover:border-white/25 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-500 opacity-0"
            >
              {/* Category badge */}
              <div className="flex items-center gap-2 mb-4">
                <FolderOpen className="w-4 h-4 text-white/40" />
                <span className="text-xs text-white/40 tracking-wider uppercase">
                  {item.category}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl md:text-2xl font-medium text-white mb-3 group-hover:text-white/90 transition-colors duration-300">
                {item.title}
              </h3>

              {/* Summary */}
              <p className="text-sm md:text-base text-white/50 leading-relaxed mb-6">
                {item.summary}
              </p>

              {/* Ranking highlight */}
              <div className="flex items-center gap-3 p-3 bg-white/[0.03] border border-white/10 mb-6">
                <Trophy className="w-4 h-4 text-white/60" />
                <span className="text-sm text-white/70">
                  {item.ranking}
                </span>
              </div>

              {/* View Results button */}
              <button
                className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors duration-300 group/btn"
                onClick={() => {}}
              >
                <span>View Results</span>
                <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform duration-300" />
              </button>

              {/* Hover accent */}
              <div className="absolute left-0 top-0 w-px h-0 bg-white/30 group-hover:h-full transition-all duration-500" />
            </div>
          ))}
        </div>

        {/* Note */}
        <div
          ref={noteRef}
          className="mt-12 md:mt-16 p-6 md:p-8 border border-white/10 bg-white/[0.02] opacity-0"
        >
          <p className="text-sm md:text-base text-white/40 text-center leading-relaxed">
            {archiveConfig.note}
          </p>
        </div>
      </div>
    </section>
  );
}
