import { useFleetCars, useSpecialOffers } from "@/hooks/useErpData";
import { Users, Fuel, Settings2, Car, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

const FEATURED_IDS = ["kia-pegas-2025", "mazda-3-2025", "hyundai-creta-2022", "kia-k5-2023", "peugeot-3008-2025", "infiniti-q50-2023"];

const SpecialOffersPage = () => {
  const { data: allCars = [], isLoading } = useFleetCars();
  const adminOffers = allCars.filter((c: any) => (c as any).rawCategory === "special-offers");
  const featured = [...adminOffers, ...allCars.filter(c => FEATURED_IDS.includes(c.id))];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Special Offers on Car Rental Dubai | Al Emad Rent A Car"
        description="Save big with Al Emad's special car rental offers in Dubai. Discounted daily, weekly & monthly rates on popular vehicles. Limited time deals!"
        canonical="https://dubai-wheels-direct.lovable.app/special-offers"
      />
      <Navbar />

      <section className="pt-28 pb-14 relative overflow-hidden">
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
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-2xl border border-border p-5 space-y-4">
                  <Skeleton className="h-52 w-full rounded-xl" />
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-10 w-full rounded-xl" />
                </div>
              ))}
            </div>
          ) : (
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
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

const PriceBlock = ({ label, value }: { label: string; value: number }) => (
  <div className="bg-muted rounded-xl py-2.5 px-1">
    <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">{label}</p>
    <p className="text-sm font-bold text-primary">{value.toLocaleString()} <span className="text-[10px] font-normal text-primary/60">AED</span></p>
  </div>
);

export default SpecialOffersPage;
