import { CheckCircle2 } from "lucide-react";

const DocumentsSection = () => (
  <section id="documents" className="section-padding bg-muted/30">
    <div className="container">
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground uppercase">
          Essential Documents to Rent a Car in Dubai
        </h2>
        <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
          Before renting a car, ensure you have all the necessary documents ready. The requirements for UAE residents and tourists are outlined below.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* UAE Residents */}
        <div className="bg-background rounded-2xl p-8 border border-border">
          <h3 className="text-xl md:text-2xl font-display font-bold text-destructive uppercase mb-6">UAE Residents</h3>
          <div className="flex items-start justify-between gap-4">
            <ul className="space-y-4 flex-1">
              <li className="flex items-center gap-3 text-foreground">
                <span className="w-2.5 h-2.5 rounded-full bg-primary shrink-0" />
                Emirates ID
              </li>
              <li className="flex items-center gap-3 text-foreground">
                <span className="w-2.5 h-2.5 rounded-full bg-primary shrink-0" />
                Driving License
              </li>
              <li className="flex items-center gap-3 text-foreground">
                <span className="w-2.5 h-2.5 rounded-full bg-primary shrink-0" />
                Visa Copy
              </li>
            </ul>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Emirates_ID_card.png/320px-Emirates_ID_card.png"
              alt="Emirates ID Card"
              className="w-32 md:w-40 object-contain rounded-lg"
              loading="lazy"
            />
          </div>
        </div>

        {/* Tourists */}
        <div className="bg-background rounded-2xl p-8 border border-border">
          <h3 className="text-xl md:text-2xl font-display font-bold text-destructive uppercase mb-6">For Tourists</h3>
          <div className="flex items-start justify-between gap-4">
            <ul className="space-y-4 flex-1">
              <li className="flex items-center gap-3 text-foreground">
                <span className="w-2.5 h-2.5 rounded-full bg-primary shrink-0" />
                Passport
              </li>
              <li className="flex items-center gap-3 text-foreground">
                <span className="w-2.5 h-2.5 rounded-full bg-primary shrink-0" />
                Visa
              </li>
              <li className="flex items-center gap-3 text-foreground">
                <span className="w-2.5 h-2.5 rounded-full bg-primary shrink-0" />
                International Driving Permit (IDP)
              </li>
            </ul>
            <div className="w-32 md:w-40 shrink-0 flex items-center justify-center">
              <div className="w-24 h-32 bg-[hsl(210,80%,40%)] rounded-lg flex flex-col items-center justify-center text-background">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M2 12h20" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
                <span className="text-[10px] font-bold tracking-wider uppercase">Passport</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 text-center">
        <div className="inline-flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-primary" /> Minimum age: 22 years</span>
          <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-primary" /> Insurance included</span>
          <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-primary" /> Cash payments accepted</span>
        </div>
      </div>
    </div>
  </section>
);

export default DocumentsSection;
