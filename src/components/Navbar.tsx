import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Fleet", href: "#fleet" },
  { label: "Why Us", href: "#why-us" },
  { label: "Documents", href: "#documents" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-surface-dark/95 backdrop-blur-md border-b border-border/10">
      <div className="container flex items-center justify-between h-16 md:h-20">
        <a href="#home" className="flex items-center gap-2">
          <span className="text-2xl font-display font-bold text-primary">AL EMAD</span>
          <span className="text-xs font-medium tracking-widest text-surface-dark-foreground/60 uppercase">Rent A Car</span>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-surface-dark-foreground/80 hover:text-primary transition-colors">
              {l.label}
            </a>
          ))}
          <a href="tel:+97145573386">
            <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
              <Phone className="w-4 h-4" /> Call Now
            </Button>
          </a>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-surface-dark-foreground" onClick={() => setOpen(!open)}>
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-surface-dark border-t border-border/10 animate-fade-in">
          <div className="container py-4 flex flex-col gap-4">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-sm font-medium text-surface-dark-foreground/80 hover:text-primary transition-colors py-2">
                {l.label}
              </a>
            ))}
            <a href="tel:+97145573386">
              <Button size="sm" className="w-full bg-primary text-primary-foreground gap-2">
                <Phone className="w-4 h-4" /> Call Now
              </Button>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
