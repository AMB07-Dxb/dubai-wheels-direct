import { useParams, Link } from "react-router-dom";
import { allCars } from "@/data/cars";
import { Users, Fuel, Settings2, Briefcase, Car, Phone, MessageCircle, ArrowLeft, DoorOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const CarDetailPage = () => {
  const { id } = useParams();
  const car = allCars.find(c => c.id === id);

  if (!car) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container pt-32 text-center">
          <h1 className="text-3xl font-display font-bold text-foreground mb-4">Car Not Found</h1>
          <Link to="/fleet"><Button>Back to Fleet</Button></Link>
        </div>
        <Footer />
      </div>
    );
  }

  const similar = allCars.filter(c => c.category === car.category && c.id !== car.id).slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-24 pb-16">
        <div className="container">
          <Link to="/fleet" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to Fleet
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image */}
            <div className="bg-muted/30 rounded-3xl p-8 flex items-center justify-center border border-border">
              <img src={car.image} alt={car.name} className="w-full max-w-lg object-contain" />
            </div>

            {/* Details */}
            <div>
              <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full tracking-wide uppercase">{car.category}</span>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mt-4 mb-2">{car.name}</h1>
              <p className="text-muted-foreground mb-8">Brand: {car.brand} • Year: {car.year} • {car.transmission} • {car.fuel}</p>

              {/* Specs */}
              <div className="grid grid-cols-4 gap-4 mb-8">
                <Spec icon={<Users className="w-5 h-5" />} label="Seats" value={String(car.seats)} />
                <Spec icon={<DoorOpen className="w-5 h-5" />} label="Doors" value={String(car.doors)} />
                <Spec icon={<Briefcase className="w-5 h-5" />} label="Luggage" value={String(car.luggage)} />
                <Spec icon={<Settings2 className="w-5 h-5" />} label="Trans." value={car.transmission} />
              </div>

              {/* Pricing */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <PriceCard label="Daily" value={car.daily} />
                <PriceCard label="Weekly" value={car.weekly} />
                <PriceCard label="Monthly" value={car.monthly} highlight />
              </div>

              <p className="text-xs text-muted-foreground mb-6">5% VAT applicable on all prices. Insurance, maintenance & delivery included.</p>

              {/* CTA */}
              <div className="flex gap-3">
                <a href="https://wa.me/97145573386" target="_blank" rel="noopener noreferrer" className="flex-1">
                  <Button size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 gap-2 shadow-lg shadow-primary/20">
                    <MessageCircle className="w-5 h-5" /> Book on WhatsApp
                  </Button>
                </a>
                <a href="tel:+97145573386">
                  <Button size="lg" variant="outline" className="border-border hover:border-primary/30 gap-2">
                    <Phone className="w-5 h-5" /> Call
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Similar Cars */}
      {similar.length > 0 && (
        <section className="pb-20">
          <div className="container">
            <h2 className="text-2xl font-display font-bold text-foreground mb-8">Similar Vehicles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {similar.map(c => (
                <Link key={c.id} to={`/fleet/${c.id}`} className="block">
                  <div className="bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/20 hover:shadow-lg transition-all duration-300 hover-lift">
                    <div className="h-40 bg-muted/30 overflow-hidden">
                      <img src={c.image} alt={c.name} className="w-full h-full object-contain p-4" loading="lazy" />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-sm text-card-foreground font-sans mb-1">{c.name}</h3>
                      <p className="text-xs text-muted-foreground">From <span className="font-bold text-primary">{c.daily} AED</span>/day</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

const Spec = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <div className="bg-muted/50 rounded-xl p-4 text-center">
    <div className="text-primary mx-auto mb-2 flex justify-center">{icon}</div>
    <p className="text-xs text-muted-foreground">{label}</p>
    <p className="font-bold text-sm text-foreground">{value}</p>
  </div>
);

const PriceCard = ({ label, value, highlight }: { label: string; value: number; highlight?: boolean }) => (
  <div className={`rounded-2xl p-5 text-center border ${highlight ? "border-primary bg-primary/5" : "border-border bg-card"}`}>
    <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium mb-1">{label}</p>
    <p className="text-2xl font-bold text-foreground">{value.toLocaleString()}</p>
    <p className="text-xs text-muted-foreground">AED</p>
  </div>
);

export default CarDetailPage;
