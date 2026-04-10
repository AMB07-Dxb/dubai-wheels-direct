import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { allCars, categories, brands } from "@/data/cars";
import { Users, Fuel, Settings2, Car, MapPin, Calendar, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FleetFilters, { type Filters } from "@/components/FleetFilters";
import { useIsMobile } from "@/hooks/use-mobile";

type SortOption = "cheapest" | "expensive" | "newest" | "popular";

const sortLabels: Record<SortOption, string> = {
  cheapest: "Cheapest",
  expensive: "Most Expensive",
  newest: "Newest",
  popular: "Most Popular",
};

const FleetPage = () => {
  const [searchParams] = useSearchParams();
  const isMobile = useIsMobile();

  const locationParam = searchParams.get("location") || "";
  const pickupParam = searchParams.get("pickup");
  const returnParam = searchParams.get("return");

  const [filters, setFilters] = useState<Filters>({
    category: "All",
    brand: "All",
    dailyRange: [50, 5000],
    monthlyRange: [900, 120000],
    seats: [],
    features: [],
  });

  const [sortBy, setSortBy] = useState<SortOption>("popular");

  const filtered = useMemo(() => {
    let cars = allCars.filter((c) => {
      if (filters.category !== "All" && c.category !== filters.category) return false;
      if (filters.brand !== "All" && c.brand !== filters.brand) return false;
      if (c.daily < filters.dailyRange[0] || c.daily > filters.dailyRange[1]) return false;
      if (c.monthly < filters.monthlyRange[0] || c.monthly > filters.monthlyRange[1]) return false;
      if (filters.seats.length > 0) {
        const seatMatch = filters.seats.some((s) => {
          if (s === "7+") return c.seats >= 7;
          return c.seats === Number(s);
        });
        if (!seatMatch) return false;
      }
      if (filters.features.length > 0) {
        const hasAll = filters.features.every((feat) =>
          c.features.some((f) => f.toLowerCase().includes(feat.toLowerCase()))
        );
        if (!hasAll) return false;
      }
      return true;
    });

    // Sort
    switch (sortBy) {
      case "cheapest":
        cars = [...cars].sort((a, b) => a.daily - b.daily);
        break;
      case "expensive":
        cars = [...cars].sort((a, b) => b.daily - a.daily);
        break;
      case "newest":
        cars = [...cars].sort((a, b) => b.year - a.year);
        break;
      case "popular":
        // In-stock first, then by category order
        cars = [...cars].sort((a, b) => {
          if (a.inStock !== b.inStock) return a.inStock ? -1 : 1;
          return 0;
        });
        break;
    }

    return cars;
  }, [filters, sortBy]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero with banner */}
      <section className="pt-28 pb-8 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://www.caryaati.com/erps/images/website/slider_banners/car_pages_banner_1_804.png"
            alt="Fleet Banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
        </div>

        <div className="container relative z-10">
          <p className="text-sm font-semibold tracking-widest uppercase text-primary mb-3">Our Fleet</p>
          <h1 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-3">Find Your Perfect Ride</h1>
          <p className="text-muted-foreground max-w-lg mb-4">Browse our complete collection of {allCars.length}+ vehicles.</p>

          {(locationParam || pickupParam || returnParam) && (
            <div className="flex flex-wrap items-center gap-3 mt-2">
              {locationParam && (
                <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary text-sm font-medium px-3 py-1.5 rounded-full">
                  <MapPin className="w-3.5 h-3.5" /> {locationParam}
                </span>
              )}
              {pickupParam && (
                <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary text-sm font-medium px-3 py-1.5 rounded-full">
                  <Calendar className="w-3.5 h-3.5" /> {format(new Date(pickupParam), "MMM dd, yyyy")}
                </span>
              )}
              {returnParam && (
                <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary text-sm font-medium px-3 py-1.5 rounded-full">
                  <Calendar className="w-3.5 h-3.5" /> {format(new Date(returnParam), "MMM dd, yyyy")}
                </span>
              )}
            </div>
          )}
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <div className="flex gap-8">
            <FleetFilters
              filters={filters}
              onChange={setFilters}
              brands={brands}
              totalResults={filtered.length}
            />

            <div className="flex-1 min-w-0">
              {/* Sort bar */}
              <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                <div className="flex items-center gap-2">
                  {isMobile && (
                    <FleetFilters
                      filters={filters}
                      onChange={setFilters}
                      brands={brands}
                      totalResults={filtered.length}
                    />
                  )}
                  <p className="text-sm text-muted-foreground">{filtered.length} vehicles</p>
                </div>
                <div className="flex items-center gap-2">
                  <ArrowUpDown className="w-4 h-4 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground hidden sm:inline">Sort by:</span>
                  <div className="flex gap-1.5">
                    {(Object.keys(sortLabels) as SortOption[]).map((key) => (
                      <button
                        key={key}
                        onClick={() => setSortBy(key)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          sortBy === key
                            ? "bg-primary text-primary-foreground shadow-sm"
                            : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"
                        }`}
                      >
                        {sortLabels[key]}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filtered.map((car) => (
                  <Link key={car.id} to={`/fleet/${car.id}`} className="block group">
                    <div className="bg-background rounded-2xl overflow-hidden border border-border hover:border-primary/20 transition-all duration-300 hover-lift h-full">
                      <div className="relative h-48 bg-muted/20 overflow-hidden">
                        <img
                          src={car.image}
                          alt={car.name}
                          className="w-full h-full object-contain p-5 group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        <span className="absolute top-3 left-3 bg-foreground text-background text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wide uppercase">
                          {car.category}
                        </span>
                        {car.inStock ? (
                          <span className="absolute top-3 right-3 bg-emerald-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full">In Stock</span>
                        ) : (
                          <span className="absolute top-3 right-3 bg-destructive text-destructive-foreground text-[10px] font-bold px-2.5 py-1 rounded-full">Out of Stock</span>
                        )}
                      </div>
                      <div className="p-5">
                        <h3 className="text-base font-bold text-primary mb-2 font-sans">{car.name}</h3>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                          <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {car.seats}</span>
                          <span className="flex items-center gap-1"><Settings2 className="w-3 h-3" /> {car.transmission}</span>
                          <span className="flex items-center gap-1"><Fuel className="w-3 h-3" /> {car.fuel}</span>
                        </div>
                        <div className="grid grid-cols-3 gap-1.5 text-center mb-4">
                          <PriceBlock label="Daily" value={car.daily} />
                          <PriceBlock label="Weekly" value={car.weekly} />
                          <PriceBlock label="Monthly" value={car.monthly} />
                        </div>
                        <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 gap-2 text-sm rounded-xl">
                          <Car className="w-4 h-4" /> View Details
                        </Button>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {filtered.length === 0 && (
                <div className="text-center py-20">
                  <Car className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">No vehicles found</h3>
                  <p className="text-muted-foreground text-sm">Try adjusting your filters</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

const PriceBlock = ({ label, value }: { label: string; value: number }) => (
  <div className="bg-muted rounded-lg py-2 px-1">
    <p className="text-[9px] uppercase tracking-wider text-muted-foreground font-medium">{label}</p>
    <p className="text-xs font-bold text-primary">
      {value.toLocaleString()} <span className="text-[9px] font-normal text-primary/60">AED</span>
    </p>
  </div>
);

export default FleetPage;
