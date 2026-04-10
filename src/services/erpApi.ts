/**
 * Caryaati ERP API Service
 * 
 * All customer data is fetched from the Caryaati ERP system.
 * Replace BASE_URL with your actual ERP endpoint.
 * 
 * Authentication: ERP expects a JWT token from customer login.
 * The token is stored in localStorage after successful login.
 */

const ERP_BASE_URL = "https://www.caryaati.com/erps/api";

// Helper to get auth headers
const getAuthHeaders = (): HeadersInit => {
  const token = localStorage.getItem("erp_token");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

// Generic fetch wrapper
async function erpFetch<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${ERP_BASE_URL}${endpoint}`, {
    headers: getAuthHeaders(),
  });
  if (!response.ok) {
    throw new Error(`ERP API error: ${response.status}`);
  }
  return response.json();
}

// ── Types ──────────────────────────────────────────────

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

export interface ERPDashboardSummary {
  activeRentals: number;
  totalSpent: number;
  pendingFines: number;
  salikBalance: number;
  loyaltyPoints: number;
  unpaidInvoices: number;
}

// ── Auth ───────────────────────────────────────────────

export async function erpLogin(credentials: { email?: string; phone?: string; password: string }): Promise<{ token: string; customer: ERPCustomer }> {
  const response = await fetch(`${ERP_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  if (!response.ok) throw new Error("Invalid credentials");
  const data = await response.json();
  localStorage.setItem("erp_token", data.token);
  localStorage.setItem("erp_customer", JSON.stringify(data.customer));
  return data;
}

export async function erpSignup(data: { name: string; email: string; phone: string; password: string }): Promise<{ token: string; customer: ERPCustomer }> {
  const response = await fetch(`${ERP_BASE_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Signup failed");
  const result = await response.json();
  localStorage.setItem("erp_token", result.token);
  localStorage.setItem("erp_customer", JSON.stringify(result.customer));
  return result;
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

// ── Data Fetching ──────────────────────────────────────

export const fetchDashboardSummary = () => erpFetch<ERPDashboardSummary>("/customer/dashboard");
export const fetchCustomerProfile = () => erpFetch<ERPCustomer>("/customer/profile");
export const fetchRentals = () => erpFetch<ERPRental[]>("/customer/rentals");
export const fetchInvoices = () => erpFetch<ERPInvoice[]>("/customer/invoices");
export const fetchPayments = () => erpFetch<ERPPayment[]>("/customer/payments");
export const fetchFines = () => erpFetch<ERPFine[]>("/customer/fines");
export const fetchSalikCharges = () => erpFetch<ERPSalik[]>("/customer/salik");
