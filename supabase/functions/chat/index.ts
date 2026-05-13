// Al Emad AI chatbot — proxies to Lovable AI Gateway with streaming.
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `You are Al Emad AI, the friendly virtual assistant for Al Emad Rent A Car (UAE).
You help customers with:
- Car rental questions (daily/weekly/monthly rentals, fleet, prices, availability)
- Required documents (passport, visa, driving license, Emirates ID)
- Booking process, delivery, insurance, mileage limits, Salik, fines
- Pickup/return locations across Dubai and the UAE
- Loyalty rewards, special offers, long-term leasing
- General car advice (sedans vs SUVs, fuel economy, families, business travel)

Tone: warm, professional, concise. Use short paragraphs and bullet points when listing.
If a question is unrelated to car rental, politely steer the conversation back.
Never make up specific prices — say "please check our Fleet page or contact our team for the latest rate".
Always close longer answers with a soft CTA: "Want me to help you book?".`;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-5-mini",
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...(messages ?? [])],
        stream: true,
      }),
    });

    if (response.status === 429) {
      return new Response(JSON.stringify({ error: "Too many requests, please try again in a moment." }), {
        status: 429,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (response.status === 402) {
      return new Response(JSON.stringify({ error: "AI credits exhausted. Please add credits in Lovable workspace settings." }), {
        status: 402,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!response.ok) {
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
