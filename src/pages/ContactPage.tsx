import { useState } from "react";
import { Phone, Mail, MapPin, MessageCircle, Clock, Send, Building2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

const ContactPage = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    const trimmed = {
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      subject: form.subject.trim(),
      message: form.message.trim(),
    };

    if (!trimmed.name || !trimmed.email || !trimmed.phone || !trimmed.message) {
      toast({ title: "Missing Fields", description: "Please fill in all required fields.", variant: "destructive" });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmed.email)) {
      toast({ title: "Invalid Email", description: "Please enter a valid email address.", variant: "destructive" });
      return;
    }

    if (trimmed.name.length > 100 || trimmed.email.length > 255 || trimmed.message.length > 2000) {
      toast({ title: "Input Too Long", description: "Please shorten your input.", variant: "destructive" });
      return;
    }

    setSubmitting(true);

    // TODO: Replace with actual Caryaati ERP API endpoint
    // POST to your ERP system: https://www.caryaati.com/erps/api/inquiries
    // Body: { name, email, phone, subject, message, source: "website" }
    try {
      // Simulate ERP API call — replace this URL with your Caryaati ERP endpoint
      await new Promise((resolve) => setTimeout(resolve, 1200));

      setSubmitted(true);
      toast({ title: "Inquiry Sent!", description: "Our team will contact you shortly." });
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch {
      toast({ title: "Error", description: "Something went wrong. Please try again or call us directly.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[hsl(var(--surface-dark))]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-40" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-primary/5 rounded-full blur-[100px]" />

        <div className="container relative z-10 text-center">
          <p className="text-sm font-semibold tracking-widest uppercase text-primary mb-3">Contact Us</p>
          <h1 className="text-3xl md:text-5xl font-display font-bold text-[hsl(var(--surface-dark-foreground))] mb-3">
            We're Here For You
          </h1>
          <p className="text-[hsl(var(--surface-dark-foreground))]/50 max-w-lg mx-auto">
            Have a question, need a quote, or want to book? Our team is ready to assist you 24/7.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto -mt-20 relative z-20">
            <InfoCard icon={<Phone className="w-5 h-5" />} label="Call Us" value="+971 4 557 3386" sub="Available 24/7" href="tel:+97145573386" />
            <InfoCard icon={<Mail className="w-5 h-5" />} label="Email" value="info@alemad.ae" sub="Reply within 1 hour" href="mailto:info@alemad.ae" />
            <InfoCard icon={<MapPin className="w-5 h-5" />} label="Office" value="JLT, Platinum Tower" sub="Cluster I, Dubai, UAE" href="https://maps.google.com/?q=JLT+Platinum+Tower+Dubai" />
            <InfoCard icon={<Clock className="w-5 h-5" />} label="Working Hours" value="24/7 Service" sub="Always available" href="https://wa.me/97145573386" />
          </div>
        </div>
      </section>

      {/* Inquiry Form + Map */}
      <section className="section-padding bg-muted/20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
            {/* Inquiry Form */}
            <div className="bg-background rounded-2xl border border-border p-8 md:p-10">
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-2">
                  <Send className="w-5 h-5 text-primary" />
                  <p className="text-sm font-semibold tracking-widest uppercase text-primary">Send Inquiry</p>
                </div>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">Get a Free Quote</h2>
                <p className="text-muted-foreground text-sm mt-2">Fill in your details and our team will get back to you within 30 minutes.</p>
              </div>

              {submitted ? (
                <div className="text-center py-12">
                  <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
                  <h3 className="text-xl font-display font-bold text-foreground mb-2">Thank You!</h3>
                  <p className="text-muted-foreground text-sm mb-6">Your inquiry has been submitted. Our team will contact you shortly.</p>
                  <Button onClick={() => setSubmitted(false)} variant="outline" className="rounded-xl">
                    Send Another Inquiry
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-foreground mb-1.5 block">Full Name *</label>
                      <Input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        maxLength={100}
                        className="rounded-xl border-border focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-foreground mb-1.5 block">Email Address *</label>
                      <Input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        maxLength={255}
                        className="rounded-xl border-border focus:border-primary"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-foreground mb-1.5 block">Phone Number *</label>
                      <Input
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+971 50 XXX XXXX"
                        maxLength={20}
                        className="rounded-xl border-border focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-foreground mb-1.5 block">Subject</label>
                      <Input
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        placeholder="e.g. Monthly Rental Quote"
                        maxLength={100}
                        className="rounded-xl border-border focus:border-primary"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-foreground mb-1.5 block">Message *</label>
                    <Textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us about your rental needs — vehicle type, duration, dates..."
                      rows={5}
                      maxLength={2000}
                      className="rounded-xl border-border focus:border-primary resize-none"
                    />
                    <p className="text-[10px] text-muted-foreground mt-1 text-right">{form.message.length}/2000</p>
                  </div>
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 gap-2 rounded-xl h-12 text-sm font-semibold shadow-lg shadow-primary/15"
                  >
                    {submitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                        Sending...
                      </span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" /> Submit Inquiry
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>

            {/* Map + Location Details */}
            <div className="space-y-6">
              {/* Google Map */}
              <div className="rounded-2xl overflow-hidden border border-border h-[350px]">
                <iframe
                  title="Al Emad Rent A Car Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3613.4!2d55.1413!3d25.0765!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6b5402c126e3%3A0xd94242e42b58e55a!2sJLT%20Cluster%20I%20-%20Jumeirah%20Lake%20Towers%20-%20Dubai!5e0!3m2!1sen!2sae!4v1700000000000!5m2!1sen!2sae"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* Location Details Card */}
              <div className="bg-background rounded-2xl border border-border p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-foreground">Al Emad Rent A Car</h3>
                    <p className="text-xs text-muted-foreground">Official Headquarters</p>
                  </div>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="text-foreground font-medium">Platinum Tower, Cluster I</p>
                      <p className="text-muted-foreground">Jumeirah Lake Towers (JLT), Dubai, UAE</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-primary shrink-0" />
                    <a href="tel:+97145573386" className="text-foreground hover:text-primary transition-colors">+971 4 557 3386</a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-primary shrink-0" />
                    <a href="mailto:info@alemad.ae" className="text-foreground hover:text-primary transition-colors">info@alemad.ae</a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-primary shrink-0" />
                    <p className="text-foreground">Open 24/7 — 365 Days</p>
                  </div>
                </div>

                <div className="mt-5 pt-5 border-t border-border flex flex-col sm:flex-row gap-3">
                  <a href="https://wa.me/97145573386" target="_blank" rel="noopener noreferrer" className="flex-1">
                    <Button className="w-full bg-[hsl(var(--whatsapp))] text-white hover:bg-[hsl(142,70%,40%)] gap-2 rounded-xl text-sm">
                      <MessageCircle className="w-4 h-4" /> WhatsApp
                    </Button>
                  </a>
                  <a href="https://maps.google.com/?q=JLT+Platinum+Tower+Dubai" target="_blank" rel="noopener noreferrer" className="flex-1">
                    <Button variant="outline" className="w-full rounded-xl border-border hover:border-primary/30 gap-2 text-sm">
                      <MapPin className="w-4 h-4" /> Get Directions
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

const InfoCard = ({ icon, label, value, sub, href }: { icon: React.ReactNode; label: string; value: string; sub: string; href: string }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="bg-background border border-border rounded-2xl p-6 text-center hover:border-primary/30 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 block">
    <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3 text-primary">{icon}</div>
    <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1 font-medium">{label}</p>
    <p className="text-sm font-bold text-foreground">{value}</p>
    <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>
  </a>
);

export default ContactPage;
