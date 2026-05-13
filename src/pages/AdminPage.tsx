import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { LogOut, Plus, Pencil, Trash2, Car as CarIcon, Loader2, X } from "lucide-react";
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

const empty: Omit<Car, "id"> = {
  name: "", brand: "", model: "", year: new Date().getFullYear(),
  category: "sedan", transmission: "Automatic", fuel: "Petrol",
  seats: 5, doors: 4, daily: 0, weekly: 0, monthly: 0,
  image: "", images: [], features: [], description: "", in_stock: true,
};

const AdminPage = () => {
  const navigate = useNavigate();
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Car | (Omit<Car, "id"> & { id?: string }) | null>(null);
  const [saving, setSaving] = useState(false);

  const creds = (() => {
    try { return JSON.parse(localStorage.getItem("erp_admin") || "null"); } catch { return null; }
  })();

  useEffect(() => {
    if (!creds) { navigate("/login"); return; }
    load();
  }, []);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("cars").select("*").order("created_at", { ascending: false });
    if (error) toast.error(error.message); else setCars(data as Car[]);
    setLoading(false);
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

  const save = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      const { id, ...payload } = editing as any;
      // Coerce numeric/array fields
      payload.year = Number(payload.year) || new Date().getFullYear();
      payload.seats = Number(payload.seats) || 5;
      payload.doors = Number(payload.doors) || 4;
      payload.daily = Number(payload.daily) || 0;
      payload.weekly = Number(payload.weekly) || 0;
      payload.monthly = Number(payload.monthly) || 0;
      if (typeof payload.features === "string") payload.features = (payload.features as string).split(",").map((s: string) => s.trim()).filter(Boolean);
      if (typeof payload.images === "string") payload.images = (payload.images as string).split(",").map((s: string) => s.trim()).filter(Boolean);

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
      </main>

      {editing && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => !saving && setEditing(null)}>
          <div className="bg-background rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-5 border-b border-border sticky top-0 bg-background">
              <h2 className="text-lg font-semibold">{(editing as any).id ? "Edit Car" : "Add New Car"}</h2>
              <button onClick={() => setEditing(null)} className="p-1 hover:bg-muted rounded"><X className="h-4 w-4" /></button>
            </div>
            <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
              {([
                ["name", "Name *", "text"],
                ["brand", "Brand *", "text"],
                ["model", "Model *", "text"],
                ["year", "Year", "number"],
                ["category", "Category (sedan, suv, luxury…)", "text"],
                ["transmission", "Transmission", "text"],
                ["fuel", "Fuel", "text"],
                ["seats", "Seats", "number"],
                ["doors", "Doors", "number"],
                ["daily", "Daily Rate (AED)", "number"],
                ["weekly", "Weekly Rate (AED)", "number"],
                ["monthly", "Monthly Rate (AED)", "number"],
                ["image", "Main Image URL", "text"],
              ] as const).map(([key, label, type]) => (
                <div key={key} className="space-y-1.5">
                  <Label className="text-xs">{label}</Label>
                  <Input
                    type={type}
                    value={(editing as any)[key] ?? ""}
                    onChange={(e) => setEditing({ ...(editing as any), [key]: type === "number" ? e.target.value : e.target.value })}
                  />
                </div>
              ))}
              <div className="space-y-1.5 md:col-span-2">
                <Label className="text-xs">Additional Image URLs (comma-separated)</Label>
                <Input
                  value={Array.isArray((editing as any).images) ? (editing as any).images.join(", ") : ((editing as any).images || "")}
                  onChange={(e) => setEditing({ ...(editing as any), images: e.target.value })}
                />
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
              <Button onClick={save} disabled={saving}>
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
