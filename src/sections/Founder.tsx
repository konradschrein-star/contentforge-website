import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { founderConfig } from '../config';
import { Mail, User } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function Founder() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  if (!founderConfig.title) return null;

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

      // Content animation
      const trigger2 = ScrollTrigger.create({
        trigger: contentRef.current,
        start: 'top 80%',
        onEnter: () => {
          const elements = contentRef.current?.querySelectorAll('.animate-item');
          if (elements) {
            gsap.fromTo(
              elements,
              { y: 40, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.15,
                ease: 'expo.out',
              }
            );
          }
        },
        once: true,
      });
      triggersRef.current.push(trigger2);
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
      id="founder"
      className="relative w-full py-24 md:py-32 lg:py-40 bg-black"
    >
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] via-transparent to-white/[0.02] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 md:px-8 relative z-10">
        {/* Section label */}
        <div className="mb-8 md:mb-12">
          <span className="text-xs md:text-sm text-white/40 tracking-[0.3em] uppercase">
            Leadership
          </span>
        </div>

        {/* Title */}
        <h2
          ref={titleRef}
          className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold text-white tracking-tight mb-12 md:mb-16 opacity-0"
        >
          {founderConfig.title}
        </h2>

        {/* Content Grid */}
        <div
          ref={contentRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16"
        >
          {/* Left - Photo Placeholder */}
          <div className="animate-item opacity-0">
            <div className="aspect-[4/5] md:aspect-square lg:aspect-[4/5] border border-white/10 bg-white/[0.02] flex flex-col items-center justify-center group hover:border-white/20 transition-colors duration-500">
              <div className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center border border-white/10 mb-6">
                <User className="w-10 h-10 md:w-12 md:h-12 text-white/20 group-hover:text-white/30 transition-colors duration-300" />
              </div>
              <span className="text-sm text-white/30 tracking-wider uppercase">
                {founderConfig.imageAlt}
              </span>
            </div>
          </div>

          {/* Right - Text Content */}
          <div className="flex flex-col justify-center">
            {/* Name */}
            <h3 className="animate-item text-2xl md:text-3xl lg:text-4xl font-medium text-white mb-2 opacity-0">
              {founderConfig.name}
            </h3>

            {/* Role */}
            <p className="animate-item text-base md:text-lg text-white/50 mb-8 opacity-0">
              {founderConfig.role}
            </p>

            {/* Bio */}
            <p className="animate-item text-base md:text-lg text-white/60 leading-relaxed mb-10 opacity-0">
              {founderConfig.bio}
            </p>

            {/* Email */}
            <div className="animate-item opacity-0">
              <a
                href={`mailto:${founderConfig.email}`}
                className="inline-flex items-center gap-3 text-white/60 hover:text-white transition-colors duration-300 group"
              >
                <div className="w-10 h-10 flex items-center justify-center border border-white/20 group-hover:border-white/40 transition-colors duration-300">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="text-sm md:text-base">{founderConfig.email}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
