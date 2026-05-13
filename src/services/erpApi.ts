/**
 * Local types & auth helpers for the website.
 *
 * The Caryaati ERP integration has been removed — the site now runs
 * standalone, sourcing fleet/pricing data from Lovable Cloud (managed
 * via the Admin portal). The exported `fetch*` helpers are kept as
 * no-ops so existing call sites continue to type-check; they simply
 * reject and consumers fall back to local/static data.
 */

// ── Auth Types & LocalStorage helpers ─────────────────────────────

export interface ERPCustomer {
  id: string;
  name: string;
  email: string;
  phone: string;
  licenseNo: string;
  emiratesId: string;
  avatarUrl?: string;
  loyaltyPoints: number;
  memberSince: string;
}

export function erpLogout() {
  localStorage.removeItem("erp_token");
  localStorage.removeItem("erp_customer");
}

export function getStoredCustomer(): ERPCustomer | null {
  const stored = localStorage.getItem("erp_customer");
  try {
    return stored ? (JSON.parse(stored) as ERPCustomer) : null;
  } catch {
    return null;
  }
}

export function isLoggedIn(): boolean {
  return !!localStorage.getItem("erp_customer");
}

// ── Domain types (kept for the rest of the app) ──────────────────

export interface ERPDashboardSummary {
  activeRentals: number; totalSpent: number; pendingFines: number;
  salikBalance: number; loyaltyPoints: number; unpaidInvoices: number;
}
export interface ERPRental {
  id: string; carName: string; carImage: string; plateNo: string;
  startDate: string; endDate: string; status: "active" | "completed" | "upcoming";
  dailyRate: number; totalAmount: number;
}
export interface ERPInvoice {
  id: string; invoiceNo: string; date: string; amount: number;
  status: "paid" | "pending" | "overdue"; description: string; pdfUrl?: string;
}
export interface ERPPayment {
  id: string; date: string; amount: number;
  method: "card" | "cash" | "bank_transfer"; reference: string; invoiceNo: string;
}
export interface ERPFine {
  id: string; date: string; type: string; location: string; amount: number;
  status: "paid" | "unpaid" | "disputed"; plateNo: string;
}
export interface ERPSalik {
  id: string; date: string; gate: string; amount: number;
  plateNo: string; tripDirection: string;
}
export interface ERPCar {
  id: string; erpId: string; name: string; brand: string; year: number;
  image: string; images: string[]; daily: number; weekly: number; monthly: number;
  seats: number; doors: number; luggage: number; category: string;
  transmission: string; fuel: string; bodyType: string; engine: string;
  horsepower: number; description: string; features: string[]; inStock: boolean;
  slug: string;
}
export interface ERPSiteConfig {
  branding: { logoUrl: string; footerLogoUrl: string; companyName: string; tagline: string };
  contact: { phone: string; email: string; address: string; mapUrl: string };
  whatsapp: { link: string; displayNumber: string };
  callNow: { link: string; displayNumber: string };
  banners: Record<string, string>;
  heroSlides: { image: string; category: string; title: string; subtitle: string; desc: string }[];
  promos: { icon: string; tag: string; title: string; desc: string; cta: string }[];
  legal: { termsUrl: string; privacyUrl: string };
  fleet: { totalVehicleCount: string; subtitle: string };
  footerLinks: { label: string; href: string }[];
}
export interface ERPBlogPost {
  id: string; slug: string; title: string; excerpt: string; content: string;
  image: string; author: string; date: string; readTime: string;
  tags: string[]; metaTitle: string; metaDescription: string;
}
export interface ERPTestimonial { id: string; name: string; role: string; text: string; rating: number; avatar?: string; }
export interface ERPFAQ { id: string; question: string; answer: string; order: number; }
export interface ERPSpecialOffer { id: string; title: string; description: string; discount: string; validUntil: string; image: string; carIds: string[]; code?: string; }
export interface ERPRewardsTier { name: string; minPoints: number; benefits: string[]; }
export interface ERPRewardsData { points: number; tier: string; tiers: ERPRewardsTier[]; history: { date: string; description: string; points: number }[]; }
export interface ERPDocument { id: string; title: string; description: string; icon: string; required: boolean; }
export interface ERPLocation { id: string; name: string; address: string; lat: number; lng: number; phone: string; hours: string; }

// ── Disabled remote fetchers (kept for type compatibility) ───────
const disabled = (name: string) => () => Promise.reject(new Error(`${name} disabled — running standalone`));

export const fetchDashboardSummary = disabled("fetchDashboardSummary") as () => Promise<ERPDashboardSummary>;
export const fetchCustomerProfile = disabled("fetchCustomerProfile") as () => Promise<ERPCustomer>;
export const fetchRentals = disabled("fetchRentals") as () => Promise<ERPRental[]>;
export const fetchInvoices = disabled("fetchInvoices") as () => Promise<ERPInvoice[]>;
export const fetchPayments = disabled("fetchPayments") as () => Promise<ERPPayment[]>;
export const fetchFines = disabled("fetchFines") as () => Promise<ERPFine[]>;
export const fetchSalikCharges = disabled("fetchSalikCharges") as () => Promise<ERPSalik[]>;
export const fetchCars = disabled("fetchCars") as () => Promise<{ cars: ERPCar[]; total: number }>;
export const fetchCarById = disabled("fetchCarById") as () => Promise<ERPCar>;
export const fetchCategories = disabled("fetchCategories") as () => Promise<string[]>;
export const fetchBrands = disabled("fetchBrands") as () => Promise<string[]>;
export const fetchSiteConfig = disabled("fetchSiteConfig") as () => Promise<ERPSiteConfig>;
export const fetchBlogPosts = disabled("fetchBlogPosts") as () => Promise<ERPBlogPost[]>;
export const fetchBlogPost = disabled("fetchBlogPost") as () => Promise<ERPBlogPost>;
export const fetchTestimonials = disabled("fetchTestimonials") as () => Promise<ERPTestimonial[]>;
export const fetchFAQs = disabled("fetchFAQs") as () => Promise<ERPFAQ[]>;
export const fetchSpecialOffers = disabled("fetchSpecialOffers") as () => Promise<ERPSpecialOffer[]>;
export const fetchRewardsData = disabled("fetchRewardsData") as () => Promise<ERPRewardsData>;
export const fetchRequiredDocuments = disabled("fetchRequiredDocuments") as () => Promise<ERPDocument[]>;
export const fetchLocations = disabled("fetchLocations") as () => Promise<ERPLocation[]>;
