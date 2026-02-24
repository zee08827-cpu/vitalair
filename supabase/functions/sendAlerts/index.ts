import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

Deno.serve(async (req) => {
  // Get all profiles who want alerts
  const { data, error } = await supabase
    .from("profiles")
    .select("name")
    .eq("notifyBadWeather", true);

  if (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500 }
    );
  }

  // Print alerts for each profile
  data?.forEach((profile) => {
    console.log(`Send alert to ${profile.name}: AQI is bad today!`);
  });

  return new Response("Alerts processed!", { status: 200 });
});