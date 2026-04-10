/**
 * React Query hooks for ERP/CMS data.
 * Each hook fetches from the Caryaati ERP API and falls back to static data on error.
 */
import { useQuery } from "@tanstack/react-query";
import {
  fetchCars, fetchSiteConfig, fetchBlogPosts, fetchBlogPost,
  fetchTestimonials, fetchFAQs, fetchSpecialOffers, fetchRewardsData,
  fetchRequiredDocuments, fetchLocations, fetchCategories, fetchBrands,
  fetchDashboardSummary, fetchRentals, fetchInvoices, fetchPayments,
  fetchFines, fetchSalikCharges, fetchCustomerProfile,
  type ERPCar, type ERPSiteConfig, type ERPBlogPost, type ERPTestimonial,
  type ERPFAQ, type ERPSpecialOffer, type ERPRewardsData, type ERPDocument,
  type ERPLocation, type ERPDashboardSummary, type ERPRental, type ERPInvoice,
  type ERPPayment, type ERPFine, type ERPSalik, type ERPCustomer,
} from "@/services/erpApi";
import { allCars, categories as staticCategories, brands as staticBrands, type CarData } from "@/data/cars";
import { siteConfig as staticSiteConfig } from "@/config/siteConfig";
import { blogPosts as staticBlogPosts } from "@/data/blogs";

// ── Shared query options ─────────────────────────────────

const defaultOptions = {
  staleTime: 5 * 60 * 1000,    // 5 min
  gcTime: 30 * 60 * 1000,      // 30 min cache
  retry: 1,
  refetchOnWindowFocus: false,
};

// ── Car / Fleet ──────────────────────────────────────────

/** Map ERP car to local CarData format */
const mapErpCar = (c: ERPCar): CarData => ({
  id: c.slug || c.id,
  name: c.name,
  brand: c.brand,
  year: c.year,
  image: c.image,
  images: c.images,
  daily: c.daily,
  weekly: c.weekly,
  monthly: c.monthly,
  seats: c.seats,
  doors: c.doors,
  luggage: c.luggage,
  category: c.category as CarData["category"],
  transmission: c.transmission,
  fuel: c.fuel,
  bodyType: c.bodyType,
  engine: c.engine,
  horsepower: c.horsepower,
  description: c.description,
  features: c.features,
  inStock: c.inStock,
  erpId: c.erpId,
  slug: c.slug,
});

export function useFleetCars() {
  return useQuery<CarData[]>({
    queryKey: ["fleet", "cars"],
    queryFn: async () => {
      const res = await fetchCars();
      return res.cars.map(mapErpCar);
    },
    ...defaultOptions,
    placeholderData: allCars,
  });
}

export function useFleetCategories() {
  return useQuery<string[]>({
    queryKey: ["fleet", "categories"],
    queryFn: fetchCategories,
    ...defaultOptions,
    placeholderData: staticCategories,
  });
}

export function useFleetBrands() {
  return useQuery<string[]>({
    queryKey: ["fleet", "brands"],
    queryFn: fetchBrands,
    ...defaultOptions,
    placeholderData: staticBrands,
  });
}

// ── Site Config ──────────────────────────────────────────

export function useSiteConfig() {
  return useQuery({
    queryKey: ["siteConfig"],
    queryFn: fetchSiteConfig,
    ...defaultOptions,
    placeholderData: staticSiteConfig as unknown as ERPSiteConfig,
  });
}

// ── Blog ─────────────────────────────────────────────────

export function useBlogPosts() {
  return useQuery<ERPBlogPost[]>({
    queryKey: ["blog", "posts"],
    queryFn: fetchBlogPosts,
    ...defaultOptions,
    placeholderData: staticBlogPosts.map((p) => ({
      id: p.id,
      slug: p.id,
      title: p.title,
      excerpt: p.excerpt,
      content: p.content || "",
      image: p.image,
      author: p.author,
      date: p.date,
      readTime: p.readTime,
      tags: p.tags || [p.category],
      metaTitle: p.title,
      metaDescription: p.excerpt,
    })),
  });
}

export function useBlogPost(slug: string) {
  return useQuery<ERPBlogPost>({
    queryKey: ["blog", "post", slug],
    queryFn: () => fetchBlogPost(slug),
    ...defaultOptions,
    enabled: !!slug,
  });
}

// ── Testimonials ─────────────────────────────────────────

export function useTestimonials() {
  return useQuery<ERPTestimonial[]>({
    queryKey: ["testimonials"],
    queryFn: fetchTestimonials,
    ...defaultOptions,
  });
}

// ── FAQs ─────────────────────────────────────────────────

export function useFAQs() {
  return useQuery<ERPFAQ[]>({
    queryKey: ["faqs"],
    queryFn: fetchFAQs,
    ...defaultOptions,
  });
}

// ── Special Offers ───────────────────────────────────────

export function useSpecialOffers() {
  return useQuery<ERPSpecialOffer[]>({
    queryKey: ["specialOffers"],
    queryFn: fetchSpecialOffers,
    ...defaultOptions,
  });
}

// ── Rewards ──────────────────────────────────────────────

export function useRewardsData() {
  return useQuery<ERPRewardsData>({
    queryKey: ["rewards"],
    queryFn: fetchRewardsData,
    ...defaultOptions,
  });
}

// ── Documents ────────────────────────────────────────────

export function useRequiredDocuments() {
  return useQuery<ERPDocument[]>({
    queryKey: ["documents"],
    queryFn: fetchRequiredDocuments,
    ...defaultOptions,
  });
}

// ── Locations ────────────────────────────────────────────

export function useLocations() {
  return useQuery<ERPLocation[]>({
    queryKey: ["locations"],
    queryFn: fetchLocations,
    ...defaultOptions,
  });
}

// ── Customer Dashboard ───────────────────────────────────

export function useDashboardSummary() {
  return useQuery<ERPDashboardSummary>({
    queryKey: ["dashboard", "summary"],
    queryFn: fetchDashboardSummary,
    ...defaultOptions,
  });
}

export function useCustomerRentals() {
  return useQuery<ERPRental[]>({
    queryKey: ["customer", "rentals"],
    queryFn: fetchRentals,
    ...defaultOptions,
  });
}

export function useCustomerInvoices() {
  return useQuery<ERPInvoice[]>({
    queryKey: ["customer", "invoices"],
    queryFn: fetchInvoices,
    ...defaultOptions,
  });
}

export function useCustomerPayments() {
  return useQuery<ERPPayment[]>({
    queryKey: ["customer", "payments"],
    queryFn: fetchPayments,
    ...defaultOptions,
  });
}

export function useCustomerFines() {
  return useQuery<ERPFine[]>({
    queryKey: ["customer", "fines"],
    queryFn: fetchFines,
    ...defaultOptions,
  });
}

export function useCustomerSalik() {
  return useQuery<ERPSalik[]>({
    queryKey: ["customer", "salik"],
    queryFn: fetchSalikCharges,
    ...defaultOptions,
  });
}

export function useCustomerProfile() {
  return useQuery<ERPCustomer>({
    queryKey: ["customer", "profile"],
    queryFn: fetchCustomerProfile,
    ...defaultOptions,
  });
}
