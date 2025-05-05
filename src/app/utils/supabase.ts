import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://zzzvljdbovpnyrocqhoh.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp6enZsamRib3Zwbnlyb2NxaG9oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY0NDcxMzMsImV4cCI6MjA2MjAyMzEzM30.OcMmRGBS9kzl9DULEuxrsDbgeGb72yCOgY8jD0bjtL4"
);

export const uploadToStorage = async (file: File) => {
  return await supabase.storage
    .from("property-image") // replace with your bucket
    .upload(`public/${file.name}`, file, {
      cacheControl: "3600",
      upsert: false,
    });
};
