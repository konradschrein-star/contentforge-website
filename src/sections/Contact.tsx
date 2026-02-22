import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { contactConfig } from '../config';
import { Send, MapPin, Phone, Building2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  if (!contactConfig.title) return null;

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

      // Form animation
      const trigger3 = ScrollTrigger.create({
        trigger: formRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(
            formRef.current,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: 'expo.out', delay: 0.2 }
          );
        },
        once: true,
      });
      triggersRef.current.push(trigger3);

      // Info animation
      const trigger4 = ScrollTrigger.create({
        trigger: infoRef.current,
        start: 'top 80%',
        onEnter: () => {
          const items = infoRef.current?.querySelectorAll('.info-item');
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
                delay: 0.3,
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Create mailto link with form data
    const subject = `Contact Form: ${formData.name}`;
    const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;
    const mailtoLink = `mailto:${contactConfig.formEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Open mailto link
    window.location.href = mailtoLink;

    setIsSubmitting(false);
    setSubmitMessage('Opening your email client...');
    setFormData({ name: '', email: '', message: '' });

    // Clear message after 3 seconds
    setTimeout(() => setSubmitMessage(''), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative w-full py-24 md:py-32 lg:py-40 bg-black"
    >
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] via-transparent to-white/[0.02] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 md:px-8 relative z-10">
        {/* Section label */}
        <div className="mb-8 md:mb-12">
          <span className="text-xs md:text-sm text-white/40 tracking-[0.3em] uppercase">
            Get in Touch
          </span>
        </div>

        {/* Title */}
        <h2
          ref={titleRef}
          className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold text-white tracking-tight mb-4 md:mb-6 opacity-0"
        >
          {contactConfig.title}
        </h2>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-lg md:text-xl text-white/50 max-w-2xl mb-12 md:mb-16 opacity-0"
        >
          {contactConfig.subtitle}
        </p>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="space-y-6 opacity-0"
          >
            {/* Name Field */}
            <div>
              <label className="block text-sm text-white/60 mb-2">
                {contactConfig.nameLabel}
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-4 bg-white/[0.03] border border-white/10 text-white placeholder-white/30 focus:border-white/30 focus:outline-none focus:bg-white/[0.05] transition-all duration-300"
                placeholder="Your name"
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm text-white/60 mb-2">
                {contactConfig.emailLabel}
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-4 bg-white/[0.03] border border-white/10 text-white placeholder-white/30 focus:border-white/30 focus:outline-none focus:bg-white/[0.05] transition-all duration-300"
                placeholder="your@email.com"
              />
            </div>

            {/* Message Field */}
            <div>
              <label className="block text-sm text-white/60 mb-2">
                {contactConfig.messageLabel}
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-4 bg-white/[0.03] border border-white/10 text-white placeholder-white/30 focus:border-white/30 focus:outline-none focus:bg-white/[0.05] transition-all duration-300 resize-none"
                placeholder="Your message..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
              {isSubmitting ? 'Sending...' : contactConfig.submitButtonText}
            </button>

            {/* Submit Message */}
            {submitMessage && (
              <p className="text-sm text-white/60 text-center">{submitMessage}</p>
            )}
          </form>

          {/* Contact Info */}
          <div ref={infoRef} className="space-y-8">
            {/* Company Name */}
            <div className="info-item opacity-0">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 flex items-center justify-center border border-white/20 flex-shrink-0">
                  <Building2 className="w-4 h-4 text-white/60" />
                </div>
                <div>
                  <h4 className="text-sm text-white/40 uppercase tracking-wider mb-1">
                    Company
                  </h4>
                  <p className="text-lg text-white">{contactConfig.companyName}</p>
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="info-item opacity-0">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 flex items-center justify-center border border-white/20 flex-shrink-0">
                  <MapPin className="w-4 h-4 text-white/60" />
                </div>
                <div>
                  <h4 className="text-sm text-white/40 uppercase tracking-wider mb-1">
                    Address
                  </h4>
                  <p className="text-base text-white/70 whitespace-pre-line">
                    {contactConfig.address}
                  </p>
                </div>
              </div>
            </div>

            {/* Phone */}
            <div className="info-item opacity-0">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 flex items-center justify-center border border-white/20 flex-shrink-0">
                  <Phone className="w-4 h-4 text-white/60" />
                </div>
                <div>
                  <h4 className="text-sm text-white/40 uppercase tracking-wider mb-1">
                    Phone
                  </h4>
                  <a
                    href={`tel:${contactConfig.phone.replace(/\s/g, '')}`}
                    className="text-lg text-white/70 hover:text-white transition-colors duration-300"
                  >
                    {contactConfig.phone}
                  </a>
                </div>
              </div>
            </div>

            {/* Inquiry Text */}
            <div className="info-item opacity-0 pt-6 border-t border-white/10">
              <p className="text-sm text-white/40 leading-relaxed">
                {contactConfig.inquiryText}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
