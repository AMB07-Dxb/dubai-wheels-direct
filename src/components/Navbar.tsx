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
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled || !isHome
        ? "bg-surface-dark/95 backdrop-blur-xl shadow-lg"
        : "bg-surface-dark/60 backdrop-blur-md"
    }`}>
      <div className="container flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-display font-bold text-primary">AL EMAD</span>
          <span className="text-[10px] font-semibold tracking-[0.2em] text-primary-foreground/60 uppercase hidden sm:inline">Rent A Car</span>
        </Link>

        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((l) => (
            <Link key={l.href} to={l.href} className={`text-sm font-medium transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full ${
              location.pathname === l.href ? "text-primary" : "text-primary-foreground/70 hover:text-primary"
            }`}>
              {l.label}
            </Link>
          ))}
          <a href="tel:+97145573386">
            <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 shadow-md shadow-primary/20">
              <Phone className="w-4 h-4" /> Call Now
            </Button>
          </a>
        </div>

        <button className="md:hidden text-primary-foreground" onClick={() => setOpen(!open)}>
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-surface-dark/98 backdrop-blur-xl border-t border-white/5 animate-fade-in">
          <div className="container py-6 flex flex-col gap-3">
            {navLinks.map((l) => (
              <Link key={l.href} to={l.href} onClick={() => setOpen(false)} className="text-sm font-medium text-surface-dark-foreground/80 hover:text-primary transition-colors py-2.5 border-b border-white/5">
                {l.label}
              </Link>
            ))}
            <a href="tel:+97145573386" className="mt-2">
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
