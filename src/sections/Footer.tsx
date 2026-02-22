import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { footerConfig, navigationConfig } from '../config';
import { ArrowUp } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  if (!footerConfig.copyright) return null;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content animation
      ScrollTrigger.create({
        trigger: contentRef.current,
        start: 'top 90%',
        onEnter: () => {
          const items = contentRef.current?.querySelectorAll('.footer-item');
          if (items) {
            gsap.fromTo(
              items,
              { y: 30, opacity: 0 },
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
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      ref={footerRef}
      className="relative w-full bg-black border-t border-white/10"
    >
      {/* Marquee */}
      <div
        ref={marqueeRef}
        className="py-8 md:py-12 border-b border-white/10 overflow-hidden"
      >
        <div className="marquee-container">
          <div className="marquee-content">
            <span className="text-4xl md:text-6xl lg:text-7xl font-medium text-white/10 tracking-tight mx-8">
              {footerConfig.marqueeText}
            </span>
            <span className="text-4xl md:text-6xl lg:text-7xl font-medium text-white/10 tracking-tight mx-8">
              {footerConfig.marqueeText}
            </span>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div
        ref={contentRef}
        className="max-w-6xl mx-auto px-6 md:px-8 py-12 md:py-16"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">
          {/* Logo & Tagline */}
          <div className="footer-item md:col-span-2 opacity-0">
            <a
              href="#hero"
              onClick={(e) => handleNavClick(e, '#hero')}
              className="text-2xl md:text-3xl font-semibold text-white tracking-tight hover:text-white/80 transition-colors duration-300"
            >
              {navigationConfig.logo}
            </a>
            <p className="mt-4 text-sm text-white/40 max-w-xs">
              {footerConfig.tagline}
            </p>
          </div>

          {/* Navigation Links 1 */}
          <div className="footer-item opacity-0">
            <h4 className="text-sm text-white/40 uppercase tracking-wider mb-4">
              Navigation
            </h4>
            <ul className="space-y-3">
              {footerConfig.navLinks1.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-sm text-white/60 hover:text-white transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation Links 2 */}
          <div className="footer-item opacity-0">
            <h4 className="text-sm text-white/40 uppercase tracking-wider mb-4">
              More
            </h4>
            <ul className="space-y-3">
              {footerConfig.navLinks2.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-sm text-white/60 hover:text-white transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-item mt-12 md:mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 opacity-0">
          {/* Copyright */}
          <p className="text-sm text-white/30">
            {footerConfig.copyright}
          </p>

          {/* Legal Links */}
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-sm text-white/30 hover:text-white/60 transition-colors duration-300"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-sm text-white/30 hover:text-white/60 transition-colors duration-300"
            >
              Impressum
            </a>
          </div>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="w-10 h-10 flex items-center justify-center border border-white/20 hover:border-white/40 hover:bg-white/[0.05] transition-all duration-300 group"
          >
            <ArrowUp className="w-4 h-4 text-white/40 group-hover:text-white/70 transition-colors duration-300" />
          </button>
        </div>
      </div>
    </footer>
  );
}
