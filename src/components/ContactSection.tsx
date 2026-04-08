import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const ContactSection = () => (
  <section id="contact" className="section-padding bg-surface-dark relative overflow-hidden">
    <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

    <div className="container relative">
      <div className="text-center mb-14">
        <p className="text-sm font-semibold tracking-widest uppercase text-primary mb-2">Get In Touch</p>
        <h2 className="text-3xl md:text-5xl font-display font-bold text-surface-dark-foreground">Ready to Hit the Road?</h2>
        <p className="text-surface-dark-foreground/50 mt-3 max-w-md mx-auto">Reach out and we'll have you behind the wheel in no time.</p>
      </div>

      <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
        <ContactCard icon={<Phone className="w-5 h-5" />} label="Call Us" value="+971 4 557 3386" href="tel:+97145573386" />
        <ContactCard icon={<Mail className="w-5 h-5" />} label="Email" value="info@alemad.ae" href="mailto:info@alemad.ae" />
        <ContactCard icon={<MapPin className="w-5 h-5" />} label="Location" value="JLT, Platinum Tower, Dubai" href="https://maps.google.com/?q=JLT+Platinum+Tower+Dubai" />
      </div>

      <div className="text-center">
        <a href="https://wa.me/97145573386" target="_blank" rel="noopener noreferrer">
          <Button size="lg" className="bg-[hsl(142,70%,45%)] text-primary-foreground hover:bg-[hsl(142,70%,40%)] text-base px-10 gap-2 shadow-lg shadow-[hsl(142,70%,45%)]/20">
            <MessageCircle className="w-5 h-5" /> Chat on WhatsApp
          </Button>
        </a>
      </div>
    </div>
  </section>
);

const ContactCard = ({ icon, label, value, href }: { icon: React.ReactNode; label: string; value: string; href: string }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-6 text-center hover:border-primary/30 hover:bg-white/[0.06] transition-all duration-300 block">
    <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3 text-primary">{icon}</div>
    <p className="text-[10px] uppercase tracking-widest text-surface-dark-foreground/40 mb-1 font-medium">{label}</p>
    <p className="text-sm font-medium text-surface-dark-foreground">{value}</p>
  </a>
);

export default ContactSection;
