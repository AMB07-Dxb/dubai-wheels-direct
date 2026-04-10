import { useState, useRef, useEffect } from "react";
import { MapPin, Calendar, Search, ChevronDown, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const dubaiLocations = [
  "Dubai Marina",
  "Downtown Dubai",
  "Dubai Mall",
  "JBR – Jumeirah Beach",
  "Business Bay",
  "DIFC",
  "Palm Jumeirah",
  "Deira",
  "Bur Dubai",
  "Al Barsha",
  "Jumeirah Village Circle (JVC)",
  "Dubai Silicon Oasis",
  "Dubai Airport (DXB)",
  "Al Maktoum Airport (DWC)",
  "Dubai Investment Park",
  "Motor City",
  "Dubai Sports City",
  "International City",
  "Al Quoz",
  "Sheikh Zayed Road",
];

const BookingBar = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [locationOpen, setLocationOpen] = useState(false);
  const [pickupDate, setPickupDate] = useState<Date>();
  const [returnDate, setReturnDate] = useState<Date>();
  const [filteredLocations, setFilteredLocations] = useState(dubaiLocations);
  const locationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (locationRef.current && !locationRef.current.contains(e.target as Node)) {
        setLocationOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLocationInput = (val: string) => {
    setLocation(val);
    setFilteredLocations(
      dubaiLocations.filter((l) => l.toLowerCase().includes(val.toLowerCase()))
    );
    setLocationOpen(true);
  };

  const selectLocation = (loc: string) => {
    setLocation(loc);
    setLocationOpen(false);
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (location) params.set("location", location);
    if (pickupDate) params.set("pickup", pickupDate.toISOString());
    if (returnDate) params.set("return", returnDate.toISOString());
    navigate(`/fleet?${params.toString()}`);
  };

  return (
    <section className="relative z-20 -mt-2 pb-8">
      <div className="container">
        <div className="bg-background rounded-2xl shadow-lg border border-border p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            {/* Location */}
            <div ref={locationRef} className="relative">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">
                Pickup Location
              </label>
              <div
                className="flex items-center gap-2 border border-border rounded-xl px-4 py-3 bg-muted/40 hover:border-primary/30 transition-colors cursor-pointer"
                onClick={() => setLocationOpen(true)}
              >
                <MapPin className="w-4 h-4 text-primary shrink-0" />
                <input
                  type="text"
                  placeholder="e.g. Dubai Marina"
                  value={location}
                  onChange={(e) => handleLocationInput(e.target.value)}
                  onFocus={() => setLocationOpen(true)}
                  className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground w-full outline-none"
                />
                <ChevronDown className={cn("w-4 h-4 text-muted-foreground transition-transform shrink-0", locationOpen && "rotate-180")} />
              </div>
              {locationOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-background border border-border rounded-xl shadow-xl z-50 max-h-64 overflow-y-auto animate-in fade-in-0 slide-in-from-top-2 duration-200">
                  {filteredLocations.length === 0 ? (
                    <p className="px-4 py-3 text-sm text-muted-foreground">No locations found</p>
                  ) : (
                    filteredLocations.map((loc) => (
                      <button
                        key={loc}
                        onClick={() => selectLocation(loc)}
                        className={cn(
                          "w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left hover:bg-muted/60 transition-colors first:rounded-t-xl last:rounded-b-xl",
                          location === loc && "text-primary font-medium bg-primary/5"
                        )}
                      >
                        <MapPin className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                        <span className="flex-1">{loc}</span>
                        {location === loc && <Check className="w-3.5 h-3.5 text-primary" />}
                      </button>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* Pickup Date */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">
                Pickup Date
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <button className="flex items-center gap-2 border border-border rounded-xl px-4 py-3 bg-muted/40 hover:border-primary/30 transition-colors w-full text-left">
                    <Calendar className="w-4 h-4 text-primary shrink-0" />
                    <span className={cn("text-sm flex-1", pickupDate ? "text-foreground" : "text-muted-foreground")}>
                      {pickupDate ? format(pickupDate, "MMM dd, yyyy") : "Select date"}
                    </span>
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={pickupDate}
                    onSelect={setPickupDate}
                    disabled={(date) => date < new Date()}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Return Date */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">
                Return Date
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <button className="flex items-center gap-2 border border-border rounded-xl px-4 py-3 bg-muted/40 hover:border-primary/30 transition-colors w-full text-left">
                    <Calendar className="w-4 h-4 text-primary shrink-0" />
                    <span className={cn("text-sm flex-1", returnDate ? "text-foreground" : "text-muted-foreground")}>
                      {returnDate ? format(returnDate, "MMM dd, yyyy") : "Select date"}
                    </span>
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={returnDate}
                    onSelect={setReturnDate}
                    disabled={(date) => date < (pickupDate || new Date())}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Search */}
            <Button
              onClick={handleSearch}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12 text-base gap-2 shadow-md shadow-primary/20 rounded-xl"
            >
              <Search className="w-4 h-4" /> Find a Car
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingBar;
