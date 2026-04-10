import { allCars } from "@/data/cars";
import { Users, Fuel, Settings2, Car, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const featured = allCars.filter(c =>
  ["kia-pegas-2025", "mazda-3-2025", "hyundai-creta-2022", "kia-k5-2023", "peugeot-3008-2025", "infiniti-q50-2023"].includes(c.id)
);

const SpecialOffersPage = () => (
  <div className="min-h-screen bg-background">
    <Navbar />

    {/* Hero Banner with gradient overlay */}
    <section className="pt-28 pb-14 relative overflow-hidden">
      {/* Background banner image */}
      <div className="absolute inset-0">
        <img
          src="https://www.caryaati.com/erps/images/website/slider_banners/slider_banners_6_244.png"
          alt="Special Offers Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      <div className="container relative z-10">
        <p className="text-sm font-semibold tracking-widest uppercase text-primary mb-3">Limited Time Deals</p>
        <h1 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-3">Special Offers</h1>
        <p className="text-muted-foreground max-w-lg">Handpicked vehicles at the best rates. Book now and save on your next rental.</p>
      </div>
    </section>

    <section className="section-padding">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map(car => (
            <Link key={car.id} to={`/fleet/${car.id}`} className="block group">
              <div className="bg-background rounded-2xl overflow-hidden border border-border hover:border-primary/20 transition-all duration-300 hover-lift h-full">
                <div className="relative h-52 bg-muted/20 overflow-hidden">
                  <img src={car.image} alt={car.name} className="w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  <span className="absolute top-4 left-4 bg-foreground text-background text-[10px] font-bold px-3 py-1 rounded-full tracking-wide uppercase">{car.category}</span>
                  <span className="absolute top-4 right-4 bg-primary text-primary-foreground text-[10px] font-bold px-3 py-1 rounded-full tracking-wide uppercase flex items-center gap-1">
                    <Star className="w-3 h-3" /> Special Offer
                  </span>
                  {!car.inStock && (
                    <span className="absolute bottom-4 left-4 bg-destructive text-destructive-foreground text-[10px] font-bold px-3 py-1 rounded-full tracking-wide uppercase">Out of Stock</span>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-primary mb-3 font-sans">{car.name}</h3>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-5">
                    <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5" /> {car.seats}</span>
                    <span className="flex items-center gap-1.5"><Settings2 className="w-3.5 h-3.5" /> {car.transmission}</span>
                    <span className="flex items-center gap-1.5"><Fuel className="w-3.5 h-3.5" /> {car.fuel}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center mb-5">
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
      </div>
    </section>

    <Footer />
  </div>
);

const PriceBlock = ({ label, value }: { label: string; value: number }) => (
  <div className="bg-muted rounded-xl py-2.5 px-1">
    <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">{label}</p>
    <p className="text-sm font-bold text-primary">{value.toLocaleString()} <span className="text-[10px] font-normal text-primary/60">AED</span></p>
  </div>
);

export default SpecialOffersPage;
