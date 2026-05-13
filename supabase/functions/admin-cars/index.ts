// ERP admin-cars endpoint. Validates the hardcoded admin password, then performs CRUD on cars table using service-role.
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-admin-password",
};

const ADMIN_USERNAME = "admin@alemad.ae";
const ADMIN_PASSWORD = "Alemad@123";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const body = await req.json().catch(() => ({}));
    const { username, password, action, car, id, slide, prompt } = body as {
      username?: string;
      password?: string;
      action: string;
      car?: Record<string, unknown>;
      id?: string;
      slide?: Record<string, unknown>;
      prompt?: string;
    };

    if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
      return new Response(JSON.stringify({ error: "Invalid credentials" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "login") {
      return new Response(JSON.stringify({ ok: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    if (action === "create" && car) {
      const { data, error } = await supabase.from("cars").insert(car as any).select().single();
      if (error) throw error;
      return new Response(JSON.stringify({ ok: true, car: data }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "update" && id && car) {
      const { data, error } = await supabase.from("cars").update(car as any).eq("id", id).select().single();
      if (error) throw error;
      return new Response(JSON.stringify({ ok: true, car: data }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "delete" && id) {
      const { error } = await supabase.from("cars").delete().eq("id", id);
      if (error) throw error;
      return new Response(JSON.stringify({ ok: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "list_customers") {
      const { data, error } = await supabase
        .from("customers")
        .select("id, name, email, phone, country_code, created_at")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return new Response(JSON.stringify({ ok: true, customers: data }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // ── Hero slides CRUD ──
    if (action === "hero_create" && slide) {
      const { data, error } = await supabase.from("hero_slides").insert(slide as any).select().single();
      if (error) throw error;
      return new Response(JSON.stringify({ ok: true, slide: data }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (action === "hero_update" && id && slide) {
      const { data, error } = await supabase.from("hero_slides").update(slide as any).eq("id", id).select().single();
      if (error) throw error;
      return new Response(JSON.stringify({ ok: true, slide: data }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (action === "hero_delete" && id) {
      const { error } = await supabase.from("hero_slides").delete().eq("id", id);
      if (error) throw error;
      return new Response(JSON.stringify({ ok: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // ── AI: generate a generic bio for a car ──
    if (action === "generate_bio" && prompt) {
      const apiKey = Deno.env.get("LOVABLE_API_KEY");
      if (!apiKey) throw new Error("LOVABLE_API_KEY not configured");
      const aiRes = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: { "Authorization": `Bearer ${apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash",
          messages: [
            { role: "system", content: "You write short, punchy marketing taglines and 2-sentence descriptions for car rentals in Dubai. Tone: confident, premium, friendly. Never use emojis. Output JSON only." },
            { role: "user", content: `Car: ${prompt}\n\nReturn JSON: { "subtitle": "<6-9 word tagline>", "description": "<1-2 sentence description, max 220 chars>" }` },
          ],
          response_format: { type: "json_object" },
        }),
      });
      if (!aiRes.ok) {
        const t = await aiRes.text();
        throw new Error(`AI gateway error ${aiRes.status}: ${t}`);
      }
      const aiJson = await aiRes.json();
      const content = aiJson?.choices?.[0]?.message?.content || "{}";
      let parsed: any = {};
      try { parsed = JSON.parse(content); } catch { parsed = {}; }
      return new Response(JSON.stringify({ ok: true, ...parsed }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ error: "Unknown action" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("admin-cars error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
