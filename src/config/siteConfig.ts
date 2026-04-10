/**
 * Site Configuration — Caryaati ERP/CMS Editable
 * 
 * This entire config is designed to be fetched from your Caryaati ERP system.
 * Replace the static values below with API calls to your ERP endpoints.
 * 
 * ERP Integration:
 * - GET /api/site-config → returns this entire config object
 * - PUT /api/site-config → update any field from the ERP admin panel
 * 
 * All texts, images, links, and CTAs across the website are controlled from here.
 */

export interface SiteConfig {
  /** Company branding */
  branding: {
    /** Logo image URL — editable from ERP */
    logoUrl: string;
    /** Footer logo URL — editable from ERP */
    footerLogoUrl: string;
    /** Company name */
    companyName: string;
    /** Tagline shown in footer */
    tagline: string;
  };

  /** Contact information */
  contact: {
    phone: string;
    email: string;
    address: string;
    mapUrl: string;
  };

  /** WhatsApp CTA config — editable from ERP */
  whatsapp: {
    /** Full WhatsApp link with number and pre-written text */
    link: string;
    /** Phone number for display */
    displayNumber: string;
  };

  /** Call CTA config */
  callNow: {
    /** tel: link */
    link: string;
    displayNumber: string;
  };

  /** Banner images — editable from ERP */
  banners: {
    /** Home page hero background */
    heroBg: string;
    /** Home page "Exclusive Deals" section background */
    promoBannerBg: string;
    /** Fleet page banner */
    fleetBannerBg: string;
    /** Special offers page banner */
    specialOffersBannerBg: string;
    /** Rewards page banner */
    rewardsBannerBg: string;
  };

  /** Hero slides — editable from ERP */
  heroSlides: {
    image: string;
    category: string;
    title: string;
    subtitle: string;
    desc: string;
  }[];

  /** Promo offers — editable from ERP */
  promos: {
    tag: string;
    title: string;
    desc: string;
    cta: string;
    icon: "gift" | "percent" | "tag";
  }[];

  /** Legal links */
  legal: {
    termsUrl: string;
    privacyUrl: string;
  };

  /** Fleet page config */
  fleet: {
    totalVehicleCount: string;
    subtitle: string;
  };

  /** Footer quick links */
  footerLinks: {
    label: string;
    href: string;
  }[];
}

/**
 * Default site configuration — replace with ERP API fetch
 * 
 * To integrate with Caryaati ERP:
 * ```ts
 * const response = await fetch('https://www.caryaati.com/erps/api/site-config');
 * const config: SiteConfig = await response.json();
 * ```
 */
export const siteConfig: SiteConfig = {
  branding: {
    logoUrl: "/logo.png",
    footerLogoUrl: "https://www.caryaati.com/erps/images/website/company_logos/logo_3.png",
    companyName: "Al Emad Rent A Car",
    tagline: "Premium car rental services in Dubai. Economy to luxury at unbeatable prices.",
  },

  contact: {
    phone: "+971 4 557 3386",
    email: "info@alemad.ae",
    address: "JLT, Platinum Tower, Dubai",
    mapUrl: "https://maps.google.com/?q=JLT+Platinum+Tower+Dubai",
  },

  whatsapp: {
    link: "https://wa.me/971545251241?text=Hi%2C%20I%27m%20interested%20in%20renting%20a%20car.%20Can%20you%20provide%20more%20details%3F",
    displayNumber: "+971 54 525 1241",
  },

  callNow: {
    link: "tel:+97145573386",
    displayNumber: "+971 4 557 3386",
  },

  banners: {
    heroBg: "",
    promoBannerBg: "https://www.caryaati.com/erps/images/website/slider_banners/car_pages_banner_1_804.png",
    fleetBannerBg: "https://www.caryaati.com/erps/images/website/slider_banners/car_pages_banner_1_804.png",
    specialOffersBannerBg: "https://www.caryaati.com/erps/images/website/slider_banners/car_pages_banner_1_804.png",
    rewardsBannerBg: "",
  },

  heroSlides: [
    {
      image: "https://www.caryaati.com/erps/admin/images/model/model_sp_1140_201.png",
      category: "Sedan",
      title: "Affordable Daily Rentals",
      subtitle: "From AED 90/day",
      desc: "The all-new Mazda 3 2025 — stylish, fuel-efficient, and perfect for Dubai city driving.",
    },
    {
      image: "https://www.caryaati.com/erps/admin/images/model/model_sp_1133_312.png",
      category: "Economy",
      title: "Smart & Economical",
      subtitle: "From AED 80/day",
      desc: "Geely Emgrand 2025 — a spacious, modern sedan at unbeatable rates with full insurance.",
    },
    {
      image: "https://www.pngmart.com/files/22/Hyundai-Santa-Fe-PNG-Isolated-HD.png",
      category: "SUV",
      title: "Spacious Family SUVs",
      subtitle: "From AED 170/day",
      desc: "Hyundai SantaFe 2022 — 7-seater comfort for family trips and weekend adventures.",
    },
    {
      image: "https://www.caryaati.com/erps/admin/images/model/model_sp_620_819.png",
      category: "SUV",
      title: "Turbocharged Compact SUV",
      subtitle: "From AED 120/day",
      desc: "Kia Seltos 2023 — turbocharged performance, dual screens, and bold design for Dubai roads.",
    },
  ],

  promos: [
    {
      icon: "gift",
      tag: "Limited Time",
      title: "Rent 5 Days, Get 2 Days FREE",
      desc: "Book any car for 5 days and enjoy 2 additional days absolutely free. Perfect for weekly trips around Dubai.",
      cta: "Book Now",
    },
    {
      icon: "percent",
      tag: "Monthly Deal",
      title: "15% OFF Monthly Rentals",
      desc: "Save big on long-term rentals. Get 15% off when you book any vehicle for a full month or more.",
      cta: "Claim Offer",
    },
    {
      icon: "tag",
      tag: "New Customers",
      title: "First Rental? Get AED 50 Off",
      desc: "Welcome to Al Emad! Use your first-time discount on any car in our fleet. No minimum booking required.",
      cta: "Get Discount",
    },
  ],

  legal: {
    termsUrl: "https://alemad.ae/terms-and-conditions/",
    privacyUrl: "https://alemad.ae/privacy-policy/",
  },

  fleet: {
    totalVehicleCount: "900+",
    subtitle: "Browse our complete collection of 900+ vehicles.",
  },

  footerLinks: [
    { label: "Our Fleet", href: "/fleet" },
    { label: "Rewards", href: "/rewards" },
    { label: "Documents", href: "/documents" },
    { label: "Contact", href: "/contact" },
  ],
};
