import { MapPin, Calendar, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const BookingBar = () => (
  <section className="relative z-20 -mt-6">
    <div className="container">
      <div className="bg-card rounded-2xl shadow-xl border border-border p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">Pickup Location</label>
            <div className="flex items-center gap-2 border border-border rounded-xl px-4 py-3 bg-muted/50">
              <MapPin className="w-4 h-4 text-primary shrink-0" />
              <input type="text" placeholder="e.g. Dubai Marina" className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground w-full outline-none" />
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">Pickup Date</label>
            <div className="flex items-center gap-2 border border-border rounded-xl px-4 py-3 bg-muted/50">
              <Calendar className="w-4 h-4 text-primary shrink-0" />
              <input type="text" placeholder="Select date" className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground w-full outline-none" />
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">Return Date</label>
            <div className="flex items-center gap-2 border border-border rounded-xl px-4 py-3 bg-muted/50">
              <Calendar className="w-4 h-4 text-primary shrink-0" />
              <input type="text" placeholder="Select date" className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground w-full outline-none" />
            </div>
          </div>
          <a href="#fleet">
            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12 text-base gap-2 shadow-md shadow-primary/20 rounded-xl">
              <Search className="w-4 h-4" /> Find a Car
            </Button>
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default BookingBar;
