import { Star, Gift, Calendar, TrendingUp } from "lucide-react";

const tiers = [
  { points: "0–499", name: "Bronze", perks: ["1 point per AED 10 spent", "5% off next rental at 200 pts"], color: "bg-amber-700" },
  { points: "500–1,499", name: "Silver", perks: ["1.5x points on every rental", "10% off + free delivery"], color: "bg-muted-foreground" },
  { points: "1,500+", name: "Gold", perks: ["2x points on every rental", "1 free day per 1,500 pts", "Priority support"], color: "bg-primary" },
];

const RewardsSection = () => (
  <section id="rewards" className="section-padding bg-muted/30 relative overflow-hidden">
    <div className="container relative">
      <div className="text-center mb-20">
        <p className="text-sm font-semibold tracking-widest uppercase text-primary mb-3">Loyalty Program</p>
        <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground">Earn Rewards Every Ride</h2>
        <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
          Rent, earn points, and unlock discounts & free rental days.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto mb-20">
        <Step icon={<TrendingUp className="w-6 h-6 text-primary" />} step="1" title="Rent & Earn" desc="Earn 1 point for every AED 10 you spend on rentals." />
        <Step icon={<Gift className="w-6 h-6 text-primary" />} step="2" title="Redeem Discounts" desc="Use your points for up to 15% off your next booking." />
        <Step icon={<Calendar className="w-6 h-6 text-primary" />} step="3" title="Claim Free Days" desc="Hit 1,500 points and unlock a full free rental day." />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        {tiers.map((tier) => (
          <div key={tier.name} className="bg-background rounded-2xl border border-border hover:border-primary/20 hover:shadow-lg transition-all duration-300 hover-lift overflow-hidden">
            <div className={`${tier.color} px-6 py-5`}>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-primary-foreground font-sans">{tier.name}</h3>
                <Star className="w-5 h-5 text-primary-foreground/80" />
              </div>
              <p className="text-xs text-primary-foreground/70 mt-1">{tier.points} points</p>
            </div>
            <ul className="p-6 space-y-3">
              {tier.perks.map((perk) => (
                <li key={perk} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                  {perk}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Step = ({ icon, step, title, desc }: { icon: React.ReactNode; step: string; title: string; desc: string }) => (
  <div className="text-center">
    <div className="w-14 h-14 rounded-2xl bg-primary/8 flex items-center justify-center mx-auto mb-4 relative" style={{ backgroundColor: "hsl(0 85% 50% / 0.08)" }}>
      {icon}
      <span className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">{step}</span>
    </div>
    <h3 className="text-base font-semibold text-foreground font-sans mb-1">{title}</h3>
    <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
  </div>
);

export default RewardsSection;
