/**
 * Caryaati ERP API Service — Full Integration Layer
 * 
 * All site data is fetched from the Caryaati ERP/CMS system.
 * Replace ERP_BASE_URL with your actual ERP endpoint.
 * 
 * Endpoints covered:
 * - Auth: login, signup, logout
 * - Customer: profile, dashboard, rentals, invoices, payments, fines, salik
 * - Fleet: cars, categories, brands, availability, pricing
 * - CMS: hero slides, promos, banners, site config, blogs, testimonials, FAQ
 * - Booking: create booking, check availability, calculate pricing
 * - Documents: required documents info
 * - Rewards: loyalty program data
 */

const ERP_BASE_URL = "https://www.caryaati.com/erps/api";

// ── Helpers ──────────────────────────────────────────────

const getAuthHeaders = (): HeadersInit => {
  const token = localStorage.getItem("erp_token");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

async function erpFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${ERP_BASE_URL}${endpoint}`, {
    headers: getAuthHeaders(),
    ...options,
  });
  if (!response.ok) {
    throw new Error(`ERP API error: ${response.status} — ${endpoint}`);
  }
  return response.json();
}

async function erpPost<T>(endpoint: string, body: unknown): Promise<T> {
  return erpFetch<T>(endpoint, {
    method: "POST",
    body: JSON.stringify(body),
  });
}

// ── Auth Types & Functions ────────────────────────────────

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

export async function erpLogin(credentials: { email?: string; phone?: string; password: string }): Promise<{ token: string; customer: ERPCustomer }> {
  const data = await erpPost<{ token: string; customer: ERPCustomer }>("/auth/login", credentials);
  localStorage.setItem("erp_token", data.token);
  localStorage.setItem("erp_customer", JSON.stringify(data.customer));
  return data;
}

export async function erpSignup(payload: { name: string; email: string; phone: string; password: string }): Promise<{ token: string; customer: ERPCustomer }> {
  const data = await erpPost<{ token: string; customer: ERPCustomer }>("/auth/signup", payload);
  localStorage.setItem("erp_token", data.token);
  localStorage.setItem("erp_customer", JSON.stringify(data.customer));
  return data;
}

export function erpLogout() {
  localStorage.removeItem("erp_token");
  localStorage.removeItem("erp_customer");
}

export function getStoredCustomer(): ERPCustomer | null {
  const stored = localStorage.getItem("erp_customer");
  return stored ? JSON.parse(stored) : null;
}

export function isLoggedIn(): boolean {
  return !!localStorage.getItem("erp_token");
}

// ── Customer Dashboard ────────────────────────────────────

export interface ERPDashboardSummary {
  activeRentals: number;
  totalSpent: number;
  pendingFines: number;
  salikBalance: number;
  loyaltyPoints: number;
  unpaidInvoices: number;
}

export interface ERPRental {
  id: string;
  carName: string;
  carImage: string;
  plateNo: string;
  startDate: string;
  endDate: string;
  status: "active" | "completed" | "upcoming";
  dailyRate: number;
  totalAmount: number;
}

export interface ERPInvoice {
  id: string;
  invoiceNo: string;
  date: string;
  amount: number;
  status: "paid" | "pending" | "overdue";
  description: string;
  pdfUrl?: string;
}

export interface ERPPayment {
  id: string;
  date: string;
  amount: number;
  method: "card" | "cash" | "bank_transfer";
  reference: string;
  invoiceNo: string;
}

export interface ERPFine {
  id: string;
  date: string;
  type: string;
  location: string;
  amount: number;
  status: "paid" | "unpaid" | "disputed";
  plateNo: string;
}

export interface ERPSalik {
  id: string;
  date: string;
  gate: string;
  amount: number;
  plateNo: string;
  tripDirection: string;
}

export const fetchDashboardSummary = () => erpFetch<ERPDashboardSummary>("/customer/dashboard");
export const fetchCustomerProfile = () => erpFetch<ERPCustomer>("/customer/profile");
export const fetchRentals = () => erpFetch<ERPRental[]>("/customer/rentals");
export const fetchInvoices = () => erpFetch<ERPInvoice[]>("/customer/invoices");
export const fetchPayments = () => erpFetch<ERPPayment[]>("/customer/payments");
export const fetchFines = () => erpFetch<ERPFine[]>("/customer/fines");
export const fetchSalikCharges = () => erpFetch<ERPSalik[]>("/customer/salik");

// ── Fleet / Cars (CMS-driven) ─────────────────────────────

export interface ERPCar {
  id: string;
  erpId: string;
  name: string;
  brand: string;
  year: number;
  image: string;
  images: string[];
  daily: number;
  weekly: number;
  monthly: number;
  seats: number;
  doors: number;
  luggage: number;
  category: string;
  transmission: string;
  fuel: string;
  bodyType: string;
  engine: string;
  horsepower: number;
  description: string;
  features: string[];
  inStock: boolean;
  slug: string;
}

export interface ERPCarFilters {
  category?: string;
  brand?: string;
  minDaily?: number;
  maxDaily?: number;
  seats?: number;
  inStock?: boolean;
  sort?: "cheapest" | "expensive" | "newest" | "popular";
  page?: number;
  limit?: number;
}

/** Fetch all cars from ERP with optional filters */
export const fetchCars = (filters?: ERPCarFilters) => {
  const params = new URLSearchParams();
  if (filters) {
    Object.entries(filters).forEach(([key, val]) => {
      if (val !== undefined) params.set(key, String(val));
    });
  }
  const query = params.toString() ? `?${params.toString()}` : "";
  return erpFetch<{ cars: ERPCar[]; total: number }>(`/fleet/cars${query}`);
};

/** Fetch single car details */
export const fetchCarById = (id: string) => erpFetch<ERPCar>(`/fleet/cars/${id}`);

/** Check car availability for given dates */
export const checkAvailability = (carId: string, pickup: string, returnDate: string) =>
  erpFetch<{ available: boolean; price: number }>(`/fleet/availability?carId=${carId}&pickup=${pickup}&return=${returnDate}`);

/** Get fleet categories from ERP */
export const fetchCategories = () => erpFetch<string[]>("/fleet/categories");

/** Get fleet brands from ERP */
export const fetchBrands = () => erpFetch<string[]>("/fleet/brands");

// ── Booking ───────────────────────────────────────────────

export interface ERPBookingRequest {
  carId: string;
  pickupDate: string;
  returnDate: string;
  pickupLocation: string;
  returnLocation: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  extras?: string[];
}

export interface ERPBookingResponse {
  bookingId: string;
  status: "confirmed" | "pending" | "rejected";
  totalAmount: number;
  confirmationUrl?: string;
}

/** Create a booking via ERP */
export const createBooking = (booking: ERPBookingRequest) =>
  erpPost<ERPBookingResponse>("/bookings/create", booking);

/** Calculate pricing for a booking */
export const calculatePricing = (carId: string, pickup: string, returnDate: string) =>
  erpFetch<{ daily: number; total: number; discount: number; vat: number }>(`/bookings/pricing?carId=${carId}&pickup=${pickup}&return=${returnDate}`);

// ── CMS Content (Site Config) ─────────────────────────────

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

/** Fetch entire site config from ERP CMS */
export const fetchSiteConfig = () => erpFetch<ERPSiteConfig>("/cms/site-config");

// ── Blog (CMS) ────────────────────────────────────────────

export interface ERPBlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  date: string;
  readTime: string;
  tags: string[];
  metaTitle: string;
  metaDescription: string;
}

/** Fetch all blog posts from ERP CMS */
export const fetchBlogPosts = () => erpFetch<ERPBlogPost[]>("/cms/blogs");

/** Fetch single blog post */
export const fetchBlogPost = (slug: string) => erpFetch<ERPBlogPost>(`/cms/blogs/${slug}`);

// ── Testimonials (CMS) ───────────────────────────────────

export interface ERPTestimonial {
  id: string;
  name: string;
  role: string;
  text: string;
  rating: number;
  avatar?: string;
}

export const fetchTestimonials = () => erpFetch<ERPTestimonial[]>("/cms/testimonials");

// ── FAQ (CMS) ─────────────────────────────────────────────

export interface ERPFAQ {
  id: string;
  question: string;
  answer: string;
  order: number;
}

export const fetchFAQs = () => erpFetch<ERPFAQ[]>("/cms/faqs");

// ── Special Offers (CMS) ─────────────────────────────────

export interface ERPSpecialOffer {
  id: string;
  title: string;
  description: string;
  discount: string;
  validUntil: string;
  image: string;
  carIds: string[];
  code?: string;
}

export const fetchSpecialOffers = () => erpFetch<ERPSpecialOffer[]>("/cms/special-offers");

// ── Rewards / Loyalty ─────────────────────────────────────

export interface ERPRewardsTier {
  name: string;
  minPoints: number;
  benefits: string[];
}

export interface ERPRewardsData {
  points: number;
  tier: string;
  tiers: ERPRewardsTier[];
  history: { date: string; description: string; points: number }[];
}

export const fetchRewardsData = () => erpFetch<ERPRewardsData>("/customer/rewards");

// ── Documents Info (CMS) ──────────────────────────────────

export interface ERPDocument {
  id: string;
  title: string;
  description: string;
  icon: string;
  required: boolean;
}

export const fetchRequiredDocuments = () => erpFetch<ERPDocument[]>("/cms/documents");

// ── Contact / Enquiry ─────────────────────────────────────

export interface ERPContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

/** Submit contact form to ERP */
export const submitContactForm = (form: ERPContactForm) =>
  erpPost<{ success: boolean; ticketId?: string }>("/contact/submit", form);

// ── Locations ─────────────────────────────────────────────

export interface ERPLocation {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  phone: string;
  hours: string;
}

export const fetchLocations = () => erpFetch<ERPLocation[]>("/locations");
