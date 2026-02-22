import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { heroConfig } from '../config';
import { ArrowDown, Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const copyrightRef = useRef<HTMLDivElement>(null);
  const [, setLoaded] = useState(false);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  if (!heroConfig.title) return null;

  useEffect(() => {
    // Entry animation on load
    const tl = gsap.timeline({ delay: 0.2 });

    // Title characters animation
    if (titleRef.current) {
      const chars = titleRef.current.querySelectorAll('.char');
      tl.fromTo(
        chars,
        { rotateY: -90, y: 60, opacity: 0 },
        {
          rotateY: 0,
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.03,
          ease: 'back.out(1.7)',
        }
      );
    }

    // Subtitle blur reveal
    tl.fromTo(
      subtitleRef.current,
      { filter: 'blur(20px)', opacity: 0 },
      { filter: 'blur(0px)', opacity: 1, duration: 0.8, ease: 'power2.out' },
      '-=0.4'
    );

    // CTA buttons
    tl.fromTo(
      ctaRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: 'expo.out' },
      '-=0.4'
    );

    // Services slide in
    tl.fromTo(
      servicesRef.current,
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.7, ease: 'expo.out' },
      '-=0.5'
    );

    // Line grow
    tl.fromTo(
      lineRef.current,
      { height: 0 },
      { height: 120, duration: 1.2, ease: 'expo.inOut' },
      '-=0.8'
    );

    // Copyright fade
    tl.fromTo(
      copyrightRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
      '-=0.8'
    );

    setLoaded(true);

    // Scroll effects
    const trigger1 = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: '50% top',
      scrub: 1,
      onUpdate: (self) => {
        if (titleRef.current) {
          gsap.set(titleRef.current, {
            opacity: 1 - self.progress * 0.8,
          });
        }
      },
    });
    triggersRef.current.push(trigger1);

    const trigger2 = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: '30% top',
      scrub: 1,
      onUpdate: (self) => {
        if (titleRef.current) {
          gsap.set(titleRef.current, {
            rotateX: -10 * self.progress,
            z: -80 * self.progress,
          });
        }
      },
    });
    triggersRef.current.push(trigger2);

    const trigger3 = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: '10% top',
      end: '40% top',
      scrub: 1,
      onUpdate: (self) => {
        if (subtitleRef.current) {
          gsap.set(subtitleRef.current, {
            opacity: 1 - self.progress,
            y: -30 * self.progress,
          });
        }
      },
    });
    triggersRef.current.push(trigger3);

    return () => {
      tl.kill();
      triggersRef.current.forEach((t) => t.kill());
      triggersRef.current = [];
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Split title into words for animation
  const titleWords = heroConfig.title.split(' ');

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen w-full overflow-hidden perspective-container bg-black"
      style={{ perspective: '1200px' }}
    >
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Content container */}
      <div
        className="relative z-20 min-h-screen w-full flex flex-col justify-center items-center px-6 md:px-8"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Main title */}
        <h1
          ref={titleRef}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold text-white tracking-tight mb-6 md:mb-8 text-center max-w-6xl preserve-3d leading-tight"
          style={{
            willChange: 'transform',
          }}
        >
          {titleWords.map((word, wordIndex) => (
            <span key={wordIndex} className="inline-block mr-[0.25em]">
              {word.split('').map((char, i) => (
                <span
                  key={i}
                  className="char inline-block"
                >
                  {char}
                </span>
              ))}
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-lg md:text-xl lg:text-2xl font-light text-white/70 tracking-wide text-center max-w-3xl mb-10 md:mb-12"
          style={{ willChange: 'filter, opacity' }}
        >
          {heroConfig.subtitle}
        </p>

        {/* CTA Buttons */}
        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row gap-4 sm:gap-6"
        >
          <a
            href="#archive"
            onClick={(e) => handleNavClick(e, '#archive')}
            className="btn-primary flex items-center justify-center gap-2"
          >
            <ArrowDown className="w-4 h-4" />
            {heroConfig.ctaPrimary}
          </a>
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="btn-outline flex items-center justify-center gap-2"
          >
            <Mail className="w-4 h-4" />
            {heroConfig.ctaSecondary}
          </a>
        </div>

        {/* Decorative accent line */}
        <div
          className="absolute left-1/2 bottom-32 w-px bg-white/30 z-30"
          ref={lineRef}
          style={{
            transform: 'translateX(-50%)',
            willChange: 'height',
          }}
        />
      </div>

      {/* Services label - vertical left */}
      <div
        ref={servicesRef}
        className="absolute left-4 md:left-8 bottom-32 z-30 flex flex-col items-center gap-4"
        style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
      >
        <span className="text-xs md:text-sm text-white/40 tracking-[0.3em] uppercase">
          {heroConfig.servicesLabel}
        </span>
      </div>

      {/* Copyright - bottom right */}
      <div
        ref={copyrightRef}
        className="absolute right-4 md:right-8 bottom-8 z-30"
      >
        <span className="text-xs md:text-sm text-white/30">{heroConfig.copyright}</span>
      </div>
    </section>
  );
}
