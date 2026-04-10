import { MessageCircle, Phone } from "lucide-react";
import { useSiteConfig } from "@/hooks/useErpData";
import { siteConfig as fallbackConfig } from "@/config/siteConfig";

const FloatingCTA = () => {
  const { data: config } = useSiteConfig();
  const callLink = (config as any)?.callNow?.link || fallbackConfig.callNow.link;
  const waLink = (config as any)?.whatsapp?.link || fallbackConfig.whatsapp.link;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      <a
        href={callLink}
        className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg shadow-primary/30 hover:scale-110 transition-transform duration-300"
        aria-label="Call Now"
      >
        <Phone className="w-6 h-6" />
      </a>
      <a
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 rounded-full bg-[hsl(142,70%,45%)] text-white flex items-center justify-center shadow-lg shadow-[hsl(142,70%,45%)]/30 hover:scale-110 transition-transform duration-300"
        aria-label="WhatsApp Now"
      >
        <MessageCircle className="w-6 h-6" />
      </a>
    </div>
  );
};

export default FloatingCTA;
