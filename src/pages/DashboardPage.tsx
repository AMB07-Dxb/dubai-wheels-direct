import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Car, FileText, CreditCard, AlertTriangle, Navigation, User,
  LogOut, Download, CheckCircle, XCircle
} from "lucide-react";
import {
  isLoggedIn, getStoredCustomer, erpLogout,
  type ERPCustomer, type ERPRental, type ERPInvoice,
  type ERPPayment, type ERPFine, type ERPSalik
} from "@/services/erpApi";
import {
  useCustomerRentals, useCustomerInvoices, useCustomerPayments,
  useCustomerFines, useCustomerSalik, useCustomerProfile,
} from "@/hooks/useErpData";

// Fallback demo data — shown when ERP is not connected
const demoCustomer: ERPCustomer = {
  id: "1", name: "Ahmed Al Rashid", email: "ahmed@example.com", phone: "+971 52 413 6205",
  licenseNo: "DXB-123456", emiratesId: "784-****-*****-1", avatarUrl: "",
  loyaltyPoints: 2450, memberSince: "2023-06-15",
};

const demoRentals: ERPRental[] = [
  { id: "1", carName: "Mazda 3 2025", carImage: "https://www.caryaati.com/erps/admin/images/model/model_sp_1140_201.png", plateNo: "D 12345", startDate: "2025-01-10", endDate: "2025-01-17", status: "active", dailyRate: 90, totalAmount: 630 },
  { id: "2", carName: "Kia Seltos 2023", carImage: "https://www.caryaati.com/erps/admin/images/model/model_sp_620_819.png", plateNo: "A 67890", startDate: "2024-11-01", endDate: "2024-11-30", status: "completed", dailyRate: 120, totalAmount: 3600 },
];

const demoInvoices: ERPInvoice[] = [
  { id: "1", invoiceNo: "INV-2025-001", date: "2025-01-10", amount: 630, status: "paid", description: "Mazda 3 - 7 days rental" },
  { id: "2", invoiceNo: "INV-2024-089", date: "2024-11-01", amount: 3600, status: "paid", description: "Kia Seltos - Monthly rental" },
  { id: "3", invoiceNo: "INV-2025-002", date: "2025-01-15", amount: 150, status: "pending", description: "Salik charges - January" },
];

const demoPayments: ERPPayment[] = [
  { id: "1", date: "2025-01-10", amount: 630, method: "card", reference: "PAY-001", invoiceNo: "INV-2025-001" },
  { id: "2", date: "2024-11-01", amount: 3600, method: "bank_transfer", reference: "PAY-002", invoiceNo: "INV-2024-089" },
];

const demoFines: ERPFine[] = [
  { id: "1", date: "2025-01-12", type: "Speed", location: "Sheikh Zayed Road", amount: 600, status: "unpaid", plateNo: "D 12345" },
  { id: "2", date: "2024-12-20", type: "Parking", location: "Dubai Mall", amount: 200, status: "paid", plateNo: "A 67890" },
];

const demoSalik: ERPSalik[] = [
  { id: "1", date: "2025-01-15", gate: "Al Maktoum Bridge", amount: 4, plateNo: "D 12345", tripDirection: "Deira → Bur Dubai" },
  { id: "2", date: "2025-01-14", gate: "Al Safa", amount: 4, plateNo: "D 12345", tripDirection: "JBR → Downtown" },
  { id: "3", date: "2025-01-13", gate: "Al Barsha", amount: 4, plateNo: "D 12345", tripDirection: "Marina → MOE" },
];

const StatusBadge = ({ status }: { status: string }) => {
  const colors: Record<string, string> = {
    active: "bg-green-500/10 text-green-600 border-green-500/20",
    completed: "bg-muted text-muted-foreground border-border",
    upcoming: "bg-blue-500/10 text-blue-600 border-blue-500/20",
    paid: "bg-green-500/10 text-green-600 border-green-500/20",
    pending: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
    overdue: "bg-red-500/10 text-red-600 border-red-500/20",
    unpaid: "bg-red-500/10 text-red-600 border-red-500/20",
    disputed: "bg-orange-500/10 text-orange-600 border-orange-500/20",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full border ${colors[status] || "bg-muted text-muted-foreground"}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

const SummaryCard = ({ icon: Icon, label, value, sub }: { icon: React.ElementType; label: string; value: string; sub?: string }) => (
  <div className="bg-background rounded-2xl border border-border p-5 hover:shadow-md transition-shadow">
    <div className="flex items-center gap-3 mb-3">
      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
    <p className="text-2xl font-bold text-foreground">{value}</p>
    {sub && <p className="text-xs text-muted-foreground mt-1">{sub}</p>}
  </div>
);

const DashboardPage = () => {
  const navigate = useNavigate();

  // React Query hooks with demo fallbacks
  const { data: profileData } = useCustomerProfile();
  const { data: rentalsData, isLoading: rentalsLoading } = useCustomerRentals();
  const { data: invoicesData } = useCustomerInvoices();
  const { data: paymentsData } = useCustomerPayments();
  const { data: finesData } = useCustomerFines();
  const { data: salikData } = useCustomerSalik();

  const customer = profileData || getStoredCustomer() || demoCustomer;
  const rentals = rentalsData || demoRentals;
  const invoices = invoicesData || demoInvoices;
  const payments = paymentsData || demoPayments;
  const fines = finesData || demoFines;
  const salik = salikData || demoSalik;

  const activeRentals = rentals.filter((r) => r.status === "active").length;
  const pendingFines = fines.filter((f) => f.status === "unpaid").reduce((s, f) => s + f.amount, 0);
  const unpaidInvoices = invoices.filter((i) => i.status === "pending" || i.status === "overdue").length;
  const totalSalik = salik.reduce((s, c) => s + c.amount, 0);

  const handleLogout = () => { erpLogout(); navigate("/"); };

  return (
    <div className="min-h-screen bg-muted/30">
      <SEOHead title="My Dashboard | Al Emad Rent A Car" description="Manage your car rentals, invoices, payments and more." />
      <Navbar />

      <div className="pt-20 pb-16">
        <div className="container max-w-6xl mx-auto px-4">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xl font-bold">
                {customer.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-display font-bold text-foreground">Welcome, {customer.name.split(" ")[0]}</h1>
                <p className="text-sm text-muted-foreground">Member since {new Date(customer.memberSince).toLocaleDateString("en-US", { month: "long", year: "numeric" })}</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="gap-2 rounded-xl" onClick={handleLogout}>
              <LogOut className="w-4 h-4" /> Sign Out
            </Button>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <SummaryCard icon={Car} label="Active Rentals" value={String(activeRentals)} sub={`${rentals.length} total`} />
            <SummaryCard icon={AlertTriangle} label="Pending Fines" value={`AED ${pendingFines}`} sub={`${fines.filter((f) => f.status === "unpaid").length} fines`} />
            <SummaryCard icon={FileText} label="Unpaid Invoices" value={String(unpaidInvoices)} />
            <SummaryCard icon={Navigation} label="Salik This Month" value={`AED ${totalSalik}`} sub={`${salik.length} trips`} />
          </div>

          {/* Tabs */}
          <Tabs defaultValue="rentals" className="w-full">
            <TabsList className="w-full justify-start bg-background border border-border rounded-xl p-1 mb-6 flex-wrap h-auto gap-1">
              <TabsTrigger value="rentals" className="rounded-lg gap-1.5 text-xs sm:text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"><Car className="w-4 h-4" /> Rentals</TabsTrigger>
              <TabsTrigger value="invoices" className="rounded-lg gap-1.5 text-xs sm:text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"><FileText className="w-4 h-4" /> Invoices</TabsTrigger>
              <TabsTrigger value="payments" className="rounded-lg gap-1.5 text-xs sm:text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"><CreditCard className="w-4 h-4" /> Payments</TabsTrigger>
              <TabsTrigger value="fines" className="rounded-lg gap-1.5 text-xs sm:text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"><AlertTriangle className="w-4 h-4" /> Fines</TabsTrigger>
              <TabsTrigger value="salik" className="rounded-lg gap-1.5 text-xs sm:text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"><Navigation className="w-4 h-4" /> Salik</TabsTrigger>
              <TabsTrigger value="profile" className="rounded-lg gap-1.5 text-xs sm:text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"><User className="w-4 h-4" /> Profile</TabsTrigger>
            </TabsList>

            <TabsContent value="rentals">
              <div className="space-y-4">
                {rentals.map((r) => (
                  <div key={r.id} className="bg-background rounded-2xl border border-border p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <img src={r.carImage} alt={r.carName} className="w-28 h-20 object-contain rounded-xl bg-muted/50 p-2" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-foreground">{r.carName}</h3>
                        <StatusBadge status={r.status} />
                      </div>
                      <p className="text-sm text-muted-foreground">Plate: {r.plateNo}</p>
                      <p className="text-sm text-muted-foreground">{r.startDate} → {r.endDate}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-foreground">AED {r.totalAmount}</p>
                      <p className="text-xs text-muted-foreground">AED {r.dailyRate}/day</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="invoices">
              <div className="bg-background rounded-2xl border border-border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead><tr className="border-b border-border bg-muted/30">
                      <th className="text-left p-4 font-medium text-muted-foreground">Invoice</th>
                      <th className="text-left p-4 font-medium text-muted-foreground">Date</th>
                      <th className="text-left p-4 font-medium text-muted-foreground hidden sm:table-cell">Description</th>
                      <th className="text-right p-4 font-medium text-muted-foreground">Amount</th>
                      <th className="text-center p-4 font-medium text-muted-foreground">Status</th>
                    </tr></thead>
                    <tbody>
                      {invoices.map((inv) => (
                        <tr key={inv.id} className="border-b border-border last:border-0 hover:bg-muted/20">
                          <td className="p-4 font-medium text-foreground">{inv.invoiceNo}</td>
                          <td className="p-4 text-muted-foreground">{inv.date}</td>
                          <td className="p-4 text-muted-foreground hidden sm:table-cell">{inv.description}</td>
                          <td className="p-4 text-right font-semibold text-foreground">AED {inv.amount}</td>
                          <td className="p-4 text-center"><StatusBadge status={inv.status} /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="payments">
              <div className="bg-background rounded-2xl border border-border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead><tr className="border-b border-border bg-muted/30">
                      <th className="text-left p-4 font-medium text-muted-foreground">Date</th>
                      <th className="text-left p-4 font-medium text-muted-foreground">Reference</th>
                      <th className="text-left p-4 font-medium text-muted-foreground hidden sm:table-cell">Method</th>
                      <th className="text-left p-4 font-medium text-muted-foreground hidden sm:table-cell">Invoice</th>
                      <th className="text-right p-4 font-medium text-muted-foreground">Amount</th>
                    </tr></thead>
                    <tbody>
                      {payments.map((p) => (
                        <tr key={p.id} className="border-b border-border last:border-0 hover:bg-muted/20">
                          <td className="p-4 text-muted-foreground">{p.date}</td>
                          <td className="p-4 font-medium text-foreground">{p.reference}</td>
                          <td className="p-4 text-muted-foreground hidden sm:table-cell capitalize">{p.method.replace("_", " ")}</td>
                          <td className="p-4 text-muted-foreground hidden sm:table-cell">{p.invoiceNo}</td>
                          <td className="p-4 text-right font-semibold text-green-600">AED {p.amount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="fines">
              <div className="space-y-4">
                {fines.map((f) => (
                  <div key={f.id} className="bg-background rounded-2xl border border-border p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${f.status === "unpaid" ? "bg-red-500/10" : "bg-green-500/10"}`}>
                      {f.status === "unpaid" ? <XCircle className="w-6 h-6 text-red-500" /> : <CheckCircle className="w-6 h-6 text-green-500" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-foreground">{f.type} Fine</h3>
                        <StatusBadge status={f.status} />
                      </div>
                      <p className="text-sm text-muted-foreground">{f.location} • Plate: {f.plateNo}</p>
                      <p className="text-xs text-muted-foreground">{f.date}</p>
                    </div>
                    <p className="text-lg font-bold text-foreground">AED {f.amount}</p>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="salik">
              <div className="bg-background rounded-2xl border border-border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead><tr className="border-b border-border bg-muted/30">
                      <th className="text-left p-4 font-medium text-muted-foreground">Date</th>
                      <th className="text-left p-4 font-medium text-muted-foreground">Gate</th>
                      <th className="text-left p-4 font-medium text-muted-foreground hidden sm:table-cell">Direction</th>
                      <th className="text-left p-4 font-medium text-muted-foreground hidden sm:table-cell">Plate</th>
                      <th className="text-right p-4 font-medium text-muted-foreground">Amount</th>
                    </tr></thead>
                    <tbody>
                      {salik.map((s) => (
                        <tr key={s.id} className="border-b border-border last:border-0 hover:bg-muted/20">
                          <td className="p-4 text-muted-foreground">{s.date}</td>
                          <td className="p-4 font-medium text-foreground">{s.gate}</td>
                          <td className="p-4 text-muted-foreground hidden sm:table-cell">{s.tripDirection}</td>
                          <td className="p-4 text-muted-foreground hidden sm:table-cell">{s.plateNo}</td>
                          <td className="p-4 text-right font-semibold text-foreground">AED {s.amount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="profile">
              <div className="bg-background rounded-2xl border border-border p-6 max-w-lg">
                <h3 className="text-lg font-semibold text-foreground mb-6">Personal Information</h3>
                <div className="space-y-4">
                  {[
                    ["Full Name", customer.name],
                    ["Email", customer.email],
                    ["Phone", customer.phone],
                    ["License No.", customer.licenseNo],
                    ["Emirates ID", customer.emiratesId],
                    ["Loyalty Points", String(customer.loyaltyPoints)],
                  ].map(([label, value]) => (
                    <div key={label} className="flex justify-between items-center py-3 border-b border-border last:border-0">
                      <span className="text-sm text-muted-foreground">{label}</span>
                      <span className="text-sm font-medium text-foreground">{value}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-6">
                  Profile data is synced from Caryaati ERP. Contact support to update your details.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DashboardPage;
