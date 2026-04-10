import { Star, Gift, Calendar, TrendingUp, Crown, Diamond, Gem, Award, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const tiers = [
  {
    points: "0–499",
    name: "Bronze",
    tagline: "Your Journey Begins",
    perks: ["1 point per AED 10 spent", "5% off next rental at 200 pts", "Priority email support"],
    icon: Award,
    gradient: "from-amber-800 to-amber-600",
    border: "border-amber-700/30",
    glow: "shadow-amber-800/20",
  },
  {
    points: "500–1,499",
    name: "Silver",
    tagline: "Elevated Experience",
    perks: ["1.5x points on every rental", "10% off + free delivery", "Complimentary car upgrade", "Birthday bonus points"],
    icon: Diamond,
    gradient: "from-slate-500 to-slate-300",
    border: "border-slate-400/30",
    glow: "shadow-slate-400/20",
  },
  {
    points: "1,500+",
    name: "Gold",
    tagline: "The Ultimate Privilege",
    perks: ["2x points on every rental", "1 free day per 1,500 pts", "Priority support & concierge", "Exclusive luxury fleet access", "Airport meet & greet"],
    icon: Crown,
    gradient: "from-primary to-primary/70",
    border: "border-primary/30",
    glow: "shadow-primary/20",
  },
];

const RewardsPage = () => (
  <div className="min-h-screen bg-background">
    <Navbar />

    {/* Premium Hero Banner */}
    <section className="pt-28 pb-20 relative overflow-hidden">
      {/* Luxurious dark background */}
      <div className="absolute inset-0 bg-[hsl(var(--surface-dark))]" />
      {/* Subtle gold accent lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(var(--gold))] to-transparent opacity-40" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(var(--gold))] to-transparent opacity-20" />
      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/5 rounded-full blur-[100px]" />

      <div className="container relative z-10 text-center">
        <div className="inline-flex items-center gap-2 bg-[hsl(var(--gold))]/10 border border-[hsl(var(--gold))]/20 rounded-full px-4 py-1.5 mb-6">
          <Gem className="w-3.5 h-3.5 text-[hsl(var(--gold))]" />
          <span className="text-xs font-semibold tracking-widest uppercase text-[hsl(var(--gold))]">Exclusive Loyalty Program</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-display font-bold text-[hsl(var(--surface-dark-foreground))] mb-4 leading-tight">
          Luxury Has Its<br />
          <span className="text-gradient-gold">Rewards</span>
        </h1>
        <p className="text-[hsl(var(--surface-dark-foreground))]/50 max-w-lg mx-auto text-base mb-8">
          Every journey with Al Emad elevates your status. Earn points, unlock exclusive privileges, and experience car rental redefined.
        </p>
        <a href="https://wa.me/97145573386?text=I%20want%20to%20join%20the%20Al%20Emad%20Rewards%20program" target="_blank" rel="noopener noreferrer">
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 rounded-xl text-sm font-semibold px-8 h-12 shadow-lg shadow-primary/20">
            <Sparkles className="w-4 h-4" /> Join the Program
          </Button>
        </a>
      </div>
    </section>

    {/* How It Works */}
    <section className="section-padding bg-muted/30">
      <div className="container">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold tracking-widest uppercase text-primary mb-3">How It Works</p>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">Three Steps to Luxury</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
          <Step icon={<TrendingUp className="w-6 h-6 text-primary" />} step="1" title="Rent & Earn" desc="Earn 1 point for every AED 10 you spend on any vehicle." />
          <Step icon={<Gift className="w-6 h-6 text-primary" />} step="2" title="Unlock Perks" desc="Redeem points for discounts, upgrades, and exclusive benefits." />
          <Step icon={<Calendar className="w-6 h-6 text-primary" />} step="3" title="Free Days" desc="Reach Gold status and claim complimentary rental days." />
        </div>
      </div>
    </section>

    {/* Tier Cards */}
    <section className="section-padding">
      <div className="container">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold tracking-widest uppercase text-primary mb-3">Membership Tiers</p>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">Choose Your Level</h2>
          <p className="text-muted-foreground mt-3 max-w-md mx-auto">Every rental brings you closer to the next tier of exclusive privileges.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {tiers.map((tier) => (
            <div key={tier.name} className={`bg-background rounded-2xl border ${tier.border} hover:shadow-xl ${tier.glow} transition-all duration-500 hover:-translate-y-1 overflow-hidden flex flex-col`}>
              {/* Header with gradient */}
              <div className={`bg-gradient-to-br ${tier.gradient} px-6 py-8 text-center`}>
                <tier.icon className="w-10 h-10 text-white/90 mx-auto mb-3" />
                <h3 className="text-2xl font-display font-bold text-white">{tier.name}</h3>
                <p className="text-white/60 text-xs tracking-wider uppercase mt-1">{tier.tagline}</p>
                <p className="text-white/80 text-sm font-medium mt-3">{tier.points} points</p>
              </div>
              {/* Perks */}
              <ul className="p-6 space-y-3.5 flex-1">
                {tier.perks.map((perk) => (
                  <li key={perk} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <ArrowRight className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                    {perk}
                  </li>
                ))}
              </ul>
              <div className="px-6 pb-6">
                <a href="https://wa.me/97145573386" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="w-full rounded-xl border-border hover:border-primary/30 hover:bg-primary/5 gap-2 text-sm">
                    Learn More
                  </Button>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Bottom CTA */}
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[hsl(var(--surface-dark))]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(var(--gold))] to-transparent opacity-30" />
      <div className="container relative z-10 text-center">
        <Gem className="w-8 h-8 text-[hsl(var(--gold))] mx-auto mb-4" />
        <h2 className="text-2xl md:text-3xl font-display font-bold text-[hsl(var(--surface-dark-foreground))] mb-3">Start Earning Today</h2>
        <p className="text-[hsl(var(--surface-dark-foreground))]/50 max-w-md mx-auto mb-6 text-sm">Your next rental is your first step towards Gold. Every dirham counts.</p>
        <a href="https://wa.me/97145573386?text=I%20want%20to%20learn%20about%20Al%20Emad%20Rewards" target="_blank" rel="noopener noreferrer">
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 rounded-xl font-semibold px-8">
            <Star className="w-4 h-4" /> Join Now — It's Free
          </Button>
        </a>
      </div>
    </section>

    <Footer />
  </div>
);

const Step = ({ icon, step, title, desc }: { icon: React.ReactNode; step: string; title: string; desc: string }) => (
  <div className="text-center">
    <div className="w-14 h-14 rounded-2xl bg-primary/8 flex items-center justify-center mx-auto mb-4 relative" style={{ backgroundColor: "hsl(var(--primary) / 0.08)" }}>
      {icon}
      <span className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">{step}</span>
    </div>
    <h3 className="text-base font-semibold text-foreground font-sans mb-1">{title}</h3>
    <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
  </div>
);

export default RewardsPage;
