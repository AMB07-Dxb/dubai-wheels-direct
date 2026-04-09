import { useState } from "react";
import { ChevronRight } from "lucide-react";

const faqs = [
  { q: "What documents do I need to rent a car?", short: "Valid license, ID, and a payment card.", full: "UAE residents need a valid UAE driving license, Emirates ID (front & back), passport & visa copy, and a credit/debit card. Foreign tourists need their home country license + IDP, passport copy, visa/entry stamp copy, and a credit/debit card." },
  { q: "What is the minimum age to rent?", short: "You must be at least 22 years old.", full: "The minimum age to rent a car from Al Emad is 22 years. You must hold a valid driving license for at least 1 year. Some luxury vehicles may require the driver to be 25+." },
  { q: "Is insurance included in the rental price?", short: "Yes — comprehensive coverage is included.", full: "All our vehicles come with comprehensive insurance coverage at no additional cost. This includes third-party liability and collision damage. Personal accident insurance is also available upon request." },
  { q: "Do you offer free delivery?", short: "Free delivery anywhere in Dubai.", full: "We provide complimentary vehicle delivery and pickup anywhere in Dubai — hotels, airports, residences, or offices. Delivery to other emirates is available at a small additional charge." },
  { q: "Can I pay with cash?", short: "Yes — cash, credit & debit cards accepted.", full: "We accept all major payment methods including cash, Visa, Mastercard, and debit cards. A refundable security deposit is required at the time of rental, which can be placed on a credit or debit card." },
  { q: "What happens if the car breaks down?", short: "24/7 roadside assistance at no extra cost.", full: "We provide round-the-clock roadside assistance. If your vehicle experiences any mechanical issues, call us immediately and we'll either fix the problem on-site or provide a replacement vehicle at no extra cost." },
  { q: "Can I extend my rental period?", short: "Yes — just call us before it expires.", full: "Absolutely! Simply contact us before your current rental period ends and we'll extend it. Daily, weekly, and monthly extensions are available. If extending to a longer period, you may qualify for a better rate." },
  { q: "Do you have a mileage limit?", short: "250 km/day included; extra km available.", full: "Our standard rentals include 250 km per day. Weekly rentals include 1,500 km and monthly rentals include 4,500 km. Additional kilometers can be purchased at competitive rates. Unlimited mileage packages are also available for monthly rentals." },
];

const FAQSection = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section id="faq" className="section-padding bg-background">
      <div className="container">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold tracking-widest uppercase text-primary mb-2">FAQ</p>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground">Got Questions?</h2>
          <p className="text-muted-foreground mt-3 max-w-lg mx-auto">Everything you need to know about renting with Al Emad.</p>
        </div>

        <div className="max-w-3xl mx-auto grid gap-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="group relative border border-border rounded-2xl overflow-hidden transition-all duration-500 cursor-pointer"
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              style={{
                background: hoveredIdx === i ? "hsl(0 85% 50% / 0.03)" : "white",
              }}
            >
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <ChevronRight
                    className={`w-5 h-5 text-primary shrink-0 mt-0.5 transition-transform duration-300 ${hoveredIdx === i ? "rotate-90" : ""}`}
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground font-sans text-base">{faq.q}</h3>
                    <div
                      className="overflow-hidden transition-all duration-500"
                      style={{
                        maxHeight: hoveredIdx === i ? "200px" : "28px",
                        opacity: 1,
                      }}
                    >
                      <p className={`text-sm mt-1 leading-relaxed transition-all duration-300 ${hoveredIdx === i ? "text-muted-foreground" : "text-muted-foreground/60"}`}>
                        {hoveredIdx === i ? faq.full : faq.short}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
