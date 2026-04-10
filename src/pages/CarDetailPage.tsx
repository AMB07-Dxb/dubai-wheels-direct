import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { allCars } from "@/data/cars";
import { Users, Briefcase, Settings2, Fuel, ArrowLeft, MessageCircle, CalendarCheck, DoorOpen, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const CarDetailPage = () => {
  const { id } = useParams();
  const car = allCars.find(c => c.id === id);
  const [activeImage, setActiveImage] = useState(0);

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

  const carImages = car.images.length > 0 ? car.images : [car.image];
  const similar = allCars.filter(c => c.category === car.category && c.id !== car.id).slice(0, 4);
  const whatsappLink = `https://wa.me/971524136205?text=${encodeURIComponent(`Hi, I'm interested in renting the ${car.name}. Can you provide more details?`)}`;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-24 pb-8">
        <div className="container">
          <Link to="/fleet" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Fleet
          </Link>

          <div className="mb-8 flex items-start justify-between flex-wrap gap-3">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full tracking-wide uppercase">{car.category}</span>
                {!car.inStock && (
                  <span className="bg-destructive text-destructive-foreground text-xs font-bold px-3 py-1 rounded-full tracking-wide uppercase">Out of Stock</span>
                )}
                {car.inStock && (
                  <span className="bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full tracking-wide uppercase">In Stock</span>
                )}
              </div>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">{car.name}</h1>
              <p className="text-muted-foreground mt-1">{car.brand} • {car.year} • {car.transmission} • {car.fuel}</p>
            </div>
          </div>

          {/* Image Gallery + Prices + CTAs */}
          <div className="bg-muted/20 rounded-3xl border border-border p-6 md:p-10 mb-10">
            {/* Image Gallery */}
            <div className="relative flex items-center justify-center mb-8">
              <img src={carImages[activeImage]} alt={car.name} className="w-full max-w-2xl object-contain h-[300px]" />
              {carImages.length > 1 && (
                <>
                  <button
                    onClick={() => setActiveImage(i => (i - 1 + carImages.length) % carImages.length)}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background border border-border rounded-full p-2 transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5 text-foreground" />
                  </button>
                  <button
                    onClick={() => setActiveImage(i => (i + 1) % carImages.length)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background border border-border rounded-full p-2 transition-colors"
                  >
                    <ChevronRight className="w-5 h-5 text-foreground" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail strip */}
            {carImages.length > 1 && (
              <div className="flex items-center justify-center gap-3 mb-8">
                {carImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`w-16 h-12 rounded-lg border-2 overflow-hidden transition-all ${i === activeImage ? "border-primary ring-2 ring-primary/20" : "border-border opacity-60 hover:opacity-100"}`}
                  >
                    <img src={img} alt={`${car.name} view ${i + 1}`} className="w-full h-full object-contain p-1" />
                  </button>
                ))}
              </div>
            )}

            {/* Price Cards */}
            <div className="grid grid-cols-3 gap-4 mb-8 max-w-xl mx-auto">
              <PriceCard label="Daily" value={car.daily} />
              <PriceCard label="Weekly" value={car.weekly} />
              <PriceCard label="Monthly" value={car.monthly} highlight />
            </div>

            <p className="text-xs text-center text-muted-foreground mb-6">5% VAT applicable • Insurance & maintenance included • Free delivery in Dubai</p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="flex-1">
                <Button size="lg" className="w-full bg-[hsl(142,70%,45%)] hover:bg-[hsl(142,70%,38%)] text-white gap-3 rounded-2xl text-base font-bold h-16 shadow-lg shadow-[hsl(142,70%,45%)]/25 hover:shadow-xl hover:shadow-[hsl(142,70%,45%)]/30 transition-all duration-300 hover:scale-[1.02]">
                  <MessageCircle className="w-6 h-6" /> WhatsApp Now
                </Button>
              </a>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="flex-1">
                <Button size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 gap-3 rounded-2xl text-base font-bold h-16 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 hover:scale-[1.02]">
                  <CalendarCheck className="w-6 h-6" /> Book Now
                </Button>
              </a>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            <div className="lg:col-span-3">
              <h2 className="text-2xl font-display font-bold text-primary mb-4 uppercase">About the {car.name}</h2>
              <div className="w-16 h-1 bg-primary rounded-full mb-6" />
              <p className="text-foreground/80 leading-relaxed mb-10 text-[15px]">{car.description}</p>

              <h2 className="text-2xl font-display font-bold text-primary mb-4 uppercase">Why Choose the {car.brand} {car.name.split(' ').slice(-1)[0]}</h2>
              <div className="w-16 h-1 bg-primary rounded-full mb-6" />
              <div className="space-y-4 text-foreground/80 text-[15px] leading-relaxed">
                <p>When you rent the {car.name} from Al Emad Rent A Car, you get more than just a vehicle — you get a complete mobility solution. Every rental includes comprehensive insurance, free maintenance, and complimentary delivery anywhere in Dubai.</p>
                <p>Whether you're visiting Dubai for business or leisure, the {car.name} provides the perfect combination of {car.category === "Economy" ? "affordability and reliability" : car.category === "Sedan" ? "style and performance" : car.category === "SUV" ? "space and versatility" : "prestige and luxury"}. Book today and experience the Al Emad difference.</p>
              </div>
            </div>

            <div className="lg:col-span-2">
              <h2 className="text-2xl font-display font-bold text-primary mb-6">General Information</h2>
              <div className="border border-border rounded-2xl overflow-hidden">
                <InfoRow label="SEATS" value={String(car.seats)} />
                <InfoRow label="LUGGAGE(S)" value={String(car.luggage)} />
                <InfoRow label="DOORS" value={String(car.doors)} />
                <InfoRow label="TRANSMISSION" value={car.transmission === "Auto" ? "Automatic" : "Manual"} />
                <InfoRow label="BODY TYPE" value={car.bodyType} />
                <InfoRow label="FUEL TYPE" value={car.fuel.toLowerCase()} />
                <InfoRow label="HORSEPOWER" value={String(car.horsepower)} />
                <InfoRow label="ENGINE" value={car.engine} />
                <InfoRow label="YEAR" value={String(car.year)} />
                <InfoRow label="AVAILABILITY" value={car.inStock ? "In Stock" : "Out of Stock"} />
                <InfoRow label="MODEL" value={car.name.split(' ').slice(1, -1).join(' ')} last />
              </div>

              <h2 className="text-2xl font-display font-bold text-primary mt-8 mb-6">Car Features</h2>
              <div className="border border-border rounded-2xl overflow-hidden">
                {car.features.map((f, i) => (
                  <InfoRow key={f} label={f.toUpperCase()} value="✓" last={i === car.features.length - 1} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {similar.length > 0 && (
        <section className="py-16">
          <div className="container">
            <h2 className="text-2xl font-display font-bold text-foreground mb-8">Similar Vehicles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {similar.map(c => (
                <Link key={c.id} to={`/fleet/${c.id}`} className="block group">
                  <div className="bg-background rounded-2xl overflow-hidden border border-border hover:border-primary/20 hover:shadow-lg transition-all duration-300 hover-lift">
                    <div className="h-40 bg-muted/30 overflow-hidden">
                      <img src={c.image} alt={c.name} className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-sm text-primary font-sans mb-1">{c.name}</h3>
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

const PriceCard = ({ label, value, highlight }: { label: string; value: number; highlight?: boolean }) => (
  <div className={`rounded-2xl p-5 text-center border ${highlight ? "border-primary bg-primary/5" : "border-border bg-background"}`}>
    <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium mb-1">{label}</p>
    <p className="text-2xl font-bold text-primary">{value.toLocaleString()}</p>
    <p className="text-xs text-muted-foreground">AED</p>
  </div>
);

const InfoRow = ({ label, value, last }: { label: string; value: string; last?: boolean }) => (
  <div className={`flex items-center justify-between px-5 py-3.5 ${!last ? "border-b border-border" : ""}`}>
    <span className="text-sm font-medium text-foreground">{label}</span>
    <span className="text-sm text-muted-foreground">{value}</span>
  </div>
);

export default CarDetailPage;
