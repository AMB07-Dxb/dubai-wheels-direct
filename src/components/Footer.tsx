const Footer = () => (
  <footer className="bg-surface-dark border-t border-surface-dark-foreground/10 py-8">
    <div className="container flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-surface-dark-foreground/50">
      <p>© {new Date().getFullYear()} Al Emad Rent A Car. All rights reserved.</p>
      <div className="flex gap-6">
        <a href="https://alemad.ae/terms-and-conditions/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Terms & Conditions</a>
        <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
      </div>
    </div>
  </footer>
);

export default Footer;
