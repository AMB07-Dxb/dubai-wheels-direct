import { useState } from "react";
import { Truck, Car, HeadphonesIcon, Wrench, Clock, CreditCard, Shield, Settings2, ChevronRight } from "lucide-react";
import gwagonTop from "@/assets/gwagon-top.png";

const items = [
  {
    icon: Truck,
    title: "Drop-off & Pick-up",
    desc: "Count on our experts to deliver your selected vehicle and pick it up when your rental ends. We serve all over Dubai and Abu Dhabi.",
  },
  {
    icon: Car,
    title: "Wide Selection of Vehicles",
    desc: "Choose from 900+ vehicles across economy, sedan, SUV, and luxury categories. Whether you need a compact city car or a premium SUV, we have it all.",
  },
  {
    icon: HeadphonesIcon,
    title: "Excellent Customer Service",
    desc: "Our dedicated support team is available 24/7 via phone, WhatsApp, and email. We ensure every rental experience exceeds your expectations.",
  },
  {
    icon: Wrench,
    title: "Well-Maintained Cars",
    desc: "Every vehicle undergoes rigorous inspections and regular servicing. We guarantee clean, fully-fueled cars with zero mechanical issues.",
  },
];

const itemsRight = [
  {
    icon: Clock,
    title: "Faster Processing",
    desc: "Get behind the wheel in under 30 minutes. Our streamlined booking process ensures minimal paperwork and maximum convenience.",
  },
  {
    icon: CreditCard,
    title: "No Extra Booking Charge",
    desc: "The price you see is the price you pay. No hidden fees, no surprise charges. We believe in complete transparency with our customers.",
  },
  {
    icon: Shield,
    title: "Full Insurance Coverage",
    desc: "Drive with complete peace of mind. All our vehicles come with comprehensive insurance coverage included in your rental price.",
  },
  {
    icon: Settings2,
    title: "Zero Maintenance Costs",
    desc: "Forget about service bills. All maintenance, oil changes, and tire rotations are on us throughout your entire rental period.",
  },
];

const HowItWorks = () => {
  const [openLeft, setOpenLeft] = useState<number | null>(null);
  const [openRight, setOpenRight] = useState<number | null>(null);

  return (
    <section className="py-24 bg-background">
      <div className="container">
        <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground text-center mb-20">
          Why Choose Al Emad?
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* Left Column */}
          <div className="space-y-1">
            {items.map((item, i) => (
              <AccordionRow
                key={item.title}
                icon={item.icon}
                title={item.title}
                desc={item.desc}
                isOpen={openLeft === i}
                onClick={() => setOpenLeft(openLeft === i ? null : i)}
                align="left"
              />
            ))}
          </div>

          {/* Center: Car Image */}
          <div className="hidden lg:flex items-center justify-center relative">
            <div className="w-72 h-72 rounded-full bg-primary/10 absolute" />
            <img
              src={gwagonTop}
              alt="G-Wagon top view"
              className="relative z-10 w-80 h-auto object-contain drop-shadow-2xl"
              loading="lazy"
              width={768}
              height={1024}
            />
          </div>

          {/* Right Column */}
          <div className="space-y-1">
            {itemsRight.map((item, i) => (
              <AccordionRow
                key={item.title}
                icon={item.icon}
                title={item.title}
                desc={item.desc}
                isOpen={openRight === i}
                onClick={() => setOpenRight(openRight === i ? null : i)}
                align="right"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const AccordionRow = ({
  icon: Icon,
  title,
  desc,
  isOpen,
  onClick,
  align,
}: {
  icon: React.ElementType;
  title: string;
  desc: string;
  isOpen: boolean;
  onClick: () => void;
  align: "left" | "right";
}) => (
  <div className="border-b border-border">
    <button
      onClick={onClick}
      className="w-full flex items-center gap-4 py-5 px-2 hover:bg-muted/30 transition-colors rounded-lg group"
    >
      <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
        <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
      </div>
      <span className="text-[15px] font-semibold text-foreground flex-1 text-left">{title}</span>
      <ChevronRight
        className={`w-4 h-4 text-muted-foreground transition-transform duration-300 ${isOpen ? "rotate-90" : ""}`}
      />
    </button>
    <div
      className="overflow-hidden transition-all duration-300"
      style={{ maxHeight: isOpen ? "200px" : "0px", opacity: isOpen ? 1 : 0 }}
    >
      <p className="text-sm text-muted-foreground leading-relaxed px-2 pb-5 pl-16">
        {desc}
      </p>
    </div>
  </div>
);

export default HowItWorks;
