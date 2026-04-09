import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FileText, Globe, CheckCircle2 } from "lucide-react";

const DocumentsPage = () => (
  <div className="min-h-screen bg-background">
    <Navbar />

    <section className="pt-28 pb-12 bg-surface-dark">
      <div className="container">
        <p className="text-sm font-semibold tracking-widest uppercase text-primary mb-2">Getting Started</p>
        <h1 className="text-3xl md:text-5xl font-display font-bold text-surface-dark-foreground">Documents Required</h1>
        <p className="text-surface-dark-foreground/50 mt-3 max-w-lg">Everything you need to get on the road in Dubai.</p>
      </div>
    </section>

    <section className="section-padding">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* UAE Residents */}
          <div className="rounded-3xl overflow-hidden border border-border hover:border-primary/20 hover:shadow-xl transition-all duration-300 hover-lift">
            <div className="relative h-48 bg-gradient-to-br from-primary/5 to-primary/10 flex items-center justify-center">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Emirates_ID_Card_Front.jpg/1280px-Emirates_ID_Card_Front.jpg" alt="Emirates ID Card" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
            </div>
            <div className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
                  <FileText className="w-7 h-7 text-primary" />
                </div>
                <h2 className="text-xl font-semibold text-foreground font-sans">UAE Residents</h2>
              </div>
              <ul className="space-y-3.5">
                {["Valid UAE Driving License", "Emirates ID (front & back)", "Passport & Visa page copy", "Credit / Debit Card"].map(item => (
                  <li key={item} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Tourists */}
          <div className="rounded-3xl overflow-hidden border border-border hover:border-primary/20 hover:shadow-xl transition-all duration-300 hover-lift">
            <div className="relative h-48 bg-gradient-to-br from-primary/5 to-primary/10 flex items-center justify-center">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Biometric_passport_logo.svg/1200px-Biometric_passport_logo.svg.png" alt="Passport icon" className="w-32 h-32 object-contain opacity-20" />
              <Globe className="w-20 h-20 text-primary/30 absolute" />
            </div>
            <div className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
                  <Globe className="w-7 h-7 text-primary" />
                </div>
                <h2 className="text-xl font-semibold text-foreground font-sans">Foreign Tourists</h2>
              </div>
              <ul className="space-y-3.5">
                {["Home Country Driving License + IDP", "Passport Copy", "Copy of Visa / Entry Stamp", "Credit / Debit Card"].map(item => (
                  <li key={item} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-primary" /> Minimum age: 22 years</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-primary" /> Insurance included</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-primary" /> Cash payments accepted</span>
          </div>
        </div>
      </div>
    </section>

    <Footer />
  </div>
);

export default DocumentsPage;
