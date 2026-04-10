import { Link } from "react-router-dom";
import { siteConfig } from "@/config/siteConfig";
import logo from "@/assets/logo.png";

const Footer = () => (
  <footer className="bg-muted/50 border-t border-border py-16">
    <div className="container">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
        <div>
          <Link to="/">
            <img src={logo} alt={siteConfig.branding.companyName} className="h-10 md:h-12 w-auto mb-3 object-contain" />
          </Link>
          <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{siteConfig.branding.tagline}</p>
        </div>
        <div>
          <h4 className="font-semibold text-foreground text-sm mb-4 font-sans">Quick Links</h4>
          <div className="flex flex-col gap-2.5">
            {siteConfig.footerLinks.map((link) => (
              <Link key={link.href} to={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">{link.label}</Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-foreground text-sm mb-4 font-sans">Contact</h4>
          <div className="flex flex-col gap-2.5 text-sm text-muted-foreground">
            <a href={siteConfig.callNow.link} className="hover:text-primary transition-colors">{siteConfig.contact.phone}</a>
            <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-primary transition-colors">{siteConfig.contact.email}</a>
            <p>{siteConfig.contact.address}</p>
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-foreground text-sm mb-4 font-sans">Legal</h4>
          <div className="flex flex-col gap-2.5">
            <a href={siteConfig.legal.termsUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms & Conditions</a>
            <a href={siteConfig.legal.privacyUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a>
          </div>
        </div>
      </div>
      <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} {siteConfig.branding.companyName}. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
