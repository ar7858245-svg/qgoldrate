-- Create a table for gold price history
CREATE TABLE public.gold_price_history (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  karat TEXT NOT NULL,
  price_per_gram NUMERIC NOT NULL,
  recorded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.gold_price_history ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (gold prices are public data)
CREATE POLICY "Gold prices are viewable by everyone" 
ON public.gold_price_history 
FOR SELECT 
USING (true);

-- Create policy for service role insert (edge functions will insert)
CREATE POLICY "Service role can insert gold prices" 
ON public.gold_price_history 
FOR INSERT 
WITH CHECK (true);

-- Create index for faster queries
CREATE INDEX idx_gold_price_history_karat ON public.gold_price_history(karat);
CREATE INDEX idx_gold_price_history_recorded_at ON public.gold_price_history(recorded_at DESC);

-- Enable realtime for the table
ALTER PUBLICATION supabase_realtime ADD TABLE public.gold_price_history;