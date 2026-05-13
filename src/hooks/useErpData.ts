/**
 * Data hooks for the website.
 *
 * The Caryaati ERP integration has been removed. The site is now standalone:
 *   - Fleet cars come from the Lovable Cloud `cars` table (managed via Admin).
 *   - Site config, blog posts, FAQs, etc. come from local static data.
 *   - Customer-dashboard hooks return `undefined` so pages use their demo fallbacks.
 */
import { useQuery } from "@tanstack/react-query";
import type {
  ERPSiteConfig, ERPBlogPost, ERPTestimonial, ERPFAQ, ERPSpecialOffer,
  ERPRewardsData, ERPDocument, ERPLocation, ERPDashboardSummary,
  ERPRental, ERPInvoice, ERPPayment, ERPFine, ERPSalik, ERPCustomer,
} from "@/services/erpApi";
import {
  allCars, categories as staticCategories, brands as staticBrands, type CarData,
} from "@/data/cars";
import { siteConfig as staticSiteConfig } from "@/config/siteConfig";
import { blogPosts as staticBlogPosts } from "@/data/blogs";
import { supabase as supabaseClient } from "@/integrations/supabase/client";

const defaultOptions = {
  staleTime: 5 * 60 * 1000,
  gcTime: 30 * 60 * 1000,
  retry: 0,
  refetchOnWindowFocus: false,
};

// ── Helpers ──────────────────────────────────────────────

const mapAdminCar = (c: any): CarData => {
  const catRaw = String(c.category || "sedan").toLowerCase();
  const catMap: Record<string, CarData["category"]> = {
    sedan: "Sedan", suv: "SUV", luxury: "Luxury", economy: "Economy",
    sports: "Luxury", "special-offers": "Sedan",
  };
  return {
    id: c.id,
    name: c.name,
    brand: c.brand,
    year: c.year,
    image: c.image || "",
    images: Array.isArray(c.images) && c.images.length ? c.images : (c.image ? [c.image] : []),
    daily: Number(c.daily) || 0,
    weekly: Number(c.weekly) || 0,
    monthly: Number(c.monthly) || 0,
    seats: c.seats ?? 5,
    doors: c.doors ?? 4,
    luggage: 2,
    category: catMap[catRaw] || "Sedan",
    transmission: c.transmission || "Automatic",
    fuel: c.fuel || "Petrol",
    bodyType: catMap[catRaw] || "Sedan",
    engine: "",
    horsepower: 0,
    description: c.description || "",
    features: Array.isArray(c.features) ? c.features : [],
    inStock: c.in_stock ?? true,
    erpId: c.id,
    slug: c.id,
    // @ts-expect-error — extra flag used for category filtering
    rawCategory: catRaw,
  };
};

// ── Fleet (Supabase-backed) ──────────────────────────────

export function useFleetCars() {
  return useQuery<CarData[]>({
    queryKey: ["fleet", "cars"],
    queryFn: async () => {
      const res = await supabaseClient
        .from("cars")
        .select("*")
        .order("created_at", { ascending: false });
      if (res.error) throw res.error;
      return (res.data || []).map(mapAdminCar);
    },
    ...defaultOptions,
    placeholderData: allCars,
    initialData: allCars,
  });
}

export function useFleetCategories() {
  return useQuery<string[]>({
    queryKey: ["fleet", "categories"],
    queryFn: async () => [...staticCategories] as string[],
    ...defaultOptions,
    initialData: [...staticCategories] as string[],
  });
}

export function useFleetBrands() {
  return useQuery<string[]>({
    queryKey: ["fleet", "brands"],
    queryFn: async () => staticBrands,
    ...defaultOptions,
    initialData: staticBrands,
  });
}

// ── Site / CMS (static) ──────────────────────────────────

export function useSiteConfig() {
  return useQuery({
    queryKey: ["siteConfig"],
    queryFn: async () => staticSiteConfig as unknown as ERPSiteConfig,
    ...defaultOptions,
    initialData: staticSiteConfig as unknown as ERPSiteConfig,
  });
}

export function useBlogPosts() {
  const fallback = staticBlogPosts.map((p) => ({
    id: p.id, slug: p.id, title: p.title, excerpt: p.excerpt,
    content: p.content || "", image: p.image, author: p.author,
    date: p.date, readTime: p.readTime, tags: p.tags || [p.category],
    metaTitle: p.title, metaDescription: p.excerpt,
  })) as ERPBlogPost[];
  return useQuery<ERPBlogPost[]>({
    queryKey: ["blog", "posts"],
    queryFn: async () => fallback,
    ...defaultOptions,
    initialData: fallback,
  });
}

export function useBlogPost(slug: string) {
  const post = staticBlogPosts.find((p) => p.id === slug);
  const fallback: ERPBlogPost | undefined = post
    ? {
        id: post.id, slug: post.id, title: post.title, excerpt: post.excerpt,
        content: post.content || "", image: post.image, author: post.author,
        date: post.date, readTime: post.readTime, tags: post.tags || [post.category],
        metaTitle: post.title, metaDescription: post.excerpt,
      }
    : undefined;
  return useQuery<ERPBlogPost | undefined>({
    queryKey: ["blog", "post", slug],
    queryFn: async () => fallback,
    ...defaultOptions,
    enabled: !!slug,
    initialData: fallback,
  });
}

export function useTestimonials() {
  return useQuery<ERPTestimonial[]>({
    queryKey: ["testimonials"],
    queryFn: async () => [],
    ...defaultOptions,
    initialData: [],
  });
}

export function useFAQs() {
  return useQuery<ERPFAQ[]>({
    queryKey: ["faqs"],
    queryFn: async () => [],
    ...defaultOptions,
    initialData: [],
  });
}

export function useSpecialOffers() {
  return useQuery<ERPSpecialOffer[]>({
    queryKey: ["specialOffers"],
    queryFn: async () => [],
    ...defaultOptions,
    initialData: [],
  });
}

export function useRewardsData() {
  return useQuery<ERPRewardsData | undefined>({
    queryKey: ["rewards"],
    queryFn: async () => undefined,
    ...defaultOptions,
  });
}

export function useRequiredDocuments() {
  return useQuery<ERPDocument[]>({
    queryKey: ["documents"],
    queryFn: async () => [],
    ...defaultOptions,
    initialData: [],
  });
}

export function useLocations() {
  return useQuery<ERPLocation[]>({
    queryKey: ["locations"],
    queryFn: async () => [],
    ...defaultOptions,
    initialData: [],
  });
}

// ── Customer dashboard (no remote source — pages use demo data) ──

export function useDashboardSummary() {
  return useQuery<ERPDashboardSummary | undefined>({
    queryKey: ["dashboard", "summary"],
    queryFn: async () => undefined,
    ...defaultOptions,
  });
}
export function useCustomerRentals() {
  return useQuery<ERPRental[] | undefined>({
    queryKey: ["customer", "rentals"],
    queryFn: async () => undefined,
    ...defaultOptions,
  });
}
export function useCustomerInvoices() {
  return useQuery<ERPInvoice[] | undefined>({
    queryKey: ["customer", "invoices"],
    queryFn: async () => undefined,
    ...defaultOptions,
  });
}
export function useCustomerPayments() {
  return useQuery<ERPPayment[] | undefined>({
    queryKey: ["customer", "payments"],
    queryFn: async () => undefined,
    ...defaultOptions,
  });
}
export function useCustomerFines() {
  return useQuery<ERPFine[] | undefined>({
    queryKey: ["customer", "fines"],
    queryFn: async () => undefined,
    ...defaultOptions,
  });
}
export function useCustomerSalik() {
  return useQuery<ERPSalik[] | undefined>({
    queryKey: ["customer", "salik"],
    queryFn: async () => undefined,
    ...defaultOptions,
  });
}
export function useCustomerProfile() {
  return useQuery<ERPCustomer | undefined>({
    queryKey: ["customer", "profile"],
    queryFn: async () => undefined,
    ...defaultOptions,
  });
}
