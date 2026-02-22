import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { servicesConfig } from '../config';
import { BarChart3, ListOrdered, Handshake } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const transparencyRef = useRef<HTMLDivElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  if (!servicesConfig.title) return null;

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

      // Cards animation
      const trigger3 = ScrollTrigger.create({
        trigger: cardsRef.current,
        start: 'top 80%',
        onEnter: () => {
          const cards = cardsRef.current?.querySelectorAll('.service-card');
          if (cards) {
            gsap.fromTo(
              cards,
              { y: 60, opacity: 0, rotateX: 15 },
              {
                y: 0,
                opacity: 1,
                rotateX: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: 'expo.out',
              }
            );
          }
        },
        once: true,
      });
      triggersRef.current.push(trigger3);

      // Transparency note animation
      const trigger4 = ScrollTrigger.create({
        trigger: transparencyRef.current,
        start: 'top 85%',
        onEnter: () => {
          gsap.fromTo(
            transparencyRef.current,
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

  const iconMap: Record<string, React.ElementType> = {
    '01': BarChart3,
    '02': ListOrdered,
    '03': Handshake,
  };

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative w-full py-24 md:py-32 lg:py-40 bg-black"
    >
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] via-transparent to-white/[0.02] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 md:px-8 relative z-10">
        {/* Section label */}
        <div className="mb-8 md:mb-12">
          <span className="text-xs md:text-sm text-white/40 tracking-[0.3em] uppercase">
            Services
          </span>
        </div>

        {/* Title */}
        <h2
          ref={titleRef}
          className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold text-white tracking-tight mb-4 md:mb-6 opacity-0"
        >
          {servicesConfig.title}
        </h2>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-lg md:text-xl text-white/50 max-w-2xl mb-16 md:mb-20 opacity-0"
        >
          {servicesConfig.subtitle}
        </p>

        {/* Service Cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 perspective-container"
          style={{ perspective: '1000px' }}
        >
          {servicesConfig.services.map((service) => {
            const Icon = iconMap[service.id] || BarChart3;
            return (
              <div
                key={service.id}
                className="service-card group relative p-6 md:p-8 border border-white/10 hover:border-white/30 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-500 opacity-0"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Number */}
                <div className="absolute top-6 right-6 md:top-8 md:right-8">
                  <span className="text-5xl md:text-6xl font-bold text-white/5 group-hover:text-white/10 transition-colors duration-500">
                    {service.id}
                  </span>
                </div>

                {/* Icon */}
                <div className="mb-6 relative z-10">
                  <div className="w-12 h-12 flex items-center justify-center border border-white/20 group-hover:border-white/40 transition-colors duration-300">
                    <Icon className="w-5 h-5 text-white/60 group-hover:text-white transition-colors duration-300" />
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-xl md:text-2xl font-medium text-white mb-4">
                    {service.title}
                  </h3>
                  <p className="text-sm md:text-base text-white/50 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Hover line effect */}
                <div className="absolute bottom-0 left-0 w-0 h-px bg-white/50 group-hover:w-full transition-all duration-500" />
              </div>
            );
          })}
        </div>

        {/* Transparency Statement */}
        <div
          ref={transparencyRef}
          className="mt-16 md:mt-20 p-6 md:p-8 border border-white/10 bg-white/[0.02] opacity-0"
        >
          <div className="flex items-start gap-4">
            <div className="w-2 h-2 bg-white/40 mt-2 flex-shrink-0" />
            <p className="text-sm md:text-base text-white/40 leading-relaxed">
              {servicesConfig.transparencyNote}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
