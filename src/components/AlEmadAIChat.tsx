import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import aiLogo from "@/assets/al-emad-ai-logo.png";

type Msg = { role: "user" | "assistant"; content: string };

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;
const SUPA_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

const AlEmadAIChat = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: "Hi! I'm Al Emad AI 👋 Ask me anything about our cars, prices, documents, or bookings." },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    const userMsg: Msg = { role: "user", content: text };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${SUPA_KEY}` },
        body: JSON.stringify({ messages: next.map(({ role, content }) => ({ role, content })) }),
      });

      if (resp.status === 429) throw new Error("Too many messages — try again in a moment.");
      if (resp.status === 402) throw new Error("AI temporarily unavailable. Please try later.");
      if (!resp.ok || !resp.body) throw new Error("Failed to reach Al Emad AI.");

      let assistantSoFar = "";
      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let done = false;
      while (!done) {
        const { value, done: d } = await reader.read();
        if (d) break;
        buffer += decoder.decode(value, { stream: true });
        let nl: number;
        while ((nl = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, nl);
          buffer = buffer.slice(nl + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (!line.startsWith("data: ")) continue;
          const json = line.slice(6).trim();
          if (json === "[DONE]") { done = true; break; }
          try {
            const parsed = JSON.parse(json);
            const delta = parsed.choices?.[0]?.delta?.content;
            if (delta) {
              assistantSoFar += delta;
              setMessages((prev) => prev.map((m, i) => i === prev.length - 1 ? { ...m, content: assistantSoFar } : m));
            }
          } catch {
            buffer = line + "\n" + buffer;
            break;
          }
        }
      }
    } catch (e: any) {
      setMessages((prev) => [...prev, { role: "assistant", content: e.message || "Something went wrong." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Open Al Emad AI chat"
          className="fixed bottom-6 right-6 z-[60] h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-xl hover:scale-105 transition-transform flex items-center justify-center"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      )}

      {open && (
        <div className="fixed bottom-6 right-6 z-[60] w-[92vw] max-w-sm h-[70vh] max-h-[600px] bg-background border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-border bg-primary text-primary-foreground">
            <div className="flex items-center gap-2">
              <img src={aiLogo} alt="Al Emad AI" className="h-8 w-8 rounded-full bg-white p-0.5" />
              <div>
                <div className="text-sm font-semibold">Al Emad AI</div>
                <div className="text-[11px] opacity-80">Online · usually replies instantly</div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close chat" className="p-1 hover:bg-white/10 rounded">
              <X className="h-4 w-4" />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-muted/30">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-sm whitespace-pre-wrap ${
                  m.role === "user" ? "bg-primary text-primary-foreground" : "bg-background border border-border text-foreground"
                }`}>
                  {m.content || (loading && i === messages.length - 1 ? "…" : "")}
                </div>
              </div>
            ))}
            {loading && messages[messages.length - 1]?.role !== "assistant" && (
              <div className="flex justify-start">
                <div className="bg-background border border-border rounded-2xl px-3.5 py-2">
                  <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                </div>
              </div>
            )}
          </div>

          <form onSubmit={(e) => { e.preventDefault(); send(); }} className="p-3 border-t border-border flex gap-2 bg-background">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about cars, prices, documents…"
              className="flex-1 h-10 rounded-full border border-border bg-background px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              disabled={loading}
            />
            <Button type="submit" size="icon" className="h-10 w-10 rounded-full" disabled={loading || !input.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </form>

          <div className="px-4 py-2 border-t border-border flex items-center justify-center gap-1.5 bg-muted/40">
            <img src={aiLogo} alt="" className="h-3.5 w-3.5" />
            <span className="text-[10px] text-muted-foreground tracking-wide">Powered by <strong className="text-foreground">Al Emad AI</strong></span>
          </div>
        </div>
      )}
    </>
  );
};

export default AlEmadAIChat;
