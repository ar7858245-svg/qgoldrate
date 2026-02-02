import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const FALLBACK_RATES = {
  USD: 0.2747,
  EUR: 0.2530,
  GBP: 0.2180,
  BDT: 32.82,
  QAR: 1,
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Return fallback rates (could be enhanced with real API)
    return new Response(JSON.stringify({ rates: FALLBACK_RATES }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ rates: FALLBACK_RATES }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
