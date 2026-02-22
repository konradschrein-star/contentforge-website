import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { channelsConfig } from '../config';
import { Youtube, Clock, ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function Channels() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const explanationRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  if (!channelsConfig.title) return null;

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

      // Explanation animation
      const trigger3 = ScrollTrigger.create({
        trigger: explanationRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(
            explanationRef.current,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: 'expo.out', delay: 0.2 }
          );
        },
        once: true,
      });
      triggersRef.current.push(trigger3);

      // Cards animation
      const trigger4 = ScrollTrigger.create({
        trigger: cardsRef.current,
        start: 'top 80%',
        onEnter: () => {
          const cards = cardsRef.current?.querySelectorAll('.channel-card');
          if (cards) {
            gsap.fromTo(
              cards,
              { y: 50, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.7,
                stagger: 0.15,
                ease: 'expo.out',
              }
            );
          }
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
      id="channels"
      className="relative w-full py-24 md:py-32 lg:py-40 bg-black"
    >
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] via-transparent to-white/[0.02] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 md:px-8 relative z-10">
        {/* Section label */}
        <div className="mb-8 md:mb-12">
          <span className="text-xs md:text-sm text-white/40 tracking-[0.3em] uppercase">
            YouTube
          </span>
        </div>

        {/* Title */}
        <h2
          ref={titleRef}
          className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold text-white tracking-tight mb-4 md:mb-6 opacity-0"
        >
          {channelsConfig.title}
        </h2>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-lg md:text-xl text-white/50 max-w-2xl mb-8 opacity-0"
        >
          {channelsConfig.subtitle}
        </p>

        {/* Explanation */}
        <p
          ref={explanationRef}
          className="text-base md:text-lg text-white/40 max-w-3xl mb-12 md:mb-16 opacity-0"
        >
          {channelsConfig.explanation}
        </p>

        {/* Channel Cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
        >
          {channelsConfig.channels.map((channel) => (
            <div
              key={channel.id}
              className="channel-card group relative p-6 md:p-8 border border-white/10 hover:border-white/25 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-500 opacity-0"
            >
              {/* YouTube Icon */}
              <div className="mb-6">
                <div className="w-14 h-14 flex items-center justify-center border border-white/20 group-hover:border-white/40 transition-colors duration-300">
                  <Youtube className="w-6 h-6 text-white/60 group-hover:text-white transition-colors duration-300" />
                </div>
              </div>

              {/* Channel Name */}
              <h3 className="text-xl md:text-2xl font-medium text-white mb-2">
                {channel.name}
              </h3>

              {/* Focus */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs text-white/40 tracking-wider uppercase px-2 py-1 border border-white/10">
                  {channel.focus}
                </span>
              </div>

              {/* Description */}
              <p className="text-sm md:text-base text-white/50 leading-relaxed mb-6">
                {channel.description}
              </p>

              {/* Status */}
              <div className="flex items-center gap-2 text-white/40">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{channel.status}</span>
              </div>

              {/* Hover link indicator */}
              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ExternalLink className="w-5 h-5 text-white/40" />
              </div>

              {/* Hover accent line */}
              <div className="absolute bottom-0 left-0 w-0 h-px bg-white/30 group-hover:w-full transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
