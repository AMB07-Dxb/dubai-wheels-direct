import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-muted/50 border-t border-border py-16">
    <div className="container">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
        <div>
          <Link to="/" className="text-2xl font-display font-bold text-primary">AL EMAD</Link>
          <p className="text-sm text-muted-foreground mt-3 leading-relaxed">Premium car rental services in Dubai. Economy to luxury at unbeatable prices.</p>
        </div>
        <div>
          <h4 className="font-semibold text-foreground text-sm mb-4 font-sans">Quick Links</h4>
          <div className="flex flex-col gap-2.5">
            <Link to="/fleet" className="text-sm text-muted-foreground hover:text-primary transition-colors">Our Fleet</Link>
            <Link to="/rewards" className="text-sm text-muted-foreground hover:text-primary transition-colors">Rewards</Link>
            <Link to="/documents" className="text-sm text-muted-foreground hover:text-primary transition-colors">Documents</Link>
            <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</Link>
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-foreground text-sm mb-4 font-sans">Contact</h4>
          <div className="flex flex-col gap-2.5 text-sm text-muted-foreground">
            <a href="tel:+97145573386" className="hover:text-primary transition-colors">+971 4 557 3386</a>
            <a href="mailto:info@alemad.ae" className="hover:text-primary transition-colors">info@alemad.ae</a>
            <p>JLT, Platinum Tower, Dubai</p>
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-foreground text-sm mb-4 font-sans">Legal</h4>
          <div className="flex flex-col gap-2.5">
            <a href="https://alemad.ae/terms-and-conditions/" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms & Conditions</a>
            <a href="https://alemad.ae/privacy-policy/" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a>
          </div>
        </div>
      </div>
      <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Al Emad Rent A Car. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
