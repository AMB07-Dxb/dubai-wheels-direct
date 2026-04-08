import { FileText, Globe } from "lucide-react";

const DocumentsSection = () => (
  <section id="documents" className="section-padding bg-background">
    <div className="container">
      <div className="text-center mb-14">
        <p className="text-sm font-semibold tracking-widest uppercase text-primary mb-2">Getting Started</p>
        <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground">Documents Required</h2>
        <p className="text-muted-foreground mt-3 max-w-lg mx-auto">Renting a car in Dubai is simple. Here's what you'll need to get on the road.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <DocCard
          icon={<FileText className="w-7 h-7 text-primary" />}
          title="UAE Residents"
          items={["Valid UAE Driving License", "Emirates ID (front & back)", "Passport & Visa page copy", "Credit / Debit Card"]}
        />
        <DocCard
          icon={<Globe className="w-7 h-7 text-primary" />}
          title="Foreign Tourists"
          items={["Home Country Driving License + IDP", "Passport Copy", "Copy of Visa / Entry Stamp", "Credit / Debit Card"]}
        />
      </div>

      <div className="mt-10 text-center">
        <div className="inline-flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-muted-foreground">
          <span>✓ Minimum age: 22 years</span>
          <span>✓ Insurance included</span>
          <span>✓ Cash payments accepted</span>
        </div>
      </div>
    </div>
  </section>
);

const DocCard = ({ icon, title, items }: { icon: React.ReactNode; title: string; items: string[] }) => (
  <div className="bg-secondary rounded-xl p-8 border border-border">
    <div className="flex items-center gap-3 mb-6">
      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">{icon}</div>
      <h3 className="text-xl font-semibold text-foreground font-sans">{title}</h3>
    </div>
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
          <span className="mt-1 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
          {item}
        </li>
      ))}
    </ul>
  </div>
);

export default DocumentsSection;
