import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-api-key",
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get API key from header
    const apiKey = req.headers.get("x-api-key");
    
    if (!apiKey) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "API key is required. Include 'x-api-key' header." 
        }),
        { 
          status: 401, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    // Create Supabase client with service role
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Validate API key
    const { data: keyData, error: keyError } = await supabase
      .from("api_keys")
      .select("*, api_plans(*)")
      .eq("api_key", apiKey)
      .single();

    if (keyError || !keyData) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Invalid API key." 
        }),
        { 
          status: 401, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    // Check if key is active
    if (!keyData.is_active) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "API key is inactive." 
        }),
        { 
          status: 403, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    // Check if key is expired
    if (keyData.expires_at && new Date(keyData.expires_at) < new Date()) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "API key has expired." 
        }),
        { 
          status: 403, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    // Check usage limits (unless unlimited)
    const isUnlimited = keyData.api_plans?.is_unlimited || false;
    if (!isUnlimited && keyData.requests_used >= keyData.requests_limit) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Request limit exceeded. Please upgrade your plan.",
          usage: {
            used: keyData.requests_used,
            limit: keyData.requests_limit
          }
        }),
        { 
          status: 429, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    // Get client IP
    const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0] || 
                     req.headers.get("cf-connecting-ip") || 
                     "unknown";

    // Log usage
    await supabase.from("api_usage_logs").insert({
      api_key_id: keyData.id,
      endpoint: "/gold-price-api",
      ip_address: clientIp,
      response_status: 200
    });

    // Update requests_used and last_used_at
    await supabase
      .from("api_keys")
      .update({ 
        requests_used: keyData.requests_used + 1,
        last_used_at: new Date().toISOString()
      })
      .eq("id", keyData.id);

    // Get latest gold prices from database
    const { data: priceData, error: priceError } = await supabase
      .from("gold_price_history")
      .select("*")
      .order("recorded_at", { ascending: false })
      .limit(10);

    if (priceError) {
      throw new Error("Failed to fetch gold prices");
    }

    // Format response
    const latestPrices: Record<string, number> = {};
    const uniqueKarats = new Set<string>();
    
    priceData?.forEach((record) => {
      if (!uniqueKarats.has(record.karat)) {
        uniqueKarats.add(record.karat);
        latestPrices[record.karat] = Number(record.price_per_gram);
      }
    });

    // Get historical data if requested
    const url = new URL(req.url);
    const includeHistory = url.searchParams.get("history") === "true";
    const karat = url.searchParams.get("karat");
    
    let historicalData = null;
    if (includeHistory) {
      const historyQuery = supabase
        .from("gold_price_history")
        .select("*")
        .order("recorded_at", { ascending: false })
        .limit(100);
      
      if (karat) {
        historyQuery.eq("karat", karat);
      }
      
      const { data: historyResult } = await historyQuery;
      historicalData = historyResult?.map((record) => ({
        karat: record.karat,
        price_per_gram: Number(record.price_per_gram),
        recorded_at: record.recorded_at
      }));
    }

    const response = {
      success: true,
      timestamp: new Date().toISOString(),
      currency: "QAR",
      unit: "gram",
      prices: latestPrices,
      ...(historicalData && { history: historicalData }),
      usage: {
        used: keyData.requests_used + 1,
        limit: isUnlimited ? "unlimited" : keyData.requests_limit,
        remaining: isUnlimited ? "unlimited" : keyData.requests_limit - keyData.requests_used - 1
      }
    };

    return new Response(
      JSON.stringify(response),
      { 
        status: 200, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );

  } catch (error) {
    console.error("Gold Price API Error:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: "Internal server error" 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
