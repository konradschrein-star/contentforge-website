// ============================================================================
// Site Configuration
// ============================================================================

export interface SiteConfig {
  title: string;
  description: string;
  language: string;
}

export const siteConfig: SiteConfig = {
  title: "Content Forge LLC | Data-Driven Product Comparisons",
  description: "We analyze, compare, and rank products to help consumers make better buying decisions. Objective product comparison content across social media platforms.",
  language: "en",
};

// ============================================================================
// Navigation Configuration
// ============================================================================

export interface NavItem {
  label: string;
  href: string;
}

export interface NavigationConfig {
  logo: string;
  items: NavItem[];
}

export const navigationConfig: NavigationConfig = {
  logo: "CONTENT FORGE",
  items: [
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Archive", href: "#archive" },
    { label: "Channels", href: "#channels" },
    { label: "Founder", href: "#founder" },
    { label: "Contact", href: "#contact" },
  ],
};

// ============================================================================
// Hero Section Configuration
// ============================================================================

export interface HeroConfig {
  title: string;
  subtitle: string;
  backgroundImage: string;
  servicesLabel: string;
  copyright: string;
  ctaPrimary: string;
  ctaSecondary: string;
}

export const heroConfig: HeroConfig = {
  title: "Data-Driven Product Comparisons.",
  subtitle: "We analyze, compare, and rank products to help consumers make better buying decisions.",
  backgroundImage: "",
  servicesLabel: "ANALYSIS | COMPARISON | RANKING",
  copyright: "© 2025 Content Forge LLC",
  ctaPrimary: "View Comparisons",
  ctaSecondary: "Contact Us",
};

// ============================================================================
// About Section Configuration
// ============================================================================

export interface AboutConfig {
  titleLine1: string;
  titleLine2: string;
  description: string;
  image1: string;
  image1Alt: string;
  image2: string;
  image2Alt: string;
  authorImage: string;
  authorName: string;
  authorBio: string;
}

export const aboutConfig: AboutConfig = {
  titleLine1: "Who We Are",
  titleLine2: "",
  description: "Content Forge LLC is a digital media company focused on producing objective product comparison content across social media platforms. We analyze software, tools, and consumer products, rank them by use case, and explain their strengths and weaknesses clearly and transparently.\n\nWe currently produce educational and tutorial-style content focused on software and operating systems. We are expanding into broader product comparison formats across multiple YouTube channels.\n\nOur goal is clarity, objectivity, and informed consumer decisions.",
  image1: "",
  image1Alt: "",
  image2: "",
  image2Alt: "",
  authorImage: "",
  authorName: "",
  authorBio: "",
};

// ============================================================================
// Services Section Configuration (What We Do)
// ============================================================================

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  image: string;
}

export interface ServicesConfig {
  title: string;
  subtitle: string;
  transparencyNote: string;
  services: ServiceItem[];
}

export const servicesConfig: ServicesConfig = {
  title: "What We Do",
  subtitle: "Objective analysis. Transparent methodology. Informed decisions.",
  transparencyNote: "We earn revenue through Google AdSense and affiliate commissions. These partnerships do not influence our ranking methodology. Our comparisons are structured around defined evaluation criteria.",
  services: [
    {
      id: "01",
      title: "Product Comparisons",
      description: "We compare competing products, analyze features, pricing, performance, and suitability for different use cases.",
      image: "",
    },
    {
      id: "02",
      title: "Ranking & Review Content",
      description: "We produce structured ranking formats such as \"Top 5\" or \"Best for X\" based on objective criteria.",
      image: "",
    },
    {
      id: "03",
      title: "Sponsored Product Reviews",
      description: "Companies can contact us to have their products evaluated and compared transparently against competitors.",
      image: "",
    },
  ],
};

// ============================================================================
// Comparison Archive Section Configuration
// ============================================================================

export interface ComparisonItem {
  id: number;
  title: string;
  summary: string;
  ranking: string;
  category: string;
}

export interface ArchiveConfig {
  title: string;
  subtitle: string;
  note: string;
  items: ComparisonItem[];
}

export const archiveConfig: ArchiveConfig = {
  title: "Comparison Archive",
  subtitle: "Explore our latest product analyses and rankings.",
  note: "This section is currently being expanded. Full comparison documentation will be published here.",
  items: [
    {
      id: 1,
      title: "Video Editing Software 2025",
      summary: "Comprehensive comparison of leading video editing platforms for professionals and beginners.",
      ranking: "DaVinci Resolve #1",
      category: "Software",
    },
    {
      id: 2,
      title: "Antivirus Solutions Compared",
      summary: "Security performance, system impact, and value analysis of top antivirus providers.",
      ranking: "Bitdefender #1",
      category: "Security",
    },
    {
      id: 3,
      title: "VPN Services Ranked",
      summary: "Privacy features, speed tests, and streaming compatibility across major VPN providers.",
      ranking: "NordVPN #1",
      category: "Privacy",
    },
    {
      id: 4,
      title: "Cloud Storage Solutions",
      summary: "Storage capacity, pricing, sync speed, and collaboration features compared.",
      ranking: "pCloud #1",
      category: "Cloud",
    },
  ],
};

// ============================================================================
// YouTube Channels Section Configuration
// ============================================================================

export interface ChannelItem {
  id: number;
  name: string;
  description: string;
  focus: string;
  status: string;
}

export interface ChannelsConfig {
  title: string;
  subtitle: string;
  explanation: string;
  channels: ChannelItem[];
}

export const channelsConfig: ChannelsConfig = {
  title: "Our Channels",
  subtitle: "Multi-platform content across diverse product categories.",
  explanation: "We operate multiple YouTube channels focused on product tutorials, operating systems, and structured comparison formats. Channel links will be added as they launch.",
  channels: [
    {
      id: 1,
      name: "TechCompare",
      description: "Software and operating system comparisons.",
      focus: "Software & OS",
      status: "Coming Soon",
    },
    {
      id: 2,
      name: "ProductRank",
      description: "Consumer product rankings and reviews.",
      focus: "Consumer Products",
      status: "Coming Soon",
    },
    {
      id: 3,
      name: "ToolForge",
      description: "Professional tools and productivity software.",
      focus: "Productivity Tools",
      status: "In Development",
    },
  ],
};

// ============================================================================
// Founder Section Configuration
// ============================================================================

export interface FounderConfig {
  title: string;
  name: string;
  role: string;
  bio: string;
  email: string;
  image: string;
  imageAlt: string;
}

export const founderConfig: FounderConfig = {
  title: "Founder",
  name: "Konrad Schreiner",
  role: "Founder, Content Forge LLC",
  bio: "Konrad founded Content Forge LLC to create structured, transparent comparison content in a digital environment often dominated by marketing-driven recommendations.",
  email: "konrad.schrein@gmail.com",
  image: "",
  imageAlt: "Founder Photo",
};

// ============================================================================
// Contact Section Configuration
// ============================================================================

export interface ContactFormOption {
  value: string;
  label: string;
}

export interface ContactConfig {
  title: string;
  subtitle: string;
  nameLabel: string;
  emailLabel: string;
  messageLabel: string;
  submitButtonText: string;
  companyName: string;
  address: string;
  phone: string;
  inquiryText: string;
  formEmail: string;
}

export const contactConfig: ContactConfig = {
  title: "Contact",
  subtitle: "For business inquiries, sponsorships, or product review requests, please use the form below.",
  nameLabel: "Name *",
  emailLabel: "Email *",
  messageLabel: "Message *",
  submitButtonText: "Send Message",
  companyName: "Content Forge LLC",
  address: "Johann-Meyer-Str.\n01097 Dresden\nGermany",
  phone: "+49 157 85471426",
  inquiryText: "For business inquiries, sponsorships, or product review requests, please use the form above.",
  formEmail: "konrad.shrine@gmail.com",
};

// ============================================================================
// Footer Configuration
// ============================================================================

export interface FooterLink {
  label: string;
  href: string;
  icon?: string;
}

export interface FooterConfig {
  marqueeText: string;
  navLinks1: FooterLink[];
  navLinks2: FooterLink[];
  copyright: string;
  tagline: string;
}

export const footerConfig: FooterConfig = {
  marqueeText: "Objective Analysis. Transparent Rankings. Informed Decisions.",
  navLinks1: [
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Archive", href: "#archive" },
  ],
  navLinks2: [
    { label: "Channels", href: "#channels" },
    { label: "Founder", href: "#founder" },
    { label: "Contact", href: "#contact" },
  ],
  copyright: "© 2025 Content Forge LLC. All rights reserved.",
  tagline: "Data-driven product comparisons.",
};

// ============================================================================
// Legacy configurations (for template compatibility)
// ============================================================================

export interface WorkItem {
  id: number;
  title: string;
  category: string;
  image: string;
}

export interface WorksConfig {
  title: string;
  subtitle: string;
  projects: WorkItem[];
}

export const worksConfig: WorksConfig = {
  title: "",
  subtitle: "",
  projects: [],
};

export interface TestimonialItem {
  id: number;
  name: string;
  title: string;
  quote: string;
  image: string;
}

export interface TestimonialsConfig {
  title: string;
  testimonials: TestimonialItem[];
}

export const testimonialsConfig: TestimonialsConfig = {
  title: "",
  testimonials: [],
};

export interface PricingPlan {
  id: number;
  name: string;
  price: number;
  unit: string;
  featured: boolean;
  features: string[];
}

export interface PricingConfig {
  title: string;
  subtitle: string;
  ctaButtonText: string;
  plans: PricingPlan[];
}

export const pricingConfig: PricingConfig = {
  title: "",
  subtitle: "",
  ctaButtonText: "",
  plans: [],
};

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQConfig {
  title: string;
  faqs: FAQItem[];
}

export const faqConfig: FAQConfig = {
  title: "",
  faqs: [],
};

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  readTime: string;
  date: string;
  image: string;
  category: string;
}

export interface BlogConfig {
  title: string;
  subtitle: string;
  allPostsLabel: string;
  readMoreLabel: string;
  readTimePrefix: string;
  posts: BlogPost[];
}

export const blogConfig: BlogConfig = {
  title: "",
  subtitle: "",
  allPostsLabel: "",
  readMoreLabel: "",
  readTimePrefix: "",
  posts: [],
};
