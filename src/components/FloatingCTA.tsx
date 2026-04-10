import { MessageCircle, Phone } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";

const FloatingCTA = () => (
  <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
    <a
      href={siteConfig.callNow.link}
      className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg shadow-primary/30 hover:scale-110 transition-transform duration-300"
      aria-label="Call Now"
    >
      <Phone className="w-6 h-6" />
    </a>
    <a
      href={siteConfig.whatsapp.link}
      target="_blank"
      rel="noopener noreferrer"
      className="w-14 h-14 rounded-full bg-[hsl(142,70%,45%)] text-white flex items-center justify-center shadow-lg shadow-[hsl(142,70%,45%)]/30 hover:scale-110 transition-transform duration-300"
      aria-label="WhatsApp Now"
    >
      <MessageCircle className="w-6 h-6" />
    </a>
  </div>
);

export default FloatingCTA;
