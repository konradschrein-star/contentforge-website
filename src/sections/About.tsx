import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { aboutConfig } from '../config';
import { Target, Eye, Shield } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  if (!aboutConfig.titleLine1) return null;

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

      // Description animation
      const trigger2 = ScrollTrigger.create({
        trigger: descRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(
            descRef.current,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: 'expo.out', delay: 0.2 }
          );
        },
        once: true,
      });
      triggersRef.current.push(trigger2);

      // Values cards animation
      const trigger3 = ScrollTrigger.create({
        trigger: valuesRef.current,
        start: 'top 80%',
        onEnter: () => {
          const cards = valuesRef.current?.querySelectorAll('.value-card');
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
      triggersRef.current.push(trigger3);
    }, sectionRef);

    return () => {
      ctx.revert();
      triggersRef.current.forEach((t) => t.kill());
      triggersRef.current = [];
    };
  }, []);

  const values = [
    {
      icon: Target,
      title: 'Clarity',
      description: 'We present information in a clear, accessible format that anyone can understand.',
    },
    {
      icon: Eye,
      title: 'Objectivity',
      description: 'Our rankings are based on defined criteria, not influenced by partnerships.',
    },
    {
      icon: Shield,
      title: 'Transparency',
      description: 'We disclose our methodology and revenue sources openly.',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full py-24 md:py-32 lg:py-40 bg-black"
    >
      {/* Section divider line */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-white/20 to-transparent" />

      <div className="max-w-6xl mx-auto px-6 md:px-8">
        {/* Section label */}
        <div className="mb-8 md:mb-12">
          <span className="text-xs md:text-sm text-white/40 tracking-[0.3em] uppercase">
            About Us
          </span>
        </div>

        {/* Title */}
        <h2
          ref={titleRef}
          className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold text-white tracking-tight mb-12 md:mb-16 opacity-0"
        >
          {aboutConfig.titleLine1}
        </h2>

        {/* Description */}
        <div
          ref={descRef}
          className="max-w-4xl opacity-0"
        >
          {aboutConfig.description.split('\n\n').map((paragraph, index) => (
            <p
              key={index}
              className="text-base md:text-lg lg:text-xl text-white/70 leading-relaxed mb-6 last:mb-0"
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* Values */}
        <div
          ref={valuesRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-16 md:mt-24"
        >
          {values.map((value, index) => (
            <div
              key={index}
              className="value-card group p-6 md:p-8 border border-white/10 hover:border-white/30 transition-all duration-500 opacity-0"
            >
              <div className="mb-6">
                <value.icon className="w-8 h-8 text-white/60 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl md:text-2xl font-medium text-white mb-3">
                {value.title}
              </h3>
              <p className="text-sm md:text-base text-white/50 leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
