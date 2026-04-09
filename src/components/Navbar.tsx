import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Fleet", href: "/fleet" },
  { label: "Rewards", href: "/rewards" },
  { label: "Documents", href: "/documents" },
  { label: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled
        ? "bg-background/95 backdrop-blur-xl shadow-sm border-b border-border"
        : "bg-background/80 backdrop-blur-md"
    }`}>
      <div className="container flex items-center justify-between h-18 md:h-20">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="text-2xl font-display font-bold text-primary">AL EMAD</span>
          <span className="text-[10px] font-semibold tracking-[0.2em] text-muted-foreground uppercase hidden sm:inline">Rent A Car</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <Link key={l.href} to={l.href} className={`text-sm font-medium transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full ${
              location.pathname === l.href ? "text-primary" : "text-foreground/60 hover:text-foreground"
            }`}>
              {l.label}
            </Link>
          ))}
          <a href="tel:+97145573386">
            <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 rounded-xl shadow-sm">
              <Phone className="w-4 h-4" /> Call Now
            </Button>
          </a>
        </div>

        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-background border-t border-border animate-fade-in">
          <div className="container py-6 flex flex-col gap-1">
            {navLinks.map((l) => (
              <Link key={l.href} to={l.href} onClick={() => setOpen(false)} className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors py-3 border-b border-border">
                {l.label}
              </Link>
            ))}
            <a href="tel:+97145573386" className="mt-3">
              <Button size="sm" className="w-full bg-primary text-primary-foreground gap-2 rounded-xl">
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
