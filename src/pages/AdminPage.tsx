import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { LogOut, Plus, Pencil, Trash2, Car as CarIcon, Loader2, X, Upload, Users, Image as ImageIcon, Sparkles } from "lucide-react";
import { useFleetCars } from "@/hooks/useErpData";
import logo from "@/assets/logo.png";

type Car = {
  id: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  category: string;
  transmission: string;
  fuel: string;
  seats: number;
  doors: number;
  daily: number;
  weekly: number;
  monthly: number;
  image: string | null;
  images: string[] | null;
  features: string[] | null;
  description: string | null;
  in_stock: boolean;
};

type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  country_code: string | null;
  created_at: string;
};

const CATEGORIES = ["sedan", "suv", "luxury", "economy", "sports", "special-offers"];

const empty: Omit<Car, "id"> = {
  name: "", brand: "", model: "", year: new Date().getFullYear(),
  category: "sedan", transmission: "Automatic", fuel: "Petrol",
  seats: 5, doors: 4, daily: 0, weekly: 0, monthly: 0,
  image: "", images: [], features: [], description: "", in_stock: true,
};

const AdminPage = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState<"fleet" | "customers">("fleet");
  const [cars, setCars] = useState<Car[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Car | (Omit<Car, "id"> & { id?: string }) | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploadingMain, setUploadingMain] = useState(false);
  const [uploadingExtra, setUploadingExtra] = useState(false);
  const mainInputRef = useRef<HTMLInputElement>(null);
  const extraInputRef = useRef<HTMLInputElement>(null);

  const creds = (() => {
    try { return JSON.parse(localStorage.getItem("erp_admin") || "null"); } catch { return null; }
  })();

  useEffect(() => {
    if (!creds) { navigate("/login"); return; }
    load();
  }, []);

  useEffect(() => {
    if (tab === "customers" && creds) loadCustomers();
  }, [tab]);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("cars").select("*").order("created_at", { ascending: false });
    if (error) toast.error(error.message); else setCars(data as Car[]);
    setLoading(false);
  };

  const loadCustomers = async () => {
    try {
      const data = await callAdmin({ action: "list_customers" });
      setCustomers((data as any).customers || []);
    } catch (e: any) { toast.error(e.message); }
  };

  const logout = () => {
    localStorage.removeItem("erp_admin");
    navigate("/");
  };

  const callAdmin = async (body: any) => {
    const { data, error } = await supabase.functions.invoke("admin-cars", {
      body: { ...creds, ...body },
    });
    if (error) throw new Error(error.message);
    if ((data as any)?.error) throw new Error((data as any).error);
    return data;
  };

  const uploadFile = async (file: File): Promise<string> => {
    const ext = file.name.split(".").pop() || "jpg";
    const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const { error } = await supabase.storage.from("car-images").upload(path, file, {
      contentType: file.type, upsert: false,
    });
    if (error) throw error;
    const { data } = supabase.storage.from("car-images").getPublicUrl(path);
    return data.publicUrl;
  };

  const onMainImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editing) return;
    setUploadingMain(true);
    try {
      const url = await uploadFile(file);
      setEditing({ ...(editing as any), image: url });
      toast.success("Main image uploaded");
    } catch (err: any) { toast.error(err.message); }
    finally { setUploadingMain(false); if (mainInputRef.current) mainInputRef.current.value = ""; }
  };

  const onExtraImages = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length || !editing) return;
    setUploadingExtra(true);
    try {
      const urls: string[] = [];
      for (const f of files) urls.push(await uploadFile(f));
      const cur = Array.isArray((editing as any).images) ? (editing as any).images : [];
      setEditing({ ...(editing as any), images: [...cur, ...urls] });
      toast.success(`${urls.length} image(s) uploaded`);
    } catch (err: any) { toast.error(err.message); }
    finally { setUploadingExtra(false); if (extraInputRef.current) extraInputRef.current.value = ""; }
  };

  const removeExtraImage = (url: string) => {
    if (!editing) return;
    const cur = Array.isArray((editing as any).images) ? (editing as any).images : [];
    setEditing({ ...(editing as any), images: cur.filter((u: string) => u !== url) });
  };

  const save = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      const { id, ...payload } = editing as any;
      payload.year = Number(payload.year) || new Date().getFullYear();
      payload.seats = Number(payload.seats) || 5;
      payload.doors = Number(payload.doors) || 4;
      payload.daily = Number(payload.daily) || 0;
      payload.weekly = Number(payload.weekly) || 0;
      payload.monthly = Number(payload.monthly) || 0;
      if (typeof payload.features === "string") payload.features = (payload.features as string).split(",").map((s: string) => s.trim()).filter(Boolean);
      if (!Array.isArray(payload.images)) payload.images = [];

      if (id) await callAdmin({ action: "update", id, car: payload });
      else await callAdmin({ action: "create", car: payload });
      toast.success(id ? "Car updated" : "Car created");
      setEditing(null);
      load();
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this car?")) return;
    try {
      await callAdmin({ action: "delete", id });
      toast.success("Deleted");
      load();
    } catch (e: any) { toast.error(e.message); }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="bg-background border-b border-border sticky top-0 z-10">
        <div className="container flex items-center justify-between py-3">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Al Emad" className="h-9 w-auto" />
            <span className="text-sm font-semibold text-foreground hidden sm:inline">ERP Admin Portal</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground hidden sm:inline">Signed in as <strong>{creds?.username}</strong></span>
            <Button variant="outline" size="sm" onClick={logout}><LogOut className="h-4 w-4 mr-1.5" />Logout</Button>
          </div>
        </div>
      </header>

      <main className="container py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-border">
          <button
            onClick={() => setTab("fleet")}
            className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${tab === "fleet" ? "border-primary text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"}`}
          >
            <CarIcon className="h-4 w-4 inline mr-1.5" />Fleet Management
          </button>
          <button
            onClick={() => setTab("customers")}
            className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${tab === "customers" ? "border-primary text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"}`}
          >
            <Users className="h-4 w-4 inline mr-1.5" />Customers
          </button>
        </div>

        {tab === "fleet" && (
        <>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground flex items-center gap-2"><CarIcon className="h-6 w-6" />Fleet Management</h1>
            <p className="text-sm text-muted-foreground mt-1">{cars.length} cars in inventory</p>
          </div>
          <Button onClick={() => setEditing({ ...empty })}><Plus className="h-4 w-4 mr-1.5" />Add Car</Button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>
        ) : cars.length === 0 ? (
          <div className="text-center py-20 bg-background border border-dashed border-border rounded-xl">
            <CarIcon className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">No cars yet. Add your first one.</p>
          </div>
        ) : (
          <div className="bg-background border border-border rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/50 text-xs uppercase text-muted-foreground">
                  <tr>
                    <th className="text-left p-3">Car</th>
                    <th className="text-left p-3">Year</th>
                    <th className="text-left p-3">Category</th>
                    <th className="text-right p-3">Daily</th>
                    <th className="text-right p-3">Weekly</th>
                    <th className="text-right p-3">Monthly</th>
                    <th className="text-center p-3">Status</th>
                    <th className="text-right p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cars.map((c) => (
                    <tr key={c.id} className="border-t border-border hover:bg-muted/30">
                      <td className="p-3">
                        <div className="flex items-center gap-3">
                          {c.image ? <img src={c.image} alt={c.name} className="h-10 w-14 object-cover rounded" /> : <div className="h-10 w-14 bg-muted rounded" />}
                          <div>
                            <div className="font-medium text-foreground">{c.name}</div>
                            <div className="text-xs text-muted-foreground">{c.brand} · {c.model}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-3">{c.year}</td>
                      <td className="p-3 capitalize">{c.category}</td>
                      <td className="p-3 text-right">AED {c.daily}</td>
                      <td className="p-3 text-right">AED {c.weekly}</td>
                      <td className="p-3 text-right">AED {c.monthly}</td>
                      <td className="p-3 text-center">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${c.in_stock ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                          {c.in_stock ? "Available" : "Unavailable"}
                        </span>
                      </td>
                      <td className="p-3 text-right whitespace-nowrap">
                        <Button variant="ghost" size="icon" onClick={() => setEditing({ ...c, features: (c.features || []) as any, images: (c.images || []) as any })}><Pencil className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon" onClick={() => remove(c.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        </>
        )}

        {tab === "customers" && (
          <>
            <div className="mb-6">
              <h1 className="text-2xl font-display font-bold text-foreground flex items-center gap-2"><Users className="h-6 w-6" />Customer Information</h1>
              <p className="text-sm text-muted-foreground mt-1">{customers.length} registered customers</p>
            </div>
            {customers.length === 0 ? (
              <div className="text-center py-20 bg-background border border-dashed border-border rounded-xl">
                <Users className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">No customers have signed up yet.</p>
              </div>
            ) : (
              <div className="bg-background border border-border rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-muted/50 text-xs uppercase text-muted-foreground">
                      <tr>
                        <th className="text-left p-3">Name</th>
                        <th className="text-left p-3">Email</th>
                        <th className="text-left p-3">Phone</th>
                        <th className="text-left p-3">Joined</th>
                      </tr>
                    </thead>
                    <tbody>
                      {customers.map((c) => (
                        <tr key={c.id} className="border-t border-border hover:bg-muted/30">
                          <td className="p-3 font-medium text-foreground">{c.name}</td>
                          <td className="p-3">{c.email}</td>
                          <td className="p-3">{c.country_code} {c.phone}</td>
                          <td className="p-3 text-muted-foreground">{new Date(c.created_at).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      </main>

      {editing && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => !saving && setEditing(null)}>
          <div className="bg-background rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-5 border-b border-border sticky top-0 bg-background z-10">
              <h2 className="text-lg font-semibold">{(editing as any).id ? "Edit Car" : "Add New Car"}</h2>
              <button onClick={() => setEditing(null)} className="p-1 hover:bg-muted rounded"><X className="h-4 w-4" /></button>
            </div>
            <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
              {([
                ["name", "Name *", "text"],
                ["brand", "Brand *", "text"],
                ["model", "Model *", "text"],
                ["year", "Year", "number"],
                ["transmission", "Transmission", "text"],
                ["fuel", "Fuel", "text"],
                ["seats", "Seats", "number"],
                ["doors", "Doors", "number"],
                ["daily", "Daily Rate (AED)", "number"],
                ["weekly", "Weekly Rate (AED)", "number"],
                ["monthly", "Monthly Rate (AED)", "number"],
              ] as const).map(([key, label, type]) => (
                <div key={key} className="space-y-1.5">
                  <Label className="text-xs">{label}</Label>
                  <Input
                    type={type}
                    value={(editing as any)[key] ?? ""}
                    onChange={(e) => setEditing({ ...(editing as any), [key]: e.target.value })}
                  />
                </div>
              ))}

              {/* Category dropdown */}
              <div className="space-y-1.5">
                <Label className="text-xs">Category</Label>
                <select
                  value={(editing as any).category || "sedan"}
                  onChange={(e) => setEditing({ ...(editing as any), category: e.target.value })}
                  className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>{cat === "special-offers" ? "Special Offers" : cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                  ))}
                </select>
                {(editing as any).category === "special-offers" && (
                  <p className="text-[11px] text-primary">This car will appear on the Special Offers page.</p>
                )}
              </div>

              {/* Main image upload */}
              <div className="space-y-1.5 md:col-span-2">
                <Label className="text-xs">Main Image</Label>
                <div className="flex items-center gap-3">
                  {(editing as any).image ? (
                    <div className="relative">
                      <img src={(editing as any).image} alt="main" className="h-20 w-28 object-cover rounded-lg border border-border" />
                      <button type="button" onClick={() => setEditing({ ...(editing as any), image: "" })} className="absolute -top-1.5 -right-1.5 bg-destructive text-destructive-foreground rounded-full p-0.5">
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ) : (
                    <div className="h-20 w-28 bg-muted rounded-lg flex items-center justify-center text-xs text-muted-foreground">No image</div>
                  )}
                  <Button type="button" variant="outline" size="sm" disabled={uploadingMain} onClick={() => mainInputRef.current?.click()}>
                    {uploadingMain ? <Loader2 className="h-4 w-4 mr-1.5 animate-spin" /> : <Upload className="h-4 w-4 mr-1.5" />}
                    Upload Image
                  </Button>
                  <input ref={mainInputRef} type="file" accept="image/*" className="hidden" onChange={onMainImage} />
                </div>
              </div>

              {/* Additional images upload */}
              <div className="space-y-1.5 md:col-span-2">
                <Label className="text-xs">Additional Images</Label>
                <div className="flex flex-wrap items-center gap-2">
                  {(Array.isArray((editing as any).images) ? (editing as any).images : []).map((url: string) => (
                    <div key={url} className="relative">
                      <img src={url} alt="extra" className="h-16 w-20 object-cover rounded-md border border-border" />
                      <button type="button" onClick={() => removeExtraImage(url)} className="absolute -top-1.5 -right-1.5 bg-destructive text-destructive-foreground rounded-full p-0.5">
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                  <Button type="button" variant="outline" size="sm" disabled={uploadingExtra} onClick={() => extraInputRef.current?.click()}>
                    {uploadingExtra ? <Loader2 className="h-4 w-4 mr-1.5 animate-spin" /> : <Upload className="h-4 w-4 mr-1.5" />}
                    Add Images
                  </Button>
                  <input ref={extraInputRef} type="file" accept="image/*" multiple className="hidden" onChange={onExtraImages} />
                </div>
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <Label className="text-xs">Features (comma-separated)</Label>
                <Input
                  value={Array.isArray((editing as any).features) ? (editing as any).features.join(", ") : ((editing as any).features || "")}
                  onChange={(e) => setEditing({ ...(editing as any), features: e.target.value })}
                  placeholder="Bluetooth, Cruise Control, Sunroof"
                />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <Label className="text-xs">Description</Label>
                <Textarea
                  rows={3}
                  value={(editing as any).description ?? ""}
                  onChange={(e) => setEditing({ ...(editing as any), description: e.target.value })}
                />
              </div>
              <label className="flex items-center gap-2 md:col-span-2 text-sm">
                <input
                  type="checkbox"
                  checked={!!(editing as any).in_stock}
                  onChange={(e) => setEditing({ ...(editing as any), in_stock: e.target.checked })}
                />
                Available for rent
              </label>
            </div>
            <div className="p-5 border-t border-border flex justify-end gap-2 sticky bottom-0 bg-background">
              <Button variant="outline" onClick={() => setEditing(null)} disabled={saving}>Cancel</Button>
              <Button onClick={save} disabled={saving || uploadingMain || uploadingExtra}>
                {saving && <Loader2 className="h-4 w-4 mr-1.5 animate-spin" />}
                {(editing as any).id ? "Save Changes" : "Create Car"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
