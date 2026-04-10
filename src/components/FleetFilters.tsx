import { useState } from "react";
import { Armchair, ChevronDown, SlidersHorizontal, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

export type Filters = {
  category: string;
  brand: string;
  dailyRange: [number, number];
  monthlyRange: [number, number];
  seats: string[];
  features: string[];
  transmission: string;
  fuelType: string;
  deposit: string;
  availability: string;
};

export const defaultFilters: Filters = {
  category: "All",
  brand: "All",
  dailyRange: [50, 5000],
  monthlyRange: [900, 120000],
  seats: [],
  features: [],
  transmission: "All",
  fuelType: "All",
  deposit: "All",
  availability: "All",
};

const categoryItems = [
  { label: "Economy", icon: "🚗" },
  { label: "Sedan", icon: "🚘" },
  { label: "SUV", icon: "🚙" },
  { label: "Luxury", icon: "💎" },
  { label: "Sports", icon: "🏎️" },
  { label: "Convertible", icon: "🚐" },
];

const seatOptions = ["2", "4", "5", "7+"];
const transmissionOptions = ["All", "Automatic", "Manual"];
const fuelOptions = ["All", "Petrol", "Hybrid", "Electric"];
const depositOptions = ["All", "No Deposit", "With Deposit"];
const availabilityOptions = ["All", "Today", "This Week"];

const featureOptions = [
  "Apple CarPlay", "Android Auto", "Bluetooth", "Reverse Camera",
  "360° Camera", "Cruise Control", "Leather Seats", "Sunroof",
  "Navigation", "Parking Sensors", "Heated Seats", "Wireless Charging",
  "Bose Audio", "LED Headlights",
];

interface FleetFiltersProps {
  filters: Filters;
  onChange: (f: Filters) => void;
  brands: string[];
  totalResults: number;
}

const FilterContent = ({ filters, onChange, brands, totalResults }: FleetFiltersProps) => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    type: true, price: true, transmission: false, fuel: false, seats: false,
    features: false, brand: false, deposit: false, availability: false,
  });
  const [brandSearch, setBrandSearch] = useState("");

  const toggle = (key: string) =>
    setOpenSections((s) => ({ ...s, [key]: !s[key] }));

  const update = (patch: Partial<Filters>) => onChange({ ...filters, ...patch });

  const activeCount =
    (filters.category !== "All" ? 1 : 0) +
    (filters.brand !== "All" ? 1 : 0) +
    (filters.transmission !== "All" ? 1 : 0) +
    (filters.fuelType !== "All" ? 1 : 0) +
    (filters.deposit !== "All" ? 1 : 0) +
    (filters.availability !== "All" ? 1 : 0) +
    (filters.dailyRange[0] > 50 || filters.dailyRange[1] < 5000 ? 1 : 0) +
    (filters.monthlyRange[0] > 900 || filters.monthlyRange[1] < 120000 ? 1 : 0) +
    filters.seats.length +
    filters.features.length;

  const filteredBrands = brandSearch
    ? brands.filter((b) => b.toLowerCase().includes(brandSearch.toLowerCase()))
    : brands;

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between px-1 mb-4">
        <p className="text-sm font-semibold text-foreground">{totalResults} vehicles</p>
        {activeCount > 0 && (
          <button
            onClick={() => onChange(defaultFilters)}
            className="text-xs text-primary hover:underline"
          >
            Clear all ({activeCount})
          </button>
        )}
      </div>

      {/* Car Type */}
      <FilterSection title="Car Type" open={openSections.type} onToggle={() => toggle("type")}>
        <div className="grid grid-cols-2 gap-2">
          {categoryItems.map((cat) => (
            <button
              key={cat.label}
              onClick={() => update({ category: filters.category === cat.label ? "All" : cat.label })}
              className={cn(
                "flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all text-center",
                filters.category === cat.label
                  ? "border-primary bg-primary/5 text-primary shadow-sm"
                  : "border-border hover:border-primary/30 text-muted-foreground hover:text-foreground"
              )}
            >
              <span className="text-2xl">{cat.icon}</span>
              <span className="text-xs font-medium">{cat.label}</span>
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Daily Price */}
      <FilterSection title="Daily Price (AED)" open={openSections.price} onToggle={() => toggle("price")}>
        <div className="px-1">
          <div className="flex justify-between text-xs text-muted-foreground mb-3">
            <span>{filters.dailyRange[0]} AED</span>
            <span>{filters.dailyRange[1]} AED</span>
          </div>
          <Slider min={50} max={5000} step={10} value={filters.dailyRange}
            onValueChange={(v) => update({ dailyRange: v as [number, number] })} />
        </div>
        <div className="mt-4 px-1">
          <p className="text-xs font-medium text-foreground mb-2">Monthly Price (AED)</p>
          <div className="flex justify-between text-xs text-muted-foreground mb-3">
            <span>{filters.monthlyRange[0].toLocaleString()} AED</span>
            <span>{filters.monthlyRange[1].toLocaleString()} AED</span>
          </div>
          <Slider min={900} max={120000} step={100} value={filters.monthlyRange}
            onValueChange={(v) => update({ monthlyRange: v as [number, number] })} />
        </div>
      </FilterSection>

      {/* Transmission */}
      <FilterSection title="Transmission" open={openSections.transmission} onToggle={() => toggle("transmission")}>
        <div className="flex flex-wrap gap-2">
          {transmissionOptions.map((opt) => (
            <button
              key={opt}
              onClick={() => update({ transmission: opt })}
              className={cn(
                "px-3 py-2 rounded-xl border text-xs font-medium transition-all",
                filters.transmission === opt
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground hover:border-primary/30"
              )}
            >
              {opt}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Fuel Type */}
      <FilterSection title="Fuel Type" open={openSections.fuel} onToggle={() => toggle("fuel")}>
        <div className="flex flex-wrap gap-2">
          {fuelOptions.map((opt) => (
            <button
              key={opt}
              onClick={() => update({ fuelType: opt })}
              className={cn(
                "px-3 py-2 rounded-xl border text-xs font-medium transition-all",
                filters.fuelType === opt
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground hover:border-primary/30"
              )}
            >
              {opt}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Seats */}
      <FilterSection title="Seats / Capacity" open={openSections.seats} onToggle={() => toggle("seats")}>
        <div className="flex flex-wrap gap-2">
          {seatOptions.map((s) => (
            <button
              key={s}
              onClick={() => {
                const seats = filters.seats.includes(s)
                  ? filters.seats.filter((x) => x !== s)
                  : [...filters.seats, s];
                update({ seats });
              }}
              className={cn(
                "flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-medium transition-all",
                filters.seats.includes(s)
                  ? "border-primary bg-primary/5 text-primary"
                  : "border-border text-muted-foreground hover:border-primary/30 hover:text-foreground"
              )}
            >
              <Armchair className="w-3.5 h-3.5" />
              {s} {s === "7+" ? "Seats" : "Seater"}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Deposit */}
      <FilterSection title="Deposit" open={openSections.deposit} onToggle={() => toggle("deposit")}>
        <div className="flex flex-wrap gap-2">
          {depositOptions.map((opt) => (
            <button
              key={opt}
              onClick={() => update({ deposit: opt })}
              className={cn(
                "px-3 py-2 rounded-xl border text-xs font-medium transition-all",
                filters.deposit === opt
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground hover:border-primary/30"
              )}
            >
              {opt}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Availability */}
      <FilterSection title="Availability" open={openSections.availability} onToggle={() => toggle("availability")}>
        <div className="flex flex-wrap gap-2">
          {availabilityOptions.map((opt) => (
            <button
              key={opt}
              onClick={() => update({ availability: opt })}
              className={cn(
                "px-3 py-2 rounded-xl border text-xs font-medium transition-all",
                filters.availability === opt
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground hover:border-primary/30"
              )}
            >
              {opt}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Features */}
      <FilterSection title="Features" open={openSections.features} onToggle={() => toggle("features")}>
        <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
          {featureOptions.map((feat) => (
            <label key={feat} className="flex items-center gap-2.5 cursor-pointer group">
              <Checkbox
                checked={filters.features.includes(feat)}
                onCheckedChange={(checked) => {
                  const features = checked
                    ? [...filters.features, feat]
                    : filters.features.filter((f) => f !== feat);
                  update({ features });
                }}
              />
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                {feat}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Brand (searchable) */}
      <FilterSection title="Brand" open={openSections.brand} onToggle={() => toggle("brand")}>
        <div className="mb-3">
          <div className="flex items-center gap-2 border border-border rounded-lg px-3 py-2 bg-muted/40">
            <Search className="w-3.5 h-3.5 text-muted-foreground" />
            <input
              type="text"
              value={brandSearch}
              onChange={(e) => setBrandSearch(e.target.value)}
              placeholder="Search brands..."
              className="bg-transparent text-xs text-foreground placeholder:text-muted-foreground w-full outline-none"
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto">
          <button
            onClick={() => update({ brand: "All" })}
            className={cn(
              "px-3 py-1.5 rounded-lg border text-xs font-medium transition-all",
              filters.brand === "All"
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border text-muted-foreground hover:border-primary/30"
            )}
          >
            All
          </button>
          {filteredBrands.map((b) => (
            <button
              key={b}
              onClick={() => update({ brand: filters.brand === b ? "All" : b })}
              className={cn(
                "px-3 py-1.5 rounded-lg border text-xs font-medium transition-all",
                filters.brand === b
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground hover:border-primary/30"
              )}
            >
              {b}
            </button>
          ))}
        </div>
      </FilterSection>
    </div>
  );
};

const FilterSection = ({
  title, open, onToggle, children,
}: {
  title: string; open: boolean; onToggle: () => void; children: React.ReactNode;
}) => (
  <div className="border-b border-border last:border-0">
    <button
      onClick={onToggle}
      className="flex items-center justify-between w-full py-3.5 text-sm font-semibold text-foreground hover:text-primary transition-colors"
    >
      {title}
      <ChevronDown className={cn("w-4 h-4 transition-transform", open && "rotate-180")} />
    </button>
    {open && <div className="pb-4">{children}</div>}
  </div>
);

const FleetFilters = (props: FleetFiltersProps) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className="gap-2 rounded-xl border-border">
            <SlidersHorizontal className="w-4 h-4" />
            Filters
            {(() => {
              const c =
                (props.filters.category !== "All" ? 1 : 0) +
                (props.filters.brand !== "All" ? 1 : 0) +
                (props.filters.transmission !== "All" ? 1 : 0) +
                (props.filters.fuelType !== "All" ? 1 : 0) +
                props.filters.seats.length +
                props.filters.features.length;
              return c > 0 ? (
                <span className="bg-primary text-primary-foreground text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {c}
                </span>
              ) : null;
            })()}
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[320px] overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Filters</SheetTitle>
          </SheetHeader>
          <div className="mt-4">
            <FilterContent {...props} />
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <aside className="w-72 shrink-0">
      <div className="sticky top-28 bg-background border border-border rounded-2xl p-5 max-h-[calc(100vh-8rem)] overflow-y-auto">
        <FilterContent {...props} />
      </div>
    </aside>
  );
};

export default FleetFilters;
